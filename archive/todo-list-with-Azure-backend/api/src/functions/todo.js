// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { app } = require("@azure/functions");
const { Connection, Request } = require('tedious');
const { jwtDecode } = require("jwt-decode");

/**
 * This function handles requests sent from teamsfx client SDK.
 * The HTTP request should contain an SSO token in the header and any content in the body.
 *
 * @param {HttpRequest} req - The HTTP request.
 */
async function todo(req) {
    let connection;
    try {
        const method = req.method.toLowerCase();
        const accessToken = req.headers
            .get("Authorization")
            ?.replace("Bearer ", "")
            .trim();
        const tokenObj = jwtDecode(accessToken);
        const objectId = tokenObj.oid;
        const body = method === "get" ? {} : await req.json();
        var query;

        switch (method) {
            case "get":
                query = `select id, description, isCompleted, objectId from dbo.Todo where channelOrChatId = '${req.query.get('channelOrChatId')}'`;
                break;
            case "put":
                if (body.description) {
                    query = `update dbo.Todo set description = N'${body.description}' where id = ${body.id}`;
                } else {
                    query = `update dbo.Todo set isCompleted = ${body.isCompleted ? 1 : 0} where id = ${body.id}`;
                }
                break;
            case "post":
                query = `insert into dbo.Todo (description, objectId, isCompleted, channelOrChatId) values (N'${body.description}','${objectId}',${body.isCompleted ? 1 : 0},'${body.channelOrChatId}')`;
                break;
            case "delete":
                query = "delete from dbo.Todo where " + (body ? `id = ${body.id}` : `objectId = '${objectId}'`);
                break;
        }

        connection = await getSQLConnection();
        const result = await execQuery(query, connection);
        return {
            status: 200,
            jsonBody: result
        }
    }
    catch (err) {
        return {
            status: 500,
            jsonBody: {
                error: err.message
            }
        }
    }
    finally {
        if (connection) {
            connection.close();
        }
    }
}

async function getSQLConnection() {
    const config = {
        server: process.env.SQL_ENDPOINT,
        authentication: {
            type: 'default',
            options: {
                userName: process.env.SQL_USER_NAME,
                password: process.env.SQL_PASSWORD,
            }
        },
        options: {
            port: 1433,
            database: process.env.SQL_DATABASE_NAME,
        }
    };
    const connection = new Connection(config);
    return new Promise((resolve, reject) => {
        connection.on('connect', err => {
            if (err) {
                reject(err);
            }
            resolve(connection);
        })
        connection.on('debug', function (err) {
            console.log('debug:', err);
        });
    })
}

async function execQuery(query, connection) {
    return new Promise((resolve, reject) => {
        const res = [];
        const request = new Request(query, (err) => {
            if (err) {
                reject(err);
            }
        });

        request.on('row', columns => {
            const row = {};
            columns.forEach(column => {
                row[column.metadata.colName] = column.value;
            });
            res.push(row)
        });

        request.on('requestCompleted', () => {
            resolve(res)
        });

        request.on("error", err => {
            reject(err);
        });

        connection.execSql(request);
    })
}

app.http("todo", {
    methods: ["GET", "POST", "PUT", "DELETE"],
    authLevel: "anonymous",
    handler: todo,
});