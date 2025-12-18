#! /usr/bin/env node
"use strict";var Gm=Object.create;var El=Object.defineProperty;var Km=Object.getOwnPropertyDescriptor;var Ym=Object.getOwnPropertyNames;var Jm=Object.getPrototypeOf,Xm=Object.prototype.hasOwnProperty;var _=(n,e)=>()=>(e||n((e={exports:{}}).exports,e),e.exports);var zm=(n,e,t,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of Ym(e))!Xm.call(n,i)&&i!==t&&El(n,i,{get:()=>e[i],enumerable:!(r=Km(e,i))||r.enumerable});return n};var oe=(n,e,t)=>(t=n!=null?Gm(Jm(n)):{},zm(e||!n||!n.__esModule?El(t,"default",{value:n,enumerable:!0}):t,n));var zt=_(es=>{var zn=class extends Error{constructor(e,t,r){super(r),Error.captureStackTrace(this,this.constructor),this.name=this.constructor.name,this.code=t,this.exitCode=e,this.nestedError=void 0}},Zi=class extends zn{constructor(e){super(1,"commander.invalidArgument",e),Error.captureStackTrace(this,this.constructor),this.name=this.constructor.name}};es.CommanderError=zn;es.InvalidArgumentError=Zi});var Qn=_(ns=>{var{InvalidArgumentError:Qm}=zt(),ts=class{constructor(e,t){switch(this.description=t||"",this.variadic=!1,this.parseArg=void 0,this.defaultValue=void 0,this.defaultValueDescription=void 0,this.argChoices=void 0,e[0]){case"<":this.required=!0,this._name=e.slice(1,-1);break;case"[":this.required=!1,this._name=e.slice(1,-1);break;default:this.required=!0,this._name=e;break}this._name.length>3&&this._name.slice(-3)==="..."&&(this.variadic=!0,this._name=this._name.slice(0,-3))}name(){return this._name}_concatValue(e,t){return t===this.defaultValue||!Array.isArray(t)?[e]:t.concat(e)}default(e,t){return this.defaultValue=e,this.defaultValueDescription=t,this}argParser(e){return this.parseArg=e,this}choices(e){return this.argChoices=e.slice(),this.parseArg=(t,r)=>{if(!this.argChoices.includes(t))throw new Qm(`Allowed choices are ${this.argChoices.join(", ")}.`);return this.variadic?this._concatValue(t,r):t},this}argRequired(){return this.required=!0,this}argOptional(){return this.required=!1,this}};function Zm(n){let e=n.name()+(n.variadic===!0?"...":"");return n.required?"<"+e+">":"["+e+"]"}ns.Argument=ts;ns.humanReadableArgName=Zm});var is=_(Tl=>{var{humanReadableArgName:eg}=Qn(),rs=class{constructor(){this.helpWidth=void 0,this.sortSubcommands=!1,this.sortOptions=!1,this.showGlobalOptions=!1}visibleCommands(e){let t=e.commands.filter(r=>!r._hidden);if(e._hasImplicitHelpCommand()){let[,r,i]=e._helpCommandnameAndArgs.match(/([^ ]+) *(.*)/),s=e.createCommand(r).helpOption(!1);s.description(e._helpCommandDescription),i&&s.arguments(i),t.push(s)}return this.sortSubcommands&&t.sort((r,i)=>r.name().localeCompare(i.name())),t}compareOptions(e,t){let r=i=>i.short?i.short.replace(/^-/,""):i.long.replace(/^--/,"");return r(e).localeCompare(r(t))}visibleOptions(e){let t=e.options.filter(s=>!s.hidden),r=e._hasHelpOption&&e._helpShortFlag&&!e._findOption(e._helpShortFlag),i=e._hasHelpOption&&!e._findOption(e._helpLongFlag);if(r||i){let s;r?i?s=e.createOption(e._helpFlags,e._helpDescription):s=e.createOption(e._helpShortFlag,e._helpDescription):s=e.createOption(e._helpLongFlag,e._helpDescription),t.push(s)}return this.sortOptions&&t.sort(this.compareOptions),t}visibleGlobalOptions(e){if(!this.showGlobalOptions)return[];let t=[];for(let r=e.parent;r;r=r.parent){let i=r.options.filter(s=>!s.hidden);t.push(...i)}return this.sortOptions&&t.sort(this.compareOptions),t}visibleArguments(e){return e._argsDescription&&e._args.forEach(t=>{t.description=t.description||e._argsDescription[t.name()]||""}),e._args.find(t=>t.description)?e._args:[]}subcommandTerm(e){let t=e._args.map(r=>eg(r)).join(" ");return e._name+(e._aliases[0]?"|"+e._aliases[0]:"")+(e.options.length?" [options]":"")+(t?" "+t:"")}optionTerm(e){return e.flags}argumentTerm(e){return e.name()}longestSubcommandTermLength(e,t){return t.visibleCommands(e).reduce((r,i)=>Math.max(r,t.subcommandTerm(i).length),0)}longestOptionTermLength(e,t){return t.visibleOptions(e).reduce((r,i)=>Math.max(r,t.optionTerm(i).length),0)}longestGlobalOptionTermLength(e,t){return t.visibleGlobalOptions(e).reduce((r,i)=>Math.max(r,t.optionTerm(i).length),0)}longestArgumentTermLength(e,t){return t.visibleArguments(e).reduce((r,i)=>Math.max(r,t.argumentTerm(i).length),0)}commandUsage(e){let t=e._name;e._aliases[0]&&(t=t+"|"+e._aliases[0]);let r="";for(let i=e.parent;i;i=i.parent)r=i.name()+" "+r;return r+t+" "+e.usage()}commandDescription(e){return e.description()}subcommandDescription(e){return e.summary()||e.description()}optionDescription(e){let t=[];return e.argChoices&&t.push(`choices: ${e.argChoices.map(r=>JSON.stringify(r)).join(", ")}`),e.defaultValue!==void 0&&(e.required||e.optional||e.isBoolean()&&typeof e.defaultValue=="boolean")&&t.push(`default: ${e.defaultValueDescription||JSON.stringify(e.defaultValue)}`),e.presetArg!==void 0&&e.optional&&t.push(`preset: ${JSON.stringify(e.presetArg)}`),e.envVar!==void 0&&t.push(`env: ${e.envVar}`),t.length>0?`${e.description} (${t.join(", ")})`:e.description}argumentDescription(e){let t=[];if(e.argChoices&&t.push(`choices: ${e.argChoices.map(r=>JSON.stringify(r)).join(", ")}`),e.defaultValue!==void 0&&t.push(`default: ${e.defaultValueDescription||JSON.stringify(e.defaultValue)}`),t.length>0){let r=`(${t.join(", ")})`;return e.description?`${e.description} ${r}`:r}return e.description}formatHelp(e,t){let r=t.padWidth(e,t),i=t.helpWidth||80,s=2,o=2;function a(y,g){if(g){let m=`${y.padEnd(r+o)}${g}`;return t.wrap(m,i-s,r+o)}return y}function l(y){return y.join(`
`).replace(/^/gm," ".repeat(s))}let c=[`Usage: ${t.commandUsage(e)}`,""],u=t.commandDescription(e);u.length>0&&(c=c.concat([t.wrap(u,i,0),""]));let f=t.visibleArguments(e).map(y=>a(t.argumentTerm(y),t.argumentDescription(y)));f.length>0&&(c=c.concat(["Arguments:",l(f),""]));let d=t.visibleOptions(e).map(y=>a(t.optionTerm(y),t.optionDescription(y)));if(d.length>0&&(c=c.concat(["Options:",l(d),""])),this.showGlobalOptions){let y=t.visibleGlobalOptions(e).map(g=>a(t.optionTerm(g),t.optionDescription(g)));y.length>0&&(c=c.concat(["Global Options:",l(y),""]))}let h=t.visibleCommands(e).map(y=>a(t.subcommandTerm(y),t.subcommandDescription(y)));return h.length>0&&(c=c.concat(["Commands:",l(h),""])),c.join(`
`)}padWidth(e,t){return Math.max(t.longestOptionTermLength(e,t),t.longestGlobalOptionTermLength(e,t),t.longestSubcommandTermLength(e,t),t.longestArgumentTermLength(e,t))}wrap(e,t,r,i=40){let s=" \\f\\t\\v\xA0\u1680\u2000-\u200A\u202F\u205F\u3000\uFEFF",o=new RegExp(`[\\n][${s}]+`);if(e.match(o))return e;let a=t-r;if(a<i)return e;let l=e.slice(0,r),c=e.slice(r).replace(`\r
`,`
`),u=" ".repeat(r),d="\\s\u200B",h=new RegExp(`
|.{1,${a-1}}([${d}]|$)|[^${d}]+?([${d}]|$)`,"g"),y=c.match(h)||[];return l+y.map((g,m)=>g===`
`?"":(m>0?u:"")+g.trimEnd()).join(`
`)}};Tl.Help=rs});var as=_(Zn=>{var{InvalidArgumentError:tg}=zt(),ss=class{constructor(e,t){this.flags=e,this.description=t||"",this.required=e.includes("<"),this.optional=e.includes("["),this.variadic=/\w\.\.\.[>\]]$/.test(e),this.mandatory=!1;let r=Ll(e);this.short=r.shortFlag,this.long=r.longFlag,this.negate=!1,this.long&&(this.negate=this.long.startsWith("--no-")),this.defaultValue=void 0,this.defaultValueDescription=void 0,this.presetArg=void 0,this.envVar=void 0,this.parseArg=void 0,this.hidden=!1,this.argChoices=void 0,this.conflictsWith=[],this.implied=void 0}default(e,t){return this.defaultValue=e,this.defaultValueDescription=t,this}preset(e){return this.presetArg=e,this}conflicts(e){return this.conflictsWith=this.conflictsWith.concat(e),this}implies(e){let t=e;return typeof e=="string"&&(t={[e]:!0}),this.implied=Object.assign(this.implied||{},t),this}env(e){return this.envVar=e,this}argParser(e){return this.parseArg=e,this}makeOptionMandatory(e=!0){return this.mandatory=!!e,this}hideHelp(e=!0){return this.hidden=!!e,this}_concatValue(e,t){return t===this.defaultValue||!Array.isArray(t)?[e]:t.concat(e)}choices(e){return this.argChoices=e.slice(),this.parseArg=(t,r)=>{if(!this.argChoices.includes(t))throw new tg(`Allowed choices are ${this.argChoices.join(", ")}.`);return this.variadic?this._concatValue(t,r):t},this}name(){return this.long?this.long.replace(/^--/,""):this.short.replace(/^-/,"")}attributeName(){return ng(this.name().replace(/^no-/,""))}is(e){return this.short===e||this.long===e}isBoolean(){return!this.required&&!this.optional&&!this.negate}},os=class{constructor(e){this.positiveOptions=new Map,this.negativeOptions=new Map,this.dualOptions=new Set,e.forEach(t=>{t.negate?this.negativeOptions.set(t.attributeName(),t):this.positiveOptions.set(t.attributeName(),t)}),this.negativeOptions.forEach((t,r)=>{this.positiveOptions.has(r)&&this.dualOptions.add(r)})}valueFromOption(e,t){let r=t.attributeName();if(!this.dualOptions.has(r))return!0;let i=this.negativeOptions.get(r).presetArg,s=i!==void 0?i:!1;return t.negate===(s===e)}};function ng(n){return n.split("-").reduce((e,t)=>e+t[0].toUpperCase()+t.slice(1))}function Ll(n){let e,t,r=n.split(/[ |,]+/);return r.length>1&&!/^[[<]/.test(r[1])&&(e=r.shift()),t=r.shift(),!e&&/^-[^-]$/.test(t)&&(e=t,t=void 0),{shortFlag:e,longFlag:t}}Zn.Option=ss;Zn.splitOptionFlags=Ll;Zn.DualOptions=os});var Sl=_(Al=>{function rg(n,e){if(Math.abs(n.length-e.length)>3)return Math.max(n.length,e.length);let t=[];for(let r=0;r<=n.length;r++)t[r]=[r];for(let r=0;r<=e.length;r++)t[0][r]=r;for(let r=1;r<=e.length;r++)for(let i=1;i<=n.length;i++){let s=1;n[i-1]===e[r-1]?s=0:s=1,t[i][r]=Math.min(t[i-1][r]+1,t[i][r-1]+1,t[i-1][r-1]+s),i>1&&r>1&&n[i-1]===e[r-2]&&n[i-2]===e[r-1]&&(t[i][r]=Math.min(t[i][r],t[i-2][r-2]+1))}return t[n.length][e.length]}function ig(n,e){if(!e||e.length===0)return"";e=Array.from(new Set(e));let t=n.startsWith("--");t&&(n=n.slice(2),e=e.map(o=>o.slice(2)));let r=[],i=3,s=.4;return e.forEach(o=>{if(o.length<=1)return;let a=rg(n,o),l=Math.max(n.length,o.length);(l-a)/l>s&&(a<i?(i=a,r=[o]):a===i&&r.push(o))}),r.sort((o,a)=>o.localeCompare(a)),t&&(r=r.map(o=>`--${o}`)),r.length>1?`
(Did you mean one of ${r.join(", ")}?)`:r.length===1?`
(Did you mean ${r[0]}?)`:""}Al.suggestSimilar=ig});var Ol=_(Nl=>{var sg=require("events").EventEmitter,ls=require("child_process"),Ye=require("path"),cs=require("fs"),re=require("process"),{Argument:og,humanReadableArgName:ag}=Qn(),{CommanderError:us}=zt(),{Help:lg}=is(),{Option:Il,splitOptionFlags:cg,DualOptions:ug}=as(),{suggestSimilar:wl}=Sl(),fs=class n extends sg{constructor(e){super(),this.commands=[],this.options=[],this.parent=null,this._allowUnknownOption=!1,this._allowExcessArguments=!0,this._args=[],this.args=[],this.rawArgs=[],this.processedArgs=[],this._scriptPath=null,this._name=e||"",this._optionValues={},this._optionValueSources={},this._storeOptionsAsProperties=!1,this._actionHandler=null,this._executableHandler=!1,this._executableFile=null,this._executableDir=null,this._defaultCommandName=null,this._exitCallback=null,this._aliases=[],this._combineFlagAndOptionalValue=!0,this._description="",this._summary="",this._argsDescription=void 0,this._enablePositionalOptions=!1,this._passThroughOptions=!1,this._lifeCycleHooks={},this._showHelpAfterError=!1,this._showSuggestionAfterError=!0,this._outputConfiguration={writeOut:t=>re.stdout.write(t),writeErr:t=>re.stderr.write(t),getOutHelpWidth:()=>re.stdout.isTTY?re.stdout.columns:void 0,getErrHelpWidth:()=>re.stderr.isTTY?re.stderr.columns:void 0,outputError:(t,r)=>r(t)},this._hidden=!1,this._hasHelpOption=!0,this._helpFlags="-h, --help",this._helpDescription="display help for command",this._helpShortFlag="-h",this._helpLongFlag="--help",this._addImplicitHelpCommand=void 0,this._helpCommandName="help",this._helpCommandnameAndArgs="help [command]",this._helpCommandDescription="display help for command",this._helpConfiguration={}}copyInheritedSettings(e){return this._outputConfiguration=e._outputConfiguration,this._hasHelpOption=e._hasHelpOption,this._helpFlags=e._helpFlags,this._helpDescription=e._helpDescription,this._helpShortFlag=e._helpShortFlag,this._helpLongFlag=e._helpLongFlag,this._helpCommandName=e._helpCommandName,this._helpCommandnameAndArgs=e._helpCommandnameAndArgs,this._helpCommandDescription=e._helpCommandDescription,this._helpConfiguration=e._helpConfiguration,this._exitCallback=e._exitCallback,this._storeOptionsAsProperties=e._storeOptionsAsProperties,this._combineFlagAndOptionalValue=e._combineFlagAndOptionalValue,this._allowExcessArguments=e._allowExcessArguments,this._enablePositionalOptions=e._enablePositionalOptions,this._showHelpAfterError=e._showHelpAfterError,this._showSuggestionAfterError=e._showSuggestionAfterError,this}command(e,t,r){let i=t,s=r;typeof i=="object"&&i!==null&&(s=i,i=null),s=s||{};let[,o,a]=e.match(/([^ ]+) *(.*)/),l=this.createCommand(o);return i&&(l.description(i),l._executableHandler=!0),s.isDefault&&(this._defaultCommandName=l._name),l._hidden=!!(s.noHelp||s.hidden),l._executableFile=s.executableFile||null,a&&l.arguments(a),this.commands.push(l),l.parent=this,l.copyInheritedSettings(this),i?this:l}createCommand(e){return new n(e)}createHelp(){return Object.assign(new lg,this.configureHelp())}configureHelp(e){return e===void 0?this._helpConfiguration:(this._helpConfiguration=e,this)}configureOutput(e){return e===void 0?this._outputConfiguration:(Object.assign(this._outputConfiguration,e),this)}showHelpAfterError(e=!0){return typeof e!="string"&&(e=!!e),this._showHelpAfterError=e,this}showSuggestionAfterError(e=!0){return this._showSuggestionAfterError=!!e,this}addCommand(e,t){if(!e._name)throw new Error(`Command passed to .addCommand() must have a name
- specify the name in Command constructor or using .name()`);return t=t||{},t.isDefault&&(this._defaultCommandName=e._name),(t.noHelp||t.hidden)&&(e._hidden=!0),this.commands.push(e),e.parent=this,this}createArgument(e,t){return new og(e,t)}argument(e,t,r,i){let s=this.createArgument(e,t);return typeof r=="function"?s.default(i).argParser(r):s.default(r),this.addArgument(s),this}arguments(e){return e.trim().split(/ +/).forEach(t=>{this.argument(t)}),this}addArgument(e){let t=this._args.slice(-1)[0];if(t&&t.variadic)throw new Error(`only the last argument can be variadic '${t.name()}'`);if(e.required&&e.defaultValue!==void 0&&e.parseArg===void 0)throw new Error(`a default value for a required argument is never used: '${e.name()}'`);return this._args.push(e),this}addHelpCommand(e,t){return e===!1?this._addImplicitHelpCommand=!1:(this._addImplicitHelpCommand=!0,typeof e=="string"&&(this._helpCommandName=e.split(" ")[0],this._helpCommandnameAndArgs=e),this._helpCommandDescription=t||this._helpCommandDescription),this}_hasImplicitHelpCommand(){return this._addImplicitHelpCommand===void 0?this.commands.length&&!this._actionHandler&&!this._findCommand("help"):this._addImplicitHelpCommand}hook(e,t){let r=["preSubcommand","preAction","postAction"];if(!r.includes(e))throw new Error(`Unexpected value for event passed to hook : '${e}'.
Expecting one of '${r.join("', '")}'`);return this._lifeCycleHooks[e]?this._lifeCycleHooks[e].push(t):this._lifeCycleHooks[e]=[t],this}exitOverride(e){return e?this._exitCallback=e:this._exitCallback=t=>{if(t.code!=="commander.executeSubCommandAsync")throw t},this}_exit(e,t,r){this._exitCallback&&this._exitCallback(new us(e,t,r)),re.exit(e)}action(e){let t=r=>{let i=this._args.length,s=r.slice(0,i);return this._storeOptionsAsProperties?s[i]=this:s[i]=this.opts(),s.push(this),e.apply(this,s)};return this._actionHandler=t,this}createOption(e,t){return new Il(e,t)}addOption(e){let t=e.name(),r=e.attributeName();if(e.negate){let s=e.long.replace(/^--no-/,"--");this._findOption(s)||this.setOptionValueWithSource(r,e.defaultValue===void 0?!0:e.defaultValue,"default")}else e.defaultValue!==void 0&&this.setOptionValueWithSource(r,e.defaultValue,"default");this.options.push(e);let i=(s,o,a)=>{s==null&&e.presetArg!==void 0&&(s=e.presetArg);let l=this.getOptionValue(r);if(s!==null&&e.parseArg)try{s=e.parseArg(s,l)}catch(c){if(c.code==="commander.invalidArgument"){let u=`${o} ${c.message}`;this.error(u,{exitCode:c.exitCode,code:c.code})}throw c}else s!==null&&e.variadic&&(s=e._concatValue(s,l));s==null&&(e.negate?s=!1:e.isBoolean()||e.optional?s=!0:s=""),this.setOptionValueWithSource(r,s,a)};return this.on("option:"+t,s=>{let o=`error: option '${e.flags}' argument '${s}' is invalid.`;i(s,o,"cli")}),e.envVar&&this.on("optionEnv:"+t,s=>{let o=`error: option '${e.flags}' value '${s}' from env '${e.envVar}' is invalid.`;i(s,o,"env")}),this}_optionEx(e,t,r,i,s){if(typeof t=="object"&&t instanceof Il)throw new Error("To add an Option object use addOption() instead of option() or requiredOption()");let o=this.createOption(t,r);if(o.makeOptionMandatory(!!e.mandatory),typeof i=="function")o.default(s).argParser(i);else if(i instanceof RegExp){let a=i;i=(l,c)=>{let u=a.exec(l);return u?u[0]:c},o.default(s).argParser(i)}else o.default(i);return this.addOption(o)}option(e,t,r,i){return this._optionEx({},e,t,r,i)}requiredOption(e,t,r,i){return this._optionEx({mandatory:!0},e,t,r,i)}combineFlagAndOptionalValue(e=!0){return this._combineFlagAndOptionalValue=!!e,this}allowUnknownOption(e=!0){return this._allowUnknownOption=!!e,this}allowExcessArguments(e=!0){return this._allowExcessArguments=!!e,this}enablePositionalOptions(e=!0){return this._enablePositionalOptions=!!e,this}passThroughOptions(e=!0){if(this._passThroughOptions=!!e,this.parent&&e&&!this.parent._enablePositionalOptions)throw new Error("passThroughOptions can not be used without turning on enablePositionalOptions for parent command(s)");return this}storeOptionsAsProperties(e=!0){if(this._storeOptionsAsProperties=!!e,this.options.length)throw new Error("call .storeOptionsAsProperties() before adding options");return this}getOptionValue(e){return this._storeOptionsAsProperties?this[e]:this._optionValues[e]}setOptionValue(e,t){return this.setOptionValueWithSource(e,t,void 0)}setOptionValueWithSource(e,t,r){return this._storeOptionsAsProperties?this[e]=t:this._optionValues[e]=t,this._optionValueSources[e]=r,this}getOptionValueSource(e){return this._optionValueSources[e]}getOptionValueSourceWithGlobals(e){let t;return Qt(this).forEach(r=>{r.getOptionValueSource(e)!==void 0&&(t=r.getOptionValueSource(e))}),t}_prepareUserArgs(e,t){if(e!==void 0&&!Array.isArray(e))throw new Error("first parameter to parse must be array or undefined");t=t||{},e===void 0&&(e=re.argv,re.versions&&re.versions.electron&&(t.from="electron")),this.rawArgs=e.slice();let r;switch(t.from){case void 0:case"node":this._scriptPath=e[1],r=e.slice(2);break;case"electron":re.defaultApp?(this._scriptPath=e[1],r=e.slice(2)):r=e.slice(1);break;case"user":r=e.slice(0);break;default:throw new Error(`unexpected parse option { from: '${t.from}' }`)}return!this._name&&this._scriptPath&&this.nameFromFilename(this._scriptPath),this._name=this._name||"program",r}parse(e,t){let r=this._prepareUserArgs(e,t);return this._parseCommand([],r),this}async parseAsync(e,t){let r=this._prepareUserArgs(e,t);return await this._parseCommand([],r),this}_executeSubCommand(e,t){t=t.slice();let r=!1,i=[".js",".ts",".tsx",".mjs",".cjs"];function s(u,f){let d=Ye.resolve(u,f);if(cs.existsSync(d))return d;if(i.includes(Ye.extname(f)))return;let h=i.find(y=>cs.existsSync(`${d}${y}`));if(h)return`${d}${h}`}this._checkForMissingMandatoryOptions(),this._checkForConflictingOptions();let o=e._executableFile||`${this._name}-${e._name}`,a=this._executableDir||"";if(this._scriptPath){let u;try{u=cs.realpathSync(this._scriptPath)}catch{u=this._scriptPath}a=Ye.resolve(Ye.dirname(u),a)}if(a){let u=s(a,o);if(!u&&!e._executableFile&&this._scriptPath){let f=Ye.basename(this._scriptPath,Ye.extname(this._scriptPath));f!==this._name&&(u=s(a,`${f}-${e._name}`))}o=u||o}r=i.includes(Ye.extname(o));let l;re.platform!=="win32"?r?(t.unshift(o),t=bl(re.execArgv).concat(t),l=ls.spawn(re.argv[0],t,{stdio:"inherit"})):l=ls.spawn(o,t,{stdio:"inherit"}):(t.unshift(o),t=bl(re.execArgv).concat(t),l=ls.spawn(re.execPath,t,{stdio:"inherit"})),l.killed||["SIGUSR1","SIGUSR2","SIGTERM","SIGINT","SIGHUP"].forEach(f=>{re.on(f,()=>{l.killed===!1&&l.exitCode===null&&l.kill(f)})});let c=this._exitCallback;c?l.on("close",()=>{c(new us(re.exitCode||0,"commander.executeSubCommandAsync","(close)"))}):l.on("close",re.exit.bind(re)),l.on("error",u=>{if(u.code==="ENOENT"){let f=a?`searched for local subcommand relative to directory '${a}'`:"no directory for search for local subcommand, use .executableDir() to supply a custom directory",d=`'${o}' does not exist
 - if '${e._name}' is not meant to be an executable command, remove description parameter from '.command()' and use '.description()' instead
 - if the default executable name is not suitable, use the executableFile option to supply a custom name or path
 - ${f}`;throw new Error(d)}else if(u.code==="EACCES")throw new Error(`'${o}' not executable`);if(!c)re.exit(1);else{let f=new us(1,"commander.executeSubCommandAsync","(error)");f.nestedError=u,c(f)}}),this.runningCommand=l}_dispatchSubcommand(e,t,r){let i=this._findCommand(e);i||this.help({error:!0});let s;return s=this._chainOrCallSubCommandHook(s,i,"preSubcommand"),s=this._chainOrCall(s,()=>{if(i._executableHandler)this._executeSubCommand(i,t.concat(r));else return i._parseCommand(t,r)}),s}_dispatchHelpCommand(e){e||this.help();let t=this._findCommand(e);return t&&!t._executableHandler&&t.help(),this._dispatchSubcommand(e,[],[this._helpLongFlag])}_checkNumberOfArguments(){this._args.forEach((e,t)=>{e.required&&this.args[t]==null&&this.missingArgument(e.name())}),!(this._args.length>0&&this._args[this._args.length-1].variadic)&&this.args.length>this._args.length&&this._excessArguments(this.args)}_processArguments(){let e=(r,i,s)=>{let o=i;if(i!==null&&r.parseArg)try{o=r.parseArg(i,s)}catch(a){if(a.code==="commander.invalidArgument"){let l=`error: command-argument value '${i}' is invalid for argument '${r.name()}'. ${a.message}`;this.error(l,{exitCode:a.exitCode,code:a.code})}throw a}return o};this._checkNumberOfArguments();let t=[];this._args.forEach((r,i)=>{let s=r.defaultValue;r.variadic?i<this.args.length?(s=this.args.slice(i),r.parseArg&&(s=s.reduce((o,a)=>e(r,a,o),r.defaultValue))):s===void 0&&(s=[]):i<this.args.length&&(s=this.args[i],r.parseArg&&(s=e(r,s,r.defaultValue))),t[i]=s}),this.processedArgs=t}_chainOrCall(e,t){return e&&e.then&&typeof e.then=="function"?e.then(()=>t()):t()}_chainOrCallHooks(e,t){let r=e,i=[];return Qt(this).reverse().filter(s=>s._lifeCycleHooks[t]!==void 0).forEach(s=>{s._lifeCycleHooks[t].forEach(o=>{i.push({hookedCommand:s,callback:o})})}),t==="postAction"&&i.reverse(),i.forEach(s=>{r=this._chainOrCall(r,()=>s.callback(s.hookedCommand,this))}),r}_chainOrCallSubCommandHook(e,t,r){let i=e;return this._lifeCycleHooks[r]!==void 0&&this._lifeCycleHooks[r].forEach(s=>{i=this._chainOrCall(i,()=>s(this,t))}),i}_parseCommand(e,t){let r=this.parseOptions(t);if(this._parseOptionsEnv(),this._parseOptionsImplied(),e=e.concat(r.operands),t=r.unknown,this.args=e.concat(t),e&&this._findCommand(e[0]))return this._dispatchSubcommand(e[0],e.slice(1),t);if(this._hasImplicitHelpCommand()&&e[0]===this._helpCommandName)return this._dispatchHelpCommand(e[1]);if(this._defaultCommandName)return vl(this,t),this._dispatchSubcommand(this._defaultCommandName,e,t);this.commands.length&&this.args.length===0&&!this._actionHandler&&!this._defaultCommandName&&this.help({error:!0}),vl(this,r.unknown),this._checkForMissingMandatoryOptions(),this._checkForConflictingOptions();let i=()=>{r.unknown.length>0&&this.unknownOption(r.unknown[0])},s=`command:${this.name()}`;if(this._actionHandler){i(),this._processArguments();let o;return o=this._chainOrCallHooks(o,"preAction"),o=this._chainOrCall(o,()=>this._actionHandler(this.processedArgs)),this.parent&&(o=this._chainOrCall(o,()=>{this.parent.emit(s,e,t)})),o=this._chainOrCallHooks(o,"postAction"),o}if(this.parent&&this.parent.listenerCount(s))i(),this._processArguments(),this.parent.emit(s,e,t);else if(e.length){if(this._findCommand("*"))return this._dispatchSubcommand("*",e,t);this.listenerCount("command:*")?this.emit("command:*",e,t):this.commands.length?this.unknownCommand():(i(),this._processArguments())}else this.commands.length?(i(),this.help({error:!0})):(i(),this._processArguments())}_findCommand(e){if(e)return this.commands.find(t=>t._name===e||t._aliases.includes(e))}_findOption(e){return this.options.find(t=>t.is(e))}_checkForMissingMandatoryOptions(){for(let e=this;e;e=e.parent)e.options.forEach(t=>{t.mandatory&&e.getOptionValue(t.attributeName())===void 0&&e.missingMandatoryOptionValue(t)})}_checkForConflictingLocalOptions(){let e=this.options.filter(r=>{let i=r.attributeName();return this.getOptionValue(i)===void 0?!1:this.getOptionValueSource(i)!=="default"});e.filter(r=>r.conflictsWith.length>0).forEach(r=>{let i=e.find(s=>r.conflictsWith.includes(s.attributeName()));i&&this._conflictingOption(r,i)})}_checkForConflictingOptions(){for(let e=this;e;e=e.parent)e._checkForConflictingLocalOptions()}parseOptions(e){let t=[],r=[],i=t,s=e.slice();function o(l){return l.length>1&&l[0]==="-"}let a=null;for(;s.length;){let l=s.shift();if(l==="--"){i===r&&i.push(l),i.push(...s);break}if(a&&!o(l)){this.emit(`option:${a.name()}`,l);continue}if(a=null,o(l)){let c=this._findOption(l);if(c){if(c.required){let u=s.shift();u===void 0&&this.optionMissingArgument(c),this.emit(`option:${c.name()}`,u)}else if(c.optional){let u=null;s.length>0&&!o(s[0])&&(u=s.shift()),this.emit(`option:${c.name()}`,u)}else this.emit(`option:${c.name()}`);a=c.variadic?c:null;continue}}if(l.length>2&&l[0]==="-"&&l[1]!=="-"){let c=this._findOption(`-${l[1]}`);if(c){c.required||c.optional&&this._combineFlagAndOptionalValue?this.emit(`option:${c.name()}`,l.slice(2)):(this.emit(`option:${c.name()}`),s.unshift(`-${l.slice(2)}`));continue}}if(/^--[^=]+=/.test(l)){let c=l.indexOf("="),u=this._findOption(l.slice(0,c));if(u&&(u.required||u.optional)){this.emit(`option:${u.name()}`,l.slice(c+1));continue}}if(o(l)&&(i=r),(this._enablePositionalOptions||this._passThroughOptions)&&t.length===0&&r.length===0){if(this._findCommand(l)){t.push(l),s.length>0&&r.push(...s);break}else if(l===this._helpCommandName&&this._hasImplicitHelpCommand()){t.push(l),s.length>0&&t.push(...s);break}else if(this._defaultCommandName){r.push(l),s.length>0&&r.push(...s);break}}if(this._passThroughOptions){i.push(l),s.length>0&&i.push(...s);break}i.push(l)}return{operands:t,unknown:r}}opts(){if(this._storeOptionsAsProperties){let e={},t=this.options.length;for(let r=0;r<t;r++){let i=this.options[r].attributeName();e[i]=i===this._versionOptionName?this._version:this[i]}return e}return this._optionValues}optsWithGlobals(){return Qt(this).reduce((e,t)=>Object.assign(e,t.opts()),{})}error(e,t){this._outputConfiguration.outputError(`${e}
`,this._outputConfiguration.writeErr),typeof this._showHelpAfterError=="string"?this._outputConfiguration.writeErr(`${this._showHelpAfterError}
`):this._showHelpAfterError&&(this._outputConfiguration.writeErr(`
`),this.outputHelp({error:!0}));let r=t||{},i=r.exitCode||1,s=r.code||"commander.error";this._exit(i,s,e)}_parseOptionsEnv(){this.options.forEach(e=>{if(e.envVar&&e.envVar in re.env){let t=e.attributeName();(this.getOptionValue(t)===void 0||["default","config","env"].includes(this.getOptionValueSource(t)))&&(e.required||e.optional?this.emit(`optionEnv:${e.name()}`,re.env[e.envVar]):this.emit(`optionEnv:${e.name()}`))}})}_parseOptionsImplied(){let e=new ug(this.options),t=r=>this.getOptionValue(r)!==void 0&&!["default","implied"].includes(this.getOptionValueSource(r));this.options.filter(r=>r.implied!==void 0&&t(r.attributeName())&&e.valueFromOption(this.getOptionValue(r.attributeName()),r)).forEach(r=>{Object.keys(r.implied).filter(i=>!t(i)).forEach(i=>{this.setOptionValueWithSource(i,r.implied[i],"implied")})})}missingArgument(e){let t=`error: missing required argument '${e}'`;this.error(t,{code:"commander.missingArgument"})}optionMissingArgument(e){let t=`error: option '${e.flags}' argument missing`;this.error(t,{code:"commander.optionMissingArgument"})}missingMandatoryOptionValue(e){let t=`error: required option '${e.flags}' not specified`;this.error(t,{code:"commander.missingMandatoryOptionValue"})}_conflictingOption(e,t){let r=o=>{let a=o.attributeName(),l=this.getOptionValue(a),c=this.options.find(f=>f.negate&&a===f.attributeName()),u=this.options.find(f=>!f.negate&&a===f.attributeName());return c&&(c.presetArg===void 0&&l===!1||c.presetArg!==void 0&&l===c.presetArg)?c:u||o},i=o=>{let a=r(o),l=a.attributeName();return this.getOptionValueSource(l)==="env"?`environment variable '${a.envVar}'`:`option '${a.flags}'`},s=`error: ${i(e)} cannot be used with ${i(t)}`;this.error(s,{code:"commander.conflictingOption"})}unknownOption(e){if(this._allowUnknownOption)return;let t="";if(e.startsWith("--")&&this._showSuggestionAfterError){let i=[],s=this;do{let o=s.createHelp().visibleOptions(s).filter(a=>a.long).map(a=>a.long);i=i.concat(o),s=s.parent}while(s&&!s._enablePositionalOptions);t=wl(e,i)}let r=`error: unknown option '${e}'${t}`;this.error(r,{code:"commander.unknownOption"})}_excessArguments(e){if(this._allowExcessArguments)return;let t=this._args.length,r=t===1?"":"s",s=`error: too many arguments${this.parent?` for '${this.name()}'`:""}. Expected ${t} argument${r} but got ${e.length}.`;this.error(s,{code:"commander.excessArguments"})}unknownCommand(){let e=this.args[0],t="";if(this._showSuggestionAfterError){let i=[];this.createHelp().visibleCommands(this).forEach(s=>{i.push(s.name()),s.alias()&&i.push(s.alias())}),t=wl(e,i)}let r=`error: unknown command '${e}'${t}`;this.error(r,{code:"commander.unknownCommand"})}version(e,t,r){if(e===void 0)return this._version;this._version=e,t=t||"-V, --version",r=r||"output the version number";let i=this.createOption(t,r);return this._versionOptionName=i.attributeName(),this.options.push(i),this.on("option:"+i.name(),()=>{this._outputConfiguration.writeOut(`${e}
`),this._exit(0,"commander.version",e)}),this}description(e,t){return e===void 0&&t===void 0?this._description:(this._description=e,t&&(this._argsDescription=t),this)}summary(e){return e===void 0?this._summary:(this._summary=e,this)}alias(e){if(e===void 0)return this._aliases[0];let t=this;if(this.commands.length!==0&&this.commands[this.commands.length-1]._executableHandler&&(t=this.commands[this.commands.length-1]),e===t._name)throw new Error("Command alias can't be the same as its name");return t._aliases.push(e),this}aliases(e){return e===void 0?this._aliases:(e.forEach(t=>this.alias(t)),this)}usage(e){if(e===void 0){if(this._usage)return this._usage;let t=this._args.map(r=>ag(r));return[].concat(this.options.length||this._hasHelpOption?"[options]":[],this.commands.length?"[command]":[],this._args.length?t:[]).join(" ")}return this._usage=e,this}name(e){return e===void 0?this._name:(this._name=e,this)}nameFromFilename(e){return this._name=Ye.basename(e,Ye.extname(e)),this}executableDir(e){return e===void 0?this._executableDir:(this._executableDir=e,this)}helpInformation(e){let t=this.createHelp();return t.helpWidth===void 0&&(t.helpWidth=e&&e.error?this._outputConfiguration.getErrHelpWidth():this._outputConfiguration.getOutHelpWidth()),t.formatHelp(this,t)}_getHelpContext(e){e=e||{};let t={error:!!e.error},r;return t.error?r=i=>this._outputConfiguration.writeErr(i):r=i=>this._outputConfiguration.writeOut(i),t.write=e.write||r,t.command=this,t}outputHelp(e){let t;typeof e=="function"&&(t=e,e=void 0);let r=this._getHelpContext(e);Qt(this).reverse().forEach(s=>s.emit("beforeAllHelp",r)),this.emit("beforeHelp",r);let i=this.helpInformation(r);if(t&&(i=t(i),typeof i!="string"&&!Buffer.isBuffer(i)))throw new Error("outputHelp callback must return a string or a Buffer");r.write(i),this.emit(this._helpLongFlag),this.emit("afterHelp",r),Qt(this).forEach(s=>s.emit("afterAllHelp",r))}helpOption(e,t){if(typeof e=="boolean")return this._hasHelpOption=e,this;this._helpFlags=e||this._helpFlags,this._helpDescription=t||this._helpDescription;let r=cg(this._helpFlags);return this._helpShortFlag=r.shortFlag,this._helpLongFlag=r.longFlag,this}help(e){this.outputHelp(e);let t=re.exitCode||0;t===0&&e&&typeof e!="function"&&e.error&&(t=1),this._exit(t,"commander.help","(outputHelp)")}addHelpText(e,t){let r=["beforeAll","before","after","afterAll"];if(!r.includes(e))throw new Error(`Unexpected value for position to addHelpText.
Expecting one of '${r.join("', '")}'`);let i=`${e}Help`;return this.on(i,s=>{let o;typeof t=="function"?o=t({error:s.error,command:s.command}):o=t,o&&s.write(`${o}
`)}),this}};function vl(n,e){n._hasHelpOption&&e.find(r=>r===n._helpLongFlag||r===n._helpShortFlag)&&(n.outputHelp(),n._exit(0,"commander.helpDisplayed","(outputHelp)"))}function bl(n){return n.map(e=>{if(!e.startsWith("--inspect"))return e;let t,r="127.0.0.1",i="9229",s;return(s=e.match(/^(--inspect(-brk)?)$/))!==null?t=s[1]:(s=e.match(/^(--inspect(-brk|-port)?)=([^:]+)$/))!==null?(t=s[1],/^\d+$/.test(s[3])?i=s[3]:r=s[3]):(s=e.match(/^(--inspect(-brk|-port)?)=([^:]+):(\d+)$/))!==null&&(t=s[1],r=s[3],i=s[4]),t&&i!=="0"?`${t}=${r}:${parseInt(i)+1}`:e})}function Qt(n){let e=[];for(let t=n;t;t=t.parent)e.push(t);return e}Nl.Command=fs});var Pl=_((De,kl)=>{var{Argument:fg}=Qn(),{Command:Rl}=Ol(),{CommanderError:hg,InvalidArgumentError:Cl}=zt(),{Help:dg}=is(),{Option:pg}=as();De=kl.exports=new Rl;De.program=De;De.Argument=fg;De.Command=Rl;De.CommanderError=hg;De.Help=dg;De.InvalidArgumentError=Cl;De.InvalidOptionArgumentError=Cl;De.Option=pg});var xl=_((Ib,er)=>{"use strict";var _g=(()=>{let i={},s={font:"Standard",fontPath:"./fonts"};function o(T,A){let p={},E,L,I,k,N=[[16384,"vLayout",2],[8192,"vLayout",1],[4096,"vRule5",!0],[2048,"vRule4",!0],[1024,"vRule3",!0],[512,"vRule2",!0],[256,"vRule1",!0],[128,"hLayout",2],[64,"hLayout",1],[32,"hRule6",!0],[16,"hRule5",!0],[8,"hRule4",!0],[4,"hRule3",!0],[2,"hRule2",!0],[1,"hRule1",!0]];for(E=A!==null?A:T,L=0,I=N.length;L<I;)k=N[L],E>=k[0]?(E=E-k[0],p[k[1]]=typeof p[k[1]]>"u"?k[2]:p[k[1]]):k[1]!=="vLayout"&&k[1]!=="hLayout"&&(p[k[1]]=!1),L++;return typeof p.hLayout>"u"?T===0?p.hLayout=1:T===-1?p.hLayout=0:p.hRule1||p.hRule2||p.hRule3||p.hRule4||p.hRule5||p.hRule6?p.hLayout=3:p.hLayout=2:p.hLayout===2&&(p.hRule1||p.hRule2||p.hRule3||p.hRule4||p.hRule5||p.hRule6)&&(p.hLayout=3),typeof p.vLayout>"u"?p.vRule1||p.vRule2||p.vRule3||p.vRule4||p.vRule5?p.vLayout=3:p.vLayout=0:p.vLayout===2&&(p.vRule1||p.vRule2||p.vRule3||p.vRule4||p.vRule5)&&(p.vLayout=3),p}function a(T,A,p){return T===A&&T!==p?T:!1}function l(T,A){let p="|/\\[]{}()<>";if(T==="_"){if(p.indexOf(A)!==-1)return A}else if(A==="_"&&p.indexOf(T)!==-1)return T;return!1}function c(T,A){let p="| /\\ [] {} () <>",E=p.indexOf(T),L=p.indexOf(A);if(E!==-1&&L!==-1&&E!==L&&Math.abs(E-L)!==1){let I=Math.max(E,L),k=I+1;return p.substring(I,k)}return!1}function u(T,A){let p="[] {} ()",E=p.indexOf(T),L=p.indexOf(A);return E!==-1&&L!==-1&&Math.abs(E-L)<=1?"|":!1}function f(T,A){let p="/\\ \\/ ><",E={0:"|",3:"Y",6:"X"},L=p.indexOf(T),I=p.indexOf(A);return L!==-1&&I!==-1&&I-L===1?E[L]:!1}function d(T,A,p){return T===p&&A===p?p:!1}function h(T,A){return T===A?T:!1}function y(T,A){let p="|/\\[]{}()<>";if(T==="_"){if(p.indexOf(A)!==-1)return A}else if(A==="_"&&p.indexOf(T)!==-1)return T;return!1}function g(T,A){let p="| /\\ [] {} () <>",E=p.indexOf(T),L=p.indexOf(A);if(E!==-1&&L!==-1&&E!==L&&Math.abs(E-L)!==1){let I=Math.max(E,L),k=I+1;return p.substring(I,k)}return!1}function m(T,A){return T==="-"&&A==="_"||T==="_"&&A==="-"?"=":!1}function S(T,A){return T==="|"&&A==="|"?"|":!1}function w(T,A,p){return A===" "||A===""||A===p&&T!==" "?T:A}function b(T,A,p){if(p.fittingRules.vLayout===0)return"invalid";let E,L=Math.min(T.length,A.length),I,k,N=!1,O;if(L===0)return"invalid";for(E=0;E<L;E++)if(I=T.substring(E,E+1),k=A.substring(E,E+1),I!==" "&&k!==" "){if(p.fittingRules.vLayout===1)return"invalid";if(p.fittingRules.vLayout===2)return"end";if(S(I,k)){N=N||!1;continue}if(O=!1,O=p.fittingRules.vRule1?h(I,k):O,O=!O&&p.fittingRules.vRule2?y(I,k):O,O=!O&&p.fittingRules.vRule3?g(I,k):O,O=!O&&p.fittingRules.vRule4?m(I,k):O,N=!0,!O)return"invalid"}return N?"end":"valid"}function $(T,A,p){let E=T.length,L=T.length,I=A.length,k,N,O,x=1,Z,ne,B;for(;x<=E;){for(k=T.slice(Math.max(0,L-x),L),N=A.slice(0,Math.min(E,x)),O=N.length,B="",Z=0;Z<O;Z++)if(ne=b(k[Z],N[Z],p),ne==="end")B=ne;else if(ne==="invalid"){B=ne;break}else B===""&&(B="valid");if(B==="invalid"){x--;break}if(B==="end")break;B==="valid"&&x++}return Math.min(E,x)}function M(T,A,p){let E,L=Math.min(T.length,A.length),I,k,N="",O;for(E=0;E<L;E++)I=T.substring(E,E+1),k=A.substring(E,E+1),I!==" "&&k!==" "?p.fittingRules.vLayout===1||p.fittingRules.vLayout===2?N+=w(I,k):(O=!1,O=p.fittingRules.vRule5?S(I,k):O,O=!O&&p.fittingRules.vRule1?h(I,k):O,O=!O&&p.fittingRules.vRule2?y(I,k):O,O=!O&&p.fittingRules.vRule3?g(I,k):O,O=!O&&p.fittingRules.vRule4?m(I,k):O,N+=O):N+=w(I,k);return N}function v(T,A,p,E){let L=T.length,I=A.length,k=T.slice(0,Math.max(0,L-p)),N=T.slice(Math.max(0,L-p),L),O=A.slice(0,Math.min(p,I)),x,Z,ne,B=[],Q,Ce=[];for(Z=N.length,x=0;x<Z;x++)x>=I?ne=N[x]:ne=M(N[x],O[x],E),B.push(ne);return Q=A.slice(Math.min(p,I),I),Ce.concat(k,B,Q)}function V(T,A){let p,E=T.length,L="";for(p=0;p<A;p++)L+=" ";for(p=0;p<E;p++)T[p]+=L}function G(T,A,p){let E=T[0].length,L=A[0].length,I;return E>L?V(A,E-L):L>E&&V(T,L-E),I=$(T,A,p),v(T,A,I,p)}function P(T,A,p){if(p.fittingRules.hLayout===0)return 0;let E,L=T.length,I=A.length,k=L,N=1,O=!1,x=!1,Z,ne,B,Q;if(L===0)return 0;e:for(;N<=k;){let Ce=L-N;for(Z=T.substring(Ce,Ce+N),ne=A.substring(0,Math.min(N,I)),E=0;E<Math.min(N,I);E++)if(B=Z.substring(E,E+1),Q=ne.substring(E,E+1),B!==" "&&Q!==" "){if(p.fittingRules.hLayout===1){N=N-1;break e}else if(p.fittingRules.hLayout===2){(B===p.hardBlank||Q===p.hardBlank)&&(N=N-1);break e}else if(O=!0,x=!1,x=p.fittingRules.hRule1?a(B,Q,p.hardBlank):x,x=!x&&p.fittingRules.hRule2?l(B,Q,p.hardBlank):x,x=!x&&p.fittingRules.hRule3?c(B,Q,p.hardBlank):x,x=!x&&p.fittingRules.hRule4?u(B,Q,p.hardBlank):x,x=!x&&p.fittingRules.hRule5?f(B,Q,p.hardBlank):x,x=!x&&p.fittingRules.hRule6?d(B,Q,p.hardBlank):x,!x){N=N-1;break e}}if(O)break;N++}return Math.min(k,N)}function j(T,A,p,E){let L,I,k=[],N,O,x,Z,ne,B,Q,Ce;for(L=0;L<E.height;L++){Q=T[L],Ce=A[L],ne=Q.length,B=Ce.length,N=ne-p,O=Q.substr(0,Math.max(0,N)),x="";let yl=Math.max(0,ne-p);var wt=Q.substring(yl,yl+p),Xn=Ce.substring(0,Math.min(p,B));for(I=0;I<p;I++){var ae=I<ne?wt.substring(I,I+1):" ",_e=I<B?Xn.substring(I,I+1):" ";if(ae!==" "&&_e!==" ")if(E.fittingRules.hLayout===1)x+=w(ae,_e,E.hardBlank);else if(E.fittingRules.hLayout===2)x+=w(ae,_e,E.hardBlank);else{var ee="";ee=!ee&&E.fittingRules.hRule1?a(ae,_e,E.hardBlank):ee,ee=!ee&&E.fittingRules.hRule2?l(ae,_e,E.hardBlank):ee,ee=!ee&&E.fittingRules.hRule3?c(ae,_e,E.hardBlank):ee,ee=!ee&&E.fittingRules.hRule4?u(ae,_e,E.hardBlank):ee,ee=!ee&&E.fittingRules.hRule5?f(ae,_e,E.hardBlank):ee,ee=!ee&&E.fittingRules.hRule6?d(ae,_e,E.hardBlank):ee,ee=ee||w(ae,_e,E.hardBlank),x+=ee}else x+=w(ae,_e,E.hardBlank)}p>=B?Z="":Z=Ce.substring(p,p+Math.max(0,B-p)),k[L]=O+x+Z}return k}function D(T){let A=[],p;for(p=0;p<T;p++)A[p]="";return A}let F=function(T){return Math.max.apply(Math,T.map(function(A,p){return A.length}))};function X(T,A,p){return T.reduce(function(E,L){return j(E,L.fig,L.overlap,p)},D(A))}function ie(T,A,p){let E={};for(let L=T.length;--L;){let I=X(T.slice(0,L),A,p);if(F(I)<=p.width){E.outputFigText=I,L<T.length?E.chars=T.slice(L):E.chars=[];break}}return E}function K(T,A,p){let E,L,I=0,k,N,O,x=p.height,Z=[],ne,B,Q=[],Ce,wt,Xn,ae,_e;for(N=D(x),p.width>0&&p.whitespaceBreak&&(B={chars:[],overlap:I}),p.printDirection===1&&(T=T.split("").reverse().join("")),O=T.length,E=0;E<O;E++)if(Ce=T.substring(E,E+1),wt=Ce.match(/\s/),L=A[Ce.charCodeAt(0)],ae=null,L){if(p.fittingRules.hLayout!==0){for(I=1e4,k=0;k<p.height;k++)I=Math.min(I,P(N[k],L[k],p));I=I===1e4?0:I}if(p.width>0&&(p.whitespaceBreak?(Xn=X(B.chars.concat([{fig:L,overlap:I}]),x,p),ae=X(Q.concat([{fig:Xn,overlap:B.overlap}]),x,p),ne=F(ae)):(ae=j(N,L,I,p),ne=F(ae)),ne>=p.width&&E>0&&(p.whitespaceBreak?(N=X(Q.slice(0,-1),x,p),Q.length>1&&(Z.push(N),N=D(x)),Q=[]):(Z.push(N),N=D(x)))),p.width>0&&p.whitespaceBreak&&((!wt||E===O-1)&&B.chars.push({fig:L,overlap:I}),wt||E===O-1)){for(_e=null;ae=X(B.chars,x,p),ne=F(ae),ne>=p.width;)_e=ie(B.chars,x,p),B={chars:_e.chars},Z.push(_e.outputFigText);ne>0&&(_e?Q.push({fig:ae,overlap:1}):Q.push({fig:ae,overlap:B.overlap})),wt&&(Q.push({fig:L,overlap:I}),N=D(x)),E===O-1&&(N=X(Q,x,p)),B={chars:[],overlap:I};continue}N=j(N,L,I,p)}return F(N)>0&&Z.push(N),p.showHardBlanks!==!0&&Z.forEach(function(ee){for(O=ee.length,k=0;k<O;k++)ee[k]=ee[k].replace(new RegExp("\\"+p.hardBlank,"g")," ")}),Z}let U=function(T,A){let p=["hLayout","hRule1","hRule2","hRule3","hRule4","hRule5","hRule6"],E={},L;if(T==="default")for(L=0;L<p.length;L++)E[p[L]]=A.fittingRules[p[L]];else if(T==="full")E={hLayout:0,hRule1:!1,hRule2:!1,hRule3:!1,hRule4:!1,hRule5:!1,hRule6:!1};else if(T==="fitted")E={hLayout:1,hRule1:!1,hRule2:!1,hRule3:!1,hRule4:!1,hRule5:!1,hRule6:!1};else if(T==="controlled smushing")E={hLayout:3,hRule1:!0,hRule2:!0,hRule3:!0,hRule4:!0,hRule5:!0,hRule6:!0};else if(T==="universal smushing")E={hLayout:2,hRule1:!1,hRule2:!1,hRule3:!1,hRule4:!1,hRule5:!1,hRule6:!1};else return;return E},Y=function(T,A){let p=["vLayout","vRule1","vRule2","vRule3","vRule4","vRule5"],E={},L;if(T==="default")for(L=0;L<p.length;L++)E[p[L]]=A.fittingRules[p[L]];else if(T==="full")E={vLayout:0,vRule1:!1,vRule2:!1,vRule3:!1,vRule4:!1,vRule5:!1};else if(T==="fitted")E={vLayout:1,vRule1:!1,vRule2:!1,vRule3:!1,vRule4:!1,vRule5:!1};else if(T==="controlled smushing")E={vLayout:3,vRule1:!0,vRule2:!0,vRule3:!0,vRule4:!0,vRule5:!0};else if(T==="universal smushing")E={vLayout:2,vRule1:!1,vRule2:!1,vRule3:!1,vRule4:!1,vRule5:!1};else return;return E},le=function(T,A,p){p=p.replace(/\r\n/g,`
`).replace(/\r/g,`
`);let E=p.split(`
`),L=[],I,k,N;for(k=E.length,I=0;I<k;I++)L=L.concat(K(E[I],i[T],A));for(k=L.length,N=L[0],I=1;I<k;I++)N=G(N,L[I],A);return N?N.join(`
`):""};function z(T,A){let p=JSON.parse(JSON.stringify(T)),E,L;if(typeof A.horizontalLayout<"u"){E=U(A.horizontalLayout,T);for(L in E)E.hasOwnProperty(L)&&(p.fittingRules[L]=E[L])}if(typeof A.verticalLayout<"u"){E=Y(A.verticalLayout,T);for(L in E)E.hasOwnProperty(L)&&(p.fittingRules[L]=E[L])}return p.printDirection=typeof A.printDirection<"u"?A.printDirection:T.printDirection,p.showHardBlanks=A.showHardBlanks||!1,p.width=A.width||-1,p.whitespaceBreak=A.whitespaceBreak||!1,p}let pe=function(T,A,p){pe.text(T,A,p)};return pe.text=function(T,A,p){let E="";T=T+"",typeof arguments[1]=="function"&&(p=A,A={},A.font=s.font),typeof A=="string"?(E=A,A={}):(A=A||{},E=A.font||s.font),pe.loadFont(E,function(L,I){if(L)return p(L);p(null,le(E,z(I,A),T))})},pe.textSync=function(T,A){let p="";T=T+"",typeof A=="string"?(p=A,A={}):(A=A||{},p=A.font||s.font);var E=z(pe.loadFontSync(p),A);return le(p,E,T)},pe.metadata=function(T,A){T=T+"",pe.loadFont(T,function(p,E){if(p){A(p);return}A(null,E,i[T].comment)})},pe.defaults=function(T){if(typeof T=="object"&&T!==null)for(var A in T)T.hasOwnProperty(A)&&(s[A]=T[A]);return JSON.parse(JSON.stringify(s))},pe.parseFont=function(T,A){A=A.replace(/\r\n/g,`
`).replace(/\r/g,`
`),i[T]={};var p=A.split(`
`),E=p.splice(0,1)[0].split(" "),L=i[T],I={};if(I.hardBlank=E[0].substr(5,1),I.height=parseInt(E[1],10),I.baseline=parseInt(E[2],10),I.maxLength=parseInt(E[3],10),I.oldLayout=parseInt(E[4],10),I.numCommentLines=parseInt(E[5],10),I.printDirection=E.length>=6?parseInt(E[6],10):0,I.fullLayout=E.length>=7?parseInt(E[7],10):null,I.codeTagCount=E.length>=8?parseInt(E[8],10):null,I.fittingRules=o(I.oldLayout,I.fullLayout),L.options=I,I.hardBlank.length!==1||isNaN(I.height)||isNaN(I.baseline)||isNaN(I.maxLength)||isNaN(I.oldLayout)||isNaN(I.numCommentLines))throw new Error("FIGlet header contains invalid values.");let k=[],N;for(N=32;N<=126;N++)k.push(N);if(k=k.concat(196,214,220,228,246,252,223),p.length<I.numCommentLines+I.height*k.length)throw new Error("FIGlet file is missing data.");let O,x,Z=!1;for(L.comment=p.splice(0,I.numCommentLines).join(`
`),L.numChars=0;p.length>0&&L.numChars<k.length;){for(O=k[L.numChars],L[O]=p.splice(0,I.height),N=0;N<I.height;N++)typeof L[O][N]>"u"?L[O][N]="":(x=new RegExp("\\"+L[O][N].substr(L[O][N].length-1,1)+"+$"),L[O][N]=L[O][N].replace(x,""));L.numChars++}for(;p.length>0;){if(O=p.splice(0,1)[0].split(" ")[0],/^0[xX][0-9a-fA-F]+$/.test(O))O=parseInt(O,16);else if(/^0[0-7]+$/.test(O))O=parseInt(O,8);else if(/^[0-9]+$/.test(O))O=parseInt(O,10);else if(/^-0[xX][0-9a-fA-F]+$/.test(O))O=parseInt(O,16);else{if(O==="")break;console.log("Invalid data:"+O),Z=!0;break}for(L[O]=p.splice(0,I.height),N=0;N<I.height;N++)typeof L[O][N]>"u"?L[O][N]="":(x=new RegExp("\\"+L[O][N].substr(L[O][N].length-1,1)+"+$"),L[O][N]=L[O][N].replace(x,""));L.numChars++}if(Z===!0)throw new Error("Error parsing data.");return I},pe.loadFont=function(T,A){if(i[T]){A(null,i[T].options);return}if(typeof fetch!="function")throw console.error("figlet.js requires the fetch API or a fetch polyfill such as https://cdnjs.com/libraries/fetch"),new Error("fetch is required for figlet.js to work.");fetch(s.fontPath+"/"+T+".flf").then(function(p){if(p.ok)return p.text();throw console.log("Unexpected response",p),new Error("Network response was not ok.")}).then(function(p){A(null,pe.parseFont(T,p))}).catch(A)},pe.loadFontSync=function(T){if(i[T])return i[T].options;throw new Error("synchronous font loading is not implemented for the browser")},pe.preloadFonts=function(T,A){let p=[];T.reduce(function(E,L){return E.then(function(){return fetch(s.fontPath+"/"+L+".flf").then(I=>I.text()).then(function(I){p.push(I)})})},Promise.resolve()).then(function(E){for(var L in T)T.hasOwnProperty(L)&&pe.parseFont(T[L],p[L]);A&&A()})},pe.figFonts=i,pe})();typeof er<"u"&&typeof er.exports<"u"&&(er.exports=_g)});var Dl=_((wb,Ml)=>{var Fe=xl(),tr=require("fs"),hs=require("path"),nr=hs.join(__dirname,"/../fonts/");Fe.loadFont=function(n,e){if(Fe.figFonts[n]){e(null,Fe.figFonts[n].options);return}tr.readFile(hs.join(nr,n+".flf"),{encoding:"utf-8"},function(t,r){if(t)return e(t);r=r+"";try{e(null,Fe.parseFont(n,r))}catch(i){e(i)}})};Fe.loadFontSync=function(n){if(Fe.figFonts[n])return Fe.figFonts[n].options;var e=tr.readFileSync(hs.join(nr,n+".flf"),{encoding:"utf-8"});return e=e+"",Fe.parseFont(n,e)};Fe.fonts=function(n){var e=[];tr.readdir(nr,function(t,r){if(t)return n(t);r.forEach(function(i){/\.flf$/.test(i)&&e.push(i.replace(/\.flf$/,""))}),n(null,e)})};Fe.fontsSync=function(){var n=[];return tr.readdirSync(nr).forEach(function(e){/\.flf$/.test(e)&&n.push(e.replace(/\.flf$/,""))}),n};Ml.exports=Fe});var Hl=_((bb,jl)=>{"use strict";jl.exports={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]}});var ds=_((Nb,Ul)=>{var Zt=Hl(),Bl={};for(let n of Object.keys(Zt))Bl[Zt[n]]=n;var q={rgb:{channels:3,labels:"rgb"},hsl:{channels:3,labels:"hsl"},hsv:{channels:3,labels:"hsv"},hwb:{channels:3,labels:"hwb"},cmyk:{channels:4,labels:"cmyk"},xyz:{channels:3,labels:"xyz"},lab:{channels:3,labels:"lab"},lch:{channels:3,labels:"lch"},hex:{channels:1,labels:["hex"]},keyword:{channels:1,labels:["keyword"]},ansi16:{channels:1,labels:["ansi16"]},ansi256:{channels:1,labels:["ansi256"]},hcg:{channels:3,labels:["h","c","g"]},apple:{channels:3,labels:["r16","g16","b16"]},gray:{channels:1,labels:["gray"]}};Ul.exports=q;for(let n of Object.keys(q)){if(!("channels"in q[n]))throw new Error("missing channels property: "+n);if(!("labels"in q[n]))throw new Error("missing channel labels property: "+n);if(q[n].labels.length!==q[n].channels)throw new Error("channel and label counts mismatch: "+n);let{channels:e,labels:t}=q[n];delete q[n].channels,delete q[n].labels,Object.defineProperty(q[n],"channels",{value:e}),Object.defineProperty(q[n],"labels",{value:t})}q.rgb.hsl=function(n){let e=n[0]/255,t=n[1]/255,r=n[2]/255,i=Math.min(e,t,r),s=Math.max(e,t,r),o=s-i,a,l;s===i?a=0:e===s?a=(t-r)/o:t===s?a=2+(r-e)/o:r===s&&(a=4+(e-t)/o),a=Math.min(a*60,360),a<0&&(a+=360);let c=(i+s)/2;return s===i?l=0:c<=.5?l=o/(s+i):l=o/(2-s-i),[a,l*100,c*100]};q.rgb.hsv=function(n){let e,t,r,i,s,o=n[0]/255,a=n[1]/255,l=n[2]/255,c=Math.max(o,a,l),u=c-Math.min(o,a,l),f=function(d){return(c-d)/6/u+1/2};return u===0?(i=0,s=0):(s=u/c,e=f(o),t=f(a),r=f(l),o===c?i=r-t:a===c?i=1/3+e-r:l===c&&(i=2/3+t-e),i<0?i+=1:i>1&&(i-=1)),[i*360,s*100,c*100]};q.rgb.hwb=function(n){let e=n[0],t=n[1],r=n[2],i=q.rgb.hsl(n)[0],s=1/255*Math.min(e,Math.min(t,r));return r=1-1/255*Math.max(e,Math.max(t,r)),[i,s*100,r*100]};q.rgb.cmyk=function(n){let e=n[0]/255,t=n[1]/255,r=n[2]/255,i=Math.min(1-e,1-t,1-r),s=(1-e-i)/(1-i)||0,o=(1-t-i)/(1-i)||0,a=(1-r-i)/(1-i)||0;return[s*100,o*100,a*100,i*100]};function mg(n,e){return(n[0]-e[0])**2+(n[1]-e[1])**2+(n[2]-e[2])**2}q.rgb.keyword=function(n){let e=Bl[n];if(e)return e;let t=1/0,r;for(let i of Object.keys(Zt)){let s=Zt[i],o=mg(n,s);o<t&&(t=o,r=i)}return r};q.keyword.rgb=function(n){return Zt[n]};q.rgb.xyz=function(n){let e=n[0]/255,t=n[1]/255,r=n[2]/255;e=e>.04045?((e+.055)/1.055)**2.4:e/12.92,t=t>.04045?((t+.055)/1.055)**2.4:t/12.92,r=r>.04045?((r+.055)/1.055)**2.4:r/12.92;let i=e*.4124+t*.3576+r*.1805,s=e*.2126+t*.7152+r*.0722,o=e*.0193+t*.1192+r*.9505;return[i*100,s*100,o*100]};q.rgb.lab=function(n){let e=q.rgb.xyz(n),t=e[0],r=e[1],i=e[2];t/=95.047,r/=100,i/=108.883,t=t>.008856?t**(1/3):7.787*t+16/116,r=r>.008856?r**(1/3):7.787*r+16/116,i=i>.008856?i**(1/3):7.787*i+16/116;let s=116*r-16,o=500*(t-r),a=200*(r-i);return[s,o,a]};q.hsl.rgb=function(n){let e=n[0]/360,t=n[1]/100,r=n[2]/100,i,s,o;if(t===0)return o=r*255,[o,o,o];r<.5?i=r*(1+t):i=r+t-r*t;let a=2*r-i,l=[0,0,0];for(let c=0;c<3;c++)s=e+1/3*-(c-1),s<0&&s++,s>1&&s--,6*s<1?o=a+(i-a)*6*s:2*s<1?o=i:3*s<2?o=a+(i-a)*(2/3-s)*6:o=a,l[c]=o*255;return l};q.hsl.hsv=function(n){let e=n[0],t=n[1]/100,r=n[2]/100,i=t,s=Math.max(r,.01);r*=2,t*=r<=1?r:2-r,i*=s<=1?s:2-s;let o=(r+t)/2,a=r===0?2*i/(s+i):2*t/(r+t);return[e,a*100,o*100]};q.hsv.rgb=function(n){let e=n[0]/60,t=n[1]/100,r=n[2]/100,i=Math.floor(e)%6,s=e-Math.floor(e),o=255*r*(1-t),a=255*r*(1-t*s),l=255*r*(1-t*(1-s));switch(r*=255,i){case 0:return[r,l,o];case 1:return[a,r,o];case 2:return[o,r,l];case 3:return[o,a,r];case 4:return[l,o,r];case 5:return[r,o,a]}};q.hsv.hsl=function(n){let e=n[0],t=n[1]/100,r=n[2]/100,i=Math.max(r,.01),s,o;o=(2-t)*r;let a=(2-t)*i;return s=t*i,s/=a<=1?a:2-a,s=s||0,o/=2,[e,s*100,o*100]};q.hwb.rgb=function(n){let e=n[0]/360,t=n[1]/100,r=n[2]/100,i=t+r,s;i>1&&(t/=i,r/=i);let o=Math.floor(6*e),a=1-r;s=6*e-o,o&1&&(s=1-s);let l=t+s*(a-t),c,u,f;switch(o){default:case 6:case 0:c=a,u=l,f=t;break;case 1:c=l,u=a,f=t;break;case 2:c=t,u=a,f=l;break;case 3:c=t,u=l,f=a;break;case 4:c=l,u=t,f=a;break;case 5:c=a,u=t,f=l;break}return[c*255,u*255,f*255]};q.cmyk.rgb=function(n){let e=n[0]/100,t=n[1]/100,r=n[2]/100,i=n[3]/100,s=1-Math.min(1,e*(1-i)+i),o=1-Math.min(1,t*(1-i)+i),a=1-Math.min(1,r*(1-i)+i);return[s*255,o*255,a*255]};q.xyz.rgb=function(n){let e=n[0]/100,t=n[1]/100,r=n[2]/100,i,s,o;return i=e*3.2406+t*-1.5372+r*-.4986,s=e*-.9689+t*1.8758+r*.0415,o=e*.0557+t*-.204+r*1.057,i=i>.0031308?1.055*i**(1/2.4)-.055:i*12.92,s=s>.0031308?1.055*s**(1/2.4)-.055:s*12.92,o=o>.0031308?1.055*o**(1/2.4)-.055:o*12.92,i=Math.min(Math.max(0,i),1),s=Math.min(Math.max(0,s),1),o=Math.min(Math.max(0,o),1),[i*255,s*255,o*255]};q.xyz.lab=function(n){let e=n[0],t=n[1],r=n[2];e/=95.047,t/=100,r/=108.883,e=e>.008856?e**(1/3):7.787*e+16/116,t=t>.008856?t**(1/3):7.787*t+16/116,r=r>.008856?r**(1/3):7.787*r+16/116;let i=116*t-16,s=500*(e-t),o=200*(t-r);return[i,s,o]};q.lab.xyz=function(n){let e=n[0],t=n[1],r=n[2],i,s,o;s=(e+16)/116,i=t/500+s,o=s-r/200;let a=s**3,l=i**3,c=o**3;return s=a>.008856?a:(s-16/116)/7.787,i=l>.008856?l:(i-16/116)/7.787,o=c>.008856?c:(o-16/116)/7.787,i*=95.047,s*=100,o*=108.883,[i,s,o]};q.lab.lch=function(n){let e=n[0],t=n[1],r=n[2],i;i=Math.atan2(r,t)*360/2/Math.PI,i<0&&(i+=360);let o=Math.sqrt(t*t+r*r);return[e,o,i]};q.lch.lab=function(n){let e=n[0],t=n[1],i=n[2]/360*2*Math.PI,s=t*Math.cos(i),o=t*Math.sin(i);return[e,s,o]};q.rgb.ansi16=function(n,e=null){let[t,r,i]=n,s=e===null?q.rgb.hsv(n)[2]:e;if(s=Math.round(s/50),s===0)return 30;let o=30+(Math.round(i/255)<<2|Math.round(r/255)<<1|Math.round(t/255));return s===2&&(o+=60),o};q.hsv.ansi16=function(n){return q.rgb.ansi16(q.hsv.rgb(n),n[2])};q.rgb.ansi256=function(n){let e=n[0],t=n[1],r=n[2];return e===t&&t===r?e<8?16:e>248?231:Math.round((e-8)/247*24)+232:16+36*Math.round(e/255*5)+6*Math.round(t/255*5)+Math.round(r/255*5)};q.ansi16.rgb=function(n){let e=n%10;if(e===0||e===7)return n>50&&(e+=3.5),e=e/10.5*255,[e,e,e];let t=(~~(n>50)+1)*.5,r=(e&1)*t*255,i=(e>>1&1)*t*255,s=(e>>2&1)*t*255;return[r,i,s]};q.ansi256.rgb=function(n){if(n>=232){let s=(n-232)*10+8;return[s,s,s]}n-=16;let e,t=Math.floor(n/36)/5*255,r=Math.floor((e=n%36)/6)/5*255,i=e%6/5*255;return[t,r,i]};q.rgb.hex=function(n){let t=(((Math.round(n[0])&255)<<16)+((Math.round(n[1])&255)<<8)+(Math.round(n[2])&255)).toString(16).toUpperCase();return"000000".substring(t.length)+t};q.hex.rgb=function(n){let e=n.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);if(!e)return[0,0,0];let t=e[0];e[0].length===3&&(t=t.split("").map(a=>a+a).join(""));let r=parseInt(t,16),i=r>>16&255,s=r>>8&255,o=r&255;return[i,s,o]};q.rgb.hcg=function(n){let e=n[0]/255,t=n[1]/255,r=n[2]/255,i=Math.max(Math.max(e,t),r),s=Math.min(Math.min(e,t),r),o=i-s,a,l;return o<1?a=s/(1-o):a=0,o<=0?l=0:i===e?l=(t-r)/o%6:i===t?l=2+(r-e)/o:l=4+(e-t)/o,l/=6,l%=1,[l*360,o*100,a*100]};q.hsl.hcg=function(n){let e=n[1]/100,t=n[2]/100,r=t<.5?2*e*t:2*e*(1-t),i=0;return r<1&&(i=(t-.5*r)/(1-r)),[n[0],r*100,i*100]};q.hsv.hcg=function(n){let e=n[1]/100,t=n[2]/100,r=e*t,i=0;return r<1&&(i=(t-r)/(1-r)),[n[0],r*100,i*100]};q.hcg.rgb=function(n){let e=n[0]/360,t=n[1]/100,r=n[2]/100;if(t===0)return[r*255,r*255,r*255];let i=[0,0,0],s=e%1*6,o=s%1,a=1-o,l=0;switch(Math.floor(s)){case 0:i[0]=1,i[1]=o,i[2]=0;break;case 1:i[0]=a,i[1]=1,i[2]=0;break;case 2:i[0]=0,i[1]=1,i[2]=o;break;case 3:i[0]=0,i[1]=a,i[2]=1;break;case 4:i[0]=o,i[1]=0,i[2]=1;break;default:i[0]=1,i[1]=0,i[2]=a}return l=(1-t)*r,[(t*i[0]+l)*255,(t*i[1]+l)*255,(t*i[2]+l)*255]};q.hcg.hsv=function(n){let e=n[1]/100,t=n[2]/100,r=e+t*(1-e),i=0;return r>0&&(i=e/r),[n[0],i*100,r*100]};q.hcg.hsl=function(n){let e=n[1]/100,r=n[2]/100*(1-e)+.5*e,i=0;return r>0&&r<.5?i=e/(2*r):r>=.5&&r<1&&(i=e/(2*(1-r))),[n[0],i*100,r*100]};q.hcg.hwb=function(n){let e=n[1]/100,t=n[2]/100,r=e+t*(1-e);return[n[0],(r-e)*100,(1-r)*100]};q.hwb.hcg=function(n){let e=n[1]/100,r=1-n[2]/100,i=r-e,s=0;return i<1&&(s=(r-i)/(1-i)),[n[0],i*100,s*100]};q.apple.rgb=function(n){return[n[0]/65535*255,n[1]/65535*255,n[2]/65535*255]};q.rgb.apple=function(n){return[n[0]/255*65535,n[1]/255*65535,n[2]/255*65535]};q.gray.rgb=function(n){return[n[0]/100*255,n[0]/100*255,n[0]/100*255]};q.gray.hsl=function(n){return[0,0,n[0]]};q.gray.hsv=q.gray.hsl;q.gray.hwb=function(n){return[0,100,n[0]]};q.gray.cmyk=function(n){return[0,0,0,n[0]]};q.gray.lab=function(n){return[n[0],0,0]};q.gray.hex=function(n){let e=Math.round(n[0]/100*255)&255,r=((e<<16)+(e<<8)+e).toString(16).toUpperCase();return"000000".substring(r.length)+r};q.rgb.gray=function(n){return[(n[0]+n[1]+n[2])/3/255*100]}});var Wl=_((Ob,Vl)=>{var rr=ds();function gg(){let n={},e=Object.keys(rr);for(let t=e.length,r=0;r<t;r++)n[e[r]]={distance:-1,parent:null};return n}function yg(n){let e=gg(),t=[n];for(e[n].distance=0;t.length;){let r=t.pop(),i=Object.keys(rr[r]);for(let s=i.length,o=0;o<s;o++){let a=i[o],l=e[a];l.distance===-1&&(l.distance=e[r].distance+1,l.parent=r,t.unshift(a))}}return e}function Eg(n,e){return function(t){return e(n(t))}}function Tg(n,e){let t=[e[n].parent,n],r=rr[e[n].parent][n],i=e[n].parent;for(;e[i].parent;)t.unshift(e[i].parent),r=Eg(rr[e[i].parent][i],r),i=e[i].parent;return r.conversion=t,r}Vl.exports=function(n){let e=yg(n),t={},r=Object.keys(e);for(let i=r.length,s=0;s<i;s++){let o=r[s];e[o].parent!==null&&(t[o]=Tg(o,e))}return t}});var Kl=_((Rb,Gl)=>{var ps=ds(),Lg=Wl(),vt={},Ag=Object.keys(ps);function Sg(n){let e=function(...t){let r=t[0];return r==null?r:(r.length>1&&(t=r),n(t))};return"conversion"in n&&(e.conversion=n.conversion),e}function Ig(n){let e=function(...t){let r=t[0];if(r==null)return r;r.length>1&&(t=r);let i=n(t);if(typeof i=="object")for(let s=i.length,o=0;o<s;o++)i[o]=Math.round(i[o]);return i};return"conversion"in n&&(e.conversion=n.conversion),e}Ag.forEach(n=>{vt[n]={},Object.defineProperty(vt[n],"channels",{value:ps[n].channels}),Object.defineProperty(vt[n],"labels",{value:ps[n].labels});let e=Lg(n);Object.keys(e).forEach(r=>{let i=e[r];vt[n][r]=Ig(i),vt[n][r].raw=Sg(i)})});Gl.exports=vt});var Zl=_((Cb,Ql)=>{"use strict";var Yl=(n,e)=>(...t)=>`\x1B[${n(...t)+e}m`,Jl=(n,e)=>(...t)=>{let r=n(...t);return`\x1B[${38+e};5;${r}m`},Xl=(n,e)=>(...t)=>{let r=n(...t);return`\x1B[${38+e};2;${r[0]};${r[1]};${r[2]}m`},ir=n=>n,zl=(n,e,t)=>[n,e,t],bt=(n,e,t)=>{Object.defineProperty(n,e,{get:()=>{let r=t();return Object.defineProperty(n,e,{value:r,enumerable:!0,configurable:!0}),r},enumerable:!0,configurable:!0})},_s,Nt=(n,e,t,r)=>{_s===void 0&&(_s=Kl());let i=r?10:0,s={};for(let[o,a]of Object.entries(_s)){let l=o==="ansi16"?"ansi":o;o===e?s[l]=n(t,i):typeof a=="object"&&(s[l]=n(a[e],i))}return s};function wg(){let n=new Map,e={modifier:{reset:[0,0],bold:[1,22],dim:[2,22],italic:[3,23],underline:[4,24],inverse:[7,27],hidden:[8,28],strikethrough:[9,29]},color:{black:[30,39],red:[31,39],green:[32,39],yellow:[33,39],blue:[34,39],magenta:[35,39],cyan:[36,39],white:[37,39],blackBright:[90,39],redBright:[91,39],greenBright:[92,39],yellowBright:[93,39],blueBright:[94,39],magentaBright:[95,39],cyanBright:[96,39],whiteBright:[97,39]},bgColor:{bgBlack:[40,49],bgRed:[41,49],bgGreen:[42,49],bgYellow:[43,49],bgBlue:[44,49],bgMagenta:[45,49],bgCyan:[46,49],bgWhite:[47,49],bgBlackBright:[100,49],bgRedBright:[101,49],bgGreenBright:[102,49],bgYellowBright:[103,49],bgBlueBright:[104,49],bgMagentaBright:[105,49],bgCyanBright:[106,49],bgWhiteBright:[107,49]}};e.color.gray=e.color.blackBright,e.bgColor.bgGray=e.bgColor.bgBlackBright,e.color.grey=e.color.blackBright,e.bgColor.bgGrey=e.bgColor.bgBlackBright;for(let[t,r]of Object.entries(e)){for(let[i,s]of Object.entries(r))e[i]={open:`\x1B[${s[0]}m`,close:`\x1B[${s[1]}m`},r[i]=e[i],n.set(s[0],s[1]);Object.defineProperty(e,t,{value:r,enumerable:!1})}return Object.defineProperty(e,"codes",{value:n,enumerable:!1}),e.color.close="\x1B[39m",e.bgColor.close="\x1B[49m",bt(e.color,"ansi",()=>Nt(Yl,"ansi16",ir,!1)),bt(e.color,"ansi256",()=>Nt(Jl,"ansi256",ir,!1)),bt(e.color,"ansi16m",()=>Nt(Xl,"rgb",zl,!1)),bt(e.bgColor,"ansi",()=>Nt(Yl,"ansi16",ir,!0)),bt(e.bgColor,"ansi256",()=>Nt(Jl,"ansi256",ir,!0)),bt(e.bgColor,"ansi16m",()=>Nt(Xl,"rgb",zl,!0)),e}Object.defineProperty(Ql,"exports",{enumerable:!0,get:wg})});var tc=_((kb,ec)=>{"use strict";ec.exports=(n,e=process.argv)=>{let t=n.startsWith("-")?"":n.length===1?"-":"--",r=e.indexOf(t+n),i=e.indexOf("--");return r!==-1&&(i===-1||r<i)}});var ic=_((Pb,rc)=>{"use strict";var vg=require("os"),nc=require("tty"),Pe=tc(),{env:fe}=process,Qe;Pe("no-color")||Pe("no-colors")||Pe("color=false")||Pe("color=never")?Qe=0:(Pe("color")||Pe("colors")||Pe("color=true")||Pe("color=always"))&&(Qe=1);"FORCE_COLOR"in fe&&(fe.FORCE_COLOR==="true"?Qe=1:fe.FORCE_COLOR==="false"?Qe=0:Qe=fe.FORCE_COLOR.length===0?1:Math.min(parseInt(fe.FORCE_COLOR,10),3));function ms(n){return n===0?!1:{level:n,hasBasic:!0,has256:n>=2,has16m:n>=3}}function gs(n,e){if(Qe===0)return 0;if(Pe("color=16m")||Pe("color=full")||Pe("color=truecolor"))return 3;if(Pe("color=256"))return 2;if(n&&!e&&Qe===void 0)return 0;let t=Qe||0;if(fe.TERM==="dumb")return t;if(process.platform==="win32"){let r=vg.release().split(".");return Number(r[0])>=10&&Number(r[2])>=10586?Number(r[2])>=14931?3:2:1}if("CI"in fe)return["TRAVIS","CIRCLECI","APPVEYOR","GITLAB_CI","GITHUB_ACTIONS","BUILDKITE"].some(r=>r in fe)||fe.CI_NAME==="codeship"?1:t;if("TEAMCITY_VERSION"in fe)return/^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(fe.TEAMCITY_VERSION)?1:0;if(fe.COLORTERM==="truecolor")return 3;if("TERM_PROGRAM"in fe){let r=parseInt((fe.TERM_PROGRAM_VERSION||"").split(".")[0],10);switch(fe.TERM_PROGRAM){case"iTerm.app":return r>=3?3:2;case"Apple_Terminal":return 2}}return/-256(color)?$/i.test(fe.TERM)?2:/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(fe.TERM)||"COLORTERM"in fe?1:t}function bg(n){let e=gs(n,n&&n.isTTY);return ms(e)}rc.exports={supportsColor:bg,stdout:ms(gs(!0,nc.isatty(1))),stderr:ms(gs(!0,nc.isatty(2)))}});var oc=_(($b,sc)=>{"use strict";var Ng=(n,e,t)=>{let r=n.indexOf(e);if(r===-1)return n;let i=e.length,s=0,o="";do o+=n.substr(s,r-s)+e+t,s=r+i,r=n.indexOf(e,s);while(r!==-1);return o+=n.substr(s),o},Og=(n,e,t,r)=>{let i=0,s="";do{let o=n[r-1]==="\r";s+=n.substr(i,(o?r-1:r)-i)+e+(o?`\r
`:`
`)+t,i=r+1,r=n.indexOf(`
`,i)}while(r!==-1);return s+=n.substr(i),s};sc.exports={stringReplaceAll:Ng,stringEncaseCRLFWithFirstIndex:Og}});var fc=_((qb,uc)=>{"use strict";var Rg=/(?:\\(u(?:[a-f\d]{4}|\{[a-f\d]{1,6}\})|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi,ac=/(?:^|\.)(\w+)(?:\(([^)]*)\))?/g,Cg=/^(['"])((?:\\.|(?!\1)[^\\])*)\1$/,kg=/\\(u(?:[a-f\d]{4}|{[a-f\d]{1,6}})|x[a-f\d]{2}|.)|([^\\])/gi,Pg=new Map([["n",`
`],["r","\r"],["t","	"],["b","\b"],["f","\f"],["v","\v"],["0","\0"],["\\","\\"],["e","\x1B"],["a","\x07"]]);function cc(n){let e=n[0]==="u",t=n[1]==="{";return e&&!t&&n.length===5||n[0]==="x"&&n.length===3?String.fromCharCode(parseInt(n.slice(1),16)):e&&t?String.fromCodePoint(parseInt(n.slice(2,-1),16)):Pg.get(n)||n}function $g(n,e){let t=[],r=e.trim().split(/\s*,\s*/g),i;for(let s of r){let o=Number(s);if(!Number.isNaN(o))t.push(o);else if(i=s.match(Cg))t.push(i[2].replace(kg,(a,l,c)=>l?cc(l):c));else throw new Error(`Invalid Chalk template style argument: ${s} (in style '${n}')`)}return t}function qg(n){ac.lastIndex=0;let e=[],t;for(;(t=ac.exec(n))!==null;){let r=t[1];if(t[2]){let i=$g(r,t[2]);e.push([r].concat(i))}else e.push([r])}return e}function lc(n,e){let t={};for(let i of e)for(let s of i.styles)t[s[0]]=i.inverse?null:s.slice(1);let r=n;for(let[i,s]of Object.entries(t))if(Array.isArray(s)){if(!(i in r))throw new Error(`Unknown Chalk style: ${i}`);r=s.length>0?r[i](...s):r[i]}return r}uc.exports=(n,e)=>{let t=[],r=[],i=[];if(e.replace(Rg,(s,o,a,l,c,u)=>{if(o)i.push(cc(o));else if(l){let f=i.join("");i=[],r.push(t.length===0?f:lc(n,t)(f)),t.push({inverse:a,styles:qg(l)})}else if(c){if(t.length===0)throw new Error("Found extraneous } in Chalk template literal");r.push(lc(n,t)(i.join(""))),i=[],t.pop()}else i.push(u)}),r.push(i.join("")),t.length>0){let s=`Chalk template literal is missing ${t.length} closing bracket${t.length===1?"":"s"} (\`}\`)`;throw new Error(s)}return r.join("")}});var yc=_((xb,gc)=>{"use strict";var en=Zl(),{stdout:Es,stderr:Ts}=ic(),{stringReplaceAll:xg,stringEncaseCRLFWithFirstIndex:Mg}=oc(),{isArray:sr}=Array,dc=["ansi","ansi","ansi256","ansi16m"],Ot=Object.create(null),Dg=(n,e={})=>{if(e.level&&!(Number.isInteger(e.level)&&e.level>=0&&e.level<=3))throw new Error("The `level` option should be an integer from 0 to 3");let t=Es?Es.level:0;n.level=e.level===void 0?t:e.level},Ls=class{constructor(e){return pc(e)}},pc=n=>{let e={};return Dg(e,n),e.template=(...t)=>mc(e.template,...t),Object.setPrototypeOf(e,or.prototype),Object.setPrototypeOf(e.template,e),e.template.constructor=()=>{throw new Error("`chalk.constructor()` is deprecated. Use `new chalk.Instance()` instead.")},e.template.Instance=Ls,e.template};function or(n){return pc(n)}for(let[n,e]of Object.entries(en))Ot[n]={get(){let t=ar(this,As(e.open,e.close,this._styler),this._isEmpty);return Object.defineProperty(this,n,{value:t}),t}};Ot.visible={get(){let n=ar(this,this._styler,!0);return Object.defineProperty(this,"visible",{value:n}),n}};var _c=["rgb","hex","keyword","hsl","hsv","hwb","ansi","ansi256"];for(let n of _c)Ot[n]={get(){let{level:e}=this;return function(...t){let r=As(en.color[dc[e]][n](...t),en.color.close,this._styler);return ar(this,r,this._isEmpty)}}};for(let n of _c){let e="bg"+n[0].toUpperCase()+n.slice(1);Ot[e]={get(){let{level:t}=this;return function(...r){let i=As(en.bgColor[dc[t]][n](...r),en.bgColor.close,this._styler);return ar(this,i,this._isEmpty)}}}}var Fg=Object.defineProperties(()=>{},{...Ot,level:{enumerable:!0,get(){return this._generator.level},set(n){this._generator.level=n}}}),As=(n,e,t)=>{let r,i;return t===void 0?(r=n,i=e):(r=t.openAll+n,i=e+t.closeAll),{open:n,close:e,openAll:r,closeAll:i,parent:t}},ar=(n,e,t)=>{let r=(...i)=>sr(i[0])&&sr(i[0].raw)?hc(r,mc(r,...i)):hc(r,i.length===1?""+i[0]:i.join(" "));return Object.setPrototypeOf(r,Fg),r._generator=n,r._styler=e,r._isEmpty=t,r},hc=(n,e)=>{if(n.level<=0||!e)return n._isEmpty?"":e;let t=n._styler;if(t===void 0)return e;let{openAll:r,closeAll:i}=t;if(e.indexOf("\x1B")!==-1)for(;t!==void 0;)e=xg(e,t.close,t.open),t=t.parent;let s=e.indexOf(`
`);return s!==-1&&(e=Mg(e,i,r,s)),r+e+i},ys,mc=(n,...e)=>{let[t]=e;if(!sr(t)||!sr(t.raw))return e.join(" ");let r=e.slice(1),i=[t.raw[0]];for(let s=1;s<t.length;s++)i.push(String(r[s-1]).replace(/[{}\\]/g,"\\$&"),String(t.raw[s]));return ys===void 0&&(ys=fc()),ys(n,i.join(""))};Object.defineProperties(or.prototype,Ot);var lr=or();lr.supportsColor=Es;lr.stderr=or({level:Ts?Ts.level:0});lr.stderr.supportsColor=Ts;gc.exports=lr});var Tc=_((Db,Ug)=>{Ug.exports={name:"dotenv",version:"16.3.1",description:"Loads environment variables from .env file",main:"lib/main.js",types:"lib/main.d.ts",exports:{".":{types:"./lib/main.d.ts",require:"./lib/main.js",default:"./lib/main.js"},"./config":"./config.js","./config.js":"./config.js","./lib/env-options":"./lib/env-options.js","./lib/env-options.js":"./lib/env-options.js","./lib/cli-options":"./lib/cli-options.js","./lib/cli-options.js":"./lib/cli-options.js","./package.json":"./package.json"},scripts:{"dts-check":"tsc --project tests/types/tsconfig.json",lint:"standard","lint-readme":"standard-markdown",pretest:"npm run lint && npm run dts-check",test:"tap tests/*.js --100 -Rspec",prerelease:"npm test",release:"standard-version"},repository:{type:"git",url:"git://github.com/motdotla/dotenv.git"},funding:"https://github.com/motdotla/dotenv?sponsor=1",keywords:["dotenv","env",".env","environment","variables","config","settings"],readmeFilename:"README.md",license:"BSD-2-Clause",devDependencies:{"@definitelytyped/dtslint":"^0.0.133","@types/node":"^18.11.3",decache:"^4.6.1",sinon:"^14.0.1",standard:"^17.0.0","standard-markdown":"^7.1.0","standard-version":"^9.5.0",tap:"^16.3.0",tar:"^6.1.11",typescript:"^4.8.4"},engines:{node:">=12"},browser:{fs:!1}}});var Ic=_((Fb,Je)=>{var Lc=require("fs"),Is=require("path"),Vg=require("os"),Wg=require("crypto"),Gg=Tc(),ws=Gg.version,Kg=/(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;function Yg(n){let e={},t=n.toString();t=t.replace(/\r\n?/mg,`
`);let r;for(;(r=Kg.exec(t))!=null;){let i=r[1],s=r[2]||"";s=s.trim();let o=s[0];s=s.replace(/^(['"`])([\s\S]*)\1$/mg,"$2"),o==='"'&&(s=s.replace(/\\n/g,`
`),s=s.replace(/\\r/g,"\r")),e[i]=s}return e}function Jg(n){let e=Sc(n),t=he.configDotenv({path:e});if(!t.parsed)throw new Error(`MISSING_DATA: Cannot parse ${e} for an unknown reason`);let r=Ac(n).split(","),i=r.length,s;for(let o=0;o<i;o++)try{let a=r[o].trim(),l=Qg(t,a);s=he.decrypt(l.ciphertext,l.key);break}catch(a){if(o+1>=i)throw a}return he.parse(s)}function Xg(n){console.log(`[dotenv@${ws}][INFO] ${n}`)}function zg(n){console.log(`[dotenv@${ws}][WARN] ${n}`)}function Ss(n){console.log(`[dotenv@${ws}][DEBUG] ${n}`)}function Ac(n){return n&&n.DOTENV_KEY&&n.DOTENV_KEY.length>0?n.DOTENV_KEY:process.env.DOTENV_KEY&&process.env.DOTENV_KEY.length>0?process.env.DOTENV_KEY:""}function Qg(n,e){let t;try{t=new URL(e)}catch(a){throw a.code==="ERR_INVALID_URL"?new Error("INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenv.org/vault/.env.vault?environment=development"):a}let r=t.password;if(!r)throw new Error("INVALID_DOTENV_KEY: Missing key part");let i=t.searchParams.get("environment");if(!i)throw new Error("INVALID_DOTENV_KEY: Missing environment part");let s=`DOTENV_VAULT_${i.toUpperCase()}`,o=n.parsed[s];if(!o)throw new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${s} in your .env.vault file.`);return{ciphertext:o,key:r}}function Sc(n){let e=Is.resolve(process.cwd(),".env");return n&&n.path&&n.path.length>0&&(e=n.path),e.endsWith(".vault")?e:`${e}.vault`}function Zg(n){return n[0]==="~"?Is.join(Vg.homedir(),n.slice(1)):n}function e0(n){Xg("Loading env from encrypted .env.vault");let e=he._parseVault(n),t=process.env;return n&&n.processEnv!=null&&(t=n.processEnv),he.populate(t,e,n),{parsed:e}}function t0(n){let e=Is.resolve(process.cwd(),".env"),t="utf8",r=!!(n&&n.debug);n&&(n.path!=null&&(e=Zg(n.path)),n.encoding!=null&&(t=n.encoding));try{let i=he.parse(Lc.readFileSync(e,{encoding:t})),s=process.env;return n&&n.processEnv!=null&&(s=n.processEnv),he.populate(s,i,n),{parsed:i}}catch(i){return r&&Ss(`Failed to load ${e} ${i.message}`),{error:i}}}function n0(n){let e=Sc(n);return Ac(n).length===0?he.configDotenv(n):Lc.existsSync(e)?he._configVault(n):(zg(`You set DOTENV_KEY but you are missing a .env.vault file at ${e}. Did you forget to build it?`),he.configDotenv(n))}function r0(n,e){let t=Buffer.from(e.slice(-64),"hex"),r=Buffer.from(n,"base64"),i=r.slice(0,12),s=r.slice(-16);r=r.slice(12,-16);try{let o=Wg.createDecipheriv("aes-256-gcm",t,i);return o.setAuthTag(s),`${o.update(r)}${o.final()}`}catch(o){let a=o instanceof RangeError,l=o.message==="Invalid key length",c=o.message==="Unsupported state or unable to authenticate data";if(a||l){let u="INVALID_DOTENV_KEY: It must be 64 characters long (or more)";throw new Error(u)}else if(c){let u="DECRYPTION_FAILED: Please check your DOTENV_KEY";throw new Error(u)}else throw console.error("Error: ",o.code),console.error("Error: ",o.message),o}}function i0(n,e,t={}){let r=!!(t&&t.debug),i=!!(t&&t.override);if(typeof e!="object")throw new Error("OBJECT_REQUIRED: Please check the processEnv argument being passed to populate");for(let s of Object.keys(e))Object.prototype.hasOwnProperty.call(n,s)?(i===!0&&(n[s]=e[s]),r&&Ss(i===!0?`"${s}" is already defined and WAS overwritten`:`"${s}" is already defined and was NOT overwritten`)):n[s]=e[s]}var he={configDotenv:t0,_configVault:e0,_parseVault:Jg,config:n0,decrypt:r0,parse:Yg,populate:i0};Je.exports.configDotenv=he.configDotenv;Je.exports._configVault=he._configVault;Je.exports._parseVault=he._parseVault;Je.exports.config=he.config;Je.exports.decrypt=he.decrypt;Je.exports.parse=he.parse;Je.exports.populate=he.populate;Je.exports=he});var Ie=_(vs=>{"use strict";vs.fromCallback=function(n){return Object.defineProperty(function(...e){if(typeof e[e.length-1]=="function")n.apply(this,e);else return new Promise((t,r)=>{n.call(this,...e,(i,s)=>i!=null?r(i):t(s))})},"name",{value:n.name})};vs.fromPromise=function(n){return Object.defineProperty(function(...e){let t=e[e.length-1];if(typeof t!="function")return n.apply(this,e);n.apply(this,e.slice(0,-1)).then(r=>t(null,r),t)},"name",{value:n.name})}});var vc=_((Hb,wc)=>{var Ze=require("constants"),s0=process.cwd,ur=null,o0=process.env.GRACEFUL_FS_PLATFORM||process.platform;process.cwd=function(){return ur||(ur=s0.call(process)),ur};try{process.cwd()}catch{}typeof process.chdir=="function"&&(bs=process.chdir,process.chdir=function(n){ur=null,bs.call(process,n)},Object.setPrototypeOf&&Object.setPrototypeOf(process.chdir,bs));var bs;wc.exports=a0;function a0(n){Ze.hasOwnProperty("O_SYMLINK")&&process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)&&e(n),n.lutimes||t(n),n.chown=s(n.chown),n.fchown=s(n.fchown),n.lchown=s(n.lchown),n.chmod=r(n.chmod),n.fchmod=r(n.fchmod),n.lchmod=r(n.lchmod),n.chownSync=o(n.chownSync),n.fchownSync=o(n.fchownSync),n.lchownSync=o(n.lchownSync),n.chmodSync=i(n.chmodSync),n.fchmodSync=i(n.fchmodSync),n.lchmodSync=i(n.lchmodSync),n.stat=a(n.stat),n.fstat=a(n.fstat),n.lstat=a(n.lstat),n.statSync=l(n.statSync),n.fstatSync=l(n.fstatSync),n.lstatSync=l(n.lstatSync),n.chmod&&!n.lchmod&&(n.lchmod=function(u,f,d){d&&process.nextTick(d)},n.lchmodSync=function(){}),n.chown&&!n.lchown&&(n.lchown=function(u,f,d,h){h&&process.nextTick(h)},n.lchownSync=function(){}),o0==="win32"&&(n.rename=typeof n.rename!="function"?n.rename:function(u){function f(d,h,y){var g=Date.now(),m=0;u(d,h,function S(w){if(w&&(w.code==="EACCES"||w.code==="EPERM"||w.code==="EBUSY")&&Date.now()-g<6e4){setTimeout(function(){n.stat(h,function(b,$){b&&b.code==="ENOENT"?u(d,h,S):y(w)})},m),m<100&&(m+=10);return}y&&y(w)})}return Object.setPrototypeOf&&Object.setPrototypeOf(f,u),f}(n.rename)),n.read=typeof n.read!="function"?n.read:function(u){function f(d,h,y,g,m,S){var w;if(S&&typeof S=="function"){var b=0;w=function($,M,v){if($&&$.code==="EAGAIN"&&b<10)return b++,u.call(n,d,h,y,g,m,w);S.apply(this,arguments)}}return u.call(n,d,h,y,g,m,w)}return Object.setPrototypeOf&&Object.setPrototypeOf(f,u),f}(n.read),n.readSync=typeof n.readSync!="function"?n.readSync:function(u){return function(f,d,h,y,g){for(var m=0;;)try{return u.call(n,f,d,h,y,g)}catch(S){if(S.code==="EAGAIN"&&m<10){m++;continue}throw S}}}(n.readSync);function e(u){u.lchmod=function(f,d,h){u.open(f,Ze.O_WRONLY|Ze.O_SYMLINK,d,function(y,g){if(y){h&&h(y);return}u.fchmod(g,d,function(m){u.close(g,function(S){h&&h(m||S)})})})},u.lchmodSync=function(f,d){var h=u.openSync(f,Ze.O_WRONLY|Ze.O_SYMLINK,d),y=!0,g;try{g=u.fchmodSync(h,d),y=!1}finally{if(y)try{u.closeSync(h)}catch{}else u.closeSync(h)}return g}}function t(u){Ze.hasOwnProperty("O_SYMLINK")&&u.futimes?(u.lutimes=function(f,d,h,y){u.open(f,Ze.O_SYMLINK,function(g,m){if(g){y&&y(g);return}u.futimes(m,d,h,function(S){u.close(m,function(w){y&&y(S||w)})})})},u.lutimesSync=function(f,d,h){var y=u.openSync(f,Ze.O_SYMLINK),g,m=!0;try{g=u.futimesSync(y,d,h),m=!1}finally{if(m)try{u.closeSync(y)}catch{}else u.closeSync(y)}return g}):u.futimes&&(u.lutimes=function(f,d,h,y){y&&process.nextTick(y)},u.lutimesSync=function(){})}function r(u){return u&&function(f,d,h){return u.call(n,f,d,function(y){c(y)&&(y=null),h&&h.apply(this,arguments)})}}function i(u){return u&&function(f,d){try{return u.call(n,f,d)}catch(h){if(!c(h))throw h}}}function s(u){return u&&function(f,d,h,y){return u.call(n,f,d,h,function(g){c(g)&&(g=null),y&&y.apply(this,arguments)})}}function o(u){return u&&function(f,d,h){try{return u.call(n,f,d,h)}catch(y){if(!c(y))throw y}}}function a(u){return u&&function(f,d,h){typeof d=="function"&&(h=d,d=null);function y(g,m){m&&(m.uid<0&&(m.uid+=4294967296),m.gid<0&&(m.gid+=4294967296)),h&&h.apply(this,arguments)}return d?u.call(n,f,d,y):u.call(n,f,y)}}function l(u){return u&&function(f,d){var h=d?u.call(n,f,d):u.call(n,f);return h&&(h.uid<0&&(h.uid+=4294967296),h.gid<0&&(h.gid+=4294967296)),h}}function c(u){if(!u||u.code==="ENOSYS")return!0;var f=!process.getuid||process.getuid()!==0;return!!(f&&(u.code==="EINVAL"||u.code==="EPERM"))}}});var Oc=_((Bb,Nc)=>{var bc=require("stream").Stream;Nc.exports=l0;function l0(n){return{ReadStream:e,WriteStream:t};function e(r,i){if(!(this instanceof e))return new e(r,i);bc.call(this);var s=this;this.path=r,this.fd=null,this.readable=!0,this.paused=!1,this.flags="r",this.mode=438,this.bufferSize=64*1024,i=i||{};for(var o=Object.keys(i),a=0,l=o.length;a<l;a++){var c=o[a];this[c]=i[c]}if(this.encoding&&this.setEncoding(this.encoding),this.start!==void 0){if(typeof this.start!="number")throw TypeError("start must be a Number");if(this.end===void 0)this.end=1/0;else if(typeof this.end!="number")throw TypeError("end must be a Number");if(this.start>this.end)throw new Error("start must be <= end");this.pos=this.start}if(this.fd!==null){process.nextTick(function(){s._read()});return}n.open(this.path,this.flags,this.mode,function(u,f){if(u){s.emit("error",u),s.readable=!1;return}s.fd=f,s.emit("open",f),s._read()})}function t(r,i){if(!(this instanceof t))return new t(r,i);bc.call(this),this.path=r,this.fd=null,this.writable=!0,this.flags="w",this.encoding="binary",this.mode=438,this.bytesWritten=0,i=i||{};for(var s=Object.keys(i),o=0,a=s.length;o<a;o++){var l=s[o];this[l]=i[l]}if(this.start!==void 0){if(typeof this.start!="number")throw TypeError("start must be a Number");if(this.start<0)throw new Error("start must be >= zero");this.pos=this.start}this.busy=!1,this._queue=[],this.fd===null&&(this._open=n.open,this._queue.push([this._open,this.path,this.flags,this.mode,void 0]),this.flush())}}});var Cc=_((Ub,Rc)=>{"use strict";Rc.exports=u0;var c0=Object.getPrototypeOf||function(n){return n.__proto__};function u0(n){if(n===null||typeof n!="object")return n;if(n instanceof Object)var e={__proto__:c0(n)};else var e=Object.create(null);return Object.getOwnPropertyNames(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}),e}});var we=_((Vb,Rs)=>{var se=require("fs"),f0=vc(),h0=Oc(),d0=Cc(),fr=require("util"),me,dr;typeof Symbol=="function"&&typeof Symbol.for=="function"?(me=Symbol.for("graceful-fs.queue"),dr=Symbol.for("graceful-fs.previous")):(me="___graceful-fs.queue",dr="___graceful-fs.previous");function p0(){}function $c(n,e){Object.defineProperty(n,me,{get:function(){return e}})}var mt=p0;fr.debuglog?mt=fr.debuglog("gfs4"):/\bgfs4\b/i.test(process.env.NODE_DEBUG||"")&&(mt=function(){var n=fr.format.apply(fr,arguments);n="GFS4: "+n.split(/\n/).join(`
GFS4: `),console.error(n)});se[me]||(kc=global[me]||[],$c(se,kc),se.close=function(n){function e(t,r){return n.call(se,t,function(i){i||Pc(),typeof r=="function"&&r.apply(this,arguments)})}return Object.defineProperty(e,dr,{value:n}),e}(se.close),se.closeSync=function(n){function e(t){n.apply(se,arguments),Pc()}return Object.defineProperty(e,dr,{value:n}),e}(se.closeSync),/\bgfs4\b/i.test(process.env.NODE_DEBUG||"")&&process.on("exit",function(){mt(se[me]),require("assert").equal(se[me].length,0)}));var kc;global[me]||$c(global,se[me]);Rs.exports=Ns(d0(se));process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH&&!se.__patched&&(Rs.exports=Ns(se),se.__patched=!0);function Ns(n){f0(n),n.gracefulify=Ns,n.createReadStream=M,n.createWriteStream=v;var e=n.readFile;n.readFile=t;function t(P,j,D){return typeof j=="function"&&(D=j,j=null),F(P,j,D);function F(X,ie,K,U){return e(X,ie,function(Y){Y&&(Y.code==="EMFILE"||Y.code==="ENFILE")?Rt([F,[X,ie,K],Y,U||Date.now(),Date.now()]):typeof K=="function"&&K.apply(this,arguments)})}}var r=n.writeFile;n.writeFile=i;function i(P,j,D,F){return typeof D=="function"&&(F=D,D=null),X(P,j,D,F);function X(ie,K,U,Y,le){return r(ie,K,U,function(z){z&&(z.code==="EMFILE"||z.code==="ENFILE")?Rt([X,[ie,K,U,Y],z,le||Date.now(),Date.now()]):typeof Y=="function"&&Y.apply(this,arguments)})}}var s=n.appendFile;s&&(n.appendFile=o);function o(P,j,D,F){return typeof D=="function"&&(F=D,D=null),X(P,j,D,F);function X(ie,K,U,Y,le){return s(ie,K,U,function(z){z&&(z.code==="EMFILE"||z.code==="ENFILE")?Rt([X,[ie,K,U,Y],z,le||Date.now(),Date.now()]):typeof Y=="function"&&Y.apply(this,arguments)})}}var a=n.copyFile;a&&(n.copyFile=l);function l(P,j,D,F){return typeof D=="function"&&(F=D,D=0),X(P,j,D,F);function X(ie,K,U,Y,le){return a(ie,K,U,function(z){z&&(z.code==="EMFILE"||z.code==="ENFILE")?Rt([X,[ie,K,U,Y],z,le||Date.now(),Date.now()]):typeof Y=="function"&&Y.apply(this,arguments)})}}var c=n.readdir;n.readdir=f;var u=/^v[0-5]\./;function f(P,j,D){typeof j=="function"&&(D=j,j=null);var F=u.test(process.version)?function(K,U,Y,le){return c(K,X(K,U,Y,le))}:function(K,U,Y,le){return c(K,U,X(K,U,Y,le))};return F(P,j,D);function X(ie,K,U,Y){return function(le,z){le&&(le.code==="EMFILE"||le.code==="ENFILE")?Rt([F,[ie,K,U],le,Y||Date.now(),Date.now()]):(z&&z.sort&&z.sort(),typeof U=="function"&&U.call(this,le,z))}}}if(process.version.substr(0,4)==="v0.8"){var d=h0(n);S=d.ReadStream,b=d.WriteStream}var h=n.ReadStream;h&&(S.prototype=Object.create(h.prototype),S.prototype.open=w);var y=n.WriteStream;y&&(b.prototype=Object.create(y.prototype),b.prototype.open=$),Object.defineProperty(n,"ReadStream",{get:function(){return S},set:function(P){S=P},enumerable:!0,configurable:!0}),Object.defineProperty(n,"WriteStream",{get:function(){return b},set:function(P){b=P},enumerable:!0,configurable:!0});var g=S;Object.defineProperty(n,"FileReadStream",{get:function(){return g},set:function(P){g=P},enumerable:!0,configurable:!0});var m=b;Object.defineProperty(n,"FileWriteStream",{get:function(){return m},set:function(P){m=P},enumerable:!0,configurable:!0});function S(P,j){return this instanceof S?(h.apply(this,arguments),this):S.apply(Object.create(S.prototype),arguments)}function w(){var P=this;G(P.path,P.flags,P.mode,function(j,D){j?(P.autoClose&&P.destroy(),P.emit("error",j)):(P.fd=D,P.emit("open",D),P.read())})}function b(P,j){return this instanceof b?(y.apply(this,arguments),this):b.apply(Object.create(b.prototype),arguments)}function $(){var P=this;G(P.path,P.flags,P.mode,function(j,D){j?(P.destroy(),P.emit("error",j)):(P.fd=D,P.emit("open",D))})}function M(P,j){return new n.ReadStream(P,j)}function v(P,j){return new n.WriteStream(P,j)}var V=n.open;n.open=G;function G(P,j,D,F){return typeof D=="function"&&(F=D,D=null),X(P,j,D,F);function X(ie,K,U,Y,le){return V(ie,K,U,function(z,pe){z&&(z.code==="EMFILE"||z.code==="ENFILE")?Rt([X,[ie,K,U,Y],z,le||Date.now(),Date.now()]):typeof Y=="function"&&Y.apply(this,arguments)})}}return n}function Rt(n){mt("ENQUEUE",n[0].name,n[1]),se[me].push(n),Os()}var hr;function Pc(){for(var n=Date.now(),e=0;e<se[me].length;++e)se[me][e].length>2&&(se[me][e][3]=n,se[me][e][4]=n);Os()}function Os(){if(clearTimeout(hr),hr=void 0,se[me].length!==0){var n=se[me].shift(),e=n[0],t=n[1],r=n[2],i=n[3],s=n[4];if(i===void 0)mt("RETRY",e.name,t),e.apply(null,t);else if(Date.now()-i>=6e4){mt("TIMEOUT",e.name,t);var o=t.pop();typeof o=="function"&&o.call(null,r)}else{var a=Date.now()-s,l=Math.max(s-i,1),c=Math.min(l*1.2,100);a>=c?(mt("RETRY",e.name,t),e.apply(null,t.concat([i]))):se[me].push(n)}hr===void 0&&(hr=setTimeout(Os,0))}}});var gt=_(Xe=>{"use strict";var qc=Ie().fromCallback,Ee=we(),_0=["access","appendFile","chmod","chown","close","copyFile","fchmod","fchown","fdatasync","fstat","fsync","ftruncate","futimes","lchmod","lchown","link","lstat","mkdir","mkdtemp","open","opendir","readdir","readFile","readlink","realpath","rename","rm","rmdir","stat","symlink","truncate","unlink","utimes","writeFile"].filter(n=>typeof Ee[n]=="function");Object.assign(Xe,Ee);_0.forEach(n=>{Xe[n]=qc(Ee[n])});Xe.exists=function(n,e){return typeof e=="function"?Ee.exists(n,e):new Promise(t=>Ee.exists(n,t))};Xe.read=function(n,e,t,r,i,s){return typeof s=="function"?Ee.read(n,e,t,r,i,s):new Promise((o,a)=>{Ee.read(n,e,t,r,i,(l,c,u)=>{if(l)return a(l);o({bytesRead:c,buffer:u})})})};Xe.write=function(n,e,...t){return typeof t[t.length-1]=="function"?Ee.write(n,e,...t):new Promise((r,i)=>{Ee.write(n,e,...t,(s,o,a)=>{if(s)return i(s);r({bytesWritten:o,buffer:a})})})};Xe.readv=function(n,e,...t){return typeof t[t.length-1]=="function"?Ee.readv(n,e,...t):new Promise((r,i)=>{Ee.readv(n,e,...t,(s,o,a)=>{if(s)return i(s);r({bytesRead:o,buffers:a})})})};Xe.writev=function(n,e,...t){return typeof t[t.length-1]=="function"?Ee.writev(n,e,...t):new Promise((r,i)=>{Ee.writev(n,e,...t,(s,o,a)=>{if(s)return i(s);r({bytesWritten:o,buffers:a})})})};typeof Ee.realpath.native=="function"?Xe.realpath.native=qc(Ee.realpath.native):process.emitWarning("fs.realpath.native is not a function. Is fs being monkey-patched?","Warning","fs-extra-WARN0003")});var Mc=_((Gb,xc)=>{"use strict";var m0=require("path");xc.exports.checkPath=function(e){if(process.platform==="win32"&&/[<>:"|?*]/.test(e.replace(m0.parse(e).root,""))){let r=new Error(`Path contains invalid characters: ${e}`);throw r.code="EINVAL",r}}});var Hc=_((Kb,Cs)=>{"use strict";var Dc=gt(),{checkPath:Fc}=Mc(),jc=n=>{let e={mode:511};return typeof n=="number"?n:{...e,...n}.mode};Cs.exports.makeDir=async(n,e)=>(Fc(n),Dc.mkdir(n,{mode:jc(e),recursive:!0}));Cs.exports.makeDirSync=(n,e)=>(Fc(n),Dc.mkdirSync(n,{mode:jc(e),recursive:!0}))});var je=_((Yb,Bc)=>{"use strict";var g0=Ie().fromPromise,{makeDir:y0,makeDirSync:ks}=Hc(),Ps=g0(y0);Bc.exports={mkdirs:Ps,mkdirsSync:ks,mkdirp:Ps,mkdirpSync:ks,ensureDir:Ps,ensureDirSync:ks}});var et=_((Jb,Vc)=>{"use strict";var E0=Ie().fromPromise,Uc=gt();function T0(n){return Uc.access(n).then(()=>!0).catch(()=>!1)}Vc.exports={pathExists:E0(T0),pathExistsSync:Uc.existsSync}});var $s=_((Xb,Wc)=>{"use strict";var Ct=we();function L0(n,e,t,r){Ct.open(n,"r+",(i,s)=>{if(i)return r(i);Ct.futimes(s,e,t,o=>{Ct.close(s,a=>{r&&r(o||a)})})})}function A0(n,e,t){let r=Ct.openSync(n,"r+");return Ct.futimesSync(r,e,t),Ct.closeSync(r)}Wc.exports={utimesMillis:L0,utimesMillisSync:A0}});var yt=_((zb,Yc)=>{"use strict";var kt=gt(),de=require("path"),S0=require("util");function I0(n,e,t){let r=t.dereference?i=>kt.stat(i,{bigint:!0}):i=>kt.lstat(i,{bigint:!0});return Promise.all([r(n),r(e).catch(i=>{if(i.code==="ENOENT")return null;throw i})]).then(([i,s])=>({srcStat:i,destStat:s}))}function w0(n,e,t){let r,i=t.dereference?o=>kt.statSync(o,{bigint:!0}):o=>kt.lstatSync(o,{bigint:!0}),s=i(n);try{r=i(e)}catch(o){if(o.code==="ENOENT")return{srcStat:s,destStat:null};throw o}return{srcStat:s,destStat:r}}function v0(n,e,t,r,i){S0.callbackify(I0)(n,e,r,(s,o)=>{if(s)return i(s);let{srcStat:a,destStat:l}=o;if(l){if(tn(a,l)){let c=de.basename(n),u=de.basename(e);return t==="move"&&c!==u&&c.toLowerCase()===u.toLowerCase()?i(null,{srcStat:a,destStat:l,isChangingCase:!0}):i(new Error("Source and destination must not be the same."))}if(a.isDirectory()&&!l.isDirectory())return i(new Error(`Cannot overwrite non-directory '${e}' with directory '${n}'.`));if(!a.isDirectory()&&l.isDirectory())return i(new Error(`Cannot overwrite directory '${e}' with non-directory '${n}'.`))}return a.isDirectory()&&qs(n,e)?i(new Error(pr(n,e,t))):i(null,{srcStat:a,destStat:l})})}function b0(n,e,t,r){let{srcStat:i,destStat:s}=w0(n,e,r);if(s){if(tn(i,s)){let o=de.basename(n),a=de.basename(e);if(t==="move"&&o!==a&&o.toLowerCase()===a.toLowerCase())return{srcStat:i,destStat:s,isChangingCase:!0};throw new Error("Source and destination must not be the same.")}if(i.isDirectory()&&!s.isDirectory())throw new Error(`Cannot overwrite non-directory '${e}' with directory '${n}'.`);if(!i.isDirectory()&&s.isDirectory())throw new Error(`Cannot overwrite directory '${e}' with non-directory '${n}'.`)}if(i.isDirectory()&&qs(n,e))throw new Error(pr(n,e,t));return{srcStat:i,destStat:s}}function Gc(n,e,t,r,i){let s=de.resolve(de.dirname(n)),o=de.resolve(de.dirname(t));if(o===s||o===de.parse(o).root)return i();kt.stat(o,{bigint:!0},(a,l)=>a?a.code==="ENOENT"?i():i(a):tn(e,l)?i(new Error(pr(n,t,r))):Gc(n,e,o,r,i))}function Kc(n,e,t,r){let i=de.resolve(de.dirname(n)),s=de.resolve(de.dirname(t));if(s===i||s===de.parse(s).root)return;let o;try{o=kt.statSync(s,{bigint:!0})}catch(a){if(a.code==="ENOENT")return;throw a}if(tn(e,o))throw new Error(pr(n,t,r));return Kc(n,e,s,r)}function tn(n,e){return e.ino&&e.dev&&e.ino===n.ino&&e.dev===n.dev}function qs(n,e){let t=de.resolve(n).split(de.sep).filter(i=>i),r=de.resolve(e).split(de.sep).filter(i=>i);return t.reduce((i,s,o)=>i&&r[o]===s,!0)}function pr(n,e,t){return`Cannot ${t} '${n}' to a subdirectory of itself, '${e}'.`}Yc.exports={checkPaths:v0,checkPathsSync:b0,checkParentPaths:Gc,checkParentPathsSync:Kc,isSrcSubdir:qs,areIdentical:tn}});var eu=_((Qb,Zc)=>{"use strict";var ve=we(),nn=require("path"),N0=je().mkdirs,O0=et().pathExists,R0=$s().utimesMillis,rn=yt();function C0(n,e,t,r){typeof t=="function"&&!r?(r=t,t={}):typeof t=="function"&&(t={filter:t}),r=r||function(){},t=t||{},t.clobber="clobber"in t?!!t.clobber:!0,t.overwrite="overwrite"in t?!!t.overwrite:t.clobber,t.preserveTimestamps&&process.arch==="ia32"&&process.emitWarning(`Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,"Warning","fs-extra-WARN0001"),rn.checkPaths(n,e,"copy",t,(i,s)=>{if(i)return r(i);let{srcStat:o,destStat:a}=s;rn.checkParentPaths(n,o,e,"copy",l=>{if(l)return r(l);Xc(n,e,t,(c,u)=>{if(c)return r(c);if(!u)return r();k0(a,n,e,t,r)})})})}function k0(n,e,t,r,i){let s=nn.dirname(t);O0(s,(o,a)=>{if(o)return i(o);if(a)return xs(n,e,t,r,i);N0(s,l=>l?i(l):xs(n,e,t,r,i))})}function Xc(n,e,t,r){if(!t.filter)return r(null,!0);Promise.resolve(t.filter(n,e)).then(i=>r(null,i),i=>r(i))}function xs(n,e,t,r,i){(r.dereference?ve.stat:ve.lstat)(e,(o,a)=>o?i(o):a.isDirectory()?F0(a,n,e,t,r,i):a.isFile()||a.isCharacterDevice()||a.isBlockDevice()?P0(a,n,e,t,r,i):a.isSymbolicLink()?B0(n,e,t,r,i):a.isSocket()?i(new Error(`Cannot copy a socket file: ${e}`)):a.isFIFO()?i(new Error(`Cannot copy a FIFO pipe: ${e}`)):i(new Error(`Unknown file: ${e}`)))}function P0(n,e,t,r,i,s){return e?$0(n,t,r,i,s):zc(n,t,r,i,s)}function $0(n,e,t,r,i){if(r.overwrite)ve.unlink(t,s=>s?i(s):zc(n,e,t,r,i));else return r.errorOnExist?i(new Error(`'${t}' already exists`)):i()}function zc(n,e,t,r,i){ve.copyFile(e,t,s=>s?i(s):r.preserveTimestamps?q0(n.mode,e,t,i):_r(t,n.mode,i))}function q0(n,e,t,r){return x0(n)?M0(t,n,i=>i?r(i):Jc(n,e,t,r)):Jc(n,e,t,r)}function x0(n){return(n&128)===0}function M0(n,e,t){return _r(n,e|128,t)}function Jc(n,e,t,r){D0(e,t,i=>i?r(i):_r(t,n,r))}function _r(n,e,t){return ve.chmod(n,e,t)}function D0(n,e,t){ve.stat(n,(r,i)=>r?t(r):R0(e,i.atime,i.mtime,t))}function F0(n,e,t,r,i,s){return e?Qc(t,r,i,s):j0(n.mode,t,r,i,s)}function j0(n,e,t,r,i){ve.mkdir(t,s=>{if(s)return i(s);Qc(e,t,r,o=>o?i(o):_r(t,n,i))})}function Qc(n,e,t,r){ve.readdir(n,(i,s)=>i?r(i):Ms(s,n,e,t,r))}function Ms(n,e,t,r,i){let s=n.pop();return s?H0(n,s,e,t,r,i):i()}function H0(n,e,t,r,i,s){let o=nn.join(t,e),a=nn.join(r,e);Xc(o,a,i,(l,c)=>{if(l)return s(l);if(!c)return Ms(n,t,r,i,s);rn.checkPaths(o,a,"copy",i,(u,f)=>{if(u)return s(u);let{destStat:d}=f;xs(d,o,a,i,h=>h?s(h):Ms(n,t,r,i,s))})})}function B0(n,e,t,r,i){ve.readlink(e,(s,o)=>{if(s)return i(s);if(r.dereference&&(o=nn.resolve(process.cwd(),o)),n)ve.readlink(t,(a,l)=>a?a.code==="EINVAL"||a.code==="UNKNOWN"?ve.symlink(o,t,i):i(a):(r.dereference&&(l=nn.resolve(process.cwd(),l)),rn.isSrcSubdir(o,l)?i(new Error(`Cannot copy '${o}' to a subdirectory of itself, '${l}'.`)):rn.isSrcSubdir(l,o)?i(new Error(`Cannot overwrite '${l}' with '${o}'.`)):U0(o,t,i)));else return ve.symlink(o,t,i)})}function U0(n,e,t){ve.unlink(e,r=>r?t(r):ve.symlink(n,e,t))}Zc.exports=C0});var su=_((Zb,iu)=>{"use strict";var Te=we(),sn=require("path"),V0=je().mkdirsSync,W0=$s().utimesMillisSync,on=yt();function G0(n,e,t){typeof t=="function"&&(t={filter:t}),t=t||{},t.clobber="clobber"in t?!!t.clobber:!0,t.overwrite="overwrite"in t?!!t.overwrite:t.clobber,t.preserveTimestamps&&process.arch==="ia32"&&process.emitWarning(`Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,"Warning","fs-extra-WARN0002");let{srcStat:r,destStat:i}=on.checkPathsSync(n,e,"copy",t);if(on.checkParentPathsSync(n,r,e,"copy"),t.filter&&!t.filter(n,e))return;let s=sn.dirname(e);return Te.existsSync(s)||V0(s),tu(i,n,e,t)}function tu(n,e,t,r){let s=(r.dereference?Te.statSync:Te.lstatSync)(e);if(s.isDirectory())return Z0(s,n,e,t,r);if(s.isFile()||s.isCharacterDevice()||s.isBlockDevice())return K0(s,n,e,t,r);if(s.isSymbolicLink())return ny(n,e,t,r);throw s.isSocket()?new Error(`Cannot copy a socket file: ${e}`):s.isFIFO()?new Error(`Cannot copy a FIFO pipe: ${e}`):new Error(`Unknown file: ${e}`)}function K0(n,e,t,r,i){return e?Y0(n,t,r,i):nu(n,t,r,i)}function Y0(n,e,t,r){if(r.overwrite)return Te.unlinkSync(t),nu(n,e,t,r);if(r.errorOnExist)throw new Error(`'${t}' already exists`)}function nu(n,e,t,r){return Te.copyFileSync(e,t),r.preserveTimestamps&&J0(n.mode,e,t),Ds(t,n.mode)}function J0(n,e,t){return X0(n)&&z0(t,n),Q0(e,t)}function X0(n){return(n&128)===0}function z0(n,e){return Ds(n,e|128)}function Ds(n,e){return Te.chmodSync(n,e)}function Q0(n,e){let t=Te.statSync(n);return W0(e,t.atime,t.mtime)}function Z0(n,e,t,r,i){return e?ru(t,r,i):ey(n.mode,t,r,i)}function ey(n,e,t,r){return Te.mkdirSync(t),ru(e,t,r),Ds(t,n)}function ru(n,e,t){Te.readdirSync(n).forEach(r=>ty(r,n,e,t))}function ty(n,e,t,r){let i=sn.join(e,n),s=sn.join(t,n);if(r.filter&&!r.filter(i,s))return;let{destStat:o}=on.checkPathsSync(i,s,"copy",r);return tu(o,i,s,r)}function ny(n,e,t,r){let i=Te.readlinkSync(e);if(r.dereference&&(i=sn.resolve(process.cwd(),i)),n){let s;try{s=Te.readlinkSync(t)}catch(o){if(o.code==="EINVAL"||o.code==="UNKNOWN")return Te.symlinkSync(i,t);throw o}if(r.dereference&&(s=sn.resolve(process.cwd(),s)),on.isSrcSubdir(i,s))throw new Error(`Cannot copy '${i}' to a subdirectory of itself, '${s}'.`);if(on.isSrcSubdir(s,i))throw new Error(`Cannot overwrite '${s}' with '${i}'.`);return ry(i,t)}else return Te.symlinkSync(i,t)}function ry(n,e){return Te.unlinkSync(e),Te.symlinkSync(n,e)}iu.exports=G0});var mr=_((eN,ou)=>{"use strict";var iy=Ie().fromCallback;ou.exports={copy:iy(eu()),copySync:su()}});var an=_((tN,lu)=>{"use strict";var au=we(),sy=Ie().fromCallback;function oy(n,e){au.rm(n,{recursive:!0,force:!0},e)}function ay(n){au.rmSync(n,{recursive:!0,force:!0})}lu.exports={remove:sy(oy),removeSync:ay}});var mu=_((nN,_u)=>{"use strict";var ly=Ie().fromPromise,fu=gt(),hu=require("path"),du=je(),pu=an(),cu=ly(async function(e){let t;try{t=await fu.readdir(e)}catch{return du.mkdirs(e)}return Promise.all(t.map(r=>pu.remove(hu.join(e,r))))});function uu(n){let e;try{e=fu.readdirSync(n)}catch{return du.mkdirsSync(n)}e.forEach(t=>{t=hu.join(n,t),pu.removeSync(t)})}_u.exports={emptyDirSync:uu,emptydirSync:uu,emptyDir:cu,emptydir:cu}});var Tu=_((rN,Eu)=>{"use strict";var cy=Ie().fromCallback,gu=require("path"),tt=we(),yu=je();function uy(n,e){function t(){tt.writeFile(n,"",r=>{if(r)return e(r);e()})}tt.stat(n,(r,i)=>{if(!r&&i.isFile())return e();let s=gu.dirname(n);tt.stat(s,(o,a)=>{if(o)return o.code==="ENOENT"?yu.mkdirs(s,l=>{if(l)return e(l);t()}):e(o);a.isDirectory()?t():tt.readdir(s,l=>{if(l)return e(l)})})})}function fy(n){let e;try{e=tt.statSync(n)}catch{}if(e&&e.isFile())return;let t=gu.dirname(n);try{tt.statSync(t).isDirectory()||tt.readdirSync(t)}catch(r){if(r&&r.code==="ENOENT")yu.mkdirsSync(t);else throw r}tt.writeFileSync(n,"")}Eu.exports={createFile:cy(uy),createFileSync:fy}});var wu=_((iN,Iu)=>{"use strict";var hy=Ie().fromCallback,Lu=require("path"),nt=we(),Au=je(),dy=et().pathExists,{areIdentical:Su}=yt();function py(n,e,t){function r(i,s){nt.link(i,s,o=>{if(o)return t(o);t(null)})}nt.lstat(e,(i,s)=>{nt.lstat(n,(o,a)=>{if(o)return o.message=o.message.replace("lstat","ensureLink"),t(o);if(s&&Su(a,s))return t(null);let l=Lu.dirname(e);dy(l,(c,u)=>{if(c)return t(c);if(u)return r(n,e);Au.mkdirs(l,f=>{if(f)return t(f);r(n,e)})})})})}function _y(n,e){let t;try{t=nt.lstatSync(e)}catch{}try{let s=nt.lstatSync(n);if(t&&Su(s,t))return}catch(s){throw s.message=s.message.replace("lstat","ensureLink"),s}let r=Lu.dirname(e);return nt.existsSync(r)||Au.mkdirsSync(r),nt.linkSync(n,e)}Iu.exports={createLink:hy(py),createLinkSync:_y}});var bu=_((sN,vu)=>{"use strict";var rt=require("path"),ln=we(),my=et().pathExists;function gy(n,e,t){if(rt.isAbsolute(n))return ln.lstat(n,r=>r?(r.message=r.message.replace("lstat","ensureSymlink"),t(r)):t(null,{toCwd:n,toDst:n}));{let r=rt.dirname(e),i=rt.join(r,n);return my(i,(s,o)=>s?t(s):o?t(null,{toCwd:i,toDst:n}):ln.lstat(n,a=>a?(a.message=a.message.replace("lstat","ensureSymlink"),t(a)):t(null,{toCwd:n,toDst:rt.relative(r,n)})))}}function yy(n,e){let t;if(rt.isAbsolute(n)){if(t=ln.existsSync(n),!t)throw new Error("absolute srcpath does not exist");return{toCwd:n,toDst:n}}else{let r=rt.dirname(e),i=rt.join(r,n);if(t=ln.existsSync(i),t)return{toCwd:i,toDst:n};if(t=ln.existsSync(n),!t)throw new Error("relative srcpath does not exist");return{toCwd:n,toDst:rt.relative(r,n)}}}vu.exports={symlinkPaths:gy,symlinkPathsSync:yy}});var Ru=_((oN,Ou)=>{"use strict";var Nu=we();function Ey(n,e,t){if(t=typeof e=="function"?e:t,e=typeof e=="function"?!1:e,e)return t(null,e);Nu.lstat(n,(r,i)=>{if(r)return t(null,"file");e=i&&i.isDirectory()?"dir":"file",t(null,e)})}function Ty(n,e){let t;if(e)return e;try{t=Nu.lstatSync(n)}catch{return"file"}return t&&t.isDirectory()?"dir":"file"}Ou.exports={symlinkType:Ey,symlinkTypeSync:Ty}});var Du=_((aN,Mu)=>{"use strict";var Ly=Ie().fromCallback,ku=require("path"),He=gt(),Pu=je(),Ay=Pu.mkdirs,Sy=Pu.mkdirsSync,$u=bu(),Iy=$u.symlinkPaths,wy=$u.symlinkPathsSync,qu=Ru(),vy=qu.symlinkType,by=qu.symlinkTypeSync,Ny=et().pathExists,{areIdentical:xu}=yt();function Oy(n,e,t,r){r=typeof t=="function"?t:r,t=typeof t=="function"?!1:t,He.lstat(e,(i,s)=>{!i&&s.isSymbolicLink()?Promise.all([He.stat(n),He.stat(e)]).then(([o,a])=>{if(xu(o,a))return r(null);Cu(n,e,t,r)}):Cu(n,e,t,r)})}function Cu(n,e,t,r){Iy(n,e,(i,s)=>{if(i)return r(i);n=s.toDst,vy(s.toCwd,t,(o,a)=>{if(o)return r(o);let l=ku.dirname(e);Ny(l,(c,u)=>{if(c)return r(c);if(u)return He.symlink(n,e,a,r);Ay(l,f=>{if(f)return r(f);He.symlink(n,e,a,r)})})})})}function Ry(n,e,t){let r;try{r=He.lstatSync(e)}catch{}if(r&&r.isSymbolicLink()){let a=He.statSync(n),l=He.statSync(e);if(xu(a,l))return}let i=wy(n,e);n=i.toDst,t=by(i.toCwd,t);let s=ku.dirname(e);return He.existsSync(s)||Sy(s),He.symlinkSync(n,e,t)}Mu.exports={createSymlink:Ly(Oy),createSymlinkSync:Ry}});var Gu=_((lN,Wu)=>{"use strict";var{createFile:Fu,createFileSync:ju}=Tu(),{createLink:Hu,createLinkSync:Bu}=wu(),{createSymlink:Uu,createSymlinkSync:Vu}=Du();Wu.exports={createFile:Fu,createFileSync:ju,ensureFile:Fu,ensureFileSync:ju,createLink:Hu,createLinkSync:Bu,ensureLink:Hu,ensureLinkSync:Bu,createSymlink:Uu,createSymlinkSync:Vu,ensureSymlink:Uu,ensureSymlinkSync:Vu}});var gr=_((cN,Ku)=>{function Cy(n,{EOL:e=`
`,finalEOL:t=!0,replacer:r=null,spaces:i}={}){let s=t?e:"";return JSON.stringify(n,r,i).replace(/\n/g,e)+s}function ky(n){return Buffer.isBuffer(n)&&(n=n.toString("utf8")),n.replace(/^\uFEFF/,"")}Ku.exports={stringify:Cy,stripBom:ky}});var zu=_((uN,Xu)=>{var Pt;try{Pt=we()}catch{Pt=require("fs")}var yr=Ie(),{stringify:Yu,stripBom:Ju}=gr();async function Py(n,e={}){typeof e=="string"&&(e={encoding:e});let t=e.fs||Pt,r="throws"in e?e.throws:!0,i=await yr.fromCallback(t.readFile)(n,e);i=Ju(i);let s;try{s=JSON.parse(i,e?e.reviver:null)}catch(o){if(r)throw o.message=`${n}: ${o.message}`,o;return null}return s}var $y=yr.fromPromise(Py);function qy(n,e={}){typeof e=="string"&&(e={encoding:e});let t=e.fs||Pt,r="throws"in e?e.throws:!0;try{let i=t.readFileSync(n,e);return i=Ju(i),JSON.parse(i,e.reviver)}catch(i){if(r)throw i.message=`${n}: ${i.message}`,i;return null}}async function xy(n,e,t={}){let r=t.fs||Pt,i=Yu(e,t);await yr.fromCallback(r.writeFile)(n,i,t)}var My=yr.fromPromise(xy);function Dy(n,e,t={}){let r=t.fs||Pt,i=Yu(e,t);return r.writeFileSync(n,i,t)}var Fy={readFile:$y,readFileSync:qy,writeFile:My,writeFileSync:Dy};Xu.exports=Fy});var Zu=_((fN,Qu)=>{"use strict";var Er=zu();Qu.exports={readJson:Er.readFile,readJsonSync:Er.readFileSync,writeJson:Er.writeFile,writeJsonSync:Er.writeFileSync}});var Tr=_((hN,nf)=>{"use strict";var jy=Ie().fromCallback,cn=we(),ef=require("path"),tf=je(),Hy=et().pathExists;function By(n,e,t,r){typeof t=="function"&&(r=t,t="utf8");let i=ef.dirname(n);Hy(i,(s,o)=>{if(s)return r(s);if(o)return cn.writeFile(n,e,t,r);tf.mkdirs(i,a=>{if(a)return r(a);cn.writeFile(n,e,t,r)})})}function Uy(n,...e){let t=ef.dirname(n);if(cn.existsSync(t))return cn.writeFileSync(n,...e);tf.mkdirsSync(t),cn.writeFileSync(n,...e)}nf.exports={outputFile:jy(By),outputFileSync:Uy}});var sf=_((dN,rf)=>{"use strict";var{stringify:Vy}=gr(),{outputFile:Wy}=Tr();async function Gy(n,e,t={}){let r=Vy(e,t);await Wy(n,r,t)}rf.exports=Gy});var af=_((pN,of)=>{"use strict";var{stringify:Ky}=gr(),{outputFileSync:Yy}=Tr();function Jy(n,e,t){let r=Ky(e,t);Yy(n,r,t)}of.exports=Jy});var cf=_((_N,lf)=>{"use strict";var Xy=Ie().fromPromise,Le=Zu();Le.outputJson=Xy(sf());Le.outputJsonSync=af();Le.outputJSON=Le.outputJson;Le.outputJSONSync=Le.outputJsonSync;Le.writeJSON=Le.writeJson;Le.writeJSONSync=Le.writeJsonSync;Le.readJSON=Le.readJson;Le.readJSONSync=Le.readJsonSync;lf.exports=Le});var pf=_((mN,df)=>{"use strict";var zy=we(),js=require("path"),Qy=mr().copy,hf=an().remove,Zy=je().mkdirp,eE=et().pathExists,uf=yt();function tE(n,e,t,r){typeof t=="function"&&(r=t,t={}),t=t||{};let i=t.overwrite||t.clobber||!1;uf.checkPaths(n,e,"move",t,(s,o)=>{if(s)return r(s);let{srcStat:a,isChangingCase:l=!1}=o;uf.checkParentPaths(n,a,e,"move",c=>{if(c)return r(c);if(nE(e))return ff(n,e,i,l,r);Zy(js.dirname(e),u=>u?r(u):ff(n,e,i,l,r))})})}function nE(n){let e=js.dirname(n);return js.parse(e).root===e}function ff(n,e,t,r,i){if(r)return Fs(n,e,t,i);if(t)return hf(e,s=>s?i(s):Fs(n,e,t,i));eE(e,(s,o)=>s?i(s):o?i(new Error("dest already exists.")):Fs(n,e,t,i))}function Fs(n,e,t,r){zy.rename(n,e,i=>i?i.code!=="EXDEV"?r(i):rE(n,e,t,r):r())}function rE(n,e,t,r){Qy(n,e,{overwrite:t,errorOnExist:!0,preserveTimestamps:!0},s=>s?r(s):hf(n,r))}df.exports=tE});var Ef=_((gN,yf)=>{"use strict";var mf=we(),Bs=require("path"),iE=mr().copySync,gf=an().removeSync,sE=je().mkdirpSync,_f=yt();function oE(n,e,t){t=t||{};let r=t.overwrite||t.clobber||!1,{srcStat:i,isChangingCase:s=!1}=_f.checkPathsSync(n,e,"move",t);return _f.checkParentPathsSync(n,i,e,"move"),aE(e)||sE(Bs.dirname(e)),lE(n,e,r,s)}function aE(n){let e=Bs.dirname(n);return Bs.parse(e).root===e}function lE(n,e,t,r){if(r)return Hs(n,e,t);if(t)return gf(e),Hs(n,e,t);if(mf.existsSync(e))throw new Error("dest already exists.");return Hs(n,e,t)}function Hs(n,e,t){try{mf.renameSync(n,e)}catch(r){if(r.code!=="EXDEV")throw r;return cE(n,e,t)}}function cE(n,e,t){return iE(n,e,{overwrite:t,errorOnExist:!0,preserveTimestamps:!0}),gf(n)}yf.exports=oE});var Lf=_((yN,Tf)=>{"use strict";var uE=Ie().fromCallback;Tf.exports={move:uE(pf()),moveSync:Ef()}});var it=_((EN,Af)=>{"use strict";Af.exports={...gt(),...mr(),...mu(),...Gu(),...cf(),...je(),...Lf(),...Tr(),...et(),...an()}});var If=_((vN,Ys)=>{typeof Object.create=="function"?Ys.exports=function(e,t){t&&(e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}))}:Ys.exports=function(e,t){if(t){e.super_=t;var r=function(){};r.prototype=t.prototype,e.prototype=new r,e.prototype.constructor=e}}});var wf=_((bN,Xs)=>{try{if(Js=require("util"),typeof Js.inherits!="function")throw"";Xs.exports=Js.inherits}catch{Xs.exports=If()}var Js});var bf=_((NN,Qs)=>{var gE=wf(),vf=require("events").EventEmitter;Qs.exports=ke;Qs.exports.default=ke;function ke(n){if(!(this instanceof ke))return new ke(n);vf.call(this),n=n||{},this.concurrency=n.concurrency||1/0,this.timeout=n.timeout||0,this.autostart=n.autostart||!1,this.results=n.results||null,this.pending=0,this.session=0,this.running=!1,this.jobs=[],this.timers={}}gE(ke,vf);var yE=["pop","shift","indexOf","lastIndexOf"];yE.forEach(function(n){ke.prototype[n]=function(){return Array.prototype[n].apply(this.jobs,arguments)}});ke.prototype.slice=function(n,e){return this.jobs=this.jobs.slice(n,e),this};ke.prototype.reverse=function(){return this.jobs.reverse(),this};var EE=["push","unshift","splice"];EE.forEach(function(n){ke.prototype[n]=function(){var e=Array.prototype[n].apply(this.jobs,arguments);return this.autostart&&this.start(),e}});Object.defineProperty(ke.prototype,"length",{get:function(){return this.pending+this.jobs.length}});ke.prototype.start=function(n){if(n&&LE.call(this,n),this.running=!0,this.pending>=this.concurrency)return;if(this.jobs.length===0){this.pending===0&&zs.call(this);return}var e=this,t=this.jobs.shift(),r=!0,i=this.session,s=null,o=!1,a=null,l=t.hasOwnProperty("timeout")?t.timeout:this.timeout;function c(f,d){r&&e.session===i&&(r=!1,e.pending--,s!==null&&(delete e.timers[s],clearTimeout(s)),f?e.emit("error",f,t):o===!1&&(a!==null&&(e.results[a]=Array.prototype.slice.call(arguments,1)),e.emit("success",d,t)),e.session===i&&(e.pending===0&&e.jobs.length===0?zs.call(e):e.running&&e.start()))}l&&(s=setTimeout(function(){o=!0,e.listeners("timeout").length>0?e.emit("timeout",c,t):c()},l),this.timers[s]=s),this.results&&(a=this.results.length,this.results[a]=null),this.pending++,e.emit("start",t);var u=t(c);u&&u.then&&typeof u.then=="function"&&u.then(function(f){return c(null,f)}).catch(function(f){return c(f||!0)}),this.running&&this.jobs.length>0&&this.start()};ke.prototype.stop=function(){this.running=!1};ke.prototype.end=function(n){TE.call(this),this.jobs.length=0,this.pending=0,zs.call(this,n)};function TE(){for(var n in this.timers){var e=this.timers[n];delete this.timers[n],clearTimeout(e)}}function LE(n){var e=this;this.on("error",t),this.on("end",r);function t(i){e.end(i)}function r(i){e.removeListener("error",t),e.removeListener("end",r),n(i,this.results)}}function zs(n){this.session++,this.running=!1,this.emit("end",n)}});var Nf=_(Sr=>{"use strict";Object.defineProperty(Sr,"__esModule",{value:!0});Sr.BMP=void 0;Sr.BMP={validate(n){return n.toString("ascii",0,2)==="BM"},calculate(n){return{height:Math.abs(n.readInt32LE(22)),width:n.readUInt32LE(18)}}}});var Zs=_(Ir=>{"use strict";Object.defineProperty(Ir,"__esModule",{value:!0});Ir.ICO=void 0;var AE=1,SE=2+2+2,IE=1+1+1+1+2+2+4+4;function Of(n,e){let t=n.readUInt8(e);return t===0?256:t}function Rf(n,e){let t=SE+e*IE;return{height:Of(n,t+1),width:Of(n,t)}}Ir.ICO={validate(n){let e=n.readUInt16LE(0),t=n.readUInt16LE(4);return e!==0||t===0?!1:n.readUInt16LE(2)===AE},calculate(n){let e=n.readUInt16LE(4),t=Rf(n,0);if(e===1)return t;let r=[t];for(let s=1;s<e;s+=1)r.push(Rf(n,s));return{height:t.height,images:r,width:t.width}}}});var Cf=_(wr=>{"use strict";Object.defineProperty(wr,"__esModule",{value:!0});wr.CUR=void 0;var wE=Zs(),vE=2;wr.CUR={validate(n){let e=n.readUInt16LE(0),t=n.readUInt16LE(4);return e!==0||t===0?!1:n.readUInt16LE(2)===vE},calculate(n){return wE.ICO.calculate(n)}}});var kf=_(vr=>{"use strict";Object.defineProperty(vr,"__esModule",{value:!0});vr.DDS=void 0;vr.DDS={validate(n){return n.readUInt32LE(0)===542327876},calculate(n){return{height:n.readUInt32LE(12),width:n.readUInt32LE(16)}}}});var Pf=_(br=>{"use strict";Object.defineProperty(br,"__esModule",{value:!0});br.GIF=void 0;var bE=/^GIF8[79]a/;br.GIF={validate(n){let e=n.toString("ascii",0,6);return bE.test(e)},calculate(n){return{height:n.readUInt16LE(8),width:n.readUInt16LE(6)}}}});var xf=_(Nr=>{"use strict";Object.defineProperty(Nr,"__esModule",{value:!0});Nr.ICNS=void 0;var NE=4+4,OE=4,RE=4,CE={ICON:32,"ICN#":32,"icm#":16,icm4:16,icm8:16,"ics#":16,ics4:16,ics8:16,is32:16,s8mk:16,icp4:16,icl4:32,icl8:32,il32:32,l8mk:32,icp5:32,ic11:32,ich4:48,ich8:48,ih32:48,h8mk:48,icp6:64,ic12:32,it32:128,t8mk:128,ic07:128,ic08:256,ic13:256,ic09:512,ic14:512,ic10:1024};function $f(n,e){let t=e+RE;return[n.toString("ascii",e,t),n.readUInt32BE(t)]}function qf(n){let e=CE[n];return{width:e,height:e,type:n}}Nr.ICNS={validate(n){return n.toString("ascii",0,4)==="icns"},calculate(n){let e=n.length,t=n.readUInt32BE(OE),r=NE,i=$f(n,r),s=qf(i[0]);if(r+=i[1],r===t)return s;let o={height:s.height,images:[s],width:s.width};for(;r<t&&r<e;)i=$f(n,r),s=qf(i[0]),r+=i[1],o.images.push(s);return o}}});var Mf=_(Or=>{"use strict";Object.defineProperty(Or,"__esModule",{value:!0});Or.J2C=void 0;Or.J2C={validate(n){return n.toString("hex",0,4)==="ff4fff51"},calculate(n){return{height:n.readUInt32BE(12),width:n.readUInt32BE(8)}}}});var Ff=_(Cr=>{"use strict";Object.defineProperty(Cr,"__esModule",{value:!0});Cr.JP2=void 0;var Rr={ftyp:"66747970",ihdr:"69686472",jp2h:"6a703268",jp__:"6a502020",rreq:"72726571",xml_:"786d6c20"},kE=n=>{let e=n.readUInt8(0),t=1+2*e,i=n.readUInt16BE(t)*(2+e);t=t+2+i;let o=n.readUInt16BE(t)*(16+e);return t+2+o},Df=n=>({height:n.readUInt32BE(4),width:n.readUInt32BE(8)});Cr.JP2={validate(n){let e=n.toString("hex",4,8),t=n.readUInt32BE(0);if(e!==Rr.jp__||t<1)return!1;let r=t+4,i=n.readUInt32BE(t);return n.slice(r,r+i).toString("hex",0,4)===Rr.ftyp},calculate(n){let e=n.readUInt32BE(0),t=n.readUInt16BE(e+2),r=e+4+t;switch(n.toString("hex",r,r+4)){case Rr.rreq:return r=r+4+4+kE(n.slice(r+4)),Df(n.slice(r+8,r+24));case Rr.jp2h:return Df(n.slice(r+8,r+24));default:throw new TypeError("Unsupported header found: "+n.toString("ascii",r,r+4))}}}});var eo=_(kr=>{"use strict";Object.defineProperty(kr,"__esModule",{value:!0});kr.readUInt=void 0;function PE(n,e,t,r){t=t||0;let i=r?"BE":"LE",s="readUInt"+e+i;return n[s].call(n,t)}kr.readUInt=PE});var Hf=_(Pr=>{"use strict";Object.defineProperty(Pr,"__esModule",{value:!0});Pr.JPG=void 0;var fn=eo(),$E="45786966",qE=2,to=6,xE=2,ME="4d4d",DE="4949",jf=12,FE=2;function jE(n){return n.toString("hex",2,6)===$E}function HE(n,e){return{height:n.readUInt16BE(e),width:n.readUInt16BE(e+2)}}function BE(n,e){let r=to+8,i=(0,fn.readUInt)(n,16,r,e);for(let s=0;s<i;s++){let o=r+FE+s*jf,a=o+jf;if(o>n.length)return;let l=n.slice(o,a);if((0,fn.readUInt)(l,16,0,e)===274)return(0,fn.readUInt)(l,16,2,e)!==3||(0,fn.readUInt)(l,32,4,e)!==1?void 0:(0,fn.readUInt)(l,16,8,e)}}function UE(n,e){let t=n.slice(qE,e),r=t.toString("hex",to,to+xE),i=r===ME;if(i||r===DE)return BE(t,i)}function VE(n,e){if(e>n.length)throw new TypeError("Corrupt JPG, exceeded buffer limits");if(n[e]!==255)throw new TypeError("Invalid JPG, marker table corrupted")}Pr.JPG={validate(n){return n.toString("hex",0,2)==="ffd8"},calculate(n){n=n.slice(4);let e,t;for(;n.length;){let r=n.readUInt16BE(0);if(jE(n)&&(e=UE(n,r)),VE(n,r),t=n[r+1],t===192||t===193||t===194){let i=HE(n,r+5);return e?{height:i.height,orientation:e,width:i.width}:i}n=n.slice(r+2)}throw new TypeError("Invalid JPG, no size found")}}});var Bf=_($r=>{"use strict";Object.defineProperty($r,"__esModule",{value:!0});$r.KTX=void 0;var WE="KTX 11";$r.KTX={validate(n){return WE===n.toString("ascii",1,7)},calculate(n){return{height:n.readUInt32LE(40),width:n.readUInt32LE(36)}}}});var Vf=_(qr=>{"use strict";Object.defineProperty(qr,"__esModule",{value:!0});qr.PNG=void 0;var GE=`PNG\r

`,KE="IHDR",Uf="CgBI";qr.PNG={validate(n){if(GE===n.toString("ascii",1,8)){let e=n.toString("ascii",12,16);if(e===Uf&&(e=n.toString("ascii",28,32)),e!==KE)throw new TypeError("Invalid PNG");return!0}return!1},calculate(n){return n.toString("ascii",12,16)===Uf?{height:n.readUInt32BE(36),width:n.readUInt32BE(32)}:{height:n.readUInt32BE(20),width:n.readUInt32BE(16)}}}});var Kf=_(xr=>{"use strict";Object.defineProperty(xr,"__esModule",{value:!0});xr.PNM=void 0;var Gf={P1:"pbm/ascii",P2:"pgm/ascii",P3:"ppm/ascii",P4:"pbm",P5:"pgm",P6:"ppm",P7:"pam",PF:"pfm"},YE=Object.keys(Gf),Wf={default:n=>{let e=[];for(;n.length>0;){let t=n.shift();if(t[0]!=="#"){e=t.split(" ");break}}if(e.length===2)return{height:parseInt(e[1],10),width:parseInt(e[0],10)};throw new TypeError("Invalid PNM")},pam:n=>{let e={};for(;n.length>0;){let t=n.shift();if(t.length>16||t.charCodeAt(0)>128)continue;let[r,i]=t.split(" ");if(r&&i&&(e[r.toLowerCase()]=parseInt(i,10)),e.height&&e.width)break}if(e.height&&e.width)return{height:e.height,width:e.width};throw new TypeError("Invalid PAM")}};xr.PNM={validate(n){let e=n.toString("ascii",0,2);return YE.includes(e)},calculate(n){let e=n.toString("ascii",0,2),t=Gf[e],r=n.toString("ascii",3).split(/[\r\n]+/);return(Wf[t]||Wf.default)(r)}}});var Yf=_(Mr=>{"use strict";Object.defineProperty(Mr,"__esModule",{value:!0});Mr.PSD=void 0;Mr.PSD={validate(n){return n.toString("ascii",0,4)==="8BPS"},calculate(n){return{height:n.readUInt32BE(14),width:n.readUInt32BE(18)}}}});var zf=_(jr=>{"use strict";Object.defineProperty(jr,"__esModule",{value:!0});jr.SVG=void 0;var Jf=/<svg\s([^>"']|"[^"]*"|'[^']*')*>/,Dr={height:/\sheight=(['"])([^%]+?)\1/,root:Jf,viewbox:/\sviewBox=(['"])(.+?)\1/i,width:/\swidth=(['"])([^%]+?)\1/},no=2.54,Xf={in:96,cm:96/no,em:16,ex:8,m:96/no*100,mm:96/no/10,pc:96/72/12,pt:96/72,px:1},JE=new RegExp(`^([0-9.]+(?:e\\d+)?)(${Object.keys(Xf).join("|")})?$`);function Fr(n){let e=JE.exec(n);if(e)return Math.round(Number(e[1])*(Xf[e[2]]||1))}function XE(n){let e=n.split(" ");return{height:Fr(e[3]),width:Fr(e[2])}}function zE(n){let e=n.match(Dr.width),t=n.match(Dr.height),r=n.match(Dr.viewbox);return{height:t&&Fr(t[2]),viewbox:r&&XE(r[2]),width:e&&Fr(e[2])}}function QE(n){return{height:n.height,width:n.width}}function ZE(n,e){let t=e.width/e.height;return n.width?{height:Math.floor(n.width/t),width:n.width}:n.height?{height:n.height,width:Math.floor(n.height*t)}:{height:e.height,width:e.width}}jr.SVG={validate(n){let e=String(n);return Jf.test(e)},calculate(n){let e=n.toString("utf8").match(Dr.root);if(e){let t=zE(e[0]);if(t.width&&t.height)return QE(t);if(t.viewbox)return ZE(t,t.viewbox)}throw new TypeError("Invalid SVG")}}});var Qf=_(Hr=>{"use strict";Object.defineProperty(Hr,"__esModule",{value:!0});Hr.TGA=void 0;Hr.TGA={validate(n){return n.readUInt16LE(0)===0&&n.readUInt16LE(4)===0},calculate(n){return{height:n.readUInt16LE(14),width:n.readUInt16LE(12)}}}});var Zf=_(Ur=>{"use strict";Object.defineProperty(Ur,"__esModule",{value:!0});Ur.TIFF=void 0;var Br=require("fs"),xt=eo();function e1(n,e,t){let r=(0,xt.readUInt)(n,32,4,t),i=1024,s=Br.statSync(e).size;r+i>s&&(i=s-r-10);let o=Buffer.alloc(i),a=Br.openSync(e,"r");return Br.readSync(a,o,0,i,r),Br.closeSync(a),o.slice(2)}function t1(n,e){let t=(0,xt.readUInt)(n,16,8,e);return((0,xt.readUInt)(n,16,10,e)<<16)+t}function n1(n){if(n.length>24)return n.slice(12)}function r1(n,e){let t={},r=n;for(;r&&r.length;){let i=(0,xt.readUInt)(r,16,0,e),s=(0,xt.readUInt)(r,16,2,e),o=(0,xt.readUInt)(r,32,4,e);if(i===0)break;o===1&&(s===3||s===4)&&(t[i]=t1(r,e)),r=n1(r)}return t}function i1(n){let e=n.toString("ascii",0,2);if(e==="II")return"LE";if(e==="MM")return"BE"}var s1=["49492a00","4d4d002a"];Ur.TIFF={validate(n){return s1.includes(n.toString("hex",0,4))},calculate(n,e){if(!e)throw new TypeError("Tiff doesn't support buffer");let t=i1(n)==="BE",r=e1(n,e,t),i=r1(r,t),s=i[256],o=i[257];if(!s||!o)throw new TypeError("Invalid Tiff. Missing tags");return{height:o,width:s}}}});var eh=_(Vr=>{"use strict";Object.defineProperty(Vr,"__esModule",{value:!0});Vr.WEBP=void 0;function o1(n){return{height:1+n.readUIntLE(7,3),width:1+n.readUIntLE(4,3)}}function a1(n){return{height:1+((n[4]&15)<<10|n[3]<<2|(n[2]&192)>>6),width:1+((n[2]&63)<<8|n[1])}}function l1(n){return{height:n.readInt16LE(8)&16383,width:n.readInt16LE(6)&16383}}Vr.WEBP={validate(n){let e=n.toString("ascii",0,4)==="RIFF",t=n.toString("ascii",8,12)==="WEBP",r=n.toString("ascii",12,15)==="VP8";return e&&t&&r},calculate(n){let e=n.toString("ascii",12,16);if(n=n.slice(20,30),e==="VP8X"){let r=n[0],i=(r&192)===0,s=(r&1)===0;if(i&&s)return o1(n);throw new TypeError("Invalid WebP")}if(e==="VP8 "&&n[0]!==47)return l1(n);let t=n.toString("hex",3,6);if(e==="VP8L"&&t!=="9d012a")return a1(n);throw new TypeError("Invalid WebP")}}});var ro=_(Wr=>{"use strict";Object.defineProperty(Wr,"__esModule",{value:!0});Wr.typeHandlers=void 0;var c1=Nf(),u1=Cf(),f1=kf(),h1=Pf(),d1=xf(),p1=Zs(),_1=Mf(),m1=Ff(),g1=Hf(),y1=Bf(),E1=Vf(),T1=Kf(),L1=Yf(),A1=zf(),S1=Qf(),I1=Zf(),w1=eh();Wr.typeHandlers={bmp:c1.BMP,cur:u1.CUR,dds:f1.DDS,gif:h1.GIF,icns:d1.ICNS,ico:p1.ICO,j2c:_1.J2C,jp2:m1.JP2,jpg:g1.JPG,ktx:y1.KTX,png:E1.PNG,pnm:T1.PNM,psd:L1.PSD,svg:A1.SVG,tga:S1.TGA,tiff:I1.TIFF,webp:w1.WEBP}});var nh=_(Gr=>{"use strict";Object.defineProperty(Gr,"__esModule",{value:!0});Gr.detector=void 0;var io=ro(),v1=Object.keys(io.typeHandlers),th={56:"psd",66:"bmp",68:"dds",71:"gif",73:"tiff",77:"tiff",82:"webp",105:"icns",137:"png",255:"jpg"};function b1(n){let e=n[0];if(e in th){let r=th[e];if(r&&io.typeHandlers[r].validate(n))return r}let t=r=>io.typeHandlers[r].validate(n);return v1.find(t)}Gr.detector=b1});var oh=_((be,sh)=>{"use strict";Object.defineProperty(be,"__esModule",{value:!0});be.types=be.setConcurrency=be.disableTypes=be.disableFS=be.imageSize=void 0;var hn=require("fs"),N1=require("path"),O1=bf(),oo=ro(),R1=nh(),rh=512*1024,ih=new O1.default({concurrency:100,autostart:!0}),Kr={disabledFS:!1,disabledTypes:[]};function so(n,e){let t=(0,R1.detector)(n);if(typeof t<"u"){if(Kr.disabledTypes.indexOf(t)>-1)throw new TypeError("disabled file type: "+t);if(t in oo.typeHandlers){let r=oo.typeHandlers[t].calculate(n,e);if(r!==void 0)return r.type=t,r}}throw new TypeError("unsupported file type: "+t+" (file: "+e+")")}async function C1(n){let e=await hn.promises.open(n,"r");try{let{size:t}=await e.stat();if(t<=0)throw new Error("Empty file");let r=Math.min(t,rh),i=Buffer.alloc(r);return await e.read(i,0,r,0),i}finally{await e.close()}}function k1(n){let e=hn.openSync(n,"r");try{let{size:t}=hn.fstatSync(e);if(t<=0)throw new Error("Empty file");let r=Math.min(t,rh),i=Buffer.alloc(r);return hn.readSync(e,i,0,r,0),i}finally{hn.closeSync(e)}}sh.exports=be=ao;be.default=ao;function ao(n,e){if(Buffer.isBuffer(n))return so(n);if(typeof n!="string"||Kr.disabledFS)throw new TypeError("invalid invocation. input should be a Buffer");let t=N1.resolve(n);if(typeof e=="function")ih.push(()=>C1(t).then(r=>process.nextTick(e,null,so(r,t))).catch(e));else{let r=k1(t);return so(r,t)}}be.imageSize=ao;var P1=n=>{Kr.disabledFS=n};be.disableFS=P1;var $1=n=>{Kr.disabledTypes=n};be.disableTypes=$1;var q1=n=>{ih.concurrency=n};be.setConcurrency=q1;be.types=Object.keys(oo.typeHandlers)});var lh=_((Yr,ah)=>{(function(n,e){typeof Yr=="object"&&typeof ah<"u"?e(Yr):typeof define=="function"&&define.amd?define(["exports"],e):(n=typeof globalThis<"u"?globalThis:n||self,e(n.compareVersions={}))})(Yr,function(n){"use strict";let e=/^[v^~<>=]*?(\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+))?(?:-([\da-z\-]+(?:\.[\da-z\-]+)*))?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?)?)?$/i,t=m=>{if(typeof m!="string")throw new TypeError("Invalid argument expected string");let S=m.match(e);if(!S)throw new Error(`Invalid argument not valid semver ('${m}' received)`);return S.shift(),S},r=m=>m==="*"||m==="x"||m==="X",i=m=>{let S=parseInt(m,10);return isNaN(S)?m:S},s=(m,S)=>typeof m!=typeof S?[String(m),String(S)]:[m,S],o=(m,S)=>{if(r(m)||r(S))return 0;let[w,b]=s(i(m),i(S));return w>b?1:w<b?-1:0},a=(m,S)=>{for(let w=0;w<Math.max(m.length,S.length);w++){let b=o(m[w]||"0",S[w]||"0");if(b!==0)return b}return 0},l=(m,S)=>{let w=t(m),b=t(S),$=w.pop(),M=b.pop(),v=a(w,b);return v!==0?v:$&&M?a($.split("."),M.split(".")):$||M?$?-1:1:0},c=(m,S,w)=>{d(w);let b=l(m,S);return u[w].includes(b)},u={">":[1],">=":[0,1],"=":[0],"<=":[-1,0],"<":[-1],"!=":[-1,1]},f=Object.keys(u),d=m=>{if(typeof m!="string")throw new TypeError(`Invalid operator type, expected string but got ${typeof m}`);if(f.indexOf(m)===-1)throw new Error(`Invalid operator, expected one of ${f.join("|")}`)},h=(m,S)=>{if(S=S.replace(/([><=]+)\s+/g,"$1"),S.includes("||"))return S.split("||").some(U=>h(m,U));if(S.includes(" - ")){let[U,Y]=S.split(" - ",2);return h(m,`>=${U} <=${Y}`)}else if(S.includes(" "))return S.trim().replace(/\s{2,}/g," ").split(" ").every(U=>h(m,U));let w=S.match(/^([<>=~^]+)/),b=w?w[1]:"=";if(b!=="^"&&b!=="~")return c(m,S,b);let[$,M,v,,V]=t(m),[G,P,j,,D]=t(S),F=[$,M,v],X=[G,P??"x",j??"x"];if(D&&(!V||a(F,X)!==0||a(V.split("."),D.split("."))===-1))return!1;let ie=X.findIndex(U=>U!=="0")+1,K=b==="~"?2:ie>1?ie:1;return!(a(F.slice(0,K),X.slice(0,K))!==0||a(F.slice(K),X.slice(K))===-1)},y=m=>typeof m=="string"&&/^[v\d]/.test(m)&&e.test(m),g=m=>typeof m=="string"&&/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/.test(m);n.compare=c,n.compareVersions=l,n.satisfies=h,n.validate=y,n.validateStrict=g})});var dn=_((QN,fh)=>{"use strict";var x1="2.0.0",M1=Number.MAX_SAFE_INTEGER||9007199254740991,D1=16,F1=256-6,j1=["major","premajor","minor","preminor","patch","prepatch","prerelease"];fh.exports={MAX_LENGTH:256,MAX_SAFE_COMPONENT_LENGTH:D1,MAX_SAFE_BUILD_LENGTH:F1,MAX_SAFE_INTEGER:M1,RELEASE_TYPES:j1,SEMVER_SPEC_VERSION:x1,FLAG_INCLUDE_PRERELEASE:1,FLAG_LOOSE:2}});var pn=_((ZN,hh)=>{"use strict";var H1=typeof process=="object"&&process.env&&process.env.NODE_DEBUG&&/\bsemver\b/i.test(process.env.NODE_DEBUG)?(...n)=>console.error("SEMVER",...n):()=>{};hh.exports=H1});var Mt=_((Ve,dh)=>{"use strict";var{MAX_SAFE_COMPONENT_LENGTH:_o,MAX_SAFE_BUILD_LENGTH:B1,MAX_LENGTH:U1}=dn(),V1=pn();Ve=dh.exports={};var W1=Ve.re=[],G1=Ve.safeRe=[],R=Ve.src=[],K1=Ve.safeSrc=[],C=Ve.t={},Y1=0,mo="[a-zA-Z0-9-]",J1=[["\\s",1],["\\d",U1],[mo,B1]],X1=n=>{for(let[e,t]of J1)n=n.split(`${e}*`).join(`${e}{0,${t}}`).split(`${e}+`).join(`${e}{1,${t}}`);return n},H=(n,e,t)=>{let r=X1(e),i=Y1++;V1(n,i,e),C[n]=i,R[i]=e,K1[i]=r,W1[i]=new RegExp(e,t?"g":void 0),G1[i]=new RegExp(r,t?"g":void 0)};H("NUMERICIDENTIFIER","0|[1-9]\\d*");H("NUMERICIDENTIFIERLOOSE","\\d+");H("NONNUMERICIDENTIFIER",`\\d*[a-zA-Z-]${mo}*`);H("MAINVERSION",`(${R[C.NUMERICIDENTIFIER]})\\.(${R[C.NUMERICIDENTIFIER]})\\.(${R[C.NUMERICIDENTIFIER]})`);H("MAINVERSIONLOOSE",`(${R[C.NUMERICIDENTIFIERLOOSE]})\\.(${R[C.NUMERICIDENTIFIERLOOSE]})\\.(${R[C.NUMERICIDENTIFIERLOOSE]})`);H("PRERELEASEIDENTIFIER",`(?:${R[C.NONNUMERICIDENTIFIER]}|${R[C.NUMERICIDENTIFIER]})`);H("PRERELEASEIDENTIFIERLOOSE",`(?:${R[C.NONNUMERICIDENTIFIER]}|${R[C.NUMERICIDENTIFIERLOOSE]})`);H("PRERELEASE",`(?:-(${R[C.PRERELEASEIDENTIFIER]}(?:\\.${R[C.PRERELEASEIDENTIFIER]})*))`);H("PRERELEASELOOSE",`(?:-?(${R[C.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${R[C.PRERELEASEIDENTIFIERLOOSE]})*))`);H("BUILDIDENTIFIER",`${mo}+`);H("BUILD",`(?:\\+(${R[C.BUILDIDENTIFIER]}(?:\\.${R[C.BUILDIDENTIFIER]})*))`);H("FULLPLAIN",`v?${R[C.MAINVERSION]}${R[C.PRERELEASE]}?${R[C.BUILD]}?`);H("FULL",`^${R[C.FULLPLAIN]}$`);H("LOOSEPLAIN",`[v=\\s]*${R[C.MAINVERSIONLOOSE]}${R[C.PRERELEASELOOSE]}?${R[C.BUILD]}?`);H("LOOSE",`^${R[C.LOOSEPLAIN]}$`);H("GTLT","((?:<|>)?=?)");H("XRANGEIDENTIFIERLOOSE",`${R[C.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);H("XRANGEIDENTIFIER",`${R[C.NUMERICIDENTIFIER]}|x|X|\\*`);H("XRANGEPLAIN",`[v=\\s]*(${R[C.XRANGEIDENTIFIER]})(?:\\.(${R[C.XRANGEIDENTIFIER]})(?:\\.(${R[C.XRANGEIDENTIFIER]})(?:${R[C.PRERELEASE]})?${R[C.BUILD]}?)?)?`);H("XRANGEPLAINLOOSE",`[v=\\s]*(${R[C.XRANGEIDENTIFIERLOOSE]})(?:\\.(${R[C.XRANGEIDENTIFIERLOOSE]})(?:\\.(${R[C.XRANGEIDENTIFIERLOOSE]})(?:${R[C.PRERELEASELOOSE]})?${R[C.BUILD]}?)?)?`);H("XRANGE",`^${R[C.GTLT]}\\s*${R[C.XRANGEPLAIN]}$`);H("XRANGELOOSE",`^${R[C.GTLT]}\\s*${R[C.XRANGEPLAINLOOSE]}$`);H("COERCEPLAIN",`(^|[^\\d])(\\d{1,${_o}})(?:\\.(\\d{1,${_o}}))?(?:\\.(\\d{1,${_o}}))?`);H("COERCE",`${R[C.COERCEPLAIN]}(?:$|[^\\d])`);H("COERCEFULL",R[C.COERCEPLAIN]+`(?:${R[C.PRERELEASE]})?(?:${R[C.BUILD]})?(?:$|[^\\d])`);H("COERCERTL",R[C.COERCE],!0);H("COERCERTLFULL",R[C.COERCEFULL],!0);H("LONETILDE","(?:~>?)");H("TILDETRIM",`(\\s*)${R[C.LONETILDE]}\\s+`,!0);Ve.tildeTrimReplace="$1~";H("TILDE",`^${R[C.LONETILDE]}${R[C.XRANGEPLAIN]}$`);H("TILDELOOSE",`^${R[C.LONETILDE]}${R[C.XRANGEPLAINLOOSE]}$`);H("LONECARET","(?:\\^)");H("CARETTRIM",`(\\s*)${R[C.LONECARET]}\\s+`,!0);Ve.caretTrimReplace="$1^";H("CARET",`^${R[C.LONECARET]}${R[C.XRANGEPLAIN]}$`);H("CARETLOOSE",`^${R[C.LONECARET]}${R[C.XRANGEPLAINLOOSE]}$`);H("COMPARATORLOOSE",`^${R[C.GTLT]}\\s*(${R[C.LOOSEPLAIN]})$|^$`);H("COMPARATOR",`^${R[C.GTLT]}\\s*(${R[C.FULLPLAIN]})$|^$`);H("COMPARATORTRIM",`(\\s*)${R[C.GTLT]}\\s*(${R[C.LOOSEPLAIN]}|${R[C.XRANGEPLAIN]})`,!0);Ve.comparatorTrimReplace="$1$2$3";H("HYPHENRANGE",`^\\s*(${R[C.XRANGEPLAIN]})\\s+-\\s+(${R[C.XRANGEPLAIN]})\\s*$`);H("HYPHENRANGELOOSE",`^\\s*(${R[C.XRANGEPLAINLOOSE]})\\s+-\\s+(${R[C.XRANGEPLAINLOOSE]})\\s*$`);H("STAR","(<|>)?=?\\s*\\*");H("GTE0","^\\s*>=\\s*0\\.0\\.0\\s*$");H("GTE0PRE","^\\s*>=\\s*0\\.0\\.0-0\\s*$")});var Jr=_((eO,ph)=>{"use strict";var z1=Object.freeze({loose:!0}),Q1=Object.freeze({}),Z1=n=>n?typeof n!="object"?z1:n:Q1;ph.exports=Z1});var go=_((tO,gh)=>{"use strict";var _h=/^[0-9]+$/,mh=(n,e)=>{let t=_h.test(n),r=_h.test(e);return t&&r&&(n=+n,e=+e),n===e?0:t&&!r?-1:r&&!t?1:n<e?-1:1},eT=(n,e)=>mh(e,n);gh.exports={compareIdentifiers:mh,rcompareIdentifiers:eT}});var ye=_((nO,Eh)=>{"use strict";var Xr=pn(),{MAX_LENGTH:yh,MAX_SAFE_INTEGER:zr}=dn(),{safeRe:Qr,t:Zr}=Mt(),tT=Jr(),{compareIdentifiers:Dt}=go(),yo=class n{constructor(e,t){if(t=tT(t),e instanceof n){if(e.loose===!!t.loose&&e.includePrerelease===!!t.includePrerelease)return e;e=e.version}else if(typeof e!="string")throw new TypeError(`Invalid version. Must be a string. Got type "${typeof e}".`);if(e.length>yh)throw new TypeError(`version is longer than ${yh} characters`);Xr("SemVer",e,t),this.options=t,this.loose=!!t.loose,this.includePrerelease=!!t.includePrerelease;let r=e.trim().match(t.loose?Qr[Zr.LOOSE]:Qr[Zr.FULL]);if(!r)throw new TypeError(`Invalid Version: ${e}`);if(this.raw=e,this.major=+r[1],this.minor=+r[2],this.patch=+r[3],this.major>zr||this.major<0)throw new TypeError("Invalid major version");if(this.minor>zr||this.minor<0)throw new TypeError("Invalid minor version");if(this.patch>zr||this.patch<0)throw new TypeError("Invalid patch version");r[4]?this.prerelease=r[4].split(".").map(i=>{if(/^[0-9]+$/.test(i)){let s=+i;if(s>=0&&s<zr)return s}return i}):this.prerelease=[],this.build=r[5]?r[5].split("."):[],this.format()}format(){return this.version=`${this.major}.${this.minor}.${this.patch}`,this.prerelease.length&&(this.version+=`-${this.prerelease.join(".")}`),this.version}toString(){return this.version}compare(e){if(Xr("SemVer.compare",this.version,this.options,e),!(e instanceof n)){if(typeof e=="string"&&e===this.version)return 0;e=new n(e,this.options)}return e.version===this.version?0:this.compareMain(e)||this.comparePre(e)}compareMain(e){return e instanceof n||(e=new n(e,this.options)),Dt(this.major,e.major)||Dt(this.minor,e.minor)||Dt(this.patch,e.patch)}comparePre(e){if(e instanceof n||(e=new n(e,this.options)),this.prerelease.length&&!e.prerelease.length)return-1;if(!this.prerelease.length&&e.prerelease.length)return 1;if(!this.prerelease.length&&!e.prerelease.length)return 0;let t=0;do{let r=this.prerelease[t],i=e.prerelease[t];if(Xr("prerelease compare",t,r,i),r===void 0&&i===void 0)return 0;if(i===void 0)return 1;if(r===void 0)return-1;if(r===i)continue;return Dt(r,i)}while(++t)}compareBuild(e){e instanceof n||(e=new n(e,this.options));let t=0;do{let r=this.build[t],i=e.build[t];if(Xr("build compare",t,r,i),r===void 0&&i===void 0)return 0;if(i===void 0)return 1;if(r===void 0)return-1;if(r===i)continue;return Dt(r,i)}while(++t)}inc(e,t,r){if(e.startsWith("pre")){if(!t&&r===!1)throw new Error("invalid increment argument: identifier is empty");if(t){let i=`-${t}`.match(this.options.loose?Qr[Zr.PRERELEASELOOSE]:Qr[Zr.PRERELEASE]);if(!i||i[1]!==t)throw new Error(`invalid identifier: ${t}`)}}switch(e){case"premajor":this.prerelease.length=0,this.patch=0,this.minor=0,this.major++,this.inc("pre",t,r);break;case"preminor":this.prerelease.length=0,this.patch=0,this.minor++,this.inc("pre",t,r);break;case"prepatch":this.prerelease.length=0,this.inc("patch",t,r),this.inc("pre",t,r);break;case"prerelease":this.prerelease.length===0&&this.inc("patch",t,r),this.inc("pre",t,r);break;case"release":if(this.prerelease.length===0)throw new Error(`version ${this.raw} is not a prerelease`);this.prerelease.length=0;break;case"major":(this.minor!==0||this.patch!==0||this.prerelease.length===0)&&this.major++,this.minor=0,this.patch=0,this.prerelease=[];break;case"minor":(this.patch!==0||this.prerelease.length===0)&&this.minor++,this.patch=0,this.prerelease=[];break;case"patch":this.prerelease.length===0&&this.patch++,this.prerelease=[];break;case"pre":{let i=Number(r)?1:0;if(this.prerelease.length===0)this.prerelease=[i];else{let s=this.prerelease.length;for(;--s>=0;)typeof this.prerelease[s]=="number"&&(this.prerelease[s]++,s=-2);if(s===-1){if(t===this.prerelease.join(".")&&r===!1)throw new Error("invalid increment argument: identifier already exists");this.prerelease.push(i)}}if(t){let s=[t,i];r===!1&&(s=[t]),Dt(this.prerelease[0],t)===0?isNaN(this.prerelease[1])&&(this.prerelease=s):this.prerelease=s}break}default:throw new Error(`invalid increment argument: ${e}`)}return this.raw=this.format(),this.build.length&&(this.raw+=`+${this.build.join(".")}`),this}};Eh.exports=yo});var Et=_((rO,Lh)=>{"use strict";var Th=ye(),nT=(n,e,t=!1)=>{if(n instanceof Th)return n;try{return new Th(n,e)}catch(r){if(!t)return null;throw r}};Lh.exports=nT});var Sh=_((iO,Ah)=>{"use strict";var rT=Et(),iT=(n,e)=>{let t=rT(n,e);return t?t.version:null};Ah.exports=iT});var wh=_((sO,Ih)=>{"use strict";var sT=Et(),oT=(n,e)=>{let t=sT(n.trim().replace(/^[=v]+/,""),e);return t?t.version:null};Ih.exports=oT});var Nh=_((oO,bh)=>{"use strict";var vh=ye(),aT=(n,e,t,r,i)=>{typeof t=="string"&&(i=r,r=t,t=void 0);try{return new vh(n instanceof vh?n.version:n,t).inc(e,r,i).version}catch{return null}};bh.exports=aT});var Ch=_((aO,Rh)=>{"use strict";var Oh=Et(),lT=(n,e)=>{let t=Oh(n,null,!0),r=Oh(e,null,!0),i=t.compare(r);if(i===0)return null;let s=i>0,o=s?t:r,a=s?r:t,l=!!o.prerelease.length;if(!!a.prerelease.length&&!l){if(!a.patch&&!a.minor)return"major";if(a.compareMain(o)===0)return a.minor&&!a.patch?"minor":"patch"}let u=l?"pre":"";return t.major!==r.major?u+"major":t.minor!==r.minor?u+"minor":t.patch!==r.patch?u+"patch":"prerelease"};Rh.exports=lT});var Ph=_((lO,kh)=>{"use strict";var cT=ye(),uT=(n,e)=>new cT(n,e).major;kh.exports=uT});var qh=_((cO,$h)=>{"use strict";var fT=ye(),hT=(n,e)=>new fT(n,e).minor;$h.exports=hT});var Mh=_((uO,xh)=>{"use strict";var dT=ye(),pT=(n,e)=>new dT(n,e).patch;xh.exports=pT});var Fh=_((fO,Dh)=>{"use strict";var _T=Et(),mT=(n,e)=>{let t=_T(n,e);return t&&t.prerelease.length?t.prerelease:null};Dh.exports=mT});var $e=_((hO,Hh)=>{"use strict";var jh=ye(),gT=(n,e,t)=>new jh(n,t).compare(new jh(e,t));Hh.exports=gT});var Uh=_((dO,Bh)=>{"use strict";var yT=$e(),ET=(n,e,t)=>yT(e,n,t);Bh.exports=ET});var Wh=_((pO,Vh)=>{"use strict";var TT=$e(),LT=(n,e)=>TT(n,e,!0);Vh.exports=LT});var ei=_((_O,Kh)=>{"use strict";var Gh=ye(),AT=(n,e,t)=>{let r=new Gh(n,t),i=new Gh(e,t);return r.compare(i)||r.compareBuild(i)};Kh.exports=AT});var Jh=_((mO,Yh)=>{"use strict";var ST=ei(),IT=(n,e)=>n.sort((t,r)=>ST(t,r,e));Yh.exports=IT});var zh=_((gO,Xh)=>{"use strict";var wT=ei(),vT=(n,e)=>n.sort((t,r)=>wT(r,t,e));Xh.exports=vT});var _n=_((yO,Qh)=>{"use strict";var bT=$e(),NT=(n,e,t)=>bT(n,e,t)>0;Qh.exports=NT});var ti=_((EO,Zh)=>{"use strict";var OT=$e(),RT=(n,e,t)=>OT(n,e,t)<0;Zh.exports=RT});var Eo=_((TO,ed)=>{"use strict";var CT=$e(),kT=(n,e,t)=>CT(n,e,t)===0;ed.exports=kT});var To=_((LO,td)=>{"use strict";var PT=$e(),$T=(n,e,t)=>PT(n,e,t)!==0;td.exports=$T});var ni=_((AO,nd)=>{"use strict";var qT=$e(),xT=(n,e,t)=>qT(n,e,t)>=0;nd.exports=xT});var ri=_((SO,rd)=>{"use strict";var MT=$e(),DT=(n,e,t)=>MT(n,e,t)<=0;rd.exports=DT});var Lo=_((IO,id)=>{"use strict";var FT=Eo(),jT=To(),HT=_n(),BT=ni(),UT=ti(),VT=ri(),WT=(n,e,t,r)=>{switch(e){case"===":return typeof n=="object"&&(n=n.version),typeof t=="object"&&(t=t.version),n===t;case"!==":return typeof n=="object"&&(n=n.version),typeof t=="object"&&(t=t.version),n!==t;case"":case"=":case"==":return FT(n,t,r);case"!=":return jT(n,t,r);case">":return HT(n,t,r);case">=":return BT(n,t,r);case"<":return UT(n,t,r);case"<=":return VT(n,t,r);default:throw new TypeError(`Invalid operator: ${e}`)}};id.exports=WT});var od=_((wO,sd)=>{"use strict";var GT=ye(),KT=Et(),{safeRe:ii,t:si}=Mt(),YT=(n,e)=>{if(n instanceof GT)return n;if(typeof n=="number"&&(n=String(n)),typeof n!="string")return null;e=e||{};let t=null;if(!e.rtl)t=n.match(e.includePrerelease?ii[si.COERCEFULL]:ii[si.COERCE]);else{let l=e.includePrerelease?ii[si.COERCERTLFULL]:ii[si.COERCERTL],c;for(;(c=l.exec(n))&&(!t||t.index+t[0].length!==n.length);)(!t||c.index+c[0].length!==t.index+t[0].length)&&(t=c),l.lastIndex=c.index+c[1].length+c[2].length;l.lastIndex=-1}if(t===null)return null;let r=t[2],i=t[3]||"0",s=t[4]||"0",o=e.includePrerelease&&t[5]?`-${t[5]}`:"",a=e.includePrerelease&&t[6]?`+${t[6]}`:"";return KT(`${r}.${i}.${s}${o}${a}`,e)};sd.exports=YT});var ld=_((vO,ad)=>{"use strict";var Ao=class{constructor(){this.max=1e3,this.map=new Map}get(e){let t=this.map.get(e);if(t!==void 0)return this.map.delete(e),this.map.set(e,t),t}delete(e){return this.map.delete(e)}set(e,t){if(!this.delete(e)&&t!==void 0){if(this.map.size>=this.max){let i=this.map.keys().next().value;this.delete(i)}this.map.set(e,t)}return this}};ad.exports=Ao});var qe=_((bO,hd)=>{"use strict";var JT=/\s+/g,So=class n{constructor(e,t){if(t=zT(t),e instanceof n)return e.loose===!!t.loose&&e.includePrerelease===!!t.includePrerelease?e:new n(e.raw,t);if(e instanceof Io)return this.raw=e.value,this.set=[[e]],this.formatted=void 0,this;if(this.options=t,this.loose=!!t.loose,this.includePrerelease=!!t.includePrerelease,this.raw=e.trim().replace(JT," "),this.set=this.raw.split("||").map(r=>this.parseRange(r.trim())).filter(r=>r.length),!this.set.length)throw new TypeError(`Invalid SemVer Range: ${this.raw}`);if(this.set.length>1){let r=this.set[0];if(this.set=this.set.filter(i=>!ud(i[0])),this.set.length===0)this.set=[r];else if(this.set.length>1){for(let i of this.set)if(i.length===1&&iL(i[0])){this.set=[i];break}}}this.formatted=void 0}get range(){if(this.formatted===void 0){this.formatted="";for(let e=0;e<this.set.length;e++){e>0&&(this.formatted+="||");let t=this.set[e];for(let r=0;r<t.length;r++)r>0&&(this.formatted+=" "),this.formatted+=t[r].toString().trim()}}return this.formatted}format(){return this.range}toString(){return this.range}parseRange(e){let r=((this.options.includePrerelease&&nL)|(this.options.loose&&rL))+":"+e,i=cd.get(r);if(i)return i;let s=this.options.loose,o=s?Ne[Ae.HYPHENRANGELOOSE]:Ne[Ae.HYPHENRANGE];e=e.replace(o,pL(this.options.includePrerelease)),te("hyphen replace",e),e=e.replace(Ne[Ae.COMPARATORTRIM],ZT),te("comparator trim",e),e=e.replace(Ne[Ae.TILDETRIM],eL),te("tilde trim",e),e=e.replace(Ne[Ae.CARETTRIM],tL),te("caret trim",e);let a=e.split(" ").map(f=>sL(f,this.options)).join(" ").split(/\s+/).map(f=>dL(f,this.options));s&&(a=a.filter(f=>(te("loose invalid filter",f,this.options),!!f.match(Ne[Ae.COMPARATORLOOSE])))),te("range list",a);let l=new Map,c=a.map(f=>new Io(f,this.options));for(let f of c){if(ud(f))return[f];l.set(f.value,f)}l.size>1&&l.has("")&&l.delete("");let u=[...l.values()];return cd.set(r,u),u}intersects(e,t){if(!(e instanceof n))throw new TypeError("a Range is required");return this.set.some(r=>fd(r,t)&&e.set.some(i=>fd(i,t)&&r.every(s=>i.every(o=>s.intersects(o,t)))))}test(e){if(!e)return!1;if(typeof e=="string")try{e=new QT(e,this.options)}catch{return!1}for(let t=0;t<this.set.length;t++)if(_L(this.set[t],e,this.options))return!0;return!1}};hd.exports=So;var XT=ld(),cd=new XT,zT=Jr(),Io=mn(),te=pn(),QT=ye(),{safeRe:Ne,t:Ae,comparatorTrimReplace:ZT,tildeTrimReplace:eL,caretTrimReplace:tL}=Mt(),{FLAG_INCLUDE_PRERELEASE:nL,FLAG_LOOSE:rL}=dn(),ud=n=>n.value==="<0.0.0-0",iL=n=>n.value==="",fd=(n,e)=>{let t=!0,r=n.slice(),i=r.pop();for(;t&&r.length;)t=r.every(s=>i.intersects(s,e)),i=r.pop();return t},sL=(n,e)=>(te("comp",n,e),n=lL(n,e),te("caret",n),n=oL(n,e),te("tildes",n),n=uL(n,e),te("xrange",n),n=hL(n,e),te("stars",n),n),Se=n=>!n||n.toLowerCase()==="x"||n==="*",oL=(n,e)=>n.trim().split(/\s+/).map(t=>aL(t,e)).join(" "),aL=(n,e)=>{let t=e.loose?Ne[Ae.TILDELOOSE]:Ne[Ae.TILDE];return n.replace(t,(r,i,s,o,a)=>{te("tilde",n,r,i,s,o,a);let l;return Se(i)?l="":Se(s)?l=`>=${i}.0.0 <${+i+1}.0.0-0`:Se(o)?l=`>=${i}.${s}.0 <${i}.${+s+1}.0-0`:a?(te("replaceTilde pr",a),l=`>=${i}.${s}.${o}-${a} <${i}.${+s+1}.0-0`):l=`>=${i}.${s}.${o} <${i}.${+s+1}.0-0`,te("tilde return",l),l})},lL=(n,e)=>n.trim().split(/\s+/).map(t=>cL(t,e)).join(" "),cL=(n,e)=>{te("caret",n,e);let t=e.loose?Ne[Ae.CARETLOOSE]:Ne[Ae.CARET],r=e.includePrerelease?"-0":"";return n.replace(t,(i,s,o,a,l)=>{te("caret",n,i,s,o,a,l);let c;return Se(s)?c="":Se(o)?c=`>=${s}.0.0${r} <${+s+1}.0.0-0`:Se(a)?s==="0"?c=`>=${s}.${o}.0${r} <${s}.${+o+1}.0-0`:c=`>=${s}.${o}.0${r} <${+s+1}.0.0-0`:l?(te("replaceCaret pr",l),s==="0"?o==="0"?c=`>=${s}.${o}.${a}-${l} <${s}.${o}.${+a+1}-0`:c=`>=${s}.${o}.${a}-${l} <${s}.${+o+1}.0-0`:c=`>=${s}.${o}.${a}-${l} <${+s+1}.0.0-0`):(te("no pr"),s==="0"?o==="0"?c=`>=${s}.${o}.${a}${r} <${s}.${o}.${+a+1}-0`:c=`>=${s}.${o}.${a}${r} <${s}.${+o+1}.0-0`:c=`>=${s}.${o}.${a} <${+s+1}.0.0-0`),te("caret return",c),c})},uL=(n,e)=>(te("replaceXRanges",n,e),n.split(/\s+/).map(t=>fL(t,e)).join(" ")),fL=(n,e)=>{n=n.trim();let t=e.loose?Ne[Ae.XRANGELOOSE]:Ne[Ae.XRANGE];return n.replace(t,(r,i,s,o,a,l)=>{te("xRange",n,r,i,s,o,a,l);let c=Se(s),u=c||Se(o),f=u||Se(a),d=f;return i==="="&&d&&(i=""),l=e.includePrerelease?"-0":"",c?i===">"||i==="<"?r="<0.0.0-0":r="*":i&&d?(u&&(o=0),a=0,i===">"?(i=">=",u?(s=+s+1,o=0,a=0):(o=+o+1,a=0)):i==="<="&&(i="<",u?s=+s+1:o=+o+1),i==="<"&&(l="-0"),r=`${i+s}.${o}.${a}${l}`):u?r=`>=${s}.0.0${l} <${+s+1}.0.0-0`:f&&(r=`>=${s}.${o}.0${l} <${s}.${+o+1}.0-0`),te("xRange return",r),r})},hL=(n,e)=>(te("replaceStars",n,e),n.trim().replace(Ne[Ae.STAR],"")),dL=(n,e)=>(te("replaceGTE0",n,e),n.trim().replace(Ne[e.includePrerelease?Ae.GTE0PRE:Ae.GTE0],"")),pL=n=>(e,t,r,i,s,o,a,l,c,u,f,d)=>(Se(r)?t="":Se(i)?t=`>=${r}.0.0${n?"-0":""}`:Se(s)?t=`>=${r}.${i}.0${n?"-0":""}`:o?t=`>=${t}`:t=`>=${t}${n?"-0":""}`,Se(c)?l="":Se(u)?l=`<${+c+1}.0.0-0`:Se(f)?l=`<${c}.${+u+1}.0-0`:d?l=`<=${c}.${u}.${f}-${d}`:n?l=`<${c}.${u}.${+f+1}-0`:l=`<=${l}`,`${t} ${l}`.trim()),_L=(n,e,t)=>{for(let r=0;r<n.length;r++)if(!n[r].test(e))return!1;if(e.prerelease.length&&!t.includePrerelease){for(let r=0;r<n.length;r++)if(te(n[r].semver),n[r].semver!==Io.ANY&&n[r].semver.prerelease.length>0){let i=n[r].semver;if(i.major===e.major&&i.minor===e.minor&&i.patch===e.patch)return!0}return!1}return!0}});var mn=_((NO,yd)=>{"use strict";var gn=Symbol("SemVer ANY"),bo=class n{static get ANY(){return gn}constructor(e,t){if(t=dd(t),e instanceof n){if(e.loose===!!t.loose)return e;e=e.value}e=e.trim().split(/\s+/).join(" "),vo("comparator",e,t),this.options=t,this.loose=!!t.loose,this.parse(e),this.semver===gn?this.value="":this.value=this.operator+this.semver.version,vo("comp",this)}parse(e){let t=this.options.loose?pd[_d.COMPARATORLOOSE]:pd[_d.COMPARATOR],r=e.match(t);if(!r)throw new TypeError(`Invalid comparator: ${e}`);this.operator=r[1]!==void 0?r[1]:"",this.operator==="="&&(this.operator=""),r[2]?this.semver=new md(r[2],this.options.loose):this.semver=gn}toString(){return this.value}test(e){if(vo("Comparator.test",e,this.options.loose),this.semver===gn||e===gn)return!0;if(typeof e=="string")try{e=new md(e,this.options)}catch{return!1}return wo(e,this.operator,this.semver,this.options)}intersects(e,t){if(!(e instanceof n))throw new TypeError("a Comparator is required");return this.operator===""?this.value===""?!0:new gd(e.value,t).test(this.value):e.operator===""?e.value===""?!0:new gd(this.value,t).test(e.semver):(t=dd(t),t.includePrerelease&&(this.value==="<0.0.0-0"||e.value==="<0.0.0-0")||!t.includePrerelease&&(this.value.startsWith("<0.0.0")||e.value.startsWith("<0.0.0"))?!1:!!(this.operator.startsWith(">")&&e.operator.startsWith(">")||this.operator.startsWith("<")&&e.operator.startsWith("<")||this.semver.version===e.semver.version&&this.operator.includes("=")&&e.operator.includes("=")||wo(this.semver,"<",e.semver,t)&&this.operator.startsWith(">")&&e.operator.startsWith("<")||wo(this.semver,">",e.semver,t)&&this.operator.startsWith("<")&&e.operator.startsWith(">")))}};yd.exports=bo;var dd=Jr(),{safeRe:pd,t:_d}=Mt(),wo=Lo(),vo=pn(),md=ye(),gd=qe()});var yn=_((OO,Ed)=>{"use strict";var mL=qe(),gL=(n,e,t)=>{try{e=new mL(e,t)}catch{return!1}return e.test(n)};Ed.exports=gL});var Ld=_((RO,Td)=>{"use strict";var yL=qe(),EL=(n,e)=>new yL(n,e).set.map(t=>t.map(r=>r.value).join(" ").trim().split(" "));Td.exports=EL});var Sd=_((CO,Ad)=>{"use strict";var TL=ye(),LL=qe(),AL=(n,e,t)=>{let r=null,i=null,s=null;try{s=new LL(e,t)}catch{return null}return n.forEach(o=>{s.test(o)&&(!r||i.compare(o)===-1)&&(r=o,i=new TL(r,t))}),r};Ad.exports=AL});var wd=_((kO,Id)=>{"use strict";var SL=ye(),IL=qe(),wL=(n,e,t)=>{let r=null,i=null,s=null;try{s=new IL(e,t)}catch{return null}return n.forEach(o=>{s.test(o)&&(!r||i.compare(o)===1)&&(r=o,i=new SL(r,t))}),r};Id.exports=wL});var Nd=_((PO,bd)=>{"use strict";var No=ye(),vL=qe(),vd=_n(),bL=(n,e)=>{n=new vL(n,e);let t=new No("0.0.0");if(n.test(t)||(t=new No("0.0.0-0"),n.test(t)))return t;t=null;for(let r=0;r<n.set.length;++r){let i=n.set[r],s=null;i.forEach(o=>{let a=new No(o.semver.version);switch(o.operator){case">":a.prerelease.length===0?a.patch++:a.prerelease.push(0),a.raw=a.format();case"":case">=":(!s||vd(a,s))&&(s=a);break;case"<":case"<=":break;default:throw new Error(`Unexpected operation: ${o.operator}`)}}),s&&(!t||vd(t,s))&&(t=s)}return t&&n.test(t)?t:null};bd.exports=bL});var Rd=_(($O,Od)=>{"use strict";var NL=qe(),OL=(n,e)=>{try{return new NL(n,e).range||"*"}catch{return null}};Od.exports=OL});var oi=_((qO,$d)=>{"use strict";var RL=ye(),Pd=mn(),{ANY:CL}=Pd,kL=qe(),PL=yn(),Cd=_n(),kd=ti(),$L=ri(),qL=ni(),xL=(n,e,t,r)=>{n=new RL(n,r),e=new kL(e,r);let i,s,o,a,l;switch(t){case">":i=Cd,s=$L,o=kd,a=">",l=">=";break;case"<":i=kd,s=qL,o=Cd,a="<",l="<=";break;default:throw new TypeError('Must provide a hilo val of "<" or ">"')}if(PL(n,e,r))return!1;for(let c=0;c<e.set.length;++c){let u=e.set[c],f=null,d=null;if(u.forEach(h=>{h.semver===CL&&(h=new Pd(">=0.0.0")),f=f||h,d=d||h,i(h.semver,f.semver,r)?f=h:o(h.semver,d.semver,r)&&(d=h)}),f.operator===a||f.operator===l||(!d.operator||d.operator===a)&&s(n,d.semver))return!1;if(d.operator===l&&o(n,d.semver))return!1}return!0};$d.exports=xL});var xd=_((xO,qd)=>{"use strict";var ML=oi(),DL=(n,e,t)=>ML(n,e,">",t);qd.exports=DL});var Dd=_((MO,Md)=>{"use strict";var FL=oi(),jL=(n,e,t)=>FL(n,e,"<",t);Md.exports=jL});var Hd=_((DO,jd)=>{"use strict";var Fd=qe(),HL=(n,e,t)=>(n=new Fd(n,t),e=new Fd(e,t),n.intersects(e,t));jd.exports=HL});var Ud=_((FO,Bd)=>{"use strict";var BL=yn(),UL=$e();Bd.exports=(n,e,t)=>{let r=[],i=null,s=null,o=n.sort((u,f)=>UL(u,f,t));for(let u of o)BL(u,e,t)?(s=u,i||(i=u)):(s&&r.push([i,s]),s=null,i=null);i&&r.push([i,null]);let a=[];for(let[u,f]of r)u===f?a.push(u):!f&&u===o[0]?a.push("*"):f?u===o[0]?a.push(`<=${f}`):a.push(`${u} - ${f}`):a.push(`>=${u}`);let l=a.join(" || "),c=typeof e.raw=="string"?e.raw:String(e);return l.length<c.length?l:e}});var Jd=_((jO,Yd)=>{"use strict";var Vd=qe(),Ro=mn(),{ANY:Oo}=Ro,En=yn(),Co=$e(),VL=(n,e,t={})=>{if(n===e)return!0;n=new Vd(n,t),e=new Vd(e,t);let r=!1;e:for(let i of n.set){for(let s of e.set){let o=GL(i,s,t);if(r=r||o!==null,o)continue e}if(r)return!1}return!0},WL=[new Ro(">=0.0.0-0")],Wd=[new Ro(">=0.0.0")],GL=(n,e,t)=>{if(n===e)return!0;if(n.length===1&&n[0].semver===Oo){if(e.length===1&&e[0].semver===Oo)return!0;t.includePrerelease?n=WL:n=Wd}if(e.length===1&&e[0].semver===Oo){if(t.includePrerelease)return!0;e=Wd}let r=new Set,i,s;for(let h of n)h.operator===">"||h.operator===">="?i=Gd(i,h,t):h.operator==="<"||h.operator==="<="?s=Kd(s,h,t):r.add(h.semver);if(r.size>1)return null;let o;if(i&&s){if(o=Co(i.semver,s.semver,t),o>0)return null;if(o===0&&(i.operator!==">="||s.operator!=="<="))return null}for(let h of r){if(i&&!En(h,String(i),t)||s&&!En(h,String(s),t))return null;for(let y of e)if(!En(h,String(y),t))return!1;return!0}let a,l,c,u,f=s&&!t.includePrerelease&&s.semver.prerelease.length?s.semver:!1,d=i&&!t.includePrerelease&&i.semver.prerelease.length?i.semver:!1;f&&f.prerelease.length===1&&s.operator==="<"&&f.prerelease[0]===0&&(f=!1);for(let h of e){if(u=u||h.operator===">"||h.operator===">=",c=c||h.operator==="<"||h.operator==="<=",i){if(d&&h.semver.prerelease&&h.semver.prerelease.length&&h.semver.major===d.major&&h.semver.minor===d.minor&&h.semver.patch===d.patch&&(d=!1),h.operator===">"||h.operator===">="){if(a=Gd(i,h,t),a===h&&a!==i)return!1}else if(i.operator===">="&&!En(i.semver,String(h),t))return!1}if(s){if(f&&h.semver.prerelease&&h.semver.prerelease.length&&h.semver.major===f.major&&h.semver.minor===f.minor&&h.semver.patch===f.patch&&(f=!1),h.operator==="<"||h.operator==="<="){if(l=Kd(s,h,t),l===h&&l!==s)return!1}else if(s.operator==="<="&&!En(s.semver,String(h),t))return!1}if(!h.operator&&(s||i)&&o!==0)return!1}return!(i&&c&&!s&&o!==0||s&&u&&!i&&o!==0||d||f)},Gd=(n,e,t)=>{if(!n)return e;let r=Co(n.semver,e.semver,t);return r>0?n:r<0||e.operator===">"&&n.operator===">="?e:n},Kd=(n,e,t)=>{if(!n)return e;let r=Co(n.semver,e.semver,t);return r<0?n:r>0||e.operator==="<"&&n.operator==="<="?e:n};Yd.exports=VL});var Zd=_((HO,Qd)=>{"use strict";var ko=Mt(),Xd=dn(),KL=ye(),zd=go(),YL=Et(),JL=Sh(),XL=wh(),zL=Nh(),QL=Ch(),ZL=Ph(),eA=qh(),tA=Mh(),nA=Fh(),rA=$e(),iA=Uh(),sA=Wh(),oA=ei(),aA=Jh(),lA=zh(),cA=_n(),uA=ti(),fA=Eo(),hA=To(),dA=ni(),pA=ri(),_A=Lo(),mA=od(),gA=mn(),yA=qe(),EA=yn(),TA=Ld(),LA=Sd(),AA=wd(),SA=Nd(),IA=Rd(),wA=oi(),vA=xd(),bA=Dd(),NA=Hd(),OA=Ud(),RA=Jd();Qd.exports={parse:YL,valid:JL,clean:XL,inc:zL,diff:QL,major:ZL,minor:eA,patch:tA,prerelease:nA,compare:rA,rcompare:iA,compareLoose:sA,compareBuild:oA,sort:aA,rsort:lA,gt:cA,lt:uA,eq:fA,neq:hA,gte:dA,lte:pA,cmp:_A,coerce:mA,Comparator:gA,Range:yA,satisfies:EA,toComparators:TA,maxSatisfying:LA,minSatisfying:AA,minVersion:SA,validRange:IA,outside:wA,gtr:vA,ltr:bA,intersects:NA,simplifyRange:OA,subset:RA,SemVer:KL,re:ko.re,src:ko.src,tokens:ko.t,SEMVER_SPEC_VERSION:Xd.SEMVER_SPEC_VERSION,RELEASE_TYPES:Xd.RELEASE_TYPES,compareIdentifiers:zd.compareIdentifiers,rcompareIdentifiers:zd.rcompareIdentifiers}});var W=_(ge=>{"use strict";var xo=Symbol.for("yaml.alias"),rp=Symbol.for("yaml.document"),ai=Symbol.for("yaml.map"),ip=Symbol.for("yaml.pair"),Mo=Symbol.for("yaml.scalar"),li=Symbol.for("yaml.seq"),ze=Symbol.for("yaml.node.type"),CA=n=>!!n&&typeof n=="object"&&n[ze]===xo,kA=n=>!!n&&typeof n=="object"&&n[ze]===rp,PA=n=>!!n&&typeof n=="object"&&n[ze]===ai,$A=n=>!!n&&typeof n=="object"&&n[ze]===ip,sp=n=>!!n&&typeof n=="object"&&n[ze]===Mo,qA=n=>!!n&&typeof n=="object"&&n[ze]===li;function op(n){if(n&&typeof n=="object")switch(n[ze]){case ai:case li:return!0}return!1}function xA(n){if(n&&typeof n=="object")switch(n[ze]){case xo:case ai:case Mo:case li:return!0}return!1}var MA=n=>(sp(n)||op(n))&&!!n.anchor;ge.ALIAS=xo;ge.DOC=rp;ge.MAP=ai;ge.NODE_TYPE=ze;ge.PAIR=ip;ge.SCALAR=Mo;ge.SEQ=li;ge.hasAnchor=MA;ge.isAlias=CA;ge.isCollection=op;ge.isDocument=kA;ge.isMap=PA;ge.isNode=xA;ge.isPair=$A;ge.isScalar=sp;ge.isSeq=qA});var Tn=_(Do=>{"use strict";var ue=W(),Oe=Symbol("break visit"),ap=Symbol("skip children"),We=Symbol("remove node");function ci(n,e){let t=lp(e);ue.isDocument(n)?Ft(null,n.contents,t,Object.freeze([n]))===We&&(n.contents=null):Ft(null,n,t,Object.freeze([]))}ci.BREAK=Oe;ci.SKIP=ap;ci.REMOVE=We;function Ft(n,e,t,r){let i=cp(n,e,t,r);if(ue.isNode(i)||ue.isPair(i))return up(n,r,i),Ft(n,i,t,r);if(typeof i!="symbol"){if(ue.isCollection(e)){r=Object.freeze(r.concat(e));for(let s=0;s<e.items.length;++s){let o=Ft(s,e.items[s],t,r);if(typeof o=="number")s=o-1;else{if(o===Oe)return Oe;o===We&&(e.items.splice(s,1),s-=1)}}}else if(ue.isPair(e)){r=Object.freeze(r.concat(e));let s=Ft("key",e.key,t,r);if(s===Oe)return Oe;s===We&&(e.key=null);let o=Ft("value",e.value,t,r);if(o===Oe)return Oe;o===We&&(e.value=null)}}return i}async function ui(n,e){let t=lp(e);ue.isDocument(n)?await jt(null,n.contents,t,Object.freeze([n]))===We&&(n.contents=null):await jt(null,n,t,Object.freeze([]))}ui.BREAK=Oe;ui.SKIP=ap;ui.REMOVE=We;async function jt(n,e,t,r){let i=await cp(n,e,t,r);if(ue.isNode(i)||ue.isPair(i))return up(n,r,i),jt(n,i,t,r);if(typeof i!="symbol"){if(ue.isCollection(e)){r=Object.freeze(r.concat(e));for(let s=0;s<e.items.length;++s){let o=await jt(s,e.items[s],t,r);if(typeof o=="number")s=o-1;else{if(o===Oe)return Oe;o===We&&(e.items.splice(s,1),s-=1)}}}else if(ue.isPair(e)){r=Object.freeze(r.concat(e));let s=await jt("key",e.key,t,r);if(s===Oe)return Oe;s===We&&(e.key=null);let o=await jt("value",e.value,t,r);if(o===Oe)return Oe;o===We&&(e.value=null)}}return i}function lp(n){return typeof n=="object"&&(n.Collection||n.Node||n.Value)?Object.assign({Alias:n.Node,Map:n.Node,Scalar:n.Node,Seq:n.Node},n.Value&&{Map:n.Value,Scalar:n.Value,Seq:n.Value},n.Collection&&{Map:n.Collection,Seq:n.Collection},n):n}function cp(n,e,t,r){if(typeof t=="function")return t(n,e,r);if(ue.isMap(e))return t.Map?.(n,e,r);if(ue.isSeq(e))return t.Seq?.(n,e,r);if(ue.isPair(e))return t.Pair?.(n,e,r);if(ue.isScalar(e))return t.Scalar?.(n,e,r);if(ue.isAlias(e))return t.Alias?.(n,e,r)}function up(n,e,t){let r=e[e.length-1];if(ue.isCollection(r))r.items[n]=t;else if(ue.isPair(r))n==="key"?r.key=t:r.value=t;else if(ue.isDocument(r))r.contents=t;else{let i=ue.isAlias(r)?"alias":"scalar";throw new Error(`Cannot replace node with ${i} parent`)}}Do.visit=ci;Do.visitAsync=ui});var Fo=_(hp=>{"use strict";var fp=W(),DA=Tn(),FA={"!":"%21",",":"%2C","[":"%5B","]":"%5D","{":"%7B","}":"%7D"},jA=n=>n.replace(/[!,[\]{}]/g,e=>FA[e]),Ln=class n{constructor(e,t){this.docStart=null,this.docEnd=!1,this.yaml=Object.assign({},n.defaultYaml,e),this.tags=Object.assign({},n.defaultTags,t)}clone(){let e=new n(this.yaml,this.tags);return e.docStart=this.docStart,e}atDocument(){let e=new n(this.yaml,this.tags);switch(this.yaml.version){case"1.1":this.atNextDocument=!0;break;case"1.2":this.atNextDocument=!1,this.yaml={explicit:n.defaultYaml.explicit,version:"1.2"},this.tags=Object.assign({},n.defaultTags);break}return e}add(e,t){this.atNextDocument&&(this.yaml={explicit:n.defaultYaml.explicit,version:"1.1"},this.tags=Object.assign({},n.defaultTags),this.atNextDocument=!1);let r=e.trim().split(/[ \t]+/),i=r.shift();switch(i){case"%TAG":{if(r.length!==2&&(t(0,"%TAG directive should contain exactly two parts"),r.length<2))return!1;let[s,o]=r;return this.tags[s]=o,!0}case"%YAML":{if(this.yaml.explicit=!0,r.length!==1)return t(0,"%YAML directive should contain exactly one part"),!1;let[s]=r;if(s==="1.1"||s==="1.2")return this.yaml.version=s,!0;{let o=/^\d+\.\d+$/.test(s);return t(6,`Unsupported YAML version ${s}`,o),!1}}default:return t(0,`Unknown directive ${i}`,!0),!1}}tagName(e,t){if(e==="!")return"!";if(e[0]!=="!")return t(`Not a valid tag: ${e}`),null;if(e[1]==="<"){let o=e.slice(2,-1);return o==="!"||o==="!!"?(t(`Verbatim tags aren't resolved, so ${e} is invalid.`),null):(e[e.length-1]!==">"&&t("Verbatim tags must end with a >"),o)}let[,r,i]=e.match(/^(.*!)([^!]*)$/);i||t(`The ${e} tag has no suffix`);let s=this.tags[r];return s?s+decodeURIComponent(i):r==="!"?e:(t(`Could not resolve tag: ${e}`),null)}tagString(e){for(let[t,r]of Object.entries(this.tags))if(e.startsWith(r))return t+jA(e.substring(r.length));return e[0]==="!"?e:`!<${e}>`}toString(e){let t=this.yaml.explicit?[`%YAML ${this.yaml.version||"1.2"}`]:[],r=Object.entries(this.tags),i;if(e&&r.length>0&&fp.isNode(e.contents)){let s={};DA.visit(e.contents,(o,a)=>{fp.isNode(a)&&a.tag&&(s[a.tag]=!0)}),i=Object.keys(s)}else i=[];for(let[s,o]of r)s==="!!"&&o==="tag:yaml.org,2002:"||(!e||i.some(a=>a.startsWith(o)))&&t.push(`%TAG ${s} ${o}`);return t.join(`
`)}};Ln.defaultYaml={explicit:!1,version:"1.2"};Ln.defaultTags={"!!":"tag:yaml.org,2002:"};hp.Directives=Ln});var fi=_(An=>{"use strict";var dp=W(),HA=Tn();function BA(n){if(/[\x00-\x19\s,[\]{}]/.test(n)){let t=`Anchor must not contain whitespace or control characters: ${JSON.stringify(n)}`;throw new Error(t)}return!0}function pp(n){let e=new Set;return HA.visit(n,{Value(t,r){r.anchor&&e.add(r.anchor)}}),e}function _p(n,e){for(let t=1;;++t){let r=`${n}${t}`;if(!e.has(r))return r}}function UA(n,e){let t=[],r=new Map,i=null;return{onAnchor:s=>{t.push(s),i||(i=pp(n));let o=_p(e,i);return i.add(o),o},setAnchors:()=>{for(let s of t){let o=r.get(s);if(typeof o=="object"&&o.anchor&&(dp.isScalar(o.node)||dp.isCollection(o.node)))o.node.anchor=o.anchor;else{let a=new Error("Failed to resolve repeated object (this should not happen)");throw a.source=s,a}}},sourceObjects:r}}An.anchorIsValid=BA;An.anchorNames=pp;An.createNodeAnchors=UA;An.findNewAnchor=_p});var jo=_(mp=>{"use strict";function Sn(n,e,t,r){if(r&&typeof r=="object")if(Array.isArray(r))for(let i=0,s=r.length;i<s;++i){let o=r[i],a=Sn(n,r,String(i),o);a===void 0?delete r[i]:a!==o&&(r[i]=a)}else if(r instanceof Map)for(let i of Array.from(r.keys())){let s=r.get(i),o=Sn(n,r,i,s);o===void 0?r.delete(i):o!==s&&r.set(i,o)}else if(r instanceof Set)for(let i of Array.from(r)){let s=Sn(n,r,i,i);s===void 0?r.delete(i):s!==i&&(r.delete(i),r.add(s))}else for(let[i,s]of Object.entries(r)){let o=Sn(n,r,i,s);o===void 0?delete r[i]:o!==s&&(r[i]=o)}return n.call(e,t,r)}mp.applyReviver=Sn});var ot=_(yp=>{"use strict";var VA=W();function gp(n,e,t){if(Array.isArray(n))return n.map((r,i)=>gp(r,String(i),t));if(n&&typeof n.toJSON=="function"){if(!t||!VA.hasAnchor(n))return n.toJSON(e,t);let r={aliasCount:0,count:1,res:void 0};t.anchors.set(n,r),t.onCreate=s=>{r.res=s,delete t.onCreate};let i=n.toJSON(e,t);return t.onCreate&&t.onCreate(i),i}return typeof n=="bigint"&&!t?.keep?Number(n):n}yp.toJS=gp});var hi=_(Tp=>{"use strict";var WA=jo(),Ep=W(),GA=ot(),Ho=class{constructor(e){Object.defineProperty(this,Ep.NODE_TYPE,{value:e})}clone(){let e=Object.create(Object.getPrototypeOf(this),Object.getOwnPropertyDescriptors(this));return this.range&&(e.range=this.range.slice()),e}toJS(e,{mapAsMap:t,maxAliasCount:r,onAnchor:i,reviver:s}={}){if(!Ep.isDocument(e))throw new TypeError("A document argument is required");let o={anchors:new Map,doc:e,keep:!0,mapAsMap:t===!0,mapKeyWarned:!1,maxAliasCount:typeof r=="number"?r:100},a=GA.toJS(this,"",o);if(typeof i=="function")for(let{count:l,res:c}of o.anchors.values())i(c,l);return typeof s=="function"?WA.applyReviver(s,{"":a},"",a):a}};Tp.NodeBase=Ho});var In=_(Ap=>{"use strict";var KA=fi(),Lp=Tn(),di=W(),YA=hi(),JA=ot(),Bo=class extends YA.NodeBase{constructor(e){super(di.ALIAS),this.source=e,Object.defineProperty(this,"tag",{set(){throw new Error("Alias nodes cannot have tags")}})}resolve(e){let t;return Lp.visit(e,{Node:(r,i)=>{if(i===this)return Lp.visit.BREAK;i.anchor===this.source&&(t=i)}}),t}toJSON(e,t){if(!t)return{source:this.source};let{anchors:r,doc:i,maxAliasCount:s}=t,o=this.resolve(i);if(!o){let l=`Unresolved alias (the anchor must be set before the alias): ${this.source}`;throw new ReferenceError(l)}let a=r.get(o);if(a||(JA.toJS(o,null,t),a=r.get(o)),!a||a.res===void 0){let l="This should not happen: Alias anchor was not resolved?";throw new ReferenceError(l)}if(s>=0&&(a.count+=1,a.aliasCount===0&&(a.aliasCount=pi(i,o,r)),a.count*a.aliasCount>s)){let l="Excessive alias count indicates a resource exhaustion attack";throw new ReferenceError(l)}return a.res}toString(e,t,r){let i=`*${this.source}`;if(e){if(KA.anchorIsValid(this.source),e.options.verifyAliasOrder&&!e.anchors.has(this.source)){let s=`Unresolved alias (the anchor must be set before the alias): ${this.source}`;throw new Error(s)}if(e.implicitKey)return`${i} `}return i}};function pi(n,e,t){if(di.isAlias(e)){let r=e.resolve(n),i=t&&r&&t.get(r);return i?i.count*i.aliasCount:0}else if(di.isCollection(e)){let r=0;for(let i of e.items){let s=pi(n,i,t);s>r&&(r=s)}return r}else if(di.isPair(e)){let r=pi(n,e.key,t),i=pi(n,e.value,t);return Math.max(r,i)}return 1}Ap.Alias=Bo});var ce=_(Uo=>{"use strict";var XA=W(),zA=hi(),QA=ot(),ZA=n=>!n||typeof n!="function"&&typeof n!="object",at=class extends zA.NodeBase{constructor(e){super(XA.SCALAR),this.value=e}toJSON(e,t){return t?.keep?this.value:QA.toJS(this.value,e,t)}toString(){return String(this.value)}};at.BLOCK_FOLDED="BLOCK_FOLDED";at.BLOCK_LITERAL="BLOCK_LITERAL";at.PLAIN="PLAIN";at.QUOTE_DOUBLE="QUOTE_DOUBLE";at.QUOTE_SINGLE="QUOTE_SINGLE";Uo.Scalar=at;Uo.isScalarValue=ZA});var wn=_(Ip=>{"use strict";var eS=In(),Tt=W(),Sp=ce(),tS="tag:yaml.org,2002:";function nS(n,e,t){if(e){let r=t.filter(s=>s.tag===e),i=r.find(s=>!s.format)??r[0];if(!i)throw new Error(`Tag ${e} not found`);return i}return t.find(r=>r.identify?.(n)&&!r.format)}function rS(n,e,t){if(Tt.isDocument(n)&&(n=n.contents),Tt.isNode(n))return n;if(Tt.isPair(n)){let f=t.schema[Tt.MAP].createNode?.(t.schema,null,t);return f.items.push(n),f}(n instanceof String||n instanceof Number||n instanceof Boolean||typeof BigInt<"u"&&n instanceof BigInt)&&(n=n.valueOf());let{aliasDuplicateObjects:r,onAnchor:i,onTagObj:s,schema:o,sourceObjects:a}=t,l;if(r&&n&&typeof n=="object"){if(l=a.get(n),l)return l.anchor||(l.anchor=i(n)),new eS.Alias(l.anchor);l={anchor:null,node:null},a.set(n,l)}e?.startsWith("!!")&&(e=tS+e.slice(2));let c=nS(n,e,o.tags);if(!c){if(n&&typeof n.toJSON=="function"&&(n=n.toJSON()),!n||typeof n!="object"){let f=new Sp.Scalar(n);return l&&(l.node=f),f}c=n instanceof Map?o[Tt.MAP]:Symbol.iterator in Object(n)?o[Tt.SEQ]:o[Tt.MAP]}s&&(s(c),delete t.onTagObj);let u=c?.createNode?c.createNode(t.schema,n,t):typeof c?.nodeClass?.from=="function"?c.nodeClass.from(t.schema,n,t):new Sp.Scalar(n);return e?u.tag=e:c.default||(u.tag=c.tag),l&&(l.node=u),u}Ip.createNode=rS});var vn=_(mi=>{"use strict";var iS=wn(),Ge=W(),sS=hi();function Vo(n,e,t){let r=t;for(let i=e.length-1;i>=0;--i){let s=e[i];if(typeof s=="number"&&Number.isInteger(s)&&s>=0){let o=[];o[s]=r,r=o}else r=new Map([[s,r]])}return iS.createNode(r,void 0,{aliasDuplicateObjects:!1,keepUndefined:!1,onAnchor:()=>{throw new Error("This should not happen, please report a bug.")},schema:n,sourceObjects:new Map})}var wp=n=>n==null||typeof n=="object"&&!!n[Symbol.iterator]().next().done,_i=class extends sS.NodeBase{constructor(e,t){super(e),Object.defineProperty(this,"schema",{value:t,configurable:!0,enumerable:!1,writable:!0})}clone(e){let t=Object.create(Object.getPrototypeOf(this),Object.getOwnPropertyDescriptors(this));return e&&(t.schema=e),t.items=t.items.map(r=>Ge.isNode(r)||Ge.isPair(r)?r.clone(e):r),this.range&&(t.range=this.range.slice()),t}addIn(e,t){if(wp(e))this.add(t);else{let[r,...i]=e,s=this.get(r,!0);if(Ge.isCollection(s))s.addIn(i,t);else if(s===void 0&&this.schema)this.set(r,Vo(this.schema,i,t));else throw new Error(`Expected YAML collection at ${r}. Remaining path: ${i}`)}}deleteIn(e){let[t,...r]=e;if(r.length===0)return this.delete(t);let i=this.get(t,!0);if(Ge.isCollection(i))return i.deleteIn(r);throw new Error(`Expected YAML collection at ${t}. Remaining path: ${r}`)}getIn(e,t){let[r,...i]=e,s=this.get(r,!0);return i.length===0?!t&&Ge.isScalar(s)?s.value:s:Ge.isCollection(s)?s.getIn(i,t):void 0}hasAllNullValues(e){return this.items.every(t=>{if(!Ge.isPair(t))return!1;let r=t.value;return r==null||e&&Ge.isScalar(r)&&r.value==null&&!r.commentBefore&&!r.comment&&!r.tag})}hasIn(e){let[t,...r]=e;if(r.length===0)return this.has(t);let i=this.get(t,!0);return Ge.isCollection(i)?i.hasIn(r):!1}setIn(e,t){let[r,...i]=e;if(i.length===0)this.set(r,t);else{let s=this.get(r,!0);if(Ge.isCollection(s))s.setIn(i,t);else if(s===void 0&&this.schema)this.set(r,Vo(this.schema,i,t));else throw new Error(`Expected YAML collection at ${r}. Remaining path: ${i}`)}}};_i.maxFlowStringSingleLineLength=60;mi.Collection=_i;mi.collectionFromPath=Vo;mi.isEmptyPath=wp});var bn=_(gi=>{"use strict";var oS=n=>n.replace(/^(?!$)(?: $)?/gm,"#");function Wo(n,e){return/^\n+$/.test(n)?n.substring(1):e?n.replace(/^(?! *$)/gm,e):n}var aS=(n,e,t)=>n.endsWith(`
`)?Wo(t,e):t.includes(`
`)?`
`+Wo(t,e):(n.endsWith(" ")?"":" ")+t;gi.indentComment=Wo;gi.lineComment=aS;gi.stringifyComment=oS});var bp=_(Nn=>{"use strict";var lS="flow",Go="block",yi="quoted";function cS(n,e,t="flow",{indentAtStart:r,lineWidth:i=80,minContentWidth:s=20,onFold:o,onOverflow:a}={}){if(!i||i<0)return n;let l=Math.max(1+s,1+i-e.length);if(n.length<=l)return n;let c=[],u={},f=i-e.length;typeof r=="number"&&(r>i-Math.max(2,s)?c.push(0):f=i-r);let d,h,y=!1,g=-1,m=-1,S=-1;t===Go&&(g=vp(n,g),g!==-1&&(f=g+l));for(let b;b=n[g+=1];){if(t===yi&&b==="\\"){switch(m=g,n[g+1]){case"x":g+=3;break;case"u":g+=5;break;case"U":g+=9;break;default:g+=1}S=g}if(b===`
`)t===Go&&(g=vp(n,g)),f=g+l,d=void 0;else{if(b===" "&&h&&h!==" "&&h!==`
`&&h!=="	"){let $=n[g+1];$&&$!==" "&&$!==`
`&&$!=="	"&&(d=g)}if(g>=f)if(d)c.push(d),f=d+l,d=void 0;else if(t===yi){for(;h===" "||h==="	";)h=b,b=n[g+=1],y=!0;let $=g>S+1?g-2:m-1;if(u[$])return n;c.push($),u[$]=!0,f=$+l,d=void 0}else y=!0}h=b}if(y&&a&&a(),c.length===0)return n;o&&o();let w=n.slice(0,c[0]);for(let b=0;b<c.length;++b){let $=c[b],M=c[b+1]||n.length;$===0?w=`
${e}${n.slice(0,M)}`:(t===yi&&u[$]&&(w+=`${n[$]}\\`),w+=`
${e}${n.slice($+1,M)}`)}return w}function vp(n,e){let t=n[e+1];for(;t===" "||t==="	";){do t=n[e+=1];while(t&&t!==`
`);t=n[e+1]}return e}Nn.FOLD_BLOCK=Go;Nn.FOLD_FLOW=lS;Nn.FOLD_QUOTED=yi;Nn.foldFlowLines=cS});var Rn=_(Np=>{"use strict";var Ke=ce(),lt=bp(),Ti=(n,e)=>({indentAtStart:e?n.indent.length:n.indentAtStart,lineWidth:n.options.lineWidth,minContentWidth:n.options.minContentWidth}),Li=n=>/^(%|---|\.\.\.)/m.test(n);function uS(n,e,t){if(!e||e<0)return!1;let r=e-t,i=n.length;if(i<=r)return!1;for(let s=0,o=0;s<i;++s)if(n[s]===`
`){if(s-o>r)return!0;if(o=s+1,i-o<=r)return!1}return!0}function On(n,e){let t=JSON.stringify(n);if(e.options.doubleQuotedAsJSON)return t;let{implicitKey:r}=e,i=e.options.doubleQuotedMinMultiLineLength,s=e.indent||(Li(n)?"  ":""),o="",a=0;for(let l=0,c=t[l];c;c=t[++l])if(c===" "&&t[l+1]==="\\"&&t[l+2]==="n"&&(o+=t.slice(a,l)+"\\ ",l+=1,a=l,c="\\"),c==="\\")switch(t[l+1]){case"u":{o+=t.slice(a,l);let u=t.substr(l+2,4);switch(u){case"0000":o+="\\0";break;case"0007":o+="\\a";break;case"000b":o+="\\v";break;case"001b":o+="\\e";break;case"0085":o+="\\N";break;case"00a0":o+="\\_";break;case"2028":o+="\\L";break;case"2029":o+="\\P";break;default:u.substr(0,2)==="00"?o+="\\x"+u.substr(2):o+=t.substr(l,6)}l+=5,a=l+1}break;case"n":if(r||t[l+2]==='"'||t.length<i)l+=1;else{for(o+=t.slice(a,l)+`

`;t[l+2]==="\\"&&t[l+3]==="n"&&t[l+4]!=='"';)o+=`
`,l+=2;o+=s,t[l+2]===" "&&(o+="\\"),l+=1,a=l+1}break;default:l+=1}return o=a?o+t.slice(a):t,r?o:lt.foldFlowLines(o,s,lt.FOLD_QUOTED,Ti(e,!1))}function Ko(n,e){if(e.options.singleQuote===!1||e.implicitKey&&n.includes(`
`)||/[ \t]\n|\n[ \t]/.test(n))return On(n,e);let t=e.indent||(Li(n)?"  ":""),r="'"+n.replace(/'/g,"''").replace(/\n+/g,`$&
${t}`)+"'";return e.implicitKey?r:lt.foldFlowLines(r,t,lt.FOLD_FLOW,Ti(e,!1))}function Ht(n,e){let{singleQuote:t}=e.options,r;if(t===!1)r=On;else{let i=n.includes('"'),s=n.includes("'");i&&!s?r=Ko:s&&!i?r=On:r=t?Ko:On}return r(n,e)}var Yo;try{Yo=new RegExp(`(^|(?<!
))
+(?!
|$)`,"g")}catch{Yo=/\n+(?!\n|$)/g}function Ei({comment:n,type:e,value:t},r,i,s){let{blockQuote:o,commentString:a,lineWidth:l}=r.options;if(!o||/\n[\t ]+$/.test(t)||/^\s*$/.test(t))return Ht(t,r);let c=r.indent||(r.forceBlockIndent||Li(t)?"  ":""),u=o==="literal"?!0:o==="folded"||e===Ke.Scalar.BLOCK_FOLDED?!1:e===Ke.Scalar.BLOCK_LITERAL?!0:!uS(t,l,c.length);if(!t)return u?`|
`:`>
`;let f,d;for(d=t.length;d>0;--d){let v=t[d-1];if(v!==`
`&&v!=="	"&&v!==" ")break}let h=t.substring(d),y=h.indexOf(`
`);y===-1?f="-":t===h||y!==h.length-1?(f="+",s&&s()):f="",h&&(t=t.slice(0,-h.length),h[h.length-1]===`
`&&(h=h.slice(0,-1)),h=h.replace(Yo,`$&${c}`));let g=!1,m,S=-1;for(m=0;m<t.length;++m){let v=t[m];if(v===" ")g=!0;else if(v===`
`)S=m;else break}let w=t.substring(0,S<m?S+1:m);w&&(t=t.substring(w.length),w=w.replace(/\n+/g,`$&${c}`));let $=(u?"|":">")+(g?c?"2":"1":"")+f;if(n&&($+=" "+a(n.replace(/ ?[\r\n]+/g," ")),i&&i()),u)return t=t.replace(/\n+/g,`$&${c}`),`${$}
${c}${w}${t}${h}`;t=t.replace(/\n+/g,`
$&`).replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g,"$1$2").replace(/\n+/g,`$&${c}`);let M=lt.foldFlowLines(`${w}${t}${h}`,c,lt.FOLD_BLOCK,Ti(r,!0));return`${$}
${c}${M}`}function fS(n,e,t,r){let{type:i,value:s}=n,{actualString:o,implicitKey:a,indent:l,indentStep:c,inFlow:u}=e;if(a&&/[\n[\]{},]/.test(s)||u&&/[[\]{},]/.test(s))return Ht(s,e);if(!s||/^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(s))return a||u||!s.includes(`
`)?Ht(s,e):Ei(n,e,t,r);if(!a&&!u&&i!==Ke.Scalar.PLAIN&&s.includes(`
`))return Ei(n,e,t,r);if(Li(s)){if(l==="")return e.forceBlockIndent=!0,Ei(n,e,t,r);if(a&&l===c)return Ht(s,e)}let f=s.replace(/\n+/g,`$&
${l}`);if(o){let d=g=>g.default&&g.tag!=="tag:yaml.org,2002:str"&&g.test?.test(f),{compat:h,tags:y}=e.doc.schema;if(y.some(d)||h?.some(d))return Ht(s,e)}return a?f:lt.foldFlowLines(f,l,lt.FOLD_FLOW,Ti(e,!1))}function hS(n,e,t,r){let{implicitKey:i,inFlow:s}=e,o=typeof n.value=="string"?n:Object.assign({},n,{value:String(n.value)}),{type:a}=n;a!==Ke.Scalar.QUOTE_DOUBLE&&/[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(o.value)&&(a=Ke.Scalar.QUOTE_DOUBLE);let l=u=>{switch(u){case Ke.Scalar.BLOCK_FOLDED:case Ke.Scalar.BLOCK_LITERAL:return i||s?Ht(o.value,e):Ei(o,e,t,r);case Ke.Scalar.QUOTE_DOUBLE:return On(o.value,e);case Ke.Scalar.QUOTE_SINGLE:return Ko(o.value,e);case Ke.Scalar.PLAIN:return fS(o,e,t,r);default:return null}},c=l(a);if(c===null){let{defaultKeyType:u,defaultStringType:f}=e.options,d=i&&u||f;if(c=l(d),c===null)throw new Error(`Unsupported default string type ${d}`)}return c}Np.stringifyString=hS});var Cn=_(Jo=>{"use strict";var dS=fi(),ct=W(),pS=bn(),_S=Rn();function mS(n,e){let t=Object.assign({blockQuote:!0,commentString:pS.stringifyComment,defaultKeyType:null,defaultStringType:"PLAIN",directives:null,doubleQuotedAsJSON:!1,doubleQuotedMinMultiLineLength:40,falseStr:"false",flowCollectionPadding:!0,indentSeq:!0,lineWidth:80,minContentWidth:20,nullStr:"null",simpleKeys:!1,singleQuote:null,trueStr:"true",verifyAliasOrder:!0},n.schema.toStringOptions,e),r;switch(t.collectionStyle){case"block":r=!1;break;case"flow":r=!0;break;default:r=null}return{anchors:new Set,doc:n,flowCollectionPadding:t.flowCollectionPadding?" ":"",indent:"",indentStep:typeof t.indent=="number"?" ".repeat(t.indent):"  ",inFlow:r,options:t}}function gS(n,e){if(e.tag){let i=n.filter(s=>s.tag===e.tag);if(i.length>0)return i.find(s=>s.format===e.format)??i[0]}let t,r;if(ct.isScalar(e)){r=e.value;let i=n.filter(s=>s.identify?.(r));t=i.find(s=>s.format===e.format)??i.find(s=>!s.format)}else r=e,t=n.find(i=>i.nodeClass&&r instanceof i.nodeClass);if(!t){let i=r?.constructor?.name??typeof r;throw new Error(`Tag not resolved for ${i} value`)}return t}function yS(n,e,{anchors:t,doc:r}){if(!r.directives)return"";let i=[],s=(ct.isScalar(n)||ct.isCollection(n))&&n.anchor;s&&dS.anchorIsValid(s)&&(t.add(s),i.push(`&${s}`));let o=n.tag?n.tag:e.default?null:e.tag;return o&&i.push(r.directives.tagString(o)),i.join(" ")}function ES(n,e,t,r){if(ct.isPair(n))return n.toString(e,t,r);if(ct.isAlias(n)){if(e.doc.directives)return n.toString(e);if(e.resolvedAliases?.has(n))throw new TypeError("Cannot stringify circular structure without alias nodes");e.resolvedAliases?e.resolvedAliases.add(n):e.resolvedAliases=new Set([n]),n=n.resolve(e.doc)}let i,s=ct.isNode(n)?n:e.doc.createNode(n,{onTagObj:l=>i=l});i||(i=gS(e.doc.schema.tags,s));let o=yS(s,i,e);o.length>0&&(e.indentAtStart=(e.indentAtStart??0)+o.length+1);let a=typeof i.stringify=="function"?i.stringify(s,e,t,r):ct.isScalar(s)?_S.stringifyString(s,e,t,r):s.toString(e,t,r);return o?ct.isScalar(s)||a[0]==="{"||a[0]==="["?`${o} ${a}`:`${o}
${e.indent}${a}`:a}Jo.createStringifyContext=mS;Jo.stringify=ES});var kp=_(Cp=>{"use strict";var ut=W(),Op=ce(),Rp=Cn(),kn=bn();function TS({key:n,value:e},t,r,i){let{allNullValues:s,doc:o,indent:a,indentStep:l,options:{commentString:c,indentSeq:u,simpleKeys:f}}=t,d=ut.isNode(n)&&n.comment||null;if(f){if(d)throw new Error("With simple keys, key nodes cannot have comments");if(ut.isCollection(n)){let V="With simple keys, collection cannot be used as a key value";throw new Error(V)}}let h=!f&&(!n||d&&e==null&&!t.inFlow||ut.isCollection(n)||(ut.isScalar(n)?n.type===Op.Scalar.BLOCK_FOLDED||n.type===Op.Scalar.BLOCK_LITERAL:typeof n=="object"));t=Object.assign({},t,{allNullValues:!1,implicitKey:!h&&(f||!s),indent:a+l});let y=!1,g=!1,m=Rp.stringify(n,t,()=>y=!0,()=>g=!0);if(!h&&!t.inFlow&&m.length>1024){if(f)throw new Error("With simple keys, single line scalar must not span more than 1024 characters");h=!0}if(t.inFlow){if(s||e==null)return y&&r&&r(),m===""?"?":h?`? ${m}`:m}else if(s&&!f||e==null&&h)return m=`? ${m}`,d&&!y?m+=kn.lineComment(m,t.indent,c(d)):g&&i&&i(),m;y&&(d=null),h?(d&&(m+=kn.lineComment(m,t.indent,c(d))),m=`? ${m}
${a}:`):(m=`${m}:`,d&&(m+=kn.lineComment(m,t.indent,c(d))));let S,w,b;ut.isNode(e)?(S=!!e.spaceBefore,w=e.commentBefore,b=e.comment):(S=!1,w=null,b=null,e&&typeof e=="object"&&(e=o.createNode(e))),t.implicitKey=!1,!h&&!d&&ut.isScalar(e)&&(t.indentAtStart=m.length+1),g=!1,!u&&l.length>=2&&!t.inFlow&&!h&&ut.isSeq(e)&&!e.flow&&!e.tag&&!e.anchor&&(t.indent=t.indent.substring(2));let $=!1,M=Rp.stringify(e,t,()=>$=!0,()=>g=!0),v=" ";if(d||S||w){if(v=S?`
`:"",w){let V=c(w);v+=`
${kn.indentComment(V,t.indent)}`}M===""&&!t.inFlow?v===`
`&&(v=`

`):v+=`
${t.indent}`}else if(!h&&ut.isCollection(e)){let V=M[0],G=M.indexOf(`
`),P=G!==-1,j=t.inFlow??e.flow??e.items.length===0;if(P||!j){let D=!1;if(P&&(V==="&"||V==="!")){let F=M.indexOf(" ");V==="&"&&F!==-1&&F<G&&M[F+1]==="!"&&(F=M.indexOf(" ",F+1)),(F===-1||G<F)&&(D=!0)}D||(v=`
${t.indent}`)}}else(M===""||M[0]===`
`)&&(v="");return m+=v+M,t.inFlow?$&&r&&r():b&&!$?m+=kn.lineComment(m,t.indent,c(b)):g&&i&&i(),m}Cp.stringifyPair=TS});var zo=_(Xo=>{"use strict";function LS(n,...e){n==="debug"&&console.log(...e)}function AS(n,e){(n==="debug"||n==="warn")&&(typeof process<"u"&&process.emitWarning?process.emitWarning(e):console.warn(e))}Xo.debug=LS;Xo.warn=AS});var ea=_($p=>{"use strict";var SS=zo(),IS=Cn(),Bt=W(),wS=ce(),Qo=ot(),Pp="<<";function vS(n,e,{key:t,value:r}){if(n?.doc.schema.merge&&bS(t))if(r=Bt.isAlias(r)?r.resolve(n.doc):r,Bt.isSeq(r))for(let i of r.items)Zo(n,e,i);else if(Array.isArray(r))for(let i of r)Zo(n,e,i);else Zo(n,e,r);else{let i=Qo.toJS(t,"",n);if(e instanceof Map)e.set(i,Qo.toJS(r,i,n));else if(e instanceof Set)e.add(i);else{let s=NS(t,i,n),o=Qo.toJS(r,s,n);s in e?Object.defineProperty(e,s,{value:o,writable:!0,enumerable:!0,configurable:!0}):e[s]=o}}return e}var bS=n=>n===Pp||Bt.isScalar(n)&&n.value===Pp&&(!n.type||n.type===wS.Scalar.PLAIN);function Zo(n,e,t){let r=n&&Bt.isAlias(t)?t.resolve(n.doc):t;if(!Bt.isMap(r))throw new Error("Merge sources must be maps or map aliases");let i=r.toJSON(null,n,Map);for(let[s,o]of i)e instanceof Map?e.has(s)||e.set(s,o):e instanceof Set?e.add(s):Object.prototype.hasOwnProperty.call(e,s)||Object.defineProperty(e,s,{value:o,writable:!0,enumerable:!0,configurable:!0});return e}function NS(n,e,t){if(e===null)return"";if(typeof e!="object")return String(e);if(Bt.isNode(n)&&t&&t.doc){let r=IS.createStringifyContext(t.doc,{});r.anchors=new Set;for(let s of t.anchors.keys())r.anchors.add(s.anchor);r.inFlow=!0,r.inStringifyKey=!0;let i=n.toString(r);if(!t.mapKeyWarned){let s=JSON.stringify(i);s.length>40&&(s=s.substring(0,36)+'..."'),SS.warn(t.doc.options.logLevel,`Keys with collection values will be stringified due to JS Object restrictions: ${s}. Set mapAsMap: true to use object keys.`),t.mapKeyWarned=!0}return i}return JSON.stringify(e)}$p.addPairToJSMap=vS});var ft=_(ta=>{"use strict";var qp=wn(),OS=kp(),RS=ea(),Ai=W();function CS(n,e,t){let r=qp.createNode(n,void 0,t),i=qp.createNode(e,void 0,t);return new Si(r,i)}var Si=class n{constructor(e,t=null){Object.defineProperty(this,Ai.NODE_TYPE,{value:Ai.PAIR}),this.key=e,this.value=t}clone(e){let{key:t,value:r}=this;return Ai.isNode(t)&&(t=t.clone(e)),Ai.isNode(r)&&(r=r.clone(e)),new n(t,r)}toJSON(e,t){let r=t?.mapAsMap?new Map:{};return RS.addPairToJSMap(t,r,this)}toString(e,t,r){return e?.doc?OS.stringifyPair(this,e,t,r):JSON.stringify(this)}};ta.Pair=Si;ta.createPair=CS});var na=_(Mp=>{"use strict";var kS=vn(),Lt=W(),xp=Cn(),Pn=bn();function PS(n,e,t){return(e.inFlow??n.flow?qS:$S)(n,e,t)}function $S({comment:n,items:e},t,{blockItemPrefix:r,flowChars:i,itemIndent:s,onChompKeep:o,onComment:a}){let{indent:l,options:{commentString:c}}=t,u=Object.assign({},t,{indent:s,type:null}),f=!1,d=[];for(let y=0;y<e.length;++y){let g=e[y],m=null;if(Lt.isNode(g))!f&&g.spaceBefore&&d.push(""),Ii(t,d,g.commentBefore,f),g.comment&&(m=g.comment);else if(Lt.isPair(g)){let w=Lt.isNode(g.key)?g.key:null;w&&(!f&&w.spaceBefore&&d.push(""),Ii(t,d,w.commentBefore,f))}f=!1;let S=xp.stringify(g,u,()=>m=null,()=>f=!0);m&&(S+=Pn.lineComment(S,s,c(m))),f&&m&&(f=!1),d.push(r+S)}let h;if(d.length===0)h=i.start+i.end;else{h=d[0];for(let y=1;y<d.length;++y){let g=d[y];h+=g?`
${l}${g}`:`
`}}return n?(h+=`
`+Pn.indentComment(c(n),l),a&&a()):f&&o&&o(),h}function qS({comment:n,items:e},t,{flowChars:r,itemIndent:i,onComment:s}){let{indent:o,indentStep:a,flowCollectionPadding:l,options:{commentString:c}}=t;i+=a;let u=Object.assign({},t,{indent:i,inFlow:!0,type:null}),f=!1,d=0,h=[];for(let S=0;S<e.length;++S){let w=e[S],b=null;if(Lt.isNode(w))w.spaceBefore&&h.push(""),Ii(t,h,w.commentBefore,!1),w.comment&&(b=w.comment);else if(Lt.isPair(w)){let M=Lt.isNode(w.key)?w.key:null;M&&(M.spaceBefore&&h.push(""),Ii(t,h,M.commentBefore,!1),M.comment&&(f=!0));let v=Lt.isNode(w.value)?w.value:null;v?(v.comment&&(b=v.comment),v.commentBefore&&(f=!0)):w.value==null&&M&&M.comment&&(b=M.comment)}b&&(f=!0);let $=xp.stringify(w,u,()=>b=null);S<e.length-1&&($+=","),b&&($+=Pn.lineComment($,i,c(b))),!f&&(h.length>d||$.includes(`
`))&&(f=!0),h.push($),d=h.length}let y,{start:g,end:m}=r;if(h.length===0)y=g+m;else if(f||(f=h.reduce((w,b)=>w+b.length+2,2)>kS.Collection.maxFlowStringSingleLineLength),f){y=g;for(let S of h)y+=S?`
${a}${o}${S}`:`
`;y+=`
${o}${m}`}else y=`${g}${l}${h.join(" ")}${l}${m}`;return n&&(y+=Pn.lineComment(y,o,c(n)),s&&s()),y}function Ii({indent:n,options:{commentString:e}},t,r,i){if(r&&i&&(r=r.replace(/^\n+/,"")),r){let s=Pn.indentComment(e(r),n);t.push(s.trimStart())}}Mp.stringifyCollection=PS});var dt=_(ia=>{"use strict";var xS=na(),MS=ea(),DS=vn(),ht=W(),wi=ft(),FS=ce();function $n(n,e){let t=ht.isScalar(e)?e.value:e;for(let r of n)if(ht.isPair(r)&&(r.key===e||r.key===t||ht.isScalar(r.key)&&r.key.value===t))return r}var ra=class extends DS.Collection{static get tagName(){return"tag:yaml.org,2002:map"}constructor(e){super(ht.MAP,e),this.items=[]}static from(e,t,r){let{keepUndefined:i,replacer:s}=r,o=new this(e),a=(l,c)=>{if(typeof s=="function")c=s.call(t,l,c);else if(Array.isArray(s)&&!s.includes(l))return;(c!==void 0||i)&&o.items.push(wi.createPair(l,c,r))};if(t instanceof Map)for(let[l,c]of t)a(l,c);else if(t&&typeof t=="object")for(let l of Object.keys(t))a(l,t[l]);return typeof e.sortMapEntries=="function"&&o.items.sort(e.sortMapEntries),o}add(e,t){let r;ht.isPair(e)?r=e:!e||typeof e!="object"||!("key"in e)?r=new wi.Pair(e,e?.value):r=new wi.Pair(e.key,e.value);let i=$n(this.items,r.key),s=this.schema?.sortMapEntries;if(i){if(!t)throw new Error(`Key ${r.key} already set`);ht.isScalar(i.value)&&FS.isScalarValue(r.value)?i.value.value=r.value:i.value=r.value}else if(s){let o=this.items.findIndex(a=>s(r,a)<0);o===-1?this.items.push(r):this.items.splice(o,0,r)}else this.items.push(r)}delete(e){let t=$n(this.items,e);return t?this.items.splice(this.items.indexOf(t),1).length>0:!1}get(e,t){let i=$n(this.items,e)?.value;return(!t&&ht.isScalar(i)?i.value:i)??void 0}has(e){return!!$n(this.items,e)}set(e,t){this.add(new wi.Pair(e,t),!0)}toJSON(e,t,r){let i=r?new r:t?.mapAsMap?new Map:{};t?.onCreate&&t.onCreate(i);for(let s of this.items)MS.addPairToJSMap(t,i,s);return i}toString(e,t,r){if(!e)return JSON.stringify(this);for(let i of this.items)if(!ht.isPair(i))throw new Error(`Map items must all be pairs; found ${JSON.stringify(i)} instead`);return!e.allNullValues&&this.hasAllNullValues(!1)&&(e=Object.assign({},e,{allNullValues:!0})),xS.stringifyCollection(this,e,{blockItemPrefix:"",flowChars:{start:"{",end:"}"},itemIndent:e.indent||"",onChompKeep:r,onComment:t})}};ia.YAMLMap=ra;ia.findPair=$n});var Ut=_(Fp=>{"use strict";var jS=W(),Dp=dt(),HS={collection:"map",default:!0,nodeClass:Dp.YAMLMap,tag:"tag:yaml.org,2002:map",resolve(n,e){return jS.isMap(n)||e("Expected a mapping for this tag"),n},createNode:(n,e,t)=>Dp.YAMLMap.from(n,e,t)};Fp.map=HS});var pt=_(jp=>{"use strict";var BS=wn(),US=na(),VS=vn(),bi=W(),WS=ce(),GS=ot(),sa=class extends VS.Collection{static get tagName(){return"tag:yaml.org,2002:seq"}constructor(e){super(bi.SEQ,e),this.items=[]}add(e){this.items.push(e)}delete(e){let t=vi(e);return typeof t!="number"?!1:this.items.splice(t,1).length>0}get(e,t){let r=vi(e);if(typeof r!="number")return;let i=this.items[r];return!t&&bi.isScalar(i)?i.value:i}has(e){let t=vi(e);return typeof t=="number"&&t<this.items.length}set(e,t){let r=vi(e);if(typeof r!="number")throw new Error(`Expected a valid index, not ${e}.`);let i=this.items[r];bi.isScalar(i)&&WS.isScalarValue(t)?i.value=t:this.items[r]=t}toJSON(e,t){let r=[];t?.onCreate&&t.onCreate(r);let i=0;for(let s of this.items)r.push(GS.toJS(s,String(i++),t));return r}toString(e,t,r){return e?US.stringifyCollection(this,e,{blockItemPrefix:"- ",flowChars:{start:"[",end:"]"},itemIndent:(e.indent||"")+"  ",onChompKeep:r,onComment:t}):JSON.stringify(this)}static from(e,t,r){let{replacer:i}=r,s=new this(e);if(t&&Symbol.iterator in Object(t)){let o=0;for(let a of t){if(typeof i=="function"){let l=t instanceof Set?a:String(o++);a=i.call(t,l,a)}s.items.push(BS.createNode(a,void 0,r))}}return s}};function vi(n){let e=bi.isScalar(n)?n.value:n;return e&&typeof e=="string"&&(e=Number(e)),typeof e=="number"&&Number.isInteger(e)&&e>=0?e:null}jp.YAMLSeq=sa});var Vt=_(Bp=>{"use strict";var KS=W(),Hp=pt(),YS={collection:"seq",default:!0,nodeClass:Hp.YAMLSeq,tag:"tag:yaml.org,2002:seq",resolve(n,e){return KS.isSeq(n)||e("Expected a sequence for this tag"),n},createNode:(n,e,t)=>Hp.YAMLSeq.from(n,e,t)};Bp.seq=YS});var qn=_(Up=>{"use strict";var JS=Rn(),XS={identify:n=>typeof n=="string",default:!0,tag:"tag:yaml.org,2002:str",resolve:n=>n,stringify(n,e,t,r){return e=Object.assign({actualString:!0},e),JS.stringifyString(n,e,t,r)}};Up.string=XS});var Ni=_(Gp=>{"use strict";var Vp=ce(),Wp={identify:n=>n==null,createNode:()=>new Vp.Scalar(null),default:!0,tag:"tag:yaml.org,2002:null",test:/^(?:~|[Nn]ull|NULL)?$/,resolve:()=>new Vp.Scalar(null),stringify:({source:n},e)=>typeof n=="string"&&Wp.test.test(n)?n:e.options.nullStr};Gp.nullTag=Wp});var oa=_(Yp=>{"use strict";var zS=ce(),Kp={identify:n=>typeof n=="boolean",default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,resolve:n=>new zS.Scalar(n[0]==="t"||n[0]==="T"),stringify({source:n,value:e},t){if(n&&Kp.test.test(n)){let r=n[0]==="t"||n[0]==="T";if(e===r)return n}return e?t.options.trueStr:t.options.falseStr}};Yp.boolTag=Kp});var Wt=_(Jp=>{"use strict";function QS({format:n,minFractionDigits:e,tag:t,value:r}){if(typeof r=="bigint")return String(r);let i=typeof r=="number"?r:Number(r);if(!isFinite(i))return isNaN(i)?".nan":i<0?"-.inf":".inf";let s=JSON.stringify(r);if(!n&&e&&(!t||t==="tag:yaml.org,2002:float")&&/^\d/.test(s)){let o=s.indexOf(".");o<0&&(o=s.length,s+=".");let a=e-(s.length-o-1);for(;a-- >0;)s+="0"}return s}Jp.stringifyNumber=QS});var la=_(Oi=>{"use strict";var ZS=ce(),aa=Wt(),eI={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^(?:[-+]?\.(?:inf|Inf|INF|nan|NaN|NAN))$/,resolve:n=>n.slice(-3).toLowerCase()==="nan"?NaN:n[0]==="-"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,stringify:aa.stringifyNumber},tI={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"EXP",test:/^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,resolve:n=>parseFloat(n),stringify(n){let e=Number(n.value);return isFinite(e)?e.toExponential():aa.stringifyNumber(n)}},nI={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,resolve(n){let e=new ZS.Scalar(parseFloat(n)),t=n.indexOf(".");return t!==-1&&n[n.length-1]==="0"&&(e.minFractionDigits=n.length-t-1),e},stringify:aa.stringifyNumber};Oi.float=nI;Oi.floatExp=tI;Oi.floatNaN=eI});var ua=_(Ci=>{"use strict";var Xp=Wt(),Ri=n=>typeof n=="bigint"||Number.isInteger(n),ca=(n,e,t,{intAsBigInt:r})=>r?BigInt(n):parseInt(n.substring(e),t);function zp(n,e,t){let{value:r}=n;return Ri(r)&&r>=0?t+r.toString(e):Xp.stringifyNumber(n)}var rI={identify:n=>Ri(n)&&n>=0,default:!0,tag:"tag:yaml.org,2002:int",format:"OCT",test:/^0o[0-7]+$/,resolve:(n,e,t)=>ca(n,2,8,t),stringify:n=>zp(n,8,"0o")},iI={identify:Ri,default:!0,tag:"tag:yaml.org,2002:int",test:/^[-+]?[0-9]+$/,resolve:(n,e,t)=>ca(n,0,10,t),stringify:Xp.stringifyNumber},sI={identify:n=>Ri(n)&&n>=0,default:!0,tag:"tag:yaml.org,2002:int",format:"HEX",test:/^0x[0-9a-fA-F]+$/,resolve:(n,e,t)=>ca(n,2,16,t),stringify:n=>zp(n,16,"0x")};Ci.int=iI;Ci.intHex=sI;Ci.intOct=rI});var Zp=_(Qp=>{"use strict";var oI=Ut(),aI=Ni(),lI=Vt(),cI=qn(),uI=oa(),fa=la(),ha=ua(),fI=[oI.map,lI.seq,cI.string,aI.nullTag,uI.boolTag,ha.intOct,ha.int,ha.intHex,fa.floatNaN,fa.floatExp,fa.float];Qp.schema=fI});var n_=_(t_=>{"use strict";var hI=ce(),dI=Ut(),pI=Vt();function e_(n){return typeof n=="bigint"||Number.isInteger(n)}var ki=({value:n})=>JSON.stringify(n),_I=[{identify:n=>typeof n=="string",default:!0,tag:"tag:yaml.org,2002:str",resolve:n=>n,stringify:ki},{identify:n=>n==null,createNode:()=>new hI.Scalar(null),default:!0,tag:"tag:yaml.org,2002:null",test:/^null$/,resolve:()=>null,stringify:ki},{identify:n=>typeof n=="boolean",default:!0,tag:"tag:yaml.org,2002:bool",test:/^true|false$/,resolve:n=>n==="true",stringify:ki},{identify:e_,default:!0,tag:"tag:yaml.org,2002:int",test:/^-?(?:0|[1-9][0-9]*)$/,resolve:(n,e,{intAsBigInt:t})=>t?BigInt(n):parseInt(n,10),stringify:({value:n})=>e_(n)?n.toString():JSON.stringify(n)},{identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,resolve:n=>parseFloat(n),stringify:ki}],mI={default:!0,tag:"",test:/^/,resolve(n,e){return e(`Unresolved plain scalar ${JSON.stringify(n)}`),n}},gI=[dI.map,pI.seq].concat(_I,mI);t_.schema=gI});var pa=_(r_=>{"use strict";var da=ce(),yI=Rn(),EI={identify:n=>n instanceof Uint8Array,default:!1,tag:"tag:yaml.org,2002:binary",resolve(n,e){if(typeof Buffer=="function")return Buffer.from(n,"base64");if(typeof atob=="function"){let t=atob(n.replace(/[\n\r]/g,"")),r=new Uint8Array(t.length);for(let i=0;i<t.length;++i)r[i]=t.charCodeAt(i);return r}else return e("This environment does not support reading binary tags; either Buffer or atob is required"),n},stringify({comment:n,type:e,value:t},r,i,s){let o=t,a;if(typeof Buffer=="function")a=o instanceof Buffer?o.toString("base64"):Buffer.from(o.buffer).toString("base64");else if(typeof btoa=="function"){let l="";for(let c=0;c<o.length;++c)l+=String.fromCharCode(o[c]);a=btoa(l)}else throw new Error("This environment does not support writing binary tags; either Buffer or btoa is required");if(e||(e=da.Scalar.BLOCK_LITERAL),e!==da.Scalar.QUOTE_DOUBLE){let l=Math.max(r.options.lineWidth-r.indent.length,r.options.minContentWidth),c=Math.ceil(a.length/l),u=new Array(c);for(let f=0,d=0;f<c;++f,d+=l)u[f]=a.substr(d,l);a=u.join(e===da.Scalar.BLOCK_LITERAL?`
`:" ")}return yI.stringifyString({comment:n,type:e,value:a},r,i,s)}};r_.binary=EI});var qi=_($i=>{"use strict";var Pi=W(),_a=ft(),TI=ce(),LI=pt();function i_(n,e){if(Pi.isSeq(n))for(let t=0;t<n.items.length;++t){let r=n.items[t];if(!Pi.isPair(r)){if(Pi.isMap(r)){r.items.length>1&&e("Each pair must have its own sequence indicator");let i=r.items[0]||new _a.Pair(new TI.Scalar(null));if(r.commentBefore&&(i.key.commentBefore=i.key.commentBefore?`${r.commentBefore}
${i.key.commentBefore}`:r.commentBefore),r.comment){let s=i.value??i.key;s.comment=s.comment?`${r.comment}
${s.comment}`:r.comment}r=i}n.items[t]=Pi.isPair(r)?r:new _a.Pair(r)}}else e("Expected a sequence for this tag");return n}function s_(n,e,t){let{replacer:r}=t,i=new LI.YAMLSeq(n);i.tag="tag:yaml.org,2002:pairs";let s=0;if(e&&Symbol.iterator in Object(e))for(let o of e){typeof r=="function"&&(o=r.call(e,String(s++),o));let a,l;if(Array.isArray(o))if(o.length===2)a=o[0],l=o[1];else throw new TypeError(`Expected [key, value] tuple: ${o}`);else if(o&&o instanceof Object){let c=Object.keys(o);if(c.length===1)a=c[0],l=o[a];else throw new TypeError(`Expected { key: value } tuple: ${o}`)}else a=o;i.items.push(_a.createPair(a,l,t))}return i}var AI={collection:"seq",default:!1,tag:"tag:yaml.org,2002:pairs",resolve:i_,createNode:s_};$i.createPairs=s_;$i.pairs=AI;$i.resolvePairs=i_});var ya=_(ga=>{"use strict";var o_=W(),ma=ot(),xn=dt(),SI=pt(),a_=qi(),At=class n extends SI.YAMLSeq{constructor(){super(),this.add=xn.YAMLMap.prototype.add.bind(this),this.delete=xn.YAMLMap.prototype.delete.bind(this),this.get=xn.YAMLMap.prototype.get.bind(this),this.has=xn.YAMLMap.prototype.has.bind(this),this.set=xn.YAMLMap.prototype.set.bind(this),this.tag=n.tag}toJSON(e,t){if(!t)return super.toJSON(e);let r=new Map;t?.onCreate&&t.onCreate(r);for(let i of this.items){let s,o;if(o_.isPair(i)?(s=ma.toJS(i.key,"",t),o=ma.toJS(i.value,s,t)):s=ma.toJS(i,"",t),r.has(s))throw new Error("Ordered maps must not include duplicate keys");r.set(s,o)}return r}static from(e,t,r){let i=a_.createPairs(e,t,r),s=new this;return s.items=i.items,s}};At.tag="tag:yaml.org,2002:omap";var II={collection:"seq",identify:n=>n instanceof Map,nodeClass:At,default:!1,tag:"tag:yaml.org,2002:omap",resolve(n,e){let t=a_.resolvePairs(n,e),r=[];for(let{key:i}of t.items)o_.isScalar(i)&&(r.includes(i.value)?e(`Ordered maps must not include duplicate keys: ${i.value}`):r.push(i.value));return Object.assign(new At,t)},createNode:(n,e,t)=>At.from(n,e,t)};ga.YAMLOMap=At;ga.omap=II});var h_=_(Ea=>{"use strict";var l_=ce();function c_({value:n,source:e},t){return e&&(n?u_:f_).test.test(e)?e:n?t.options.trueStr:t.options.falseStr}var u_={identify:n=>n===!0,default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,resolve:()=>new l_.Scalar(!0),stringify:c_},f_={identify:n=>n===!1,default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/i,resolve:()=>new l_.Scalar(!1),stringify:c_};Ea.falseTag=f_;Ea.trueTag=u_});var d_=_(xi=>{"use strict";var wI=ce(),Ta=Wt(),vI={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^[-+]?\.(?:inf|Inf|INF|nan|NaN|NAN)$/,resolve:n=>n.slice(-3).toLowerCase()==="nan"?NaN:n[0]==="-"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,stringify:Ta.stringifyNumber},bI={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"EXP",test:/^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,resolve:n=>parseFloat(n.replace(/_/g,"")),stringify(n){let e=Number(n.value);return isFinite(e)?e.toExponential():Ta.stringifyNumber(n)}},NI={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,resolve(n){let e=new wI.Scalar(parseFloat(n.replace(/_/g,""))),t=n.indexOf(".");if(t!==-1){let r=n.substring(t+1).replace(/_/g,"");r[r.length-1]==="0"&&(e.minFractionDigits=r.length)}return e},stringify:Ta.stringifyNumber};xi.float=NI;xi.floatExp=bI;xi.floatNaN=vI});var __=_(Dn=>{"use strict";var p_=Wt(),Mn=n=>typeof n=="bigint"||Number.isInteger(n);function Mi(n,e,t,{intAsBigInt:r}){let i=n[0];if((i==="-"||i==="+")&&(e+=1),n=n.substring(e).replace(/_/g,""),r){switch(t){case 2:n=`0b${n}`;break;case 8:n=`0o${n}`;break;case 16:n=`0x${n}`;break}let o=BigInt(n);return i==="-"?BigInt(-1)*o:o}let s=parseInt(n,t);return i==="-"?-1*s:s}function La(n,e,t){let{value:r}=n;if(Mn(r)){let i=r.toString(e);return r<0?"-"+t+i.substr(1):t+i}return p_.stringifyNumber(n)}var OI={identify:Mn,default:!0,tag:"tag:yaml.org,2002:int",format:"BIN",test:/^[-+]?0b[0-1_]+$/,resolve:(n,e,t)=>Mi(n,2,2,t),stringify:n=>La(n,2,"0b")},RI={identify:Mn,default:!0,tag:"tag:yaml.org,2002:int",format:"OCT",test:/^[-+]?0[0-7_]+$/,resolve:(n,e,t)=>Mi(n,1,8,t),stringify:n=>La(n,8,"0")},CI={identify:Mn,default:!0,tag:"tag:yaml.org,2002:int",test:/^[-+]?[0-9][0-9_]*$/,resolve:(n,e,t)=>Mi(n,0,10,t),stringify:p_.stringifyNumber},kI={identify:Mn,default:!0,tag:"tag:yaml.org,2002:int",format:"HEX",test:/^[-+]?0x[0-9a-fA-F_]+$/,resolve:(n,e,t)=>Mi(n,2,16,t),stringify:n=>La(n,16,"0x")};Dn.int=CI;Dn.intBin=OI;Dn.intHex=kI;Dn.intOct=RI});var Sa=_(Aa=>{"use strict";var ji=W(),Di=ft(),Fi=dt(),St=class n extends Fi.YAMLMap{constructor(e){super(e),this.tag=n.tag}add(e){let t;ji.isPair(e)?t=e:e&&typeof e=="object"&&"key"in e&&"value"in e&&e.value===null?t=new Di.Pair(e.key,null):t=new Di.Pair(e,null),Fi.findPair(this.items,t.key)||this.items.push(t)}get(e,t){let r=Fi.findPair(this.items,e);return!t&&ji.isPair(r)?ji.isScalar(r.key)?r.key.value:r.key:r}set(e,t){if(typeof t!="boolean")throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof t}`);let r=Fi.findPair(this.items,e);r&&!t?this.items.splice(this.items.indexOf(r),1):!r&&t&&this.items.push(new Di.Pair(e))}toJSON(e,t){return super.toJSON(e,t,Set)}toString(e,t,r){if(!e)return JSON.stringify(this);if(this.hasAllNullValues(!0))return super.toString(Object.assign({},e,{allNullValues:!0}),t,r);throw new Error("Set items must all have null values")}static from(e,t,r){let{replacer:i}=r,s=new this(e);if(t&&Symbol.iterator in Object(t))for(let o of t)typeof i=="function"&&(o=i.call(t,o,o)),s.items.push(Di.createPair(o,null,r));return s}};St.tag="tag:yaml.org,2002:set";var PI={collection:"map",identify:n=>n instanceof Set,nodeClass:St,default:!1,tag:"tag:yaml.org,2002:set",createNode:(n,e,t)=>St.from(n,e,t),resolve(n,e){if(ji.isMap(n)){if(n.hasAllNullValues(!0))return Object.assign(new St,n);e("Set items must all have null values")}else e("Expected a mapping for this tag");return n}};Aa.YAMLSet=St;Aa.set=PI});var wa=_(Hi=>{"use strict";var $I=Wt();function Ia(n,e){let t=n[0],r=t==="-"||t==="+"?n.substring(1):n,i=o=>e?BigInt(o):Number(o),s=r.replace(/_/g,"").split(":").reduce((o,a)=>o*i(60)+i(a),i(0));return t==="-"?i(-1)*s:s}function m_(n){let{value:e}=n,t=o=>o;if(typeof e=="bigint")t=o=>BigInt(o);else if(isNaN(e)||!isFinite(e))return $I.stringifyNumber(n);let r="";e<0&&(r="-",e*=t(-1));let i=t(60),s=[e%i];return e<60?s.unshift(0):(e=(e-s[0])/i,s.unshift(e%i),e>=60&&(e=(e-s[0])/i,s.unshift(e))),r+s.map(o=>String(o).padStart(2,"0")).join(":").replace(/000000\d*$/,"")}var qI={identify:n=>typeof n=="bigint"||Number.isInteger(n),default:!0,tag:"tag:yaml.org,2002:int",format:"TIME",test:/^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,resolve:(n,e,{intAsBigInt:t})=>Ia(n,t),stringify:m_},xI={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"TIME",test:/^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,resolve:n=>Ia(n,!1),stringify:m_},g_={identify:n=>n instanceof Date,default:!0,tag:"tag:yaml.org,2002:timestamp",test:RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$"),resolve(n){let e=n.match(g_.test);if(!e)throw new Error("!!timestamp expects a date, starting with yyyy-mm-dd");let[,t,r,i,s,o,a]=e.map(Number),l=e[7]?Number((e[7]+"00").substr(1,3)):0,c=Date.UTC(t,r-1,i,s||0,o||0,a||0,l),u=e[8];if(u&&u!=="Z"){let f=Ia(u,!1);Math.abs(f)<30&&(f*=60),c-=6e4*f}return new Date(c)},stringify:({value:n})=>n.toISOString().replace(/((T00:00)?:00)?\.000Z$/,"")};Hi.floatTime=xI;Hi.intTime=qI;Hi.timestamp=g_});var T_=_(E_=>{"use strict";var MI=Ut(),DI=Ni(),FI=Vt(),jI=qn(),HI=pa(),y_=h_(),va=d_(),Bi=__(),BI=ya(),UI=qi(),VI=Sa(),ba=wa(),WI=[MI.map,FI.seq,jI.string,DI.nullTag,y_.trueTag,y_.falseTag,Bi.intBin,Bi.intOct,Bi.int,Bi.intHex,va.floatNaN,va.floatExp,va.float,HI.binary,BI.omap,UI.pairs,VI.set,ba.intTime,ba.floatTime,ba.timestamp];E_.schema=WI});var R_=_(Ra=>{"use strict";var I_=Ut(),GI=Ni(),w_=Vt(),KI=qn(),YI=oa(),Na=la(),Oa=ua(),JI=Zp(),XI=n_(),v_=pa(),b_=ya(),N_=qi(),L_=T_(),O_=Sa(),Ui=wa(),A_=new Map([["core",JI.schema],["failsafe",[I_.map,w_.seq,KI.string]],["json",XI.schema],["yaml11",L_.schema],["yaml-1.1",L_.schema]]),S_={binary:v_.binary,bool:YI.boolTag,float:Na.float,floatExp:Na.floatExp,floatNaN:Na.floatNaN,floatTime:Ui.floatTime,int:Oa.int,intHex:Oa.intHex,intOct:Oa.intOct,intTime:Ui.intTime,map:I_.map,null:GI.nullTag,omap:b_.omap,pairs:N_.pairs,seq:w_.seq,set:O_.set,timestamp:Ui.timestamp},zI={"tag:yaml.org,2002:binary":v_.binary,"tag:yaml.org,2002:omap":b_.omap,"tag:yaml.org,2002:pairs":N_.pairs,"tag:yaml.org,2002:set":O_.set,"tag:yaml.org,2002:timestamp":Ui.timestamp};function QI(n,e){let t=A_.get(e);if(!t)if(Array.isArray(n))t=[];else{let r=Array.from(A_.keys()).filter(i=>i!=="yaml11").map(i=>JSON.stringify(i)).join(", ");throw new Error(`Unknown schema "${e}"; use one of ${r} or define customTags array`)}if(Array.isArray(n))for(let r of n)t=t.concat(r);else typeof n=="function"&&(t=n(t.slice()));return t.map(r=>{if(typeof r!="string")return r;let i=S_[r];if(i)return i;let s=Object.keys(S_).map(o=>JSON.stringify(o)).join(", ");throw new Error(`Unknown custom tag "${r}"; use one of ${s}`)})}Ra.coreKnownTags=zI;Ra.getTags=QI});var Pa=_(C_=>{"use strict";var Ca=W(),ZI=Ut(),ew=Vt(),tw=qn(),Vi=R_(),nw=(n,e)=>n.key<e.key?-1:n.key>e.key?1:0,ka=class n{constructor({compat:e,customTags:t,merge:r,resolveKnownTags:i,schema:s,sortMapEntries:o,toStringDefaults:a}){this.compat=Array.isArray(e)?Vi.getTags(e,"compat"):e?Vi.getTags(null,e):null,this.merge=!!r,this.name=typeof s=="string"&&s||"core",this.knownTags=i?Vi.coreKnownTags:{},this.tags=Vi.getTags(t,this.name),this.toStringOptions=a??null,Object.defineProperty(this,Ca.MAP,{value:ZI.map}),Object.defineProperty(this,Ca.SCALAR,{value:tw.string}),Object.defineProperty(this,Ca.SEQ,{value:ew.seq}),this.sortMapEntries=typeof o=="function"?o:o===!0?nw:null}clone(){let e=Object.create(n.prototype,Object.getOwnPropertyDescriptors(this));return e.tags=this.tags.slice(),e}};C_.Schema=ka});var P_=_(k_=>{"use strict";var rw=W(),$a=Cn(),Fn=bn();function iw(n,e){let t=[],r=e.directives===!0;if(e.directives!==!1&&n.directives){let l=n.directives.toString(n);l?(t.push(l),r=!0):n.directives.docStart&&(r=!0)}r&&t.push("---");let i=$a.createStringifyContext(n,e),{commentString:s}=i.options;if(n.commentBefore){t.length!==1&&t.unshift("");let l=s(n.commentBefore);t.unshift(Fn.indentComment(l,""))}let o=!1,a=null;if(n.contents){if(rw.isNode(n.contents)){if(n.contents.spaceBefore&&r&&t.push(""),n.contents.commentBefore){let u=s(n.contents.commentBefore);t.push(Fn.indentComment(u,""))}i.forceBlockIndent=!!n.comment,a=n.contents.comment}let l=a?void 0:()=>o=!0,c=$a.stringify(n.contents,i,()=>a=null,l);a&&(c+=Fn.lineComment(c,"",s(a))),(c[0]==="|"||c[0]===">")&&t[t.length-1]==="---"?t[t.length-1]=`--- ${c}`:t.push(c)}else t.push($a.stringify(n.contents,i));if(n.directives?.docEnd)if(n.comment){let l=s(n.comment);l.includes(`
`)?(t.push("..."),t.push(Fn.indentComment(l,""))):t.push(`... ${l}`)}else t.push("...");else{let l=n.comment;l&&o&&(l=l.replace(/^\n+/,"")),l&&((!o||a)&&t[t.length-1]!==""&&t.push(""),t.push(Fn.indentComment(s(l),"")))}return t.join(`
`)+`
`}k_.stringifyDocument=iw});var jn=_($_=>{"use strict";var sw=In(),Gt=vn(),xe=W(),ow=ft(),aw=ot(),lw=Pa(),cw=P_(),qa=fi(),uw=jo(),fw=wn(),xa=Fo(),Ma=class n{constructor(e,t,r){this.commentBefore=null,this.comment=null,this.errors=[],this.warnings=[],Object.defineProperty(this,xe.NODE_TYPE,{value:xe.DOC});let i=null;typeof t=="function"||Array.isArray(t)?i=t:r===void 0&&t&&(r=t,t=void 0);let s=Object.assign({intAsBigInt:!1,keepSourceTokens:!1,logLevel:"warn",prettyErrors:!0,strict:!0,uniqueKeys:!0,version:"1.2"},r);this.options=s;let{version:o}=s;r?._directives?(this.directives=r._directives.atDocument(),this.directives.yaml.explicit&&(o=this.directives.yaml.version)):this.directives=new xa.Directives({version:o}),this.setSchema(o,r),this.contents=e===void 0?null:this.createNode(e,i,r)}clone(){let e=Object.create(n.prototype,{[xe.NODE_TYPE]:{value:xe.DOC}});return e.commentBefore=this.commentBefore,e.comment=this.comment,e.errors=this.errors.slice(),e.warnings=this.warnings.slice(),e.options=Object.assign({},this.options),this.directives&&(e.directives=this.directives.clone()),e.schema=this.schema.clone(),e.contents=xe.isNode(this.contents)?this.contents.clone(e.schema):this.contents,this.range&&(e.range=this.range.slice()),e}add(e){Kt(this.contents)&&this.contents.add(e)}addIn(e,t){Kt(this.contents)&&this.contents.addIn(e,t)}createAlias(e,t){if(!e.anchor){let r=qa.anchorNames(this);e.anchor=!t||r.has(t)?qa.findNewAnchor(t||"a",r):t}return new sw.Alias(e.anchor)}createNode(e,t,r){let i;if(typeof t=="function")e=t.call({"":e},"",e),i=t;else if(Array.isArray(t)){let m=w=>typeof w=="number"||w instanceof String||w instanceof Number,S=t.filter(m).map(String);S.length>0&&(t=t.concat(S)),i=t}else r===void 0&&t&&(r=t,t=void 0);let{aliasDuplicateObjects:s,anchorPrefix:o,flow:a,keepUndefined:l,onTagObj:c,tag:u}=r??{},{onAnchor:f,setAnchors:d,sourceObjects:h}=qa.createNodeAnchors(this,o||"a"),y={aliasDuplicateObjects:s??!0,keepUndefined:l??!1,onAnchor:f,onTagObj:c,replacer:i,schema:this.schema,sourceObjects:h},g=fw.createNode(e,u,y);return a&&xe.isCollection(g)&&(g.flow=!0),d(),g}createPair(e,t,r={}){let i=this.createNode(e,null,r),s=this.createNode(t,null,r);return new ow.Pair(i,s)}delete(e){return Kt(this.contents)?this.contents.delete(e):!1}deleteIn(e){return Gt.isEmptyPath(e)?this.contents==null?!1:(this.contents=null,!0):Kt(this.contents)?this.contents.deleteIn(e):!1}get(e,t){return xe.isCollection(this.contents)?this.contents.get(e,t):void 0}getIn(e,t){return Gt.isEmptyPath(e)?!t&&xe.isScalar(this.contents)?this.contents.value:this.contents:xe.isCollection(this.contents)?this.contents.getIn(e,t):void 0}has(e){return xe.isCollection(this.contents)?this.contents.has(e):!1}hasIn(e){return Gt.isEmptyPath(e)?this.contents!==void 0:xe.isCollection(this.contents)?this.contents.hasIn(e):!1}set(e,t){this.contents==null?this.contents=Gt.collectionFromPath(this.schema,[e],t):Kt(this.contents)&&this.contents.set(e,t)}setIn(e,t){Gt.isEmptyPath(e)?this.contents=t:this.contents==null?this.contents=Gt.collectionFromPath(this.schema,Array.from(e),t):Kt(this.contents)&&this.contents.setIn(e,t)}setSchema(e,t={}){typeof e=="number"&&(e=String(e));let r;switch(e){case"1.1":this.directives?this.directives.yaml.version="1.1":this.directives=new xa.Directives({version:"1.1"}),r={merge:!0,resolveKnownTags:!1,schema:"yaml-1.1"};break;case"1.2":case"next":this.directives?this.directives.yaml.version=e:this.directives=new xa.Directives({version:e}),r={merge:!1,resolveKnownTags:!0,schema:"core"};break;case null:this.directives&&delete this.directives,r=null;break;default:{let i=JSON.stringify(e);throw new Error(`Expected '1.1', '1.2' or null as first argument, but found: ${i}`)}}if(t.schema instanceof Object)this.schema=t.schema;else if(r)this.schema=new lw.Schema(Object.assign(r,t));else throw new Error("With a null YAML version, the { schema: Schema } option is required")}toJS({json:e,jsonArg:t,mapAsMap:r,maxAliasCount:i,onAnchor:s,reviver:o}={}){let a={anchors:new Map,doc:this,keep:!e,mapAsMap:r===!0,mapKeyWarned:!1,maxAliasCount:typeof i=="number"?i:100},l=aw.toJS(this.contents,t??"",a);if(typeof s=="function")for(let{count:c,res:u}of a.anchors.values())s(u,c);return typeof o=="function"?uw.applyReviver(o,{"":l},"",l):l}toJSON(e,t){return this.toJS({json:!0,jsonArg:e,mapAsMap:!1,onAnchor:t})}toString(e={}){if(this.errors.length>0)throw new Error("Document with errors cannot be stringified");if("indent"in e&&(!Number.isInteger(e.indent)||Number(e.indent)<=0)){let t=JSON.stringify(e.indent);throw new Error(`"indent" option must be a positive integer, not ${t}`)}return cw.stringifyDocument(this,e)}};function Kt(n){if(xe.isCollection(n))return!0;throw new Error("Expected a YAML collection as document contents")}$_.Document=Ma});var Un=_(Bn=>{"use strict";var Hn=class extends Error{constructor(e,t,r,i){super(),this.name=e,this.code=r,this.message=i,this.pos=t}},Da=class extends Hn{constructor(e,t,r){super("YAMLParseError",e,t,r)}},Fa=class extends Hn{constructor(e,t,r){super("YAMLWarning",e,t,r)}},hw=(n,e)=>t=>{if(t.pos[0]===-1)return;t.linePos=t.pos.map(a=>e.linePos(a));let{line:r,col:i}=t.linePos[0];t.message+=` at line ${r}, column ${i}`;let s=i-1,o=n.substring(e.lineStarts[r-1],e.lineStarts[r]).replace(/[\n\r]+$/,"");if(s>=60&&o.length>80){let a=Math.min(s-39,o.length-79);o="\u2026"+o.substring(a),s-=a-1}if(o.length>80&&(o=o.substring(0,79)+"\u2026"),r>1&&/^ *$/.test(o.substring(0,s))){let a=n.substring(e.lineStarts[r-2],e.lineStarts[r-1]);a.length>80&&(a=a.substring(0,79)+`\u2026
`),o=a+o}if(/[^ ]/.test(o)){let a=1,l=t.linePos[1];l&&l.line===r&&l.col>i&&(a=Math.max(1,Math.min(l.col-i,80-s)));let c=" ".repeat(s)+"^".repeat(a);t.message+=`:

${o}
${c}
`}};Bn.YAMLError=Hn;Bn.YAMLParseError=Da;Bn.YAMLWarning=Fa;Bn.prettifyError=hw});var Vn=_(q_=>{"use strict";function dw(n,{flow:e,indicator:t,next:r,offset:i,onError:s,startOnNewline:o}){let a=!1,l=o,c=o,u="",f="",d=!1,h=!1,y=!1,g=null,m=null,S=null,w=null,b=null;for(let v of n)switch(y&&(v.type!=="space"&&v.type!=="newline"&&v.type!=="comma"&&s(v.offset,"MISSING_CHAR","Tags and anchors must be separated from the next token by white space"),y=!1),v.type){case"space":!e&&l&&t!=="doc-start"&&v.source[0]==="	"&&s(v,"TAB_AS_INDENT","Tabs are not allowed as indentation"),c=!0;break;case"comment":{c||s(v,"MISSING_CHAR","Comments must be separated from other tokens by white space characters");let V=v.source.substring(1)||" ";u?u+=f+V:u=V,f="",l=!1;break}case"newline":l?u?u+=v.source:a=!0:f+=v.source,l=!0,d=!0,(g||m)&&(h=!0),c=!0;break;case"anchor":g&&s(v,"MULTIPLE_ANCHORS","A node can have at most one anchor"),v.source.endsWith(":")&&s(v.offset+v.source.length-1,"BAD_ALIAS","Anchor ending in : is ambiguous",!0),g=v,b===null&&(b=v.offset),l=!1,c=!1,y=!0;break;case"tag":{m&&s(v,"MULTIPLE_TAGS","A node can have at most one tag"),m=v,b===null&&(b=v.offset),l=!1,c=!1,y=!0;break}case t:(g||m)&&s(v,"BAD_PROP_ORDER",`Anchors and tags must be after the ${v.source} indicator`),w&&s(v,"UNEXPECTED_TOKEN",`Unexpected ${v.source} in ${e??"collection"}`),w=v,l=!1,c=!1;break;case"comma":if(e){S&&s(v,"UNEXPECTED_TOKEN",`Unexpected , in ${e}`),S=v,l=!1,c=!1;break}default:s(v,"UNEXPECTED_TOKEN",`Unexpected ${v.type} token`),l=!1,c=!1}let $=n[n.length-1],M=$?$.offset+$.source.length:i;return y&&r&&r.type!=="space"&&r.type!=="newline"&&r.type!=="comma"&&(r.type!=="scalar"||r.source!=="")&&s(r.offset,"MISSING_CHAR","Tags and anchors must be separated from the next token by white space"),{comma:S,found:w,spaceBefore:a,comment:u,hasNewline:d,hasNewlineAfterProp:h,anchor:g,tag:m,end:M,start:b??M}}q_.resolveProps=dw});var Wi=_(x_=>{"use strict";function ja(n){if(!n)return null;switch(n.type){case"alias":case"scalar":case"double-quoted-scalar":case"single-quoted-scalar":if(n.source.includes(`
`))return!0;if(n.end){for(let e of n.end)if(e.type==="newline")return!0}return!1;case"flow-collection":for(let e of n.items){for(let t of e.start)if(t.type==="newline")return!0;if(e.sep){for(let t of e.sep)if(t.type==="newline")return!0}if(ja(e.key)||ja(e.value))return!0}return!1;default:return!0}}x_.containsNewline=ja});var Ha=_(M_=>{"use strict";var pw=Wi();function _w(n,e,t){if(e?.type==="flow-collection"){let r=e.end[0];r.indent===n&&(r.source==="]"||r.source==="}")&&pw.containsNewline(e)&&t(r,"BAD_INDENT","Flow end indicator should be more indented than parent",!0)}}M_.flowIndentCheck=_w});var Ba=_(F_=>{"use strict";var D_=W();function mw(n,e,t){let{uniqueKeys:r}=n.options;if(r===!1)return!1;let i=typeof r=="function"?r:(s,o)=>s===o||D_.isScalar(s)&&D_.isScalar(o)&&s.value===o.value&&!(s.value==="<<"&&n.schema.merge);return e.some(s=>i(s.key,t))}F_.mapIncludes=mw});var W_=_(V_=>{"use strict";var j_=ft(),gw=dt(),H_=Vn(),yw=Wi(),B_=Ha(),Ew=Ba(),U_="All mapping items must start at the same column";function Tw({composeNode:n,composeEmptyNode:e},t,r,i,s){let o=s?.nodeClass??gw.YAMLMap,a=new o(t.schema);t.atRoot&&(t.atRoot=!1);let l=r.offset,c=null;for(let u of r.items){let{start:f,key:d,sep:h,value:y}=u,g=H_.resolveProps(f,{indicator:"explicit-key-ind",next:d??h?.[0],offset:l,onError:i,startOnNewline:!0}),m=!g.found;if(m){if(d&&(d.type==="block-seq"?i(l,"BLOCK_AS_IMPLICIT_KEY","A block sequence may not be used as an implicit map key"):"indent"in d&&d.indent!==r.indent&&i(l,"BAD_INDENT",U_)),!g.anchor&&!g.tag&&!h){c=g.end,g.comment&&(a.comment?a.comment+=`
`+g.comment:a.comment=g.comment);continue}(g.hasNewlineAfterProp||yw.containsNewline(d))&&i(d??f[f.length-1],"MULTILINE_IMPLICIT_KEY","Implicit keys need to be on a single line")}else g.found?.indent!==r.indent&&i(l,"BAD_INDENT",U_);let S=g.end,w=d?n(t,d,g,i):e(t,S,f,null,g,i);t.schema.compat&&B_.flowIndentCheck(r.indent,d,i),Ew.mapIncludes(t,a.items,w)&&i(S,"DUPLICATE_KEY","Map keys must be unique");let b=H_.resolveProps(h??[],{indicator:"map-value-ind",next:y,offset:w.range[2],onError:i,startOnNewline:!d||d.type==="block-scalar"});if(l=b.end,b.found){m&&(y?.type==="block-map"&&!b.hasNewline&&i(l,"BLOCK_AS_IMPLICIT_KEY","Nested mappings are not allowed in compact mappings"),t.options.strict&&g.start<b.found.offset-1024&&i(w.range,"KEY_OVER_1024_CHARS","The : indicator must be at most 1024 chars after the start of an implicit block mapping key"));let $=y?n(t,y,b,i):e(t,l,h,null,b,i);t.schema.compat&&B_.flowIndentCheck(r.indent,y,i),l=$.range[2];let M=new j_.Pair(w,$);t.options.keepSourceTokens&&(M.srcToken=u),a.items.push(M)}else{m&&i(w.range,"MISSING_CHAR","Implicit map keys need to be followed by map values"),b.comment&&(w.comment?w.comment+=`
`+b.comment:w.comment=b.comment);let $=new j_.Pair(w);t.options.keepSourceTokens&&($.srcToken=u),a.items.push($)}}return c&&c<l&&i(c,"IMPOSSIBLE","Map comment with trailing content"),a.range=[r.offset,l,c??l],a}V_.resolveBlockMap=Tw});var K_=_(G_=>{"use strict";var Lw=pt(),Aw=Vn(),Sw=Ha();function Iw({composeNode:n,composeEmptyNode:e},t,r,i,s){let o=s?.nodeClass??Lw.YAMLSeq,a=new o(t.schema);t.atRoot&&(t.atRoot=!1);let l=r.offset,c=null;for(let{start:u,value:f}of r.items){let d=Aw.resolveProps(u,{indicator:"seq-item-ind",next:f,offset:l,onError:i,startOnNewline:!0});if(!d.found)if(d.anchor||d.tag||f)f&&f.type==="block-seq"?i(d.end,"BAD_INDENT","All sequence items must start at the same column"):i(l,"MISSING_CHAR","Sequence item without - indicator");else{c=d.end,d.comment&&(a.comment=d.comment);continue}let h=f?n(t,f,d,i):e(t,d.end,u,null,d,i);t.schema.compat&&Sw.flowIndentCheck(r.indent,f,i),l=h.range[2],a.items.push(h)}return a.range=[r.offset,l,c??l],a}G_.resolveBlockSeq=Iw});var Yt=_(Y_=>{"use strict";function ww(n,e,t,r){let i="";if(n){let s=!1,o="";for(let a of n){let{source:l,type:c}=a;switch(c){case"space":s=!0;break;case"comment":{t&&!s&&r(a,"MISSING_CHAR","Comments must be separated from other tokens by white space characters");let u=l.substring(1)||" ";i?i+=o+u:i=u,o="";break}case"newline":i&&(o+=l),s=!0;break;default:r(a,"UNEXPECTED_TOKEN",`Unexpected ${c} at node end`)}e+=l.length}}return{comment:i,offset:e}}Y_.resolveEnd=ww});var Q_=_(z_=>{"use strict";var vw=W(),bw=ft(),J_=dt(),Nw=pt(),Ow=Yt(),X_=Vn(),Rw=Wi(),Cw=Ba(),Ua="Block collections are not allowed within flow collections",Va=n=>n&&(n.type==="block-map"||n.type==="block-seq");function kw({composeNode:n,composeEmptyNode:e},t,r,i,s){let o=r.start.source==="{",a=o?"flow map":"flow sequence",l=s?.nodeClass??(o?J_.YAMLMap:Nw.YAMLSeq),c=new l(t.schema);c.flow=!0;let u=t.atRoot;u&&(t.atRoot=!1);let f=r.offset+r.start.source.length;for(let m=0;m<r.items.length;++m){let S=r.items[m],{start:w,key:b,sep:$,value:M}=S,v=X_.resolveProps(w,{flow:a,indicator:"explicit-key-ind",next:b??$?.[0],offset:f,onError:i,startOnNewline:!1});if(!v.found){if(!v.anchor&&!v.tag&&!$&&!M){m===0&&v.comma?i(v.comma,"UNEXPECTED_TOKEN",`Unexpected , in ${a}`):m<r.items.length-1&&i(v.start,"UNEXPECTED_TOKEN",`Unexpected empty item in ${a}`),v.comment&&(c.comment?c.comment+=`
`+v.comment:c.comment=v.comment),f=v.end;continue}!o&&t.options.strict&&Rw.containsNewline(b)&&i(b,"MULTILINE_IMPLICIT_KEY","Implicit keys of flow sequence pairs need to be on a single line")}if(m===0)v.comma&&i(v.comma,"UNEXPECTED_TOKEN",`Unexpected , in ${a}`);else if(v.comma||i(v.start,"MISSING_CHAR",`Missing , between ${a} items`),v.comment){let V="";e:for(let G of w)switch(G.type){case"comma":case"space":break;case"comment":V=G.source.substring(1);break e;default:break e}if(V){let G=c.items[c.items.length-1];vw.isPair(G)&&(G=G.value??G.key),G.comment?G.comment+=`
`+V:G.comment=V,v.comment=v.comment.substring(V.length+1)}}if(!o&&!$&&!v.found){let V=M?n(t,M,v,i):e(t,v.end,$,null,v,i);c.items.push(V),f=V.range[2],Va(M)&&i(V.range,"BLOCK_IN_FLOW",Ua)}else{let V=v.end,G=b?n(t,b,v,i):e(t,V,w,null,v,i);Va(b)&&i(G.range,"BLOCK_IN_FLOW",Ua);let P=X_.resolveProps($??[],{flow:a,indicator:"map-value-ind",next:M,offset:G.range[2],onError:i,startOnNewline:!1});if(P.found){if(!o&&!v.found&&t.options.strict){if($)for(let F of $){if(F===P.found)break;if(F.type==="newline"){i(F,"MULTILINE_IMPLICIT_KEY","Implicit keys of flow sequence pairs need to be on a single line");break}}v.start<P.found.offset-1024&&i(P.found,"KEY_OVER_1024_CHARS","The : indicator must be at most 1024 chars after the start of an implicit flow sequence key")}}else M&&("source"in M&&M.source&&M.source[0]===":"?i(M,"MISSING_CHAR",`Missing space after : in ${a}`):i(P.start,"MISSING_CHAR",`Missing , or : between ${a} items`));let j=M?n(t,M,P,i):P.found?e(t,P.end,$,null,P,i):null;j?Va(M)&&i(j.range,"BLOCK_IN_FLOW",Ua):P.comment&&(G.comment?G.comment+=`
`+P.comment:G.comment=P.comment);let D=new bw.Pair(G,j);if(t.options.keepSourceTokens&&(D.srcToken=S),o){let F=c;Cw.mapIncludes(t,F.items,G)&&i(V,"DUPLICATE_KEY","Map keys must be unique"),F.items.push(D)}else{let F=new J_.YAMLMap(t.schema);F.flow=!0,F.items.push(D),c.items.push(F)}f=j?j.range[2]:P.end}}let d=o?"}":"]",[h,...y]=r.end,g=f;if(h&&h.source===d)g=h.offset+h.source.length;else{let m=a[0].toUpperCase()+a.substring(1),S=u?`${m} must end with a ${d}`:`${m} in block collection must be sufficiently indented and end with a ${d}`;i(f,u?"MISSING_CHAR":"BAD_INDENT",S),h&&h.source.length!==1&&y.unshift(h)}if(y.length>0){let m=Ow.resolveEnd(y,g,t.options.strict,i);m.comment&&(c.comment?c.comment+=`
`+m.comment:c.comment=m.comment),c.range=[r.offset,g,m.offset]}else c.range=[r.offset,g,g];return c}z_.resolveFlowCollection=kw});var em=_(Z_=>{"use strict";var Pw=W(),$w=ce(),qw=dt(),xw=pt(),Mw=W_(),Dw=K_(),Fw=Q_();function Wa(n,e,t,r,i,s){let o=t.type==="block-map"?Mw.resolveBlockMap(n,e,t,r,s):t.type==="block-seq"?Dw.resolveBlockSeq(n,e,t,r,s):Fw.resolveFlowCollection(n,e,t,r,s),a=o.constructor;return i==="!"||i===a.tagName?(o.tag=a.tagName,o):(i&&(o.tag=i),o)}function jw(n,e,t,r,i){let s=r?e.directives.tagName(r.source,f=>i(r,"TAG_RESOLVE_FAILED",f)):null,o=t.type==="block-map"?"map":t.type==="block-seq"?"seq":t.start.source==="{"?"map":"seq";if(!r||!s||s==="!"||s===qw.YAMLMap.tagName&&o==="map"||s===xw.YAMLSeq.tagName&&o==="seq"||!o)return Wa(n,e,t,i,s);let a=e.schema.tags.find(f=>f.tag===s&&f.collection===o);if(!a){let f=e.schema.knownTags[s];if(f&&f.collection===o)e.schema.tags.push(Object.assign({},f,{default:!1})),a=f;else return f?.collection?i(r,"BAD_COLLECTION_TYPE",`${f.tag} used for ${o} collection, but expects ${f.collection}`,!0):i(r,"TAG_RESOLVE_FAILED",`Unresolved tag: ${s}`,!0),Wa(n,e,t,i,s)}let l=Wa(n,e,t,i,s,a),c=a.resolve?.(l,f=>i(r,"TAG_RESOLVE_FAILED",f),e.options)??l,u=Pw.isNode(c)?c:new $w.Scalar(c);return u.range=l.range,u.tag=s,a?.format&&(u.format=a.format),u}Z_.composeCollection=jw});var Ka=_(tm=>{"use strict";var Ga=ce();function Hw(n,e,t){let r=n.offset,i=Bw(n,e,t);if(!i)return{value:"",type:null,comment:"",range:[r,r,r]};let s=i.mode===">"?Ga.Scalar.BLOCK_FOLDED:Ga.Scalar.BLOCK_LITERAL,o=n.source?Uw(n.source):[],a=o.length;for(let g=o.length-1;g>=0;--g){let m=o[g][1];if(m===""||m==="\r")a=g;else break}if(a===0){let g=i.chomp==="+"&&o.length>0?`
`.repeat(Math.max(1,o.length-1)):"",m=r+i.length;return n.source&&(m+=n.source.length),{value:g,type:s,comment:i.comment,range:[r,m,m]}}let l=n.indent+i.indent,c=n.offset+i.length,u=0;for(let g=0;g<a;++g){let[m,S]=o[g];if(S===""||S==="\r")i.indent===0&&m.length>l&&(l=m.length);else{if(m.length<l){let w="Block scalars with more-indented leading empty lines must use an explicit indentation indicator";t(c+m.length,"MISSING_CHAR",w)}i.indent===0&&(l=m.length),u=g;break}c+=m.length+S.length+1}for(let g=o.length-1;g>=a;--g)o[g][0].length>l&&(a=g+1);let f="",d="",h=!1;for(let g=0;g<u;++g)f+=o[g][0].slice(l)+`
`;for(let g=u;g<a;++g){let[m,S]=o[g];c+=m.length+S.length+1;let w=S[S.length-1]==="\r";if(w&&(S=S.slice(0,-1)),S&&m.length<l){let $=`Block scalar lines must not be less indented than their ${i.indent?"explicit indentation indicator":"first line"}`;t(c-S.length-(w?2:1),"BAD_INDENT",$),m=""}s===Ga.Scalar.BLOCK_LITERAL?(f+=d+m.slice(l)+S,d=`
`):m.length>l||S[0]==="	"?(d===" "?d=`
`:!h&&d===`
`&&(d=`

`),f+=d+m.slice(l)+S,d=`
`,h=!0):S===""?d===`
`?f+=`
`:d=`
`:(f+=d+S,d=" ",h=!1)}switch(i.chomp){case"-":break;case"+":for(let g=a;g<o.length;++g)f+=`
`+o[g][0].slice(l);f[f.length-1]!==`
`&&(f+=`
`);break;default:f+=`
`}let y=r+i.length+n.source.length;return{value:f,type:s,comment:i.comment,range:[r,y,y]}}function Bw({offset:n,props:e},t,r){if(e[0].type!=="block-scalar-header")return r(e[0],"IMPOSSIBLE","Block scalar header not found"),null;let{source:i}=e[0],s=i[0],o=0,a="",l=-1;for(let d=1;d<i.length;++d){let h=i[d];if(!a&&(h==="-"||h==="+"))a=h;else{let y=Number(h);!o&&y?o=y:l===-1&&(l=n+d)}}l!==-1&&r(l,"UNEXPECTED_TOKEN",`Block scalar header includes extra characters: ${i}`);let c=!1,u="",f=i.length;for(let d=1;d<e.length;++d){let h=e[d];switch(h.type){case"space":c=!0;case"newline":f+=h.source.length;break;case"comment":t&&!c&&r(h,"MISSING_CHAR","Comments must be separated from other tokens by white space characters"),f+=h.source.length,u=h.source.substring(1);break;case"error":r(h,"UNEXPECTED_TOKEN",h.message),f+=h.source.length;break;default:{let y=`Unexpected token in block scalar header: ${h.type}`;r(h,"UNEXPECTED_TOKEN",y);let g=h.source;g&&typeof g=="string"&&(f+=g.length)}}}return{mode:s,indent:o,chomp:a,comment:u,length:f}}function Uw(n){let e=n.split(/\n( *)/),t=e[0],r=t.match(/^( *)/),s=[r?.[1]?[r[1],t.slice(r[1].length)]:["",t]];for(let o=1;o<e.length;o+=2)s.push([e[o],e[o+1]]);return s}tm.resolveBlockScalar=Hw});var Ja=_(rm=>{"use strict";var Ya=ce(),Vw=Yt();function Ww(n,e,t){let{offset:r,type:i,source:s,end:o}=n,a,l,c=(d,h,y)=>t(r+d,h,y);switch(i){case"scalar":a=Ya.Scalar.PLAIN,l=Gw(s,c);break;case"single-quoted-scalar":a=Ya.Scalar.QUOTE_SINGLE,l=Kw(s,c);break;case"double-quoted-scalar":a=Ya.Scalar.QUOTE_DOUBLE,l=Yw(s,c);break;default:return t(n,"UNEXPECTED_TOKEN",`Expected a flow scalar value, but found: ${i}`),{value:"",type:null,comment:"",range:[r,r+s.length,r+s.length]}}let u=r+s.length,f=Vw.resolveEnd(o,u,e,t);return{value:l,type:a,comment:f.comment,range:[r,u,f.offset]}}function Gw(n,e){let t="";switch(n[0]){case"	":t="a tab character";break;case",":t="flow indicator character ,";break;case"%":t="directive indicator character %";break;case"|":case">":{t=`block scalar indicator ${n[0]}`;break}case"@":case"`":{t=`reserved character ${n[0]}`;break}}return t&&e(0,"BAD_SCALAR_START",`Plain value cannot start with ${t}`),nm(n)}function Kw(n,e){return(n[n.length-1]!=="'"||n.length===1)&&e(n.length,"MISSING_CHAR","Missing closing 'quote"),nm(n.slice(1,-1)).replace(/''/g,"'")}function nm(n){let e,t;try{e=new RegExp(`(.*?)(?<![ 	])[ 	]*\r?
`,"sy"),t=new RegExp(`[ 	]*(.*?)(?:(?<![ 	])[ 	]*)?\r?
`,"sy")}catch{e=/(.*?)[ \t]*\r?\n/sy,t=/[ \t]*(.*?)[ \t]*\r?\n/sy}let r=e.exec(n);if(!r)return n;let i=r[1],s=" ",o=e.lastIndex;for(t.lastIndex=o;r=t.exec(n);)r[1]===""?s===`
`?i+=s:s=`
`:(i+=s+r[1],s=" "),o=t.lastIndex;let a=/[ \t]*(.*)/sy;return a.lastIndex=o,r=a.exec(n),i+s+(r?.[1]??"")}function Yw(n,e){let t="";for(let r=1;r<n.length-1;++r){let i=n[r];if(!(i==="\r"&&n[r+1]===`
`))if(i===`
`){let{fold:s,offset:o}=Jw(n,r);t+=s,r=o}else if(i==="\\"){let s=n[++r],o=Xw[s];if(o)t+=o;else if(s===`
`)for(s=n[r+1];s===" "||s==="	";)s=n[++r+1];else if(s==="\r"&&n[r+1]===`
`)for(s=n[++r+1];s===" "||s==="	";)s=n[++r+1];else if(s==="x"||s==="u"||s==="U"){let a={x:2,u:4,U:8}[s];t+=zw(n,r+1,a,e),r+=a}else{let a=n.substr(r-1,2);e(r-1,"BAD_DQ_ESCAPE",`Invalid escape sequence ${a}`),t+=a}}else if(i===" "||i==="	"){let s=r,o=n[r+1];for(;o===" "||o==="	";)o=n[++r+1];o!==`
`&&!(o==="\r"&&n[r+2]===`
`)&&(t+=r>s?n.slice(s,r+1):i)}else t+=i}return(n[n.length-1]!=='"'||n.length===1)&&e(n.length,"MISSING_CHAR",'Missing closing "quote'),t}function Jw(n,e){let t="",r=n[e+1];for(;(r===" "||r==="	"||r===`
`||r==="\r")&&!(r==="\r"&&n[e+2]!==`
`);)r===`
`&&(t+=`
`),e+=1,r=n[e+1];return t||(t=" "),{fold:t,offset:e}}var Xw={0:"\0",a:"\x07",b:"\b",e:"\x1B",f:"\f",n:`
`,r:"\r",t:"	",v:"\v",N:"\x85",_:"\xA0",L:"\u2028",P:"\u2029"," ":" ",'"':'"',"/":"/","\\":"\\","	":"	"};function zw(n,e,t,r){let i=n.substr(e,t),o=i.length===t&&/^[0-9a-fA-F]+$/.test(i)?parseInt(i,16):NaN;if(isNaN(o)){let a=n.substr(e-2,t+2);return r(e-2,"BAD_DQ_ESCAPE",`Invalid escape sequence ${a}`),a}return String.fromCodePoint(o)}rm.resolveFlowScalar=Ww});var om=_(sm=>{"use strict";var Jt=W(),im=ce(),Qw=Ka(),Zw=Ja();function ev(n,e,t,r){let{value:i,type:s,comment:o,range:a}=e.type==="block-scalar"?Qw.resolveBlockScalar(e,n.options.strict,r):Zw.resolveFlowScalar(e,n.options.strict,r),l=t?n.directives.tagName(t.source,f=>r(t,"TAG_RESOLVE_FAILED",f)):null,c=t&&l?tv(n.schema,i,l,t,r):e.type==="scalar"?nv(n,i,e,r):n.schema[Jt.SCALAR],u;try{let f=c.resolve(i,d=>r(t??e,"TAG_RESOLVE_FAILED",d),n.options);u=Jt.isScalar(f)?f:new im.Scalar(f)}catch(f){let d=f instanceof Error?f.message:String(f);r(t??e,"TAG_RESOLVE_FAILED",d),u=new im.Scalar(i)}return u.range=a,u.source=i,s&&(u.type=s),l&&(u.tag=l),c.format&&(u.format=c.format),o&&(u.comment=o),u}function tv(n,e,t,r,i){if(t==="!")return n[Jt.SCALAR];let s=[];for(let a of n.tags)if(!a.collection&&a.tag===t)if(a.default&&a.test)s.push(a);else return a;for(let a of s)if(a.test?.test(e))return a;let o=n.knownTags[t];return o&&!o.collection?(n.tags.push(Object.assign({},o,{default:!1,test:void 0})),o):(i(r,"TAG_RESOLVE_FAILED",`Unresolved tag: ${t}`,t!=="tag:yaml.org,2002:str"),n[Jt.SCALAR])}function nv({directives:n,schema:e},t,r,i){let s=e.tags.find(o=>o.default&&o.test?.test(t))||e[Jt.SCALAR];if(e.compat){let o=e.compat.find(a=>a.default&&a.test?.test(t))??e[Jt.SCALAR];if(s.tag!==o.tag){let a=n.tagString(s.tag),l=n.tagString(o.tag),c=`Value may be parsed as either ${a} or ${l}`;i(r,"TAG_RESOLVE_FAILED",c,!0)}}return s}sm.composeScalar=ev});var lm=_(am=>{"use strict";function rv(n,e,t){if(e){t===null&&(t=e.length);for(let r=t-1;r>=0;--r){let i=e[r];switch(i.type){case"space":case"comment":case"newline":n-=i.source.length;continue}for(i=e[++r];i?.type==="space";)n+=i.source.length,i=e[++r];break}}return n}am.emptyScalarPosition=rv});var fm=_(za=>{"use strict";var iv=In(),sv=em(),cm=om(),ov=Yt(),av=lm(),lv={composeNode:um,composeEmptyNode:Xa};function um(n,e,t,r){let{spaceBefore:i,comment:s,anchor:o,tag:a}=t,l,c=!0;switch(e.type){case"alias":l=cv(n,e,r),(o||a)&&r(e,"ALIAS_PROPS","An alias node must not specify any properties");break;case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":case"block-scalar":l=cm.composeScalar(n,e,a,r),o&&(l.anchor=o.source.substring(1));break;case"block-map":case"block-seq":case"flow-collection":l=sv.composeCollection(lv,n,e,a,r),o&&(l.anchor=o.source.substring(1));break;default:{let u=e.type==="error"?e.message:`Unsupported token (type: ${e.type})`;r(e,"UNEXPECTED_TOKEN",u),l=Xa(n,e.offset,void 0,null,t,r),c=!1}}return o&&l.anchor===""&&r(o,"BAD_ALIAS","Anchor cannot be an empty string"),i&&(l.spaceBefore=!0),s&&(e.type==="scalar"&&e.source===""?l.comment=s:l.commentBefore=s),n.options.keepSourceTokens&&c&&(l.srcToken=e),l}function Xa(n,e,t,r,{spaceBefore:i,comment:s,anchor:o,tag:a,end:l},c){let u={type:"scalar",offset:av.emptyScalarPosition(e,t,r),indent:-1,source:""},f=cm.composeScalar(n,u,a,c);return o&&(f.anchor=o.source.substring(1),f.anchor===""&&c(o,"BAD_ALIAS","Anchor cannot be an empty string")),i&&(f.spaceBefore=!0),s&&(f.comment=s,f.range[2]=l),f}function cv({options:n},{offset:e,source:t,end:r},i){let s=new iv.Alias(t.substring(1));s.source===""&&i(e,"BAD_ALIAS","Alias cannot be an empty string"),s.source.endsWith(":")&&i(e+t.length-1,"BAD_ALIAS","Alias ending in : is ambiguous",!0);let o=e+t.length,a=ov.resolveEnd(r,o,n.strict,i);return s.range=[e,o,a.offset],a.comment&&(s.comment=a.comment),s}za.composeEmptyNode=Xa;za.composeNode=um});var pm=_(dm=>{"use strict";var uv=jn(),hm=fm(),fv=Yt(),hv=Vn();function dv(n,e,{offset:t,start:r,value:i,end:s},o){let a=Object.assign({_directives:e},n),l=new uv.Document(void 0,a),c={atRoot:!0,directives:l.directives,options:l.options,schema:l.schema},u=hv.resolveProps(r,{indicator:"doc-start",next:i??s?.[0],offset:t,onError:o,startOnNewline:!0});u.found&&(l.directives.docStart=!0,i&&(i.type==="block-map"||i.type==="block-seq")&&!u.hasNewline&&o(u.end,"MISSING_CHAR","Block collection cannot start on same line with directives-end marker")),l.contents=i?hm.composeNode(c,i,u,o):hm.composeEmptyNode(c,u.end,r,null,u,o);let f=l.contents.range[2],d=fv.resolveEnd(s,f,!1,o);return d.comment&&(l.comment=d.comment),l.range=[t,f,d.offset],l}dm.composeDoc=dv});var Za=_(gm=>{"use strict";var pv=Fo(),_v=jn(),Wn=Un(),_m=W(),mv=pm(),gv=Yt();function Gn(n){if(typeof n=="number")return[n,n+1];if(Array.isArray(n))return n.length===2?n:[n[0],n[1]];let{offset:e,source:t}=n;return[e,e+(typeof t=="string"?t.length:1)]}function mm(n){let e="",t=!1,r=!1;for(let i=0;i<n.length;++i){let s=n[i];switch(s[0]){case"#":e+=(e===""?"":r?`

`:`
`)+(s.substring(1)||" "),t=!0,r=!1;break;case"%":n[i+1]?.[0]!=="#"&&(i+=1),t=!1;break;default:t||(r=!0),t=!1}}return{comment:e,afterEmptyLine:r}}var Qa=class{constructor(e={}){this.doc=null,this.atDirectives=!1,this.prelude=[],this.errors=[],this.warnings=[],this.onError=(t,r,i,s)=>{let o=Gn(t);s?this.warnings.push(new Wn.YAMLWarning(o,r,i)):this.errors.push(new Wn.YAMLParseError(o,r,i))},this.directives=new pv.Directives({version:e.version||"1.2"}),this.options=e}decorate(e,t){let{comment:r,afterEmptyLine:i}=mm(this.prelude);if(r){let s=e.contents;if(t)e.comment=e.comment?`${e.comment}
${r}`:r;else if(i||e.directives.docStart||!s)e.commentBefore=r;else if(_m.isCollection(s)&&!s.flow&&s.items.length>0){let o=s.items[0];_m.isPair(o)&&(o=o.key);let a=o.commentBefore;o.commentBefore=a?`${r}
${a}`:r}else{let o=s.commentBefore;s.commentBefore=o?`${r}
${o}`:r}}t?(Array.prototype.push.apply(e.errors,this.errors),Array.prototype.push.apply(e.warnings,this.warnings)):(e.errors=this.errors,e.warnings=this.warnings),this.prelude=[],this.errors=[],this.warnings=[]}streamInfo(){return{comment:mm(this.prelude).comment,directives:this.directives,errors:this.errors,warnings:this.warnings}}*compose(e,t=!1,r=-1){for(let i of e)yield*this.next(i);yield*this.end(t,r)}*next(e){switch(process.env.LOG_STREAM&&console.dir(e,{depth:null}),e.type){case"directive":this.directives.add(e.source,(t,r,i)=>{let s=Gn(e);s[0]+=t,this.onError(s,"BAD_DIRECTIVE",r,i)}),this.prelude.push(e.source),this.atDirectives=!0;break;case"document":{let t=mv.composeDoc(this.options,this.directives,e,this.onError);this.atDirectives&&!t.directives.docStart&&this.onError(e,"MISSING_CHAR","Missing directives-end/doc-start indicator line"),this.decorate(t,!1),this.doc&&(yield this.doc),this.doc=t,this.atDirectives=!1;break}case"byte-order-mark":case"space":break;case"comment":case"newline":this.prelude.push(e.source);break;case"error":{let t=e.source?`${e.message}: ${JSON.stringify(e.source)}`:e.message,r=new Wn.YAMLParseError(Gn(e),"UNEXPECTED_TOKEN",t);this.atDirectives||!this.doc?this.errors.push(r):this.doc.errors.push(r);break}case"doc-end":{if(!this.doc){let r="Unexpected doc-end without preceding document";this.errors.push(new Wn.YAMLParseError(Gn(e),"UNEXPECTED_TOKEN",r));break}this.doc.directives.docEnd=!0;let t=gv.resolveEnd(e.end,e.offset+e.source.length,this.doc.options.strict,this.onError);if(this.decorate(this.doc,!0),t.comment){let r=this.doc.comment;this.doc.comment=r?`${r}
${t.comment}`:t.comment}this.doc.range[2]=t.offset;break}default:this.errors.push(new Wn.YAMLParseError(Gn(e),"UNEXPECTED_TOKEN",`Unsupported token ${e.type}`))}}*end(e=!1,t=-1){if(this.doc)this.decorate(this.doc,!0),yield this.doc,this.doc=null;else if(e){let r=Object.assign({_directives:this.directives},this.options),i=new _v.Document(void 0,r);this.atDirectives&&this.onError(t,"MISSING_CHAR","Missing directives-end indicator line"),i.range=[0,t,t],this.decorate(i,!1),yield i}}};gm.Composer=Qa});var Tm=_(Gi=>{"use strict";var yv=Ka(),Ev=Ja(),Tv=Un(),ym=Rn();function Lv(n,e=!0,t){if(n){let r=(i,s,o)=>{let a=typeof i=="number"?i:Array.isArray(i)?i[0]:i.offset;if(t)t(a,s,o);else throw new Tv.YAMLParseError([a,a+1],s,o)};switch(n.type){case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return Ev.resolveFlowScalar(n,e,r);case"block-scalar":return yv.resolveBlockScalar(n,e,r)}}return null}function Av(n,e){let{implicitKey:t=!1,indent:r,inFlow:i=!1,offset:s=-1,type:o="PLAIN"}=e,a=ym.stringifyString({type:o,value:n},{implicitKey:t,indent:r>0?" ".repeat(r):"",inFlow:i,options:{blockQuote:!0,lineWidth:-1}}),l=e.end??[{type:"newline",offset:-1,indent:r,source:`
`}];switch(a[0]){case"|":case">":{let c=a.indexOf(`
`),u=a.substring(0,c),f=a.substring(c+1)+`
`,d=[{type:"block-scalar-header",offset:s,indent:r,source:u}];return Em(d,l)||d.push({type:"newline",offset:-1,indent:r,source:`
`}),{type:"block-scalar",offset:s,indent:r,props:d,source:f}}case'"':return{type:"double-quoted-scalar",offset:s,indent:r,source:a,end:l};case"'":return{type:"single-quoted-scalar",offset:s,indent:r,source:a,end:l};default:return{type:"scalar",offset:s,indent:r,source:a,end:l}}}function Sv(n,e,t={}){let{afterKey:r=!1,implicitKey:i=!1,inFlow:s=!1,type:o}=t,a="indent"in n?n.indent:null;if(r&&typeof a=="number"&&(a+=2),!o)switch(n.type){case"single-quoted-scalar":o="QUOTE_SINGLE";break;case"double-quoted-scalar":o="QUOTE_DOUBLE";break;case"block-scalar":{let c=n.props[0];if(c.type!=="block-scalar-header")throw new Error("Invalid block scalar header");o=c.source[0]===">"?"BLOCK_FOLDED":"BLOCK_LITERAL";break}default:o="PLAIN"}let l=ym.stringifyString({type:o,value:e},{implicitKey:i||a===null,indent:a!==null&&a>0?" ".repeat(a):"",inFlow:s,options:{blockQuote:!0,lineWidth:-1}});switch(l[0]){case"|":case">":Iv(n,l);break;case'"':el(n,l,"double-quoted-scalar");break;case"'":el(n,l,"single-quoted-scalar");break;default:el(n,l,"scalar")}}function Iv(n,e){let t=e.indexOf(`
`),r=e.substring(0,t),i=e.substring(t+1)+`
`;if(n.type==="block-scalar"){let s=n.props[0];if(s.type!=="block-scalar-header")throw new Error("Invalid block scalar header");s.source=r,n.source=i}else{let{offset:s}=n,o="indent"in n?n.indent:-1,a=[{type:"block-scalar-header",offset:s,indent:o,source:r}];Em(a,"end"in n?n.end:void 0)||a.push({type:"newline",offset:-1,indent:o,source:`
`});for(let l of Object.keys(n))l!=="type"&&l!=="offset"&&delete n[l];Object.assign(n,{type:"block-scalar",indent:o,props:a,source:i})}}function Em(n,e){if(e)for(let t of e)switch(t.type){case"space":case"comment":n.push(t);break;case"newline":return n.push(t),!0}return!1}function el(n,e,t){switch(n.type){case"scalar":case"double-quoted-scalar":case"single-quoted-scalar":n.type=t,n.source=e;break;case"block-scalar":{let r=n.props.slice(1),i=e.length;n.props[0].type==="block-scalar-header"&&(i-=n.props[0].source.length);for(let s of r)s.offset+=i;delete n.props,Object.assign(n,{type:t,source:e,end:r});break}case"block-map":case"block-seq":{let i={type:"newline",offset:n.offset+e.length,indent:n.indent,source:`
`};delete n.items,Object.assign(n,{type:t,source:e,end:[i]});break}default:{let r="indent"in n?n.indent:-1,i="end"in n&&Array.isArray(n.end)?n.end.filter(s=>s.type==="space"||s.type==="comment"||s.type==="newline"):[];for(let s of Object.keys(n))s!=="type"&&s!=="offset"&&delete n[s];Object.assign(n,{type:t,indent:r,source:e,end:i})}}}Gi.createScalarToken=Av;Gi.resolveAsScalar=Lv;Gi.setScalarValue=Sv});var Am=_(Lm=>{"use strict";var wv=n=>"type"in n?Yi(n):Ki(n);function Yi(n){switch(n.type){case"block-scalar":{let e="";for(let t of n.props)e+=Yi(t);return e+n.source}case"block-map":case"block-seq":{let e="";for(let t of n.items)e+=Ki(t);return e}case"flow-collection":{let e=n.start.source;for(let t of n.items)e+=Ki(t);for(let t of n.end)e+=t.source;return e}case"document":{let e=Ki(n);if(n.end)for(let t of n.end)e+=t.source;return e}default:{let e=n.source;if("end"in n&&n.end)for(let t of n.end)e+=t.source;return e}}}function Ki({start:n,key:e,sep:t,value:r}){let i="";for(let s of n)i+=s.source;if(e&&(i+=Yi(e)),t)for(let s of t)i+=s.source;return r&&(i+=Yi(r)),i}Lm.stringify=wv});var vm=_(wm=>{"use strict";var tl=Symbol("break visit"),vv=Symbol("skip children"),Sm=Symbol("remove item");function It(n,e){"type"in n&&n.type==="document"&&(n={start:n.start,value:n.value}),Im(Object.freeze([]),n,e)}It.BREAK=tl;It.SKIP=vv;It.REMOVE=Sm;It.itemAtPath=(n,e)=>{let t=n;for(let[r,i]of e){let s=t?.[r];if(s&&"items"in s)t=s.items[i];else return}return t};It.parentCollection=(n,e)=>{let t=It.itemAtPath(n,e.slice(0,-1)),r=e[e.length-1][0],i=t?.[r];if(i&&"items"in i)return i;throw new Error("Parent collection not found")};function Im(n,e,t){let r=t(e,n);if(typeof r=="symbol")return r;for(let i of["key","value"]){let s=e[i];if(s&&"items"in s){for(let o=0;o<s.items.length;++o){let a=Im(Object.freeze(n.concat([[i,o]])),s.items[o],t);if(typeof a=="number")o=a-1;else{if(a===tl)return tl;a===Sm&&(s.items.splice(o,1),o-=1)}}typeof r=="function"&&i==="key"&&(r=r(e,n))}}return typeof r=="function"?r(e,n):r}wm.visit=It});var Ji=_(Re=>{"use strict";var nl=Tm(),bv=Am(),Nv=vm(),rl="\uFEFF",il="",sl="",ol="",Ov=n=>!!n&&"items"in n,Rv=n=>!!n&&(n.type==="scalar"||n.type==="single-quoted-scalar"||n.type==="double-quoted-scalar"||n.type==="block-scalar");function Cv(n){switch(n){case rl:return"<BOM>";case il:return"<DOC>";case sl:return"<FLOW_END>";case ol:return"<SCALAR>";default:return JSON.stringify(n)}}function kv(n){switch(n){case rl:return"byte-order-mark";case il:return"doc-mode";case sl:return"flow-error-end";case ol:return"scalar";case"---":return"doc-start";case"...":return"doc-end";case"":case`
`:case`\r
`:return"newline";case"-":return"seq-item-ind";case"?":return"explicit-key-ind";case":":return"map-value-ind";case"{":return"flow-map-start";case"}":return"flow-map-end";case"[":return"flow-seq-start";case"]":return"flow-seq-end";case",":return"comma"}switch(n[0]){case" ":case"	":return"space";case"#":return"comment";case"%":return"directive-line";case"*":return"alias";case"&":return"anchor";case"!":return"tag";case"'":return"single-quoted-scalar";case'"':return"double-quoted-scalar";case"|":case">":return"block-scalar-header"}return null}Re.createScalarToken=nl.createScalarToken;Re.resolveAsScalar=nl.resolveAsScalar;Re.setScalarValue=nl.setScalarValue;Re.stringify=bv.stringify;Re.visit=Nv.visit;Re.BOM=rl;Re.DOCUMENT=il;Re.FLOW_END=sl;Re.SCALAR=ol;Re.isCollection=Ov;Re.isScalar=Rv;Re.prettyToken=Cv;Re.tokenType=kv});var ul=_(Nm=>{"use strict";var Kn=Ji();function Me(n){switch(n){case void 0:case" ":case`
`:case"\r":case"	":return!0;default:return!1}}var bm="0123456789ABCDEFabcdef".split(""),Pv="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()".split(""),al=",[]{}".split(""),$v=` ,[]{}
\r	`.split(""),ll=n=>!n||$v.includes(n),cl=class{constructor(){this.atEnd=!1,this.blockScalarIndent=-1,this.blockScalarKeep=!1,this.buffer="",this.flowKey=!1,this.flowLevel=0,this.indentNext=0,this.indentValue=0,this.lineEndPos=null,this.next=null,this.pos=0}*lex(e,t=!1){e&&(this.buffer=this.buffer?this.buffer+e:e,this.lineEndPos=null),this.atEnd=!t;let r=this.next??"stream";for(;r&&(t||this.hasChars(1));)r=yield*this.parseNext(r)}atLineEnd(){let e=this.pos,t=this.buffer[e];for(;t===" "||t==="	";)t=this.buffer[++e];return!t||t==="#"||t===`
`?!0:t==="\r"?this.buffer[e+1]===`
`:!1}charAt(e){return this.buffer[this.pos+e]}continueScalar(e){let t=this.buffer[e];if(this.indentNext>0){let r=0;for(;t===" ";)t=this.buffer[++r+e];if(t==="\r"){let i=this.buffer[r+e+1];if(i===`
`||!i&&!this.atEnd)return e+r+1}return t===`
`||r>=this.indentNext||!t&&!this.atEnd?e+r:-1}if(t==="-"||t==="."){let r=this.buffer.substr(e,3);if((r==="---"||r==="...")&&Me(this.buffer[e+3]))return-1}return e}getLine(){let e=this.lineEndPos;return(typeof e!="number"||e!==-1&&e<this.pos)&&(e=this.buffer.indexOf(`
`,this.pos),this.lineEndPos=e),e===-1?this.atEnd?this.buffer.substring(this.pos):null:(this.buffer[e-1]==="\r"&&(e-=1),this.buffer.substring(this.pos,e))}hasChars(e){return this.pos+e<=this.buffer.length}setNext(e){return this.buffer=this.buffer.substring(this.pos),this.pos=0,this.lineEndPos=null,this.next=e,null}peek(e){return this.buffer.substr(this.pos,e)}*parseNext(e){switch(e){case"stream":return yield*this.parseStream();case"line-start":return yield*this.parseLineStart();case"block-start":return yield*this.parseBlockStart();case"doc":return yield*this.parseDocument();case"flow":return yield*this.parseFlowCollection();case"quoted-scalar":return yield*this.parseQuotedScalar();case"block-scalar":return yield*this.parseBlockScalar();case"plain-scalar":return yield*this.parsePlainScalar()}}*parseStream(){let e=this.getLine();if(e===null)return this.setNext("stream");if(e[0]===Kn.BOM&&(yield*this.pushCount(1),e=e.substring(1)),e[0]==="%"){let t=e.length,r=e.indexOf("#");if(r!==-1){let s=e[r-1];(s===" "||s==="	")&&(t=r-1)}for(;;){let s=e[t-1];if(s===" "||s==="	")t-=1;else break}let i=(yield*this.pushCount(t))+(yield*this.pushSpaces(!0));return yield*this.pushCount(e.length-i),this.pushNewline(),"stream"}if(this.atLineEnd()){let t=yield*this.pushSpaces(!0);return yield*this.pushCount(e.length-t),yield*this.pushNewline(),"stream"}return yield Kn.DOCUMENT,yield*this.parseLineStart()}*parseLineStart(){let e=this.charAt(0);if(!e&&!this.atEnd)return this.setNext("line-start");if(e==="-"||e==="."){if(!this.atEnd&&!this.hasChars(4))return this.setNext("line-start");let t=this.peek(3);if(t==="---"&&Me(this.charAt(3)))return yield*this.pushCount(3),this.indentValue=0,this.indentNext=0,"doc";if(t==="..."&&Me(this.charAt(3)))return yield*this.pushCount(3),"stream"}return this.indentValue=yield*this.pushSpaces(!1),this.indentNext>this.indentValue&&!Me(this.charAt(1))&&(this.indentNext=this.indentValue),yield*this.parseBlockStart()}*parseBlockStart(){let[e,t]=this.peek(2);if(!t&&!this.atEnd)return this.setNext("block-start");if((e==="-"||e==="?"||e===":")&&Me(t)){let r=(yield*this.pushCount(1))+(yield*this.pushSpaces(!0));return this.indentNext=this.indentValue+1,this.indentValue+=r,yield*this.parseBlockStart()}return"doc"}*parseDocument(){yield*this.pushSpaces(!0);let e=this.getLine();if(e===null)return this.setNext("doc");let t=yield*this.pushIndicators();switch(e[t]){case"#":yield*this.pushCount(e.length-t);case void 0:return yield*this.pushNewline(),yield*this.parseLineStart();case"{":case"[":return yield*this.pushCount(1),this.flowKey=!1,this.flowLevel=1,"flow";case"}":case"]":return yield*this.pushCount(1),"doc";case"*":return yield*this.pushUntil(ll),"doc";case'"':case"'":return yield*this.parseQuotedScalar();case"|":case">":return t+=yield*this.parseBlockScalarHeader(),t+=yield*this.pushSpaces(!0),yield*this.pushCount(e.length-t),yield*this.pushNewline(),yield*this.parseBlockScalar();default:return yield*this.parsePlainScalar()}}*parseFlowCollection(){let e,t,r=-1;do e=yield*this.pushNewline(),e>0?(t=yield*this.pushSpaces(!1),this.indentValue=r=t):t=0,t+=yield*this.pushSpaces(!0);while(e+t>0);let i=this.getLine();if(i===null)return this.setNext("flow");if((r!==-1&&r<this.indentNext&&i[0]!=="#"||r===0&&(i.startsWith("---")||i.startsWith("..."))&&Me(i[3]))&&!(r===this.indentNext-1&&this.flowLevel===1&&(i[0]==="]"||i[0]==="}")))return this.flowLevel=0,yield Kn.FLOW_END,yield*this.parseLineStart();let s=0;for(;i[s]===",";)s+=yield*this.pushCount(1),s+=yield*this.pushSpaces(!0),this.flowKey=!1;switch(s+=yield*this.pushIndicators(),i[s]){case void 0:return"flow";case"#":return yield*this.pushCount(i.length-s),"flow";case"{":case"[":return yield*this.pushCount(1),this.flowKey=!1,this.flowLevel+=1,"flow";case"}":case"]":return yield*this.pushCount(1),this.flowKey=!0,this.flowLevel-=1,this.flowLevel?"flow":"doc";case"*":return yield*this.pushUntil(ll),"flow";case'"':case"'":return this.flowKey=!0,yield*this.parseQuotedScalar();case":":{let o=this.charAt(1);if(this.flowKey||Me(o)||o===",")return this.flowKey=!1,yield*this.pushCount(1),yield*this.pushSpaces(!0),"flow"}default:return this.flowKey=!1,yield*this.parsePlainScalar()}}*parseQuotedScalar(){let e=this.charAt(0),t=this.buffer.indexOf(e,this.pos+1);if(e==="'")for(;t!==-1&&this.buffer[t+1]==="'";)t=this.buffer.indexOf("'",t+2);else for(;t!==-1;){let s=0;for(;this.buffer[t-1-s]==="\\";)s+=1;if(s%2===0)break;t=this.buffer.indexOf('"',t+1)}let r=this.buffer.substring(0,t),i=r.indexOf(`
`,this.pos);if(i!==-1){for(;i!==-1;){let s=this.continueScalar(i+1);if(s===-1)break;i=r.indexOf(`
`,s)}i!==-1&&(t=i-(r[i-1]==="\r"?2:1))}if(t===-1){if(!this.atEnd)return this.setNext("quoted-scalar");t=this.buffer.length}return yield*this.pushToIndex(t+1,!1),this.flowLevel?"flow":"doc"}*parseBlockScalarHeader(){this.blockScalarIndent=-1,this.blockScalarKeep=!1;let e=this.pos;for(;;){let t=this.buffer[++e];if(t==="+")this.blockScalarKeep=!0;else if(t>"0"&&t<="9")this.blockScalarIndent=Number(t)-1;else if(t!=="-")break}return yield*this.pushUntil(t=>Me(t)||t==="#")}*parseBlockScalar(){let e=this.pos-1,t=0,r;e:for(let i=this.pos;r=this.buffer[i];++i)switch(r){case" ":t+=1;break;case`
`:e=i,t=0;break;case"\r":{let s=this.buffer[i+1];if(!s&&!this.atEnd)return this.setNext("block-scalar");if(s===`
`)break}default:break e}if(!r&&!this.atEnd)return this.setNext("block-scalar");if(t>=this.indentNext){this.blockScalarIndent===-1?this.indentNext=t:this.indentNext+=this.blockScalarIndent;do{let i=this.continueScalar(e+1);if(i===-1)break;e=this.buffer.indexOf(`
`,i)}while(e!==-1);if(e===-1){if(!this.atEnd)return this.setNext("block-scalar");e=this.buffer.length}}if(!this.blockScalarKeep)do{let i=e-1,s=this.buffer[i];s==="\r"&&(s=this.buffer[--i]);let o=i;for(;s===" "||s==="	";)s=this.buffer[--i];if(s===`
`&&i>=this.pos&&i+1+t>o)e=i;else break}while(!0);return yield Kn.SCALAR,yield*this.pushToIndex(e+1,!0),yield*this.parseLineStart()}*parsePlainScalar(){let e=this.flowLevel>0,t=this.pos-1,r=this.pos-1,i;for(;i=this.buffer[++r];)if(i===":"){let s=this.buffer[r+1];if(Me(s)||e&&s===",")break;t=r}else if(Me(i)){let s=this.buffer[r+1];if(i==="\r"&&(s===`
`?(r+=1,i=`
`,s=this.buffer[r+1]):t=r),s==="#"||e&&al.includes(s))break;if(i===`
`){let o=this.continueScalar(r+1);if(o===-1)break;r=Math.max(r,o-2)}}else{if(e&&al.includes(i))break;t=r}return!i&&!this.atEnd?this.setNext("plain-scalar"):(yield Kn.SCALAR,yield*this.pushToIndex(t+1,!0),e?"flow":"doc")}*pushCount(e){return e>0?(yield this.buffer.substr(this.pos,e),this.pos+=e,e):0}*pushToIndex(e,t){let r=this.buffer.slice(this.pos,e);return r?(yield r,this.pos+=r.length,r.length):(t&&(yield""),0)}*pushIndicators(){switch(this.charAt(0)){case"!":return(yield*this.pushTag())+(yield*this.pushSpaces(!0))+(yield*this.pushIndicators());case"&":return(yield*this.pushUntil(ll))+(yield*this.pushSpaces(!0))+(yield*this.pushIndicators());case"-":case"?":case":":{let e=this.flowLevel>0,t=this.charAt(1);if(Me(t)||e&&al.includes(t))return e?this.flowKey&&(this.flowKey=!1):this.indentNext=this.indentValue+1,(yield*this.pushCount(1))+(yield*this.pushSpaces(!0))+(yield*this.pushIndicators())}}return 0}*pushTag(){if(this.charAt(1)==="<"){let e=this.pos+2,t=this.buffer[e];for(;!Me(t)&&t!==">";)t=this.buffer[++e];return yield*this.pushToIndex(t===">"?e+1:e,!1)}else{let e=this.pos+1,t=this.buffer[e];for(;t;)if(Pv.includes(t))t=this.buffer[++e];else if(t==="%"&&bm.includes(this.buffer[e+1])&&bm.includes(this.buffer[e+2]))t=this.buffer[e+=3];else break;return yield*this.pushToIndex(e,!1)}}*pushNewline(){let e=this.buffer[this.pos];return e===`
`?yield*this.pushCount(1):e==="\r"&&this.charAt(1)===`
`?yield*this.pushCount(2):0}*pushSpaces(e){let t=this.pos-1,r;do r=this.buffer[++t];while(r===" "||e&&r==="	");let i=t-this.pos;return i>0&&(yield this.buffer.substr(this.pos,i),this.pos=t),i}*pushUntil(e){let t=this.pos,r=this.buffer[t];for(;!e(r);)r=this.buffer[++t];return yield*this.pushToIndex(t,!1)}};Nm.Lexer=cl});var hl=_(Om=>{"use strict";var fl=class{constructor(){this.lineStarts=[],this.addNewLine=e=>this.lineStarts.push(e),this.linePos=e=>{let t=0,r=this.lineStarts.length;for(;t<r;){let s=t+r>>1;this.lineStarts[s]<e?t=s+1:r=s}if(this.lineStarts[t]===e)return{line:t+1,col:1};if(t===0)return{line:0,col:e};let i=this.lineStarts[t-1];return{line:t,col:e-i+1}}}};Om.LineCounter=fl});var pl=_($m=>{"use strict";var Rm=Ji(),qv=ul();function Be(n,e){for(let t=0;t<n.length;++t)if(n[t].type===e)return!0;return!1}function Cm(n){for(let e=0;e<n.length;++e)switch(n[e].type){case"space":case"comment":case"newline":break;default:return e}return-1}function Pm(n){switch(n?.type){case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":case"flow-collection":return!0;default:return!1}}function Xi(n){switch(n.type){case"document":return n.start;case"block-map":{let e=n.items[n.items.length-1];return e.sep??e.start}case"block-seq":return n.items[n.items.length-1].start;default:return[]}}function Xt(n){if(n.length===0)return[];let e=n.length;e:for(;--e>=0;)switch(n[e].type){case"doc-start":case"explicit-key-ind":case"map-value-ind":case"seq-item-ind":case"newline":break e}for(;n[++e]?.type==="space";);return n.splice(e,n.length)}function km(n){if(n.start.type==="flow-seq-start")for(let e of n.items)e.sep&&!e.value&&!Be(e.start,"explicit-key-ind")&&!Be(e.sep,"map-value-ind")&&(e.key&&(e.value=e.key),delete e.key,Pm(e.value)?e.value.end?Array.prototype.push.apply(e.value.end,e.sep):e.value.end=e.sep:Array.prototype.push.apply(e.start,e.sep),delete e.sep)}var dl=class{constructor(e){this.atNewLine=!0,this.atScalar=!1,this.indent=0,this.offset=0,this.onKeyLine=!1,this.stack=[],this.source="",this.type="",this.lexer=new qv.Lexer,this.onNewLine=e}*parse(e,t=!1){this.onNewLine&&this.offset===0&&this.onNewLine(0);for(let r of this.lexer.lex(e,t))yield*this.next(r);t||(yield*this.end())}*next(e){if(this.source=e,process.env.LOG_TOKENS&&console.log("|",Rm.prettyToken(e)),this.atScalar){this.atScalar=!1,yield*this.step(),this.offset+=e.length;return}let t=Rm.tokenType(e);if(t)if(t==="scalar")this.atNewLine=!1,this.atScalar=!0,this.type="scalar";else{switch(this.type=t,yield*this.step(),t){case"newline":this.atNewLine=!0,this.indent=0,this.onNewLine&&this.onNewLine(this.offset+e.length);break;case"space":this.atNewLine&&e[0]===" "&&(this.indent+=e.length);break;case"explicit-key-ind":case"map-value-ind":case"seq-item-ind":this.atNewLine&&(this.indent+=e.length);break;case"doc-mode":case"flow-error-end":return;default:this.atNewLine=!1}this.offset+=e.length}else{let r=`Not a YAML token: ${e}`;yield*this.pop({type:"error",offset:this.offset,message:r,source:e}),this.offset+=e.length}}*end(){for(;this.stack.length>0;)yield*this.pop()}get sourceToken(){return{type:this.type,offset:this.offset,indent:this.indent,source:this.source}}*step(){let e=this.peek(1);if(this.type==="doc-end"&&(!e||e.type!=="doc-end")){for(;this.stack.length>0;)yield*this.pop();this.stack.push({type:"doc-end",offset:this.offset,source:this.source});return}if(!e)return yield*this.stream();switch(e.type){case"document":return yield*this.document(e);case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return yield*this.scalar(e);case"block-scalar":return yield*this.blockScalar(e);case"block-map":return yield*this.blockMap(e);case"block-seq":return yield*this.blockSequence(e);case"flow-collection":return yield*this.flowCollection(e);case"doc-end":return yield*this.documentEnd(e)}yield*this.pop()}peek(e){return this.stack[this.stack.length-e]}*pop(e){let t=e??this.stack.pop();if(t)if(this.stack.length===0)yield t;else{let r=this.peek(1);switch(t.type==="block-scalar"?t.indent="indent"in r?r.indent:0:t.type==="flow-collection"&&r.type==="document"&&(t.indent=0),t.type==="flow-collection"&&km(t),r.type){case"document":r.value=t;break;case"block-scalar":r.props.push(t);break;case"block-map":{let i=r.items[r.items.length-1];if(i.value){r.items.push({start:[],key:t,sep:[]}),this.onKeyLine=!0;return}else if(i.sep)i.value=t;else{Object.assign(i,{key:t,sep:[]}),this.onKeyLine=!Be(i.start,"explicit-key-ind");return}break}case"block-seq":{let i=r.items[r.items.length-1];i.value?r.items.push({start:[],value:t}):i.value=t;break}case"flow-collection":{let i=r.items[r.items.length-1];!i||i.value?r.items.push({start:[],key:t,sep:[]}):i.sep?i.value=t:Object.assign(i,{key:t,sep:[]});return}default:yield*this.pop(),yield*this.pop(t)}if((r.type==="document"||r.type==="block-map"||r.type==="block-seq")&&(t.type==="block-map"||t.type==="block-seq")){let i=t.items[t.items.length-1];i&&!i.sep&&!i.value&&i.start.length>0&&Cm(i.start)===-1&&(t.indent===0||i.start.every(s=>s.type!=="comment"||s.indent<t.indent))&&(r.type==="document"?r.end=i.start:r.items.push({start:i.start}),t.items.splice(-1,1))}}else{let r="Tried to pop an empty stack";yield{type:"error",offset:this.offset,source:"",message:r}}}*stream(){switch(this.type){case"directive-line":yield{type:"directive",offset:this.offset,source:this.source};return;case"byte-order-mark":case"space":case"comment":case"newline":yield this.sourceToken;return;case"doc-mode":case"doc-start":{let e={type:"document",offset:this.offset,start:[]};this.type==="doc-start"&&e.start.push(this.sourceToken),this.stack.push(e);return}}yield{type:"error",offset:this.offset,message:`Unexpected ${this.type} token in YAML stream`,source:this.source}}*document(e){if(e.value)return yield*this.lineEnd(e);switch(this.type){case"doc-start":{Cm(e.start)!==-1?(yield*this.pop(),yield*this.step()):e.start.push(this.sourceToken);return}case"anchor":case"tag":case"space":case"comment":case"newline":e.start.push(this.sourceToken);return}let t=this.startBlockValue(e);t?this.stack.push(t):yield{type:"error",offset:this.offset,message:`Unexpected ${this.type} token in YAML document`,source:this.source}}*scalar(e){if(this.type==="map-value-ind"){let t=Xi(this.peek(2)),r=Xt(t),i;e.end?(i=e.end,i.push(this.sourceToken),delete e.end):i=[this.sourceToken];let s={type:"block-map",offset:e.offset,indent:e.indent,items:[{start:r,key:e,sep:i}]};this.onKeyLine=!0,this.stack[this.stack.length-1]=s}else yield*this.lineEnd(e)}*blockScalar(e){switch(this.type){case"space":case"comment":case"newline":e.props.push(this.sourceToken);return;case"scalar":if(e.source=this.source,this.atNewLine=!0,this.indent=0,this.onNewLine){let t=this.source.indexOf(`
`)+1;for(;t!==0;)this.onNewLine(this.offset+t),t=this.source.indexOf(`
`,t)+1}yield*this.pop();break;default:yield*this.pop(),yield*this.step()}}*blockMap(e){let t=e.items[e.items.length-1];switch(this.type){case"newline":if(this.onKeyLine=!1,t.value){let r="end"in t.value?t.value.end:void 0;(Array.isArray(r)?r[r.length-1]:void 0)?.type==="comment"?r?.push(this.sourceToken):e.items.push({start:[this.sourceToken]})}else t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"space":case"comment":if(t.value)e.items.push({start:[this.sourceToken]});else if(t.sep)t.sep.push(this.sourceToken);else{if(this.atIndentedComment(t.start,e.indent)){let i=e.items[e.items.length-2]?.value?.end;if(Array.isArray(i)){Array.prototype.push.apply(i,t.start),i.push(this.sourceToken),e.items.pop();return}}t.start.push(this.sourceToken)}return}if(this.indent>=e.indent){let r=!this.onKeyLine&&this.indent===e.indent&&t.sep,i=[];if(r&&t.sep&&!t.value){let s=[];for(let o=0;o<t.sep.length;++o){let a=t.sep[o];switch(a.type){case"newline":s.push(o);break;case"space":break;case"comment":a.indent>e.indent&&(s.length=0);break;default:s.length=0}}s.length>=2&&(i=t.sep.splice(s[1]))}switch(this.type){case"anchor":case"tag":r||t.value?(i.push(this.sourceToken),e.items.push({start:i}),this.onKeyLine=!0):t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"explicit-key-ind":!t.sep&&!Be(t.start,"explicit-key-ind")?t.start.push(this.sourceToken):r||t.value?(i.push(this.sourceToken),e.items.push({start:i})):this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:[this.sourceToken]}]}),this.onKeyLine=!0;return;case"map-value-ind":if(Be(t.start,"explicit-key-ind"))if(t.sep)if(t.value)e.items.push({start:[],key:null,sep:[this.sourceToken]});else if(Be(t.sep,"map-value-ind"))this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:i,key:null,sep:[this.sourceToken]}]});else if(Pm(t.key)&&!Be(t.sep,"newline")){let s=Xt(t.start),o=t.key,a=t.sep;a.push(this.sourceToken),delete t.key,delete t.sep,this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:s,key:o,sep:a}]})}else i.length>0?t.sep=t.sep.concat(i,this.sourceToken):t.sep.push(this.sourceToken);else if(Be(t.start,"newline"))Object.assign(t,{key:null,sep:[this.sourceToken]});else{let s=Xt(t.start);this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:s,key:null,sep:[this.sourceToken]}]})}else t.sep?t.value||r?e.items.push({start:i,key:null,sep:[this.sourceToken]}):Be(t.sep,"map-value-ind")?this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:[],key:null,sep:[this.sourceToken]}]}):t.sep.push(this.sourceToken):Object.assign(t,{key:null,sep:[this.sourceToken]});this.onKeyLine=!0;return;case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":{let s=this.flowScalar(this.type);r||t.value?(e.items.push({start:i,key:s,sep:[]}),this.onKeyLine=!0):t.sep?this.stack.push(s):(Object.assign(t,{key:s,sep:[]}),this.onKeyLine=!0);return}default:{let s=this.startBlockValue(e);if(s){r&&s.type!=="block-seq"&&Be(t.start,"explicit-key-ind")&&e.items.push({start:i}),this.stack.push(s);return}}}}yield*this.pop(),yield*this.step()}*blockSequence(e){let t=e.items[e.items.length-1];switch(this.type){case"newline":if(t.value){let r="end"in t.value?t.value.end:void 0;(Array.isArray(r)?r[r.length-1]:void 0)?.type==="comment"?r?.push(this.sourceToken):e.items.push({start:[this.sourceToken]})}else t.start.push(this.sourceToken);return;case"space":case"comment":if(t.value)e.items.push({start:[this.sourceToken]});else{if(this.atIndentedComment(t.start,e.indent)){let i=e.items[e.items.length-2]?.value?.end;if(Array.isArray(i)){Array.prototype.push.apply(i,t.start),i.push(this.sourceToken),e.items.pop();return}}t.start.push(this.sourceToken)}return;case"anchor":case"tag":if(t.value||this.indent<=e.indent)break;t.start.push(this.sourceToken);return;case"seq-item-ind":if(this.indent!==e.indent)break;t.value||Be(t.start,"seq-item-ind")?e.items.push({start:[this.sourceToken]}):t.start.push(this.sourceToken);return}if(this.indent>e.indent){let r=this.startBlockValue(e);if(r){this.stack.push(r);return}}yield*this.pop(),yield*this.step()}*flowCollection(e){let t=e.items[e.items.length-1];if(this.type==="flow-error-end"){let r;do yield*this.pop(),r=this.peek(1);while(r&&r.type==="flow-collection")}else if(e.end.length===0){switch(this.type){case"comma":case"explicit-key-ind":!t||t.sep?e.items.push({start:[this.sourceToken]}):t.start.push(this.sourceToken);return;case"map-value-ind":!t||t.value?e.items.push({start:[],key:null,sep:[this.sourceToken]}):t.sep?t.sep.push(this.sourceToken):Object.assign(t,{key:null,sep:[this.sourceToken]});return;case"space":case"comment":case"newline":case"anchor":case"tag":!t||t.value?e.items.push({start:[this.sourceToken]}):t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":{let i=this.flowScalar(this.type);!t||t.value?e.items.push({start:[],key:i,sep:[]}):t.sep?this.stack.push(i):Object.assign(t,{key:i,sep:[]});return}case"flow-map-end":case"flow-seq-end":e.end.push(this.sourceToken);return}let r=this.startBlockValue(e);r?this.stack.push(r):(yield*this.pop(),yield*this.step())}else{let r=this.peek(2);if(r.type==="block-map"&&(this.type==="map-value-ind"&&r.indent===e.indent||this.type==="newline"&&!r.items[r.items.length-1].sep))yield*this.pop(),yield*this.step();else if(this.type==="map-value-ind"&&r.type!=="flow-collection"){let i=Xi(r),s=Xt(i);km(e);let o=e.end.splice(1,e.end.length);o.push(this.sourceToken);let a={type:"block-map",offset:e.offset,indent:e.indent,items:[{start:s,key:e,sep:o}]};this.onKeyLine=!0,this.stack[this.stack.length-1]=a}else yield*this.lineEnd(e)}}flowScalar(e){if(this.onNewLine){let t=this.source.indexOf(`
`)+1;for(;t!==0;)this.onNewLine(this.offset+t),t=this.source.indexOf(`
`,t)+1}return{type:e,offset:this.offset,indent:this.indent,source:this.source}}startBlockValue(e){switch(this.type){case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return this.flowScalar(this.type);case"block-scalar-header":return{type:"block-scalar",offset:this.offset,indent:this.indent,props:[this.sourceToken],source:""};case"flow-map-start":case"flow-seq-start":return{type:"flow-collection",offset:this.offset,indent:this.indent,start:this.sourceToken,items:[],end:[]};case"seq-item-ind":return{type:"block-seq",offset:this.offset,indent:this.indent,items:[{start:[this.sourceToken]}]};case"explicit-key-ind":{this.onKeyLine=!0;let t=Xi(e),r=Xt(t);return r.push(this.sourceToken),{type:"block-map",offset:this.offset,indent:this.indent,items:[{start:r}]}}case"map-value-ind":{this.onKeyLine=!0;let t=Xi(e),r=Xt(t);return{type:"block-map",offset:this.offset,indent:this.indent,items:[{start:r,key:null,sep:[this.sourceToken]}]}}}return null}atIndentedComment(e,t){return this.type!=="comment"||this.indent<=t?!1:e.every(r=>r.type==="newline"||r.type==="space")}*documentEnd(e){this.type!=="doc-mode"&&(e.end?e.end.push(this.sourceToken):e.end=[this.sourceToken],this.type==="newline"&&(yield*this.pop()))}*lineEnd(e){switch(this.type){case"comma":case"doc-start":case"doc-end":case"flow-seq-end":case"flow-map-end":case"map-value-ind":yield*this.pop(),yield*this.step();break;case"newline":this.onKeyLine=!1;case"space":case"comment":default:e.end?e.end.push(this.sourceToken):e.end=[this.sourceToken],this.type==="newline"&&(yield*this.pop())}}};$m.Parser=dl});var Fm=_(Jn=>{"use strict";var qm=Za(),xv=jn(),Yn=Un(),Mv=zo(),Dv=hl(),xm=pl();function Mm(n){let e=n.prettyErrors!==!1;return{lineCounter:n.lineCounter||e&&new Dv.LineCounter||null,prettyErrors:e}}function Fv(n,e={}){let{lineCounter:t,prettyErrors:r}=Mm(e),i=new xm.Parser(t?.addNewLine),s=new qm.Composer(e),o=Array.from(s.compose(i.parse(n)));if(r&&t)for(let a of o)a.errors.forEach(Yn.prettifyError(n,t)),a.warnings.forEach(Yn.prettifyError(n,t));return o.length>0?o:Object.assign([],{empty:!0},s.streamInfo())}function Dm(n,e={}){let{lineCounter:t,prettyErrors:r}=Mm(e),i=new xm.Parser(t?.addNewLine),s=new qm.Composer(e),o=null;for(let a of s.compose(i.parse(n),!0,n.length))if(!o)o=a;else if(o.options.logLevel!=="silent"){o.errors.push(new Yn.YAMLParseError(a.range.slice(0,2),"MULTIPLE_DOCS","Source contains multiple documents; please use YAML.parseAllDocuments()"));break}return r&&t&&(o.errors.forEach(Yn.prettifyError(n,t)),o.warnings.forEach(Yn.prettifyError(n,t))),o}function jv(n,e,t){let r;typeof e=="function"?r=e:t===void 0&&e&&typeof e=="object"&&(t=e);let i=Dm(n,t);if(!i)return null;if(i.warnings.forEach(s=>Mv.warn(i.options.logLevel,s)),i.errors.length>0){if(i.options.logLevel!=="silent")throw i.errors[0];i.errors=[]}return i.toJS(Object.assign({reviver:r},t))}function Hv(n,e,t){let r=null;if(typeof e=="function"||Array.isArray(e)?r=e:t===void 0&&e&&(t=e),typeof t=="string"&&(t=t.length),typeof t=="number"){let i=Math.round(t);t=i<1?void 0:i>8?{indent:8}:{indent:i}}if(n===void 0){let{keepUndefined:i}=t??e??{};if(!i)return}return new xv.Document(n,r,t).toString(t)}Jn.parse=jv;Jn.parseAllDocuments=Fv;Jn.parseDocument=Dm;Jn.stringify=Hv});var Hm=_(J=>{"use strict";var Bv=Za(),Uv=jn(),Vv=Pa(),_l=Un(),Wv=In(),_t=W(),Gv=ft(),Kv=ce(),Yv=dt(),Jv=pt(),Xv=Ji(),zv=ul(),Qv=hl(),Zv=pl(),zi=Fm(),jm=Tn();J.Composer=Bv.Composer;J.Document=Uv.Document;J.Schema=Vv.Schema;J.YAMLError=_l.YAMLError;J.YAMLParseError=_l.YAMLParseError;J.YAMLWarning=_l.YAMLWarning;J.Alias=Wv.Alias;J.isAlias=_t.isAlias;J.isCollection=_t.isCollection;J.isDocument=_t.isDocument;J.isMap=_t.isMap;J.isNode=_t.isNode;J.isPair=_t.isPair;J.isScalar=_t.isScalar;J.isSeq=_t.isSeq;J.Pair=Gv.Pair;J.Scalar=Kv.Scalar;J.YAMLMap=Yv.YAMLMap;J.YAMLSeq=Jv.YAMLSeq;J.CST=Xv;J.Lexer=zv.Lexer;J.LineCounter=Qv.LineCounter;J.Parser=Zv.Parser;J.parse=zi.parse;J.parseAllDocuments=zi.parseAllDocuments;J.parseDocument=zi.parseDocument;J.stringify=zi.stringify;J.visit=jm.visit;J.visitAsync=jm.visitAsync});var Vm=_((cR,nb)=>{nb.exports={name:"teamsfx-sample-validator",version:"1.0.0",description:"",main:"validator.cjs",bin:{"teamsfx-sample-validator":"validator.cjs"},scripts:{build:"esbuild src/index.ts --bundle --minify --outfile=validator.cjs --platform=node",test:"jest"},keywords:[],author:"",license:"ISC",dependencies:{chalk:"^4.1.2",commander:"^11.0.0","compare-versions":"^6.1.0",figlet:"^1.6.0","fs-extra":"^11.1.1","image-size":"^1.0.2",semver:"^7.7.2",yaml:"^2.3.1"},devDependencies:{"@types/figlet":"^1.5.6","@types/fs-extra":"^11.0.1","@types/jest":"^29.5.3","@types/mock-fs":"^4.13.1","@types/node":"^20.4.2","@types/semver":"^7.7.0",dotenv:"^16.3.1",esbuild:"^0.19.2",jest:"^29.6.1","mock-fs":"^5.2.0","ts-jest":"^29.1.1",typescript:"^5.1.6"}}});var $l=oe(Pl(),1),{program:db,createCommand:pb,createArgument:_b,createOption:mb,CommanderError:gb,InvalidArgumentError:yb,InvalidOptionArgumentError:Eb,Command:ql,Argument:Tb,Option:Lb,Help:Ab}=$l.default;var Qi=oe(Dl());var Fl=`flf2a$ 6 5 16 15 13 0 24463 229
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
         `;var cr=oe(yc()),jg=cr.default.green,Hg=cr.default.yellow,Bg=cr.default.bold.red;function Ec(n){let e=jg(`${n.passed.length} validation passed`),t=Bg(`${n.failed.length} validation failed`),r=n.warning.length>0?Hg(`${n.warning.length} warning(s)`):void 0;n.failed.length===0?console.log(`\u2705[${n.name}] ${e}${r?`, ${r}`:""}.`):(console.log(`\u274C[${n.name}] ${t}${r?`, ${r}`:""}, ${e}.`),console.log(n.failed.map(i=>`  \u274C ${i}`).join(`
`))),n.warning.length>0&&console.log(n.warning.map(i=>`  \u26A0\uFE0F ${i}`).join(`
`)),n.passed.length>0&&console.log(n.passed.map(i=>`  \u2705 ${i}`).join(`
`))}var Sf=oe(Ic()),Us=oe(it()),Vs=oe(require("path"));var Lr=oe(it()),$t=oe(require("path"));async function fE(n){let e=$t.default.basename(n),t=[$t.default.join(n,"..",".config","samples-config-v3.json"),$t.default.join(n,".config","samples-config-v3.json")];for(let r of t)if(await Lr.default.exists(r))try{let s=(await Lr.default.readJson(r)).samples.find(o=>o.id===e);if(s&&s.tags)return s.tags.includes("C#")}catch{}return!1}async function Ue(n){let e=await fE(n),t=$t.default.join(n,"M365Agent"),r=$t.default.join(t,"m365agents.yml"),i=await Lr.default.exists(r);return e||i?{projectType:"csharp",rootDir:n,agentDir:i?t:n,displayPrefix:i?"M365Agent/":""}:{projectType:"typescript",rootDir:n,agentDir:n,displayPrefix:""}}async function Ws(n){let e={name:"Env Files",passed:[],failed:[],warning:[]},t=await Ue(n),{agentDir:r,displayPrefix:i,projectType:s}=t,o=[".env.dev",".env.local"],a=!1;for(let l of o){let c=Vs.default.join(r,"env",l);if(!await Us.default.exists(c)){if(s==="csharp")continue;e.warning.push(`${i}${Vs.default.join("env",l)} does not exist.`);continue}a=!0;let u=await Us.default.readFile(c,"utf8"),f=Sf.default.parse(u),d=Object.entries(f).map(([y,g])=>({name:y,value:g})),h=!0;for(let y of d)y.name==="TEAMSFX_ENV"||y.name==="APP_NAME_SUFFIX"||y.name==="TEAMS_APP_NAME"||y.value!==""&&(e.failed.push(`${i}${l}: ${y.name} should NOT have value.`),h=!1);h&&e.passed.push(`${i}${l}: All environment variables are valid.`)}return s==="csharp"&&!a&&e.passed.push("C# project does not require env files."),e}var st=oe(it()),un=oe(require("path"));var hE=["appPackage"],dE=["appPackage/manifest.json","appPackage/color.png","appPackage/outline.png","m365agents.yml","m365agents.local.yml"],pE=["README.md"],_E=["env/.env.dev"],mE=["env",".vscode"];async function Gs(n,e){let t=un.default.join(n,e);return await st.default.exists(t)?(await st.default.stat(t)).isDirectory():!1}async function qt(n,e){let t=un.default.join(n,e);return await st.default.exists(t)?(await st.default.stat(t)).isFile():!1}async function Ar(n,e){return await st.default.exists(n)?(await st.default.readdir(n)).filter(r=>r.endsWith(e)):[]}async function Ks(n){let e={name:"Folder Structure",passed:[],failed:[],warning:[]},t=await Ue(n),{agentDir:r,rootDir:i,displayPrefix:s,projectType:o}=t;for(let a of hE){let l=s+a;await Gs(r,a)?e.passed.push(`Project has "${l}" folder.`):e.failed.push(`Project should have "${l}" folder.`)}for(let a of mE){let l=await Gs(r,a),c=await Gs(i,a);if(l||c){let u=l?s+a:a;e.passed.push(`Project has "${u}" folder.`)}else o==="typescript"&&e.failed.push(`Project should have "${a}" folder.`)}for(let a of dE){let l=s+a;await qt(r,a)?e.passed.push(`Project has "${l}" file.`):e.failed.push(`Project should have "${l}" file.`)}for(let a of pE)await qt(i,a)?e.passed.push(`Project has "${a}" file.`):e.failed.push(`Project should have "${a}" file.`);for(let a of _E){let l=await qt(r,a),c=await qt(i,a);if(l||c){let u=l?s+a:a;e.passed.push(`Project has "${u}" file.`)}else o==="typescript"&&e.failed.push(`Project should have "${a}" file.`)}if(o==="csharp"){let a=await Ar(i,".sln"),l=await Ar(i,".slnx");if(a.length>0||l.length>0){let g=a.length>0?a[0]:l[0];e.passed.push(`Project has solution file "${g}".`)}else e.failed.push("C# project should have a .sln or .slnx solution file.");let c=await Ar(i,".csproj"),u=c.length>0,f=c.length>0?c[0]:"",d=["M365Agent","TravelAgent","AzureAgentToM365ATK"];for(let g of d){let m=un.default.join(i,g);if(await st.default.exists(m)){let S=await Ar(m,".csproj");if(S.length>0){u=!0,f=`${g}/${S[0]}`;break}}}u?e.passed.push(`Project has .csproj file "${f}".`):e.failed.push("C# project should have a .csproj project file.");let h=await qt(i,"appsettings.json"),y="appsettings.json";if(!h)for(let g of d){let m=un.default.join(i,g);if(await qt(m,"appsettings.json")){h=!0,y=`${g}/appsettings.json`;break}}h?e.passed.push(`Project has "${y}" file.`):e.failed.push("C# project should have an appsettings.json file.")}return e}var lo=oe(it()),co=oe(require("path")),uo=oe(oh());async function fo(n){let e={name:"Image Files",passed:[],failed:[],warning:[]},t=["png","jpg","jpeg"],r=!1;for(let s of t){let o=co.default.join(n,"assets",`thumbnail.${s}`);if(await lo.default.exists(o)){r=!0;let a=(0,uo.default)(o);a.width&&a.height&&a.width/a.height===40/23?e.passed.push(`assets/thumbnail.${s} has 1600*920/800*460 resolution or same ratio.`):e.warning.push(`assets/thumbnail.${s} should have 1600*920/800*460 resolution or same ratio.`);break}}r||e.warning.push("assets/thumbnail.png (or .jpg) does not exist.");let i=co.default.join(n,"assets","sampleDemo.gif");if(await lo.default.exists(i)){let s=(0,uo.default)(i);s.width&&s.height&&s.width/s.height===40/23?e.passed.push("assets/sampleDemo.gif has 1600*920/800*460 resolution or same ratio."):e.warning.push("assets/sampleDemo.gif should have 1600*920/800*460 resolution or same ratio.")}else e.warning.push("assets/sampleDemo.gif does not exist.");return e}var ch=oe(lh()),ho=oe(it()),uh=oe(require("path"));async function po(n){let e={name:"package.json",passed:[],failed:[],warning:[]},t=await Ue(n),{projectType:r}=t,i=uh.default.join(n,"package.json");if(!await ho.default.exists(i))return r==="csharp"?(e.passed=["C# project does not require package.json."],e):(e.failed=["package.json does not exist."],e);let s=await ho.default.readFile(i,"utf8");try{let o=JSON.parse(s);if(!o.engines||!o.engines.node)return e.warning=["package.json does not have 'engines.node' field."],e;if(!(0,ch.satisfies)("22.0.0",o.engines.node))return e.warning=["'engines.node' field should be compatible with 22."],e}catch{return e.failed=["package.json is not a valid JSON file."],e}return e.passed=["'engines.node' field is compatible with 22."],e}var Po=oe(it()),np=oe(require("path")),$o=oe(Zd());var ep="1.22.0",tp="devPreview";async function qo(n){let e={name:"App Manifest",passed:[],failed:[],warning:[]},t=await Ue(n),{agentDir:r,displayPrefix:i}=t,s=np.default.join(r,"appPackage","manifest.json");if(!await Po.default.exists(s))return e.failed=[`${i}appPackage/manifest.json does not exist.`],e;let o=await Po.default.readFile(s,"utf8"),a;try{a=JSON.parse(o)}catch{}if(!a)return e.failed.push("appPackage/manifest.json is not a valid JSON file."),e;let l=a.id;if(!l||l!=="${{TEAMS_APP_ID}}"?e.failed.push("id should be equal to '${{TEAMS_APP_ID}}'."):e.passed.push("id is referencing placeholder from env: ${{TEAMS_APP_ID}}."),a.manifestVersion===tp)e.warning.push(`Manifest version(${tp}) is using preview version.`);else{let c=$o.default.coerce(a.manifestVersion);c&&$o.default.eq(c,ep)?e.passed.push("Manifest version is aligned with Microsoft 365 Agents Toolkit."):e.warning.push(`Manifest version(${a.manifestVersion}) is NOT aligned with Microsoft 365 Agents Toolkit(${ep}).`)}return e}var ml=oe(it()),Bm=oe(require("path")),Um=oe(Hm());var eb=[{name:"provision",actions:["teamsApp/create"],required:!0},{name:"deploy",actions:[],required:!0}],tb=[{name:"publish",actions:["teamsApp/publishAppPackage"]}];async function gl(n){let e={name:"teamsapp.yaml",passed:[],failed:[],warning:[]},t=await Ue(n),{agentDir:r,displayPrefix:i}=t,s=Bm.default.join(r,"m365agents.yml");if(!await ml.default.exists(s))return e.failed=[`${i}m365agents.yml does not exist.`],e;let o=await ml.default.readFile(s,"utf8"),a=Um.default.parse(o),l=a&&a.projectId;l&&l!==""?e.failed.push("Project should NOT have projectId in m365agents.yml."):e.passed.push("Project has no projectId in m365agents.yml.");for(let d of eb){let h=a[d.name],y=[];if(!h){e.failed.push(`Project should have '${d.name}' stage in m365agents.yml.`);continue}for(let g of d.actions)if(h&&h.findIndex(m=>m.uses===g)<0&&y.push(`Project should have '${g}' action in ${d.name} stage.`),d.name==="provision"&&g==="teamsApp/create"){let m=h.findIndex(S=>S.uses===g);m>=0&&(h[m].writeToEnvironmentFile?.teamsAppId==="TEAMS_APP_ID"?e.passed.push("Project has 'teamsApp/create' action which has TEAMS_APP_ID env variable."):e.failed.push("Project should have 'teamsApp/create' action which has TEAMS_APP_ID env variable."))}y.length===0?e.passed.push(`Project has all mandatory actions in ${d.name} stage.`):e.failed.push(...y)}for(let d of tb){let h=a[d.name];if(!h){e.warning.push(`Project does not have '${d.name}' stage in m365agents.yml.`);continue}let y=!0;for(let g of d.actions)h.findIndex(m=>m.uses===g)<0&&(e.warning.push(`Project does not have '${g}' action in ${d.name} stage.`),y=!1);y&&e.passed.push(`Project has all actions in ${d.name} stage.`)}let c=/^([\w-]+):([\w-]+)$/g,u=a?.additionalMetadata?.sampleTag,f=!1;if(u&&u!==""){let d=c.exec(u);d&&(e.passed.push("Project has sampleTag with format 'repo:name'."),f=!0,d[1]!=="TeamsFx-Samples"&&e.warning.push("Project is an external sample."))}return f||e.failed.push("Project should have sampleTag with format 'repo:name'."),e}var rb=Vm(),Wm=new ql,ib=[Ks,gl,qo,Ws,fo,po];async function sb(){await Wm.version(rb.version).description("A tool to validate project content before onboarding to TeamsFx sample gallery.").option("-p, --path <path>","Path to the project folder to be validated.").parseAsync(process.argv);let n=Wm.opts(),e=process.cwd();n.path&&typeof n.path=="string"&&(e=n.path);for(let t of ib){let r=await t(e);Ec(r)}}Qi.parseFont("Standard",Fl);console.log(Qi.textSync("TeamsFx Sample Validator"));sb();
