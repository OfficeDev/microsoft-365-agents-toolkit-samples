#! /usr/bin/env node
"use strict";var Jm=Object.create;var Ll=Object.defineProperty;var Xm=Object.getOwnPropertyDescriptor;var zm=Object.getOwnPropertyNames;var Qm=Object.getPrototypeOf,Zm=Object.prototype.hasOwnProperty;var _=(n,e)=>()=>(e||n((e={exports:{}}).exports,e),e.exports);var eg=(n,e,t,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of zm(e))!Zm.call(n,i)&&i!==t&&Ll(n,i,{get:()=>e[i],enumerable:!(r=Xm(e,i))||r.enumerable});return n};var oe=(n,e,t)=>(t=n!=null?Jm(Qm(n)):{},eg(e||!n||!n.__esModule?Ll(t,"default",{value:n,enumerable:!0}):t,n));var Zt=_(os=>{var nr=class extends Error{constructor(e,t,r){super(r),Error.captureStackTrace(this,this.constructor),this.name=this.constructor.name,this.code=t,this.exitCode=e,this.nestedError=void 0}},ss=class extends nr{constructor(e){super(1,"commander.invalidArgument",e),Error.captureStackTrace(this,this.constructor),this.name=this.constructor.name}};os.CommanderError=nr;os.InvalidArgumentError=ss});var rr=_(ls=>{var{InvalidArgumentError:tg}=Zt(),as=class{constructor(e,t){switch(this.description=t||"",this.variadic=!1,this.parseArg=void 0,this.defaultValue=void 0,this.defaultValueDescription=void 0,this.argChoices=void 0,e[0]){case"<":this.required=!0,this._name=e.slice(1,-1);break;case"[":this.required=!1,this._name=e.slice(1,-1);break;default:this.required=!0,this._name=e;break}this._name.length>3&&this._name.slice(-3)==="..."&&(this.variadic=!0,this._name=this._name.slice(0,-3))}name(){return this._name}_concatValue(e,t){return t===this.defaultValue||!Array.isArray(t)?[e]:t.concat(e)}default(e,t){return this.defaultValue=e,this.defaultValueDescription=t,this}argParser(e){return this.parseArg=e,this}choices(e){return this.argChoices=e.slice(),this.parseArg=(t,r)=>{if(!this.argChoices.includes(t))throw new tg(`Allowed choices are ${this.argChoices.join(", ")}.`);return this.variadic?this._concatValue(t,r):t},this}argRequired(){return this.required=!0,this}argOptional(){return this.required=!1,this}};function ng(n){let e=n.name()+(n.variadic===!0?"...":"");return n.required?"<"+e+">":"["+e+"]"}ls.Argument=as;ls.humanReadableArgName=ng});var us=_(Sl=>{var{humanReadableArgName:rg}=rr(),cs=class{constructor(){this.helpWidth=void 0,this.sortSubcommands=!1,this.sortOptions=!1,this.showGlobalOptions=!1}visibleCommands(e){let t=e.commands.filter(r=>!r._hidden);if(e._hasImplicitHelpCommand()){let[,r,i]=e._helpCommandnameAndArgs.match(/([^ ]+) *(.*)/),s=e.createCommand(r).helpOption(!1);s.description(e._helpCommandDescription),i&&s.arguments(i),t.push(s)}return this.sortSubcommands&&t.sort((r,i)=>r.name().localeCompare(i.name())),t}compareOptions(e,t){let r=i=>i.short?i.short.replace(/^-/,""):i.long.replace(/^--/,"");return r(e).localeCompare(r(t))}visibleOptions(e){let t=e.options.filter(s=>!s.hidden),r=e._hasHelpOption&&e._helpShortFlag&&!e._findOption(e._helpShortFlag),i=e._hasHelpOption&&!e._findOption(e._helpLongFlag);if(r||i){let s;r?i?s=e.createOption(e._helpFlags,e._helpDescription):s=e.createOption(e._helpShortFlag,e._helpDescription):s=e.createOption(e._helpLongFlag,e._helpDescription),t.push(s)}return this.sortOptions&&t.sort(this.compareOptions),t}visibleGlobalOptions(e){if(!this.showGlobalOptions)return[];let t=[];for(let r=e.parent;r;r=r.parent){let i=r.options.filter(s=>!s.hidden);t.push(...i)}return this.sortOptions&&t.sort(this.compareOptions),t}visibleArguments(e){return e._argsDescription&&e._args.forEach(t=>{t.description=t.description||e._argsDescription[t.name()]||""}),e._args.find(t=>t.description)?e._args:[]}subcommandTerm(e){let t=e._args.map(r=>rg(r)).join(" ");return e._name+(e._aliases[0]?"|"+e._aliases[0]:"")+(e.options.length?" [options]":"")+(t?" "+t:"")}optionTerm(e){return e.flags}argumentTerm(e){return e.name()}longestSubcommandTermLength(e,t){return t.visibleCommands(e).reduce((r,i)=>Math.max(r,t.subcommandTerm(i).length),0)}longestOptionTermLength(e,t){return t.visibleOptions(e).reduce((r,i)=>Math.max(r,t.optionTerm(i).length),0)}longestGlobalOptionTermLength(e,t){return t.visibleGlobalOptions(e).reduce((r,i)=>Math.max(r,t.optionTerm(i).length),0)}longestArgumentTermLength(e,t){return t.visibleArguments(e).reduce((r,i)=>Math.max(r,t.argumentTerm(i).length),0)}commandUsage(e){let t=e._name;e._aliases[0]&&(t=t+"|"+e._aliases[0]);let r="";for(let i=e.parent;i;i=i.parent)r=i.name()+" "+r;return r+t+" "+e.usage()}commandDescription(e){return e.description()}subcommandDescription(e){return e.summary()||e.description()}optionDescription(e){let t=[];return e.argChoices&&t.push(`choices: ${e.argChoices.map(r=>JSON.stringify(r)).join(", ")}`),e.defaultValue!==void 0&&(e.required||e.optional||e.isBoolean()&&typeof e.defaultValue=="boolean")&&t.push(`default: ${e.defaultValueDescription||JSON.stringify(e.defaultValue)}`),e.presetArg!==void 0&&e.optional&&t.push(`preset: ${JSON.stringify(e.presetArg)}`),e.envVar!==void 0&&t.push(`env: ${e.envVar}`),t.length>0?`${e.description} (${t.join(", ")})`:e.description}argumentDescription(e){let t=[];if(e.argChoices&&t.push(`choices: ${e.argChoices.map(r=>JSON.stringify(r)).join(", ")}`),e.defaultValue!==void 0&&t.push(`default: ${e.defaultValueDescription||JSON.stringify(e.defaultValue)}`),t.length>0){let r=`(${t.join(", ")})`;return e.description?`${e.description} ${r}`:r}return e.description}formatHelp(e,t){let r=t.padWidth(e,t),i=t.helpWidth||80,s=2,o=2;function a(y,g){if(g){let m=`${y.padEnd(r+o)}${g}`;return t.wrap(m,i-s,r+o)}return y}function l(y){return y.join(`
`).replace(/^/gm," ".repeat(s))}let c=[`Usage: ${t.commandUsage(e)}`,""],u=t.commandDescription(e);u.length>0&&(c=c.concat([t.wrap(u,i,0),""]));let f=t.visibleArguments(e).map(y=>a(t.argumentTerm(y),t.argumentDescription(y)));f.length>0&&(c=c.concat(["Arguments:",l(f),""]));let p=t.visibleOptions(e).map(y=>a(t.optionTerm(y),t.optionDescription(y)));if(p.length>0&&(c=c.concat(["Options:",l(p),""])),this.showGlobalOptions){let y=t.visibleGlobalOptions(e).map(g=>a(t.optionTerm(g),t.optionDescription(g)));y.length>0&&(c=c.concat(["Global Options:",l(y),""]))}let h=t.visibleCommands(e).map(y=>a(t.subcommandTerm(y),t.subcommandDescription(y)));return h.length>0&&(c=c.concat(["Commands:",l(h),""])),c.join(`
`)}padWidth(e,t){return Math.max(t.longestOptionTermLength(e,t),t.longestGlobalOptionTermLength(e,t),t.longestSubcommandTermLength(e,t),t.longestArgumentTermLength(e,t))}wrap(e,t,r,i=40){let s=" \\f\\t\\v\xA0\u1680\u2000-\u200A\u202F\u205F\u3000\uFEFF",o=new RegExp(`[\\n][${s}]+`);if(e.match(o))return e;let a=t-r;if(a<i)return e;let l=e.slice(0,r),c=e.slice(r).replace(`\r
`,`
`),u=" ".repeat(r),p="\\s\u200B",h=new RegExp(`
|.{1,${a-1}}([${p}]|$)|[^${p}]+?([${p}]|$)`,"g"),y=c.match(h)||[];return l+y.map((g,m)=>g===`
`?"":(m>0?u:"")+g.trimEnd()).join(`
`)}};Sl.Help=cs});var ds=_(ir=>{var{InvalidArgumentError:ig}=Zt(),fs=class{constructor(e,t){this.flags=e,this.description=t||"",this.required=e.includes("<"),this.optional=e.includes("["),this.variadic=/\w\.\.\.[>\]]$/.test(e),this.mandatory=!1;let r=Al(e);this.short=r.shortFlag,this.long=r.longFlag,this.negate=!1,this.long&&(this.negate=this.long.startsWith("--no-")),this.defaultValue=void 0,this.defaultValueDescription=void 0,this.presetArg=void 0,this.envVar=void 0,this.parseArg=void 0,this.hidden=!1,this.argChoices=void 0,this.conflictsWith=[],this.implied=void 0}default(e,t){return this.defaultValue=e,this.defaultValueDescription=t,this}preset(e){return this.presetArg=e,this}conflicts(e){return this.conflictsWith=this.conflictsWith.concat(e),this}implies(e){let t=e;return typeof e=="string"&&(t={[e]:!0}),this.implied=Object.assign(this.implied||{},t),this}env(e){return this.envVar=e,this}argParser(e){return this.parseArg=e,this}makeOptionMandatory(e=!0){return this.mandatory=!!e,this}hideHelp(e=!0){return this.hidden=!!e,this}_concatValue(e,t){return t===this.defaultValue||!Array.isArray(t)?[e]:t.concat(e)}choices(e){return this.argChoices=e.slice(),this.parseArg=(t,r)=>{if(!this.argChoices.includes(t))throw new ig(`Allowed choices are ${this.argChoices.join(", ")}.`);return this.variadic?this._concatValue(t,r):t},this}name(){return this.long?this.long.replace(/^--/,""):this.short.replace(/^-/,"")}attributeName(){return sg(this.name().replace(/^no-/,""))}is(e){return this.short===e||this.long===e}isBoolean(){return!this.required&&!this.optional&&!this.negate}},hs=class{constructor(e){this.positiveOptions=new Map,this.negativeOptions=new Map,this.dualOptions=new Set,e.forEach(t=>{t.negate?this.negativeOptions.set(t.attributeName(),t):this.positiveOptions.set(t.attributeName(),t)}),this.negativeOptions.forEach((t,r)=>{this.positiveOptions.has(r)&&this.dualOptions.add(r)})}valueFromOption(e,t){let r=t.attributeName();if(!this.dualOptions.has(r))return!0;let i=this.negativeOptions.get(r).presetArg,s=i!==void 0?i:!1;return t.negate===(s===e)}};function sg(n){return n.split("-").reduce((e,t)=>e+t[0].toUpperCase()+t.slice(1))}function Al(n){let e,t,r=n.split(/[ |,]+/);return r.length>1&&!/^[[<]/.test(r[1])&&(e=r.shift()),t=r.shift(),!e&&/^-[^-]$/.test(t)&&(e=t,t=void 0),{shortFlag:e,longFlag:t}}ir.Option=fs;ir.splitOptionFlags=Al;ir.DualOptions=hs});var wl=_(Il=>{function og(n,e){if(Math.abs(n.length-e.length)>3)return Math.max(n.length,e.length);let t=[];for(let r=0;r<=n.length;r++)t[r]=[r];for(let r=0;r<=e.length;r++)t[0][r]=r;for(let r=1;r<=e.length;r++)for(let i=1;i<=n.length;i++){let s=1;n[i-1]===e[r-1]?s=0:s=1,t[i][r]=Math.min(t[i-1][r]+1,t[i][r-1]+1,t[i-1][r-1]+s),i>1&&r>1&&n[i-1]===e[r-2]&&n[i-2]===e[r-1]&&(t[i][r]=Math.min(t[i][r],t[i-2][r-2]+1))}return t[n.length][e.length]}function ag(n,e){if(!e||e.length===0)return"";e=Array.from(new Set(e));let t=n.startsWith("--");t&&(n=n.slice(2),e=e.map(o=>o.slice(2)));let r=[],i=3,s=.4;return e.forEach(o=>{if(o.length<=1)return;let a=og(n,o),l=Math.max(n.length,o.length);(l-a)/l>s&&(a<i?(i=a,r=[o]):a===i&&r.push(o))}),r.sort((o,a)=>o.localeCompare(a)),t&&(r=r.map(o=>`--${o}`)),r.length>1?`
(Did you mean one of ${r.join(", ")}?)`:r.length===1?`
(Did you mean ${r[0]}?)`:""}Il.suggestSimilar=ag});var Cl=_(Rl=>{var lg=require("events").EventEmitter,ps=require("child_process"),Ye=require("path"),_s=require("fs"),re=require("process"),{Argument:cg,humanReadableArgName:ug}=rr(),{CommanderError:ms}=Zt(),{Help:fg}=us(),{Option:vl,splitOptionFlags:hg,DualOptions:dg}=ds(),{suggestSimilar:bl}=wl(),gs=class n extends lg{constructor(e){super(),this.commands=[],this.options=[],this.parent=null,this._allowUnknownOption=!1,this._allowExcessArguments=!0,this._args=[],this.args=[],this.rawArgs=[],this.processedArgs=[],this._scriptPath=null,this._name=e||"",this._optionValues={},this._optionValueSources={},this._storeOptionsAsProperties=!1,this._actionHandler=null,this._executableHandler=!1,this._executableFile=null,this._executableDir=null,this._defaultCommandName=null,this._exitCallback=null,this._aliases=[],this._combineFlagAndOptionalValue=!0,this._description="",this._summary="",this._argsDescription=void 0,this._enablePositionalOptions=!1,this._passThroughOptions=!1,this._lifeCycleHooks={},this._showHelpAfterError=!1,this._showSuggestionAfterError=!0,this._outputConfiguration={writeOut:t=>re.stdout.write(t),writeErr:t=>re.stderr.write(t),getOutHelpWidth:()=>re.stdout.isTTY?re.stdout.columns:void 0,getErrHelpWidth:()=>re.stderr.isTTY?re.stderr.columns:void 0,outputError:(t,r)=>r(t)},this._hidden=!1,this._hasHelpOption=!0,this._helpFlags="-h, --help",this._helpDescription="display help for command",this._helpShortFlag="-h",this._helpLongFlag="--help",this._addImplicitHelpCommand=void 0,this._helpCommandName="help",this._helpCommandnameAndArgs="help [command]",this._helpCommandDescription="display help for command",this._helpConfiguration={}}copyInheritedSettings(e){return this._outputConfiguration=e._outputConfiguration,this._hasHelpOption=e._hasHelpOption,this._helpFlags=e._helpFlags,this._helpDescription=e._helpDescription,this._helpShortFlag=e._helpShortFlag,this._helpLongFlag=e._helpLongFlag,this._helpCommandName=e._helpCommandName,this._helpCommandnameAndArgs=e._helpCommandnameAndArgs,this._helpCommandDescription=e._helpCommandDescription,this._helpConfiguration=e._helpConfiguration,this._exitCallback=e._exitCallback,this._storeOptionsAsProperties=e._storeOptionsAsProperties,this._combineFlagAndOptionalValue=e._combineFlagAndOptionalValue,this._allowExcessArguments=e._allowExcessArguments,this._enablePositionalOptions=e._enablePositionalOptions,this._showHelpAfterError=e._showHelpAfterError,this._showSuggestionAfterError=e._showSuggestionAfterError,this}command(e,t,r){let i=t,s=r;typeof i=="object"&&i!==null&&(s=i,i=null),s=s||{};let[,o,a]=e.match(/([^ ]+) *(.*)/),l=this.createCommand(o);return i&&(l.description(i),l._executableHandler=!0),s.isDefault&&(this._defaultCommandName=l._name),l._hidden=!!(s.noHelp||s.hidden),l._executableFile=s.executableFile||null,a&&l.arguments(a),this.commands.push(l),l.parent=this,l.copyInheritedSettings(this),i?this:l}createCommand(e){return new n(e)}createHelp(){return Object.assign(new fg,this.configureHelp())}configureHelp(e){return e===void 0?this._helpConfiguration:(this._helpConfiguration=e,this)}configureOutput(e){return e===void 0?this._outputConfiguration:(Object.assign(this._outputConfiguration,e),this)}showHelpAfterError(e=!0){return typeof e!="string"&&(e=!!e),this._showHelpAfterError=e,this}showSuggestionAfterError(e=!0){return this._showSuggestionAfterError=!!e,this}addCommand(e,t){if(!e._name)throw new Error(`Command passed to .addCommand() must have a name
- specify the name in Command constructor or using .name()`);return t=t||{},t.isDefault&&(this._defaultCommandName=e._name),(t.noHelp||t.hidden)&&(e._hidden=!0),this.commands.push(e),e.parent=this,this}createArgument(e,t){return new cg(e,t)}argument(e,t,r,i){let s=this.createArgument(e,t);return typeof r=="function"?s.default(i).argParser(r):s.default(r),this.addArgument(s),this}arguments(e){return e.trim().split(/ +/).forEach(t=>{this.argument(t)}),this}addArgument(e){let t=this._args.slice(-1)[0];if(t&&t.variadic)throw new Error(`only the last argument can be variadic '${t.name()}'`);if(e.required&&e.defaultValue!==void 0&&e.parseArg===void 0)throw new Error(`a default value for a required argument is never used: '${e.name()}'`);return this._args.push(e),this}addHelpCommand(e,t){return e===!1?this._addImplicitHelpCommand=!1:(this._addImplicitHelpCommand=!0,typeof e=="string"&&(this._helpCommandName=e.split(" ")[0],this._helpCommandnameAndArgs=e),this._helpCommandDescription=t||this._helpCommandDescription),this}_hasImplicitHelpCommand(){return this._addImplicitHelpCommand===void 0?this.commands.length&&!this._actionHandler&&!this._findCommand("help"):this._addImplicitHelpCommand}hook(e,t){let r=["preSubcommand","preAction","postAction"];if(!r.includes(e))throw new Error(`Unexpected value for event passed to hook : '${e}'.
Expecting one of '${r.join("', '")}'`);return this._lifeCycleHooks[e]?this._lifeCycleHooks[e].push(t):this._lifeCycleHooks[e]=[t],this}exitOverride(e){return e?this._exitCallback=e:this._exitCallback=t=>{if(t.code!=="commander.executeSubCommandAsync")throw t},this}_exit(e,t,r){this._exitCallback&&this._exitCallback(new ms(e,t,r)),re.exit(e)}action(e){let t=r=>{let i=this._args.length,s=r.slice(0,i);return this._storeOptionsAsProperties?s[i]=this:s[i]=this.opts(),s.push(this),e.apply(this,s)};return this._actionHandler=t,this}createOption(e,t){return new vl(e,t)}addOption(e){let t=e.name(),r=e.attributeName();if(e.negate){let s=e.long.replace(/^--no-/,"--");this._findOption(s)||this.setOptionValueWithSource(r,e.defaultValue===void 0?!0:e.defaultValue,"default")}else e.defaultValue!==void 0&&this.setOptionValueWithSource(r,e.defaultValue,"default");this.options.push(e);let i=(s,o,a)=>{s==null&&e.presetArg!==void 0&&(s=e.presetArg);let l=this.getOptionValue(r);if(s!==null&&e.parseArg)try{s=e.parseArg(s,l)}catch(c){if(c.code==="commander.invalidArgument"){let u=`${o} ${c.message}`;this.error(u,{exitCode:c.exitCode,code:c.code})}throw c}else s!==null&&e.variadic&&(s=e._concatValue(s,l));s==null&&(e.negate?s=!1:e.isBoolean()||e.optional?s=!0:s=""),this.setOptionValueWithSource(r,s,a)};return this.on("option:"+t,s=>{let o=`error: option '${e.flags}' argument '${s}' is invalid.`;i(s,o,"cli")}),e.envVar&&this.on("optionEnv:"+t,s=>{let o=`error: option '${e.flags}' value '${s}' from env '${e.envVar}' is invalid.`;i(s,o,"env")}),this}_optionEx(e,t,r,i,s){if(typeof t=="object"&&t instanceof vl)throw new Error("To add an Option object use addOption() instead of option() or requiredOption()");let o=this.createOption(t,r);if(o.makeOptionMandatory(!!e.mandatory),typeof i=="function")o.default(s).argParser(i);else if(i instanceof RegExp){let a=i;i=(l,c)=>{let u=a.exec(l);return u?u[0]:c},o.default(s).argParser(i)}else o.default(i);return this.addOption(o)}option(e,t,r,i){return this._optionEx({},e,t,r,i)}requiredOption(e,t,r,i){return this._optionEx({mandatory:!0},e,t,r,i)}combineFlagAndOptionalValue(e=!0){return this._combineFlagAndOptionalValue=!!e,this}allowUnknownOption(e=!0){return this._allowUnknownOption=!!e,this}allowExcessArguments(e=!0){return this._allowExcessArguments=!!e,this}enablePositionalOptions(e=!0){return this._enablePositionalOptions=!!e,this}passThroughOptions(e=!0){if(this._passThroughOptions=!!e,this.parent&&e&&!this.parent._enablePositionalOptions)throw new Error("passThroughOptions can not be used without turning on enablePositionalOptions for parent command(s)");return this}storeOptionsAsProperties(e=!0){if(this._storeOptionsAsProperties=!!e,this.options.length)throw new Error("call .storeOptionsAsProperties() before adding options");return this}getOptionValue(e){return this._storeOptionsAsProperties?this[e]:this._optionValues[e]}setOptionValue(e,t){return this.setOptionValueWithSource(e,t,void 0)}setOptionValueWithSource(e,t,r){return this._storeOptionsAsProperties?this[e]=t:this._optionValues[e]=t,this._optionValueSources[e]=r,this}getOptionValueSource(e){return this._optionValueSources[e]}getOptionValueSourceWithGlobals(e){let t;return en(this).forEach(r=>{r.getOptionValueSource(e)!==void 0&&(t=r.getOptionValueSource(e))}),t}_prepareUserArgs(e,t){if(e!==void 0&&!Array.isArray(e))throw new Error("first parameter to parse must be array or undefined");t=t||{},e===void 0&&(e=re.argv,re.versions&&re.versions.electron&&(t.from="electron")),this.rawArgs=e.slice();let r;switch(t.from){case void 0:case"node":this._scriptPath=e[1],r=e.slice(2);break;case"electron":re.defaultApp?(this._scriptPath=e[1],r=e.slice(2)):r=e.slice(1);break;case"user":r=e.slice(0);break;default:throw new Error(`unexpected parse option { from: '${t.from}' }`)}return!this._name&&this._scriptPath&&this.nameFromFilename(this._scriptPath),this._name=this._name||"program",r}parse(e,t){let r=this._prepareUserArgs(e,t);return this._parseCommand([],r),this}async parseAsync(e,t){let r=this._prepareUserArgs(e,t);return await this._parseCommand([],r),this}_executeSubCommand(e,t){t=t.slice();let r=!1,i=[".js",".ts",".tsx",".mjs",".cjs"];function s(u,f){let p=Ye.resolve(u,f);if(_s.existsSync(p))return p;if(i.includes(Ye.extname(f)))return;let h=i.find(y=>_s.existsSync(`${p}${y}`));if(h)return`${p}${h}`}this._checkForMissingMandatoryOptions(),this._checkForConflictingOptions();let o=e._executableFile||`${this._name}-${e._name}`,a=this._executableDir||"";if(this._scriptPath){let u;try{u=_s.realpathSync(this._scriptPath)}catch{u=this._scriptPath}a=Ye.resolve(Ye.dirname(u),a)}if(a){let u=s(a,o);if(!u&&!e._executableFile&&this._scriptPath){let f=Ye.basename(this._scriptPath,Ye.extname(this._scriptPath));f!==this._name&&(u=s(a,`${f}-${e._name}`))}o=u||o}r=i.includes(Ye.extname(o));let l;re.platform!=="win32"?r?(t.unshift(o),t=Ol(re.execArgv).concat(t),l=ps.spawn(re.argv[0],t,{stdio:"inherit"})):l=ps.spawn(o,t,{stdio:"inherit"}):(t.unshift(o),t=Ol(re.execArgv).concat(t),l=ps.spawn(re.execPath,t,{stdio:"inherit"})),l.killed||["SIGUSR1","SIGUSR2","SIGTERM","SIGINT","SIGHUP"].forEach(f=>{re.on(f,()=>{l.killed===!1&&l.exitCode===null&&l.kill(f)})});let c=this._exitCallback;c?l.on("close",()=>{c(new ms(re.exitCode||0,"commander.executeSubCommandAsync","(close)"))}):l.on("close",re.exit.bind(re)),l.on("error",u=>{if(u.code==="ENOENT"){let f=a?`searched for local subcommand relative to directory '${a}'`:"no directory for search for local subcommand, use .executableDir() to supply a custom directory",p=`'${o}' does not exist
 - if '${e._name}' is not meant to be an executable command, remove description parameter from '.command()' and use '.description()' instead
 - if the default executable name is not suitable, use the executableFile option to supply a custom name or path
 - ${f}`;throw new Error(p)}else if(u.code==="EACCES")throw new Error(`'${o}' not executable`);if(!c)re.exit(1);else{let f=new ms(1,"commander.executeSubCommandAsync","(error)");f.nestedError=u,c(f)}}),this.runningCommand=l}_dispatchSubcommand(e,t,r){let i=this._findCommand(e);i||this.help({error:!0});let s;return s=this._chainOrCallSubCommandHook(s,i,"preSubcommand"),s=this._chainOrCall(s,()=>{if(i._executableHandler)this._executeSubCommand(i,t.concat(r));else return i._parseCommand(t,r)}),s}_dispatchHelpCommand(e){e||this.help();let t=this._findCommand(e);return t&&!t._executableHandler&&t.help(),this._dispatchSubcommand(e,[],[this._helpLongFlag])}_checkNumberOfArguments(){this._args.forEach((e,t)=>{e.required&&this.args[t]==null&&this.missingArgument(e.name())}),!(this._args.length>0&&this._args[this._args.length-1].variadic)&&this.args.length>this._args.length&&this._excessArguments(this.args)}_processArguments(){let e=(r,i,s)=>{let o=i;if(i!==null&&r.parseArg)try{o=r.parseArg(i,s)}catch(a){if(a.code==="commander.invalidArgument"){let l=`error: command-argument value '${i}' is invalid for argument '${r.name()}'. ${a.message}`;this.error(l,{exitCode:a.exitCode,code:a.code})}throw a}return o};this._checkNumberOfArguments();let t=[];this._args.forEach((r,i)=>{let s=r.defaultValue;r.variadic?i<this.args.length?(s=this.args.slice(i),r.parseArg&&(s=s.reduce((o,a)=>e(r,a,o),r.defaultValue))):s===void 0&&(s=[]):i<this.args.length&&(s=this.args[i],r.parseArg&&(s=e(r,s,r.defaultValue))),t[i]=s}),this.processedArgs=t}_chainOrCall(e,t){return e&&e.then&&typeof e.then=="function"?e.then(()=>t()):t()}_chainOrCallHooks(e,t){let r=e,i=[];return en(this).reverse().filter(s=>s._lifeCycleHooks[t]!==void 0).forEach(s=>{s._lifeCycleHooks[t].forEach(o=>{i.push({hookedCommand:s,callback:o})})}),t==="postAction"&&i.reverse(),i.forEach(s=>{r=this._chainOrCall(r,()=>s.callback(s.hookedCommand,this))}),r}_chainOrCallSubCommandHook(e,t,r){let i=e;return this._lifeCycleHooks[r]!==void 0&&this._lifeCycleHooks[r].forEach(s=>{i=this._chainOrCall(i,()=>s(this,t))}),i}_parseCommand(e,t){let r=this.parseOptions(t);if(this._parseOptionsEnv(),this._parseOptionsImplied(),e=e.concat(r.operands),t=r.unknown,this.args=e.concat(t),e&&this._findCommand(e[0]))return this._dispatchSubcommand(e[0],e.slice(1),t);if(this._hasImplicitHelpCommand()&&e[0]===this._helpCommandName)return this._dispatchHelpCommand(e[1]);if(this._defaultCommandName)return Nl(this,t),this._dispatchSubcommand(this._defaultCommandName,e,t);this.commands.length&&this.args.length===0&&!this._actionHandler&&!this._defaultCommandName&&this.help({error:!0}),Nl(this,r.unknown),this._checkForMissingMandatoryOptions(),this._checkForConflictingOptions();let i=()=>{r.unknown.length>0&&this.unknownOption(r.unknown[0])},s=`command:${this.name()}`;if(this._actionHandler){i(),this._processArguments();let o;return o=this._chainOrCallHooks(o,"preAction"),o=this._chainOrCall(o,()=>this._actionHandler(this.processedArgs)),this.parent&&(o=this._chainOrCall(o,()=>{this.parent.emit(s,e,t)})),o=this._chainOrCallHooks(o,"postAction"),o}if(this.parent&&this.parent.listenerCount(s))i(),this._processArguments(),this.parent.emit(s,e,t);else if(e.length){if(this._findCommand("*"))return this._dispatchSubcommand("*",e,t);this.listenerCount("command:*")?this.emit("command:*",e,t):this.commands.length?this.unknownCommand():(i(),this._processArguments())}else this.commands.length?(i(),this.help({error:!0})):(i(),this._processArguments())}_findCommand(e){if(e)return this.commands.find(t=>t._name===e||t._aliases.includes(e))}_findOption(e){return this.options.find(t=>t.is(e))}_checkForMissingMandatoryOptions(){for(let e=this;e;e=e.parent)e.options.forEach(t=>{t.mandatory&&e.getOptionValue(t.attributeName())===void 0&&e.missingMandatoryOptionValue(t)})}_checkForConflictingLocalOptions(){let e=this.options.filter(r=>{let i=r.attributeName();return this.getOptionValue(i)===void 0?!1:this.getOptionValueSource(i)!=="default"});e.filter(r=>r.conflictsWith.length>0).forEach(r=>{let i=e.find(s=>r.conflictsWith.includes(s.attributeName()));i&&this._conflictingOption(r,i)})}_checkForConflictingOptions(){for(let e=this;e;e=e.parent)e._checkForConflictingLocalOptions()}parseOptions(e){let t=[],r=[],i=t,s=e.slice();function o(l){return l.length>1&&l[0]==="-"}let a=null;for(;s.length;){let l=s.shift();if(l==="--"){i===r&&i.push(l),i.push(...s);break}if(a&&!o(l)){this.emit(`option:${a.name()}`,l);continue}if(a=null,o(l)){let c=this._findOption(l);if(c){if(c.required){let u=s.shift();u===void 0&&this.optionMissingArgument(c),this.emit(`option:${c.name()}`,u)}else if(c.optional){let u=null;s.length>0&&!o(s[0])&&(u=s.shift()),this.emit(`option:${c.name()}`,u)}else this.emit(`option:${c.name()}`);a=c.variadic?c:null;continue}}if(l.length>2&&l[0]==="-"&&l[1]!=="-"){let c=this._findOption(`-${l[1]}`);if(c){c.required||c.optional&&this._combineFlagAndOptionalValue?this.emit(`option:${c.name()}`,l.slice(2)):(this.emit(`option:${c.name()}`),s.unshift(`-${l.slice(2)}`));continue}}if(/^--[^=]+=/.test(l)){let c=l.indexOf("="),u=this._findOption(l.slice(0,c));if(u&&(u.required||u.optional)){this.emit(`option:${u.name()}`,l.slice(c+1));continue}}if(o(l)&&(i=r),(this._enablePositionalOptions||this._passThroughOptions)&&t.length===0&&r.length===0){if(this._findCommand(l)){t.push(l),s.length>0&&r.push(...s);break}else if(l===this._helpCommandName&&this._hasImplicitHelpCommand()){t.push(l),s.length>0&&t.push(...s);break}else if(this._defaultCommandName){r.push(l),s.length>0&&r.push(...s);break}}if(this._passThroughOptions){i.push(l),s.length>0&&i.push(...s);break}i.push(l)}return{operands:t,unknown:r}}opts(){if(this._storeOptionsAsProperties){let e={},t=this.options.length;for(let r=0;r<t;r++){let i=this.options[r].attributeName();e[i]=i===this._versionOptionName?this._version:this[i]}return e}return this._optionValues}optsWithGlobals(){return en(this).reduce((e,t)=>Object.assign(e,t.opts()),{})}error(e,t){this._outputConfiguration.outputError(`${e}
`,this._outputConfiguration.writeErr),typeof this._showHelpAfterError=="string"?this._outputConfiguration.writeErr(`${this._showHelpAfterError}
`):this._showHelpAfterError&&(this._outputConfiguration.writeErr(`
`),this.outputHelp({error:!0}));let r=t||{},i=r.exitCode||1,s=r.code||"commander.error";this._exit(i,s,e)}_parseOptionsEnv(){this.options.forEach(e=>{if(e.envVar&&e.envVar in re.env){let t=e.attributeName();(this.getOptionValue(t)===void 0||["default","config","env"].includes(this.getOptionValueSource(t)))&&(e.required||e.optional?this.emit(`optionEnv:${e.name()}`,re.env[e.envVar]):this.emit(`optionEnv:${e.name()}`))}})}_parseOptionsImplied(){let e=new dg(this.options),t=r=>this.getOptionValue(r)!==void 0&&!["default","implied"].includes(this.getOptionValueSource(r));this.options.filter(r=>r.implied!==void 0&&t(r.attributeName())&&e.valueFromOption(this.getOptionValue(r.attributeName()),r)).forEach(r=>{Object.keys(r.implied).filter(i=>!t(i)).forEach(i=>{this.setOptionValueWithSource(i,r.implied[i],"implied")})})}missingArgument(e){let t=`error: missing required argument '${e}'`;this.error(t,{code:"commander.missingArgument"})}optionMissingArgument(e){let t=`error: option '${e.flags}' argument missing`;this.error(t,{code:"commander.optionMissingArgument"})}missingMandatoryOptionValue(e){let t=`error: required option '${e.flags}' not specified`;this.error(t,{code:"commander.missingMandatoryOptionValue"})}_conflictingOption(e,t){let r=o=>{let a=o.attributeName(),l=this.getOptionValue(a),c=this.options.find(f=>f.negate&&a===f.attributeName()),u=this.options.find(f=>!f.negate&&a===f.attributeName());return c&&(c.presetArg===void 0&&l===!1||c.presetArg!==void 0&&l===c.presetArg)?c:u||o},i=o=>{let a=r(o),l=a.attributeName();return this.getOptionValueSource(l)==="env"?`environment variable '${a.envVar}'`:`option '${a.flags}'`},s=`error: ${i(e)} cannot be used with ${i(t)}`;this.error(s,{code:"commander.conflictingOption"})}unknownOption(e){if(this._allowUnknownOption)return;let t="";if(e.startsWith("--")&&this._showSuggestionAfterError){let i=[],s=this;do{let o=s.createHelp().visibleOptions(s).filter(a=>a.long).map(a=>a.long);i=i.concat(o),s=s.parent}while(s&&!s._enablePositionalOptions);t=bl(e,i)}let r=`error: unknown option '${e}'${t}`;this.error(r,{code:"commander.unknownOption"})}_excessArguments(e){if(this._allowExcessArguments)return;let t=this._args.length,r=t===1?"":"s",s=`error: too many arguments${this.parent?` for '${this.name()}'`:""}. Expected ${t} argument${r} but got ${e.length}.`;this.error(s,{code:"commander.excessArguments"})}unknownCommand(){let e=this.args[0],t="";if(this._showSuggestionAfterError){let i=[];this.createHelp().visibleCommands(this).forEach(s=>{i.push(s.name()),s.alias()&&i.push(s.alias())}),t=bl(e,i)}let r=`error: unknown command '${e}'${t}`;this.error(r,{code:"commander.unknownCommand"})}version(e,t,r){if(e===void 0)return this._version;this._version=e,t=t||"-V, --version",r=r||"output the version number";let i=this.createOption(t,r);return this._versionOptionName=i.attributeName(),this.options.push(i),this.on("option:"+i.name(),()=>{this._outputConfiguration.writeOut(`${e}
`),this._exit(0,"commander.version",e)}),this}description(e,t){return e===void 0&&t===void 0?this._description:(this._description=e,t&&(this._argsDescription=t),this)}summary(e){return e===void 0?this._summary:(this._summary=e,this)}alias(e){if(e===void 0)return this._aliases[0];let t=this;if(this.commands.length!==0&&this.commands[this.commands.length-1]._executableHandler&&(t=this.commands[this.commands.length-1]),e===t._name)throw new Error("Command alias can't be the same as its name");return t._aliases.push(e),this}aliases(e){return e===void 0?this._aliases:(e.forEach(t=>this.alias(t)),this)}usage(e){if(e===void 0){if(this._usage)return this._usage;let t=this._args.map(r=>ug(r));return[].concat(this.options.length||this._hasHelpOption?"[options]":[],this.commands.length?"[command]":[],this._args.length?t:[]).join(" ")}return this._usage=e,this}name(e){return e===void 0?this._name:(this._name=e,this)}nameFromFilename(e){return this._name=Ye.basename(e,Ye.extname(e)),this}executableDir(e){return e===void 0?this._executableDir:(this._executableDir=e,this)}helpInformation(e){let t=this.createHelp();return t.helpWidth===void 0&&(t.helpWidth=e&&e.error?this._outputConfiguration.getErrHelpWidth():this._outputConfiguration.getOutHelpWidth()),t.formatHelp(this,t)}_getHelpContext(e){e=e||{};let t={error:!!e.error},r;return t.error?r=i=>this._outputConfiguration.writeErr(i):r=i=>this._outputConfiguration.writeOut(i),t.write=e.write||r,t.command=this,t}outputHelp(e){let t;typeof e=="function"&&(t=e,e=void 0);let r=this._getHelpContext(e);en(this).reverse().forEach(s=>s.emit("beforeAllHelp",r)),this.emit("beforeHelp",r);let i=this.helpInformation(r);if(t&&(i=t(i),typeof i!="string"&&!Buffer.isBuffer(i)))throw new Error("outputHelp callback must return a string or a Buffer");r.write(i),this.emit(this._helpLongFlag),this.emit("afterHelp",r),en(this).forEach(s=>s.emit("afterAllHelp",r))}helpOption(e,t){if(typeof e=="boolean")return this._hasHelpOption=e,this;this._helpFlags=e||this._helpFlags,this._helpDescription=t||this._helpDescription;let r=hg(this._helpFlags);return this._helpShortFlag=r.shortFlag,this._helpLongFlag=r.longFlag,this}help(e){this.outputHelp(e);let t=re.exitCode||0;t===0&&e&&typeof e!="function"&&e.error&&(t=1),this._exit(t,"commander.help","(outputHelp)")}addHelpText(e,t){let r=["beforeAll","before","after","afterAll"];if(!r.includes(e))throw new Error(`Unexpected value for position to addHelpText.
Expecting one of '${r.join("', '")}'`);let i=`${e}Help`;return this.on(i,s=>{let o;typeof t=="function"?o=t({error:s.error,command:s.command}):o=t,o&&s.write(`${o}
`)}),this}};function Nl(n,e){n._hasHelpOption&&e.find(r=>r===n._helpLongFlag||r===n._helpShortFlag)&&(n.outputHelp(),n._exit(0,"commander.helpDisplayed","(outputHelp)"))}function Ol(n){return n.map(e=>{if(!e.startsWith("--inspect"))return e;let t,r="127.0.0.1",i="9229",s;return(s=e.match(/^(--inspect(-brk)?)$/))!==null?t=s[1]:(s=e.match(/^(--inspect(-brk|-port)?)=([^:]+)$/))!==null?(t=s[1],/^\d+$/.test(s[3])?i=s[3]:r=s[3]):(s=e.match(/^(--inspect(-brk|-port)?)=([^:]+):(\d+)$/))!==null&&(t=s[1],r=s[3],i=s[4]),t&&i!=="0"?`${t}=${r}:${parseInt(i)+1}`:e})}function en(n){let e=[];for(let t=n;t;t=t.parent)e.push(t);return e}Rl.Command=gs});var ql=_((Fe,$l)=>{var{Argument:pg}=rr(),{Command:Pl}=Cl(),{CommanderError:_g,InvalidArgumentError:kl}=Zt(),{Help:mg}=us(),{Option:gg}=ds();Fe=$l.exports=new Pl;Fe.program=Fe;Fe.Argument=pg;Fe.Command=Pl;Fe.CommanderError=_g;Fe.Help=mg;Fe.InvalidArgumentError=kl;Fe.InvalidOptionArgumentError=kl;Fe.Option=gg});var Fl=_((Rb,sr)=>{"use strict";var yg=(()=>{let i={},s={font:"Standard",fontPath:"./fonts"};function o(T,A){let d={},E,S,I,P,N=[[16384,"vLayout",2],[8192,"vLayout",1],[4096,"vRule5",!0],[2048,"vRule4",!0],[1024,"vRule3",!0],[512,"vRule2",!0],[256,"vRule1",!0],[128,"hLayout",2],[64,"hLayout",1],[32,"hRule6",!0],[16,"hRule5",!0],[8,"hRule4",!0],[4,"hRule3",!0],[2,"hRule2",!0],[1,"hRule1",!0]];for(E=A!==null?A:T,S=0,I=N.length;S<I;)P=N[S],E>=P[0]?(E=E-P[0],d[P[1]]=typeof d[P[1]]>"u"?P[2]:d[P[1]]):P[1]!=="vLayout"&&P[1]!=="hLayout"&&(d[P[1]]=!1),S++;return typeof d.hLayout>"u"?T===0?d.hLayout=1:T===-1?d.hLayout=0:d.hRule1||d.hRule2||d.hRule3||d.hRule4||d.hRule5||d.hRule6?d.hLayout=3:d.hLayout=2:d.hLayout===2&&(d.hRule1||d.hRule2||d.hRule3||d.hRule4||d.hRule5||d.hRule6)&&(d.hLayout=3),typeof d.vLayout>"u"?d.vRule1||d.vRule2||d.vRule3||d.vRule4||d.vRule5?d.vLayout=3:d.vLayout=0:d.vLayout===2&&(d.vRule1||d.vRule2||d.vRule3||d.vRule4||d.vRule5)&&(d.vLayout=3),d}function a(T,A,d){return T===A&&T!==d?T:!1}function l(T,A){let d="|/\\[]{}()<>";if(T==="_"){if(d.indexOf(A)!==-1)return A}else if(A==="_"&&d.indexOf(T)!==-1)return T;return!1}function c(T,A){let d="| /\\ [] {} () <>",E=d.indexOf(T),S=d.indexOf(A);if(E!==-1&&S!==-1&&E!==S&&Math.abs(E-S)!==1){let I=Math.max(E,S),P=I+1;return d.substring(I,P)}return!1}function u(T,A){let d="[] {} ()",E=d.indexOf(T),S=d.indexOf(A);return E!==-1&&S!==-1&&Math.abs(E-S)<=1?"|":!1}function f(T,A){let d="/\\ \\/ ><",E={0:"|",3:"Y",6:"X"},S=d.indexOf(T),I=d.indexOf(A);return S!==-1&&I!==-1&&I-S===1?E[S]:!1}function p(T,A,d){return T===d&&A===d?d:!1}function h(T,A){return T===A?T:!1}function y(T,A){let d="|/\\[]{}()<>";if(T==="_"){if(d.indexOf(A)!==-1)return A}else if(A==="_"&&d.indexOf(T)!==-1)return T;return!1}function g(T,A){let d="| /\\ [] {} () <>",E=d.indexOf(T),S=d.indexOf(A);if(E!==-1&&S!==-1&&E!==S&&Math.abs(E-S)!==1){let I=Math.max(E,S),P=I+1;return d.substring(I,P)}return!1}function m(T,A){return T==="-"&&A==="_"||T==="_"&&A==="-"?"=":!1}function L(T,A){return T==="|"&&A==="|"?"|":!1}function w(T,A,d){return A===" "||A===""||A===d&&T!==" "?T:A}function b(T,A,d){if(d.fittingRules.vLayout===0)return"invalid";let E,S=Math.min(T.length,A.length),I,P,N=!1,O;if(S===0)return"invalid";for(E=0;E<S;E++)if(I=T.substring(E,E+1),P=A.substring(E,E+1),I!==" "&&P!==" "){if(d.fittingRules.vLayout===1)return"invalid";if(d.fittingRules.vLayout===2)return"end";if(L(I,P)){N=N||!1;continue}if(O=!1,O=d.fittingRules.vRule1?h(I,P):O,O=!O&&d.fittingRules.vRule2?y(I,P):O,O=!O&&d.fittingRules.vRule3?g(I,P):O,O=!O&&d.fittingRules.vRule4?m(I,P):O,N=!0,!O)return"invalid"}return N?"end":"valid"}function $(T,A,d){let E=T.length,S=T.length,I=A.length,P,N,O,x=1,Z,ne,B;for(;x<=E;){for(P=T.slice(Math.max(0,S-x),S),N=A.slice(0,Math.min(E,x)),O=N.length,B="",Z=0;Z<O;Z++)if(ne=b(P[Z],N[Z],d),ne==="end")B=ne;else if(ne==="invalid"){B=ne;break}else B===""&&(B="valid");if(B==="invalid"){x--;break}if(B==="end")break;B==="valid"&&x++}return Math.min(E,x)}function M(T,A,d){let E,S=Math.min(T.length,A.length),I,P,N="",O;for(E=0;E<S;E++)I=T.substring(E,E+1),P=A.substring(E,E+1),I!==" "&&P!==" "?d.fittingRules.vLayout===1||d.fittingRules.vLayout===2?N+=w(I,P):(O=!1,O=d.fittingRules.vRule5?L(I,P):O,O=!O&&d.fittingRules.vRule1?h(I,P):O,O=!O&&d.fittingRules.vRule2?y(I,P):O,O=!O&&d.fittingRules.vRule3?g(I,P):O,O=!O&&d.fittingRules.vRule4?m(I,P):O,N+=O):N+=w(I,P);return N}function v(T,A,d,E){let S=T.length,I=A.length,P=T.slice(0,Math.max(0,S-d)),N=T.slice(Math.max(0,S-d),S),O=A.slice(0,Math.min(d,I)),x,Z,ne,B=[],Q,Ce=[];for(Z=N.length,x=0;x<Z;x++)x>=I?ne=N[x]:ne=M(N[x],O[x],E),B.push(ne);return Q=A.slice(Math.min(d,I),I),Ce.concat(P,B,Q)}function V(T,A){let d,E=T.length,S="";for(d=0;d<A;d++)S+=" ";for(d=0;d<E;d++)T[d]+=S}function G(T,A,d){let E=T[0].length,S=A[0].length,I;return E>S?V(A,E-S):S>E&&V(T,S-E),I=$(T,A,d),v(T,A,I,d)}function k(T,A,d){if(d.fittingRules.hLayout===0)return 0;let E,S=T.length,I=A.length,P=S,N=1,O=!1,x=!1,Z,ne,B,Q;if(S===0)return 0;e:for(;N<=P;){let Ce=S-N;for(Z=T.substring(Ce,Ce+N),ne=A.substring(0,Math.min(N,I)),E=0;E<Math.min(N,I);E++)if(B=Z.substring(E,E+1),Q=ne.substring(E,E+1),B!==" "&&Q!==" "){if(d.fittingRules.hLayout===1){N=N-1;break e}else if(d.fittingRules.hLayout===2){(B===d.hardBlank||Q===d.hardBlank)&&(N=N-1);break e}else if(O=!0,x=!1,x=d.fittingRules.hRule1?a(B,Q,d.hardBlank):x,x=!x&&d.fittingRules.hRule2?l(B,Q,d.hardBlank):x,x=!x&&d.fittingRules.hRule3?c(B,Q,d.hardBlank):x,x=!x&&d.fittingRules.hRule4?u(B,Q,d.hardBlank):x,x=!x&&d.fittingRules.hRule5?f(B,Q,d.hardBlank):x,x=!x&&d.fittingRules.hRule6?p(B,Q,d.hardBlank):x,!x){N=N-1;break e}}if(O)break;N++}return Math.min(P,N)}function j(T,A,d,E){let S,I,P=[],N,O,x,Z,ne,B,Q,Ce;for(S=0;S<E.height;S++){Q=T[S],Ce=A[S],ne=Q.length,B=Ce.length,N=ne-d,O=Q.substr(0,Math.max(0,N)),x="";let Tl=Math.max(0,ne-d);var vt=Q.substring(Tl,Tl+d),tr=Ce.substring(0,Math.min(d,B));for(I=0;I<d;I++){var ae=I<ne?vt.substring(I,I+1):" ",_e=I<B?tr.substring(I,I+1):" ";if(ae!==" "&&_e!==" ")if(E.fittingRules.hLayout===1)x+=w(ae,_e,E.hardBlank);else if(E.fittingRules.hLayout===2)x+=w(ae,_e,E.hardBlank);else{var ee="";ee=!ee&&E.fittingRules.hRule1?a(ae,_e,E.hardBlank):ee,ee=!ee&&E.fittingRules.hRule2?l(ae,_e,E.hardBlank):ee,ee=!ee&&E.fittingRules.hRule3?c(ae,_e,E.hardBlank):ee,ee=!ee&&E.fittingRules.hRule4?u(ae,_e,E.hardBlank):ee,ee=!ee&&E.fittingRules.hRule5?f(ae,_e,E.hardBlank):ee,ee=!ee&&E.fittingRules.hRule6?p(ae,_e,E.hardBlank):ee,ee=ee||w(ae,_e,E.hardBlank),x+=ee}else x+=w(ae,_e,E.hardBlank)}d>=B?Z="":Z=Ce.substring(d,d+Math.max(0,B-d)),P[S]=O+x+Z}return P}function F(T){let A=[],d;for(d=0;d<T;d++)A[d]="";return A}let D=function(T){return Math.max.apply(Math,T.map(function(A,d){return A.length}))};function X(T,A,d){return T.reduce(function(E,S){return j(E,S.fig,S.overlap,d)},F(A))}function ie(T,A,d){let E={};for(let S=T.length;--S;){let I=X(T.slice(0,S),A,d);if(D(I)<=d.width){E.outputFigText=I,S<T.length?E.chars=T.slice(S):E.chars=[];break}}return E}function K(T,A,d){let E,S,I=0,P,N,O,x=d.height,Z=[],ne,B,Q=[],Ce,vt,tr,ae,_e;for(N=F(x),d.width>0&&d.whitespaceBreak&&(B={chars:[],overlap:I}),d.printDirection===1&&(T=T.split("").reverse().join("")),O=T.length,E=0;E<O;E++)if(Ce=T.substring(E,E+1),vt=Ce.match(/\s/),S=A[Ce.charCodeAt(0)],ae=null,S){if(d.fittingRules.hLayout!==0){for(I=1e4,P=0;P<d.height;P++)I=Math.min(I,k(N[P],S[P],d));I=I===1e4?0:I}if(d.width>0&&(d.whitespaceBreak?(tr=X(B.chars.concat([{fig:S,overlap:I}]),x,d),ae=X(Q.concat([{fig:tr,overlap:B.overlap}]),x,d),ne=D(ae)):(ae=j(N,S,I,d),ne=D(ae)),ne>=d.width&&E>0&&(d.whitespaceBreak?(N=X(Q.slice(0,-1),x,d),Q.length>1&&(Z.push(N),N=F(x)),Q=[]):(Z.push(N),N=F(x)))),d.width>0&&d.whitespaceBreak&&((!vt||E===O-1)&&B.chars.push({fig:S,overlap:I}),vt||E===O-1)){for(_e=null;ae=X(B.chars,x,d),ne=D(ae),ne>=d.width;)_e=ie(B.chars,x,d),B={chars:_e.chars},Z.push(_e.outputFigText);ne>0&&(_e?Q.push({fig:ae,overlap:1}):Q.push({fig:ae,overlap:B.overlap})),vt&&(Q.push({fig:S,overlap:I}),N=F(x)),E===O-1&&(N=X(Q,x,d)),B={chars:[],overlap:I};continue}N=j(N,S,I,d)}return D(N)>0&&Z.push(N),d.showHardBlanks!==!0&&Z.forEach(function(ee){for(O=ee.length,P=0;P<O;P++)ee[P]=ee[P].replace(new RegExp("\\"+d.hardBlank,"g")," ")}),Z}let U=function(T,A){let d=["hLayout","hRule1","hRule2","hRule3","hRule4","hRule5","hRule6"],E={},S;if(T==="default")for(S=0;S<d.length;S++)E[d[S]]=A.fittingRules[d[S]];else if(T==="full")E={hLayout:0,hRule1:!1,hRule2:!1,hRule3:!1,hRule4:!1,hRule5:!1,hRule6:!1};else if(T==="fitted")E={hLayout:1,hRule1:!1,hRule2:!1,hRule3:!1,hRule4:!1,hRule5:!1,hRule6:!1};else if(T==="controlled smushing")E={hLayout:3,hRule1:!0,hRule2:!0,hRule3:!0,hRule4:!0,hRule5:!0,hRule6:!0};else if(T==="universal smushing")E={hLayout:2,hRule1:!1,hRule2:!1,hRule3:!1,hRule4:!1,hRule5:!1,hRule6:!1};else return;return E},Y=function(T,A){let d=["vLayout","vRule1","vRule2","vRule3","vRule4","vRule5"],E={},S;if(T==="default")for(S=0;S<d.length;S++)E[d[S]]=A.fittingRules[d[S]];else if(T==="full")E={vLayout:0,vRule1:!1,vRule2:!1,vRule3:!1,vRule4:!1,vRule5:!1};else if(T==="fitted")E={vLayout:1,vRule1:!1,vRule2:!1,vRule3:!1,vRule4:!1,vRule5:!1};else if(T==="controlled smushing")E={vLayout:3,vRule1:!0,vRule2:!0,vRule3:!0,vRule4:!0,vRule5:!0};else if(T==="universal smushing")E={vLayout:2,vRule1:!1,vRule2:!1,vRule3:!1,vRule4:!1,vRule5:!1};else return;return E},le=function(T,A,d){d=d.replace(/\r\n/g,`
`).replace(/\r/g,`
`);let E=d.split(`
`),S=[],I,P,N;for(P=E.length,I=0;I<P;I++)S=S.concat(K(E[I],i[T],A));for(P=S.length,N=S[0],I=1;I<P;I++)N=G(N,S[I],A);return N?N.join(`
`):""};function z(T,A){let d=JSON.parse(JSON.stringify(T)),E,S;if(typeof A.horizontalLayout<"u"){E=U(A.horizontalLayout,T);for(S in E)E.hasOwnProperty(S)&&(d.fittingRules[S]=E[S])}if(typeof A.verticalLayout<"u"){E=Y(A.verticalLayout,T);for(S in E)E.hasOwnProperty(S)&&(d.fittingRules[S]=E[S])}return d.printDirection=typeof A.printDirection<"u"?A.printDirection:T.printDirection,d.showHardBlanks=A.showHardBlanks||!1,d.width=A.width||-1,d.whitespaceBreak=A.whitespaceBreak||!1,d}let pe=function(T,A,d){pe.text(T,A,d)};return pe.text=function(T,A,d){let E="";T=T+"",typeof arguments[1]=="function"&&(d=A,A={},A.font=s.font),typeof A=="string"?(E=A,A={}):(A=A||{},E=A.font||s.font),pe.loadFont(E,function(S,I){if(S)return d(S);d(null,le(E,z(I,A),T))})},pe.textSync=function(T,A){let d="";T=T+"",typeof A=="string"?(d=A,A={}):(A=A||{},d=A.font||s.font);var E=z(pe.loadFontSync(d),A);return le(d,E,T)},pe.metadata=function(T,A){T=T+"",pe.loadFont(T,function(d,E){if(d){A(d);return}A(null,E,i[T].comment)})},pe.defaults=function(T){if(typeof T=="object"&&T!==null)for(var A in T)T.hasOwnProperty(A)&&(s[A]=T[A]);return JSON.parse(JSON.stringify(s))},pe.parseFont=function(T,A){A=A.replace(/\r\n/g,`
`).replace(/\r/g,`
`),i[T]={};var d=A.split(`
`),E=d.splice(0,1)[0].split(" "),S=i[T],I={};if(I.hardBlank=E[0].substr(5,1),I.height=parseInt(E[1],10),I.baseline=parseInt(E[2],10),I.maxLength=parseInt(E[3],10),I.oldLayout=parseInt(E[4],10),I.numCommentLines=parseInt(E[5],10),I.printDirection=E.length>=6?parseInt(E[6],10):0,I.fullLayout=E.length>=7?parseInt(E[7],10):null,I.codeTagCount=E.length>=8?parseInt(E[8],10):null,I.fittingRules=o(I.oldLayout,I.fullLayout),S.options=I,I.hardBlank.length!==1||isNaN(I.height)||isNaN(I.baseline)||isNaN(I.maxLength)||isNaN(I.oldLayout)||isNaN(I.numCommentLines))throw new Error("FIGlet header contains invalid values.");let P=[],N;for(N=32;N<=126;N++)P.push(N);if(P=P.concat(196,214,220,228,246,252,223),d.length<I.numCommentLines+I.height*P.length)throw new Error("FIGlet file is missing data.");let O,x,Z=!1;for(S.comment=d.splice(0,I.numCommentLines).join(`
`),S.numChars=0;d.length>0&&S.numChars<P.length;){for(O=P[S.numChars],S[O]=d.splice(0,I.height),N=0;N<I.height;N++)typeof S[O][N]>"u"?S[O][N]="":(x=new RegExp("\\"+S[O][N].substr(S[O][N].length-1,1)+"+$"),S[O][N]=S[O][N].replace(x,""));S.numChars++}for(;d.length>0;){if(O=d.splice(0,1)[0].split(" ")[0],/^0[xX][0-9a-fA-F]+$/.test(O))O=parseInt(O,16);else if(/^0[0-7]+$/.test(O))O=parseInt(O,8);else if(/^[0-9]+$/.test(O))O=parseInt(O,10);else if(/^-0[xX][0-9a-fA-F]+$/.test(O))O=parseInt(O,16);else{if(O==="")break;console.log("Invalid data:"+O),Z=!0;break}for(S[O]=d.splice(0,I.height),N=0;N<I.height;N++)typeof S[O][N]>"u"?S[O][N]="":(x=new RegExp("\\"+S[O][N].substr(S[O][N].length-1,1)+"+$"),S[O][N]=S[O][N].replace(x,""));S.numChars++}if(Z===!0)throw new Error("Error parsing data.");return I},pe.loadFont=function(T,A){if(i[T]){A(null,i[T].options);return}if(typeof fetch!="function")throw console.error("figlet.js requires the fetch API or a fetch polyfill such as https://cdnjs.com/libraries/fetch"),new Error("fetch is required for figlet.js to work.");fetch(s.fontPath+"/"+T+".flf").then(function(d){if(d.ok)return d.text();throw console.log("Unexpected response",d),new Error("Network response was not ok.")}).then(function(d){A(null,pe.parseFont(T,d))}).catch(A)},pe.loadFontSync=function(T){if(i[T])return i[T].options;throw new Error("synchronous font loading is not implemented for the browser")},pe.preloadFonts=function(T,A){let d=[];T.reduce(function(E,S){return E.then(function(){return fetch(s.fontPath+"/"+S+".flf").then(I=>I.text()).then(function(I){d.push(I)})})},Promise.resolve()).then(function(E){for(var S in T)T.hasOwnProperty(S)&&pe.parseFont(T[S],d[S]);A&&A()})},pe.figFonts=i,pe})();typeof sr<"u"&&typeof sr.exports<"u"&&(sr.exports=yg)});var jl=_((Cb,Dl)=>{var De=Fl(),or=require("fs"),ys=require("path"),ar=ys.join(__dirname,"/../fonts/");De.loadFont=function(n,e){if(De.figFonts[n]){e(null,De.figFonts[n].options);return}or.readFile(ys.join(ar,n+".flf"),{encoding:"utf-8"},function(t,r){if(t)return e(t);r=r+"";try{e(null,De.parseFont(n,r))}catch(i){e(i)}})};De.loadFontSync=function(n){if(De.figFonts[n])return De.figFonts[n].options;var e=or.readFileSync(ys.join(ar,n+".flf"),{encoding:"utf-8"});return e=e+"",De.parseFont(n,e)};De.fonts=function(n){var e=[];or.readdir(ar,function(t,r){if(t)return n(t);r.forEach(function(i){/\.flf$/.test(i)&&e.push(i.replace(/\.flf$/,""))}),n(null,e)})};De.fontsSync=function(){var n=[];return or.readdirSync(ar).forEach(function(e){/\.flf$/.test(e)&&n.push(e.replace(/\.flf$/,""))}),n};Dl.exports=De});var Ul=_((kb,Bl)=>{"use strict";Bl.exports={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]}});var Es=_(($b,Wl)=>{var tn=Ul(),Vl={};for(let n of Object.keys(tn))Vl[tn[n]]=n;var q={rgb:{channels:3,labels:"rgb"},hsl:{channels:3,labels:"hsl"},hsv:{channels:3,labels:"hsv"},hwb:{channels:3,labels:"hwb"},cmyk:{channels:4,labels:"cmyk"},xyz:{channels:3,labels:"xyz"},lab:{channels:3,labels:"lab"},lch:{channels:3,labels:"lch"},hex:{channels:1,labels:["hex"]},keyword:{channels:1,labels:["keyword"]},ansi16:{channels:1,labels:["ansi16"]},ansi256:{channels:1,labels:["ansi256"]},hcg:{channels:3,labels:["h","c","g"]},apple:{channels:3,labels:["r16","g16","b16"]},gray:{channels:1,labels:["gray"]}};Wl.exports=q;for(let n of Object.keys(q)){if(!("channels"in q[n]))throw new Error("missing channels property: "+n);if(!("labels"in q[n]))throw new Error("missing channel labels property: "+n);if(q[n].labels.length!==q[n].channels)throw new Error("channel and label counts mismatch: "+n);let{channels:e,labels:t}=q[n];delete q[n].channels,delete q[n].labels,Object.defineProperty(q[n],"channels",{value:e}),Object.defineProperty(q[n],"labels",{value:t})}q.rgb.hsl=function(n){let e=n[0]/255,t=n[1]/255,r=n[2]/255,i=Math.min(e,t,r),s=Math.max(e,t,r),o=s-i,a,l;s===i?a=0:e===s?a=(t-r)/o:t===s?a=2+(r-e)/o:r===s&&(a=4+(e-t)/o),a=Math.min(a*60,360),a<0&&(a+=360);let c=(i+s)/2;return s===i?l=0:c<=.5?l=o/(s+i):l=o/(2-s-i),[a,l*100,c*100]};q.rgb.hsv=function(n){let e,t,r,i,s,o=n[0]/255,a=n[1]/255,l=n[2]/255,c=Math.max(o,a,l),u=c-Math.min(o,a,l),f=function(p){return(c-p)/6/u+1/2};return u===0?(i=0,s=0):(s=u/c,e=f(o),t=f(a),r=f(l),o===c?i=r-t:a===c?i=1/3+e-r:l===c&&(i=2/3+t-e),i<0?i+=1:i>1&&(i-=1)),[i*360,s*100,c*100]};q.rgb.hwb=function(n){let e=n[0],t=n[1],r=n[2],i=q.rgb.hsl(n)[0],s=1/255*Math.min(e,Math.min(t,r));return r=1-1/255*Math.max(e,Math.max(t,r)),[i,s*100,r*100]};q.rgb.cmyk=function(n){let e=n[0]/255,t=n[1]/255,r=n[2]/255,i=Math.min(1-e,1-t,1-r),s=(1-e-i)/(1-i)||0,o=(1-t-i)/(1-i)||0,a=(1-r-i)/(1-i)||0;return[s*100,o*100,a*100,i*100]};function Eg(n,e){return(n[0]-e[0])**2+(n[1]-e[1])**2+(n[2]-e[2])**2}q.rgb.keyword=function(n){let e=Vl[n];if(e)return e;let t=1/0,r;for(let i of Object.keys(tn)){let s=tn[i],o=Eg(n,s);o<t&&(t=o,r=i)}return r};q.keyword.rgb=function(n){return tn[n]};q.rgb.xyz=function(n){let e=n[0]/255,t=n[1]/255,r=n[2]/255;e=e>.04045?((e+.055)/1.055)**2.4:e/12.92,t=t>.04045?((t+.055)/1.055)**2.4:t/12.92,r=r>.04045?((r+.055)/1.055)**2.4:r/12.92;let i=e*.4124+t*.3576+r*.1805,s=e*.2126+t*.7152+r*.0722,o=e*.0193+t*.1192+r*.9505;return[i*100,s*100,o*100]};q.rgb.lab=function(n){let e=q.rgb.xyz(n),t=e[0],r=e[1],i=e[2];t/=95.047,r/=100,i/=108.883,t=t>.008856?t**(1/3):7.787*t+16/116,r=r>.008856?r**(1/3):7.787*r+16/116,i=i>.008856?i**(1/3):7.787*i+16/116;let s=116*r-16,o=500*(t-r),a=200*(r-i);return[s,o,a]};q.hsl.rgb=function(n){let e=n[0]/360,t=n[1]/100,r=n[2]/100,i,s,o;if(t===0)return o=r*255,[o,o,o];r<.5?i=r*(1+t):i=r+t-r*t;let a=2*r-i,l=[0,0,0];for(let c=0;c<3;c++)s=e+1/3*-(c-1),s<0&&s++,s>1&&s--,6*s<1?o=a+(i-a)*6*s:2*s<1?o=i:3*s<2?o=a+(i-a)*(2/3-s)*6:o=a,l[c]=o*255;return l};q.hsl.hsv=function(n){let e=n[0],t=n[1]/100,r=n[2]/100,i=t,s=Math.max(r,.01);r*=2,t*=r<=1?r:2-r,i*=s<=1?s:2-s;let o=(r+t)/2,a=r===0?2*i/(s+i):2*t/(r+t);return[e,a*100,o*100]};q.hsv.rgb=function(n){let e=n[0]/60,t=n[1]/100,r=n[2]/100,i=Math.floor(e)%6,s=e-Math.floor(e),o=255*r*(1-t),a=255*r*(1-t*s),l=255*r*(1-t*(1-s));switch(r*=255,i){case 0:return[r,l,o];case 1:return[a,r,o];case 2:return[o,r,l];case 3:return[o,a,r];case 4:return[l,o,r];case 5:return[r,o,a]}};q.hsv.hsl=function(n){let e=n[0],t=n[1]/100,r=n[2]/100,i=Math.max(r,.01),s,o;o=(2-t)*r;let a=(2-t)*i;return s=t*i,s/=a<=1?a:2-a,s=s||0,o/=2,[e,s*100,o*100]};q.hwb.rgb=function(n){let e=n[0]/360,t=n[1]/100,r=n[2]/100,i=t+r,s;i>1&&(t/=i,r/=i);let o=Math.floor(6*e),a=1-r;s=6*e-o,o&1&&(s=1-s);let l=t+s*(a-t),c,u,f;switch(o){default:case 6:case 0:c=a,u=l,f=t;break;case 1:c=l,u=a,f=t;break;case 2:c=t,u=a,f=l;break;case 3:c=t,u=l,f=a;break;case 4:c=l,u=t,f=a;break;case 5:c=a,u=t,f=l;break}return[c*255,u*255,f*255]};q.cmyk.rgb=function(n){let e=n[0]/100,t=n[1]/100,r=n[2]/100,i=n[3]/100,s=1-Math.min(1,e*(1-i)+i),o=1-Math.min(1,t*(1-i)+i),a=1-Math.min(1,r*(1-i)+i);return[s*255,o*255,a*255]};q.xyz.rgb=function(n){let e=n[0]/100,t=n[1]/100,r=n[2]/100,i,s,o;return i=e*3.2406+t*-1.5372+r*-.4986,s=e*-.9689+t*1.8758+r*.0415,o=e*.0557+t*-.204+r*1.057,i=i>.0031308?1.055*i**(1/2.4)-.055:i*12.92,s=s>.0031308?1.055*s**(1/2.4)-.055:s*12.92,o=o>.0031308?1.055*o**(1/2.4)-.055:o*12.92,i=Math.min(Math.max(0,i),1),s=Math.min(Math.max(0,s),1),o=Math.min(Math.max(0,o),1),[i*255,s*255,o*255]};q.xyz.lab=function(n){let e=n[0],t=n[1],r=n[2];e/=95.047,t/=100,r/=108.883,e=e>.008856?e**(1/3):7.787*e+16/116,t=t>.008856?t**(1/3):7.787*t+16/116,r=r>.008856?r**(1/3):7.787*r+16/116;let i=116*t-16,s=500*(e-t),o=200*(t-r);return[i,s,o]};q.lab.xyz=function(n){let e=n[0],t=n[1],r=n[2],i,s,o;s=(e+16)/116,i=t/500+s,o=s-r/200;let a=s**3,l=i**3,c=o**3;return s=a>.008856?a:(s-16/116)/7.787,i=l>.008856?l:(i-16/116)/7.787,o=c>.008856?c:(o-16/116)/7.787,i*=95.047,s*=100,o*=108.883,[i,s,o]};q.lab.lch=function(n){let e=n[0],t=n[1],r=n[2],i;i=Math.atan2(r,t)*360/2/Math.PI,i<0&&(i+=360);let o=Math.sqrt(t*t+r*r);return[e,o,i]};q.lch.lab=function(n){let e=n[0],t=n[1],i=n[2]/360*2*Math.PI,s=t*Math.cos(i),o=t*Math.sin(i);return[e,s,o]};q.rgb.ansi16=function(n,e=null){let[t,r,i]=n,s=e===null?q.rgb.hsv(n)[2]:e;if(s=Math.round(s/50),s===0)return 30;let o=30+(Math.round(i/255)<<2|Math.round(r/255)<<1|Math.round(t/255));return s===2&&(o+=60),o};q.hsv.ansi16=function(n){return q.rgb.ansi16(q.hsv.rgb(n),n[2])};q.rgb.ansi256=function(n){let e=n[0],t=n[1],r=n[2];return e===t&&t===r?e<8?16:e>248?231:Math.round((e-8)/247*24)+232:16+36*Math.round(e/255*5)+6*Math.round(t/255*5)+Math.round(r/255*5)};q.ansi16.rgb=function(n){let e=n%10;if(e===0||e===7)return n>50&&(e+=3.5),e=e/10.5*255,[e,e,e];let t=(~~(n>50)+1)*.5,r=(e&1)*t*255,i=(e>>1&1)*t*255,s=(e>>2&1)*t*255;return[r,i,s]};q.ansi256.rgb=function(n){if(n>=232){let s=(n-232)*10+8;return[s,s,s]}n-=16;let e,t=Math.floor(n/36)/5*255,r=Math.floor((e=n%36)/6)/5*255,i=e%6/5*255;return[t,r,i]};q.rgb.hex=function(n){let t=(((Math.round(n[0])&255)<<16)+((Math.round(n[1])&255)<<8)+(Math.round(n[2])&255)).toString(16).toUpperCase();return"000000".substring(t.length)+t};q.hex.rgb=function(n){let e=n.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);if(!e)return[0,0,0];let t=e[0];e[0].length===3&&(t=t.split("").map(a=>a+a).join(""));let r=parseInt(t,16),i=r>>16&255,s=r>>8&255,o=r&255;return[i,s,o]};q.rgb.hcg=function(n){let e=n[0]/255,t=n[1]/255,r=n[2]/255,i=Math.max(Math.max(e,t),r),s=Math.min(Math.min(e,t),r),o=i-s,a,l;return o<1?a=s/(1-o):a=0,o<=0?l=0:i===e?l=(t-r)/o%6:i===t?l=2+(r-e)/o:l=4+(e-t)/o,l/=6,l%=1,[l*360,o*100,a*100]};q.hsl.hcg=function(n){let e=n[1]/100,t=n[2]/100,r=t<.5?2*e*t:2*e*(1-t),i=0;return r<1&&(i=(t-.5*r)/(1-r)),[n[0],r*100,i*100]};q.hsv.hcg=function(n){let e=n[1]/100,t=n[2]/100,r=e*t,i=0;return r<1&&(i=(t-r)/(1-r)),[n[0],r*100,i*100]};q.hcg.rgb=function(n){let e=n[0]/360,t=n[1]/100,r=n[2]/100;if(t===0)return[r*255,r*255,r*255];let i=[0,0,0],s=e%1*6,o=s%1,a=1-o,l=0;switch(Math.floor(s)){case 0:i[0]=1,i[1]=o,i[2]=0;break;case 1:i[0]=a,i[1]=1,i[2]=0;break;case 2:i[0]=0,i[1]=1,i[2]=o;break;case 3:i[0]=0,i[1]=a,i[2]=1;break;case 4:i[0]=o,i[1]=0,i[2]=1;break;default:i[0]=1,i[1]=0,i[2]=a}return l=(1-t)*r,[(t*i[0]+l)*255,(t*i[1]+l)*255,(t*i[2]+l)*255]};q.hcg.hsv=function(n){let e=n[1]/100,t=n[2]/100,r=e+t*(1-e),i=0;return r>0&&(i=e/r),[n[0],i*100,r*100]};q.hcg.hsl=function(n){let e=n[1]/100,r=n[2]/100*(1-e)+.5*e,i=0;return r>0&&r<.5?i=e/(2*r):r>=.5&&r<1&&(i=e/(2*(1-r))),[n[0],i*100,r*100]};q.hcg.hwb=function(n){let e=n[1]/100,t=n[2]/100,r=e+t*(1-e);return[n[0],(r-e)*100,(1-r)*100]};q.hwb.hcg=function(n){let e=n[1]/100,r=1-n[2]/100,i=r-e,s=0;return i<1&&(s=(r-i)/(1-i)),[n[0],i*100,s*100]};q.apple.rgb=function(n){return[n[0]/65535*255,n[1]/65535*255,n[2]/65535*255]};q.rgb.apple=function(n){return[n[0]/255*65535,n[1]/255*65535,n[2]/255*65535]};q.gray.rgb=function(n){return[n[0]/100*255,n[0]/100*255,n[0]/100*255]};q.gray.hsl=function(n){return[0,0,n[0]]};q.gray.hsv=q.gray.hsl;q.gray.hwb=function(n){return[0,100,n[0]]};q.gray.cmyk=function(n){return[0,0,0,n[0]]};q.gray.lab=function(n){return[n[0],0,0]};q.gray.hex=function(n){let e=Math.round(n[0]/100*255)&255,r=((e<<16)+(e<<8)+e).toString(16).toUpperCase();return"000000".substring(r.length)+r};q.rgb.gray=function(n){return[(n[0]+n[1]+n[2])/3/255*100]}});var Kl=_((qb,Gl)=>{var lr=Es();function Tg(){let n={},e=Object.keys(lr);for(let t=e.length,r=0;r<t;r++)n[e[r]]={distance:-1,parent:null};return n}function Lg(n){let e=Tg(),t=[n];for(e[n].distance=0;t.length;){let r=t.pop(),i=Object.keys(lr[r]);for(let s=i.length,o=0;o<s;o++){let a=i[o],l=e[a];l.distance===-1&&(l.distance=e[r].distance+1,l.parent=r,t.unshift(a))}}return e}function Sg(n,e){return function(t){return e(n(t))}}function Ag(n,e){let t=[e[n].parent,n],r=lr[e[n].parent][n],i=e[n].parent;for(;e[i].parent;)t.unshift(e[i].parent),r=Sg(lr[e[i].parent][i],r),i=e[i].parent;return r.conversion=t,r}Gl.exports=function(n){let e=Lg(n),t={},r=Object.keys(e);for(let i=r.length,s=0;s<i;s++){let o=r[s];e[o].parent!==null&&(t[o]=Ag(o,e))}return t}});var Jl=_((xb,Yl)=>{var Ts=Es(),Ig=Kl(),bt={},wg=Object.keys(Ts);function vg(n){let e=function(...t){let r=t[0];return r==null?r:(r.length>1&&(t=r),n(t))};return"conversion"in n&&(e.conversion=n.conversion),e}function bg(n){let e=function(...t){let r=t[0];if(r==null)return r;r.length>1&&(t=r);let i=n(t);if(typeof i=="object")for(let s=i.length,o=0;o<s;o++)i[o]=Math.round(i[o]);return i};return"conversion"in n&&(e.conversion=n.conversion),e}wg.forEach(n=>{bt[n]={},Object.defineProperty(bt[n],"channels",{value:Ts[n].channels}),Object.defineProperty(bt[n],"labels",{value:Ts[n].labels});let e=Ig(n);Object.keys(e).forEach(r=>{let i=e[r];bt[n][r]=bg(i),bt[n][r].raw=vg(i)})});Yl.exports=bt});var tc=_((Mb,ec)=>{"use strict";var Xl=(n,e)=>(...t)=>`\x1B[${n(...t)+e}m`,zl=(n,e)=>(...t)=>{let r=n(...t);return`\x1B[${38+e};5;${r}m`},Ql=(n,e)=>(...t)=>{let r=n(...t);return`\x1B[${38+e};2;${r[0]};${r[1]};${r[2]}m`},cr=n=>n,Zl=(n,e,t)=>[n,e,t],Nt=(n,e,t)=>{Object.defineProperty(n,e,{get:()=>{let r=t();return Object.defineProperty(n,e,{value:r,enumerable:!0,configurable:!0}),r},enumerable:!0,configurable:!0})},Ls,Ot=(n,e,t,r)=>{Ls===void 0&&(Ls=Jl());let i=r?10:0,s={};for(let[o,a]of Object.entries(Ls)){let l=o==="ansi16"?"ansi":o;o===e?s[l]=n(t,i):typeof a=="object"&&(s[l]=n(a[e],i))}return s};function Ng(){let n=new Map,e={modifier:{reset:[0,0],bold:[1,22],dim:[2,22],italic:[3,23],underline:[4,24],inverse:[7,27],hidden:[8,28],strikethrough:[9,29]},color:{black:[30,39],red:[31,39],green:[32,39],yellow:[33,39],blue:[34,39],magenta:[35,39],cyan:[36,39],white:[37,39],blackBright:[90,39],redBright:[91,39],greenBright:[92,39],yellowBright:[93,39],blueBright:[94,39],magentaBright:[95,39],cyanBright:[96,39],whiteBright:[97,39]},bgColor:{bgBlack:[40,49],bgRed:[41,49],bgGreen:[42,49],bgYellow:[43,49],bgBlue:[44,49],bgMagenta:[45,49],bgCyan:[46,49],bgWhite:[47,49],bgBlackBright:[100,49],bgRedBright:[101,49],bgGreenBright:[102,49],bgYellowBright:[103,49],bgBlueBright:[104,49],bgMagentaBright:[105,49],bgCyanBright:[106,49],bgWhiteBright:[107,49]}};e.color.gray=e.color.blackBright,e.bgColor.bgGray=e.bgColor.bgBlackBright,e.color.grey=e.color.blackBright,e.bgColor.bgGrey=e.bgColor.bgBlackBright;for(let[t,r]of Object.entries(e)){for(let[i,s]of Object.entries(r))e[i]={open:`\x1B[${s[0]}m`,close:`\x1B[${s[1]}m`},r[i]=e[i],n.set(s[0],s[1]);Object.defineProperty(e,t,{value:r,enumerable:!1})}return Object.defineProperty(e,"codes",{value:n,enumerable:!1}),e.color.close="\x1B[39m",e.bgColor.close="\x1B[49m",Nt(e.color,"ansi",()=>Ot(Xl,"ansi16",cr,!1)),Nt(e.color,"ansi256",()=>Ot(zl,"ansi256",cr,!1)),Nt(e.color,"ansi16m",()=>Ot(Ql,"rgb",Zl,!1)),Nt(e.bgColor,"ansi",()=>Ot(Xl,"ansi16",cr,!0)),Nt(e.bgColor,"ansi256",()=>Ot(zl,"ansi256",cr,!0)),Nt(e.bgColor,"ansi16m",()=>Ot(Ql,"rgb",Zl,!0)),e}Object.defineProperty(ec,"exports",{enumerable:!0,get:Ng})});var rc=_((Fb,nc)=>{"use strict";nc.exports=(n,e=process.argv)=>{let t=n.startsWith("-")?"":n.length===1?"-":"--",r=e.indexOf(t+n),i=e.indexOf("--");return r!==-1&&(i===-1||r<i)}});var oc=_((Db,sc)=>{"use strict";var Og=require("os"),ic=require("tty"),ke=rc(),{env:fe}=process,Qe;ke("no-color")||ke("no-colors")||ke("color=false")||ke("color=never")?Qe=0:(ke("color")||ke("colors")||ke("color=true")||ke("color=always"))&&(Qe=1);"FORCE_COLOR"in fe&&(fe.FORCE_COLOR==="true"?Qe=1:fe.FORCE_COLOR==="false"?Qe=0:Qe=fe.FORCE_COLOR.length===0?1:Math.min(parseInt(fe.FORCE_COLOR,10),3));function Ss(n){return n===0?!1:{level:n,hasBasic:!0,has256:n>=2,has16m:n>=3}}function As(n,e){if(Qe===0)return 0;if(ke("color=16m")||ke("color=full")||ke("color=truecolor"))return 3;if(ke("color=256"))return 2;if(n&&!e&&Qe===void 0)return 0;let t=Qe||0;if(fe.TERM==="dumb")return t;if(process.platform==="win32"){let r=Og.release().split(".");return Number(r[0])>=10&&Number(r[2])>=10586?Number(r[2])>=14931?3:2:1}if("CI"in fe)return["TRAVIS","CIRCLECI","APPVEYOR","GITLAB_CI","GITHUB_ACTIONS","BUILDKITE"].some(r=>r in fe)||fe.CI_NAME==="codeship"?1:t;if("TEAMCITY_VERSION"in fe)return/^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(fe.TEAMCITY_VERSION)?1:0;if(fe.COLORTERM==="truecolor")return 3;if("TERM_PROGRAM"in fe){let r=parseInt((fe.TERM_PROGRAM_VERSION||"").split(".")[0],10);switch(fe.TERM_PROGRAM){case"iTerm.app":return r>=3?3:2;case"Apple_Terminal":return 2}}return/-256(color)?$/i.test(fe.TERM)?2:/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(fe.TERM)||"COLORTERM"in fe?1:t}function Rg(n){let e=As(n,n&&n.isTTY);return Ss(e)}sc.exports={supportsColor:Rg,stdout:Ss(As(!0,ic.isatty(1))),stderr:Ss(As(!0,ic.isatty(2)))}});var lc=_((jb,ac)=>{"use strict";var Cg=(n,e,t)=>{let r=n.indexOf(e);if(r===-1)return n;let i=e.length,s=0,o="";do o+=n.substr(s,r-s)+e+t,s=r+i,r=n.indexOf(e,s);while(r!==-1);return o+=n.substr(s),o},Pg=(n,e,t,r)=>{let i=0,s="";do{let o=n[r-1]==="\r";s+=n.substr(i,(o?r-1:r)-i)+e+(o?`\r
`:`
`)+t,i=r+1,r=n.indexOf(`
`,i)}while(r!==-1);return s+=n.substr(i),s};ac.exports={stringReplaceAll:Cg,stringEncaseCRLFWithFirstIndex:Pg}});var dc=_((Hb,hc)=>{"use strict";var kg=/(?:\\(u(?:[a-f\d]{4}|\{[a-f\d]{1,6}\})|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi,cc=/(?:^|\.)(\w+)(?:\(([^)]*)\))?/g,$g=/^(['"])((?:\\.|(?!\1)[^\\])*)\1$/,qg=/\\(u(?:[a-f\d]{4}|{[a-f\d]{1,6}})|x[a-f\d]{2}|.)|([^\\])/gi,xg=new Map([["n",`
`],["r","\r"],["t","	"],["b","\b"],["f","\f"],["v","\v"],["0","\0"],["\\","\\"],["e","\x1B"],["a","\x07"]]);function fc(n){let e=n[0]==="u",t=n[1]==="{";return e&&!t&&n.length===5||n[0]==="x"&&n.length===3?String.fromCharCode(parseInt(n.slice(1),16)):e&&t?String.fromCodePoint(parseInt(n.slice(2,-1),16)):xg.get(n)||n}function Mg(n,e){let t=[],r=e.trim().split(/\s*,\s*/g),i;for(let s of r){let o=Number(s);if(!Number.isNaN(o))t.push(o);else if(i=s.match($g))t.push(i[2].replace(qg,(a,l,c)=>l?fc(l):c));else throw new Error(`Invalid Chalk template style argument: ${s} (in style '${n}')`)}return t}function Fg(n){cc.lastIndex=0;let e=[],t;for(;(t=cc.exec(n))!==null;){let r=t[1];if(t[2]){let i=Mg(r,t[2]);e.push([r].concat(i))}else e.push([r])}return e}function uc(n,e){let t={};for(let i of e)for(let s of i.styles)t[s[0]]=i.inverse?null:s.slice(1);let r=n;for(let[i,s]of Object.entries(t))if(Array.isArray(s)){if(!(i in r))throw new Error(`Unknown Chalk style: ${i}`);r=s.length>0?r[i](...s):r[i]}return r}hc.exports=(n,e)=>{let t=[],r=[],i=[];if(e.replace(kg,(s,o,a,l,c,u)=>{if(o)i.push(fc(o));else if(l){let f=i.join("");i=[],r.push(t.length===0?f:uc(n,t)(f)),t.push({inverse:a,styles:Fg(l)})}else if(c){if(t.length===0)throw new Error("Found extraneous } in Chalk template literal");r.push(uc(n,t)(i.join(""))),i=[],t.pop()}else i.push(u)}),r.push(i.join("")),t.length>0){let s=`Chalk template literal is missing ${t.length} closing bracket${t.length===1?"":"s"} (\`}\`)`;throw new Error(s)}return r.join("")}});var Tc=_((Bb,Ec)=>{"use strict";var nn=tc(),{stdout:ws,stderr:vs}=oc(),{stringReplaceAll:Dg,stringEncaseCRLFWithFirstIndex:jg}=lc(),{isArray:ur}=Array,_c=["ansi","ansi","ansi256","ansi16m"],Rt=Object.create(null),Hg=(n,e={})=>{if(e.level&&!(Number.isInteger(e.level)&&e.level>=0&&e.level<=3))throw new Error("The `level` option should be an integer from 0 to 3");let t=ws?ws.level:0;n.level=e.level===void 0?t:e.level},bs=class{constructor(e){return mc(e)}},mc=n=>{let e={};return Hg(e,n),e.template=(...t)=>yc(e.template,...t),Object.setPrototypeOf(e,fr.prototype),Object.setPrototypeOf(e.template,e),e.template.constructor=()=>{throw new Error("`chalk.constructor()` is deprecated. Use `new chalk.Instance()` instead.")},e.template.Instance=bs,e.template};function fr(n){return mc(n)}for(let[n,e]of Object.entries(nn))Rt[n]={get(){let t=hr(this,Ns(e.open,e.close,this._styler),this._isEmpty);return Object.defineProperty(this,n,{value:t}),t}};Rt.visible={get(){let n=hr(this,this._styler,!0);return Object.defineProperty(this,"visible",{value:n}),n}};var gc=["rgb","hex","keyword","hsl","hsv","hwb","ansi","ansi256"];for(let n of gc)Rt[n]={get(){let{level:e}=this;return function(...t){let r=Ns(nn.color[_c[e]][n](...t),nn.color.close,this._styler);return hr(this,r,this._isEmpty)}}};for(let n of gc){let e="bg"+n[0].toUpperCase()+n.slice(1);Rt[e]={get(){let{level:t}=this;return function(...r){let i=Ns(nn.bgColor[_c[t]][n](...r),nn.bgColor.close,this._styler);return hr(this,i,this._isEmpty)}}}}var Bg=Object.defineProperties(()=>{},{...Rt,level:{enumerable:!0,get(){return this._generator.level},set(n){this._generator.level=n}}}),Ns=(n,e,t)=>{let r,i;return t===void 0?(r=n,i=e):(r=t.openAll+n,i=e+t.closeAll),{open:n,close:e,openAll:r,closeAll:i,parent:t}},hr=(n,e,t)=>{let r=(...i)=>ur(i[0])&&ur(i[0].raw)?pc(r,yc(r,...i)):pc(r,i.length===1?""+i[0]:i.join(" "));return Object.setPrototypeOf(r,Bg),r._generator=n,r._styler=e,r._isEmpty=t,r},pc=(n,e)=>{if(n.level<=0||!e)return n._isEmpty?"":e;let t=n._styler;if(t===void 0)return e;let{openAll:r,closeAll:i}=t;if(e.indexOf("\x1B")!==-1)for(;t!==void 0;)e=Dg(e,t.close,t.open),t=t.parent;let s=e.indexOf(`
`);return s!==-1&&(e=jg(e,i,r,s)),r+e+i},Is,yc=(n,...e)=>{let[t]=e;if(!ur(t)||!ur(t.raw))return e.join(" ");let r=e.slice(1),i=[t.raw[0]];for(let s=1;s<t.length;s++)i.push(String(r[s-1]).replace(/[{}\\]/g,"\\$&"),String(t.raw[s]));return Is===void 0&&(Is=dc()),Is(n,i.join(""))};Object.defineProperties(fr.prototype,Rt);var dr=fr();dr.supportsColor=ws;dr.stderr=fr({level:vs?vs.level:0});dr.stderr.supportsColor=vs;Ec.exports=dr});var Sc=_((Vb,Gg)=>{Gg.exports={name:"dotenv",version:"16.3.1",description:"Loads environment variables from .env file",main:"lib/main.js",types:"lib/main.d.ts",exports:{".":{types:"./lib/main.d.ts",require:"./lib/main.js",default:"./lib/main.js"},"./config":"./config.js","./config.js":"./config.js","./lib/env-options":"./lib/env-options.js","./lib/env-options.js":"./lib/env-options.js","./lib/cli-options":"./lib/cli-options.js","./lib/cli-options.js":"./lib/cli-options.js","./package.json":"./package.json"},scripts:{"dts-check":"tsc --project tests/types/tsconfig.json",lint:"standard","lint-readme":"standard-markdown",pretest:"npm run lint && npm run dts-check",test:"tap tests/*.js --100 -Rspec",prerelease:"npm test",release:"standard-version"},repository:{type:"git",url:"git://github.com/motdotla/dotenv.git"},funding:"https://github.com/motdotla/dotenv?sponsor=1",keywords:["dotenv","env",".env","environment","variables","config","settings"],readmeFilename:"README.md",license:"BSD-2-Clause",devDependencies:{"@definitelytyped/dtslint":"^0.0.133","@types/node":"^18.11.3",decache:"^4.6.1",sinon:"^14.0.1",standard:"^17.0.0","standard-markdown":"^7.1.0","standard-version":"^9.5.0",tap:"^16.3.0",tar:"^6.1.11",typescript:"^4.8.4"},engines:{node:">=12"},browser:{fs:!1}}});var vc=_((Wb,Je)=>{var Ac=require("fs"),Rs=require("path"),Kg=require("os"),Yg=require("crypto"),Jg=Sc(),Cs=Jg.version,Xg=/(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;function zg(n){let e={},t=n.toString();t=t.replace(/\r\n?/mg,`
`);let r;for(;(r=Xg.exec(t))!=null;){let i=r[1],s=r[2]||"";s=s.trim();let o=s[0];s=s.replace(/^(['"`])([\s\S]*)\1$/mg,"$2"),o==='"'&&(s=s.replace(/\\n/g,`
`),s=s.replace(/\\r/g,"\r")),e[i]=s}return e}function Qg(n){let e=wc(n),t=he.configDotenv({path:e});if(!t.parsed)throw new Error(`MISSING_DATA: Cannot parse ${e} for an unknown reason`);let r=Ic(n).split(","),i=r.length,s;for(let o=0;o<i;o++)try{let a=r[o].trim(),l=t0(t,a);s=he.decrypt(l.ciphertext,l.key);break}catch(a){if(o+1>=i)throw a}return he.parse(s)}function Zg(n){console.log(`[dotenv@${Cs}][INFO] ${n}`)}function e0(n){console.log(`[dotenv@${Cs}][WARN] ${n}`)}function Os(n){console.log(`[dotenv@${Cs}][DEBUG] ${n}`)}function Ic(n){return n&&n.DOTENV_KEY&&n.DOTENV_KEY.length>0?n.DOTENV_KEY:process.env.DOTENV_KEY&&process.env.DOTENV_KEY.length>0?process.env.DOTENV_KEY:""}function t0(n,e){let t;try{t=new URL(e)}catch(a){throw a.code==="ERR_INVALID_URL"?new Error("INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenv.org/vault/.env.vault?environment=development"):a}let r=t.password;if(!r)throw new Error("INVALID_DOTENV_KEY: Missing key part");let i=t.searchParams.get("environment");if(!i)throw new Error("INVALID_DOTENV_KEY: Missing environment part");let s=`DOTENV_VAULT_${i.toUpperCase()}`,o=n.parsed[s];if(!o)throw new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${s} in your .env.vault file.`);return{ciphertext:o,key:r}}function wc(n){let e=Rs.resolve(process.cwd(),".env");return n&&n.path&&n.path.length>0&&(e=n.path),e.endsWith(".vault")?e:`${e}.vault`}function n0(n){return n[0]==="~"?Rs.join(Kg.homedir(),n.slice(1)):n}function r0(n){Zg("Loading env from encrypted .env.vault");let e=he._parseVault(n),t=process.env;return n&&n.processEnv!=null&&(t=n.processEnv),he.populate(t,e,n),{parsed:e}}function i0(n){let e=Rs.resolve(process.cwd(),".env"),t="utf8",r=!!(n&&n.debug);n&&(n.path!=null&&(e=n0(n.path)),n.encoding!=null&&(t=n.encoding));try{let i=he.parse(Ac.readFileSync(e,{encoding:t})),s=process.env;return n&&n.processEnv!=null&&(s=n.processEnv),he.populate(s,i,n),{parsed:i}}catch(i){return r&&Os(`Failed to load ${e} ${i.message}`),{error:i}}}function s0(n){let e=wc(n);return Ic(n).length===0?he.configDotenv(n):Ac.existsSync(e)?he._configVault(n):(e0(`You set DOTENV_KEY but you are missing a .env.vault file at ${e}. Did you forget to build it?`),he.configDotenv(n))}function o0(n,e){let t=Buffer.from(e.slice(-64),"hex"),r=Buffer.from(n,"base64"),i=r.slice(0,12),s=r.slice(-16);r=r.slice(12,-16);try{let o=Yg.createDecipheriv("aes-256-gcm",t,i);return o.setAuthTag(s),`${o.update(r)}${o.final()}`}catch(o){let a=o instanceof RangeError,l=o.message==="Invalid key length",c=o.message==="Unsupported state or unable to authenticate data";if(a||l){let u="INVALID_DOTENV_KEY: It must be 64 characters long (or more)";throw new Error(u)}else if(c){let u="DECRYPTION_FAILED: Please check your DOTENV_KEY";throw new Error(u)}else throw console.error("Error: ",o.code),console.error("Error: ",o.message),o}}function a0(n,e,t={}){let r=!!(t&&t.debug),i=!!(t&&t.override);if(typeof e!="object")throw new Error("OBJECT_REQUIRED: Please check the processEnv argument being passed to populate");for(let s of Object.keys(e))Object.prototype.hasOwnProperty.call(n,s)?(i===!0&&(n[s]=e[s]),r&&Os(i===!0?`"${s}" is already defined and WAS overwritten`:`"${s}" is already defined and was NOT overwritten`)):n[s]=e[s]}var he={configDotenv:i0,_configVault:r0,_parseVault:Qg,config:s0,decrypt:o0,parse:zg,populate:a0};Je.exports.configDotenv=he.configDotenv;Je.exports._configVault=he._configVault;Je.exports._parseVault=he._parseVault;Je.exports.config=he.config;Je.exports.decrypt=he.decrypt;Je.exports.parse=he.parse;Je.exports.populate=he.populate;Je.exports=he});var Ie=_(Ps=>{"use strict";Ps.fromCallback=function(n){return Object.defineProperty(function(...e){if(typeof e[e.length-1]=="function")n.apply(this,e);else return new Promise((t,r)=>{n.call(this,...e,(i,s)=>i!=null?r(i):t(s))})},"name",{value:n.name})};Ps.fromPromise=function(n){return Object.defineProperty(function(...e){let t=e[e.length-1];if(typeof t!="function")return n.apply(this,e);n.apply(this,e.slice(0,-1)).then(r=>t(null,r),t)},"name",{value:n.name})}});var Nc=_((Kb,bc)=>{var Ze=require("constants"),l0=process.cwd,_r=null,c0=process.env.GRACEFUL_FS_PLATFORM||process.platform;process.cwd=function(){return _r||(_r=l0.call(process)),_r};try{process.cwd()}catch{}typeof process.chdir=="function"&&(ks=process.chdir,process.chdir=function(n){_r=null,ks.call(process,n)},Object.setPrototypeOf&&Object.setPrototypeOf(process.chdir,ks));var ks;bc.exports=u0;function u0(n){Ze.hasOwnProperty("O_SYMLINK")&&process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)&&e(n),n.lutimes||t(n),n.chown=s(n.chown),n.fchown=s(n.fchown),n.lchown=s(n.lchown),n.chmod=r(n.chmod),n.fchmod=r(n.fchmod),n.lchmod=r(n.lchmod),n.chownSync=o(n.chownSync),n.fchownSync=o(n.fchownSync),n.lchownSync=o(n.lchownSync),n.chmodSync=i(n.chmodSync),n.fchmodSync=i(n.fchmodSync),n.lchmodSync=i(n.lchmodSync),n.stat=a(n.stat),n.fstat=a(n.fstat),n.lstat=a(n.lstat),n.statSync=l(n.statSync),n.fstatSync=l(n.fstatSync),n.lstatSync=l(n.lstatSync),n.chmod&&!n.lchmod&&(n.lchmod=function(u,f,p){p&&process.nextTick(p)},n.lchmodSync=function(){}),n.chown&&!n.lchown&&(n.lchown=function(u,f,p,h){h&&process.nextTick(h)},n.lchownSync=function(){}),c0==="win32"&&(n.rename=typeof n.rename!="function"?n.rename:function(u){function f(p,h,y){var g=Date.now(),m=0;u(p,h,function L(w){if(w&&(w.code==="EACCES"||w.code==="EPERM"||w.code==="EBUSY")&&Date.now()-g<6e4){setTimeout(function(){n.stat(h,function(b,$){b&&b.code==="ENOENT"?u(p,h,L):y(w)})},m),m<100&&(m+=10);return}y&&y(w)})}return Object.setPrototypeOf&&Object.setPrototypeOf(f,u),f}(n.rename)),n.read=typeof n.read!="function"?n.read:function(u){function f(p,h,y,g,m,L){var w;if(L&&typeof L=="function"){var b=0;w=function($,M,v){if($&&$.code==="EAGAIN"&&b<10)return b++,u.call(n,p,h,y,g,m,w);L.apply(this,arguments)}}return u.call(n,p,h,y,g,m,w)}return Object.setPrototypeOf&&Object.setPrototypeOf(f,u),f}(n.read),n.readSync=typeof n.readSync!="function"?n.readSync:function(u){return function(f,p,h,y,g){for(var m=0;;)try{return u.call(n,f,p,h,y,g)}catch(L){if(L.code==="EAGAIN"&&m<10){m++;continue}throw L}}}(n.readSync);function e(u){u.lchmod=function(f,p,h){u.open(f,Ze.O_WRONLY|Ze.O_SYMLINK,p,function(y,g){if(y){h&&h(y);return}u.fchmod(g,p,function(m){u.close(g,function(L){h&&h(m||L)})})})},u.lchmodSync=function(f,p){var h=u.openSync(f,Ze.O_WRONLY|Ze.O_SYMLINK,p),y=!0,g;try{g=u.fchmodSync(h,p),y=!1}finally{if(y)try{u.closeSync(h)}catch{}else u.closeSync(h)}return g}}function t(u){Ze.hasOwnProperty("O_SYMLINK")&&u.futimes?(u.lutimes=function(f,p,h,y){u.open(f,Ze.O_SYMLINK,function(g,m){if(g){y&&y(g);return}u.futimes(m,p,h,function(L){u.close(m,function(w){y&&y(L||w)})})})},u.lutimesSync=function(f,p,h){var y=u.openSync(f,Ze.O_SYMLINK),g,m=!0;try{g=u.futimesSync(y,p,h),m=!1}finally{if(m)try{u.closeSync(y)}catch{}else u.closeSync(y)}return g}):u.futimes&&(u.lutimes=function(f,p,h,y){y&&process.nextTick(y)},u.lutimesSync=function(){})}function r(u){return u&&function(f,p,h){return u.call(n,f,p,function(y){c(y)&&(y=null),h&&h.apply(this,arguments)})}}function i(u){return u&&function(f,p){try{return u.call(n,f,p)}catch(h){if(!c(h))throw h}}}function s(u){return u&&function(f,p,h,y){return u.call(n,f,p,h,function(g){c(g)&&(g=null),y&&y.apply(this,arguments)})}}function o(u){return u&&function(f,p,h){try{return u.call(n,f,p,h)}catch(y){if(!c(y))throw y}}}function a(u){return u&&function(f,p,h){typeof p=="function"&&(h=p,p=null);function y(g,m){m&&(m.uid<0&&(m.uid+=4294967296),m.gid<0&&(m.gid+=4294967296)),h&&h.apply(this,arguments)}return p?u.call(n,f,p,y):u.call(n,f,y)}}function l(u){return u&&function(f,p){var h=p?u.call(n,f,p):u.call(n,f);return h&&(h.uid<0&&(h.uid+=4294967296),h.gid<0&&(h.gid+=4294967296)),h}}function c(u){if(!u||u.code==="ENOSYS")return!0;var f=!process.getuid||process.getuid()!==0;return!!(f&&(u.code==="EINVAL"||u.code==="EPERM"))}}});var Cc=_((Yb,Rc)=>{var Oc=require("stream").Stream;Rc.exports=f0;function f0(n){return{ReadStream:e,WriteStream:t};function e(r,i){if(!(this instanceof e))return new e(r,i);Oc.call(this);var s=this;this.path=r,this.fd=null,this.readable=!0,this.paused=!1,this.flags="r",this.mode=438,this.bufferSize=64*1024,i=i||{};for(var o=Object.keys(i),a=0,l=o.length;a<l;a++){var c=o[a];this[c]=i[c]}if(this.encoding&&this.setEncoding(this.encoding),this.start!==void 0){if(typeof this.start!="number")throw TypeError("start must be a Number");if(this.end===void 0)this.end=1/0;else if(typeof this.end!="number")throw TypeError("end must be a Number");if(this.start>this.end)throw new Error("start must be <= end");this.pos=this.start}if(this.fd!==null){process.nextTick(function(){s._read()});return}n.open(this.path,this.flags,this.mode,function(u,f){if(u){s.emit("error",u),s.readable=!1;return}s.fd=f,s.emit("open",f),s._read()})}function t(r,i){if(!(this instanceof t))return new t(r,i);Oc.call(this),this.path=r,this.fd=null,this.writable=!0,this.flags="w",this.encoding="binary",this.mode=438,this.bytesWritten=0,i=i||{};for(var s=Object.keys(i),o=0,a=s.length;o<a;o++){var l=s[o];this[l]=i[l]}if(this.start!==void 0){if(typeof this.start!="number")throw TypeError("start must be a Number");if(this.start<0)throw new Error("start must be >= zero");this.pos=this.start}this.busy=!1,this._queue=[],this.fd===null&&(this._open=n.open,this._queue.push([this._open,this.path,this.flags,this.mode,void 0]),this.flush())}}});var kc=_((Jb,Pc)=>{"use strict";Pc.exports=d0;var h0=Object.getPrototypeOf||function(n){return n.__proto__};function d0(n){if(n===null||typeof n!="object")return n;if(n instanceof Object)var e={__proto__:h0(n)};else var e=Object.create(null);return Object.getOwnPropertyNames(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}),e}});var we=_((Xb,xs)=>{var se=require("fs"),p0=Nc(),_0=Cc(),m0=kc(),mr=require("util"),me,yr;typeof Symbol=="function"&&typeof Symbol.for=="function"?(me=Symbol.for("graceful-fs.queue"),yr=Symbol.for("graceful-fs.previous")):(me="___graceful-fs.queue",yr="___graceful-fs.previous");function g0(){}function xc(n,e){Object.defineProperty(n,me,{get:function(){return e}})}var mt=g0;mr.debuglog?mt=mr.debuglog("gfs4"):/\bgfs4\b/i.test(process.env.NODE_DEBUG||"")&&(mt=function(){var n=mr.format.apply(mr,arguments);n="GFS4: "+n.split(/\n/).join(`
GFS4: `),console.error(n)});se[me]||($c=global[me]||[],xc(se,$c),se.close=function(n){function e(t,r){return n.call(se,t,function(i){i||qc(),typeof r=="function"&&r.apply(this,arguments)})}return Object.defineProperty(e,yr,{value:n}),e}(se.close),se.closeSync=function(n){function e(t){n.apply(se,arguments),qc()}return Object.defineProperty(e,yr,{value:n}),e}(se.closeSync),/\bgfs4\b/i.test(process.env.NODE_DEBUG||"")&&process.on("exit",function(){mt(se[me]),require("assert").equal(se[me].length,0)}));var $c;global[me]||xc(global,se[me]);xs.exports=$s(m0(se));process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH&&!se.__patched&&(xs.exports=$s(se),se.__patched=!0);function $s(n){p0(n),n.gracefulify=$s,n.createReadStream=M,n.createWriteStream=v;var e=n.readFile;n.readFile=t;function t(k,j,F){return typeof j=="function"&&(F=j,j=null),D(k,j,F);function D(X,ie,K,U){return e(X,ie,function(Y){Y&&(Y.code==="EMFILE"||Y.code==="ENFILE")?Ct([D,[X,ie,K],Y,U||Date.now(),Date.now()]):typeof K=="function"&&K.apply(this,arguments)})}}var r=n.writeFile;n.writeFile=i;function i(k,j,F,D){return typeof F=="function"&&(D=F,F=null),X(k,j,F,D);function X(ie,K,U,Y,le){return r(ie,K,U,function(z){z&&(z.code==="EMFILE"||z.code==="ENFILE")?Ct([X,[ie,K,U,Y],z,le||Date.now(),Date.now()]):typeof Y=="function"&&Y.apply(this,arguments)})}}var s=n.appendFile;s&&(n.appendFile=o);function o(k,j,F,D){return typeof F=="function"&&(D=F,F=null),X(k,j,F,D);function X(ie,K,U,Y,le){return s(ie,K,U,function(z){z&&(z.code==="EMFILE"||z.code==="ENFILE")?Ct([X,[ie,K,U,Y],z,le||Date.now(),Date.now()]):typeof Y=="function"&&Y.apply(this,arguments)})}}var a=n.copyFile;a&&(n.copyFile=l);function l(k,j,F,D){return typeof F=="function"&&(D=F,F=0),X(k,j,F,D);function X(ie,K,U,Y,le){return a(ie,K,U,function(z){z&&(z.code==="EMFILE"||z.code==="ENFILE")?Ct([X,[ie,K,U,Y],z,le||Date.now(),Date.now()]):typeof Y=="function"&&Y.apply(this,arguments)})}}var c=n.readdir;n.readdir=f;var u=/^v[0-5]\./;function f(k,j,F){typeof j=="function"&&(F=j,j=null);var D=u.test(process.version)?function(K,U,Y,le){return c(K,X(K,U,Y,le))}:function(K,U,Y,le){return c(K,U,X(K,U,Y,le))};return D(k,j,F);function X(ie,K,U,Y){return function(le,z){le&&(le.code==="EMFILE"||le.code==="ENFILE")?Ct([D,[ie,K,U],le,Y||Date.now(),Date.now()]):(z&&z.sort&&z.sort(),typeof U=="function"&&U.call(this,le,z))}}}if(process.version.substr(0,4)==="v0.8"){var p=_0(n);L=p.ReadStream,b=p.WriteStream}var h=n.ReadStream;h&&(L.prototype=Object.create(h.prototype),L.prototype.open=w);var y=n.WriteStream;y&&(b.prototype=Object.create(y.prototype),b.prototype.open=$),Object.defineProperty(n,"ReadStream",{get:function(){return L},set:function(k){L=k},enumerable:!0,configurable:!0}),Object.defineProperty(n,"WriteStream",{get:function(){return b},set:function(k){b=k},enumerable:!0,configurable:!0});var g=L;Object.defineProperty(n,"FileReadStream",{get:function(){return g},set:function(k){g=k},enumerable:!0,configurable:!0});var m=b;Object.defineProperty(n,"FileWriteStream",{get:function(){return m},set:function(k){m=k},enumerable:!0,configurable:!0});function L(k,j){return this instanceof L?(h.apply(this,arguments),this):L.apply(Object.create(L.prototype),arguments)}function w(){var k=this;G(k.path,k.flags,k.mode,function(j,F){j?(k.autoClose&&k.destroy(),k.emit("error",j)):(k.fd=F,k.emit("open",F),k.read())})}function b(k,j){return this instanceof b?(y.apply(this,arguments),this):b.apply(Object.create(b.prototype),arguments)}function $(){var k=this;G(k.path,k.flags,k.mode,function(j,F){j?(k.destroy(),k.emit("error",j)):(k.fd=F,k.emit("open",F))})}function M(k,j){return new n.ReadStream(k,j)}function v(k,j){return new n.WriteStream(k,j)}var V=n.open;n.open=G;function G(k,j,F,D){return typeof F=="function"&&(D=F,F=null),X(k,j,F,D);function X(ie,K,U,Y,le){return V(ie,K,U,function(z,pe){z&&(z.code==="EMFILE"||z.code==="ENFILE")?Ct([X,[ie,K,U,Y],z,le||Date.now(),Date.now()]):typeof Y=="function"&&Y.apply(this,arguments)})}}return n}function Ct(n){mt("ENQUEUE",n[0].name,n[1]),se[me].push(n),qs()}var gr;function qc(){for(var n=Date.now(),e=0;e<se[me].length;++e)se[me][e].length>2&&(se[me][e][3]=n,se[me][e][4]=n);qs()}function qs(){if(clearTimeout(gr),gr=void 0,se[me].length!==0){var n=se[me].shift(),e=n[0],t=n[1],r=n[2],i=n[3],s=n[4];if(i===void 0)mt("RETRY",e.name,t),e.apply(null,t);else if(Date.now()-i>=6e4){mt("TIMEOUT",e.name,t);var o=t.pop();typeof o=="function"&&o.call(null,r)}else{var a=Date.now()-s,l=Math.max(s-i,1),c=Math.min(l*1.2,100);a>=c?(mt("RETRY",e.name,t),e.apply(null,t.concat([i]))):se[me].push(n)}gr===void 0&&(gr=setTimeout(qs,0))}}});var gt=_(Xe=>{"use strict";var Mc=Ie().fromCallback,Ee=we(),y0=["access","appendFile","chmod","chown","close","copyFile","fchmod","fchown","fdatasync","fstat","fsync","ftruncate","futimes","lchmod","lchown","link","lstat","mkdir","mkdtemp","open","opendir","readdir","readFile","readlink","realpath","rename","rm","rmdir","stat","symlink","truncate","unlink","utimes","writeFile"].filter(n=>typeof Ee[n]=="function");Object.assign(Xe,Ee);y0.forEach(n=>{Xe[n]=Mc(Ee[n])});Xe.exists=function(n,e){return typeof e=="function"?Ee.exists(n,e):new Promise(t=>Ee.exists(n,t))};Xe.read=function(n,e,t,r,i,s){return typeof s=="function"?Ee.read(n,e,t,r,i,s):new Promise((o,a)=>{Ee.read(n,e,t,r,i,(l,c,u)=>{if(l)return a(l);o({bytesRead:c,buffer:u})})})};Xe.write=function(n,e,...t){return typeof t[t.length-1]=="function"?Ee.write(n,e,...t):new Promise((r,i)=>{Ee.write(n,e,...t,(s,o,a)=>{if(s)return i(s);r({bytesWritten:o,buffer:a})})})};Xe.readv=function(n,e,...t){return typeof t[t.length-1]=="function"?Ee.readv(n,e,...t):new Promise((r,i)=>{Ee.readv(n,e,...t,(s,o,a)=>{if(s)return i(s);r({bytesRead:o,buffers:a})})})};Xe.writev=function(n,e,...t){return typeof t[t.length-1]=="function"?Ee.writev(n,e,...t):new Promise((r,i)=>{Ee.writev(n,e,...t,(s,o,a)=>{if(s)return i(s);r({bytesWritten:o,buffers:a})})})};typeof Ee.realpath.native=="function"?Xe.realpath.native=Mc(Ee.realpath.native):process.emitWarning("fs.realpath.native is not a function. Is fs being monkey-patched?","Warning","fs-extra-WARN0003")});var Dc=_((Qb,Fc)=>{"use strict";var E0=require("path");Fc.exports.checkPath=function(e){if(process.platform==="win32"&&/[<>:"|?*]/.test(e.replace(E0.parse(e).root,""))){let r=new Error(`Path contains invalid characters: ${e}`);throw r.code="EINVAL",r}}});var Uc=_((Zb,Ms)=>{"use strict";var jc=gt(),{checkPath:Hc}=Dc(),Bc=n=>{let e={mode:511};return typeof n=="number"?n:{...e,...n}.mode};Ms.exports.makeDir=async(n,e)=>(Hc(n),jc.mkdir(n,{mode:Bc(e),recursive:!0}));Ms.exports.makeDirSync=(n,e)=>(Hc(n),jc.mkdirSync(n,{mode:Bc(e),recursive:!0}))});var je=_((eN,Vc)=>{"use strict";var T0=Ie().fromPromise,{makeDir:L0,makeDirSync:Fs}=Uc(),Ds=T0(L0);Vc.exports={mkdirs:Ds,mkdirsSync:Fs,mkdirp:Ds,mkdirpSync:Fs,ensureDir:Ds,ensureDirSync:Fs}});var et=_((tN,Gc)=>{"use strict";var S0=Ie().fromPromise,Wc=gt();function A0(n){return Wc.access(n).then(()=>!0).catch(()=>!1)}Gc.exports={pathExists:S0(A0),pathExistsSync:Wc.existsSync}});var js=_((nN,Kc)=>{"use strict";var Pt=we();function I0(n,e,t,r){Pt.open(n,"r+",(i,s)=>{if(i)return r(i);Pt.futimes(s,e,t,o=>{Pt.close(s,a=>{r&&r(o||a)})})})}function w0(n,e,t){let r=Pt.openSync(n,"r+");return Pt.futimesSync(r,e,t),Pt.closeSync(r)}Kc.exports={utimesMillis:I0,utimesMillisSync:w0}});var yt=_((rN,Xc)=>{"use strict";var kt=gt(),de=require("path"),v0=require("util");function b0(n,e,t){let r=t.dereference?i=>kt.stat(i,{bigint:!0}):i=>kt.lstat(i,{bigint:!0});return Promise.all([r(n),r(e).catch(i=>{if(i.code==="ENOENT")return null;throw i})]).then(([i,s])=>({srcStat:i,destStat:s}))}function N0(n,e,t){let r,i=t.dereference?o=>kt.statSync(o,{bigint:!0}):o=>kt.lstatSync(o,{bigint:!0}),s=i(n);try{r=i(e)}catch(o){if(o.code==="ENOENT")return{srcStat:s,destStat:null};throw o}return{srcStat:s,destStat:r}}function O0(n,e,t,r,i){v0.callbackify(b0)(n,e,r,(s,o)=>{if(s)return i(s);let{srcStat:a,destStat:l}=o;if(l){if(rn(a,l)){let c=de.basename(n),u=de.basename(e);return t==="move"&&c!==u&&c.toLowerCase()===u.toLowerCase()?i(null,{srcStat:a,destStat:l,isChangingCase:!0}):i(new Error("Source and destination must not be the same."))}if(a.isDirectory()&&!l.isDirectory())return i(new Error(`Cannot overwrite non-directory '${e}' with directory '${n}'.`));if(!a.isDirectory()&&l.isDirectory())return i(new Error(`Cannot overwrite directory '${e}' with non-directory '${n}'.`))}return a.isDirectory()&&Hs(n,e)?i(new Error(Er(n,e,t))):i(null,{srcStat:a,destStat:l})})}function R0(n,e,t,r){let{srcStat:i,destStat:s}=N0(n,e,r);if(s){if(rn(i,s)){let o=de.basename(n),a=de.basename(e);if(t==="move"&&o!==a&&o.toLowerCase()===a.toLowerCase())return{srcStat:i,destStat:s,isChangingCase:!0};throw new Error("Source and destination must not be the same.")}if(i.isDirectory()&&!s.isDirectory())throw new Error(`Cannot overwrite non-directory '${e}' with directory '${n}'.`);if(!i.isDirectory()&&s.isDirectory())throw new Error(`Cannot overwrite directory '${e}' with non-directory '${n}'.`)}if(i.isDirectory()&&Hs(n,e))throw new Error(Er(n,e,t));return{srcStat:i,destStat:s}}function Yc(n,e,t,r,i){let s=de.resolve(de.dirname(n)),o=de.resolve(de.dirname(t));if(o===s||o===de.parse(o).root)return i();kt.stat(o,{bigint:!0},(a,l)=>a?a.code==="ENOENT"?i():i(a):rn(e,l)?i(new Error(Er(n,t,r))):Yc(n,e,o,r,i))}function Jc(n,e,t,r){let i=de.resolve(de.dirname(n)),s=de.resolve(de.dirname(t));if(s===i||s===de.parse(s).root)return;let o;try{o=kt.statSync(s,{bigint:!0})}catch(a){if(a.code==="ENOENT")return;throw a}if(rn(e,o))throw new Error(Er(n,t,r));return Jc(n,e,s,r)}function rn(n,e){return e.ino&&e.dev&&e.ino===n.ino&&e.dev===n.dev}function Hs(n,e){let t=de.resolve(n).split(de.sep).filter(i=>i),r=de.resolve(e).split(de.sep).filter(i=>i);return t.reduce((i,s,o)=>i&&r[o]===s,!0)}function Er(n,e,t){return`Cannot ${t} '${n}' to a subdirectory of itself, '${e}'.`}Xc.exports={checkPaths:O0,checkPathsSync:R0,checkParentPaths:Yc,checkParentPathsSync:Jc,isSrcSubdir:Hs,areIdentical:rn}});var nu=_((iN,tu)=>{"use strict";var ve=we(),sn=require("path"),C0=je().mkdirs,P0=et().pathExists,k0=js().utimesMillis,on=yt();function $0(n,e,t,r){typeof t=="function"&&!r?(r=t,t={}):typeof t=="function"&&(t={filter:t}),r=r||function(){},t=t||{},t.clobber="clobber"in t?!!t.clobber:!0,t.overwrite="overwrite"in t?!!t.overwrite:t.clobber,t.preserveTimestamps&&process.arch==="ia32"&&process.emitWarning(`Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,"Warning","fs-extra-WARN0001"),on.checkPaths(n,e,"copy",t,(i,s)=>{if(i)return r(i);let{srcStat:o,destStat:a}=s;on.checkParentPaths(n,o,e,"copy",l=>{if(l)return r(l);Qc(n,e,t,(c,u)=>{if(c)return r(c);if(!u)return r();q0(a,n,e,t,r)})})})}function q0(n,e,t,r,i){let s=sn.dirname(t);P0(s,(o,a)=>{if(o)return i(o);if(a)return Bs(n,e,t,r,i);C0(s,l=>l?i(l):Bs(n,e,t,r,i))})}function Qc(n,e,t,r){if(!t.filter)return r(null,!0);Promise.resolve(t.filter(n,e)).then(i=>r(null,i),i=>r(i))}function Bs(n,e,t,r,i){(r.dereference?ve.stat:ve.lstat)(e,(o,a)=>o?i(o):a.isDirectory()?B0(a,n,e,t,r,i):a.isFile()||a.isCharacterDevice()||a.isBlockDevice()?x0(a,n,e,t,r,i):a.isSymbolicLink()?W0(n,e,t,r,i):a.isSocket()?i(new Error(`Cannot copy a socket file: ${e}`)):a.isFIFO()?i(new Error(`Cannot copy a FIFO pipe: ${e}`)):i(new Error(`Unknown file: ${e}`)))}function x0(n,e,t,r,i,s){return e?M0(n,t,r,i,s):Zc(n,t,r,i,s)}function M0(n,e,t,r,i){if(r.overwrite)ve.unlink(t,s=>s?i(s):Zc(n,e,t,r,i));else return r.errorOnExist?i(new Error(`'${t}' already exists`)):i()}function Zc(n,e,t,r,i){ve.copyFile(e,t,s=>s?i(s):r.preserveTimestamps?F0(n.mode,e,t,i):Tr(t,n.mode,i))}function F0(n,e,t,r){return D0(n)?j0(t,n,i=>i?r(i):zc(n,e,t,r)):zc(n,e,t,r)}function D0(n){return(n&128)===0}function j0(n,e,t){return Tr(n,e|128,t)}function zc(n,e,t,r){H0(e,t,i=>i?r(i):Tr(t,n,r))}function Tr(n,e,t){return ve.chmod(n,e,t)}function H0(n,e,t){ve.stat(n,(r,i)=>r?t(r):k0(e,i.atime,i.mtime,t))}function B0(n,e,t,r,i,s){return e?eu(t,r,i,s):U0(n.mode,t,r,i,s)}function U0(n,e,t,r,i){ve.mkdir(t,s=>{if(s)return i(s);eu(e,t,r,o=>o?i(o):Tr(t,n,i))})}function eu(n,e,t,r){ve.readdir(n,(i,s)=>i?r(i):Us(s,n,e,t,r))}function Us(n,e,t,r,i){let s=n.pop();return s?V0(n,s,e,t,r,i):i()}function V0(n,e,t,r,i,s){let o=sn.join(t,e),a=sn.join(r,e);Qc(o,a,i,(l,c)=>{if(l)return s(l);if(!c)return Us(n,t,r,i,s);on.checkPaths(o,a,"copy",i,(u,f)=>{if(u)return s(u);let{destStat:p}=f;Bs(p,o,a,i,h=>h?s(h):Us(n,t,r,i,s))})})}function W0(n,e,t,r,i){ve.readlink(e,(s,o)=>{if(s)return i(s);if(r.dereference&&(o=sn.resolve(process.cwd(),o)),n)ve.readlink(t,(a,l)=>a?a.code==="EINVAL"||a.code==="UNKNOWN"?ve.symlink(o,t,i):i(a):(r.dereference&&(l=sn.resolve(process.cwd(),l)),on.isSrcSubdir(o,l)?i(new Error(`Cannot copy '${o}' to a subdirectory of itself, '${l}'.`)):on.isSrcSubdir(l,o)?i(new Error(`Cannot overwrite '${l}' with '${o}'.`)):G0(o,t,i)));else return ve.symlink(o,t,i)})}function G0(n,e,t){ve.unlink(e,r=>r?t(r):ve.symlink(n,e,t))}tu.exports=$0});var au=_((sN,ou)=>{"use strict";var Te=we(),an=require("path"),K0=je().mkdirsSync,Y0=js().utimesMillisSync,ln=yt();function J0(n,e,t){typeof t=="function"&&(t={filter:t}),t=t||{},t.clobber="clobber"in t?!!t.clobber:!0,t.overwrite="overwrite"in t?!!t.overwrite:t.clobber,t.preserveTimestamps&&process.arch==="ia32"&&process.emitWarning(`Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,"Warning","fs-extra-WARN0002");let{srcStat:r,destStat:i}=ln.checkPathsSync(n,e,"copy",t);if(ln.checkParentPathsSync(n,r,e,"copy"),t.filter&&!t.filter(n,e))return;let s=an.dirname(e);return Te.existsSync(s)||K0(s),ru(i,n,e,t)}function ru(n,e,t,r){let s=(r.dereference?Te.statSync:Te.lstatSync)(e);if(s.isDirectory())return ny(s,n,e,t,r);if(s.isFile()||s.isCharacterDevice()||s.isBlockDevice())return X0(s,n,e,t,r);if(s.isSymbolicLink())return sy(n,e,t,r);throw s.isSocket()?new Error(`Cannot copy a socket file: ${e}`):s.isFIFO()?new Error(`Cannot copy a FIFO pipe: ${e}`):new Error(`Unknown file: ${e}`)}function X0(n,e,t,r,i){return e?z0(n,t,r,i):iu(n,t,r,i)}function z0(n,e,t,r){if(r.overwrite)return Te.unlinkSync(t),iu(n,e,t,r);if(r.errorOnExist)throw new Error(`'${t}' already exists`)}function iu(n,e,t,r){return Te.copyFileSync(e,t),r.preserveTimestamps&&Q0(n.mode,e,t),Vs(t,n.mode)}function Q0(n,e,t){return Z0(n)&&ey(t,n),ty(e,t)}function Z0(n){return(n&128)===0}function ey(n,e){return Vs(n,e|128)}function Vs(n,e){return Te.chmodSync(n,e)}function ty(n,e){let t=Te.statSync(n);return Y0(e,t.atime,t.mtime)}function ny(n,e,t,r,i){return e?su(t,r,i):ry(n.mode,t,r,i)}function ry(n,e,t,r){return Te.mkdirSync(t),su(e,t,r),Vs(t,n)}function su(n,e,t){Te.readdirSync(n).forEach(r=>iy(r,n,e,t))}function iy(n,e,t,r){let i=an.join(e,n),s=an.join(t,n);if(r.filter&&!r.filter(i,s))return;let{destStat:o}=ln.checkPathsSync(i,s,"copy",r);return ru(o,i,s,r)}function sy(n,e,t,r){let i=Te.readlinkSync(e);if(r.dereference&&(i=an.resolve(process.cwd(),i)),n){let s;try{s=Te.readlinkSync(t)}catch(o){if(o.code==="EINVAL"||o.code==="UNKNOWN")return Te.symlinkSync(i,t);throw o}if(r.dereference&&(s=an.resolve(process.cwd(),s)),ln.isSrcSubdir(i,s))throw new Error(`Cannot copy '${i}' to a subdirectory of itself, '${s}'.`);if(ln.isSrcSubdir(s,i))throw new Error(`Cannot overwrite '${s}' with '${i}'.`);return oy(i,t)}else return Te.symlinkSync(i,t)}function oy(n,e){return Te.unlinkSync(e),Te.symlinkSync(n,e)}ou.exports=J0});var Lr=_((oN,lu)=>{"use strict";var ay=Ie().fromCallback;lu.exports={copy:ay(nu()),copySync:au()}});var cn=_((aN,uu)=>{"use strict";var cu=we(),ly=Ie().fromCallback;function cy(n,e){cu.rm(n,{recursive:!0,force:!0},e)}function uy(n){cu.rmSync(n,{recursive:!0,force:!0})}uu.exports={remove:ly(cy),removeSync:uy}});var yu=_((lN,gu)=>{"use strict";var fy=Ie().fromPromise,du=gt(),pu=require("path"),_u=je(),mu=cn(),fu=fy(async function(e){let t;try{t=await du.readdir(e)}catch{return _u.mkdirs(e)}return Promise.all(t.map(r=>mu.remove(pu.join(e,r))))});function hu(n){let e;try{e=du.readdirSync(n)}catch{return _u.mkdirsSync(n)}e.forEach(t=>{t=pu.join(n,t),mu.removeSync(t)})}gu.exports={emptyDirSync:hu,emptydirSync:hu,emptyDir:fu,emptydir:fu}});var Su=_((cN,Lu)=>{"use strict";var hy=Ie().fromCallback,Eu=require("path"),tt=we(),Tu=je();function dy(n,e){function t(){tt.writeFile(n,"",r=>{if(r)return e(r);e()})}tt.stat(n,(r,i)=>{if(!r&&i.isFile())return e();let s=Eu.dirname(n);tt.stat(s,(o,a)=>{if(o)return o.code==="ENOENT"?Tu.mkdirs(s,l=>{if(l)return e(l);t()}):e(o);a.isDirectory()?t():tt.readdir(s,l=>{if(l)return e(l)})})})}function py(n){let e;try{e=tt.statSync(n)}catch{}if(e&&e.isFile())return;let t=Eu.dirname(n);try{tt.statSync(t).isDirectory()||tt.readdirSync(t)}catch(r){if(r&&r.code==="ENOENT")Tu.mkdirsSync(t);else throw r}tt.writeFileSync(n,"")}Lu.exports={createFile:hy(dy),createFileSync:py}});var bu=_((uN,vu)=>{"use strict";var _y=Ie().fromCallback,Au=require("path"),nt=we(),Iu=je(),my=et().pathExists,{areIdentical:wu}=yt();function gy(n,e,t){function r(i,s){nt.link(i,s,o=>{if(o)return t(o);t(null)})}nt.lstat(e,(i,s)=>{nt.lstat(n,(o,a)=>{if(o)return o.message=o.message.replace("lstat","ensureLink"),t(o);if(s&&wu(a,s))return t(null);let l=Au.dirname(e);my(l,(c,u)=>{if(c)return t(c);if(u)return r(n,e);Iu.mkdirs(l,f=>{if(f)return t(f);r(n,e)})})})})}function yy(n,e){let t;try{t=nt.lstatSync(e)}catch{}try{let s=nt.lstatSync(n);if(t&&wu(s,t))return}catch(s){throw s.message=s.message.replace("lstat","ensureLink"),s}let r=Au.dirname(e);return nt.existsSync(r)||Iu.mkdirsSync(r),nt.linkSync(n,e)}vu.exports={createLink:_y(gy),createLinkSync:yy}});var Ou=_((fN,Nu)=>{"use strict";var rt=require("path"),un=we(),Ey=et().pathExists;function Ty(n,e,t){if(rt.isAbsolute(n))return un.lstat(n,r=>r?(r.message=r.message.replace("lstat","ensureSymlink"),t(r)):t(null,{toCwd:n,toDst:n}));{let r=rt.dirname(e),i=rt.join(r,n);return Ey(i,(s,o)=>s?t(s):o?t(null,{toCwd:i,toDst:n}):un.lstat(n,a=>a?(a.message=a.message.replace("lstat","ensureSymlink"),t(a)):t(null,{toCwd:n,toDst:rt.relative(r,n)})))}}function Ly(n,e){let t;if(rt.isAbsolute(n)){if(t=un.existsSync(n),!t)throw new Error("absolute srcpath does not exist");return{toCwd:n,toDst:n}}else{let r=rt.dirname(e),i=rt.join(r,n);if(t=un.existsSync(i),t)return{toCwd:i,toDst:n};if(t=un.existsSync(n),!t)throw new Error("relative srcpath does not exist");return{toCwd:n,toDst:rt.relative(r,n)}}}Nu.exports={symlinkPaths:Ty,symlinkPathsSync:Ly}});var Pu=_((hN,Cu)=>{"use strict";var Ru=we();function Sy(n,e,t){if(t=typeof e=="function"?e:t,e=typeof e=="function"?!1:e,e)return t(null,e);Ru.lstat(n,(r,i)=>{if(r)return t(null,"file");e=i&&i.isDirectory()?"dir":"file",t(null,e)})}function Ay(n,e){let t;if(e)return e;try{t=Ru.lstatSync(n)}catch{return"file"}return t&&t.isDirectory()?"dir":"file"}Cu.exports={symlinkType:Sy,symlinkTypeSync:Ay}});var ju=_((dN,Du)=>{"use strict";var Iy=Ie().fromCallback,$u=require("path"),He=gt(),qu=je(),wy=qu.mkdirs,vy=qu.mkdirsSync,xu=Ou(),by=xu.symlinkPaths,Ny=xu.symlinkPathsSync,Mu=Pu(),Oy=Mu.symlinkType,Ry=Mu.symlinkTypeSync,Cy=et().pathExists,{areIdentical:Fu}=yt();function Py(n,e,t,r){r=typeof t=="function"?t:r,t=typeof t=="function"?!1:t,He.lstat(e,(i,s)=>{!i&&s.isSymbolicLink()?Promise.all([He.stat(n),He.stat(e)]).then(([o,a])=>{if(Fu(o,a))return r(null);ku(n,e,t,r)}):ku(n,e,t,r)})}function ku(n,e,t,r){by(n,e,(i,s)=>{if(i)return r(i);n=s.toDst,Oy(s.toCwd,t,(o,a)=>{if(o)return r(o);let l=$u.dirname(e);Cy(l,(c,u)=>{if(c)return r(c);if(u)return He.symlink(n,e,a,r);wy(l,f=>{if(f)return r(f);He.symlink(n,e,a,r)})})})})}function ky(n,e,t){let r;try{r=He.lstatSync(e)}catch{}if(r&&r.isSymbolicLink()){let a=He.statSync(n),l=He.statSync(e);if(Fu(a,l))return}let i=Ny(n,e);n=i.toDst,t=Ry(i.toCwd,t);let s=$u.dirname(e);return He.existsSync(s)||vy(s),He.symlinkSync(n,e,t)}Du.exports={createSymlink:Iy(Py),createSymlinkSync:ky}});var Yu=_((pN,Ku)=>{"use strict";var{createFile:Hu,createFileSync:Bu}=Su(),{createLink:Uu,createLinkSync:Vu}=bu(),{createSymlink:Wu,createSymlinkSync:Gu}=ju();Ku.exports={createFile:Hu,createFileSync:Bu,ensureFile:Hu,ensureFileSync:Bu,createLink:Uu,createLinkSync:Vu,ensureLink:Uu,ensureLinkSync:Vu,createSymlink:Wu,createSymlinkSync:Gu,ensureSymlink:Wu,ensureSymlinkSync:Gu}});var Sr=_((_N,Ju)=>{function $y(n,{EOL:e=`
`,finalEOL:t=!0,replacer:r=null,spaces:i}={}){let s=t?e:"";return JSON.stringify(n,r,i).replace(/\n/g,e)+s}function qy(n){return Buffer.isBuffer(n)&&(n=n.toString("utf8")),n.replace(/^\uFEFF/,"")}Ju.exports={stringify:$y,stripBom:qy}});var Zu=_((mN,Qu)=>{var $t;try{$t=we()}catch{$t=require("fs")}var Ar=Ie(),{stringify:Xu,stripBom:zu}=Sr();async function xy(n,e={}){typeof e=="string"&&(e={encoding:e});let t=e.fs||$t,r="throws"in e?e.throws:!0,i=await Ar.fromCallback(t.readFile)(n,e);i=zu(i);let s;try{s=JSON.parse(i,e?e.reviver:null)}catch(o){if(r)throw o.message=`${n}: ${o.message}`,o;return null}return s}var My=Ar.fromPromise(xy);function Fy(n,e={}){typeof e=="string"&&(e={encoding:e});let t=e.fs||$t,r="throws"in e?e.throws:!0;try{let i=t.readFileSync(n,e);return i=zu(i),JSON.parse(i,e.reviver)}catch(i){if(r)throw i.message=`${n}: ${i.message}`,i;return null}}async function Dy(n,e,t={}){let r=t.fs||$t,i=Xu(e,t);await Ar.fromCallback(r.writeFile)(n,i,t)}var jy=Ar.fromPromise(Dy);function Hy(n,e,t={}){let r=t.fs||$t,i=Xu(e,t);return r.writeFileSync(n,i,t)}var By={readFile:My,readFileSync:Fy,writeFile:jy,writeFileSync:Hy};Qu.exports=By});var tf=_((gN,ef)=>{"use strict";var Ir=Zu();ef.exports={readJson:Ir.readFile,readJsonSync:Ir.readFileSync,writeJson:Ir.writeFile,writeJsonSync:Ir.writeFileSync}});var wr=_((yN,sf)=>{"use strict";var Uy=Ie().fromCallback,fn=we(),nf=require("path"),rf=je(),Vy=et().pathExists;function Wy(n,e,t,r){typeof t=="function"&&(r=t,t="utf8");let i=nf.dirname(n);Vy(i,(s,o)=>{if(s)return r(s);if(o)return fn.writeFile(n,e,t,r);rf.mkdirs(i,a=>{if(a)return r(a);fn.writeFile(n,e,t,r)})})}function Gy(n,...e){let t=nf.dirname(n);if(fn.existsSync(t))return fn.writeFileSync(n,...e);rf.mkdirsSync(t),fn.writeFileSync(n,...e)}sf.exports={outputFile:Uy(Wy),outputFileSync:Gy}});var af=_((EN,of)=>{"use strict";var{stringify:Ky}=Sr(),{outputFile:Yy}=wr();async function Jy(n,e,t={}){let r=Ky(e,t);await Yy(n,r,t)}of.exports=Jy});var cf=_((TN,lf)=>{"use strict";var{stringify:Xy}=Sr(),{outputFileSync:zy}=wr();function Qy(n,e,t){let r=Xy(e,t);zy(n,r,t)}lf.exports=Qy});var ff=_((LN,uf)=>{"use strict";var Zy=Ie().fromPromise,Le=tf();Le.outputJson=Zy(af());Le.outputJsonSync=cf();Le.outputJSON=Le.outputJson;Le.outputJSONSync=Le.outputJsonSync;Le.writeJSON=Le.writeJson;Le.writeJSONSync=Le.writeJsonSync;Le.readJSON=Le.readJson;Le.readJSONSync=Le.readJsonSync;uf.exports=Le});var mf=_((SN,_f)=>{"use strict";var eE=we(),Gs=require("path"),tE=Lr().copy,pf=cn().remove,nE=je().mkdirp,rE=et().pathExists,hf=yt();function iE(n,e,t,r){typeof t=="function"&&(r=t,t={}),t=t||{};let i=t.overwrite||t.clobber||!1;hf.checkPaths(n,e,"move",t,(s,o)=>{if(s)return r(s);let{srcStat:a,isChangingCase:l=!1}=o;hf.checkParentPaths(n,a,e,"move",c=>{if(c)return r(c);if(sE(e))return df(n,e,i,l,r);nE(Gs.dirname(e),u=>u?r(u):df(n,e,i,l,r))})})}function sE(n){let e=Gs.dirname(n);return Gs.parse(e).root===e}function df(n,e,t,r,i){if(r)return Ws(n,e,t,i);if(t)return pf(e,s=>s?i(s):Ws(n,e,t,i));rE(e,(s,o)=>s?i(s):o?i(new Error("dest already exists.")):Ws(n,e,t,i))}function Ws(n,e,t,r){eE.rename(n,e,i=>i?i.code!=="EXDEV"?r(i):oE(n,e,t,r):r())}function oE(n,e,t,r){tE(n,e,{overwrite:t,errorOnExist:!0,preserveTimestamps:!0},s=>s?r(s):pf(n,r))}_f.exports=iE});var Lf=_((AN,Tf)=>{"use strict";var yf=we(),Ys=require("path"),aE=Lr().copySync,Ef=cn().removeSync,lE=je().mkdirpSync,gf=yt();function cE(n,e,t){t=t||{};let r=t.overwrite||t.clobber||!1,{srcStat:i,isChangingCase:s=!1}=gf.checkPathsSync(n,e,"move",t);return gf.checkParentPathsSync(n,i,e,"move"),uE(e)||lE(Ys.dirname(e)),fE(n,e,r,s)}function uE(n){let e=Ys.dirname(n);return Ys.parse(e).root===e}function fE(n,e,t,r){if(r)return Ks(n,e,t);if(t)return Ef(e),Ks(n,e,t);if(yf.existsSync(e))throw new Error("dest already exists.");return Ks(n,e,t)}function Ks(n,e,t){try{yf.renameSync(n,e)}catch(r){if(r.code!=="EXDEV")throw r;return hE(n,e,t)}}function hE(n,e,t){return aE(n,e,{overwrite:t,errorOnExist:!0,preserveTimestamps:!0}),Ef(n)}Tf.exports=cE});var Af=_((IN,Sf)=>{"use strict";var dE=Ie().fromCallback;Sf.exports={move:dE(mf()),moveSync:Lf()}});var it=_((wN,If)=>{"use strict";If.exports={...gt(),...Lr(),...yu(),...Yu(),...ff(),...je(),...Af(),...wr(),...et(),...cn()}});var Nf=_((PN,eo)=>{typeof Object.create=="function"?eo.exports=function(e,t){t&&(e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}))}:eo.exports=function(e,t){if(t){e.super_=t;var r=function(){};r.prototype=t.prototype,e.prototype=new r,e.prototype.constructor=e}}});var Of=_((kN,no)=>{try{if(to=require("util"),typeof to.inherits!="function")throw"";no.exports=to.inherits}catch{no.exports=Nf()}var to});var Cf=_(($N,io)=>{var TE=Of(),Rf=require("events").EventEmitter;io.exports=Pe;io.exports.default=Pe;function Pe(n){if(!(this instanceof Pe))return new Pe(n);Rf.call(this),n=n||{},this.concurrency=n.concurrency||1/0,this.timeout=n.timeout||0,this.autostart=n.autostart||!1,this.results=n.results||null,this.pending=0,this.session=0,this.running=!1,this.jobs=[],this.timers={}}TE(Pe,Rf);var LE=["pop","shift","indexOf","lastIndexOf"];LE.forEach(function(n){Pe.prototype[n]=function(){return Array.prototype[n].apply(this.jobs,arguments)}});Pe.prototype.slice=function(n,e){return this.jobs=this.jobs.slice(n,e),this};Pe.prototype.reverse=function(){return this.jobs.reverse(),this};var SE=["push","unshift","splice"];SE.forEach(function(n){Pe.prototype[n]=function(){var e=Array.prototype[n].apply(this.jobs,arguments);return this.autostart&&this.start(),e}});Object.defineProperty(Pe.prototype,"length",{get:function(){return this.pending+this.jobs.length}});Pe.prototype.start=function(n){if(n&&IE.call(this,n),this.running=!0,this.pending>=this.concurrency)return;if(this.jobs.length===0){this.pending===0&&ro.call(this);return}var e=this,t=this.jobs.shift(),r=!0,i=this.session,s=null,o=!1,a=null,l=t.hasOwnProperty("timeout")?t.timeout:this.timeout;function c(f,p){r&&e.session===i&&(r=!1,e.pending--,s!==null&&(delete e.timers[s],clearTimeout(s)),f?e.emit("error",f,t):o===!1&&(a!==null&&(e.results[a]=Array.prototype.slice.call(arguments,1)),e.emit("success",p,t)),e.session===i&&(e.pending===0&&e.jobs.length===0?ro.call(e):e.running&&e.start()))}l&&(s=setTimeout(function(){o=!0,e.listeners("timeout").length>0?e.emit("timeout",c,t):c()},l),this.timers[s]=s),this.results&&(a=this.results.length,this.results[a]=null),this.pending++,e.emit("start",t);var u=t(c);u&&u.then&&typeof u.then=="function"&&u.then(function(f){return c(null,f)}).catch(function(f){return c(f||!0)}),this.running&&this.jobs.length>0&&this.start()};Pe.prototype.stop=function(){this.running=!1};Pe.prototype.end=function(n){AE.call(this),this.jobs.length=0,this.pending=0,ro.call(this,n)};function AE(){for(var n in this.timers){var e=this.timers[n];delete this.timers[n],clearTimeout(e)}}function IE(n){var e=this;this.on("error",t),this.on("end",r);function t(i){e.end(i)}function r(i){e.removeListener("error",t),e.removeListener("end",r),n(i,this.results)}}function ro(n){this.session++,this.running=!1,this.emit("end",n)}});var Pf=_(Nr=>{"use strict";Object.defineProperty(Nr,"__esModule",{value:!0});Nr.BMP=void 0;Nr.BMP={validate(n){return n.toString("ascii",0,2)==="BM"},calculate(n){return{height:Math.abs(n.readInt32LE(22)),width:n.readUInt32LE(18)}}}});var so=_(Or=>{"use strict";Object.defineProperty(Or,"__esModule",{value:!0});Or.ICO=void 0;var wE=1,vE=2+2+2,bE=1+1+1+1+2+2+4+4;function kf(n,e){let t=n.readUInt8(e);return t===0?256:t}function $f(n,e){let t=vE+e*bE;return{height:kf(n,t+1),width:kf(n,t)}}Or.ICO={validate(n){let e=n.readUInt16LE(0),t=n.readUInt16LE(4);return e!==0||t===0?!1:n.readUInt16LE(2)===wE},calculate(n){let e=n.readUInt16LE(4),t=$f(n,0);if(e===1)return t;let r=[t];for(let s=1;s<e;s+=1)r.push($f(n,s));return{height:t.height,images:r,width:t.width}}}});var qf=_(Rr=>{"use strict";Object.defineProperty(Rr,"__esModule",{value:!0});Rr.CUR=void 0;var NE=so(),OE=2;Rr.CUR={validate(n){let e=n.readUInt16LE(0),t=n.readUInt16LE(4);return e!==0||t===0?!1:n.readUInt16LE(2)===OE},calculate(n){return NE.ICO.calculate(n)}}});var xf=_(Cr=>{"use strict";Object.defineProperty(Cr,"__esModule",{value:!0});Cr.DDS=void 0;Cr.DDS={validate(n){return n.readUInt32LE(0)===542327876},calculate(n){return{height:n.readUInt32LE(12),width:n.readUInt32LE(16)}}}});var Mf=_(Pr=>{"use strict";Object.defineProperty(Pr,"__esModule",{value:!0});Pr.GIF=void 0;var RE=/^GIF8[79]a/;Pr.GIF={validate(n){let e=n.toString("ascii",0,6);return RE.test(e)},calculate(n){return{height:n.readUInt16LE(8),width:n.readUInt16LE(6)}}}});var jf=_(kr=>{"use strict";Object.defineProperty(kr,"__esModule",{value:!0});kr.ICNS=void 0;var CE=4+4,PE=4,kE=4,$E={ICON:32,"ICN#":32,"icm#":16,icm4:16,icm8:16,"ics#":16,ics4:16,ics8:16,is32:16,s8mk:16,icp4:16,icl4:32,icl8:32,il32:32,l8mk:32,icp5:32,ic11:32,ich4:48,ich8:48,ih32:48,h8mk:48,icp6:64,ic12:32,it32:128,t8mk:128,ic07:128,ic08:256,ic13:256,ic09:512,ic14:512,ic10:1024};function Ff(n,e){let t=e+kE;return[n.toString("ascii",e,t),n.readUInt32BE(t)]}function Df(n){let e=$E[n];return{width:e,height:e,type:n}}kr.ICNS={validate(n){return n.toString("ascii",0,4)==="icns"},calculate(n){let e=n.length,t=n.readUInt32BE(PE),r=CE,i=Ff(n,r),s=Df(i[0]);if(r+=i[1],r===t)return s;let o={height:s.height,images:[s],width:s.width};for(;r<t&&r<e;)i=Ff(n,r),s=Df(i[0]),r+=i[1],o.images.push(s);return o}}});var Hf=_($r=>{"use strict";Object.defineProperty($r,"__esModule",{value:!0});$r.J2C=void 0;$r.J2C={validate(n){return n.toString("hex",0,4)==="ff4fff51"},calculate(n){return{height:n.readUInt32BE(12),width:n.readUInt32BE(8)}}}});var Uf=_(xr=>{"use strict";Object.defineProperty(xr,"__esModule",{value:!0});xr.JP2=void 0;var qr={ftyp:"66747970",ihdr:"69686472",jp2h:"6a703268",jp__:"6a502020",rreq:"72726571",xml_:"786d6c20"},qE=n=>{let e=n.readUInt8(0),t=1+2*e,i=n.readUInt16BE(t)*(2+e);t=t+2+i;let o=n.readUInt16BE(t)*(16+e);return t+2+o},Bf=n=>({height:n.readUInt32BE(4),width:n.readUInt32BE(8)});xr.JP2={validate(n){let e=n.toString("hex",4,8),t=n.readUInt32BE(0);if(e!==qr.jp__||t<1)return!1;let r=t+4,i=n.readUInt32BE(t);return n.slice(r,r+i).toString("hex",0,4)===qr.ftyp},calculate(n){let e=n.readUInt32BE(0),t=n.readUInt16BE(e+2),r=e+4+t;switch(n.toString("hex",r,r+4)){case qr.rreq:return r=r+4+4+qE(n.slice(r+4)),Bf(n.slice(r+8,r+24));case qr.jp2h:return Bf(n.slice(r+8,r+24));default:throw new TypeError("Unsupported header found: "+n.toString("ascii",r,r+4))}}}});var oo=_(Mr=>{"use strict";Object.defineProperty(Mr,"__esModule",{value:!0});Mr.readUInt=void 0;function xE(n,e,t,r){t=t||0;let i=r?"BE":"LE",s="readUInt"+e+i;return n[s].call(n,t)}Mr.readUInt=xE});var Wf=_(Fr=>{"use strict";Object.defineProperty(Fr,"__esModule",{value:!0});Fr.JPG=void 0;var dn=oo(),ME="45786966",FE=2,ao=6,DE=2,jE="4d4d",HE="4949",Vf=12,BE=2;function UE(n){return n.toString("hex",2,6)===ME}function VE(n,e){return{height:n.readUInt16BE(e),width:n.readUInt16BE(e+2)}}function WE(n,e){let r=ao+8,i=(0,dn.readUInt)(n,16,r,e);for(let s=0;s<i;s++){let o=r+BE+s*Vf,a=o+Vf;if(o>n.length)return;let l=n.slice(o,a);if((0,dn.readUInt)(l,16,0,e)===274)return(0,dn.readUInt)(l,16,2,e)!==3||(0,dn.readUInt)(l,32,4,e)!==1?void 0:(0,dn.readUInt)(l,16,8,e)}}function GE(n,e){let t=n.slice(FE,e),r=t.toString("hex",ao,ao+DE),i=r===jE;if(i||r===HE)return WE(t,i)}function KE(n,e){if(e>n.length)throw new TypeError("Corrupt JPG, exceeded buffer limits");if(n[e]!==255)throw new TypeError("Invalid JPG, marker table corrupted")}Fr.JPG={validate(n){return n.toString("hex",0,2)==="ffd8"},calculate(n){n=n.slice(4);let e,t;for(;n.length;){let r=n.readUInt16BE(0);if(UE(n)&&(e=GE(n,r)),KE(n,r),t=n[r+1],t===192||t===193||t===194){let i=VE(n,r+5);return e?{height:i.height,orientation:e,width:i.width}:i}n=n.slice(r+2)}throw new TypeError("Invalid JPG, no size found")}}});var Gf=_(Dr=>{"use strict";Object.defineProperty(Dr,"__esModule",{value:!0});Dr.KTX=void 0;var YE="KTX 11";Dr.KTX={validate(n){return YE===n.toString("ascii",1,7)},calculate(n){return{height:n.readUInt32LE(40),width:n.readUInt32LE(36)}}}});var Yf=_(jr=>{"use strict";Object.defineProperty(jr,"__esModule",{value:!0});jr.PNG=void 0;var JE=`PNG\r

`,XE="IHDR",Kf="CgBI";jr.PNG={validate(n){if(JE===n.toString("ascii",1,8)){let e=n.toString("ascii",12,16);if(e===Kf&&(e=n.toString("ascii",28,32)),e!==XE)throw new TypeError("Invalid PNG");return!0}return!1},calculate(n){return n.toString("ascii",12,16)===Kf?{height:n.readUInt32BE(36),width:n.readUInt32BE(32)}:{height:n.readUInt32BE(20),width:n.readUInt32BE(16)}}}});var zf=_(Hr=>{"use strict";Object.defineProperty(Hr,"__esModule",{value:!0});Hr.PNM=void 0;var Xf={P1:"pbm/ascii",P2:"pgm/ascii",P3:"ppm/ascii",P4:"pbm",P5:"pgm",P6:"ppm",P7:"pam",PF:"pfm"},zE=Object.keys(Xf),Jf={default:n=>{let e=[];for(;n.length>0;){let t=n.shift();if(t[0]!=="#"){e=t.split(" ");break}}if(e.length===2)return{height:parseInt(e[1],10),width:parseInt(e[0],10)};throw new TypeError("Invalid PNM")},pam:n=>{let e={};for(;n.length>0;){let t=n.shift();if(t.length>16||t.charCodeAt(0)>128)continue;let[r,i]=t.split(" ");if(r&&i&&(e[r.toLowerCase()]=parseInt(i,10)),e.height&&e.width)break}if(e.height&&e.width)return{height:e.height,width:e.width};throw new TypeError("Invalid PAM")}};Hr.PNM={validate(n){let e=n.toString("ascii",0,2);return zE.includes(e)},calculate(n){let e=n.toString("ascii",0,2),t=Xf[e],r=n.toString("ascii",3).split(/[\r\n]+/);return(Jf[t]||Jf.default)(r)}}});var Qf=_(Br=>{"use strict";Object.defineProperty(Br,"__esModule",{value:!0});Br.PSD=void 0;Br.PSD={validate(n){return n.toString("ascii",0,4)==="8BPS"},calculate(n){return{height:n.readUInt32BE(14),width:n.readUInt32BE(18)}}}});var th=_(Wr=>{"use strict";Object.defineProperty(Wr,"__esModule",{value:!0});Wr.SVG=void 0;var Zf=/<svg\s([^>"']|"[^"]*"|'[^']*')*>/,Ur={height:/\sheight=(['"])([^%]+?)\1/,root:Zf,viewbox:/\sviewBox=(['"])(.+?)\1/i,width:/\swidth=(['"])([^%]+?)\1/},lo=2.54,eh={in:96,cm:96/lo,em:16,ex:8,m:96/lo*100,mm:96/lo/10,pc:96/72/12,pt:96/72,px:1},QE=new RegExp(`^([0-9.]+(?:e\\d+)?)(${Object.keys(eh).join("|")})?$`);function Vr(n){let e=QE.exec(n);if(e)return Math.round(Number(e[1])*(eh[e[2]]||1))}function ZE(n){let e=n.split(" ");return{height:Vr(e[3]),width:Vr(e[2])}}function e1(n){let e=n.match(Ur.width),t=n.match(Ur.height),r=n.match(Ur.viewbox);return{height:t&&Vr(t[2]),viewbox:r&&ZE(r[2]),width:e&&Vr(e[2])}}function t1(n){return{height:n.height,width:n.width}}function n1(n,e){let t=e.width/e.height;return n.width?{height:Math.floor(n.width/t),width:n.width}:n.height?{height:n.height,width:Math.floor(n.height*t)}:{height:e.height,width:e.width}}Wr.SVG={validate(n){let e=String(n);return Zf.test(e)},calculate(n){let e=n.toString("utf8").match(Ur.root);if(e){let t=e1(e[0]);if(t.width&&t.height)return t1(t);if(t.viewbox)return n1(t,t.viewbox)}throw new TypeError("Invalid SVG")}}});var nh=_(Gr=>{"use strict";Object.defineProperty(Gr,"__esModule",{value:!0});Gr.TGA=void 0;Gr.TGA={validate(n){return n.readUInt16LE(0)===0&&n.readUInt16LE(4)===0},calculate(n){return{height:n.readUInt16LE(14),width:n.readUInt16LE(12)}}}});var rh=_(Yr=>{"use strict";Object.defineProperty(Yr,"__esModule",{value:!0});Yr.TIFF=void 0;var Kr=require("fs"),Mt=oo();function r1(n,e,t){let r=(0,Mt.readUInt)(n,32,4,t),i=1024,s=Kr.statSync(e).size;r+i>s&&(i=s-r-10);let o=Buffer.alloc(i),a=Kr.openSync(e,"r");return Kr.readSync(a,o,0,i,r),Kr.closeSync(a),o.slice(2)}function i1(n,e){let t=(0,Mt.readUInt)(n,16,8,e);return((0,Mt.readUInt)(n,16,10,e)<<16)+t}function s1(n){if(n.length>24)return n.slice(12)}function o1(n,e){let t={},r=n;for(;r&&r.length;){let i=(0,Mt.readUInt)(r,16,0,e),s=(0,Mt.readUInt)(r,16,2,e),o=(0,Mt.readUInt)(r,32,4,e);if(i===0)break;o===1&&(s===3||s===4)&&(t[i]=i1(r,e)),r=s1(r)}return t}function a1(n){let e=n.toString("ascii",0,2);if(e==="II")return"LE";if(e==="MM")return"BE"}var l1=["49492a00","4d4d002a"];Yr.TIFF={validate(n){return l1.includes(n.toString("hex",0,4))},calculate(n,e){if(!e)throw new TypeError("Tiff doesn't support buffer");let t=a1(n)==="BE",r=r1(n,e,t),i=o1(r,t),s=i[256],o=i[257];if(!s||!o)throw new TypeError("Invalid Tiff. Missing tags");return{height:o,width:s}}}});var ih=_(Jr=>{"use strict";Object.defineProperty(Jr,"__esModule",{value:!0});Jr.WEBP=void 0;function c1(n){return{height:1+n.readUIntLE(7,3),width:1+n.readUIntLE(4,3)}}function u1(n){return{height:1+((n[4]&15)<<10|n[3]<<2|(n[2]&192)>>6),width:1+((n[2]&63)<<8|n[1])}}function f1(n){return{height:n.readInt16LE(8)&16383,width:n.readInt16LE(6)&16383}}Jr.WEBP={validate(n){let e=n.toString("ascii",0,4)==="RIFF",t=n.toString("ascii",8,12)==="WEBP",r=n.toString("ascii",12,15)==="VP8";return e&&t&&r},calculate(n){let e=n.toString("ascii",12,16);if(n=n.slice(20,30),e==="VP8X"){let r=n[0],i=(r&192)===0,s=(r&1)===0;if(i&&s)return c1(n);throw new TypeError("Invalid WebP")}if(e==="VP8 "&&n[0]!==47)return f1(n);let t=n.toString("hex",3,6);if(e==="VP8L"&&t!=="9d012a")return u1(n);throw new TypeError("Invalid WebP")}}});var co=_(Xr=>{"use strict";Object.defineProperty(Xr,"__esModule",{value:!0});Xr.typeHandlers=void 0;var h1=Pf(),d1=qf(),p1=xf(),_1=Mf(),m1=jf(),g1=so(),y1=Hf(),E1=Uf(),T1=Wf(),L1=Gf(),S1=Yf(),A1=zf(),I1=Qf(),w1=th(),v1=nh(),b1=rh(),N1=ih();Xr.typeHandlers={bmp:h1.BMP,cur:d1.CUR,dds:p1.DDS,gif:_1.GIF,icns:m1.ICNS,ico:g1.ICO,j2c:y1.J2C,jp2:E1.JP2,jpg:T1.JPG,ktx:L1.KTX,png:S1.PNG,pnm:A1.PNM,psd:I1.PSD,svg:w1.SVG,tga:v1.TGA,tiff:b1.TIFF,webp:N1.WEBP}});var oh=_(zr=>{"use strict";Object.defineProperty(zr,"__esModule",{value:!0});zr.detector=void 0;var uo=co(),O1=Object.keys(uo.typeHandlers),sh={56:"psd",66:"bmp",68:"dds",71:"gif",73:"tiff",77:"tiff",82:"webp",105:"icns",137:"png",255:"jpg"};function R1(n){let e=n[0];if(e in sh){let r=sh[e];if(r&&uo.typeHandlers[r].validate(n))return r}let t=r=>uo.typeHandlers[r].validate(n);return O1.find(t)}zr.detector=R1});var uh=_((be,ch)=>{"use strict";Object.defineProperty(be,"__esModule",{value:!0});be.types=be.setConcurrency=be.disableTypes=be.disableFS=be.imageSize=void 0;var pn=require("fs"),C1=require("path"),P1=Cf(),ho=co(),k1=oh(),ah=512*1024,lh=new P1.default({concurrency:100,autostart:!0}),Qr={disabledFS:!1,disabledTypes:[]};function fo(n,e){let t=(0,k1.detector)(n);if(typeof t<"u"){if(Qr.disabledTypes.indexOf(t)>-1)throw new TypeError("disabled file type: "+t);if(t in ho.typeHandlers){let r=ho.typeHandlers[t].calculate(n,e);if(r!==void 0)return r.type=t,r}}throw new TypeError("unsupported file type: "+t+" (file: "+e+")")}async function $1(n){let e=await pn.promises.open(n,"r");try{let{size:t}=await e.stat();if(t<=0)throw new Error("Empty file");let r=Math.min(t,ah),i=Buffer.alloc(r);return await e.read(i,0,r,0),i}finally{await e.close()}}function q1(n){let e=pn.openSync(n,"r");try{let{size:t}=pn.fstatSync(e);if(t<=0)throw new Error("Empty file");let r=Math.min(t,ah),i=Buffer.alloc(r);return pn.readSync(e,i,0,r,0),i}finally{pn.closeSync(e)}}ch.exports=be=po;be.default=po;function po(n,e){if(Buffer.isBuffer(n))return fo(n);if(typeof n!="string"||Qr.disabledFS)throw new TypeError("invalid invocation. input should be a Buffer");let t=C1.resolve(n);if(typeof e=="function")lh.push(()=>$1(t).then(r=>process.nextTick(e,null,fo(r,t))).catch(e));else{let r=q1(t);return fo(r,t)}}be.imageSize=po;var x1=n=>{Qr.disabledFS=n};be.disableFS=x1;var M1=n=>{Qr.disabledTypes=n};be.disableTypes=M1;var F1=n=>{lh.concurrency=n};be.setConcurrency=F1;be.types=Object.keys(ho.typeHandlers)});var hh=_((Zr,fh)=>{(function(n,e){typeof Zr=="object"&&typeof fh<"u"?e(Zr):typeof define=="function"&&define.amd?define(["exports"],e):(n=typeof globalThis<"u"?globalThis:n||self,e(n.compareVersions={}))})(Zr,function(n){"use strict";let e=/^[v^~<>=]*?(\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+))?(?:-([\da-z\-]+(?:\.[\da-z\-]+)*))?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?)?)?$/i,t=m=>{if(typeof m!="string")throw new TypeError("Invalid argument expected string");let L=m.match(e);if(!L)throw new Error(`Invalid argument not valid semver ('${m}' received)`);return L.shift(),L},r=m=>m==="*"||m==="x"||m==="X",i=m=>{let L=parseInt(m,10);return isNaN(L)?m:L},s=(m,L)=>typeof m!=typeof L?[String(m),String(L)]:[m,L],o=(m,L)=>{if(r(m)||r(L))return 0;let[w,b]=s(i(m),i(L));return w>b?1:w<b?-1:0},a=(m,L)=>{for(let w=0;w<Math.max(m.length,L.length);w++){let b=o(m[w]||"0",L[w]||"0");if(b!==0)return b}return 0},l=(m,L)=>{let w=t(m),b=t(L),$=w.pop(),M=b.pop(),v=a(w,b);return v!==0?v:$&&M?a($.split("."),M.split(".")):$||M?$?-1:1:0},c=(m,L,w)=>{p(w);let b=l(m,L);return u[w].includes(b)},u={">":[1],">=":[0,1],"=":[0],"<=":[-1,0],"<":[-1],"!=":[-1,1]},f=Object.keys(u),p=m=>{if(typeof m!="string")throw new TypeError(`Invalid operator type, expected string but got ${typeof m}`);if(f.indexOf(m)===-1)throw new Error(`Invalid operator, expected one of ${f.join("|")}`)},h=(m,L)=>{if(L=L.replace(/([><=]+)\s+/g,"$1"),L.includes("||"))return L.split("||").some(U=>h(m,U));if(L.includes(" - ")){let[U,Y]=L.split(" - ",2);return h(m,`>=${U} <=${Y}`)}else if(L.includes(" "))return L.trim().replace(/\s{2,}/g," ").split(" ").every(U=>h(m,U));let w=L.match(/^([<>=~^]+)/),b=w?w[1]:"=";if(b!=="^"&&b!=="~")return c(m,L,b);let[$,M,v,,V]=t(m),[G,k,j,,F]=t(L),D=[$,M,v],X=[G,k??"x",j??"x"];if(F&&(!V||a(D,X)!==0||a(V.split("."),F.split("."))===-1))return!1;let ie=X.findIndex(U=>U!=="0")+1,K=b==="~"?2:ie>1?ie:1;return!(a(D.slice(0,K),X.slice(0,K))!==0||a(D.slice(K),X.slice(K))===-1)},y=m=>typeof m=="string"&&/^[v\d]/.test(m)&&e.test(m),g=m=>typeof m=="string"&&/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/.test(m);n.compare=c,n.compareVersions=l,n.satisfies=h,n.validate=y,n.validateStrict=g})});var yn=_((sO,_h)=>{"use strict";var D1="2.0.0",j1=Number.MAX_SAFE_INTEGER||9007199254740991,H1=16,B1=256-6,U1=["major","premajor","minor","preminor","patch","prepatch","prerelease"];_h.exports={MAX_LENGTH:256,MAX_SAFE_COMPONENT_LENGTH:H1,MAX_SAFE_BUILD_LENGTH:B1,MAX_SAFE_INTEGER:j1,RELEASE_TYPES:U1,SEMVER_SPEC_VERSION:D1,FLAG_INCLUDE_PRERELEASE:1,FLAG_LOOSE:2}});var En=_((oO,mh)=>{"use strict";var V1=typeof process=="object"&&process.env&&process.env.NODE_DEBUG&&/\bsemver\b/i.test(process.env.NODE_DEBUG)?(...n)=>console.error("SEMVER",...n):()=>{};mh.exports=V1});var Ft=_((Ve,gh)=>{"use strict";var{MAX_SAFE_COMPONENT_LENGTH:yo,MAX_SAFE_BUILD_LENGTH:W1,MAX_LENGTH:G1}=yn(),K1=En();Ve=gh.exports={};var Y1=Ve.re=[],J1=Ve.safeRe=[],R=Ve.src=[],X1=Ve.safeSrc=[],C=Ve.t={},z1=0,Eo="[a-zA-Z0-9-]",Q1=[["\\s",1],["\\d",G1],[Eo,W1]],Z1=n=>{for(let[e,t]of Q1)n=n.split(`${e}*`).join(`${e}{0,${t}}`).split(`${e}+`).join(`${e}{1,${t}}`);return n},H=(n,e,t)=>{let r=Z1(e),i=z1++;K1(n,i,e),C[n]=i,R[i]=e,X1[i]=r,Y1[i]=new RegExp(e,t?"g":void 0),J1[i]=new RegExp(r,t?"g":void 0)};H("NUMERICIDENTIFIER","0|[1-9]\\d*");H("NUMERICIDENTIFIERLOOSE","\\d+");H("NONNUMERICIDENTIFIER",`\\d*[a-zA-Z-]${Eo}*`);H("MAINVERSION",`(${R[C.NUMERICIDENTIFIER]})\\.(${R[C.NUMERICIDENTIFIER]})\\.(${R[C.NUMERICIDENTIFIER]})`);H("MAINVERSIONLOOSE",`(${R[C.NUMERICIDENTIFIERLOOSE]})\\.(${R[C.NUMERICIDENTIFIERLOOSE]})\\.(${R[C.NUMERICIDENTIFIERLOOSE]})`);H("PRERELEASEIDENTIFIER",`(?:${R[C.NONNUMERICIDENTIFIER]}|${R[C.NUMERICIDENTIFIER]})`);H("PRERELEASEIDENTIFIERLOOSE",`(?:${R[C.NONNUMERICIDENTIFIER]}|${R[C.NUMERICIDENTIFIERLOOSE]})`);H("PRERELEASE",`(?:-(${R[C.PRERELEASEIDENTIFIER]}(?:\\.${R[C.PRERELEASEIDENTIFIER]})*))`);H("PRERELEASELOOSE",`(?:-?(${R[C.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${R[C.PRERELEASEIDENTIFIERLOOSE]})*))`);H("BUILDIDENTIFIER",`${Eo}+`);H("BUILD",`(?:\\+(${R[C.BUILDIDENTIFIER]}(?:\\.${R[C.BUILDIDENTIFIER]})*))`);H("FULLPLAIN",`v?${R[C.MAINVERSION]}${R[C.PRERELEASE]}?${R[C.BUILD]}?`);H("FULL",`^${R[C.FULLPLAIN]}$`);H("LOOSEPLAIN",`[v=\\s]*${R[C.MAINVERSIONLOOSE]}${R[C.PRERELEASELOOSE]}?${R[C.BUILD]}?`);H("LOOSE",`^${R[C.LOOSEPLAIN]}$`);H("GTLT","((?:<|>)?=?)");H("XRANGEIDENTIFIERLOOSE",`${R[C.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);H("XRANGEIDENTIFIER",`${R[C.NUMERICIDENTIFIER]}|x|X|\\*`);H("XRANGEPLAIN",`[v=\\s]*(${R[C.XRANGEIDENTIFIER]})(?:\\.(${R[C.XRANGEIDENTIFIER]})(?:\\.(${R[C.XRANGEIDENTIFIER]})(?:${R[C.PRERELEASE]})?${R[C.BUILD]}?)?)?`);H("XRANGEPLAINLOOSE",`[v=\\s]*(${R[C.XRANGEIDENTIFIERLOOSE]})(?:\\.(${R[C.XRANGEIDENTIFIERLOOSE]})(?:\\.(${R[C.XRANGEIDENTIFIERLOOSE]})(?:${R[C.PRERELEASELOOSE]})?${R[C.BUILD]}?)?)?`);H("XRANGE",`^${R[C.GTLT]}\\s*${R[C.XRANGEPLAIN]}$`);H("XRANGELOOSE",`^${R[C.GTLT]}\\s*${R[C.XRANGEPLAINLOOSE]}$`);H("COERCEPLAIN",`(^|[^\\d])(\\d{1,${yo}})(?:\\.(\\d{1,${yo}}))?(?:\\.(\\d{1,${yo}}))?`);H("COERCE",`${R[C.COERCEPLAIN]}(?:$|[^\\d])`);H("COERCEFULL",R[C.COERCEPLAIN]+`(?:${R[C.PRERELEASE]})?(?:${R[C.BUILD]})?(?:$|[^\\d])`);H("COERCERTL",R[C.COERCE],!0);H("COERCERTLFULL",R[C.COERCEFULL],!0);H("LONETILDE","(?:~>?)");H("TILDETRIM",`(\\s*)${R[C.LONETILDE]}\\s+`,!0);Ve.tildeTrimReplace="$1~";H("TILDE",`^${R[C.LONETILDE]}${R[C.XRANGEPLAIN]}$`);H("TILDELOOSE",`^${R[C.LONETILDE]}${R[C.XRANGEPLAINLOOSE]}$`);H("LONECARET","(?:\\^)");H("CARETTRIM",`(\\s*)${R[C.LONECARET]}\\s+`,!0);Ve.caretTrimReplace="$1^";H("CARET",`^${R[C.LONECARET]}${R[C.XRANGEPLAIN]}$`);H("CARETLOOSE",`^${R[C.LONECARET]}${R[C.XRANGEPLAINLOOSE]}$`);H("COMPARATORLOOSE",`^${R[C.GTLT]}\\s*(${R[C.LOOSEPLAIN]})$|^$`);H("COMPARATOR",`^${R[C.GTLT]}\\s*(${R[C.FULLPLAIN]})$|^$`);H("COMPARATORTRIM",`(\\s*)${R[C.GTLT]}\\s*(${R[C.LOOSEPLAIN]}|${R[C.XRANGEPLAIN]})`,!0);Ve.comparatorTrimReplace="$1$2$3";H("HYPHENRANGE",`^\\s*(${R[C.XRANGEPLAIN]})\\s+-\\s+(${R[C.XRANGEPLAIN]})\\s*$`);H("HYPHENRANGELOOSE",`^\\s*(${R[C.XRANGEPLAINLOOSE]})\\s+-\\s+(${R[C.XRANGEPLAINLOOSE]})\\s*$`);H("STAR","(<|>)?=?\\s*\\*");H("GTE0","^\\s*>=\\s*0\\.0\\.0\\s*$");H("GTE0PRE","^\\s*>=\\s*0\\.0\\.0-0\\s*$")});var ei=_((aO,yh)=>{"use strict";var eT=Object.freeze({loose:!0}),tT=Object.freeze({}),nT=n=>n?typeof n!="object"?eT:n:tT;yh.exports=nT});var To=_((lO,Lh)=>{"use strict";var Eh=/^[0-9]+$/,Th=(n,e)=>{let t=Eh.test(n),r=Eh.test(e);return t&&r&&(n=+n,e=+e),n===e?0:t&&!r?-1:r&&!t?1:n<e?-1:1},rT=(n,e)=>Th(e,n);Lh.exports={compareIdentifiers:Th,rcompareIdentifiers:rT}});var ye=_((cO,Ah)=>{"use strict";var ti=En(),{MAX_LENGTH:Sh,MAX_SAFE_INTEGER:ni}=yn(),{safeRe:ri,t:ii}=Ft(),iT=ei(),{compareIdentifiers:Dt}=To(),Lo=class n{constructor(e,t){if(t=iT(t),e instanceof n){if(e.loose===!!t.loose&&e.includePrerelease===!!t.includePrerelease)return e;e=e.version}else if(typeof e!="string")throw new TypeError(`Invalid version. Must be a string. Got type "${typeof e}".`);if(e.length>Sh)throw new TypeError(`version is longer than ${Sh} characters`);ti("SemVer",e,t),this.options=t,this.loose=!!t.loose,this.includePrerelease=!!t.includePrerelease;let r=e.trim().match(t.loose?ri[ii.LOOSE]:ri[ii.FULL]);if(!r)throw new TypeError(`Invalid Version: ${e}`);if(this.raw=e,this.major=+r[1],this.minor=+r[2],this.patch=+r[3],this.major>ni||this.major<0)throw new TypeError("Invalid major version");if(this.minor>ni||this.minor<0)throw new TypeError("Invalid minor version");if(this.patch>ni||this.patch<0)throw new TypeError("Invalid patch version");r[4]?this.prerelease=r[4].split(".").map(i=>{if(/^[0-9]+$/.test(i)){let s=+i;if(s>=0&&s<ni)return s}return i}):this.prerelease=[],this.build=r[5]?r[5].split("."):[],this.format()}format(){return this.version=`${this.major}.${this.minor}.${this.patch}`,this.prerelease.length&&(this.version+=`-${this.prerelease.join(".")}`),this.version}toString(){return this.version}compare(e){if(ti("SemVer.compare",this.version,this.options,e),!(e instanceof n)){if(typeof e=="string"&&e===this.version)return 0;e=new n(e,this.options)}return e.version===this.version?0:this.compareMain(e)||this.comparePre(e)}compareMain(e){return e instanceof n||(e=new n(e,this.options)),Dt(this.major,e.major)||Dt(this.minor,e.minor)||Dt(this.patch,e.patch)}comparePre(e){if(e instanceof n||(e=new n(e,this.options)),this.prerelease.length&&!e.prerelease.length)return-1;if(!this.prerelease.length&&e.prerelease.length)return 1;if(!this.prerelease.length&&!e.prerelease.length)return 0;let t=0;do{let r=this.prerelease[t],i=e.prerelease[t];if(ti("prerelease compare",t,r,i),r===void 0&&i===void 0)return 0;if(i===void 0)return 1;if(r===void 0)return-1;if(r===i)continue;return Dt(r,i)}while(++t)}compareBuild(e){e instanceof n||(e=new n(e,this.options));let t=0;do{let r=this.build[t],i=e.build[t];if(ti("build compare",t,r,i),r===void 0&&i===void 0)return 0;if(i===void 0)return 1;if(r===void 0)return-1;if(r===i)continue;return Dt(r,i)}while(++t)}inc(e,t,r){if(e.startsWith("pre")){if(!t&&r===!1)throw new Error("invalid increment argument: identifier is empty");if(t){let i=`-${t}`.match(this.options.loose?ri[ii.PRERELEASELOOSE]:ri[ii.PRERELEASE]);if(!i||i[1]!==t)throw new Error(`invalid identifier: ${t}`)}}switch(e){case"premajor":this.prerelease.length=0,this.patch=0,this.minor=0,this.major++,this.inc("pre",t,r);break;case"preminor":this.prerelease.length=0,this.patch=0,this.minor++,this.inc("pre",t,r);break;case"prepatch":this.prerelease.length=0,this.inc("patch",t,r),this.inc("pre",t,r);break;case"prerelease":this.prerelease.length===0&&this.inc("patch",t,r),this.inc("pre",t,r);break;case"release":if(this.prerelease.length===0)throw new Error(`version ${this.raw} is not a prerelease`);this.prerelease.length=0;break;case"major":(this.minor!==0||this.patch!==0||this.prerelease.length===0)&&this.major++,this.minor=0,this.patch=0,this.prerelease=[];break;case"minor":(this.patch!==0||this.prerelease.length===0)&&this.minor++,this.patch=0,this.prerelease=[];break;case"patch":this.prerelease.length===0&&this.patch++,this.prerelease=[];break;case"pre":{let i=Number(r)?1:0;if(this.prerelease.length===0)this.prerelease=[i];else{let s=this.prerelease.length;for(;--s>=0;)typeof this.prerelease[s]=="number"&&(this.prerelease[s]++,s=-2);if(s===-1){if(t===this.prerelease.join(".")&&r===!1)throw new Error("invalid increment argument: identifier already exists");this.prerelease.push(i)}}if(t){let s=[t,i];r===!1&&(s=[t]),Dt(this.prerelease[0],t)===0?isNaN(this.prerelease[1])&&(this.prerelease=s):this.prerelease=s}break}default:throw new Error(`invalid increment argument: ${e}`)}return this.raw=this.format(),this.build.length&&(this.raw+=`+${this.build.join(".")}`),this}};Ah.exports=Lo});var Tt=_((uO,wh)=>{"use strict";var Ih=ye(),sT=(n,e,t=!1)=>{if(n instanceof Ih)return n;try{return new Ih(n,e)}catch(r){if(!t)return null;throw r}};wh.exports=sT});var bh=_((fO,vh)=>{"use strict";var oT=Tt(),aT=(n,e)=>{let t=oT(n,e);return t?t.version:null};vh.exports=aT});var Oh=_((hO,Nh)=>{"use strict";var lT=Tt(),cT=(n,e)=>{let t=lT(n.trim().replace(/^[=v]+/,""),e);return t?t.version:null};Nh.exports=cT});var Ph=_((dO,Ch)=>{"use strict";var Rh=ye(),uT=(n,e,t,r,i)=>{typeof t=="string"&&(i=r,r=t,t=void 0);try{return new Rh(n instanceof Rh?n.version:n,t).inc(e,r,i).version}catch{return null}};Ch.exports=uT});var qh=_((pO,$h)=>{"use strict";var kh=Tt(),fT=(n,e)=>{let t=kh(n,null,!0),r=kh(e,null,!0),i=t.compare(r);if(i===0)return null;let s=i>0,o=s?t:r,a=s?r:t,l=!!o.prerelease.length;if(!!a.prerelease.length&&!l){if(!a.patch&&!a.minor)return"major";if(a.compareMain(o)===0)return a.minor&&!a.patch?"minor":"patch"}let u=l?"pre":"";return t.major!==r.major?u+"major":t.minor!==r.minor?u+"minor":t.patch!==r.patch?u+"patch":"prerelease"};$h.exports=fT});var Mh=_((_O,xh)=>{"use strict";var hT=ye(),dT=(n,e)=>new hT(n,e).major;xh.exports=dT});var Dh=_((mO,Fh)=>{"use strict";var pT=ye(),_T=(n,e)=>new pT(n,e).minor;Fh.exports=_T});var Hh=_((gO,jh)=>{"use strict";var mT=ye(),gT=(n,e)=>new mT(n,e).patch;jh.exports=gT});var Uh=_((yO,Bh)=>{"use strict";var yT=Tt(),ET=(n,e)=>{let t=yT(n,e);return t&&t.prerelease.length?t.prerelease:null};Bh.exports=ET});var $e=_((EO,Wh)=>{"use strict";var Vh=ye(),TT=(n,e,t)=>new Vh(n,t).compare(new Vh(e,t));Wh.exports=TT});var Kh=_((TO,Gh)=>{"use strict";var LT=$e(),ST=(n,e,t)=>LT(e,n,t);Gh.exports=ST});var Jh=_((LO,Yh)=>{"use strict";var AT=$e(),IT=(n,e)=>AT(n,e,!0);Yh.exports=IT});var si=_((SO,zh)=>{"use strict";var Xh=ye(),wT=(n,e,t)=>{let r=new Xh(n,t),i=new Xh(e,t);return r.compare(i)||r.compareBuild(i)};zh.exports=wT});var Zh=_((AO,Qh)=>{"use strict";var vT=si(),bT=(n,e)=>n.sort((t,r)=>vT(t,r,e));Qh.exports=bT});var td=_((IO,ed)=>{"use strict";var NT=si(),OT=(n,e)=>n.sort((t,r)=>NT(r,t,e));ed.exports=OT});var Tn=_((wO,nd)=>{"use strict";var RT=$e(),CT=(n,e,t)=>RT(n,e,t)>0;nd.exports=CT});var oi=_((vO,rd)=>{"use strict";var PT=$e(),kT=(n,e,t)=>PT(n,e,t)<0;rd.exports=kT});var So=_((bO,id)=>{"use strict";var $T=$e(),qT=(n,e,t)=>$T(n,e,t)===0;id.exports=qT});var Ao=_((NO,sd)=>{"use strict";var xT=$e(),MT=(n,e,t)=>xT(n,e,t)!==0;sd.exports=MT});var ai=_((OO,od)=>{"use strict";var FT=$e(),DT=(n,e,t)=>FT(n,e,t)>=0;od.exports=DT});var li=_((RO,ad)=>{"use strict";var jT=$e(),HT=(n,e,t)=>jT(n,e,t)<=0;ad.exports=HT});var Io=_((CO,ld)=>{"use strict";var BT=So(),UT=Ao(),VT=Tn(),WT=ai(),GT=oi(),KT=li(),YT=(n,e,t,r)=>{switch(e){case"===":return typeof n=="object"&&(n=n.version),typeof t=="object"&&(t=t.version),n===t;case"!==":return typeof n=="object"&&(n=n.version),typeof t=="object"&&(t=t.version),n!==t;case"":case"=":case"==":return BT(n,t,r);case"!=":return UT(n,t,r);case">":return VT(n,t,r);case">=":return WT(n,t,r);case"<":return GT(n,t,r);case"<=":return KT(n,t,r);default:throw new TypeError(`Invalid operator: ${e}`)}};ld.exports=YT});var ud=_((PO,cd)=>{"use strict";var JT=ye(),XT=Tt(),{safeRe:ci,t:ui}=Ft(),zT=(n,e)=>{if(n instanceof JT)return n;if(typeof n=="number"&&(n=String(n)),typeof n!="string")return null;e=e||{};let t=null;if(!e.rtl)t=n.match(e.includePrerelease?ci[ui.COERCEFULL]:ci[ui.COERCE]);else{let l=e.includePrerelease?ci[ui.COERCERTLFULL]:ci[ui.COERCERTL],c;for(;(c=l.exec(n))&&(!t||t.index+t[0].length!==n.length);)(!t||c.index+c[0].length!==t.index+t[0].length)&&(t=c),l.lastIndex=c.index+c[1].length+c[2].length;l.lastIndex=-1}if(t===null)return null;let r=t[2],i=t[3]||"0",s=t[4]||"0",o=e.includePrerelease&&t[5]?`-${t[5]}`:"",a=e.includePrerelease&&t[6]?`+${t[6]}`:"";return XT(`${r}.${i}.${s}${o}${a}`,e)};cd.exports=zT});var hd=_((kO,fd)=>{"use strict";var wo=class{constructor(){this.max=1e3,this.map=new Map}get(e){let t=this.map.get(e);if(t!==void 0)return this.map.delete(e),this.map.set(e,t),t}delete(e){return this.map.delete(e)}set(e,t){if(!this.delete(e)&&t!==void 0){if(this.map.size>=this.max){let i=this.map.keys().next().value;this.delete(i)}this.map.set(e,t)}return this}};fd.exports=wo});var qe=_(($O,md)=>{"use strict";var QT=/\s+/g,vo=class n{constructor(e,t){if(t=eL(t),e instanceof n)return e.loose===!!t.loose&&e.includePrerelease===!!t.includePrerelease?e:new n(e.raw,t);if(e instanceof bo)return this.raw=e.value,this.set=[[e]],this.formatted=void 0,this;if(this.options=t,this.loose=!!t.loose,this.includePrerelease=!!t.includePrerelease,this.raw=e.trim().replace(QT," "),this.set=this.raw.split("||").map(r=>this.parseRange(r.trim())).filter(r=>r.length),!this.set.length)throw new TypeError(`Invalid SemVer Range: ${this.raw}`);if(this.set.length>1){let r=this.set[0];if(this.set=this.set.filter(i=>!pd(i[0])),this.set.length===0)this.set=[r];else if(this.set.length>1){for(let i of this.set)if(i.length===1&&aL(i[0])){this.set=[i];break}}}this.formatted=void 0}get range(){if(this.formatted===void 0){this.formatted="";for(let e=0;e<this.set.length;e++){e>0&&(this.formatted+="||");let t=this.set[e];for(let r=0;r<t.length;r++)r>0&&(this.formatted+=" "),this.formatted+=t[r].toString().trim()}}return this.formatted}format(){return this.range}toString(){return this.range}parseRange(e){let r=((this.options.includePrerelease&&sL)|(this.options.loose&&oL))+":"+e,i=dd.get(r);if(i)return i;let s=this.options.loose,o=s?Ne[Se.HYPHENRANGELOOSE]:Ne[Se.HYPHENRANGE];e=e.replace(o,gL(this.options.includePrerelease)),te("hyphen replace",e),e=e.replace(Ne[Se.COMPARATORTRIM],nL),te("comparator trim",e),e=e.replace(Ne[Se.TILDETRIM],rL),te("tilde trim",e),e=e.replace(Ne[Se.CARETTRIM],iL),te("caret trim",e);let a=e.split(" ").map(f=>lL(f,this.options)).join(" ").split(/\s+/).map(f=>mL(f,this.options));s&&(a=a.filter(f=>(te("loose invalid filter",f,this.options),!!f.match(Ne[Se.COMPARATORLOOSE])))),te("range list",a);let l=new Map,c=a.map(f=>new bo(f,this.options));for(let f of c){if(pd(f))return[f];l.set(f.value,f)}l.size>1&&l.has("")&&l.delete("");let u=[...l.values()];return dd.set(r,u),u}intersects(e,t){if(!(e instanceof n))throw new TypeError("a Range is required");return this.set.some(r=>_d(r,t)&&e.set.some(i=>_d(i,t)&&r.every(s=>i.every(o=>s.intersects(o,t)))))}test(e){if(!e)return!1;if(typeof e=="string")try{e=new tL(e,this.options)}catch{return!1}for(let t=0;t<this.set.length;t++)if(yL(this.set[t],e,this.options))return!0;return!1}};md.exports=vo;var ZT=hd(),dd=new ZT,eL=ei(),bo=Ln(),te=En(),tL=ye(),{safeRe:Ne,t:Se,comparatorTrimReplace:nL,tildeTrimReplace:rL,caretTrimReplace:iL}=Ft(),{FLAG_INCLUDE_PRERELEASE:sL,FLAG_LOOSE:oL}=yn(),pd=n=>n.value==="<0.0.0-0",aL=n=>n.value==="",_d=(n,e)=>{let t=!0,r=n.slice(),i=r.pop();for(;t&&r.length;)t=r.every(s=>i.intersects(s,e)),i=r.pop();return t},lL=(n,e)=>(te("comp",n,e),n=fL(n,e),te("caret",n),n=cL(n,e),te("tildes",n),n=dL(n,e),te("xrange",n),n=_L(n,e),te("stars",n),n),Ae=n=>!n||n.toLowerCase()==="x"||n==="*",cL=(n,e)=>n.trim().split(/\s+/).map(t=>uL(t,e)).join(" "),uL=(n,e)=>{let t=e.loose?Ne[Se.TILDELOOSE]:Ne[Se.TILDE];return n.replace(t,(r,i,s,o,a)=>{te("tilde",n,r,i,s,o,a);let l;return Ae(i)?l="":Ae(s)?l=`>=${i}.0.0 <${+i+1}.0.0-0`:Ae(o)?l=`>=${i}.${s}.0 <${i}.${+s+1}.0-0`:a?(te("replaceTilde pr",a),l=`>=${i}.${s}.${o}-${a} <${i}.${+s+1}.0-0`):l=`>=${i}.${s}.${o} <${i}.${+s+1}.0-0`,te("tilde return",l),l})},fL=(n,e)=>n.trim().split(/\s+/).map(t=>hL(t,e)).join(" "),hL=(n,e)=>{te("caret",n,e);let t=e.loose?Ne[Se.CARETLOOSE]:Ne[Se.CARET],r=e.includePrerelease?"-0":"";return n.replace(t,(i,s,o,a,l)=>{te("caret",n,i,s,o,a,l);let c;return Ae(s)?c="":Ae(o)?c=`>=${s}.0.0${r} <${+s+1}.0.0-0`:Ae(a)?s==="0"?c=`>=${s}.${o}.0${r} <${s}.${+o+1}.0-0`:c=`>=${s}.${o}.0${r} <${+s+1}.0.0-0`:l?(te("replaceCaret pr",l),s==="0"?o==="0"?c=`>=${s}.${o}.${a}-${l} <${s}.${o}.${+a+1}-0`:c=`>=${s}.${o}.${a}-${l} <${s}.${+o+1}.0-0`:c=`>=${s}.${o}.${a}-${l} <${+s+1}.0.0-0`):(te("no pr"),s==="0"?o==="0"?c=`>=${s}.${o}.${a}${r} <${s}.${o}.${+a+1}-0`:c=`>=${s}.${o}.${a}${r} <${s}.${+o+1}.0-0`:c=`>=${s}.${o}.${a} <${+s+1}.0.0-0`),te("caret return",c),c})},dL=(n,e)=>(te("replaceXRanges",n,e),n.split(/\s+/).map(t=>pL(t,e)).join(" ")),pL=(n,e)=>{n=n.trim();let t=e.loose?Ne[Se.XRANGELOOSE]:Ne[Se.XRANGE];return n.replace(t,(r,i,s,o,a,l)=>{te("xRange",n,r,i,s,o,a,l);let c=Ae(s),u=c||Ae(o),f=u||Ae(a),p=f;return i==="="&&p&&(i=""),l=e.includePrerelease?"-0":"",c?i===">"||i==="<"?r="<0.0.0-0":r="*":i&&p?(u&&(o=0),a=0,i===">"?(i=">=",u?(s=+s+1,o=0,a=0):(o=+o+1,a=0)):i==="<="&&(i="<",u?s=+s+1:o=+o+1),i==="<"&&(l="-0"),r=`${i+s}.${o}.${a}${l}`):u?r=`>=${s}.0.0${l} <${+s+1}.0.0-0`:f&&(r=`>=${s}.${o}.0${l} <${s}.${+o+1}.0-0`),te("xRange return",r),r})},_L=(n,e)=>(te("replaceStars",n,e),n.trim().replace(Ne[Se.STAR],"")),mL=(n,e)=>(te("replaceGTE0",n,e),n.trim().replace(Ne[e.includePrerelease?Se.GTE0PRE:Se.GTE0],"")),gL=n=>(e,t,r,i,s,o,a,l,c,u,f,p)=>(Ae(r)?t="":Ae(i)?t=`>=${r}.0.0${n?"-0":""}`:Ae(s)?t=`>=${r}.${i}.0${n?"-0":""}`:o?t=`>=${t}`:t=`>=${t}${n?"-0":""}`,Ae(c)?l="":Ae(u)?l=`<${+c+1}.0.0-0`:Ae(f)?l=`<${c}.${+u+1}.0-0`:p?l=`<=${c}.${u}.${f}-${p}`:n?l=`<${c}.${u}.${+f+1}-0`:l=`<=${l}`,`${t} ${l}`.trim()),yL=(n,e,t)=>{for(let r=0;r<n.length;r++)if(!n[r].test(e))return!1;if(e.prerelease.length&&!t.includePrerelease){for(let r=0;r<n.length;r++)if(te(n[r].semver),n[r].semver!==bo.ANY&&n[r].semver.prerelease.length>0){let i=n[r].semver;if(i.major===e.major&&i.minor===e.minor&&i.patch===e.patch)return!0}return!1}return!0}});var Ln=_((qO,Sd)=>{"use strict";var Sn=Symbol("SemVer ANY"),Ro=class n{static get ANY(){return Sn}constructor(e,t){if(t=gd(t),e instanceof n){if(e.loose===!!t.loose)return e;e=e.value}e=e.trim().split(/\s+/).join(" "),Oo("comparator",e,t),this.options=t,this.loose=!!t.loose,this.parse(e),this.semver===Sn?this.value="":this.value=this.operator+this.semver.version,Oo("comp",this)}parse(e){let t=this.options.loose?yd[Ed.COMPARATORLOOSE]:yd[Ed.COMPARATOR],r=e.match(t);if(!r)throw new TypeError(`Invalid comparator: ${e}`);this.operator=r[1]!==void 0?r[1]:"",this.operator==="="&&(this.operator=""),r[2]?this.semver=new Td(r[2],this.options.loose):this.semver=Sn}toString(){return this.value}test(e){if(Oo("Comparator.test",e,this.options.loose),this.semver===Sn||e===Sn)return!0;if(typeof e=="string")try{e=new Td(e,this.options)}catch{return!1}return No(e,this.operator,this.semver,this.options)}intersects(e,t){if(!(e instanceof n))throw new TypeError("a Comparator is required");return this.operator===""?this.value===""?!0:new Ld(e.value,t).test(this.value):e.operator===""?e.value===""?!0:new Ld(this.value,t).test(e.semver):(t=gd(t),t.includePrerelease&&(this.value==="<0.0.0-0"||e.value==="<0.0.0-0")||!t.includePrerelease&&(this.value.startsWith("<0.0.0")||e.value.startsWith("<0.0.0"))?!1:!!(this.operator.startsWith(">")&&e.operator.startsWith(">")||this.operator.startsWith("<")&&e.operator.startsWith("<")||this.semver.version===e.semver.version&&this.operator.includes("=")&&e.operator.includes("=")||No(this.semver,"<",e.semver,t)&&this.operator.startsWith(">")&&e.operator.startsWith("<")||No(this.semver,">",e.semver,t)&&this.operator.startsWith("<")&&e.operator.startsWith(">")))}};Sd.exports=Ro;var gd=ei(),{safeRe:yd,t:Ed}=Ft(),No=Io(),Oo=En(),Td=ye(),Ld=qe()});var An=_((xO,Ad)=>{"use strict";var EL=qe(),TL=(n,e,t)=>{try{e=new EL(e,t)}catch{return!1}return e.test(n)};Ad.exports=TL});var wd=_((MO,Id)=>{"use strict";var LL=qe(),SL=(n,e)=>new LL(n,e).set.map(t=>t.map(r=>r.value).join(" ").trim().split(" "));Id.exports=SL});var bd=_((FO,vd)=>{"use strict";var AL=ye(),IL=qe(),wL=(n,e,t)=>{let r=null,i=null,s=null;try{s=new IL(e,t)}catch{return null}return n.forEach(o=>{s.test(o)&&(!r||i.compare(o)===-1)&&(r=o,i=new AL(r,t))}),r};vd.exports=wL});var Od=_((DO,Nd)=>{"use strict";var vL=ye(),bL=qe(),NL=(n,e,t)=>{let r=null,i=null,s=null;try{s=new bL(e,t)}catch{return null}return n.forEach(o=>{s.test(o)&&(!r||i.compare(o)===1)&&(r=o,i=new vL(r,t))}),r};Nd.exports=NL});var Pd=_((jO,Cd)=>{"use strict";var Co=ye(),OL=qe(),Rd=Tn(),RL=(n,e)=>{n=new OL(n,e);let t=new Co("0.0.0");if(n.test(t)||(t=new Co("0.0.0-0"),n.test(t)))return t;t=null;for(let r=0;r<n.set.length;++r){let i=n.set[r],s=null;i.forEach(o=>{let a=new Co(o.semver.version);switch(o.operator){case">":a.prerelease.length===0?a.patch++:a.prerelease.push(0),a.raw=a.format();case"":case">=":(!s||Rd(a,s))&&(s=a);break;case"<":case"<=":break;default:throw new Error(`Unexpected operation: ${o.operator}`)}}),s&&(!t||Rd(t,s))&&(t=s)}return t&&n.test(t)?t:null};Cd.exports=RL});var $d=_((HO,kd)=>{"use strict";var CL=qe(),PL=(n,e)=>{try{return new CL(n,e).range||"*"}catch{return null}};kd.exports=PL});var fi=_((BO,Fd)=>{"use strict";var kL=ye(),Md=Ln(),{ANY:$L}=Md,qL=qe(),xL=An(),qd=Tn(),xd=oi(),ML=li(),FL=ai(),DL=(n,e,t,r)=>{n=new kL(n,r),e=new qL(e,r);let i,s,o,a,l;switch(t){case">":i=qd,s=ML,o=xd,a=">",l=">=";break;case"<":i=xd,s=FL,o=qd,a="<",l="<=";break;default:throw new TypeError('Must provide a hilo val of "<" or ">"')}if(xL(n,e,r))return!1;for(let c=0;c<e.set.length;++c){let u=e.set[c],f=null,p=null;if(u.forEach(h=>{h.semver===$L&&(h=new Md(">=0.0.0")),f=f||h,p=p||h,i(h.semver,f.semver,r)?f=h:o(h.semver,p.semver,r)&&(p=h)}),f.operator===a||f.operator===l||(!p.operator||p.operator===a)&&s(n,p.semver))return!1;if(p.operator===l&&o(n,p.semver))return!1}return!0};Fd.exports=DL});var jd=_((UO,Dd)=>{"use strict";var jL=fi(),HL=(n,e,t)=>jL(n,e,">",t);Dd.exports=HL});var Bd=_((VO,Hd)=>{"use strict";var BL=fi(),UL=(n,e,t)=>BL(n,e,"<",t);Hd.exports=UL});var Wd=_((WO,Vd)=>{"use strict";var Ud=qe(),VL=(n,e,t)=>(n=new Ud(n,t),e=new Ud(e,t),n.intersects(e,t));Vd.exports=VL});var Kd=_((GO,Gd)=>{"use strict";var WL=An(),GL=$e();Gd.exports=(n,e,t)=>{let r=[],i=null,s=null,o=n.sort((u,f)=>GL(u,f,t));for(let u of o)WL(u,e,t)?(s=u,i||(i=u)):(s&&r.push([i,s]),s=null,i=null);i&&r.push([i,null]);let a=[];for(let[u,f]of r)u===f?a.push(u):!f&&u===o[0]?a.push("*"):f?u===o[0]?a.push(`<=${f}`):a.push(`${u} - ${f}`):a.push(`>=${u}`);let l=a.join(" || "),c=typeof e.raw=="string"?e.raw:String(e);return l.length<c.length?l:e}});var Zd=_((KO,Qd)=>{"use strict";var Yd=qe(),ko=Ln(),{ANY:Po}=ko,In=An(),$o=$e(),KL=(n,e,t={})=>{if(n===e)return!0;n=new Yd(n,t),e=new Yd(e,t);let r=!1;e:for(let i of n.set){for(let s of e.set){let o=JL(i,s,t);if(r=r||o!==null,o)continue e}if(r)return!1}return!0},YL=[new ko(">=0.0.0-0")],Jd=[new ko(">=0.0.0")],JL=(n,e,t)=>{if(n===e)return!0;if(n.length===1&&n[0].semver===Po){if(e.length===1&&e[0].semver===Po)return!0;t.includePrerelease?n=YL:n=Jd}if(e.length===1&&e[0].semver===Po){if(t.includePrerelease)return!0;e=Jd}let r=new Set,i,s;for(let h of n)h.operator===">"||h.operator===">="?i=Xd(i,h,t):h.operator==="<"||h.operator==="<="?s=zd(s,h,t):r.add(h.semver);if(r.size>1)return null;let o;if(i&&s){if(o=$o(i.semver,s.semver,t),o>0)return null;if(o===0&&(i.operator!==">="||s.operator!=="<="))return null}for(let h of r){if(i&&!In(h,String(i),t)||s&&!In(h,String(s),t))return null;for(let y of e)if(!In(h,String(y),t))return!1;return!0}let a,l,c,u,f=s&&!t.includePrerelease&&s.semver.prerelease.length?s.semver:!1,p=i&&!t.includePrerelease&&i.semver.prerelease.length?i.semver:!1;f&&f.prerelease.length===1&&s.operator==="<"&&f.prerelease[0]===0&&(f=!1);for(let h of e){if(u=u||h.operator===">"||h.operator===">=",c=c||h.operator==="<"||h.operator==="<=",i){if(p&&h.semver.prerelease&&h.semver.prerelease.length&&h.semver.major===p.major&&h.semver.minor===p.minor&&h.semver.patch===p.patch&&(p=!1),h.operator===">"||h.operator===">="){if(a=Xd(i,h,t),a===h&&a!==i)return!1}else if(i.operator===">="&&!In(i.semver,String(h),t))return!1}if(s){if(f&&h.semver.prerelease&&h.semver.prerelease.length&&h.semver.major===f.major&&h.semver.minor===f.minor&&h.semver.patch===f.patch&&(f=!1),h.operator==="<"||h.operator==="<="){if(l=zd(s,h,t),l===h&&l!==s)return!1}else if(s.operator==="<="&&!In(s.semver,String(h),t))return!1}if(!h.operator&&(s||i)&&o!==0)return!1}return!(i&&c&&!s&&o!==0||s&&u&&!i&&o!==0||p||f)},Xd=(n,e,t)=>{if(!n)return e;let r=$o(n.semver,e.semver,t);return r>0?n:r<0||e.operator===">"&&n.operator===">="?e:n},zd=(n,e,t)=>{if(!n)return e;let r=$o(n.semver,e.semver,t);return r<0?n:r>0||e.operator==="<"&&n.operator==="<="?e:n};Qd.exports=KL});var rp=_((YO,np)=>{"use strict";var qo=Ft(),ep=yn(),XL=ye(),tp=To(),zL=Tt(),QL=bh(),ZL=Oh(),eS=Ph(),tS=qh(),nS=Mh(),rS=Dh(),iS=Hh(),sS=Uh(),oS=$e(),aS=Kh(),lS=Jh(),cS=si(),uS=Zh(),fS=td(),hS=Tn(),dS=oi(),pS=So(),_S=Ao(),mS=ai(),gS=li(),yS=Io(),ES=ud(),TS=Ln(),LS=qe(),SS=An(),AS=wd(),IS=bd(),wS=Od(),vS=Pd(),bS=$d(),NS=fi(),OS=jd(),RS=Bd(),CS=Wd(),PS=Kd(),kS=Zd();np.exports={parse:zL,valid:QL,clean:ZL,inc:eS,diff:tS,major:nS,minor:rS,patch:iS,prerelease:sS,compare:oS,rcompare:aS,compareLoose:lS,compareBuild:cS,sort:uS,rsort:fS,gt:hS,lt:dS,eq:pS,neq:_S,gte:mS,lte:gS,cmp:yS,coerce:ES,Comparator:TS,Range:LS,satisfies:SS,toComparators:AS,maxSatisfying:IS,minSatisfying:wS,minVersion:vS,validRange:bS,outside:NS,gtr:OS,ltr:RS,intersects:CS,simplifyRange:PS,subset:kS,SemVer:XL,re:qo.re,src:qo.src,tokens:qo.t,SEMVER_SPEC_VERSION:ep.SEMVER_SPEC_VERSION,RELEASE_TYPES:ep.RELEASE_TYPES,compareIdentifiers:tp.compareIdentifiers,rcompareIdentifiers:tp.rcompareIdentifiers}});var W=_(ge=>{"use strict";var Do=Symbol.for("yaml.alias"),ap=Symbol.for("yaml.document"),hi=Symbol.for("yaml.map"),lp=Symbol.for("yaml.pair"),jo=Symbol.for("yaml.scalar"),di=Symbol.for("yaml.seq"),ze=Symbol.for("yaml.node.type"),$S=n=>!!n&&typeof n=="object"&&n[ze]===Do,qS=n=>!!n&&typeof n=="object"&&n[ze]===ap,xS=n=>!!n&&typeof n=="object"&&n[ze]===hi,MS=n=>!!n&&typeof n=="object"&&n[ze]===lp,cp=n=>!!n&&typeof n=="object"&&n[ze]===jo,FS=n=>!!n&&typeof n=="object"&&n[ze]===di;function up(n){if(n&&typeof n=="object")switch(n[ze]){case hi:case di:return!0}return!1}function DS(n){if(n&&typeof n=="object")switch(n[ze]){case Do:case hi:case jo:case di:return!0}return!1}var jS=n=>(cp(n)||up(n))&&!!n.anchor;ge.ALIAS=Do;ge.DOC=ap;ge.MAP=hi;ge.NODE_TYPE=ze;ge.PAIR=lp;ge.SCALAR=jo;ge.SEQ=di;ge.hasAnchor=jS;ge.isAlias=$S;ge.isCollection=up;ge.isDocument=qS;ge.isMap=xS;ge.isNode=DS;ge.isPair=MS;ge.isScalar=cp;ge.isSeq=FS});var wn=_(Ho=>{"use strict";var ue=W(),Oe=Symbol("break visit"),fp=Symbol("skip children"),We=Symbol("remove node");function pi(n,e){let t=hp(e);ue.isDocument(n)?jt(null,n.contents,t,Object.freeze([n]))===We&&(n.contents=null):jt(null,n,t,Object.freeze([]))}pi.BREAK=Oe;pi.SKIP=fp;pi.REMOVE=We;function jt(n,e,t,r){let i=dp(n,e,t,r);if(ue.isNode(i)||ue.isPair(i))return pp(n,r,i),jt(n,i,t,r);if(typeof i!="symbol"){if(ue.isCollection(e)){r=Object.freeze(r.concat(e));for(let s=0;s<e.items.length;++s){let o=jt(s,e.items[s],t,r);if(typeof o=="number")s=o-1;else{if(o===Oe)return Oe;o===We&&(e.items.splice(s,1),s-=1)}}}else if(ue.isPair(e)){r=Object.freeze(r.concat(e));let s=jt("key",e.key,t,r);if(s===Oe)return Oe;s===We&&(e.key=null);let o=jt("value",e.value,t,r);if(o===Oe)return Oe;o===We&&(e.value=null)}}return i}async function _i(n,e){let t=hp(e);ue.isDocument(n)?await Ht(null,n.contents,t,Object.freeze([n]))===We&&(n.contents=null):await Ht(null,n,t,Object.freeze([]))}_i.BREAK=Oe;_i.SKIP=fp;_i.REMOVE=We;async function Ht(n,e,t,r){let i=await dp(n,e,t,r);if(ue.isNode(i)||ue.isPair(i))return pp(n,r,i),Ht(n,i,t,r);if(typeof i!="symbol"){if(ue.isCollection(e)){r=Object.freeze(r.concat(e));for(let s=0;s<e.items.length;++s){let o=await Ht(s,e.items[s],t,r);if(typeof o=="number")s=o-1;else{if(o===Oe)return Oe;o===We&&(e.items.splice(s,1),s-=1)}}}else if(ue.isPair(e)){r=Object.freeze(r.concat(e));let s=await Ht("key",e.key,t,r);if(s===Oe)return Oe;s===We&&(e.key=null);let o=await Ht("value",e.value,t,r);if(o===Oe)return Oe;o===We&&(e.value=null)}}return i}function hp(n){return typeof n=="object"&&(n.Collection||n.Node||n.Value)?Object.assign({Alias:n.Node,Map:n.Node,Scalar:n.Node,Seq:n.Node},n.Value&&{Map:n.Value,Scalar:n.Value,Seq:n.Value},n.Collection&&{Map:n.Collection,Seq:n.Collection},n):n}function dp(n,e,t,r){if(typeof t=="function")return t(n,e,r);if(ue.isMap(e))return t.Map?.(n,e,r);if(ue.isSeq(e))return t.Seq?.(n,e,r);if(ue.isPair(e))return t.Pair?.(n,e,r);if(ue.isScalar(e))return t.Scalar?.(n,e,r);if(ue.isAlias(e))return t.Alias?.(n,e,r)}function pp(n,e,t){let r=e[e.length-1];if(ue.isCollection(r))r.items[n]=t;else if(ue.isPair(r))n==="key"?r.key=t:r.value=t;else if(ue.isDocument(r))r.contents=t;else{let i=ue.isAlias(r)?"alias":"scalar";throw new Error(`Cannot replace node with ${i} parent`)}}Ho.visit=pi;Ho.visitAsync=_i});var Bo=_(mp=>{"use strict";var _p=W(),HS=wn(),BS={"!":"%21",",":"%2C","[":"%5B","]":"%5D","{":"%7B","}":"%7D"},US=n=>n.replace(/[!,[\]{}]/g,e=>BS[e]),vn=class n{constructor(e,t){this.docStart=null,this.docEnd=!1,this.yaml=Object.assign({},n.defaultYaml,e),this.tags=Object.assign({},n.defaultTags,t)}clone(){let e=new n(this.yaml,this.tags);return e.docStart=this.docStart,e}atDocument(){let e=new n(this.yaml,this.tags);switch(this.yaml.version){case"1.1":this.atNextDocument=!0;break;case"1.2":this.atNextDocument=!1,this.yaml={explicit:n.defaultYaml.explicit,version:"1.2"},this.tags=Object.assign({},n.defaultTags);break}return e}add(e,t){this.atNextDocument&&(this.yaml={explicit:n.defaultYaml.explicit,version:"1.1"},this.tags=Object.assign({},n.defaultTags),this.atNextDocument=!1);let r=e.trim().split(/[ \t]+/),i=r.shift();switch(i){case"%TAG":{if(r.length!==2&&(t(0,"%TAG directive should contain exactly two parts"),r.length<2))return!1;let[s,o]=r;return this.tags[s]=o,!0}case"%YAML":{if(this.yaml.explicit=!0,r.length!==1)return t(0,"%YAML directive should contain exactly one part"),!1;let[s]=r;if(s==="1.1"||s==="1.2")return this.yaml.version=s,!0;{let o=/^\d+\.\d+$/.test(s);return t(6,`Unsupported YAML version ${s}`,o),!1}}default:return t(0,`Unknown directive ${i}`,!0),!1}}tagName(e,t){if(e==="!")return"!";if(e[0]!=="!")return t(`Not a valid tag: ${e}`),null;if(e[1]==="<"){let o=e.slice(2,-1);return o==="!"||o==="!!"?(t(`Verbatim tags aren't resolved, so ${e} is invalid.`),null):(e[e.length-1]!==">"&&t("Verbatim tags must end with a >"),o)}let[,r,i]=e.match(/^(.*!)([^!]*)$/);i||t(`The ${e} tag has no suffix`);let s=this.tags[r];return s?s+decodeURIComponent(i):r==="!"?e:(t(`Could not resolve tag: ${e}`),null)}tagString(e){for(let[t,r]of Object.entries(this.tags))if(e.startsWith(r))return t+US(e.substring(r.length));return e[0]==="!"?e:`!<${e}>`}toString(e){let t=this.yaml.explicit?[`%YAML ${this.yaml.version||"1.2"}`]:[],r=Object.entries(this.tags),i;if(e&&r.length>0&&_p.isNode(e.contents)){let s={};HS.visit(e.contents,(o,a)=>{_p.isNode(a)&&a.tag&&(s[a.tag]=!0)}),i=Object.keys(s)}else i=[];for(let[s,o]of r)s==="!!"&&o==="tag:yaml.org,2002:"||(!e||i.some(a=>a.startsWith(o)))&&t.push(`%TAG ${s} ${o}`);return t.join(`
`)}};vn.defaultYaml={explicit:!1,version:"1.2"};vn.defaultTags={"!!":"tag:yaml.org,2002:"};mp.Directives=vn});var mi=_(bn=>{"use strict";var gp=W(),VS=wn();function WS(n){if(/[\x00-\x19\s,[\]{}]/.test(n)){let t=`Anchor must not contain whitespace or control characters: ${JSON.stringify(n)}`;throw new Error(t)}return!0}function yp(n){let e=new Set;return VS.visit(n,{Value(t,r){r.anchor&&e.add(r.anchor)}}),e}function Ep(n,e){for(let t=1;;++t){let r=`${n}${t}`;if(!e.has(r))return r}}function GS(n,e){let t=[],r=new Map,i=null;return{onAnchor:s=>{t.push(s),i||(i=yp(n));let o=Ep(e,i);return i.add(o),o},setAnchors:()=>{for(let s of t){let o=r.get(s);if(typeof o=="object"&&o.anchor&&(gp.isScalar(o.node)||gp.isCollection(o.node)))o.node.anchor=o.anchor;else{let a=new Error("Failed to resolve repeated object (this should not happen)");throw a.source=s,a}}},sourceObjects:r}}bn.anchorIsValid=WS;bn.anchorNames=yp;bn.createNodeAnchors=GS;bn.findNewAnchor=Ep});var Uo=_(Tp=>{"use strict";function Nn(n,e,t,r){if(r&&typeof r=="object")if(Array.isArray(r))for(let i=0,s=r.length;i<s;++i){let o=r[i],a=Nn(n,r,String(i),o);a===void 0?delete r[i]:a!==o&&(r[i]=a)}else if(r instanceof Map)for(let i of Array.from(r.keys())){let s=r.get(i),o=Nn(n,r,i,s);o===void 0?r.delete(i):o!==s&&r.set(i,o)}else if(r instanceof Set)for(let i of Array.from(r)){let s=Nn(n,r,i,i);s===void 0?r.delete(i):s!==i&&(r.delete(i),r.add(s))}else for(let[i,s]of Object.entries(r)){let o=Nn(n,r,i,s);o===void 0?delete r[i]:o!==s&&(r[i]=o)}return n.call(e,t,r)}Tp.applyReviver=Nn});var ot=_(Sp=>{"use strict";var KS=W();function Lp(n,e,t){if(Array.isArray(n))return n.map((r,i)=>Lp(r,String(i),t));if(n&&typeof n.toJSON=="function"){if(!t||!KS.hasAnchor(n))return n.toJSON(e,t);let r={aliasCount:0,count:1,res:void 0};t.anchors.set(n,r),t.onCreate=s=>{r.res=s,delete t.onCreate};let i=n.toJSON(e,t);return t.onCreate&&t.onCreate(i),i}return typeof n=="bigint"&&!t?.keep?Number(n):n}Sp.toJS=Lp});var gi=_(Ip=>{"use strict";var YS=Uo(),Ap=W(),JS=ot(),Vo=class{constructor(e){Object.defineProperty(this,Ap.NODE_TYPE,{value:e})}clone(){let e=Object.create(Object.getPrototypeOf(this),Object.getOwnPropertyDescriptors(this));return this.range&&(e.range=this.range.slice()),e}toJS(e,{mapAsMap:t,maxAliasCount:r,onAnchor:i,reviver:s}={}){if(!Ap.isDocument(e))throw new TypeError("A document argument is required");let o={anchors:new Map,doc:e,keep:!0,mapAsMap:t===!0,mapKeyWarned:!1,maxAliasCount:typeof r=="number"?r:100},a=JS.toJS(this,"",o);if(typeof i=="function")for(let{count:l,res:c}of o.anchors.values())i(c,l);return typeof s=="function"?YS.applyReviver(s,{"":a},"",a):a}};Ip.NodeBase=Vo});var On=_(vp=>{"use strict";var XS=mi(),wp=wn(),yi=W(),zS=gi(),QS=ot(),Wo=class extends zS.NodeBase{constructor(e){super(yi.ALIAS),this.source=e,Object.defineProperty(this,"tag",{set(){throw new Error("Alias nodes cannot have tags")}})}resolve(e){let t;return wp.visit(e,{Node:(r,i)=>{if(i===this)return wp.visit.BREAK;i.anchor===this.source&&(t=i)}}),t}toJSON(e,t){if(!t)return{source:this.source};let{anchors:r,doc:i,maxAliasCount:s}=t,o=this.resolve(i);if(!o){let l=`Unresolved alias (the anchor must be set before the alias): ${this.source}`;throw new ReferenceError(l)}let a=r.get(o);if(a||(QS.toJS(o,null,t),a=r.get(o)),!a||a.res===void 0){let l="This should not happen: Alias anchor was not resolved?";throw new ReferenceError(l)}if(s>=0&&(a.count+=1,a.aliasCount===0&&(a.aliasCount=Ei(i,o,r)),a.count*a.aliasCount>s)){let l="Excessive alias count indicates a resource exhaustion attack";throw new ReferenceError(l)}return a.res}toString(e,t,r){let i=`*${this.source}`;if(e){if(XS.anchorIsValid(this.source),e.options.verifyAliasOrder&&!e.anchors.has(this.source)){let s=`Unresolved alias (the anchor must be set before the alias): ${this.source}`;throw new Error(s)}if(e.implicitKey)return`${i} `}return i}};function Ei(n,e,t){if(yi.isAlias(e)){let r=e.resolve(n),i=t&&r&&t.get(r);return i?i.count*i.aliasCount:0}else if(yi.isCollection(e)){let r=0;for(let i of e.items){let s=Ei(n,i,t);s>r&&(r=s)}return r}else if(yi.isPair(e)){let r=Ei(n,e.key,t),i=Ei(n,e.value,t);return Math.max(r,i)}return 1}vp.Alias=Wo});var ce=_(Go=>{"use strict";var ZS=W(),eA=gi(),tA=ot(),nA=n=>!n||typeof n!="function"&&typeof n!="object",at=class extends eA.NodeBase{constructor(e){super(ZS.SCALAR),this.value=e}toJSON(e,t){return t?.keep?this.value:tA.toJS(this.value,e,t)}toString(){return String(this.value)}};at.BLOCK_FOLDED="BLOCK_FOLDED";at.BLOCK_LITERAL="BLOCK_LITERAL";at.PLAIN="PLAIN";at.QUOTE_DOUBLE="QUOTE_DOUBLE";at.QUOTE_SINGLE="QUOTE_SINGLE";Go.Scalar=at;Go.isScalarValue=nA});var Rn=_(Np=>{"use strict";var rA=On(),Lt=W(),bp=ce(),iA="tag:yaml.org,2002:";function sA(n,e,t){if(e){let r=t.filter(s=>s.tag===e),i=r.find(s=>!s.format)??r[0];if(!i)throw new Error(`Tag ${e} not found`);return i}return t.find(r=>r.identify?.(n)&&!r.format)}function oA(n,e,t){if(Lt.isDocument(n)&&(n=n.contents),Lt.isNode(n))return n;if(Lt.isPair(n)){let f=t.schema[Lt.MAP].createNode?.(t.schema,null,t);return f.items.push(n),f}(n instanceof String||n instanceof Number||n instanceof Boolean||typeof BigInt<"u"&&n instanceof BigInt)&&(n=n.valueOf());let{aliasDuplicateObjects:r,onAnchor:i,onTagObj:s,schema:o,sourceObjects:a}=t,l;if(r&&n&&typeof n=="object"){if(l=a.get(n),l)return l.anchor||(l.anchor=i(n)),new rA.Alias(l.anchor);l={anchor:null,node:null},a.set(n,l)}e?.startsWith("!!")&&(e=iA+e.slice(2));let c=sA(n,e,o.tags);if(!c){if(n&&typeof n.toJSON=="function"&&(n=n.toJSON()),!n||typeof n!="object"){let f=new bp.Scalar(n);return l&&(l.node=f),f}c=n instanceof Map?o[Lt.MAP]:Symbol.iterator in Object(n)?o[Lt.SEQ]:o[Lt.MAP]}s&&(s(c),delete t.onTagObj);let u=c?.createNode?c.createNode(t.schema,n,t):typeof c?.nodeClass?.from=="function"?c.nodeClass.from(t.schema,n,t):new bp.Scalar(n);return e?u.tag=e:c.default||(u.tag=c.tag),l&&(l.node=u),u}Np.createNode=oA});var Cn=_(Li=>{"use strict";var aA=Rn(),Ge=W(),lA=gi();function Ko(n,e,t){let r=t;for(let i=e.length-1;i>=0;--i){let s=e[i];if(typeof s=="number"&&Number.isInteger(s)&&s>=0){let o=[];o[s]=r,r=o}else r=new Map([[s,r]])}return aA.createNode(r,void 0,{aliasDuplicateObjects:!1,keepUndefined:!1,onAnchor:()=>{throw new Error("This should not happen, please report a bug.")},schema:n,sourceObjects:new Map})}var Op=n=>n==null||typeof n=="object"&&!!n[Symbol.iterator]().next().done,Ti=class extends lA.NodeBase{constructor(e,t){super(e),Object.defineProperty(this,"schema",{value:t,configurable:!0,enumerable:!1,writable:!0})}clone(e){let t=Object.create(Object.getPrototypeOf(this),Object.getOwnPropertyDescriptors(this));return e&&(t.schema=e),t.items=t.items.map(r=>Ge.isNode(r)||Ge.isPair(r)?r.clone(e):r),this.range&&(t.range=this.range.slice()),t}addIn(e,t){if(Op(e))this.add(t);else{let[r,...i]=e,s=this.get(r,!0);if(Ge.isCollection(s))s.addIn(i,t);else if(s===void 0&&this.schema)this.set(r,Ko(this.schema,i,t));else throw new Error(`Expected YAML collection at ${r}. Remaining path: ${i}`)}}deleteIn(e){let[t,...r]=e;if(r.length===0)return this.delete(t);let i=this.get(t,!0);if(Ge.isCollection(i))return i.deleteIn(r);throw new Error(`Expected YAML collection at ${t}. Remaining path: ${r}`)}getIn(e,t){let[r,...i]=e,s=this.get(r,!0);return i.length===0?!t&&Ge.isScalar(s)?s.value:s:Ge.isCollection(s)?s.getIn(i,t):void 0}hasAllNullValues(e){return this.items.every(t=>{if(!Ge.isPair(t))return!1;let r=t.value;return r==null||e&&Ge.isScalar(r)&&r.value==null&&!r.commentBefore&&!r.comment&&!r.tag})}hasIn(e){let[t,...r]=e;if(r.length===0)return this.has(t);let i=this.get(t,!0);return Ge.isCollection(i)?i.hasIn(r):!1}setIn(e,t){let[r,...i]=e;if(i.length===0)this.set(r,t);else{let s=this.get(r,!0);if(Ge.isCollection(s))s.setIn(i,t);else if(s===void 0&&this.schema)this.set(r,Ko(this.schema,i,t));else throw new Error(`Expected YAML collection at ${r}. Remaining path: ${i}`)}}};Ti.maxFlowStringSingleLineLength=60;Li.Collection=Ti;Li.collectionFromPath=Ko;Li.isEmptyPath=Op});var Pn=_(Si=>{"use strict";var cA=n=>n.replace(/^(?!$)(?: $)?/gm,"#");function Yo(n,e){return/^\n+$/.test(n)?n.substring(1):e?n.replace(/^(?! *$)/gm,e):n}var uA=(n,e,t)=>n.endsWith(`
`)?Yo(t,e):t.includes(`
`)?`
`+Yo(t,e):(n.endsWith(" ")?"":" ")+t;Si.indentComment=Yo;Si.lineComment=uA;Si.stringifyComment=cA});var Cp=_(kn=>{"use strict";var fA="flow",Jo="block",Ai="quoted";function hA(n,e,t="flow",{indentAtStart:r,lineWidth:i=80,minContentWidth:s=20,onFold:o,onOverflow:a}={}){if(!i||i<0)return n;let l=Math.max(1+s,1+i-e.length);if(n.length<=l)return n;let c=[],u={},f=i-e.length;typeof r=="number"&&(r>i-Math.max(2,s)?c.push(0):f=i-r);let p,h,y=!1,g=-1,m=-1,L=-1;t===Jo&&(g=Rp(n,g),g!==-1&&(f=g+l));for(let b;b=n[g+=1];){if(t===Ai&&b==="\\"){switch(m=g,n[g+1]){case"x":g+=3;break;case"u":g+=5;break;case"U":g+=9;break;default:g+=1}L=g}if(b===`
`)t===Jo&&(g=Rp(n,g)),f=g+l,p=void 0;else{if(b===" "&&h&&h!==" "&&h!==`
`&&h!=="	"){let $=n[g+1];$&&$!==" "&&$!==`
`&&$!=="	"&&(p=g)}if(g>=f)if(p)c.push(p),f=p+l,p=void 0;else if(t===Ai){for(;h===" "||h==="	";)h=b,b=n[g+=1],y=!0;let $=g>L+1?g-2:m-1;if(u[$])return n;c.push($),u[$]=!0,f=$+l,p=void 0}else y=!0}h=b}if(y&&a&&a(),c.length===0)return n;o&&o();let w=n.slice(0,c[0]);for(let b=0;b<c.length;++b){let $=c[b],M=c[b+1]||n.length;$===0?w=`
${e}${n.slice(0,M)}`:(t===Ai&&u[$]&&(w+=`${n[$]}\\`),w+=`
${e}${n.slice($+1,M)}`)}return w}function Rp(n,e){let t=n[e+1];for(;t===" "||t==="	";){do t=n[e+=1];while(t&&t!==`
`);t=n[e+1]}return e}kn.FOLD_BLOCK=Jo;kn.FOLD_FLOW=fA;kn.FOLD_QUOTED=Ai;kn.foldFlowLines=hA});var qn=_(Pp=>{"use strict";var Ke=ce(),lt=Cp(),wi=(n,e)=>({indentAtStart:e?n.indent.length:n.indentAtStart,lineWidth:n.options.lineWidth,minContentWidth:n.options.minContentWidth}),vi=n=>/^(%|---|\.\.\.)/m.test(n);function dA(n,e,t){if(!e||e<0)return!1;let r=e-t,i=n.length;if(i<=r)return!1;for(let s=0,o=0;s<i;++s)if(n[s]===`
`){if(s-o>r)return!0;if(o=s+1,i-o<=r)return!1}return!0}function $n(n,e){let t=JSON.stringify(n);if(e.options.doubleQuotedAsJSON)return t;let{implicitKey:r}=e,i=e.options.doubleQuotedMinMultiLineLength,s=e.indent||(vi(n)?"  ":""),o="",a=0;for(let l=0,c=t[l];c;c=t[++l])if(c===" "&&t[l+1]==="\\"&&t[l+2]==="n"&&(o+=t.slice(a,l)+"\\ ",l+=1,a=l,c="\\"),c==="\\")switch(t[l+1]){case"u":{o+=t.slice(a,l);let u=t.substr(l+2,4);switch(u){case"0000":o+="\\0";break;case"0007":o+="\\a";break;case"000b":o+="\\v";break;case"001b":o+="\\e";break;case"0085":o+="\\N";break;case"00a0":o+="\\_";break;case"2028":o+="\\L";break;case"2029":o+="\\P";break;default:u.substr(0,2)==="00"?o+="\\x"+u.substr(2):o+=t.substr(l,6)}l+=5,a=l+1}break;case"n":if(r||t[l+2]==='"'||t.length<i)l+=1;else{for(o+=t.slice(a,l)+`

`;t[l+2]==="\\"&&t[l+3]==="n"&&t[l+4]!=='"';)o+=`
`,l+=2;o+=s,t[l+2]===" "&&(o+="\\"),l+=1,a=l+1}break;default:l+=1}return o=a?o+t.slice(a):t,r?o:lt.foldFlowLines(o,s,lt.FOLD_QUOTED,wi(e,!1))}function Xo(n,e){if(e.options.singleQuote===!1||e.implicitKey&&n.includes(`
`)||/[ \t]\n|\n[ \t]/.test(n))return $n(n,e);let t=e.indent||(vi(n)?"  ":""),r="'"+n.replace(/'/g,"''").replace(/\n+/g,`$&
${t}`)+"'";return e.implicitKey?r:lt.foldFlowLines(r,t,lt.FOLD_FLOW,wi(e,!1))}function Bt(n,e){let{singleQuote:t}=e.options,r;if(t===!1)r=$n;else{let i=n.includes('"'),s=n.includes("'");i&&!s?r=Xo:s&&!i?r=$n:r=t?Xo:$n}return r(n,e)}var zo;try{zo=new RegExp(`(^|(?<!
))
+(?!
|$)`,"g")}catch{zo=/\n+(?!\n|$)/g}function Ii({comment:n,type:e,value:t},r,i,s){let{blockQuote:o,commentString:a,lineWidth:l}=r.options;if(!o||/\n[\t ]+$/.test(t)||/^\s*$/.test(t))return Bt(t,r);let c=r.indent||(r.forceBlockIndent||vi(t)?"  ":""),u=o==="literal"?!0:o==="folded"||e===Ke.Scalar.BLOCK_FOLDED?!1:e===Ke.Scalar.BLOCK_LITERAL?!0:!dA(t,l,c.length);if(!t)return u?`|
`:`>
`;let f,p;for(p=t.length;p>0;--p){let v=t[p-1];if(v!==`
`&&v!=="	"&&v!==" ")break}let h=t.substring(p),y=h.indexOf(`
`);y===-1?f="-":t===h||y!==h.length-1?(f="+",s&&s()):f="",h&&(t=t.slice(0,-h.length),h[h.length-1]===`
`&&(h=h.slice(0,-1)),h=h.replace(zo,`$&${c}`));let g=!1,m,L=-1;for(m=0;m<t.length;++m){let v=t[m];if(v===" ")g=!0;else if(v===`
`)L=m;else break}let w=t.substring(0,L<m?L+1:m);w&&(t=t.substring(w.length),w=w.replace(/\n+/g,`$&${c}`));let $=(u?"|":">")+(g?c?"2":"1":"")+f;if(n&&($+=" "+a(n.replace(/ ?[\r\n]+/g," ")),i&&i()),u)return t=t.replace(/\n+/g,`$&${c}`),`${$}
${c}${w}${t}${h}`;t=t.replace(/\n+/g,`
$&`).replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g,"$1$2").replace(/\n+/g,`$&${c}`);let M=lt.foldFlowLines(`${w}${t}${h}`,c,lt.FOLD_BLOCK,wi(r,!0));return`${$}
${c}${M}`}function pA(n,e,t,r){let{type:i,value:s}=n,{actualString:o,implicitKey:a,indent:l,indentStep:c,inFlow:u}=e;if(a&&/[\n[\]{},]/.test(s)||u&&/[[\]{},]/.test(s))return Bt(s,e);if(!s||/^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(s))return a||u||!s.includes(`
`)?Bt(s,e):Ii(n,e,t,r);if(!a&&!u&&i!==Ke.Scalar.PLAIN&&s.includes(`
`))return Ii(n,e,t,r);if(vi(s)){if(l==="")return e.forceBlockIndent=!0,Ii(n,e,t,r);if(a&&l===c)return Bt(s,e)}let f=s.replace(/\n+/g,`$&
${l}`);if(o){let p=g=>g.default&&g.tag!=="tag:yaml.org,2002:str"&&g.test?.test(f),{compat:h,tags:y}=e.doc.schema;if(y.some(p)||h?.some(p))return Bt(s,e)}return a?f:lt.foldFlowLines(f,l,lt.FOLD_FLOW,wi(e,!1))}function _A(n,e,t,r){let{implicitKey:i,inFlow:s}=e,o=typeof n.value=="string"?n:Object.assign({},n,{value:String(n.value)}),{type:a}=n;a!==Ke.Scalar.QUOTE_DOUBLE&&/[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(o.value)&&(a=Ke.Scalar.QUOTE_DOUBLE);let l=u=>{switch(u){case Ke.Scalar.BLOCK_FOLDED:case Ke.Scalar.BLOCK_LITERAL:return i||s?Bt(o.value,e):Ii(o,e,t,r);case Ke.Scalar.QUOTE_DOUBLE:return $n(o.value,e);case Ke.Scalar.QUOTE_SINGLE:return Xo(o.value,e);case Ke.Scalar.PLAIN:return pA(o,e,t,r);default:return null}},c=l(a);if(c===null){let{defaultKeyType:u,defaultStringType:f}=e.options,p=i&&u||f;if(c=l(p),c===null)throw new Error(`Unsupported default string type ${p}`)}return c}Pp.stringifyString=_A});var xn=_(Qo=>{"use strict";var mA=mi(),ct=W(),gA=Pn(),yA=qn();function EA(n,e){let t=Object.assign({blockQuote:!0,commentString:gA.stringifyComment,defaultKeyType:null,defaultStringType:"PLAIN",directives:null,doubleQuotedAsJSON:!1,doubleQuotedMinMultiLineLength:40,falseStr:"false",flowCollectionPadding:!0,indentSeq:!0,lineWidth:80,minContentWidth:20,nullStr:"null",simpleKeys:!1,singleQuote:null,trueStr:"true",verifyAliasOrder:!0},n.schema.toStringOptions,e),r;switch(t.collectionStyle){case"block":r=!1;break;case"flow":r=!0;break;default:r=null}return{anchors:new Set,doc:n,flowCollectionPadding:t.flowCollectionPadding?" ":"",indent:"",indentStep:typeof t.indent=="number"?" ".repeat(t.indent):"  ",inFlow:r,options:t}}function TA(n,e){if(e.tag){let i=n.filter(s=>s.tag===e.tag);if(i.length>0)return i.find(s=>s.format===e.format)??i[0]}let t,r;if(ct.isScalar(e)){r=e.value;let i=n.filter(s=>s.identify?.(r));t=i.find(s=>s.format===e.format)??i.find(s=>!s.format)}else r=e,t=n.find(i=>i.nodeClass&&r instanceof i.nodeClass);if(!t){let i=r?.constructor?.name??typeof r;throw new Error(`Tag not resolved for ${i} value`)}return t}function LA(n,e,{anchors:t,doc:r}){if(!r.directives)return"";let i=[],s=(ct.isScalar(n)||ct.isCollection(n))&&n.anchor;s&&mA.anchorIsValid(s)&&(t.add(s),i.push(`&${s}`));let o=n.tag?n.tag:e.default?null:e.tag;return o&&i.push(r.directives.tagString(o)),i.join(" ")}function SA(n,e,t,r){if(ct.isPair(n))return n.toString(e,t,r);if(ct.isAlias(n)){if(e.doc.directives)return n.toString(e);if(e.resolvedAliases?.has(n))throw new TypeError("Cannot stringify circular structure without alias nodes");e.resolvedAliases?e.resolvedAliases.add(n):e.resolvedAliases=new Set([n]),n=n.resolve(e.doc)}let i,s=ct.isNode(n)?n:e.doc.createNode(n,{onTagObj:l=>i=l});i||(i=TA(e.doc.schema.tags,s));let o=LA(s,i,e);o.length>0&&(e.indentAtStart=(e.indentAtStart??0)+o.length+1);let a=typeof i.stringify=="function"?i.stringify(s,e,t,r):ct.isScalar(s)?yA.stringifyString(s,e,t,r):s.toString(e,t,r);return o?ct.isScalar(s)||a[0]==="{"||a[0]==="["?`${o} ${a}`:`${o}
${e.indent}${a}`:a}Qo.createStringifyContext=EA;Qo.stringify=SA});var xp=_(qp=>{"use strict";var ut=W(),kp=ce(),$p=xn(),Mn=Pn();function AA({key:n,value:e},t,r,i){let{allNullValues:s,doc:o,indent:a,indentStep:l,options:{commentString:c,indentSeq:u,simpleKeys:f}}=t,p=ut.isNode(n)&&n.comment||null;if(f){if(p)throw new Error("With simple keys, key nodes cannot have comments");if(ut.isCollection(n)){let V="With simple keys, collection cannot be used as a key value";throw new Error(V)}}let h=!f&&(!n||p&&e==null&&!t.inFlow||ut.isCollection(n)||(ut.isScalar(n)?n.type===kp.Scalar.BLOCK_FOLDED||n.type===kp.Scalar.BLOCK_LITERAL:typeof n=="object"));t=Object.assign({},t,{allNullValues:!1,implicitKey:!h&&(f||!s),indent:a+l});let y=!1,g=!1,m=$p.stringify(n,t,()=>y=!0,()=>g=!0);if(!h&&!t.inFlow&&m.length>1024){if(f)throw new Error("With simple keys, single line scalar must not span more than 1024 characters");h=!0}if(t.inFlow){if(s||e==null)return y&&r&&r(),m===""?"?":h?`? ${m}`:m}else if(s&&!f||e==null&&h)return m=`? ${m}`,p&&!y?m+=Mn.lineComment(m,t.indent,c(p)):g&&i&&i(),m;y&&(p=null),h?(p&&(m+=Mn.lineComment(m,t.indent,c(p))),m=`? ${m}
${a}:`):(m=`${m}:`,p&&(m+=Mn.lineComment(m,t.indent,c(p))));let L,w,b;ut.isNode(e)?(L=!!e.spaceBefore,w=e.commentBefore,b=e.comment):(L=!1,w=null,b=null,e&&typeof e=="object"&&(e=o.createNode(e))),t.implicitKey=!1,!h&&!p&&ut.isScalar(e)&&(t.indentAtStart=m.length+1),g=!1,!u&&l.length>=2&&!t.inFlow&&!h&&ut.isSeq(e)&&!e.flow&&!e.tag&&!e.anchor&&(t.indent=t.indent.substring(2));let $=!1,M=$p.stringify(e,t,()=>$=!0,()=>g=!0),v=" ";if(p||L||w){if(v=L?`
`:"",w){let V=c(w);v+=`
${Mn.indentComment(V,t.indent)}`}M===""&&!t.inFlow?v===`
`&&(v=`

`):v+=`
${t.indent}`}else if(!h&&ut.isCollection(e)){let V=M[0],G=M.indexOf(`
`),k=G!==-1,j=t.inFlow??e.flow??e.items.length===0;if(k||!j){let F=!1;if(k&&(V==="&"||V==="!")){let D=M.indexOf(" ");V==="&"&&D!==-1&&D<G&&M[D+1]==="!"&&(D=M.indexOf(" ",D+1)),(D===-1||G<D)&&(F=!0)}F||(v=`
${t.indent}`)}}else(M===""||M[0]===`
`)&&(v="");return m+=v+M,t.inFlow?$&&r&&r():b&&!$?m+=Mn.lineComment(m,t.indent,c(b)):g&&i&&i(),m}qp.stringifyPair=AA});var ea=_(Zo=>{"use strict";function IA(n,...e){n==="debug"&&console.log(...e)}function wA(n,e){(n==="debug"||n==="warn")&&(typeof process<"u"&&process.emitWarning?process.emitWarning(e):console.warn(e))}Zo.debug=IA;Zo.warn=wA});var ra=_(Fp=>{"use strict";var vA=ea(),bA=xn(),Ut=W(),NA=ce(),ta=ot(),Mp="<<";function OA(n,e,{key:t,value:r}){if(n?.doc.schema.merge&&RA(t))if(r=Ut.isAlias(r)?r.resolve(n.doc):r,Ut.isSeq(r))for(let i of r.items)na(n,e,i);else if(Array.isArray(r))for(let i of r)na(n,e,i);else na(n,e,r);else{let i=ta.toJS(t,"",n);if(e instanceof Map)e.set(i,ta.toJS(r,i,n));else if(e instanceof Set)e.add(i);else{let s=CA(t,i,n),o=ta.toJS(r,s,n);s in e?Object.defineProperty(e,s,{value:o,writable:!0,enumerable:!0,configurable:!0}):e[s]=o}}return e}var RA=n=>n===Mp||Ut.isScalar(n)&&n.value===Mp&&(!n.type||n.type===NA.Scalar.PLAIN);function na(n,e,t){let r=n&&Ut.isAlias(t)?t.resolve(n.doc):t;if(!Ut.isMap(r))throw new Error("Merge sources must be maps or map aliases");let i=r.toJSON(null,n,Map);for(let[s,o]of i)e instanceof Map?e.has(s)||e.set(s,o):e instanceof Set?e.add(s):Object.prototype.hasOwnProperty.call(e,s)||Object.defineProperty(e,s,{value:o,writable:!0,enumerable:!0,configurable:!0});return e}function CA(n,e,t){if(e===null)return"";if(typeof e!="object")return String(e);if(Ut.isNode(n)&&t&&t.doc){let r=bA.createStringifyContext(t.doc,{});r.anchors=new Set;for(let s of t.anchors.keys())r.anchors.add(s.anchor);r.inFlow=!0,r.inStringifyKey=!0;let i=n.toString(r);if(!t.mapKeyWarned){let s=JSON.stringify(i);s.length>40&&(s=s.substring(0,36)+'..."'),vA.warn(t.doc.options.logLevel,`Keys with collection values will be stringified due to JS Object restrictions: ${s}. Set mapAsMap: true to use object keys.`),t.mapKeyWarned=!0}return i}return JSON.stringify(e)}Fp.addPairToJSMap=OA});var ft=_(ia=>{"use strict";var Dp=Rn(),PA=xp(),kA=ra(),bi=W();function $A(n,e,t){let r=Dp.createNode(n,void 0,t),i=Dp.createNode(e,void 0,t);return new Ni(r,i)}var Ni=class n{constructor(e,t=null){Object.defineProperty(this,bi.NODE_TYPE,{value:bi.PAIR}),this.key=e,this.value=t}clone(e){let{key:t,value:r}=this;return bi.isNode(t)&&(t=t.clone(e)),bi.isNode(r)&&(r=r.clone(e)),new n(t,r)}toJSON(e,t){let r=t?.mapAsMap?new Map:{};return kA.addPairToJSMap(t,r,this)}toString(e,t,r){return e?.doc?PA.stringifyPair(this,e,t,r):JSON.stringify(this)}};ia.Pair=Ni;ia.createPair=$A});var sa=_(Hp=>{"use strict";var qA=Cn(),St=W(),jp=xn(),Fn=Pn();function xA(n,e,t){return(e.inFlow??n.flow?FA:MA)(n,e,t)}function MA({comment:n,items:e},t,{blockItemPrefix:r,flowChars:i,itemIndent:s,onChompKeep:o,onComment:a}){let{indent:l,options:{commentString:c}}=t,u=Object.assign({},t,{indent:s,type:null}),f=!1,p=[];for(let y=0;y<e.length;++y){let g=e[y],m=null;if(St.isNode(g))!f&&g.spaceBefore&&p.push(""),Oi(t,p,g.commentBefore,f),g.comment&&(m=g.comment);else if(St.isPair(g)){let w=St.isNode(g.key)?g.key:null;w&&(!f&&w.spaceBefore&&p.push(""),Oi(t,p,w.commentBefore,f))}f=!1;let L=jp.stringify(g,u,()=>m=null,()=>f=!0);m&&(L+=Fn.lineComment(L,s,c(m))),f&&m&&(f=!1),p.push(r+L)}let h;if(p.length===0)h=i.start+i.end;else{h=p[0];for(let y=1;y<p.length;++y){let g=p[y];h+=g?`
${l}${g}`:`
`}}return n?(h+=`
`+Fn.indentComment(c(n),l),a&&a()):f&&o&&o(),h}function FA({comment:n,items:e},t,{flowChars:r,itemIndent:i,onComment:s}){let{indent:o,indentStep:a,flowCollectionPadding:l,options:{commentString:c}}=t;i+=a;let u=Object.assign({},t,{indent:i,inFlow:!0,type:null}),f=!1,p=0,h=[];for(let L=0;L<e.length;++L){let w=e[L],b=null;if(St.isNode(w))w.spaceBefore&&h.push(""),Oi(t,h,w.commentBefore,!1),w.comment&&(b=w.comment);else if(St.isPair(w)){let M=St.isNode(w.key)?w.key:null;M&&(M.spaceBefore&&h.push(""),Oi(t,h,M.commentBefore,!1),M.comment&&(f=!0));let v=St.isNode(w.value)?w.value:null;v?(v.comment&&(b=v.comment),v.commentBefore&&(f=!0)):w.value==null&&M&&M.comment&&(b=M.comment)}b&&(f=!0);let $=jp.stringify(w,u,()=>b=null);L<e.length-1&&($+=","),b&&($+=Fn.lineComment($,i,c(b))),!f&&(h.length>p||$.includes(`
`))&&(f=!0),h.push($),p=h.length}let y,{start:g,end:m}=r;if(h.length===0)y=g+m;else if(f||(f=h.reduce((w,b)=>w+b.length+2,2)>qA.Collection.maxFlowStringSingleLineLength),f){y=g;for(let L of h)y+=L?`
${a}${o}${L}`:`
`;y+=`
${o}${m}`}else y=`${g}${l}${h.join(" ")}${l}${m}`;return n&&(y+=Fn.lineComment(y,o,c(n)),s&&s()),y}function Oi({indent:n,options:{commentString:e}},t,r,i){if(r&&i&&(r=r.replace(/^\n+/,"")),r){let s=Fn.indentComment(e(r),n);t.push(s.trimStart())}}Hp.stringifyCollection=xA});var dt=_(aa=>{"use strict";var DA=sa(),jA=ra(),HA=Cn(),ht=W(),Ri=ft(),BA=ce();function Dn(n,e){let t=ht.isScalar(e)?e.value:e;for(let r of n)if(ht.isPair(r)&&(r.key===e||r.key===t||ht.isScalar(r.key)&&r.key.value===t))return r}var oa=class extends HA.Collection{static get tagName(){return"tag:yaml.org,2002:map"}constructor(e){super(ht.MAP,e),this.items=[]}static from(e,t,r){let{keepUndefined:i,replacer:s}=r,o=new this(e),a=(l,c)=>{if(typeof s=="function")c=s.call(t,l,c);else if(Array.isArray(s)&&!s.includes(l))return;(c!==void 0||i)&&o.items.push(Ri.createPair(l,c,r))};if(t instanceof Map)for(let[l,c]of t)a(l,c);else if(t&&typeof t=="object")for(let l of Object.keys(t))a(l,t[l]);return typeof e.sortMapEntries=="function"&&o.items.sort(e.sortMapEntries),o}add(e,t){let r;ht.isPair(e)?r=e:!e||typeof e!="object"||!("key"in e)?r=new Ri.Pair(e,e?.value):r=new Ri.Pair(e.key,e.value);let i=Dn(this.items,r.key),s=this.schema?.sortMapEntries;if(i){if(!t)throw new Error(`Key ${r.key} already set`);ht.isScalar(i.value)&&BA.isScalarValue(r.value)?i.value.value=r.value:i.value=r.value}else if(s){let o=this.items.findIndex(a=>s(r,a)<0);o===-1?this.items.push(r):this.items.splice(o,0,r)}else this.items.push(r)}delete(e){let t=Dn(this.items,e);return t?this.items.splice(this.items.indexOf(t),1).length>0:!1}get(e,t){let i=Dn(this.items,e)?.value;return(!t&&ht.isScalar(i)?i.value:i)??void 0}has(e){return!!Dn(this.items,e)}set(e,t){this.add(new Ri.Pair(e,t),!0)}toJSON(e,t,r){let i=r?new r:t?.mapAsMap?new Map:{};t?.onCreate&&t.onCreate(i);for(let s of this.items)jA.addPairToJSMap(t,i,s);return i}toString(e,t,r){if(!e)return JSON.stringify(this);for(let i of this.items)if(!ht.isPair(i))throw new Error(`Map items must all be pairs; found ${JSON.stringify(i)} instead`);return!e.allNullValues&&this.hasAllNullValues(!1)&&(e=Object.assign({},e,{allNullValues:!0})),DA.stringifyCollection(this,e,{blockItemPrefix:"",flowChars:{start:"{",end:"}"},itemIndent:e.indent||"",onChompKeep:r,onComment:t})}};aa.YAMLMap=oa;aa.findPair=Dn});var Vt=_(Up=>{"use strict";var UA=W(),Bp=dt(),VA={collection:"map",default:!0,nodeClass:Bp.YAMLMap,tag:"tag:yaml.org,2002:map",resolve(n,e){return UA.isMap(n)||e("Expected a mapping for this tag"),n},createNode:(n,e,t)=>Bp.YAMLMap.from(n,e,t)};Up.map=VA});var pt=_(Vp=>{"use strict";var WA=Rn(),GA=sa(),KA=Cn(),Pi=W(),YA=ce(),JA=ot(),la=class extends KA.Collection{static get tagName(){return"tag:yaml.org,2002:seq"}constructor(e){super(Pi.SEQ,e),this.items=[]}add(e){this.items.push(e)}delete(e){let t=Ci(e);return typeof t!="number"?!1:this.items.splice(t,1).length>0}get(e,t){let r=Ci(e);if(typeof r!="number")return;let i=this.items[r];return!t&&Pi.isScalar(i)?i.value:i}has(e){let t=Ci(e);return typeof t=="number"&&t<this.items.length}set(e,t){let r=Ci(e);if(typeof r!="number")throw new Error(`Expected a valid index, not ${e}.`);let i=this.items[r];Pi.isScalar(i)&&YA.isScalarValue(t)?i.value=t:this.items[r]=t}toJSON(e,t){let r=[];t?.onCreate&&t.onCreate(r);let i=0;for(let s of this.items)r.push(JA.toJS(s,String(i++),t));return r}toString(e,t,r){return e?GA.stringifyCollection(this,e,{blockItemPrefix:"- ",flowChars:{start:"[",end:"]"},itemIndent:(e.indent||"")+"  ",onChompKeep:r,onComment:t}):JSON.stringify(this)}static from(e,t,r){let{replacer:i}=r,s=new this(e);if(t&&Symbol.iterator in Object(t)){let o=0;for(let a of t){if(typeof i=="function"){let l=t instanceof Set?a:String(o++);a=i.call(t,l,a)}s.items.push(WA.createNode(a,void 0,r))}}return s}};function Ci(n){let e=Pi.isScalar(n)?n.value:n;return e&&typeof e=="string"&&(e=Number(e)),typeof e=="number"&&Number.isInteger(e)&&e>=0?e:null}Vp.YAMLSeq=la});var Wt=_(Gp=>{"use strict";var XA=W(),Wp=pt(),zA={collection:"seq",default:!0,nodeClass:Wp.YAMLSeq,tag:"tag:yaml.org,2002:seq",resolve(n,e){return XA.isSeq(n)||e("Expected a sequence for this tag"),n},createNode:(n,e,t)=>Wp.YAMLSeq.from(n,e,t)};Gp.seq=zA});var jn=_(Kp=>{"use strict";var QA=qn(),ZA={identify:n=>typeof n=="string",default:!0,tag:"tag:yaml.org,2002:str",resolve:n=>n,stringify(n,e,t,r){return e=Object.assign({actualString:!0},e),QA.stringifyString(n,e,t,r)}};Kp.string=ZA});var ki=_(Xp=>{"use strict";var Yp=ce(),Jp={identify:n=>n==null,createNode:()=>new Yp.Scalar(null),default:!0,tag:"tag:yaml.org,2002:null",test:/^(?:~|[Nn]ull|NULL)?$/,resolve:()=>new Yp.Scalar(null),stringify:({source:n},e)=>typeof n=="string"&&Jp.test.test(n)?n:e.options.nullStr};Xp.nullTag=Jp});var ca=_(Qp=>{"use strict";var eI=ce(),zp={identify:n=>typeof n=="boolean",default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,resolve:n=>new eI.Scalar(n[0]==="t"||n[0]==="T"),stringify({source:n,value:e},t){if(n&&zp.test.test(n)){let r=n[0]==="t"||n[0]==="T";if(e===r)return n}return e?t.options.trueStr:t.options.falseStr}};Qp.boolTag=zp});var Gt=_(Zp=>{"use strict";function tI({format:n,minFractionDigits:e,tag:t,value:r}){if(typeof r=="bigint")return String(r);let i=typeof r=="number"?r:Number(r);if(!isFinite(i))return isNaN(i)?".nan":i<0?"-.inf":".inf";let s=JSON.stringify(r);if(!n&&e&&(!t||t==="tag:yaml.org,2002:float")&&/^\d/.test(s)){let o=s.indexOf(".");o<0&&(o=s.length,s+=".");let a=e-(s.length-o-1);for(;a-- >0;)s+="0"}return s}Zp.stringifyNumber=tI});var fa=_($i=>{"use strict";var nI=ce(),ua=Gt(),rI={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^(?:[-+]?\.(?:inf|Inf|INF|nan|NaN|NAN))$/,resolve:n=>n.slice(-3).toLowerCase()==="nan"?NaN:n[0]==="-"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,stringify:ua.stringifyNumber},iI={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"EXP",test:/^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,resolve:n=>parseFloat(n),stringify(n){let e=Number(n.value);return isFinite(e)?e.toExponential():ua.stringifyNumber(n)}},sI={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,resolve(n){let e=new nI.Scalar(parseFloat(n)),t=n.indexOf(".");return t!==-1&&n[n.length-1]==="0"&&(e.minFractionDigits=n.length-t-1),e},stringify:ua.stringifyNumber};$i.float=sI;$i.floatExp=iI;$i.floatNaN=rI});var da=_(xi=>{"use strict";var e_=Gt(),qi=n=>typeof n=="bigint"||Number.isInteger(n),ha=(n,e,t,{intAsBigInt:r})=>r?BigInt(n):parseInt(n.substring(e),t);function t_(n,e,t){let{value:r}=n;return qi(r)&&r>=0?t+r.toString(e):e_.stringifyNumber(n)}var oI={identify:n=>qi(n)&&n>=0,default:!0,tag:"tag:yaml.org,2002:int",format:"OCT",test:/^0o[0-7]+$/,resolve:(n,e,t)=>ha(n,2,8,t),stringify:n=>t_(n,8,"0o")},aI={identify:qi,default:!0,tag:"tag:yaml.org,2002:int",test:/^[-+]?[0-9]+$/,resolve:(n,e,t)=>ha(n,0,10,t),stringify:e_.stringifyNumber},lI={identify:n=>qi(n)&&n>=0,default:!0,tag:"tag:yaml.org,2002:int",format:"HEX",test:/^0x[0-9a-fA-F]+$/,resolve:(n,e,t)=>ha(n,2,16,t),stringify:n=>t_(n,16,"0x")};xi.int=aI;xi.intHex=lI;xi.intOct=oI});var r_=_(n_=>{"use strict";var cI=Vt(),uI=ki(),fI=Wt(),hI=jn(),dI=ca(),pa=fa(),_a=da(),pI=[cI.map,fI.seq,hI.string,uI.nullTag,dI.boolTag,_a.intOct,_a.int,_a.intHex,pa.floatNaN,pa.floatExp,pa.float];n_.schema=pI});var o_=_(s_=>{"use strict";var _I=ce(),mI=Vt(),gI=Wt();function i_(n){return typeof n=="bigint"||Number.isInteger(n)}var Mi=({value:n})=>JSON.stringify(n),yI=[{identify:n=>typeof n=="string",default:!0,tag:"tag:yaml.org,2002:str",resolve:n=>n,stringify:Mi},{identify:n=>n==null,createNode:()=>new _I.Scalar(null),default:!0,tag:"tag:yaml.org,2002:null",test:/^null$/,resolve:()=>null,stringify:Mi},{identify:n=>typeof n=="boolean",default:!0,tag:"tag:yaml.org,2002:bool",test:/^true|false$/,resolve:n=>n==="true",stringify:Mi},{identify:i_,default:!0,tag:"tag:yaml.org,2002:int",test:/^-?(?:0|[1-9][0-9]*)$/,resolve:(n,e,{intAsBigInt:t})=>t?BigInt(n):parseInt(n,10),stringify:({value:n})=>i_(n)?n.toString():JSON.stringify(n)},{identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,resolve:n=>parseFloat(n),stringify:Mi}],EI={default:!0,tag:"",test:/^/,resolve(n,e){return e(`Unresolved plain scalar ${JSON.stringify(n)}`),n}},TI=[mI.map,gI.seq].concat(yI,EI);s_.schema=TI});var ga=_(a_=>{"use strict";var ma=ce(),LI=qn(),SI={identify:n=>n instanceof Uint8Array,default:!1,tag:"tag:yaml.org,2002:binary",resolve(n,e){if(typeof Buffer=="function")return Buffer.from(n,"base64");if(typeof atob=="function"){let t=atob(n.replace(/[\n\r]/g,"")),r=new Uint8Array(t.length);for(let i=0;i<t.length;++i)r[i]=t.charCodeAt(i);return r}else return e("This environment does not support reading binary tags; either Buffer or atob is required"),n},stringify({comment:n,type:e,value:t},r,i,s){let o=t,a;if(typeof Buffer=="function")a=o instanceof Buffer?o.toString("base64"):Buffer.from(o.buffer).toString("base64");else if(typeof btoa=="function"){let l="";for(let c=0;c<o.length;++c)l+=String.fromCharCode(o[c]);a=btoa(l)}else throw new Error("This environment does not support writing binary tags; either Buffer or btoa is required");if(e||(e=ma.Scalar.BLOCK_LITERAL),e!==ma.Scalar.QUOTE_DOUBLE){let l=Math.max(r.options.lineWidth-r.indent.length,r.options.minContentWidth),c=Math.ceil(a.length/l),u=new Array(c);for(let f=0,p=0;f<c;++f,p+=l)u[f]=a.substr(p,l);a=u.join(e===ma.Scalar.BLOCK_LITERAL?`
`:" ")}return LI.stringifyString({comment:n,type:e,value:a},r,i,s)}};a_.binary=SI});var ji=_(Di=>{"use strict";var Fi=W(),ya=ft(),AI=ce(),II=pt();function l_(n,e){if(Fi.isSeq(n))for(let t=0;t<n.items.length;++t){let r=n.items[t];if(!Fi.isPair(r)){if(Fi.isMap(r)){r.items.length>1&&e("Each pair must have its own sequence indicator");let i=r.items[0]||new ya.Pair(new AI.Scalar(null));if(r.commentBefore&&(i.key.commentBefore=i.key.commentBefore?`${r.commentBefore}
${i.key.commentBefore}`:r.commentBefore),r.comment){let s=i.value??i.key;s.comment=s.comment?`${r.comment}
${s.comment}`:r.comment}r=i}n.items[t]=Fi.isPair(r)?r:new ya.Pair(r)}}else e("Expected a sequence for this tag");return n}function c_(n,e,t){let{replacer:r}=t,i=new II.YAMLSeq(n);i.tag="tag:yaml.org,2002:pairs";let s=0;if(e&&Symbol.iterator in Object(e))for(let o of e){typeof r=="function"&&(o=r.call(e,String(s++),o));let a,l;if(Array.isArray(o))if(o.length===2)a=o[0],l=o[1];else throw new TypeError(`Expected [key, value] tuple: ${o}`);else if(o&&o instanceof Object){let c=Object.keys(o);if(c.length===1)a=c[0],l=o[a];else throw new TypeError(`Expected { key: value } tuple: ${o}`)}else a=o;i.items.push(ya.createPair(a,l,t))}return i}var wI={collection:"seq",default:!1,tag:"tag:yaml.org,2002:pairs",resolve:l_,createNode:c_};Di.createPairs=c_;Di.pairs=wI;Di.resolvePairs=l_});var La=_(Ta=>{"use strict";var u_=W(),Ea=ot(),Hn=dt(),vI=pt(),f_=ji(),At=class n extends vI.YAMLSeq{constructor(){super(),this.add=Hn.YAMLMap.prototype.add.bind(this),this.delete=Hn.YAMLMap.prototype.delete.bind(this),this.get=Hn.YAMLMap.prototype.get.bind(this),this.has=Hn.YAMLMap.prototype.has.bind(this),this.set=Hn.YAMLMap.prototype.set.bind(this),this.tag=n.tag}toJSON(e,t){if(!t)return super.toJSON(e);let r=new Map;t?.onCreate&&t.onCreate(r);for(let i of this.items){let s,o;if(u_.isPair(i)?(s=Ea.toJS(i.key,"",t),o=Ea.toJS(i.value,s,t)):s=Ea.toJS(i,"",t),r.has(s))throw new Error("Ordered maps must not include duplicate keys");r.set(s,o)}return r}static from(e,t,r){let i=f_.createPairs(e,t,r),s=new this;return s.items=i.items,s}};At.tag="tag:yaml.org,2002:omap";var bI={collection:"seq",identify:n=>n instanceof Map,nodeClass:At,default:!1,tag:"tag:yaml.org,2002:omap",resolve(n,e){let t=f_.resolvePairs(n,e),r=[];for(let{key:i}of t.items)u_.isScalar(i)&&(r.includes(i.value)?e(`Ordered maps must not include duplicate keys: ${i.value}`):r.push(i.value));return Object.assign(new At,t)},createNode:(n,e,t)=>At.from(n,e,t)};Ta.YAMLOMap=At;Ta.omap=bI});var m_=_(Sa=>{"use strict";var h_=ce();function d_({value:n,source:e},t){return e&&(n?p_:__).test.test(e)?e:n?t.options.trueStr:t.options.falseStr}var p_={identify:n=>n===!0,default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,resolve:()=>new h_.Scalar(!0),stringify:d_},__={identify:n=>n===!1,default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/i,resolve:()=>new h_.Scalar(!1),stringify:d_};Sa.falseTag=__;Sa.trueTag=p_});var g_=_(Hi=>{"use strict";var NI=ce(),Aa=Gt(),OI={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^[-+]?\.(?:inf|Inf|INF|nan|NaN|NAN)$/,resolve:n=>n.slice(-3).toLowerCase()==="nan"?NaN:n[0]==="-"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,stringify:Aa.stringifyNumber},RI={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"EXP",test:/^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,resolve:n=>parseFloat(n.replace(/_/g,"")),stringify(n){let e=Number(n.value);return isFinite(e)?e.toExponential():Aa.stringifyNumber(n)}},CI={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,resolve(n){let e=new NI.Scalar(parseFloat(n.replace(/_/g,""))),t=n.indexOf(".");if(t!==-1){let r=n.substring(t+1).replace(/_/g,"");r[r.length-1]==="0"&&(e.minFractionDigits=r.length)}return e},stringify:Aa.stringifyNumber};Hi.float=CI;Hi.floatExp=RI;Hi.floatNaN=OI});var E_=_(Un=>{"use strict";var y_=Gt(),Bn=n=>typeof n=="bigint"||Number.isInteger(n);function Bi(n,e,t,{intAsBigInt:r}){let i=n[0];if((i==="-"||i==="+")&&(e+=1),n=n.substring(e).replace(/_/g,""),r){switch(t){case 2:n=`0b${n}`;break;case 8:n=`0o${n}`;break;case 16:n=`0x${n}`;break}let o=BigInt(n);return i==="-"?BigInt(-1)*o:o}let s=parseInt(n,t);return i==="-"?-1*s:s}function Ia(n,e,t){let{value:r}=n;if(Bn(r)){let i=r.toString(e);return r<0?"-"+t+i.substr(1):t+i}return y_.stringifyNumber(n)}var PI={identify:Bn,default:!0,tag:"tag:yaml.org,2002:int",format:"BIN",test:/^[-+]?0b[0-1_]+$/,resolve:(n,e,t)=>Bi(n,2,2,t),stringify:n=>Ia(n,2,"0b")},kI={identify:Bn,default:!0,tag:"tag:yaml.org,2002:int",format:"OCT",test:/^[-+]?0[0-7_]+$/,resolve:(n,e,t)=>Bi(n,1,8,t),stringify:n=>Ia(n,8,"0")},$I={identify:Bn,default:!0,tag:"tag:yaml.org,2002:int",test:/^[-+]?[0-9][0-9_]*$/,resolve:(n,e,t)=>Bi(n,0,10,t),stringify:y_.stringifyNumber},qI={identify:Bn,default:!0,tag:"tag:yaml.org,2002:int",format:"HEX",test:/^[-+]?0x[0-9a-fA-F_]+$/,resolve:(n,e,t)=>Bi(n,2,16,t),stringify:n=>Ia(n,16,"0x")};Un.int=$I;Un.intBin=PI;Un.intHex=qI;Un.intOct=kI});var va=_(wa=>{"use strict";var Wi=W(),Ui=ft(),Vi=dt(),It=class n extends Vi.YAMLMap{constructor(e){super(e),this.tag=n.tag}add(e){let t;Wi.isPair(e)?t=e:e&&typeof e=="object"&&"key"in e&&"value"in e&&e.value===null?t=new Ui.Pair(e.key,null):t=new Ui.Pair(e,null),Vi.findPair(this.items,t.key)||this.items.push(t)}get(e,t){let r=Vi.findPair(this.items,e);return!t&&Wi.isPair(r)?Wi.isScalar(r.key)?r.key.value:r.key:r}set(e,t){if(typeof t!="boolean")throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof t}`);let r=Vi.findPair(this.items,e);r&&!t?this.items.splice(this.items.indexOf(r),1):!r&&t&&this.items.push(new Ui.Pair(e))}toJSON(e,t){return super.toJSON(e,t,Set)}toString(e,t,r){if(!e)return JSON.stringify(this);if(this.hasAllNullValues(!0))return super.toString(Object.assign({},e,{allNullValues:!0}),t,r);throw new Error("Set items must all have null values")}static from(e,t,r){let{replacer:i}=r,s=new this(e);if(t&&Symbol.iterator in Object(t))for(let o of t)typeof i=="function"&&(o=i.call(t,o,o)),s.items.push(Ui.createPair(o,null,r));return s}};It.tag="tag:yaml.org,2002:set";var xI={collection:"map",identify:n=>n instanceof Set,nodeClass:It,default:!1,tag:"tag:yaml.org,2002:set",createNode:(n,e,t)=>It.from(n,e,t),resolve(n,e){if(Wi.isMap(n)){if(n.hasAllNullValues(!0))return Object.assign(new It,n);e("Set items must all have null values")}else e("Expected a mapping for this tag");return n}};wa.YAMLSet=It;wa.set=xI});var Na=_(Gi=>{"use strict";var MI=Gt();function ba(n,e){let t=n[0],r=t==="-"||t==="+"?n.substring(1):n,i=o=>e?BigInt(o):Number(o),s=r.replace(/_/g,"").split(":").reduce((o,a)=>o*i(60)+i(a),i(0));return t==="-"?i(-1)*s:s}function T_(n){let{value:e}=n,t=o=>o;if(typeof e=="bigint")t=o=>BigInt(o);else if(isNaN(e)||!isFinite(e))return MI.stringifyNumber(n);let r="";e<0&&(r="-",e*=t(-1));let i=t(60),s=[e%i];return e<60?s.unshift(0):(e=(e-s[0])/i,s.unshift(e%i),e>=60&&(e=(e-s[0])/i,s.unshift(e))),r+s.map(o=>String(o).padStart(2,"0")).join(":").replace(/000000\d*$/,"")}var FI={identify:n=>typeof n=="bigint"||Number.isInteger(n),default:!0,tag:"tag:yaml.org,2002:int",format:"TIME",test:/^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,resolve:(n,e,{intAsBigInt:t})=>ba(n,t),stringify:T_},DI={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"TIME",test:/^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,resolve:n=>ba(n,!1),stringify:T_},L_={identify:n=>n instanceof Date,default:!0,tag:"tag:yaml.org,2002:timestamp",test:RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$"),resolve(n){let e=n.match(L_.test);if(!e)throw new Error("!!timestamp expects a date, starting with yyyy-mm-dd");let[,t,r,i,s,o,a]=e.map(Number),l=e[7]?Number((e[7]+"00").substr(1,3)):0,c=Date.UTC(t,r-1,i,s||0,o||0,a||0,l),u=e[8];if(u&&u!=="Z"){let f=ba(u,!1);Math.abs(f)<30&&(f*=60),c-=6e4*f}return new Date(c)},stringify:({value:n})=>n.toISOString().replace(/((T00:00)?:00)?\.000Z$/,"")};Gi.floatTime=DI;Gi.intTime=FI;Gi.timestamp=L_});var I_=_(A_=>{"use strict";var jI=Vt(),HI=ki(),BI=Wt(),UI=jn(),VI=ga(),S_=m_(),Oa=g_(),Ki=E_(),WI=La(),GI=ji(),KI=va(),Ra=Na(),YI=[jI.map,BI.seq,UI.string,HI.nullTag,S_.trueTag,S_.falseTag,Ki.intBin,Ki.intOct,Ki.int,Ki.intHex,Oa.floatNaN,Oa.floatExp,Oa.float,VI.binary,WI.omap,GI.pairs,KI.set,Ra.intTime,Ra.floatTime,Ra.timestamp];A_.schema=YI});var $_=_(ka=>{"use strict";var N_=Vt(),JI=ki(),O_=Wt(),XI=jn(),zI=ca(),Ca=fa(),Pa=da(),QI=r_(),ZI=o_(),R_=ga(),C_=La(),P_=ji(),w_=I_(),k_=va(),Yi=Na(),v_=new Map([["core",QI.schema],["failsafe",[N_.map,O_.seq,XI.string]],["json",ZI.schema],["yaml11",w_.schema],["yaml-1.1",w_.schema]]),b_={binary:R_.binary,bool:zI.boolTag,float:Ca.float,floatExp:Ca.floatExp,floatNaN:Ca.floatNaN,floatTime:Yi.floatTime,int:Pa.int,intHex:Pa.intHex,intOct:Pa.intOct,intTime:Yi.intTime,map:N_.map,null:JI.nullTag,omap:C_.omap,pairs:P_.pairs,seq:O_.seq,set:k_.set,timestamp:Yi.timestamp},ew={"tag:yaml.org,2002:binary":R_.binary,"tag:yaml.org,2002:omap":C_.omap,"tag:yaml.org,2002:pairs":P_.pairs,"tag:yaml.org,2002:set":k_.set,"tag:yaml.org,2002:timestamp":Yi.timestamp};function tw(n,e){let t=v_.get(e);if(!t)if(Array.isArray(n))t=[];else{let r=Array.from(v_.keys()).filter(i=>i!=="yaml11").map(i=>JSON.stringify(i)).join(", ");throw new Error(`Unknown schema "${e}"; use one of ${r} or define customTags array`)}if(Array.isArray(n))for(let r of n)t=t.concat(r);else typeof n=="function"&&(t=n(t.slice()));return t.map(r=>{if(typeof r!="string")return r;let i=b_[r];if(i)return i;let s=Object.keys(b_).map(o=>JSON.stringify(o)).join(", ");throw new Error(`Unknown custom tag "${r}"; use one of ${s}`)})}ka.coreKnownTags=ew;ka.getTags=tw});var xa=_(q_=>{"use strict";var $a=W(),nw=Vt(),rw=Wt(),iw=jn(),Ji=$_(),sw=(n,e)=>n.key<e.key?-1:n.key>e.key?1:0,qa=class n{constructor({compat:e,customTags:t,merge:r,resolveKnownTags:i,schema:s,sortMapEntries:o,toStringDefaults:a}){this.compat=Array.isArray(e)?Ji.getTags(e,"compat"):e?Ji.getTags(null,e):null,this.merge=!!r,this.name=typeof s=="string"&&s||"core",this.knownTags=i?Ji.coreKnownTags:{},this.tags=Ji.getTags(t,this.name),this.toStringOptions=a??null,Object.defineProperty(this,$a.MAP,{value:nw.map}),Object.defineProperty(this,$a.SCALAR,{value:iw.string}),Object.defineProperty(this,$a.SEQ,{value:rw.seq}),this.sortMapEntries=typeof o=="function"?o:o===!0?sw:null}clone(){let e=Object.create(n.prototype,Object.getOwnPropertyDescriptors(this));return e.tags=this.tags.slice(),e}};q_.Schema=qa});var M_=_(x_=>{"use strict";var ow=W(),Ma=xn(),Vn=Pn();function aw(n,e){let t=[],r=e.directives===!0;if(e.directives!==!1&&n.directives){let l=n.directives.toString(n);l?(t.push(l),r=!0):n.directives.docStart&&(r=!0)}r&&t.push("---");let i=Ma.createStringifyContext(n,e),{commentString:s}=i.options;if(n.commentBefore){t.length!==1&&t.unshift("");let l=s(n.commentBefore);t.unshift(Vn.indentComment(l,""))}let o=!1,a=null;if(n.contents){if(ow.isNode(n.contents)){if(n.contents.spaceBefore&&r&&t.push(""),n.contents.commentBefore){let u=s(n.contents.commentBefore);t.push(Vn.indentComment(u,""))}i.forceBlockIndent=!!n.comment,a=n.contents.comment}let l=a?void 0:()=>o=!0,c=Ma.stringify(n.contents,i,()=>a=null,l);a&&(c+=Vn.lineComment(c,"",s(a))),(c[0]==="|"||c[0]===">")&&t[t.length-1]==="---"?t[t.length-1]=`--- ${c}`:t.push(c)}else t.push(Ma.stringify(n.contents,i));if(n.directives?.docEnd)if(n.comment){let l=s(n.comment);l.includes(`
`)?(t.push("..."),t.push(Vn.indentComment(l,""))):t.push(`... ${l}`)}else t.push("...");else{let l=n.comment;l&&o&&(l=l.replace(/^\n+/,"")),l&&((!o||a)&&t[t.length-1]!==""&&t.push(""),t.push(Vn.indentComment(s(l),"")))}return t.join(`
`)+`
`}x_.stringifyDocument=aw});var Wn=_(F_=>{"use strict";var lw=On(),Kt=Cn(),xe=W(),cw=ft(),uw=ot(),fw=xa(),hw=M_(),Fa=mi(),dw=Uo(),pw=Rn(),Da=Bo(),ja=class n{constructor(e,t,r){this.commentBefore=null,this.comment=null,this.errors=[],this.warnings=[],Object.defineProperty(this,xe.NODE_TYPE,{value:xe.DOC});let i=null;typeof t=="function"||Array.isArray(t)?i=t:r===void 0&&t&&(r=t,t=void 0);let s=Object.assign({intAsBigInt:!1,keepSourceTokens:!1,logLevel:"warn",prettyErrors:!0,strict:!0,uniqueKeys:!0,version:"1.2"},r);this.options=s;let{version:o}=s;r?._directives?(this.directives=r._directives.atDocument(),this.directives.yaml.explicit&&(o=this.directives.yaml.version)):this.directives=new Da.Directives({version:o}),this.setSchema(o,r),this.contents=e===void 0?null:this.createNode(e,i,r)}clone(){let e=Object.create(n.prototype,{[xe.NODE_TYPE]:{value:xe.DOC}});return e.commentBefore=this.commentBefore,e.comment=this.comment,e.errors=this.errors.slice(),e.warnings=this.warnings.slice(),e.options=Object.assign({},this.options),this.directives&&(e.directives=this.directives.clone()),e.schema=this.schema.clone(),e.contents=xe.isNode(this.contents)?this.contents.clone(e.schema):this.contents,this.range&&(e.range=this.range.slice()),e}add(e){Yt(this.contents)&&this.contents.add(e)}addIn(e,t){Yt(this.contents)&&this.contents.addIn(e,t)}createAlias(e,t){if(!e.anchor){let r=Fa.anchorNames(this);e.anchor=!t||r.has(t)?Fa.findNewAnchor(t||"a",r):t}return new lw.Alias(e.anchor)}createNode(e,t,r){let i;if(typeof t=="function")e=t.call({"":e},"",e),i=t;else if(Array.isArray(t)){let m=w=>typeof w=="number"||w instanceof String||w instanceof Number,L=t.filter(m).map(String);L.length>0&&(t=t.concat(L)),i=t}else r===void 0&&t&&(r=t,t=void 0);let{aliasDuplicateObjects:s,anchorPrefix:o,flow:a,keepUndefined:l,onTagObj:c,tag:u}=r??{},{onAnchor:f,setAnchors:p,sourceObjects:h}=Fa.createNodeAnchors(this,o||"a"),y={aliasDuplicateObjects:s??!0,keepUndefined:l??!1,onAnchor:f,onTagObj:c,replacer:i,schema:this.schema,sourceObjects:h},g=pw.createNode(e,u,y);return a&&xe.isCollection(g)&&(g.flow=!0),p(),g}createPair(e,t,r={}){let i=this.createNode(e,null,r),s=this.createNode(t,null,r);return new cw.Pair(i,s)}delete(e){return Yt(this.contents)?this.contents.delete(e):!1}deleteIn(e){return Kt.isEmptyPath(e)?this.contents==null?!1:(this.contents=null,!0):Yt(this.contents)?this.contents.deleteIn(e):!1}get(e,t){return xe.isCollection(this.contents)?this.contents.get(e,t):void 0}getIn(e,t){return Kt.isEmptyPath(e)?!t&&xe.isScalar(this.contents)?this.contents.value:this.contents:xe.isCollection(this.contents)?this.contents.getIn(e,t):void 0}has(e){return xe.isCollection(this.contents)?this.contents.has(e):!1}hasIn(e){return Kt.isEmptyPath(e)?this.contents!==void 0:xe.isCollection(this.contents)?this.contents.hasIn(e):!1}set(e,t){this.contents==null?this.contents=Kt.collectionFromPath(this.schema,[e],t):Yt(this.contents)&&this.contents.set(e,t)}setIn(e,t){Kt.isEmptyPath(e)?this.contents=t:this.contents==null?this.contents=Kt.collectionFromPath(this.schema,Array.from(e),t):Yt(this.contents)&&this.contents.setIn(e,t)}setSchema(e,t={}){typeof e=="number"&&(e=String(e));let r;switch(e){case"1.1":this.directives?this.directives.yaml.version="1.1":this.directives=new Da.Directives({version:"1.1"}),r={merge:!0,resolveKnownTags:!1,schema:"yaml-1.1"};break;case"1.2":case"next":this.directives?this.directives.yaml.version=e:this.directives=new Da.Directives({version:e}),r={merge:!1,resolveKnownTags:!0,schema:"core"};break;case null:this.directives&&delete this.directives,r=null;break;default:{let i=JSON.stringify(e);throw new Error(`Expected '1.1', '1.2' or null as first argument, but found: ${i}`)}}if(t.schema instanceof Object)this.schema=t.schema;else if(r)this.schema=new fw.Schema(Object.assign(r,t));else throw new Error("With a null YAML version, the { schema: Schema } option is required")}toJS({json:e,jsonArg:t,mapAsMap:r,maxAliasCount:i,onAnchor:s,reviver:o}={}){let a={anchors:new Map,doc:this,keep:!e,mapAsMap:r===!0,mapKeyWarned:!1,maxAliasCount:typeof i=="number"?i:100},l=uw.toJS(this.contents,t??"",a);if(typeof s=="function")for(let{count:c,res:u}of a.anchors.values())s(u,c);return typeof o=="function"?dw.applyReviver(o,{"":l},"",l):l}toJSON(e,t){return this.toJS({json:!0,jsonArg:e,mapAsMap:!1,onAnchor:t})}toString(e={}){if(this.errors.length>0)throw new Error("Document with errors cannot be stringified");if("indent"in e&&(!Number.isInteger(e.indent)||Number(e.indent)<=0)){let t=JSON.stringify(e.indent);throw new Error(`"indent" option must be a positive integer, not ${t}`)}return hw.stringifyDocument(this,e)}};function Yt(n){if(xe.isCollection(n))return!0;throw new Error("Expected a YAML collection as document contents")}F_.Document=ja});var Yn=_(Kn=>{"use strict";var Gn=class extends Error{constructor(e,t,r,i){super(),this.name=e,this.code=r,this.message=i,this.pos=t}},Ha=class extends Gn{constructor(e,t,r){super("YAMLParseError",e,t,r)}},Ba=class extends Gn{constructor(e,t,r){super("YAMLWarning",e,t,r)}},_w=(n,e)=>t=>{if(t.pos[0]===-1)return;t.linePos=t.pos.map(a=>e.linePos(a));let{line:r,col:i}=t.linePos[0];t.message+=` at line ${r}, column ${i}`;let s=i-1,o=n.substring(e.lineStarts[r-1],e.lineStarts[r]).replace(/[\n\r]+$/,"");if(s>=60&&o.length>80){let a=Math.min(s-39,o.length-79);o="\u2026"+o.substring(a),s-=a-1}if(o.length>80&&(o=o.substring(0,79)+"\u2026"),r>1&&/^ *$/.test(o.substring(0,s))){let a=n.substring(e.lineStarts[r-2],e.lineStarts[r-1]);a.length>80&&(a=a.substring(0,79)+`\u2026
`),o=a+o}if(/[^ ]/.test(o)){let a=1,l=t.linePos[1];l&&l.line===r&&l.col>i&&(a=Math.max(1,Math.min(l.col-i,80-s)));let c=" ".repeat(s)+"^".repeat(a);t.message+=`:

${o}
${c}
`}};Kn.YAMLError=Gn;Kn.YAMLParseError=Ha;Kn.YAMLWarning=Ba;Kn.prettifyError=_w});var Jn=_(D_=>{"use strict";function mw(n,{flow:e,indicator:t,next:r,offset:i,onError:s,startOnNewline:o}){let a=!1,l=o,c=o,u="",f="",p=!1,h=!1,y=!1,g=null,m=null,L=null,w=null,b=null;for(let v of n)switch(y&&(v.type!=="space"&&v.type!=="newline"&&v.type!=="comma"&&s(v.offset,"MISSING_CHAR","Tags and anchors must be separated from the next token by white space"),y=!1),v.type){case"space":!e&&l&&t!=="doc-start"&&v.source[0]==="	"&&s(v,"TAB_AS_INDENT","Tabs are not allowed as indentation"),c=!0;break;case"comment":{c||s(v,"MISSING_CHAR","Comments must be separated from other tokens by white space characters");let V=v.source.substring(1)||" ";u?u+=f+V:u=V,f="",l=!1;break}case"newline":l?u?u+=v.source:a=!0:f+=v.source,l=!0,p=!0,(g||m)&&(h=!0),c=!0;break;case"anchor":g&&s(v,"MULTIPLE_ANCHORS","A node can have at most one anchor"),v.source.endsWith(":")&&s(v.offset+v.source.length-1,"BAD_ALIAS","Anchor ending in : is ambiguous",!0),g=v,b===null&&(b=v.offset),l=!1,c=!1,y=!0;break;case"tag":{m&&s(v,"MULTIPLE_TAGS","A node can have at most one tag"),m=v,b===null&&(b=v.offset),l=!1,c=!1,y=!0;break}case t:(g||m)&&s(v,"BAD_PROP_ORDER",`Anchors and tags must be after the ${v.source} indicator`),w&&s(v,"UNEXPECTED_TOKEN",`Unexpected ${v.source} in ${e??"collection"}`),w=v,l=!1,c=!1;break;case"comma":if(e){L&&s(v,"UNEXPECTED_TOKEN",`Unexpected , in ${e}`),L=v,l=!1,c=!1;break}default:s(v,"UNEXPECTED_TOKEN",`Unexpected ${v.type} token`),l=!1,c=!1}let $=n[n.length-1],M=$?$.offset+$.source.length:i;return y&&r&&r.type!=="space"&&r.type!=="newline"&&r.type!=="comma"&&(r.type!=="scalar"||r.source!=="")&&s(r.offset,"MISSING_CHAR","Tags and anchors must be separated from the next token by white space"),{comma:L,found:w,spaceBefore:a,comment:u,hasNewline:p,hasNewlineAfterProp:h,anchor:g,tag:m,end:M,start:b??M}}D_.resolveProps=mw});var Xi=_(j_=>{"use strict";function Ua(n){if(!n)return null;switch(n.type){case"alias":case"scalar":case"double-quoted-scalar":case"single-quoted-scalar":if(n.source.includes(`
`))return!0;if(n.end){for(let e of n.end)if(e.type==="newline")return!0}return!1;case"flow-collection":for(let e of n.items){for(let t of e.start)if(t.type==="newline")return!0;if(e.sep){for(let t of e.sep)if(t.type==="newline")return!0}if(Ua(e.key)||Ua(e.value))return!0}return!1;default:return!0}}j_.containsNewline=Ua});var Va=_(H_=>{"use strict";var gw=Xi();function yw(n,e,t){if(e?.type==="flow-collection"){let r=e.end[0];r.indent===n&&(r.source==="]"||r.source==="}")&&gw.containsNewline(e)&&t(r,"BAD_INDENT","Flow end indicator should be more indented than parent",!0)}}H_.flowIndentCheck=yw});var Wa=_(U_=>{"use strict";var B_=W();function Ew(n,e,t){let{uniqueKeys:r}=n.options;if(r===!1)return!1;let i=typeof r=="function"?r:(s,o)=>s===o||B_.isScalar(s)&&B_.isScalar(o)&&s.value===o.value&&!(s.value==="<<"&&n.schema.merge);return e.some(s=>i(s.key,t))}U_.mapIncludes=Ew});var J_=_(Y_=>{"use strict";var V_=ft(),Tw=dt(),W_=Jn(),Lw=Xi(),G_=Va(),Sw=Wa(),K_="All mapping items must start at the same column";function Aw({composeNode:n,composeEmptyNode:e},t,r,i,s){let o=s?.nodeClass??Tw.YAMLMap,a=new o(t.schema);t.atRoot&&(t.atRoot=!1);let l=r.offset,c=null;for(let u of r.items){let{start:f,key:p,sep:h,value:y}=u,g=W_.resolveProps(f,{indicator:"explicit-key-ind",next:p??h?.[0],offset:l,onError:i,startOnNewline:!0}),m=!g.found;if(m){if(p&&(p.type==="block-seq"?i(l,"BLOCK_AS_IMPLICIT_KEY","A block sequence may not be used as an implicit map key"):"indent"in p&&p.indent!==r.indent&&i(l,"BAD_INDENT",K_)),!g.anchor&&!g.tag&&!h){c=g.end,g.comment&&(a.comment?a.comment+=`
`+g.comment:a.comment=g.comment);continue}(g.hasNewlineAfterProp||Lw.containsNewline(p))&&i(p??f[f.length-1],"MULTILINE_IMPLICIT_KEY","Implicit keys need to be on a single line")}else g.found?.indent!==r.indent&&i(l,"BAD_INDENT",K_);let L=g.end,w=p?n(t,p,g,i):e(t,L,f,null,g,i);t.schema.compat&&G_.flowIndentCheck(r.indent,p,i),Sw.mapIncludes(t,a.items,w)&&i(L,"DUPLICATE_KEY","Map keys must be unique");let b=W_.resolveProps(h??[],{indicator:"map-value-ind",next:y,offset:w.range[2],onError:i,startOnNewline:!p||p.type==="block-scalar"});if(l=b.end,b.found){m&&(y?.type==="block-map"&&!b.hasNewline&&i(l,"BLOCK_AS_IMPLICIT_KEY","Nested mappings are not allowed in compact mappings"),t.options.strict&&g.start<b.found.offset-1024&&i(w.range,"KEY_OVER_1024_CHARS","The : indicator must be at most 1024 chars after the start of an implicit block mapping key"));let $=y?n(t,y,b,i):e(t,l,h,null,b,i);t.schema.compat&&G_.flowIndentCheck(r.indent,y,i),l=$.range[2];let M=new V_.Pair(w,$);t.options.keepSourceTokens&&(M.srcToken=u),a.items.push(M)}else{m&&i(w.range,"MISSING_CHAR","Implicit map keys need to be followed by map values"),b.comment&&(w.comment?w.comment+=`
`+b.comment:w.comment=b.comment);let $=new V_.Pair(w);t.options.keepSourceTokens&&($.srcToken=u),a.items.push($)}}return c&&c<l&&i(c,"IMPOSSIBLE","Map comment with trailing content"),a.range=[r.offset,l,c??l],a}Y_.resolveBlockMap=Aw});var z_=_(X_=>{"use strict";var Iw=pt(),ww=Jn(),vw=Va();function bw({composeNode:n,composeEmptyNode:e},t,r,i,s){let o=s?.nodeClass??Iw.YAMLSeq,a=new o(t.schema);t.atRoot&&(t.atRoot=!1);let l=r.offset,c=null;for(let{start:u,value:f}of r.items){let p=ww.resolveProps(u,{indicator:"seq-item-ind",next:f,offset:l,onError:i,startOnNewline:!0});if(!p.found)if(p.anchor||p.tag||f)f&&f.type==="block-seq"?i(p.end,"BAD_INDENT","All sequence items must start at the same column"):i(l,"MISSING_CHAR","Sequence item without - indicator");else{c=p.end,p.comment&&(a.comment=p.comment);continue}let h=f?n(t,f,p,i):e(t,p.end,u,null,p,i);t.schema.compat&&vw.flowIndentCheck(r.indent,f,i),l=h.range[2],a.items.push(h)}return a.range=[r.offset,l,c??l],a}X_.resolveBlockSeq=bw});var Jt=_(Q_=>{"use strict";function Nw(n,e,t,r){let i="";if(n){let s=!1,o="";for(let a of n){let{source:l,type:c}=a;switch(c){case"space":s=!0;break;case"comment":{t&&!s&&r(a,"MISSING_CHAR","Comments must be separated from other tokens by white space characters");let u=l.substring(1)||" ";i?i+=o+u:i=u,o="";break}case"newline":i&&(o+=l),s=!0;break;default:r(a,"UNEXPECTED_TOKEN",`Unexpected ${c} at node end`)}e+=l.length}}return{comment:i,offset:e}}Q_.resolveEnd=Nw});var nm=_(tm=>{"use strict";var Ow=W(),Rw=ft(),Z_=dt(),Cw=pt(),Pw=Jt(),em=Jn(),kw=Xi(),$w=Wa(),Ga="Block collections are not allowed within flow collections",Ka=n=>n&&(n.type==="block-map"||n.type==="block-seq");function qw({composeNode:n,composeEmptyNode:e},t,r,i,s){let o=r.start.source==="{",a=o?"flow map":"flow sequence",l=s?.nodeClass??(o?Z_.YAMLMap:Cw.YAMLSeq),c=new l(t.schema);c.flow=!0;let u=t.atRoot;u&&(t.atRoot=!1);let f=r.offset+r.start.source.length;for(let m=0;m<r.items.length;++m){let L=r.items[m],{start:w,key:b,sep:$,value:M}=L,v=em.resolveProps(w,{flow:a,indicator:"explicit-key-ind",next:b??$?.[0],offset:f,onError:i,startOnNewline:!1});if(!v.found){if(!v.anchor&&!v.tag&&!$&&!M){m===0&&v.comma?i(v.comma,"UNEXPECTED_TOKEN",`Unexpected , in ${a}`):m<r.items.length-1&&i(v.start,"UNEXPECTED_TOKEN",`Unexpected empty item in ${a}`),v.comment&&(c.comment?c.comment+=`
`+v.comment:c.comment=v.comment),f=v.end;continue}!o&&t.options.strict&&kw.containsNewline(b)&&i(b,"MULTILINE_IMPLICIT_KEY","Implicit keys of flow sequence pairs need to be on a single line")}if(m===0)v.comma&&i(v.comma,"UNEXPECTED_TOKEN",`Unexpected , in ${a}`);else if(v.comma||i(v.start,"MISSING_CHAR",`Missing , between ${a} items`),v.comment){let V="";e:for(let G of w)switch(G.type){case"comma":case"space":break;case"comment":V=G.source.substring(1);break e;default:break e}if(V){let G=c.items[c.items.length-1];Ow.isPair(G)&&(G=G.value??G.key),G.comment?G.comment+=`
`+V:G.comment=V,v.comment=v.comment.substring(V.length+1)}}if(!o&&!$&&!v.found){let V=M?n(t,M,v,i):e(t,v.end,$,null,v,i);c.items.push(V),f=V.range[2],Ka(M)&&i(V.range,"BLOCK_IN_FLOW",Ga)}else{let V=v.end,G=b?n(t,b,v,i):e(t,V,w,null,v,i);Ka(b)&&i(G.range,"BLOCK_IN_FLOW",Ga);let k=em.resolveProps($??[],{flow:a,indicator:"map-value-ind",next:M,offset:G.range[2],onError:i,startOnNewline:!1});if(k.found){if(!o&&!v.found&&t.options.strict){if($)for(let D of $){if(D===k.found)break;if(D.type==="newline"){i(D,"MULTILINE_IMPLICIT_KEY","Implicit keys of flow sequence pairs need to be on a single line");break}}v.start<k.found.offset-1024&&i(k.found,"KEY_OVER_1024_CHARS","The : indicator must be at most 1024 chars after the start of an implicit flow sequence key")}}else M&&("source"in M&&M.source&&M.source[0]===":"?i(M,"MISSING_CHAR",`Missing space after : in ${a}`):i(k.start,"MISSING_CHAR",`Missing , or : between ${a} items`));let j=M?n(t,M,k,i):k.found?e(t,k.end,$,null,k,i):null;j?Ka(M)&&i(j.range,"BLOCK_IN_FLOW",Ga):k.comment&&(G.comment?G.comment+=`
`+k.comment:G.comment=k.comment);let F=new Rw.Pair(G,j);if(t.options.keepSourceTokens&&(F.srcToken=L),o){let D=c;$w.mapIncludes(t,D.items,G)&&i(V,"DUPLICATE_KEY","Map keys must be unique"),D.items.push(F)}else{let D=new Z_.YAMLMap(t.schema);D.flow=!0,D.items.push(F),c.items.push(D)}f=j?j.range[2]:k.end}}let p=o?"}":"]",[h,...y]=r.end,g=f;if(h&&h.source===p)g=h.offset+h.source.length;else{let m=a[0].toUpperCase()+a.substring(1),L=u?`${m} must end with a ${p}`:`${m} in block collection must be sufficiently indented and end with a ${p}`;i(f,u?"MISSING_CHAR":"BAD_INDENT",L),h&&h.source.length!==1&&y.unshift(h)}if(y.length>0){let m=Pw.resolveEnd(y,g,t.options.strict,i);m.comment&&(c.comment?c.comment+=`
`+m.comment:c.comment=m.comment),c.range=[r.offset,g,m.offset]}else c.range=[r.offset,g,g];return c}tm.resolveFlowCollection=qw});var im=_(rm=>{"use strict";var xw=W(),Mw=ce(),Fw=dt(),Dw=pt(),jw=J_(),Hw=z_(),Bw=nm();function Ya(n,e,t,r,i,s){let o=t.type==="block-map"?jw.resolveBlockMap(n,e,t,r,s):t.type==="block-seq"?Hw.resolveBlockSeq(n,e,t,r,s):Bw.resolveFlowCollection(n,e,t,r,s),a=o.constructor;return i==="!"||i===a.tagName?(o.tag=a.tagName,o):(i&&(o.tag=i),o)}function Uw(n,e,t,r,i){let s=r?e.directives.tagName(r.source,f=>i(r,"TAG_RESOLVE_FAILED",f)):null,o=t.type==="block-map"?"map":t.type==="block-seq"?"seq":t.start.source==="{"?"map":"seq";if(!r||!s||s==="!"||s===Fw.YAMLMap.tagName&&o==="map"||s===Dw.YAMLSeq.tagName&&o==="seq"||!o)return Ya(n,e,t,i,s);let a=e.schema.tags.find(f=>f.tag===s&&f.collection===o);if(!a){let f=e.schema.knownTags[s];if(f&&f.collection===o)e.schema.tags.push(Object.assign({},f,{default:!1})),a=f;else return f?.collection?i(r,"BAD_COLLECTION_TYPE",`${f.tag} used for ${o} collection, but expects ${f.collection}`,!0):i(r,"TAG_RESOLVE_FAILED",`Unresolved tag: ${s}`,!0),Ya(n,e,t,i,s)}let l=Ya(n,e,t,i,s,a),c=a.resolve?.(l,f=>i(r,"TAG_RESOLVE_FAILED",f),e.options)??l,u=xw.isNode(c)?c:new Mw.Scalar(c);return u.range=l.range,u.tag=s,a?.format&&(u.format=a.format),u}rm.composeCollection=Uw});var Xa=_(sm=>{"use strict";var Ja=ce();function Vw(n,e,t){let r=n.offset,i=Ww(n,e,t);if(!i)return{value:"",type:null,comment:"",range:[r,r,r]};let s=i.mode===">"?Ja.Scalar.BLOCK_FOLDED:Ja.Scalar.BLOCK_LITERAL,o=n.source?Gw(n.source):[],a=o.length;for(let g=o.length-1;g>=0;--g){let m=o[g][1];if(m===""||m==="\r")a=g;else break}if(a===0){let g=i.chomp==="+"&&o.length>0?`
`.repeat(Math.max(1,o.length-1)):"",m=r+i.length;return n.source&&(m+=n.source.length),{value:g,type:s,comment:i.comment,range:[r,m,m]}}let l=n.indent+i.indent,c=n.offset+i.length,u=0;for(let g=0;g<a;++g){let[m,L]=o[g];if(L===""||L==="\r")i.indent===0&&m.length>l&&(l=m.length);else{if(m.length<l){let w="Block scalars with more-indented leading empty lines must use an explicit indentation indicator";t(c+m.length,"MISSING_CHAR",w)}i.indent===0&&(l=m.length),u=g;break}c+=m.length+L.length+1}for(let g=o.length-1;g>=a;--g)o[g][0].length>l&&(a=g+1);let f="",p="",h=!1;for(let g=0;g<u;++g)f+=o[g][0].slice(l)+`
`;for(let g=u;g<a;++g){let[m,L]=o[g];c+=m.length+L.length+1;let w=L[L.length-1]==="\r";if(w&&(L=L.slice(0,-1)),L&&m.length<l){let $=`Block scalar lines must not be less indented than their ${i.indent?"explicit indentation indicator":"first line"}`;t(c-L.length-(w?2:1),"BAD_INDENT",$),m=""}s===Ja.Scalar.BLOCK_LITERAL?(f+=p+m.slice(l)+L,p=`
`):m.length>l||L[0]==="	"?(p===" "?p=`
`:!h&&p===`
`&&(p=`

`),f+=p+m.slice(l)+L,p=`
`,h=!0):L===""?p===`
`?f+=`
`:p=`
`:(f+=p+L,p=" ",h=!1)}switch(i.chomp){case"-":break;case"+":for(let g=a;g<o.length;++g)f+=`
`+o[g][0].slice(l);f[f.length-1]!==`
`&&(f+=`
`);break;default:f+=`
`}let y=r+i.length+n.source.length;return{value:f,type:s,comment:i.comment,range:[r,y,y]}}function Ww({offset:n,props:e},t,r){if(e[0].type!=="block-scalar-header")return r(e[0],"IMPOSSIBLE","Block scalar header not found"),null;let{source:i}=e[0],s=i[0],o=0,a="",l=-1;for(let p=1;p<i.length;++p){let h=i[p];if(!a&&(h==="-"||h==="+"))a=h;else{let y=Number(h);!o&&y?o=y:l===-1&&(l=n+p)}}l!==-1&&r(l,"UNEXPECTED_TOKEN",`Block scalar header includes extra characters: ${i}`);let c=!1,u="",f=i.length;for(let p=1;p<e.length;++p){let h=e[p];switch(h.type){case"space":c=!0;case"newline":f+=h.source.length;break;case"comment":t&&!c&&r(h,"MISSING_CHAR","Comments must be separated from other tokens by white space characters"),f+=h.source.length,u=h.source.substring(1);break;case"error":r(h,"UNEXPECTED_TOKEN",h.message),f+=h.source.length;break;default:{let y=`Unexpected token in block scalar header: ${h.type}`;r(h,"UNEXPECTED_TOKEN",y);let g=h.source;g&&typeof g=="string"&&(f+=g.length)}}}return{mode:s,indent:o,chomp:a,comment:u,length:f}}function Gw(n){let e=n.split(/\n( *)/),t=e[0],r=t.match(/^( *)/),s=[r?.[1]?[r[1],t.slice(r[1].length)]:["",t]];for(let o=1;o<e.length;o+=2)s.push([e[o],e[o+1]]);return s}sm.resolveBlockScalar=Vw});var Qa=_(am=>{"use strict";var za=ce(),Kw=Jt();function Yw(n,e,t){let{offset:r,type:i,source:s,end:o}=n,a,l,c=(p,h,y)=>t(r+p,h,y);switch(i){case"scalar":a=za.Scalar.PLAIN,l=Jw(s,c);break;case"single-quoted-scalar":a=za.Scalar.QUOTE_SINGLE,l=Xw(s,c);break;case"double-quoted-scalar":a=za.Scalar.QUOTE_DOUBLE,l=zw(s,c);break;default:return t(n,"UNEXPECTED_TOKEN",`Expected a flow scalar value, but found: ${i}`),{value:"",type:null,comment:"",range:[r,r+s.length,r+s.length]}}let u=r+s.length,f=Kw.resolveEnd(o,u,e,t);return{value:l,type:a,comment:f.comment,range:[r,u,f.offset]}}function Jw(n,e){let t="";switch(n[0]){case"	":t="a tab character";break;case",":t="flow indicator character ,";break;case"%":t="directive indicator character %";break;case"|":case">":{t=`block scalar indicator ${n[0]}`;break}case"@":case"`":{t=`reserved character ${n[0]}`;break}}return t&&e(0,"BAD_SCALAR_START",`Plain value cannot start with ${t}`),om(n)}function Xw(n,e){return(n[n.length-1]!=="'"||n.length===1)&&e(n.length,"MISSING_CHAR","Missing closing 'quote"),om(n.slice(1,-1)).replace(/''/g,"'")}function om(n){let e,t;try{e=new RegExp(`(.*?)(?<![ 	])[ 	]*\r?
`,"sy"),t=new RegExp(`[ 	]*(.*?)(?:(?<![ 	])[ 	]*)?\r?
`,"sy")}catch{e=/(.*?)[ \t]*\r?\n/sy,t=/[ \t]*(.*?)[ \t]*\r?\n/sy}let r=e.exec(n);if(!r)return n;let i=r[1],s=" ",o=e.lastIndex;for(t.lastIndex=o;r=t.exec(n);)r[1]===""?s===`
`?i+=s:s=`
`:(i+=s+r[1],s=" "),o=t.lastIndex;let a=/[ \t]*(.*)/sy;return a.lastIndex=o,r=a.exec(n),i+s+(r?.[1]??"")}function zw(n,e){let t="";for(let r=1;r<n.length-1;++r){let i=n[r];if(!(i==="\r"&&n[r+1]===`
`))if(i===`
`){let{fold:s,offset:o}=Qw(n,r);t+=s,r=o}else if(i==="\\"){let s=n[++r],o=Zw[s];if(o)t+=o;else if(s===`
`)for(s=n[r+1];s===" "||s==="	";)s=n[++r+1];else if(s==="\r"&&n[r+1]===`
`)for(s=n[++r+1];s===" "||s==="	";)s=n[++r+1];else if(s==="x"||s==="u"||s==="U"){let a={x:2,u:4,U:8}[s];t+=ev(n,r+1,a,e),r+=a}else{let a=n.substr(r-1,2);e(r-1,"BAD_DQ_ESCAPE",`Invalid escape sequence ${a}`),t+=a}}else if(i===" "||i==="	"){let s=r,o=n[r+1];for(;o===" "||o==="	";)o=n[++r+1];o!==`
`&&!(o==="\r"&&n[r+2]===`
`)&&(t+=r>s?n.slice(s,r+1):i)}else t+=i}return(n[n.length-1]!=='"'||n.length===1)&&e(n.length,"MISSING_CHAR",'Missing closing "quote'),t}function Qw(n,e){let t="",r=n[e+1];for(;(r===" "||r==="	"||r===`
`||r==="\r")&&!(r==="\r"&&n[e+2]!==`
`);)r===`
`&&(t+=`
`),e+=1,r=n[e+1];return t||(t=" "),{fold:t,offset:e}}var Zw={0:"\0",a:"\x07",b:"\b",e:"\x1B",f:"\f",n:`
`,r:"\r",t:"	",v:"\v",N:"\x85",_:"\xA0",L:"\u2028",P:"\u2029"," ":" ",'"':'"',"/":"/","\\":"\\","	":"	"};function ev(n,e,t,r){let i=n.substr(e,t),o=i.length===t&&/^[0-9a-fA-F]+$/.test(i)?parseInt(i,16):NaN;if(isNaN(o)){let a=n.substr(e-2,t+2);return r(e-2,"BAD_DQ_ESCAPE",`Invalid escape sequence ${a}`),a}return String.fromCodePoint(o)}am.resolveFlowScalar=Yw});var um=_(cm=>{"use strict";var Xt=W(),lm=ce(),tv=Xa(),nv=Qa();function rv(n,e,t,r){let{value:i,type:s,comment:o,range:a}=e.type==="block-scalar"?tv.resolveBlockScalar(e,n.options.strict,r):nv.resolveFlowScalar(e,n.options.strict,r),l=t?n.directives.tagName(t.source,f=>r(t,"TAG_RESOLVE_FAILED",f)):null,c=t&&l?iv(n.schema,i,l,t,r):e.type==="scalar"?sv(n,i,e,r):n.schema[Xt.SCALAR],u;try{let f=c.resolve(i,p=>r(t??e,"TAG_RESOLVE_FAILED",p),n.options);u=Xt.isScalar(f)?f:new lm.Scalar(f)}catch(f){let p=f instanceof Error?f.message:String(f);r(t??e,"TAG_RESOLVE_FAILED",p),u=new lm.Scalar(i)}return u.range=a,u.source=i,s&&(u.type=s),l&&(u.tag=l),c.format&&(u.format=c.format),o&&(u.comment=o),u}function iv(n,e,t,r,i){if(t==="!")return n[Xt.SCALAR];let s=[];for(let a of n.tags)if(!a.collection&&a.tag===t)if(a.default&&a.test)s.push(a);else return a;for(let a of s)if(a.test?.test(e))return a;let o=n.knownTags[t];return o&&!o.collection?(n.tags.push(Object.assign({},o,{default:!1,test:void 0})),o):(i(r,"TAG_RESOLVE_FAILED",`Unresolved tag: ${t}`,t!=="tag:yaml.org,2002:str"),n[Xt.SCALAR])}function sv({directives:n,schema:e},t,r,i){let s=e.tags.find(o=>o.default&&o.test?.test(t))||e[Xt.SCALAR];if(e.compat){let o=e.compat.find(a=>a.default&&a.test?.test(t))??e[Xt.SCALAR];if(s.tag!==o.tag){let a=n.tagString(s.tag),l=n.tagString(o.tag),c=`Value may be parsed as either ${a} or ${l}`;i(r,"TAG_RESOLVE_FAILED",c,!0)}}return s}cm.composeScalar=rv});var hm=_(fm=>{"use strict";function ov(n,e,t){if(e){t===null&&(t=e.length);for(let r=t-1;r>=0;--r){let i=e[r];switch(i.type){case"space":case"comment":case"newline":n-=i.source.length;continue}for(i=e[++r];i?.type==="space";)n+=i.source.length,i=e[++r];break}}return n}fm.emptyScalarPosition=ov});var _m=_(el=>{"use strict";var av=On(),lv=im(),dm=um(),cv=Jt(),uv=hm(),fv={composeNode:pm,composeEmptyNode:Za};function pm(n,e,t,r){let{spaceBefore:i,comment:s,anchor:o,tag:a}=t,l,c=!0;switch(e.type){case"alias":l=hv(n,e,r),(o||a)&&r(e,"ALIAS_PROPS","An alias node must not specify any properties");break;case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":case"block-scalar":l=dm.composeScalar(n,e,a,r),o&&(l.anchor=o.source.substring(1));break;case"block-map":case"block-seq":case"flow-collection":l=lv.composeCollection(fv,n,e,a,r),o&&(l.anchor=o.source.substring(1));break;default:{let u=e.type==="error"?e.message:`Unsupported token (type: ${e.type})`;r(e,"UNEXPECTED_TOKEN",u),l=Za(n,e.offset,void 0,null,t,r),c=!1}}return o&&l.anchor===""&&r(o,"BAD_ALIAS","Anchor cannot be an empty string"),i&&(l.spaceBefore=!0),s&&(e.type==="scalar"&&e.source===""?l.comment=s:l.commentBefore=s),n.options.keepSourceTokens&&c&&(l.srcToken=e),l}function Za(n,e,t,r,{spaceBefore:i,comment:s,anchor:o,tag:a,end:l},c){let u={type:"scalar",offset:uv.emptyScalarPosition(e,t,r),indent:-1,source:""},f=dm.composeScalar(n,u,a,c);return o&&(f.anchor=o.source.substring(1),f.anchor===""&&c(o,"BAD_ALIAS","Anchor cannot be an empty string")),i&&(f.spaceBefore=!0),s&&(f.comment=s,f.range[2]=l),f}function hv({options:n},{offset:e,source:t,end:r},i){let s=new av.Alias(t.substring(1));s.source===""&&i(e,"BAD_ALIAS","Alias cannot be an empty string"),s.source.endsWith(":")&&i(e+t.length-1,"BAD_ALIAS","Alias ending in : is ambiguous",!0);let o=e+t.length,a=cv.resolveEnd(r,o,n.strict,i);return s.range=[e,o,a.offset],a.comment&&(s.comment=a.comment),s}el.composeEmptyNode=Za;el.composeNode=pm});var ym=_(gm=>{"use strict";var dv=Wn(),mm=_m(),pv=Jt(),_v=Jn();function mv(n,e,{offset:t,start:r,value:i,end:s},o){let a=Object.assign({_directives:e},n),l=new dv.Document(void 0,a),c={atRoot:!0,directives:l.directives,options:l.options,schema:l.schema},u=_v.resolveProps(r,{indicator:"doc-start",next:i??s?.[0],offset:t,onError:o,startOnNewline:!0});u.found&&(l.directives.docStart=!0,i&&(i.type==="block-map"||i.type==="block-seq")&&!u.hasNewline&&o(u.end,"MISSING_CHAR","Block collection cannot start on same line with directives-end marker")),l.contents=i?mm.composeNode(c,i,u,o):mm.composeEmptyNode(c,u.end,r,null,u,o);let f=l.contents.range[2],p=pv.resolveEnd(s,f,!1,o);return p.comment&&(l.comment=p.comment),l.range=[t,f,p.offset],l}gm.composeDoc=mv});var nl=_(Lm=>{"use strict";var gv=Bo(),yv=Wn(),Xn=Yn(),Em=W(),Ev=ym(),Tv=Jt();function zn(n){if(typeof n=="number")return[n,n+1];if(Array.isArray(n))return n.length===2?n:[n[0],n[1]];let{offset:e,source:t}=n;return[e,e+(typeof t=="string"?t.length:1)]}function Tm(n){let e="",t=!1,r=!1;for(let i=0;i<n.length;++i){let s=n[i];switch(s[0]){case"#":e+=(e===""?"":r?`

`:`
`)+(s.substring(1)||" "),t=!0,r=!1;break;case"%":n[i+1]?.[0]!=="#"&&(i+=1),t=!1;break;default:t||(r=!0),t=!1}}return{comment:e,afterEmptyLine:r}}var tl=class{constructor(e={}){this.doc=null,this.atDirectives=!1,this.prelude=[],this.errors=[],this.warnings=[],this.onError=(t,r,i,s)=>{let o=zn(t);s?this.warnings.push(new Xn.YAMLWarning(o,r,i)):this.errors.push(new Xn.YAMLParseError(o,r,i))},this.directives=new gv.Directives({version:e.version||"1.2"}),this.options=e}decorate(e,t){let{comment:r,afterEmptyLine:i}=Tm(this.prelude);if(r){let s=e.contents;if(t)e.comment=e.comment?`${e.comment}
${r}`:r;else if(i||e.directives.docStart||!s)e.commentBefore=r;else if(Em.isCollection(s)&&!s.flow&&s.items.length>0){let o=s.items[0];Em.isPair(o)&&(o=o.key);let a=o.commentBefore;o.commentBefore=a?`${r}
${a}`:r}else{let o=s.commentBefore;s.commentBefore=o?`${r}
${o}`:r}}t?(Array.prototype.push.apply(e.errors,this.errors),Array.prototype.push.apply(e.warnings,this.warnings)):(e.errors=this.errors,e.warnings=this.warnings),this.prelude=[],this.errors=[],this.warnings=[]}streamInfo(){return{comment:Tm(this.prelude).comment,directives:this.directives,errors:this.errors,warnings:this.warnings}}*compose(e,t=!1,r=-1){for(let i of e)yield*this.next(i);yield*this.end(t,r)}*next(e){switch(process.env.LOG_STREAM&&console.dir(e,{depth:null}),e.type){case"directive":this.directives.add(e.source,(t,r,i)=>{let s=zn(e);s[0]+=t,this.onError(s,"BAD_DIRECTIVE",r,i)}),this.prelude.push(e.source),this.atDirectives=!0;break;case"document":{let t=Ev.composeDoc(this.options,this.directives,e,this.onError);this.atDirectives&&!t.directives.docStart&&this.onError(e,"MISSING_CHAR","Missing directives-end/doc-start indicator line"),this.decorate(t,!1),this.doc&&(yield this.doc),this.doc=t,this.atDirectives=!1;break}case"byte-order-mark":case"space":break;case"comment":case"newline":this.prelude.push(e.source);break;case"error":{let t=e.source?`${e.message}: ${JSON.stringify(e.source)}`:e.message,r=new Xn.YAMLParseError(zn(e),"UNEXPECTED_TOKEN",t);this.atDirectives||!this.doc?this.errors.push(r):this.doc.errors.push(r);break}case"doc-end":{if(!this.doc){let r="Unexpected doc-end without preceding document";this.errors.push(new Xn.YAMLParseError(zn(e),"UNEXPECTED_TOKEN",r));break}this.doc.directives.docEnd=!0;let t=Tv.resolveEnd(e.end,e.offset+e.source.length,this.doc.options.strict,this.onError);if(this.decorate(this.doc,!0),t.comment){let r=this.doc.comment;this.doc.comment=r?`${r}
${t.comment}`:t.comment}this.doc.range[2]=t.offset;break}default:this.errors.push(new Xn.YAMLParseError(zn(e),"UNEXPECTED_TOKEN",`Unsupported token ${e.type}`))}}*end(e=!1,t=-1){if(this.doc)this.decorate(this.doc,!0),yield this.doc,this.doc=null;else if(e){let r=Object.assign({_directives:this.directives},this.options),i=new yv.Document(void 0,r);this.atDirectives&&this.onError(t,"MISSING_CHAR","Missing directives-end indicator line"),i.range=[0,t,t],this.decorate(i,!1),yield i}}};Lm.Composer=tl});var Im=_(zi=>{"use strict";var Lv=Xa(),Sv=Qa(),Av=Yn(),Sm=qn();function Iv(n,e=!0,t){if(n){let r=(i,s,o)=>{let a=typeof i=="number"?i:Array.isArray(i)?i[0]:i.offset;if(t)t(a,s,o);else throw new Av.YAMLParseError([a,a+1],s,o)};switch(n.type){case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return Sv.resolveFlowScalar(n,e,r);case"block-scalar":return Lv.resolveBlockScalar(n,e,r)}}return null}function wv(n,e){let{implicitKey:t=!1,indent:r,inFlow:i=!1,offset:s=-1,type:o="PLAIN"}=e,a=Sm.stringifyString({type:o,value:n},{implicitKey:t,indent:r>0?" ".repeat(r):"",inFlow:i,options:{blockQuote:!0,lineWidth:-1}}),l=e.end??[{type:"newline",offset:-1,indent:r,source:`
`}];switch(a[0]){case"|":case">":{let c=a.indexOf(`
`),u=a.substring(0,c),f=a.substring(c+1)+`
`,p=[{type:"block-scalar-header",offset:s,indent:r,source:u}];return Am(p,l)||p.push({type:"newline",offset:-1,indent:r,source:`
`}),{type:"block-scalar",offset:s,indent:r,props:p,source:f}}case'"':return{type:"double-quoted-scalar",offset:s,indent:r,source:a,end:l};case"'":return{type:"single-quoted-scalar",offset:s,indent:r,source:a,end:l};default:return{type:"scalar",offset:s,indent:r,source:a,end:l}}}function vv(n,e,t={}){let{afterKey:r=!1,implicitKey:i=!1,inFlow:s=!1,type:o}=t,a="indent"in n?n.indent:null;if(r&&typeof a=="number"&&(a+=2),!o)switch(n.type){case"single-quoted-scalar":o="QUOTE_SINGLE";break;case"double-quoted-scalar":o="QUOTE_DOUBLE";break;case"block-scalar":{let c=n.props[0];if(c.type!=="block-scalar-header")throw new Error("Invalid block scalar header");o=c.source[0]===">"?"BLOCK_FOLDED":"BLOCK_LITERAL";break}default:o="PLAIN"}let l=Sm.stringifyString({type:o,value:e},{implicitKey:i||a===null,indent:a!==null&&a>0?" ".repeat(a):"",inFlow:s,options:{blockQuote:!0,lineWidth:-1}});switch(l[0]){case"|":case">":bv(n,l);break;case'"':rl(n,l,"double-quoted-scalar");break;case"'":rl(n,l,"single-quoted-scalar");break;default:rl(n,l,"scalar")}}function bv(n,e){let t=e.indexOf(`
`),r=e.substring(0,t),i=e.substring(t+1)+`
`;if(n.type==="block-scalar"){let s=n.props[0];if(s.type!=="block-scalar-header")throw new Error("Invalid block scalar header");s.source=r,n.source=i}else{let{offset:s}=n,o="indent"in n?n.indent:-1,a=[{type:"block-scalar-header",offset:s,indent:o,source:r}];Am(a,"end"in n?n.end:void 0)||a.push({type:"newline",offset:-1,indent:o,source:`
`});for(let l of Object.keys(n))l!=="type"&&l!=="offset"&&delete n[l];Object.assign(n,{type:"block-scalar",indent:o,props:a,source:i})}}function Am(n,e){if(e)for(let t of e)switch(t.type){case"space":case"comment":n.push(t);break;case"newline":return n.push(t),!0}return!1}function rl(n,e,t){switch(n.type){case"scalar":case"double-quoted-scalar":case"single-quoted-scalar":n.type=t,n.source=e;break;case"block-scalar":{let r=n.props.slice(1),i=e.length;n.props[0].type==="block-scalar-header"&&(i-=n.props[0].source.length);for(let s of r)s.offset+=i;delete n.props,Object.assign(n,{type:t,source:e,end:r});break}case"block-map":case"block-seq":{let i={type:"newline",offset:n.offset+e.length,indent:n.indent,source:`
`};delete n.items,Object.assign(n,{type:t,source:e,end:[i]});break}default:{let r="indent"in n?n.indent:-1,i="end"in n&&Array.isArray(n.end)?n.end.filter(s=>s.type==="space"||s.type==="comment"||s.type==="newline"):[];for(let s of Object.keys(n))s!=="type"&&s!=="offset"&&delete n[s];Object.assign(n,{type:t,indent:r,source:e,end:i})}}}zi.createScalarToken=wv;zi.resolveAsScalar=Iv;zi.setScalarValue=vv});var vm=_(wm=>{"use strict";var Nv=n=>"type"in n?Zi(n):Qi(n);function Zi(n){switch(n.type){case"block-scalar":{let e="";for(let t of n.props)e+=Zi(t);return e+n.source}case"block-map":case"block-seq":{let e="";for(let t of n.items)e+=Qi(t);return e}case"flow-collection":{let e=n.start.source;for(let t of n.items)e+=Qi(t);for(let t of n.end)e+=t.source;return e}case"document":{let e=Qi(n);if(n.end)for(let t of n.end)e+=t.source;return e}default:{let e=n.source;if("end"in n&&n.end)for(let t of n.end)e+=t.source;return e}}}function Qi({start:n,key:e,sep:t,value:r}){let i="";for(let s of n)i+=s.source;if(e&&(i+=Zi(e)),t)for(let s of t)i+=s.source;return r&&(i+=Zi(r)),i}wm.stringify=Nv});var Rm=_(Om=>{"use strict";var il=Symbol("break visit"),Ov=Symbol("skip children"),bm=Symbol("remove item");function wt(n,e){"type"in n&&n.type==="document"&&(n={start:n.start,value:n.value}),Nm(Object.freeze([]),n,e)}wt.BREAK=il;wt.SKIP=Ov;wt.REMOVE=bm;wt.itemAtPath=(n,e)=>{let t=n;for(let[r,i]of e){let s=t?.[r];if(s&&"items"in s)t=s.items[i];else return}return t};wt.parentCollection=(n,e)=>{let t=wt.itemAtPath(n,e.slice(0,-1)),r=e[e.length-1][0],i=t?.[r];if(i&&"items"in i)return i;throw new Error("Parent collection not found")};function Nm(n,e,t){let r=t(e,n);if(typeof r=="symbol")return r;for(let i of["key","value"]){let s=e[i];if(s&&"items"in s){for(let o=0;o<s.items.length;++o){let a=Nm(Object.freeze(n.concat([[i,o]])),s.items[o],t);if(typeof a=="number")o=a-1;else{if(a===il)return il;a===bm&&(s.items.splice(o,1),o-=1)}}typeof r=="function"&&i==="key"&&(r=r(e,n))}}return typeof r=="function"?r(e,n):r}Om.visit=wt});var es=_(Re=>{"use strict";var sl=Im(),Rv=vm(),Cv=Rm(),ol="\uFEFF",al="",ll="",cl="",Pv=n=>!!n&&"items"in n,kv=n=>!!n&&(n.type==="scalar"||n.type==="single-quoted-scalar"||n.type==="double-quoted-scalar"||n.type==="block-scalar");function $v(n){switch(n){case ol:return"<BOM>";case al:return"<DOC>";case ll:return"<FLOW_END>";case cl:return"<SCALAR>";default:return JSON.stringify(n)}}function qv(n){switch(n){case ol:return"byte-order-mark";case al:return"doc-mode";case ll:return"flow-error-end";case cl:return"scalar";case"---":return"doc-start";case"...":return"doc-end";case"":case`
`:case`\r
`:return"newline";case"-":return"seq-item-ind";case"?":return"explicit-key-ind";case":":return"map-value-ind";case"{":return"flow-map-start";case"}":return"flow-map-end";case"[":return"flow-seq-start";case"]":return"flow-seq-end";case",":return"comma"}switch(n[0]){case" ":case"	":return"space";case"#":return"comment";case"%":return"directive-line";case"*":return"alias";case"&":return"anchor";case"!":return"tag";case"'":return"single-quoted-scalar";case'"':return"double-quoted-scalar";case"|":case">":return"block-scalar-header"}return null}Re.createScalarToken=sl.createScalarToken;Re.resolveAsScalar=sl.resolveAsScalar;Re.setScalarValue=sl.setScalarValue;Re.stringify=Rv.stringify;Re.visit=Cv.visit;Re.BOM=ol;Re.DOCUMENT=al;Re.FLOW_END=ll;Re.SCALAR=cl;Re.isCollection=Pv;Re.isScalar=kv;Re.prettyToken=$v;Re.tokenType=qv});var dl=_(Pm=>{"use strict";var Qn=es();function Me(n){switch(n){case void 0:case" ":case`
`:case"\r":case"	":return!0;default:return!1}}var Cm="0123456789ABCDEFabcdef".split(""),xv="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()".split(""),ul=",[]{}".split(""),Mv=` ,[]{}
\r	`.split(""),fl=n=>!n||Mv.includes(n),hl=class{constructor(){this.atEnd=!1,this.blockScalarIndent=-1,this.blockScalarKeep=!1,this.buffer="",this.flowKey=!1,this.flowLevel=0,this.indentNext=0,this.indentValue=0,this.lineEndPos=null,this.next=null,this.pos=0}*lex(e,t=!1){e&&(this.buffer=this.buffer?this.buffer+e:e,this.lineEndPos=null),this.atEnd=!t;let r=this.next??"stream";for(;r&&(t||this.hasChars(1));)r=yield*this.parseNext(r)}atLineEnd(){let e=this.pos,t=this.buffer[e];for(;t===" "||t==="	";)t=this.buffer[++e];return!t||t==="#"||t===`
`?!0:t==="\r"?this.buffer[e+1]===`
`:!1}charAt(e){return this.buffer[this.pos+e]}continueScalar(e){let t=this.buffer[e];if(this.indentNext>0){let r=0;for(;t===" ";)t=this.buffer[++r+e];if(t==="\r"){let i=this.buffer[r+e+1];if(i===`
`||!i&&!this.atEnd)return e+r+1}return t===`
`||r>=this.indentNext||!t&&!this.atEnd?e+r:-1}if(t==="-"||t==="."){let r=this.buffer.substr(e,3);if((r==="---"||r==="...")&&Me(this.buffer[e+3]))return-1}return e}getLine(){let e=this.lineEndPos;return(typeof e!="number"||e!==-1&&e<this.pos)&&(e=this.buffer.indexOf(`
`,this.pos),this.lineEndPos=e),e===-1?this.atEnd?this.buffer.substring(this.pos):null:(this.buffer[e-1]==="\r"&&(e-=1),this.buffer.substring(this.pos,e))}hasChars(e){return this.pos+e<=this.buffer.length}setNext(e){return this.buffer=this.buffer.substring(this.pos),this.pos=0,this.lineEndPos=null,this.next=e,null}peek(e){return this.buffer.substr(this.pos,e)}*parseNext(e){switch(e){case"stream":return yield*this.parseStream();case"line-start":return yield*this.parseLineStart();case"block-start":return yield*this.parseBlockStart();case"doc":return yield*this.parseDocument();case"flow":return yield*this.parseFlowCollection();case"quoted-scalar":return yield*this.parseQuotedScalar();case"block-scalar":return yield*this.parseBlockScalar();case"plain-scalar":return yield*this.parsePlainScalar()}}*parseStream(){let e=this.getLine();if(e===null)return this.setNext("stream");if(e[0]===Qn.BOM&&(yield*this.pushCount(1),e=e.substring(1)),e[0]==="%"){let t=e.length,r=e.indexOf("#");if(r!==-1){let s=e[r-1];(s===" "||s==="	")&&(t=r-1)}for(;;){let s=e[t-1];if(s===" "||s==="	")t-=1;else break}let i=(yield*this.pushCount(t))+(yield*this.pushSpaces(!0));return yield*this.pushCount(e.length-i),this.pushNewline(),"stream"}if(this.atLineEnd()){let t=yield*this.pushSpaces(!0);return yield*this.pushCount(e.length-t),yield*this.pushNewline(),"stream"}return yield Qn.DOCUMENT,yield*this.parseLineStart()}*parseLineStart(){let e=this.charAt(0);if(!e&&!this.atEnd)return this.setNext("line-start");if(e==="-"||e==="."){if(!this.atEnd&&!this.hasChars(4))return this.setNext("line-start");let t=this.peek(3);if(t==="---"&&Me(this.charAt(3)))return yield*this.pushCount(3),this.indentValue=0,this.indentNext=0,"doc";if(t==="..."&&Me(this.charAt(3)))return yield*this.pushCount(3),"stream"}return this.indentValue=yield*this.pushSpaces(!1),this.indentNext>this.indentValue&&!Me(this.charAt(1))&&(this.indentNext=this.indentValue),yield*this.parseBlockStart()}*parseBlockStart(){let[e,t]=this.peek(2);if(!t&&!this.atEnd)return this.setNext("block-start");if((e==="-"||e==="?"||e===":")&&Me(t)){let r=(yield*this.pushCount(1))+(yield*this.pushSpaces(!0));return this.indentNext=this.indentValue+1,this.indentValue+=r,yield*this.parseBlockStart()}return"doc"}*parseDocument(){yield*this.pushSpaces(!0);let e=this.getLine();if(e===null)return this.setNext("doc");let t=yield*this.pushIndicators();switch(e[t]){case"#":yield*this.pushCount(e.length-t);case void 0:return yield*this.pushNewline(),yield*this.parseLineStart();case"{":case"[":return yield*this.pushCount(1),this.flowKey=!1,this.flowLevel=1,"flow";case"}":case"]":return yield*this.pushCount(1),"doc";case"*":return yield*this.pushUntil(fl),"doc";case'"':case"'":return yield*this.parseQuotedScalar();case"|":case">":return t+=yield*this.parseBlockScalarHeader(),t+=yield*this.pushSpaces(!0),yield*this.pushCount(e.length-t),yield*this.pushNewline(),yield*this.parseBlockScalar();default:return yield*this.parsePlainScalar()}}*parseFlowCollection(){let e,t,r=-1;do e=yield*this.pushNewline(),e>0?(t=yield*this.pushSpaces(!1),this.indentValue=r=t):t=0,t+=yield*this.pushSpaces(!0);while(e+t>0);let i=this.getLine();if(i===null)return this.setNext("flow");if((r!==-1&&r<this.indentNext&&i[0]!=="#"||r===0&&(i.startsWith("---")||i.startsWith("..."))&&Me(i[3]))&&!(r===this.indentNext-1&&this.flowLevel===1&&(i[0]==="]"||i[0]==="}")))return this.flowLevel=0,yield Qn.FLOW_END,yield*this.parseLineStart();let s=0;for(;i[s]===",";)s+=yield*this.pushCount(1),s+=yield*this.pushSpaces(!0),this.flowKey=!1;switch(s+=yield*this.pushIndicators(),i[s]){case void 0:return"flow";case"#":return yield*this.pushCount(i.length-s),"flow";case"{":case"[":return yield*this.pushCount(1),this.flowKey=!1,this.flowLevel+=1,"flow";case"}":case"]":return yield*this.pushCount(1),this.flowKey=!0,this.flowLevel-=1,this.flowLevel?"flow":"doc";case"*":return yield*this.pushUntil(fl),"flow";case'"':case"'":return this.flowKey=!0,yield*this.parseQuotedScalar();case":":{let o=this.charAt(1);if(this.flowKey||Me(o)||o===",")return this.flowKey=!1,yield*this.pushCount(1),yield*this.pushSpaces(!0),"flow"}default:return this.flowKey=!1,yield*this.parsePlainScalar()}}*parseQuotedScalar(){let e=this.charAt(0),t=this.buffer.indexOf(e,this.pos+1);if(e==="'")for(;t!==-1&&this.buffer[t+1]==="'";)t=this.buffer.indexOf("'",t+2);else for(;t!==-1;){let s=0;for(;this.buffer[t-1-s]==="\\";)s+=1;if(s%2===0)break;t=this.buffer.indexOf('"',t+1)}let r=this.buffer.substring(0,t),i=r.indexOf(`
`,this.pos);if(i!==-1){for(;i!==-1;){let s=this.continueScalar(i+1);if(s===-1)break;i=r.indexOf(`
`,s)}i!==-1&&(t=i-(r[i-1]==="\r"?2:1))}if(t===-1){if(!this.atEnd)return this.setNext("quoted-scalar");t=this.buffer.length}return yield*this.pushToIndex(t+1,!1),this.flowLevel?"flow":"doc"}*parseBlockScalarHeader(){this.blockScalarIndent=-1,this.blockScalarKeep=!1;let e=this.pos;for(;;){let t=this.buffer[++e];if(t==="+")this.blockScalarKeep=!0;else if(t>"0"&&t<="9")this.blockScalarIndent=Number(t)-1;else if(t!=="-")break}return yield*this.pushUntil(t=>Me(t)||t==="#")}*parseBlockScalar(){let e=this.pos-1,t=0,r;e:for(let i=this.pos;r=this.buffer[i];++i)switch(r){case" ":t+=1;break;case`
`:e=i,t=0;break;case"\r":{let s=this.buffer[i+1];if(!s&&!this.atEnd)return this.setNext("block-scalar");if(s===`
`)break}default:break e}if(!r&&!this.atEnd)return this.setNext("block-scalar");if(t>=this.indentNext){this.blockScalarIndent===-1?this.indentNext=t:this.indentNext+=this.blockScalarIndent;do{let i=this.continueScalar(e+1);if(i===-1)break;e=this.buffer.indexOf(`
`,i)}while(e!==-1);if(e===-1){if(!this.atEnd)return this.setNext("block-scalar");e=this.buffer.length}}if(!this.blockScalarKeep)do{let i=e-1,s=this.buffer[i];s==="\r"&&(s=this.buffer[--i]);let o=i;for(;s===" "||s==="	";)s=this.buffer[--i];if(s===`
`&&i>=this.pos&&i+1+t>o)e=i;else break}while(!0);return yield Qn.SCALAR,yield*this.pushToIndex(e+1,!0),yield*this.parseLineStart()}*parsePlainScalar(){let e=this.flowLevel>0,t=this.pos-1,r=this.pos-1,i;for(;i=this.buffer[++r];)if(i===":"){let s=this.buffer[r+1];if(Me(s)||e&&s===",")break;t=r}else if(Me(i)){let s=this.buffer[r+1];if(i==="\r"&&(s===`
`?(r+=1,i=`
`,s=this.buffer[r+1]):t=r),s==="#"||e&&ul.includes(s))break;if(i===`
`){let o=this.continueScalar(r+1);if(o===-1)break;r=Math.max(r,o-2)}}else{if(e&&ul.includes(i))break;t=r}return!i&&!this.atEnd?this.setNext("plain-scalar"):(yield Qn.SCALAR,yield*this.pushToIndex(t+1,!0),e?"flow":"doc")}*pushCount(e){return e>0?(yield this.buffer.substr(this.pos,e),this.pos+=e,e):0}*pushToIndex(e,t){let r=this.buffer.slice(this.pos,e);return r?(yield r,this.pos+=r.length,r.length):(t&&(yield""),0)}*pushIndicators(){switch(this.charAt(0)){case"!":return(yield*this.pushTag())+(yield*this.pushSpaces(!0))+(yield*this.pushIndicators());case"&":return(yield*this.pushUntil(fl))+(yield*this.pushSpaces(!0))+(yield*this.pushIndicators());case"-":case"?":case":":{let e=this.flowLevel>0,t=this.charAt(1);if(Me(t)||e&&ul.includes(t))return e?this.flowKey&&(this.flowKey=!1):this.indentNext=this.indentValue+1,(yield*this.pushCount(1))+(yield*this.pushSpaces(!0))+(yield*this.pushIndicators())}}return 0}*pushTag(){if(this.charAt(1)==="<"){let e=this.pos+2,t=this.buffer[e];for(;!Me(t)&&t!==">";)t=this.buffer[++e];return yield*this.pushToIndex(t===">"?e+1:e,!1)}else{let e=this.pos+1,t=this.buffer[e];for(;t;)if(xv.includes(t))t=this.buffer[++e];else if(t==="%"&&Cm.includes(this.buffer[e+1])&&Cm.includes(this.buffer[e+2]))t=this.buffer[e+=3];else break;return yield*this.pushToIndex(e,!1)}}*pushNewline(){let e=this.buffer[this.pos];return e===`
`?yield*this.pushCount(1):e==="\r"&&this.charAt(1)===`
`?yield*this.pushCount(2):0}*pushSpaces(e){let t=this.pos-1,r;do r=this.buffer[++t];while(r===" "||e&&r==="	");let i=t-this.pos;return i>0&&(yield this.buffer.substr(this.pos,i),this.pos=t),i}*pushUntil(e){let t=this.pos,r=this.buffer[t];for(;!e(r);)r=this.buffer[++t];return yield*this.pushToIndex(t,!1)}};Pm.Lexer=hl});var _l=_(km=>{"use strict";var pl=class{constructor(){this.lineStarts=[],this.addNewLine=e=>this.lineStarts.push(e),this.linePos=e=>{let t=0,r=this.lineStarts.length;for(;t<r;){let s=t+r>>1;this.lineStarts[s]<e?t=s+1:r=s}if(this.lineStarts[t]===e)return{line:t+1,col:1};if(t===0)return{line:0,col:e};let i=this.lineStarts[t-1];return{line:t,col:e-i+1}}}};km.LineCounter=pl});var gl=_(Fm=>{"use strict";var $m=es(),Fv=dl();function Be(n,e){for(let t=0;t<n.length;++t)if(n[t].type===e)return!0;return!1}function qm(n){for(let e=0;e<n.length;++e)switch(n[e].type){case"space":case"comment":case"newline":break;default:return e}return-1}function Mm(n){switch(n?.type){case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":case"flow-collection":return!0;default:return!1}}function ts(n){switch(n.type){case"document":return n.start;case"block-map":{let e=n.items[n.items.length-1];return e.sep??e.start}case"block-seq":return n.items[n.items.length-1].start;default:return[]}}function zt(n){if(n.length===0)return[];let e=n.length;e:for(;--e>=0;)switch(n[e].type){case"doc-start":case"explicit-key-ind":case"map-value-ind":case"seq-item-ind":case"newline":break e}for(;n[++e]?.type==="space";);return n.splice(e,n.length)}function xm(n){if(n.start.type==="flow-seq-start")for(let e of n.items)e.sep&&!e.value&&!Be(e.start,"explicit-key-ind")&&!Be(e.sep,"map-value-ind")&&(e.key&&(e.value=e.key),delete e.key,Mm(e.value)?e.value.end?Array.prototype.push.apply(e.value.end,e.sep):e.value.end=e.sep:Array.prototype.push.apply(e.start,e.sep),delete e.sep)}var ml=class{constructor(e){this.atNewLine=!0,this.atScalar=!1,this.indent=0,this.offset=0,this.onKeyLine=!1,this.stack=[],this.source="",this.type="",this.lexer=new Fv.Lexer,this.onNewLine=e}*parse(e,t=!1){this.onNewLine&&this.offset===0&&this.onNewLine(0);for(let r of this.lexer.lex(e,t))yield*this.next(r);t||(yield*this.end())}*next(e){if(this.source=e,process.env.LOG_TOKENS&&console.log("|",$m.prettyToken(e)),this.atScalar){this.atScalar=!1,yield*this.step(),this.offset+=e.length;return}let t=$m.tokenType(e);if(t)if(t==="scalar")this.atNewLine=!1,this.atScalar=!0,this.type="scalar";else{switch(this.type=t,yield*this.step(),t){case"newline":this.atNewLine=!0,this.indent=0,this.onNewLine&&this.onNewLine(this.offset+e.length);break;case"space":this.atNewLine&&e[0]===" "&&(this.indent+=e.length);break;case"explicit-key-ind":case"map-value-ind":case"seq-item-ind":this.atNewLine&&(this.indent+=e.length);break;case"doc-mode":case"flow-error-end":return;default:this.atNewLine=!1}this.offset+=e.length}else{let r=`Not a YAML token: ${e}`;yield*this.pop({type:"error",offset:this.offset,message:r,source:e}),this.offset+=e.length}}*end(){for(;this.stack.length>0;)yield*this.pop()}get sourceToken(){return{type:this.type,offset:this.offset,indent:this.indent,source:this.source}}*step(){let e=this.peek(1);if(this.type==="doc-end"&&(!e||e.type!=="doc-end")){for(;this.stack.length>0;)yield*this.pop();this.stack.push({type:"doc-end",offset:this.offset,source:this.source});return}if(!e)return yield*this.stream();switch(e.type){case"document":return yield*this.document(e);case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return yield*this.scalar(e);case"block-scalar":return yield*this.blockScalar(e);case"block-map":return yield*this.blockMap(e);case"block-seq":return yield*this.blockSequence(e);case"flow-collection":return yield*this.flowCollection(e);case"doc-end":return yield*this.documentEnd(e)}yield*this.pop()}peek(e){return this.stack[this.stack.length-e]}*pop(e){let t=e??this.stack.pop();if(t)if(this.stack.length===0)yield t;else{let r=this.peek(1);switch(t.type==="block-scalar"?t.indent="indent"in r?r.indent:0:t.type==="flow-collection"&&r.type==="document"&&(t.indent=0),t.type==="flow-collection"&&xm(t),r.type){case"document":r.value=t;break;case"block-scalar":r.props.push(t);break;case"block-map":{let i=r.items[r.items.length-1];if(i.value){r.items.push({start:[],key:t,sep:[]}),this.onKeyLine=!0;return}else if(i.sep)i.value=t;else{Object.assign(i,{key:t,sep:[]}),this.onKeyLine=!Be(i.start,"explicit-key-ind");return}break}case"block-seq":{let i=r.items[r.items.length-1];i.value?r.items.push({start:[],value:t}):i.value=t;break}case"flow-collection":{let i=r.items[r.items.length-1];!i||i.value?r.items.push({start:[],key:t,sep:[]}):i.sep?i.value=t:Object.assign(i,{key:t,sep:[]});return}default:yield*this.pop(),yield*this.pop(t)}if((r.type==="document"||r.type==="block-map"||r.type==="block-seq")&&(t.type==="block-map"||t.type==="block-seq")){let i=t.items[t.items.length-1];i&&!i.sep&&!i.value&&i.start.length>0&&qm(i.start)===-1&&(t.indent===0||i.start.every(s=>s.type!=="comment"||s.indent<t.indent))&&(r.type==="document"?r.end=i.start:r.items.push({start:i.start}),t.items.splice(-1,1))}}else{let r="Tried to pop an empty stack";yield{type:"error",offset:this.offset,source:"",message:r}}}*stream(){switch(this.type){case"directive-line":yield{type:"directive",offset:this.offset,source:this.source};return;case"byte-order-mark":case"space":case"comment":case"newline":yield this.sourceToken;return;case"doc-mode":case"doc-start":{let e={type:"document",offset:this.offset,start:[]};this.type==="doc-start"&&e.start.push(this.sourceToken),this.stack.push(e);return}}yield{type:"error",offset:this.offset,message:`Unexpected ${this.type} token in YAML stream`,source:this.source}}*document(e){if(e.value)return yield*this.lineEnd(e);switch(this.type){case"doc-start":{qm(e.start)!==-1?(yield*this.pop(),yield*this.step()):e.start.push(this.sourceToken);return}case"anchor":case"tag":case"space":case"comment":case"newline":e.start.push(this.sourceToken);return}let t=this.startBlockValue(e);t?this.stack.push(t):yield{type:"error",offset:this.offset,message:`Unexpected ${this.type} token in YAML document`,source:this.source}}*scalar(e){if(this.type==="map-value-ind"){let t=ts(this.peek(2)),r=zt(t),i;e.end?(i=e.end,i.push(this.sourceToken),delete e.end):i=[this.sourceToken];let s={type:"block-map",offset:e.offset,indent:e.indent,items:[{start:r,key:e,sep:i}]};this.onKeyLine=!0,this.stack[this.stack.length-1]=s}else yield*this.lineEnd(e)}*blockScalar(e){switch(this.type){case"space":case"comment":case"newline":e.props.push(this.sourceToken);return;case"scalar":if(e.source=this.source,this.atNewLine=!0,this.indent=0,this.onNewLine){let t=this.source.indexOf(`
`)+1;for(;t!==0;)this.onNewLine(this.offset+t),t=this.source.indexOf(`
`,t)+1}yield*this.pop();break;default:yield*this.pop(),yield*this.step()}}*blockMap(e){let t=e.items[e.items.length-1];switch(this.type){case"newline":if(this.onKeyLine=!1,t.value){let r="end"in t.value?t.value.end:void 0;(Array.isArray(r)?r[r.length-1]:void 0)?.type==="comment"?r?.push(this.sourceToken):e.items.push({start:[this.sourceToken]})}else t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"space":case"comment":if(t.value)e.items.push({start:[this.sourceToken]});else if(t.sep)t.sep.push(this.sourceToken);else{if(this.atIndentedComment(t.start,e.indent)){let i=e.items[e.items.length-2]?.value?.end;if(Array.isArray(i)){Array.prototype.push.apply(i,t.start),i.push(this.sourceToken),e.items.pop();return}}t.start.push(this.sourceToken)}return}if(this.indent>=e.indent){let r=!this.onKeyLine&&this.indent===e.indent&&t.sep,i=[];if(r&&t.sep&&!t.value){let s=[];for(let o=0;o<t.sep.length;++o){let a=t.sep[o];switch(a.type){case"newline":s.push(o);break;case"space":break;case"comment":a.indent>e.indent&&(s.length=0);break;default:s.length=0}}s.length>=2&&(i=t.sep.splice(s[1]))}switch(this.type){case"anchor":case"tag":r||t.value?(i.push(this.sourceToken),e.items.push({start:i}),this.onKeyLine=!0):t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"explicit-key-ind":!t.sep&&!Be(t.start,"explicit-key-ind")?t.start.push(this.sourceToken):r||t.value?(i.push(this.sourceToken),e.items.push({start:i})):this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:[this.sourceToken]}]}),this.onKeyLine=!0;return;case"map-value-ind":if(Be(t.start,"explicit-key-ind"))if(t.sep)if(t.value)e.items.push({start:[],key:null,sep:[this.sourceToken]});else if(Be(t.sep,"map-value-ind"))this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:i,key:null,sep:[this.sourceToken]}]});else if(Mm(t.key)&&!Be(t.sep,"newline")){let s=zt(t.start),o=t.key,a=t.sep;a.push(this.sourceToken),delete t.key,delete t.sep,this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:s,key:o,sep:a}]})}else i.length>0?t.sep=t.sep.concat(i,this.sourceToken):t.sep.push(this.sourceToken);else if(Be(t.start,"newline"))Object.assign(t,{key:null,sep:[this.sourceToken]});else{let s=zt(t.start);this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:s,key:null,sep:[this.sourceToken]}]})}else t.sep?t.value||r?e.items.push({start:i,key:null,sep:[this.sourceToken]}):Be(t.sep,"map-value-ind")?this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:[],key:null,sep:[this.sourceToken]}]}):t.sep.push(this.sourceToken):Object.assign(t,{key:null,sep:[this.sourceToken]});this.onKeyLine=!0;return;case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":{let s=this.flowScalar(this.type);r||t.value?(e.items.push({start:i,key:s,sep:[]}),this.onKeyLine=!0):t.sep?this.stack.push(s):(Object.assign(t,{key:s,sep:[]}),this.onKeyLine=!0);return}default:{let s=this.startBlockValue(e);if(s){r&&s.type!=="block-seq"&&Be(t.start,"explicit-key-ind")&&e.items.push({start:i}),this.stack.push(s);return}}}}yield*this.pop(),yield*this.step()}*blockSequence(e){let t=e.items[e.items.length-1];switch(this.type){case"newline":if(t.value){let r="end"in t.value?t.value.end:void 0;(Array.isArray(r)?r[r.length-1]:void 0)?.type==="comment"?r?.push(this.sourceToken):e.items.push({start:[this.sourceToken]})}else t.start.push(this.sourceToken);return;case"space":case"comment":if(t.value)e.items.push({start:[this.sourceToken]});else{if(this.atIndentedComment(t.start,e.indent)){let i=e.items[e.items.length-2]?.value?.end;if(Array.isArray(i)){Array.prototype.push.apply(i,t.start),i.push(this.sourceToken),e.items.pop();return}}t.start.push(this.sourceToken)}return;case"anchor":case"tag":if(t.value||this.indent<=e.indent)break;t.start.push(this.sourceToken);return;case"seq-item-ind":if(this.indent!==e.indent)break;t.value||Be(t.start,"seq-item-ind")?e.items.push({start:[this.sourceToken]}):t.start.push(this.sourceToken);return}if(this.indent>e.indent){let r=this.startBlockValue(e);if(r){this.stack.push(r);return}}yield*this.pop(),yield*this.step()}*flowCollection(e){let t=e.items[e.items.length-1];if(this.type==="flow-error-end"){let r;do yield*this.pop(),r=this.peek(1);while(r&&r.type==="flow-collection")}else if(e.end.length===0){switch(this.type){case"comma":case"explicit-key-ind":!t||t.sep?e.items.push({start:[this.sourceToken]}):t.start.push(this.sourceToken);return;case"map-value-ind":!t||t.value?e.items.push({start:[],key:null,sep:[this.sourceToken]}):t.sep?t.sep.push(this.sourceToken):Object.assign(t,{key:null,sep:[this.sourceToken]});return;case"space":case"comment":case"newline":case"anchor":case"tag":!t||t.value?e.items.push({start:[this.sourceToken]}):t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":{let i=this.flowScalar(this.type);!t||t.value?e.items.push({start:[],key:i,sep:[]}):t.sep?this.stack.push(i):Object.assign(t,{key:i,sep:[]});return}case"flow-map-end":case"flow-seq-end":e.end.push(this.sourceToken);return}let r=this.startBlockValue(e);r?this.stack.push(r):(yield*this.pop(),yield*this.step())}else{let r=this.peek(2);if(r.type==="block-map"&&(this.type==="map-value-ind"&&r.indent===e.indent||this.type==="newline"&&!r.items[r.items.length-1].sep))yield*this.pop(),yield*this.step();else if(this.type==="map-value-ind"&&r.type!=="flow-collection"){let i=ts(r),s=zt(i);xm(e);let o=e.end.splice(1,e.end.length);o.push(this.sourceToken);let a={type:"block-map",offset:e.offset,indent:e.indent,items:[{start:s,key:e,sep:o}]};this.onKeyLine=!0,this.stack[this.stack.length-1]=a}else yield*this.lineEnd(e)}}flowScalar(e){if(this.onNewLine){let t=this.source.indexOf(`
`)+1;for(;t!==0;)this.onNewLine(this.offset+t),t=this.source.indexOf(`
`,t)+1}return{type:e,offset:this.offset,indent:this.indent,source:this.source}}startBlockValue(e){switch(this.type){case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return this.flowScalar(this.type);case"block-scalar-header":return{type:"block-scalar",offset:this.offset,indent:this.indent,props:[this.sourceToken],source:""};case"flow-map-start":case"flow-seq-start":return{type:"flow-collection",offset:this.offset,indent:this.indent,start:this.sourceToken,items:[],end:[]};case"seq-item-ind":return{type:"block-seq",offset:this.offset,indent:this.indent,items:[{start:[this.sourceToken]}]};case"explicit-key-ind":{this.onKeyLine=!0;let t=ts(e),r=zt(t);return r.push(this.sourceToken),{type:"block-map",offset:this.offset,indent:this.indent,items:[{start:r}]}}case"map-value-ind":{this.onKeyLine=!0;let t=ts(e),r=zt(t);return{type:"block-map",offset:this.offset,indent:this.indent,items:[{start:r,key:null,sep:[this.sourceToken]}]}}}return null}atIndentedComment(e,t){return this.type!=="comment"||this.indent<=t?!1:e.every(r=>r.type==="newline"||r.type==="space")}*documentEnd(e){this.type!=="doc-mode"&&(e.end?e.end.push(this.sourceToken):e.end=[this.sourceToken],this.type==="newline"&&(yield*this.pop()))}*lineEnd(e){switch(this.type){case"comma":case"doc-start":case"doc-end":case"flow-seq-end":case"flow-map-end":case"map-value-ind":yield*this.pop(),yield*this.step();break;case"newline":this.onKeyLine=!1;case"space":case"comment":default:e.end?e.end.push(this.sourceToken):e.end=[this.sourceToken],this.type==="newline"&&(yield*this.pop())}}};Fm.Parser=ml});var Um=_(er=>{"use strict";var Dm=nl(),Dv=Wn(),Zn=Yn(),jv=ea(),Hv=_l(),jm=gl();function Hm(n){let e=n.prettyErrors!==!1;return{lineCounter:n.lineCounter||e&&new Hv.LineCounter||null,prettyErrors:e}}function Bv(n,e={}){let{lineCounter:t,prettyErrors:r}=Hm(e),i=new jm.Parser(t?.addNewLine),s=new Dm.Composer(e),o=Array.from(s.compose(i.parse(n)));if(r&&t)for(let a of o)a.errors.forEach(Zn.prettifyError(n,t)),a.warnings.forEach(Zn.prettifyError(n,t));return o.length>0?o:Object.assign([],{empty:!0},s.streamInfo())}function Bm(n,e={}){let{lineCounter:t,prettyErrors:r}=Hm(e),i=new jm.Parser(t?.addNewLine),s=new Dm.Composer(e),o=null;for(let a of s.compose(i.parse(n),!0,n.length))if(!o)o=a;else if(o.options.logLevel!=="silent"){o.errors.push(new Zn.YAMLParseError(a.range.slice(0,2),"MULTIPLE_DOCS","Source contains multiple documents; please use YAML.parseAllDocuments()"));break}return r&&t&&(o.errors.forEach(Zn.prettifyError(n,t)),o.warnings.forEach(Zn.prettifyError(n,t))),o}function Uv(n,e,t){let r;typeof e=="function"?r=e:t===void 0&&e&&typeof e=="object"&&(t=e);let i=Bm(n,t);if(!i)return null;if(i.warnings.forEach(s=>jv.warn(i.options.logLevel,s)),i.errors.length>0){if(i.options.logLevel!=="silent")throw i.errors[0];i.errors=[]}return i.toJS(Object.assign({reviver:r},t))}function Vv(n,e,t){let r=null;if(typeof e=="function"||Array.isArray(e)?r=e:t===void 0&&e&&(t=e),typeof t=="string"&&(t=t.length),typeof t=="number"){let i=Math.round(t);t=i<1?void 0:i>8?{indent:8}:{indent:i}}if(n===void 0){let{keepUndefined:i}=t??e??{};if(!i)return}return new Dv.Document(n,r,t).toString(t)}er.parse=Uv;er.parseAllDocuments=Bv;er.parseDocument=Bm;er.stringify=Vv});var Wm=_(J=>{"use strict";var Wv=nl(),Gv=Wn(),Kv=xa(),yl=Yn(),Yv=On(),_t=W(),Jv=ft(),Xv=ce(),zv=dt(),Qv=pt(),Zv=es(),eb=dl(),tb=_l(),nb=gl(),ns=Um(),Vm=wn();J.Composer=Wv.Composer;J.Document=Gv.Document;J.Schema=Kv.Schema;J.YAMLError=yl.YAMLError;J.YAMLParseError=yl.YAMLParseError;J.YAMLWarning=yl.YAMLWarning;J.Alias=Yv.Alias;J.isAlias=_t.isAlias;J.isCollection=_t.isCollection;J.isDocument=_t.isDocument;J.isMap=_t.isMap;J.isNode=_t.isNode;J.isPair=_t.isPair;J.isScalar=_t.isScalar;J.isSeq=_t.isSeq;J.Pair=Jv.Pair;J.Scalar=Xv.Scalar;J.YAMLMap=zv.YAMLMap;J.YAMLSeq=Qv.YAMLSeq;J.CST=Zv;J.Lexer=eb.Lexer;J.LineCounter=tb.LineCounter;J.Parser=nb.Parser;J.parse=ns.parse;J.parseAllDocuments=ns.parseAllDocuments;J.parseDocument=ns.parseDocument;J.stringify=ns.stringify;J.visit=Vm.visit;J.visitAsync=Vm.visitAsync});var Km=_((mR,lb)=>{lb.exports={name:"teamsfx-sample-validator",version:"1.0.0",description:"",main:"validator.cjs",bin:{"teamsfx-sample-validator":"validator.cjs"},scripts:{build:"esbuild src/index.ts --bundle --minify --outfile=validator.cjs --platform=node",test:"jest"},keywords:[],author:"",license:"ISC",dependencies:{chalk:"^4.1.2",commander:"^11.0.0","compare-versions":"^6.1.0",figlet:"^1.6.0","fs-extra":"^11.1.1","image-size":"^1.0.2",semver:"^7.7.2",yaml:"^2.3.1"},devDependencies:{"@types/figlet":"^1.5.6","@types/fs-extra":"^11.0.1","@types/jest":"^29.5.3","@types/mock-fs":"^4.13.1","@types/node":"^20.4.2","@types/semver":"^7.7.0",dotenv:"^16.3.1",esbuild:"^0.19.2",jest:"^29.6.1","mock-fs":"^5.2.0","ts-jest":"^29.1.1",typescript:"^5.1.6"}}});var xl=oe(ql(),1),{program:Eb,createCommand:Tb,createArgument:Lb,createOption:Sb,CommanderError:Ab,InvalidArgumentError:Ib,InvalidOptionArgumentError:wb,Command:Ml,Argument:vb,Option:bb,Help:Nb}=xl.default;var is=oe(jl());var Hl=`flf2a$ 6 5 16 15 13 0 24463 229
Standard by Glenn Chappell & Ian Chai 3/93 -- based on Frank's .sig
Includes ISO Latin-1
figlet release 2.1 -- 12 Aug 1994
Modified for figlet 2.2 by John Cowan <cowan@ccil.org>
  to add Latin-{2,3,4,5} support (Unicode U+0100-017F).
Permission is hereby given to modify this font, as long as the
modifier's name is placed on a comment line.

Modified by Paul Burton <solution@earthlink.net> 12/96 to include new parameter
supported by FIGlet and FIGWin.  May also be slightly modified for better use
of new full-width/kern/smush alternatives, but default output is NOT changed.

Font modified May 20, 2012 by patorjk to add the 0xCA0 character
 $@
 $@
 $@
 $@
 $@
 $@@
  _ @
 | |@
 | |@
 |_|@
 (_)@
    @@
  _ _ @
 ( | )@
  V V @
   $  @
   $  @
      @@
    _  _   @
  _| || |_ @
 |_  ..  _|@
 |_      _|@
   |_||_|  @
           @@
   _  @
  | | @
 / __)@
 \\__ \\@
 (   /@
  |_| @@
  _  __@
 (_)/ /@
   / / @
  / /_ @
 /_/(_)@
       @@
   ___   @
  ( _ )  @
  / _ \\/\\@
 | (_>  <@
  \\___/\\/@
         @@
  _ @
 ( )@
 |/ @
  $ @
  $ @
    @@
   __@
  / /@
 | | @
 | | @
 | | @
  \\_\\@@
 __  @
 \\ \\ @
  | |@
  | |@
  | |@
 /_/ @@
       @
 __/\\__@
 \\    /@
 /_  _\\@
   \\/  @
       @@
        @
    _   @
  _| |_ @
 |_   _|@
   |_|  @
        @@
    @
    @
    @
  _ @
 ( )@
 |/ @@
        @
        @
  _____ @
 |_____|@
    $   @
        @@
    @
    @
    @
  _ @
 (_)@
    @@
     __@
    / /@
   / / @
  / /  @
 /_/   @
       @@
   ___  @
  / _ \\ @
 | | | |@
 | |_| |@
  \\___/ @
        @@
  _ @
 / |@
 | |@
 | |@
 |_|@
    @@
  ____  @
 |___ \\ @
   __) |@
  / __/ @
 |_____|@
        @@
  _____ @
 |___ / @
   |_ \\ @
  ___) |@
 |____/ @
        @@
  _  _   @
 | || |  @
 | || |_ @
 |__   _|@
    |_|  @
         @@
  ____  @
 | ___| @
 |___ \\ @
  ___) |@
 |____/ @
        @@
   __   @
  / /_  @
 | '_ \\ @
 | (_) |@
  \\___/ @
        @@
  _____ @
 |___  |@
    / / @
   / /  @
  /_/   @
        @@
   ___  @
  ( _ ) @
  / _ \\ @
 | (_) |@
  \\___/ @
        @@
   ___  @
  / _ \\ @
 | (_) |@
  \\__, |@
    /_/ @
        @@
    @
  _ @
 (_)@
  _ @
 (_)@
    @@
    @
  _ @
 (_)@
  _ @
 ( )@
 |/ @@
   __@
  / /@
 / / @
 \\ \\ @
  \\_\\@
     @@
        @
  _____ @
 |_____|@
 |_____|@
    $   @
        @@
 __  @
 \\ \\ @
  \\ \\@
  / /@
 /_/ @
     @@
  ___ @
 |__ \\@
   / /@
  |_| @
  (_) @
      @@
    ____  @
   / __ \\ @
  / / _\` |@
 | | (_| |@
  \\ \\__,_|@
   \\____/ @@
     _    @
    / \\   @
   / _ \\  @
  / ___ \\ @
 /_/   \\_\\@
          @@
  ____  @
 | __ ) @
 |  _ \\ @
 | |_) |@
 |____/ @
        @@
   ____ @
  / ___|@
 | |    @
 | |___ @
  \\____|@
        @@
  ____  @
 |  _ \\ @
 | | | |@
 | |_| |@
 |____/ @
        @@
  _____ @
 | ____|@
 |  _|  @
 | |___ @
 |_____|@
        @@
  _____ @
 |  ___|@
 | |_   @
 |  _|  @
 |_|    @
        @@
   ____ @
  / ___|@
 | |  _ @
 | |_| |@
  \\____|@
        @@
  _   _ @
 | | | |@
 | |_| |@
 |  _  |@
 |_| |_|@
        @@
  ___ @
 |_ _|@
  | | @
  | | @
 |___|@
      @@
      _ @
     | |@
  _  | |@
 | |_| |@
  \\___/ @
        @@
  _  __@
 | |/ /@
 | ' / @
 | . \\ @
 |_|\\_\\@
       @@
  _     @
 | |    @
 | |    @
 | |___ @
 |_____|@
        @@
  __  __ @
 |  \\/  |@
 | |\\/| |@
 | |  | |@
 |_|  |_|@
         @@
  _   _ @
 | \\ | |@
 |  \\| |@
 | |\\  |@
 |_| \\_|@
        @@
   ___  @
  / _ \\ @
 | | | |@
 | |_| |@
  \\___/ @
        @@
  ____  @
 |  _ \\ @
 | |_) |@
 |  __/ @
 |_|    @
        @@
   ___  @
  / _ \\ @
 | | | |@
 | |_| |@
  \\__\\_\\@
        @@
  ____  @
 |  _ \\ @
 | |_) |@
 |  _ < @
 |_| \\_\\@
        @@
  ____  @
 / ___| @
 \\___ \\ @
  ___) |@
 |____/ @
        @@
  _____ @
 |_   _|@
   | |  @
   | |  @
   |_|  @
        @@
  _   _ @
 | | | |@
 | | | |@
 | |_| |@
  \\___/ @
        @@
 __     __@
 \\ \\   / /@
  \\ \\ / / @
   \\ V /  @
    \\_/   @
          @@
 __        __@
 \\ \\      / /@
  \\ \\ /\\ / / @
   \\ V  V /  @
    \\_/\\_/   @
             @@
 __  __@
 \\ \\/ /@
  \\  / @
  /  \\ @
 /_/\\_\\@
       @@
 __   __@
 \\ \\ / /@
  \\ V / @
   | |  @
   |_|  @
        @@
  _____@
 |__  /@
   / / @
  / /_ @
 /____|@
       @@
  __ @
 | _|@
 | | @
 | | @
 | | @
 |__|@@
 __    @
 \\ \\   @
  \\ \\  @
   \\ \\ @
    \\_\\@
       @@
  __ @
 |_ |@
  | |@
  | |@
  | |@
 |__|@@
  /\\ @
 |/\\|@
   $ @
   $ @
   $ @
     @@
        @
        @
        @
        @
  _____ @
 |_____|@@
  _ @
 ( )@
  \\|@
  $ @
  $ @
    @@
        @
   __ _ @
  / _\` |@
 | (_| |@
  \\__,_|@
        @@
  _     @
 | |__  @
 | '_ \\ @
 | |_) |@
 |_.__/ @
        @@
       @
   ___ @
  / __|@
 | (__ @
  \\___|@
       @@
      _ @
   __| |@
  / _\` |@
 | (_| |@
  \\__,_|@
        @@
       @
   ___ @
  / _ \\@
 |  __/@
  \\___|@
       @@
   __ @
  / _|@
 | |_ @
 |  _|@
 |_|  @
      @@
        @
   __ _ @
  / _\` |@
 | (_| |@
  \\__, |@
  |___/ @@
  _     @
 | |__  @
 | '_ \\ @
 | | | |@
 |_| |_|@
        @@
  _ @
 (_)@
 | |@
 | |@
 |_|@
    @@
    _ @
   (_)@
   | |@
   | |@
  _/ |@
 |__/ @@
  _    @
 | | __@
 | |/ /@
 |   < @
 |_|\\_\\@
       @@
  _ @
 | |@
 | |@
 | |@
 |_|@
    @@
            @
  _ __ ___  @
 | '_ \` _ \\ @
 | | | | | |@
 |_| |_| |_|@
            @@
        @
  _ __  @
 | '_ \\ @
 | | | |@
 |_| |_|@
        @@
        @
   ___  @
  / _ \\ @
 | (_) |@
  \\___/ @
        @@
        @
  _ __  @
 | '_ \\ @
 | |_) |@
 | .__/ @
 |_|    @@
        @
   __ _ @
  / _\` |@
 | (_| |@
  \\__, |@
     |_|@@
       @
  _ __ @
 | '__|@
 | |   @
 |_|   @
       @@
      @
  ___ @
 / __|@
 \\__ \\@
 |___/@
      @@
  _   @
 | |_ @
 | __|@
 | |_ @
  \\__|@
      @@
        @
  _   _ @
 | | | |@
 | |_| |@
  \\__,_|@
        @@
        @
 __   __@
 \\ \\ / /@
  \\ V / @
   \\_/  @
        @@
           @
 __      __@
 \\ \\ /\\ / /@
  \\ V  V / @
   \\_/\\_/  @
           @@
       @
 __  __@
 \\ \\/ /@
  >  < @
 /_/\\_\\@
       @@
        @
  _   _ @
 | | | |@
 | |_| |@
  \\__, |@
  |___/ @@
      @
  ____@
 |_  /@
  / / @
 /___|@
      @@
    __@
   / /@
  | | @
 < <  @
  | | @
   \\_\\@@
  _ @
 | |@
 | |@
 | |@
 | |@
 |_|@@
 __   @
 \\ \\  @
  | | @
   > >@
  | | @
 /_/  @@
  /\\/|@
 |/\\/ @
   $  @
   $  @
   $  @
      @@
  _   _ @
 (_)_(_)@
   /_\\  @
  / _ \\ @
 /_/ \\_\\@
        @@
  _   _ @
 (_)_(_)@
  / _ \\ @
 | |_| |@
  \\___/ @
        @@
  _   _ @
 (_) (_)@
 | | | |@
 | |_| |@
  \\___/ @
        @@
  _   _ @
 (_)_(_)@
  / _\` |@
 | (_| |@
  \\__,_|@
        @@
  _   _ @
 (_)_(_)@
  / _ \\ @
 | (_) |@
  \\___/ @
        @@
  _   _ @
 (_) (_)@
 | | | |@
 | |_| |@
  \\__,_|@
        @@
   ___ @
  / _ \\@
 | |/ /@
 | |\\ \\@
 | ||_/@
 |_|   @@
160  NO-BREAK SPACE
 $@
 $@
 $@
 $@
 $@
 $@@
161  INVERTED EXCLAMATION MARK
  _ @
 (_)@
 | |@
 | |@
 |_|@
    @@
162  CENT SIGN
    _  @
   | | @
  / __)@
 | (__ @
  \\   )@
   |_| @@
163  POUND SIGN
    ___  @
   / ,_\\ @
 _| |_   @
  | |___ @
 (_,____|@
         @@
164  CURRENCY SIGN
 /\\___/\\@
 \\  _  /@
 | (_) |@
 / ___ \\@
 \\/   \\/@
        @@
165  YEN SIGN
  __ __ @
  \\ V / @
 |__ __|@
 |__ __|@
   |_|  @
        @@
166  BROKEN BAR
  _ @
 | |@
 |_|@
  _ @
 | |@
 |_|@@
167  SECTION SIGN
    __ @
  _/ _)@
 / \\ \\ @
 \\ \\\\ \\@
  \\ \\_/@
 (__/  @@
168  DIAERESIS
  _   _ @
 (_) (_)@
  $   $ @
  $   $ @
  $   $ @
        @@
169  COPYRIGHT SIGN
    _____   @
   / ___ \\  @
  / / __| \\ @
 | | (__   |@
  \\ \\___| / @
   \\_____/  @@
170  FEMININE ORDINAL INDICATOR
  __ _ @
 / _\` |@
 \\__,_|@
 |____|@
    $  @
       @@
171  LEFT-POINTING DOUBLE ANGLE QUOTATION MARK
   ____@
  / / /@
 / / / @
 \\ \\ \\ @
  \\_\\_\\@
       @@
172  NOT SIGN
        @
  _____ @
 |___  |@
     |_|@
    $   @
        @@
173  SOFT HYPHEN
       @
       @
  ____ @
 |____|@
    $  @
       @@
174  REGISTERED SIGN
    _____   @
   / ___ \\  @
  / | _ \\ \\ @
 |  |   /  |@
  \\ |_|_\\ / @
   \\_____/  @@
175  MACRON
  _____ @
 |_____|@
    $   @
    $   @
    $   @
        @@
176  DEGREE SIGN
   __  @
  /  \\ @
 | () |@
  \\__/ @
    $  @
       @@
177  PLUS-MINUS SIGN
    _   @
  _| |_ @
 |_   _|@
  _|_|_ @
 |_____|@
        @@
178  SUPERSCRIPT TWO
  ___ @
 |_  )@
  / / @
 /___|@
   $  @
      @@
179  SUPERSCRIPT THREE
  ____@
 |__ /@
  |_ \\@
 |___/@
   $  @
      @@
180  ACUTE ACCENT
  __@
 /_/@
  $ @
  $ @
  $ @
    @@
181  MICRO SIGN
        @
  _   _ @
 | | | |@
 | |_| |@
 | ._,_|@
 |_|    @@
182  PILCROW SIGN
   _____ @
  /     |@
 | (| | |@
  \\__ | |@
    |_|_|@
         @@
183  MIDDLE DOT
    @
  _ @
 (_)@
  $ @
  $ @
    @@
184  CEDILLA
    @
    @
    @
    @
  _ @
 )_)@@
185  SUPERSCRIPT ONE
  _ @
 / |@
 | |@
 |_|@
  $ @
    @@
186  MASCULINE ORDINAL INDICATOR
  ___ @
 / _ \\@
 \\___/@
 |___|@
   $  @
      @@
187  RIGHT-POINTING DOUBLE ANGLE QUOTATION MARK
 ____  @
 \\ \\ \\ @
  \\ \\ \\@
  / / /@
 /_/_/ @
       @@
188  VULGAR FRACTION ONE QUARTER
  _   __    @
 / | / / _  @
 | |/ / | | @
 |_/ /|_  _|@
  /_/   |_| @
            @@
189  VULGAR FRACTION ONE HALF
  _   __   @
 / | / /__ @
 | |/ /_  )@
 |_/ / / / @
  /_/ /___|@
           @@
190  VULGAR FRACTION THREE QUARTERS
  ____  __    @
 |__ / / / _  @
  |_ \\/ / | | @
 |___/ /|_  _|@
    /_/   |_| @
              @@
191  INVERTED QUESTION MARK
   _  @
  (_) @
  | | @
 / /_ @
 \\___|@
      @@
192  LATIN CAPITAL LETTER A WITH GRAVE
   __   @
   \\_\\  @
   /_\\  @
  / _ \\ @
 /_/ \\_\\@
        @@
193  LATIN CAPITAL LETTER A WITH ACUTE
    __  @
   /_/  @
   /_\\  @
  / _ \\ @
 /_/ \\_\\@
        @@
194  LATIN CAPITAL LETTER A WITH CIRCUMFLEX
   //\\  @
  |/_\\| @
   /_\\  @
  / _ \\ @
 /_/ \\_\\@
        @@
195  LATIN CAPITAL LETTER A WITH TILDE
   /\\/| @
  |/\\/  @
   /_\\  @
  / _ \\ @
 /_/ \\_\\@
        @@
196  LATIN CAPITAL LETTER A WITH DIAERESIS
  _   _ @
 (_)_(_)@
   /_\\  @
  / _ \\ @
 /_/ \\_\\@
        @@
197  LATIN CAPITAL LETTER A WITH RING ABOVE
    _   @
   (o)  @
   /_\\  @
  / _ \\ @
 /_/ \\_\\@
        @@
198  LATIN CAPITAL LETTER AE
     ______ @
    /  ____|@
   / _  _|  @
  / __ |___ @
 /_/ |_____|@
            @@
199  LATIN CAPITAL LETTER C WITH CEDILLA
   ____ @
  / ___|@
 | |    @
 | |___ @
  \\____|@
    )_) @@
200  LATIN CAPITAL LETTER E WITH GRAVE
   __   @
  _\\_\\_ @
 | ____|@
 |  _|_ @
 |_____|@
        @@
201  LATIN CAPITAL LETTER E WITH ACUTE
    __  @
  _/_/_ @
 | ____|@
 |  _|_ @
 |_____|@
        @@
202  LATIN CAPITAL LETTER E WITH CIRCUMFLEX
   //\\  @
  |/_\\| @
 | ____|@
 |  _|_ @
 |_____|@
        @@
203  LATIN CAPITAL LETTER E WITH DIAERESIS
  _   _ @
 (_)_(_)@
 | ____|@
 |  _|_ @
 |_____|@
        @@
204  LATIN CAPITAL LETTER I WITH GRAVE
  __  @
  \\_\\ @
 |_ _|@
  | | @
 |___|@
      @@
205  LATIN CAPITAL LETTER I WITH ACUTE
   __ @
  /_/ @
 |_ _|@
  | | @
 |___|@
      @@
206  LATIN CAPITAL LETTER I WITH CIRCUMFLEX
  //\\ @
 |/_\\|@
 |_ _|@
  | | @
 |___|@
      @@
207  LATIN CAPITAL LETTER I WITH DIAERESIS
  _   _ @
 (_)_(_)@
  |_ _| @
   | |  @
  |___| @
        @@
208  LATIN CAPITAL LETTER ETH
    ____  @
   |  _ \\ @
  _| |_| |@
 |__ __| |@
   |____/ @
          @@
209  LATIN CAPITAL LETTER N WITH TILDE
   /\\/|@
  |/\\/ @
 | \\| |@
 | .\` |@
 |_|\\_|@
       @@
210  LATIN CAPITAL LETTER O WITH GRAVE
   __   @
   \\_\\  @
  / _ \\ @
 | |_| |@
  \\___/ @
        @@
211  LATIN CAPITAL LETTER O WITH ACUTE
    __  @
   /_/  @
  / _ \\ @
 | |_| |@
  \\___/ @
        @@
212  LATIN CAPITAL LETTER O WITH CIRCUMFLEX
   //\\  @
  |/_\\| @
  / _ \\ @
 | |_| |@
  \\___/ @
        @@
213  LATIN CAPITAL LETTER O WITH TILDE
   /\\/| @
  |/\\/  @
  / _ \\ @
 | |_| |@
  \\___/ @
        @@
214  LATIN CAPITAL LETTER O WITH DIAERESIS
  _   _ @
 (_)_(_)@
  / _ \\ @
 | |_| |@
  \\___/ @
        @@
215  MULTIPLICATION SIGN
     @
     @
 /\\/\\@
 >  <@
 \\/\\/@
     @@
216  LATIN CAPITAL LETTER O WITH STROKE
   ____ @
  / _// @
 | |// |@
 | //| |@
  //__/ @
        @@
217  LATIN CAPITAL LETTER U WITH GRAVE
   __   @
  _\\_\\_ @
 | | | |@
 | |_| |@
  \\___/ @
        @@
218  LATIN CAPITAL LETTER U WITH ACUTE
    __  @
  _/_/_ @
 | | | |@
 | |_| |@
  \\___/ @
        @@
219  LATIN CAPITAL LETTER U WITH CIRCUMFLEX
   //\\  @
  |/ \\| @
 | | | |@
 | |_| |@
  \\___/ @
        @@
220  LATIN CAPITAL LETTER U WITH DIAERESIS
  _   _ @
 (_) (_)@
 | | | |@
 | |_| |@
  \\___/ @
        @@
221  LATIN CAPITAL LETTER Y WITH ACUTE
    __  @
 __/_/__@
 \\ \\ / /@
  \\ V / @
   |_|  @
        @@
222  LATIN CAPITAL LETTER THORN
  _     @
 | |___ @
 |  __ \\@
 |  ___/@
 |_|    @
        @@
223  LATIN SMALL LETTER SHARP S
   ___ @
  / _ \\@
 | |/ /@
 | |\\ \\@
 | ||_/@
 |_|   @@
224  LATIN SMALL LETTER A WITH GRAVE
   __   @
   \\_\\_ @
  / _\` |@
 | (_| |@
  \\__,_|@
        @@
225  LATIN SMALL LETTER A WITH ACUTE
    __  @
   /_/_ @
  / _\` |@
 | (_| |@
  \\__,_|@
        @@
226  LATIN SMALL LETTER A WITH CIRCUMFLEX
   //\\  @
  |/_\\| @
  / _\` |@
 | (_| |@
  \\__,_|@
        @@
227  LATIN SMALL LETTER A WITH TILDE
   /\\/| @
  |/\\/_ @
  / _\` |@
 | (_| |@
  \\__,_|@
        @@
228  LATIN SMALL LETTER A WITH DIAERESIS
  _   _ @
 (_)_(_)@
  / _\` |@
 | (_| |@
  \\__,_|@
        @@
229  LATIN SMALL LETTER A WITH RING ABOVE
    __  @
   (()) @
  / _ '|@
 | (_| |@
  \\__,_|@
        @@
230  LATIN SMALL LETTER AE
           @
   __ ____ @
  / _\`  _ \\@
 | (_|  __/@
  \\__,____|@
           @@
231  LATIN SMALL LETTER C WITH CEDILLA
       @
   ___ @
  / __|@
 | (__ @
  \\___|@
   )_) @@
232  LATIN SMALL LETTER E WITH GRAVE
   __  @
   \\_\\ @
  / _ \\@
 |  __/@
  \\___|@
       @@
233  LATIN SMALL LETTER E WITH ACUTE
    __ @
   /_/ @
  / _ \\@
 |  __/@
  \\___|@
       @@
234  LATIN SMALL LETTER E WITH CIRCUMFLEX
   //\\ @
  |/_\\|@
  / _ \\@
 |  __/@
  \\___|@
       @@
235  LATIN SMALL LETTER E WITH DIAERESIS
  _   _ @
 (_)_(_)@
  / _ \\ @
 |  __/ @
  \\___| @
        @@
236  LATIN SMALL LETTER I WITH GRAVE
 __ @
 \\_\\@
 | |@
 | |@
 |_|@
    @@
237  LATIN SMALL LETTER I WITH ACUTE
  __@
 /_/@
 | |@
 | |@
 |_|@
    @@
238  LATIN SMALL LETTER I WITH CIRCUMFLEX
  //\\ @
 |/_\\|@
  | | @
  | | @
  |_| @
      @@
239  LATIN SMALL LETTER I WITH DIAERESIS
  _   _ @
 (_)_(_)@
   | |  @
   | |  @
   |_|  @
        @@
240  LATIN SMALL LETTER ETH
   /\\/\\ @
   >  < @
  _\\/\\ |@
 / __\` |@
 \\____/ @
        @@
241  LATIN SMALL LETTER N WITH TILDE
   /\\/| @
  |/\\/  @
 | '_ \\ @
 | | | |@
 |_| |_|@
        @@
242  LATIN SMALL LETTER O WITH GRAVE
   __   @
   \\_\\  @
  / _ \\ @
 | (_) |@
  \\___/ @
        @@
243  LATIN SMALL LETTER O WITH ACUTE
    __  @
   /_/  @
  / _ \\ @
 | (_) |@
  \\___/ @
        @@
244  LATIN SMALL LETTER O WITH CIRCUMFLEX
   //\\  @
  |/_\\| @
  / _ \\ @
 | (_) |@
  \\___/ @
        @@
245  LATIN SMALL LETTER O WITH TILDE
   /\\/| @
  |/\\/  @
  / _ \\ @
 | (_) |@
  \\___/ @
        @@
246  LATIN SMALL LETTER O WITH DIAERESIS
  _   _ @
 (_)_(_)@
  / _ \\ @
 | (_) |@
  \\___/ @
        @@
247  DIVISION SIGN
        @
    _   @
  _(_)_ @
 |_____|@
   (_)  @
        @@
248  LATIN SMALL LETTER O WITH STROKE
         @
   ____  @
  / _//\\ @
 | (//) |@
  \\//__/ @
         @@
249  LATIN SMALL LETTER U WITH GRAVE
   __   @
  _\\_\\_ @
 | | | |@
 | |_| |@
  \\__,_|@
        @@
250  LATIN SMALL LETTER U WITH ACUTE
    __  @
  _/_/_ @
 | | | |@
 | |_| |@
  \\__,_|@
        @@
251  LATIN SMALL LETTER U WITH CIRCUMFLEX
   //\\  @
  |/ \\| @
 | | | |@
 | |_| |@
  \\__,_|@
        @@
252  LATIN SMALL LETTER U WITH DIAERESIS
  _   _ @
 (_) (_)@
 | | | |@
 | |_| |@
  \\__,_|@
        @@
253  LATIN SMALL LETTER Y WITH ACUTE
    __  @
  _/_/_ @
 | | | |@
 | |_| |@
  \\__, |@
  |___/ @@
254  LATIN SMALL LETTER THORN
  _     @
 | |__  @
 | '_ \\ @
 | |_) |@
 | .__/ @
 |_|    @@
255  LATIN SMALL LETTER Y WITH DIAERESIS
  _   _ @
 (_) (_)@
 | | | |@
 | |_| |@
  \\__, |@
  |___/ @@
0x0100  LATIN CAPITAL LETTER A WITH MACRON
   ____ @
  /___/ @
   /_\\  @
  / _ \\ @
 /_/ \\_\\@
        @@
0x0101  LATIN SMALL LETTER A WITH MACRON
    ___ @
   /_ _/@
  / _\` |@
 | (_| |@
  \\__,_|@
        @@
0x0102  LATIN CAPITAL LETTER A WITH BREVE
  _   _ @
  \\\\_// @
   /_\\  @
  / _ \\ @
 /_/ \\_\\@
        @@
0x0103  LATIN SMALL LETTER A WITH BREVE
   \\_/  @
   ___  @
  / _\` |@
 | (_| |@
  \\__,_|@
        @@
0x0104  LATIN CAPITAL LETTER A WITH OGONEK
        @
    _   @
   /_\\  @
  / _ \\ @
 /_/ \\_\\@
     (_(@@
0x0105  LATIN SMALL LETTER A WITH OGONEK
        @
   __ _ @
  / _\` |@
 | (_| |@
  \\__,_|@
     (_(@@
0x0106  LATIN CAPITAL LETTER C WITH ACUTE
     __ @
   _/_/ @
  / ___|@
 | |___ @
  \\____|@
        @@
0x0107  LATIN SMALL LETTER C WITH ACUTE
    __ @
   /__/@
  / __|@
 | (__ @
  \\___|@
       @@
0x0108  LATIN CAPITAL LETTER C WITH CIRCUMFLEX
     /\\ @
   _//\\\\@
  / ___|@
 | |___ @
  \\____|@
        @@
0x0109  LATIN SMALL LETTER C WITH CIRCUMFLEX
    /\\ @
   /_\\ @
  / __|@
 | (__ @
  \\___|@
       @@
0x010A  LATIN CAPITAL LETTER C WITH DOT ABOVE
    []  @
   ____ @
  / ___|@
 | |___ @
  \\____|@
        @@
0x010B  LATIN SMALL LETTER C WITH DOT ABOVE
   []  @
   ___ @
  / __|@
 | (__ @
  \\___|@
       @@
0x010C  LATIN CAPITAL LETTER C WITH CARON
   \\\\// @
   _\\/_ @
  / ___|@
 | |___ @
  \\____|@
        @@
0x010D  LATIN SMALL LETTER C WITH CARON
   \\\\//@
   _\\/ @
  / __|@
 | (__ @
  \\___|@
       @@
0x010E  LATIN CAPITAL LETTER D WITH CARON
   \\\\// @
  __\\/  @
 |  _ \\ @
 | |_| |@
 |____/ @
        @@
0x010F  LATIN SMALL LETTER D WITH CARON
  \\/  _ @
   __| |@
  / _\` |@
 | (_| |@
  \\__,_|@
        @@
0x0110  LATIN CAPITAL LETTER D WITH STROKE
   ____   @
  |_ __ \\ @
 /| |/ | |@
 /|_|/_| |@
  |_____/ @
          @@
0x0111  LATIN SMALL LETTER D WITH STROKE
    ---|@
   __| |@
  / _\` |@
 | (_| |@
  \\__,_|@
        @@
0x0112  LATIN CAPITAL LETTER E WITH MACRON
   ____ @
  /___/ @
 | ____|@
 |  _|_ @
 |_____|@
        @@
0x0113  LATIN SMALL LETTER E WITH MACRON
    ____@
   /_ _/@
  / _ \\ @
 |  __/ @
  \\___| @
        @@
0x0114  LATIN CAPITAL LETTER E WITH BREVE
  _   _ @
  \\\\_// @
 | ____|@
 |  _|_ @
 |_____|@
        @@
0x0115  LATIN SMALL LETTER E WITH BREVE
  \\\\  //@
    --  @
  / _ \\ @
 |  __/ @
  \\___| @
        @@
0x0116  LATIN CAPITAL LETTER E WITH DOT ABOVE
    []  @
  _____ @
 | ____|@
 |  _|_ @
 |_____|@
        @@
0x0117  LATIN SMALL LETTER E WITH DOT ABOVE
    [] @
    __ @
  / _ \\@
 |  __/@
  \\___|@
       @@
0x0118  LATIN CAPITAL LETTER E WITH OGONEK
        @
  _____ @
 | ____|@
 |  _|_ @
 |_____|@
    (__(@@
0x0119  LATIN SMALL LETTER E WITH OGONEK
       @
   ___ @
  / _ \\@
 |  __/@
  \\___|@
    (_(@@
0x011A  LATIN CAPITAL LETTER E WITH CARON
   \\\\// @
  __\\/_ @
 | ____|@
 |  _|_ @
 |_____|@
        @@
0x011B  LATIN SMALL LETTER E WITH CARON
   \\\\//@
    \\/ @
  / _ \\@
 |  __/@
  \\___|@
       @@
0x011C  LATIN CAPITAL LETTER G WITH CIRCUMFLEX
   _/\\_ @
  / ___|@
 | |  _ @
 | |_| |@
  \\____|@
        @@
0x011D  LATIN SMALL LETTER G WITH CIRCUMFLEX
     /\\ @
   _/_ \\@
  / _\` |@
 | (_| |@
  \\__, |@
  |___/ @@
0x011E  LATIN CAPITAL LETTER G WITH BREVE
   _\\/_ @
  / ___|@
 | |  _ @
 | |_| |@
  \\____|@
        @@
0x011F  LATIN SMALL LETTER G WITH BREVE
  \\___/ @
   __ _ @
  / _\` |@
 | (_| |@
  \\__, |@
  |___/ @@
0x0120  LATIN CAPITAL LETTER G WITH DOT ABOVE
   _[]_ @
  / ___|@
 | |  _ @
 | |_| |@
  \\____|@
        @@
0x0121  LATIN SMALL LETTER G WITH DOT ABOVE
   []   @
   __ _ @
  / _\` |@
 | (_| |@
  \\__, |@
  |___/ @@
0x0122  LATIN CAPITAL LETTER G WITH CEDILLA
   ____ @
  / ___|@
 | |  _ @
 | |_| |@
  \\____|@
   )__) @@
0x0123  LATIN SMALL LETTER G WITH CEDILLA
        @
   __ _ @
  / _\` |@
 | (_| |@
  \\__, |@
  |_))))@@
0x0124  LATIN CAPITAL LETTER H WITH CIRCUMFLEX
  _/ \\_ @
 | / \\ |@
 | |_| |@
 |  _  |@
 |_| |_|@
        @@
0x0125  LATIN SMALL LETTER H WITH CIRCUMFLEX
  _  /\\ @
 | |//\\ @
 | '_ \\ @
 | | | |@
 |_| |_|@
        @@
0x0126  LATIN CAPITAL LETTER H WITH STROKE
  _   _ @
 | |=| |@
 | |_| |@
 |  _  |@
 |_| |_|@
        @@
0x0127  LATIN SMALL LETTER H WITH STROKE
  _     @
 |=|__  @
 | '_ \\ @
 | | | |@
 |_| |_|@
        @@
0x0128  LATIN CAPITAL LETTER I WITH TILDE
  /\\//@
 |_ _|@
  | | @
  | | @
 |___|@
      @@
0x0129  LATIN SMALL LETTER I WITH TILDE
    @
 /\\/@
 | |@
 | |@
 |_|@
    @@
0x012A  LATIN CAPITAL LETTER I WITH MACRON
 /___/@
 |_ _|@
  | | @
  | | @
 |___|@
      @@
0x012B  LATIN SMALL LETTER I WITH MACRON
  ____@
 /___/@
  | | @
  | | @
  |_| @
      @@
0x012C  LATIN CAPITAL LETTER I WITH BREVE
  \\__/@
 |_ _|@
  | | @
  | | @
 |___|@
      @@
0x012D  LATIN SMALL LETTER I WITH BREVE
    @
 \\_/@
 | |@
 | |@
 |_|@
    @@
0x012E  LATIN CAPITAL LETTER I WITH OGONEK
  ___ @
 |_ _|@
  | | @
  | | @
 |___|@
  (__(@@
0x012F  LATIN SMALL LETTER I WITH OGONEK
  _  @
 (_) @
 | | @
 | | @
 |_|_@
  (_(@@
0x0130  LATIN CAPITAL LETTER I WITH DOT ABOVE
  _[] @
 |_ _|@
  | | @
  | | @
 |___|@
      @@
0x0131  LATIN SMALL LETTER DOTLESS I
    @
  _ @
 | |@
 | |@
 |_|@
    @@
0x0132  LATIN CAPITAL LIGATURE IJ
  ___  _ @
 |_ _|| |@
  | | | |@
  | |_| |@
 |__|__/ @
         @@
0x0133  LATIN SMALL LIGATURE IJ
  _   _ @
 (_) (_)@
 | | | |@
 | | | |@
 |_|_/ |@
   |__/ @@
0x0134  LATIN CAPITAL LETTER J WITH CIRCUMFLEX
      /\\ @
     /_\\|@
  _  | | @
 | |_| | @
  \\___/  @
         @@
0x0135  LATIN SMALL LETTER J WITH CIRCUMFLEX
    /\\@
   /_\\@
   | |@
   | |@
  _/ |@
 |__/ @@
0x0136  LATIN CAPITAL LETTER K WITH CEDILLA
  _  _  @
 | |/ / @
 | ' /  @
 | . \\  @
 |_|\\_\\ @
    )__)@@
0x0137  LATIN SMALL LETTER K WITH CEDILLA
  _    @
 | | __@
 | |/ /@
 |   < @
 |_|\\_\\@
    )_)@@
0x0138  LATIN SMALL LETTER KRA
       @
  _ __ @
 | |/ \\@
 |   < @
 |_|\\_\\@
       @@
0x0139  LATIN CAPITAL LETTER L WITH ACUTE
  _   //@
 | | // @
 | |    @
 | |___ @
 |_____|@
        @@
0x013A  LATIN SMALL LETTER L WITH ACUTE
  //@
 | |@
 | |@
 | |@
 |_|@
    @@
0x013B  LATIN CAPITAL LETTER L WITH CEDILLA
  _     @
 | |    @
 | |    @
 | |___ @
 |_____|@
    )__)@@
0x013C  LATIN SMALL LETTER L WITH CEDILLA
  _   @
 | |  @
 | |  @
 | |  @
 |_|  @
   )_)@@
0x013D  LATIN CAPITAL LETTER L WITH CARON
  _ \\\\//@
 | | \\/ @
 | |    @
 | |___ @
 |_____|@
        @@
0x013E  LATIN SMALL LETTER L WITH CARON
  _ \\\\//@
 | | \\/ @
 | |    @
 | |    @
 |_|    @
        @@
0x013F  LATIN CAPITAL LETTER L WITH MIDDLE DOT
  _     @
 | |    @
 | | [] @
 | |___ @
 |_____|@
        @@
0x0140  LATIN SMALL LETTER L WITH MIDDLE DOT
  _    @
 | |   @
 | | []@
 | |   @
 |_|   @
       @@
0x0141  LATIN CAPITAL LETTER L WITH STROKE
  __    @
 | //   @
 |//|   @
 // |__ @
 |_____|@
        @@
0x0142  LATIN SMALL LETTER L WITH STROKE
  _ @
 | |@
 |//@
 //|@
 |_|@
    @@
0x0143  LATIN CAPITAL LETTER N WITH ACUTE
  _/ /_ @
 | \\ | |@
 |  \\| |@
 | |\\  |@
 |_| \\_|@
        @@
0x0144  LATIN SMALL LETTER N WITH ACUTE
     _  @
  _ /_/ @
 | '_ \\ @
 | | | |@
 |_| |_|@
        @@
0x0145  LATIN CAPITAL LETTER N WITH CEDILLA
  _   _ @
 | \\ | |@
 |  \\| |@
 | |\\  |@
 |_| \\_|@
 )_)    @@
0x0146  LATIN SMALL LETTER N WITH CEDILLA
        @
  _ __  @
 | '_ \\ @
 | | | |@
 |_| |_|@
 )_)    @@
0x0147  LATIN CAPITAL LETTER N WITH CARON
  _\\/ _ @
 | \\ | |@
 |  \\| |@
 | |\\  |@
 |_| \\_|@
        @@
0x0148  LATIN SMALL LETTER N WITH CARON
  \\\\//  @
  _\\/_  @
 | '_ \\ @
 | | | |@
 |_| |_|@
        @@
0x0149  LATIN SMALL LETTER N PRECEDED BY APOSTROPHE
          @
  _  __   @
 ( )| '_\\ @
 |/| | | |@
   |_| |_|@
          @@
0x014A  LATIN CAPITAL LETTER ENG
  _   _ @
 | \\ | |@
 |  \\| |@
 | |\\  |@
 |_| \\ |@
     )_)@@
0x014B  LATIN SMALL LETTER ENG
  _ __  @
 | '_ \\ @
 | | | |@
 |_| | |@
     | |@
    |__ @@
0x014C  LATIN CAPITAL LETTER O WITH MACRON
   ____ @
  /_ _/ @
  / _ \\ @
 | (_) |@
  \\___/ @
        @@
0x014D  LATIN SMALL LETTER O WITH MACRON
   ____ @
  /_ _/ @
  / _ \\ @
 | (_) |@
  \\___/ @
        @@
0x014E  LATIN CAPITAL LETTER O WITH BREVE
  \\   / @
   _-_  @
  / _ \\ @
 | |_| |@
  \\___/ @
        @@
0x014F  LATIN SMALL LETTER O WITH BREVE
  \\   / @
   _-_  @
  / _ \\ @
 | |_| |@
  \\___/ @
        @@
0x0150  LATIN CAPITAL LETTER O WITH DOUBLE ACUTE
    ___ @
   /_/_/@
  / _ \\ @
 | |_| |@
  \\___/ @
        @@
0x0151  LATIN SMALL LETTER O WITH DOUBLE ACUTE
    ___ @
   /_/_/@
  / _ \\ @
 | |_| |@
  \\___/ @
        @@
0x0152  LATIN CAPITAL LIGATURE OE
   ___  ___ @
  / _ \\| __|@
 | | | |  | @
 | |_| | |__@
  \\___/|____@
            @@
0x0153  LATIN SMALL LIGATURE OE
             @
   ___   ___ @
  / _ \\ / _ \\@
 | (_) |  __/@
  \\___/ \\___|@
             @@
0x0154  LATIN CAPITAL LETTER R WITH ACUTE
  _/_/  @
 |  _ \\ @
 | |_) |@
 |  _ < @
 |_| \\_\\@
        @@
0x0155  LATIN SMALL LETTER R WITH ACUTE
     __@
  _ /_/@
 | '__|@
 | |   @
 |_|   @
       @@
0x0156  LATIN CAPITAL LETTER R WITH CEDILLA
  ____  @
 |  _ \\ @
 | |_) |@
 |  _ < @
 |_| \\_\\@
 )_)    @@
0x0157  LATIN SMALL LETTER R WITH CEDILLA
       @
  _ __ @
 | '__|@
 | |   @
 |_|   @
   )_) @@
0x0158  LATIN CAPITAL LETTER R WITH CARON
  _\\_/  @
 |  _ \\ @
 | |_) |@
 |  _ < @
 |_| \\_\\@
        @@
0x0159  LATIN SMALL LETTER R WITH CARON
  \\\\// @
  _\\/_ @
 | '__|@
 | |   @
 |_|   @
       @@
0x015A  LATIN CAPITAL LETTER S WITH ACUTE
  _/_/  @
 / ___| @
 \\___ \\ @
  ___) |@
 |____/ @
        @@
0x015B  LATIN SMALL LETTER S WITH ACUTE
    __@
  _/_/@
 / __|@
 \\__ \\@
 |___/@
      @@
0x015C  LATIN CAPITAL LETTER S WITH CIRCUMFLEX
  _/\\_  @
 / ___| @
 \\___ \\ @
  ___) |@
 |____/ @
        @@
0x015D  LATIN SMALL LETTER S WITH CIRCUMFLEX
      @
  /_\\_@
 / __|@
 \\__ \\@
 |___/@
      @@
0x015E  LATIN CAPITAL LETTER S WITH CEDILLA
  ____  @
 / ___| @
 \\___ \\ @
  ___) |@
 |____/ @
    )__)@@
0x015F  LATIN SMALL LETTER S WITH CEDILLA
      @
  ___ @
 / __|@
 \\__ \\@
 |___/@
   )_)@@
0x0160  LATIN CAPITAL LETTER S WITH CARON
  _\\_/  @
 / ___| @
 \\___ \\ @
  ___) |@
 |____/ @
        @@
0x0161  LATIN SMALL LETTER S WITH CARON
  \\\\//@
  _\\/ @
 / __|@
 \\__ \\@
 |___/@
      @@
0x0162  LATIN CAPITAL LETTER T WITH CEDILLA
  _____ @
 |_   _|@
   | |  @
   | |  @
   |_|  @
    )__)@@
0x0163  LATIN SMALL LETTER T WITH CEDILLA
  _   @
 | |_ @
 | __|@
 | |_ @
  \\__|@
   )_)@@
0x0164  LATIN CAPITAL LETTER T WITH CARON
  _____ @
 |_   _|@
   | |  @
   | |  @
   |_|  @
        @@
0x0165  LATIN SMALL LETTER T WITH CARON
  \\/  @
 | |_ @
 | __|@
 | |_ @
  \\__|@
      @@
0x0166  LATIN CAPITAL LETTER T WITH STROKE
  _____ @
 |_   _|@
   | |  @
  -|-|- @
   |_|  @
        @@
0x0167  LATIN SMALL LETTER T WITH STROKE
  _   @
 | |_ @
 | __|@
 |-|_ @
  \\__|@
      @@
0x0168  LATIN CAPITAL LETTER U WITH TILDE
        @
  _/\\/_ @
 | | | |@
 | |_| |@
  \\___/ @
        @@
0x0169  LATIN SMALL LETTER U WITH TILDE
        @
  _/\\/_ @
 | | | |@
 | |_| |@
  \\__,_|@
        @@
0x016A  LATIN CAPITAL LETTER U WITH MACRON
   ____ @
  /__ _/@
 | | | |@
 | |_| |@
  \\___/ @
        @@
0x016B  LATIN SMALL LETTER U WITH MACRON
   ____ @
  / _  /@
 | | | |@
 | |_| |@
  \\__,_|@
        @@
0x016C  LATIN CAPITAL LETTER U WITH BREVE
        @
   \\_/_ @
 | | | |@
 | |_| |@
  \\____|@
        @@
0x016D  LATIN SMALL LETTER U WITH BREVE
        @
   \\_/_ @
 | | | |@
 | |_| |@
  \\__,_|@
        @@
0x016E  LATIN CAPITAL LETTER U WITH RING ABOVE
    O   @
  __  _ @
 | | | |@
 | |_| |@
  \\___/ @
        @@
0x016F  LATIN SMALL LETTER U WITH RING ABOVE
    O   @
  __ __ @
 | | | |@
 | |_| |@
  \\__,_|@
        @@
0x0170  LATIN CAPITAL LETTER U WITH DOUBLE ACUTE
   -- --@
  /_//_/@
 | | | |@
 | |_| |@
  \\___/ @
        @@
0x0171  LATIN SMALL LETTER U WITH DOUBLE ACUTE
    ____@
  _/_/_/@
 | | | |@
 | |_| |@
  \\__,_|@
        @@
0x0172  LATIN CAPITAL LETTER U WITH OGONEK
  _   _ @
 | | | |@
 | | | |@
 | |_| |@
  \\___/ @
    (__(@@
0x0173  LATIN SMALL LETTER U WITH OGONEK
        @
  _   _ @
 | | | |@
 | |_| |@
  \\__,_|@
     (_(@@
0x0174  LATIN CAPITAL LETTER W WITH CIRCUMFLEX
 __    /\\  __@
 \\ \\  //\\\\/ /@
  \\ \\ /\\ / / @
   \\ V  V /  @
    \\_/\\_/   @
             @@
0x0175  LATIN SMALL LETTER W WITH CIRCUMFLEX
      /\\   @
 __  //\\\\__@
 \\ \\ /\\ / /@
  \\ V  V / @
   \\_/\\_/  @
           @@
0x0176  LATIN CAPITAL LETTER Y WITH CIRCUMFLEX
    /\\  @
 __//\\\\ @
 \\ \\ / /@
  \\ V / @
   |_|  @
        @@
0x0177  LATIN SMALL LETTER Y WITH CIRCUMFLEX
    /\\  @
   //\\\\ @
 | | | |@
 | |_| |@
  \\__, |@
  |___/ @@
0x0178  LATIN CAPITAL LETTER Y WITH DIAERESIS
  []  []@
 __    _@
 \\ \\ / /@
  \\ V / @
   |_|  @
        @@
0x0179  LATIN CAPITAL LETTER Z WITH ACUTE
  __/_/@
 |__  /@
   / / @
  / /_ @
 /____|@
       @@
0x017A  LATIN SMALL LETTER Z WITH ACUTE
    _ @
  _/_/@
 |_  /@
  / / @
 /___|@
      @@
0x017B  LATIN CAPITAL LETTER Z WITH DOT ABOVE
  __[]_@
 |__  /@
   / / @
  / /_ @
 /____|@
       @@
0x017C  LATIN SMALL LETTER Z WITH DOT ABOVE
   [] @
  ____@
 |_  /@
  / / @
 /___|@
      @@
0x017D  LATIN CAPITAL LETTER Z WITH CARON
  _\\_/_@
 |__  /@
   / / @
  / /_ @
 /____|@
       @@
0x017E  LATIN SMALL LETTER Z WITH CARON
  \\\\//@
  _\\/_@
 |_  /@
  / / @
 /___|@
      @@
0x017F  LATIN SMALL LETTER LONG S
     __ @
    / _|@
 |-| |  @
 |-| |  @
   |_|  @
        @@
0x02C7  CARON
 \\\\//@
  \\/ @
    $@
    $@
    $@
    $@@
0x02D8  BREVE
 \\\\_//@
  \\_/ @
     $@
     $@
     $@
     $@@
0x02D9  DOT ABOVE
 []@
  $@
  $@
  $@
  $@
  $@@
0x02DB  OGONEK
    $@
    $@
    $@
    $@
    $@
 )_) @@
0x02DD  DOUBLE ACUTE ACCENT
  _ _ @
 /_/_/@
     $@
     $@
     $@
     $@@
0xCA0  KANNADA LETTER TTHA
   _____)@
  /_ ___/@
  / _ \\  @
 | (_) | @
 $\\___/$ @
         @@
         `;var pr=oe(Tc()),Ug=pr.default.green,Vg=pr.default.yellow,Wg=pr.default.bold.red;function Lc(n){let e=Ug(`${n.passed.length} validation passed`),t=Wg(`${n.failed.length} validation failed`),r=n.warning.length>0?Vg(`${n.warning.length} warning(s)`):void 0;n.failed.length===0?console.log(`\u2705[${n.name}] ${e}${r?`, ${r}`:""}.`):(console.log(`\u274C[${n.name}] ${t}${r?`, ${r}`:""}, ${e}.`),console.log(n.failed.map(i=>`  \u274C ${i}`).join(`
`))),n.warning.length>0&&console.log(n.warning.map(i=>`  \u26A0\uFE0F ${i}`).join(`
`)),n.passed.length>0&&console.log(n.passed.map(i=>`  \u2705 ${i}`).join(`
`))}var bf=oe(vc()),Js=oe(it()),Xs=oe(require("path"));var Et=oe(it()),qt=oe(require("path"));function wf(n){let e=[],t=process.env.SAMPLE_VALIDATOR_CONFIG_PATH;return t&&Et.default.existsSync(t)&&e.push(t),e.push(qt.default.join(n,"..",".config","samples-config-v3.json"),qt.default.join(n,".config","samples-config-v3.json")),e}function vr(n){let e=process.env.SAMPLE_VALIDATOR_EXPECTED_ID;return e||qt.default.basename(n)}async function vf(n){let e=vr(n),t=wf(n);for(let r of t)if(await Et.default.exists(r))try{let s=(await Et.default.readJson(r)).samples.find(o=>o.id===e);if(s)return{thumbnailPath:s.thumbnailPath,gifPath:s.gifPath}}catch{}return{}}async function pE(n){let e=vr(n),t=wf(n);for(let r of t)if(await Et.default.exists(r))try{let s=(await Et.default.readJson(r)).samples.find(o=>o.id===e);if(s&&s.tags)return s.tags.includes("C#")}catch{}return!1}async function Ue(n){let e=await pE(n),t=qt.default.join(n,"M365Agent"),r=qt.default.join(t,"m365agents.yml"),i=await Et.default.exists(r);return e||i?{projectType:"csharp",rootDir:n,agentDir:i?t:n,displayPrefix:i?"M365Agent/":""}:{projectType:"typescript",rootDir:n,agentDir:n,displayPrefix:""}}async function zs(n){let e={name:"Env Files",passed:[],failed:[],warning:[]},t=await Ue(n),{agentDir:r,displayPrefix:i,projectType:s}=t,o=[".env.dev",".env.local"],a=!1;for(let l of o){let c=Xs.default.join(r,"env",l);if(!await Js.default.exists(c)){if(s==="csharp")continue;e.warning.push(`${i}${Xs.default.join("env",l)} does not exist.`);continue}a=!0;let u=await Js.default.readFile(c,"utf8"),f=bf.default.parse(u),p=Object.entries(f).map(([y,g])=>({name:y,value:g})),h=!0;for(let y of p)y.name==="TEAMSFX_ENV"||y.name==="APP_NAME_SUFFIX"||y.name==="TEAMS_APP_NAME"||y.value!==""&&(e.failed.push(`${i}${l}: ${y.name} should NOT have value.`),h=!1);h&&e.passed.push(`${i}${l}: All environment variables are valid.`)}return s==="csharp"&&!a&&e.passed.push("C# project does not require env files."),e}var st=oe(it()),hn=oe(require("path"));var _E=["appPackage"],mE=["appPackage/manifest.json","appPackage/color.png","appPackage/outline.png","m365agents.yml","m365agents.local.yml"],gE=["README.md"],yE=["env/.env.dev"],EE=["env",".vscode"];async function Qs(n,e){let t=hn.default.join(n,e);return await st.default.exists(t)?(await st.default.stat(t)).isDirectory():!1}async function xt(n,e){let t=hn.default.join(n,e);return await st.default.exists(t)?(await st.default.stat(t)).isFile():!1}async function br(n,e){return await st.default.exists(n)?(await st.default.readdir(n)).filter(r=>r.endsWith(e)):[]}async function Zs(n){let e={name:"Folder Structure",passed:[],failed:[],warning:[]},t=await Ue(n),{agentDir:r,rootDir:i,displayPrefix:s,projectType:o}=t;for(let a of _E){let l=s+a;await Qs(r,a)?e.passed.push(`Project has "${l}" folder.`):e.failed.push(`Project should have "${l}" folder.`)}for(let a of EE){let l=await Qs(r,a),c=await Qs(i,a);if(l||c){let u=l?s+a:a;e.passed.push(`Project has "${u}" folder.`)}else o==="typescript"&&e.failed.push(`Project should have "${a}" folder.`)}for(let a of mE){let l=s+a;await xt(r,a)?e.passed.push(`Project has "${l}" file.`):e.failed.push(`Project should have "${l}" file.`)}for(let a of gE)await xt(i,a)?e.passed.push(`Project has "${a}" file.`):e.failed.push(`Project should have "${a}" file.`);for(let a of yE){let l=await xt(r,a),c=await xt(i,a);if(l||c){let u=l?s+a:a;e.passed.push(`Project has "${u}" file.`)}else o==="typescript"&&e.failed.push(`Project should have "${a}" file.`)}if(o==="csharp"){let a=await br(i,".sln"),l=await br(i,".slnx");if(a.length>0||l.length>0){let g=a.length>0?a[0]:l[0];e.passed.push(`Project has solution file "${g}".`)}else e.failed.push("C# project should have a .sln or .slnx solution file.");let c=await br(i,".csproj"),u=c.length>0,f=c.length>0?c[0]:"",p=["M365Agent","TravelAgent","AzureAgentToM365ATK"];for(let g of p){let m=hn.default.join(i,g);if(await st.default.exists(m)){let L=await br(m,".csproj");if(L.length>0){u=!0,f=`${g}/${L[0]}`;break}}}u?e.passed.push(`Project has .csproj file "${f}".`):e.failed.push("C# project should have a .csproj project file.");let h=await xt(i,"appsettings.json"),y="appsettings.json";if(!h)for(let g of p){let m=hn.default.join(i,g);if(await xt(m,"appsettings.json")){h=!0,y=`${g}/appsettings.json`;break}}h?e.passed.push(`Project has "${y}" file.`):e.failed.push("C# project should have an appsettings.json file.")}return e}var _n=oe(it()),mn=oe(require("path")),gn=oe(uh());async function _o(n){let e={name:"Image Files",passed:[],failed:[],warning:[]},t=await vf(n);if(t.thumbnailPath){let r=mn.default.join(n,t.thumbnailPath);if(await _n.default.exists(r)){let i=(0,gn.default)(r);i.width&&i.height&&i.width/i.height===40/23?e.passed.push(`${t.thumbnailPath} has 1600*920/800*460 resolution or same ratio.`):e.failed.push(`${t.thumbnailPath} must have 1600*920/800*460 resolution or same ratio (40:23 aspect ratio). Current: ${i.width}x${i.height}.`)}else e.failed.push(`${t.thumbnailPath} is required to display in sample gallery but does not exist.`)}else{let r=["png","jpg","jpeg"],i=!1;for(let s of r){let o=mn.default.join(n,"assets",`thumbnail.${s}`);if(await _n.default.exists(o)){i=!0;let a=(0,gn.default)(o);a.width&&a.height&&a.width/a.height===40/23?e.passed.push(`assets/thumbnail.${s} has 1600*920/800*460 resolution or same ratio.`):e.failed.push(`assets/thumbnail.${s} must have 1600*920/800*460 resolution or same ratio (40:23 aspect ratio). Current: ${a.width}x${a.height}.`);break}}i||e.failed.push("Thumbnail image is required to display in sample gallery. Please add thumbnailPath to samples-config-v3.json or add assets/thumbnail.png.")}if(t.gifPath){let r=mn.default.join(n,t.gifPath);if(await _n.default.exists(r)){let i=(0,gn.default)(r);i.width&&i.height&&i.width/i.height===40/23?e.passed.push(`${t.gifPath} has 1600*920/800*460 resolution or same ratio.`):e.warning.push(`${t.gifPath} does not have 40:23 aspect ratio. Current: ${i.width}x${i.height}. (Optional)`)}else e.warning.push(`${t.gifPath} does not exist. (Optional)`)}else{let r=mn.default.join(n,"assets","sampleDemo.gif");if(await _n.default.exists(r)){let i=(0,gn.default)(r);i.width&&i.height&&i.width/i.height===40/23?e.passed.push("assets/sampleDemo.gif has 1600*920/800*460 resolution or same ratio."):e.warning.push(`assets/sampleDemo.gif does not have 40:23 aspect ratio. Current: ${i.width}x${i.height}. (Optional)`)}else e.warning.push("Sample demo gif does not exist. (Optional)")}return e}var dh=oe(hh()),mo=oe(it()),ph=oe(require("path"));async function go(n){let e={name:"package.json",passed:[],failed:[],warning:[]},t=await Ue(n),{projectType:r}=t,i=ph.default.join(n,"package.json");if(!await mo.default.exists(i))return r==="csharp"?(e.passed=["C# project does not require package.json."],e):(e.failed=["package.json does not exist."],e);let s=await mo.default.readFile(i,"utf8");try{let o=JSON.parse(s);if(!o.engines||!o.engines.node)return e.warning=["package.json does not have 'engines.node' field."],e;if(!(0,dh.satisfies)("22.0.0",o.engines.node))return e.warning=["'engines.node' field should be compatible with 22."],e}catch{return e.failed=["package.json is not a valid JSON file."],e}return e.passed=["'engines.node' field is compatible with 22."],e}var xo=oe(it()),op=oe(require("path")),Mo=oe(rp());var ip="1.22.0",sp="devPreview";async function Fo(n){let e={name:"App Manifest",passed:[],failed:[],warning:[]},t=await Ue(n),{agentDir:r,displayPrefix:i}=t,s=op.default.join(r,"appPackage","manifest.json");if(!await xo.default.exists(s))return e.failed=[`${i}appPackage/manifest.json does not exist.`],e;let o=await xo.default.readFile(s,"utf8"),a;try{a=JSON.parse(o)}catch{}if(!a)return e.failed.push("appPackage/manifest.json is not a valid JSON file."),e;let l=a.id;if(!l||l!=="${{TEAMS_APP_ID}}"?e.failed.push("id should be equal to '${{TEAMS_APP_ID}}'."):e.passed.push("id is referencing placeholder from env: ${{TEAMS_APP_ID}}."),a.manifestVersion===sp)e.warning.push(`Manifest version(${sp}) is using preview version.`);else{let c=Mo.default.coerce(a.manifestVersion);c&&Mo.default.eq(c,ip)?e.passed.push("Manifest version is aligned with Microsoft 365 Agents Toolkit."):e.warning.push(`Manifest version(${a.manifestVersion}) is NOT aligned with Microsoft 365 Agents Toolkit(${ip}).`)}return e}var Qt=oe(it()),rs=oe(require("path")),Gm=oe(Wm());var rb={"bot-sso-docker":"sso-bot-docker","NPM-search-connector-M365":"npm-search-connector-M365","sso-enabled-tab-via-apim-proxy":"sso-tab-via-apim-proxy","hello-world-tab-docker":"hello-world-tab-with-backend","copilot-connector-app":"graph-connector-app","graph-rsc-helper":"graph-rsc-nodeJs"};function ib(n){let e=[],t=process.env.SAMPLE_VALIDATOR_CONFIG_PATH;return t&&Qt.default.existsSync(t)&&e.push(t),e.push(rs.default.join(n,"..",".config","samples-config-v3.json"),rs.default.join(n,".config","samples-config-v3.json")),e}async function sb(n){let e=vr(n),t=ib(n);for(let r of t)if(await Qt.default.exists(r))try{let s=(await Qt.default.readJson(r)).samples.find(o=>o.id===e);if(s)return s.id}catch{}return null}var ob=[{name:"provision",actions:["teamsApp/create"],required:!0},{name:"deploy",actions:[],required:!0}],ab=[{name:"publish",actions:["teamsApp/publishAppPackage"]}];async function El(n){let e={name:"teamsapp.yaml",passed:[],failed:[],warning:[]},t=await Ue(n),{agentDir:r,displayPrefix:i}=t,s=rs.default.join(r,"m365agents.yml");if(!await Qt.default.exists(s))return e.failed=[`${i}m365agents.yml does not exist.`],e;let o=await Qt.default.readFile(s,"utf8"),a=Gm.default.parse(o),l=a&&a.projectId;l&&l!==""?e.failed.push("Project should NOT have projectId in m365agents.yml."):e.passed.push("Project has no projectId in m365agents.yml.");for(let h of ob){let y=a[h.name],g=[];if(!y){e.failed.push(`Project should have '${h.name}' stage in m365agents.yml.`);continue}for(let m of h.actions)if(y&&y.findIndex(L=>L.uses===m)<0&&g.push(`Project should have '${m}' action in ${h.name} stage.`),h.name==="provision"&&m==="teamsApp/create"){let L=y.findIndex(w=>w.uses===m);L>=0&&(y[L].writeToEnvironmentFile?.teamsAppId==="TEAMS_APP_ID"?e.passed.push("Project has 'teamsApp/create' action which has TEAMS_APP_ID env variable."):e.failed.push("Project should have 'teamsApp/create' action which has TEAMS_APP_ID env variable."))}g.length===0?e.passed.push(`Project has all mandatory actions in ${h.name} stage.`):e.failed.push(...g)}for(let h of ab){let y=a[h.name];if(!y){e.warning.push(`Project does not have '${h.name}' stage in m365agents.yml.`);continue}let g=!0;for(let m of h.actions)y.findIndex(L=>L.uses===m)<0&&(e.warning.push(`Project does not have '${m}' action in ${h.name} stage.`),g=!1);g&&e.passed.push(`Project has all actions in ${h.name} stage.`)}let c=/^([\w-]+):([\w-]+)$/g,u=a?.additionalMetadata?.sampleTag,f=await sb(n),p=!1;if(u&&u!==""){let h=c.exec(u);if(h){let y=h[1],g=h[2];if(e.passed.push("Project has sampleTag with format 'repo:name'."),p=!0,y!=="TeamsFx-Samples"&&e.warning.push("Project is an external sample."),f!==null){let m=rb[f];g===f||g===m?g===m?e.passed.push(`sampleTag name '${g}' matches allowed exception for sample id '${f}'.`):e.passed.push(`sampleTag name '${g}' matches sample id in config.`):e.failed.push(`sampleTag name '${g}' does not match sample id '${f}' in samples-config-v3.json.`)}}}return p||e.failed.push("Project should have sampleTag with format 'repo:name'."),e}var cb=Km(),Ym=new Ml,ub=[Zs,El,Fo,zs,_o,go];async function fb(){await Ym.version(cb.version).description("A tool to validate project content before onboarding to TeamsFx sample gallery.").option("-p, --path <path>","Path to the project folder to be validated.").parseAsync(process.argv);let n=Ym.opts(),e=process.cwd();n.path&&typeof n.path=="string"&&(e=n.path);for(let t of ub){let r=await t(e);Lc(r)}}is.parseFont("Standard",Hl);console.log(is.textSync("TeamsFx Sample Validator"));fb();
