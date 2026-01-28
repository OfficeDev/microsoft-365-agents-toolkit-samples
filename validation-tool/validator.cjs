#! /usr/bin/env node
"use strict";var vg=Object.create;var Kl=Object.defineProperty;var Ng=Object.getOwnPropertyDescriptor;var Og=Object.getOwnPropertyNames;var Cg=Object.getPrototypeOf,Rg=Object.prototype.hasOwnProperty;var p=(n,e)=>()=>(e||n((e={exports:{}}).exports,e),e.exports);var Pg=(n,e,t,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of Og(e))!Rg.call(n,s)&&s!==t&&Kl(n,s,{get:()=>e[s],enumerable:!(r=Ng(e,s))||r.enumerable});return n};var se=(n,e,t)=>(t=n!=null?vg(Cg(n)):{},Pg(e||!n||!n.__esModule?Kl(t,"default",{value:n,enumerable:!0}):t,n));var hn=p(Li=>{var pr=class extends Error{constructor(e,t,r){super(r),Error.captureStackTrace(this,this.constructor),this.name=this.constructor.name,this.code=t,this.exitCode=e,this.nestedError=void 0}},wi=class extends pr{constructor(e){super(1,"commander.invalidArgument",e),Error.captureStackTrace(this,this.constructor),this.name=this.constructor.name}};Li.CommanderError=pr;Li.InvalidArgumentError=wi});var _r=p(bi=>{var{InvalidArgumentError:kg}=hn(),Ii=class{constructor(e,t){switch(this.description=t||"",this.variadic=!1,this.parseArg=void 0,this.defaultValue=void 0,this.defaultValueDescription=void 0,this.argChoices=void 0,e[0]){case"<":this.required=!0,this._name=e.slice(1,-1);break;case"[":this.required=!1,this._name=e.slice(1,-1);break;default:this.required=!0,this._name=e;break}this._name.length>3&&this._name.slice(-3)==="..."&&(this.variadic=!0,this._name=this._name.slice(0,-3))}name(){return this._name}_concatValue(e,t){return t===this.defaultValue||!Array.isArray(t)?[e]:t.concat(e)}default(e,t){return this.defaultValue=e,this.defaultValueDescription=t,this}argParser(e){return this.parseArg=e,this}choices(e){return this.argChoices=e.slice(),this.parseArg=(t,r)=>{if(!this.argChoices.includes(t))throw new kg(`Allowed choices are ${this.argChoices.join(", ")}.`);return this.variadic?this._concatValue(t,r):t},this}argRequired(){return this.required=!0,this}argOptional(){return this.required=!1,this}};function $g(n){let e=n.name()+(n.variadic===!0?"...":"");return n.required?"<"+e+">":"["+e+"]"}bi.Argument=Ii;bi.humanReadableArgName=$g});var Ni=p(Yl=>{var{humanReadableArgName:xg}=_r(),vi=class{constructor(){this.helpWidth=void 0,this.sortSubcommands=!1,this.sortOptions=!1,this.showGlobalOptions=!1}visibleCommands(e){let t=e.commands.filter(r=>!r._hidden);if(e._hasImplicitHelpCommand()){let[,r,s]=e._helpCommandnameAndArgs.match(/([^ ]+) *(.*)/),i=e.createCommand(r).helpOption(!1);i.description(e._helpCommandDescription),s&&i.arguments(s),t.push(i)}return this.sortSubcommands&&t.sort((r,s)=>r.name().localeCompare(s.name())),t}compareOptions(e,t){let r=s=>s.short?s.short.replace(/^-/,""):s.long.replace(/^--/,"");return r(e).localeCompare(r(t))}visibleOptions(e){let t=e.options.filter(i=>!i.hidden),r=e._hasHelpOption&&e._helpShortFlag&&!e._findOption(e._helpShortFlag),s=e._hasHelpOption&&!e._findOption(e._helpLongFlag);if(r||s){let i;r?s?i=e.createOption(e._helpFlags,e._helpDescription):i=e.createOption(e._helpShortFlag,e._helpDescription):i=e.createOption(e._helpLongFlag,e._helpDescription),t.push(i)}return this.sortOptions&&t.sort(this.compareOptions),t}visibleGlobalOptions(e){if(!this.showGlobalOptions)return[];let t=[];for(let r=e.parent;r;r=r.parent){let s=r.options.filter(i=>!i.hidden);t.push(...s)}return this.sortOptions&&t.sort(this.compareOptions),t}visibleArguments(e){return e._argsDescription&&e.registeredArguments.forEach(t=>{t.description=t.description||e._argsDescription[t.name()]||""}),e.registeredArguments.find(t=>t.description)?e.registeredArguments:[]}subcommandTerm(e){let t=e.registeredArguments.map(r=>xg(r)).join(" ");return e._name+(e._aliases[0]?"|"+e._aliases[0]:"")+(e.options.length?" [options]":"")+(t?" "+t:"")}optionTerm(e){return e.flags}argumentTerm(e){return e.name()}longestSubcommandTermLength(e,t){return t.visibleCommands(e).reduce((r,s)=>Math.max(r,t.subcommandTerm(s).length),0)}longestOptionTermLength(e,t){return t.visibleOptions(e).reduce((r,s)=>Math.max(r,t.optionTerm(s).length),0)}longestGlobalOptionTermLength(e,t){return t.visibleGlobalOptions(e).reduce((r,s)=>Math.max(r,t.optionTerm(s).length),0)}longestArgumentTermLength(e,t){return t.visibleArguments(e).reduce((r,s)=>Math.max(r,t.argumentTerm(s).length),0)}commandUsage(e){let t=e._name;e._aliases[0]&&(t=t+"|"+e._aliases[0]);let r="";for(let s=e.parent;s;s=s.parent)r=s.name()+" "+r;return r+t+" "+e.usage()}commandDescription(e){return e.description()}subcommandDescription(e){return e.summary()||e.description()}optionDescription(e){let t=[];return e.argChoices&&t.push(`choices: ${e.argChoices.map(r=>JSON.stringify(r)).join(", ")}`),e.defaultValue!==void 0&&(e.required||e.optional||e.isBoolean()&&typeof e.defaultValue=="boolean")&&t.push(`default: ${e.defaultValueDescription||JSON.stringify(e.defaultValue)}`),e.presetArg!==void 0&&e.optional&&t.push(`preset: ${JSON.stringify(e.presetArg)}`),e.envVar!==void 0&&t.push(`env: ${e.envVar}`),t.length>0?`${e.description} (${t.join(", ")})`:e.description}argumentDescription(e){let t=[];if(e.argChoices&&t.push(`choices: ${e.argChoices.map(r=>JSON.stringify(r)).join(", ")}`),e.defaultValue!==void 0&&t.push(`default: ${e.defaultValueDescription||JSON.stringify(e.defaultValue)}`),t.length>0){let r=`(${t.join(", ")})`;return e.description?`${e.description} ${r}`:r}return e.description}formatHelp(e,t){let r=t.padWidth(e,t),s=t.helpWidth||80,i=2,o=2;function a(y,m){if(m){let _=`${y.padEnd(r+o)}${m}`;return t.wrap(_,s-i,r+o)}return y}function l(y){return y.join(`
`).replace(/^/gm," ".repeat(i))}let c=[`Usage: ${t.commandUsage(e)}`,""],u=t.commandDescription(e);u.length>0&&(c=c.concat([t.wrap(u,s,0),""]));let f=t.visibleArguments(e).map(y=>a(t.argumentTerm(y),t.argumentDescription(y)));f.length>0&&(c=c.concat(["Arguments:",l(f),""]));let h=t.visibleOptions(e).map(y=>a(t.optionTerm(y),t.optionDescription(y)));if(h.length>0&&(c=c.concat(["Options:",l(h),""])),this.showGlobalOptions){let y=t.visibleGlobalOptions(e).map(m=>a(t.optionTerm(m),t.optionDescription(m)));y.length>0&&(c=c.concat(["Global Options:",l(y),""]))}let d=t.visibleCommands(e).map(y=>a(t.subcommandTerm(y),t.subcommandDescription(y)));return d.length>0&&(c=c.concat(["Commands:",l(d),""])),c.join(`
`)}padWidth(e,t){return Math.max(t.longestOptionTermLength(e,t),t.longestGlobalOptionTermLength(e,t),t.longestSubcommandTermLength(e,t),t.longestArgumentTermLength(e,t))}wrap(e,t,r,s=40){let i=" \\f\\t\\v\xA0\u1680\u2000-\u200A\u202F\u205F\u3000\uFEFF",o=new RegExp(`[\\n][${i}]+`);if(e.match(o))return e;let a=t-r;if(a<s)return e;let l=e.slice(0,r),c=e.slice(r).replace(`\r
`,`
`),u=" ".repeat(r),h="\\s\u200B",d=new RegExp(`
|.{1,${a-1}}([${h}]|$)|[^${h}]+?([${h}]|$)`,"g"),y=c.match(d)||[];return l+y.map((m,_)=>m===`
`?"":(_>0?u:"")+m.trimEnd()).join(`
`)}};Yl.Help=vi});var Ri=p(mr=>{var{InvalidArgumentError:qg}=hn(),Oi=class{constructor(e,t){this.flags=e,this.description=t||"",this.required=e.includes("<"),this.optional=e.includes("["),this.variadic=/\w\.\.\.[>\]]$/.test(e),this.mandatory=!1;let r=Jl(e);this.short=r.shortFlag,this.long=r.longFlag,this.negate=!1,this.long&&(this.negate=this.long.startsWith("--no-")),this.defaultValue=void 0,this.defaultValueDescription=void 0,this.presetArg=void 0,this.envVar=void 0,this.parseArg=void 0,this.hidden=!1,this.argChoices=void 0,this.conflictsWith=[],this.implied=void 0}default(e,t){return this.defaultValue=e,this.defaultValueDescription=t,this}preset(e){return this.presetArg=e,this}conflicts(e){return this.conflictsWith=this.conflictsWith.concat(e),this}implies(e){let t=e;return typeof e=="string"&&(t={[e]:!0}),this.implied=Object.assign(this.implied||{},t),this}env(e){return this.envVar=e,this}argParser(e){return this.parseArg=e,this}makeOptionMandatory(e=!0){return this.mandatory=!!e,this}hideHelp(e=!0){return this.hidden=!!e,this}_concatValue(e,t){return t===this.defaultValue||!Array.isArray(t)?[e]:t.concat(e)}choices(e){return this.argChoices=e.slice(),this.parseArg=(t,r)=>{if(!this.argChoices.includes(t))throw new qg(`Allowed choices are ${this.argChoices.join(", ")}.`);return this.variadic?this._concatValue(t,r):t},this}name(){return this.long?this.long.replace(/^--/,""):this.short.replace(/^-/,"")}attributeName(){return Mg(this.name().replace(/^no-/,""))}is(e){return this.short===e||this.long===e}isBoolean(){return!this.required&&!this.optional&&!this.negate}},Ci=class{constructor(e){this.positiveOptions=new Map,this.negativeOptions=new Map,this.dualOptions=new Set,e.forEach(t=>{t.negate?this.negativeOptions.set(t.attributeName(),t):this.positiveOptions.set(t.attributeName(),t)}),this.negativeOptions.forEach((t,r)=>{this.positiveOptions.has(r)&&this.dualOptions.add(r)})}valueFromOption(e,t){let r=t.attributeName();if(!this.dualOptions.has(r))return!0;let s=this.negativeOptions.get(r).presetArg,i=s!==void 0?s:!1;return t.negate===(i===e)}};function Mg(n){return n.split("-").reduce((e,t)=>e+t[0].toUpperCase()+t.slice(1))}function Jl(n){let e,t,r=n.split(/[ |,]+/);return r.length>1&&!/^[[<]/.test(r[1])&&(e=r.shift()),t=r.shift(),!e&&/^-[^-]$/.test(t)&&(e=t,t=void 0),{shortFlag:e,longFlag:t}}mr.Option=Oi;mr.splitOptionFlags=Jl;mr.DualOptions=Ci});var zl=p(Xl=>{function Fg(n,e){if(Math.abs(n.length-e.length)>3)return Math.max(n.length,e.length);let t=[];for(let r=0;r<=n.length;r++)t[r]=[r];for(let r=0;r<=e.length;r++)t[0][r]=r;for(let r=1;r<=e.length;r++)for(let s=1;s<=n.length;s++){let i=1;n[s-1]===e[r-1]?i=0:i=1,t[s][r]=Math.min(t[s-1][r]+1,t[s][r-1]+1,t[s-1][r-1]+i),s>1&&r>1&&n[s-1]===e[r-2]&&n[s-2]===e[r-1]&&(t[s][r]=Math.min(t[s][r],t[s-2][r-2]+1))}return t[n.length][e.length]}function Dg(n,e){if(!e||e.length===0)return"";e=Array.from(new Set(e));let t=n.startsWith("--");t&&(n=n.slice(2),e=e.map(o=>o.slice(2)));let r=[],s=3,i=.4;return e.forEach(o=>{if(o.length<=1)return;let a=Fg(n,o),l=Math.max(n.length,o.length);(l-a)/l>i&&(a<s?(s=a,r=[o]):a===s&&r.push(o))}),r.sort((o,a)=>o.localeCompare(a)),t&&(r=r.map(o=>`--${o}`)),r.length>1?`
(Did you mean one of ${r.join(", ")}?)`:r.length===1?`
(Did you mean ${r[0]}?)`:""}Xl.suggestSimilar=Dg});var rc=p(nc=>{var jg=require("events").EventEmitter,Pi=require("child_process"),Qe=require("path"),ki=require("fs"),ie=require("process"),{Argument:Bg,humanReadableArgName:Ug}=_r(),{CommanderError:$i}=hn(),{Help:Hg}=Ni(),{Option:Ql,splitOptionFlags:Vg,DualOptions:Wg}=Ri(),{suggestSimilar:Zl}=zl(),xi=class n extends jg{constructor(e){super(),this.commands=[],this.options=[],this.parent=null,this._allowUnknownOption=!1,this._allowExcessArguments=!0,this.registeredArguments=[],this._args=this.registeredArguments,this.args=[],this.rawArgs=[],this.processedArgs=[],this._scriptPath=null,this._name=e||"",this._optionValues={},this._optionValueSources={},this._storeOptionsAsProperties=!1,this._actionHandler=null,this._executableHandler=!1,this._executableFile=null,this._executableDir=null,this._defaultCommandName=null,this._exitCallback=null,this._aliases=[],this._combineFlagAndOptionalValue=!0,this._description="",this._summary="",this._argsDescription=void 0,this._enablePositionalOptions=!1,this._passThroughOptions=!1,this._lifeCycleHooks={},this._showHelpAfterError=!1,this._showSuggestionAfterError=!0,this._outputConfiguration={writeOut:t=>ie.stdout.write(t),writeErr:t=>ie.stderr.write(t),getOutHelpWidth:()=>ie.stdout.isTTY?ie.stdout.columns:void 0,getErrHelpWidth:()=>ie.stderr.isTTY?ie.stderr.columns:void 0,outputError:(t,r)=>r(t)},this._hidden=!1,this._hasHelpOption=!0,this._helpFlags="-h, --help",this._helpDescription="display help for command",this._helpShortFlag="-h",this._helpLongFlag="--help",this._addImplicitHelpCommand=void 0,this._helpCommandName="help",this._helpCommandnameAndArgs="help [command]",this._helpCommandDescription="display help for command",this._helpConfiguration={}}copyInheritedSettings(e){return this._outputConfiguration=e._outputConfiguration,this._hasHelpOption=e._hasHelpOption,this._helpFlags=e._helpFlags,this._helpDescription=e._helpDescription,this._helpShortFlag=e._helpShortFlag,this._helpLongFlag=e._helpLongFlag,this._helpCommandName=e._helpCommandName,this._helpCommandnameAndArgs=e._helpCommandnameAndArgs,this._helpCommandDescription=e._helpCommandDescription,this._helpConfiguration=e._helpConfiguration,this._exitCallback=e._exitCallback,this._storeOptionsAsProperties=e._storeOptionsAsProperties,this._combineFlagAndOptionalValue=e._combineFlagAndOptionalValue,this._allowExcessArguments=e._allowExcessArguments,this._enablePositionalOptions=e._enablePositionalOptions,this._showHelpAfterError=e._showHelpAfterError,this._showSuggestionAfterError=e._showSuggestionAfterError,this}_getCommandAndAncestors(){let e=[];for(let t=this;t;t=t.parent)e.push(t);return e}command(e,t,r){let s=t,i=r;typeof s=="object"&&s!==null&&(i=s,s=null),i=i||{};let[,o,a]=e.match(/([^ ]+) *(.*)/),l=this.createCommand(o);return s&&(l.description(s),l._executableHandler=!0),i.isDefault&&(this._defaultCommandName=l._name),l._hidden=!!(i.noHelp||i.hidden),l._executableFile=i.executableFile||null,a&&l.arguments(a),this.commands.push(l),l.parent=this,l.copyInheritedSettings(this),s?this:l}createCommand(e){return new n(e)}createHelp(){return Object.assign(new Hg,this.configureHelp())}configureHelp(e){return e===void 0?this._helpConfiguration:(this._helpConfiguration=e,this)}configureOutput(e){return e===void 0?this._outputConfiguration:(Object.assign(this._outputConfiguration,e),this)}showHelpAfterError(e=!0){return typeof e!="string"&&(e=!!e),this._showHelpAfterError=e,this}showSuggestionAfterError(e=!0){return this._showSuggestionAfterError=!!e,this}addCommand(e,t){if(!e._name)throw new Error(`Command passed to .addCommand() must have a name
- specify the name in Command constructor or using .name()`);return t=t||{},t.isDefault&&(this._defaultCommandName=e._name),(t.noHelp||t.hidden)&&(e._hidden=!0),this.commands.push(e),e.parent=this,this}createArgument(e,t){return new Bg(e,t)}argument(e,t,r,s){let i=this.createArgument(e,t);return typeof r=="function"?i.default(s).argParser(r):i.default(r),this.addArgument(i),this}arguments(e){return e.trim().split(/ +/).forEach(t=>{this.argument(t)}),this}addArgument(e){let t=this.registeredArguments.slice(-1)[0];if(t&&t.variadic)throw new Error(`only the last argument can be variadic '${t.name()}'`);if(e.required&&e.defaultValue!==void 0&&e.parseArg===void 0)throw new Error(`a default value for a required argument is never used: '${e.name()}'`);return this.registeredArguments.push(e),this}addHelpCommand(e,t){return e===!1?this._addImplicitHelpCommand=!1:(this._addImplicitHelpCommand=!0,typeof e=="string"&&(this._helpCommandName=e.split(" ")[0],this._helpCommandnameAndArgs=e),this._helpCommandDescription=t||this._helpCommandDescription),this}_hasImplicitHelpCommand(){return this._addImplicitHelpCommand===void 0?this.commands.length&&!this._actionHandler&&!this._findCommand("help"):this._addImplicitHelpCommand}hook(e,t){let r=["preSubcommand","preAction","postAction"];if(!r.includes(e))throw new Error(`Unexpected value for event passed to hook : '${e}'.
Expecting one of '${r.join("', '")}'`);return this._lifeCycleHooks[e]?this._lifeCycleHooks[e].push(t):this._lifeCycleHooks[e]=[t],this}exitOverride(e){return e?this._exitCallback=e:this._exitCallback=t=>{if(t.code!=="commander.executeSubCommandAsync")throw t},this}_exit(e,t,r){this._exitCallback&&this._exitCallback(new $i(e,t,r)),ie.exit(e)}action(e){let t=r=>{let s=this.registeredArguments.length,i=r.slice(0,s);return this._storeOptionsAsProperties?i[s]=this:i[s]=this.opts(),i.push(this),e.apply(this,i)};return this._actionHandler=t,this}createOption(e,t){return new Ql(e,t)}_callParseArg(e,t,r,s){try{return e.parseArg(t,r)}catch(i){if(i.code==="commander.invalidArgument"){let o=`${s} ${i.message}`;this.error(o,{exitCode:i.exitCode,code:i.code})}throw i}}addOption(e){let t=e.name(),r=e.attributeName();if(e.negate){let i=e.long.replace(/^--no-/,"--");this._findOption(i)||this.setOptionValueWithSource(r,e.defaultValue===void 0?!0:e.defaultValue,"default")}else e.defaultValue!==void 0&&this.setOptionValueWithSource(r,e.defaultValue,"default");this.options.push(e);let s=(i,o,a)=>{i==null&&e.presetArg!==void 0&&(i=e.presetArg);let l=this.getOptionValue(r);i!==null&&e.parseArg?i=this._callParseArg(e,i,l,o):i!==null&&e.variadic&&(i=e._concatValue(i,l)),i==null&&(e.negate?i=!1:e.isBoolean()||e.optional?i=!0:i=""),this.setOptionValueWithSource(r,i,a)};return this.on("option:"+t,i=>{let o=`error: option '${e.flags}' argument '${i}' is invalid.`;s(i,o,"cli")}),e.envVar&&this.on("optionEnv:"+t,i=>{let o=`error: option '${e.flags}' value '${i}' from env '${e.envVar}' is invalid.`;s(i,o,"env")}),this}_optionEx(e,t,r,s,i){if(typeof t=="object"&&t instanceof Ql)throw new Error("To add an Option object use addOption() instead of option() or requiredOption()");let o=this.createOption(t,r);if(o.makeOptionMandatory(!!e.mandatory),typeof s=="function")o.default(i).argParser(s);else if(s instanceof RegExp){let a=s;s=(l,c)=>{let u=a.exec(l);return u?u[0]:c},o.default(i).argParser(s)}else o.default(s);return this.addOption(o)}option(e,t,r,s){return this._optionEx({},e,t,r,s)}requiredOption(e,t,r,s){return this._optionEx({mandatory:!0},e,t,r,s)}combineFlagAndOptionalValue(e=!0){return this._combineFlagAndOptionalValue=!!e,this}allowUnknownOption(e=!0){return this._allowUnknownOption=!!e,this}allowExcessArguments(e=!0){return this._allowExcessArguments=!!e,this}enablePositionalOptions(e=!0){return this._enablePositionalOptions=!!e,this}passThroughOptions(e=!0){if(this._passThroughOptions=!!e,this.parent&&e&&!this.parent._enablePositionalOptions)throw new Error("passThroughOptions can not be used without turning on enablePositionalOptions for parent command(s)");return this}storeOptionsAsProperties(e=!0){if(this.options.length)throw new Error("call .storeOptionsAsProperties() before adding options");return this._storeOptionsAsProperties=!!e,this}getOptionValue(e){return this._storeOptionsAsProperties?this[e]:this._optionValues[e]}setOptionValue(e,t){return this.setOptionValueWithSource(e,t,void 0)}setOptionValueWithSource(e,t,r){return this._storeOptionsAsProperties?this[e]=t:this._optionValues[e]=t,this._optionValueSources[e]=r,this}getOptionValueSource(e){return this._optionValueSources[e]}getOptionValueSourceWithGlobals(e){let t;return this._getCommandAndAncestors().forEach(r=>{r.getOptionValueSource(e)!==void 0&&(t=r.getOptionValueSource(e))}),t}_prepareUserArgs(e,t){if(e!==void 0&&!Array.isArray(e))throw new Error("first parameter to parse must be array or undefined");t=t||{},e===void 0&&(e=ie.argv,ie.versions&&ie.versions.electron&&(t.from="electron")),this.rawArgs=e.slice();let r;switch(t.from){case void 0:case"node":this._scriptPath=e[1],r=e.slice(2);break;case"electron":ie.defaultApp?(this._scriptPath=e[1],r=e.slice(2)):r=e.slice(1);break;case"user":r=e.slice(0);break;default:throw new Error(`unexpected parse option { from: '${t.from}' }`)}return!this._name&&this._scriptPath&&this.nameFromFilename(this._scriptPath),this._name=this._name||"program",r}parse(e,t){let r=this._prepareUserArgs(e,t);return this._parseCommand([],r),this}async parseAsync(e,t){let r=this._prepareUserArgs(e,t);return await this._parseCommand([],r),this}_executeSubCommand(e,t){t=t.slice();let r=!1,s=[".js",".ts",".tsx",".mjs",".cjs"];function i(u,f){let h=Qe.resolve(u,f);if(ki.existsSync(h))return h;if(s.includes(Qe.extname(f)))return;let d=s.find(y=>ki.existsSync(`${h}${y}`));if(d)return`${h}${d}`}this._checkForMissingMandatoryOptions(),this._checkForConflictingOptions();let o=e._executableFile||`${this._name}-${e._name}`,a=this._executableDir||"";if(this._scriptPath){let u;try{u=ki.realpathSync(this._scriptPath)}catch{u=this._scriptPath}a=Qe.resolve(Qe.dirname(u),a)}if(a){let u=i(a,o);if(!u&&!e._executableFile&&this._scriptPath){let f=Qe.basename(this._scriptPath,Qe.extname(this._scriptPath));f!==this._name&&(u=i(a,`${f}-${e._name}`))}o=u||o}r=s.includes(Qe.extname(o));let l;ie.platform!=="win32"?r?(t.unshift(o),t=tc(ie.execArgv).concat(t),l=Pi.spawn(ie.argv[0],t,{stdio:"inherit"})):l=Pi.spawn(o,t,{stdio:"inherit"}):(t.unshift(o),t=tc(ie.execArgv).concat(t),l=Pi.spawn(ie.execPath,t,{stdio:"inherit"})),l.killed||["SIGUSR1","SIGUSR2","SIGTERM","SIGINT","SIGHUP"].forEach(f=>{ie.on(f,()=>{l.killed===!1&&l.exitCode===null&&l.kill(f)})});let c=this._exitCallback;c?l.on("close",()=>{c(new $i(ie.exitCode||0,"commander.executeSubCommandAsync","(close)"))}):l.on("close",ie.exit.bind(ie)),l.on("error",u=>{if(u.code==="ENOENT"){let f=a?`searched for local subcommand relative to directory '${a}'`:"no directory for search for local subcommand, use .executableDir() to supply a custom directory",h=`'${o}' does not exist
 - if '${e._name}' is not meant to be an executable command, remove description parameter from '.command()' and use '.description()' instead
 - if the default executable name is not suitable, use the executableFile option to supply a custom name or path
 - ${f}`;throw new Error(h)}else if(u.code==="EACCES")throw new Error(`'${o}' not executable`);if(!c)ie.exit(1);else{let f=new $i(1,"commander.executeSubCommandAsync","(error)");f.nestedError=u,c(f)}}),this.runningCommand=l}_dispatchSubcommand(e,t,r){let s=this._findCommand(e);s||this.help({error:!0});let i;return i=this._chainOrCallSubCommandHook(i,s,"preSubcommand"),i=this._chainOrCall(i,()=>{if(s._executableHandler)this._executeSubCommand(s,t.concat(r));else return s._parseCommand(t,r)}),i}_dispatchHelpCommand(e){e||this.help();let t=this._findCommand(e);return t&&!t._executableHandler&&t.help(),this._dispatchSubcommand(e,[],[this._helpLongFlag||this._helpShortFlag])}_checkNumberOfArguments(){this.registeredArguments.forEach((e,t)=>{e.required&&this.args[t]==null&&this.missingArgument(e.name())}),!(this.registeredArguments.length>0&&this.registeredArguments[this.registeredArguments.length-1].variadic)&&this.args.length>this.registeredArguments.length&&this._excessArguments(this.args)}_processArguments(){let e=(r,s,i)=>{let o=s;if(s!==null&&r.parseArg){let a=`error: command-argument value '${s}' is invalid for argument '${r.name()}'.`;o=this._callParseArg(r,s,i,a)}return o};this._checkNumberOfArguments();let t=[];this.registeredArguments.forEach((r,s)=>{let i=r.defaultValue;r.variadic?s<this.args.length?(i=this.args.slice(s),r.parseArg&&(i=i.reduce((o,a)=>e(r,a,o),r.defaultValue))):i===void 0&&(i=[]):s<this.args.length&&(i=this.args[s],r.parseArg&&(i=e(r,i,r.defaultValue))),t[s]=i}),this.processedArgs=t}_chainOrCall(e,t){return e&&e.then&&typeof e.then=="function"?e.then(()=>t()):t()}_chainOrCallHooks(e,t){let r=e,s=[];return this._getCommandAndAncestors().reverse().filter(i=>i._lifeCycleHooks[t]!==void 0).forEach(i=>{i._lifeCycleHooks[t].forEach(o=>{s.push({hookedCommand:i,callback:o})})}),t==="postAction"&&s.reverse(),s.forEach(i=>{r=this._chainOrCall(r,()=>i.callback(i.hookedCommand,this))}),r}_chainOrCallSubCommandHook(e,t,r){let s=e;return this._lifeCycleHooks[r]!==void 0&&this._lifeCycleHooks[r].forEach(i=>{s=this._chainOrCall(s,()=>i(this,t))}),s}_parseCommand(e,t){let r=this.parseOptions(t);if(this._parseOptionsEnv(),this._parseOptionsImplied(),e=e.concat(r.operands),t=r.unknown,this.args=e.concat(t),e&&this._findCommand(e[0]))return this._dispatchSubcommand(e[0],e.slice(1),t);if(this._hasImplicitHelpCommand()&&e[0]===this._helpCommandName)return this._dispatchHelpCommand(e[1]);if(this._defaultCommandName)return ec(this,t),this._dispatchSubcommand(this._defaultCommandName,e,t);this.commands.length&&this.args.length===0&&!this._actionHandler&&!this._defaultCommandName&&this.help({error:!0}),ec(this,r.unknown),this._checkForMissingMandatoryOptions(),this._checkForConflictingOptions();let s=()=>{r.unknown.length>0&&this.unknownOption(r.unknown[0])},i=`command:${this.name()}`;if(this._actionHandler){s(),this._processArguments();let o;return o=this._chainOrCallHooks(o,"preAction"),o=this._chainOrCall(o,()=>this._actionHandler(this.processedArgs)),this.parent&&(o=this._chainOrCall(o,()=>{this.parent.emit(i,e,t)})),o=this._chainOrCallHooks(o,"postAction"),o}if(this.parent&&this.parent.listenerCount(i))s(),this._processArguments(),this.parent.emit(i,e,t);else if(e.length){if(this._findCommand("*"))return this._dispatchSubcommand("*",e,t);this.listenerCount("command:*")?this.emit("command:*",e,t):this.commands.length?this.unknownCommand():(s(),this._processArguments())}else this.commands.length?(s(),this.help({error:!0})):(s(),this._processArguments())}_findCommand(e){if(e)return this.commands.find(t=>t._name===e||t._aliases.includes(e))}_findOption(e){return this.options.find(t=>t.is(e))}_checkForMissingMandatoryOptions(){this._getCommandAndAncestors().forEach(e=>{e.options.forEach(t=>{t.mandatory&&e.getOptionValue(t.attributeName())===void 0&&e.missingMandatoryOptionValue(t)})})}_checkForConflictingLocalOptions(){let e=this.options.filter(r=>{let s=r.attributeName();return this.getOptionValue(s)===void 0?!1:this.getOptionValueSource(s)!=="default"});e.filter(r=>r.conflictsWith.length>0).forEach(r=>{let s=e.find(i=>r.conflictsWith.includes(i.attributeName()));s&&this._conflictingOption(r,s)})}_checkForConflictingOptions(){this._getCommandAndAncestors().forEach(e=>{e._checkForConflictingLocalOptions()})}parseOptions(e){let t=[],r=[],s=t,i=e.slice();function o(l){return l.length>1&&l[0]==="-"}let a=null;for(;i.length;){let l=i.shift();if(l==="--"){s===r&&s.push(l),s.push(...i);break}if(a&&!o(l)){this.emit(`option:${a.name()}`,l);continue}if(a=null,o(l)){let c=this._findOption(l);if(c){if(c.required){let u=i.shift();u===void 0&&this.optionMissingArgument(c),this.emit(`option:${c.name()}`,u)}else if(c.optional){let u=null;i.length>0&&!o(i[0])&&(u=i.shift()),this.emit(`option:${c.name()}`,u)}else this.emit(`option:${c.name()}`);a=c.variadic?c:null;continue}}if(l.length>2&&l[0]==="-"&&l[1]!=="-"){let c=this._findOption(`-${l[1]}`);if(c){c.required||c.optional&&this._combineFlagAndOptionalValue?this.emit(`option:${c.name()}`,l.slice(2)):(this.emit(`option:${c.name()}`),i.unshift(`-${l.slice(2)}`));continue}}if(/^--[^=]+=/.test(l)){let c=l.indexOf("="),u=this._findOption(l.slice(0,c));if(u&&(u.required||u.optional)){this.emit(`option:${u.name()}`,l.slice(c+1));continue}}if(o(l)&&(s=r),(this._enablePositionalOptions||this._passThroughOptions)&&t.length===0&&r.length===0){if(this._findCommand(l)){t.push(l),i.length>0&&r.push(...i);break}else if(l===this._helpCommandName&&this._hasImplicitHelpCommand()){t.push(l),i.length>0&&t.push(...i);break}else if(this._defaultCommandName){r.push(l),i.length>0&&r.push(...i);break}}if(this._passThroughOptions){s.push(l),i.length>0&&s.push(...i);break}s.push(l)}return{operands:t,unknown:r}}opts(){if(this._storeOptionsAsProperties){let e={},t=this.options.length;for(let r=0;r<t;r++){let s=this.options[r].attributeName();e[s]=s===this._versionOptionName?this._version:this[s]}return e}return this._optionValues}optsWithGlobals(){return this._getCommandAndAncestors().reduce((e,t)=>Object.assign(e,t.opts()),{})}error(e,t){this._outputConfiguration.outputError(`${e}
`,this._outputConfiguration.writeErr),typeof this._showHelpAfterError=="string"?this._outputConfiguration.writeErr(`${this._showHelpAfterError}
`):this._showHelpAfterError&&(this._outputConfiguration.writeErr(`
`),this.outputHelp({error:!0}));let r=t||{},s=r.exitCode||1,i=r.code||"commander.error";this._exit(s,i,e)}_parseOptionsEnv(){this.options.forEach(e=>{if(e.envVar&&e.envVar in ie.env){let t=e.attributeName();(this.getOptionValue(t)===void 0||["default","config","env"].includes(this.getOptionValueSource(t)))&&(e.required||e.optional?this.emit(`optionEnv:${e.name()}`,ie.env[e.envVar]):this.emit(`optionEnv:${e.name()}`))}})}_parseOptionsImplied(){let e=new Wg(this.options),t=r=>this.getOptionValue(r)!==void 0&&!["default","implied"].includes(this.getOptionValueSource(r));this.options.filter(r=>r.implied!==void 0&&t(r.attributeName())&&e.valueFromOption(this.getOptionValue(r.attributeName()),r)).forEach(r=>{Object.keys(r.implied).filter(s=>!t(s)).forEach(s=>{this.setOptionValueWithSource(s,r.implied[s],"implied")})})}missingArgument(e){let t=`error: missing required argument '${e}'`;this.error(t,{code:"commander.missingArgument"})}optionMissingArgument(e){let t=`error: option '${e.flags}' argument missing`;this.error(t,{code:"commander.optionMissingArgument"})}missingMandatoryOptionValue(e){let t=`error: required option '${e.flags}' not specified`;this.error(t,{code:"commander.missingMandatoryOptionValue"})}_conflictingOption(e,t){let r=o=>{let a=o.attributeName(),l=this.getOptionValue(a),c=this.options.find(f=>f.negate&&a===f.attributeName()),u=this.options.find(f=>!f.negate&&a===f.attributeName());return c&&(c.presetArg===void 0&&l===!1||c.presetArg!==void 0&&l===c.presetArg)?c:u||o},s=o=>{let a=r(o),l=a.attributeName();return this.getOptionValueSource(l)==="env"?`environment variable '${a.envVar}'`:`option '${a.flags}'`},i=`error: ${s(e)} cannot be used with ${s(t)}`;this.error(i,{code:"commander.conflictingOption"})}unknownOption(e){if(this._allowUnknownOption)return;let t="";if(e.startsWith("--")&&this._showSuggestionAfterError){let s=[],i=this;do{let o=i.createHelp().visibleOptions(i).filter(a=>a.long).map(a=>a.long);s=s.concat(o),i=i.parent}while(i&&!i._enablePositionalOptions);t=Zl(e,s)}let r=`error: unknown option '${e}'${t}`;this.error(r,{code:"commander.unknownOption"})}_excessArguments(e){if(this._allowExcessArguments)return;let t=this.registeredArguments.length,r=t===1?"":"s",i=`error: too many arguments${this.parent?` for '${this.name()}'`:""}. Expected ${t} argument${r} but got ${e.length}.`;this.error(i,{code:"commander.excessArguments"})}unknownCommand(){let e=this.args[0],t="";if(this._showSuggestionAfterError){let s=[];this.createHelp().visibleCommands(this).forEach(i=>{s.push(i.name()),i.alias()&&s.push(i.alias())}),t=Zl(e,s)}let r=`error: unknown command '${e}'${t}`;this.error(r,{code:"commander.unknownCommand"})}version(e,t,r){if(e===void 0)return this._version;this._version=e,t=t||"-V, --version",r=r||"output the version number";let s=this.createOption(t,r);return this._versionOptionName=s.attributeName(),this.options.push(s),this.on("option:"+s.name(),()=>{this._outputConfiguration.writeOut(`${e}
`),this._exit(0,"commander.version",e)}),this}description(e,t){return e===void 0&&t===void 0?this._description:(this._description=e,t&&(this._argsDescription=t),this)}summary(e){return e===void 0?this._summary:(this._summary=e,this)}alias(e){if(e===void 0)return this._aliases[0];let t=this;if(this.commands.length!==0&&this.commands[this.commands.length-1]._executableHandler&&(t=this.commands[this.commands.length-1]),e===t._name)throw new Error("Command alias can't be the same as its name");return t._aliases.push(e),this}aliases(e){return e===void 0?this._aliases:(e.forEach(t=>this.alias(t)),this)}usage(e){if(e===void 0){if(this._usage)return this._usage;let t=this.registeredArguments.map(r=>Ug(r));return[].concat(this.options.length||this._hasHelpOption?"[options]":[],this.commands.length?"[command]":[],this.registeredArguments.length?t:[]).join(" ")}return this._usage=e,this}name(e){return e===void 0?this._name:(this._name=e,this)}nameFromFilename(e){return this._name=Qe.basename(e,Qe.extname(e)),this}executableDir(e){return e===void 0?this._executableDir:(this._executableDir=e,this)}helpInformation(e){let t=this.createHelp();return t.helpWidth===void 0&&(t.helpWidth=e&&e.error?this._outputConfiguration.getErrHelpWidth():this._outputConfiguration.getOutHelpWidth()),t.formatHelp(this,t)}_getHelpContext(e){e=e||{};let t={error:!!e.error},r;return t.error?r=s=>this._outputConfiguration.writeErr(s):r=s=>this._outputConfiguration.writeOut(s),t.write=e.write||r,t.command=this,t}outputHelp(e){let t;typeof e=="function"&&(t=e,e=void 0);let r=this._getHelpContext(e);this._getCommandAndAncestors().reverse().forEach(i=>i.emit("beforeAllHelp",r)),this.emit("beforeHelp",r);let s=this.helpInformation(r);if(t&&(s=t(s),typeof s!="string"&&!Buffer.isBuffer(s)))throw new Error("outputHelp callback must return a string or a Buffer");r.write(s),this._helpLongFlag&&this.emit(this._helpLongFlag),this.emit("afterHelp",r),this._getCommandAndAncestors().forEach(i=>i.emit("afterAllHelp",r))}helpOption(e,t){if(typeof e=="boolean")return this._hasHelpOption=e,this;this._helpFlags=e||this._helpFlags,this._helpDescription=t||this._helpDescription;let r=Vg(this._helpFlags);return this._helpShortFlag=r.shortFlag,this._helpLongFlag=r.longFlag,this}help(e){this.outputHelp(e);let t=ie.exitCode||0;t===0&&e&&typeof e!="function"&&e.error&&(t=1),this._exit(t,"commander.help","(outputHelp)")}addHelpText(e,t){let r=["beforeAll","before","after","afterAll"];if(!r.includes(e))throw new Error(`Unexpected value for position to addHelpText.
Expecting one of '${r.join("', '")}'`);let s=`${e}Help`;return this.on(s,i=>{let o;typeof t=="function"?o=t({error:i.error,command:i.command}):o=t,o&&i.write(`${o}
`)}),this}};function ec(n,e){n._hasHelpOption&&e.find(r=>r===n._helpLongFlag||r===n._helpShortFlag)&&(n.outputHelp(),n._exit(0,"commander.helpDisplayed","(outputHelp)"))}function tc(n){return n.map(e=>{if(!e.startsWith("--inspect"))return e;let t,r="127.0.0.1",s="9229",i;return(i=e.match(/^(--inspect(-brk)?)$/))!==null?t=i[1]:(i=e.match(/^(--inspect(-brk|-port)?)=([^:]+)$/))!==null?(t=i[1],/^\d+$/.test(i[3])?s=i[3]:r=i[3]):(i=e.match(/^(--inspect(-brk|-port)?)=([^:]+):(\d+)$/))!==null&&(t=i[1],r=i[3],s=i[4]),t&&s!=="0"?`${t}=${r}:${parseInt(s)+1}`:e})}nc.Command=xi});var ac=p((Be,oc)=>{var{Argument:Gg}=_r(),{Command:sc}=rc(),{CommanderError:Kg,InvalidArgumentError:ic}=hn(),{Help:Yg}=Ni(),{Option:Jg}=Ri();Be=oc.exports=new sc;Be.program=Be;Be.Command=sc;Be.Option=Jg;Be.Argument=Gg;Be.Help=Yg;Be.CommanderError=Kg;Be.InvalidArgumentError=ic;Be.InvalidOptionArgumentError=ic});var _c=p((M2,pc)=>{"use strict";pc.exports={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]}});var Fi=p((F2,gc)=>{var pn=_c(),mc={};for(let n of Object.keys(pn))mc[pn[n]]=n;var $={rgb:{channels:3,labels:"rgb"},hsl:{channels:3,labels:"hsl"},hsv:{channels:3,labels:"hsv"},hwb:{channels:3,labels:"hwb"},cmyk:{channels:4,labels:"cmyk"},xyz:{channels:3,labels:"xyz"},lab:{channels:3,labels:"lab"},lch:{channels:3,labels:"lch"},hex:{channels:1,labels:["hex"]},keyword:{channels:1,labels:["keyword"]},ansi16:{channels:1,labels:["ansi16"]},ansi256:{channels:1,labels:["ansi256"]},hcg:{channels:3,labels:["h","c","g"]},apple:{channels:3,labels:["r16","g16","b16"]},gray:{channels:1,labels:["gray"]}};gc.exports=$;for(let n of Object.keys($)){if(!("channels"in $[n]))throw new Error("missing channels property: "+n);if(!("labels"in $[n]))throw new Error("missing channel labels property: "+n);if($[n].labels.length!==$[n].channels)throw new Error("channel and label counts mismatch: "+n);let{channels:e,labels:t}=$[n];delete $[n].channels,delete $[n].labels,Object.defineProperty($[n],"channels",{value:e}),Object.defineProperty($[n],"labels",{value:t})}$.rgb.hsl=function(n){let e=n[0]/255,t=n[1]/255,r=n[2]/255,s=Math.min(e,t,r),i=Math.max(e,t,r),o=i-s,a,l;i===s?a=0:e===i?a=(t-r)/o:t===i?a=2+(r-e)/o:r===i&&(a=4+(e-t)/o),a=Math.min(a*60,360),a<0&&(a+=360);let c=(s+i)/2;return i===s?l=0:c<=.5?l=o/(i+s):l=o/(2-i-s),[a,l*100,c*100]};$.rgb.hsv=function(n){let e,t,r,s,i,o=n[0]/255,a=n[1]/255,l=n[2]/255,c=Math.max(o,a,l),u=c-Math.min(o,a,l),f=function(h){return(c-h)/6/u+1/2};return u===0?(s=0,i=0):(i=u/c,e=f(o),t=f(a),r=f(l),o===c?s=r-t:a===c?s=1/3+e-r:l===c&&(s=2/3+t-e),s<0?s+=1:s>1&&(s-=1)),[s*360,i*100,c*100]};$.rgb.hwb=function(n){let e=n[0],t=n[1],r=n[2],s=$.rgb.hsl(n)[0],i=1/255*Math.min(e,Math.min(t,r));return r=1-1/255*Math.max(e,Math.max(t,r)),[s,i*100,r*100]};$.rgb.cmyk=function(n){let e=n[0]/255,t=n[1]/255,r=n[2]/255,s=Math.min(1-e,1-t,1-r),i=(1-e-s)/(1-s)||0,o=(1-t-s)/(1-s)||0,a=(1-r-s)/(1-s)||0;return[i*100,o*100,a*100,s*100]};function n0(n,e){return(n[0]-e[0])**2+(n[1]-e[1])**2+(n[2]-e[2])**2}$.rgb.keyword=function(n){let e=mc[n];if(e)return e;let t=1/0,r;for(let s of Object.keys(pn)){let i=pn[s],o=n0(n,i);o<t&&(t=o,r=s)}return r};$.keyword.rgb=function(n){return pn[n]};$.rgb.xyz=function(n){let e=n[0]/255,t=n[1]/255,r=n[2]/255;e=e>.04045?((e+.055)/1.055)**2.4:e/12.92,t=t>.04045?((t+.055)/1.055)**2.4:t/12.92,r=r>.04045?((r+.055)/1.055)**2.4:r/12.92;let s=e*.4124+t*.3576+r*.1805,i=e*.2126+t*.7152+r*.0722,o=e*.0193+t*.1192+r*.9505;return[s*100,i*100,o*100]};$.rgb.lab=function(n){let e=$.rgb.xyz(n),t=e[0],r=e[1],s=e[2];t/=95.047,r/=100,s/=108.883,t=t>.008856?t**(1/3):7.787*t+16/116,r=r>.008856?r**(1/3):7.787*r+16/116,s=s>.008856?s**(1/3):7.787*s+16/116;let i=116*r-16,o=500*(t-r),a=200*(r-s);return[i,o,a]};$.hsl.rgb=function(n){let e=n[0]/360,t=n[1]/100,r=n[2]/100,s,i,o;if(t===0)return o=r*255,[o,o,o];r<.5?s=r*(1+t):s=r+t-r*t;let a=2*r-s,l=[0,0,0];for(let c=0;c<3;c++)i=e+1/3*-(c-1),i<0&&i++,i>1&&i--,6*i<1?o=a+(s-a)*6*i:2*i<1?o=s:3*i<2?o=a+(s-a)*(2/3-i)*6:o=a,l[c]=o*255;return l};$.hsl.hsv=function(n){let e=n[0],t=n[1]/100,r=n[2]/100,s=t,i=Math.max(r,.01);r*=2,t*=r<=1?r:2-r,s*=i<=1?i:2-i;let o=(r+t)/2,a=r===0?2*s/(i+s):2*t/(r+t);return[e,a*100,o*100]};$.hsv.rgb=function(n){let e=n[0]/60,t=n[1]/100,r=n[2]/100,s=Math.floor(e)%6,i=e-Math.floor(e),o=255*r*(1-t),a=255*r*(1-t*i),l=255*r*(1-t*(1-i));switch(r*=255,s){case 0:return[r,l,o];case 1:return[a,r,o];case 2:return[o,r,l];case 3:return[o,a,r];case 4:return[l,o,r];case 5:return[r,o,a]}};$.hsv.hsl=function(n){let e=n[0],t=n[1]/100,r=n[2]/100,s=Math.max(r,.01),i,o;o=(2-t)*r;let a=(2-t)*s;return i=t*s,i/=a<=1?a:2-a,i=i||0,o/=2,[e,i*100,o*100]};$.hwb.rgb=function(n){let e=n[0]/360,t=n[1]/100,r=n[2]/100,s=t+r,i;s>1&&(t/=s,r/=s);let o=Math.floor(6*e),a=1-r;i=6*e-o,(o&1)!==0&&(i=1-i);let l=t+i*(a-t),c,u,f;switch(o){default:case 6:case 0:c=a,u=l,f=t;break;case 1:c=l,u=a,f=t;break;case 2:c=t,u=a,f=l;break;case 3:c=t,u=l,f=a;break;case 4:c=l,u=t,f=a;break;case 5:c=a,u=t,f=l;break}return[c*255,u*255,f*255]};$.cmyk.rgb=function(n){let e=n[0]/100,t=n[1]/100,r=n[2]/100,s=n[3]/100,i=1-Math.min(1,e*(1-s)+s),o=1-Math.min(1,t*(1-s)+s),a=1-Math.min(1,r*(1-s)+s);return[i*255,o*255,a*255]};$.xyz.rgb=function(n){let e=n[0]/100,t=n[1]/100,r=n[2]/100,s,i,o;return s=e*3.2406+t*-1.5372+r*-.4986,i=e*-.9689+t*1.8758+r*.0415,o=e*.0557+t*-.204+r*1.057,s=s>.0031308?1.055*s**(1/2.4)-.055:s*12.92,i=i>.0031308?1.055*i**(1/2.4)-.055:i*12.92,o=o>.0031308?1.055*o**(1/2.4)-.055:o*12.92,s=Math.min(Math.max(0,s),1),i=Math.min(Math.max(0,i),1),o=Math.min(Math.max(0,o),1),[s*255,i*255,o*255]};$.xyz.lab=function(n){let e=n[0],t=n[1],r=n[2];e/=95.047,t/=100,r/=108.883,e=e>.008856?e**(1/3):7.787*e+16/116,t=t>.008856?t**(1/3):7.787*t+16/116,r=r>.008856?r**(1/3):7.787*r+16/116;let s=116*t-16,i=500*(e-t),o=200*(t-r);return[s,i,o]};$.lab.xyz=function(n){let e=n[0],t=n[1],r=n[2],s,i,o;i=(e+16)/116,s=t/500+i,o=i-r/200;let a=i**3,l=s**3,c=o**3;return i=a>.008856?a:(i-16/116)/7.787,s=l>.008856?l:(s-16/116)/7.787,o=c>.008856?c:(o-16/116)/7.787,s*=95.047,i*=100,o*=108.883,[s,i,o]};$.lab.lch=function(n){let e=n[0],t=n[1],r=n[2],s;s=Math.atan2(r,t)*360/2/Math.PI,s<0&&(s+=360);let o=Math.sqrt(t*t+r*r);return[e,o,s]};$.lch.lab=function(n){let e=n[0],t=n[1],s=n[2]/360*2*Math.PI,i=t*Math.cos(s),o=t*Math.sin(s);return[e,i,o]};$.rgb.ansi16=function(n,e=null){let[t,r,s]=n,i=e===null?$.rgb.hsv(n)[2]:e;if(i=Math.round(i/50),i===0)return 30;let o=30+(Math.round(s/255)<<2|Math.round(r/255)<<1|Math.round(t/255));return i===2&&(o+=60),o};$.hsv.ansi16=function(n){return $.rgb.ansi16($.hsv.rgb(n),n[2])};$.rgb.ansi256=function(n){let e=n[0],t=n[1],r=n[2];return e===t&&t===r?e<8?16:e>248?231:Math.round((e-8)/247*24)+232:16+36*Math.round(e/255*5)+6*Math.round(t/255*5)+Math.round(r/255*5)};$.ansi16.rgb=function(n){let e=n%10;if(e===0||e===7)return n>50&&(e+=3.5),e=e/10.5*255,[e,e,e];let t=(~~(n>50)+1)*.5,r=(e&1)*t*255,s=(e>>1&1)*t*255,i=(e>>2&1)*t*255;return[r,s,i]};$.ansi256.rgb=function(n){if(n>=232){let i=(n-232)*10+8;return[i,i,i]}n-=16;let e,t=Math.floor(n/36)/5*255,r=Math.floor((e=n%36)/6)/5*255,s=e%6/5*255;return[t,r,s]};$.rgb.hex=function(n){let t=(((Math.round(n[0])&255)<<16)+((Math.round(n[1])&255)<<8)+(Math.round(n[2])&255)).toString(16).toUpperCase();return"000000".substring(t.length)+t};$.hex.rgb=function(n){let e=n.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);if(!e)return[0,0,0];let t=e[0];e[0].length===3&&(t=t.split("").map(a=>a+a).join(""));let r=parseInt(t,16),s=r>>16&255,i=r>>8&255,o=r&255;return[s,i,o]};$.rgb.hcg=function(n){let e=n[0]/255,t=n[1]/255,r=n[2]/255,s=Math.max(Math.max(e,t),r),i=Math.min(Math.min(e,t),r),o=s-i,a,l;return o<1?a=i/(1-o):a=0,o<=0?l=0:s===e?l=(t-r)/o%6:s===t?l=2+(r-e)/o:l=4+(e-t)/o,l/=6,l%=1,[l*360,o*100,a*100]};$.hsl.hcg=function(n){let e=n[1]/100,t=n[2]/100,r=t<.5?2*e*t:2*e*(1-t),s=0;return r<1&&(s=(t-.5*r)/(1-r)),[n[0],r*100,s*100]};$.hsv.hcg=function(n){let e=n[1]/100,t=n[2]/100,r=e*t,s=0;return r<1&&(s=(t-r)/(1-r)),[n[0],r*100,s*100]};$.hcg.rgb=function(n){let e=n[0]/360,t=n[1]/100,r=n[2]/100;if(t===0)return[r*255,r*255,r*255];let s=[0,0,0],i=e%1*6,o=i%1,a=1-o,l=0;switch(Math.floor(i)){case 0:s[0]=1,s[1]=o,s[2]=0;break;case 1:s[0]=a,s[1]=1,s[2]=0;break;case 2:s[0]=0,s[1]=1,s[2]=o;break;case 3:s[0]=0,s[1]=a,s[2]=1;break;case 4:s[0]=o,s[1]=0,s[2]=1;break;default:s[0]=1,s[1]=0,s[2]=a}return l=(1-t)*r,[(t*s[0]+l)*255,(t*s[1]+l)*255,(t*s[2]+l)*255]};$.hcg.hsv=function(n){let e=n[1]/100,t=n[2]/100,r=e+t*(1-e),s=0;return r>0&&(s=e/r),[n[0],s*100,r*100]};$.hcg.hsl=function(n){let e=n[1]/100,r=n[2]/100*(1-e)+.5*e,s=0;return r>0&&r<.5?s=e/(2*r):r>=.5&&r<1&&(s=e/(2*(1-r))),[n[0],s*100,r*100]};$.hcg.hwb=function(n){let e=n[1]/100,t=n[2]/100,r=e+t*(1-e);return[n[0],(r-e)*100,(1-r)*100]};$.hwb.hcg=function(n){let e=n[1]/100,r=1-n[2]/100,s=r-e,i=0;return s<1&&(i=(r-s)/(1-s)),[n[0],s*100,i*100]};$.apple.rgb=function(n){return[n[0]/65535*255,n[1]/65535*255,n[2]/65535*255]};$.rgb.apple=function(n){return[n[0]/255*65535,n[1]/255*65535,n[2]/255*65535]};$.gray.rgb=function(n){return[n[0]/100*255,n[0]/100*255,n[0]/100*255]};$.gray.hsl=function(n){return[0,0,n[0]]};$.gray.hsv=$.gray.hsl;$.gray.hwb=function(n){return[0,100,n[0]]};$.gray.cmyk=function(n){return[0,0,0,n[0]]};$.gray.lab=function(n){return[n[0],0,0]};$.gray.hex=function(n){let e=Math.round(n[0]/100*255)&255,r=((e<<16)+(e<<8)+e).toString(16).toUpperCase();return"000000".substring(r.length)+r};$.rgb.gray=function(n){return[(n[0]+n[1]+n[2])/3/255*100]}});var Ec=p((D2,yc)=>{var gr=Fi();function r0(){let n={},e=Object.keys(gr);for(let t=e.length,r=0;r<t;r++)n[e[r]]={distance:-1,parent:null};return n}function s0(n){let e=r0(),t=[n];for(e[n].distance=0;t.length;){let r=t.pop(),s=Object.keys(gr[r]);for(let i=s.length,o=0;o<i;o++){let a=s[o],l=e[a];l.distance===-1&&(l.distance=e[r].distance+1,l.parent=r,t.unshift(a))}}return e}function i0(n,e){return function(t){return e(n(t))}}function o0(n,e){let t=[e[n].parent,n],r=gr[e[n].parent][n],s=e[n].parent;for(;e[s].parent;)t.unshift(e[s].parent),r=i0(gr[e[s].parent][s],r),s=e[s].parent;return r.conversion=t,r}yc.exports=function(n){let e=s0(n),t={},r=Object.keys(e);for(let s=r.length,i=0;i<s;i++){let o=r[i];e[o].parent!==null&&(t[o]=o0(o,e))}return t}});var Sc=p((j2,Tc)=>{var Di=Fi(),a0=Ec(),Dt={},l0=Object.keys(Di);function c0(n){let e=function(...t){let r=t[0];return r==null?r:(r.length>1&&(t=r),n(t))};return"conversion"in n&&(e.conversion=n.conversion),e}function u0(n){let e=function(...t){let r=t[0];if(r==null)return r;r.length>1&&(t=r);let s=n(t);if(typeof s=="object")for(let i=s.length,o=0;o<i;o++)s[o]=Math.round(s[o]);return s};return"conversion"in n&&(e.conversion=n.conversion),e}l0.forEach(n=>{Dt[n]={},Object.defineProperty(Dt[n],"channels",{value:Di[n].channels}),Object.defineProperty(Dt[n],"labels",{value:Di[n].labels});let e=a0(n);Object.keys(e).forEach(r=>{let s=e[r];Dt[n][r]=u0(s),Dt[n][r].raw=c0(s)})});Tc.exports=Dt});var vc=p((B2,bc)=>{"use strict";var Ac=(n,e)=>(...t)=>`\x1B[${n(...t)+e}m`,wc=(n,e)=>(...t)=>{let r=n(...t);return`\x1B[${38+e};5;${r}m`},Lc=(n,e)=>(...t)=>{let r=n(...t);return`\x1B[${38+e};2;${r[0]};${r[1]};${r[2]}m`},yr=n=>n,Ic=(n,e,t)=>[n,e,t],jt=(n,e,t)=>{Object.defineProperty(n,e,{get:()=>{let r=t();return Object.defineProperty(n,e,{value:r,enumerable:!0,configurable:!0}),r},enumerable:!0,configurable:!0})},ji,Bt=(n,e,t,r)=>{ji===void 0&&(ji=Sc());let s=r?10:0,i={};for(let[o,a]of Object.entries(ji)){let l=o==="ansi16"?"ansi":o;o===e?i[l]=n(t,s):typeof a=="object"&&(i[l]=n(a[e],s))}return i};function f0(){let n=new Map,e={modifier:{reset:[0,0],bold:[1,22],dim:[2,22],italic:[3,23],underline:[4,24],inverse:[7,27],hidden:[8,28],strikethrough:[9,29]},color:{black:[30,39],red:[31,39],green:[32,39],yellow:[33,39],blue:[34,39],magenta:[35,39],cyan:[36,39],white:[37,39],blackBright:[90,39],redBright:[91,39],greenBright:[92,39],yellowBright:[93,39],blueBright:[94,39],magentaBright:[95,39],cyanBright:[96,39],whiteBright:[97,39]},bgColor:{bgBlack:[40,49],bgRed:[41,49],bgGreen:[42,49],bgYellow:[43,49],bgBlue:[44,49],bgMagenta:[45,49],bgCyan:[46,49],bgWhite:[47,49],bgBlackBright:[100,49],bgRedBright:[101,49],bgGreenBright:[102,49],bgYellowBright:[103,49],bgBlueBright:[104,49],bgMagentaBright:[105,49],bgCyanBright:[106,49],bgWhiteBright:[107,49]}};e.color.gray=e.color.blackBright,e.bgColor.bgGray=e.bgColor.bgBlackBright,e.color.grey=e.color.blackBright,e.bgColor.bgGrey=e.bgColor.bgBlackBright;for(let[t,r]of Object.entries(e)){for(let[s,i]of Object.entries(r))e[s]={open:`\x1B[${i[0]}m`,close:`\x1B[${i[1]}m`},r[s]=e[s],n.set(i[0],i[1]);Object.defineProperty(e,t,{value:r,enumerable:!1})}return Object.defineProperty(e,"codes",{value:n,enumerable:!1}),e.color.close="\x1B[39m",e.bgColor.close="\x1B[49m",jt(e.color,"ansi",()=>Bt(Ac,"ansi16",yr,!1)),jt(e.color,"ansi256",()=>Bt(wc,"ansi256",yr,!1)),jt(e.color,"ansi16m",()=>Bt(Lc,"rgb",Ic,!1)),jt(e.bgColor,"ansi",()=>Bt(Ac,"ansi16",yr,!0)),jt(e.bgColor,"ansi256",()=>Bt(wc,"ansi256",yr,!0)),jt(e.bgColor,"ansi16m",()=>Bt(Lc,"rgb",Ic,!0)),e}Object.defineProperty(bc,"exports",{enumerable:!0,get:f0})});var Oc=p((U2,Nc)=>{"use strict";Nc.exports=(n,e=process.argv)=>{let t=n.startsWith("-")?"":n.length===1?"-":"--",r=e.indexOf(t+n),s=e.indexOf("--");return r!==-1&&(s===-1||r<s)}});var Pc=p((H2,Rc)=>{"use strict";var h0=require("os"),Cc=require("tty"),xe=Oc(),{env:de}=process,at;xe("no-color")||xe("no-colors")||xe("color=false")||xe("color=never")?at=0:(xe("color")||xe("colors")||xe("color=true")||xe("color=always"))&&(at=1);"FORCE_COLOR"in de&&(de.FORCE_COLOR==="true"?at=1:de.FORCE_COLOR==="false"?at=0:at=de.FORCE_COLOR.length===0?1:Math.min(parseInt(de.FORCE_COLOR,10),3));function Bi(n){return n===0?!1:{level:n,hasBasic:!0,has256:n>=2,has16m:n>=3}}function Ui(n,e){if(at===0)return 0;if(xe("color=16m")||xe("color=full")||xe("color=truecolor"))return 3;if(xe("color=256"))return 2;if(n&&!e&&at===void 0)return 0;let t=at||0;if(de.TERM==="dumb")return t;if(process.platform==="win32"){let r=h0.release().split(".");return Number(r[0])>=10&&Number(r[2])>=10586?Number(r[2])>=14931?3:2:1}if("CI"in de)return["TRAVIS","CIRCLECI","APPVEYOR","GITLAB_CI","GITHUB_ACTIONS","BUILDKITE"].some(r=>r in de)||de.CI_NAME==="codeship"?1:t;if("TEAMCITY_VERSION"in de)return/^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(de.TEAMCITY_VERSION)?1:0;if(de.COLORTERM==="truecolor")return 3;if("TERM_PROGRAM"in de){let r=parseInt((de.TERM_PROGRAM_VERSION||"").split(".")[0],10);switch(de.TERM_PROGRAM){case"iTerm.app":return r>=3?3:2;case"Apple_Terminal":return 2}}return/-256(color)?$/i.test(de.TERM)?2:/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(de.TERM)||"COLORTERM"in de?1:t}function d0(n){let e=Ui(n,n&&n.isTTY);return Bi(e)}Rc.exports={supportsColor:d0,stdout:Bi(Ui(!0,Cc.isatty(1))),stderr:Bi(Ui(!0,Cc.isatty(2)))}});var $c=p((V2,kc)=>{"use strict";var p0=(n,e,t)=>{let r=n.indexOf(e);if(r===-1)return n;let s=e.length,i=0,o="";do o+=n.substr(i,r-i)+e+t,i=r+s,r=n.indexOf(e,i);while(r!==-1);return o+=n.substr(i),o},_0=(n,e,t,r)=>{let s=0,i="";do{let o=n[r-1]==="\r";i+=n.substr(s,(o?r-1:r)-s)+e+(o?`\r
`:`
`)+t,s=r+1,r=n.indexOf(`
`,s)}while(r!==-1);return i+=n.substr(s),i};kc.exports={stringReplaceAll:p0,stringEncaseCRLFWithFirstIndex:_0}});var Dc=p((W2,Fc)=>{"use strict";var m0=/(?:\\(u(?:[a-f\d]{4}|\{[a-f\d]{1,6}\})|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi,xc=/(?:^|\.)(\w+)(?:\(([^)]*)\))?/g,g0=/^(['"])((?:\\.|(?!\1)[^\\])*)\1$/,y0=/\\(u(?:[a-f\d]{4}|{[a-f\d]{1,6}})|x[a-f\d]{2}|.)|([^\\])/gi,E0=new Map([["n",`
`],["r","\r"],["t","	"],["b","\b"],["f","\f"],["v","\v"],["0","\0"],["\\","\\"],["e","\x1B"],["a","\x07"]]);function Mc(n){let e=n[0]==="u",t=n[1]==="{";return e&&!t&&n.length===5||n[0]==="x"&&n.length===3?String.fromCharCode(parseInt(n.slice(1),16)):e&&t?String.fromCodePoint(parseInt(n.slice(2,-1),16)):E0.get(n)||n}function T0(n,e){let t=[],r=e.trim().split(/\s*,\s*/g),s;for(let i of r){let o=Number(i);if(!Number.isNaN(o))t.push(o);else if(s=i.match(g0))t.push(s[2].replace(y0,(a,l,c)=>l?Mc(l):c));else throw new Error(`Invalid Chalk template style argument: ${i} (in style '${n}')`)}return t}function S0(n){xc.lastIndex=0;let e=[],t;for(;(t=xc.exec(n))!==null;){let r=t[1];if(t[2]){let s=T0(r,t[2]);e.push([r].concat(s))}else e.push([r])}return e}function qc(n,e){let t={};for(let s of e)for(let i of s.styles)t[i[0]]=s.inverse?null:i.slice(1);let r=n;for(let[s,i]of Object.entries(t))if(Array.isArray(i)){if(!(s in r))throw new Error(`Unknown Chalk style: ${s}`);r=i.length>0?r[s](...i):r[s]}return r}Fc.exports=(n,e)=>{let t=[],r=[],s=[];if(e.replace(m0,(i,o,a,l,c,u)=>{if(o)s.push(Mc(o));else if(l){let f=s.join("");s=[],r.push(t.length===0?f:qc(n,t)(f)),t.push({inverse:a,styles:S0(l)})}else if(c){if(t.length===0)throw new Error("Found extraneous } in Chalk template literal");r.push(qc(n,t)(s.join(""))),s=[],t.pop()}else s.push(u)}),r.push(s.join("")),t.length>0){let i=`Chalk template literal is missing ${t.length} closing bracket${t.length===1?"":"s"} (\`}\`)`;throw new Error(i)}return r.join("")}});var Gc=p((G2,Wc)=>{"use strict";var _n=vc(),{stdout:Vi,stderr:Wi}=Pc(),{stringReplaceAll:A0,stringEncaseCRLFWithFirstIndex:w0}=$c(),{isArray:Er}=Array,Bc=["ansi","ansi","ansi256","ansi16m"],Ut=Object.create(null),L0=(n,e={})=>{if(e.level&&!(Number.isInteger(e.level)&&e.level>=0&&e.level<=3))throw new Error("The `level` option should be an integer from 0 to 3");let t=Vi?Vi.level:0;n.level=e.level===void 0?t:e.level},Gi=class{constructor(e){return Uc(e)}},Uc=n=>{let e={};return L0(e,n),e.template=(...t)=>Vc(e.template,...t),Object.setPrototypeOf(e,Tr.prototype),Object.setPrototypeOf(e.template,e),e.template.constructor=()=>{throw new Error("`chalk.constructor()` is deprecated. Use `new chalk.Instance()` instead.")},e.template.Instance=Gi,e.template};function Tr(n){return Uc(n)}for(let[n,e]of Object.entries(_n))Ut[n]={get(){let t=Sr(this,Ki(e.open,e.close,this._styler),this._isEmpty);return Object.defineProperty(this,n,{value:t}),t}};Ut.visible={get(){let n=Sr(this,this._styler,!0);return Object.defineProperty(this,"visible",{value:n}),n}};var Hc=["rgb","hex","keyword","hsl","hsv","hwb","ansi","ansi256"];for(let n of Hc)Ut[n]={get(){let{level:e}=this;return function(...t){let r=Ki(_n.color[Bc[e]][n](...t),_n.color.close,this._styler);return Sr(this,r,this._isEmpty)}}};for(let n of Hc){let e="bg"+n[0].toUpperCase()+n.slice(1);Ut[e]={get(){let{level:t}=this;return function(...r){let s=Ki(_n.bgColor[Bc[t]][n](...r),_n.bgColor.close,this._styler);return Sr(this,s,this._isEmpty)}}}}var I0=Object.defineProperties(()=>{},{...Ut,level:{enumerable:!0,get(){return this._generator.level},set(n){this._generator.level=n}}}),Ki=(n,e,t)=>{let r,s;return t===void 0?(r=n,s=e):(r=t.openAll+n,s=e+t.closeAll),{open:n,close:e,openAll:r,closeAll:s,parent:t}},Sr=(n,e,t)=>{let r=(...s)=>Er(s[0])&&Er(s[0].raw)?jc(r,Vc(r,...s)):jc(r,s.length===1?""+s[0]:s.join(" "));return Object.setPrototypeOf(r,I0),r._generator=n,r._styler=e,r._isEmpty=t,r},jc=(n,e)=>{if(n.level<=0||!e)return n._isEmpty?"":e;let t=n._styler;if(t===void 0)return e;let{openAll:r,closeAll:s}=t;if(e.indexOf("\x1B")!==-1)for(;t!==void 0;)e=A0(e,t.close,t.open),t=t.parent;let i=e.indexOf(`
`);return i!==-1&&(e=w0(e,s,r,i)),r+e+s},Hi,Vc=(n,...e)=>{let[t]=e;if(!Er(t)||!Er(t.raw))return e.join(" ");let r=e.slice(1),s=[t.raw[0]];for(let i=1;i<t.length;i++)s.push(String(r[i-1]).replace(/[{}\\]/g,"\\$&"),String(t.raw[i]));return Hi===void 0&&(Hi=Dc()),Hi(n,s.join(""))};Object.defineProperties(Tr.prototype,Ut);var Ar=Tr();Ar.supportsColor=Vi;Ar.stderr=Tr({level:Wi?Wi.level:0});Ar.stderr.supportsColor=Wi;Wc.exports=Ar});var Yc=p((Y2,O0)=>{O0.exports={name:"dotenv",version:"16.6.1",description:"Loads environment variables from .env file",main:"lib/main.js",types:"lib/main.d.ts",exports:{".":{types:"./lib/main.d.ts",require:"./lib/main.js",default:"./lib/main.js"},"./config":"./config.js","./config.js":"./config.js","./lib/env-options":"./lib/env-options.js","./lib/env-options.js":"./lib/env-options.js","./lib/cli-options":"./lib/cli-options.js","./lib/cli-options.js":"./lib/cli-options.js","./package.json":"./package.json"},scripts:{"dts-check":"tsc --project tests/types/tsconfig.json",lint:"standard",pretest:"npm run lint && npm run dts-check",test:"tap run --allow-empty-coverage --disable-coverage --timeout=60000","test:coverage":"tap run --show-full-coverage --timeout=60000 --coverage-report=text --coverage-report=lcov",prerelease:"npm test",release:"standard-version"},repository:{type:"git",url:"git://github.com/motdotla/dotenv.git"},homepage:"https://github.com/motdotla/dotenv#readme",funding:"https://dotenvx.com",keywords:["dotenv","env",".env","environment","variables","config","settings"],readmeFilename:"README.md",license:"BSD-2-Clause",devDependencies:{"@types/node":"^18.11.3",decache:"^4.6.2",sinon:"^14.0.1",standard:"^17.0.0","standard-version":"^9.5.0",tap:"^19.2.0",typescript:"^4.8.4"},engines:{node:">=12"},browser:{fs:!1}}});var Zc=p((J2,Ze)=>{var Yi=require("fs"),Lr=require("path"),C0=require("os"),R0=require("crypto"),P0=Yc(),Ji=P0.version,k0=/(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;function $0(n){let e={},t=n.toString();t=t.replace(/\r\n?/mg,`
`);let r;for(;(r=k0.exec(t))!=null;){let s=r[1],i=r[2]||"";i=i.trim();let o=i[0];i=i.replace(/^(['"`])([\s\S]*)\1$/mg,"$2"),o==='"'&&(i=i.replace(/\\n/g,`
`),i=i.replace(/\\r/g,"\r")),e[s]=i}return e}function x0(n){n=n||{};let e=Qc(n);n.path=e;let t=fe.configDotenv(n);if(!t.parsed){let o=new Error(`MISSING_DATA: Cannot parse ${e} for an unknown reason`);throw o.code="MISSING_DATA",o}let r=zc(n).split(","),s=r.length,i;for(let o=0;o<s;o++)try{let a=r[o].trim(),l=M0(t,a);i=fe.decrypt(l.ciphertext,l.key);break}catch(a){if(o+1>=s)throw a}return fe.parse(i)}function q0(n){console.log(`[dotenv@${Ji}][WARN] ${n}`)}function mn(n){console.log(`[dotenv@${Ji}][DEBUG] ${n}`)}function Xc(n){console.log(`[dotenv@${Ji}] ${n}`)}function zc(n){return n&&n.DOTENV_KEY&&n.DOTENV_KEY.length>0?n.DOTENV_KEY:process.env.DOTENV_KEY&&process.env.DOTENV_KEY.length>0?process.env.DOTENV_KEY:""}function M0(n,e){let t;try{t=new URL(e)}catch(a){if(a.code==="ERR_INVALID_URL"){let l=new Error("INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenvx.com/vault/.env.vault?environment=development");throw l.code="INVALID_DOTENV_KEY",l}throw a}let r=t.password;if(!r){let a=new Error("INVALID_DOTENV_KEY: Missing key part");throw a.code="INVALID_DOTENV_KEY",a}let s=t.searchParams.get("environment");if(!s){let a=new Error("INVALID_DOTENV_KEY: Missing environment part");throw a.code="INVALID_DOTENV_KEY",a}let i=`DOTENV_VAULT_${s.toUpperCase()}`,o=n.parsed[i];if(!o){let a=new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${i} in your .env.vault file.`);throw a.code="NOT_FOUND_DOTENV_ENVIRONMENT",a}return{ciphertext:o,key:r}}function Qc(n){let e=null;if(n&&n.path&&n.path.length>0)if(Array.isArray(n.path))for(let t of n.path)Yi.existsSync(t)&&(e=t.endsWith(".vault")?t:`${t}.vault`);else e=n.path.endsWith(".vault")?n.path:`${n.path}.vault`;else e=Lr.resolve(process.cwd(),".env.vault");return Yi.existsSync(e)?e:null}function Jc(n){return n[0]==="~"?Lr.join(C0.homedir(),n.slice(1)):n}function F0(n){let e=!!(n&&n.debug),t=n&&"quiet"in n?n.quiet:!0;(e||!t)&&Xc("Loading env from encrypted .env.vault");let r=fe._parseVault(n),s=process.env;return n&&n.processEnv!=null&&(s=n.processEnv),fe.populate(s,r,n),{parsed:r}}function D0(n){let e=Lr.resolve(process.cwd(),".env"),t="utf8",r=!!(n&&n.debug),s=n&&"quiet"in n?n.quiet:!0;n&&n.encoding?t=n.encoding:r&&mn("No encoding is specified. UTF-8 is used by default");let i=[e];if(n&&n.path)if(!Array.isArray(n.path))i=[Jc(n.path)];else{i=[];for(let c of n.path)i.push(Jc(c))}let o,a={};for(let c of i)try{let u=fe.parse(Yi.readFileSync(c,{encoding:t}));fe.populate(a,u,n)}catch(u){r&&mn(`Failed to load ${c} ${u.message}`),o=u}let l=process.env;if(n&&n.processEnv!=null&&(l=n.processEnv),fe.populate(l,a,n),r||!s){let c=Object.keys(a).length,u=[];for(let f of i)try{let h=Lr.relative(process.cwd(),f);u.push(h)}catch(h){r&&mn(`Failed to load ${f} ${h.message}`),o=h}Xc(`injecting env (${c}) from ${u.join(",")}`)}return o?{parsed:a,error:o}:{parsed:a}}function j0(n){if(zc(n).length===0)return fe.configDotenv(n);let e=Qc(n);return e?fe._configVault(n):(q0(`You set DOTENV_KEY but you are missing a .env.vault file at ${e}. Did you forget to build it?`),fe.configDotenv(n))}function B0(n,e){let t=Buffer.from(e.slice(-64),"hex"),r=Buffer.from(n,"base64"),s=r.subarray(0,12),i=r.subarray(-16);r=r.subarray(12,-16);try{let o=R0.createDecipheriv("aes-256-gcm",t,s);return o.setAuthTag(i),`${o.update(r)}${o.final()}`}catch(o){let a=o instanceof RangeError,l=o.message==="Invalid key length",c=o.message==="Unsupported state or unable to authenticate data";if(a||l){let u=new Error("INVALID_DOTENV_KEY: It must be 64 characters long (or more)");throw u.code="INVALID_DOTENV_KEY",u}else if(c){let u=new Error("DECRYPTION_FAILED: Please check your DOTENV_KEY");throw u.code="DECRYPTION_FAILED",u}else throw o}}function U0(n,e,t={}){let r=!!(t&&t.debug),s=!!(t&&t.override);if(typeof e!="object"){let i=new Error("OBJECT_REQUIRED: Please check the processEnv argument being passed to populate");throw i.code="OBJECT_REQUIRED",i}for(let i of Object.keys(e))Object.prototype.hasOwnProperty.call(n,i)?(s===!0&&(n[i]=e[i]),r&&mn(s===!0?`"${i}" is already defined and WAS overwritten`:`"${i}" is already defined and was NOT overwritten`)):n[i]=e[i]}var fe={configDotenv:D0,_configVault:F0,_parseVault:x0,config:j0,decrypt:B0,parse:$0,populate:U0};Ze.exports.configDotenv=fe.configDotenv;Ze.exports._configVault=fe._configVault;Ze.exports._parseVault=fe._parseVault;Ze.exports.config=fe.config;Ze.exports.decrypt=fe.decrypt;Ze.exports.parse=fe.parse;Ze.exports.populate=fe.populate;Ze.exports=fe});var pe=p(Xi=>{"use strict";Xi.fromCallback=function(n){return Object.defineProperty(function(...e){if(typeof e[e.length-1]=="function")n.apply(this,e);else return new Promise((t,r)=>{e.push((s,i)=>s!=null?r(s):t(i)),n.apply(this,e)})},"name",{value:n.name})};Xi.fromPromise=function(n){return Object.defineProperty(function(...e){let t=e[e.length-1];if(typeof t!="function")return n.apply(this,e);e.pop(),n.apply(this,e).then(r=>t(null,r),t)},"name",{value:n.name})}});var tu=p((z2,eu)=>{var lt=require("constants"),H0=process.cwd,Ir=null,V0=process.env.GRACEFUL_FS_PLATFORM||process.platform;process.cwd=function(){return Ir||(Ir=H0.call(process)),Ir};try{process.cwd()}catch{}typeof process.chdir=="function"&&(zi=process.chdir,process.chdir=function(n){Ir=null,zi.call(process,n)},Object.setPrototypeOf&&Object.setPrototypeOf(process.chdir,zi));var zi;eu.exports=W0;function W0(n){lt.hasOwnProperty("O_SYMLINK")&&process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)&&e(n),n.lutimes||t(n),n.chown=i(n.chown),n.fchown=i(n.fchown),n.lchown=i(n.lchown),n.chmod=r(n.chmod),n.fchmod=r(n.fchmod),n.lchmod=r(n.lchmod),n.chownSync=o(n.chownSync),n.fchownSync=o(n.fchownSync),n.lchownSync=o(n.lchownSync),n.chmodSync=s(n.chmodSync),n.fchmodSync=s(n.fchmodSync),n.lchmodSync=s(n.lchmodSync),n.stat=a(n.stat),n.fstat=a(n.fstat),n.lstat=a(n.lstat),n.statSync=l(n.statSync),n.fstatSync=l(n.fstatSync),n.lstatSync=l(n.lstatSync),n.chmod&&!n.lchmod&&(n.lchmod=function(u,f,h){h&&process.nextTick(h)},n.lchmodSync=function(){}),n.chown&&!n.lchown&&(n.lchown=function(u,f,h,d){d&&process.nextTick(d)},n.lchownSync=function(){}),V0==="win32"&&(n.rename=typeof n.rename!="function"?n.rename:(function(u){function f(h,d,y){var m=Date.now(),_=0;u(h,d,function S(w){if(w&&(w.code==="EACCES"||w.code==="EPERM"||w.code==="EBUSY")&&Date.now()-m<6e4){setTimeout(function(){n.stat(d,function(I,x){I&&I.code==="ENOENT"?u(h,d,S):y(w)})},_),_<100&&(_+=10);return}y&&y(w)})}return Object.setPrototypeOf&&Object.setPrototypeOf(f,u),f})(n.rename)),n.read=typeof n.read!="function"?n.read:(function(u){function f(h,d,y,m,_,S){var w;if(S&&typeof S=="function"){var I=0;w=function(x,q,M){if(x&&x.code==="EAGAIN"&&I<10)return I++,u.call(n,h,d,y,m,_,w);S.apply(this,arguments)}}return u.call(n,h,d,y,m,_,w)}return Object.setPrototypeOf&&Object.setPrototypeOf(f,u),f})(n.read),n.readSync=typeof n.readSync!="function"?n.readSync:(function(u){return function(f,h,d,y,m){for(var _=0;;)try{return u.call(n,f,h,d,y,m)}catch(S){if(S.code==="EAGAIN"&&_<10){_++;continue}throw S}}})(n.readSync);function e(u){u.lchmod=function(f,h,d){u.open(f,lt.O_WRONLY|lt.O_SYMLINK,h,function(y,m){if(y){d&&d(y);return}u.fchmod(m,h,function(_){u.close(m,function(S){d&&d(_||S)})})})},u.lchmodSync=function(f,h){var d=u.openSync(f,lt.O_WRONLY|lt.O_SYMLINK,h),y=!0,m;try{m=u.fchmodSync(d,h),y=!1}finally{if(y)try{u.closeSync(d)}catch{}else u.closeSync(d)}return m}}function t(u){lt.hasOwnProperty("O_SYMLINK")&&u.futimes?(u.lutimes=function(f,h,d,y){u.open(f,lt.O_SYMLINK,function(m,_){if(m){y&&y(m);return}u.futimes(_,h,d,function(S){u.close(_,function(w){y&&y(S||w)})})})},u.lutimesSync=function(f,h,d){var y=u.openSync(f,lt.O_SYMLINK),m,_=!0;try{m=u.futimesSync(y,h,d),_=!1}finally{if(_)try{u.closeSync(y)}catch{}else u.closeSync(y)}return m}):u.futimes&&(u.lutimes=function(f,h,d,y){y&&process.nextTick(y)},u.lutimesSync=function(){})}function r(u){return u&&function(f,h,d){return u.call(n,f,h,function(y){c(y)&&(y=null),d&&d.apply(this,arguments)})}}function s(u){return u&&function(f,h){try{return u.call(n,f,h)}catch(d){if(!c(d))throw d}}}function i(u){return u&&function(f,h,d,y){return u.call(n,f,h,d,function(m){c(m)&&(m=null),y&&y.apply(this,arguments)})}}function o(u){return u&&function(f,h,d){try{return u.call(n,f,h,d)}catch(y){if(!c(y))throw y}}}function a(u){return u&&function(f,h,d){typeof h=="function"&&(d=h,h=null);function y(m,_){_&&(_.uid<0&&(_.uid+=4294967296),_.gid<0&&(_.gid+=4294967296)),d&&d.apply(this,arguments)}return h?u.call(n,f,h,y):u.call(n,f,y)}}function l(u){return u&&function(f,h){var d=h?u.call(n,f,h):u.call(n,f);return d&&(d.uid<0&&(d.uid+=4294967296),d.gid<0&&(d.gid+=4294967296)),d}}function c(u){if(!u||u.code==="ENOSYS")return!0;var f=!process.getuid||process.getuid()!==0;return!!(f&&(u.code==="EINVAL"||u.code==="EPERM"))}}});var su=p((Q2,ru)=>{var nu=require("stream").Stream;ru.exports=G0;function G0(n){return{ReadStream:e,WriteStream:t};function e(r,s){if(!(this instanceof e))return new e(r,s);nu.call(this);var i=this;this.path=r,this.fd=null,this.readable=!0,this.paused=!1,this.flags="r",this.mode=438,this.bufferSize=64*1024,s=s||{};for(var o=Object.keys(s),a=0,l=o.length;a<l;a++){var c=o[a];this[c]=s[c]}if(this.encoding&&this.setEncoding(this.encoding),this.start!==void 0){if(typeof this.start!="number")throw TypeError("start must be a Number");if(this.end===void 0)this.end=1/0;else if(typeof this.end!="number")throw TypeError("end must be a Number");if(this.start>this.end)throw new Error("start must be <= end");this.pos=this.start}if(this.fd!==null){process.nextTick(function(){i._read()});return}n.open(this.path,this.flags,this.mode,function(u,f){if(u){i.emit("error",u),i.readable=!1;return}i.fd=f,i.emit("open",f),i._read()})}function t(r,s){if(!(this instanceof t))return new t(r,s);nu.call(this),this.path=r,this.fd=null,this.writable=!0,this.flags="w",this.encoding="binary",this.mode=438,this.bytesWritten=0,s=s||{};for(var i=Object.keys(s),o=0,a=i.length;o<a;o++){var l=i[o];this[l]=s[l]}if(this.start!==void 0){if(typeof this.start!="number")throw TypeError("start must be a Number");if(this.start<0)throw new Error("start must be >= zero");this.pos=this.start}this.busy=!1,this._queue=[],this.fd===null&&(this._open=n.open,this._queue.push([this._open,this.path,this.flags,this.mode,void 0]),this.flush())}}});var ou=p((Z2,iu)=>{"use strict";iu.exports=Y0;var K0=Object.getPrototypeOf||function(n){return n.__proto__};function Y0(n){if(n===null||typeof n!="object")return n;if(n instanceof Object)var e={__proto__:K0(n)};else var e=Object.create(null);return Object.getOwnPropertyNames(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}),e}});var Vt=p((eN,eo)=>{var oe=require("fs"),J0=tu(),X0=su(),z0=ou(),br=require("util"),me,Nr;typeof Symbol=="function"&&typeof Symbol.for=="function"?(me=Symbol.for("graceful-fs.queue"),Nr=Symbol.for("graceful-fs.previous")):(me="___graceful-fs.queue",Nr="___graceful-fs.previous");function Q0(){}function cu(n,e){Object.defineProperty(n,me,{get:function(){return e}})}var vt=Q0;br.debuglog?vt=br.debuglog("gfs4"):/\bgfs4\b/i.test(process.env.NODE_DEBUG||"")&&(vt=function(){var n=br.format.apply(br,arguments);n="GFS4: "+n.split(/\n/).join(`
GFS4: `),console.error(n)});oe[me]||(au=global[me]||[],cu(oe,au),oe.close=(function(n){function e(t,r){return n.call(oe,t,function(s){s||lu(),typeof r=="function"&&r.apply(this,arguments)})}return Object.defineProperty(e,Nr,{value:n}),e})(oe.close),oe.closeSync=(function(n){function e(t){n.apply(oe,arguments),lu()}return Object.defineProperty(e,Nr,{value:n}),e})(oe.closeSync),/\bgfs4\b/i.test(process.env.NODE_DEBUG||"")&&process.on("exit",function(){vt(oe[me]),require("assert").equal(oe[me].length,0)}));var au;global[me]||cu(global,oe[me]);eo.exports=Qi(z0(oe));process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH&&!oe.__patched&&(eo.exports=Qi(oe),oe.__patched=!0);function Qi(n){J0(n),n.gracefulify=Qi,n.createReadStream=q,n.createWriteStream=M;var e=n.readFile;n.readFile=t;function t(C,B,j){return typeof B=="function"&&(j=B,B=null),D(C,B,j);function D(X,te,z,J){return e(X,te,function(Q){Q&&(Q.code==="EMFILE"||Q.code==="ENFILE")?Ht([D,[X,te,z],Q,J||Date.now(),Date.now()]):typeof z=="function"&&z.apply(this,arguments)})}}var r=n.writeFile;n.writeFile=s;function s(C,B,j,D){return typeof j=="function"&&(D=j,j=null),X(C,B,j,D);function X(te,z,J,Q,ue){return r(te,z,J,function(ne){ne&&(ne.code==="EMFILE"||ne.code==="ENFILE")?Ht([X,[te,z,J,Q],ne,ue||Date.now(),Date.now()]):typeof Q=="function"&&Q.apply(this,arguments)})}}var i=n.appendFile;i&&(n.appendFile=o);function o(C,B,j,D){return typeof j=="function"&&(D=j,j=null),X(C,B,j,D);function X(te,z,J,Q,ue){return i(te,z,J,function(ne){ne&&(ne.code==="EMFILE"||ne.code==="ENFILE")?Ht([X,[te,z,J,Q],ne,ue||Date.now(),Date.now()]):typeof Q=="function"&&Q.apply(this,arguments)})}}var a=n.copyFile;a&&(n.copyFile=l);function l(C,B,j,D){return typeof j=="function"&&(D=j,j=0),X(C,B,j,D);function X(te,z,J,Q,ue){return a(te,z,J,function(ne){ne&&(ne.code==="EMFILE"||ne.code==="ENFILE")?Ht([X,[te,z,J,Q],ne,ue||Date.now(),Date.now()]):typeof Q=="function"&&Q.apply(this,arguments)})}}var c=n.readdir;n.readdir=f;var u=/^v[0-5]\./;function f(C,B,j){typeof B=="function"&&(j=B,B=null);var D=u.test(process.version)?function(z,J,Q,ue){return c(z,X(z,J,Q,ue))}:function(z,J,Q,ue){return c(z,J,X(z,J,Q,ue))};return D(C,B,j);function X(te,z,J,Q){return function(ue,ne){ue&&(ue.code==="EMFILE"||ue.code==="ENFILE")?Ht([D,[te,z,J],ue,Q||Date.now(),Date.now()]):(ne&&ne.sort&&ne.sort(),typeof J=="function"&&J.call(this,ue,ne))}}}if(process.version.substr(0,4)==="v0.8"){var h=X0(n);S=h.ReadStream,I=h.WriteStream}var d=n.ReadStream;d&&(S.prototype=Object.create(d.prototype),S.prototype.open=w);var y=n.WriteStream;y&&(I.prototype=Object.create(y.prototype),I.prototype.open=x),Object.defineProperty(n,"ReadStream",{get:function(){return S},set:function(C){S=C},enumerable:!0,configurable:!0}),Object.defineProperty(n,"WriteStream",{get:function(){return I},set:function(C){I=C},enumerable:!0,configurable:!0});var m=S;Object.defineProperty(n,"FileReadStream",{get:function(){return m},set:function(C){m=C},enumerable:!0,configurable:!0});var _=I;Object.defineProperty(n,"FileWriteStream",{get:function(){return _},set:function(C){_=C},enumerable:!0,configurable:!0});function S(C,B){return this instanceof S?(d.apply(this,arguments),this):S.apply(Object.create(S.prototype),arguments)}function w(){var C=this;R(C.path,C.flags,C.mode,function(B,j){B?(C.autoClose&&C.destroy(),C.emit("error",B)):(C.fd=j,C.emit("open",j),C.read())})}function I(C,B){return this instanceof I?(y.apply(this,arguments),this):I.apply(Object.create(I.prototype),arguments)}function x(){var C=this;R(C.path,C.flags,C.mode,function(B,j){B?(C.destroy(),C.emit("error",B)):(C.fd=j,C.emit("open",j))})}function q(C,B){return new n.ReadStream(C,B)}function M(C,B){return new n.WriteStream(C,B)}var Y=n.open;n.open=R;function R(C,B,j,D){return typeof j=="function"&&(D=j,j=null),X(C,B,j,D);function X(te,z,J,Q,ue){return Y(te,z,J,function(ne,Ai){ne&&(ne.code==="EMFILE"||ne.code==="ENFILE")?Ht([X,[te,z,J,Q],ne,ue||Date.now(),Date.now()]):typeof Q=="function"&&Q.apply(this,arguments)})}}return n}function Ht(n){vt("ENQUEUE",n[0].name,n[1]),oe[me].push(n),Zi()}var vr;function lu(){for(var n=Date.now(),e=0;e<oe[me].length;++e)oe[me][e].length>2&&(oe[me][e][3]=n,oe[me][e][4]=n);Zi()}function Zi(){if(clearTimeout(vr),vr=void 0,oe[me].length!==0){var n=oe[me].shift(),e=n[0],t=n[1],r=n[2],s=n[3],i=n[4];if(s===void 0)vt("RETRY",e.name,t),e.apply(null,t);else if(Date.now()-s>=6e4){vt("TIMEOUT",e.name,t);var o=t.pop();typeof o=="function"&&o.call(null,r)}else{var a=Date.now()-i,l=Math.max(i-s,1),c=Math.min(l*1.2,100);a>=c?(vt("RETRY",e.name,t),e.apply(null,t.concat([s]))):oe[me].push(n)}vr===void 0&&(vr=setTimeout(Zi,0))}}});var we=p(et=>{"use strict";var uu=pe().fromCallback,Ae=Vt(),Z0=["access","appendFile","chmod","chown","close","copyFile","cp","fchmod","fchown","fdatasync","fstat","fsync","ftruncate","futimes","glob","lchmod","lchown","lutimes","link","lstat","mkdir","mkdtemp","open","opendir","readdir","readFile","readlink","realpath","rename","rm","rmdir","stat","statfs","symlink","truncate","unlink","utimes","writeFile"].filter(n=>typeof Ae[n]=="function");Object.assign(et,Ae);Z0.forEach(n=>{et[n]=uu(Ae[n])});et.exists=function(n,e){return typeof e=="function"?Ae.exists(n,e):new Promise(t=>Ae.exists(n,t))};et.read=function(n,e,t,r,s,i){return typeof i=="function"?Ae.read(n,e,t,r,s,i):new Promise((o,a)=>{Ae.read(n,e,t,r,s,(l,c,u)=>{if(l)return a(l);o({bytesRead:c,buffer:u})})})};et.write=function(n,e,...t){return typeof t[t.length-1]=="function"?Ae.write(n,e,...t):new Promise((r,s)=>{Ae.write(n,e,...t,(i,o,a)=>{if(i)return s(i);r({bytesWritten:o,buffer:a})})})};et.readv=function(n,e,...t){return typeof t[t.length-1]=="function"?Ae.readv(n,e,...t):new Promise((r,s)=>{Ae.readv(n,e,...t,(i,o,a)=>{if(i)return s(i);r({bytesRead:o,buffers:a})})})};et.writev=function(n,e,...t){return typeof t[t.length-1]=="function"?Ae.writev(n,e,...t):new Promise((r,s)=>{Ae.writev(n,e,...t,(i,o,a)=>{if(i)return s(i);r({bytesWritten:o,buffers:a})})})};typeof Ae.realpath.native=="function"?et.realpath.native=uu(Ae.realpath.native):process.emitWarning("fs.realpath.native is not a function. Is fs being monkey-patched?","Warning","fs-extra-WARN0003")});var hu=p((nN,fu)=>{"use strict";var ey=require("path");fu.exports.checkPath=function(e){if(process.platform==="win32"&&/[<>:"|?*]/.test(e.replace(ey.parse(e).root,""))){let r=new Error(`Path contains invalid characters: ${e}`);throw r.code="EINVAL",r}}});var mu=p((rN,to)=>{"use strict";var du=we(),{checkPath:pu}=hu(),_u=n=>{let e={mode:511};return typeof n=="number"?n:{...e,...n}.mode};to.exports.makeDir=async(n,e)=>(pu(n),du.mkdir(n,{mode:_u(e),recursive:!0}));to.exports.makeDirSync=(n,e)=>(pu(n),du.mkdirSync(n,{mode:_u(e),recursive:!0}))});var Ue=p((sN,gu)=>{"use strict";var ty=pe().fromPromise,{makeDir:ny,makeDirSync:no}=mu(),ro=ty(ny);gu.exports={mkdirs:ro,mkdirsSync:no,mkdirp:ro,mkdirpSync:no,ensureDir:ro,ensureDirSync:no}});var ct=p((iN,Eu)=>{"use strict";var ry=pe().fromPromise,yu=we();function sy(n){return yu.access(n).then(()=>!0).catch(()=>!1)}Eu.exports={pathExists:ry(sy),pathExistsSync:yu.existsSync}});var so=p((oN,Tu)=>{"use strict";var Wt=we(),iy=pe().fromPromise;async function oy(n,e,t){let r=await Wt.open(n,"r+"),s=null;try{await Wt.futimes(r,e,t)}finally{try{await Wt.close(r)}catch(i){s=i}}if(s)throw s}function ay(n,e,t){let r=Wt.openSync(n,"r+");return Wt.futimesSync(r,e,t),Wt.closeSync(r)}Tu.exports={utimesMillis:iy(oy),utimesMillisSync:ay}});var Nt=p((aN,Lu)=>{"use strict";var Gt=we(),_e=require("path"),Su=pe().fromPromise;function ly(n,e,t){let r=t.dereference?s=>Gt.stat(s,{bigint:!0}):s=>Gt.lstat(s,{bigint:!0});return Promise.all([r(n),r(e).catch(s=>{if(s.code==="ENOENT")return null;throw s})]).then(([s,i])=>({srcStat:s,destStat:i}))}function cy(n,e,t){let r,s=t.dereference?o=>Gt.statSync(o,{bigint:!0}):o=>Gt.lstatSync(o,{bigint:!0}),i=s(n);try{r=s(e)}catch(o){if(o.code==="ENOENT")return{srcStat:i,destStat:null};throw o}return{srcStat:i,destStat:r}}async function uy(n,e,t,r){let{srcStat:s,destStat:i}=await ly(n,e,r);if(i){if(gn(s,i)){let o=_e.basename(n),a=_e.basename(e);if(t==="move"&&o!==a&&o.toLowerCase()===a.toLowerCase())return{srcStat:s,destStat:i,isChangingCase:!0};throw new Error("Source and destination must not be the same.")}if(s.isDirectory()&&!i.isDirectory())throw new Error(`Cannot overwrite non-directory '${e}' with directory '${n}'.`);if(!s.isDirectory()&&i.isDirectory())throw new Error(`Cannot overwrite directory '${e}' with non-directory '${n}'.`)}if(s.isDirectory()&&io(n,e))throw new Error(Or(n,e,t));return{srcStat:s,destStat:i}}function fy(n,e,t,r){let{srcStat:s,destStat:i}=cy(n,e,r);if(i){if(gn(s,i)){let o=_e.basename(n),a=_e.basename(e);if(t==="move"&&o!==a&&o.toLowerCase()===a.toLowerCase())return{srcStat:s,destStat:i,isChangingCase:!0};throw new Error("Source and destination must not be the same.")}if(s.isDirectory()&&!i.isDirectory())throw new Error(`Cannot overwrite non-directory '${e}' with directory '${n}'.`);if(!s.isDirectory()&&i.isDirectory())throw new Error(`Cannot overwrite directory '${e}' with non-directory '${n}'.`)}if(s.isDirectory()&&io(n,e))throw new Error(Or(n,e,t));return{srcStat:s,destStat:i}}async function Au(n,e,t,r){let s=_e.resolve(_e.dirname(n)),i=_e.resolve(_e.dirname(t));if(i===s||i===_e.parse(i).root)return;let o;try{o=await Gt.stat(i,{bigint:!0})}catch(a){if(a.code==="ENOENT")return;throw a}if(gn(e,o))throw new Error(Or(n,t,r));return Au(n,e,i,r)}function wu(n,e,t,r){let s=_e.resolve(_e.dirname(n)),i=_e.resolve(_e.dirname(t));if(i===s||i===_e.parse(i).root)return;let o;try{o=Gt.statSync(i,{bigint:!0})}catch(a){if(a.code==="ENOENT")return;throw a}if(gn(e,o))throw new Error(Or(n,t,r));return wu(n,e,i,r)}function gn(n,e){return e.ino!==void 0&&e.dev!==void 0&&e.ino===n.ino&&e.dev===n.dev}function io(n,e){let t=_e.resolve(n).split(_e.sep).filter(s=>s),r=_e.resolve(e).split(_e.sep).filter(s=>s);return t.every((s,i)=>r[i]===s)}function Or(n,e,t){return`Cannot ${t} '${n}' to a subdirectory of itself, '${e}'.`}Lu.exports={checkPaths:Su(uy),checkPathsSync:fy,checkParentPaths:Su(Au),checkParentPathsSync:wu,isSrcSubdir:io,areIdentical:gn}});var bu=p((lN,Iu)=>{"use strict";async function hy(n,e){let t=[];for await(let r of n)t.push(e(r).then(()=>null,s=>s??new Error("unknown error")));await Promise.all(t.map(r=>r.then(s=>{if(s!==null)throw s})))}Iu.exports={asyncIteratorConcurrentProcess:hy}});var Ru=p((cN,Cu)=>{"use strict";var Ee=we(),yn=require("path"),{mkdirs:dy}=Ue(),{pathExists:py}=ct(),{utimesMillis:_y}=so(),En=Nt(),{asyncIteratorConcurrentProcess:my}=bu();async function gy(n,e,t={}){typeof t=="function"&&(t={filter:t}),t.clobber="clobber"in t?!!t.clobber:!0,t.overwrite="overwrite"in t?!!t.overwrite:t.clobber,t.preserveTimestamps&&process.arch==="ia32"&&process.emitWarning(`Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,"Warning","fs-extra-WARN0001");let{srcStat:r,destStat:s}=await En.checkPaths(n,e,"copy",t);if(await En.checkParentPaths(n,r,e,"copy"),!await Nu(n,e,t))return;let o=yn.dirname(e);await py(o)||await dy(o),await Ou(s,n,e,t)}async function Nu(n,e,t){return t.filter?t.filter(n,e):!0}async function Ou(n,e,t,r){let i=await(r.dereference?Ee.stat:Ee.lstat)(e);if(i.isDirectory())return Sy(i,n,e,t,r);if(i.isFile()||i.isCharacterDevice()||i.isBlockDevice())return yy(i,n,e,t,r);if(i.isSymbolicLink())return Ay(n,e,t,r);throw i.isSocket()?new Error(`Cannot copy a socket file: ${e}`):i.isFIFO()?new Error(`Cannot copy a FIFO pipe: ${e}`):new Error(`Unknown file: ${e}`)}async function yy(n,e,t,r,s){if(!e)return vu(n,t,r,s);if(s.overwrite)return await Ee.unlink(r),vu(n,t,r,s);if(s.errorOnExist)throw new Error(`'${r}' already exists`)}async function vu(n,e,t,r){if(await Ee.copyFile(e,t),r.preserveTimestamps){Ey(n.mode)&&await Ty(t,n.mode);let s=await Ee.stat(e);await _y(t,s.atime,s.mtime)}return Ee.chmod(t,n.mode)}function Ey(n){return(n&128)===0}function Ty(n,e){return Ee.chmod(n,e|128)}async function Sy(n,e,t,r,s){e||await Ee.mkdir(r),await my(await Ee.opendir(t),async i=>{let o=yn.join(t,i.name),a=yn.join(r,i.name);if(await Nu(o,a,s)){let{destStat:c}=await En.checkPaths(o,a,"copy",s);await Ou(c,o,a,s)}}),e||await Ee.chmod(r,n.mode)}async function Ay(n,e,t,r){let s=await Ee.readlink(e);if(r.dereference&&(s=yn.resolve(process.cwd(),s)),!n)return Ee.symlink(s,t);let i=null;try{i=await Ee.readlink(t)}catch(o){if(o.code==="EINVAL"||o.code==="UNKNOWN")return Ee.symlink(s,t);throw o}if(r.dereference&&(i=yn.resolve(process.cwd(),i)),s!==i){if(En.isSrcSubdir(s,i))throw new Error(`Cannot copy '${s}' to a subdirectory of itself, '${i}'.`);if(En.isSrcSubdir(i,s))throw new Error(`Cannot overwrite '${i}' with '${s}'.`)}return await Ee.unlink(t),Ee.symlink(s,t)}Cu.exports=gy});var qu=p((uN,xu)=>{"use strict";var Le=Vt(),Tn=require("path"),wy=Ue().mkdirsSync,Ly=so().utimesMillisSync,Sn=Nt();function Iy(n,e,t){typeof t=="function"&&(t={filter:t}),t=t||{},t.clobber="clobber"in t?!!t.clobber:!0,t.overwrite="overwrite"in t?!!t.overwrite:t.clobber,t.preserveTimestamps&&process.arch==="ia32"&&process.emitWarning(`Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,"Warning","fs-extra-WARN0002");let{srcStat:r,destStat:s}=Sn.checkPathsSync(n,e,"copy",t);if(Sn.checkParentPathsSync(n,r,e,"copy"),t.filter&&!t.filter(n,e))return;let i=Tn.dirname(e);return Le.existsSync(i)||wy(i),Pu(s,n,e,t)}function Pu(n,e,t,r){let i=(r.dereference?Le.statSync:Le.lstatSync)(e);if(i.isDirectory())return Py(i,n,e,t,r);if(i.isFile()||i.isCharacterDevice()||i.isBlockDevice())return by(i,n,e,t,r);if(i.isSymbolicLink())return xy(n,e,t,r);throw i.isSocket()?new Error(`Cannot copy a socket file: ${e}`):i.isFIFO()?new Error(`Cannot copy a FIFO pipe: ${e}`):new Error(`Unknown file: ${e}`)}function by(n,e,t,r,s){return e?vy(n,t,r,s):ku(n,t,r,s)}function vy(n,e,t,r){if(r.overwrite)return Le.unlinkSync(t),ku(n,e,t,r);if(r.errorOnExist)throw new Error(`'${t}' already exists`)}function ku(n,e,t,r){return Le.copyFileSync(e,t),r.preserveTimestamps&&Ny(n.mode,e,t),oo(t,n.mode)}function Ny(n,e,t){return Oy(n)&&Cy(t,n),Ry(e,t)}function Oy(n){return(n&128)===0}function Cy(n,e){return oo(n,e|128)}function oo(n,e){return Le.chmodSync(n,e)}function Ry(n,e){let t=Le.statSync(n);return Ly(e,t.atime,t.mtime)}function Py(n,e,t,r,s){return e?$u(t,r,s):ky(n.mode,t,r,s)}function ky(n,e,t,r){return Le.mkdirSync(t),$u(e,t,r),oo(t,n)}function $u(n,e,t){let r=Le.opendirSync(n);try{let s;for(;(s=r.readSync())!==null;)$y(s.name,n,e,t)}finally{r.closeSync()}}function $y(n,e,t,r){let s=Tn.join(e,n),i=Tn.join(t,n);if(r.filter&&!r.filter(s,i))return;let{destStat:o}=Sn.checkPathsSync(s,i,"copy",r);return Pu(o,s,i,r)}function xy(n,e,t,r){let s=Le.readlinkSync(e);if(r.dereference&&(s=Tn.resolve(process.cwd(),s)),n){let i;try{i=Le.readlinkSync(t)}catch(o){if(o.code==="EINVAL"||o.code==="UNKNOWN")return Le.symlinkSync(s,t);throw o}if(r.dereference&&(i=Tn.resolve(process.cwd(),i)),s!==i){if(Sn.isSrcSubdir(s,i))throw new Error(`Cannot copy '${s}' to a subdirectory of itself, '${i}'.`);if(Sn.isSrcSubdir(i,s))throw new Error(`Cannot overwrite '${i}' with '${s}'.`)}return qy(s,t)}else return Le.symlinkSync(s,t)}function qy(n,e){return Le.unlinkSync(e),Le.symlinkSync(n,e)}xu.exports=Iy});var Cr=p((fN,Mu)=>{"use strict";var My=pe().fromPromise;Mu.exports={copy:My(Ru()),copySync:qu()}});var An=p((hN,Du)=>{"use strict";var Fu=Vt(),Fy=pe().fromCallback;function Dy(n,e){Fu.rm(n,{recursive:!0,force:!0},e)}function jy(n){Fu.rmSync(n,{recursive:!0,force:!0})}Du.exports={remove:Fy(Dy),removeSync:jy}});var Ku=p((dN,Gu)=>{"use strict";var By=pe().fromPromise,Uu=we(),Hu=require("path"),Vu=Ue(),Wu=An(),ju=By(async function(e){let t;try{t=await Uu.readdir(e)}catch{return Vu.mkdirs(e)}return Promise.all(t.map(r=>Wu.remove(Hu.join(e,r))))});function Bu(n){let e;try{e=Uu.readdirSync(n)}catch{return Vu.mkdirsSync(n)}e.forEach(t=>{t=Hu.join(n,t),Wu.removeSync(t)})}Gu.exports={emptyDirSync:Bu,emptydirSync:Bu,emptyDir:ju,emptydir:ju}});var zu=p((pN,Xu)=>{"use strict";var Uy=pe().fromPromise,Yu=require("path"),tt=we(),Ju=Ue();async function Hy(n){let e;try{e=await tt.stat(n)}catch{}if(e&&e.isFile())return;let t=Yu.dirname(n),r=null;try{r=await tt.stat(t)}catch(s){if(s.code==="ENOENT"){await Ju.mkdirs(t),await tt.writeFile(n,"");return}else throw s}r.isDirectory()?await tt.writeFile(n,""):await tt.readdir(t)}function Vy(n){let e;try{e=tt.statSync(n)}catch{}if(e&&e.isFile())return;let t=Yu.dirname(n);try{tt.statSync(t).isDirectory()||tt.readdirSync(t)}catch(r){if(r&&r.code==="ENOENT")Ju.mkdirsSync(t);else throw r}tt.writeFileSync(n,"")}Xu.exports={createFile:Uy(Hy),createFileSync:Vy}});var nf=p((_N,tf)=>{"use strict";var Wy=pe().fromPromise,Qu=require("path"),ut=we(),Zu=Ue(),{pathExists:Gy}=ct(),{areIdentical:ef}=Nt();async function Ky(n,e){let t;try{t=await ut.lstat(e)}catch{}let r;try{r=await ut.lstat(n)}catch(o){throw o.message=o.message.replace("lstat","ensureLink"),o}if(t&&ef(r,t))return;let s=Qu.dirname(e);await Gy(s)||await Zu.mkdirs(s),await ut.link(n,e)}function Yy(n,e){let t;try{t=ut.lstatSync(e)}catch{}try{let i=ut.lstatSync(n);if(t&&ef(i,t))return}catch(i){throw i.message=i.message.replace("lstat","ensureLink"),i}let r=Qu.dirname(e);return ut.existsSync(r)||Zu.mkdirsSync(r),ut.linkSync(n,e)}tf.exports={createLink:Wy(Ky),createLinkSync:Yy}});var sf=p((mN,rf)=>{"use strict";var ft=require("path"),wn=we(),{pathExists:Jy}=ct(),Xy=pe().fromPromise;async function zy(n,e){if(ft.isAbsolute(n)){try{await wn.lstat(n)}catch(i){throw i.message=i.message.replace("lstat","ensureSymlink"),i}return{toCwd:n,toDst:n}}let t=ft.dirname(e),r=ft.join(t,n);if(await Jy(r))return{toCwd:r,toDst:n};try{await wn.lstat(n)}catch(i){throw i.message=i.message.replace("lstat","ensureSymlink"),i}return{toCwd:n,toDst:ft.relative(t,n)}}function Qy(n,e){if(ft.isAbsolute(n)){if(!wn.existsSync(n))throw new Error("absolute srcpath does not exist");return{toCwd:n,toDst:n}}let t=ft.dirname(e),r=ft.join(t,n);if(wn.existsSync(r))return{toCwd:r,toDst:n};if(!wn.existsSync(n))throw new Error("relative srcpath does not exist");return{toCwd:n,toDst:ft.relative(t,n)}}rf.exports={symlinkPaths:Xy(zy),symlinkPathsSync:Qy}});var lf=p((gN,af)=>{"use strict";var of=we(),Zy=pe().fromPromise;async function eE(n,e){if(e)return e;let t;try{t=await of.lstat(n)}catch{return"file"}return t&&t.isDirectory()?"dir":"file"}function tE(n,e){if(e)return e;let t;try{t=of.lstatSync(n)}catch{return"file"}return t&&t.isDirectory()?"dir":"file"}af.exports={symlinkType:Zy(eE),symlinkTypeSync:tE}});var hf=p((yN,ff)=>{"use strict";var nE=pe().fromPromise,cf=require("path"),Ge=we(),{mkdirs:rE,mkdirsSync:sE}=Ue(),{symlinkPaths:iE,symlinkPathsSync:oE}=sf(),{symlinkType:aE,symlinkTypeSync:lE}=lf(),{pathExists:cE}=ct(),{areIdentical:uf}=Nt();async function uE(n,e,t){let r;try{r=await Ge.lstat(e)}catch{}if(r&&r.isSymbolicLink()){let[a,l]=await Promise.all([Ge.stat(n),Ge.stat(e)]);if(uf(a,l))return}let s=await iE(n,e);n=s.toDst;let i=await aE(s.toCwd,t),o=cf.dirname(e);return await cE(o)||await rE(o),Ge.symlink(n,e,i)}function fE(n,e,t){let r;try{r=Ge.lstatSync(e)}catch{}if(r&&r.isSymbolicLink()){let a=Ge.statSync(n),l=Ge.statSync(e);if(uf(a,l))return}let s=oE(n,e);n=s.toDst,t=lE(s.toCwd,t);let i=cf.dirname(e);return Ge.existsSync(i)||sE(i),Ge.symlinkSync(n,e,t)}ff.exports={createSymlink:nE(uE),createSymlinkSync:fE}});var Tf=p((EN,Ef)=>{"use strict";var{createFile:df,createFileSync:pf}=zu(),{createLink:_f,createLinkSync:mf}=nf(),{createSymlink:gf,createSymlinkSync:yf}=hf();Ef.exports={createFile:df,createFileSync:pf,ensureFile:df,ensureFileSync:pf,createLink:_f,createLinkSync:mf,ensureLink:_f,ensureLinkSync:mf,createSymlink:gf,createSymlinkSync:yf,ensureSymlink:gf,ensureSymlinkSync:yf}});var Rr=p((TN,Sf)=>{function hE(n,{EOL:e=`
`,finalEOL:t=!0,replacer:r=null,spaces:s}={}){let i=t?e:"";return JSON.stringify(n,r,s).replace(/\n/g,e)+i}function dE(n){return Buffer.isBuffer(n)&&(n=n.toString("utf8")),n.replace(/^\uFEFF/,"")}Sf.exports={stringify:hE,stripBom:dE}});var If=p((SN,Lf)=>{var Kt;try{Kt=Vt()}catch{Kt=require("fs")}var Pr=pe(),{stringify:Af,stripBom:wf}=Rr();async function pE(n,e={}){typeof e=="string"&&(e={encoding:e});let t=e.fs||Kt,r="throws"in e?e.throws:!0,s=await Pr.fromCallback(t.readFile)(n,e);s=wf(s);let i;try{i=JSON.parse(s,e?e.reviver:null)}catch(o){if(r)throw o.message=`${n}: ${o.message}`,o;return null}return i}var _E=Pr.fromPromise(pE);function mE(n,e={}){typeof e=="string"&&(e={encoding:e});let t=e.fs||Kt,r="throws"in e?e.throws:!0;try{let s=t.readFileSync(n,e);return s=wf(s),JSON.parse(s,e.reviver)}catch(s){if(r)throw s.message=`${n}: ${s.message}`,s;return null}}async function gE(n,e,t={}){let r=t.fs||Kt,s=Af(e,t);await Pr.fromCallback(r.writeFile)(n,s,t)}var yE=Pr.fromPromise(gE);function EE(n,e,t={}){let r=t.fs||Kt,s=Af(e,t);return r.writeFileSync(n,s,t)}Lf.exports={readFile:_E,readFileSync:mE,writeFile:yE,writeFileSync:EE}});var vf=p((AN,bf)=>{"use strict";var kr=If();bf.exports={readJson:kr.readFile,readJsonSync:kr.readFileSync,writeJson:kr.writeFile,writeJsonSync:kr.writeFileSync}});var $r=p((wN,Cf)=>{"use strict";var TE=pe().fromPromise,ao=we(),Nf=require("path"),Of=Ue(),SE=ct().pathExists;async function AE(n,e,t="utf-8"){let r=Nf.dirname(n);return await SE(r)||await Of.mkdirs(r),ao.writeFile(n,e,t)}function wE(n,...e){let t=Nf.dirname(n);ao.existsSync(t)||Of.mkdirsSync(t),ao.writeFileSync(n,...e)}Cf.exports={outputFile:TE(AE),outputFileSync:wE}});var Pf=p((LN,Rf)=>{"use strict";var{stringify:LE}=Rr(),{outputFile:IE}=$r();async function bE(n,e,t={}){let r=LE(e,t);await IE(n,r,t)}Rf.exports=bE});var $f=p((IN,kf)=>{"use strict";var{stringify:vE}=Rr(),{outputFileSync:NE}=$r();function OE(n,e,t){let r=vE(e,t);NE(n,r,t)}kf.exports=OE});var qf=p((bN,xf)=>{"use strict";var CE=pe().fromPromise,Ie=vf();Ie.outputJson=CE(Pf());Ie.outputJsonSync=$f();Ie.outputJSON=Ie.outputJson;Ie.outputJSONSync=Ie.outputJsonSync;Ie.writeJSON=Ie.writeJson;Ie.writeJSONSync=Ie.writeJsonSync;Ie.readJSON=Ie.readJson;Ie.readJSONSync=Ie.readJsonSync;xf.exports=Ie});var Bf=p((vN,jf)=>{"use strict";var RE=we(),Mf=require("path"),{copy:PE}=Cr(),{remove:Df}=An(),{mkdirp:kE}=Ue(),{pathExists:$E}=ct(),Ff=Nt();async function xE(n,e,t={}){let r=t.overwrite||t.clobber||!1,{srcStat:s,isChangingCase:i=!1}=await Ff.checkPaths(n,e,"move",t);await Ff.checkParentPaths(n,s,e,"move");let o=Mf.dirname(e);return Mf.parse(o).root!==o&&await kE(o),qE(n,e,r,i)}async function qE(n,e,t,r){if(!r){if(t)await Df(e);else if(await $E(e))throw new Error("dest already exists.")}try{await RE.rename(n,e)}catch(s){if(s.code!=="EXDEV")throw s;await ME(n,e,t)}}async function ME(n,e,t){return await PE(n,e,{overwrite:t,errorOnExist:!0,preserveTimestamps:!0}),Df(n)}jf.exports=xE});var Gf=p((NN,Wf)=>{"use strict";var Hf=Vt(),co=require("path"),FE=Cr().copySync,Vf=An().removeSync,DE=Ue().mkdirpSync,Uf=Nt();function jE(n,e,t){t=t||{};let r=t.overwrite||t.clobber||!1,{srcStat:s,isChangingCase:i=!1}=Uf.checkPathsSync(n,e,"move",t);return Uf.checkParentPathsSync(n,s,e,"move"),BE(e)||DE(co.dirname(e)),UE(n,e,r,i)}function BE(n){let e=co.dirname(n);return co.parse(e).root===e}function UE(n,e,t,r){if(r)return lo(n,e,t);if(t)return Vf(e),lo(n,e,t);if(Hf.existsSync(e))throw new Error("dest already exists.");return lo(n,e,t)}function lo(n,e,t){try{Hf.renameSync(n,e)}catch(r){if(r.code!=="EXDEV")throw r;return HE(n,e,t)}}function HE(n,e,t){return FE(n,e,{overwrite:t,errorOnExist:!0,preserveTimestamps:!0}),Vf(n)}Wf.exports=jE});var Yf=p((ON,Kf)=>{"use strict";var VE=pe().fromPromise;Kf.exports={move:VE(Bf()),moveSync:Gf()}});var ht=p((CN,Jf)=>{"use strict";Jf.exports={...we(),...Cr(),...Ku(),...Tf(),...qf(),...Ue(),...Yf(),...$r(),...ct(),...An()}});var Zf=p((MN,mo)=>{typeof Object.create=="function"?mo.exports=function(e,t){t&&(e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}))}:mo.exports=function(e,t){if(t){e.super_=t;var r=function(){};r.prototype=t.prototype,e.prototype=new r,e.prototype.constructor=e}}});var eh=p((FN,yo)=>{try{if(go=require("util"),typeof go.inherits!="function")throw"";yo.exports=go.inherits}catch{yo.exports=Zf()}var go});var nh=p((DN,To)=>{var zE=eh(),th=require("events").EventEmitter;To.exports=ke;To.exports.default=ke;function ke(n){if(!(this instanceof ke))return new ke(n);th.call(this),n=n||{},this.concurrency=n.concurrency||1/0,this.timeout=n.timeout||0,this.autostart=n.autostart||!1,this.results=n.results||null,this.pending=0,this.session=0,this.running=!1,this.jobs=[],this.timers={}}zE(ke,th);var QE=["pop","shift","indexOf","lastIndexOf"];QE.forEach(function(n){ke.prototype[n]=function(){return Array.prototype[n].apply(this.jobs,arguments)}});ke.prototype.slice=function(n,e){return this.jobs=this.jobs.slice(n,e),this};ke.prototype.reverse=function(){return this.jobs.reverse(),this};var ZE=["push","unshift","splice"];ZE.forEach(function(n){ke.prototype[n]=function(){var e=Array.prototype[n].apply(this.jobs,arguments);return this.autostart&&this.start(),e}});Object.defineProperty(ke.prototype,"length",{get:function(){return this.pending+this.jobs.length}});ke.prototype.start=function(n){if(n&&t1.call(this,n),this.running=!0,this.pending>=this.concurrency)return;if(this.jobs.length===0){this.pending===0&&Eo.call(this);return}var e=this,t=this.jobs.shift(),r=!0,s=this.session,i=null,o=!1,a=null,l=t.hasOwnProperty("timeout")?t.timeout:this.timeout;function c(f,h){r&&e.session===s&&(r=!1,e.pending--,i!==null&&(delete e.timers[i],clearTimeout(i)),f?e.emit("error",f,t):o===!1&&(a!==null&&(e.results[a]=Array.prototype.slice.call(arguments,1)),e.emit("success",h,t)),e.session===s&&(e.pending===0&&e.jobs.length===0?Eo.call(e):e.running&&e.start()))}l&&(i=setTimeout(function(){o=!0,e.listeners("timeout").length>0?e.emit("timeout",c,t):c()},l),this.timers[i]=i),this.results&&(a=this.results.length,this.results[a]=null),this.pending++,e.emit("start",t);var u=t(c);u&&u.then&&typeof u.then=="function"&&u.then(function(f){return c(null,f)}).catch(function(f){return c(f||!0)}),this.running&&this.jobs.length>0&&this.start()};ke.prototype.stop=function(){this.running=!1};ke.prototype.end=function(n){e1.call(this),this.jobs.length=0,this.pending=0,Eo.call(this,n)};function e1(){for(var n in this.timers){var e=this.timers[n];delete this.timers[n],clearTimeout(e)}}function t1(n){var e=this;this.on("error",t),this.on("end",r);function t(s){e.end(s)}function r(s){e.removeListener("error",t),e.removeListener("end",r),n(s,this.results)}}function Eo(n){this.session++,this.running=!1,this.emit("end",n)}});var ae=p(Z=>{"use strict";Object.defineProperty(Z,"__esModule",{value:!0});Z.findBox=Z.readUInt=Z.readUInt32LE=Z.readUInt32BE=Z.readInt32LE=Z.readUInt24LE=Z.readUInt16LE=Z.readUInt16BE=Z.readInt16LE=Z.toHexString=Z.toUTF8String=void 0;var n1=new TextDecoder,r1=(n,e=0,t=n.length)=>n1.decode(n.slice(e,t));Z.toUTF8String=r1;var s1=(n,e=0,t=n.length)=>n.slice(e,t).reduce((r,s)=>r+("0"+s.toString(16)).slice(-2),"");Z.toHexString=s1;var i1=(n,e=0)=>{let t=n[e]+n[e+1]*256;return t|(t&2**15)*131070};Z.readInt16LE=i1;var o1=(n,e=0)=>n[e]*2**8+n[e+1];Z.readUInt16BE=o1;var a1=(n,e=0)=>n[e]+n[e+1]*2**8;Z.readUInt16LE=a1;var l1=(n,e=0)=>n[e]+n[e+1]*2**8+n[e+2]*2**16;Z.readUInt24LE=l1;var c1=(n,e=0)=>n[e]+n[e+1]*2**8+n[e+2]*2**16+(n[e+3]<<24);Z.readInt32LE=c1;var u1=(n,e=0)=>n[e]*2**24+n[e+1]*2**16+n[e+2]*2**8+n[e+3];Z.readUInt32BE=u1;var f1=(n,e=0)=>n[e]+n[e+1]*2**8+n[e+2]*2**16+n[e+3]*2**24;Z.readUInt32LE=f1;var h1={readUInt16BE:Z.readUInt16BE,readUInt16LE:Z.readUInt16LE,readUInt32BE:Z.readUInt32BE,readUInt32LE:Z.readUInt32LE};function d1(n,e,t,r){t=t||0;let s=r?"BE":"LE",i="readUInt"+e+s;return h1[i](n,t)}Z.readUInt=d1;function p1(n,e){if(n.length-e<4)return;let t=(0,Z.readUInt32BE)(n,e);if(!(n.length-e<t))return{name:(0,Z.toUTF8String)(n,4+e,8+e),offset:e,size:t}}function _1(n,e,t){for(;t<n.length;){let r=p1(n,t);if(!r)break;if(r.name===e)return r;t+=r.size>0?r.size:8}}Z.findBox=_1});var rh=p(qr=>{"use strict";Object.defineProperty(qr,"__esModule",{value:!0});qr.BMP=void 0;var So=ae();qr.BMP={validate:n=>(0,So.toUTF8String)(n,0,2)==="BM",calculate:n=>({height:Math.abs((0,So.readInt32LE)(n,22)),width:(0,So.readUInt32LE)(n,18)})}});var Ao=p(Fr=>{"use strict";Object.defineProperty(Fr,"__esModule",{value:!0});Fr.ICO=void 0;var Mr=ae(),m1=1,g1=6,y1=16;function sh(n,e){let t=n[e];return t===0?256:t}function ih(n,e){let t=g1+e*y1;return{height:sh(n,t+1),width:sh(n,t)}}Fr.ICO={validate(n){let e=(0,Mr.readUInt16LE)(n,0),t=(0,Mr.readUInt16LE)(n,4);return e!==0||t===0?!1:(0,Mr.readUInt16LE)(n,2)===m1},calculate(n){let e=(0,Mr.readUInt16LE)(n,4),t=ih(n,0);if(e===1)return t;let r=[t];for(let s=1;s<e;s+=1)r.push(ih(n,s));return{height:t.height,images:r,width:t.width}}}});var oh=p(Dr=>{"use strict";Object.defineProperty(Dr,"__esModule",{value:!0});Dr.CUR=void 0;var E1=Ao(),wo=ae(),T1=2;Dr.CUR={validate(n){let e=(0,wo.readUInt16LE)(n,0),t=(0,wo.readUInt16LE)(n,4);return e!==0||t===0?!1:(0,wo.readUInt16LE)(n,2)===T1},calculate:n=>E1.ICO.calculate(n)}});var ah=p(jr=>{"use strict";Object.defineProperty(jr,"__esModule",{value:!0});jr.DDS=void 0;var Lo=ae();jr.DDS={validate:n=>(0,Lo.readUInt32LE)(n,0)===542327876,calculate:n=>({height:(0,Lo.readUInt32LE)(n,12),width:(0,Lo.readUInt32LE)(n,16)})}});var lh=p(Br=>{"use strict";Object.defineProperty(Br,"__esModule",{value:!0});Br.GIF=void 0;var Io=ae(),S1=/^GIF8[79]a/;Br.GIF={validate:n=>S1.test((0,Io.toUTF8String)(n,0,6)),calculate:n=>({height:(0,Io.readUInt16LE)(n,8),width:(0,Io.readUInt16LE)(n,6)})}});var ch=p(Ur=>{"use strict";Object.defineProperty(Ur,"__esModule",{value:!0});Ur.HEIF=void 0;var Ye=ae(),A1={avif:"avif",mif1:"heif",msf1:"heif",heic:"heic",heix:"heic",hevc:"heic",hevx:"heic"};Ur.HEIF={validate(n){if((0,Ye.toUTF8String)(n,4,8)!=="ftyp")return!1;let t=(0,Ye.findBox)(n,"ftyp",0);return t?(0,Ye.toUTF8String)(n,t.offset+8,t.offset+12)in A1:!1},calculate(n){let e=(0,Ye.findBox)(n,"meta",0),t=e&&(0,Ye.findBox)(n,"iprp",e.offset+12),r=t&&(0,Ye.findBox)(n,"ipco",t.offset+8),s=r&&(0,Ye.findBox)(n,"ispe",r.offset+8);if(s)return{height:(0,Ye.readUInt32BE)(n,s.offset+16),width:(0,Ye.readUInt32BE)(n,s.offset+12),type:(0,Ye.toUTF8String)(n,8,12)};throw new TypeError("Invalid HEIF, no size found")}}});var hh=p(Vr=>{"use strict";Object.defineProperty(Vr,"__esModule",{value:!0});Vr.ICNS=void 0;var Hr=ae(),w1=8,L1=4,I1=4,b1={ICON:32,"ICN#":32,"icm#":16,icm4:16,icm8:16,"ics#":16,ics4:16,ics8:16,is32:16,s8mk:16,icp4:16,icl4:32,icl8:32,il32:32,l8mk:32,icp5:32,ic11:32,ich4:48,ich8:48,ih32:48,h8mk:48,icp6:64,ic12:32,it32:128,t8mk:128,ic07:128,ic08:256,ic13:256,ic09:512,ic14:512,ic10:1024};function uh(n,e){let t=e+I1;return[(0,Hr.toUTF8String)(n,e,t),(0,Hr.readUInt32BE)(n,t)]}function fh(n){let e=b1[n];return{width:e,height:e,type:n}}Vr.ICNS={validate:n=>(0,Hr.toUTF8String)(n,0,4)==="icns",calculate(n){let e=n.length,t=(0,Hr.readUInt32BE)(n,L1),r=w1,s=uh(n,r),i=fh(s[0]);if(r+=s[1],r===t)return i;let o={height:i.height,images:[i],width:i.width};for(;r<t&&r<e;)s=uh(n,r),i=fh(s[0]),r+=s[1],o.images.push(i);return o}}});var dh=p(Wr=>{"use strict";Object.defineProperty(Wr,"__esModule",{value:!0});Wr.J2C=void 0;var bo=ae();Wr.J2C={validate:n=>(0,bo.readUInt32BE)(n,0)===4283432785,calculate:n=>({height:(0,bo.readUInt32BE)(n,12),width:(0,bo.readUInt32BE)(n,8)})}});var ph=p(Gr=>{"use strict";Object.defineProperty(Gr,"__esModule",{value:!0});Gr.JP2=void 0;var Ct=ae();Gr.JP2={validate(n){if((0,Ct.toUTF8String)(n,4,8)!=="jP  ")return!1;let t=(0,Ct.findBox)(n,"ftyp",0);return t?(0,Ct.toUTF8String)(n,t.offset+8,t.offset+12)==="jp2 ":!1},calculate(n){let e=(0,Ct.findBox)(n,"jp2h",0),t=e&&(0,Ct.findBox)(n,"ihdr",e.offset+8);if(t)return{height:(0,Ct.readUInt32BE)(n,t.offset+8),width:(0,Ct.readUInt32BE)(n,t.offset+12)};throw new TypeError("Unsupported JPEG 2000 format")}}});var mh=p(Kr=>{"use strict";Object.defineProperty(Kr,"__esModule",{value:!0});Kr.JPG=void 0;var He=ae(),v1="45786966",N1=2,vo=6,O1=2,C1="4d4d",R1="4949",_h=12,P1=2;function k1(n){return(0,He.toHexString)(n,2,6)===v1}function $1(n,e){return{height:(0,He.readUInt16BE)(n,e),width:(0,He.readUInt16BE)(n,e+2)}}function x1(n,e){let r=vo+8,s=(0,He.readUInt)(n,16,r,e);for(let i=0;i<s;i++){let o=r+P1+i*_h,a=o+_h;if(o>n.length)return;let l=n.slice(o,a);if((0,He.readUInt)(l,16,0,e)===274)return(0,He.readUInt)(l,16,2,e)!==3||(0,He.readUInt)(l,32,4,e)!==1?void 0:(0,He.readUInt)(l,16,8,e)}}function q1(n,e){let t=n.slice(N1,e),r=(0,He.toHexString)(t,vo,vo+O1),s=r===C1;if(s||r===R1)return x1(t,s)}function M1(n,e){if(e>n.length)throw new TypeError("Corrupt JPG, exceeded buffer limits")}Kr.JPG={validate:n=>(0,He.toHexString)(n,0,2)==="ffd8",calculate(n){n=n.slice(4);let e,t;for(;n.length;){let r=(0,He.readUInt16BE)(n,0);if(n[r]!==255){n=n.slice(1);continue}if(k1(n)&&(e=q1(n,r)),M1(n,r),t=n[r+1],t===192||t===193||t===194){let s=$1(n,r+5);return e?{height:s.height,orientation:e,width:s.width}:s}n=n.slice(r+2)}throw new TypeError("Invalid JPG, no size found")}}});var gh=p(Yr=>{"use strict";Object.defineProperty(Yr,"__esModule",{value:!0});Yr.BitReader=void 0;var No=class{constructor(e,t){this.input=e,this.endianness=t,this.byteOffset=2,this.bitOffset=0}getBits(e=1){let t=0,r=0;for(;r<e;){if(this.byteOffset>=this.input.length)throw new Error("Reached end of input");let s=this.input[this.byteOffset],i=8-this.bitOffset,o=Math.min(e-r,i);if(this.endianness==="little-endian"){let a=(1<<o)-1,l=s>>this.bitOffset&a;t|=l<<r}else{let a=(1<<o)-1<<8-this.bitOffset-o,l=(s&a)>>8-this.bitOffset-o;t=t<<o|l}r+=o,this.bitOffset+=o,this.bitOffset===8&&(this.byteOffset++,this.bitOffset=0)}return t}};Yr.BitReader=No});var Oo=p(Jr=>{"use strict";Object.defineProperty(Jr,"__esModule",{value:!0});Jr.JXLStream=void 0;var F1=ae(),D1=gh();function yh(n,e){if(e)return 8*(1+n.getBits(5));{let t=n.getBits(2),r=[9,13,18,30][t];return 1+n.getBits(r)}}function j1(n,e,t,r){return e&&t===0?8*(1+n.getBits(5)):t===0?yh(n,!1):Math.floor(r*[1,1.2,1.3333333333333333,1.5,1.7777777777777777,1.25,2][t-1])}Jr.JXLStream={validate:n=>(0,F1.toHexString)(n,0,2)==="ff0a",calculate(n){let e=new D1.BitReader(n,"little-endian"),t=e.getBits(1)===1,r=yh(e,t),s=e.getBits(3);return{width:j1(e,t,s,r),height:r}}}});var Eh=p(Xr=>{"use strict";Object.defineProperty(Xr,"__esModule",{value:!0});Xr.JXL=void 0;var In=ae(),B1=Oo();function U1(n){let e=(0,In.findBox)(n,"jxlc",0);if(e)return n.slice(e.offset+8,e.offset+e.size);let t=H1(n);if(t.length>0)return V1(t)}function H1(n){let e=[],t=0;for(;t<n.length;){let r=(0,In.findBox)(n,"jxlp",t);if(!r)break;e.push(n.slice(r.offset+12,r.offset+r.size)),t=r.offset+r.size}return e}function V1(n){let e=n.reduce((s,i)=>s+i.length,0),t=new Uint8Array(e),r=0;for(let s of n)t.set(s,r),r+=s.length;return t}Xr.JXL={validate:n=>{if((0,In.toUTF8String)(n,4,8)!=="JXL ")return!1;let t=(0,In.findBox)(n,"ftyp",0);return t?(0,In.toUTF8String)(n,t.offset+8,t.offset+12)==="jxl ":!1},calculate(n){let e=U1(n);if(e)return B1.JXLStream.calculate(e);throw new Error("No codestream found in JXL container")}}});var Th=p(zr=>{"use strict";Object.defineProperty(zr,"__esModule",{value:!0});zr.KTX=void 0;var Co=ae();zr.KTX={validate:n=>{let e=(0,Co.toUTF8String)(n,1,7);return["KTX 11","KTX 20"].includes(e)},calculate:n=>{let e=n[5]===49?"ktx":"ktx2",t=e==="ktx"?36:20;return{height:(0,Co.readUInt32LE)(n,t+4),width:(0,Co.readUInt32LE)(n,t),type:e}}}});var Ah=p(Qr=>{"use strict";Object.defineProperty(Qr,"__esModule",{value:!0});Qr.PNG=void 0;var pt=ae(),W1=`PNG\r

`,G1="IHDR",Sh="CgBI";Qr.PNG={validate(n){if(W1===(0,pt.toUTF8String)(n,1,8)){let e=(0,pt.toUTF8String)(n,12,16);if(e===Sh&&(e=(0,pt.toUTF8String)(n,28,32)),e!==G1)throw new TypeError("Invalid PNG");return!0}return!1},calculate(n){return(0,pt.toUTF8String)(n,12,16)===Sh?{height:(0,pt.readUInt32BE)(n,36),width:(0,pt.readUInt32BE)(n,32)}:{height:(0,pt.readUInt32BE)(n,20),width:(0,pt.readUInt32BE)(n,16)}}}});var Ih=p(Zr=>{"use strict";Object.defineProperty(Zr,"__esModule",{value:!0});Zr.PNM=void 0;var Ro=ae(),wh={P1:"pbm/ascii",P2:"pgm/ascii",P3:"ppm/ascii",P4:"pbm",P5:"pgm",P6:"ppm",P7:"pam",PF:"pfm"},Lh={default:n=>{let e=[];for(;n.length>0;){let t=n.shift();if(t[0]!=="#"){e=t.split(" ");break}}if(e.length===2)return{height:parseInt(e[1],10),width:parseInt(e[0],10)};throw new TypeError("Invalid PNM")},pam:n=>{let e={};for(;n.length>0;){let t=n.shift();if(t.length>16||t.charCodeAt(0)>128)continue;let[r,s]=t.split(" ");if(r&&s&&(e[r.toLowerCase()]=parseInt(s,10)),e.height&&e.width)break}if(e.height&&e.width)return{height:e.height,width:e.width};throw new TypeError("Invalid PAM")}};Zr.PNM={validate:n=>(0,Ro.toUTF8String)(n,0,2)in wh,calculate(n){let e=(0,Ro.toUTF8String)(n,0,2),t=wh[e],r=(0,Ro.toUTF8String)(n,3).split(/[\r\n]+/);return(Lh[t]||Lh.default)(r)}}});var bh=p(es=>{"use strict";Object.defineProperty(es,"__esModule",{value:!0});es.PSD=void 0;var Po=ae();es.PSD={validate:n=>(0,Po.toUTF8String)(n,0,4)==="8BPS",calculate:n=>({height:(0,Po.readUInt32BE)(n,14),width:(0,Po.readUInt32BE)(n,18)})}});var Ch=p(rs=>{"use strict";Object.defineProperty(rs,"__esModule",{value:!0});rs.SVG=void 0;var vh=ae(),Nh=/<svg\s([^>"']|"[^"]*"|'[^']*')*>/,ts={height:/\sheight=(['"])([^%]+?)\1/,root:Nh,viewbox:/\sviewBox=(['"])(.+?)\1/i,width:/\swidth=(['"])([^%]+?)\1/},ko=2.54,Oh={in:96,cm:96/ko,em:16,ex:8,m:96/ko*100,mm:96/ko/10,pc:96/72/12,pt:96/72,px:1},K1=new RegExp(`^([0-9.]+(?:e\\d+)?)(${Object.keys(Oh).join("|")})?$`);function ns(n){let e=K1.exec(n);if(e)return Math.round(Number(e[1])*(Oh[e[2]]||1))}function Y1(n){let e=n.split(" ");return{height:ns(e[3]),width:ns(e[2])}}function J1(n){let e=n.match(ts.width),t=n.match(ts.height),r=n.match(ts.viewbox);return{height:t&&ns(t[2]),viewbox:r&&Y1(r[2]),width:e&&ns(e[2])}}function X1(n){return{height:n.height,width:n.width}}function z1(n,e){let t=e.width/e.height;return n.width?{height:Math.floor(n.width/t),width:n.width}:n.height?{height:n.height,width:Math.floor(n.height*t)}:{height:e.height,width:e.width}}rs.SVG={validate:n=>Nh.test((0,vh.toUTF8String)(n,0,1e3)),calculate(n){let e=(0,vh.toUTF8String)(n).match(ts.root);if(e){let t=J1(e[0]);if(t.width&&t.height)return X1(t);if(t.viewbox)return z1(t,t.viewbox)}throw new TypeError("Invalid SVG")}}});var Rh=p(is=>{"use strict";Object.defineProperty(is,"__esModule",{value:!0});is.TGA=void 0;var ss=ae();is.TGA={validate(n){return(0,ss.readUInt16LE)(n,0)===0&&(0,ss.readUInt16LE)(n,4)===0},calculate(n){return{height:(0,ss.readUInt16LE)(n,14),width:(0,ss.readUInt16LE)(n,12)}}}});var Ph=p(as=>{"use strict";Object.defineProperty(as,"__esModule",{value:!0});as.TIFF=void 0;var os=require("fs"),_t=ae();function Q1(n,e,t){let r=(0,_t.readUInt)(n,32,4,t),s=1024,i=os.statSync(e).size;r+s>i&&(s=i-r-10);let o=new Uint8Array(s),a=os.openSync(e,"r");return os.readSync(a,o,0,s,r),os.closeSync(a),o.slice(2)}function Z1(n,e){let t=(0,_t.readUInt)(n,16,8,e);return((0,_t.readUInt)(n,16,10,e)<<16)+t}function eT(n){if(n.length>24)return n.slice(12)}function tT(n,e){let t={},r=n;for(;r&&r.length;){let s=(0,_t.readUInt)(r,16,0,e),i=(0,_t.readUInt)(r,16,2,e),o=(0,_t.readUInt)(r,32,4,e);if(s===0)break;o===1&&(i===3||i===4)&&(t[s]=Z1(r,e)),r=eT(r)}return t}function nT(n){let e=(0,_t.toUTF8String)(n,0,2);if(e==="II")return"LE";if(e==="MM")return"BE"}var rT=["49492a00","4d4d002a"];as.TIFF={validate:n=>rT.includes((0,_t.toHexString)(n,0,4)),calculate(n,e){if(!e)throw new TypeError("Tiff doesn't support buffer");let t=nT(n)==="BE",r=Q1(n,e,t),s=tT(r,t),i=s[256],o=s[257];if(!i||!o)throw new TypeError("Invalid Tiff. Missing tags");return{height:o,width:i}}}});var kh=p(ls=>{"use strict";Object.defineProperty(ls,"__esModule",{value:!0});ls.WEBP=void 0;var nt=ae();function sT(n){return{height:1+(0,nt.readUInt24LE)(n,7),width:1+(0,nt.readUInt24LE)(n,4)}}function iT(n){return{height:1+((n[4]&15)<<10|n[3]<<2|(n[2]&192)>>6),width:1+((n[2]&63)<<8|n[1])}}function oT(n){return{height:(0,nt.readInt16LE)(n,8)&16383,width:(0,nt.readInt16LE)(n,6)&16383}}ls.WEBP={validate(n){let e=(0,nt.toUTF8String)(n,0,4)==="RIFF",t=(0,nt.toUTF8String)(n,8,12)==="WEBP",r=(0,nt.toUTF8String)(n,12,15)==="VP8";return e&&t&&r},calculate(n){let e=(0,nt.toUTF8String)(n,12,16);if(n=n.slice(20,30),e==="VP8X"){let r=n[0],s=(r&192)===0,i=(r&1)===0;if(s&&i)return sT(n);throw new TypeError("Invalid WebP")}if(e==="VP8 "&&n[0]!==47)return oT(n);let t=(0,nt.toHexString)(n,3,6);if(e==="VP8L"&&t!=="9d012a")return iT(n);throw new TypeError("Invalid WebP")}}});var $o=p(cs=>{"use strict";Object.defineProperty(cs,"__esModule",{value:!0});cs.typeHandlers=void 0;var aT=rh(),lT=oh(),cT=ah(),uT=lh(),fT=ch(),hT=hh(),dT=Ao(),pT=dh(),_T=ph(),mT=mh(),gT=Eh(),yT=Oo(),ET=Th(),TT=Ah(),ST=Ih(),AT=bh(),wT=Ch(),LT=Rh(),IT=Ph(),bT=kh();cs.typeHandlers={bmp:aT.BMP,cur:lT.CUR,dds:cT.DDS,gif:uT.GIF,heif:fT.HEIF,icns:hT.ICNS,ico:dT.ICO,j2c:pT.J2C,jp2:_T.JP2,jpg:mT.JPG,jxl:gT.JXL,"jxl-stream":yT.JXLStream,ktx:ET.KTX,png:TT.PNG,pnm:ST.PNM,psd:AT.PSD,svg:wT.SVG,tga:LT.TGA,tiff:IT.TIFF,webp:bT.WEBP}});var xh=p(us=>{"use strict";Object.defineProperty(us,"__esModule",{value:!0});us.detector=void 0;var xo=$o(),vT=Object.keys(xo.typeHandlers),$h={56:"psd",66:"bmp",68:"dds",71:"gif",73:"tiff",77:"tiff",82:"webp",105:"icns",137:"png",255:"jpg"};function NT(n){let e=n[0];if(e in $h){let r=$h[e];if(r&&xo.typeHandlers[r].validate(n))return r}let t=r=>xo.typeHandlers[r].validate(n);return vT.find(t)}us.detector=NT});var Dh=p((Ce,Fh)=>{"use strict";Object.defineProperty(Ce,"__esModule",{value:!0});Ce.types=Ce.setConcurrency=Ce.disableTypes=Ce.disableFS=Ce.imageSize=void 0;var bn=require("fs"),OT=require("path"),CT=nh(),Mo=$o(),RT=xh(),qh=512*1024,Mh=new CT.default({concurrency:100,autostart:!0}),fs={disabledFS:!1,disabledTypes:[]};function qo(n,e){let t=(0,RT.detector)(n);if(typeof t<"u"){if(fs.disabledTypes.indexOf(t)>-1)throw new TypeError("disabled file type: "+t);if(t in Mo.typeHandlers){let r=Mo.typeHandlers[t].calculate(n,e);if(r!==void 0)return r.type=r.type??t,r}}throw new TypeError("unsupported file type: "+t+" (file: "+e+")")}async function PT(n){let e=await bn.promises.open(n,"r");try{let{size:t}=await e.stat();if(t<=0)throw new Error("Empty file");let r=Math.min(t,qh),s=new Uint8Array(r);return await e.read(s,0,r,0),s}finally{await e.close()}}function kT(n){let e=bn.openSync(n,"r");try{let{size:t}=bn.fstatSync(e);if(t<=0)throw new Error("Empty file");let r=Math.min(t,qh),s=new Uint8Array(r);return bn.readSync(e,s,0,r,0),s}finally{bn.closeSync(e)}}Fh.exports=Ce=Fo;Ce.default=Fo;function Fo(n,e){if(n instanceof Uint8Array)return qo(n);if(typeof n!="string"||fs.disabledFS)throw new TypeError("invalid invocation. input should be a Uint8Array");let t=OT.resolve(n);if(typeof e=="function")Mh.push(()=>PT(t).then(r=>process.nextTick(e,null,qo(r,t))).catch(e));else{let r=kT(t);return qo(r,t)}}Ce.imageSize=Fo;var $T=n=>{fs.disabledFS=n};Ce.disableFS=$T;var xT=n=>{fs.disabledTypes=n};Ce.disableTypes=xT;var qT=n=>{Mh.concurrency=n};Ce.setConcurrency=qT;Ce.types=Object.keys(Mo.typeHandlers)});var Bh=p((hs,jh)=>{(function(n,e){typeof hs=="object"&&typeof jh<"u"?e(hs):typeof define=="function"&&define.amd?define(["exports"],e):(n=typeof globalThis<"u"?globalThis:n||self,e(n.compareVersions={}))})(hs,(function(n){"use strict";let e=/^[v^~<>=]*?(\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+))?(?:-([\da-z\-]+(?:\.[\da-z\-]+)*))?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?)?)?$/i,t=_=>{if(typeof _!="string")throw new TypeError("Invalid argument expected string");let S=_.match(e);if(!S)throw new Error(`Invalid argument not valid semver ('${_}' received)`);return S.shift(),S},r=_=>_==="*"||_==="x"||_==="X",s=_=>{let S=parseInt(_,10);return isNaN(S)?_:S},i=(_,S)=>typeof _!=typeof S?[String(_),String(S)]:[_,S],o=(_,S)=>{if(r(_)||r(S))return 0;let[w,I]=i(s(_),s(S));return w>I?1:w<I?-1:0},a=(_,S)=>{for(let w=0;w<Math.max(_.length,S.length);w++){let I=o(_[w]||"0",S[w]||"0");if(I!==0)return I}return 0},l=(_,S)=>{let w=t(_),I=t(S),x=w.pop(),q=I.pop(),M=a(w,I);return M!==0?M:x&&q?a(x.split("."),q.split(".")):x||q?x?-1:1:0},c=(_,S,w)=>{h(w);let I=l(_,S);return u[w].includes(I)},u={">":[1],">=":[0,1],"=":[0],"<=":[-1,0],"<":[-1],"!=":[-1,1]},f=Object.keys(u),h=_=>{if(typeof _!="string")throw new TypeError(`Invalid operator type, expected string but got ${typeof _}`);if(f.indexOf(_)===-1)throw new Error(`Invalid operator, expected one of ${f.join("|")}`)},d=(_,S)=>{if(S=S.replace(/([><=]+)\s+/g,"$1"),S.includes("||"))return S.split("||").some(J=>d(_,J));if(S.includes(" - ")){let[J,Q]=S.split(" - ",2);return d(_,`>=${J} <=${Q}`)}else if(S.includes(" "))return S.trim().replace(/\s{2,}/g," ").split(" ").every(J=>d(_,J));let w=S.match(/^([<>=~^]+)/),I=w?w[1]:"=";if(I!=="^"&&I!=="~")return c(_,S,I);let[x,q,M,,Y]=t(_),[R,C,B,,j]=t(S),D=[x,q,M],X=[R,C??"x",B??"x"];if(j&&(!Y||a(D,X)!==0||a(Y.split("."),j.split("."))===-1))return!1;let te=X.findIndex(J=>J!=="0")+1,z=I==="~"?2:te>1?te:1;return!(a(D.slice(0,z),X.slice(0,z))!==0||a(D.slice(z),X.slice(z))===-1)},y=_=>typeof _=="string"&&/^[v\d]/.test(_)&&e.test(_),m=_=>typeof _=="string"&&/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/.test(_);n.compare=c,n.compareVersions=l,n.satisfies=d,n.validate=y,n.validateStrict=m}))});var Cn=p((pO,Vh)=>{"use strict";var FT="2.0.0",DT=Number.MAX_SAFE_INTEGER||9007199254740991,jT=16,BT=250,UT=["major","premajor","minor","preminor","patch","prepatch","prerelease"];Vh.exports={MAX_LENGTH:256,MAX_SAFE_COMPONENT_LENGTH:jT,MAX_SAFE_BUILD_LENGTH:BT,MAX_SAFE_INTEGER:DT,RELEASE_TYPES:UT,SEMVER_SPEC_VERSION:FT,FLAG_INCLUDE_PRERELEASE:1,FLAG_LOOSE:2}});var Rn=p((_O,Wh)=>{"use strict";var HT=typeof process=="object"&&process.env&&process.env.NODE_DEBUG&&/\bsemver\b/i.test(process.env.NODE_DEBUG)?(...n)=>console.error("SEMVER",...n):()=>{};Wh.exports=HT});var zt=p((Je,Gh)=>{"use strict";var{MAX_SAFE_COMPONENT_LENGTH:Uo,MAX_SAFE_BUILD_LENGTH:VT,MAX_LENGTH:WT}=Cn(),GT=Rn();Je=Gh.exports={};var KT=Je.re=[],YT=Je.safeRe=[],P=Je.src=[],JT=Je.safeSrc=[],k=Je.t={},XT=0,Ho="[a-zA-Z0-9-]",zT=[["\\s",1],["\\d",WT],[Ho,VT]],QT=n=>{for(let[e,t]of zT)n=n.split(`${e}*`).join(`${e}{0,${t}}`).split(`${e}+`).join(`${e}{1,${t}}`);return n},H=(n,e,t)=>{let r=QT(e),s=XT++;GT(n,s,e),k[n]=s,P[s]=e,JT[s]=r,KT[s]=new RegExp(e,t?"g":void 0),YT[s]=new RegExp(r,t?"g":void 0)};H("NUMERICIDENTIFIER","0|[1-9]\\d*");H("NUMERICIDENTIFIERLOOSE","\\d+");H("NONNUMERICIDENTIFIER",`\\d*[a-zA-Z-]${Ho}*`);H("MAINVERSION",`(${P[k.NUMERICIDENTIFIER]})\\.(${P[k.NUMERICIDENTIFIER]})\\.(${P[k.NUMERICIDENTIFIER]})`);H("MAINVERSIONLOOSE",`(${P[k.NUMERICIDENTIFIERLOOSE]})\\.(${P[k.NUMERICIDENTIFIERLOOSE]})\\.(${P[k.NUMERICIDENTIFIERLOOSE]})`);H("PRERELEASEIDENTIFIER",`(?:${P[k.NONNUMERICIDENTIFIER]}|${P[k.NUMERICIDENTIFIER]})`);H("PRERELEASEIDENTIFIERLOOSE",`(?:${P[k.NONNUMERICIDENTIFIER]}|${P[k.NUMERICIDENTIFIERLOOSE]})`);H("PRERELEASE",`(?:-(${P[k.PRERELEASEIDENTIFIER]}(?:\\.${P[k.PRERELEASEIDENTIFIER]})*))`);H("PRERELEASELOOSE",`(?:-?(${P[k.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${P[k.PRERELEASEIDENTIFIERLOOSE]})*))`);H("BUILDIDENTIFIER",`${Ho}+`);H("BUILD",`(?:\\+(${P[k.BUILDIDENTIFIER]}(?:\\.${P[k.BUILDIDENTIFIER]})*))`);H("FULLPLAIN",`v?${P[k.MAINVERSION]}${P[k.PRERELEASE]}?${P[k.BUILD]}?`);H("FULL",`^${P[k.FULLPLAIN]}$`);H("LOOSEPLAIN",`[v=\\s]*${P[k.MAINVERSIONLOOSE]}${P[k.PRERELEASELOOSE]}?${P[k.BUILD]}?`);H("LOOSE",`^${P[k.LOOSEPLAIN]}$`);H("GTLT","((?:<|>)?=?)");H("XRANGEIDENTIFIERLOOSE",`${P[k.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);H("XRANGEIDENTIFIER",`${P[k.NUMERICIDENTIFIER]}|x|X|\\*`);H("XRANGEPLAIN",`[v=\\s]*(${P[k.XRANGEIDENTIFIER]})(?:\\.(${P[k.XRANGEIDENTIFIER]})(?:\\.(${P[k.XRANGEIDENTIFIER]})(?:${P[k.PRERELEASE]})?${P[k.BUILD]}?)?)?`);H("XRANGEPLAINLOOSE",`[v=\\s]*(${P[k.XRANGEIDENTIFIERLOOSE]})(?:\\.(${P[k.XRANGEIDENTIFIERLOOSE]})(?:\\.(${P[k.XRANGEIDENTIFIERLOOSE]})(?:${P[k.PRERELEASELOOSE]})?${P[k.BUILD]}?)?)?`);H("XRANGE",`^${P[k.GTLT]}\\s*${P[k.XRANGEPLAIN]}$`);H("XRANGELOOSE",`^${P[k.GTLT]}\\s*${P[k.XRANGEPLAINLOOSE]}$`);H("COERCEPLAIN",`(^|[^\\d])(\\d{1,${Uo}})(?:\\.(\\d{1,${Uo}}))?(?:\\.(\\d{1,${Uo}}))?`);H("COERCE",`${P[k.COERCEPLAIN]}(?:$|[^\\d])`);H("COERCEFULL",P[k.COERCEPLAIN]+`(?:${P[k.PRERELEASE]})?(?:${P[k.BUILD]})?(?:$|[^\\d])`);H("COERCERTL",P[k.COERCE],!0);H("COERCERTLFULL",P[k.COERCEFULL],!0);H("LONETILDE","(?:~>?)");H("TILDETRIM",`(\\s*)${P[k.LONETILDE]}\\s+`,!0);Je.tildeTrimReplace="$1~";H("TILDE",`^${P[k.LONETILDE]}${P[k.XRANGEPLAIN]}$`);H("TILDELOOSE",`^${P[k.LONETILDE]}${P[k.XRANGEPLAINLOOSE]}$`);H("LONECARET","(?:\\^)");H("CARETTRIM",`(\\s*)${P[k.LONECARET]}\\s+`,!0);Je.caretTrimReplace="$1^";H("CARET",`^${P[k.LONECARET]}${P[k.XRANGEPLAIN]}$`);H("CARETLOOSE",`^${P[k.LONECARET]}${P[k.XRANGEPLAINLOOSE]}$`);H("COMPARATORLOOSE",`^${P[k.GTLT]}\\s*(${P[k.LOOSEPLAIN]})$|^$`);H("COMPARATOR",`^${P[k.GTLT]}\\s*(${P[k.FULLPLAIN]})$|^$`);H("COMPARATORTRIM",`(\\s*)${P[k.GTLT]}\\s*(${P[k.LOOSEPLAIN]}|${P[k.XRANGEPLAIN]})`,!0);Je.comparatorTrimReplace="$1$2$3";H("HYPHENRANGE",`^\\s*(${P[k.XRANGEPLAIN]})\\s+-\\s+(${P[k.XRANGEPLAIN]})\\s*$`);H("HYPHENRANGELOOSE",`^\\s*(${P[k.XRANGEPLAINLOOSE]})\\s+-\\s+(${P[k.XRANGEPLAINLOOSE]})\\s*$`);H("STAR","(<|>)?=?\\s*\\*");H("GTE0","^\\s*>=\\s*0\\.0\\.0\\s*$");H("GTE0PRE","^\\s*>=\\s*0\\.0\\.0-0\\s*$")});var ds=p((mO,Kh)=>{"use strict";var ZT=Object.freeze({loose:!0}),eS=Object.freeze({}),tS=n=>n?typeof n!="object"?ZT:n:eS;Kh.exports=tS});var Vo=p((gO,Xh)=>{"use strict";var Yh=/^[0-9]+$/,Jh=(n,e)=>{if(typeof n=="number"&&typeof e=="number")return n===e?0:n<e?-1:1;let t=Yh.test(n),r=Yh.test(e);return t&&r&&(n=+n,e=+e),n===e?0:t&&!r?-1:r&&!t?1:n<e?-1:1},nS=(n,e)=>Jh(e,n);Xh.exports={compareIdentifiers:Jh,rcompareIdentifiers:nS}});var Te=p((yO,Qh)=>{"use strict";var ps=Rn(),{MAX_LENGTH:zh,MAX_SAFE_INTEGER:_s}=Cn(),{safeRe:ms,t:gs}=zt(),rS=ds(),{compareIdentifiers:Wo}=Vo(),Go=class n{constructor(e,t){if(t=rS(t),e instanceof n){if(e.loose===!!t.loose&&e.includePrerelease===!!t.includePrerelease)return e;e=e.version}else if(typeof e!="string")throw new TypeError(`Invalid version. Must be a string. Got type "${typeof e}".`);if(e.length>zh)throw new TypeError(`version is longer than ${zh} characters`);ps("SemVer",e,t),this.options=t,this.loose=!!t.loose,this.includePrerelease=!!t.includePrerelease;let r=e.trim().match(t.loose?ms[gs.LOOSE]:ms[gs.FULL]);if(!r)throw new TypeError(`Invalid Version: ${e}`);if(this.raw=e,this.major=+r[1],this.minor=+r[2],this.patch=+r[3],this.major>_s||this.major<0)throw new TypeError("Invalid major version");if(this.minor>_s||this.minor<0)throw new TypeError("Invalid minor version");if(this.patch>_s||this.patch<0)throw new TypeError("Invalid patch version");r[4]?this.prerelease=r[4].split(".").map(s=>{if(/^[0-9]+$/.test(s)){let i=+s;if(i>=0&&i<_s)return i}return s}):this.prerelease=[],this.build=r[5]?r[5].split("."):[],this.format()}format(){return this.version=`${this.major}.${this.minor}.${this.patch}`,this.prerelease.length&&(this.version+=`-${this.prerelease.join(".")}`),this.version}toString(){return this.version}compare(e){if(ps("SemVer.compare",this.version,this.options,e),!(e instanceof n)){if(typeof e=="string"&&e===this.version)return 0;e=new n(e,this.options)}return e.version===this.version?0:this.compareMain(e)||this.comparePre(e)}compareMain(e){return e instanceof n||(e=new n(e,this.options)),this.major<e.major?-1:this.major>e.major?1:this.minor<e.minor?-1:this.minor>e.minor?1:this.patch<e.patch?-1:this.patch>e.patch?1:0}comparePre(e){if(e instanceof n||(e=new n(e,this.options)),this.prerelease.length&&!e.prerelease.length)return-1;if(!this.prerelease.length&&e.prerelease.length)return 1;if(!this.prerelease.length&&!e.prerelease.length)return 0;let t=0;do{let r=this.prerelease[t],s=e.prerelease[t];if(ps("prerelease compare",t,r,s),r===void 0&&s===void 0)return 0;if(s===void 0)return 1;if(r===void 0)return-1;if(r===s)continue;return Wo(r,s)}while(++t)}compareBuild(e){e instanceof n||(e=new n(e,this.options));let t=0;do{let r=this.build[t],s=e.build[t];if(ps("build compare",t,r,s),r===void 0&&s===void 0)return 0;if(s===void 0)return 1;if(r===void 0)return-1;if(r===s)continue;return Wo(r,s)}while(++t)}inc(e,t,r){if(e.startsWith("pre")){if(!t&&r===!1)throw new Error("invalid increment argument: identifier is empty");if(t){let s=`-${t}`.match(this.options.loose?ms[gs.PRERELEASELOOSE]:ms[gs.PRERELEASE]);if(!s||s[1]!==t)throw new Error(`invalid identifier: ${t}`)}}switch(e){case"premajor":this.prerelease.length=0,this.patch=0,this.minor=0,this.major++,this.inc("pre",t,r);break;case"preminor":this.prerelease.length=0,this.patch=0,this.minor++,this.inc("pre",t,r);break;case"prepatch":this.prerelease.length=0,this.inc("patch",t,r),this.inc("pre",t,r);break;case"prerelease":this.prerelease.length===0&&this.inc("patch",t,r),this.inc("pre",t,r);break;case"release":if(this.prerelease.length===0)throw new Error(`version ${this.raw} is not a prerelease`);this.prerelease.length=0;break;case"major":(this.minor!==0||this.patch!==0||this.prerelease.length===0)&&this.major++,this.minor=0,this.patch=0,this.prerelease=[];break;case"minor":(this.patch!==0||this.prerelease.length===0)&&this.minor++,this.patch=0,this.prerelease=[];break;case"patch":this.prerelease.length===0&&this.patch++,this.prerelease=[];break;case"pre":{let s=Number(r)?1:0;if(this.prerelease.length===0)this.prerelease=[s];else{let i=this.prerelease.length;for(;--i>=0;)typeof this.prerelease[i]=="number"&&(this.prerelease[i]++,i=-2);if(i===-1){if(t===this.prerelease.join(".")&&r===!1)throw new Error("invalid increment argument: identifier already exists");this.prerelease.push(s)}}if(t){let i=[t,s];r===!1&&(i=[t]),Wo(this.prerelease[0],t)===0?isNaN(this.prerelease[1])&&(this.prerelease=i):this.prerelease=i}break}default:throw new Error(`invalid increment argument: ${e}`)}return this.raw=this.format(),this.build.length&&(this.raw+=`+${this.build.join(".")}`),this}};Qh.exports=Go});var Rt=p((EO,ed)=>{"use strict";var Zh=Te(),sS=(n,e,t=!1)=>{if(n instanceof Zh)return n;try{return new Zh(n,e)}catch(r){if(!t)return null;throw r}};ed.exports=sS});var nd=p((TO,td)=>{"use strict";var iS=Rt(),oS=(n,e)=>{let t=iS(n,e);return t?t.version:null};td.exports=oS});var sd=p((SO,rd)=>{"use strict";var aS=Rt(),lS=(n,e)=>{let t=aS(n.trim().replace(/^[=v]+/,""),e);return t?t.version:null};rd.exports=lS});var ad=p((AO,od)=>{"use strict";var id=Te(),cS=(n,e,t,r,s)=>{typeof t=="string"&&(s=r,r=t,t=void 0);try{return new id(n instanceof id?n.version:n,t).inc(e,r,s).version}catch{return null}};od.exports=cS});var ud=p((wO,cd)=>{"use strict";var ld=Rt(),uS=(n,e)=>{let t=ld(n,null,!0),r=ld(e,null,!0),s=t.compare(r);if(s===0)return null;let i=s>0,o=i?t:r,a=i?r:t,l=!!o.prerelease.length;if(!!a.prerelease.length&&!l){if(!a.patch&&!a.minor)return"major";if(a.compareMain(o)===0)return a.minor&&!a.patch?"minor":"patch"}let u=l?"pre":"";return t.major!==r.major?u+"major":t.minor!==r.minor?u+"minor":t.patch!==r.patch?u+"patch":"prerelease"};cd.exports=uS});var hd=p((LO,fd)=>{"use strict";var fS=Te(),hS=(n,e)=>new fS(n,e).major;fd.exports=hS});var pd=p((IO,dd)=>{"use strict";var dS=Te(),pS=(n,e)=>new dS(n,e).minor;dd.exports=pS});var md=p((bO,_d)=>{"use strict";var _S=Te(),mS=(n,e)=>new _S(n,e).patch;_d.exports=mS});var yd=p((vO,gd)=>{"use strict";var gS=Rt(),yS=(n,e)=>{let t=gS(n,e);return t&&t.prerelease.length?t.prerelease:null};gd.exports=yS});var qe=p((NO,Td)=>{"use strict";var Ed=Te(),ES=(n,e,t)=>new Ed(n,t).compare(new Ed(e,t));Td.exports=ES});var Ad=p((OO,Sd)=>{"use strict";var TS=qe(),SS=(n,e,t)=>TS(e,n,t);Sd.exports=SS});var Ld=p((CO,wd)=>{"use strict";var AS=qe(),wS=(n,e)=>AS(n,e,!0);wd.exports=wS});var ys=p((RO,bd)=>{"use strict";var Id=Te(),LS=(n,e,t)=>{let r=new Id(n,t),s=new Id(e,t);return r.compare(s)||r.compareBuild(s)};bd.exports=LS});var Nd=p((PO,vd)=>{"use strict";var IS=ys(),bS=(n,e)=>n.sort((t,r)=>IS(t,r,e));vd.exports=bS});var Cd=p((kO,Od)=>{"use strict";var vS=ys(),NS=(n,e)=>n.sort((t,r)=>vS(r,t,e));Od.exports=NS});var Pn=p(($O,Rd)=>{"use strict";var OS=qe(),CS=(n,e,t)=>OS(n,e,t)>0;Rd.exports=CS});var Es=p((xO,Pd)=>{"use strict";var RS=qe(),PS=(n,e,t)=>RS(n,e,t)<0;Pd.exports=PS});var Ko=p((qO,kd)=>{"use strict";var kS=qe(),$S=(n,e,t)=>kS(n,e,t)===0;kd.exports=$S});var Yo=p((MO,$d)=>{"use strict";var xS=qe(),qS=(n,e,t)=>xS(n,e,t)!==0;$d.exports=qS});var Ts=p((FO,xd)=>{"use strict";var MS=qe(),FS=(n,e,t)=>MS(n,e,t)>=0;xd.exports=FS});var Ss=p((DO,qd)=>{"use strict";var DS=qe(),jS=(n,e,t)=>DS(n,e,t)<=0;qd.exports=jS});var Jo=p((jO,Md)=>{"use strict";var BS=Ko(),US=Yo(),HS=Pn(),VS=Ts(),WS=Es(),GS=Ss(),KS=(n,e,t,r)=>{switch(e){case"===":return typeof n=="object"&&(n=n.version),typeof t=="object"&&(t=t.version),n===t;case"!==":return typeof n=="object"&&(n=n.version),typeof t=="object"&&(t=t.version),n!==t;case"":case"=":case"==":return BS(n,t,r);case"!=":return US(n,t,r);case">":return HS(n,t,r);case">=":return VS(n,t,r);case"<":return WS(n,t,r);case"<=":return GS(n,t,r);default:throw new TypeError(`Invalid operator: ${e}`)}};Md.exports=KS});var Dd=p((BO,Fd)=>{"use strict";var YS=Te(),JS=Rt(),{safeRe:As,t:ws}=zt(),XS=(n,e)=>{if(n instanceof YS)return n;if(typeof n=="number"&&(n=String(n)),typeof n!="string")return null;e=e||{};let t=null;if(!e.rtl)t=n.match(e.includePrerelease?As[ws.COERCEFULL]:As[ws.COERCE]);else{let l=e.includePrerelease?As[ws.COERCERTLFULL]:As[ws.COERCERTL],c;for(;(c=l.exec(n))&&(!t||t.index+t[0].length!==n.length);)(!t||c.index+c[0].length!==t.index+t[0].length)&&(t=c),l.lastIndex=c.index+c[1].length+c[2].length;l.lastIndex=-1}if(t===null)return null;let r=t[2],s=t[3]||"0",i=t[4]||"0",o=e.includePrerelease&&t[5]?`-${t[5]}`:"",a=e.includePrerelease&&t[6]?`+${t[6]}`:"";return JS(`${r}.${s}.${i}${o}${a}`,e)};Fd.exports=XS});var Bd=p((UO,jd)=>{"use strict";var Xo=class{constructor(){this.max=1e3,this.map=new Map}get(e){let t=this.map.get(e);if(t!==void 0)return this.map.delete(e),this.map.set(e,t),t}delete(e){return this.map.delete(e)}set(e,t){if(!this.delete(e)&&t!==void 0){if(this.map.size>=this.max){let s=this.map.keys().next().value;this.delete(s)}this.map.set(e,t)}return this}};jd.exports=Xo});var Me=p((HO,Wd)=>{"use strict";var zS=/\s+/g,zo=class n{constructor(e,t){if(t=ZS(t),e instanceof n)return e.loose===!!t.loose&&e.includePrerelease===!!t.includePrerelease?e:new n(e.raw,t);if(e instanceof Qo)return this.raw=e.value,this.set=[[e]],this.formatted=void 0,this;if(this.options=t,this.loose=!!t.loose,this.includePrerelease=!!t.includePrerelease,this.raw=e.trim().replace(zS," "),this.set=this.raw.split("||").map(r=>this.parseRange(r.trim())).filter(r=>r.length),!this.set.length)throw new TypeError(`Invalid SemVer Range: ${this.raw}`);if(this.set.length>1){let r=this.set[0];if(this.set=this.set.filter(s=>!Hd(s[0])),this.set.length===0)this.set=[r];else if(this.set.length>1){for(let s of this.set)if(s.length===1&&oA(s[0])){this.set=[s];break}}}this.formatted=void 0}get range(){if(this.formatted===void 0){this.formatted="";for(let e=0;e<this.set.length;e++){e>0&&(this.formatted+="||");let t=this.set[e];for(let r=0;r<t.length;r++)r>0&&(this.formatted+=" "),this.formatted+=t[r].toString().trim()}}return this.formatted}format(){return this.range}toString(){return this.range}parseRange(e){let r=((this.options.includePrerelease&&sA)|(this.options.loose&&iA))+":"+e,s=Ud.get(r);if(s)return s;let i=this.options.loose,o=i?be[Se.HYPHENRANGELOOSE]:be[Se.HYPHENRANGE];e=e.replace(o,mA(this.options.includePrerelease)),re("hyphen replace",e),e=e.replace(be[Se.COMPARATORTRIM],tA),re("comparator trim",e),e=e.replace(be[Se.TILDETRIM],nA),re("tilde trim",e),e=e.replace(be[Se.CARETTRIM],rA),re("caret trim",e);let a=e.split(" ").map(f=>aA(f,this.options)).join(" ").split(/\s+/).map(f=>_A(f,this.options));i&&(a=a.filter(f=>(re("loose invalid filter",f,this.options),!!f.match(be[Se.COMPARATORLOOSE])))),re("range list",a);let l=new Map,c=a.map(f=>new Qo(f,this.options));for(let f of c){if(Hd(f))return[f];l.set(f.value,f)}l.size>1&&l.has("")&&l.delete("");let u=[...l.values()];return Ud.set(r,u),u}intersects(e,t){if(!(e instanceof n))throw new TypeError("a Range is required");return this.set.some(r=>Vd(r,t)&&e.set.some(s=>Vd(s,t)&&r.every(i=>s.every(o=>i.intersects(o,t)))))}test(e){if(!e)return!1;if(typeof e=="string")try{e=new eA(e,this.options)}catch{return!1}for(let t=0;t<this.set.length;t++)if(gA(this.set[t],e,this.options))return!0;return!1}};Wd.exports=zo;var QS=Bd(),Ud=new QS,ZS=ds(),Qo=kn(),re=Rn(),eA=Te(),{safeRe:be,t:Se,comparatorTrimReplace:tA,tildeTrimReplace:nA,caretTrimReplace:rA}=zt(),{FLAG_INCLUDE_PRERELEASE:sA,FLAG_LOOSE:iA}=Cn(),Hd=n=>n.value==="<0.0.0-0",oA=n=>n.value==="",Vd=(n,e)=>{let t=!0,r=n.slice(),s=r.pop();for(;t&&r.length;)t=r.every(i=>s.intersects(i,e)),s=r.pop();return t},aA=(n,e)=>(n=n.replace(be[Se.BUILD],""),re("comp",n,e),n=uA(n,e),re("caret",n),n=lA(n,e),re("tildes",n),n=hA(n,e),re("xrange",n),n=pA(n,e),re("stars",n),n),ve=n=>!n||n.toLowerCase()==="x"||n==="*",lA=(n,e)=>n.trim().split(/\s+/).map(t=>cA(t,e)).join(" "),cA=(n,e)=>{let t=e.loose?be[Se.TILDELOOSE]:be[Se.TILDE];return n.replace(t,(r,s,i,o,a)=>{re("tilde",n,r,s,i,o,a);let l;return ve(s)?l="":ve(i)?l=`>=${s}.0.0 <${+s+1}.0.0-0`:ve(o)?l=`>=${s}.${i}.0 <${s}.${+i+1}.0-0`:a?(re("replaceTilde pr",a),l=`>=${s}.${i}.${o}-${a} <${s}.${+i+1}.0-0`):l=`>=${s}.${i}.${o} <${s}.${+i+1}.0-0`,re("tilde return",l),l})},uA=(n,e)=>n.trim().split(/\s+/).map(t=>fA(t,e)).join(" "),fA=(n,e)=>{re("caret",n,e);let t=e.loose?be[Se.CARETLOOSE]:be[Se.CARET],r=e.includePrerelease?"-0":"";return n.replace(t,(s,i,o,a,l)=>{re("caret",n,s,i,o,a,l);let c;return ve(i)?c="":ve(o)?c=`>=${i}.0.0${r} <${+i+1}.0.0-0`:ve(a)?i==="0"?c=`>=${i}.${o}.0${r} <${i}.${+o+1}.0-0`:c=`>=${i}.${o}.0${r} <${+i+1}.0.0-0`:l?(re("replaceCaret pr",l),i==="0"?o==="0"?c=`>=${i}.${o}.${a}-${l} <${i}.${o}.${+a+1}-0`:c=`>=${i}.${o}.${a}-${l} <${i}.${+o+1}.0-0`:c=`>=${i}.${o}.${a}-${l} <${+i+1}.0.0-0`):(re("no pr"),i==="0"?o==="0"?c=`>=${i}.${o}.${a}${r} <${i}.${o}.${+a+1}-0`:c=`>=${i}.${o}.${a}${r} <${i}.${+o+1}.0-0`:c=`>=${i}.${o}.${a} <${+i+1}.0.0-0`),re("caret return",c),c})},hA=(n,e)=>(re("replaceXRanges",n,e),n.split(/\s+/).map(t=>dA(t,e)).join(" ")),dA=(n,e)=>{n=n.trim();let t=e.loose?be[Se.XRANGELOOSE]:be[Se.XRANGE];return n.replace(t,(r,s,i,o,a,l)=>{re("xRange",n,r,s,i,o,a,l);let c=ve(i),u=c||ve(o),f=u||ve(a),h=f;return s==="="&&h&&(s=""),l=e.includePrerelease?"-0":"",c?s===">"||s==="<"?r="<0.0.0-0":r="*":s&&h?(u&&(o=0),a=0,s===">"?(s=">=",u?(i=+i+1,o=0,a=0):(o=+o+1,a=0)):s==="<="&&(s="<",u?i=+i+1:o=+o+1),s==="<"&&(l="-0"),r=`${s+i}.${o}.${a}${l}`):u?r=`>=${i}.0.0${l} <${+i+1}.0.0-0`:f&&(r=`>=${i}.${o}.0${l} <${i}.${+o+1}.0-0`),re("xRange return",r),r})},pA=(n,e)=>(re("replaceStars",n,e),n.trim().replace(be[Se.STAR],"")),_A=(n,e)=>(re("replaceGTE0",n,e),n.trim().replace(be[e.includePrerelease?Se.GTE0PRE:Se.GTE0],"")),mA=n=>(e,t,r,s,i,o,a,l,c,u,f,h)=>(ve(r)?t="":ve(s)?t=`>=${r}.0.0${n?"-0":""}`:ve(i)?t=`>=${r}.${s}.0${n?"-0":""}`:o?t=`>=${t}`:t=`>=${t}${n?"-0":""}`,ve(c)?l="":ve(u)?l=`<${+c+1}.0.0-0`:ve(f)?l=`<${c}.${+u+1}.0-0`:h?l=`<=${c}.${u}.${f}-${h}`:n?l=`<${c}.${u}.${+f+1}-0`:l=`<=${l}`,`${t} ${l}`.trim()),gA=(n,e,t)=>{for(let r=0;r<n.length;r++)if(!n[r].test(e))return!1;if(e.prerelease.length&&!t.includePrerelease){for(let r=0;r<n.length;r++)if(re(n[r].semver),n[r].semver!==Qo.ANY&&n[r].semver.prerelease.length>0){let s=n[r].semver;if(s.major===e.major&&s.minor===e.minor&&s.patch===e.patch)return!0}return!1}return!0}});var kn=p((VO,zd)=>{"use strict";var $n=Symbol("SemVer ANY"),ta=class n{static get ANY(){return $n}constructor(e,t){if(t=Gd(t),e instanceof n){if(e.loose===!!t.loose)return e;e=e.value}e=e.trim().split(/\s+/).join(" "),ea("comparator",e,t),this.options=t,this.loose=!!t.loose,this.parse(e),this.semver===$n?this.value="":this.value=this.operator+this.semver.version,ea("comp",this)}parse(e){let t=this.options.loose?Kd[Yd.COMPARATORLOOSE]:Kd[Yd.COMPARATOR],r=e.match(t);if(!r)throw new TypeError(`Invalid comparator: ${e}`);this.operator=r[1]!==void 0?r[1]:"",this.operator==="="&&(this.operator=""),r[2]?this.semver=new Jd(r[2],this.options.loose):this.semver=$n}toString(){return this.value}test(e){if(ea("Comparator.test",e,this.options.loose),this.semver===$n||e===$n)return!0;if(typeof e=="string")try{e=new Jd(e,this.options)}catch{return!1}return Zo(e,this.operator,this.semver,this.options)}intersects(e,t){if(!(e instanceof n))throw new TypeError("a Comparator is required");return this.operator===""?this.value===""?!0:new Xd(e.value,t).test(this.value):e.operator===""?e.value===""?!0:new Xd(this.value,t).test(e.semver):(t=Gd(t),t.includePrerelease&&(this.value==="<0.0.0-0"||e.value==="<0.0.0-0")||!t.includePrerelease&&(this.value.startsWith("<0.0.0")||e.value.startsWith("<0.0.0"))?!1:!!(this.operator.startsWith(">")&&e.operator.startsWith(">")||this.operator.startsWith("<")&&e.operator.startsWith("<")||this.semver.version===e.semver.version&&this.operator.includes("=")&&e.operator.includes("=")||Zo(this.semver,"<",e.semver,t)&&this.operator.startsWith(">")&&e.operator.startsWith("<")||Zo(this.semver,">",e.semver,t)&&this.operator.startsWith("<")&&e.operator.startsWith(">")))}};zd.exports=ta;var Gd=ds(),{safeRe:Kd,t:Yd}=zt(),Zo=Jo(),ea=Rn(),Jd=Te(),Xd=Me()});var xn=p((WO,Qd)=>{"use strict";var yA=Me(),EA=(n,e,t)=>{try{e=new yA(e,t)}catch{return!1}return e.test(n)};Qd.exports=EA});var ep=p((GO,Zd)=>{"use strict";var TA=Me(),SA=(n,e)=>new TA(n,e).set.map(t=>t.map(r=>r.value).join(" ").trim().split(" "));Zd.exports=SA});var np=p((KO,tp)=>{"use strict";var AA=Te(),wA=Me(),LA=(n,e,t)=>{let r=null,s=null,i=null;try{i=new wA(e,t)}catch{return null}return n.forEach(o=>{i.test(o)&&(!r||s.compare(o)===-1)&&(r=o,s=new AA(r,t))}),r};tp.exports=LA});var sp=p((YO,rp)=>{"use strict";var IA=Te(),bA=Me(),vA=(n,e,t)=>{let r=null,s=null,i=null;try{i=new bA(e,t)}catch{return null}return n.forEach(o=>{i.test(o)&&(!r||s.compare(o)===1)&&(r=o,s=new IA(r,t))}),r};rp.exports=vA});var ap=p((JO,op)=>{"use strict";var na=Te(),NA=Me(),ip=Pn(),OA=(n,e)=>{n=new NA(n,e);let t=new na("0.0.0");if(n.test(t)||(t=new na("0.0.0-0"),n.test(t)))return t;t=null;for(let r=0;r<n.set.length;++r){let s=n.set[r],i=null;s.forEach(o=>{let a=new na(o.semver.version);switch(o.operator){case">":a.prerelease.length===0?a.patch++:a.prerelease.push(0),a.raw=a.format();case"":case">=":(!i||ip(a,i))&&(i=a);break;case"<":case"<=":break;default:throw new Error(`Unexpected operation: ${o.operator}`)}}),i&&(!t||ip(t,i))&&(t=i)}return t&&n.test(t)?t:null};op.exports=OA});var cp=p((XO,lp)=>{"use strict";var CA=Me(),RA=(n,e)=>{try{return new CA(n,e).range||"*"}catch{return null}};lp.exports=RA});var Ls=p((zO,dp)=>{"use strict";var PA=Te(),hp=kn(),{ANY:kA}=hp,$A=Me(),xA=xn(),up=Pn(),fp=Es(),qA=Ss(),MA=Ts(),FA=(n,e,t,r)=>{n=new PA(n,r),e=new $A(e,r);let s,i,o,a,l;switch(t){case">":s=up,i=qA,o=fp,a=">",l=">=";break;case"<":s=fp,i=MA,o=up,a="<",l="<=";break;default:throw new TypeError('Must provide a hilo val of "<" or ">"')}if(xA(n,e,r))return!1;for(let c=0;c<e.set.length;++c){let u=e.set[c],f=null,h=null;if(u.forEach(d=>{d.semver===kA&&(d=new hp(">=0.0.0")),f=f||d,h=h||d,s(d.semver,f.semver,r)?f=d:o(d.semver,h.semver,r)&&(h=d)}),f.operator===a||f.operator===l||(!h.operator||h.operator===a)&&i(n,h.semver))return!1;if(h.operator===l&&o(n,h.semver))return!1}return!0};dp.exports=FA});var _p=p((QO,pp)=>{"use strict";var DA=Ls(),jA=(n,e,t)=>DA(n,e,">",t);pp.exports=jA});var gp=p((ZO,mp)=>{"use strict";var BA=Ls(),UA=(n,e,t)=>BA(n,e,"<",t);mp.exports=UA});var Tp=p((eC,Ep)=>{"use strict";var yp=Me(),HA=(n,e,t)=>(n=new yp(n,t),e=new yp(e,t),n.intersects(e,t));Ep.exports=HA});var Ap=p((tC,Sp)=>{"use strict";var VA=xn(),WA=qe();Sp.exports=(n,e,t)=>{let r=[],s=null,i=null,o=n.sort((u,f)=>WA(u,f,t));for(let u of o)VA(u,e,t)?(i=u,s||(s=u)):(i&&r.push([s,i]),i=null,s=null);s&&r.push([s,null]);let a=[];for(let[u,f]of r)u===f?a.push(u):!f&&u===o[0]?a.push("*"):f?u===o[0]?a.push(`<=${f}`):a.push(`${u} - ${f}`):a.push(`>=${u}`);let l=a.join(" || "),c=typeof e.raw=="string"?e.raw:String(e);return l.length<c.length?l:e}});var Np=p((nC,vp)=>{"use strict";var wp=Me(),sa=kn(),{ANY:ra}=sa,qn=xn(),ia=qe(),GA=(n,e,t={})=>{if(n===e)return!0;n=new wp(n,t),e=new wp(e,t);let r=!1;e:for(let s of n.set){for(let i of e.set){let o=YA(s,i,t);if(r=r||o!==null,o)continue e}if(r)return!1}return!0},KA=[new sa(">=0.0.0-0")],Lp=[new sa(">=0.0.0")],YA=(n,e,t)=>{if(n===e)return!0;if(n.length===1&&n[0].semver===ra){if(e.length===1&&e[0].semver===ra)return!0;t.includePrerelease?n=KA:n=Lp}if(e.length===1&&e[0].semver===ra){if(t.includePrerelease)return!0;e=Lp}let r=new Set,s,i;for(let d of n)d.operator===">"||d.operator===">="?s=Ip(s,d,t):d.operator==="<"||d.operator==="<="?i=bp(i,d,t):r.add(d.semver);if(r.size>1)return null;let o;if(s&&i){if(o=ia(s.semver,i.semver,t),o>0)return null;if(o===0&&(s.operator!==">="||i.operator!=="<="))return null}for(let d of r){if(s&&!qn(d,String(s),t)||i&&!qn(d,String(i),t))return null;for(let y of e)if(!qn(d,String(y),t))return!1;return!0}let a,l,c,u,f=i&&!t.includePrerelease&&i.semver.prerelease.length?i.semver:!1,h=s&&!t.includePrerelease&&s.semver.prerelease.length?s.semver:!1;f&&f.prerelease.length===1&&i.operator==="<"&&f.prerelease[0]===0&&(f=!1);for(let d of e){if(u=u||d.operator===">"||d.operator===">=",c=c||d.operator==="<"||d.operator==="<=",s){if(h&&d.semver.prerelease&&d.semver.prerelease.length&&d.semver.major===h.major&&d.semver.minor===h.minor&&d.semver.patch===h.patch&&(h=!1),d.operator===">"||d.operator===">="){if(a=Ip(s,d,t),a===d&&a!==s)return!1}else if(s.operator===">="&&!qn(s.semver,String(d),t))return!1}if(i){if(f&&d.semver.prerelease&&d.semver.prerelease.length&&d.semver.major===f.major&&d.semver.minor===f.minor&&d.semver.patch===f.patch&&(f=!1),d.operator==="<"||d.operator==="<="){if(l=bp(i,d,t),l===d&&l!==i)return!1}else if(i.operator==="<="&&!qn(i.semver,String(d),t))return!1}if(!d.operator&&(i||s)&&o!==0)return!1}return!(s&&c&&!i&&o!==0||i&&u&&!s&&o!==0||h||f)},Ip=(n,e,t)=>{if(!n)return e;let r=ia(n.semver,e.semver,t);return r>0?n:r<0||e.operator===">"&&n.operator===">="?e:n},bp=(n,e,t)=>{if(!n)return e;let r=ia(n.semver,e.semver,t);return r<0?n:r>0||e.operator==="<"&&n.operator==="<="?e:n};vp.exports=GA});var aa=p((rC,Rp)=>{"use strict";var oa=zt(),Op=Cn(),JA=Te(),Cp=Vo(),XA=Rt(),zA=nd(),QA=sd(),ZA=ad(),ew=ud(),tw=hd(),nw=pd(),rw=md(),sw=yd(),iw=qe(),ow=Ad(),aw=Ld(),lw=ys(),cw=Nd(),uw=Cd(),fw=Pn(),hw=Es(),dw=Ko(),pw=Yo(),_w=Ts(),mw=Ss(),gw=Jo(),yw=Dd(),Ew=kn(),Tw=Me(),Sw=xn(),Aw=ep(),ww=np(),Lw=sp(),Iw=ap(),bw=cp(),vw=Ls(),Nw=_p(),Ow=gp(),Cw=Tp(),Rw=Ap(),Pw=Np();Rp.exports={parse:XA,valid:zA,clean:QA,inc:ZA,diff:ew,major:tw,minor:nw,patch:rw,prerelease:sw,compare:iw,rcompare:ow,compareLoose:aw,compareBuild:lw,sort:cw,rsort:uw,gt:fw,lt:hw,eq:dw,neq:pw,gte:_w,lte:mw,cmp:gw,coerce:yw,Comparator:Ew,Range:Tw,satisfies:Sw,toComparators:Aw,maxSatisfying:ww,minSatisfying:Lw,minVersion:Iw,validRange:bw,outside:vw,gtr:Nw,ltr:Ow,intersects:Cw,simplifyRange:Rw,subset:Pw,SemVer:JA,re:oa.re,src:oa.src,tokens:oa.t,SEMVER_SPEC_VERSION:Op.SEMVER_SPEC_VERSION,RELEASE_TYPES:Op.RELEASE_TYPES,compareIdentifiers:Cp.compareIdentifiers,rcompareIdentifiers:Cp.rcompareIdentifiers}});var K=p(ge=>{"use strict";var fa=Symbol.for("yaml.alias"),xp=Symbol.for("yaml.document"),Is=Symbol.for("yaml.map"),qp=Symbol.for("yaml.pair"),ha=Symbol.for("yaml.scalar"),bs=Symbol.for("yaml.seq"),rt=Symbol.for("yaml.node.type"),kw=n=>!!n&&typeof n=="object"&&n[rt]===fa,$w=n=>!!n&&typeof n=="object"&&n[rt]===xp,xw=n=>!!n&&typeof n=="object"&&n[rt]===Is,qw=n=>!!n&&typeof n=="object"&&n[rt]===qp,Mp=n=>!!n&&typeof n=="object"&&n[rt]===ha,Mw=n=>!!n&&typeof n=="object"&&n[rt]===bs;function Fp(n){if(n&&typeof n=="object")switch(n[rt]){case Is:case bs:return!0}return!1}function Fw(n){if(n&&typeof n=="object")switch(n[rt]){case fa:case Is:case ha:case bs:return!0}return!1}var Dw=n=>(Mp(n)||Fp(n))&&!!n.anchor;ge.ALIAS=fa;ge.DOC=xp;ge.MAP=Is;ge.NODE_TYPE=rt;ge.PAIR=qp;ge.SCALAR=ha;ge.SEQ=bs;ge.hasAnchor=Dw;ge.isAlias=kw;ge.isCollection=Fp;ge.isDocument=$w;ge.isMap=xw;ge.isNode=Fw;ge.isPair=qw;ge.isScalar=Mp;ge.isSeq=Mw});var Mn=p(da=>{"use strict";var he=K(),Re=Symbol("break visit"),Dp=Symbol("skip children"),Xe=Symbol("remove node");function vs(n,e){let t=jp(e);he.isDocument(n)?Qt(null,n.contents,t,Object.freeze([n]))===Xe&&(n.contents=null):Qt(null,n,t,Object.freeze([]))}vs.BREAK=Re;vs.SKIP=Dp;vs.REMOVE=Xe;function Qt(n,e,t,r){let s=Bp(n,e,t,r);if(he.isNode(s)||he.isPair(s))return Up(n,r,s),Qt(n,s,t,r);if(typeof s!="symbol"){if(he.isCollection(e)){r=Object.freeze(r.concat(e));for(let i=0;i<e.items.length;++i){let o=Qt(i,e.items[i],t,r);if(typeof o=="number")i=o-1;else{if(o===Re)return Re;o===Xe&&(e.items.splice(i,1),i-=1)}}}else if(he.isPair(e)){r=Object.freeze(r.concat(e));let i=Qt("key",e.key,t,r);if(i===Re)return Re;i===Xe&&(e.key=null);let o=Qt("value",e.value,t,r);if(o===Re)return Re;o===Xe&&(e.value=null)}}return s}async function Ns(n,e){let t=jp(e);he.isDocument(n)?await Zt(null,n.contents,t,Object.freeze([n]))===Xe&&(n.contents=null):await Zt(null,n,t,Object.freeze([]))}Ns.BREAK=Re;Ns.SKIP=Dp;Ns.REMOVE=Xe;async function Zt(n,e,t,r){let s=await Bp(n,e,t,r);if(he.isNode(s)||he.isPair(s))return Up(n,r,s),Zt(n,s,t,r);if(typeof s!="symbol"){if(he.isCollection(e)){r=Object.freeze(r.concat(e));for(let i=0;i<e.items.length;++i){let o=await Zt(i,e.items[i],t,r);if(typeof o=="number")i=o-1;else{if(o===Re)return Re;o===Xe&&(e.items.splice(i,1),i-=1)}}}else if(he.isPair(e)){r=Object.freeze(r.concat(e));let i=await Zt("key",e.key,t,r);if(i===Re)return Re;i===Xe&&(e.key=null);let o=await Zt("value",e.value,t,r);if(o===Re)return Re;o===Xe&&(e.value=null)}}return s}function jp(n){return typeof n=="object"&&(n.Collection||n.Node||n.Value)?Object.assign({Alias:n.Node,Map:n.Node,Scalar:n.Node,Seq:n.Node},n.Value&&{Map:n.Value,Scalar:n.Value,Seq:n.Value},n.Collection&&{Map:n.Collection,Seq:n.Collection},n):n}function Bp(n,e,t,r){if(typeof t=="function")return t(n,e,r);if(he.isMap(e))return t.Map?.(n,e,r);if(he.isSeq(e))return t.Seq?.(n,e,r);if(he.isPair(e))return t.Pair?.(n,e,r);if(he.isScalar(e))return t.Scalar?.(n,e,r);if(he.isAlias(e))return t.Alias?.(n,e,r)}function Up(n,e,t){let r=e[e.length-1];if(he.isCollection(r))r.items[n]=t;else if(he.isPair(r))n==="key"?r.key=t:r.value=t;else if(he.isDocument(r))r.contents=t;else{let s=he.isAlias(r)?"alias":"scalar";throw new Error(`Cannot replace node with ${s} parent`)}}da.visit=vs;da.visitAsync=Ns});var pa=p(Vp=>{"use strict";var Hp=K(),jw=Mn(),Bw={"!":"%21",",":"%2C","[":"%5B","]":"%5D","{":"%7B","}":"%7D"},Uw=n=>n.replace(/[!,[\]{}]/g,e=>Bw[e]),Fn=class n{constructor(e,t){this.docStart=null,this.docEnd=!1,this.yaml=Object.assign({},n.defaultYaml,e),this.tags=Object.assign({},n.defaultTags,t)}clone(){let e=new n(this.yaml,this.tags);return e.docStart=this.docStart,e}atDocument(){let e=new n(this.yaml,this.tags);switch(this.yaml.version){case"1.1":this.atNextDocument=!0;break;case"1.2":this.atNextDocument=!1,this.yaml={explicit:n.defaultYaml.explicit,version:"1.2"},this.tags=Object.assign({},n.defaultTags);break}return e}add(e,t){this.atNextDocument&&(this.yaml={explicit:n.defaultYaml.explicit,version:"1.1"},this.tags=Object.assign({},n.defaultTags),this.atNextDocument=!1);let r=e.trim().split(/[ \t]+/),s=r.shift();switch(s){case"%TAG":{if(r.length!==2&&(t(0,"%TAG directive should contain exactly two parts"),r.length<2))return!1;let[i,o]=r;return this.tags[i]=o,!0}case"%YAML":{if(this.yaml.explicit=!0,r.length!==1)return t(0,"%YAML directive should contain exactly one part"),!1;let[i]=r;if(i==="1.1"||i==="1.2")return this.yaml.version=i,!0;{let o=/^\d+\.\d+$/.test(i);return t(6,`Unsupported YAML version ${i}`,o),!1}}default:return t(0,`Unknown directive ${s}`,!0),!1}}tagName(e,t){if(e==="!")return"!";if(e[0]!=="!")return t(`Not a valid tag: ${e}`),null;if(e[1]==="<"){let o=e.slice(2,-1);return o==="!"||o==="!!"?(t(`Verbatim tags aren't resolved, so ${e} is invalid.`),null):(e[e.length-1]!==">"&&t("Verbatim tags must end with a >"),o)}let[,r,s]=e.match(/^(.*!)([^!]*)$/s);s||t(`The ${e} tag has no suffix`);let i=this.tags[r];if(i)try{return i+decodeURIComponent(s)}catch(o){return t(String(o)),null}return r==="!"?e:(t(`Could not resolve tag: ${e}`),null)}tagString(e){for(let[t,r]of Object.entries(this.tags))if(e.startsWith(r))return t+Uw(e.substring(r.length));return e[0]==="!"?e:`!<${e}>`}toString(e){let t=this.yaml.explicit?[`%YAML ${this.yaml.version||"1.2"}`]:[],r=Object.entries(this.tags),s;if(e&&r.length>0&&Hp.isNode(e.contents)){let i={};jw.visit(e.contents,(o,a)=>{Hp.isNode(a)&&a.tag&&(i[a.tag]=!0)}),s=Object.keys(i)}else s=[];for(let[i,o]of r)i==="!!"&&o==="tag:yaml.org,2002:"||(!e||s.some(a=>a.startsWith(o)))&&t.push(`%TAG ${i} ${o}`);return t.join(`
`)}};Fn.defaultYaml={explicit:!1,version:"1.2"};Fn.defaultTags={"!!":"tag:yaml.org,2002:"};Vp.Directives=Fn});var Os=p(Dn=>{"use strict";var Wp=K(),Hw=Mn();function Vw(n){if(/[\x00-\x19\s,[\]{}]/.test(n)){let t=`Anchor must not contain whitespace or control characters: ${JSON.stringify(n)}`;throw new Error(t)}return!0}function Gp(n){let e=new Set;return Hw.visit(n,{Value(t,r){r.anchor&&e.add(r.anchor)}}),e}function Kp(n,e){for(let t=1;;++t){let r=`${n}${t}`;if(!e.has(r))return r}}function Ww(n,e){let t=[],r=new Map,s=null;return{onAnchor:i=>{t.push(i),s??(s=Gp(n));let o=Kp(e,s);return s.add(o),o},setAnchors:()=>{for(let i of t){let o=r.get(i);if(typeof o=="object"&&o.anchor&&(Wp.isScalar(o.node)||Wp.isCollection(o.node)))o.node.anchor=o.anchor;else{let a=new Error("Failed to resolve repeated object (this should not happen)");throw a.source=i,a}}},sourceObjects:r}}Dn.anchorIsValid=Vw;Dn.anchorNames=Gp;Dn.createNodeAnchors=Ww;Dn.findNewAnchor=Kp});var _a=p(Yp=>{"use strict";function jn(n,e,t,r){if(r&&typeof r=="object")if(Array.isArray(r))for(let s=0,i=r.length;s<i;++s){let o=r[s],a=jn(n,r,String(s),o);a===void 0?delete r[s]:a!==o&&(r[s]=a)}else if(r instanceof Map)for(let s of Array.from(r.keys())){let i=r.get(s),o=jn(n,r,s,i);o===void 0?r.delete(s):o!==i&&r.set(s,o)}else if(r instanceof Set)for(let s of Array.from(r)){let i=jn(n,r,s,s);i===void 0?r.delete(s):i!==s&&(r.delete(s),r.add(i))}else for(let[s,i]of Object.entries(r)){let o=jn(n,r,s,i);o===void 0?delete r[s]:o!==i&&(r[s]=o)}return n.call(e,t,r)}Yp.applyReviver=jn});var mt=p(Xp=>{"use strict";var Gw=K();function Jp(n,e,t){if(Array.isArray(n))return n.map((r,s)=>Jp(r,String(s),t));if(n&&typeof n.toJSON=="function"){if(!t||!Gw.hasAnchor(n))return n.toJSON(e,t);let r={aliasCount:0,count:1,res:void 0};t.anchors.set(n,r),t.onCreate=i=>{r.res=i,delete t.onCreate};let s=n.toJSON(e,t);return t.onCreate&&t.onCreate(s),s}return typeof n=="bigint"&&!t?.keep?Number(n):n}Xp.toJS=Jp});var Cs=p(Qp=>{"use strict";var Kw=_a(),zp=K(),Yw=mt(),ma=class{constructor(e){Object.defineProperty(this,zp.NODE_TYPE,{value:e})}clone(){let e=Object.create(Object.getPrototypeOf(this),Object.getOwnPropertyDescriptors(this));return this.range&&(e.range=this.range.slice()),e}toJS(e,{mapAsMap:t,maxAliasCount:r,onAnchor:s,reviver:i}={}){if(!zp.isDocument(e))throw new TypeError("A document argument is required");let o={anchors:new Map,doc:e,keep:!0,mapAsMap:t===!0,mapKeyWarned:!1,maxAliasCount:typeof r=="number"?r:100},a=Yw.toJS(this,"",o);if(typeof s=="function")for(let{count:l,res:c}of o.anchors.values())s(c,l);return typeof i=="function"?Kw.applyReviver(i,{"":a},"",a):a}};Qp.NodeBase=ma});var Bn=p(Zp=>{"use strict";var Jw=Os(),Xw=Mn(),en=K(),zw=Cs(),Qw=mt(),ga=class extends zw.NodeBase{constructor(e){super(en.ALIAS),this.source=e,Object.defineProperty(this,"tag",{set(){throw new Error("Alias nodes cannot have tags")}})}resolve(e,t){let r;t?.aliasResolveCache?r=t.aliasResolveCache:(r=[],Xw.visit(e,{Node:(i,o)=>{(en.isAlias(o)||en.hasAnchor(o))&&r.push(o)}}),t&&(t.aliasResolveCache=r));let s;for(let i of r){if(i===this)break;i.anchor===this.source&&(s=i)}return s}toJSON(e,t){if(!t)return{source:this.source};let{anchors:r,doc:s,maxAliasCount:i}=t,o=this.resolve(s,t);if(!o){let l=`Unresolved alias (the anchor must be set before the alias): ${this.source}`;throw new ReferenceError(l)}let a=r.get(o);if(a||(Qw.toJS(o,null,t),a=r.get(o)),a?.res===void 0){let l="This should not happen: Alias anchor was not resolved?";throw new ReferenceError(l)}if(i>=0&&(a.count+=1,a.aliasCount===0&&(a.aliasCount=Rs(s,o,r)),a.count*a.aliasCount>i)){let l="Excessive alias count indicates a resource exhaustion attack";throw new ReferenceError(l)}return a.res}toString(e,t,r){let s=`*${this.source}`;if(e){if(Jw.anchorIsValid(this.source),e.options.verifyAliasOrder&&!e.anchors.has(this.source)){let i=`Unresolved alias (the anchor must be set before the alias): ${this.source}`;throw new Error(i)}if(e.implicitKey)return`${s} `}return s}};function Rs(n,e,t){if(en.isAlias(e)){let r=e.resolve(n),s=t&&r&&t.get(r);return s?s.count*s.aliasCount:0}else if(en.isCollection(e)){let r=0;for(let s of e.items){let i=Rs(n,s,t);i>r&&(r=i)}return r}else if(en.isPair(e)){let r=Rs(n,e.key,t),s=Rs(n,e.value,t);return Math.max(r,s)}return 1}Zp.Alias=ga});var ce=p(ya=>{"use strict";var Zw=K(),eL=Cs(),tL=mt(),nL=n=>!n||typeof n!="function"&&typeof n!="object",gt=class extends eL.NodeBase{constructor(e){super(Zw.SCALAR),this.value=e}toJSON(e,t){return t?.keep?this.value:tL.toJS(this.value,e,t)}toString(){return String(this.value)}};gt.BLOCK_FOLDED="BLOCK_FOLDED";gt.BLOCK_LITERAL="BLOCK_LITERAL";gt.PLAIN="PLAIN";gt.QUOTE_DOUBLE="QUOTE_DOUBLE";gt.QUOTE_SINGLE="QUOTE_SINGLE";ya.Scalar=gt;ya.isScalarValue=nL});var Un=p(t_=>{"use strict";var rL=Bn(),Pt=K(),e_=ce(),sL="tag:yaml.org,2002:";function iL(n,e,t){if(e){let r=t.filter(i=>i.tag===e),s=r.find(i=>!i.format)??r[0];if(!s)throw new Error(`Tag ${e} not found`);return s}return t.find(r=>r.identify?.(n)&&!r.format)}function oL(n,e,t){if(Pt.isDocument(n)&&(n=n.contents),Pt.isNode(n))return n;if(Pt.isPair(n)){let f=t.schema[Pt.MAP].createNode?.(t.schema,null,t);return f.items.push(n),f}(n instanceof String||n instanceof Number||n instanceof Boolean||typeof BigInt<"u"&&n instanceof BigInt)&&(n=n.valueOf());let{aliasDuplicateObjects:r,onAnchor:s,onTagObj:i,schema:o,sourceObjects:a}=t,l;if(r&&n&&typeof n=="object"){if(l=a.get(n),l)return l.anchor??(l.anchor=s(n)),new rL.Alias(l.anchor);l={anchor:null,node:null},a.set(n,l)}e?.startsWith("!!")&&(e=sL+e.slice(2));let c=iL(n,e,o.tags);if(!c){if(n&&typeof n.toJSON=="function"&&(n=n.toJSON()),!n||typeof n!="object"){let f=new e_.Scalar(n);return l&&(l.node=f),f}c=n instanceof Map?o[Pt.MAP]:Symbol.iterator in Object(n)?o[Pt.SEQ]:o[Pt.MAP]}i&&(i(c),delete t.onTagObj);let u=c?.createNode?c.createNode(t.schema,n,t):typeof c?.nodeClass?.from=="function"?c.nodeClass.from(t.schema,n,t):new e_.Scalar(n);return e?u.tag=e:c.default||(u.tag=c.tag),l&&(l.node=u),u}t_.createNode=oL});var ks=p(Ps=>{"use strict";var aL=Un(),ze=K(),lL=Cs();function Ea(n,e,t){let r=t;for(let s=e.length-1;s>=0;--s){let i=e[s];if(typeof i=="number"&&Number.isInteger(i)&&i>=0){let o=[];o[i]=r,r=o}else r=new Map([[i,r]])}return aL.createNode(r,void 0,{aliasDuplicateObjects:!1,keepUndefined:!1,onAnchor:()=>{throw new Error("This should not happen, please report a bug.")},schema:n,sourceObjects:new Map})}var n_=n=>n==null||typeof n=="object"&&!!n[Symbol.iterator]().next().done,Ta=class extends lL.NodeBase{constructor(e,t){super(e),Object.defineProperty(this,"schema",{value:t,configurable:!0,enumerable:!1,writable:!0})}clone(e){let t=Object.create(Object.getPrototypeOf(this),Object.getOwnPropertyDescriptors(this));return e&&(t.schema=e),t.items=t.items.map(r=>ze.isNode(r)||ze.isPair(r)?r.clone(e):r),this.range&&(t.range=this.range.slice()),t}addIn(e,t){if(n_(e))this.add(t);else{let[r,...s]=e,i=this.get(r,!0);if(ze.isCollection(i))i.addIn(s,t);else if(i===void 0&&this.schema)this.set(r,Ea(this.schema,s,t));else throw new Error(`Expected YAML collection at ${r}. Remaining path: ${s}`)}}deleteIn(e){let[t,...r]=e;if(r.length===0)return this.delete(t);let s=this.get(t,!0);if(ze.isCollection(s))return s.deleteIn(r);throw new Error(`Expected YAML collection at ${t}. Remaining path: ${r}`)}getIn(e,t){let[r,...s]=e,i=this.get(r,!0);return s.length===0?!t&&ze.isScalar(i)?i.value:i:ze.isCollection(i)?i.getIn(s,t):void 0}hasAllNullValues(e){return this.items.every(t=>{if(!ze.isPair(t))return!1;let r=t.value;return r==null||e&&ze.isScalar(r)&&r.value==null&&!r.commentBefore&&!r.comment&&!r.tag})}hasIn(e){let[t,...r]=e;if(r.length===0)return this.has(t);let s=this.get(t,!0);return ze.isCollection(s)?s.hasIn(r):!1}setIn(e,t){let[r,...s]=e;if(s.length===0)this.set(r,t);else{let i=this.get(r,!0);if(ze.isCollection(i))i.setIn(s,t);else if(i===void 0&&this.schema)this.set(r,Ea(this.schema,s,t));else throw new Error(`Expected YAML collection at ${r}. Remaining path: ${s}`)}}};Ps.Collection=Ta;Ps.collectionFromPath=Ea;Ps.isEmptyPath=n_});var Hn=p($s=>{"use strict";var cL=n=>n.replace(/^(?!$)(?: $)?/gm,"#");function Sa(n,e){return/^\n+$/.test(n)?n.substring(1):e?n.replace(/^(?! *$)/gm,e):n}var uL=(n,e,t)=>n.endsWith(`
`)?Sa(t,e):t.includes(`
`)?`
`+Sa(t,e):(n.endsWith(" ")?"":" ")+t;$s.indentComment=Sa;$s.lineComment=uL;$s.stringifyComment=cL});var s_=p(Vn=>{"use strict";var fL="flow",Aa="block",xs="quoted";function hL(n,e,t="flow",{indentAtStart:r,lineWidth:s=80,minContentWidth:i=20,onFold:o,onOverflow:a}={}){if(!s||s<0)return n;s<i&&(i=0);let l=Math.max(1+i,1+s-e.length);if(n.length<=l)return n;let c=[],u={},f=s-e.length;typeof r=="number"&&(r>s-Math.max(2,i)?c.push(0):f=s-r);let h,d,y=!1,m=-1,_=-1,S=-1;t===Aa&&(m=r_(n,m,e.length),m!==-1&&(f=m+l));for(let I;I=n[m+=1];){if(t===xs&&I==="\\"){switch(_=m,n[m+1]){case"x":m+=3;break;case"u":m+=5;break;case"U":m+=9;break;default:m+=1}S=m}if(I===`
`)t===Aa&&(m=r_(n,m,e.length)),f=m+e.length+l,h=void 0;else{if(I===" "&&d&&d!==" "&&d!==`
`&&d!=="	"){let x=n[m+1];x&&x!==" "&&x!==`
`&&x!=="	"&&(h=m)}if(m>=f)if(h)c.push(h),f=h+l,h=void 0;else if(t===xs){for(;d===" "||d==="	";)d=I,I=n[m+=1],y=!0;let x=m>S+1?m-2:_-1;if(u[x])return n;c.push(x),u[x]=!0,f=x+l,h=void 0}else y=!0}d=I}if(y&&a&&a(),c.length===0)return n;o&&o();let w=n.slice(0,c[0]);for(let I=0;I<c.length;++I){let x=c[I],q=c[I+1]||n.length;x===0?w=`
${e}${n.slice(0,q)}`:(t===xs&&u[x]&&(w+=`${n[x]}\\`),w+=`
${e}${n.slice(x+1,q)}`)}return w}function r_(n,e,t){let r=e,s=e+1,i=n[s];for(;i===" "||i==="	";)if(e<s+t)i=n[++e];else{do i=n[++e];while(i&&i!==`
`);r=e,s=e+1,i=n[s]}return r}Vn.FOLD_BLOCK=Aa;Vn.FOLD_FLOW=fL;Vn.FOLD_QUOTED=xs;Vn.foldFlowLines=hL});var Gn=p(i_=>{"use strict";var Ve=ce(),yt=s_(),Ms=(n,e)=>({indentAtStart:e?n.indent.length:n.indentAtStart,lineWidth:n.options.lineWidth,minContentWidth:n.options.minContentWidth}),Fs=n=>/^(%|---|\.\.\.)/m.test(n);function dL(n,e,t){if(!e||e<0)return!1;let r=e-t,s=n.length;if(s<=r)return!1;for(let i=0,o=0;i<s;++i)if(n[i]===`
`){if(i-o>r)return!0;if(o=i+1,s-o<=r)return!1}return!0}function Wn(n,e){let t=JSON.stringify(n);if(e.options.doubleQuotedAsJSON)return t;let{implicitKey:r}=e,s=e.options.doubleQuotedMinMultiLineLength,i=e.indent||(Fs(n)?"  ":""),o="",a=0;for(let l=0,c=t[l];c;c=t[++l])if(c===" "&&t[l+1]==="\\"&&t[l+2]==="n"&&(o+=t.slice(a,l)+"\\ ",l+=1,a=l,c="\\"),c==="\\")switch(t[l+1]){case"u":{o+=t.slice(a,l);let u=t.substr(l+2,4);switch(u){case"0000":o+="\\0";break;case"0007":o+="\\a";break;case"000b":o+="\\v";break;case"001b":o+="\\e";break;case"0085":o+="\\N";break;case"00a0":o+="\\_";break;case"2028":o+="\\L";break;case"2029":o+="\\P";break;default:u.substr(0,2)==="00"?o+="\\x"+u.substr(2):o+=t.substr(l,6)}l+=5,a=l+1}break;case"n":if(r||t[l+2]==='"'||t.length<s)l+=1;else{for(o+=t.slice(a,l)+`

`;t[l+2]==="\\"&&t[l+3]==="n"&&t[l+4]!=='"';)o+=`
`,l+=2;o+=i,t[l+2]===" "&&(o+="\\"),l+=1,a=l+1}break;default:l+=1}return o=a?o+t.slice(a):t,r?o:yt.foldFlowLines(o,i,yt.FOLD_QUOTED,Ms(e,!1))}function wa(n,e){if(e.options.singleQuote===!1||e.implicitKey&&n.includes(`
`)||/[ \t]\n|\n[ \t]/.test(n))return Wn(n,e);let t=e.indent||(Fs(n)?"  ":""),r="'"+n.replace(/'/g,"''").replace(/\n+/g,`$&
${t}`)+"'";return e.implicitKey?r:yt.foldFlowLines(r,t,yt.FOLD_FLOW,Ms(e,!1))}function tn(n,e){let{singleQuote:t}=e.options,r;if(t===!1)r=Wn;else{let s=n.includes('"'),i=n.includes("'");s&&!i?r=wa:i&&!s?r=Wn:r=t?wa:Wn}return r(n,e)}var La;try{La=new RegExp(`(^|(?<!
))
+(?!
|$)`,"g")}catch{La=/\n+(?!\n|$)/g}function qs({comment:n,type:e,value:t},r,s,i){let{blockQuote:o,commentString:a,lineWidth:l}=r.options;if(!o||/\n[\t ]+$/.test(t))return tn(t,r);let c=r.indent||(r.forceBlockIndent||Fs(t)?"  ":""),u=o==="literal"?!0:o==="folded"||e===Ve.Scalar.BLOCK_FOLDED?!1:e===Ve.Scalar.BLOCK_LITERAL?!0:!dL(t,l,c.length);if(!t)return u?`|
`:`>
`;let f,h;for(h=t.length;h>0;--h){let q=t[h-1];if(q!==`
`&&q!=="	"&&q!==" ")break}let d=t.substring(h),y=d.indexOf(`
`);y===-1?f="-":t===d||y!==d.length-1?(f="+",i&&i()):f="",d&&(t=t.slice(0,-d.length),d[d.length-1]===`
`&&(d=d.slice(0,-1)),d=d.replace(La,`$&${c}`));let m=!1,_,S=-1;for(_=0;_<t.length;++_){let q=t[_];if(q===" ")m=!0;else if(q===`
`)S=_;else break}let w=t.substring(0,S<_?S+1:_);w&&(t=t.substring(w.length),w=w.replace(/\n+/g,`$&${c}`));let x=(m?c?"2":"1":"")+f;if(n&&(x+=" "+a(n.replace(/ ?[\r\n]+/g," ")),s&&s()),!u){let q=t.replace(/\n+/g,`
$&`).replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g,"$1$2").replace(/\n+/g,`$&${c}`),M=!1,Y=Ms(r,!0);o!=="folded"&&e!==Ve.Scalar.BLOCK_FOLDED&&(Y.onOverflow=()=>{M=!0});let R=yt.foldFlowLines(`${w}${q}${d}`,c,yt.FOLD_BLOCK,Y);if(!M)return`>${x}
${c}${R}`}return t=t.replace(/\n+/g,`$&${c}`),`|${x}
${c}${w}${t}${d}`}function pL(n,e,t,r){let{type:s,value:i}=n,{actualString:o,implicitKey:a,indent:l,indentStep:c,inFlow:u}=e;if(a&&i.includes(`
`)||u&&/[[\]{},]/.test(i))return tn(i,e);if(/^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(i))return a||u||!i.includes(`
`)?tn(i,e):qs(n,e,t,r);if(!a&&!u&&s!==Ve.Scalar.PLAIN&&i.includes(`
`))return qs(n,e,t,r);if(Fs(i)){if(l==="")return e.forceBlockIndent=!0,qs(n,e,t,r);if(a&&l===c)return tn(i,e)}let f=i.replace(/\n+/g,`$&
${l}`);if(o){let h=m=>m.default&&m.tag!=="tag:yaml.org,2002:str"&&m.test?.test(f),{compat:d,tags:y}=e.doc.schema;if(y.some(h)||d?.some(h))return tn(i,e)}return a?f:yt.foldFlowLines(f,l,yt.FOLD_FLOW,Ms(e,!1))}function _L(n,e,t,r){let{implicitKey:s,inFlow:i}=e,o=typeof n.value=="string"?n:Object.assign({},n,{value:String(n.value)}),{type:a}=n;a!==Ve.Scalar.QUOTE_DOUBLE&&/[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(o.value)&&(a=Ve.Scalar.QUOTE_DOUBLE);let l=u=>{switch(u){case Ve.Scalar.BLOCK_FOLDED:case Ve.Scalar.BLOCK_LITERAL:return s||i?tn(o.value,e):qs(o,e,t,r);case Ve.Scalar.QUOTE_DOUBLE:return Wn(o.value,e);case Ve.Scalar.QUOTE_SINGLE:return wa(o.value,e);case Ve.Scalar.PLAIN:return pL(o,e,t,r);default:return null}},c=l(a);if(c===null){let{defaultKeyType:u,defaultStringType:f}=e.options,h=s&&u||f;if(c=l(h),c===null)throw new Error(`Unsupported default string type ${h}`)}return c}i_.stringifyString=_L});var Kn=p(Ia=>{"use strict";var mL=Os(),Et=K(),gL=Hn(),yL=Gn();function EL(n,e){let t=Object.assign({blockQuote:!0,commentString:gL.stringifyComment,defaultKeyType:null,defaultStringType:"PLAIN",directives:null,doubleQuotedAsJSON:!1,doubleQuotedMinMultiLineLength:40,falseStr:"false",flowCollectionPadding:!0,indentSeq:!0,lineWidth:80,minContentWidth:20,nullStr:"null",simpleKeys:!1,singleQuote:null,trueStr:"true",verifyAliasOrder:!0},n.schema.toStringOptions,e),r;switch(t.collectionStyle){case"block":r=!1;break;case"flow":r=!0;break;default:r=null}return{anchors:new Set,doc:n,flowCollectionPadding:t.flowCollectionPadding?" ":"",indent:"",indentStep:typeof t.indent=="number"?" ".repeat(t.indent):"  ",inFlow:r,options:t}}function TL(n,e){if(e.tag){let s=n.filter(i=>i.tag===e.tag);if(s.length>0)return s.find(i=>i.format===e.format)??s[0]}let t,r;if(Et.isScalar(e)){r=e.value;let s=n.filter(i=>i.identify?.(r));if(s.length>1){let i=s.filter(o=>o.test);i.length>0&&(s=i)}t=s.find(i=>i.format===e.format)??s.find(i=>!i.format)}else r=e,t=n.find(s=>s.nodeClass&&r instanceof s.nodeClass);if(!t){let s=r?.constructor?.name??(r===null?"null":typeof r);throw new Error(`Tag not resolved for ${s} value`)}return t}function SL(n,e,{anchors:t,doc:r}){if(!r.directives)return"";let s=[],i=(Et.isScalar(n)||Et.isCollection(n))&&n.anchor;i&&mL.anchorIsValid(i)&&(t.add(i),s.push(`&${i}`));let o=n.tag??(e.default?null:e.tag);return o&&s.push(r.directives.tagString(o)),s.join(" ")}function AL(n,e,t,r){if(Et.isPair(n))return n.toString(e,t,r);if(Et.isAlias(n)){if(e.doc.directives)return n.toString(e);if(e.resolvedAliases?.has(n))throw new TypeError("Cannot stringify circular structure without alias nodes");e.resolvedAliases?e.resolvedAliases.add(n):e.resolvedAliases=new Set([n]),n=n.resolve(e.doc)}let s,i=Et.isNode(n)?n:e.doc.createNode(n,{onTagObj:l=>s=l});s??(s=TL(e.doc.schema.tags,i));let o=SL(i,s,e);o.length>0&&(e.indentAtStart=(e.indentAtStart??0)+o.length+1);let a=typeof s.stringify=="function"?s.stringify(i,e,t,r):Et.isScalar(i)?yL.stringifyString(i,e,t,r):i.toString(e,t,r);return o?Et.isScalar(i)||a[0]==="{"||a[0]==="["?`${o} ${a}`:`${o}
${e.indent}${a}`:a}Ia.createStringifyContext=EL;Ia.stringify=AL});var c_=p(l_=>{"use strict";var st=K(),o_=ce(),a_=Kn(),Yn=Hn();function wL({key:n,value:e},t,r,s){let{allNullValues:i,doc:o,indent:a,indentStep:l,options:{commentString:c,indentSeq:u,simpleKeys:f}}=t,h=st.isNode(n)&&n.comment||null;if(f){if(h)throw new Error("With simple keys, key nodes cannot have comments");if(st.isCollection(n)||!st.isNode(n)&&typeof n=="object"){let Y="With simple keys, collection cannot be used as a key value";throw new Error(Y)}}let d=!f&&(!n||h&&e==null&&!t.inFlow||st.isCollection(n)||(st.isScalar(n)?n.type===o_.Scalar.BLOCK_FOLDED||n.type===o_.Scalar.BLOCK_LITERAL:typeof n=="object"));t=Object.assign({},t,{allNullValues:!1,implicitKey:!d&&(f||!i),indent:a+l});let y=!1,m=!1,_=a_.stringify(n,t,()=>y=!0,()=>m=!0);if(!d&&!t.inFlow&&_.length>1024){if(f)throw new Error("With simple keys, single line scalar must not span more than 1024 characters");d=!0}if(t.inFlow){if(i||e==null)return y&&r&&r(),_===""?"?":d?`? ${_}`:_}else if(i&&!f||e==null&&d)return _=`? ${_}`,h&&!y?_+=Yn.lineComment(_,t.indent,c(h)):m&&s&&s(),_;y&&(h=null),d?(h&&(_+=Yn.lineComment(_,t.indent,c(h))),_=`? ${_}
${a}:`):(_=`${_}:`,h&&(_+=Yn.lineComment(_,t.indent,c(h))));let S,w,I;st.isNode(e)?(S=!!e.spaceBefore,w=e.commentBefore,I=e.comment):(S=!1,w=null,I=null,e&&typeof e=="object"&&(e=o.createNode(e))),t.implicitKey=!1,!d&&!h&&st.isScalar(e)&&(t.indentAtStart=_.length+1),m=!1,!u&&l.length>=2&&!t.inFlow&&!d&&st.isSeq(e)&&!e.flow&&!e.tag&&!e.anchor&&(t.indent=t.indent.substring(2));let x=!1,q=a_.stringify(e,t,()=>x=!0,()=>m=!0),M=" ";if(h||S||w){if(M=S?`
`:"",w){let Y=c(w);M+=`
${Yn.indentComment(Y,t.indent)}`}q===""&&!t.inFlow?M===`
`&&I&&(M=`

`):M+=`
${t.indent}`}else if(!d&&st.isCollection(e)){let Y=q[0],R=q.indexOf(`
`),C=R!==-1,B=t.inFlow??e.flow??e.items.length===0;if(C||!B){let j=!1;if(C&&(Y==="&"||Y==="!")){let D=q.indexOf(" ");Y==="&"&&D!==-1&&D<R&&q[D+1]==="!"&&(D=q.indexOf(" ",D+1)),(D===-1||R<D)&&(j=!0)}j||(M=`
${t.indent}`)}}else(q===""||q[0]===`
`)&&(M="");return _+=M+q,t.inFlow?x&&r&&r():I&&!x?_+=Yn.lineComment(_,t.indent,c(I)):m&&s&&s(),_}l_.stringifyPair=wL});var va=p(ba=>{"use strict";var u_=require("process");function LL(n,...e){n==="debug"&&console.log(...e)}function IL(n,e){(n==="debug"||n==="warn")&&(typeof u_.emitWarning=="function"?u_.emitWarning(e):console.warn(e))}ba.debug=LL;ba.warn=IL});var Us=p(Bs=>{"use strict";var Jn=K(),f_=ce(),Ds="<<",js={identify:n=>n===Ds||typeof n=="symbol"&&n.description===Ds,default:"key",tag:"tag:yaml.org,2002:merge",test:/^<<$/,resolve:()=>Object.assign(new f_.Scalar(Symbol(Ds)),{addToJSMap:h_}),stringify:()=>Ds},bL=(n,e)=>(js.identify(e)||Jn.isScalar(e)&&(!e.type||e.type===f_.Scalar.PLAIN)&&js.identify(e.value))&&n?.doc.schema.tags.some(t=>t.tag===js.tag&&t.default);function h_(n,e,t){if(t=n&&Jn.isAlias(t)?t.resolve(n.doc):t,Jn.isSeq(t))for(let r of t.items)Na(n,e,r);else if(Array.isArray(t))for(let r of t)Na(n,e,r);else Na(n,e,t)}function Na(n,e,t){let r=n&&Jn.isAlias(t)?t.resolve(n.doc):t;if(!Jn.isMap(r))throw new Error("Merge sources must be maps or map aliases");let s=r.toJSON(null,n,Map);for(let[i,o]of s)e instanceof Map?e.has(i)||e.set(i,o):e instanceof Set?e.add(i):Object.prototype.hasOwnProperty.call(e,i)||Object.defineProperty(e,i,{value:o,writable:!0,enumerable:!0,configurable:!0});return e}Bs.addMergeToJSMap=h_;Bs.isMergeKey=bL;Bs.merge=js});var Ca=p(__=>{"use strict";var vL=va(),d_=Us(),NL=Kn(),p_=K(),Oa=mt();function OL(n,e,{key:t,value:r}){if(p_.isNode(t)&&t.addToJSMap)t.addToJSMap(n,e,r);else if(d_.isMergeKey(n,t))d_.addMergeToJSMap(n,e,r);else{let s=Oa.toJS(t,"",n);if(e instanceof Map)e.set(s,Oa.toJS(r,s,n));else if(e instanceof Set)e.add(s);else{let i=CL(t,s,n),o=Oa.toJS(r,i,n);i in e?Object.defineProperty(e,i,{value:o,writable:!0,enumerable:!0,configurable:!0}):e[i]=o}}return e}function CL(n,e,t){if(e===null)return"";if(typeof e!="object")return String(e);if(p_.isNode(n)&&t?.doc){let r=NL.createStringifyContext(t.doc,{});r.anchors=new Set;for(let i of t.anchors.keys())r.anchors.add(i.anchor);r.inFlow=!0,r.inStringifyKey=!0;let s=n.toString(r);if(!t.mapKeyWarned){let i=JSON.stringify(s);i.length>40&&(i=i.substring(0,36)+'..."'),vL.warn(t.doc.options.logLevel,`Keys with collection values will be stringified due to JS Object restrictions: ${i}. Set mapAsMap: true to use object keys.`),t.mapKeyWarned=!0}return s}return JSON.stringify(e)}__.addPairToJSMap=OL});var Tt=p(Ra=>{"use strict";var m_=Un(),RL=c_(),PL=Ca(),Hs=K();function kL(n,e,t){let r=m_.createNode(n,void 0,t),s=m_.createNode(e,void 0,t);return new Vs(r,s)}var Vs=class n{constructor(e,t=null){Object.defineProperty(this,Hs.NODE_TYPE,{value:Hs.PAIR}),this.key=e,this.value=t}clone(e){let{key:t,value:r}=this;return Hs.isNode(t)&&(t=t.clone(e)),Hs.isNode(r)&&(r=r.clone(e)),new n(t,r)}toJSON(e,t){let r=t?.mapAsMap?new Map:{};return PL.addPairToJSMap(t,r,this)}toString(e,t,r){return e?.doc?RL.stringifyPair(this,e,t,r):JSON.stringify(this)}};Ra.Pair=Vs;Ra.createPair=kL});var Pa=p(y_=>{"use strict";var kt=K(),g_=Kn(),Ws=Hn();function $L(n,e,t){return(e.inFlow??n.flow?qL:xL)(n,e,t)}function xL({comment:n,items:e},t,{blockItemPrefix:r,flowChars:s,itemIndent:i,onChompKeep:o,onComment:a}){let{indent:l,options:{commentString:c}}=t,u=Object.assign({},t,{indent:i,type:null}),f=!1,h=[];for(let y=0;y<e.length;++y){let m=e[y],_=null;if(kt.isNode(m))!f&&m.spaceBefore&&h.push(""),Gs(t,h,m.commentBefore,f),m.comment&&(_=m.comment);else if(kt.isPair(m)){let w=kt.isNode(m.key)?m.key:null;w&&(!f&&w.spaceBefore&&h.push(""),Gs(t,h,w.commentBefore,f))}f=!1;let S=g_.stringify(m,u,()=>_=null,()=>f=!0);_&&(S+=Ws.lineComment(S,i,c(_))),f&&_&&(f=!1),h.push(r+S)}let d;if(h.length===0)d=s.start+s.end;else{d=h[0];for(let y=1;y<h.length;++y){let m=h[y];d+=m?`
${l}${m}`:`
`}}return n?(d+=`
`+Ws.indentComment(c(n),l),a&&a()):f&&o&&o(),d}function qL({items:n},e,{flowChars:t,itemIndent:r}){let{indent:s,indentStep:i,flowCollectionPadding:o,options:{commentString:a}}=e;r+=i;let l=Object.assign({},e,{indent:r,inFlow:!0,type:null}),c=!1,u=0,f=[];for(let y=0;y<n.length;++y){let m=n[y],_=null;if(kt.isNode(m))m.spaceBefore&&f.push(""),Gs(e,f,m.commentBefore,!1),m.comment&&(_=m.comment);else if(kt.isPair(m)){let w=kt.isNode(m.key)?m.key:null;w&&(w.spaceBefore&&f.push(""),Gs(e,f,w.commentBefore,!1),w.comment&&(c=!0));let I=kt.isNode(m.value)?m.value:null;I?(I.comment&&(_=I.comment),I.commentBefore&&(c=!0)):m.value==null&&w?.comment&&(_=w.comment)}_&&(c=!0);let S=g_.stringify(m,l,()=>_=null);y<n.length-1&&(S+=","),_&&(S+=Ws.lineComment(S,r,a(_))),!c&&(f.length>u||S.includes(`
`))&&(c=!0),f.push(S),u=f.length}let{start:h,end:d}=t;if(f.length===0)return h+d;if(!c){let y=f.reduce((m,_)=>m+_.length+2,2);c=e.options.lineWidth>0&&y>e.options.lineWidth}if(c){let y=h;for(let m of f)y+=m?`
${i}${s}${m}`:`
`;return`${y}
${s}${d}`}else return`${h}${o}${f.join(" ")}${o}${d}`}function Gs({indent:n,options:{commentString:e}},t,r,s){if(r&&s&&(r=r.replace(/^\n+/,"")),r){let i=Ws.indentComment(e(r),n);t.push(i.trimStart())}}y_.stringifyCollection=$L});var At=p($a=>{"use strict";var ML=Pa(),FL=Ca(),DL=ks(),St=K(),Ks=Tt(),jL=ce();function Xn(n,e){let t=St.isScalar(e)?e.value:e;for(let r of n)if(St.isPair(r)&&(r.key===e||r.key===t||St.isScalar(r.key)&&r.key.value===t))return r}var ka=class extends DL.Collection{static get tagName(){return"tag:yaml.org,2002:map"}constructor(e){super(St.MAP,e),this.items=[]}static from(e,t,r){let{keepUndefined:s,replacer:i}=r,o=new this(e),a=(l,c)=>{if(typeof i=="function")c=i.call(t,l,c);else if(Array.isArray(i)&&!i.includes(l))return;(c!==void 0||s)&&o.items.push(Ks.createPair(l,c,r))};if(t instanceof Map)for(let[l,c]of t)a(l,c);else if(t&&typeof t=="object")for(let l of Object.keys(t))a(l,t[l]);return typeof e.sortMapEntries=="function"&&o.items.sort(e.sortMapEntries),o}add(e,t){let r;St.isPair(e)?r=e:!e||typeof e!="object"||!("key"in e)?r=new Ks.Pair(e,e?.value):r=new Ks.Pair(e.key,e.value);let s=Xn(this.items,r.key),i=this.schema?.sortMapEntries;if(s){if(!t)throw new Error(`Key ${r.key} already set`);St.isScalar(s.value)&&jL.isScalarValue(r.value)?s.value.value=r.value:s.value=r.value}else if(i){let o=this.items.findIndex(a=>i(r,a)<0);o===-1?this.items.push(r):this.items.splice(o,0,r)}else this.items.push(r)}delete(e){let t=Xn(this.items,e);return t?this.items.splice(this.items.indexOf(t),1).length>0:!1}get(e,t){let s=Xn(this.items,e)?.value;return(!t&&St.isScalar(s)?s.value:s)??void 0}has(e){return!!Xn(this.items,e)}set(e,t){this.add(new Ks.Pair(e,t),!0)}toJSON(e,t,r){let s=r?new r:t?.mapAsMap?new Map:{};t?.onCreate&&t.onCreate(s);for(let i of this.items)FL.addPairToJSMap(t,s,i);return s}toString(e,t,r){if(!e)return JSON.stringify(this);for(let s of this.items)if(!St.isPair(s))throw new Error(`Map items must all be pairs; found ${JSON.stringify(s)} instead`);return!e.allNullValues&&this.hasAllNullValues(!1)&&(e=Object.assign({},e,{allNullValues:!0})),ML.stringifyCollection(this,e,{blockItemPrefix:"",flowChars:{start:"{",end:"}"},itemIndent:e.indent||"",onChompKeep:r,onComment:t})}};$a.YAMLMap=ka;$a.findPair=Xn});var nn=p(T_=>{"use strict";var BL=K(),E_=At(),UL={collection:"map",default:!0,nodeClass:E_.YAMLMap,tag:"tag:yaml.org,2002:map",resolve(n,e){return BL.isMap(n)||e("Expected a mapping for this tag"),n},createNode:(n,e,t)=>E_.YAMLMap.from(n,e,t)};T_.map=UL});var wt=p(S_=>{"use strict";var HL=Un(),VL=Pa(),WL=ks(),Js=K(),GL=ce(),KL=mt(),xa=class extends WL.Collection{static get tagName(){return"tag:yaml.org,2002:seq"}constructor(e){super(Js.SEQ,e),this.items=[]}add(e){this.items.push(e)}delete(e){let t=Ys(e);return typeof t!="number"?!1:this.items.splice(t,1).length>0}get(e,t){let r=Ys(e);if(typeof r!="number")return;let s=this.items[r];return!t&&Js.isScalar(s)?s.value:s}has(e){let t=Ys(e);return typeof t=="number"&&t<this.items.length}set(e,t){let r=Ys(e);if(typeof r!="number")throw new Error(`Expected a valid index, not ${e}.`);let s=this.items[r];Js.isScalar(s)&&GL.isScalarValue(t)?s.value=t:this.items[r]=t}toJSON(e,t){let r=[];t?.onCreate&&t.onCreate(r);let s=0;for(let i of this.items)r.push(KL.toJS(i,String(s++),t));return r}toString(e,t,r){return e?VL.stringifyCollection(this,e,{blockItemPrefix:"- ",flowChars:{start:"[",end:"]"},itemIndent:(e.indent||"")+"  ",onChompKeep:r,onComment:t}):JSON.stringify(this)}static from(e,t,r){let{replacer:s}=r,i=new this(e);if(t&&Symbol.iterator in Object(t)){let o=0;for(let a of t){if(typeof s=="function"){let l=t instanceof Set?a:String(o++);a=s.call(t,l,a)}i.items.push(HL.createNode(a,void 0,r))}}return i}};function Ys(n){let e=Js.isScalar(n)?n.value:n;return e&&typeof e=="string"&&(e=Number(e)),typeof e=="number"&&Number.isInteger(e)&&e>=0?e:null}S_.YAMLSeq=xa});var rn=p(w_=>{"use strict";var YL=K(),A_=wt(),JL={collection:"seq",default:!0,nodeClass:A_.YAMLSeq,tag:"tag:yaml.org,2002:seq",resolve(n,e){return YL.isSeq(n)||e("Expected a sequence for this tag"),n},createNode:(n,e,t)=>A_.YAMLSeq.from(n,e,t)};w_.seq=JL});var zn=p(L_=>{"use strict";var XL=Gn(),zL={identify:n=>typeof n=="string",default:!0,tag:"tag:yaml.org,2002:str",resolve:n=>n,stringify(n,e,t,r){return e=Object.assign({actualString:!0},e),XL.stringifyString(n,e,t,r)}};L_.string=zL});var Xs=p(v_=>{"use strict";var I_=ce(),b_={identify:n=>n==null,createNode:()=>new I_.Scalar(null),default:!0,tag:"tag:yaml.org,2002:null",test:/^(?:~|[Nn]ull|NULL)?$/,resolve:()=>new I_.Scalar(null),stringify:({source:n},e)=>typeof n=="string"&&b_.test.test(n)?n:e.options.nullStr};v_.nullTag=b_});var qa=p(O_=>{"use strict";var QL=ce(),N_={identify:n=>typeof n=="boolean",default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,resolve:n=>new QL.Scalar(n[0]==="t"||n[0]==="T"),stringify({source:n,value:e},t){if(n&&N_.test.test(n)){let r=n[0]==="t"||n[0]==="T";if(e===r)return n}return e?t.options.trueStr:t.options.falseStr}};O_.boolTag=N_});var sn=p(C_=>{"use strict";function ZL({format:n,minFractionDigits:e,tag:t,value:r}){if(typeof r=="bigint")return String(r);let s=typeof r=="number"?r:Number(r);if(!isFinite(s))return isNaN(s)?".nan":s<0?"-.inf":".inf";let i=Object.is(r,-0)?"-0":JSON.stringify(r);if(!n&&e&&(!t||t==="tag:yaml.org,2002:float")&&/^\d/.test(i)){let o=i.indexOf(".");o<0&&(o=i.length,i+=".");let a=e-(i.length-o-1);for(;a-- >0;)i+="0"}return i}C_.stringifyNumber=ZL});var Fa=p(zs=>{"use strict";var eI=ce(),Ma=sn(),tI={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,resolve:n=>n.slice(-3).toLowerCase()==="nan"?NaN:n[0]==="-"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,stringify:Ma.stringifyNumber},nI={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"EXP",test:/^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,resolve:n=>parseFloat(n),stringify(n){let e=Number(n.value);return isFinite(e)?e.toExponential():Ma.stringifyNumber(n)}},rI={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,resolve(n){let e=new eI.Scalar(parseFloat(n)),t=n.indexOf(".");return t!==-1&&n[n.length-1]==="0"&&(e.minFractionDigits=n.length-t-1),e},stringify:Ma.stringifyNumber};zs.float=rI;zs.floatExp=nI;zs.floatNaN=tI});var ja=p(Zs=>{"use strict";var R_=sn(),Qs=n=>typeof n=="bigint"||Number.isInteger(n),Da=(n,e,t,{intAsBigInt:r})=>r?BigInt(n):parseInt(n.substring(e),t);function P_(n,e,t){let{value:r}=n;return Qs(r)&&r>=0?t+r.toString(e):R_.stringifyNumber(n)}var sI={identify:n=>Qs(n)&&n>=0,default:!0,tag:"tag:yaml.org,2002:int",format:"OCT",test:/^0o[0-7]+$/,resolve:(n,e,t)=>Da(n,2,8,t),stringify:n=>P_(n,8,"0o")},iI={identify:Qs,default:!0,tag:"tag:yaml.org,2002:int",test:/^[-+]?[0-9]+$/,resolve:(n,e,t)=>Da(n,0,10,t),stringify:R_.stringifyNumber},oI={identify:n=>Qs(n)&&n>=0,default:!0,tag:"tag:yaml.org,2002:int",format:"HEX",test:/^0x[0-9a-fA-F]+$/,resolve:(n,e,t)=>Da(n,2,16,t),stringify:n=>P_(n,16,"0x")};Zs.int=iI;Zs.intHex=oI;Zs.intOct=sI});var $_=p(k_=>{"use strict";var aI=nn(),lI=Xs(),cI=rn(),uI=zn(),fI=qa(),Ba=Fa(),Ua=ja(),hI=[aI.map,cI.seq,uI.string,lI.nullTag,fI.boolTag,Ua.intOct,Ua.int,Ua.intHex,Ba.floatNaN,Ba.floatExp,Ba.float];k_.schema=hI});var M_=p(q_=>{"use strict";var dI=ce(),pI=nn(),_I=rn();function x_(n){return typeof n=="bigint"||Number.isInteger(n)}var ei=({value:n})=>JSON.stringify(n),mI=[{identify:n=>typeof n=="string",default:!0,tag:"tag:yaml.org,2002:str",resolve:n=>n,stringify:ei},{identify:n=>n==null,createNode:()=>new dI.Scalar(null),default:!0,tag:"tag:yaml.org,2002:null",test:/^null$/,resolve:()=>null,stringify:ei},{identify:n=>typeof n=="boolean",default:!0,tag:"tag:yaml.org,2002:bool",test:/^true$|^false$/,resolve:n=>n==="true",stringify:ei},{identify:x_,default:!0,tag:"tag:yaml.org,2002:int",test:/^-?(?:0|[1-9][0-9]*)$/,resolve:(n,e,{intAsBigInt:t})=>t?BigInt(n):parseInt(n,10),stringify:({value:n})=>x_(n)?n.toString():JSON.stringify(n)},{identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,resolve:n=>parseFloat(n),stringify:ei}],gI={default:!0,tag:"",test:/^/,resolve(n,e){return e(`Unresolved plain scalar ${JSON.stringify(n)}`),n}},yI=[pI.map,_I.seq].concat(mI,gI);q_.schema=yI});var Va=p(F_=>{"use strict";var Qn=require("buffer"),Ha=ce(),EI=Gn(),TI={identify:n=>n instanceof Uint8Array,default:!1,tag:"tag:yaml.org,2002:binary",resolve(n,e){if(typeof Qn.Buffer=="function")return Qn.Buffer.from(n,"base64");if(typeof atob=="function"){let t=atob(n.replace(/[\n\r]/g,"")),r=new Uint8Array(t.length);for(let s=0;s<t.length;++s)r[s]=t.charCodeAt(s);return r}else return e("This environment does not support reading binary tags; either Buffer or atob is required"),n},stringify({comment:n,type:e,value:t},r,s,i){if(!t)return"";let o=t,a;if(typeof Qn.Buffer=="function")a=o instanceof Qn.Buffer?o.toString("base64"):Qn.Buffer.from(o.buffer).toString("base64");else if(typeof btoa=="function"){let l="";for(let c=0;c<o.length;++c)l+=String.fromCharCode(o[c]);a=btoa(l)}else throw new Error("This environment does not support writing binary tags; either Buffer or btoa is required");if(e??(e=Ha.Scalar.BLOCK_LITERAL),e!==Ha.Scalar.QUOTE_DOUBLE){let l=Math.max(r.options.lineWidth-r.indent.length,r.options.minContentWidth),c=Math.ceil(a.length/l),u=new Array(c);for(let f=0,h=0;f<c;++f,h+=l)u[f]=a.substr(h,l);a=u.join(e===Ha.Scalar.BLOCK_LITERAL?`
`:" ")}return EI.stringifyString({comment:n,type:e,value:a},r,s,i)}};F_.binary=TI});var ri=p(ni=>{"use strict";var ti=K(),Wa=Tt(),SI=ce(),AI=wt();function D_(n,e){if(ti.isSeq(n))for(let t=0;t<n.items.length;++t){let r=n.items[t];if(!ti.isPair(r)){if(ti.isMap(r)){r.items.length>1&&e("Each pair must have its own sequence indicator");let s=r.items[0]||new Wa.Pair(new SI.Scalar(null));if(r.commentBefore&&(s.key.commentBefore=s.key.commentBefore?`${r.commentBefore}
${s.key.commentBefore}`:r.commentBefore),r.comment){let i=s.value??s.key;i.comment=i.comment?`${r.comment}
${i.comment}`:r.comment}r=s}n.items[t]=ti.isPair(r)?r:new Wa.Pair(r)}}else e("Expected a sequence for this tag");return n}function j_(n,e,t){let{replacer:r}=t,s=new AI.YAMLSeq(n);s.tag="tag:yaml.org,2002:pairs";let i=0;if(e&&Symbol.iterator in Object(e))for(let o of e){typeof r=="function"&&(o=r.call(e,String(i++),o));let a,l;if(Array.isArray(o))if(o.length===2)a=o[0],l=o[1];else throw new TypeError(`Expected [key, value] tuple: ${o}`);else if(o&&o instanceof Object){let c=Object.keys(o);if(c.length===1)a=c[0],l=o[a];else throw new TypeError(`Expected tuple with one key, not ${c.length} keys`)}else a=o;s.items.push(Wa.createPair(a,l,t))}return s}var wI={collection:"seq",default:!1,tag:"tag:yaml.org,2002:pairs",resolve:D_,createNode:j_};ni.createPairs=j_;ni.pairs=wI;ni.resolvePairs=D_});var Ya=p(Ka=>{"use strict";var B_=K(),Ga=mt(),Zn=At(),LI=wt(),U_=ri(),$t=class n extends LI.YAMLSeq{constructor(){super(),this.add=Zn.YAMLMap.prototype.add.bind(this),this.delete=Zn.YAMLMap.prototype.delete.bind(this),this.get=Zn.YAMLMap.prototype.get.bind(this),this.has=Zn.YAMLMap.prototype.has.bind(this),this.set=Zn.YAMLMap.prototype.set.bind(this),this.tag=n.tag}toJSON(e,t){if(!t)return super.toJSON(e);let r=new Map;t?.onCreate&&t.onCreate(r);for(let s of this.items){let i,o;if(B_.isPair(s)?(i=Ga.toJS(s.key,"",t),o=Ga.toJS(s.value,i,t)):i=Ga.toJS(s,"",t),r.has(i))throw new Error("Ordered maps must not include duplicate keys");r.set(i,o)}return r}static from(e,t,r){let s=U_.createPairs(e,t,r),i=new this;return i.items=s.items,i}};$t.tag="tag:yaml.org,2002:omap";var II={collection:"seq",identify:n=>n instanceof Map,nodeClass:$t,default:!1,tag:"tag:yaml.org,2002:omap",resolve(n,e){let t=U_.resolvePairs(n,e),r=[];for(let{key:s}of t.items)B_.isScalar(s)&&(r.includes(s.value)?e(`Ordered maps must not include duplicate keys: ${s.value}`):r.push(s.value));return Object.assign(new $t,t)},createNode:(n,e,t)=>$t.from(n,e,t)};Ka.YAMLOMap=$t;Ka.omap=II});var K_=p(Ja=>{"use strict";var H_=ce();function V_({value:n,source:e},t){return e&&(n?W_:G_).test.test(e)?e:n?t.options.trueStr:t.options.falseStr}var W_={identify:n=>n===!0,default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,resolve:()=>new H_.Scalar(!0),stringify:V_},G_={identify:n=>n===!1,default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,resolve:()=>new H_.Scalar(!1),stringify:V_};Ja.falseTag=G_;Ja.trueTag=W_});var Y_=p(si=>{"use strict";var bI=ce(),Xa=sn(),vI={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,resolve:n=>n.slice(-3).toLowerCase()==="nan"?NaN:n[0]==="-"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,stringify:Xa.stringifyNumber},NI={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"EXP",test:/^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,resolve:n=>parseFloat(n.replace(/_/g,"")),stringify(n){let e=Number(n.value);return isFinite(e)?e.toExponential():Xa.stringifyNumber(n)}},OI={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,resolve(n){let e=new bI.Scalar(parseFloat(n.replace(/_/g,""))),t=n.indexOf(".");if(t!==-1){let r=n.substring(t+1).replace(/_/g,"");r[r.length-1]==="0"&&(e.minFractionDigits=r.length)}return e},stringify:Xa.stringifyNumber};si.float=OI;si.floatExp=NI;si.floatNaN=vI});var X_=p(tr=>{"use strict";var J_=sn(),er=n=>typeof n=="bigint"||Number.isInteger(n);function ii(n,e,t,{intAsBigInt:r}){let s=n[0];if((s==="-"||s==="+")&&(e+=1),n=n.substring(e).replace(/_/g,""),r){switch(t){case 2:n=`0b${n}`;break;case 8:n=`0o${n}`;break;case 16:n=`0x${n}`;break}let o=BigInt(n);return s==="-"?BigInt(-1)*o:o}let i=parseInt(n,t);return s==="-"?-1*i:i}function za(n,e,t){let{value:r}=n;if(er(r)){let s=r.toString(e);return r<0?"-"+t+s.substr(1):t+s}return J_.stringifyNumber(n)}var CI={identify:er,default:!0,tag:"tag:yaml.org,2002:int",format:"BIN",test:/^[-+]?0b[0-1_]+$/,resolve:(n,e,t)=>ii(n,2,2,t),stringify:n=>za(n,2,"0b")},RI={identify:er,default:!0,tag:"tag:yaml.org,2002:int",format:"OCT",test:/^[-+]?0[0-7_]+$/,resolve:(n,e,t)=>ii(n,1,8,t),stringify:n=>za(n,8,"0")},PI={identify:er,default:!0,tag:"tag:yaml.org,2002:int",test:/^[-+]?[0-9][0-9_]*$/,resolve:(n,e,t)=>ii(n,0,10,t),stringify:J_.stringifyNumber},kI={identify:er,default:!0,tag:"tag:yaml.org,2002:int",format:"HEX",test:/^[-+]?0x[0-9a-fA-F_]+$/,resolve:(n,e,t)=>ii(n,2,16,t),stringify:n=>za(n,16,"0x")};tr.int=PI;tr.intBin=CI;tr.intHex=kI;tr.intOct=RI});var Za=p(Qa=>{"use strict";var li=K(),oi=Tt(),ai=At(),xt=class n extends ai.YAMLMap{constructor(e){super(e),this.tag=n.tag}add(e){let t;li.isPair(e)?t=e:e&&typeof e=="object"&&"key"in e&&"value"in e&&e.value===null?t=new oi.Pair(e.key,null):t=new oi.Pair(e,null),ai.findPair(this.items,t.key)||this.items.push(t)}get(e,t){let r=ai.findPair(this.items,e);return!t&&li.isPair(r)?li.isScalar(r.key)?r.key.value:r.key:r}set(e,t){if(typeof t!="boolean")throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof t}`);let r=ai.findPair(this.items,e);r&&!t?this.items.splice(this.items.indexOf(r),1):!r&&t&&this.items.push(new oi.Pair(e))}toJSON(e,t){return super.toJSON(e,t,Set)}toString(e,t,r){if(!e)return JSON.stringify(this);if(this.hasAllNullValues(!0))return super.toString(Object.assign({},e,{allNullValues:!0}),t,r);throw new Error("Set items must all have null values")}static from(e,t,r){let{replacer:s}=r,i=new this(e);if(t&&Symbol.iterator in Object(t))for(let o of t)typeof s=="function"&&(o=s.call(t,o,o)),i.items.push(oi.createPair(o,null,r));return i}};xt.tag="tag:yaml.org,2002:set";var $I={collection:"map",identify:n=>n instanceof Set,nodeClass:xt,default:!1,tag:"tag:yaml.org,2002:set",createNode:(n,e,t)=>xt.from(n,e,t),resolve(n,e){if(li.isMap(n)){if(n.hasAllNullValues(!0))return Object.assign(new xt,n);e("Set items must all have null values")}else e("Expected a mapping for this tag");return n}};Qa.YAMLSet=xt;Qa.set=$I});var tl=p(ci=>{"use strict";var xI=sn();function el(n,e){let t=n[0],r=t==="-"||t==="+"?n.substring(1):n,s=o=>e?BigInt(o):Number(o),i=r.replace(/_/g,"").split(":").reduce((o,a)=>o*s(60)+s(a),s(0));return t==="-"?s(-1)*i:i}function z_(n){let{value:e}=n,t=o=>o;if(typeof e=="bigint")t=o=>BigInt(o);else if(isNaN(e)||!isFinite(e))return xI.stringifyNumber(n);let r="";e<0&&(r="-",e*=t(-1));let s=t(60),i=[e%s];return e<60?i.unshift(0):(e=(e-i[0])/s,i.unshift(e%s),e>=60&&(e=(e-i[0])/s,i.unshift(e))),r+i.map(o=>String(o).padStart(2,"0")).join(":").replace(/000000\d*$/,"")}var qI={identify:n=>typeof n=="bigint"||Number.isInteger(n),default:!0,tag:"tag:yaml.org,2002:int",format:"TIME",test:/^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,resolve:(n,e,{intAsBigInt:t})=>el(n,t),stringify:z_},MI={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"TIME",test:/^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,resolve:n=>el(n,!1),stringify:z_},Q_={identify:n=>n instanceof Date,default:!0,tag:"tag:yaml.org,2002:timestamp",test:RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$"),resolve(n){let e=n.match(Q_.test);if(!e)throw new Error("!!timestamp expects a date, starting with yyyy-mm-dd");let[,t,r,s,i,o,a]=e.map(Number),l=e[7]?Number((e[7]+"00").substr(1,3)):0,c=Date.UTC(t,r-1,s,i||0,o||0,a||0,l),u=e[8];if(u&&u!=="Z"){let f=el(u,!1);Math.abs(f)<30&&(f*=60),c-=6e4*f}return new Date(c)},stringify:({value:n})=>n?.toISOString().replace(/(T00:00:00)?\.000Z$/,"")??""};ci.floatTime=MI;ci.intTime=qI;ci.timestamp=Q_});var tm=p(em=>{"use strict";var FI=nn(),DI=Xs(),jI=rn(),BI=zn(),UI=Va(),Z_=K_(),nl=Y_(),ui=X_(),HI=Us(),VI=Ya(),WI=ri(),GI=Za(),rl=tl(),KI=[FI.map,jI.seq,BI.string,DI.nullTag,Z_.trueTag,Z_.falseTag,ui.intBin,ui.intOct,ui.int,ui.intHex,nl.floatNaN,nl.floatExp,nl.float,UI.binary,HI.merge,VI.omap,WI.pairs,GI.set,rl.intTime,rl.floatTime,rl.timestamp];em.schema=KI});var fm=p(ol=>{"use strict";var im=nn(),YI=Xs(),om=rn(),JI=zn(),XI=qa(),sl=Fa(),il=ja(),zI=$_(),QI=M_(),am=Va(),nr=Us(),lm=Ya(),cm=ri(),nm=tm(),um=Za(),fi=tl(),rm=new Map([["core",zI.schema],["failsafe",[im.map,om.seq,JI.string]],["json",QI.schema],["yaml11",nm.schema],["yaml-1.1",nm.schema]]),sm={binary:am.binary,bool:XI.boolTag,float:sl.float,floatExp:sl.floatExp,floatNaN:sl.floatNaN,floatTime:fi.floatTime,int:il.int,intHex:il.intHex,intOct:il.intOct,intTime:fi.intTime,map:im.map,merge:nr.merge,null:YI.nullTag,omap:lm.omap,pairs:cm.pairs,seq:om.seq,set:um.set,timestamp:fi.timestamp},ZI={"tag:yaml.org,2002:binary":am.binary,"tag:yaml.org,2002:merge":nr.merge,"tag:yaml.org,2002:omap":lm.omap,"tag:yaml.org,2002:pairs":cm.pairs,"tag:yaml.org,2002:set":um.set,"tag:yaml.org,2002:timestamp":fi.timestamp};function eb(n,e,t){let r=rm.get(e);if(r&&!n)return t&&!r.includes(nr.merge)?r.concat(nr.merge):r.slice();let s=r;if(!s)if(Array.isArray(n))s=[];else{let i=Array.from(rm.keys()).filter(o=>o!=="yaml11").map(o=>JSON.stringify(o)).join(", ");throw new Error(`Unknown schema "${e}"; use one of ${i} or define customTags array`)}if(Array.isArray(n))for(let i of n)s=s.concat(i);else typeof n=="function"&&(s=n(s.slice()));return t&&(s=s.concat(nr.merge)),s.reduce((i,o)=>{let a=typeof o=="string"?sm[o]:o;if(!a){let l=JSON.stringify(o),c=Object.keys(sm).map(u=>JSON.stringify(u)).join(", ");throw new Error(`Unknown custom tag ${l}; use one of ${c}`)}return i.includes(a)||i.push(a),i},[])}ol.coreKnownTags=ZI;ol.getTags=eb});var cl=p(hm=>{"use strict";var al=K(),tb=nn(),nb=rn(),rb=zn(),hi=fm(),sb=(n,e)=>n.key<e.key?-1:n.key>e.key?1:0,ll=class n{constructor({compat:e,customTags:t,merge:r,resolveKnownTags:s,schema:i,sortMapEntries:o,toStringDefaults:a}){this.compat=Array.isArray(e)?hi.getTags(e,"compat"):e?hi.getTags(null,e):null,this.name=typeof i=="string"&&i||"core",this.knownTags=s?hi.coreKnownTags:{},this.tags=hi.getTags(t,this.name,r),this.toStringOptions=a??null,Object.defineProperty(this,al.MAP,{value:tb.map}),Object.defineProperty(this,al.SCALAR,{value:rb.string}),Object.defineProperty(this,al.SEQ,{value:nb.seq}),this.sortMapEntries=typeof o=="function"?o:o===!0?sb:null}clone(){let e=Object.create(n.prototype,Object.getOwnPropertyDescriptors(this));return e.tags=this.tags.slice(),e}};hm.Schema=ll});var pm=p(dm=>{"use strict";var ib=K(),ul=Kn(),rr=Hn();function ob(n,e){let t=[],r=e.directives===!0;if(e.directives!==!1&&n.directives){let l=n.directives.toString(n);l?(t.push(l),r=!0):n.directives.docStart&&(r=!0)}r&&t.push("---");let s=ul.createStringifyContext(n,e),{commentString:i}=s.options;if(n.commentBefore){t.length!==1&&t.unshift("");let l=i(n.commentBefore);t.unshift(rr.indentComment(l,""))}let o=!1,a=null;if(n.contents){if(ib.isNode(n.contents)){if(n.contents.spaceBefore&&r&&t.push(""),n.contents.commentBefore){let u=i(n.contents.commentBefore);t.push(rr.indentComment(u,""))}s.forceBlockIndent=!!n.comment,a=n.contents.comment}let l=a?void 0:()=>o=!0,c=ul.stringify(n.contents,s,()=>a=null,l);a&&(c+=rr.lineComment(c,"",i(a))),(c[0]==="|"||c[0]===">")&&t[t.length-1]==="---"?t[t.length-1]=`--- ${c}`:t.push(c)}else t.push(ul.stringify(n.contents,s));if(n.directives?.docEnd)if(n.comment){let l=i(n.comment);l.includes(`
`)?(t.push("..."),t.push(rr.indentComment(l,""))):t.push(`... ${l}`)}else t.push("...");else{let l=n.comment;l&&o&&(l=l.replace(/^\n+/,"")),l&&((!o||a)&&t[t.length-1]!==""&&t.push(""),t.push(rr.indentComment(i(l),"")))}return t.join(`
`)+`
`}dm.stringifyDocument=ob});var sr=p(_m=>{"use strict";var ab=Bn(),on=ks(),Fe=K(),lb=Tt(),cb=mt(),ub=cl(),fb=pm(),fl=Os(),hb=_a(),db=Un(),hl=pa(),dl=class n{constructor(e,t,r){this.commentBefore=null,this.comment=null,this.errors=[],this.warnings=[],Object.defineProperty(this,Fe.NODE_TYPE,{value:Fe.DOC});let s=null;typeof t=="function"||Array.isArray(t)?s=t:r===void 0&&t&&(r=t,t=void 0);let i=Object.assign({intAsBigInt:!1,keepSourceTokens:!1,logLevel:"warn",prettyErrors:!0,strict:!0,stringKeys:!1,uniqueKeys:!0,version:"1.2"},r);this.options=i;let{version:o}=i;r?._directives?(this.directives=r._directives.atDocument(),this.directives.yaml.explicit&&(o=this.directives.yaml.version)):this.directives=new hl.Directives({version:o}),this.setSchema(o,r),this.contents=e===void 0?null:this.createNode(e,s,r)}clone(){let e=Object.create(n.prototype,{[Fe.NODE_TYPE]:{value:Fe.DOC}});return e.commentBefore=this.commentBefore,e.comment=this.comment,e.errors=this.errors.slice(),e.warnings=this.warnings.slice(),e.options=Object.assign({},this.options),this.directives&&(e.directives=this.directives.clone()),e.schema=this.schema.clone(),e.contents=Fe.isNode(this.contents)?this.contents.clone(e.schema):this.contents,this.range&&(e.range=this.range.slice()),e}add(e){an(this.contents)&&this.contents.add(e)}addIn(e,t){an(this.contents)&&this.contents.addIn(e,t)}createAlias(e,t){if(!e.anchor){let r=fl.anchorNames(this);e.anchor=!t||r.has(t)?fl.findNewAnchor(t||"a",r):t}return new ab.Alias(e.anchor)}createNode(e,t,r){let s;if(typeof t=="function")e=t.call({"":e},"",e),s=t;else if(Array.isArray(t)){let _=w=>typeof w=="number"||w instanceof String||w instanceof Number,S=t.filter(_).map(String);S.length>0&&(t=t.concat(S)),s=t}else r===void 0&&t&&(r=t,t=void 0);let{aliasDuplicateObjects:i,anchorPrefix:o,flow:a,keepUndefined:l,onTagObj:c,tag:u}=r??{},{onAnchor:f,setAnchors:h,sourceObjects:d}=fl.createNodeAnchors(this,o||"a"),y={aliasDuplicateObjects:i??!0,keepUndefined:l??!1,onAnchor:f,onTagObj:c,replacer:s,schema:this.schema,sourceObjects:d},m=db.createNode(e,u,y);return a&&Fe.isCollection(m)&&(m.flow=!0),h(),m}createPair(e,t,r={}){let s=this.createNode(e,null,r),i=this.createNode(t,null,r);return new lb.Pair(s,i)}delete(e){return an(this.contents)?this.contents.delete(e):!1}deleteIn(e){return on.isEmptyPath(e)?this.contents==null?!1:(this.contents=null,!0):an(this.contents)?this.contents.deleteIn(e):!1}get(e,t){return Fe.isCollection(this.contents)?this.contents.get(e,t):void 0}getIn(e,t){return on.isEmptyPath(e)?!t&&Fe.isScalar(this.contents)?this.contents.value:this.contents:Fe.isCollection(this.contents)?this.contents.getIn(e,t):void 0}has(e){return Fe.isCollection(this.contents)?this.contents.has(e):!1}hasIn(e){return on.isEmptyPath(e)?this.contents!==void 0:Fe.isCollection(this.contents)?this.contents.hasIn(e):!1}set(e,t){this.contents==null?this.contents=on.collectionFromPath(this.schema,[e],t):an(this.contents)&&this.contents.set(e,t)}setIn(e,t){on.isEmptyPath(e)?this.contents=t:this.contents==null?this.contents=on.collectionFromPath(this.schema,Array.from(e),t):an(this.contents)&&this.contents.setIn(e,t)}setSchema(e,t={}){typeof e=="number"&&(e=String(e));let r;switch(e){case"1.1":this.directives?this.directives.yaml.version="1.1":this.directives=new hl.Directives({version:"1.1"}),r={resolveKnownTags:!1,schema:"yaml-1.1"};break;case"1.2":case"next":this.directives?this.directives.yaml.version=e:this.directives=new hl.Directives({version:e}),r={resolveKnownTags:!0,schema:"core"};break;case null:this.directives&&delete this.directives,r=null;break;default:{let s=JSON.stringify(e);throw new Error(`Expected '1.1', '1.2' or null as first argument, but found: ${s}`)}}if(t.schema instanceof Object)this.schema=t.schema;else if(r)this.schema=new ub.Schema(Object.assign(r,t));else throw new Error("With a null YAML version, the { schema: Schema } option is required")}toJS({json:e,jsonArg:t,mapAsMap:r,maxAliasCount:s,onAnchor:i,reviver:o}={}){let a={anchors:new Map,doc:this,keep:!e,mapAsMap:r===!0,mapKeyWarned:!1,maxAliasCount:typeof s=="number"?s:100},l=cb.toJS(this.contents,t??"",a);if(typeof i=="function")for(let{count:c,res:u}of a.anchors.values())i(u,c);return typeof o=="function"?hb.applyReviver(o,{"":l},"",l):l}toJSON(e,t){return this.toJS({json:!0,jsonArg:e,mapAsMap:!1,onAnchor:t})}toString(e={}){if(this.errors.length>0)throw new Error("Document with errors cannot be stringified");if("indent"in e&&(!Number.isInteger(e.indent)||Number(e.indent)<=0)){let t=JSON.stringify(e.indent);throw new Error(`"indent" option must be a positive integer, not ${t}`)}return fb.stringifyDocument(this,e)}};function an(n){if(Fe.isCollection(n))return!0;throw new Error("Expected a YAML collection as document contents")}_m.Document=dl});var ar=p(or=>{"use strict";var ir=class extends Error{constructor(e,t,r,s){super(),this.name=e,this.code=r,this.message=s,this.pos=t}},pl=class extends ir{constructor(e,t,r){super("YAMLParseError",e,t,r)}},_l=class extends ir{constructor(e,t,r){super("YAMLWarning",e,t,r)}},pb=(n,e)=>t=>{if(t.pos[0]===-1)return;t.linePos=t.pos.map(a=>e.linePos(a));let{line:r,col:s}=t.linePos[0];t.message+=` at line ${r}, column ${s}`;let i=s-1,o=n.substring(e.lineStarts[r-1],e.lineStarts[r]).replace(/[\n\r]+$/,"");if(i>=60&&o.length>80){let a=Math.min(i-39,o.length-79);o="\u2026"+o.substring(a),i-=a-1}if(o.length>80&&(o=o.substring(0,79)+"\u2026"),r>1&&/^ *$/.test(o.substring(0,i))){let a=n.substring(e.lineStarts[r-2],e.lineStarts[r-1]);a.length>80&&(a=a.substring(0,79)+`\u2026
`),o=a+o}if(/[^ ]/.test(o)){let a=1,l=t.linePos[1];l?.line===r&&l.col>s&&(a=Math.max(1,Math.min(l.col-s,80-i)));let c=" ".repeat(i)+"^".repeat(a);t.message+=`:

${o}
${c}
`}};or.YAMLError=ir;or.YAMLParseError=pl;or.YAMLWarning=_l;or.prettifyError=pb});var lr=p(mm=>{"use strict";function _b(n,{flow:e,indicator:t,next:r,offset:s,onError:i,parentIndent:o,startOnNewline:a}){let l=!1,c=a,u=a,f="",h="",d=!1,y=!1,m=null,_=null,S=null,w=null,I=null,x=null,q=null;for(let R of n)switch(y&&(R.type!=="space"&&R.type!=="newline"&&R.type!=="comma"&&i(R.offset,"MISSING_CHAR","Tags and anchors must be separated from the next token by white space"),y=!1),m&&(c&&R.type!=="comment"&&R.type!=="newline"&&i(m,"TAB_AS_INDENT","Tabs are not allowed as indentation"),m=null),R.type){case"space":!e&&(t!=="doc-start"||r?.type!=="flow-collection")&&R.source.includes("	")&&(m=R),u=!0;break;case"comment":{u||i(R,"MISSING_CHAR","Comments must be separated from other tokens by white space characters");let C=R.source.substring(1)||" ";f?f+=h+C:f=C,h="",c=!1;break}case"newline":c?f?f+=R.source:(!x||t!=="seq-item-ind")&&(l=!0):h+=R.source,c=!0,d=!0,(_||S)&&(w=R),u=!0;break;case"anchor":_&&i(R,"MULTIPLE_ANCHORS","A node can have at most one anchor"),R.source.endsWith(":")&&i(R.offset+R.source.length-1,"BAD_ALIAS","Anchor ending in : is ambiguous",!0),_=R,q??(q=R.offset),c=!1,u=!1,y=!0;break;case"tag":{S&&i(R,"MULTIPLE_TAGS","A node can have at most one tag"),S=R,q??(q=R.offset),c=!1,u=!1,y=!0;break}case t:(_||S)&&i(R,"BAD_PROP_ORDER",`Anchors and tags must be after the ${R.source} indicator`),x&&i(R,"UNEXPECTED_TOKEN",`Unexpected ${R.source} in ${e??"collection"}`),x=R,c=t==="seq-item-ind"||t==="explicit-key-ind",u=!1;break;case"comma":if(e){I&&i(R,"UNEXPECTED_TOKEN",`Unexpected , in ${e}`),I=R,c=!1,u=!1;break}default:i(R,"UNEXPECTED_TOKEN",`Unexpected ${R.type} token`),c=!1,u=!1}let M=n[n.length-1],Y=M?M.offset+M.source.length:s;return y&&r&&r.type!=="space"&&r.type!=="newline"&&r.type!=="comma"&&(r.type!=="scalar"||r.source!=="")&&i(r.offset,"MISSING_CHAR","Tags and anchors must be separated from the next token by white space"),m&&(c&&m.indent<=o||r?.type==="block-map"||r?.type==="block-seq")&&i(m,"TAB_AS_INDENT","Tabs are not allowed as indentation"),{comma:I,found:x,spaceBefore:l,comment:f,hasNewline:d,anchor:_,tag:S,newlineAfterProp:w,end:Y,start:q??Y}}mm.resolveProps=_b});var di=p(gm=>{"use strict";function ml(n){if(!n)return null;switch(n.type){case"alias":case"scalar":case"double-quoted-scalar":case"single-quoted-scalar":if(n.source.includes(`
`))return!0;if(n.end){for(let e of n.end)if(e.type==="newline")return!0}return!1;case"flow-collection":for(let e of n.items){for(let t of e.start)if(t.type==="newline")return!0;if(e.sep){for(let t of e.sep)if(t.type==="newline")return!0}if(ml(e.key)||ml(e.value))return!0}return!1;default:return!0}}gm.containsNewline=ml});var gl=p(ym=>{"use strict";var mb=di();function gb(n,e,t){if(e?.type==="flow-collection"){let r=e.end[0];r.indent===n&&(r.source==="]"||r.source==="}")&&mb.containsNewline(e)&&t(r,"BAD_INDENT","Flow end indicator should be more indented than parent",!0)}}ym.flowIndentCheck=gb});var yl=p(Tm=>{"use strict";var Em=K();function yb(n,e,t){let{uniqueKeys:r}=n.options;if(r===!1)return!1;let s=typeof r=="function"?r:(i,o)=>i===o||Em.isScalar(i)&&Em.isScalar(o)&&i.value===o.value;return e.some(i=>s(i.key,t))}Tm.mapIncludes=yb});var bm=p(Im=>{"use strict";var Sm=Tt(),Eb=At(),Am=lr(),Tb=di(),wm=gl(),Sb=yl(),Lm="All mapping items must start at the same column";function Ab({composeNode:n,composeEmptyNode:e},t,r,s,i){let o=i?.nodeClass??Eb.YAMLMap,a=new o(t.schema);t.atRoot&&(t.atRoot=!1);let l=r.offset,c=null;for(let u of r.items){let{start:f,key:h,sep:d,value:y}=u,m=Am.resolveProps(f,{indicator:"explicit-key-ind",next:h??d?.[0],offset:l,onError:s,parentIndent:r.indent,startOnNewline:!0}),_=!m.found;if(_){if(h&&(h.type==="block-seq"?s(l,"BLOCK_AS_IMPLICIT_KEY","A block sequence may not be used as an implicit map key"):"indent"in h&&h.indent!==r.indent&&s(l,"BAD_INDENT",Lm)),!m.anchor&&!m.tag&&!d){c=m.end,m.comment&&(a.comment?a.comment+=`
`+m.comment:a.comment=m.comment);continue}(m.newlineAfterProp||Tb.containsNewline(h))&&s(h??f[f.length-1],"MULTILINE_IMPLICIT_KEY","Implicit keys need to be on a single line")}else m.found?.indent!==r.indent&&s(l,"BAD_INDENT",Lm);t.atKey=!0;let S=m.end,w=h?n(t,h,m,s):e(t,S,f,null,m,s);t.schema.compat&&wm.flowIndentCheck(r.indent,h,s),t.atKey=!1,Sb.mapIncludes(t,a.items,w)&&s(S,"DUPLICATE_KEY","Map keys must be unique");let I=Am.resolveProps(d??[],{indicator:"map-value-ind",next:y,offset:w.range[2],onError:s,parentIndent:r.indent,startOnNewline:!h||h.type==="block-scalar"});if(l=I.end,I.found){_&&(y?.type==="block-map"&&!I.hasNewline&&s(l,"BLOCK_AS_IMPLICIT_KEY","Nested mappings are not allowed in compact mappings"),t.options.strict&&m.start<I.found.offset-1024&&s(w.range,"KEY_OVER_1024_CHARS","The : indicator must be at most 1024 chars after the start of an implicit block mapping key"));let x=y?n(t,y,I,s):e(t,l,d,null,I,s);t.schema.compat&&wm.flowIndentCheck(r.indent,y,s),l=x.range[2];let q=new Sm.Pair(w,x);t.options.keepSourceTokens&&(q.srcToken=u),a.items.push(q)}else{_&&s(w.range,"MISSING_CHAR","Implicit map keys need to be followed by map values"),I.comment&&(w.comment?w.comment+=`
`+I.comment:w.comment=I.comment);let x=new Sm.Pair(w);t.options.keepSourceTokens&&(x.srcToken=u),a.items.push(x)}}return c&&c<l&&s(c,"IMPOSSIBLE","Map comment with trailing content"),a.range=[r.offset,l,c??l],a}Im.resolveBlockMap=Ab});var Nm=p(vm=>{"use strict";var wb=wt(),Lb=lr(),Ib=gl();function bb({composeNode:n,composeEmptyNode:e},t,r,s,i){let o=i?.nodeClass??wb.YAMLSeq,a=new o(t.schema);t.atRoot&&(t.atRoot=!1),t.atKey&&(t.atKey=!1);let l=r.offset,c=null;for(let{start:u,value:f}of r.items){let h=Lb.resolveProps(u,{indicator:"seq-item-ind",next:f,offset:l,onError:s,parentIndent:r.indent,startOnNewline:!0});if(!h.found)if(h.anchor||h.tag||f)f?.type==="block-seq"?s(h.end,"BAD_INDENT","All sequence items must start at the same column"):s(l,"MISSING_CHAR","Sequence item without - indicator");else{c=h.end,h.comment&&(a.comment=h.comment);continue}let d=f?n(t,f,h,s):e(t,h.end,u,null,h,s);t.schema.compat&&Ib.flowIndentCheck(r.indent,f,s),l=d.range[2],a.items.push(d)}return a.range=[r.offset,l,c??l],a}vm.resolveBlockSeq=bb});var ln=p(Om=>{"use strict";function vb(n,e,t,r){let s="";if(n){let i=!1,o="";for(let a of n){let{source:l,type:c}=a;switch(c){case"space":i=!0;break;case"comment":{t&&!i&&r(a,"MISSING_CHAR","Comments must be separated from other tokens by white space characters");let u=l.substring(1)||" ";s?s+=o+u:s=u,o="";break}case"newline":s&&(o+=l),i=!0;break;default:r(a,"UNEXPECTED_TOKEN",`Unexpected ${c} at node end`)}e+=l.length}}return{comment:s,offset:e}}Om.resolveEnd=vb});var km=p(Pm=>{"use strict";var Nb=K(),Ob=Tt(),Cm=At(),Cb=wt(),Rb=ln(),Rm=lr(),Pb=di(),kb=yl(),El="Block collections are not allowed within flow collections",Tl=n=>n&&(n.type==="block-map"||n.type==="block-seq");function $b({composeNode:n,composeEmptyNode:e},t,r,s,i){let o=r.start.source==="{",a=o?"flow map":"flow sequence",l=i?.nodeClass??(o?Cm.YAMLMap:Cb.YAMLSeq),c=new l(t.schema);c.flow=!0;let u=t.atRoot;u&&(t.atRoot=!1),t.atKey&&(t.atKey=!1);let f=r.offset+r.start.source.length;for(let _=0;_<r.items.length;++_){let S=r.items[_],{start:w,key:I,sep:x,value:q}=S,M=Rm.resolveProps(w,{flow:a,indicator:"explicit-key-ind",next:I??x?.[0],offset:f,onError:s,parentIndent:r.indent,startOnNewline:!1});if(!M.found){if(!M.anchor&&!M.tag&&!x&&!q){_===0&&M.comma?s(M.comma,"UNEXPECTED_TOKEN",`Unexpected , in ${a}`):_<r.items.length-1&&s(M.start,"UNEXPECTED_TOKEN",`Unexpected empty item in ${a}`),M.comment&&(c.comment?c.comment+=`
`+M.comment:c.comment=M.comment),f=M.end;continue}!o&&t.options.strict&&Pb.containsNewline(I)&&s(I,"MULTILINE_IMPLICIT_KEY","Implicit keys of flow sequence pairs need to be on a single line")}if(_===0)M.comma&&s(M.comma,"UNEXPECTED_TOKEN",`Unexpected , in ${a}`);else if(M.comma||s(M.start,"MISSING_CHAR",`Missing , between ${a} items`),M.comment){let Y="";e:for(let R of w)switch(R.type){case"comma":case"space":break;case"comment":Y=R.source.substring(1);break e;default:break e}if(Y){let R=c.items[c.items.length-1];Nb.isPair(R)&&(R=R.value??R.key),R.comment?R.comment+=`
`+Y:R.comment=Y,M.comment=M.comment.substring(Y.length+1)}}if(!o&&!x&&!M.found){let Y=q?n(t,q,M,s):e(t,M.end,x,null,M,s);c.items.push(Y),f=Y.range[2],Tl(q)&&s(Y.range,"BLOCK_IN_FLOW",El)}else{t.atKey=!0;let Y=M.end,R=I?n(t,I,M,s):e(t,Y,w,null,M,s);Tl(I)&&s(R.range,"BLOCK_IN_FLOW",El),t.atKey=!1;let C=Rm.resolveProps(x??[],{flow:a,indicator:"map-value-ind",next:q,offset:R.range[2],onError:s,parentIndent:r.indent,startOnNewline:!1});if(C.found){if(!o&&!M.found&&t.options.strict){if(x)for(let D of x){if(D===C.found)break;if(D.type==="newline"){s(D,"MULTILINE_IMPLICIT_KEY","Implicit keys of flow sequence pairs need to be on a single line");break}}M.start<C.found.offset-1024&&s(C.found,"KEY_OVER_1024_CHARS","The : indicator must be at most 1024 chars after the start of an implicit flow sequence key")}}else q&&("source"in q&&q.source?.[0]===":"?s(q,"MISSING_CHAR",`Missing space after : in ${a}`):s(C.start,"MISSING_CHAR",`Missing , or : between ${a} items`));let B=q?n(t,q,C,s):C.found?e(t,C.end,x,null,C,s):null;B?Tl(q)&&s(B.range,"BLOCK_IN_FLOW",El):C.comment&&(R.comment?R.comment+=`
`+C.comment:R.comment=C.comment);let j=new Ob.Pair(R,B);if(t.options.keepSourceTokens&&(j.srcToken=S),o){let D=c;kb.mapIncludes(t,D.items,R)&&s(Y,"DUPLICATE_KEY","Map keys must be unique"),D.items.push(j)}else{let D=new Cm.YAMLMap(t.schema);D.flow=!0,D.items.push(j);let X=(B??R).range;D.range=[R.range[0],X[1],X[2]],c.items.push(D)}f=B?B.range[2]:C.end}}let h=o?"}":"]",[d,...y]=r.end,m=f;if(d?.source===h)m=d.offset+d.source.length;else{let _=a[0].toUpperCase()+a.substring(1),S=u?`${_} must end with a ${h}`:`${_} in block collection must be sufficiently indented and end with a ${h}`;s(f,u?"MISSING_CHAR":"BAD_INDENT",S),d&&d.source.length!==1&&y.unshift(d)}if(y.length>0){let _=Rb.resolveEnd(y,m,t.options.strict,s);_.comment&&(c.comment?c.comment+=`
`+_.comment:c.comment=_.comment),c.range=[r.offset,m,_.offset]}else c.range=[r.offset,m,m];return c}Pm.resolveFlowCollection=$b});var xm=p($m=>{"use strict";var xb=K(),qb=ce(),Mb=At(),Fb=wt(),Db=bm(),jb=Nm(),Bb=km();function Sl(n,e,t,r,s,i){let o=t.type==="block-map"?Db.resolveBlockMap(n,e,t,r,i):t.type==="block-seq"?jb.resolveBlockSeq(n,e,t,r,i):Bb.resolveFlowCollection(n,e,t,r,i),a=o.constructor;return s==="!"||s===a.tagName?(o.tag=a.tagName,o):(s&&(o.tag=s),o)}function Ub(n,e,t,r,s){let i=r.tag,o=i?e.directives.tagName(i.source,h=>s(i,"TAG_RESOLVE_FAILED",h)):null;if(t.type==="block-seq"){let{anchor:h,newlineAfterProp:d}=r,y=h&&i?h.offset>i.offset?h:i:h??i;y&&(!d||d.offset<y.offset)&&s(y,"MISSING_CHAR","Missing newline after block sequence props")}let a=t.type==="block-map"?"map":t.type==="block-seq"?"seq":t.start.source==="{"?"map":"seq";if(!i||!o||o==="!"||o===Mb.YAMLMap.tagName&&a==="map"||o===Fb.YAMLSeq.tagName&&a==="seq")return Sl(n,e,t,s,o);let l=e.schema.tags.find(h=>h.tag===o&&h.collection===a);if(!l){let h=e.schema.knownTags[o];if(h?.collection===a)e.schema.tags.push(Object.assign({},h,{default:!1})),l=h;else return h?s(i,"BAD_COLLECTION_TYPE",`${h.tag} used for ${a} collection, but expects ${h.collection??"scalar"}`,!0):s(i,"TAG_RESOLVE_FAILED",`Unresolved tag: ${o}`,!0),Sl(n,e,t,s,o)}let c=Sl(n,e,t,s,o,l),u=l.resolve?.(c,h=>s(i,"TAG_RESOLVE_FAILED",h),e.options)??c,f=xb.isNode(u)?u:new qb.Scalar(u);return f.range=c.range,f.tag=o,l?.format&&(f.format=l.format),f}$m.composeCollection=Ub});var wl=p(qm=>{"use strict";var Al=ce();function Hb(n,e,t){let r=e.offset,s=Vb(e,n.options.strict,t);if(!s)return{value:"",type:null,comment:"",range:[r,r,r]};let i=s.mode===">"?Al.Scalar.BLOCK_FOLDED:Al.Scalar.BLOCK_LITERAL,o=e.source?Wb(e.source):[],a=o.length;for(let m=o.length-1;m>=0;--m){let _=o[m][1];if(_===""||_==="\r")a=m;else break}if(a===0){let m=s.chomp==="+"&&o.length>0?`
`.repeat(Math.max(1,o.length-1)):"",_=r+s.length;return e.source&&(_+=e.source.length),{value:m,type:i,comment:s.comment,range:[r,_,_]}}let l=e.indent+s.indent,c=e.offset+s.length,u=0;for(let m=0;m<a;++m){let[_,S]=o[m];if(S===""||S==="\r")s.indent===0&&_.length>l&&(l=_.length);else{_.length<l&&t(c+_.length,"MISSING_CHAR","Block scalars with more-indented leading empty lines must use an explicit indentation indicator"),s.indent===0&&(l=_.length),u=m,l===0&&!n.atRoot&&t(c,"BAD_INDENT","Block scalar values in collections must be indented");break}c+=_.length+S.length+1}for(let m=o.length-1;m>=a;--m)o[m][0].length>l&&(a=m+1);let f="",h="",d=!1;for(let m=0;m<u;++m)f+=o[m][0].slice(l)+`
`;for(let m=u;m<a;++m){let[_,S]=o[m];c+=_.length+S.length+1;let w=S[S.length-1]==="\r";if(w&&(S=S.slice(0,-1)),S&&_.length<l){let x=`Block scalar lines must not be less indented than their ${s.indent?"explicit indentation indicator":"first line"}`;t(c-S.length-(w?2:1),"BAD_INDENT",x),_=""}i===Al.Scalar.BLOCK_LITERAL?(f+=h+_.slice(l)+S,h=`
`):_.length>l||S[0]==="	"?(h===" "?h=`
`:!d&&h===`
`&&(h=`

`),f+=h+_.slice(l)+S,h=`
`,d=!0):S===""?h===`
`?f+=`
`:h=`
`:(f+=h+S,h=" ",d=!1)}switch(s.chomp){case"-":break;case"+":for(let m=a;m<o.length;++m)f+=`
`+o[m][0].slice(l);f[f.length-1]!==`
`&&(f+=`
`);break;default:f+=`
`}let y=r+s.length+e.source.length;return{value:f,type:i,comment:s.comment,range:[r,y,y]}}function Vb({offset:n,props:e},t,r){if(e[0].type!=="block-scalar-header")return r(e[0],"IMPOSSIBLE","Block scalar header not found"),null;let{source:s}=e[0],i=s[0],o=0,a="",l=-1;for(let h=1;h<s.length;++h){let d=s[h];if(!a&&(d==="-"||d==="+"))a=d;else{let y=Number(d);!o&&y?o=y:l===-1&&(l=n+h)}}l!==-1&&r(l,"UNEXPECTED_TOKEN",`Block scalar header includes extra characters: ${s}`);let c=!1,u="",f=s.length;for(let h=1;h<e.length;++h){let d=e[h];switch(d.type){case"space":c=!0;case"newline":f+=d.source.length;break;case"comment":t&&!c&&r(d,"MISSING_CHAR","Comments must be separated from other tokens by white space characters"),f+=d.source.length,u=d.source.substring(1);break;case"error":r(d,"UNEXPECTED_TOKEN",d.message),f+=d.source.length;break;default:{let y=`Unexpected token in block scalar header: ${d.type}`;r(d,"UNEXPECTED_TOKEN",y);let m=d.source;m&&typeof m=="string"&&(f+=m.length)}}}return{mode:i,indent:o,chomp:a,comment:u,length:f}}function Wb(n){let e=n.split(/\n( *)/),t=e[0],r=t.match(/^( *)/),i=[r?.[1]?[r[1],t.slice(r[1].length)]:["",t]];for(let o=1;o<e.length;o+=2)i.push([e[o],e[o+1]]);return i}qm.resolveBlockScalar=Hb});var Il=p(Fm=>{"use strict";var Ll=ce(),Gb=ln();function Kb(n,e,t){let{offset:r,type:s,source:i,end:o}=n,a,l,c=(h,d,y)=>t(r+h,d,y);switch(s){case"scalar":a=Ll.Scalar.PLAIN,l=Yb(i,c);break;case"single-quoted-scalar":a=Ll.Scalar.QUOTE_SINGLE,l=Jb(i,c);break;case"double-quoted-scalar":a=Ll.Scalar.QUOTE_DOUBLE,l=Xb(i,c);break;default:return t(n,"UNEXPECTED_TOKEN",`Expected a flow scalar value, but found: ${s}`),{value:"",type:null,comment:"",range:[r,r+i.length,r+i.length]}}let u=r+i.length,f=Gb.resolveEnd(o,u,e,t);return{value:l,type:a,comment:f.comment,range:[r,u,f.offset]}}function Yb(n,e){let t="";switch(n[0]){case"	":t="a tab character";break;case",":t="flow indicator character ,";break;case"%":t="directive indicator character %";break;case"|":case">":{t=`block scalar indicator ${n[0]}`;break}case"@":case"`":{t=`reserved character ${n[0]}`;break}}return t&&e(0,"BAD_SCALAR_START",`Plain value cannot start with ${t}`),Mm(n)}function Jb(n,e){return(n[n.length-1]!=="'"||n.length===1)&&e(n.length,"MISSING_CHAR","Missing closing 'quote"),Mm(n.slice(1,-1)).replace(/''/g,"'")}function Mm(n){let e,t;try{e=new RegExp(`(.*?)(?<![ 	])[ 	]*\r?
`,"sy"),t=new RegExp(`[ 	]*(.*?)(?:(?<![ 	])[ 	]*)?\r?
`,"sy")}catch{e=/(.*?)[ \t]*\r?\n/sy,t=/[ \t]*(.*?)[ \t]*\r?\n/sy}let r=e.exec(n);if(!r)return n;let s=r[1],i=" ",o=e.lastIndex;for(t.lastIndex=o;r=t.exec(n);)r[1]===""?i===`
`?s+=i:i=`
`:(s+=i+r[1],i=" "),o=t.lastIndex;let a=/[ \t]*(.*)/sy;return a.lastIndex=o,r=a.exec(n),s+i+(r?.[1]??"")}function Xb(n,e){let t="";for(let r=1;r<n.length-1;++r){let s=n[r];if(!(s==="\r"&&n[r+1]===`
`))if(s===`
`){let{fold:i,offset:o}=zb(n,r);t+=i,r=o}else if(s==="\\"){let i=n[++r],o=Qb[i];if(o)t+=o;else if(i===`
`)for(i=n[r+1];i===" "||i==="	";)i=n[++r+1];else if(i==="\r"&&n[r+1]===`
`)for(i=n[++r+1];i===" "||i==="	";)i=n[++r+1];else if(i==="x"||i==="u"||i==="U"){let a={x:2,u:4,U:8}[i];t+=Zb(n,r+1,a,e),r+=a}else{let a=n.substr(r-1,2);e(r-1,"BAD_DQ_ESCAPE",`Invalid escape sequence ${a}`),t+=a}}else if(s===" "||s==="	"){let i=r,o=n[r+1];for(;o===" "||o==="	";)o=n[++r+1];o!==`
`&&!(o==="\r"&&n[r+2]===`
`)&&(t+=r>i?n.slice(i,r+1):s)}else t+=s}return(n[n.length-1]!=='"'||n.length===1)&&e(n.length,"MISSING_CHAR",'Missing closing "quote'),t}function zb(n,e){let t="",r=n[e+1];for(;(r===" "||r==="	"||r===`
`||r==="\r")&&!(r==="\r"&&n[e+2]!==`
`);)r===`
`&&(t+=`
`),e+=1,r=n[e+1];return t||(t=" "),{fold:t,offset:e}}var Qb={0:"\0",a:"\x07",b:"\b",e:"\x1B",f:"\f",n:`
`,r:"\r",t:"	",v:"\v",N:"\x85",_:"\xA0",L:"\u2028",P:"\u2029"," ":" ",'"':'"',"/":"/","\\":"\\","	":"	"};function Zb(n,e,t,r){let s=n.substr(e,t),o=s.length===t&&/^[0-9a-fA-F]+$/.test(s)?parseInt(s,16):NaN;if(isNaN(o)){let a=n.substr(e-2,t+2);return r(e-2,"BAD_DQ_ESCAPE",`Invalid escape sequence ${a}`),a}return String.fromCodePoint(o)}Fm.resolveFlowScalar=Kb});var Bm=p(jm=>{"use strict";var qt=K(),Dm=ce(),ev=wl(),tv=Il();function nv(n,e,t,r){let{value:s,type:i,comment:o,range:a}=e.type==="block-scalar"?ev.resolveBlockScalar(n,e,r):tv.resolveFlowScalar(e,n.options.strict,r),l=t?n.directives.tagName(t.source,f=>r(t,"TAG_RESOLVE_FAILED",f)):null,c;n.options.stringKeys&&n.atKey?c=n.schema[qt.SCALAR]:l?c=rv(n.schema,s,l,t,r):e.type==="scalar"?c=sv(n,s,e,r):c=n.schema[qt.SCALAR];let u;try{let f=c.resolve(s,h=>r(t??e,"TAG_RESOLVE_FAILED",h),n.options);u=qt.isScalar(f)?f:new Dm.Scalar(f)}catch(f){let h=f instanceof Error?f.message:String(f);r(t??e,"TAG_RESOLVE_FAILED",h),u=new Dm.Scalar(s)}return u.range=a,u.source=s,i&&(u.type=i),l&&(u.tag=l),c.format&&(u.format=c.format),o&&(u.comment=o),u}function rv(n,e,t,r,s){if(t==="!")return n[qt.SCALAR];let i=[];for(let a of n.tags)if(!a.collection&&a.tag===t)if(a.default&&a.test)i.push(a);else return a;for(let a of i)if(a.test?.test(e))return a;let o=n.knownTags[t];return o&&!o.collection?(n.tags.push(Object.assign({},o,{default:!1,test:void 0})),o):(s(r,"TAG_RESOLVE_FAILED",`Unresolved tag: ${t}`,t!=="tag:yaml.org,2002:str"),n[qt.SCALAR])}function sv({atKey:n,directives:e,schema:t},r,s,i){let o=t.tags.find(a=>(a.default===!0||n&&a.default==="key")&&a.test?.test(r))||t[qt.SCALAR];if(t.compat){let a=t.compat.find(l=>l.default&&l.test?.test(r))??t[qt.SCALAR];if(o.tag!==a.tag){let l=e.tagString(o.tag),c=e.tagString(a.tag),u=`Value may be parsed as either ${l} or ${c}`;i(s,"TAG_RESOLVE_FAILED",u,!0)}}return o}jm.composeScalar=nv});var Hm=p(Um=>{"use strict";function iv(n,e,t){if(e){t??(t=e.length);for(let r=t-1;r>=0;--r){let s=e[r];switch(s.type){case"space":case"comment":case"newline":n-=s.source.length;continue}for(s=e[++r];s?.type==="space";)n+=s.source.length,s=e[++r];break}}return n}Um.emptyScalarPosition=iv});var Gm=p(vl=>{"use strict";var ov=Bn(),av=K(),lv=xm(),Vm=Bm(),cv=ln(),uv=Hm(),fv={composeNode:Wm,composeEmptyNode:bl};function Wm(n,e,t,r){let s=n.atKey,{spaceBefore:i,comment:o,anchor:a,tag:l}=t,c,u=!0;switch(e.type){case"alias":c=hv(n,e,r),(a||l)&&r(e,"ALIAS_PROPS","An alias node must not specify any properties");break;case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":case"block-scalar":c=Vm.composeScalar(n,e,l,r),a&&(c.anchor=a.source.substring(1));break;case"block-map":case"block-seq":case"flow-collection":c=lv.composeCollection(fv,n,e,t,r),a&&(c.anchor=a.source.substring(1));break;default:{let f=e.type==="error"?e.message:`Unsupported token (type: ${e.type})`;r(e,"UNEXPECTED_TOKEN",f),c=bl(n,e.offset,void 0,null,t,r),u=!1}}return a&&c.anchor===""&&r(a,"BAD_ALIAS","Anchor cannot be an empty string"),s&&n.options.stringKeys&&(!av.isScalar(c)||typeof c.value!="string"||c.tag&&c.tag!=="tag:yaml.org,2002:str")&&r(l??e,"NON_STRING_KEY","With stringKeys, all keys must be strings"),i&&(c.spaceBefore=!0),o&&(e.type==="scalar"&&e.source===""?c.comment=o:c.commentBefore=o),n.options.keepSourceTokens&&u&&(c.srcToken=e),c}function bl(n,e,t,r,{spaceBefore:s,comment:i,anchor:o,tag:a,end:l},c){let u={type:"scalar",offset:uv.emptyScalarPosition(e,t,r),indent:-1,source:""},f=Vm.composeScalar(n,u,a,c);return o&&(f.anchor=o.source.substring(1),f.anchor===""&&c(o,"BAD_ALIAS","Anchor cannot be an empty string")),s&&(f.spaceBefore=!0),i&&(f.comment=i,f.range[2]=l),f}function hv({options:n},{offset:e,source:t,end:r},s){let i=new ov.Alias(t.substring(1));i.source===""&&s(e,"BAD_ALIAS","Alias cannot be an empty string"),i.source.endsWith(":")&&s(e+t.length-1,"BAD_ALIAS","Alias ending in : is ambiguous",!0);let o=e+t.length,a=cv.resolveEnd(r,o,n.strict,s);return i.range=[e,o,a.offset],a.comment&&(i.comment=a.comment),i}vl.composeEmptyNode=bl;vl.composeNode=Wm});var Jm=p(Ym=>{"use strict";var dv=sr(),Km=Gm(),pv=ln(),_v=lr();function mv(n,e,{offset:t,start:r,value:s,end:i},o){let a=Object.assign({_directives:e},n),l=new dv.Document(void 0,a),c={atKey:!1,atRoot:!0,directives:l.directives,options:l.options,schema:l.schema},u=_v.resolveProps(r,{indicator:"doc-start",next:s??i?.[0],offset:t,onError:o,parentIndent:0,startOnNewline:!0});u.found&&(l.directives.docStart=!0,s&&(s.type==="block-map"||s.type==="block-seq")&&!u.hasNewline&&o(u.end,"MISSING_CHAR","Block collection cannot start on same line with directives-end marker")),l.contents=s?Km.composeNode(c,s,u,o):Km.composeEmptyNode(c,u.end,r,null,u,o);let f=l.contents.range[2],h=pv.resolveEnd(i,f,!1,o);return h.comment&&(l.comment=h.comment),l.range=[t,f,h.offset],l}Ym.composeDoc=mv});var Ol=p(Qm=>{"use strict";var gv=require("process"),yv=pa(),Ev=sr(),cr=ar(),Xm=K(),Tv=Jm(),Sv=ln();function ur(n){if(typeof n=="number")return[n,n+1];if(Array.isArray(n))return n.length===2?n:[n[0],n[1]];let{offset:e,source:t}=n;return[e,e+(typeof t=="string"?t.length:1)]}function zm(n){let e="",t=!1,r=!1;for(let s=0;s<n.length;++s){let i=n[s];switch(i[0]){case"#":e+=(e===""?"":r?`

`:`
`)+(i.substring(1)||" "),t=!0,r=!1;break;case"%":n[s+1]?.[0]!=="#"&&(s+=1),t=!1;break;default:t||(r=!0),t=!1}}return{comment:e,afterEmptyLine:r}}var Nl=class{constructor(e={}){this.doc=null,this.atDirectives=!1,this.prelude=[],this.errors=[],this.warnings=[],this.onError=(t,r,s,i)=>{let o=ur(t);i?this.warnings.push(new cr.YAMLWarning(o,r,s)):this.errors.push(new cr.YAMLParseError(o,r,s))},this.directives=new yv.Directives({version:e.version||"1.2"}),this.options=e}decorate(e,t){let{comment:r,afterEmptyLine:s}=zm(this.prelude);if(r){let i=e.contents;if(t)e.comment=e.comment?`${e.comment}
${r}`:r;else if(s||e.directives.docStart||!i)e.commentBefore=r;else if(Xm.isCollection(i)&&!i.flow&&i.items.length>0){let o=i.items[0];Xm.isPair(o)&&(o=o.key);let a=o.commentBefore;o.commentBefore=a?`${r}
${a}`:r}else{let o=i.commentBefore;i.commentBefore=o?`${r}
${o}`:r}}t?(Array.prototype.push.apply(e.errors,this.errors),Array.prototype.push.apply(e.warnings,this.warnings)):(e.errors=this.errors,e.warnings=this.warnings),this.prelude=[],this.errors=[],this.warnings=[]}streamInfo(){return{comment:zm(this.prelude).comment,directives:this.directives,errors:this.errors,warnings:this.warnings}}*compose(e,t=!1,r=-1){for(let s of e)yield*this.next(s);yield*this.end(t,r)}*next(e){switch(gv.env.LOG_STREAM&&console.dir(e,{depth:null}),e.type){case"directive":this.directives.add(e.source,(t,r,s)=>{let i=ur(e);i[0]+=t,this.onError(i,"BAD_DIRECTIVE",r,s)}),this.prelude.push(e.source),this.atDirectives=!0;break;case"document":{let t=Tv.composeDoc(this.options,this.directives,e,this.onError);this.atDirectives&&!t.directives.docStart&&this.onError(e,"MISSING_CHAR","Missing directives-end/doc-start indicator line"),this.decorate(t,!1),this.doc&&(yield this.doc),this.doc=t,this.atDirectives=!1;break}case"byte-order-mark":case"space":break;case"comment":case"newline":this.prelude.push(e.source);break;case"error":{let t=e.source?`${e.message}: ${JSON.stringify(e.source)}`:e.message,r=new cr.YAMLParseError(ur(e),"UNEXPECTED_TOKEN",t);this.atDirectives||!this.doc?this.errors.push(r):this.doc.errors.push(r);break}case"doc-end":{if(!this.doc){let r="Unexpected doc-end without preceding document";this.errors.push(new cr.YAMLParseError(ur(e),"UNEXPECTED_TOKEN",r));break}this.doc.directives.docEnd=!0;let t=Sv.resolveEnd(e.end,e.offset+e.source.length,this.doc.options.strict,this.onError);if(this.decorate(this.doc,!0),t.comment){let r=this.doc.comment;this.doc.comment=r?`${r}
${t.comment}`:t.comment}this.doc.range[2]=t.offset;break}default:this.errors.push(new cr.YAMLParseError(ur(e),"UNEXPECTED_TOKEN",`Unsupported token ${e.type}`))}}*end(e=!1,t=-1){if(this.doc)this.decorate(this.doc,!0),yield this.doc,this.doc=null;else if(e){let r=Object.assign({_directives:this.directives},this.options),s=new Ev.Document(void 0,r);this.atDirectives&&this.onError(t,"MISSING_CHAR","Missing directives-end indicator line"),s.range=[0,t,t],this.decorate(s,!1),yield s}}};Qm.Composer=Nl});var tg=p(pi=>{"use strict";var Av=wl(),wv=Il(),Lv=ar(),Zm=Gn();function Iv(n,e=!0,t){if(n){let r=(s,i,o)=>{let a=typeof s=="number"?s:Array.isArray(s)?s[0]:s.offset;if(t)t(a,i,o);else throw new Lv.YAMLParseError([a,a+1],i,o)};switch(n.type){case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return wv.resolveFlowScalar(n,e,r);case"block-scalar":return Av.resolveBlockScalar({options:{strict:e}},n,r)}}return null}function bv(n,e){let{implicitKey:t=!1,indent:r,inFlow:s=!1,offset:i=-1,type:o="PLAIN"}=e,a=Zm.stringifyString({type:o,value:n},{implicitKey:t,indent:r>0?" ".repeat(r):"",inFlow:s,options:{blockQuote:!0,lineWidth:-1}}),l=e.end??[{type:"newline",offset:-1,indent:r,source:`
`}];switch(a[0]){case"|":case">":{let c=a.indexOf(`
`),u=a.substring(0,c),f=a.substring(c+1)+`
`,h=[{type:"block-scalar-header",offset:i,indent:r,source:u}];return eg(h,l)||h.push({type:"newline",offset:-1,indent:r,source:`
`}),{type:"block-scalar",offset:i,indent:r,props:h,source:f}}case'"':return{type:"double-quoted-scalar",offset:i,indent:r,source:a,end:l};case"'":return{type:"single-quoted-scalar",offset:i,indent:r,source:a,end:l};default:return{type:"scalar",offset:i,indent:r,source:a,end:l}}}function vv(n,e,t={}){let{afterKey:r=!1,implicitKey:s=!1,inFlow:i=!1,type:o}=t,a="indent"in n?n.indent:null;if(r&&typeof a=="number"&&(a+=2),!o)switch(n.type){case"single-quoted-scalar":o="QUOTE_SINGLE";break;case"double-quoted-scalar":o="QUOTE_DOUBLE";break;case"block-scalar":{let c=n.props[0];if(c.type!=="block-scalar-header")throw new Error("Invalid block scalar header");o=c.source[0]===">"?"BLOCK_FOLDED":"BLOCK_LITERAL";break}default:o="PLAIN"}let l=Zm.stringifyString({type:o,value:e},{implicitKey:s||a===null,indent:a!==null&&a>0?" ".repeat(a):"",inFlow:i,options:{blockQuote:!0,lineWidth:-1}});switch(l[0]){case"|":case">":Nv(n,l);break;case'"':Cl(n,l,"double-quoted-scalar");break;case"'":Cl(n,l,"single-quoted-scalar");break;default:Cl(n,l,"scalar")}}function Nv(n,e){let t=e.indexOf(`
`),r=e.substring(0,t),s=e.substring(t+1)+`
`;if(n.type==="block-scalar"){let i=n.props[0];if(i.type!=="block-scalar-header")throw new Error("Invalid block scalar header");i.source=r,n.source=s}else{let{offset:i}=n,o="indent"in n?n.indent:-1,a=[{type:"block-scalar-header",offset:i,indent:o,source:r}];eg(a,"end"in n?n.end:void 0)||a.push({type:"newline",offset:-1,indent:o,source:`
`});for(let l of Object.keys(n))l!=="type"&&l!=="offset"&&delete n[l];Object.assign(n,{type:"block-scalar",indent:o,props:a,source:s})}}function eg(n,e){if(e)for(let t of e)switch(t.type){case"space":case"comment":n.push(t);break;case"newline":return n.push(t),!0}return!1}function Cl(n,e,t){switch(n.type){case"scalar":case"double-quoted-scalar":case"single-quoted-scalar":n.type=t,n.source=e;break;case"block-scalar":{let r=n.props.slice(1),s=e.length;n.props[0].type==="block-scalar-header"&&(s-=n.props[0].source.length);for(let i of r)i.offset+=s;delete n.props,Object.assign(n,{type:t,source:e,end:r});break}case"block-map":case"block-seq":{let s={type:"newline",offset:n.offset+e.length,indent:n.indent,source:`
`};delete n.items,Object.assign(n,{type:t,source:e,end:[s]});break}default:{let r="indent"in n?n.indent:-1,s="end"in n&&Array.isArray(n.end)?n.end.filter(i=>i.type==="space"||i.type==="comment"||i.type==="newline"):[];for(let i of Object.keys(n))i!=="type"&&i!=="offset"&&delete n[i];Object.assign(n,{type:t,indent:r,source:e,end:s})}}}pi.createScalarToken=bv;pi.resolveAsScalar=Iv;pi.setScalarValue=vv});var rg=p(ng=>{"use strict";var Ov=n=>"type"in n?mi(n):_i(n);function mi(n){switch(n.type){case"block-scalar":{let e="";for(let t of n.props)e+=mi(t);return e+n.source}case"block-map":case"block-seq":{let e="";for(let t of n.items)e+=_i(t);return e}case"flow-collection":{let e=n.start.source;for(let t of n.items)e+=_i(t);for(let t of n.end)e+=t.source;return e}case"document":{let e=_i(n);if(n.end)for(let t of n.end)e+=t.source;return e}default:{let e=n.source;if("end"in n&&n.end)for(let t of n.end)e+=t.source;return e}}}function _i({start:n,key:e,sep:t,value:r}){let s="";for(let i of n)s+=i.source;if(e&&(s+=mi(e)),t)for(let i of t)s+=i.source;return r&&(s+=mi(r)),s}ng.stringify=Ov});var ag=p(og=>{"use strict";var Rl=Symbol("break visit"),Cv=Symbol("skip children"),sg=Symbol("remove item");function Mt(n,e){"type"in n&&n.type==="document"&&(n={start:n.start,value:n.value}),ig(Object.freeze([]),n,e)}Mt.BREAK=Rl;Mt.SKIP=Cv;Mt.REMOVE=sg;Mt.itemAtPath=(n,e)=>{let t=n;for(let[r,s]of e){let i=t?.[r];if(i&&"items"in i)t=i.items[s];else return}return t};Mt.parentCollection=(n,e)=>{let t=Mt.itemAtPath(n,e.slice(0,-1)),r=e[e.length-1][0],s=t?.[r];if(s&&"items"in s)return s;throw new Error("Parent collection not found")};function ig(n,e,t){let r=t(e,n);if(typeof r=="symbol")return r;for(let s of["key","value"]){let i=e[s];if(i&&"items"in i){for(let o=0;o<i.items.length;++o){let a=ig(Object.freeze(n.concat([[s,o]])),i.items[o],t);if(typeof a=="number")o=a-1;else{if(a===Rl)return Rl;a===sg&&(i.items.splice(o,1),o-=1)}}typeof r=="function"&&s==="key"&&(r=r(e,n))}}return typeof r=="function"?r(e,n):r}og.visit=Mt});var gi=p(Pe=>{"use strict";var Pl=tg(),Rv=rg(),Pv=ag(),kl="\uFEFF",$l="",xl="",ql="",kv=n=>!!n&&"items"in n,$v=n=>!!n&&(n.type==="scalar"||n.type==="single-quoted-scalar"||n.type==="double-quoted-scalar"||n.type==="block-scalar");function xv(n){switch(n){case kl:return"<BOM>";case $l:return"<DOC>";case xl:return"<FLOW_END>";case ql:return"<SCALAR>";default:return JSON.stringify(n)}}function qv(n){switch(n){case kl:return"byte-order-mark";case $l:return"doc-mode";case xl:return"flow-error-end";case ql:return"scalar";case"---":return"doc-start";case"...":return"doc-end";case"":case`
`:case`\r
`:return"newline";case"-":return"seq-item-ind";case"?":return"explicit-key-ind";case":":return"map-value-ind";case"{":return"flow-map-start";case"}":return"flow-map-end";case"[":return"flow-seq-start";case"]":return"flow-seq-end";case",":return"comma"}switch(n[0]){case" ":case"	":return"space";case"#":return"comment";case"%":return"directive-line";case"*":return"alias";case"&":return"anchor";case"!":return"tag";case"'":return"single-quoted-scalar";case'"':return"double-quoted-scalar";case"|":case">":return"block-scalar-header"}return null}Pe.createScalarToken=Pl.createScalarToken;Pe.resolveAsScalar=Pl.resolveAsScalar;Pe.setScalarValue=Pl.setScalarValue;Pe.stringify=Rv.stringify;Pe.visit=Pv.visit;Pe.BOM=kl;Pe.DOCUMENT=$l;Pe.FLOW_END=xl;Pe.SCALAR=ql;Pe.isCollection=kv;Pe.isScalar=$v;Pe.prettyToken=xv;Pe.tokenType=qv});var Dl=p(cg=>{"use strict";var fr=gi();function We(n){switch(n){case void 0:case" ":case`
`:case"\r":case"	":return!0;default:return!1}}var lg=new Set("0123456789ABCDEFabcdef"),Mv=new Set("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()"),yi=new Set(",[]{}"),Fv=new Set(` ,[]{}
\r	`),Ml=n=>!n||Fv.has(n),Fl=class{constructor(){this.atEnd=!1,this.blockScalarIndent=-1,this.blockScalarKeep=!1,this.buffer="",this.flowKey=!1,this.flowLevel=0,this.indentNext=0,this.indentValue=0,this.lineEndPos=null,this.next=null,this.pos=0}*lex(e,t=!1){if(e){if(typeof e!="string")throw TypeError("source is not a string");this.buffer=this.buffer?this.buffer+e:e,this.lineEndPos=null}this.atEnd=!t;let r=this.next??"stream";for(;r&&(t||this.hasChars(1));)r=yield*this.parseNext(r)}atLineEnd(){let e=this.pos,t=this.buffer[e];for(;t===" "||t==="	";)t=this.buffer[++e];return!t||t==="#"||t===`
`?!0:t==="\r"?this.buffer[e+1]===`
`:!1}charAt(e){return this.buffer[this.pos+e]}continueScalar(e){let t=this.buffer[e];if(this.indentNext>0){let r=0;for(;t===" ";)t=this.buffer[++r+e];if(t==="\r"){let s=this.buffer[r+e+1];if(s===`
`||!s&&!this.atEnd)return e+r+1}return t===`
`||r>=this.indentNext||!t&&!this.atEnd?e+r:-1}if(t==="-"||t==="."){let r=this.buffer.substr(e,3);if((r==="---"||r==="...")&&We(this.buffer[e+3]))return-1}return e}getLine(){let e=this.lineEndPos;return(typeof e!="number"||e!==-1&&e<this.pos)&&(e=this.buffer.indexOf(`
`,this.pos),this.lineEndPos=e),e===-1?this.atEnd?this.buffer.substring(this.pos):null:(this.buffer[e-1]==="\r"&&(e-=1),this.buffer.substring(this.pos,e))}hasChars(e){return this.pos+e<=this.buffer.length}setNext(e){return this.buffer=this.buffer.substring(this.pos),this.pos=0,this.lineEndPos=null,this.next=e,null}peek(e){return this.buffer.substr(this.pos,e)}*parseNext(e){switch(e){case"stream":return yield*this.parseStream();case"line-start":return yield*this.parseLineStart();case"block-start":return yield*this.parseBlockStart();case"doc":return yield*this.parseDocument();case"flow":return yield*this.parseFlowCollection();case"quoted-scalar":return yield*this.parseQuotedScalar();case"block-scalar":return yield*this.parseBlockScalar();case"plain-scalar":return yield*this.parsePlainScalar()}}*parseStream(){let e=this.getLine();if(e===null)return this.setNext("stream");if(e[0]===fr.BOM&&(yield*this.pushCount(1),e=e.substring(1)),e[0]==="%"){let t=e.length,r=e.indexOf("#");for(;r!==-1;){let i=e[r-1];if(i===" "||i==="	"){t=r-1;break}else r=e.indexOf("#",r+1)}for(;;){let i=e[t-1];if(i===" "||i==="	")t-=1;else break}let s=(yield*this.pushCount(t))+(yield*this.pushSpaces(!0));return yield*this.pushCount(e.length-s),this.pushNewline(),"stream"}if(this.atLineEnd()){let t=yield*this.pushSpaces(!0);return yield*this.pushCount(e.length-t),yield*this.pushNewline(),"stream"}return yield fr.DOCUMENT,yield*this.parseLineStart()}*parseLineStart(){let e=this.charAt(0);if(!e&&!this.atEnd)return this.setNext("line-start");if(e==="-"||e==="."){if(!this.atEnd&&!this.hasChars(4))return this.setNext("line-start");let t=this.peek(3);if((t==="---"||t==="...")&&We(this.charAt(3)))return yield*this.pushCount(3),this.indentValue=0,this.indentNext=0,t==="---"?"doc":"stream"}return this.indentValue=yield*this.pushSpaces(!1),this.indentNext>this.indentValue&&!We(this.charAt(1))&&(this.indentNext=this.indentValue),yield*this.parseBlockStart()}*parseBlockStart(){let[e,t]=this.peek(2);if(!t&&!this.atEnd)return this.setNext("block-start");if((e==="-"||e==="?"||e===":")&&We(t)){let r=(yield*this.pushCount(1))+(yield*this.pushSpaces(!0));return this.indentNext=this.indentValue+1,this.indentValue+=r,yield*this.parseBlockStart()}return"doc"}*parseDocument(){yield*this.pushSpaces(!0);let e=this.getLine();if(e===null)return this.setNext("doc");let t=yield*this.pushIndicators();switch(e[t]){case"#":yield*this.pushCount(e.length-t);case void 0:return yield*this.pushNewline(),yield*this.parseLineStart();case"{":case"[":return yield*this.pushCount(1),this.flowKey=!1,this.flowLevel=1,"flow";case"}":case"]":return yield*this.pushCount(1),"doc";case"*":return yield*this.pushUntil(Ml),"doc";case'"':case"'":return yield*this.parseQuotedScalar();case"|":case">":return t+=yield*this.parseBlockScalarHeader(),t+=yield*this.pushSpaces(!0),yield*this.pushCount(e.length-t),yield*this.pushNewline(),yield*this.parseBlockScalar();default:return yield*this.parsePlainScalar()}}*parseFlowCollection(){let e,t,r=-1;do e=yield*this.pushNewline(),e>0?(t=yield*this.pushSpaces(!1),this.indentValue=r=t):t=0,t+=yield*this.pushSpaces(!0);while(e+t>0);let s=this.getLine();if(s===null)return this.setNext("flow");if((r!==-1&&r<this.indentNext&&s[0]!=="#"||r===0&&(s.startsWith("---")||s.startsWith("..."))&&We(s[3]))&&!(r===this.indentNext-1&&this.flowLevel===1&&(s[0]==="]"||s[0]==="}")))return this.flowLevel=0,yield fr.FLOW_END,yield*this.parseLineStart();let i=0;for(;s[i]===",";)i+=yield*this.pushCount(1),i+=yield*this.pushSpaces(!0),this.flowKey=!1;switch(i+=yield*this.pushIndicators(),s[i]){case void 0:return"flow";case"#":return yield*this.pushCount(s.length-i),"flow";case"{":case"[":return yield*this.pushCount(1),this.flowKey=!1,this.flowLevel+=1,"flow";case"}":case"]":return yield*this.pushCount(1),this.flowKey=!0,this.flowLevel-=1,this.flowLevel?"flow":"doc";case"*":return yield*this.pushUntil(Ml),"flow";case'"':case"'":return this.flowKey=!0,yield*this.parseQuotedScalar();case":":{let o=this.charAt(1);if(this.flowKey||We(o)||o===",")return this.flowKey=!1,yield*this.pushCount(1),yield*this.pushSpaces(!0),"flow"}default:return this.flowKey=!1,yield*this.parsePlainScalar()}}*parseQuotedScalar(){let e=this.charAt(0),t=this.buffer.indexOf(e,this.pos+1);if(e==="'")for(;t!==-1&&this.buffer[t+1]==="'";)t=this.buffer.indexOf("'",t+2);else for(;t!==-1;){let i=0;for(;this.buffer[t-1-i]==="\\";)i+=1;if(i%2===0)break;t=this.buffer.indexOf('"',t+1)}let r=this.buffer.substring(0,t),s=r.indexOf(`
`,this.pos);if(s!==-1){for(;s!==-1;){let i=this.continueScalar(s+1);if(i===-1)break;s=r.indexOf(`
`,i)}s!==-1&&(t=s-(r[s-1]==="\r"?2:1))}if(t===-1){if(!this.atEnd)return this.setNext("quoted-scalar");t=this.buffer.length}return yield*this.pushToIndex(t+1,!1),this.flowLevel?"flow":"doc"}*parseBlockScalarHeader(){this.blockScalarIndent=-1,this.blockScalarKeep=!1;let e=this.pos;for(;;){let t=this.buffer[++e];if(t==="+")this.blockScalarKeep=!0;else if(t>"0"&&t<="9")this.blockScalarIndent=Number(t)-1;else if(t!=="-")break}return yield*this.pushUntil(t=>We(t)||t==="#")}*parseBlockScalar(){let e=this.pos-1,t=0,r;e:for(let i=this.pos;r=this.buffer[i];++i)switch(r){case" ":t+=1;break;case`
`:e=i,t=0;break;case"\r":{let o=this.buffer[i+1];if(!o&&!this.atEnd)return this.setNext("block-scalar");if(o===`
`)break}default:break e}if(!r&&!this.atEnd)return this.setNext("block-scalar");if(t>=this.indentNext){this.blockScalarIndent===-1?this.indentNext=t:this.indentNext=this.blockScalarIndent+(this.indentNext===0?1:this.indentNext);do{let i=this.continueScalar(e+1);if(i===-1)break;e=this.buffer.indexOf(`
`,i)}while(e!==-1);if(e===-1){if(!this.atEnd)return this.setNext("block-scalar");e=this.buffer.length}}let s=e+1;for(r=this.buffer[s];r===" ";)r=this.buffer[++s];if(r==="	"){for(;r==="	"||r===" "||r==="\r"||r===`
`;)r=this.buffer[++s];e=s-1}else if(!this.blockScalarKeep)do{let i=e-1,o=this.buffer[i];o==="\r"&&(o=this.buffer[--i]);let a=i;for(;o===" ";)o=this.buffer[--i];if(o===`
`&&i>=this.pos&&i+1+t>a)e=i;else break}while(!0);return yield fr.SCALAR,yield*this.pushToIndex(e+1,!0),yield*this.parseLineStart()}*parsePlainScalar(){let e=this.flowLevel>0,t=this.pos-1,r=this.pos-1,s;for(;s=this.buffer[++r];)if(s===":"){let i=this.buffer[r+1];if(We(i)||e&&yi.has(i))break;t=r}else if(We(s)){let i=this.buffer[r+1];if(s==="\r"&&(i===`
`?(r+=1,s=`
`,i=this.buffer[r+1]):t=r),i==="#"||e&&yi.has(i))break;if(s===`
`){let o=this.continueScalar(r+1);if(o===-1)break;r=Math.max(r,o-2)}}else{if(e&&yi.has(s))break;t=r}return!s&&!this.atEnd?this.setNext("plain-scalar"):(yield fr.SCALAR,yield*this.pushToIndex(t+1,!0),e?"flow":"doc")}*pushCount(e){return e>0?(yield this.buffer.substr(this.pos,e),this.pos+=e,e):0}*pushToIndex(e,t){let r=this.buffer.slice(this.pos,e);return r?(yield r,this.pos+=r.length,r.length):(t&&(yield""),0)}*pushIndicators(){switch(this.charAt(0)){case"!":return(yield*this.pushTag())+(yield*this.pushSpaces(!0))+(yield*this.pushIndicators());case"&":return(yield*this.pushUntil(Ml))+(yield*this.pushSpaces(!0))+(yield*this.pushIndicators());case"-":case"?":case":":{let e=this.flowLevel>0,t=this.charAt(1);if(We(t)||e&&yi.has(t))return e?this.flowKey&&(this.flowKey=!1):this.indentNext=this.indentValue+1,(yield*this.pushCount(1))+(yield*this.pushSpaces(!0))+(yield*this.pushIndicators())}}return 0}*pushTag(){if(this.charAt(1)==="<"){let e=this.pos+2,t=this.buffer[e];for(;!We(t)&&t!==">";)t=this.buffer[++e];return yield*this.pushToIndex(t===">"?e+1:e,!1)}else{let e=this.pos+1,t=this.buffer[e];for(;t;)if(Mv.has(t))t=this.buffer[++e];else if(t==="%"&&lg.has(this.buffer[e+1])&&lg.has(this.buffer[e+2]))t=this.buffer[e+=3];else break;return yield*this.pushToIndex(e,!1)}}*pushNewline(){let e=this.buffer[this.pos];return e===`
`?yield*this.pushCount(1):e==="\r"&&this.charAt(1)===`
`?yield*this.pushCount(2):0}*pushSpaces(e){let t=this.pos-1,r;do r=this.buffer[++t];while(r===" "||e&&r==="	");let s=t-this.pos;return s>0&&(yield this.buffer.substr(this.pos,s),this.pos=t),s}*pushUntil(e){let t=this.pos,r=this.buffer[t];for(;!e(r);)r=this.buffer[++t];return yield*this.pushToIndex(t,!1)}};cg.Lexer=Fl});var Bl=p(ug=>{"use strict";var jl=class{constructor(){this.lineStarts=[],this.addNewLine=e=>this.lineStarts.push(e),this.linePos=e=>{let t=0,r=this.lineStarts.length;for(;t<r;){let i=t+r>>1;this.lineStarts[i]<e?t=i+1:r=i}if(this.lineStarts[t]===e)return{line:t+1,col:1};if(t===0)return{line:0,col:e};let s=this.lineStarts[t-1];return{line:t,col:e-s+1}}}};ug.LineCounter=jl});var Hl=p(_g=>{"use strict";var Dv=require("process"),fg=gi(),jv=Dl();function Lt(n,e){for(let t=0;t<n.length;++t)if(n[t].type===e)return!0;return!1}function hg(n){for(let e=0;e<n.length;++e)switch(n[e].type){case"space":case"comment":case"newline":break;default:return e}return-1}function pg(n){switch(n?.type){case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":case"flow-collection":return!0;default:return!1}}function Ei(n){switch(n.type){case"document":return n.start;case"block-map":{let e=n.items[n.items.length-1];return e.sep??e.start}case"block-seq":return n.items[n.items.length-1].start;default:return[]}}function cn(n){if(n.length===0)return[];let e=n.length;e:for(;--e>=0;)switch(n[e].type){case"doc-start":case"explicit-key-ind":case"map-value-ind":case"seq-item-ind":case"newline":break e}for(;n[++e]?.type==="space";);return n.splice(e,n.length)}function dg(n){if(n.start.type==="flow-seq-start")for(let e of n.items)e.sep&&!e.value&&!Lt(e.start,"explicit-key-ind")&&!Lt(e.sep,"map-value-ind")&&(e.key&&(e.value=e.key),delete e.key,pg(e.value)?e.value.end?Array.prototype.push.apply(e.value.end,e.sep):e.value.end=e.sep:Array.prototype.push.apply(e.start,e.sep),delete e.sep)}var Ul=class{constructor(e){this.atNewLine=!0,this.atScalar=!1,this.indent=0,this.offset=0,this.onKeyLine=!1,this.stack=[],this.source="",this.type="",this.lexer=new jv.Lexer,this.onNewLine=e}*parse(e,t=!1){this.onNewLine&&this.offset===0&&this.onNewLine(0);for(let r of this.lexer.lex(e,t))yield*this.next(r);t||(yield*this.end())}*next(e){if(this.source=e,Dv.env.LOG_TOKENS&&console.log("|",fg.prettyToken(e)),this.atScalar){this.atScalar=!1,yield*this.step(),this.offset+=e.length;return}let t=fg.tokenType(e);if(t)if(t==="scalar")this.atNewLine=!1,this.atScalar=!0,this.type="scalar";else{switch(this.type=t,yield*this.step(),t){case"newline":this.atNewLine=!0,this.indent=0,this.onNewLine&&this.onNewLine(this.offset+e.length);break;case"space":this.atNewLine&&e[0]===" "&&(this.indent+=e.length);break;case"explicit-key-ind":case"map-value-ind":case"seq-item-ind":this.atNewLine&&(this.indent+=e.length);break;case"doc-mode":case"flow-error-end":return;default:this.atNewLine=!1}this.offset+=e.length}else{let r=`Not a YAML token: ${e}`;yield*this.pop({type:"error",offset:this.offset,message:r,source:e}),this.offset+=e.length}}*end(){for(;this.stack.length>0;)yield*this.pop()}get sourceToken(){return{type:this.type,offset:this.offset,indent:this.indent,source:this.source}}*step(){let e=this.peek(1);if(this.type==="doc-end"&&e?.type!=="doc-end"){for(;this.stack.length>0;)yield*this.pop();this.stack.push({type:"doc-end",offset:this.offset,source:this.source});return}if(!e)return yield*this.stream();switch(e.type){case"document":return yield*this.document(e);case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return yield*this.scalar(e);case"block-scalar":return yield*this.blockScalar(e);case"block-map":return yield*this.blockMap(e);case"block-seq":return yield*this.blockSequence(e);case"flow-collection":return yield*this.flowCollection(e);case"doc-end":return yield*this.documentEnd(e)}yield*this.pop()}peek(e){return this.stack[this.stack.length-e]}*pop(e){let t=e??this.stack.pop();if(!t)yield{type:"error",offset:this.offset,source:"",message:"Tried to pop an empty stack"};else if(this.stack.length===0)yield t;else{let r=this.peek(1);switch(t.type==="block-scalar"?t.indent="indent"in r?r.indent:0:t.type==="flow-collection"&&r.type==="document"&&(t.indent=0),t.type==="flow-collection"&&dg(t),r.type){case"document":r.value=t;break;case"block-scalar":r.props.push(t);break;case"block-map":{let s=r.items[r.items.length-1];if(s.value){r.items.push({start:[],key:t,sep:[]}),this.onKeyLine=!0;return}else if(s.sep)s.value=t;else{Object.assign(s,{key:t,sep:[]}),this.onKeyLine=!s.explicitKey;return}break}case"block-seq":{let s=r.items[r.items.length-1];s.value?r.items.push({start:[],value:t}):s.value=t;break}case"flow-collection":{let s=r.items[r.items.length-1];!s||s.value?r.items.push({start:[],key:t,sep:[]}):s.sep?s.value=t:Object.assign(s,{key:t,sep:[]});return}default:yield*this.pop(),yield*this.pop(t)}if((r.type==="document"||r.type==="block-map"||r.type==="block-seq")&&(t.type==="block-map"||t.type==="block-seq")){let s=t.items[t.items.length-1];s&&!s.sep&&!s.value&&s.start.length>0&&hg(s.start)===-1&&(t.indent===0||s.start.every(i=>i.type!=="comment"||i.indent<t.indent))&&(r.type==="document"?r.end=s.start:r.items.push({start:s.start}),t.items.splice(-1,1))}}}*stream(){switch(this.type){case"directive-line":yield{type:"directive",offset:this.offset,source:this.source};return;case"byte-order-mark":case"space":case"comment":case"newline":yield this.sourceToken;return;case"doc-mode":case"doc-start":{let e={type:"document",offset:this.offset,start:[]};this.type==="doc-start"&&e.start.push(this.sourceToken),this.stack.push(e);return}}yield{type:"error",offset:this.offset,message:`Unexpected ${this.type} token in YAML stream`,source:this.source}}*document(e){if(e.value)return yield*this.lineEnd(e);switch(this.type){case"doc-start":{hg(e.start)!==-1?(yield*this.pop(),yield*this.step()):e.start.push(this.sourceToken);return}case"anchor":case"tag":case"space":case"comment":case"newline":e.start.push(this.sourceToken);return}let t=this.startBlockValue(e);t?this.stack.push(t):yield{type:"error",offset:this.offset,message:`Unexpected ${this.type} token in YAML document`,source:this.source}}*scalar(e){if(this.type==="map-value-ind"){let t=Ei(this.peek(2)),r=cn(t),s;e.end?(s=e.end,s.push(this.sourceToken),delete e.end):s=[this.sourceToken];let i={type:"block-map",offset:e.offset,indent:e.indent,items:[{start:r,key:e,sep:s}]};this.onKeyLine=!0,this.stack[this.stack.length-1]=i}else yield*this.lineEnd(e)}*blockScalar(e){switch(this.type){case"space":case"comment":case"newline":e.props.push(this.sourceToken);return;case"scalar":if(e.source=this.source,this.atNewLine=!0,this.indent=0,this.onNewLine){let t=this.source.indexOf(`
`)+1;for(;t!==0;)this.onNewLine(this.offset+t),t=this.source.indexOf(`
`,t)+1}yield*this.pop();break;default:yield*this.pop(),yield*this.step()}}*blockMap(e){let t=e.items[e.items.length-1];switch(this.type){case"newline":if(this.onKeyLine=!1,t.value){let r="end"in t.value?t.value.end:void 0;(Array.isArray(r)?r[r.length-1]:void 0)?.type==="comment"?r?.push(this.sourceToken):e.items.push({start:[this.sourceToken]})}else t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"space":case"comment":if(t.value)e.items.push({start:[this.sourceToken]});else if(t.sep)t.sep.push(this.sourceToken);else{if(this.atIndentedComment(t.start,e.indent)){let s=e.items[e.items.length-2]?.value?.end;if(Array.isArray(s)){Array.prototype.push.apply(s,t.start),s.push(this.sourceToken),e.items.pop();return}}t.start.push(this.sourceToken)}return}if(this.indent>=e.indent){let r=!this.onKeyLine&&this.indent===e.indent,s=r&&(t.sep||t.explicitKey)&&this.type!=="seq-item-ind",i=[];if(s&&t.sep&&!t.value){let o=[];for(let a=0;a<t.sep.length;++a){let l=t.sep[a];switch(l.type){case"newline":o.push(a);break;case"space":break;case"comment":l.indent>e.indent&&(o.length=0);break;default:o.length=0}}o.length>=2&&(i=t.sep.splice(o[1]))}switch(this.type){case"anchor":case"tag":s||t.value?(i.push(this.sourceToken),e.items.push({start:i}),this.onKeyLine=!0):t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"explicit-key-ind":!t.sep&&!t.explicitKey?(t.start.push(this.sourceToken),t.explicitKey=!0):s||t.value?(i.push(this.sourceToken),e.items.push({start:i,explicitKey:!0})):this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:[this.sourceToken],explicitKey:!0}]}),this.onKeyLine=!0;return;case"map-value-ind":if(t.explicitKey)if(t.sep)if(t.value)e.items.push({start:[],key:null,sep:[this.sourceToken]});else if(Lt(t.sep,"map-value-ind"))this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:i,key:null,sep:[this.sourceToken]}]});else if(pg(t.key)&&!Lt(t.sep,"newline")){let o=cn(t.start),a=t.key,l=t.sep;l.push(this.sourceToken),delete t.key,delete t.sep,this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:o,key:a,sep:l}]})}else i.length>0?t.sep=t.sep.concat(i,this.sourceToken):t.sep.push(this.sourceToken);else if(Lt(t.start,"newline"))Object.assign(t,{key:null,sep:[this.sourceToken]});else{let o=cn(t.start);this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:o,key:null,sep:[this.sourceToken]}]})}else t.sep?t.value||s?e.items.push({start:i,key:null,sep:[this.sourceToken]}):Lt(t.sep,"map-value-ind")?this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:[],key:null,sep:[this.sourceToken]}]}):t.sep.push(this.sourceToken):Object.assign(t,{key:null,sep:[this.sourceToken]});this.onKeyLine=!0;return;case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":{let o=this.flowScalar(this.type);s||t.value?(e.items.push({start:i,key:o,sep:[]}),this.onKeyLine=!0):t.sep?this.stack.push(o):(Object.assign(t,{key:o,sep:[]}),this.onKeyLine=!0);return}default:{let o=this.startBlockValue(e);if(o){if(o.type==="block-seq"){if(!t.explicitKey&&t.sep&&!Lt(t.sep,"newline")){yield*this.pop({type:"error",offset:this.offset,message:"Unexpected block-seq-ind on same line with key",source:this.source});return}}else r&&e.items.push({start:i});this.stack.push(o);return}}}}yield*this.pop(),yield*this.step()}*blockSequence(e){let t=e.items[e.items.length-1];switch(this.type){case"newline":if(t.value){let r="end"in t.value?t.value.end:void 0;(Array.isArray(r)?r[r.length-1]:void 0)?.type==="comment"?r?.push(this.sourceToken):e.items.push({start:[this.sourceToken]})}else t.start.push(this.sourceToken);return;case"space":case"comment":if(t.value)e.items.push({start:[this.sourceToken]});else{if(this.atIndentedComment(t.start,e.indent)){let s=e.items[e.items.length-2]?.value?.end;if(Array.isArray(s)){Array.prototype.push.apply(s,t.start),s.push(this.sourceToken),e.items.pop();return}}t.start.push(this.sourceToken)}return;case"anchor":case"tag":if(t.value||this.indent<=e.indent)break;t.start.push(this.sourceToken);return;case"seq-item-ind":if(this.indent!==e.indent)break;t.value||Lt(t.start,"seq-item-ind")?e.items.push({start:[this.sourceToken]}):t.start.push(this.sourceToken);return}if(this.indent>e.indent){let r=this.startBlockValue(e);if(r){this.stack.push(r);return}}yield*this.pop(),yield*this.step()}*flowCollection(e){let t=e.items[e.items.length-1];if(this.type==="flow-error-end"){let r;do yield*this.pop(),r=this.peek(1);while(r?.type==="flow-collection")}else if(e.end.length===0){switch(this.type){case"comma":case"explicit-key-ind":!t||t.sep?e.items.push({start:[this.sourceToken]}):t.start.push(this.sourceToken);return;case"map-value-ind":!t||t.value?e.items.push({start:[],key:null,sep:[this.sourceToken]}):t.sep?t.sep.push(this.sourceToken):Object.assign(t,{key:null,sep:[this.sourceToken]});return;case"space":case"comment":case"newline":case"anchor":case"tag":!t||t.value?e.items.push({start:[this.sourceToken]}):t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":{let s=this.flowScalar(this.type);!t||t.value?e.items.push({start:[],key:s,sep:[]}):t.sep?this.stack.push(s):Object.assign(t,{key:s,sep:[]});return}case"flow-map-end":case"flow-seq-end":e.end.push(this.sourceToken);return}let r=this.startBlockValue(e);r?this.stack.push(r):(yield*this.pop(),yield*this.step())}else{let r=this.peek(2);if(r.type==="block-map"&&(this.type==="map-value-ind"&&r.indent===e.indent||this.type==="newline"&&!r.items[r.items.length-1].sep))yield*this.pop(),yield*this.step();else if(this.type==="map-value-ind"&&r.type!=="flow-collection"){let s=Ei(r),i=cn(s);dg(e);let o=e.end.splice(1,e.end.length);o.push(this.sourceToken);let a={type:"block-map",offset:e.offset,indent:e.indent,items:[{start:i,key:e,sep:o}]};this.onKeyLine=!0,this.stack[this.stack.length-1]=a}else yield*this.lineEnd(e)}}flowScalar(e){if(this.onNewLine){let t=this.source.indexOf(`
`)+1;for(;t!==0;)this.onNewLine(this.offset+t),t=this.source.indexOf(`
`,t)+1}return{type:e,offset:this.offset,indent:this.indent,source:this.source}}startBlockValue(e){switch(this.type){case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return this.flowScalar(this.type);case"block-scalar-header":return{type:"block-scalar",offset:this.offset,indent:this.indent,props:[this.sourceToken],source:""};case"flow-map-start":case"flow-seq-start":return{type:"flow-collection",offset:this.offset,indent:this.indent,start:this.sourceToken,items:[],end:[]};case"seq-item-ind":return{type:"block-seq",offset:this.offset,indent:this.indent,items:[{start:[this.sourceToken]}]};case"explicit-key-ind":{this.onKeyLine=!0;let t=Ei(e),r=cn(t);return r.push(this.sourceToken),{type:"block-map",offset:this.offset,indent:this.indent,items:[{start:r,explicitKey:!0}]}}case"map-value-ind":{this.onKeyLine=!0;let t=Ei(e),r=cn(t);return{type:"block-map",offset:this.offset,indent:this.indent,items:[{start:r,key:null,sep:[this.sourceToken]}]}}}return null}atIndentedComment(e,t){return this.type!=="comment"||this.indent<=t?!1:e.every(r=>r.type==="newline"||r.type==="space")}*documentEnd(e){this.type!=="doc-mode"&&(e.end?e.end.push(this.sourceToken):e.end=[this.sourceToken],this.type==="newline"&&(yield*this.pop()))}*lineEnd(e){switch(this.type){case"comma":case"doc-start":case"doc-end":case"flow-seq-end":case"flow-map-end":case"map-value-ind":yield*this.pop(),yield*this.step();break;case"newline":this.onKeyLine=!1;case"space":case"comment":default:e.end?e.end.push(this.sourceToken):e.end=[this.sourceToken],this.type==="newline"&&(yield*this.pop())}}};_g.Parser=Ul});var Tg=p(dr=>{"use strict";var mg=Ol(),Bv=sr(),hr=ar(),Uv=va(),Hv=K(),Vv=Bl(),gg=Hl();function yg(n){let e=n.prettyErrors!==!1;return{lineCounter:n.lineCounter||e&&new Vv.LineCounter||null,prettyErrors:e}}function Wv(n,e={}){let{lineCounter:t,prettyErrors:r}=yg(e),s=new gg.Parser(t?.addNewLine),i=new mg.Composer(e),o=Array.from(i.compose(s.parse(n)));if(r&&t)for(let a of o)a.errors.forEach(hr.prettifyError(n,t)),a.warnings.forEach(hr.prettifyError(n,t));return o.length>0?o:Object.assign([],{empty:!0},i.streamInfo())}function Eg(n,e={}){let{lineCounter:t,prettyErrors:r}=yg(e),s=new gg.Parser(t?.addNewLine),i=new mg.Composer(e),o=null;for(let a of i.compose(s.parse(n),!0,n.length))if(!o)o=a;else if(o.options.logLevel!=="silent"){o.errors.push(new hr.YAMLParseError(a.range.slice(0,2),"MULTIPLE_DOCS","Source contains multiple documents; please use YAML.parseAllDocuments()"));break}return r&&t&&(o.errors.forEach(hr.prettifyError(n,t)),o.warnings.forEach(hr.prettifyError(n,t))),o}function Gv(n,e,t){let r;typeof e=="function"?r=e:t===void 0&&e&&typeof e=="object"&&(t=e);let s=Eg(n,t);if(!s)return null;if(s.warnings.forEach(i=>Uv.warn(s.options.logLevel,i)),s.errors.length>0){if(s.options.logLevel!=="silent")throw s.errors[0];s.errors=[]}return s.toJS(Object.assign({reviver:r},t))}function Kv(n,e,t){let r=null;if(typeof e=="function"||Array.isArray(e)?r=e:t===void 0&&e&&(t=e),typeof t=="string"&&(t=t.length),typeof t=="number"){let s=Math.round(t);t=s<1?void 0:s>8?{indent:8}:{indent:s}}if(n===void 0){let{keepUndefined:s}=t??e??{};if(!s)return}return Hv.isDocument(n)&&!r?n.toString(t):new Bv.Document(n,r,t).toString(t)}dr.parse=Gv;dr.parseAllDocuments=Wv;dr.parseDocument=Eg;dr.stringify=Kv});var Ag=p(ee=>{"use strict";var Yv=Ol(),Jv=sr(),Xv=cl(),Vl=ar(),zv=Bn(),It=K(),Qv=Tt(),Zv=ce(),e2=At(),t2=wt(),n2=gi(),r2=Dl(),s2=Bl(),i2=Hl(),Ti=Tg(),Sg=Mn();ee.Composer=Yv.Composer;ee.Document=Jv.Document;ee.Schema=Xv.Schema;ee.YAMLError=Vl.YAMLError;ee.YAMLParseError=Vl.YAMLParseError;ee.YAMLWarning=Vl.YAMLWarning;ee.Alias=zv.Alias;ee.isAlias=It.isAlias;ee.isCollection=It.isCollection;ee.isDocument=It.isDocument;ee.isMap=It.isMap;ee.isNode=It.isNode;ee.isPair=It.isPair;ee.isScalar=It.isScalar;ee.isSeq=It.isSeq;ee.Pair=Qv.Pair;ee.Scalar=Zv.Scalar;ee.YAMLMap=e2.YAMLMap;ee.YAMLSeq=t2.YAMLSeq;ee.CST=n2;ee.Lexer=r2.Lexer;ee.LineCounter=s2.LineCounter;ee.Parser=i2.Parser;ee.parse=Ti.parse;ee.parseAllDocuments=Ti.parseAllDocuments;ee.parseDocument=Ti.parseDocument;ee.stringify=Ti.stringify;ee.visit=Sg.visit;ee.visitAsync=Sg.visitAsync});var Lg=p((bR,h2)=>{h2.exports={name:"teamsfx-sample-validator",version:"1.0.0",description:"",main:"validator.cjs",bin:{"teamsfx-sample-validator":"validator.cjs"},scripts:{build:"esbuild src/index.ts --bundle --minify --outfile=validator.cjs --platform=node",test:"jest"},keywords:[],author:"",license:"ISC",dependencies:{chalk:"^4.1.2",commander:"^11.0.0","compare-versions":"^6.1.0",figlet:"^1.6.0","fs-extra":"^11.1.1","image-size":"^1.0.2",semver:"^7.7.2",yaml:"^2.3.1"},devDependencies:{"@types/figlet":"^1.5.6","@types/fs-extra":"^11.0.1","@types/jest":"^29.5.3","@types/mock-fs":"^4.13.1","@types/node":"^20.4.2","@types/semver":"^7.7.0",dotenv:"^16.3.1",esbuild:"^0.25.12",jest:"^29.6.1","mock-fs":"^5.2.0","ts-jest":"^29.1.1",typescript:"^5.1.6"}}});var lc=se(ac(),1),{program:w2,createCommand:L2,createArgument:I2,createOption:b2,CommanderError:v2,InvalidArgumentError:N2,InvalidOptionArgumentError:O2,Command:cc,Argument:C2,Option:R2,Help:P2}=lc.default;var ot=se(require("fs"),1),Ft=se(require("path"),1);var Xg={FULL_WIDTH:0,FITTING:1,SMUSHING:2,CONTROLLED_SMUSHING:3},Mi=class{constructor(){this.comment="",this.numChars=0,this.options={}}},qi=["1Row","3-D","3D Diagonal","3D-ASCII","3x5","4Max","5 Line Oblique","AMC 3 Line","AMC 3 Liv1","AMC AAA01","AMC Neko","AMC Razor","AMC Razor2","AMC Slash","AMC Slider","AMC Thin","AMC Tubes","AMC Untitled","ANSI Compact","ANSI Regular","ANSI Shadow","ASCII 12","ASCII 9","ASCII New Roman","Acrobatic","Alligator","Alligator2","Alpha","Alphabet","Arrows","Avatar","B1FF","Babyface Lame","Babyface Leet","Banner","Banner3-D","Banner3","Banner4","Barbwire","Basic","Bear","Bell","Benjamin","Big ASCII 12","Big ASCII 9","Big Chief","Big Money-ne","Big Money-nw","Big Money-se","Big Money-sw","Big Mono 12","Big Mono 9","Big","Bigfig","Binary","Block","Blocks","Bloody","BlurVision ASCII","Bolger","Braced","Bright","Broadway KB","Broadway","Bubble","Bulbhead","Caligraphy","Caligraphy2","Calvin S","Cards","Catwalk","Chiseled","Chunky","Circle","Classy","Coder Mini","Coinstak","Cola","Colossal","Computer","Contessa","Contrast","Cosmike","Cosmike2","Crawford","Crawford2","Crazy","Cricket","Cursive","Cyberlarge","Cybermedium","Cybersmall","Cygnet","DANC4","DOS Rebel","DWhistled","Dancing Font","Decimal","Def Leppard","Delta Corps Priest 1","DiamFont","Diamond","Diet Cola","Digital","Doh","Doom","Dot Matrix","Double Shorts","Double","Dr Pepper","Efti Chess","Efti Font","Efti Italic","Efti Piti","Efti Robot","Efti Wall","Efti Water","Electronic","Elite","Emboss 2","Emboss","Epic","Fender","Filter","Fire Font-k","Fire Font-s","Flipped","Flower Power","Font Font","Four Tops","Fraktur","Fun Face","Fun Faces","Future","Fuzzy","Georgi16","Georgia11","Ghost","Ghoulish","Glenyn","Goofy","Gothic","Graceful","Gradient","Graffiti","Greek","Heart Left","Heart Right","Henry 3D","Hex","Hieroglyphs","Hollywood","Horizontal Left","Horizontal Right","ICL-1900","Impossible","Invita","Isometric1","Isometric2","Isometric3","Isometric4","Italic","Ivrit","JS Block Letters","JS Bracket Letters","JS Capital Curves","JS Cursive","JS Stick Letters","Jacky","Jazmine","Jerusalem","Katakana","Kban","Keyboard","Knob","Konto Slant","Konto","LCD","Larry 3D 2","Larry 3D","Lean","Letter","Letters","Lil Devil","Line Blocks","Linux","Lockergnome","Madrid","Marquee","Maxfour","Merlin1","Merlin2","Mike","Mini","Mirror","Mnemonic","Modular","Mono 12","Mono 9","Morse","Morse2","Moscow","Mshebrew210","Muzzle","NScript","NT Greek","NV Script","Nancyj-Fancy","Nancyj-Improved","Nancyj-Underlined","Nancyj","Nipples","O8","OS2","Octal","Ogre","Old Banner","Pagga","Patorjk's Cheese","Patorjk-HeX","Pawp","Peaks Slant","Peaks","Pebbles","Pepper","Poison","Puffy","Puzzle","Pyramid","Rammstein","Rebel","Rectangles","Red Phoenix","Relief","Relief2","Reverse","Roman","Rot13","Rotated","Rounded","Rowan Cap","Rozzo","RubiFont","Runic","Runyc","S Blood","SL Script","Santa Clara","Script","Serifcap","Shaded Blocky","Shadow","Shimrod","Short","Slant Relief","Slant","Slide","Small ASCII 12","Small ASCII 9","Small Block","Small Braille","Small Caps","Small Isometric1","Small Keyboard","Small Mono 12","Small Mono 9","Small Poison","Small Script","Small Shadow","Small Slant","Small Tengwar","Small","Soft","Speed","Spliff","Stacey","Stampate","Stampatello","Standard","Star Strips","Star Wars","Stellar","Stforek","Stick Letters","Stop","Straight","Stronger Than All","Sub-Zero","Swamp Land","Swan","Sweet","THIS","Tanja","Tengwar","Term","Terrace","Test1","The Edge","Thick","Thin","Thorned","Three Point","Ticks Slant","Ticks","Tiles","Tinker-Toy","Tmplr","Tombstone","Train","Trek","Tsalagi","Tubular","Twisted","Two Point","USA Flag","Univers","Upside Down Text","Varsity","Wavescape","Wavy","Weird","Wet Letter","Whimsy","WideTerm","Wow","miniwi"],uc={"ANSI-Compact":"ANSI Compact"},it=n=>uc[n]?uc[n]:n;function zg(n){return/[.*+?^${}()|[\]\\]/.test(n)?"\\"+n:n}var fc=(()=>{let{FULL_WIDTH:n=0,FITTING:e,SMUSHING:t,CONTROLLED_SMUSHING:r}=Xg,s={},i={font:"Standard",fontPath:"./fonts",fetchFontIfMissing:!0};function o(T,A,g){let E=zg(T.trim().slice(-1))||"@",L=A===g-1?new RegExp(E+E+"?\\s*$"):new RegExp(E+"\\s*$");return T.replace(L,"")}function a(T=-1,A=null){let g={},E,L=[[16384,"vLayout",t],[8192,"vLayout",e],[4096,"vRule5",!0],[2048,"vRule4",!0],[1024,"vRule3",!0],[512,"vRule2",!0],[256,"vRule1",!0],[128,"hLayout",t],[64,"hLayout",e],[32,"hRule6",!0],[16,"hRule5",!0],[8,"hRule4",!0],[4,"hRule3",!0],[2,"hRule2",!0],[1,"hRule1",!0]];E=A!==null?A:T;for(let[b,v,N]of L)E>=b?(E-=b,g[v]===void 0&&(g[v]=N)):v!=="vLayout"&&v!=="hLayout"&&(g[v]=!1);return typeof g.hLayout>"u"?T===0?g.hLayout=e:T===-1?g.hLayout=n:g.hRule1||g.hRule2||g.hRule3||g.hRule4||g.hRule5||g.hRule6?g.hLayout=r:g.hLayout=t:g.hLayout===t&&(g.hRule1||g.hRule2||g.hRule3||g.hRule4||g.hRule5||g.hRule6)&&(g.hLayout=r),typeof g.vLayout>"u"?g.vRule1||g.vRule2||g.vRule3||g.vRule4||g.vRule5?g.vLayout=r:g.vLayout=n:g.vLayout===t&&(g.vRule1||g.vRule2||g.vRule3||g.vRule4||g.vRule5)&&(g.vLayout=r),g}function l(T,A,g=""){return T===A&&T!==g?T:!1}function c(T,A){let g="|/\\[]{}()<>";if(T==="_"){if(g.indexOf(A)!==-1)return A}else if(A==="_"&&g.indexOf(T)!==-1)return T;return!1}function u(T,A){let g="| /\\ [] {} () <>",E=g.indexOf(T),L=g.indexOf(A);if(E!==-1&&L!==-1&&E!==L&&Math.abs(E-L)!==1){let b=Math.max(E,L),v=b+1;return g.substring(b,v)}return!1}function f(T,A){let g="[] {} ()",E=g.indexOf(T),L=g.indexOf(A);return E!==-1&&L!==-1&&Math.abs(E-L)<=1?"|":!1}function h(T,A){return{"/\\":"|","\\/":"Y","><":"X"}[T+A]||!1}function d(T,A,g=""){return T===g&&A===g?g:!1}function y(T,A){return T===A?T:!1}function m(T,A){return c(T,A)}function _(T,A){return u(T,A)}function S(T,A){return T==="-"&&A==="_"||T==="_"&&A==="-"?"=":!1}function w(T,A){return T==="|"&&A==="|"?"|":!1}function I(T,A,g){return A===" "||A===""||A===g&&T!==" "?T:A}function x(T,A,g){if(g.fittingRules&&g.fittingRules.vLayout===n)return"invalid";let E,L=Math.min(T.length,A.length),b,v,N=!1,O;if(L===0)return"invalid";for(E=0;E<L;E++)if(b=T.substring(E,E+1),v=A.substring(E,E+1),b!==" "&&v!==" "){if(g.fittingRules&&g.fittingRules.vLayout===e)return"invalid";if(g.fittingRules&&g.fittingRules.vLayout===t)return"end";if(w(b,v)){N=N||!1;continue}if(O=!1,O=g.fittingRules&&g.fittingRules.vRule1?y(b,v):O,O=!O&&g.fittingRules&&g.fittingRules.vRule2?m(b,v):O,O=!O&&g.fittingRules&&g.fittingRules.vRule3?_(b,v):O,O=!O&&g.fittingRules&&g.fittingRules.vRule4?S(b,v):O,N=!0,!O)return"invalid"}return N?"end":"valid"}function q(T,A,g){let E=T.length,L=T.length,b,v,N,O=1,F,V,U;for(;O<=E;){for(b=T.slice(Math.max(0,L-O),L),v=A.slice(0,Math.min(E,O)),N=v.length,U="",F=0;F<N;F++)if(V=x(b[F],v[F],g),V==="end")U=V;else if(V==="invalid"){U=V;break}else U===""&&(U="valid");if(U==="invalid"){O--;break}if(U==="end")break;U==="valid"&&O++}return Math.min(E,O)}function M(T,A,g){let E,L=Math.min(T.length,A.length),b,v,N="",O,F=g.fittingRules||{};for(E=0;E<L;E++)b=T.substring(E,E+1),v=A.substring(E,E+1),b!==" "&&v!==" "?F.vLayout===e||F.vLayout===t?N+=I(b,v):(O=!1,O=F.vRule5?w(b,v):O,O=!O&&F.vRule1?y(b,v):O,O=!O&&F.vRule2?m(b,v):O,O=!O&&F.vRule3?_(b,v):O,O=!O&&F.vRule4?S(b,v):O,N+=O):N+=I(b,v);return N}function Y(T,A,g,E){let L=T.length,b=A.length,v=T.slice(0,Math.max(0,L-g)),N=T.slice(Math.max(0,L-g),L),O=A.slice(0,Math.min(g,b)),F,V,U,W=[],G;for(V=N.length,F=0;F<V;F++)F>=b?U=N[F]:U=M(N[F],O[F],E),W.push(U);return G=A.slice(Math.min(g,b),b),[...v,...W,...G]}function R(T,A){let g=" ".repeat(A);return T.map(E=>E+g)}function C(T,A,g){let E=T[0].length,L=A[0].length,b;return E>L?A=R(A,E-L):L>E&&(T=R(T,L-E)),b=q(T,A,g),Y(T,A,b,g)}function B(T,A,g){let E=g.fittingRules||{};if(E.hLayout===n)return 0;let L,b=T.length,v=A.length,N=b,O=1,F=!1,V,U,W,G;if(b===0)return 0;e:for(;O<=N;){let De=b-O;for(V=T.substring(De,De+O),U=A.substring(0,Math.min(O,v)),L=0;L<Math.min(O,v);L++)if(W=V.substring(L,L+1),G=U.substring(L,L+1),W!==" "&&G!==" "){if(E.hLayout===e){O=O-1;break e}else if(E.hLayout===t){(W===g.hardBlank||G===g.hardBlank)&&(O=O-1);break e}else if(F=!0,!(E.hRule1&&l(W,G,g.hardBlank)||E.hRule2&&c(W,G)||E.hRule3&&u(W,G)||E.hRule4&&f(W,G)||E.hRule5&&h(W,G)||E.hRule6&&d(W,G,g.hardBlank))){O=O-1;break e}}if(F)break;O++}return Math.min(N,O)}function j(T,A,g,E){let L,b,v=[],N,O,F,V,U,W,G,De,Ne=E.fittingRules||{};if(typeof E.height!="number")throw new Error("height is not defined.");for(L=0;L<E.height;L++){G=T[L],De=A[L],U=G.length,W=De.length,N=U-g,O=G.slice(0,Math.max(0,N)),F="";let fn=Math.max(0,U-g),je=G.substring(fn,fn+g),bt=De.substring(0,Math.min(g,W));for(b=0;b<g;b++){let $e=b<U?je.substring(b,b+1):" ",Oe=b<W?bt.substring(b,b+1):" ";if($e!==" "&&Oe!==" ")if(Ne.hLayout===e||Ne.hLayout===t)F+=I($e,Oe,E.hardBlank);else{let bg=Ne.hRule1&&l($e,Oe,E.hardBlank)||Ne.hRule2&&c($e,Oe)||Ne.hRule3&&u($e,Oe)||Ne.hRule4&&f($e,Oe)||Ne.hRule5&&h($e,Oe)||Ne.hRule6&&d($e,Oe,E.hardBlank)||I($e,Oe,E.hardBlank);F+=bg}else F+=I($e,Oe,E.hardBlank)}g>=W?V="":V=De.substring(g,g+Math.max(0,W-g)),v[L]=O+F+V}return v}function D(T){return new Array(T).fill("")}let X=function(T){return Math.max(...T.map(A=>A.length))};function te(T,A,g){return T.reduce(function(E,L){return j(E,L.fig,L.overlap||0,g)},D(A))}function z(T,A,g){for(let E=T.length-1;E>0;E--){let L=te(T.slice(0,E),A,g);if(X(L)<=g.width)return{outputFigText:L,chars:T.slice(E)}}return{outputFigText:D(A),chars:T}}function J(T,A,g){let E,L,b=0,v,N,O,F=g.height,V=[],U,W={chars:[],overlap:b},G=[],De,Ne,fn,je,bt;if(typeof F!="number")throw new Error("height is not defined.");N=D(F);let $e=g.fittingRules||{};for(g.printDirection===1&&(T=T.split("").reverse().join("")),O=T.length,E=0;E<O;E++)if(De=T.substring(E,E+1),Ne=De.match(/\s/),L=A[De.charCodeAt(0)],je=null,L){if($e.hLayout!==n){for(b=1e4,v=0;v<F;v++)b=Math.min(b,B(N[v],L[v],g));b=b===1e4?0:b}if(g.width>0&&(g.whitespaceBreak?(fn=te(W.chars.concat([{fig:L,overlap:b}]),F,g),je=te(G.concat([{fig:fn,overlap:W.overlap}]),F,g),U=X(je)):(je=j(N,L,b,g),U=X(je)),U>=g.width&&E>0&&(g.whitespaceBreak?(N=te(G.slice(0,-1),F,g),G.length>1&&(V.push(N),N=D(F)),G=[]):(V.push(N),N=D(F)))),g.width>0&&g.whitespaceBreak&&((!Ne||E===O-1)&&W.chars.push({fig:L,overlap:b}),Ne||E===O-1)){for(bt=null;je=te(W.chars,F,g),U=X(je),U>=g.width;)bt=z(W.chars,F,g),W={chars:bt.chars},V.push(bt.outputFigText);U>0&&(bt?G.push({fig:je,overlap:1}):G.push({fig:je,overlap:W.overlap})),Ne&&(G.push({fig:L,overlap:b}),N=D(F)),E===O-1&&(N=te(G,F,g)),W={chars:[],overlap:b};continue}N=j(N,L,b,g)}return X(N)>0&&V.push(N),g.showHardBlanks||V.forEach(function(Oe){for(O=Oe.length,v=0;v<O;v++)Oe[v]=Oe[v].replace(new RegExp("\\"+g.hardBlank,"g")," ")}),T===""&&V.length===0&&V.push(new Array(F).fill("")),V}let Q=function(T,A){let g,E=A.fittingRules||{};if(T==="default")g={hLayout:E.hLayout,hRule1:E.hRule1,hRule2:E.hRule2,hRule3:E.hRule3,hRule4:E.hRule4,hRule5:E.hRule5,hRule6:E.hRule6};else if(T==="full")g={hLayout:n,hRule1:!1,hRule2:!1,hRule3:!1,hRule4:!1,hRule5:!1,hRule6:!1};else if(T==="fitted")g={hLayout:e,hRule1:!1,hRule2:!1,hRule3:!1,hRule4:!1,hRule5:!1,hRule6:!1};else if(T==="controlled smushing")g={hLayout:r,hRule1:!0,hRule2:!0,hRule3:!0,hRule4:!0,hRule5:!0,hRule6:!0};else if(T==="universal smushing")g={hLayout:t,hRule1:!1,hRule2:!1,hRule3:!1,hRule4:!1,hRule5:!1,hRule6:!1};else return;return g},ue=function(T,A){let g={},E=A.fittingRules||{};if(T==="default")g={vLayout:E.vLayout,vRule1:E.vRule1,vRule2:E.vRule2,vRule3:E.vRule3,vRule4:E.vRule4,vRule5:E.vRule5};else if(T==="full")g={vLayout:n,vRule1:!1,vRule2:!1,vRule3:!1,vRule4:!1,vRule5:!1};else if(T==="fitted")g={vLayout:e,vRule1:!1,vRule2:!1,vRule3:!1,vRule4:!1,vRule5:!1};else if(T==="controlled smushing")g={vLayout:r,vRule1:!0,vRule2:!0,vRule3:!0,vRule4:!0,vRule5:!0};else if(T==="universal smushing")g={vLayout:t,vRule1:!1,vRule2:!1,vRule3:!1,vRule4:!1,vRule5:!1};else return;return g},ne=function(T,A,g){g=g.replace(/\r\n/g,`
`).replace(/\r/g,`
`);let E=it(T),L=g.split(`
`),b=[],v,N,O;for(N=L.length,v=0;v<N;v++)b=b.concat(J(L[v],s[E],A));for(N=b.length,O=b[0],v=1;v<N;v++)O=C(O,b[v],A);return O?O.join(`
`):""};function Ai(T,A){let g;if(typeof structuredClone<"u"?g=structuredClone(T):g=JSON.parse(JSON.stringify(T)),g.showHardBlanks=A.showHardBlanks||!1,g.width=A.width||-1,g.whitespaceBreak=A.whitespaceBreak||!1,A.horizontalLayout){let E=Q(A.horizontalLayout,T);E&&Object.assign(g.fittingRules,E)}if(A.verticalLayout){let E=ue(A.verticalLayout,T);E&&Object.assign(g.fittingRules,E)}return g.printDirection=A.printDirection!==null&&A.printDirection!==void 0?A.printDirection:T.printDirection,g}let le=async function(T,A,g){return le.text(T,A,g)};return le.text=async function(T,A,g){T=T+"";let E,L;typeof A=="function"?(L=A,E={font:i.font}):typeof A=="string"?(E={font:A},L=g):A?(E=A,L=g):(E={font:i.font},L=g);let b=E.font||i.font;try{let v=await le.loadFont(b),N=v?ne(b,Ai(v,E),T):"";return L&&L(null,N),N}catch(v){let N=v instanceof Error?v:new Error(String(v));if(L)return L(N),"";throw N}},le.textSync=function(T,A){T=T+"",typeof A=="string"?A={font:A}:A=A||{};let g=A.font||i.font,E=Ai(le.loadFontSync(g),A);return ne(g,E,T)},le.metadata=async function(T,A){T=T+"";try{let g=await le.loadFont(T);if(!g)throw new Error("Error loading font.");let E=it(T),L=s[E]||{},b=[g,L.comment||""];return A&&A(null,g,L.comment),b}catch(g){let E=g instanceof Error?g:new Error(String(g));if(A)return A(E),null;throw E}},le.defaults=function(T){return T&&typeof T=="object"&&Object.assign(i,T),typeof structuredClone<"u"?structuredClone(i):JSON.parse(JSON.stringify(i))},le.parseFont=function(T,A,g=!0){if(s[T]&&!g)return s[T].options;A=A.replace(/\r\n/g,`
`).replace(/\r/g,`
`);let E=new Mi,L=A.split(`
`),b=L.shift();if(!b)throw new Error("Invalid font file: missing header");let v=b.split(" "),N={hardBlank:v[0].substring(5,6),height:parseInt(v[1],10),baseline:parseInt(v[2],10),maxLength:parseInt(v[3],10),oldLayout:parseInt(v[4],10),numCommentLines:parseInt(v[5],10),printDirection:v[6]?parseInt(v[6],10):0,fullLayout:v[7]?parseInt(v[7],10):null,codeTagCount:v[8]?parseInt(v[8],10):null};if((N.hardBlank||"").length!==1||[N.height,N.baseline,N.maxLength,N.oldLayout,N.numCommentLines].some(V=>V==null||isNaN(V)))throw new Error("FIGlet header contains invalid values.");if(N.height==null||N.numCommentLines==null)throw new Error("FIGlet header contains invalid values.");N.fittingRules=a(N.oldLayout,N.fullLayout),E.options=N;let F=[];for(let V=32;V<=126;V++)F.push(V);if(F.push(196,214,220,228,246,252,223),L.length<N.numCommentLines+N.height*F.length)throw new Error(`FIGlet file is missing data. Line length: ${L.length}. Comment lines: ${N.numCommentLines}. Height: ${N.height}. Num chars: ${F.length}.`);for(E.comment=L.splice(0,N.numCommentLines).join(`
`),E.numChars=0;L.length>0&&E.numChars<F.length;){let V=F[E.numChars];E[V]=L.splice(0,N.height);for(let U=0;U<N.height;U++)typeof E[V][U]>"u"?E[V][U]="":E[V][U]=o(E[V][U],U,N.height);E.numChars++}for(;L.length>0;){let V=L.shift();if(!V||V.trim()==="")break;let U=V.split(" ")[0],W;if(/^-?0[xX][0-9a-fA-F]+$/.test(U))W=parseInt(U,16);else if(/^-?0[0-7]+$/.test(U))W=parseInt(U,8);else if(/^-?[0-9]+$/.test(U))W=parseInt(U,10);else throw new Error(`Error parsing data. Invalid data: ${U}`);if(W===-1||W<-2147483648||W>2147483647){let G=W===-1?"The char code -1 is not permitted.":`The char code cannot be ${W<-2147483648?"less than -2147483648":"greater than 2147483647"}.`;throw new Error(`Error parsing data. ${G}`)}E[W]=L.splice(0,N.height);for(let G=0;G<N.height;G++)typeof E[W][G]>"u"?E[W][G]="":E[W][G]=o(E[W][G],G,N.height);E.numChars++}return s[T]=E,N},le.loadedFonts=()=>Object.keys(s),le.clearLoadedFonts=()=>{Object.keys(s).forEach(T=>{delete s[T]})},le.loadFont=async function(T,A){let g=it(T);if(s[g]){let E=s[g].options;return A&&A(null,E),Promise.resolve(E)}try{if(!i.fetchFontIfMissing)throw new Error(`Font is not loaded: ${g}`);let E=await fetch(`${i.fontPath}/${g}.flf`);if(!E.ok)throw new Error(`Network response was not ok: ${E.status}`);let L=await E.text(),b=le.parseFont(g,L);return A&&A(null,b),b}catch(E){let L=E instanceof Error?E:new Error(String(E));if(A)return A(L),null;throw L}},le.loadFontSync=function(T){let A=it(T);if(s[A])return s[A].options;throw new Error("Synchronous font loading is not implemented for the browser, it will only work for fonts already loaded.")},le.preloadFonts=async function(T,A){try{for(let g of T){let E=it(g),L=await fetch(`${i.fontPath}/${E}.flf`);if(!L.ok)throw new Error(`Failed to preload fonts. Error fetching font: ${E}, status code: ${L.statusText}`);let b=await L.text();le.parseFont(E,b)}A&&A()}catch(g){let E=g instanceof Error?g:new Error(String(g));if(A){A(E);return}throw g}},le.fonts=function(T){return new Promise(function(A,g){A(qi),T&&T(null,qi)})},le.fontsSync=function(){return qi},le.figFonts=s,le})();var hc=require("url"),t0={},Qg=(0,hc.fileURLToPath)(t0.url),Zg=Ft.dirname(Qg),e0=Ft.join(Zg,"/../fonts/"),ye=fc;ye.defaults({fontPath:e0});ye.loadFont=function(n,e){let t=it(n);return new Promise((r,s)=>{if(ye.figFonts[t]){e&&e(null,ye.figFonts[t].options),r(ye.figFonts[t].options);return}ot.readFile(Ft.join(ye.defaults().fontPath,t+".flf"),{encoding:"utf-8"},(i,o)=>{if(i){e&&e(i),s(i);return}o=o+"";try{let a=ye.parseFont(t,o);e&&e(null,a),r(a)}catch(a){let l=a instanceof Error?a:new Error(String(a));e&&e(l),s(l)}})})};ye.loadFontSync=function(n){let e=it(n);if(ye.figFonts[e])return ye.figFonts[e].options;let t=ot.readFileSync(Ft.join(ye.defaults().fontPath,e+".flf"),{encoding:"utf-8"})+"";return ye.parseFont(e,t)};ye.fonts=function(n){return new Promise((e,t)=>{let r=[];ot.readdir(ye.defaults().fontPath,(s,i)=>{if(s){n&&n(s),t(s);return}i.forEach(o=>{/\.flf$/.test(o)&&r.push(o.replace(/\.flf$/,""))}),n&&n(null,r),e(r)})})};ye.fontsSync=function(){let n=[];return ot.readdirSync(ye.defaults().fontPath).forEach(e=>{/\.flf$/.test(e)&&n.push(e.replace(/\.flf$/,""))}),n};var dc=`flf2a$ 6 5 16 15 13 0 24463 229
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
         `;var wr=se(Gc()),b0=wr.default.green,v0=wr.default.yellow,N0=wr.default.bold.red;function Kc(n){let e=b0(`${n.passed.length} validation passed`),t=N0(`${n.failed.length} validation failed`),r=n.warning.length>0?v0(`${n.warning.length} warning(s)`):void 0;n.failed.length===0?console.log(`\u2705[${n.name}] ${e}${r?`, ${r}`:""}.`):(console.log(`\u274C[${n.name}] ${t}${r?`, ${r}`:""}, ${e}.`),console.log(n.failed.map(s=>`  \u274C ${s}`).join(`
`))),n.warning.length>0&&console.log(n.warning.map(s=>`  \u26A0\uFE0F ${s}`).join(`
`)),n.passed.length>0&&console.log(n.passed.map(s=>`  \u2705 ${s}`).join(`
`))}var Qf=se(Zc()),uo=se(ht()),fo=se(require("path"));var Ot=se(ht()),Yt=se(require("path"));function Xf(n){let e=[],t=process.env.SAMPLE_VALIDATOR_CONFIG_PATH;return t&&Ot.default.existsSync(t)&&e.push(t),e.push(Yt.default.join(n,"..",".config","samples-config-v3.json"),Yt.default.join(n,".config","samples-config-v3.json")),e}function Jt(n){let e=process.env.SAMPLE_VALIDATOR_EXPECTED_ID;return e||Yt.default.basename(n)}async function zf(n){let e=Jt(n),t=Xf(n);for(let r of t)if(await Ot.default.exists(r))try{let i=(await Ot.default.readJson(r)).samples.find(o=>o.id===e);if(i)return{thumbnailPath:i.thumbnailPath,gifPath:i.gifPath}}catch{}return{}}async function WE(n){let e=Jt(n),t=Xf(n);for(let r of t)if(await Ot.default.exists(r))try{let i=(await Ot.default.readJson(r)).samples.find(o=>o.id===e);if(i&&i.tags)return i.tags.includes("C#")}catch{}return!1}async function Ke(n){let e=await WE(n),t=Yt.default.join(n,"M365Agent"),r=Yt.default.join(t,"m365agents.yml"),s=await Ot.default.exists(r);return e||s?{projectType:"csharp",rootDir:n,agentDir:s?t:n,displayPrefix:s?"M365Agent/":""}:{projectType:"typescript",rootDir:n,agentDir:n,displayPrefix:""}}async function ho(n){let e={name:"Env Files",passed:[],failed:[],warning:[]},t=await Ke(n),{agentDir:r,displayPrefix:s,projectType:i}=t,o=[".env.dev",".env.local"],a=!1;for(let l of o){let c=fo.default.join(r,"env",l);if(!await uo.default.exists(c)){if(i==="csharp")continue;e.warning.push(`${s}${fo.default.join("env",l)} does not exist.`);continue}a=!0;let u=await uo.default.readFile(c,"utf8"),f=Qf.default.parse(u),h=Object.entries(f).map(([y,m])=>({name:y,value:m})),d=!0;for(let y of h)y.name==="TEAMSFX_ENV"||y.name==="APP_NAME_SUFFIX"||y.name==="TEAMS_APP_NAME"||y.name.startsWith("connectionsMap__0")||y.name.startsWith("agentic_")||y.value!==""&&(e.failed.push(`${s}${l}: ${y.name} should NOT have value.`),d=!1);d&&e.passed.push(`${s}${l}: All environment variables are valid.`)}return i==="csharp"&&!a&&e.passed.push("C# project does not require env files."),e}var dt=se(ht()),Ln=se(require("path"));var GE=["appPackage"],KE=["appPackage/manifest.json","appPackage/color.png","appPackage/outline.png","m365agents.yml","m365agents.local.yml"],YE=["README.md"],JE=["env/.env.dev"],XE=["env",".vscode"];async function po(n,e){let t=Ln.default.join(n,e);return await dt.default.exists(t)?(await dt.default.stat(t)).isDirectory():!1}async function Xt(n,e){let t=Ln.default.join(n,e);return await dt.default.exists(t)?(await dt.default.stat(t)).isFile():!1}async function xr(n,e){return await dt.default.exists(n)?(await dt.default.readdir(n)).filter(r=>r.endsWith(e)):[]}async function _o(n){let e={name:"Folder Structure",passed:[],failed:[],warning:[]},t=await Ke(n),{agentDir:r,rootDir:s,displayPrefix:i,projectType:o}=t;for(let a of GE){let l=i+a;await po(r,a)?e.passed.push(`Project has "${l}" folder.`):e.failed.push(`Project should have "${l}" folder.`)}for(let a of XE){let l=await po(r,a),c=await po(s,a);if(l||c){let u=l?i+a:a;e.passed.push(`Project has "${u}" folder.`)}else o==="typescript"&&e.failed.push(`Project should have "${a}" folder.`)}for(let a of KE){let l=i+a;await Xt(r,a)?e.passed.push(`Project has "${l}" file.`):e.failed.push(`Project should have "${l}" file.`)}for(let a of YE)await Xt(s,a)?e.passed.push(`Project has "${a}" file.`):e.failed.push(`Project should have "${a}" file.`);for(let a of JE){let l=await Xt(r,a),c=await Xt(s,a);if(l||c){let u=l?i+a:a;e.passed.push(`Project has "${u}" file.`)}else o==="typescript"&&e.failed.push(`Project should have "${a}" file.`)}if(o==="csharp"){let a=await xr(s,".sln"),l=await xr(s,".slnx");if(a.length>0||l.length>0){let m=a.length>0?a[0]:l[0];e.passed.push(`Project has solution file "${m}".`)}else e.failed.push("C# project should have a .sln or .slnx solution file.");let c=await xr(s,".csproj"),u=c.length>0,f=c.length>0?c[0]:"",h=["M365Agent","TravelAgent","AzureAgentToM365ATK"];for(let m of h){let _=Ln.default.join(s,m);if(await dt.default.exists(_)){let S=await xr(_,".csproj");if(S.length>0){u=!0,f=`${m}/${S[0]}`;break}}}u?e.passed.push(`Project has .csproj file "${f}".`):e.failed.push("C# project should have a .csproj project file.");let d=await Xt(s,"appsettings.json"),y="appsettings.json";if(!d)for(let m of h){let _=Ln.default.join(s,m);if(await Xt(_,"appsettings.json")){d=!0,y=`${m}/appsettings.json`;break}}d?e.passed.push(`Project has "${y}" file.`):e.failed.push("C# project should have an appsettings.json file.")}return e}var vn=se(ht()),Nn=se(require("path")),On=se(Dh());function MT(n){return Jt(n).endsWith("-codespaces")}async function Do(n){let e={name:"Image Files",passed:[],failed:[],warning:[]},t=MT(n),r=await zf(n);if(t)e.passed.push("Thumbnail validation skipped for codespaces sample (not in samples-config-v3.json).");else if(r.thumbnailPath){let s=Nn.default.join(n,r.thumbnailPath);if(await vn.default.exists(s)){let i=(0,On.default)(s);i.width&&i.height&&i.width/i.height===40/23?e.passed.push(`${r.thumbnailPath} has 1600*920/800*460 resolution or same ratio.`):e.failed.push(`${r.thumbnailPath} must have 1600*920/800*460 resolution or same ratio (40:23 aspect ratio). Current: ${i.width}x${i.height}.`)}else e.failed.push(`${r.thumbnailPath} is required to display in sample gallery but does not exist.`)}else{let s=["png","jpg","jpeg"],i=!1;for(let o of s){let a=Nn.default.join(n,"assets",`thumbnail.${o}`);if(await vn.default.exists(a)){i=!0;let l=(0,On.default)(a);l.width&&l.height&&l.width/l.height===40/23?e.passed.push(`assets/thumbnail.${o} has 1600*920/800*460 resolution or same ratio.`):e.failed.push(`assets/thumbnail.${o} must have 1600*920/800*460 resolution or same ratio (40:23 aspect ratio). Current: ${l.width}x${l.height}.`);break}}i||e.failed.push("Thumbnail image is required to display in sample gallery. Please add thumbnailPath to samples-config-v3.json or add assets/thumbnail.png.")}if(r.gifPath){let s=Nn.default.join(n,r.gifPath);if(await vn.default.exists(s)){let i=(0,On.default)(s);i.width&&i.height&&i.width/i.height===40/23?e.passed.push(`${r.gifPath} has 1600*920/800*460 resolution or same ratio.`):e.warning.push(`${r.gifPath} does not have 40:23 aspect ratio. Current: ${i.width}x${i.height}. (Optional)`)}else e.warning.push(`${r.gifPath} does not exist. (Optional)`)}else{let s=Nn.default.join(n,"assets","sampleDemo.gif");if(await vn.default.exists(s)){let i=(0,On.default)(s);i.width&&i.height&&i.width/i.height===40/23?e.passed.push("assets/sampleDemo.gif has 1600*920/800*460 resolution or same ratio."):e.warning.push(`assets/sampleDemo.gif does not have 40:23 aspect ratio. Current: ${i.width}x${i.height}. (Optional)`)}else e.warning.push("Sample demo gif does not exist. (Optional)")}return e}var Uh=se(Bh()),jo=se(ht()),Hh=se(require("path"));async function Bo(n){let e={name:"package.json",passed:[],failed:[],warning:[]},t=await Ke(n),{projectType:r}=t,s=Hh.default.join(n,"package.json");if(!await jo.default.exists(s))return r==="csharp"?(e.passed=["C# project does not require package.json."],e):(e.failed=["package.json does not exist."],e);let i=await jo.default.readFile(s,"utf8");try{let o=JSON.parse(i);if(!o.engines||!o.engines.node)return e.warning=["package.json does not have 'engines.node' field."],e;if(!(0,Uh.satisfies)("22.0.0",o.engines.node))return e.warning=["'engines.node' field should be compatible with 22."],e}catch{return e.failed=["package.json is not a valid JSON file."],e}return e.passed=["'engines.node' field is compatible with 22."],e}var la=se(ht()),$p=se(require("path")),ca=se(aa());var Pp="1.22.0",kp="devPreview";async function ua(n){let e={name:"App Manifest",passed:[],failed:[],warning:[]},t=await Ke(n),{agentDir:r,displayPrefix:s}=t,i=$p.default.join(r,"appPackage","manifest.json");if(!await la.default.exists(i))return e.failed=[`${s}appPackage/manifest.json does not exist.`],e;let o=await la.default.readFile(i,"utf8"),a;try{a=JSON.parse(o)}catch{}if(!a)return e.failed.push("appPackage/manifest.json is not a valid JSON file."),e;let l=a.id;if(!l||l!=="${{TEAMS_APP_ID}}"?e.failed.push("id should be equal to '${{TEAMS_APP_ID}}'."):e.passed.push("id is referencing placeholder from env: ${{TEAMS_APP_ID}}."),a.manifestVersion===kp)e.warning.push(`Manifest version(${kp}) is using preview version.`);else{let c=ca.default.coerce(a.manifestVersion);c&&ca.default.eq(c,Pp)?e.passed.push("Manifest version is aligned with Microsoft 365 Agents Toolkit."):e.warning.push(`Manifest version(${a.manifestVersion}) is NOT aligned with Microsoft 365 Agents Toolkit(${Pp}).`)}return e}var un=se(ht()),Si=se(require("path")),wg=se(Ag()),Wl=se(aa());var o2={"bot-sso-docker":"sso-bot-docker","NPM-search-connector-M365":"npm-search-connector-M365","sso-enabled-tab-via-apim-proxy":"sso-tab-via-apim-proxy","hello-world-tab-docker":"hello-world-tab-with-backend","copilot-connector-app":"graph-connector-app","graph-rsc-helper":"graph-rsc-nodeJs"};function a2(n){let e=[],t=process.env.SAMPLE_VALIDATOR_CONFIG_PATH;return t&&un.default.existsSync(t)&&e.push(t),e.push(Si.default.join(n,"..",".config","samples-config-v3.json"),Si.default.join(n,".config","samples-config-v3.json")),e}async function l2(n){let e=Jt(n),t=a2(n);for(let r of t)if(await un.default.exists(r))try{let i=(await un.default.readJson(r)).samples.find(o=>o.id===e);if(i)return i.id}catch{}return null}var c2=[{name:"provision",actions:["teamsApp/create"],required:!0},{name:"deploy",actions:[],required:!0}],u2=[{name:"publish",actions:["teamsApp/publishAppPackage"]}],f2="1.2.0";async function Gl(n){let e={name:"teamsapp.yaml",passed:[],failed:[],warning:[]},t=await Ke(n),{agentDir:r,displayPrefix:s}=t,i=Si.default.join(r,"m365agents.yml");if(!await un.default.exists(i))return e.failed=[`${s}m365agents.yml does not exist.`],e;let o=await un.default.readFile(i,"utf8"),a=wg.default.parse(o),l=a&&a.projectId;l&&l!==""?e.failed.push("Project should NOT have projectId in m365agents.yml."):e.passed.push("Project has no projectId in m365agents.yml.");let c=a?.version;if(c){let y=c.match(/^v?(\d+)(?:\.(\d+))?/);if(y){let m=y[1],_=y[2]||"0",S=`${m}.${_}.0`,w=Wl.default.coerce(S);w&&Wl.default.gte(w,f2)?e.passed.push(`Version (${c}) supports sampleTag (>= v1.2).`):e.failed.push(`Version (${c}) must be >= v1.2 to support sampleTag.`)}else e.failed.push(`Version (${c}) is not a valid version format.`)}else e.failed.push("Project should have version field in m365agents.yml.");for(let y of c2){let m=a[y.name],_=[];if(!m){e.failed.push(`Project should have '${y.name}' stage in m365agents.yml.`);continue}for(let S of y.actions)if(m&&m.findIndex(w=>w.uses===S)<0&&_.push(`Project should have '${S}' action in ${y.name} stage.`),y.name==="provision"&&S==="teamsApp/create"){let w=m.findIndex(I=>I.uses===S);w>=0&&(m[w].writeToEnvironmentFile?.teamsAppId==="TEAMS_APP_ID"?e.passed.push("Project has 'teamsApp/create' action which has TEAMS_APP_ID env variable."):e.failed.push("Project should have 'teamsApp/create' action which has TEAMS_APP_ID env variable."))}_.length===0?e.passed.push(`Project has all mandatory actions in ${y.name} stage.`):e.failed.push(..._)}for(let y of u2){let m=a[y.name];if(!m){e.warning.push(`Project does not have '${y.name}' stage in m365agents.yml.`);continue}let _=!0;for(let S of y.actions)m.findIndex(w=>w.uses===S)<0&&(e.warning.push(`Project does not have '${S}' action in ${y.name} stage.`),_=!1);_&&e.passed.push(`Project has all actions in ${y.name} stage.`)}let u=/^([\w-]+):([\w-]+)$/g,f=a?.additionalMetadata?.sampleTag,h=await l2(n),d=!1;if(f&&f!==""){let y=u.exec(f);if(y){let m=y[1],_=y[2];if(e.passed.push("Project has sampleTag with format 'repo:name'."),d=!0,m!=="TeamsFx-Samples"&&e.warning.push("Project is an external sample."),h!==null){let S=o2[h];_===h||_===S?_===S?e.passed.push(`sampleTag name '${_}' matches allowed exception for sample id '${h}'.`):e.passed.push(`sampleTag name '${_}' matches sample id in config.`):e.failed.push(`sampleTag name '${_}' does not match sample id '${h}' in samples-config-v3.json.`)}}}return d||e.failed.push("Project should have sampleTag with format 'repo:name'."),e}var d2=Lg(),Ig=new cc,p2=[_o,Gl,ua,ho,Do,Bo];async function _2(){await Ig.version(d2.version).description("A tool to validate project content before onboarding to TeamsFx sample gallery.").option("-p, --path <path>","Path to the project folder to be validated.").parseAsync(process.argv);let n=Ig.opts(),e=process.cwd();n.path&&typeof n.path=="string"&&(e=n.path);for(let t of p2){let r=await t(e);Kc(r)}}(void 0)("Standard",dc);console.log((void 0)("TeamsFx Sample Validator"));_2();
