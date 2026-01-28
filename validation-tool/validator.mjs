#! /usr/bin/env node
import { createRequire } from 'module'; const require = createRequire(import.meta.url);
var wg=Object.create;var Gl=Object.defineProperty;var Lg=Object.getOwnPropertyDescriptor;var Ig=Object.getOwnPropertyNames;var bg=Object.getPrototypeOf,vg=Object.prototype.hasOwnProperty;var G=(n=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(n,{get:(e,t)=>(typeof require<"u"?require:e)[t]}):n)(function(n){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+n+'" is not supported')});var p=(n,e)=>()=>(e||n((e={exports:{}}).exports,e),e.exports);var Ng=(n,e,t,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of Ig(e))!vg.call(n,s)&&s!==t&&Gl(n,s,{get:()=>e[s],enumerable:!(r=Lg(e,s))||r.enumerable});return n};var Ae=(n,e,t)=>(t=n!=null?wg(bg(n)):{},Ng(e||!n||!n.__esModule?Gl(t,"default",{value:n,enumerable:!0}):t,n));var hn=p(wi=>{var hr=class extends Error{constructor(e,t,r){super(r),Error.captureStackTrace(this,this.constructor),this.name=this.constructor.name,this.code=t,this.exitCode=e,this.nestedError=void 0}},Ai=class extends hr{constructor(e){super(1,"commander.invalidArgument",e),Error.captureStackTrace(this,this.constructor),this.name=this.constructor.name}};wi.CommanderError=hr;wi.InvalidArgumentError=Ai});var dr=p(Ii=>{var{InvalidArgumentError:Og}=hn(),Li=class{constructor(e,t){switch(this.description=t||"",this.variadic=!1,this.parseArg=void 0,this.defaultValue=void 0,this.defaultValueDescription=void 0,this.argChoices=void 0,e[0]){case"<":this.required=!0,this._name=e.slice(1,-1);break;case"[":this.required=!1,this._name=e.slice(1,-1);break;default:this.required=!0,this._name=e;break}this._name.length>3&&this._name.slice(-3)==="..."&&(this.variadic=!0,this._name=this._name.slice(0,-3))}name(){return this._name}_concatValue(e,t){return t===this.defaultValue||!Array.isArray(t)?[e]:t.concat(e)}default(e,t){return this.defaultValue=e,this.defaultValueDescription=t,this}argParser(e){return this.parseArg=e,this}choices(e){return this.argChoices=e.slice(),this.parseArg=(t,r)=>{if(!this.argChoices.includes(t))throw new Og(`Allowed choices are ${this.argChoices.join(", ")}.`);return this.variadic?this._concatValue(t,r):t},this}argRequired(){return this.required=!0,this}argOptional(){return this.required=!1,this}};function Cg(n){let e=n.name()+(n.variadic===!0?"...":"");return n.required?"<"+e+">":"["+e+"]"}Ii.Argument=Li;Ii.humanReadableArgName=Cg});var vi=p(Kl=>{var{humanReadableArgName:Rg}=dr(),bi=class{constructor(){this.helpWidth=void 0,this.sortSubcommands=!1,this.sortOptions=!1,this.showGlobalOptions=!1}visibleCommands(e){let t=e.commands.filter(r=>!r._hidden);if(e._hasImplicitHelpCommand()){let[,r,s]=e._helpCommandnameAndArgs.match(/([^ ]+) *(.*)/),i=e.createCommand(r).helpOption(!1);i.description(e._helpCommandDescription),s&&i.arguments(s),t.push(i)}return this.sortSubcommands&&t.sort((r,s)=>r.name().localeCompare(s.name())),t}compareOptions(e,t){let r=s=>s.short?s.short.replace(/^-/,""):s.long.replace(/^--/,"");return r(e).localeCompare(r(t))}visibleOptions(e){let t=e.options.filter(i=>!i.hidden),r=e._hasHelpOption&&e._helpShortFlag&&!e._findOption(e._helpShortFlag),s=e._hasHelpOption&&!e._findOption(e._helpLongFlag);if(r||s){let i;r?s?i=e.createOption(e._helpFlags,e._helpDescription):i=e.createOption(e._helpShortFlag,e._helpDescription):i=e.createOption(e._helpLongFlag,e._helpDescription),t.push(i)}return this.sortOptions&&t.sort(this.compareOptions),t}visibleGlobalOptions(e){if(!this.showGlobalOptions)return[];let t=[];for(let r=e.parent;r;r=r.parent){let s=r.options.filter(i=>!i.hidden);t.push(...s)}return this.sortOptions&&t.sort(this.compareOptions),t}visibleArguments(e){return e._argsDescription&&e.registeredArguments.forEach(t=>{t.description=t.description||e._argsDescription[t.name()]||""}),e.registeredArguments.find(t=>t.description)?e.registeredArguments:[]}subcommandTerm(e){let t=e.registeredArguments.map(r=>Rg(r)).join(" ");return e._name+(e._aliases[0]?"|"+e._aliases[0]:"")+(e.options.length?" [options]":"")+(t?" "+t:"")}optionTerm(e){return e.flags}argumentTerm(e){return e.name()}longestSubcommandTermLength(e,t){return t.visibleCommands(e).reduce((r,s)=>Math.max(r,t.subcommandTerm(s).length),0)}longestOptionTermLength(e,t){return t.visibleOptions(e).reduce((r,s)=>Math.max(r,t.optionTerm(s).length),0)}longestGlobalOptionTermLength(e,t){return t.visibleGlobalOptions(e).reduce((r,s)=>Math.max(r,t.optionTerm(s).length),0)}longestArgumentTermLength(e,t){return t.visibleArguments(e).reduce((r,s)=>Math.max(r,t.argumentTerm(s).length),0)}commandUsage(e){let t=e._name;e._aliases[0]&&(t=t+"|"+e._aliases[0]);let r="";for(let s=e.parent;s;s=s.parent)r=s.name()+" "+r;return r+t+" "+e.usage()}commandDescription(e){return e.description()}subcommandDescription(e){return e.summary()||e.description()}optionDescription(e){let t=[];return e.argChoices&&t.push(`choices: ${e.argChoices.map(r=>JSON.stringify(r)).join(", ")}`),e.defaultValue!==void 0&&(e.required||e.optional||e.isBoolean()&&typeof e.defaultValue=="boolean")&&t.push(`default: ${e.defaultValueDescription||JSON.stringify(e.defaultValue)}`),e.presetArg!==void 0&&e.optional&&t.push(`preset: ${JSON.stringify(e.presetArg)}`),e.envVar!==void 0&&t.push(`env: ${e.envVar}`),t.length>0?`${e.description} (${t.join(", ")})`:e.description}argumentDescription(e){let t=[];if(e.argChoices&&t.push(`choices: ${e.argChoices.map(r=>JSON.stringify(r)).join(", ")}`),e.defaultValue!==void 0&&t.push(`default: ${e.defaultValueDescription||JSON.stringify(e.defaultValue)}`),t.length>0){let r=`(${t.join(", ")})`;return e.description?`${e.description} ${r}`:r}return e.description}formatHelp(e,t){let r=t.padWidth(e,t),s=t.helpWidth||80,i=2,o=2;function a(y,m){if(m){let _=`${y.padEnd(r+o)}${m}`;return t.wrap(_,s-i,r+o)}return y}function l(y){return y.join(`
`).replace(/^/gm," ".repeat(i))}let c=[`Usage: ${t.commandUsage(e)}`,""],u=t.commandDescription(e);u.length>0&&(c=c.concat([t.wrap(u,s,0),""]));let f=t.visibleArguments(e).map(y=>a(t.argumentTerm(y),t.argumentDescription(y)));f.length>0&&(c=c.concat(["Arguments:",l(f),""]));let h=t.visibleOptions(e).map(y=>a(t.optionTerm(y),t.optionDescription(y)));if(h.length>0&&(c=c.concat(["Options:",l(h),""])),this.showGlobalOptions){let y=t.visibleGlobalOptions(e).map(m=>a(t.optionTerm(m),t.optionDescription(m)));y.length>0&&(c=c.concat(["Global Options:",l(y),""]))}let d=t.visibleCommands(e).map(y=>a(t.subcommandTerm(y),t.subcommandDescription(y)));return d.length>0&&(c=c.concat(["Commands:",l(d),""])),c.join(`
`)}padWidth(e,t){return Math.max(t.longestOptionTermLength(e,t),t.longestGlobalOptionTermLength(e,t),t.longestSubcommandTermLength(e,t),t.longestArgumentTermLength(e,t))}wrap(e,t,r,s=40){let i=" \\f\\t\\v\xA0\u1680\u2000-\u200A\u202F\u205F\u3000\uFEFF",o=new RegExp(`[\\n][${i}]+`);if(e.match(o))return e;let a=t-r;if(a<s)return e;let l=e.slice(0,r),c=e.slice(r).replace(`\r
`,`
`),u=" ".repeat(r),h="\\s\u200B",d=new RegExp(`
|.{1,${a-1}}([${h}]|$)|[^${h}]+?([${h}]|$)`,"g"),y=c.match(d)||[];return l+y.map((m,_)=>m===`
`?"":(_>0?u:"")+m.trimEnd()).join(`
`)}};Kl.Help=bi});var Ci=p(pr=>{var{InvalidArgumentError:Pg}=hn(),Ni=class{constructor(e,t){this.flags=e,this.description=t||"",this.required=e.includes("<"),this.optional=e.includes("["),this.variadic=/\w\.\.\.[>\]]$/.test(e),this.mandatory=!1;let r=Yl(e);this.short=r.shortFlag,this.long=r.longFlag,this.negate=!1,this.long&&(this.negate=this.long.startsWith("--no-")),this.defaultValue=void 0,this.defaultValueDescription=void 0,this.presetArg=void 0,this.envVar=void 0,this.parseArg=void 0,this.hidden=!1,this.argChoices=void 0,this.conflictsWith=[],this.implied=void 0}default(e,t){return this.defaultValue=e,this.defaultValueDescription=t,this}preset(e){return this.presetArg=e,this}conflicts(e){return this.conflictsWith=this.conflictsWith.concat(e),this}implies(e){let t=e;return typeof e=="string"&&(t={[e]:!0}),this.implied=Object.assign(this.implied||{},t),this}env(e){return this.envVar=e,this}argParser(e){return this.parseArg=e,this}makeOptionMandatory(e=!0){return this.mandatory=!!e,this}hideHelp(e=!0){return this.hidden=!!e,this}_concatValue(e,t){return t===this.defaultValue||!Array.isArray(t)?[e]:t.concat(e)}choices(e){return this.argChoices=e.slice(),this.parseArg=(t,r)=>{if(!this.argChoices.includes(t))throw new Pg(`Allowed choices are ${this.argChoices.join(", ")}.`);return this.variadic?this._concatValue(t,r):t},this}name(){return this.long?this.long.replace(/^--/,""):this.short.replace(/^-/,"")}attributeName(){return kg(this.name().replace(/^no-/,""))}is(e){return this.short===e||this.long===e}isBoolean(){return!this.required&&!this.optional&&!this.negate}},Oi=class{constructor(e){this.positiveOptions=new Map,this.negativeOptions=new Map,this.dualOptions=new Set,e.forEach(t=>{t.negate?this.negativeOptions.set(t.attributeName(),t):this.positiveOptions.set(t.attributeName(),t)}),this.negativeOptions.forEach((t,r)=>{this.positiveOptions.has(r)&&this.dualOptions.add(r)})}valueFromOption(e,t){let r=t.attributeName();if(!this.dualOptions.has(r))return!0;let s=this.negativeOptions.get(r).presetArg,i=s!==void 0?s:!1;return t.negate===(i===e)}};function kg(n){return n.split("-").reduce((e,t)=>e+t[0].toUpperCase()+t.slice(1))}function Yl(n){let e,t,r=n.split(/[ |,]+/);return r.length>1&&!/^[[<]/.test(r[1])&&(e=r.shift()),t=r.shift(),!e&&/^-[^-]$/.test(t)&&(e=t,t=void 0),{shortFlag:e,longFlag:t}}pr.Option=Ni;pr.splitOptionFlags=Yl;pr.DualOptions=Oi});var Xl=p(Jl=>{function $g(n,e){if(Math.abs(n.length-e.length)>3)return Math.max(n.length,e.length);let t=[];for(let r=0;r<=n.length;r++)t[r]=[r];for(let r=0;r<=e.length;r++)t[0][r]=r;for(let r=1;r<=e.length;r++)for(let s=1;s<=n.length;s++){let i=1;n[s-1]===e[r-1]?i=0:i=1,t[s][r]=Math.min(t[s-1][r]+1,t[s][r-1]+1,t[s-1][r-1]+i),s>1&&r>1&&n[s-1]===e[r-2]&&n[s-2]===e[r-1]&&(t[s][r]=Math.min(t[s][r],t[s-2][r-2]+1))}return t[n.length][e.length]}function xg(n,e){if(!e||e.length===0)return"";e=Array.from(new Set(e));let t=n.startsWith("--");t&&(n=n.slice(2),e=e.map(o=>o.slice(2)));let r=[],s=3,i=.4;return e.forEach(o=>{if(o.length<=1)return;let a=$g(n,o),l=Math.max(n.length,o.length);(l-a)/l>i&&(a<s?(s=a,r=[o]):a===s&&r.push(o))}),r.sort((o,a)=>o.localeCompare(a)),t&&(r=r.map(o=>`--${o}`)),r.length>1?`
(Did you mean one of ${r.join(", ")}?)`:r.length===1?`
(Did you mean ${r[0]}?)`:""}Jl.suggestSimilar=xg});var nc=p(tc=>{var qg=G("events").EventEmitter,Ri=G("child_process"),Ze=G("path"),Pi=G("fs"),ie=G("process"),{Argument:Mg,humanReadableArgName:Fg}=dr(),{CommanderError:ki}=hn(),{Help:Dg}=vi(),{Option:zl,splitOptionFlags:jg,DualOptions:Bg}=Ci(),{suggestSimilar:Ql}=Xl(),$i=class n extends qg{constructor(e){super(),this.commands=[],this.options=[],this.parent=null,this._allowUnknownOption=!1,this._allowExcessArguments=!0,this.registeredArguments=[],this._args=this.registeredArguments,this.args=[],this.rawArgs=[],this.processedArgs=[],this._scriptPath=null,this._name=e||"",this._optionValues={},this._optionValueSources={},this._storeOptionsAsProperties=!1,this._actionHandler=null,this._executableHandler=!1,this._executableFile=null,this._executableDir=null,this._defaultCommandName=null,this._exitCallback=null,this._aliases=[],this._combineFlagAndOptionalValue=!0,this._description="",this._summary="",this._argsDescription=void 0,this._enablePositionalOptions=!1,this._passThroughOptions=!1,this._lifeCycleHooks={},this._showHelpAfterError=!1,this._showSuggestionAfterError=!0,this._outputConfiguration={writeOut:t=>ie.stdout.write(t),writeErr:t=>ie.stderr.write(t),getOutHelpWidth:()=>ie.stdout.isTTY?ie.stdout.columns:void 0,getErrHelpWidth:()=>ie.stderr.isTTY?ie.stderr.columns:void 0,outputError:(t,r)=>r(t)},this._hidden=!1,this._hasHelpOption=!0,this._helpFlags="-h, --help",this._helpDescription="display help for command",this._helpShortFlag="-h",this._helpLongFlag="--help",this._addImplicitHelpCommand=void 0,this._helpCommandName="help",this._helpCommandnameAndArgs="help [command]",this._helpCommandDescription="display help for command",this._helpConfiguration={}}copyInheritedSettings(e){return this._outputConfiguration=e._outputConfiguration,this._hasHelpOption=e._hasHelpOption,this._helpFlags=e._helpFlags,this._helpDescription=e._helpDescription,this._helpShortFlag=e._helpShortFlag,this._helpLongFlag=e._helpLongFlag,this._helpCommandName=e._helpCommandName,this._helpCommandnameAndArgs=e._helpCommandnameAndArgs,this._helpCommandDescription=e._helpCommandDescription,this._helpConfiguration=e._helpConfiguration,this._exitCallback=e._exitCallback,this._storeOptionsAsProperties=e._storeOptionsAsProperties,this._combineFlagAndOptionalValue=e._combineFlagAndOptionalValue,this._allowExcessArguments=e._allowExcessArguments,this._enablePositionalOptions=e._enablePositionalOptions,this._showHelpAfterError=e._showHelpAfterError,this._showSuggestionAfterError=e._showSuggestionAfterError,this}_getCommandAndAncestors(){let e=[];for(let t=this;t;t=t.parent)e.push(t);return e}command(e,t,r){let s=t,i=r;typeof s=="object"&&s!==null&&(i=s,s=null),i=i||{};let[,o,a]=e.match(/([^ ]+) *(.*)/),l=this.createCommand(o);return s&&(l.description(s),l._executableHandler=!0),i.isDefault&&(this._defaultCommandName=l._name),l._hidden=!!(i.noHelp||i.hidden),l._executableFile=i.executableFile||null,a&&l.arguments(a),this.commands.push(l),l.parent=this,l.copyInheritedSettings(this),s?this:l}createCommand(e){return new n(e)}createHelp(){return Object.assign(new Dg,this.configureHelp())}configureHelp(e){return e===void 0?this._helpConfiguration:(this._helpConfiguration=e,this)}configureOutput(e){return e===void 0?this._outputConfiguration:(Object.assign(this._outputConfiguration,e),this)}showHelpAfterError(e=!0){return typeof e!="string"&&(e=!!e),this._showHelpAfterError=e,this}showSuggestionAfterError(e=!0){return this._showSuggestionAfterError=!!e,this}addCommand(e,t){if(!e._name)throw new Error(`Command passed to .addCommand() must have a name
- specify the name in Command constructor or using .name()`);return t=t||{},t.isDefault&&(this._defaultCommandName=e._name),(t.noHelp||t.hidden)&&(e._hidden=!0),this.commands.push(e),e.parent=this,this}createArgument(e,t){return new Mg(e,t)}argument(e,t,r,s){let i=this.createArgument(e,t);return typeof r=="function"?i.default(s).argParser(r):i.default(r),this.addArgument(i),this}arguments(e){return e.trim().split(/ +/).forEach(t=>{this.argument(t)}),this}addArgument(e){let t=this.registeredArguments.slice(-1)[0];if(t&&t.variadic)throw new Error(`only the last argument can be variadic '${t.name()}'`);if(e.required&&e.defaultValue!==void 0&&e.parseArg===void 0)throw new Error(`a default value for a required argument is never used: '${e.name()}'`);return this.registeredArguments.push(e),this}addHelpCommand(e,t){return e===!1?this._addImplicitHelpCommand=!1:(this._addImplicitHelpCommand=!0,typeof e=="string"&&(this._helpCommandName=e.split(" ")[0],this._helpCommandnameAndArgs=e),this._helpCommandDescription=t||this._helpCommandDescription),this}_hasImplicitHelpCommand(){return this._addImplicitHelpCommand===void 0?this.commands.length&&!this._actionHandler&&!this._findCommand("help"):this._addImplicitHelpCommand}hook(e,t){let r=["preSubcommand","preAction","postAction"];if(!r.includes(e))throw new Error(`Unexpected value for event passed to hook : '${e}'.
Expecting one of '${r.join("', '")}'`);return this._lifeCycleHooks[e]?this._lifeCycleHooks[e].push(t):this._lifeCycleHooks[e]=[t],this}exitOverride(e){return e?this._exitCallback=e:this._exitCallback=t=>{if(t.code!=="commander.executeSubCommandAsync")throw t},this}_exit(e,t,r){this._exitCallback&&this._exitCallback(new ki(e,t,r)),ie.exit(e)}action(e){let t=r=>{let s=this.registeredArguments.length,i=r.slice(0,s);return this._storeOptionsAsProperties?i[s]=this:i[s]=this.opts(),i.push(this),e.apply(this,i)};return this._actionHandler=t,this}createOption(e,t){return new zl(e,t)}_callParseArg(e,t,r,s){try{return e.parseArg(t,r)}catch(i){if(i.code==="commander.invalidArgument"){let o=`${s} ${i.message}`;this.error(o,{exitCode:i.exitCode,code:i.code})}throw i}}addOption(e){let t=e.name(),r=e.attributeName();if(e.negate){let i=e.long.replace(/^--no-/,"--");this._findOption(i)||this.setOptionValueWithSource(r,e.defaultValue===void 0?!0:e.defaultValue,"default")}else e.defaultValue!==void 0&&this.setOptionValueWithSource(r,e.defaultValue,"default");this.options.push(e);let s=(i,o,a)=>{i==null&&e.presetArg!==void 0&&(i=e.presetArg);let l=this.getOptionValue(r);i!==null&&e.parseArg?i=this._callParseArg(e,i,l,o):i!==null&&e.variadic&&(i=e._concatValue(i,l)),i==null&&(e.negate?i=!1:e.isBoolean()||e.optional?i=!0:i=""),this.setOptionValueWithSource(r,i,a)};return this.on("option:"+t,i=>{let o=`error: option '${e.flags}' argument '${i}' is invalid.`;s(i,o,"cli")}),e.envVar&&this.on("optionEnv:"+t,i=>{let o=`error: option '${e.flags}' value '${i}' from env '${e.envVar}' is invalid.`;s(i,o,"env")}),this}_optionEx(e,t,r,s,i){if(typeof t=="object"&&t instanceof zl)throw new Error("To add an Option object use addOption() instead of option() or requiredOption()");let o=this.createOption(t,r);if(o.makeOptionMandatory(!!e.mandatory),typeof s=="function")o.default(i).argParser(s);else if(s instanceof RegExp){let a=s;s=(l,c)=>{let u=a.exec(l);return u?u[0]:c},o.default(i).argParser(s)}else o.default(s);return this.addOption(o)}option(e,t,r,s){return this._optionEx({},e,t,r,s)}requiredOption(e,t,r,s){return this._optionEx({mandatory:!0},e,t,r,s)}combineFlagAndOptionalValue(e=!0){return this._combineFlagAndOptionalValue=!!e,this}allowUnknownOption(e=!0){return this._allowUnknownOption=!!e,this}allowExcessArguments(e=!0){return this._allowExcessArguments=!!e,this}enablePositionalOptions(e=!0){return this._enablePositionalOptions=!!e,this}passThroughOptions(e=!0){if(this._passThroughOptions=!!e,this.parent&&e&&!this.parent._enablePositionalOptions)throw new Error("passThroughOptions can not be used without turning on enablePositionalOptions for parent command(s)");return this}storeOptionsAsProperties(e=!0){if(this.options.length)throw new Error("call .storeOptionsAsProperties() before adding options");return this._storeOptionsAsProperties=!!e,this}getOptionValue(e){return this._storeOptionsAsProperties?this[e]:this._optionValues[e]}setOptionValue(e,t){return this.setOptionValueWithSource(e,t,void 0)}setOptionValueWithSource(e,t,r){return this._storeOptionsAsProperties?this[e]=t:this._optionValues[e]=t,this._optionValueSources[e]=r,this}getOptionValueSource(e){return this._optionValueSources[e]}getOptionValueSourceWithGlobals(e){let t;return this._getCommandAndAncestors().forEach(r=>{r.getOptionValueSource(e)!==void 0&&(t=r.getOptionValueSource(e))}),t}_prepareUserArgs(e,t){if(e!==void 0&&!Array.isArray(e))throw new Error("first parameter to parse must be array or undefined");t=t||{},e===void 0&&(e=ie.argv,ie.versions&&ie.versions.electron&&(t.from="electron")),this.rawArgs=e.slice();let r;switch(t.from){case void 0:case"node":this._scriptPath=e[1],r=e.slice(2);break;case"electron":ie.defaultApp?(this._scriptPath=e[1],r=e.slice(2)):r=e.slice(1);break;case"user":r=e.slice(0);break;default:throw new Error(`unexpected parse option { from: '${t.from}' }`)}return!this._name&&this._scriptPath&&this.nameFromFilename(this._scriptPath),this._name=this._name||"program",r}parse(e,t){let r=this._prepareUserArgs(e,t);return this._parseCommand([],r),this}async parseAsync(e,t){let r=this._prepareUserArgs(e,t);return await this._parseCommand([],r),this}_executeSubCommand(e,t){t=t.slice();let r=!1,s=[".js",".ts",".tsx",".mjs",".cjs"];function i(u,f){let h=Ze.resolve(u,f);if(Pi.existsSync(h))return h;if(s.includes(Ze.extname(f)))return;let d=s.find(y=>Pi.existsSync(`${h}${y}`));if(d)return`${h}${d}`}this._checkForMissingMandatoryOptions(),this._checkForConflictingOptions();let o=e._executableFile||`${this._name}-${e._name}`,a=this._executableDir||"";if(this._scriptPath){let u;try{u=Pi.realpathSync(this._scriptPath)}catch{u=this._scriptPath}a=Ze.resolve(Ze.dirname(u),a)}if(a){let u=i(a,o);if(!u&&!e._executableFile&&this._scriptPath){let f=Ze.basename(this._scriptPath,Ze.extname(this._scriptPath));f!==this._name&&(u=i(a,`${f}-${e._name}`))}o=u||o}r=s.includes(Ze.extname(o));let l;ie.platform!=="win32"?r?(t.unshift(o),t=ec(ie.execArgv).concat(t),l=Ri.spawn(ie.argv[0],t,{stdio:"inherit"})):l=Ri.spawn(o,t,{stdio:"inherit"}):(t.unshift(o),t=ec(ie.execArgv).concat(t),l=Ri.spawn(ie.execPath,t,{stdio:"inherit"})),l.killed||["SIGUSR1","SIGUSR2","SIGTERM","SIGINT","SIGHUP"].forEach(f=>{ie.on(f,()=>{l.killed===!1&&l.exitCode===null&&l.kill(f)})});let c=this._exitCallback;c?l.on("close",()=>{c(new ki(ie.exitCode||0,"commander.executeSubCommandAsync","(close)"))}):l.on("close",ie.exit.bind(ie)),l.on("error",u=>{if(u.code==="ENOENT"){let f=a?`searched for local subcommand relative to directory '${a}'`:"no directory for search for local subcommand, use .executableDir() to supply a custom directory",h=`'${o}' does not exist
 - if '${e._name}' is not meant to be an executable command, remove description parameter from '.command()' and use '.description()' instead
 - if the default executable name is not suitable, use the executableFile option to supply a custom name or path
 - ${f}`;throw new Error(h)}else if(u.code==="EACCES")throw new Error(`'${o}' not executable`);if(!c)ie.exit(1);else{let f=new ki(1,"commander.executeSubCommandAsync","(error)");f.nestedError=u,c(f)}}),this.runningCommand=l}_dispatchSubcommand(e,t,r){let s=this._findCommand(e);s||this.help({error:!0});let i;return i=this._chainOrCallSubCommandHook(i,s,"preSubcommand"),i=this._chainOrCall(i,()=>{if(s._executableHandler)this._executeSubCommand(s,t.concat(r));else return s._parseCommand(t,r)}),i}_dispatchHelpCommand(e){e||this.help();let t=this._findCommand(e);return t&&!t._executableHandler&&t.help(),this._dispatchSubcommand(e,[],[this._helpLongFlag||this._helpShortFlag])}_checkNumberOfArguments(){this.registeredArguments.forEach((e,t)=>{e.required&&this.args[t]==null&&this.missingArgument(e.name())}),!(this.registeredArguments.length>0&&this.registeredArguments[this.registeredArguments.length-1].variadic)&&this.args.length>this.registeredArguments.length&&this._excessArguments(this.args)}_processArguments(){let e=(r,s,i)=>{let o=s;if(s!==null&&r.parseArg){let a=`error: command-argument value '${s}' is invalid for argument '${r.name()}'.`;o=this._callParseArg(r,s,i,a)}return o};this._checkNumberOfArguments();let t=[];this.registeredArguments.forEach((r,s)=>{let i=r.defaultValue;r.variadic?s<this.args.length?(i=this.args.slice(s),r.parseArg&&(i=i.reduce((o,a)=>e(r,a,o),r.defaultValue))):i===void 0&&(i=[]):s<this.args.length&&(i=this.args[s],r.parseArg&&(i=e(r,i,r.defaultValue))),t[s]=i}),this.processedArgs=t}_chainOrCall(e,t){return e&&e.then&&typeof e.then=="function"?e.then(()=>t()):t()}_chainOrCallHooks(e,t){let r=e,s=[];return this._getCommandAndAncestors().reverse().filter(i=>i._lifeCycleHooks[t]!==void 0).forEach(i=>{i._lifeCycleHooks[t].forEach(o=>{s.push({hookedCommand:i,callback:o})})}),t==="postAction"&&s.reverse(),s.forEach(i=>{r=this._chainOrCall(r,()=>i.callback(i.hookedCommand,this))}),r}_chainOrCallSubCommandHook(e,t,r){let s=e;return this._lifeCycleHooks[r]!==void 0&&this._lifeCycleHooks[r].forEach(i=>{s=this._chainOrCall(s,()=>i(this,t))}),s}_parseCommand(e,t){let r=this.parseOptions(t);if(this._parseOptionsEnv(),this._parseOptionsImplied(),e=e.concat(r.operands),t=r.unknown,this.args=e.concat(t),e&&this._findCommand(e[0]))return this._dispatchSubcommand(e[0],e.slice(1),t);if(this._hasImplicitHelpCommand()&&e[0]===this._helpCommandName)return this._dispatchHelpCommand(e[1]);if(this._defaultCommandName)return Zl(this,t),this._dispatchSubcommand(this._defaultCommandName,e,t);this.commands.length&&this.args.length===0&&!this._actionHandler&&!this._defaultCommandName&&this.help({error:!0}),Zl(this,r.unknown),this._checkForMissingMandatoryOptions(),this._checkForConflictingOptions();let s=()=>{r.unknown.length>0&&this.unknownOption(r.unknown[0])},i=`command:${this.name()}`;if(this._actionHandler){s(),this._processArguments();let o;return o=this._chainOrCallHooks(o,"preAction"),o=this._chainOrCall(o,()=>this._actionHandler(this.processedArgs)),this.parent&&(o=this._chainOrCall(o,()=>{this.parent.emit(i,e,t)})),o=this._chainOrCallHooks(o,"postAction"),o}if(this.parent&&this.parent.listenerCount(i))s(),this._processArguments(),this.parent.emit(i,e,t);else if(e.length){if(this._findCommand("*"))return this._dispatchSubcommand("*",e,t);this.listenerCount("command:*")?this.emit("command:*",e,t):this.commands.length?this.unknownCommand():(s(),this._processArguments())}else this.commands.length?(s(),this.help({error:!0})):(s(),this._processArguments())}_findCommand(e){if(e)return this.commands.find(t=>t._name===e||t._aliases.includes(e))}_findOption(e){return this.options.find(t=>t.is(e))}_checkForMissingMandatoryOptions(){this._getCommandAndAncestors().forEach(e=>{e.options.forEach(t=>{t.mandatory&&e.getOptionValue(t.attributeName())===void 0&&e.missingMandatoryOptionValue(t)})})}_checkForConflictingLocalOptions(){let e=this.options.filter(r=>{let s=r.attributeName();return this.getOptionValue(s)===void 0?!1:this.getOptionValueSource(s)!=="default"});e.filter(r=>r.conflictsWith.length>0).forEach(r=>{let s=e.find(i=>r.conflictsWith.includes(i.attributeName()));s&&this._conflictingOption(r,s)})}_checkForConflictingOptions(){this._getCommandAndAncestors().forEach(e=>{e._checkForConflictingLocalOptions()})}parseOptions(e){let t=[],r=[],s=t,i=e.slice();function o(l){return l.length>1&&l[0]==="-"}let a=null;for(;i.length;){let l=i.shift();if(l==="--"){s===r&&s.push(l),s.push(...i);break}if(a&&!o(l)){this.emit(`option:${a.name()}`,l);continue}if(a=null,o(l)){let c=this._findOption(l);if(c){if(c.required){let u=i.shift();u===void 0&&this.optionMissingArgument(c),this.emit(`option:${c.name()}`,u)}else if(c.optional){let u=null;i.length>0&&!o(i[0])&&(u=i.shift()),this.emit(`option:${c.name()}`,u)}else this.emit(`option:${c.name()}`);a=c.variadic?c:null;continue}}if(l.length>2&&l[0]==="-"&&l[1]!=="-"){let c=this._findOption(`-${l[1]}`);if(c){c.required||c.optional&&this._combineFlagAndOptionalValue?this.emit(`option:${c.name()}`,l.slice(2)):(this.emit(`option:${c.name()}`),i.unshift(`-${l.slice(2)}`));continue}}if(/^--[^=]+=/.test(l)){let c=l.indexOf("="),u=this._findOption(l.slice(0,c));if(u&&(u.required||u.optional)){this.emit(`option:${u.name()}`,l.slice(c+1));continue}}if(o(l)&&(s=r),(this._enablePositionalOptions||this._passThroughOptions)&&t.length===0&&r.length===0){if(this._findCommand(l)){t.push(l),i.length>0&&r.push(...i);break}else if(l===this._helpCommandName&&this._hasImplicitHelpCommand()){t.push(l),i.length>0&&t.push(...i);break}else if(this._defaultCommandName){r.push(l),i.length>0&&r.push(...i);break}}if(this._passThroughOptions){s.push(l),i.length>0&&s.push(...i);break}s.push(l)}return{operands:t,unknown:r}}opts(){if(this._storeOptionsAsProperties){let e={},t=this.options.length;for(let r=0;r<t;r++){let s=this.options[r].attributeName();e[s]=s===this._versionOptionName?this._version:this[s]}return e}return this._optionValues}optsWithGlobals(){return this._getCommandAndAncestors().reduce((e,t)=>Object.assign(e,t.opts()),{})}error(e,t){this._outputConfiguration.outputError(`${e}
`,this._outputConfiguration.writeErr),typeof this._showHelpAfterError=="string"?this._outputConfiguration.writeErr(`${this._showHelpAfterError}
`):this._showHelpAfterError&&(this._outputConfiguration.writeErr(`
`),this.outputHelp({error:!0}));let r=t||{},s=r.exitCode||1,i=r.code||"commander.error";this._exit(s,i,e)}_parseOptionsEnv(){this.options.forEach(e=>{if(e.envVar&&e.envVar in ie.env){let t=e.attributeName();(this.getOptionValue(t)===void 0||["default","config","env"].includes(this.getOptionValueSource(t)))&&(e.required||e.optional?this.emit(`optionEnv:${e.name()}`,ie.env[e.envVar]):this.emit(`optionEnv:${e.name()}`))}})}_parseOptionsImplied(){let e=new Bg(this.options),t=r=>this.getOptionValue(r)!==void 0&&!["default","implied"].includes(this.getOptionValueSource(r));this.options.filter(r=>r.implied!==void 0&&t(r.attributeName())&&e.valueFromOption(this.getOptionValue(r.attributeName()),r)).forEach(r=>{Object.keys(r.implied).filter(s=>!t(s)).forEach(s=>{this.setOptionValueWithSource(s,r.implied[s],"implied")})})}missingArgument(e){let t=`error: missing required argument '${e}'`;this.error(t,{code:"commander.missingArgument"})}optionMissingArgument(e){let t=`error: option '${e.flags}' argument missing`;this.error(t,{code:"commander.optionMissingArgument"})}missingMandatoryOptionValue(e){let t=`error: required option '${e.flags}' not specified`;this.error(t,{code:"commander.missingMandatoryOptionValue"})}_conflictingOption(e,t){let r=o=>{let a=o.attributeName(),l=this.getOptionValue(a),c=this.options.find(f=>f.negate&&a===f.attributeName()),u=this.options.find(f=>!f.negate&&a===f.attributeName());return c&&(c.presetArg===void 0&&l===!1||c.presetArg!==void 0&&l===c.presetArg)?c:u||o},s=o=>{let a=r(o),l=a.attributeName();return this.getOptionValueSource(l)==="env"?`environment variable '${a.envVar}'`:`option '${a.flags}'`},i=`error: ${s(e)} cannot be used with ${s(t)}`;this.error(i,{code:"commander.conflictingOption"})}unknownOption(e){if(this._allowUnknownOption)return;let t="";if(e.startsWith("--")&&this._showSuggestionAfterError){let s=[],i=this;do{let o=i.createHelp().visibleOptions(i).filter(a=>a.long).map(a=>a.long);s=s.concat(o),i=i.parent}while(i&&!i._enablePositionalOptions);t=Ql(e,s)}let r=`error: unknown option '${e}'${t}`;this.error(r,{code:"commander.unknownOption"})}_excessArguments(e){if(this._allowExcessArguments)return;let t=this.registeredArguments.length,r=t===1?"":"s",i=`error: too many arguments${this.parent?` for '${this.name()}'`:""}. Expected ${t} argument${r} but got ${e.length}.`;this.error(i,{code:"commander.excessArguments"})}unknownCommand(){let e=this.args[0],t="";if(this._showSuggestionAfterError){let s=[];this.createHelp().visibleCommands(this).forEach(i=>{s.push(i.name()),i.alias()&&s.push(i.alias())}),t=Ql(e,s)}let r=`error: unknown command '${e}'${t}`;this.error(r,{code:"commander.unknownCommand"})}version(e,t,r){if(e===void 0)return this._version;this._version=e,t=t||"-V, --version",r=r||"output the version number";let s=this.createOption(t,r);return this._versionOptionName=s.attributeName(),this.options.push(s),this.on("option:"+s.name(),()=>{this._outputConfiguration.writeOut(`${e}
`),this._exit(0,"commander.version",e)}),this}description(e,t){return e===void 0&&t===void 0?this._description:(this._description=e,t&&(this._argsDescription=t),this)}summary(e){return e===void 0?this._summary:(this._summary=e,this)}alias(e){if(e===void 0)return this._aliases[0];let t=this;if(this.commands.length!==0&&this.commands[this.commands.length-1]._executableHandler&&(t=this.commands[this.commands.length-1]),e===t._name)throw new Error("Command alias can't be the same as its name");return t._aliases.push(e),this}aliases(e){return e===void 0?this._aliases:(e.forEach(t=>this.alias(t)),this)}usage(e){if(e===void 0){if(this._usage)return this._usage;let t=this.registeredArguments.map(r=>Fg(r));return[].concat(this.options.length||this._hasHelpOption?"[options]":[],this.commands.length?"[command]":[],this.registeredArguments.length?t:[]).join(" ")}return this._usage=e,this}name(e){return e===void 0?this._name:(this._name=e,this)}nameFromFilename(e){return this._name=Ze.basename(e,Ze.extname(e)),this}executableDir(e){return e===void 0?this._executableDir:(this._executableDir=e,this)}helpInformation(e){let t=this.createHelp();return t.helpWidth===void 0&&(t.helpWidth=e&&e.error?this._outputConfiguration.getErrHelpWidth():this._outputConfiguration.getOutHelpWidth()),t.formatHelp(this,t)}_getHelpContext(e){e=e||{};let t={error:!!e.error},r;return t.error?r=s=>this._outputConfiguration.writeErr(s):r=s=>this._outputConfiguration.writeOut(s),t.write=e.write||r,t.command=this,t}outputHelp(e){let t;typeof e=="function"&&(t=e,e=void 0);let r=this._getHelpContext(e);this._getCommandAndAncestors().reverse().forEach(i=>i.emit("beforeAllHelp",r)),this.emit("beforeHelp",r);let s=this.helpInformation(r);if(t&&(s=t(s),typeof s!="string"&&!Buffer.isBuffer(s)))throw new Error("outputHelp callback must return a string or a Buffer");r.write(s),this._helpLongFlag&&this.emit(this._helpLongFlag),this.emit("afterHelp",r),this._getCommandAndAncestors().forEach(i=>i.emit("afterAllHelp",r))}helpOption(e,t){if(typeof e=="boolean")return this._hasHelpOption=e,this;this._helpFlags=e||this._helpFlags,this._helpDescription=t||this._helpDescription;let r=jg(this._helpFlags);return this._helpShortFlag=r.shortFlag,this._helpLongFlag=r.longFlag,this}help(e){this.outputHelp(e);let t=ie.exitCode||0;t===0&&e&&typeof e!="function"&&e.error&&(t=1),this._exit(t,"commander.help","(outputHelp)")}addHelpText(e,t){let r=["beforeAll","before","after","afterAll"];if(!r.includes(e))throw new Error(`Unexpected value for position to addHelpText.
Expecting one of '${r.join("', '")}'`);let s=`${e}Help`;return this.on(s,i=>{let o;typeof t=="function"?o=t({error:i.error,command:i.command}):o=t,o&&i.write(`${o}
`)}),this}};function Zl(n,e){n._hasHelpOption&&e.find(r=>r===n._helpLongFlag||r===n._helpShortFlag)&&(n.outputHelp(),n._exit(0,"commander.helpDisplayed","(outputHelp)"))}function ec(n){return n.map(e=>{if(!e.startsWith("--inspect"))return e;let t,r="127.0.0.1",s="9229",i;return(i=e.match(/^(--inspect(-brk)?)$/))!==null?t=i[1]:(i=e.match(/^(--inspect(-brk|-port)?)=([^:]+)$/))!==null?(t=i[1],/^\d+$/.test(i[3])?s=i[3]:r=i[3]):(i=e.match(/^(--inspect(-brk|-port)?)=([^:]+):(\d+)$/))!==null&&(t=i[1],r=i[3],s=i[4]),t&&s!=="0"?`${t}=${r}:${parseInt(s)+1}`:e})}tc.Command=$i});var oc=p((Ue,ic)=>{var{Argument:Ug}=dr(),{Command:rc}=nc(),{CommanderError:Hg,InvalidArgumentError:sc}=hn(),{Help:Vg}=vi(),{Option:Wg}=Ci();Ue=ic.exports=new rc;Ue.program=Ue;Ue.Command=rc;Ue.Option=Wg;Ue.Argument=Ug;Ue.Help=Vg;Ue.CommanderError=Hg;Ue.InvalidArgumentError=sc;Ue.InvalidOptionArgumentError=sc});var dc=p((q2,hc)=>{"use strict";hc.exports={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]}});var Mi=p((M2,_c)=>{var dn=dc(),pc={};for(let n of Object.keys(dn))pc[dn[n]]=n;var $={rgb:{channels:3,labels:"rgb"},hsl:{channels:3,labels:"hsl"},hsv:{channels:3,labels:"hsv"},hwb:{channels:3,labels:"hwb"},cmyk:{channels:4,labels:"cmyk"},xyz:{channels:3,labels:"xyz"},lab:{channels:3,labels:"lab"},lch:{channels:3,labels:"lch"},hex:{channels:1,labels:["hex"]},keyword:{channels:1,labels:["keyword"]},ansi16:{channels:1,labels:["ansi16"]},ansi256:{channels:1,labels:["ansi256"]},hcg:{channels:3,labels:["h","c","g"]},apple:{channels:3,labels:["r16","g16","b16"]},gray:{channels:1,labels:["gray"]}};_c.exports=$;for(let n of Object.keys($)){if(!("channels"in $[n]))throw new Error("missing channels property: "+n);if(!("labels"in $[n]))throw new Error("missing channel labels property: "+n);if($[n].labels.length!==$[n].channels)throw new Error("channel and label counts mismatch: "+n);let{channels:e,labels:t}=$[n];delete $[n].channels,delete $[n].labels,Object.defineProperty($[n],"channels",{value:e}),Object.defineProperty($[n],"labels",{value:t})}$.rgb.hsl=function(n){let e=n[0]/255,t=n[1]/255,r=n[2]/255,s=Math.min(e,t,r),i=Math.max(e,t,r),o=i-s,a,l;i===s?a=0:e===i?a=(t-r)/o:t===i?a=2+(r-e)/o:r===i&&(a=4+(e-t)/o),a=Math.min(a*60,360),a<0&&(a+=360);let c=(s+i)/2;return i===s?l=0:c<=.5?l=o/(i+s):l=o/(2-i-s),[a,l*100,c*100]};$.rgb.hsv=function(n){let e,t,r,s,i,o=n[0]/255,a=n[1]/255,l=n[2]/255,c=Math.max(o,a,l),u=c-Math.min(o,a,l),f=function(h){return(c-h)/6/u+1/2};return u===0?(s=0,i=0):(i=u/c,e=f(o),t=f(a),r=f(l),o===c?s=r-t:a===c?s=1/3+e-r:l===c&&(s=2/3+t-e),s<0?s+=1:s>1&&(s-=1)),[s*360,i*100,c*100]};$.rgb.hwb=function(n){let e=n[0],t=n[1],r=n[2],s=$.rgb.hsl(n)[0],i=1/255*Math.min(e,Math.min(t,r));return r=1-1/255*Math.max(e,Math.max(t,r)),[s,i*100,r*100]};$.rgb.cmyk=function(n){let e=n[0]/255,t=n[1]/255,r=n[2]/255,s=Math.min(1-e,1-t,1-r),i=(1-e-s)/(1-s)||0,o=(1-t-s)/(1-s)||0,a=(1-r-s)/(1-s)||0;return[i*100,o*100,a*100,s*100]};function Qg(n,e){return(n[0]-e[0])**2+(n[1]-e[1])**2+(n[2]-e[2])**2}$.rgb.keyword=function(n){let e=pc[n];if(e)return e;let t=1/0,r;for(let s of Object.keys(dn)){let i=dn[s],o=Qg(n,i);o<t&&(t=o,r=s)}return r};$.keyword.rgb=function(n){return dn[n]};$.rgb.xyz=function(n){let e=n[0]/255,t=n[1]/255,r=n[2]/255;e=e>.04045?((e+.055)/1.055)**2.4:e/12.92,t=t>.04045?((t+.055)/1.055)**2.4:t/12.92,r=r>.04045?((r+.055)/1.055)**2.4:r/12.92;let s=e*.4124+t*.3576+r*.1805,i=e*.2126+t*.7152+r*.0722,o=e*.0193+t*.1192+r*.9505;return[s*100,i*100,o*100]};$.rgb.lab=function(n){let e=$.rgb.xyz(n),t=e[0],r=e[1],s=e[2];t/=95.047,r/=100,s/=108.883,t=t>.008856?t**(1/3):7.787*t+16/116,r=r>.008856?r**(1/3):7.787*r+16/116,s=s>.008856?s**(1/3):7.787*s+16/116;let i=116*r-16,o=500*(t-r),a=200*(r-s);return[i,o,a]};$.hsl.rgb=function(n){let e=n[0]/360,t=n[1]/100,r=n[2]/100,s,i,o;if(t===0)return o=r*255,[o,o,o];r<.5?s=r*(1+t):s=r+t-r*t;let a=2*r-s,l=[0,0,0];for(let c=0;c<3;c++)i=e+1/3*-(c-1),i<0&&i++,i>1&&i--,6*i<1?o=a+(s-a)*6*i:2*i<1?o=s:3*i<2?o=a+(s-a)*(2/3-i)*6:o=a,l[c]=o*255;return l};$.hsl.hsv=function(n){let e=n[0],t=n[1]/100,r=n[2]/100,s=t,i=Math.max(r,.01);r*=2,t*=r<=1?r:2-r,s*=i<=1?i:2-i;let o=(r+t)/2,a=r===0?2*s/(i+s):2*t/(r+t);return[e,a*100,o*100]};$.hsv.rgb=function(n){let e=n[0]/60,t=n[1]/100,r=n[2]/100,s=Math.floor(e)%6,i=e-Math.floor(e),o=255*r*(1-t),a=255*r*(1-t*i),l=255*r*(1-t*(1-i));switch(r*=255,s){case 0:return[r,l,o];case 1:return[a,r,o];case 2:return[o,r,l];case 3:return[o,a,r];case 4:return[l,o,r];case 5:return[r,o,a]}};$.hsv.hsl=function(n){let e=n[0],t=n[1]/100,r=n[2]/100,s=Math.max(r,.01),i,o;o=(2-t)*r;let a=(2-t)*s;return i=t*s,i/=a<=1?a:2-a,i=i||0,o/=2,[e,i*100,o*100]};$.hwb.rgb=function(n){let e=n[0]/360,t=n[1]/100,r=n[2]/100,s=t+r,i;s>1&&(t/=s,r/=s);let o=Math.floor(6*e),a=1-r;i=6*e-o,(o&1)!==0&&(i=1-i);let l=t+i*(a-t),c,u,f;switch(o){default:case 6:case 0:c=a,u=l,f=t;break;case 1:c=l,u=a,f=t;break;case 2:c=t,u=a,f=l;break;case 3:c=t,u=l,f=a;break;case 4:c=l,u=t,f=a;break;case 5:c=a,u=t,f=l;break}return[c*255,u*255,f*255]};$.cmyk.rgb=function(n){let e=n[0]/100,t=n[1]/100,r=n[2]/100,s=n[3]/100,i=1-Math.min(1,e*(1-s)+s),o=1-Math.min(1,t*(1-s)+s),a=1-Math.min(1,r*(1-s)+s);return[i*255,o*255,a*255]};$.xyz.rgb=function(n){let e=n[0]/100,t=n[1]/100,r=n[2]/100,s,i,o;return s=e*3.2406+t*-1.5372+r*-.4986,i=e*-.9689+t*1.8758+r*.0415,o=e*.0557+t*-.204+r*1.057,s=s>.0031308?1.055*s**(1/2.4)-.055:s*12.92,i=i>.0031308?1.055*i**(1/2.4)-.055:i*12.92,o=o>.0031308?1.055*o**(1/2.4)-.055:o*12.92,s=Math.min(Math.max(0,s),1),i=Math.min(Math.max(0,i),1),o=Math.min(Math.max(0,o),1),[s*255,i*255,o*255]};$.xyz.lab=function(n){let e=n[0],t=n[1],r=n[2];e/=95.047,t/=100,r/=108.883,e=e>.008856?e**(1/3):7.787*e+16/116,t=t>.008856?t**(1/3):7.787*t+16/116,r=r>.008856?r**(1/3):7.787*r+16/116;let s=116*t-16,i=500*(e-t),o=200*(t-r);return[s,i,o]};$.lab.xyz=function(n){let e=n[0],t=n[1],r=n[2],s,i,o;i=(e+16)/116,s=t/500+i,o=i-r/200;let a=i**3,l=s**3,c=o**3;return i=a>.008856?a:(i-16/116)/7.787,s=l>.008856?l:(s-16/116)/7.787,o=c>.008856?c:(o-16/116)/7.787,s*=95.047,i*=100,o*=108.883,[s,i,o]};$.lab.lch=function(n){let e=n[0],t=n[1],r=n[2],s;s=Math.atan2(r,t)*360/2/Math.PI,s<0&&(s+=360);let o=Math.sqrt(t*t+r*r);return[e,o,s]};$.lch.lab=function(n){let e=n[0],t=n[1],s=n[2]/360*2*Math.PI,i=t*Math.cos(s),o=t*Math.sin(s);return[e,i,o]};$.rgb.ansi16=function(n,e=null){let[t,r,s]=n,i=e===null?$.rgb.hsv(n)[2]:e;if(i=Math.round(i/50),i===0)return 30;let o=30+(Math.round(s/255)<<2|Math.round(r/255)<<1|Math.round(t/255));return i===2&&(o+=60),o};$.hsv.ansi16=function(n){return $.rgb.ansi16($.hsv.rgb(n),n[2])};$.rgb.ansi256=function(n){let e=n[0],t=n[1],r=n[2];return e===t&&t===r?e<8?16:e>248?231:Math.round((e-8)/247*24)+232:16+36*Math.round(e/255*5)+6*Math.round(t/255*5)+Math.round(r/255*5)};$.ansi16.rgb=function(n){let e=n%10;if(e===0||e===7)return n>50&&(e+=3.5),e=e/10.5*255,[e,e,e];let t=(~~(n>50)+1)*.5,r=(e&1)*t*255,s=(e>>1&1)*t*255,i=(e>>2&1)*t*255;return[r,s,i]};$.ansi256.rgb=function(n){if(n>=232){let i=(n-232)*10+8;return[i,i,i]}n-=16;let e,t=Math.floor(n/36)/5*255,r=Math.floor((e=n%36)/6)/5*255,s=e%6/5*255;return[t,r,s]};$.rgb.hex=function(n){let t=(((Math.round(n[0])&255)<<16)+((Math.round(n[1])&255)<<8)+(Math.round(n[2])&255)).toString(16).toUpperCase();return"000000".substring(t.length)+t};$.hex.rgb=function(n){let e=n.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);if(!e)return[0,0,0];let t=e[0];e[0].length===3&&(t=t.split("").map(a=>a+a).join(""));let r=parseInt(t,16),s=r>>16&255,i=r>>8&255,o=r&255;return[s,i,o]};$.rgb.hcg=function(n){let e=n[0]/255,t=n[1]/255,r=n[2]/255,s=Math.max(Math.max(e,t),r),i=Math.min(Math.min(e,t),r),o=s-i,a,l;return o<1?a=i/(1-o):a=0,o<=0?l=0:s===e?l=(t-r)/o%6:s===t?l=2+(r-e)/o:l=4+(e-t)/o,l/=6,l%=1,[l*360,o*100,a*100]};$.hsl.hcg=function(n){let e=n[1]/100,t=n[2]/100,r=t<.5?2*e*t:2*e*(1-t),s=0;return r<1&&(s=(t-.5*r)/(1-r)),[n[0],r*100,s*100]};$.hsv.hcg=function(n){let e=n[1]/100,t=n[2]/100,r=e*t,s=0;return r<1&&(s=(t-r)/(1-r)),[n[0],r*100,s*100]};$.hcg.rgb=function(n){let e=n[0]/360,t=n[1]/100,r=n[2]/100;if(t===0)return[r*255,r*255,r*255];let s=[0,0,0],i=e%1*6,o=i%1,a=1-o,l=0;switch(Math.floor(i)){case 0:s[0]=1,s[1]=o,s[2]=0;break;case 1:s[0]=a,s[1]=1,s[2]=0;break;case 2:s[0]=0,s[1]=1,s[2]=o;break;case 3:s[0]=0,s[1]=a,s[2]=1;break;case 4:s[0]=o,s[1]=0,s[2]=1;break;default:s[0]=1,s[1]=0,s[2]=a}return l=(1-t)*r,[(t*s[0]+l)*255,(t*s[1]+l)*255,(t*s[2]+l)*255]};$.hcg.hsv=function(n){let e=n[1]/100,t=n[2]/100,r=e+t*(1-e),s=0;return r>0&&(s=e/r),[n[0],s*100,r*100]};$.hcg.hsl=function(n){let e=n[1]/100,r=n[2]/100*(1-e)+.5*e,s=0;return r>0&&r<.5?s=e/(2*r):r>=.5&&r<1&&(s=e/(2*(1-r))),[n[0],s*100,r*100]};$.hcg.hwb=function(n){let e=n[1]/100,t=n[2]/100,r=e+t*(1-e);return[n[0],(r-e)*100,(1-r)*100]};$.hwb.hcg=function(n){let e=n[1]/100,r=1-n[2]/100,s=r-e,i=0;return s<1&&(i=(r-s)/(1-s)),[n[0],s*100,i*100]};$.apple.rgb=function(n){return[n[0]/65535*255,n[1]/65535*255,n[2]/65535*255]};$.rgb.apple=function(n){return[n[0]/255*65535,n[1]/255*65535,n[2]/255*65535]};$.gray.rgb=function(n){return[n[0]/100*255,n[0]/100*255,n[0]/100*255]};$.gray.hsl=function(n){return[0,0,n[0]]};$.gray.hsv=$.gray.hsl;$.gray.hwb=function(n){return[0,100,n[0]]};$.gray.cmyk=function(n){return[0,0,0,n[0]]};$.gray.lab=function(n){return[n[0],0,0]};$.gray.hex=function(n){let e=Math.round(n[0]/100*255)&255,r=((e<<16)+(e<<8)+e).toString(16).toUpperCase();return"000000".substring(r.length)+r};$.rgb.gray=function(n){return[(n[0]+n[1]+n[2])/3/255*100]}});var gc=p((F2,mc)=>{var _r=Mi();function Zg(){let n={},e=Object.keys(_r);for(let t=e.length,r=0;r<t;r++)n[e[r]]={distance:-1,parent:null};return n}function e0(n){let e=Zg(),t=[n];for(e[n].distance=0;t.length;){let r=t.pop(),s=Object.keys(_r[r]);for(let i=s.length,o=0;o<i;o++){let a=s[o],l=e[a];l.distance===-1&&(l.distance=e[r].distance+1,l.parent=r,t.unshift(a))}}return e}function t0(n,e){return function(t){return e(n(t))}}function n0(n,e){let t=[e[n].parent,n],r=_r[e[n].parent][n],s=e[n].parent;for(;e[s].parent;)t.unshift(e[s].parent),r=t0(_r[e[s].parent][s],r),s=e[s].parent;return r.conversion=t,r}mc.exports=function(n){let e=e0(n),t={},r=Object.keys(e);for(let s=r.length,i=0;i<s;i++){let o=r[i];e[o].parent!==null&&(t[o]=n0(o,e))}return t}});var Ec=p((D2,yc)=>{var Fi=Mi(),r0=gc(),jt={},s0=Object.keys(Fi);function i0(n){let e=function(...t){let r=t[0];return r==null?r:(r.length>1&&(t=r),n(t))};return"conversion"in n&&(e.conversion=n.conversion),e}function o0(n){let e=function(...t){let r=t[0];if(r==null)return r;r.length>1&&(t=r);let s=n(t);if(typeof s=="object")for(let i=s.length,o=0;o<i;o++)s[o]=Math.round(s[o]);return s};return"conversion"in n&&(e.conversion=n.conversion),e}s0.forEach(n=>{jt[n]={},Object.defineProperty(jt[n],"channels",{value:Fi[n].channels}),Object.defineProperty(jt[n],"labels",{value:Fi[n].labels});let e=r0(n);Object.keys(e).forEach(r=>{let s=e[r];jt[n][r]=o0(s),jt[n][r].raw=i0(s)})});yc.exports=jt});var Ic=p((j2,Lc)=>{"use strict";var Tc=(n,e)=>(...t)=>`\x1B[${n(...t)+e}m`,Sc=(n,e)=>(...t)=>{let r=n(...t);return`\x1B[${38+e};5;${r}m`},Ac=(n,e)=>(...t)=>{let r=n(...t);return`\x1B[${38+e};2;${r[0]};${r[1]};${r[2]}m`},mr=n=>n,wc=(n,e,t)=>[n,e,t],Bt=(n,e,t)=>{Object.defineProperty(n,e,{get:()=>{let r=t();return Object.defineProperty(n,e,{value:r,enumerable:!0,configurable:!0}),r},enumerable:!0,configurable:!0})},Di,Ut=(n,e,t,r)=>{Di===void 0&&(Di=Ec());let s=r?10:0,i={};for(let[o,a]of Object.entries(Di)){let l=o==="ansi16"?"ansi":o;o===e?i[l]=n(t,s):typeof a=="object"&&(i[l]=n(a[e],s))}return i};function a0(){let n=new Map,e={modifier:{reset:[0,0],bold:[1,22],dim:[2,22],italic:[3,23],underline:[4,24],inverse:[7,27],hidden:[8,28],strikethrough:[9,29]},color:{black:[30,39],red:[31,39],green:[32,39],yellow:[33,39],blue:[34,39],magenta:[35,39],cyan:[36,39],white:[37,39],blackBright:[90,39],redBright:[91,39],greenBright:[92,39],yellowBright:[93,39],blueBright:[94,39],magentaBright:[95,39],cyanBright:[96,39],whiteBright:[97,39]},bgColor:{bgBlack:[40,49],bgRed:[41,49],bgGreen:[42,49],bgYellow:[43,49],bgBlue:[44,49],bgMagenta:[45,49],bgCyan:[46,49],bgWhite:[47,49],bgBlackBright:[100,49],bgRedBright:[101,49],bgGreenBright:[102,49],bgYellowBright:[103,49],bgBlueBright:[104,49],bgMagentaBright:[105,49],bgCyanBright:[106,49],bgWhiteBright:[107,49]}};e.color.gray=e.color.blackBright,e.bgColor.bgGray=e.bgColor.bgBlackBright,e.color.grey=e.color.blackBright,e.bgColor.bgGrey=e.bgColor.bgBlackBright;for(let[t,r]of Object.entries(e)){for(let[s,i]of Object.entries(r))e[s]={open:`\x1B[${i[0]}m`,close:`\x1B[${i[1]}m`},r[s]=e[s],n.set(i[0],i[1]);Object.defineProperty(e,t,{value:r,enumerable:!1})}return Object.defineProperty(e,"codes",{value:n,enumerable:!1}),e.color.close="\x1B[39m",e.bgColor.close="\x1B[49m",Bt(e.color,"ansi",()=>Ut(Tc,"ansi16",mr,!1)),Bt(e.color,"ansi256",()=>Ut(Sc,"ansi256",mr,!1)),Bt(e.color,"ansi16m",()=>Ut(Ac,"rgb",wc,!1)),Bt(e.bgColor,"ansi",()=>Ut(Tc,"ansi16",mr,!0)),Bt(e.bgColor,"ansi256",()=>Ut(Sc,"ansi256",mr,!0)),Bt(e.bgColor,"ansi16m",()=>Ut(Ac,"rgb",wc,!0)),e}Object.defineProperty(Lc,"exports",{enumerable:!0,get:a0})});var vc=p((B2,bc)=>{"use strict";bc.exports=(n,e=process.argv)=>{let t=n.startsWith("-")?"":n.length===1?"-":"--",r=e.indexOf(t+n),s=e.indexOf("--");return r!==-1&&(s===-1||r<s)}});var Cc=p((U2,Oc)=>{"use strict";var l0=G("os"),Nc=G("tty"),qe=vc(),{env:pe}=process,lt;qe("no-color")||qe("no-colors")||qe("color=false")||qe("color=never")?lt=0:(qe("color")||qe("colors")||qe("color=true")||qe("color=always"))&&(lt=1);"FORCE_COLOR"in pe&&(pe.FORCE_COLOR==="true"?lt=1:pe.FORCE_COLOR==="false"?lt=0:lt=pe.FORCE_COLOR.length===0?1:Math.min(parseInt(pe.FORCE_COLOR,10),3));function ji(n){return n===0?!1:{level:n,hasBasic:!0,has256:n>=2,has16m:n>=3}}function Bi(n,e){if(lt===0)return 0;if(qe("color=16m")||qe("color=full")||qe("color=truecolor"))return 3;if(qe("color=256"))return 2;if(n&&!e&&lt===void 0)return 0;let t=lt||0;if(pe.TERM==="dumb")return t;if(process.platform==="win32"){let r=l0.release().split(".");return Number(r[0])>=10&&Number(r[2])>=10586?Number(r[2])>=14931?3:2:1}if("CI"in pe)return["TRAVIS","CIRCLECI","APPVEYOR","GITLAB_CI","GITHUB_ACTIONS","BUILDKITE"].some(r=>r in pe)||pe.CI_NAME==="codeship"?1:t;if("TEAMCITY_VERSION"in pe)return/^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(pe.TEAMCITY_VERSION)?1:0;if(pe.COLORTERM==="truecolor")return 3;if("TERM_PROGRAM"in pe){let r=parseInt((pe.TERM_PROGRAM_VERSION||"").split(".")[0],10);switch(pe.TERM_PROGRAM){case"iTerm.app":return r>=3?3:2;case"Apple_Terminal":return 2}}return/-256(color)?$/i.test(pe.TERM)?2:/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(pe.TERM)||"COLORTERM"in pe?1:t}function c0(n){let e=Bi(n,n&&n.isTTY);return ji(e)}Oc.exports={supportsColor:c0,stdout:ji(Bi(!0,Nc.isatty(1))),stderr:ji(Bi(!0,Nc.isatty(2)))}});var Pc=p((H2,Rc)=>{"use strict";var u0=(n,e,t)=>{let r=n.indexOf(e);if(r===-1)return n;let s=e.length,i=0,o="";do o+=n.substr(i,r-i)+e+t,i=r+s,r=n.indexOf(e,i);while(r!==-1);return o+=n.substr(i),o},f0=(n,e,t,r)=>{let s=0,i="";do{let o=n[r-1]==="\r";i+=n.substr(s,(o?r-1:r)-s)+e+(o?`\r
`:`
`)+t,s=r+1,r=n.indexOf(`
`,s)}while(r!==-1);return i+=n.substr(s),i};Rc.exports={stringReplaceAll:u0,stringEncaseCRLFWithFirstIndex:f0}});var Mc=p((V2,qc)=>{"use strict";var h0=/(?:\\(u(?:[a-f\d]{4}|\{[a-f\d]{1,6}\})|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi,kc=/(?:^|\.)(\w+)(?:\(([^)]*)\))?/g,d0=/^(['"])((?:\\.|(?!\1)[^\\])*)\1$/,p0=/\\(u(?:[a-f\d]{4}|{[a-f\d]{1,6}})|x[a-f\d]{2}|.)|([^\\])/gi,_0=new Map([["n",`
`],["r","\r"],["t","	"],["b","\b"],["f","\f"],["v","\v"],["0","\0"],["\\","\\"],["e","\x1B"],["a","\x07"]]);function xc(n){let e=n[0]==="u",t=n[1]==="{";return e&&!t&&n.length===5||n[0]==="x"&&n.length===3?String.fromCharCode(parseInt(n.slice(1),16)):e&&t?String.fromCodePoint(parseInt(n.slice(2,-1),16)):_0.get(n)||n}function m0(n,e){let t=[],r=e.trim().split(/\s*,\s*/g),s;for(let i of r){let o=Number(i);if(!Number.isNaN(o))t.push(o);else if(s=i.match(d0))t.push(s[2].replace(p0,(a,l,c)=>l?xc(l):c));else throw new Error(`Invalid Chalk template style argument: ${i} (in style '${n}')`)}return t}function g0(n){kc.lastIndex=0;let e=[],t;for(;(t=kc.exec(n))!==null;){let r=t[1];if(t[2]){let s=m0(r,t[2]);e.push([r].concat(s))}else e.push([r])}return e}function $c(n,e){let t={};for(let s of e)for(let i of s.styles)t[i[0]]=s.inverse?null:i.slice(1);let r=n;for(let[s,i]of Object.entries(t))if(Array.isArray(i)){if(!(s in r))throw new Error(`Unknown Chalk style: ${s}`);r=i.length>0?r[s](...i):r[s]}return r}qc.exports=(n,e)=>{let t=[],r=[],s=[];if(e.replace(h0,(i,o,a,l,c,u)=>{if(o)s.push(xc(o));else if(l){let f=s.join("");s=[],r.push(t.length===0?f:$c(n,t)(f)),t.push({inverse:a,styles:g0(l)})}else if(c){if(t.length===0)throw new Error("Found extraneous } in Chalk template literal");r.push($c(n,t)(s.join(""))),s=[],t.pop()}else s.push(u)}),r.push(s.join("")),t.length>0){let i=`Chalk template literal is missing ${t.length} closing bracket${t.length===1?"":"s"} (\`}\`)`;throw new Error(i)}return r.join("")}});var Vc=p((W2,Hc)=>{"use strict";var pn=Ic(),{stdout:Hi,stderr:Vi}=Cc(),{stringReplaceAll:y0,stringEncaseCRLFWithFirstIndex:E0}=Pc(),{isArray:gr}=Array,Dc=["ansi","ansi","ansi256","ansi16m"],Ht=Object.create(null),T0=(n,e={})=>{if(e.level&&!(Number.isInteger(e.level)&&e.level>=0&&e.level<=3))throw new Error("The `level` option should be an integer from 0 to 3");let t=Hi?Hi.level:0;n.level=e.level===void 0?t:e.level},Wi=class{constructor(e){return jc(e)}},jc=n=>{let e={};return T0(e,n),e.template=(...t)=>Uc(e.template,...t),Object.setPrototypeOf(e,yr.prototype),Object.setPrototypeOf(e.template,e),e.template.constructor=()=>{throw new Error("`chalk.constructor()` is deprecated. Use `new chalk.Instance()` instead.")},e.template.Instance=Wi,e.template};function yr(n){return jc(n)}for(let[n,e]of Object.entries(pn))Ht[n]={get(){let t=Er(this,Gi(e.open,e.close,this._styler),this._isEmpty);return Object.defineProperty(this,n,{value:t}),t}};Ht.visible={get(){let n=Er(this,this._styler,!0);return Object.defineProperty(this,"visible",{value:n}),n}};var Bc=["rgb","hex","keyword","hsl","hsv","hwb","ansi","ansi256"];for(let n of Bc)Ht[n]={get(){let{level:e}=this;return function(...t){let r=Gi(pn.color[Dc[e]][n](...t),pn.color.close,this._styler);return Er(this,r,this._isEmpty)}}};for(let n of Bc){let e="bg"+n[0].toUpperCase()+n.slice(1);Ht[e]={get(){let{level:t}=this;return function(...r){let s=Gi(pn.bgColor[Dc[t]][n](...r),pn.bgColor.close,this._styler);return Er(this,s,this._isEmpty)}}}}var S0=Object.defineProperties(()=>{},{...Ht,level:{enumerable:!0,get(){return this._generator.level},set(n){this._generator.level=n}}}),Gi=(n,e,t)=>{let r,s;return t===void 0?(r=n,s=e):(r=t.openAll+n,s=e+t.closeAll),{open:n,close:e,openAll:r,closeAll:s,parent:t}},Er=(n,e,t)=>{let r=(...s)=>gr(s[0])&&gr(s[0].raw)?Fc(r,Uc(r,...s)):Fc(r,s.length===1?""+s[0]:s.join(" "));return Object.setPrototypeOf(r,S0),r._generator=n,r._styler=e,r._isEmpty=t,r},Fc=(n,e)=>{if(n.level<=0||!e)return n._isEmpty?"":e;let t=n._styler;if(t===void 0)return e;let{openAll:r,closeAll:s}=t;if(e.indexOf("\x1B")!==-1)for(;t!==void 0;)e=y0(e,t.close,t.open),t=t.parent;let i=e.indexOf(`
`);return i!==-1&&(e=E0(e,s,r,i)),r+e+s},Ui,Uc=(n,...e)=>{let[t]=e;if(!gr(t)||!gr(t.raw))return e.join(" ");let r=e.slice(1),s=[t.raw[0]];for(let i=1;i<t.length;i++)s.push(String(r[i-1]).replace(/[{}\\]/g,"\\$&"),String(t.raw[i]));return Ui===void 0&&(Ui=Mc()),Ui(n,s.join(""))};Object.defineProperties(yr.prototype,Ht);var Tr=yr();Tr.supportsColor=Hi;Tr.stderr=yr({level:Vi?Vi.level:0});Tr.stderr.supportsColor=Vi;Hc.exports=Tr});var Gc=p((K2,I0)=>{I0.exports={name:"dotenv",version:"16.6.1",description:"Loads environment variables from .env file",main:"lib/main.js",types:"lib/main.d.ts",exports:{".":{types:"./lib/main.d.ts",require:"./lib/main.js",default:"./lib/main.js"},"./config":"./config.js","./config.js":"./config.js","./lib/env-options":"./lib/env-options.js","./lib/env-options.js":"./lib/env-options.js","./lib/cli-options":"./lib/cli-options.js","./lib/cli-options.js":"./lib/cli-options.js","./package.json":"./package.json"},scripts:{"dts-check":"tsc --project tests/types/tsconfig.json",lint:"standard",pretest:"npm run lint && npm run dts-check",test:"tap run --allow-empty-coverage --disable-coverage --timeout=60000","test:coverage":"tap run --show-full-coverage --timeout=60000 --coverage-report=text --coverage-report=lcov",prerelease:"npm test",release:"standard-version"},repository:{type:"git",url:"git://github.com/motdotla/dotenv.git"},homepage:"https://github.com/motdotla/dotenv#readme",funding:"https://dotenvx.com",keywords:["dotenv","env",".env","environment","variables","config","settings"],readmeFilename:"README.md",license:"BSD-2-Clause",devDependencies:{"@types/node":"^18.11.3",decache:"^4.6.2",sinon:"^14.0.1",standard:"^17.0.0","standard-version":"^9.5.0",tap:"^19.2.0",typescript:"^4.8.4"},engines:{node:">=12"},browser:{fs:!1}}});var zc=p((Y2,et)=>{var Ki=G("fs"),Ar=G("path"),b0=G("os"),v0=G("crypto"),N0=Gc(),Yi=N0.version,O0=/(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;function C0(n){let e={},t=n.toString();t=t.replace(/\r\n?/mg,`
`);let r;for(;(r=O0.exec(t))!=null;){let s=r[1],i=r[2]||"";i=i.trim();let o=i[0];i=i.replace(/^(['"`])([\s\S]*)\1$/mg,"$2"),o==='"'&&(i=i.replace(/\\n/g,`
`),i=i.replace(/\\r/g,"\r")),e[s]=i}return e}function R0(n){n=n||{};let e=Xc(n);n.path=e;let t=he.configDotenv(n);if(!t.parsed){let o=new Error(`MISSING_DATA: Cannot parse ${e} for an unknown reason`);throw o.code="MISSING_DATA",o}let r=Jc(n).split(","),s=r.length,i;for(let o=0;o<s;o++)try{let a=r[o].trim(),l=k0(t,a);i=he.decrypt(l.ciphertext,l.key);break}catch(a){if(o+1>=s)throw a}return he.parse(i)}function P0(n){console.log(`[dotenv@${Yi}][WARN] ${n}`)}function _n(n){console.log(`[dotenv@${Yi}][DEBUG] ${n}`)}function Yc(n){console.log(`[dotenv@${Yi}] ${n}`)}function Jc(n){return n&&n.DOTENV_KEY&&n.DOTENV_KEY.length>0?n.DOTENV_KEY:process.env.DOTENV_KEY&&process.env.DOTENV_KEY.length>0?process.env.DOTENV_KEY:""}function k0(n,e){let t;try{t=new URL(e)}catch(a){if(a.code==="ERR_INVALID_URL"){let l=new Error("INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenvx.com/vault/.env.vault?environment=development");throw l.code="INVALID_DOTENV_KEY",l}throw a}let r=t.password;if(!r){let a=new Error("INVALID_DOTENV_KEY: Missing key part");throw a.code="INVALID_DOTENV_KEY",a}let s=t.searchParams.get("environment");if(!s){let a=new Error("INVALID_DOTENV_KEY: Missing environment part");throw a.code="INVALID_DOTENV_KEY",a}let i=`DOTENV_VAULT_${s.toUpperCase()}`,o=n.parsed[i];if(!o){let a=new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${i} in your .env.vault file.`);throw a.code="NOT_FOUND_DOTENV_ENVIRONMENT",a}return{ciphertext:o,key:r}}function Xc(n){let e=null;if(n&&n.path&&n.path.length>0)if(Array.isArray(n.path))for(let t of n.path)Ki.existsSync(t)&&(e=t.endsWith(".vault")?t:`${t}.vault`);else e=n.path.endsWith(".vault")?n.path:`${n.path}.vault`;else e=Ar.resolve(process.cwd(),".env.vault");return Ki.existsSync(e)?e:null}function Kc(n){return n[0]==="~"?Ar.join(b0.homedir(),n.slice(1)):n}function $0(n){let e=!!(n&&n.debug),t=n&&"quiet"in n?n.quiet:!0;(e||!t)&&Yc("Loading env from encrypted .env.vault");let r=he._parseVault(n),s=process.env;return n&&n.processEnv!=null&&(s=n.processEnv),he.populate(s,r,n),{parsed:r}}function x0(n){let e=Ar.resolve(process.cwd(),".env"),t="utf8",r=!!(n&&n.debug),s=n&&"quiet"in n?n.quiet:!0;n&&n.encoding?t=n.encoding:r&&_n("No encoding is specified. UTF-8 is used by default");let i=[e];if(n&&n.path)if(!Array.isArray(n.path))i=[Kc(n.path)];else{i=[];for(let c of n.path)i.push(Kc(c))}let o,a={};for(let c of i)try{let u=he.parse(Ki.readFileSync(c,{encoding:t}));he.populate(a,u,n)}catch(u){r&&_n(`Failed to load ${c} ${u.message}`),o=u}let l=process.env;if(n&&n.processEnv!=null&&(l=n.processEnv),he.populate(l,a,n),r||!s){let c=Object.keys(a).length,u=[];for(let f of i)try{let h=Ar.relative(process.cwd(),f);u.push(h)}catch(h){r&&_n(`Failed to load ${f} ${h.message}`),o=h}Yc(`injecting env (${c}) from ${u.join(",")}`)}return o?{parsed:a,error:o}:{parsed:a}}function q0(n){if(Jc(n).length===0)return he.configDotenv(n);let e=Xc(n);return e?he._configVault(n):(P0(`You set DOTENV_KEY but you are missing a .env.vault file at ${e}. Did you forget to build it?`),he.configDotenv(n))}function M0(n,e){let t=Buffer.from(e.slice(-64),"hex"),r=Buffer.from(n,"base64"),s=r.subarray(0,12),i=r.subarray(-16);r=r.subarray(12,-16);try{let o=v0.createDecipheriv("aes-256-gcm",t,s);return o.setAuthTag(i),`${o.update(r)}${o.final()}`}catch(o){let a=o instanceof RangeError,l=o.message==="Invalid key length",c=o.message==="Unsupported state or unable to authenticate data";if(a||l){let u=new Error("INVALID_DOTENV_KEY: It must be 64 characters long (or more)");throw u.code="INVALID_DOTENV_KEY",u}else if(c){let u=new Error("DECRYPTION_FAILED: Please check your DOTENV_KEY");throw u.code="DECRYPTION_FAILED",u}else throw o}}function F0(n,e,t={}){let r=!!(t&&t.debug),s=!!(t&&t.override);if(typeof e!="object"){let i=new Error("OBJECT_REQUIRED: Please check the processEnv argument being passed to populate");throw i.code="OBJECT_REQUIRED",i}for(let i of Object.keys(e))Object.prototype.hasOwnProperty.call(n,i)?(s===!0&&(n[i]=e[i]),r&&_n(s===!0?`"${i}" is already defined and WAS overwritten`:`"${i}" is already defined and was NOT overwritten`)):n[i]=e[i]}var he={configDotenv:x0,_configVault:$0,_parseVault:R0,config:q0,decrypt:M0,parse:C0,populate:F0};et.exports.configDotenv=he.configDotenv;et.exports._configVault=he._configVault;et.exports._parseVault=he._parseVault;et.exports.config=he.config;et.exports.decrypt=he.decrypt;et.exports.parse=he.parse;et.exports.populate=he.populate;et.exports=he});var _e=p(Ji=>{"use strict";Ji.fromCallback=function(n){return Object.defineProperty(function(...e){if(typeof e[e.length-1]=="function")n.apply(this,e);else return new Promise((t,r)=>{e.push((s,i)=>s!=null?r(s):t(i)),n.apply(this,e)})},"name",{value:n.name})};Ji.fromPromise=function(n){return Object.defineProperty(function(...e){let t=e[e.length-1];if(typeof t!="function")return n.apply(this,e);e.pop(),n.apply(this,e).then(r=>t(null,r),t)},"name",{value:n.name})}});var Zc=p((X2,Qc)=>{var ct=G("constants"),D0=process.cwd,wr=null,j0=process.env.GRACEFUL_FS_PLATFORM||process.platform;process.cwd=function(){return wr||(wr=D0.call(process)),wr};try{process.cwd()}catch{}typeof process.chdir=="function"&&(Xi=process.chdir,process.chdir=function(n){wr=null,Xi.call(process,n)},Object.setPrototypeOf&&Object.setPrototypeOf(process.chdir,Xi));var Xi;Qc.exports=B0;function B0(n){ct.hasOwnProperty("O_SYMLINK")&&process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)&&e(n),n.lutimes||t(n),n.chown=i(n.chown),n.fchown=i(n.fchown),n.lchown=i(n.lchown),n.chmod=r(n.chmod),n.fchmod=r(n.fchmod),n.lchmod=r(n.lchmod),n.chownSync=o(n.chownSync),n.fchownSync=o(n.fchownSync),n.lchownSync=o(n.lchownSync),n.chmodSync=s(n.chmodSync),n.fchmodSync=s(n.fchmodSync),n.lchmodSync=s(n.lchmodSync),n.stat=a(n.stat),n.fstat=a(n.fstat),n.lstat=a(n.lstat),n.statSync=l(n.statSync),n.fstatSync=l(n.fstatSync),n.lstatSync=l(n.lstatSync),n.chmod&&!n.lchmod&&(n.lchmod=function(u,f,h){h&&process.nextTick(h)},n.lchmodSync=function(){}),n.chown&&!n.lchown&&(n.lchown=function(u,f,h,d){d&&process.nextTick(d)},n.lchownSync=function(){}),j0==="win32"&&(n.rename=typeof n.rename!="function"?n.rename:(function(u){function f(h,d,y){var m=Date.now(),_=0;u(h,d,function S(w){if(w&&(w.code==="EACCES"||w.code==="EPERM"||w.code==="EBUSY")&&Date.now()-m<6e4){setTimeout(function(){n.stat(d,function(I,x){I&&I.code==="ENOENT"?u(h,d,S):y(w)})},_),_<100&&(_+=10);return}y&&y(w)})}return Object.setPrototypeOf&&Object.setPrototypeOf(f,u),f})(n.rename)),n.read=typeof n.read!="function"?n.read:(function(u){function f(h,d,y,m,_,S){var w;if(S&&typeof S=="function"){var I=0;w=function(x,q,M){if(x&&x.code==="EAGAIN"&&I<10)return I++,u.call(n,h,d,y,m,_,w);S.apply(this,arguments)}}return u.call(n,h,d,y,m,_,w)}return Object.setPrototypeOf&&Object.setPrototypeOf(f,u),f})(n.read),n.readSync=typeof n.readSync!="function"?n.readSync:(function(u){return function(f,h,d,y,m){for(var _=0;;)try{return u.call(n,f,h,d,y,m)}catch(S){if(S.code==="EAGAIN"&&_<10){_++;continue}throw S}}})(n.readSync);function e(u){u.lchmod=function(f,h,d){u.open(f,ct.O_WRONLY|ct.O_SYMLINK,h,function(y,m){if(y){d&&d(y);return}u.fchmod(m,h,function(_){u.close(m,function(S){d&&d(_||S)})})})},u.lchmodSync=function(f,h){var d=u.openSync(f,ct.O_WRONLY|ct.O_SYMLINK,h),y=!0,m;try{m=u.fchmodSync(d,h),y=!1}finally{if(y)try{u.closeSync(d)}catch{}else u.closeSync(d)}return m}}function t(u){ct.hasOwnProperty("O_SYMLINK")&&u.futimes?(u.lutimes=function(f,h,d,y){u.open(f,ct.O_SYMLINK,function(m,_){if(m){y&&y(m);return}u.futimes(_,h,d,function(S){u.close(_,function(w){y&&y(S||w)})})})},u.lutimesSync=function(f,h,d){var y=u.openSync(f,ct.O_SYMLINK),m,_=!0;try{m=u.futimesSync(y,h,d),_=!1}finally{if(_)try{u.closeSync(y)}catch{}else u.closeSync(y)}return m}):u.futimes&&(u.lutimes=function(f,h,d,y){y&&process.nextTick(y)},u.lutimesSync=function(){})}function r(u){return u&&function(f,h,d){return u.call(n,f,h,function(y){c(y)&&(y=null),d&&d.apply(this,arguments)})}}function s(u){return u&&function(f,h){try{return u.call(n,f,h)}catch(d){if(!c(d))throw d}}}function i(u){return u&&function(f,h,d,y){return u.call(n,f,h,d,function(m){c(m)&&(m=null),y&&y.apply(this,arguments)})}}function o(u){return u&&function(f,h,d){try{return u.call(n,f,h,d)}catch(y){if(!c(y))throw y}}}function a(u){return u&&function(f,h,d){typeof h=="function"&&(d=h,h=null);function y(m,_){_&&(_.uid<0&&(_.uid+=4294967296),_.gid<0&&(_.gid+=4294967296)),d&&d.apply(this,arguments)}return h?u.call(n,f,h,y):u.call(n,f,y)}}function l(u){return u&&function(f,h){var d=h?u.call(n,f,h):u.call(n,f);return d&&(d.uid<0&&(d.uid+=4294967296),d.gid<0&&(d.gid+=4294967296)),d}}function c(u){if(!u||u.code==="ENOSYS")return!0;var f=!process.getuid||process.getuid()!==0;return!!(f&&(u.code==="EINVAL"||u.code==="EPERM"))}}});var nu=p((z2,tu)=>{var eu=G("stream").Stream;tu.exports=U0;function U0(n){return{ReadStream:e,WriteStream:t};function e(r,s){if(!(this instanceof e))return new e(r,s);eu.call(this);var i=this;this.path=r,this.fd=null,this.readable=!0,this.paused=!1,this.flags="r",this.mode=438,this.bufferSize=64*1024,s=s||{};for(var o=Object.keys(s),a=0,l=o.length;a<l;a++){var c=o[a];this[c]=s[c]}if(this.encoding&&this.setEncoding(this.encoding),this.start!==void 0){if(typeof this.start!="number")throw TypeError("start must be a Number");if(this.end===void 0)this.end=1/0;else if(typeof this.end!="number")throw TypeError("end must be a Number");if(this.start>this.end)throw new Error("start must be <= end");this.pos=this.start}if(this.fd!==null){process.nextTick(function(){i._read()});return}n.open(this.path,this.flags,this.mode,function(u,f){if(u){i.emit("error",u),i.readable=!1;return}i.fd=f,i.emit("open",f),i._read()})}function t(r,s){if(!(this instanceof t))return new t(r,s);eu.call(this),this.path=r,this.fd=null,this.writable=!0,this.flags="w",this.encoding="binary",this.mode=438,this.bytesWritten=0,s=s||{};for(var i=Object.keys(s),o=0,a=i.length;o<a;o++){var l=i[o];this[l]=s[l]}if(this.start!==void 0){if(typeof this.start!="number")throw TypeError("start must be a Number");if(this.start<0)throw new Error("start must be >= zero");this.pos=this.start}this.busy=!1,this._queue=[],this.fd===null&&(this._open=n.open,this._queue.push([this._open,this.path,this.flags,this.mode,void 0]),this.flush())}}});var su=p((Q2,ru)=>{"use strict";ru.exports=V0;var H0=Object.getPrototypeOf||function(n){return n.__proto__};function V0(n){if(n===null||typeof n!="object")return n;if(n instanceof Object)var e={__proto__:H0(n)};else var e=Object.create(null);return Object.getOwnPropertyNames(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}),e}});var Wt=p((Z2,Zi)=>{var oe=G("fs"),W0=Zc(),G0=nu(),K0=su(),Lr=G("util"),ge,br;typeof Symbol=="function"&&typeof Symbol.for=="function"?(ge=Symbol.for("graceful-fs.queue"),br=Symbol.for("graceful-fs.previous")):(ge="___graceful-fs.queue",br="___graceful-fs.previous");function Y0(){}function au(n,e){Object.defineProperty(n,ge,{get:function(){return e}})}var Nt=Y0;Lr.debuglog?Nt=Lr.debuglog("gfs4"):/\bgfs4\b/i.test(process.env.NODE_DEBUG||"")&&(Nt=function(){var n=Lr.format.apply(Lr,arguments);n="GFS4: "+n.split(/\n/).join(`
GFS4: `),console.error(n)});oe[ge]||(iu=global[ge]||[],au(oe,iu),oe.close=(function(n){function e(t,r){return n.call(oe,t,function(s){s||ou(),typeof r=="function"&&r.apply(this,arguments)})}return Object.defineProperty(e,br,{value:n}),e})(oe.close),oe.closeSync=(function(n){function e(t){n.apply(oe,arguments),ou()}return Object.defineProperty(e,br,{value:n}),e})(oe.closeSync),/\bgfs4\b/i.test(process.env.NODE_DEBUG||"")&&process.on("exit",function(){Nt(oe[ge]),G("assert").equal(oe[ge].length,0)}));var iu;global[ge]||au(global,oe[ge]);Zi.exports=zi(K0(oe));process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH&&!oe.__patched&&(Zi.exports=zi(oe),oe.__patched=!0);function zi(n){W0(n),n.gracefulify=zi,n.createReadStream=q,n.createWriteStream=M;var e=n.readFile;n.readFile=t;function t(C,B,j){return typeof B=="function"&&(j=B,B=null),D(C,B,j);function D(z,ne,Q,X){return e(z,ne,function(Z){Z&&(Z.code==="EMFILE"||Z.code==="ENFILE")?Vt([D,[z,ne,Q],Z,X||Date.now(),Date.now()]):typeof Q=="function"&&Q.apply(this,arguments)})}}var r=n.writeFile;n.writeFile=s;function s(C,B,j,D){return typeof j=="function"&&(D=j,j=null),z(C,B,j,D);function z(ne,Q,X,Z,ue){return r(ne,Q,X,function(re){re&&(re.code==="EMFILE"||re.code==="ENFILE")?Vt([z,[ne,Q,X,Z],re,ue||Date.now(),Date.now()]):typeof Z=="function"&&Z.apply(this,arguments)})}}var i=n.appendFile;i&&(n.appendFile=o);function o(C,B,j,D){return typeof j=="function"&&(D=j,j=null),z(C,B,j,D);function z(ne,Q,X,Z,ue){return i(ne,Q,X,function(re){re&&(re.code==="EMFILE"||re.code==="ENFILE")?Vt([z,[ne,Q,X,Z],re,ue||Date.now(),Date.now()]):typeof Z=="function"&&Z.apply(this,arguments)})}}var a=n.copyFile;a&&(n.copyFile=l);function l(C,B,j,D){return typeof j=="function"&&(D=j,j=0),z(C,B,j,D);function z(ne,Q,X,Z,ue){return a(ne,Q,X,function(re){re&&(re.code==="EMFILE"||re.code==="ENFILE")?Vt([z,[ne,Q,X,Z],re,ue||Date.now(),Date.now()]):typeof Z=="function"&&Z.apply(this,arguments)})}}var c=n.readdir;n.readdir=f;var u=/^v[0-5]\./;function f(C,B,j){typeof B=="function"&&(j=B,B=null);var D=u.test(process.version)?function(Q,X,Z,ue){return c(Q,z(Q,X,Z,ue))}:function(Q,X,Z,ue){return c(Q,X,z(Q,X,Z,ue))};return D(C,B,j);function z(ne,Q,X,Z){return function(ue,re){ue&&(ue.code==="EMFILE"||ue.code==="ENFILE")?Vt([D,[ne,Q,X],ue,Z||Date.now(),Date.now()]):(re&&re.sort&&re.sort(),typeof X=="function"&&X.call(this,ue,re))}}}if(process.version.substr(0,4)==="v0.8"){var h=G0(n);S=h.ReadStream,I=h.WriteStream}var d=n.ReadStream;d&&(S.prototype=Object.create(d.prototype),S.prototype.open=w);var y=n.WriteStream;y&&(I.prototype=Object.create(y.prototype),I.prototype.open=x),Object.defineProperty(n,"ReadStream",{get:function(){return S},set:function(C){S=C},enumerable:!0,configurable:!0}),Object.defineProperty(n,"WriteStream",{get:function(){return I},set:function(C){I=C},enumerable:!0,configurable:!0});var m=S;Object.defineProperty(n,"FileReadStream",{get:function(){return m},set:function(C){m=C},enumerable:!0,configurable:!0});var _=I;Object.defineProperty(n,"FileWriteStream",{get:function(){return _},set:function(C){_=C},enumerable:!0,configurable:!0});function S(C,B){return this instanceof S?(d.apply(this,arguments),this):S.apply(Object.create(S.prototype),arguments)}function w(){var C=this;R(C.path,C.flags,C.mode,function(B,j){B?(C.autoClose&&C.destroy(),C.emit("error",B)):(C.fd=j,C.emit("open",j),C.read())})}function I(C,B){return this instanceof I?(y.apply(this,arguments),this):I.apply(Object.create(I.prototype),arguments)}function x(){var C=this;R(C.path,C.flags,C.mode,function(B,j){B?(C.destroy(),C.emit("error",B)):(C.fd=j,C.emit("open",j))})}function q(C,B){return new n.ReadStream(C,B)}function M(C,B){return new n.WriteStream(C,B)}var J=n.open;n.open=R;function R(C,B,j,D){return typeof j=="function"&&(D=j,j=null),z(C,B,j,D);function z(ne,Q,X,Z,ue){return J(ne,Q,X,function(re,Si){re&&(re.code==="EMFILE"||re.code==="ENFILE")?Vt([z,[ne,Q,X,Z],re,ue||Date.now(),Date.now()]):typeof Z=="function"&&Z.apply(this,arguments)})}}return n}function Vt(n){Nt("ENQUEUE",n[0].name,n[1]),oe[ge].push(n),Qi()}var Ir;function ou(){for(var n=Date.now(),e=0;e<oe[ge].length;++e)oe[ge][e].length>2&&(oe[ge][e][3]=n,oe[ge][e][4]=n);Qi()}function Qi(){if(clearTimeout(Ir),Ir=void 0,oe[ge].length!==0){var n=oe[ge].shift(),e=n[0],t=n[1],r=n[2],s=n[3],i=n[4];if(s===void 0)Nt("RETRY",e.name,t),e.apply(null,t);else if(Date.now()-s>=6e4){Nt("TIMEOUT",e.name,t);var o=t.pop();typeof o=="function"&&o.call(null,r)}else{var a=Date.now()-i,l=Math.max(i-s,1),c=Math.min(l*1.2,100);a>=c?(Nt("RETRY",e.name,t),e.apply(null,t.concat([s]))):oe[ge].push(n)}Ir===void 0&&(Ir=setTimeout(Qi,0))}}});var Le=p(tt=>{"use strict";var lu=_e().fromCallback,we=Wt(),J0=["access","appendFile","chmod","chown","close","copyFile","cp","fchmod","fchown","fdatasync","fstat","fsync","ftruncate","futimes","glob","lchmod","lchown","lutimes","link","lstat","mkdir","mkdtemp","open","opendir","readdir","readFile","readlink","realpath","rename","rm","rmdir","stat","statfs","symlink","truncate","unlink","utimes","writeFile"].filter(n=>typeof we[n]=="function");Object.assign(tt,we);J0.forEach(n=>{tt[n]=lu(we[n])});tt.exists=function(n,e){return typeof e=="function"?we.exists(n,e):new Promise(t=>we.exists(n,t))};tt.read=function(n,e,t,r,s,i){return typeof i=="function"?we.read(n,e,t,r,s,i):new Promise((o,a)=>{we.read(n,e,t,r,s,(l,c,u)=>{if(l)return a(l);o({bytesRead:c,buffer:u})})})};tt.write=function(n,e,...t){return typeof t[t.length-1]=="function"?we.write(n,e,...t):new Promise((r,s)=>{we.write(n,e,...t,(i,o,a)=>{if(i)return s(i);r({bytesWritten:o,buffer:a})})})};tt.readv=function(n,e,...t){return typeof t[t.length-1]=="function"?we.readv(n,e,...t):new Promise((r,s)=>{we.readv(n,e,...t,(i,o,a)=>{if(i)return s(i);r({bytesRead:o,buffers:a})})})};tt.writev=function(n,e,...t){return typeof t[t.length-1]=="function"?we.writev(n,e,...t):new Promise((r,s)=>{we.writev(n,e,...t,(i,o,a)=>{if(i)return s(i);r({bytesWritten:o,buffers:a})})})};typeof we.realpath.native=="function"?tt.realpath.native=lu(we.realpath.native):process.emitWarning("fs.realpath.native is not a function. Is fs being monkey-patched?","Warning","fs-extra-WARN0003")});var uu=p((tN,cu)=>{"use strict";var X0=G("path");cu.exports.checkPath=function(e){if(process.platform==="win32"&&/[<>:"|?*]/.test(e.replace(X0.parse(e).root,""))){let r=new Error(`Path contains invalid characters: ${e}`);throw r.code="EINVAL",r}}});var pu=p((nN,eo)=>{"use strict";var fu=Le(),{checkPath:hu}=uu(),du=n=>{let e={mode:511};return typeof n=="number"?n:{...e,...n}.mode};eo.exports.makeDir=async(n,e)=>(hu(n),fu.mkdir(n,{mode:du(e),recursive:!0}));eo.exports.makeDirSync=(n,e)=>(hu(n),fu.mkdirSync(n,{mode:du(e),recursive:!0}))});var He=p((rN,_u)=>{"use strict";var z0=_e().fromPromise,{makeDir:Q0,makeDirSync:to}=pu(),no=z0(Q0);_u.exports={mkdirs:no,mkdirsSync:to,mkdirp:no,mkdirpSync:to,ensureDir:no,ensureDirSync:to}});var ut=p((sN,gu)=>{"use strict";var Z0=_e().fromPromise,mu=Le();function ey(n){return mu.access(n).then(()=>!0).catch(()=>!1)}gu.exports={pathExists:Z0(ey),pathExistsSync:mu.existsSync}});var ro=p((iN,yu)=>{"use strict";var Gt=Le(),ty=_e().fromPromise;async function ny(n,e,t){let r=await Gt.open(n,"r+"),s=null;try{await Gt.futimes(r,e,t)}finally{try{await Gt.close(r)}catch(i){s=i}}if(s)throw s}function ry(n,e,t){let r=Gt.openSync(n,"r+");return Gt.futimesSync(r,e,t),Gt.closeSync(r)}yu.exports={utimesMillis:ty(ny),utimesMillisSync:ry}});var Ot=p((oN,Au)=>{"use strict";var Kt=Le(),me=G("path"),Eu=_e().fromPromise;function sy(n,e,t){let r=t.dereference?s=>Kt.stat(s,{bigint:!0}):s=>Kt.lstat(s,{bigint:!0});return Promise.all([r(n),r(e).catch(s=>{if(s.code==="ENOENT")return null;throw s})]).then(([s,i])=>({srcStat:s,destStat:i}))}function iy(n,e,t){let r,s=t.dereference?o=>Kt.statSync(o,{bigint:!0}):o=>Kt.lstatSync(o,{bigint:!0}),i=s(n);try{r=s(e)}catch(o){if(o.code==="ENOENT")return{srcStat:i,destStat:null};throw o}return{srcStat:i,destStat:r}}async function oy(n,e,t,r){let{srcStat:s,destStat:i}=await sy(n,e,r);if(i){if(mn(s,i)){let o=me.basename(n),a=me.basename(e);if(t==="move"&&o!==a&&o.toLowerCase()===a.toLowerCase())return{srcStat:s,destStat:i,isChangingCase:!0};throw new Error("Source and destination must not be the same.")}if(s.isDirectory()&&!i.isDirectory())throw new Error(`Cannot overwrite non-directory '${e}' with directory '${n}'.`);if(!s.isDirectory()&&i.isDirectory())throw new Error(`Cannot overwrite directory '${e}' with non-directory '${n}'.`)}if(s.isDirectory()&&so(n,e))throw new Error(vr(n,e,t));return{srcStat:s,destStat:i}}function ay(n,e,t,r){let{srcStat:s,destStat:i}=iy(n,e,r);if(i){if(mn(s,i)){let o=me.basename(n),a=me.basename(e);if(t==="move"&&o!==a&&o.toLowerCase()===a.toLowerCase())return{srcStat:s,destStat:i,isChangingCase:!0};throw new Error("Source and destination must not be the same.")}if(s.isDirectory()&&!i.isDirectory())throw new Error(`Cannot overwrite non-directory '${e}' with directory '${n}'.`);if(!s.isDirectory()&&i.isDirectory())throw new Error(`Cannot overwrite directory '${e}' with non-directory '${n}'.`)}if(s.isDirectory()&&so(n,e))throw new Error(vr(n,e,t));return{srcStat:s,destStat:i}}async function Tu(n,e,t,r){let s=me.resolve(me.dirname(n)),i=me.resolve(me.dirname(t));if(i===s||i===me.parse(i).root)return;let o;try{o=await Kt.stat(i,{bigint:!0})}catch(a){if(a.code==="ENOENT")return;throw a}if(mn(e,o))throw new Error(vr(n,t,r));return Tu(n,e,i,r)}function Su(n,e,t,r){let s=me.resolve(me.dirname(n)),i=me.resolve(me.dirname(t));if(i===s||i===me.parse(i).root)return;let o;try{o=Kt.statSync(i,{bigint:!0})}catch(a){if(a.code==="ENOENT")return;throw a}if(mn(e,o))throw new Error(vr(n,t,r));return Su(n,e,i,r)}function mn(n,e){return e.ino!==void 0&&e.dev!==void 0&&e.ino===n.ino&&e.dev===n.dev}function so(n,e){let t=me.resolve(n).split(me.sep).filter(s=>s),r=me.resolve(e).split(me.sep).filter(s=>s);return t.every((s,i)=>r[i]===s)}function vr(n,e,t){return`Cannot ${t} '${n}' to a subdirectory of itself, '${e}'.`}Au.exports={checkPaths:Eu(oy),checkPathsSync:ay,checkParentPaths:Eu(Tu),checkParentPathsSync:Su,isSrcSubdir:so,areIdentical:mn}});var Lu=p((aN,wu)=>{"use strict";async function ly(n,e){let t=[];for await(let r of n)t.push(e(r).then(()=>null,s=>s??new Error("unknown error")));await Promise.all(t.map(r=>r.then(s=>{if(s!==null)throw s})))}wu.exports={asyncIteratorConcurrentProcess:ly}});var Ou=p((lN,Nu)=>{"use strict";var Ee=Le(),gn=G("path"),{mkdirs:cy}=He(),{pathExists:uy}=ut(),{utimesMillis:fy}=ro(),yn=Ot(),{asyncIteratorConcurrentProcess:hy}=Lu();async function dy(n,e,t={}){typeof t=="function"&&(t={filter:t}),t.clobber="clobber"in t?!!t.clobber:!0,t.overwrite="overwrite"in t?!!t.overwrite:t.clobber,t.preserveTimestamps&&process.arch==="ia32"&&process.emitWarning(`Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,"Warning","fs-extra-WARN0001");let{srcStat:r,destStat:s}=await yn.checkPaths(n,e,"copy",t);if(await yn.checkParentPaths(n,r,e,"copy"),!await bu(n,e,t))return;let o=gn.dirname(e);await uy(o)||await cy(o),await vu(s,n,e,t)}async function bu(n,e,t){return t.filter?t.filter(n,e):!0}async function vu(n,e,t,r){let i=await(r.dereference?Ee.stat:Ee.lstat)(e);if(i.isDirectory())return gy(i,n,e,t,r);if(i.isFile()||i.isCharacterDevice()||i.isBlockDevice())return py(i,n,e,t,r);if(i.isSymbolicLink())return yy(n,e,t,r);throw i.isSocket()?new Error(`Cannot copy a socket file: ${e}`):i.isFIFO()?new Error(`Cannot copy a FIFO pipe: ${e}`):new Error(`Unknown file: ${e}`)}async function py(n,e,t,r,s){if(!e)return Iu(n,t,r,s);if(s.overwrite)return await Ee.unlink(r),Iu(n,t,r,s);if(s.errorOnExist)throw new Error(`'${r}' already exists`)}async function Iu(n,e,t,r){if(await Ee.copyFile(e,t),r.preserveTimestamps){_y(n.mode)&&await my(t,n.mode);let s=await Ee.stat(e);await fy(t,s.atime,s.mtime)}return Ee.chmod(t,n.mode)}function _y(n){return(n&128)===0}function my(n,e){return Ee.chmod(n,e|128)}async function gy(n,e,t,r,s){e||await Ee.mkdir(r),await hy(await Ee.opendir(t),async i=>{let o=gn.join(t,i.name),a=gn.join(r,i.name);if(await bu(o,a,s)){let{destStat:c}=await yn.checkPaths(o,a,"copy",s);await vu(c,o,a,s)}}),e||await Ee.chmod(r,n.mode)}async function yy(n,e,t,r){let s=await Ee.readlink(e);if(r.dereference&&(s=gn.resolve(process.cwd(),s)),!n)return Ee.symlink(s,t);let i=null;try{i=await Ee.readlink(t)}catch(o){if(o.code==="EINVAL"||o.code==="UNKNOWN")return Ee.symlink(s,t);throw o}if(r.dereference&&(i=gn.resolve(process.cwd(),i)),s!==i){if(yn.isSrcSubdir(s,i))throw new Error(`Cannot copy '${s}' to a subdirectory of itself, '${i}'.`);if(yn.isSrcSubdir(i,s))throw new Error(`Cannot overwrite '${i}' with '${s}'.`)}return await Ee.unlink(t),Ee.symlink(s,t)}Nu.exports=dy});var $u=p((cN,ku)=>{"use strict";var Ie=Wt(),En=G("path"),Ey=He().mkdirsSync,Ty=ro().utimesMillisSync,Tn=Ot();function Sy(n,e,t){typeof t=="function"&&(t={filter:t}),t=t||{},t.clobber="clobber"in t?!!t.clobber:!0,t.overwrite="overwrite"in t?!!t.overwrite:t.clobber,t.preserveTimestamps&&process.arch==="ia32"&&process.emitWarning(`Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,"Warning","fs-extra-WARN0002");let{srcStat:r,destStat:s}=Tn.checkPathsSync(n,e,"copy",t);if(Tn.checkParentPathsSync(n,r,e,"copy"),t.filter&&!t.filter(n,e))return;let i=En.dirname(e);return Ie.existsSync(i)||Ey(i),Cu(s,n,e,t)}function Cu(n,e,t,r){let i=(r.dereference?Ie.statSync:Ie.lstatSync)(e);if(i.isDirectory())return Ny(i,n,e,t,r);if(i.isFile()||i.isCharacterDevice()||i.isBlockDevice())return Ay(i,n,e,t,r);if(i.isSymbolicLink())return Ry(n,e,t,r);throw i.isSocket()?new Error(`Cannot copy a socket file: ${e}`):i.isFIFO()?new Error(`Cannot copy a FIFO pipe: ${e}`):new Error(`Unknown file: ${e}`)}function Ay(n,e,t,r,s){return e?wy(n,t,r,s):Ru(n,t,r,s)}function wy(n,e,t,r){if(r.overwrite)return Ie.unlinkSync(t),Ru(n,e,t,r);if(r.errorOnExist)throw new Error(`'${t}' already exists`)}function Ru(n,e,t,r){return Ie.copyFileSync(e,t),r.preserveTimestamps&&Ly(n.mode,e,t),io(t,n.mode)}function Ly(n,e,t){return Iy(n)&&by(t,n),vy(e,t)}function Iy(n){return(n&128)===0}function by(n,e){return io(n,e|128)}function io(n,e){return Ie.chmodSync(n,e)}function vy(n,e){let t=Ie.statSync(n);return Ty(e,t.atime,t.mtime)}function Ny(n,e,t,r,s){return e?Pu(t,r,s):Oy(n.mode,t,r,s)}function Oy(n,e,t,r){return Ie.mkdirSync(t),Pu(e,t,r),io(t,n)}function Pu(n,e,t){let r=Ie.opendirSync(n);try{let s;for(;(s=r.readSync())!==null;)Cy(s.name,n,e,t)}finally{r.closeSync()}}function Cy(n,e,t,r){let s=En.join(e,n),i=En.join(t,n);if(r.filter&&!r.filter(s,i))return;let{destStat:o}=Tn.checkPathsSync(s,i,"copy",r);return Cu(o,s,i,r)}function Ry(n,e,t,r){let s=Ie.readlinkSync(e);if(r.dereference&&(s=En.resolve(process.cwd(),s)),n){let i;try{i=Ie.readlinkSync(t)}catch(o){if(o.code==="EINVAL"||o.code==="UNKNOWN")return Ie.symlinkSync(s,t);throw o}if(r.dereference&&(i=En.resolve(process.cwd(),i)),s!==i){if(Tn.isSrcSubdir(s,i))throw new Error(`Cannot copy '${s}' to a subdirectory of itself, '${i}'.`);if(Tn.isSrcSubdir(i,s))throw new Error(`Cannot overwrite '${i}' with '${s}'.`)}return Py(s,t)}else return Ie.symlinkSync(s,t)}function Py(n,e){return Ie.unlinkSync(e),Ie.symlinkSync(n,e)}ku.exports=Sy});var Nr=p((uN,xu)=>{"use strict";var ky=_e().fromPromise;xu.exports={copy:ky(Ou()),copySync:$u()}});var Sn=p((fN,Mu)=>{"use strict";var qu=Wt(),$y=_e().fromCallback;function xy(n,e){qu.rm(n,{recursive:!0,force:!0},e)}function qy(n){qu.rmSync(n,{recursive:!0,force:!0})}Mu.exports={remove:$y(xy),removeSync:qy}});var Wu=p((hN,Vu)=>{"use strict";var My=_e().fromPromise,ju=Le(),Bu=G("path"),Uu=He(),Hu=Sn(),Fu=My(async function(e){let t;try{t=await ju.readdir(e)}catch{return Uu.mkdirs(e)}return Promise.all(t.map(r=>Hu.remove(Bu.join(e,r))))});function Du(n){let e;try{e=ju.readdirSync(n)}catch{return Uu.mkdirsSync(n)}e.forEach(t=>{t=Bu.join(n,t),Hu.removeSync(t)})}Vu.exports={emptyDirSync:Du,emptydirSync:Du,emptyDir:Fu,emptydir:Fu}});var Ju=p((dN,Yu)=>{"use strict";var Fy=_e().fromPromise,Gu=G("path"),nt=Le(),Ku=He();async function Dy(n){let e;try{e=await nt.stat(n)}catch{}if(e&&e.isFile())return;let t=Gu.dirname(n),r=null;try{r=await nt.stat(t)}catch(s){if(s.code==="ENOENT"){await Ku.mkdirs(t),await nt.writeFile(n,"");return}else throw s}r.isDirectory()?await nt.writeFile(n,""):await nt.readdir(t)}function jy(n){let e;try{e=nt.statSync(n)}catch{}if(e&&e.isFile())return;let t=Gu.dirname(n);try{nt.statSync(t).isDirectory()||nt.readdirSync(t)}catch(r){if(r&&r.code==="ENOENT")Ku.mkdirsSync(t);else throw r}nt.writeFileSync(n,"")}Yu.exports={createFile:Fy(Dy),createFileSync:jy}});var ef=p((pN,Zu)=>{"use strict";var By=_e().fromPromise,Xu=G("path"),ft=Le(),zu=He(),{pathExists:Uy}=ut(),{areIdentical:Qu}=Ot();async function Hy(n,e){let t;try{t=await ft.lstat(e)}catch{}let r;try{r=await ft.lstat(n)}catch(o){throw o.message=o.message.replace("lstat","ensureLink"),o}if(t&&Qu(r,t))return;let s=Xu.dirname(e);await Uy(s)||await zu.mkdirs(s),await ft.link(n,e)}function Vy(n,e){let t;try{t=ft.lstatSync(e)}catch{}try{let i=ft.lstatSync(n);if(t&&Qu(i,t))return}catch(i){throw i.message=i.message.replace("lstat","ensureLink"),i}let r=Xu.dirname(e);return ft.existsSync(r)||zu.mkdirsSync(r),ft.linkSync(n,e)}Zu.exports={createLink:By(Hy),createLinkSync:Vy}});var nf=p((_N,tf)=>{"use strict";var ht=G("path"),An=Le(),{pathExists:Wy}=ut(),Gy=_e().fromPromise;async function Ky(n,e){if(ht.isAbsolute(n)){try{await An.lstat(n)}catch(i){throw i.message=i.message.replace("lstat","ensureSymlink"),i}return{toCwd:n,toDst:n}}let t=ht.dirname(e),r=ht.join(t,n);if(await Wy(r))return{toCwd:r,toDst:n};try{await An.lstat(n)}catch(i){throw i.message=i.message.replace("lstat","ensureSymlink"),i}return{toCwd:n,toDst:ht.relative(t,n)}}function Yy(n,e){if(ht.isAbsolute(n)){if(!An.existsSync(n))throw new Error("absolute srcpath does not exist");return{toCwd:n,toDst:n}}let t=ht.dirname(e),r=ht.join(t,n);if(An.existsSync(r))return{toCwd:r,toDst:n};if(!An.existsSync(n))throw new Error("relative srcpath does not exist");return{toCwd:n,toDst:ht.relative(t,n)}}tf.exports={symlinkPaths:Gy(Ky),symlinkPathsSync:Yy}});var of=p((mN,sf)=>{"use strict";var rf=Le(),Jy=_e().fromPromise;async function Xy(n,e){if(e)return e;let t;try{t=await rf.lstat(n)}catch{return"file"}return t&&t.isDirectory()?"dir":"file"}function zy(n,e){if(e)return e;let t;try{t=rf.lstatSync(n)}catch{return"file"}return t&&t.isDirectory()?"dir":"file"}sf.exports={symlinkType:Jy(Xy),symlinkTypeSync:zy}});var uf=p((gN,cf)=>{"use strict";var Qy=_e().fromPromise,af=G("path"),Ke=Le(),{mkdirs:Zy,mkdirsSync:eE}=He(),{symlinkPaths:tE,symlinkPathsSync:nE}=nf(),{symlinkType:rE,symlinkTypeSync:sE}=of(),{pathExists:iE}=ut(),{areIdentical:lf}=Ot();async function oE(n,e,t){let r;try{r=await Ke.lstat(e)}catch{}if(r&&r.isSymbolicLink()){let[a,l]=await Promise.all([Ke.stat(n),Ke.stat(e)]);if(lf(a,l))return}let s=await tE(n,e);n=s.toDst;let i=await rE(s.toCwd,t),o=af.dirname(e);return await iE(o)||await Zy(o),Ke.symlink(n,e,i)}function aE(n,e,t){let r;try{r=Ke.lstatSync(e)}catch{}if(r&&r.isSymbolicLink()){let a=Ke.statSync(n),l=Ke.statSync(e);if(lf(a,l))return}let s=nE(n,e);n=s.toDst,t=sE(s.toCwd,t);let i=af.dirname(e);return Ke.existsSync(i)||eE(i),Ke.symlinkSync(n,e,t)}cf.exports={createSymlink:Qy(oE),createSymlinkSync:aE}});var yf=p((yN,gf)=>{"use strict";var{createFile:ff,createFileSync:hf}=Ju(),{createLink:df,createLinkSync:pf}=ef(),{createSymlink:_f,createSymlinkSync:mf}=uf();gf.exports={createFile:ff,createFileSync:hf,ensureFile:ff,ensureFileSync:hf,createLink:df,createLinkSync:pf,ensureLink:df,ensureLinkSync:pf,createSymlink:_f,createSymlinkSync:mf,ensureSymlink:_f,ensureSymlinkSync:mf}});var Or=p((EN,Ef)=>{function lE(n,{EOL:e=`
`,finalEOL:t=!0,replacer:r=null,spaces:s}={}){let i=t?e:"";return JSON.stringify(n,r,s).replace(/\n/g,e)+i}function cE(n){return Buffer.isBuffer(n)&&(n=n.toString("utf8")),n.replace(/^\uFEFF/,"")}Ef.exports={stringify:lE,stripBom:cE}});var wf=p((TN,Af)=>{var Yt;try{Yt=Wt()}catch{Yt=G("fs")}var Cr=_e(),{stringify:Tf,stripBom:Sf}=Or();async function uE(n,e={}){typeof e=="string"&&(e={encoding:e});let t=e.fs||Yt,r="throws"in e?e.throws:!0,s=await Cr.fromCallback(t.readFile)(n,e);s=Sf(s);let i;try{i=JSON.parse(s,e?e.reviver:null)}catch(o){if(r)throw o.message=`${n}: ${o.message}`,o;return null}return i}var fE=Cr.fromPromise(uE);function hE(n,e={}){typeof e=="string"&&(e={encoding:e});let t=e.fs||Yt,r="throws"in e?e.throws:!0;try{let s=t.readFileSync(n,e);return s=Sf(s),JSON.parse(s,e.reviver)}catch(s){if(r)throw s.message=`${n}: ${s.message}`,s;return null}}async function dE(n,e,t={}){let r=t.fs||Yt,s=Tf(e,t);await Cr.fromCallback(r.writeFile)(n,s,t)}var pE=Cr.fromPromise(dE);function _E(n,e,t={}){let r=t.fs||Yt,s=Tf(e,t);return r.writeFileSync(n,s,t)}Af.exports={readFile:fE,readFileSync:hE,writeFile:pE,writeFileSync:_E}});var If=p((SN,Lf)=>{"use strict";var Rr=wf();Lf.exports={readJson:Rr.readFile,readJsonSync:Rr.readFileSync,writeJson:Rr.writeFile,writeJsonSync:Rr.writeFileSync}});var Pr=p((AN,Nf)=>{"use strict";var mE=_e().fromPromise,oo=Le(),bf=G("path"),vf=He(),gE=ut().pathExists;async function yE(n,e,t="utf-8"){let r=bf.dirname(n);return await gE(r)||await vf.mkdirs(r),oo.writeFile(n,e,t)}function EE(n,...e){let t=bf.dirname(n);oo.existsSync(t)||vf.mkdirsSync(t),oo.writeFileSync(n,...e)}Nf.exports={outputFile:mE(yE),outputFileSync:EE}});var Cf=p((wN,Of)=>{"use strict";var{stringify:TE}=Or(),{outputFile:SE}=Pr();async function AE(n,e,t={}){let r=TE(e,t);await SE(n,r,t)}Of.exports=AE});var Pf=p((LN,Rf)=>{"use strict";var{stringify:wE}=Or(),{outputFileSync:LE}=Pr();function IE(n,e,t){let r=wE(e,t);LE(n,r,t)}Rf.exports=IE});var $f=p((IN,kf)=>{"use strict";var bE=_e().fromPromise,be=If();be.outputJson=bE(Cf());be.outputJsonSync=Pf();be.outputJSON=be.outputJson;be.outputJSONSync=be.outputJsonSync;be.writeJSON=be.writeJson;be.writeJSONSync=be.writeJsonSync;be.readJSON=be.readJson;be.readJSONSync=be.readJsonSync;kf.exports=be});var Df=p((bN,Ff)=>{"use strict";var vE=Le(),xf=G("path"),{copy:NE}=Nr(),{remove:Mf}=Sn(),{mkdirp:OE}=He(),{pathExists:CE}=ut(),qf=Ot();async function RE(n,e,t={}){let r=t.overwrite||t.clobber||!1,{srcStat:s,isChangingCase:i=!1}=await qf.checkPaths(n,e,"move",t);await qf.checkParentPaths(n,s,e,"move");let o=xf.dirname(e);return xf.parse(o).root!==o&&await OE(o),PE(n,e,r,i)}async function PE(n,e,t,r){if(!r){if(t)await Mf(e);else if(await CE(e))throw new Error("dest already exists.")}try{await vE.rename(n,e)}catch(s){if(s.code!=="EXDEV")throw s;await kE(n,e,t)}}async function kE(n,e,t){return await NE(n,e,{overwrite:t,errorOnExist:!0,preserveTimestamps:!0}),Mf(n)}Ff.exports=RE});var Vf=p((vN,Hf)=>{"use strict";var Bf=Wt(),lo=G("path"),$E=Nr().copySync,Uf=Sn().removeSync,xE=He().mkdirpSync,jf=Ot();function qE(n,e,t){t=t||{};let r=t.overwrite||t.clobber||!1,{srcStat:s,isChangingCase:i=!1}=jf.checkPathsSync(n,e,"move",t);return jf.checkParentPathsSync(n,s,e,"move"),ME(e)||xE(lo.dirname(e)),FE(n,e,r,i)}function ME(n){let e=lo.dirname(n);return lo.parse(e).root===e}function FE(n,e,t,r){if(r)return ao(n,e,t);if(t)return Uf(e),ao(n,e,t);if(Bf.existsSync(e))throw new Error("dest already exists.");return ao(n,e,t)}function ao(n,e,t){try{Bf.renameSync(n,e)}catch(r){if(r.code!=="EXDEV")throw r;return DE(n,e,t)}}function DE(n,e,t){return $E(n,e,{overwrite:t,errorOnExist:!0,preserveTimestamps:!0}),Uf(n)}Hf.exports=qE});var Gf=p((NN,Wf)=>{"use strict";var jE=_e().fromPromise;Wf.exports={move:jE(Df()),moveSync:Vf()}});var dt=p((ON,Kf)=>{"use strict";Kf.exports={...Le(),...Nr(),...Wu(),...yf(),...$f(),...He(),...Gf(),...Pr(),...ut(),...Sn()}});var Qf=p((DN,po)=>{typeof Object.create=="function"?po.exports=function(e,t){t&&(e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}))}:po.exports=function(e,t){if(t){e.super_=t;var r=function(){};r.prototype=t.prototype,e.prototype=new r,e.prototype.constructor=e}}});var Zf=p((jN,mo)=>{try{if(_o=G("util"),typeof _o.inherits!="function")throw"";mo.exports=_o.inherits}catch{mo.exports=Qf()}var _o});var th=p((BN,yo)=>{var KE=Zf(),eh=G("events").EventEmitter;yo.exports=$e;yo.exports.default=$e;function $e(n){if(!(this instanceof $e))return new $e(n);eh.call(this),n=n||{},this.concurrency=n.concurrency||1/0,this.timeout=n.timeout||0,this.autostart=n.autostart||!1,this.results=n.results||null,this.pending=0,this.session=0,this.running=!1,this.jobs=[],this.timers={}}KE($e,eh);var YE=["pop","shift","indexOf","lastIndexOf"];YE.forEach(function(n){$e.prototype[n]=function(){return Array.prototype[n].apply(this.jobs,arguments)}});$e.prototype.slice=function(n,e){return this.jobs=this.jobs.slice(n,e),this};$e.prototype.reverse=function(){return this.jobs.reverse(),this};var JE=["push","unshift","splice"];JE.forEach(function(n){$e.prototype[n]=function(){var e=Array.prototype[n].apply(this.jobs,arguments);return this.autostart&&this.start(),e}});Object.defineProperty($e.prototype,"length",{get:function(){return this.pending+this.jobs.length}});$e.prototype.start=function(n){if(n&&zE.call(this,n),this.running=!0,this.pending>=this.concurrency)return;if(this.jobs.length===0){this.pending===0&&go.call(this);return}var e=this,t=this.jobs.shift(),r=!0,s=this.session,i=null,o=!1,a=null,l=t.hasOwnProperty("timeout")?t.timeout:this.timeout;function c(f,h){r&&e.session===s&&(r=!1,e.pending--,i!==null&&(delete e.timers[i],clearTimeout(i)),f?e.emit("error",f,t):o===!1&&(a!==null&&(e.results[a]=Array.prototype.slice.call(arguments,1)),e.emit("success",h,t)),e.session===s&&(e.pending===0&&e.jobs.length===0?go.call(e):e.running&&e.start()))}l&&(i=setTimeout(function(){o=!0,e.listeners("timeout").length>0?e.emit("timeout",c,t):c()},l),this.timers[i]=i),this.results&&(a=this.results.length,this.results[a]=null),this.pending++,e.emit("start",t);var u=t(c);u&&u.then&&typeof u.then=="function"&&u.then(function(f){return c(null,f)}).catch(function(f){return c(f||!0)}),this.running&&this.jobs.length>0&&this.start()};$e.prototype.stop=function(){this.running=!1};$e.prototype.end=function(n){XE.call(this),this.jobs.length=0,this.pending=0,go.call(this,n)};function XE(){for(var n in this.timers){var e=this.timers[n];delete this.timers[n],clearTimeout(e)}}function zE(n){var e=this;this.on("error",t),this.on("end",r);function t(s){e.end(s)}function r(s){e.removeListener("error",t),e.removeListener("end",r),n(s,this.results)}}function go(n){this.session++,this.running=!1,this.emit("end",n)}});var ae=p(ee=>{"use strict";Object.defineProperty(ee,"__esModule",{value:!0});ee.findBox=ee.readUInt=ee.readUInt32LE=ee.readUInt32BE=ee.readInt32LE=ee.readUInt24LE=ee.readUInt16LE=ee.readUInt16BE=ee.readInt16LE=ee.toHexString=ee.toUTF8String=void 0;var QE=new TextDecoder,ZE=(n,e=0,t=n.length)=>QE.decode(n.slice(e,t));ee.toUTF8String=ZE;var e1=(n,e=0,t=n.length)=>n.slice(e,t).reduce((r,s)=>r+("0"+s.toString(16)).slice(-2),"");ee.toHexString=e1;var t1=(n,e=0)=>{let t=n[e]+n[e+1]*256;return t|(t&2**15)*131070};ee.readInt16LE=t1;var n1=(n,e=0)=>n[e]*2**8+n[e+1];ee.readUInt16BE=n1;var r1=(n,e=0)=>n[e]+n[e+1]*2**8;ee.readUInt16LE=r1;var s1=(n,e=0)=>n[e]+n[e+1]*2**8+n[e+2]*2**16;ee.readUInt24LE=s1;var i1=(n,e=0)=>n[e]+n[e+1]*2**8+n[e+2]*2**16+(n[e+3]<<24);ee.readInt32LE=i1;var o1=(n,e=0)=>n[e]*2**24+n[e+1]*2**16+n[e+2]*2**8+n[e+3];ee.readUInt32BE=o1;var a1=(n,e=0)=>n[e]+n[e+1]*2**8+n[e+2]*2**16+n[e+3]*2**24;ee.readUInt32LE=a1;var l1={readUInt16BE:ee.readUInt16BE,readUInt16LE:ee.readUInt16LE,readUInt32BE:ee.readUInt32BE,readUInt32LE:ee.readUInt32LE};function c1(n,e,t,r){t=t||0;let s=r?"BE":"LE",i="readUInt"+e+s;return l1[i](n,t)}ee.readUInt=c1;function u1(n,e){if(n.length-e<4)return;let t=(0,ee.readUInt32BE)(n,e);if(!(n.length-e<t))return{name:(0,ee.toUTF8String)(n,4+e,8+e),offset:e,size:t}}function f1(n,e,t){for(;t<n.length;){let r=u1(n,t);if(!r)break;if(r.name===e)return r;t+=r.size>0?r.size:8}}ee.findBox=f1});var nh=p(xr=>{"use strict";Object.defineProperty(xr,"__esModule",{value:!0});xr.BMP=void 0;var Eo=ae();xr.BMP={validate:n=>(0,Eo.toUTF8String)(n,0,2)==="BM",calculate:n=>({height:Math.abs((0,Eo.readInt32LE)(n,22)),width:(0,Eo.readUInt32LE)(n,18)})}});var To=p(Mr=>{"use strict";Object.defineProperty(Mr,"__esModule",{value:!0});Mr.ICO=void 0;var qr=ae(),h1=1,d1=6,p1=16;function rh(n,e){let t=n[e];return t===0?256:t}function sh(n,e){let t=d1+e*p1;return{height:rh(n,t+1),width:rh(n,t)}}Mr.ICO={validate(n){let e=(0,qr.readUInt16LE)(n,0),t=(0,qr.readUInt16LE)(n,4);return e!==0||t===0?!1:(0,qr.readUInt16LE)(n,2)===h1},calculate(n){let e=(0,qr.readUInt16LE)(n,4),t=sh(n,0);if(e===1)return t;let r=[t];for(let s=1;s<e;s+=1)r.push(sh(n,s));return{height:t.height,images:r,width:t.width}}}});var ih=p(Fr=>{"use strict";Object.defineProperty(Fr,"__esModule",{value:!0});Fr.CUR=void 0;var _1=To(),So=ae(),m1=2;Fr.CUR={validate(n){let e=(0,So.readUInt16LE)(n,0),t=(0,So.readUInt16LE)(n,4);return e!==0||t===0?!1:(0,So.readUInt16LE)(n,2)===m1},calculate:n=>_1.ICO.calculate(n)}});var oh=p(Dr=>{"use strict";Object.defineProperty(Dr,"__esModule",{value:!0});Dr.DDS=void 0;var Ao=ae();Dr.DDS={validate:n=>(0,Ao.readUInt32LE)(n,0)===542327876,calculate:n=>({height:(0,Ao.readUInt32LE)(n,12),width:(0,Ao.readUInt32LE)(n,16)})}});var ah=p(jr=>{"use strict";Object.defineProperty(jr,"__esModule",{value:!0});jr.GIF=void 0;var wo=ae(),g1=/^GIF8[79]a/;jr.GIF={validate:n=>g1.test((0,wo.toUTF8String)(n,0,6)),calculate:n=>({height:(0,wo.readUInt16LE)(n,8),width:(0,wo.readUInt16LE)(n,6)})}});var lh=p(Br=>{"use strict";Object.defineProperty(Br,"__esModule",{value:!0});Br.HEIF=void 0;var Je=ae(),y1={avif:"avif",mif1:"heif",msf1:"heif",heic:"heic",heix:"heic",hevc:"heic",hevx:"heic"};Br.HEIF={validate(n){if((0,Je.toUTF8String)(n,4,8)!=="ftyp")return!1;let t=(0,Je.findBox)(n,"ftyp",0);return t?(0,Je.toUTF8String)(n,t.offset+8,t.offset+12)in y1:!1},calculate(n){let e=(0,Je.findBox)(n,"meta",0),t=e&&(0,Je.findBox)(n,"iprp",e.offset+12),r=t&&(0,Je.findBox)(n,"ipco",t.offset+8),s=r&&(0,Je.findBox)(n,"ispe",r.offset+8);if(s)return{height:(0,Je.readUInt32BE)(n,s.offset+16),width:(0,Je.readUInt32BE)(n,s.offset+12),type:(0,Je.toUTF8String)(n,8,12)};throw new TypeError("Invalid HEIF, no size found")}}});var fh=p(Hr=>{"use strict";Object.defineProperty(Hr,"__esModule",{value:!0});Hr.ICNS=void 0;var Ur=ae(),E1=8,T1=4,S1=4,A1={ICON:32,"ICN#":32,"icm#":16,icm4:16,icm8:16,"ics#":16,ics4:16,ics8:16,is32:16,s8mk:16,icp4:16,icl4:32,icl8:32,il32:32,l8mk:32,icp5:32,ic11:32,ich4:48,ich8:48,ih32:48,h8mk:48,icp6:64,ic12:32,it32:128,t8mk:128,ic07:128,ic08:256,ic13:256,ic09:512,ic14:512,ic10:1024};function ch(n,e){let t=e+S1;return[(0,Ur.toUTF8String)(n,e,t),(0,Ur.readUInt32BE)(n,t)]}function uh(n){let e=A1[n];return{width:e,height:e,type:n}}Hr.ICNS={validate:n=>(0,Ur.toUTF8String)(n,0,4)==="icns",calculate(n){let e=n.length,t=(0,Ur.readUInt32BE)(n,T1),r=E1,s=ch(n,r),i=uh(s[0]);if(r+=s[1],r===t)return i;let o={height:i.height,images:[i],width:i.width};for(;r<t&&r<e;)s=ch(n,r),i=uh(s[0]),r+=s[1],o.images.push(i);return o}}});var hh=p(Vr=>{"use strict";Object.defineProperty(Vr,"__esModule",{value:!0});Vr.J2C=void 0;var Lo=ae();Vr.J2C={validate:n=>(0,Lo.readUInt32BE)(n,0)===4283432785,calculate:n=>({height:(0,Lo.readUInt32BE)(n,12),width:(0,Lo.readUInt32BE)(n,8)})}});var dh=p(Wr=>{"use strict";Object.defineProperty(Wr,"__esModule",{value:!0});Wr.JP2=void 0;var Rt=ae();Wr.JP2={validate(n){if((0,Rt.toUTF8String)(n,4,8)!=="jP  ")return!1;let t=(0,Rt.findBox)(n,"ftyp",0);return t?(0,Rt.toUTF8String)(n,t.offset+8,t.offset+12)==="jp2 ":!1},calculate(n){let e=(0,Rt.findBox)(n,"jp2h",0),t=e&&(0,Rt.findBox)(n,"ihdr",e.offset+8);if(t)return{height:(0,Rt.readUInt32BE)(n,t.offset+8),width:(0,Rt.readUInt32BE)(n,t.offset+12)};throw new TypeError("Unsupported JPEG 2000 format")}}});var _h=p(Gr=>{"use strict";Object.defineProperty(Gr,"__esModule",{value:!0});Gr.JPG=void 0;var Ve=ae(),w1="45786966",L1=2,Io=6,I1=2,b1="4d4d",v1="4949",ph=12,N1=2;function O1(n){return(0,Ve.toHexString)(n,2,6)===w1}function C1(n,e){return{height:(0,Ve.readUInt16BE)(n,e),width:(0,Ve.readUInt16BE)(n,e+2)}}function R1(n,e){let r=Io+8,s=(0,Ve.readUInt)(n,16,r,e);for(let i=0;i<s;i++){let o=r+N1+i*ph,a=o+ph;if(o>n.length)return;let l=n.slice(o,a);if((0,Ve.readUInt)(l,16,0,e)===274)return(0,Ve.readUInt)(l,16,2,e)!==3||(0,Ve.readUInt)(l,32,4,e)!==1?void 0:(0,Ve.readUInt)(l,16,8,e)}}function P1(n,e){let t=n.slice(L1,e),r=(0,Ve.toHexString)(t,Io,Io+I1),s=r===b1;if(s||r===v1)return R1(t,s)}function k1(n,e){if(e>n.length)throw new TypeError("Corrupt JPG, exceeded buffer limits")}Gr.JPG={validate:n=>(0,Ve.toHexString)(n,0,2)==="ffd8",calculate(n){n=n.slice(4);let e,t;for(;n.length;){let r=(0,Ve.readUInt16BE)(n,0);if(n[r]!==255){n=n.slice(1);continue}if(O1(n)&&(e=P1(n,r)),k1(n,r),t=n[r+1],t===192||t===193||t===194){let s=C1(n,r+5);return e?{height:s.height,orientation:e,width:s.width}:s}n=n.slice(r+2)}throw new TypeError("Invalid JPG, no size found")}}});var mh=p(Kr=>{"use strict";Object.defineProperty(Kr,"__esModule",{value:!0});Kr.BitReader=void 0;var bo=class{constructor(e,t){this.input=e,this.endianness=t,this.byteOffset=2,this.bitOffset=0}getBits(e=1){let t=0,r=0;for(;r<e;){if(this.byteOffset>=this.input.length)throw new Error("Reached end of input");let s=this.input[this.byteOffset],i=8-this.bitOffset,o=Math.min(e-r,i);if(this.endianness==="little-endian"){let a=(1<<o)-1,l=s>>this.bitOffset&a;t|=l<<r}else{let a=(1<<o)-1<<8-this.bitOffset-o,l=(s&a)>>8-this.bitOffset-o;t=t<<o|l}r+=o,this.bitOffset+=o,this.bitOffset===8&&(this.byteOffset++,this.bitOffset=0)}return t}};Kr.BitReader=bo});var vo=p(Yr=>{"use strict";Object.defineProperty(Yr,"__esModule",{value:!0});Yr.JXLStream=void 0;var $1=ae(),x1=mh();function gh(n,e){if(e)return 8*(1+n.getBits(5));{let t=n.getBits(2),r=[9,13,18,30][t];return 1+n.getBits(r)}}function q1(n,e,t,r){return e&&t===0?8*(1+n.getBits(5)):t===0?gh(n,!1):Math.floor(r*[1,1.2,1.3333333333333333,1.5,1.7777777777777777,1.25,2][t-1])}Yr.JXLStream={validate:n=>(0,$1.toHexString)(n,0,2)==="ff0a",calculate(n){let e=new x1.BitReader(n,"little-endian"),t=e.getBits(1)===1,r=gh(e,t),s=e.getBits(3);return{width:q1(e,t,s,r),height:r}}}});var yh=p(Jr=>{"use strict";Object.defineProperty(Jr,"__esModule",{value:!0});Jr.JXL=void 0;var Ln=ae(),M1=vo();function F1(n){let e=(0,Ln.findBox)(n,"jxlc",0);if(e)return n.slice(e.offset+8,e.offset+e.size);let t=D1(n);if(t.length>0)return j1(t)}function D1(n){let e=[],t=0;for(;t<n.length;){let r=(0,Ln.findBox)(n,"jxlp",t);if(!r)break;e.push(n.slice(r.offset+12,r.offset+r.size)),t=r.offset+r.size}return e}function j1(n){let e=n.reduce((s,i)=>s+i.length,0),t=new Uint8Array(e),r=0;for(let s of n)t.set(s,r),r+=s.length;return t}Jr.JXL={validate:n=>{if((0,Ln.toUTF8String)(n,4,8)!=="JXL ")return!1;let t=(0,Ln.findBox)(n,"ftyp",0);return t?(0,Ln.toUTF8String)(n,t.offset+8,t.offset+12)==="jxl ":!1},calculate(n){let e=F1(n);if(e)return M1.JXLStream.calculate(e);throw new Error("No codestream found in JXL container")}}});var Eh=p(Xr=>{"use strict";Object.defineProperty(Xr,"__esModule",{value:!0});Xr.KTX=void 0;var No=ae();Xr.KTX={validate:n=>{let e=(0,No.toUTF8String)(n,1,7);return["KTX 11","KTX 20"].includes(e)},calculate:n=>{let e=n[5]===49?"ktx":"ktx2",t=e==="ktx"?36:20;return{height:(0,No.readUInt32LE)(n,t+4),width:(0,No.readUInt32LE)(n,t),type:e}}}});var Sh=p(zr=>{"use strict";Object.defineProperty(zr,"__esModule",{value:!0});zr.PNG=void 0;var _t=ae(),B1=`PNG\r

`,U1="IHDR",Th="CgBI";zr.PNG={validate(n){if(B1===(0,_t.toUTF8String)(n,1,8)){let e=(0,_t.toUTF8String)(n,12,16);if(e===Th&&(e=(0,_t.toUTF8String)(n,28,32)),e!==U1)throw new TypeError("Invalid PNG");return!0}return!1},calculate(n){return(0,_t.toUTF8String)(n,12,16)===Th?{height:(0,_t.readUInt32BE)(n,36),width:(0,_t.readUInt32BE)(n,32)}:{height:(0,_t.readUInt32BE)(n,20),width:(0,_t.readUInt32BE)(n,16)}}}});var Lh=p(Qr=>{"use strict";Object.defineProperty(Qr,"__esModule",{value:!0});Qr.PNM=void 0;var Oo=ae(),Ah={P1:"pbm/ascii",P2:"pgm/ascii",P3:"ppm/ascii",P4:"pbm",P5:"pgm",P6:"ppm",P7:"pam",PF:"pfm"},wh={default:n=>{let e=[];for(;n.length>0;){let t=n.shift();if(t[0]!=="#"){e=t.split(" ");break}}if(e.length===2)return{height:parseInt(e[1],10),width:parseInt(e[0],10)};throw new TypeError("Invalid PNM")},pam:n=>{let e={};for(;n.length>0;){let t=n.shift();if(t.length>16||t.charCodeAt(0)>128)continue;let[r,s]=t.split(" ");if(r&&s&&(e[r.toLowerCase()]=parseInt(s,10)),e.height&&e.width)break}if(e.height&&e.width)return{height:e.height,width:e.width};throw new TypeError("Invalid PAM")}};Qr.PNM={validate:n=>(0,Oo.toUTF8String)(n,0,2)in Ah,calculate(n){let e=(0,Oo.toUTF8String)(n,0,2),t=Ah[e],r=(0,Oo.toUTF8String)(n,3).split(/[\r\n]+/);return(wh[t]||wh.default)(r)}}});var Ih=p(Zr=>{"use strict";Object.defineProperty(Zr,"__esModule",{value:!0});Zr.PSD=void 0;var Co=ae();Zr.PSD={validate:n=>(0,Co.toUTF8String)(n,0,4)==="8BPS",calculate:n=>({height:(0,Co.readUInt32BE)(n,14),width:(0,Co.readUInt32BE)(n,18)})}});var Oh=p(ns=>{"use strict";Object.defineProperty(ns,"__esModule",{value:!0});ns.SVG=void 0;var bh=ae(),vh=/<svg\s([^>"']|"[^"]*"|'[^']*')*>/,es={height:/\sheight=(['"])([^%]+?)\1/,root:vh,viewbox:/\sviewBox=(['"])(.+?)\1/i,width:/\swidth=(['"])([^%]+?)\1/},Ro=2.54,Nh={in:96,cm:96/Ro,em:16,ex:8,m:96/Ro*100,mm:96/Ro/10,pc:96/72/12,pt:96/72,px:1},H1=new RegExp(`^([0-9.]+(?:e\\d+)?)(${Object.keys(Nh).join("|")})?$`);function ts(n){let e=H1.exec(n);if(e)return Math.round(Number(e[1])*(Nh[e[2]]||1))}function V1(n){let e=n.split(" ");return{height:ts(e[3]),width:ts(e[2])}}function W1(n){let e=n.match(es.width),t=n.match(es.height),r=n.match(es.viewbox);return{height:t&&ts(t[2]),viewbox:r&&V1(r[2]),width:e&&ts(e[2])}}function G1(n){return{height:n.height,width:n.width}}function K1(n,e){let t=e.width/e.height;return n.width?{height:Math.floor(n.width/t),width:n.width}:n.height?{height:n.height,width:Math.floor(n.height*t)}:{height:e.height,width:e.width}}ns.SVG={validate:n=>vh.test((0,bh.toUTF8String)(n,0,1e3)),calculate(n){let e=(0,bh.toUTF8String)(n).match(es.root);if(e){let t=W1(e[0]);if(t.width&&t.height)return G1(t);if(t.viewbox)return K1(t,t.viewbox)}throw new TypeError("Invalid SVG")}}});var Ch=p(ss=>{"use strict";Object.defineProperty(ss,"__esModule",{value:!0});ss.TGA=void 0;var rs=ae();ss.TGA={validate(n){return(0,rs.readUInt16LE)(n,0)===0&&(0,rs.readUInt16LE)(n,4)===0},calculate(n){return{height:(0,rs.readUInt16LE)(n,14),width:(0,rs.readUInt16LE)(n,12)}}}});var Rh=p(os=>{"use strict";Object.defineProperty(os,"__esModule",{value:!0});os.TIFF=void 0;var is=G("fs"),mt=ae();function Y1(n,e,t){let r=(0,mt.readUInt)(n,32,4,t),s=1024,i=is.statSync(e).size;r+s>i&&(s=i-r-10);let o=new Uint8Array(s),a=is.openSync(e,"r");return is.readSync(a,o,0,s,r),is.closeSync(a),o.slice(2)}function J1(n,e){let t=(0,mt.readUInt)(n,16,8,e);return((0,mt.readUInt)(n,16,10,e)<<16)+t}function X1(n){if(n.length>24)return n.slice(12)}function z1(n,e){let t={},r=n;for(;r&&r.length;){let s=(0,mt.readUInt)(r,16,0,e),i=(0,mt.readUInt)(r,16,2,e),o=(0,mt.readUInt)(r,32,4,e);if(s===0)break;o===1&&(i===3||i===4)&&(t[s]=J1(r,e)),r=X1(r)}return t}function Q1(n){let e=(0,mt.toUTF8String)(n,0,2);if(e==="II")return"LE";if(e==="MM")return"BE"}var Z1=["49492a00","4d4d002a"];os.TIFF={validate:n=>Z1.includes((0,mt.toHexString)(n,0,4)),calculate(n,e){if(!e)throw new TypeError("Tiff doesn't support buffer");let t=Q1(n)==="BE",r=Y1(n,e,t),s=z1(r,t),i=s[256],o=s[257];if(!i||!o)throw new TypeError("Invalid Tiff. Missing tags");return{height:o,width:i}}}});var Ph=p(as=>{"use strict";Object.defineProperty(as,"__esModule",{value:!0});as.WEBP=void 0;var rt=ae();function eT(n){return{height:1+(0,rt.readUInt24LE)(n,7),width:1+(0,rt.readUInt24LE)(n,4)}}function tT(n){return{height:1+((n[4]&15)<<10|n[3]<<2|(n[2]&192)>>6),width:1+((n[2]&63)<<8|n[1])}}function nT(n){return{height:(0,rt.readInt16LE)(n,8)&16383,width:(0,rt.readInt16LE)(n,6)&16383}}as.WEBP={validate(n){let e=(0,rt.toUTF8String)(n,0,4)==="RIFF",t=(0,rt.toUTF8String)(n,8,12)==="WEBP",r=(0,rt.toUTF8String)(n,12,15)==="VP8";return e&&t&&r},calculate(n){let e=(0,rt.toUTF8String)(n,12,16);if(n=n.slice(20,30),e==="VP8X"){let r=n[0],s=(r&192)===0,i=(r&1)===0;if(s&&i)return eT(n);throw new TypeError("Invalid WebP")}if(e==="VP8 "&&n[0]!==47)return nT(n);let t=(0,rt.toHexString)(n,3,6);if(e==="VP8L"&&t!=="9d012a")return tT(n);throw new TypeError("Invalid WebP")}}});var Po=p(ls=>{"use strict";Object.defineProperty(ls,"__esModule",{value:!0});ls.typeHandlers=void 0;var rT=nh(),sT=ih(),iT=oh(),oT=ah(),aT=lh(),lT=fh(),cT=To(),uT=hh(),fT=dh(),hT=_h(),dT=yh(),pT=vo(),_T=Eh(),mT=Sh(),gT=Lh(),yT=Ih(),ET=Oh(),TT=Ch(),ST=Rh(),AT=Ph();ls.typeHandlers={bmp:rT.BMP,cur:sT.CUR,dds:iT.DDS,gif:oT.GIF,heif:aT.HEIF,icns:lT.ICNS,ico:cT.ICO,j2c:uT.J2C,jp2:fT.JP2,jpg:hT.JPG,jxl:dT.JXL,"jxl-stream":pT.JXLStream,ktx:_T.KTX,png:mT.PNG,pnm:gT.PNM,psd:yT.PSD,svg:ET.SVG,tga:TT.TGA,tiff:ST.TIFF,webp:AT.WEBP}});var $h=p(cs=>{"use strict";Object.defineProperty(cs,"__esModule",{value:!0});cs.detector=void 0;var ko=Po(),wT=Object.keys(ko.typeHandlers),kh={56:"psd",66:"bmp",68:"dds",71:"gif",73:"tiff",77:"tiff",82:"webp",105:"icns",137:"png",255:"jpg"};function LT(n){let e=n[0];if(e in kh){let r=kh[e];if(r&&ko.typeHandlers[r].validate(n))return r}let t=r=>ko.typeHandlers[r].validate(n);return wT.find(t)}cs.detector=LT});var Fh=p((Re,Mh)=>{"use strict";Object.defineProperty(Re,"__esModule",{value:!0});Re.types=Re.setConcurrency=Re.disableTypes=Re.disableFS=Re.imageSize=void 0;var In=G("fs"),IT=G("path"),bT=th(),xo=Po(),vT=$h(),xh=512*1024,qh=new bT.default({concurrency:100,autostart:!0}),us={disabledFS:!1,disabledTypes:[]};function $o(n,e){let t=(0,vT.detector)(n);if(typeof t<"u"){if(us.disabledTypes.indexOf(t)>-1)throw new TypeError("disabled file type: "+t);if(t in xo.typeHandlers){let r=xo.typeHandlers[t].calculate(n,e);if(r!==void 0)return r.type=r.type??t,r}}throw new TypeError("unsupported file type: "+t+" (file: "+e+")")}async function NT(n){let e=await In.promises.open(n,"r");try{let{size:t}=await e.stat();if(t<=0)throw new Error("Empty file");let r=Math.min(t,xh),s=new Uint8Array(r);return await e.read(s,0,r,0),s}finally{await e.close()}}function OT(n){let e=In.openSync(n,"r");try{let{size:t}=In.fstatSync(e);if(t<=0)throw new Error("Empty file");let r=Math.min(t,xh),s=new Uint8Array(r);return In.readSync(e,s,0,r,0),s}finally{In.closeSync(e)}}Mh.exports=Re=qo;Re.default=qo;function qo(n,e){if(n instanceof Uint8Array)return $o(n);if(typeof n!="string"||us.disabledFS)throw new TypeError("invalid invocation. input should be a Uint8Array");let t=IT.resolve(n);if(typeof e=="function")qh.push(()=>NT(t).then(r=>process.nextTick(e,null,$o(r,t))).catch(e));else{let r=OT(t);return $o(r,t)}}Re.imageSize=qo;var CT=n=>{us.disabledFS=n};Re.disableFS=CT;var RT=n=>{us.disabledTypes=n};Re.disableTypes=RT;var PT=n=>{qh.concurrency=n};Re.setConcurrency=PT;Re.types=Object.keys(xo.typeHandlers)});var jh=p((hs,Dh)=>{(function(n,e){typeof hs=="object"&&typeof Dh<"u"?e(hs):typeof define=="function"&&define.amd?define(["exports"],e):(n=typeof globalThis<"u"?globalThis:n||self,e(n.compareVersions={}))})(hs,(function(n){"use strict";let e=/^[v^~<>=]*?(\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+))?(?:-([\da-z\-]+(?:\.[\da-z\-]+)*))?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?)?)?$/i,t=_=>{if(typeof _!="string")throw new TypeError("Invalid argument expected string");let S=_.match(e);if(!S)throw new Error(`Invalid argument not valid semver ('${_}' received)`);return S.shift(),S},r=_=>_==="*"||_==="x"||_==="X",s=_=>{let S=parseInt(_,10);return isNaN(S)?_:S},i=(_,S)=>typeof _!=typeof S?[String(_),String(S)]:[_,S],o=(_,S)=>{if(r(_)||r(S))return 0;let[w,I]=i(s(_),s(S));return w>I?1:w<I?-1:0},a=(_,S)=>{for(let w=0;w<Math.max(_.length,S.length);w++){let I=o(_[w]||"0",S[w]||"0");if(I!==0)return I}return 0},l=(_,S)=>{let w=t(_),I=t(S),x=w.pop(),q=I.pop(),M=a(w,I);return M!==0?M:x&&q?a(x.split("."),q.split(".")):x||q?x?-1:1:0},c=(_,S,w)=>{h(w);let I=l(_,S);return u[w].includes(I)},u={">":[1],">=":[0,1],"=":[0],"<=":[-1,0],"<":[-1],"!=":[-1,1]},f=Object.keys(u),h=_=>{if(typeof _!="string")throw new TypeError(`Invalid operator type, expected string but got ${typeof _}`);if(f.indexOf(_)===-1)throw new Error(`Invalid operator, expected one of ${f.join("|")}`)},d=(_,S)=>{if(S=S.replace(/([><=]+)\s+/g,"$1"),S.includes("||"))return S.split("||").some(X=>d(_,X));if(S.includes(" - ")){let[X,Z]=S.split(" - ",2);return d(_,`>=${X} <=${Z}`)}else if(S.includes(" "))return S.trim().replace(/\s{2,}/g," ").split(" ").every(X=>d(_,X));let w=S.match(/^([<>=~^]+)/),I=w?w[1]:"=";if(I!=="^"&&I!=="~")return c(_,S,I);let[x,q,M,,J]=t(_),[R,C,B,,j]=t(S),D=[x,q,M],z=[R,C??"x",B??"x"];if(j&&(!J||a(D,z)!==0||a(J.split("."),j.split("."))===-1))return!1;let ne=z.findIndex(X=>X!=="0")+1,Q=I==="~"?2:ne>1?ne:1;return!(a(D.slice(0,Q),z.slice(0,Q))!==0||a(D.slice(Q),z.slice(Q))===-1)},y=_=>typeof _=="string"&&/^[v\d]/.test(_)&&e.test(_),m=_=>typeof _=="string"&&/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/.test(_);n.compare=c,n.compareVersions=l,n.satisfies=d,n.validate=y,n.validateStrict=m}))});var Nn=p((yO,Uh)=>{"use strict";var xT="2.0.0",qT=Number.MAX_SAFE_INTEGER||9007199254740991,MT=16,FT=250,DT=["major","premajor","minor","preminor","patch","prepatch","prerelease"];Uh.exports={MAX_LENGTH:256,MAX_SAFE_COMPONENT_LENGTH:MT,MAX_SAFE_BUILD_LENGTH:FT,MAX_SAFE_INTEGER:qT,RELEASE_TYPES:DT,SEMVER_SPEC_VERSION:xT,FLAG_INCLUDE_PRERELEASE:1,FLAG_LOOSE:2}});var On=p((EO,Hh)=>{"use strict";var jT=typeof process=="object"&&process.env&&process.env.NODE_DEBUG&&/\bsemver\b/i.test(process.env.NODE_DEBUG)?(...n)=>console.error("SEMVER",...n):()=>{};Hh.exports=jT});var zt=p((Xe,Vh)=>{"use strict";var{MAX_SAFE_COMPONENT_LENGTH:jo,MAX_SAFE_BUILD_LENGTH:BT,MAX_LENGTH:UT}=Nn(),HT=On();Xe=Vh.exports={};var VT=Xe.re=[],WT=Xe.safeRe=[],P=Xe.src=[],GT=Xe.safeSrc=[],k=Xe.t={},KT=0,Bo="[a-zA-Z0-9-]",YT=[["\\s",1],["\\d",UT],[Bo,BT]],JT=n=>{for(let[e,t]of YT)n=n.split(`${e}*`).join(`${e}{0,${t}}`).split(`${e}+`).join(`${e}{1,${t}}`);return n},H=(n,e,t)=>{let r=JT(e),s=KT++;HT(n,s,e),k[n]=s,P[s]=e,GT[s]=r,VT[s]=new RegExp(e,t?"g":void 0),WT[s]=new RegExp(r,t?"g":void 0)};H("NUMERICIDENTIFIER","0|[1-9]\\d*");H("NUMERICIDENTIFIERLOOSE","\\d+");H("NONNUMERICIDENTIFIER",`\\d*[a-zA-Z-]${Bo}*`);H("MAINVERSION",`(${P[k.NUMERICIDENTIFIER]})\\.(${P[k.NUMERICIDENTIFIER]})\\.(${P[k.NUMERICIDENTIFIER]})`);H("MAINVERSIONLOOSE",`(${P[k.NUMERICIDENTIFIERLOOSE]})\\.(${P[k.NUMERICIDENTIFIERLOOSE]})\\.(${P[k.NUMERICIDENTIFIERLOOSE]})`);H("PRERELEASEIDENTIFIER",`(?:${P[k.NONNUMERICIDENTIFIER]}|${P[k.NUMERICIDENTIFIER]})`);H("PRERELEASEIDENTIFIERLOOSE",`(?:${P[k.NONNUMERICIDENTIFIER]}|${P[k.NUMERICIDENTIFIERLOOSE]})`);H("PRERELEASE",`(?:-(${P[k.PRERELEASEIDENTIFIER]}(?:\\.${P[k.PRERELEASEIDENTIFIER]})*))`);H("PRERELEASELOOSE",`(?:-?(${P[k.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${P[k.PRERELEASEIDENTIFIERLOOSE]})*))`);H("BUILDIDENTIFIER",`${Bo}+`);H("BUILD",`(?:\\+(${P[k.BUILDIDENTIFIER]}(?:\\.${P[k.BUILDIDENTIFIER]})*))`);H("FULLPLAIN",`v?${P[k.MAINVERSION]}${P[k.PRERELEASE]}?${P[k.BUILD]}?`);H("FULL",`^${P[k.FULLPLAIN]}$`);H("LOOSEPLAIN",`[v=\\s]*${P[k.MAINVERSIONLOOSE]}${P[k.PRERELEASELOOSE]}?${P[k.BUILD]}?`);H("LOOSE",`^${P[k.LOOSEPLAIN]}$`);H("GTLT","((?:<|>)?=?)");H("XRANGEIDENTIFIERLOOSE",`${P[k.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);H("XRANGEIDENTIFIER",`${P[k.NUMERICIDENTIFIER]}|x|X|\\*`);H("XRANGEPLAIN",`[v=\\s]*(${P[k.XRANGEIDENTIFIER]})(?:\\.(${P[k.XRANGEIDENTIFIER]})(?:\\.(${P[k.XRANGEIDENTIFIER]})(?:${P[k.PRERELEASE]})?${P[k.BUILD]}?)?)?`);H("XRANGEPLAINLOOSE",`[v=\\s]*(${P[k.XRANGEIDENTIFIERLOOSE]})(?:\\.(${P[k.XRANGEIDENTIFIERLOOSE]})(?:\\.(${P[k.XRANGEIDENTIFIERLOOSE]})(?:${P[k.PRERELEASELOOSE]})?${P[k.BUILD]}?)?)?`);H("XRANGE",`^${P[k.GTLT]}\\s*${P[k.XRANGEPLAIN]}$`);H("XRANGELOOSE",`^${P[k.GTLT]}\\s*${P[k.XRANGEPLAINLOOSE]}$`);H("COERCEPLAIN",`(^|[^\\d])(\\d{1,${jo}})(?:\\.(\\d{1,${jo}}))?(?:\\.(\\d{1,${jo}}))?`);H("COERCE",`${P[k.COERCEPLAIN]}(?:$|[^\\d])`);H("COERCEFULL",P[k.COERCEPLAIN]+`(?:${P[k.PRERELEASE]})?(?:${P[k.BUILD]})?(?:$|[^\\d])`);H("COERCERTL",P[k.COERCE],!0);H("COERCERTLFULL",P[k.COERCEFULL],!0);H("LONETILDE","(?:~>?)");H("TILDETRIM",`(\\s*)${P[k.LONETILDE]}\\s+`,!0);Xe.tildeTrimReplace="$1~";H("TILDE",`^${P[k.LONETILDE]}${P[k.XRANGEPLAIN]}$`);H("TILDELOOSE",`^${P[k.LONETILDE]}${P[k.XRANGEPLAINLOOSE]}$`);H("LONECARET","(?:\\^)");H("CARETTRIM",`(\\s*)${P[k.LONECARET]}\\s+`,!0);Xe.caretTrimReplace="$1^";H("CARET",`^${P[k.LONECARET]}${P[k.XRANGEPLAIN]}$`);H("CARETLOOSE",`^${P[k.LONECARET]}${P[k.XRANGEPLAINLOOSE]}$`);H("COMPARATORLOOSE",`^${P[k.GTLT]}\\s*(${P[k.LOOSEPLAIN]})$|^$`);H("COMPARATOR",`^${P[k.GTLT]}\\s*(${P[k.FULLPLAIN]})$|^$`);H("COMPARATORTRIM",`(\\s*)${P[k.GTLT]}\\s*(${P[k.LOOSEPLAIN]}|${P[k.XRANGEPLAIN]})`,!0);Xe.comparatorTrimReplace="$1$2$3";H("HYPHENRANGE",`^\\s*(${P[k.XRANGEPLAIN]})\\s+-\\s+(${P[k.XRANGEPLAIN]})\\s*$`);H("HYPHENRANGELOOSE",`^\\s*(${P[k.XRANGEPLAINLOOSE]})\\s+-\\s+(${P[k.XRANGEPLAINLOOSE]})\\s*$`);H("STAR","(<|>)?=?\\s*\\*");H("GTE0","^\\s*>=\\s*0\\.0\\.0\\s*$");H("GTE0PRE","^\\s*>=\\s*0\\.0\\.0-0\\s*$")});var ds=p((TO,Wh)=>{"use strict";var XT=Object.freeze({loose:!0}),zT=Object.freeze({}),QT=n=>n?typeof n!="object"?XT:n:zT;Wh.exports=QT});var Uo=p((SO,Yh)=>{"use strict";var Gh=/^[0-9]+$/,Kh=(n,e)=>{if(typeof n=="number"&&typeof e=="number")return n===e?0:n<e?-1:1;let t=Gh.test(n),r=Gh.test(e);return t&&r&&(n=+n,e=+e),n===e?0:t&&!r?-1:r&&!t?1:n<e?-1:1},ZT=(n,e)=>Kh(e,n);Yh.exports={compareIdentifiers:Kh,rcompareIdentifiers:ZT}});var Te=p((AO,Xh)=>{"use strict";var ps=On(),{MAX_LENGTH:Jh,MAX_SAFE_INTEGER:_s}=Nn(),{safeRe:ms,t:gs}=zt(),eS=ds(),{compareIdentifiers:Ho}=Uo(),Vo=class n{constructor(e,t){if(t=eS(t),e instanceof n){if(e.loose===!!t.loose&&e.includePrerelease===!!t.includePrerelease)return e;e=e.version}else if(typeof e!="string")throw new TypeError(`Invalid version. Must be a string. Got type "${typeof e}".`);if(e.length>Jh)throw new TypeError(`version is longer than ${Jh} characters`);ps("SemVer",e,t),this.options=t,this.loose=!!t.loose,this.includePrerelease=!!t.includePrerelease;let r=e.trim().match(t.loose?ms[gs.LOOSE]:ms[gs.FULL]);if(!r)throw new TypeError(`Invalid Version: ${e}`);if(this.raw=e,this.major=+r[1],this.minor=+r[2],this.patch=+r[3],this.major>_s||this.major<0)throw new TypeError("Invalid major version");if(this.minor>_s||this.minor<0)throw new TypeError("Invalid minor version");if(this.patch>_s||this.patch<0)throw new TypeError("Invalid patch version");r[4]?this.prerelease=r[4].split(".").map(s=>{if(/^[0-9]+$/.test(s)){let i=+s;if(i>=0&&i<_s)return i}return s}):this.prerelease=[],this.build=r[5]?r[5].split("."):[],this.format()}format(){return this.version=`${this.major}.${this.minor}.${this.patch}`,this.prerelease.length&&(this.version+=`-${this.prerelease.join(".")}`),this.version}toString(){return this.version}compare(e){if(ps("SemVer.compare",this.version,this.options,e),!(e instanceof n)){if(typeof e=="string"&&e===this.version)return 0;e=new n(e,this.options)}return e.version===this.version?0:this.compareMain(e)||this.comparePre(e)}compareMain(e){return e instanceof n||(e=new n(e,this.options)),this.major<e.major?-1:this.major>e.major?1:this.minor<e.minor?-1:this.minor>e.minor?1:this.patch<e.patch?-1:this.patch>e.patch?1:0}comparePre(e){if(e instanceof n||(e=new n(e,this.options)),this.prerelease.length&&!e.prerelease.length)return-1;if(!this.prerelease.length&&e.prerelease.length)return 1;if(!this.prerelease.length&&!e.prerelease.length)return 0;let t=0;do{let r=this.prerelease[t],s=e.prerelease[t];if(ps("prerelease compare",t,r,s),r===void 0&&s===void 0)return 0;if(s===void 0)return 1;if(r===void 0)return-1;if(r===s)continue;return Ho(r,s)}while(++t)}compareBuild(e){e instanceof n||(e=new n(e,this.options));let t=0;do{let r=this.build[t],s=e.build[t];if(ps("build compare",t,r,s),r===void 0&&s===void 0)return 0;if(s===void 0)return 1;if(r===void 0)return-1;if(r===s)continue;return Ho(r,s)}while(++t)}inc(e,t,r){if(e.startsWith("pre")){if(!t&&r===!1)throw new Error("invalid increment argument: identifier is empty");if(t){let s=`-${t}`.match(this.options.loose?ms[gs.PRERELEASELOOSE]:ms[gs.PRERELEASE]);if(!s||s[1]!==t)throw new Error(`invalid identifier: ${t}`)}}switch(e){case"premajor":this.prerelease.length=0,this.patch=0,this.minor=0,this.major++,this.inc("pre",t,r);break;case"preminor":this.prerelease.length=0,this.patch=0,this.minor++,this.inc("pre",t,r);break;case"prepatch":this.prerelease.length=0,this.inc("patch",t,r),this.inc("pre",t,r);break;case"prerelease":this.prerelease.length===0&&this.inc("patch",t,r),this.inc("pre",t,r);break;case"release":if(this.prerelease.length===0)throw new Error(`version ${this.raw} is not a prerelease`);this.prerelease.length=0;break;case"major":(this.minor!==0||this.patch!==0||this.prerelease.length===0)&&this.major++,this.minor=0,this.patch=0,this.prerelease=[];break;case"minor":(this.patch!==0||this.prerelease.length===0)&&this.minor++,this.patch=0,this.prerelease=[];break;case"patch":this.prerelease.length===0&&this.patch++,this.prerelease=[];break;case"pre":{let s=Number(r)?1:0;if(this.prerelease.length===0)this.prerelease=[s];else{let i=this.prerelease.length;for(;--i>=0;)typeof this.prerelease[i]=="number"&&(this.prerelease[i]++,i=-2);if(i===-1){if(t===this.prerelease.join(".")&&r===!1)throw new Error("invalid increment argument: identifier already exists");this.prerelease.push(s)}}if(t){let i=[t,s];r===!1&&(i=[t]),Ho(this.prerelease[0],t)===0?isNaN(this.prerelease[1])&&(this.prerelease=i):this.prerelease=i}break}default:throw new Error(`invalid increment argument: ${e}`)}return this.raw=this.format(),this.build.length&&(this.raw+=`+${this.build.join(".")}`),this}};Xh.exports=Vo});var Pt=p((wO,Qh)=>{"use strict";var zh=Te(),tS=(n,e,t=!1)=>{if(n instanceof zh)return n;try{return new zh(n,e)}catch(r){if(!t)return null;throw r}};Qh.exports=tS});var ed=p((LO,Zh)=>{"use strict";var nS=Pt(),rS=(n,e)=>{let t=nS(n,e);return t?t.version:null};Zh.exports=rS});var nd=p((IO,td)=>{"use strict";var sS=Pt(),iS=(n,e)=>{let t=sS(n.trim().replace(/^[=v]+/,""),e);return t?t.version:null};td.exports=iS});var id=p((bO,sd)=>{"use strict";var rd=Te(),oS=(n,e,t,r,s)=>{typeof t=="string"&&(s=r,r=t,t=void 0);try{return new rd(n instanceof rd?n.version:n,t).inc(e,r,s).version}catch{return null}};sd.exports=oS});var ld=p((vO,ad)=>{"use strict";var od=Pt(),aS=(n,e)=>{let t=od(n,null,!0),r=od(e,null,!0),s=t.compare(r);if(s===0)return null;let i=s>0,o=i?t:r,a=i?r:t,l=!!o.prerelease.length;if(!!a.prerelease.length&&!l){if(!a.patch&&!a.minor)return"major";if(a.compareMain(o)===0)return a.minor&&!a.patch?"minor":"patch"}let u=l?"pre":"";return t.major!==r.major?u+"major":t.minor!==r.minor?u+"minor":t.patch!==r.patch?u+"patch":"prerelease"};ad.exports=aS});var ud=p((NO,cd)=>{"use strict";var lS=Te(),cS=(n,e)=>new lS(n,e).major;cd.exports=cS});var hd=p((OO,fd)=>{"use strict";var uS=Te(),fS=(n,e)=>new uS(n,e).minor;fd.exports=fS});var pd=p((CO,dd)=>{"use strict";var hS=Te(),dS=(n,e)=>new hS(n,e).patch;dd.exports=dS});var md=p((RO,_d)=>{"use strict";var pS=Pt(),_S=(n,e)=>{let t=pS(n,e);return t&&t.prerelease.length?t.prerelease:null};_d.exports=_S});var Me=p((PO,yd)=>{"use strict";var gd=Te(),mS=(n,e,t)=>new gd(n,t).compare(new gd(e,t));yd.exports=mS});var Td=p((kO,Ed)=>{"use strict";var gS=Me(),yS=(n,e,t)=>gS(e,n,t);Ed.exports=yS});var Ad=p(($O,Sd)=>{"use strict";var ES=Me(),TS=(n,e)=>ES(n,e,!0);Sd.exports=TS});var ys=p((xO,Ld)=>{"use strict";var wd=Te(),SS=(n,e,t)=>{let r=new wd(n,t),s=new wd(e,t);return r.compare(s)||r.compareBuild(s)};Ld.exports=SS});var bd=p((qO,Id)=>{"use strict";var AS=ys(),wS=(n,e)=>n.sort((t,r)=>AS(t,r,e));Id.exports=wS});var Nd=p((MO,vd)=>{"use strict";var LS=ys(),IS=(n,e)=>n.sort((t,r)=>LS(r,t,e));vd.exports=IS});var Cn=p((FO,Od)=>{"use strict";var bS=Me(),vS=(n,e,t)=>bS(n,e,t)>0;Od.exports=vS});var Es=p((DO,Cd)=>{"use strict";var NS=Me(),OS=(n,e,t)=>NS(n,e,t)<0;Cd.exports=OS});var Wo=p((jO,Rd)=>{"use strict";var CS=Me(),RS=(n,e,t)=>CS(n,e,t)===0;Rd.exports=RS});var Go=p((BO,Pd)=>{"use strict";var PS=Me(),kS=(n,e,t)=>PS(n,e,t)!==0;Pd.exports=kS});var Ts=p((UO,kd)=>{"use strict";var $S=Me(),xS=(n,e,t)=>$S(n,e,t)>=0;kd.exports=xS});var Ss=p((HO,$d)=>{"use strict";var qS=Me(),MS=(n,e,t)=>qS(n,e,t)<=0;$d.exports=MS});var Ko=p((VO,xd)=>{"use strict";var FS=Wo(),DS=Go(),jS=Cn(),BS=Ts(),US=Es(),HS=Ss(),VS=(n,e,t,r)=>{switch(e){case"===":return typeof n=="object"&&(n=n.version),typeof t=="object"&&(t=t.version),n===t;case"!==":return typeof n=="object"&&(n=n.version),typeof t=="object"&&(t=t.version),n!==t;case"":case"=":case"==":return FS(n,t,r);case"!=":return DS(n,t,r);case">":return jS(n,t,r);case">=":return BS(n,t,r);case"<":return US(n,t,r);case"<=":return HS(n,t,r);default:throw new TypeError(`Invalid operator: ${e}`)}};xd.exports=VS});var Md=p((WO,qd)=>{"use strict";var WS=Te(),GS=Pt(),{safeRe:As,t:ws}=zt(),KS=(n,e)=>{if(n instanceof WS)return n;if(typeof n=="number"&&(n=String(n)),typeof n!="string")return null;e=e||{};let t=null;if(!e.rtl)t=n.match(e.includePrerelease?As[ws.COERCEFULL]:As[ws.COERCE]);else{let l=e.includePrerelease?As[ws.COERCERTLFULL]:As[ws.COERCERTL],c;for(;(c=l.exec(n))&&(!t||t.index+t[0].length!==n.length);)(!t||c.index+c[0].length!==t.index+t[0].length)&&(t=c),l.lastIndex=c.index+c[1].length+c[2].length;l.lastIndex=-1}if(t===null)return null;let r=t[2],s=t[3]||"0",i=t[4]||"0",o=e.includePrerelease&&t[5]?`-${t[5]}`:"",a=e.includePrerelease&&t[6]?`+${t[6]}`:"";return GS(`${r}.${s}.${i}${o}${a}`,e)};qd.exports=KS});var Dd=p((GO,Fd)=>{"use strict";var Yo=class{constructor(){this.max=1e3,this.map=new Map}get(e){let t=this.map.get(e);if(t!==void 0)return this.map.delete(e),this.map.set(e,t),t}delete(e){return this.map.delete(e)}set(e,t){if(!this.delete(e)&&t!==void 0){if(this.map.size>=this.max){let s=this.map.keys().next().value;this.delete(s)}this.map.set(e,t)}return this}};Fd.exports=Yo});var Fe=p((KO,Hd)=>{"use strict";var YS=/\s+/g,Jo=class n{constructor(e,t){if(t=XS(t),e instanceof n)return e.loose===!!t.loose&&e.includePrerelease===!!t.includePrerelease?e:new n(e.raw,t);if(e instanceof Xo)return this.raw=e.value,this.set=[[e]],this.formatted=void 0,this;if(this.options=t,this.loose=!!t.loose,this.includePrerelease=!!t.includePrerelease,this.raw=e.trim().replace(YS," "),this.set=this.raw.split("||").map(r=>this.parseRange(r.trim())).filter(r=>r.length),!this.set.length)throw new TypeError(`Invalid SemVer Range: ${this.raw}`);if(this.set.length>1){let r=this.set[0];if(this.set=this.set.filter(s=>!Bd(s[0])),this.set.length===0)this.set=[r];else if(this.set.length>1){for(let s of this.set)if(s.length===1&&rA(s[0])){this.set=[s];break}}}this.formatted=void 0}get range(){if(this.formatted===void 0){this.formatted="";for(let e=0;e<this.set.length;e++){e>0&&(this.formatted+="||");let t=this.set[e];for(let r=0;r<t.length;r++)r>0&&(this.formatted+=" "),this.formatted+=t[r].toString().trim()}}return this.formatted}format(){return this.range}toString(){return this.range}parseRange(e){let r=((this.options.includePrerelease&&tA)|(this.options.loose&&nA))+":"+e,s=jd.get(r);if(s)return s;let i=this.options.loose,o=i?ve[Se.HYPHENRANGELOOSE]:ve[Se.HYPHENRANGE];e=e.replace(o,dA(this.options.includePrerelease)),se("hyphen replace",e),e=e.replace(ve[Se.COMPARATORTRIM],QS),se("comparator trim",e),e=e.replace(ve[Se.TILDETRIM],ZS),se("tilde trim",e),e=e.replace(ve[Se.CARETTRIM],eA),se("caret trim",e);let a=e.split(" ").map(f=>sA(f,this.options)).join(" ").split(/\s+/).map(f=>hA(f,this.options));i&&(a=a.filter(f=>(se("loose invalid filter",f,this.options),!!f.match(ve[Se.COMPARATORLOOSE])))),se("range list",a);let l=new Map,c=a.map(f=>new Xo(f,this.options));for(let f of c){if(Bd(f))return[f];l.set(f.value,f)}l.size>1&&l.has("")&&l.delete("");let u=[...l.values()];return jd.set(r,u),u}intersects(e,t){if(!(e instanceof n))throw new TypeError("a Range is required");return this.set.some(r=>Ud(r,t)&&e.set.some(s=>Ud(s,t)&&r.every(i=>s.every(o=>i.intersects(o,t)))))}test(e){if(!e)return!1;if(typeof e=="string")try{e=new zS(e,this.options)}catch{return!1}for(let t=0;t<this.set.length;t++)if(pA(this.set[t],e,this.options))return!0;return!1}};Hd.exports=Jo;var JS=Dd(),jd=new JS,XS=ds(),Xo=Rn(),se=On(),zS=Te(),{safeRe:ve,t:Se,comparatorTrimReplace:QS,tildeTrimReplace:ZS,caretTrimReplace:eA}=zt(),{FLAG_INCLUDE_PRERELEASE:tA,FLAG_LOOSE:nA}=Nn(),Bd=n=>n.value==="<0.0.0-0",rA=n=>n.value==="",Ud=(n,e)=>{let t=!0,r=n.slice(),s=r.pop();for(;t&&r.length;)t=r.every(i=>s.intersects(i,e)),s=r.pop();return t},sA=(n,e)=>(n=n.replace(ve[Se.BUILD],""),se("comp",n,e),n=aA(n,e),se("caret",n),n=iA(n,e),se("tildes",n),n=cA(n,e),se("xrange",n),n=fA(n,e),se("stars",n),n),Ne=n=>!n||n.toLowerCase()==="x"||n==="*",iA=(n,e)=>n.trim().split(/\s+/).map(t=>oA(t,e)).join(" "),oA=(n,e)=>{let t=e.loose?ve[Se.TILDELOOSE]:ve[Se.TILDE];return n.replace(t,(r,s,i,o,a)=>{se("tilde",n,r,s,i,o,a);let l;return Ne(s)?l="":Ne(i)?l=`>=${s}.0.0 <${+s+1}.0.0-0`:Ne(o)?l=`>=${s}.${i}.0 <${s}.${+i+1}.0-0`:a?(se("replaceTilde pr",a),l=`>=${s}.${i}.${o}-${a} <${s}.${+i+1}.0-0`):l=`>=${s}.${i}.${o} <${s}.${+i+1}.0-0`,se("tilde return",l),l})},aA=(n,e)=>n.trim().split(/\s+/).map(t=>lA(t,e)).join(" "),lA=(n,e)=>{se("caret",n,e);let t=e.loose?ve[Se.CARETLOOSE]:ve[Se.CARET],r=e.includePrerelease?"-0":"";return n.replace(t,(s,i,o,a,l)=>{se("caret",n,s,i,o,a,l);let c;return Ne(i)?c="":Ne(o)?c=`>=${i}.0.0${r} <${+i+1}.0.0-0`:Ne(a)?i==="0"?c=`>=${i}.${o}.0${r} <${i}.${+o+1}.0-0`:c=`>=${i}.${o}.0${r} <${+i+1}.0.0-0`:l?(se("replaceCaret pr",l),i==="0"?o==="0"?c=`>=${i}.${o}.${a}-${l} <${i}.${o}.${+a+1}-0`:c=`>=${i}.${o}.${a}-${l} <${i}.${+o+1}.0-0`:c=`>=${i}.${o}.${a}-${l} <${+i+1}.0.0-0`):(se("no pr"),i==="0"?o==="0"?c=`>=${i}.${o}.${a}${r} <${i}.${o}.${+a+1}-0`:c=`>=${i}.${o}.${a}${r} <${i}.${+o+1}.0-0`:c=`>=${i}.${o}.${a} <${+i+1}.0.0-0`),se("caret return",c),c})},cA=(n,e)=>(se("replaceXRanges",n,e),n.split(/\s+/).map(t=>uA(t,e)).join(" ")),uA=(n,e)=>{n=n.trim();let t=e.loose?ve[Se.XRANGELOOSE]:ve[Se.XRANGE];return n.replace(t,(r,s,i,o,a,l)=>{se("xRange",n,r,s,i,o,a,l);let c=Ne(i),u=c||Ne(o),f=u||Ne(a),h=f;return s==="="&&h&&(s=""),l=e.includePrerelease?"-0":"",c?s===">"||s==="<"?r="<0.0.0-0":r="*":s&&h?(u&&(o=0),a=0,s===">"?(s=">=",u?(i=+i+1,o=0,a=0):(o=+o+1,a=0)):s==="<="&&(s="<",u?i=+i+1:o=+o+1),s==="<"&&(l="-0"),r=`${s+i}.${o}.${a}${l}`):u?r=`>=${i}.0.0${l} <${+i+1}.0.0-0`:f&&(r=`>=${i}.${o}.0${l} <${i}.${+o+1}.0-0`),se("xRange return",r),r})},fA=(n,e)=>(se("replaceStars",n,e),n.trim().replace(ve[Se.STAR],"")),hA=(n,e)=>(se("replaceGTE0",n,e),n.trim().replace(ve[e.includePrerelease?Se.GTE0PRE:Se.GTE0],"")),dA=n=>(e,t,r,s,i,o,a,l,c,u,f,h)=>(Ne(r)?t="":Ne(s)?t=`>=${r}.0.0${n?"-0":""}`:Ne(i)?t=`>=${r}.${s}.0${n?"-0":""}`:o?t=`>=${t}`:t=`>=${t}${n?"-0":""}`,Ne(c)?l="":Ne(u)?l=`<${+c+1}.0.0-0`:Ne(f)?l=`<${c}.${+u+1}.0-0`:h?l=`<=${c}.${u}.${f}-${h}`:n?l=`<${c}.${u}.${+f+1}-0`:l=`<=${l}`,`${t} ${l}`.trim()),pA=(n,e,t)=>{for(let r=0;r<n.length;r++)if(!n[r].test(e))return!1;if(e.prerelease.length&&!t.includePrerelease){for(let r=0;r<n.length;r++)if(se(n[r].semver),n[r].semver!==Xo.ANY&&n[r].semver.prerelease.length>0){let s=n[r].semver;if(s.major===e.major&&s.minor===e.minor&&s.patch===e.patch)return!0}return!1}return!0}});var Rn=p((YO,Jd)=>{"use strict";var Pn=Symbol("SemVer ANY"),Zo=class n{static get ANY(){return Pn}constructor(e,t){if(t=Vd(t),e instanceof n){if(e.loose===!!t.loose)return e;e=e.value}e=e.trim().split(/\s+/).join(" "),Qo("comparator",e,t),this.options=t,this.loose=!!t.loose,this.parse(e),this.semver===Pn?this.value="":this.value=this.operator+this.semver.version,Qo("comp",this)}parse(e){let t=this.options.loose?Wd[Gd.COMPARATORLOOSE]:Wd[Gd.COMPARATOR],r=e.match(t);if(!r)throw new TypeError(`Invalid comparator: ${e}`);this.operator=r[1]!==void 0?r[1]:"",this.operator==="="&&(this.operator=""),r[2]?this.semver=new Kd(r[2],this.options.loose):this.semver=Pn}toString(){return this.value}test(e){if(Qo("Comparator.test",e,this.options.loose),this.semver===Pn||e===Pn)return!0;if(typeof e=="string")try{e=new Kd(e,this.options)}catch{return!1}return zo(e,this.operator,this.semver,this.options)}intersects(e,t){if(!(e instanceof n))throw new TypeError("a Comparator is required");return this.operator===""?this.value===""?!0:new Yd(e.value,t).test(this.value):e.operator===""?e.value===""?!0:new Yd(this.value,t).test(e.semver):(t=Vd(t),t.includePrerelease&&(this.value==="<0.0.0-0"||e.value==="<0.0.0-0")||!t.includePrerelease&&(this.value.startsWith("<0.0.0")||e.value.startsWith("<0.0.0"))?!1:!!(this.operator.startsWith(">")&&e.operator.startsWith(">")||this.operator.startsWith("<")&&e.operator.startsWith("<")||this.semver.version===e.semver.version&&this.operator.includes("=")&&e.operator.includes("=")||zo(this.semver,"<",e.semver,t)&&this.operator.startsWith(">")&&e.operator.startsWith("<")||zo(this.semver,">",e.semver,t)&&this.operator.startsWith("<")&&e.operator.startsWith(">")))}};Jd.exports=Zo;var Vd=ds(),{safeRe:Wd,t:Gd}=zt(),zo=Ko(),Qo=On(),Kd=Te(),Yd=Fe()});var kn=p((JO,Xd)=>{"use strict";var _A=Fe(),mA=(n,e,t)=>{try{e=new _A(e,t)}catch{return!1}return e.test(n)};Xd.exports=mA});var Qd=p((XO,zd)=>{"use strict";var gA=Fe(),yA=(n,e)=>new gA(n,e).set.map(t=>t.map(r=>r.value).join(" ").trim().split(" "));zd.exports=yA});var ep=p((zO,Zd)=>{"use strict";var EA=Te(),TA=Fe(),SA=(n,e,t)=>{let r=null,s=null,i=null;try{i=new TA(e,t)}catch{return null}return n.forEach(o=>{i.test(o)&&(!r||s.compare(o)===-1)&&(r=o,s=new EA(r,t))}),r};Zd.exports=SA});var np=p((QO,tp)=>{"use strict";var AA=Te(),wA=Fe(),LA=(n,e,t)=>{let r=null,s=null,i=null;try{i=new wA(e,t)}catch{return null}return n.forEach(o=>{i.test(o)&&(!r||s.compare(o)===1)&&(r=o,s=new AA(r,t))}),r};tp.exports=LA});var ip=p((ZO,sp)=>{"use strict";var ea=Te(),IA=Fe(),rp=Cn(),bA=(n,e)=>{n=new IA(n,e);let t=new ea("0.0.0");if(n.test(t)||(t=new ea("0.0.0-0"),n.test(t)))return t;t=null;for(let r=0;r<n.set.length;++r){let s=n.set[r],i=null;s.forEach(o=>{let a=new ea(o.semver.version);switch(o.operator){case">":a.prerelease.length===0?a.patch++:a.prerelease.push(0),a.raw=a.format();case"":case">=":(!i||rp(a,i))&&(i=a);break;case"<":case"<=":break;default:throw new Error(`Unexpected operation: ${o.operator}`)}}),i&&(!t||rp(t,i))&&(t=i)}return t&&n.test(t)?t:null};sp.exports=bA});var ap=p((eC,op)=>{"use strict";var vA=Fe(),NA=(n,e)=>{try{return new vA(n,e).range||"*"}catch{return null}};op.exports=NA});var Ls=p((tC,fp)=>{"use strict";var OA=Te(),up=Rn(),{ANY:CA}=up,RA=Fe(),PA=kn(),lp=Cn(),cp=Es(),kA=Ss(),$A=Ts(),xA=(n,e,t,r)=>{n=new OA(n,r),e=new RA(e,r);let s,i,o,a,l;switch(t){case">":s=lp,i=kA,o=cp,a=">",l=">=";break;case"<":s=cp,i=$A,o=lp,a="<",l="<=";break;default:throw new TypeError('Must provide a hilo val of "<" or ">"')}if(PA(n,e,r))return!1;for(let c=0;c<e.set.length;++c){let u=e.set[c],f=null,h=null;if(u.forEach(d=>{d.semver===CA&&(d=new up(">=0.0.0")),f=f||d,h=h||d,s(d.semver,f.semver,r)?f=d:o(d.semver,h.semver,r)&&(h=d)}),f.operator===a||f.operator===l||(!h.operator||h.operator===a)&&i(n,h.semver))return!1;if(h.operator===l&&o(n,h.semver))return!1}return!0};fp.exports=xA});var dp=p((nC,hp)=>{"use strict";var qA=Ls(),MA=(n,e,t)=>qA(n,e,">",t);hp.exports=MA});var _p=p((rC,pp)=>{"use strict";var FA=Ls(),DA=(n,e,t)=>FA(n,e,"<",t);pp.exports=DA});var yp=p((sC,gp)=>{"use strict";var mp=Fe(),jA=(n,e,t)=>(n=new mp(n,t),e=new mp(e,t),n.intersects(e,t));gp.exports=jA});var Tp=p((iC,Ep)=>{"use strict";var BA=kn(),UA=Me();Ep.exports=(n,e,t)=>{let r=[],s=null,i=null,o=n.sort((u,f)=>UA(u,f,t));for(let u of o)BA(u,e,t)?(i=u,s||(s=u)):(i&&r.push([s,i]),i=null,s=null);s&&r.push([s,null]);let a=[];for(let[u,f]of r)u===f?a.push(u):!f&&u===o[0]?a.push("*"):f?u===o[0]?a.push(`<=${f}`):a.push(`${u} - ${f}`):a.push(`>=${u}`);let l=a.join(" || "),c=typeof e.raw=="string"?e.raw:String(e);return l.length<c.length?l:e}});var bp=p((oC,Ip)=>{"use strict";var Sp=Fe(),na=Rn(),{ANY:ta}=na,$n=kn(),ra=Me(),HA=(n,e,t={})=>{if(n===e)return!0;n=new Sp(n,t),e=new Sp(e,t);let r=!1;e:for(let s of n.set){for(let i of e.set){let o=WA(s,i,t);if(r=r||o!==null,o)continue e}if(r)return!1}return!0},VA=[new na(">=0.0.0-0")],Ap=[new na(">=0.0.0")],WA=(n,e,t)=>{if(n===e)return!0;if(n.length===1&&n[0].semver===ta){if(e.length===1&&e[0].semver===ta)return!0;t.includePrerelease?n=VA:n=Ap}if(e.length===1&&e[0].semver===ta){if(t.includePrerelease)return!0;e=Ap}let r=new Set,s,i;for(let d of n)d.operator===">"||d.operator===">="?s=wp(s,d,t):d.operator==="<"||d.operator==="<="?i=Lp(i,d,t):r.add(d.semver);if(r.size>1)return null;let o;if(s&&i){if(o=ra(s.semver,i.semver,t),o>0)return null;if(o===0&&(s.operator!==">="||i.operator!=="<="))return null}for(let d of r){if(s&&!$n(d,String(s),t)||i&&!$n(d,String(i),t))return null;for(let y of e)if(!$n(d,String(y),t))return!1;return!0}let a,l,c,u,f=i&&!t.includePrerelease&&i.semver.prerelease.length?i.semver:!1,h=s&&!t.includePrerelease&&s.semver.prerelease.length?s.semver:!1;f&&f.prerelease.length===1&&i.operator==="<"&&f.prerelease[0]===0&&(f=!1);for(let d of e){if(u=u||d.operator===">"||d.operator===">=",c=c||d.operator==="<"||d.operator==="<=",s){if(h&&d.semver.prerelease&&d.semver.prerelease.length&&d.semver.major===h.major&&d.semver.minor===h.minor&&d.semver.patch===h.patch&&(h=!1),d.operator===">"||d.operator===">="){if(a=wp(s,d,t),a===d&&a!==s)return!1}else if(s.operator===">="&&!$n(s.semver,String(d),t))return!1}if(i){if(f&&d.semver.prerelease&&d.semver.prerelease.length&&d.semver.major===f.major&&d.semver.minor===f.minor&&d.semver.patch===f.patch&&(f=!1),d.operator==="<"||d.operator==="<="){if(l=Lp(i,d,t),l===d&&l!==i)return!1}else if(i.operator==="<="&&!$n(i.semver,String(d),t))return!1}if(!d.operator&&(i||s)&&o!==0)return!1}return!(s&&c&&!i&&o!==0||i&&u&&!s&&o!==0||h||f)},wp=(n,e,t)=>{if(!n)return e;let r=ra(n.semver,e.semver,t);return r>0?n:r<0||e.operator===">"&&n.operator===">="?e:n},Lp=(n,e,t)=>{if(!n)return e;let r=ra(n.semver,e.semver,t);return r<0?n:r>0||e.operator==="<"&&n.operator==="<="?e:n};Ip.exports=HA});var ia=p((aC,Op)=>{"use strict";var sa=zt(),vp=Nn(),GA=Te(),Np=Uo(),KA=Pt(),YA=ed(),JA=nd(),XA=id(),zA=ld(),QA=ud(),ZA=hd(),ew=pd(),tw=md(),nw=Me(),rw=Td(),sw=Ad(),iw=ys(),ow=bd(),aw=Nd(),lw=Cn(),cw=Es(),uw=Wo(),fw=Go(),hw=Ts(),dw=Ss(),pw=Ko(),_w=Md(),mw=Rn(),gw=Fe(),yw=kn(),Ew=Qd(),Tw=ep(),Sw=np(),Aw=ip(),ww=ap(),Lw=Ls(),Iw=dp(),bw=_p(),vw=yp(),Nw=Tp(),Ow=bp();Op.exports={parse:KA,valid:YA,clean:JA,inc:XA,diff:zA,major:QA,minor:ZA,patch:ew,prerelease:tw,compare:nw,rcompare:rw,compareLoose:sw,compareBuild:iw,sort:ow,rsort:aw,gt:lw,lt:cw,eq:uw,neq:fw,gte:hw,lte:dw,cmp:pw,coerce:_w,Comparator:mw,Range:gw,satisfies:yw,toComparators:Ew,maxSatisfying:Tw,minSatisfying:Sw,minVersion:Aw,validRange:ww,outside:Lw,gtr:Iw,ltr:bw,intersects:vw,simplifyRange:Nw,subset:Ow,SemVer:GA,re:sa.re,src:sa.src,tokens:sa.t,SEMVER_SPEC_VERSION:vp.SEMVER_SPEC_VERSION,RELEASE_TYPES:vp.RELEASE_TYPES,compareIdentifiers:Np.compareIdentifiers,rcompareIdentifiers:Np.rcompareIdentifiers}});var Y=p(ye=>{"use strict";var ca=Symbol.for("yaml.alias"),Pp=Symbol.for("yaml.document"),Is=Symbol.for("yaml.map"),kp=Symbol.for("yaml.pair"),ua=Symbol.for("yaml.scalar"),bs=Symbol.for("yaml.seq"),st=Symbol.for("yaml.node.type"),Rw=n=>!!n&&typeof n=="object"&&n[st]===ca,Pw=n=>!!n&&typeof n=="object"&&n[st]===Pp,kw=n=>!!n&&typeof n=="object"&&n[st]===Is,$w=n=>!!n&&typeof n=="object"&&n[st]===kp,$p=n=>!!n&&typeof n=="object"&&n[st]===ua,xw=n=>!!n&&typeof n=="object"&&n[st]===bs;function xp(n){if(n&&typeof n=="object")switch(n[st]){case Is:case bs:return!0}return!1}function qw(n){if(n&&typeof n=="object")switch(n[st]){case ca:case Is:case ua:case bs:return!0}return!1}var Mw=n=>($p(n)||xp(n))&&!!n.anchor;ye.ALIAS=ca;ye.DOC=Pp;ye.MAP=Is;ye.NODE_TYPE=st;ye.PAIR=kp;ye.SCALAR=ua;ye.SEQ=bs;ye.hasAnchor=Mw;ye.isAlias=Rw;ye.isCollection=xp;ye.isDocument=Pw;ye.isMap=kw;ye.isNode=qw;ye.isPair=$w;ye.isScalar=$p;ye.isSeq=xw});var xn=p(fa=>{"use strict";var de=Y(),Pe=Symbol("break visit"),qp=Symbol("skip children"),ze=Symbol("remove node");function vs(n,e){let t=Mp(e);de.isDocument(n)?Qt(null,n.contents,t,Object.freeze([n]))===ze&&(n.contents=null):Qt(null,n,t,Object.freeze([]))}vs.BREAK=Pe;vs.SKIP=qp;vs.REMOVE=ze;function Qt(n,e,t,r){let s=Fp(n,e,t,r);if(de.isNode(s)||de.isPair(s))return Dp(n,r,s),Qt(n,s,t,r);if(typeof s!="symbol"){if(de.isCollection(e)){r=Object.freeze(r.concat(e));for(let i=0;i<e.items.length;++i){let o=Qt(i,e.items[i],t,r);if(typeof o=="number")i=o-1;else{if(o===Pe)return Pe;o===ze&&(e.items.splice(i,1),i-=1)}}}else if(de.isPair(e)){r=Object.freeze(r.concat(e));let i=Qt("key",e.key,t,r);if(i===Pe)return Pe;i===ze&&(e.key=null);let o=Qt("value",e.value,t,r);if(o===Pe)return Pe;o===ze&&(e.value=null)}}return s}async function Ns(n,e){let t=Mp(e);de.isDocument(n)?await Zt(null,n.contents,t,Object.freeze([n]))===ze&&(n.contents=null):await Zt(null,n,t,Object.freeze([]))}Ns.BREAK=Pe;Ns.SKIP=qp;Ns.REMOVE=ze;async function Zt(n,e,t,r){let s=await Fp(n,e,t,r);if(de.isNode(s)||de.isPair(s))return Dp(n,r,s),Zt(n,s,t,r);if(typeof s!="symbol"){if(de.isCollection(e)){r=Object.freeze(r.concat(e));for(let i=0;i<e.items.length;++i){let o=await Zt(i,e.items[i],t,r);if(typeof o=="number")i=o-1;else{if(o===Pe)return Pe;o===ze&&(e.items.splice(i,1),i-=1)}}}else if(de.isPair(e)){r=Object.freeze(r.concat(e));let i=await Zt("key",e.key,t,r);if(i===Pe)return Pe;i===ze&&(e.key=null);let o=await Zt("value",e.value,t,r);if(o===Pe)return Pe;o===ze&&(e.value=null)}}return s}function Mp(n){return typeof n=="object"&&(n.Collection||n.Node||n.Value)?Object.assign({Alias:n.Node,Map:n.Node,Scalar:n.Node,Seq:n.Node},n.Value&&{Map:n.Value,Scalar:n.Value,Seq:n.Value},n.Collection&&{Map:n.Collection,Seq:n.Collection},n):n}function Fp(n,e,t,r){if(typeof t=="function")return t(n,e,r);if(de.isMap(e))return t.Map?.(n,e,r);if(de.isSeq(e))return t.Seq?.(n,e,r);if(de.isPair(e))return t.Pair?.(n,e,r);if(de.isScalar(e))return t.Scalar?.(n,e,r);if(de.isAlias(e))return t.Alias?.(n,e,r)}function Dp(n,e,t){let r=e[e.length-1];if(de.isCollection(r))r.items[n]=t;else if(de.isPair(r))n==="key"?r.key=t:r.value=t;else if(de.isDocument(r))r.contents=t;else{let s=de.isAlias(r)?"alias":"scalar";throw new Error(`Cannot replace node with ${s} parent`)}}fa.visit=vs;fa.visitAsync=Ns});var ha=p(Bp=>{"use strict";var jp=Y(),Fw=xn(),Dw={"!":"%21",",":"%2C","[":"%5B","]":"%5D","{":"%7B","}":"%7D"},jw=n=>n.replace(/[!,[\]{}]/g,e=>Dw[e]),qn=class n{constructor(e,t){this.docStart=null,this.docEnd=!1,this.yaml=Object.assign({},n.defaultYaml,e),this.tags=Object.assign({},n.defaultTags,t)}clone(){let e=new n(this.yaml,this.tags);return e.docStart=this.docStart,e}atDocument(){let e=new n(this.yaml,this.tags);switch(this.yaml.version){case"1.1":this.atNextDocument=!0;break;case"1.2":this.atNextDocument=!1,this.yaml={explicit:n.defaultYaml.explicit,version:"1.2"},this.tags=Object.assign({},n.defaultTags);break}return e}add(e,t){this.atNextDocument&&(this.yaml={explicit:n.defaultYaml.explicit,version:"1.1"},this.tags=Object.assign({},n.defaultTags),this.atNextDocument=!1);let r=e.trim().split(/[ \t]+/),s=r.shift();switch(s){case"%TAG":{if(r.length!==2&&(t(0,"%TAG directive should contain exactly two parts"),r.length<2))return!1;let[i,o]=r;return this.tags[i]=o,!0}case"%YAML":{if(this.yaml.explicit=!0,r.length!==1)return t(0,"%YAML directive should contain exactly one part"),!1;let[i]=r;if(i==="1.1"||i==="1.2")return this.yaml.version=i,!0;{let o=/^\d+\.\d+$/.test(i);return t(6,`Unsupported YAML version ${i}`,o),!1}}default:return t(0,`Unknown directive ${s}`,!0),!1}}tagName(e,t){if(e==="!")return"!";if(e[0]!=="!")return t(`Not a valid tag: ${e}`),null;if(e[1]==="<"){let o=e.slice(2,-1);return o==="!"||o==="!!"?(t(`Verbatim tags aren't resolved, so ${e} is invalid.`),null):(e[e.length-1]!==">"&&t("Verbatim tags must end with a >"),o)}let[,r,s]=e.match(/^(.*!)([^!]*)$/s);s||t(`The ${e} tag has no suffix`);let i=this.tags[r];if(i)try{return i+decodeURIComponent(s)}catch(o){return t(String(o)),null}return r==="!"?e:(t(`Could not resolve tag: ${e}`),null)}tagString(e){for(let[t,r]of Object.entries(this.tags))if(e.startsWith(r))return t+jw(e.substring(r.length));return e[0]==="!"?e:`!<${e}>`}toString(e){let t=this.yaml.explicit?[`%YAML ${this.yaml.version||"1.2"}`]:[],r=Object.entries(this.tags),s;if(e&&r.length>0&&jp.isNode(e.contents)){let i={};Fw.visit(e.contents,(o,a)=>{jp.isNode(a)&&a.tag&&(i[a.tag]=!0)}),s=Object.keys(i)}else s=[];for(let[i,o]of r)i==="!!"&&o==="tag:yaml.org,2002:"||(!e||s.some(a=>a.startsWith(o)))&&t.push(`%TAG ${i} ${o}`);return t.join(`
`)}};qn.defaultYaml={explicit:!1,version:"1.2"};qn.defaultTags={"!!":"tag:yaml.org,2002:"};Bp.Directives=qn});var Os=p(Mn=>{"use strict";var Up=Y(),Bw=xn();function Uw(n){if(/[\x00-\x19\s,[\]{}]/.test(n)){let t=`Anchor must not contain whitespace or control characters: ${JSON.stringify(n)}`;throw new Error(t)}return!0}function Hp(n){let e=new Set;return Bw.visit(n,{Value(t,r){r.anchor&&e.add(r.anchor)}}),e}function Vp(n,e){for(let t=1;;++t){let r=`${n}${t}`;if(!e.has(r))return r}}function Hw(n,e){let t=[],r=new Map,s=null;return{onAnchor:i=>{t.push(i),s??(s=Hp(n));let o=Vp(e,s);return s.add(o),o},setAnchors:()=>{for(let i of t){let o=r.get(i);if(typeof o=="object"&&o.anchor&&(Up.isScalar(o.node)||Up.isCollection(o.node)))o.node.anchor=o.anchor;else{let a=new Error("Failed to resolve repeated object (this should not happen)");throw a.source=i,a}}},sourceObjects:r}}Mn.anchorIsValid=Uw;Mn.anchorNames=Hp;Mn.createNodeAnchors=Hw;Mn.findNewAnchor=Vp});var da=p(Wp=>{"use strict";function Fn(n,e,t,r){if(r&&typeof r=="object")if(Array.isArray(r))for(let s=0,i=r.length;s<i;++s){let o=r[s],a=Fn(n,r,String(s),o);a===void 0?delete r[s]:a!==o&&(r[s]=a)}else if(r instanceof Map)for(let s of Array.from(r.keys())){let i=r.get(s),o=Fn(n,r,s,i);o===void 0?r.delete(s):o!==i&&r.set(s,o)}else if(r instanceof Set)for(let s of Array.from(r)){let i=Fn(n,r,s,s);i===void 0?r.delete(s):i!==s&&(r.delete(s),r.add(i))}else for(let[s,i]of Object.entries(r)){let o=Fn(n,r,s,i);o===void 0?delete r[s]:o!==i&&(r[s]=o)}return n.call(e,t,r)}Wp.applyReviver=Fn});var gt=p(Kp=>{"use strict";var Vw=Y();function Gp(n,e,t){if(Array.isArray(n))return n.map((r,s)=>Gp(r,String(s),t));if(n&&typeof n.toJSON=="function"){if(!t||!Vw.hasAnchor(n))return n.toJSON(e,t);let r={aliasCount:0,count:1,res:void 0};t.anchors.set(n,r),t.onCreate=i=>{r.res=i,delete t.onCreate};let s=n.toJSON(e,t);return t.onCreate&&t.onCreate(s),s}return typeof n=="bigint"&&!t?.keep?Number(n):n}Kp.toJS=Gp});var Cs=p(Jp=>{"use strict";var Ww=da(),Yp=Y(),Gw=gt(),pa=class{constructor(e){Object.defineProperty(this,Yp.NODE_TYPE,{value:e})}clone(){let e=Object.create(Object.getPrototypeOf(this),Object.getOwnPropertyDescriptors(this));return this.range&&(e.range=this.range.slice()),e}toJS(e,{mapAsMap:t,maxAliasCount:r,onAnchor:s,reviver:i}={}){if(!Yp.isDocument(e))throw new TypeError("A document argument is required");let o={anchors:new Map,doc:e,keep:!0,mapAsMap:t===!0,mapKeyWarned:!1,maxAliasCount:typeof r=="number"?r:100},a=Gw.toJS(this,"",o);if(typeof s=="function")for(let{count:l,res:c}of o.anchors.values())s(c,l);return typeof i=="function"?Ww.applyReviver(i,{"":a},"",a):a}};Jp.NodeBase=pa});var Dn=p(Xp=>{"use strict";var Kw=Os(),Yw=xn(),en=Y(),Jw=Cs(),Xw=gt(),_a=class extends Jw.NodeBase{constructor(e){super(en.ALIAS),this.source=e,Object.defineProperty(this,"tag",{set(){throw new Error("Alias nodes cannot have tags")}})}resolve(e,t){let r;t?.aliasResolveCache?r=t.aliasResolveCache:(r=[],Yw.visit(e,{Node:(i,o)=>{(en.isAlias(o)||en.hasAnchor(o))&&r.push(o)}}),t&&(t.aliasResolveCache=r));let s;for(let i of r){if(i===this)break;i.anchor===this.source&&(s=i)}return s}toJSON(e,t){if(!t)return{source:this.source};let{anchors:r,doc:s,maxAliasCount:i}=t,o=this.resolve(s,t);if(!o){let l=`Unresolved alias (the anchor must be set before the alias): ${this.source}`;throw new ReferenceError(l)}let a=r.get(o);if(a||(Xw.toJS(o,null,t),a=r.get(o)),a?.res===void 0){let l="This should not happen: Alias anchor was not resolved?";throw new ReferenceError(l)}if(i>=0&&(a.count+=1,a.aliasCount===0&&(a.aliasCount=Rs(s,o,r)),a.count*a.aliasCount>i)){let l="Excessive alias count indicates a resource exhaustion attack";throw new ReferenceError(l)}return a.res}toString(e,t,r){let s=`*${this.source}`;if(e){if(Kw.anchorIsValid(this.source),e.options.verifyAliasOrder&&!e.anchors.has(this.source)){let i=`Unresolved alias (the anchor must be set before the alias): ${this.source}`;throw new Error(i)}if(e.implicitKey)return`${s} `}return s}};function Rs(n,e,t){if(en.isAlias(e)){let r=e.resolve(n),s=t&&r&&t.get(r);return s?s.count*s.aliasCount:0}else if(en.isCollection(e)){let r=0;for(let s of e.items){let i=Rs(n,s,t);i>r&&(r=i)}return r}else if(en.isPair(e)){let r=Rs(n,e.key,t),s=Rs(n,e.value,t);return Math.max(r,s)}return 1}Xp.Alias=_a});var ce=p(ma=>{"use strict";var zw=Y(),Qw=Cs(),Zw=gt(),eL=n=>!n||typeof n!="function"&&typeof n!="object",yt=class extends Qw.NodeBase{constructor(e){super(zw.SCALAR),this.value=e}toJSON(e,t){return t?.keep?this.value:Zw.toJS(this.value,e,t)}toString(){return String(this.value)}};yt.BLOCK_FOLDED="BLOCK_FOLDED";yt.BLOCK_LITERAL="BLOCK_LITERAL";yt.PLAIN="PLAIN";yt.QUOTE_DOUBLE="QUOTE_DOUBLE";yt.QUOTE_SINGLE="QUOTE_SINGLE";ma.Scalar=yt;ma.isScalarValue=eL});var jn=p(Qp=>{"use strict";var tL=Dn(),kt=Y(),zp=ce(),nL="tag:yaml.org,2002:";function rL(n,e,t){if(e){let r=t.filter(i=>i.tag===e),s=r.find(i=>!i.format)??r[0];if(!s)throw new Error(`Tag ${e} not found`);return s}return t.find(r=>r.identify?.(n)&&!r.format)}function sL(n,e,t){if(kt.isDocument(n)&&(n=n.contents),kt.isNode(n))return n;if(kt.isPair(n)){let f=t.schema[kt.MAP].createNode?.(t.schema,null,t);return f.items.push(n),f}(n instanceof String||n instanceof Number||n instanceof Boolean||typeof BigInt<"u"&&n instanceof BigInt)&&(n=n.valueOf());let{aliasDuplicateObjects:r,onAnchor:s,onTagObj:i,schema:o,sourceObjects:a}=t,l;if(r&&n&&typeof n=="object"){if(l=a.get(n),l)return l.anchor??(l.anchor=s(n)),new tL.Alias(l.anchor);l={anchor:null,node:null},a.set(n,l)}e?.startsWith("!!")&&(e=nL+e.slice(2));let c=rL(n,e,o.tags);if(!c){if(n&&typeof n.toJSON=="function"&&(n=n.toJSON()),!n||typeof n!="object"){let f=new zp.Scalar(n);return l&&(l.node=f),f}c=n instanceof Map?o[kt.MAP]:Symbol.iterator in Object(n)?o[kt.SEQ]:o[kt.MAP]}i&&(i(c),delete t.onTagObj);let u=c?.createNode?c.createNode(t.schema,n,t):typeof c?.nodeClass?.from=="function"?c.nodeClass.from(t.schema,n,t):new zp.Scalar(n);return e?u.tag=e:c.default||(u.tag=c.tag),l&&(l.node=u),u}Qp.createNode=sL});var ks=p(Ps=>{"use strict";var iL=jn(),Qe=Y(),oL=Cs();function ga(n,e,t){let r=t;for(let s=e.length-1;s>=0;--s){let i=e[s];if(typeof i=="number"&&Number.isInteger(i)&&i>=0){let o=[];o[i]=r,r=o}else r=new Map([[i,r]])}return iL.createNode(r,void 0,{aliasDuplicateObjects:!1,keepUndefined:!1,onAnchor:()=>{throw new Error("This should not happen, please report a bug.")},schema:n,sourceObjects:new Map})}var Zp=n=>n==null||typeof n=="object"&&!!n[Symbol.iterator]().next().done,ya=class extends oL.NodeBase{constructor(e,t){super(e),Object.defineProperty(this,"schema",{value:t,configurable:!0,enumerable:!1,writable:!0})}clone(e){let t=Object.create(Object.getPrototypeOf(this),Object.getOwnPropertyDescriptors(this));return e&&(t.schema=e),t.items=t.items.map(r=>Qe.isNode(r)||Qe.isPair(r)?r.clone(e):r),this.range&&(t.range=this.range.slice()),t}addIn(e,t){if(Zp(e))this.add(t);else{let[r,...s]=e,i=this.get(r,!0);if(Qe.isCollection(i))i.addIn(s,t);else if(i===void 0&&this.schema)this.set(r,ga(this.schema,s,t));else throw new Error(`Expected YAML collection at ${r}. Remaining path: ${s}`)}}deleteIn(e){let[t,...r]=e;if(r.length===0)return this.delete(t);let s=this.get(t,!0);if(Qe.isCollection(s))return s.deleteIn(r);throw new Error(`Expected YAML collection at ${t}. Remaining path: ${r}`)}getIn(e,t){let[r,...s]=e,i=this.get(r,!0);return s.length===0?!t&&Qe.isScalar(i)?i.value:i:Qe.isCollection(i)?i.getIn(s,t):void 0}hasAllNullValues(e){return this.items.every(t=>{if(!Qe.isPair(t))return!1;let r=t.value;return r==null||e&&Qe.isScalar(r)&&r.value==null&&!r.commentBefore&&!r.comment&&!r.tag})}hasIn(e){let[t,...r]=e;if(r.length===0)return this.has(t);let s=this.get(t,!0);return Qe.isCollection(s)?s.hasIn(r):!1}setIn(e,t){let[r,...s]=e;if(s.length===0)this.set(r,t);else{let i=this.get(r,!0);if(Qe.isCollection(i))i.setIn(s,t);else if(i===void 0&&this.schema)this.set(r,ga(this.schema,s,t));else throw new Error(`Expected YAML collection at ${r}. Remaining path: ${s}`)}}};Ps.Collection=ya;Ps.collectionFromPath=ga;Ps.isEmptyPath=Zp});var Bn=p($s=>{"use strict";var aL=n=>n.replace(/^(?!$)(?: $)?/gm,"#");function Ea(n,e){return/^\n+$/.test(n)?n.substring(1):e?n.replace(/^(?! *$)/gm,e):n}var lL=(n,e,t)=>n.endsWith(`
`)?Ea(t,e):t.includes(`
`)?`
`+Ea(t,e):(n.endsWith(" ")?"":" ")+t;$s.indentComment=Ea;$s.lineComment=lL;$s.stringifyComment=aL});var t_=p(Un=>{"use strict";var cL="flow",Ta="block",xs="quoted";function uL(n,e,t="flow",{indentAtStart:r,lineWidth:s=80,minContentWidth:i=20,onFold:o,onOverflow:a}={}){if(!s||s<0)return n;s<i&&(i=0);let l=Math.max(1+i,1+s-e.length);if(n.length<=l)return n;let c=[],u={},f=s-e.length;typeof r=="number"&&(r>s-Math.max(2,i)?c.push(0):f=s-r);let h,d,y=!1,m=-1,_=-1,S=-1;t===Ta&&(m=e_(n,m,e.length),m!==-1&&(f=m+l));for(let I;I=n[m+=1];){if(t===xs&&I==="\\"){switch(_=m,n[m+1]){case"x":m+=3;break;case"u":m+=5;break;case"U":m+=9;break;default:m+=1}S=m}if(I===`
`)t===Ta&&(m=e_(n,m,e.length)),f=m+e.length+l,h=void 0;else{if(I===" "&&d&&d!==" "&&d!==`
`&&d!=="	"){let x=n[m+1];x&&x!==" "&&x!==`
`&&x!=="	"&&(h=m)}if(m>=f)if(h)c.push(h),f=h+l,h=void 0;else if(t===xs){for(;d===" "||d==="	";)d=I,I=n[m+=1],y=!0;let x=m>S+1?m-2:_-1;if(u[x])return n;c.push(x),u[x]=!0,f=x+l,h=void 0}else y=!0}d=I}if(y&&a&&a(),c.length===0)return n;o&&o();let w=n.slice(0,c[0]);for(let I=0;I<c.length;++I){let x=c[I],q=c[I+1]||n.length;x===0?w=`
${e}${n.slice(0,q)}`:(t===xs&&u[x]&&(w+=`${n[x]}\\`),w+=`
${e}${n.slice(x+1,q)}`)}return w}function e_(n,e,t){let r=e,s=e+1,i=n[s];for(;i===" "||i==="	";)if(e<s+t)i=n[++e];else{do i=n[++e];while(i&&i!==`
`);r=e,s=e+1,i=n[s]}return r}Un.FOLD_BLOCK=Ta;Un.FOLD_FLOW=cL;Un.FOLD_QUOTED=xs;Un.foldFlowLines=uL});var Vn=p(n_=>{"use strict";var We=ce(),Et=t_(),Ms=(n,e)=>({indentAtStart:e?n.indent.length:n.indentAtStart,lineWidth:n.options.lineWidth,minContentWidth:n.options.minContentWidth}),Fs=n=>/^(%|---|\.\.\.)/m.test(n);function fL(n,e,t){if(!e||e<0)return!1;let r=e-t,s=n.length;if(s<=r)return!1;for(let i=0,o=0;i<s;++i)if(n[i]===`
`){if(i-o>r)return!0;if(o=i+1,s-o<=r)return!1}return!0}function Hn(n,e){let t=JSON.stringify(n);if(e.options.doubleQuotedAsJSON)return t;let{implicitKey:r}=e,s=e.options.doubleQuotedMinMultiLineLength,i=e.indent||(Fs(n)?"  ":""),o="",a=0;for(let l=0,c=t[l];c;c=t[++l])if(c===" "&&t[l+1]==="\\"&&t[l+2]==="n"&&(o+=t.slice(a,l)+"\\ ",l+=1,a=l,c="\\"),c==="\\")switch(t[l+1]){case"u":{o+=t.slice(a,l);let u=t.substr(l+2,4);switch(u){case"0000":o+="\\0";break;case"0007":o+="\\a";break;case"000b":o+="\\v";break;case"001b":o+="\\e";break;case"0085":o+="\\N";break;case"00a0":o+="\\_";break;case"2028":o+="\\L";break;case"2029":o+="\\P";break;default:u.substr(0,2)==="00"?o+="\\x"+u.substr(2):o+=t.substr(l,6)}l+=5,a=l+1}break;case"n":if(r||t[l+2]==='"'||t.length<s)l+=1;else{for(o+=t.slice(a,l)+`

`;t[l+2]==="\\"&&t[l+3]==="n"&&t[l+4]!=='"';)o+=`
`,l+=2;o+=i,t[l+2]===" "&&(o+="\\"),l+=1,a=l+1}break;default:l+=1}return o=a?o+t.slice(a):t,r?o:Et.foldFlowLines(o,i,Et.FOLD_QUOTED,Ms(e,!1))}function Sa(n,e){if(e.options.singleQuote===!1||e.implicitKey&&n.includes(`
`)||/[ \t]\n|\n[ \t]/.test(n))return Hn(n,e);let t=e.indent||(Fs(n)?"  ":""),r="'"+n.replace(/'/g,"''").replace(/\n+/g,`$&
${t}`)+"'";return e.implicitKey?r:Et.foldFlowLines(r,t,Et.FOLD_FLOW,Ms(e,!1))}function tn(n,e){let{singleQuote:t}=e.options,r;if(t===!1)r=Hn;else{let s=n.includes('"'),i=n.includes("'");s&&!i?r=Sa:i&&!s?r=Hn:r=t?Sa:Hn}return r(n,e)}var Aa;try{Aa=new RegExp(`(^|(?<!
))
+(?!
|$)`,"g")}catch{Aa=/\n+(?!\n|$)/g}function qs({comment:n,type:e,value:t},r,s,i){let{blockQuote:o,commentString:a,lineWidth:l}=r.options;if(!o||/\n[\t ]+$/.test(t))return tn(t,r);let c=r.indent||(r.forceBlockIndent||Fs(t)?"  ":""),u=o==="literal"?!0:o==="folded"||e===We.Scalar.BLOCK_FOLDED?!1:e===We.Scalar.BLOCK_LITERAL?!0:!fL(t,l,c.length);if(!t)return u?`|
`:`>
`;let f,h;for(h=t.length;h>0;--h){let q=t[h-1];if(q!==`
`&&q!=="	"&&q!==" ")break}let d=t.substring(h),y=d.indexOf(`
`);y===-1?f="-":t===d||y!==d.length-1?(f="+",i&&i()):f="",d&&(t=t.slice(0,-d.length),d[d.length-1]===`
`&&(d=d.slice(0,-1)),d=d.replace(Aa,`$&${c}`));let m=!1,_,S=-1;for(_=0;_<t.length;++_){let q=t[_];if(q===" ")m=!0;else if(q===`
`)S=_;else break}let w=t.substring(0,S<_?S+1:_);w&&(t=t.substring(w.length),w=w.replace(/\n+/g,`$&${c}`));let x=(m?c?"2":"1":"")+f;if(n&&(x+=" "+a(n.replace(/ ?[\r\n]+/g," ")),s&&s()),!u){let q=t.replace(/\n+/g,`
$&`).replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g,"$1$2").replace(/\n+/g,`$&${c}`),M=!1,J=Ms(r,!0);o!=="folded"&&e!==We.Scalar.BLOCK_FOLDED&&(J.onOverflow=()=>{M=!0});let R=Et.foldFlowLines(`${w}${q}${d}`,c,Et.FOLD_BLOCK,J);if(!M)return`>${x}
${c}${R}`}return t=t.replace(/\n+/g,`$&${c}`),`|${x}
${c}${w}${t}${d}`}function hL(n,e,t,r){let{type:s,value:i}=n,{actualString:o,implicitKey:a,indent:l,indentStep:c,inFlow:u}=e;if(a&&i.includes(`
`)||u&&/[[\]{},]/.test(i))return tn(i,e);if(/^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(i))return a||u||!i.includes(`
`)?tn(i,e):qs(n,e,t,r);if(!a&&!u&&s!==We.Scalar.PLAIN&&i.includes(`
`))return qs(n,e,t,r);if(Fs(i)){if(l==="")return e.forceBlockIndent=!0,qs(n,e,t,r);if(a&&l===c)return tn(i,e)}let f=i.replace(/\n+/g,`$&
${l}`);if(o){let h=m=>m.default&&m.tag!=="tag:yaml.org,2002:str"&&m.test?.test(f),{compat:d,tags:y}=e.doc.schema;if(y.some(h)||d?.some(h))return tn(i,e)}return a?f:Et.foldFlowLines(f,l,Et.FOLD_FLOW,Ms(e,!1))}function dL(n,e,t,r){let{implicitKey:s,inFlow:i}=e,o=typeof n.value=="string"?n:Object.assign({},n,{value:String(n.value)}),{type:a}=n;a!==We.Scalar.QUOTE_DOUBLE&&/[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(o.value)&&(a=We.Scalar.QUOTE_DOUBLE);let l=u=>{switch(u){case We.Scalar.BLOCK_FOLDED:case We.Scalar.BLOCK_LITERAL:return s||i?tn(o.value,e):qs(o,e,t,r);case We.Scalar.QUOTE_DOUBLE:return Hn(o.value,e);case We.Scalar.QUOTE_SINGLE:return Sa(o.value,e);case We.Scalar.PLAIN:return hL(o,e,t,r);default:return null}},c=l(a);if(c===null){let{defaultKeyType:u,defaultStringType:f}=e.options,h=s&&u||f;if(c=l(h),c===null)throw new Error(`Unsupported default string type ${h}`)}return c}n_.stringifyString=dL});var Wn=p(wa=>{"use strict";var pL=Os(),Tt=Y(),_L=Bn(),mL=Vn();function gL(n,e){let t=Object.assign({blockQuote:!0,commentString:_L.stringifyComment,defaultKeyType:null,defaultStringType:"PLAIN",directives:null,doubleQuotedAsJSON:!1,doubleQuotedMinMultiLineLength:40,falseStr:"false",flowCollectionPadding:!0,indentSeq:!0,lineWidth:80,minContentWidth:20,nullStr:"null",simpleKeys:!1,singleQuote:null,trueStr:"true",verifyAliasOrder:!0},n.schema.toStringOptions,e),r;switch(t.collectionStyle){case"block":r=!1;break;case"flow":r=!0;break;default:r=null}return{anchors:new Set,doc:n,flowCollectionPadding:t.flowCollectionPadding?" ":"",indent:"",indentStep:typeof t.indent=="number"?" ".repeat(t.indent):"  ",inFlow:r,options:t}}function yL(n,e){if(e.tag){let s=n.filter(i=>i.tag===e.tag);if(s.length>0)return s.find(i=>i.format===e.format)??s[0]}let t,r;if(Tt.isScalar(e)){r=e.value;let s=n.filter(i=>i.identify?.(r));if(s.length>1){let i=s.filter(o=>o.test);i.length>0&&(s=i)}t=s.find(i=>i.format===e.format)??s.find(i=>!i.format)}else r=e,t=n.find(s=>s.nodeClass&&r instanceof s.nodeClass);if(!t){let s=r?.constructor?.name??(r===null?"null":typeof r);throw new Error(`Tag not resolved for ${s} value`)}return t}function EL(n,e,{anchors:t,doc:r}){if(!r.directives)return"";let s=[],i=(Tt.isScalar(n)||Tt.isCollection(n))&&n.anchor;i&&pL.anchorIsValid(i)&&(t.add(i),s.push(`&${i}`));let o=n.tag??(e.default?null:e.tag);return o&&s.push(r.directives.tagString(o)),s.join(" ")}function TL(n,e,t,r){if(Tt.isPair(n))return n.toString(e,t,r);if(Tt.isAlias(n)){if(e.doc.directives)return n.toString(e);if(e.resolvedAliases?.has(n))throw new TypeError("Cannot stringify circular structure without alias nodes");e.resolvedAliases?e.resolvedAliases.add(n):e.resolvedAliases=new Set([n]),n=n.resolve(e.doc)}let s,i=Tt.isNode(n)?n:e.doc.createNode(n,{onTagObj:l=>s=l});s??(s=yL(e.doc.schema.tags,i));let o=EL(i,s,e);o.length>0&&(e.indentAtStart=(e.indentAtStart??0)+o.length+1);let a=typeof s.stringify=="function"?s.stringify(i,e,t,r):Tt.isScalar(i)?mL.stringifyString(i,e,t,r):i.toString(e,t,r);return o?Tt.isScalar(i)||a[0]==="{"||a[0]==="["?`${o} ${a}`:`${o}
${e.indent}${a}`:a}wa.createStringifyContext=gL;wa.stringify=TL});var o_=p(i_=>{"use strict";var it=Y(),r_=ce(),s_=Wn(),Gn=Bn();function SL({key:n,value:e},t,r,s){let{allNullValues:i,doc:o,indent:a,indentStep:l,options:{commentString:c,indentSeq:u,simpleKeys:f}}=t,h=it.isNode(n)&&n.comment||null;if(f){if(h)throw new Error("With simple keys, key nodes cannot have comments");if(it.isCollection(n)||!it.isNode(n)&&typeof n=="object"){let J="With simple keys, collection cannot be used as a key value";throw new Error(J)}}let d=!f&&(!n||h&&e==null&&!t.inFlow||it.isCollection(n)||(it.isScalar(n)?n.type===r_.Scalar.BLOCK_FOLDED||n.type===r_.Scalar.BLOCK_LITERAL:typeof n=="object"));t=Object.assign({},t,{allNullValues:!1,implicitKey:!d&&(f||!i),indent:a+l});let y=!1,m=!1,_=s_.stringify(n,t,()=>y=!0,()=>m=!0);if(!d&&!t.inFlow&&_.length>1024){if(f)throw new Error("With simple keys, single line scalar must not span more than 1024 characters");d=!0}if(t.inFlow){if(i||e==null)return y&&r&&r(),_===""?"?":d?`? ${_}`:_}else if(i&&!f||e==null&&d)return _=`? ${_}`,h&&!y?_+=Gn.lineComment(_,t.indent,c(h)):m&&s&&s(),_;y&&(h=null),d?(h&&(_+=Gn.lineComment(_,t.indent,c(h))),_=`? ${_}
${a}:`):(_=`${_}:`,h&&(_+=Gn.lineComment(_,t.indent,c(h))));let S,w,I;it.isNode(e)?(S=!!e.spaceBefore,w=e.commentBefore,I=e.comment):(S=!1,w=null,I=null,e&&typeof e=="object"&&(e=o.createNode(e))),t.implicitKey=!1,!d&&!h&&it.isScalar(e)&&(t.indentAtStart=_.length+1),m=!1,!u&&l.length>=2&&!t.inFlow&&!d&&it.isSeq(e)&&!e.flow&&!e.tag&&!e.anchor&&(t.indent=t.indent.substring(2));let x=!1,q=s_.stringify(e,t,()=>x=!0,()=>m=!0),M=" ";if(h||S||w){if(M=S?`
`:"",w){let J=c(w);M+=`
${Gn.indentComment(J,t.indent)}`}q===""&&!t.inFlow?M===`
`&&I&&(M=`

`):M+=`
${t.indent}`}else if(!d&&it.isCollection(e)){let J=q[0],R=q.indexOf(`
`),C=R!==-1,B=t.inFlow??e.flow??e.items.length===0;if(C||!B){let j=!1;if(C&&(J==="&"||J==="!")){let D=q.indexOf(" ");J==="&"&&D!==-1&&D<R&&q[D+1]==="!"&&(D=q.indexOf(" ",D+1)),(D===-1||R<D)&&(j=!0)}j||(M=`
${t.indent}`)}}else(q===""||q[0]===`
`)&&(M="");return _+=M+q,t.inFlow?x&&r&&r():I&&!x?_+=Gn.lineComment(_,t.indent,c(I)):m&&s&&s(),_}i_.stringifyPair=SL});var Ia=p(La=>{"use strict";var a_=G("process");function AL(n,...e){n==="debug"&&console.log(...e)}function wL(n,e){(n==="debug"||n==="warn")&&(typeof a_.emitWarning=="function"?a_.emitWarning(e):console.warn(e))}La.debug=AL;La.warn=wL});var Us=p(Bs=>{"use strict";var Kn=Y(),l_=ce(),Ds="<<",js={identify:n=>n===Ds||typeof n=="symbol"&&n.description===Ds,default:"key",tag:"tag:yaml.org,2002:merge",test:/^<<$/,resolve:()=>Object.assign(new l_.Scalar(Symbol(Ds)),{addToJSMap:c_}),stringify:()=>Ds},LL=(n,e)=>(js.identify(e)||Kn.isScalar(e)&&(!e.type||e.type===l_.Scalar.PLAIN)&&js.identify(e.value))&&n?.doc.schema.tags.some(t=>t.tag===js.tag&&t.default);function c_(n,e,t){if(t=n&&Kn.isAlias(t)?t.resolve(n.doc):t,Kn.isSeq(t))for(let r of t.items)ba(n,e,r);else if(Array.isArray(t))for(let r of t)ba(n,e,r);else ba(n,e,t)}function ba(n,e,t){let r=n&&Kn.isAlias(t)?t.resolve(n.doc):t;if(!Kn.isMap(r))throw new Error("Merge sources must be maps or map aliases");let s=r.toJSON(null,n,Map);for(let[i,o]of s)e instanceof Map?e.has(i)||e.set(i,o):e instanceof Set?e.add(i):Object.prototype.hasOwnProperty.call(e,i)||Object.defineProperty(e,i,{value:o,writable:!0,enumerable:!0,configurable:!0});return e}Bs.addMergeToJSMap=c_;Bs.isMergeKey=LL;Bs.merge=js});var Na=p(h_=>{"use strict";var IL=Ia(),u_=Us(),bL=Wn(),f_=Y(),va=gt();function vL(n,e,{key:t,value:r}){if(f_.isNode(t)&&t.addToJSMap)t.addToJSMap(n,e,r);else if(u_.isMergeKey(n,t))u_.addMergeToJSMap(n,e,r);else{let s=va.toJS(t,"",n);if(e instanceof Map)e.set(s,va.toJS(r,s,n));else if(e instanceof Set)e.add(s);else{let i=NL(t,s,n),o=va.toJS(r,i,n);i in e?Object.defineProperty(e,i,{value:o,writable:!0,enumerable:!0,configurable:!0}):e[i]=o}}return e}function NL(n,e,t){if(e===null)return"";if(typeof e!="object")return String(e);if(f_.isNode(n)&&t?.doc){let r=bL.createStringifyContext(t.doc,{});r.anchors=new Set;for(let i of t.anchors.keys())r.anchors.add(i.anchor);r.inFlow=!0,r.inStringifyKey=!0;let s=n.toString(r);if(!t.mapKeyWarned){let i=JSON.stringify(s);i.length>40&&(i=i.substring(0,36)+'..."'),IL.warn(t.doc.options.logLevel,`Keys with collection values will be stringified due to JS Object restrictions: ${i}. Set mapAsMap: true to use object keys.`),t.mapKeyWarned=!0}return s}return JSON.stringify(e)}h_.addPairToJSMap=vL});var St=p(Oa=>{"use strict";var d_=jn(),OL=o_(),CL=Na(),Hs=Y();function RL(n,e,t){let r=d_.createNode(n,void 0,t),s=d_.createNode(e,void 0,t);return new Vs(r,s)}var Vs=class n{constructor(e,t=null){Object.defineProperty(this,Hs.NODE_TYPE,{value:Hs.PAIR}),this.key=e,this.value=t}clone(e){let{key:t,value:r}=this;return Hs.isNode(t)&&(t=t.clone(e)),Hs.isNode(r)&&(r=r.clone(e)),new n(t,r)}toJSON(e,t){let r=t?.mapAsMap?new Map:{};return CL.addPairToJSMap(t,r,this)}toString(e,t,r){return e?.doc?OL.stringifyPair(this,e,t,r):JSON.stringify(this)}};Oa.Pair=Vs;Oa.createPair=RL});var Ca=p(__=>{"use strict";var $t=Y(),p_=Wn(),Ws=Bn();function PL(n,e,t){return(e.inFlow??n.flow?$L:kL)(n,e,t)}function kL({comment:n,items:e},t,{blockItemPrefix:r,flowChars:s,itemIndent:i,onChompKeep:o,onComment:a}){let{indent:l,options:{commentString:c}}=t,u=Object.assign({},t,{indent:i,type:null}),f=!1,h=[];for(let y=0;y<e.length;++y){let m=e[y],_=null;if($t.isNode(m))!f&&m.spaceBefore&&h.push(""),Gs(t,h,m.commentBefore,f),m.comment&&(_=m.comment);else if($t.isPair(m)){let w=$t.isNode(m.key)?m.key:null;w&&(!f&&w.spaceBefore&&h.push(""),Gs(t,h,w.commentBefore,f))}f=!1;let S=p_.stringify(m,u,()=>_=null,()=>f=!0);_&&(S+=Ws.lineComment(S,i,c(_))),f&&_&&(f=!1),h.push(r+S)}let d;if(h.length===0)d=s.start+s.end;else{d=h[0];for(let y=1;y<h.length;++y){let m=h[y];d+=m?`
${l}${m}`:`
`}}return n?(d+=`
`+Ws.indentComment(c(n),l),a&&a()):f&&o&&o(),d}function $L({items:n},e,{flowChars:t,itemIndent:r}){let{indent:s,indentStep:i,flowCollectionPadding:o,options:{commentString:a}}=e;r+=i;let l=Object.assign({},e,{indent:r,inFlow:!0,type:null}),c=!1,u=0,f=[];for(let y=0;y<n.length;++y){let m=n[y],_=null;if($t.isNode(m))m.spaceBefore&&f.push(""),Gs(e,f,m.commentBefore,!1),m.comment&&(_=m.comment);else if($t.isPair(m)){let w=$t.isNode(m.key)?m.key:null;w&&(w.spaceBefore&&f.push(""),Gs(e,f,w.commentBefore,!1),w.comment&&(c=!0));let I=$t.isNode(m.value)?m.value:null;I?(I.comment&&(_=I.comment),I.commentBefore&&(c=!0)):m.value==null&&w?.comment&&(_=w.comment)}_&&(c=!0);let S=p_.stringify(m,l,()=>_=null);y<n.length-1&&(S+=","),_&&(S+=Ws.lineComment(S,r,a(_))),!c&&(f.length>u||S.includes(`
`))&&(c=!0),f.push(S),u=f.length}let{start:h,end:d}=t;if(f.length===0)return h+d;if(!c){let y=f.reduce((m,_)=>m+_.length+2,2);c=e.options.lineWidth>0&&y>e.options.lineWidth}if(c){let y=h;for(let m of f)y+=m?`
${i}${s}${m}`:`
`;return`${y}
${s}${d}`}else return`${h}${o}${f.join(" ")}${o}${d}`}function Gs({indent:n,options:{commentString:e}},t,r,s){if(r&&s&&(r=r.replace(/^\n+/,"")),r){let i=Ws.indentComment(e(r),n);t.push(i.trimStart())}}__.stringifyCollection=PL});var wt=p(Pa=>{"use strict";var xL=Ca(),qL=Na(),ML=ks(),At=Y(),Ks=St(),FL=ce();function Yn(n,e){let t=At.isScalar(e)?e.value:e;for(let r of n)if(At.isPair(r)&&(r.key===e||r.key===t||At.isScalar(r.key)&&r.key.value===t))return r}var Ra=class extends ML.Collection{static get tagName(){return"tag:yaml.org,2002:map"}constructor(e){super(At.MAP,e),this.items=[]}static from(e,t,r){let{keepUndefined:s,replacer:i}=r,o=new this(e),a=(l,c)=>{if(typeof i=="function")c=i.call(t,l,c);else if(Array.isArray(i)&&!i.includes(l))return;(c!==void 0||s)&&o.items.push(Ks.createPair(l,c,r))};if(t instanceof Map)for(let[l,c]of t)a(l,c);else if(t&&typeof t=="object")for(let l of Object.keys(t))a(l,t[l]);return typeof e.sortMapEntries=="function"&&o.items.sort(e.sortMapEntries),o}add(e,t){let r;At.isPair(e)?r=e:!e||typeof e!="object"||!("key"in e)?r=new Ks.Pair(e,e?.value):r=new Ks.Pair(e.key,e.value);let s=Yn(this.items,r.key),i=this.schema?.sortMapEntries;if(s){if(!t)throw new Error(`Key ${r.key} already set`);At.isScalar(s.value)&&FL.isScalarValue(r.value)?s.value.value=r.value:s.value=r.value}else if(i){let o=this.items.findIndex(a=>i(r,a)<0);o===-1?this.items.push(r):this.items.splice(o,0,r)}else this.items.push(r)}delete(e){let t=Yn(this.items,e);return t?this.items.splice(this.items.indexOf(t),1).length>0:!1}get(e,t){let s=Yn(this.items,e)?.value;return(!t&&At.isScalar(s)?s.value:s)??void 0}has(e){return!!Yn(this.items,e)}set(e,t){this.add(new Ks.Pair(e,t),!0)}toJSON(e,t,r){let s=r?new r:t?.mapAsMap?new Map:{};t?.onCreate&&t.onCreate(s);for(let i of this.items)qL.addPairToJSMap(t,s,i);return s}toString(e,t,r){if(!e)return JSON.stringify(this);for(let s of this.items)if(!At.isPair(s))throw new Error(`Map items must all be pairs; found ${JSON.stringify(s)} instead`);return!e.allNullValues&&this.hasAllNullValues(!1)&&(e=Object.assign({},e,{allNullValues:!0})),xL.stringifyCollection(this,e,{blockItemPrefix:"",flowChars:{start:"{",end:"}"},itemIndent:e.indent||"",onChompKeep:r,onComment:t})}};Pa.YAMLMap=Ra;Pa.findPair=Yn});var nn=p(g_=>{"use strict";var DL=Y(),m_=wt(),jL={collection:"map",default:!0,nodeClass:m_.YAMLMap,tag:"tag:yaml.org,2002:map",resolve(n,e){return DL.isMap(n)||e("Expected a mapping for this tag"),n},createNode:(n,e,t)=>m_.YAMLMap.from(n,e,t)};g_.map=jL});var Lt=p(y_=>{"use strict";var BL=jn(),UL=Ca(),HL=ks(),Js=Y(),VL=ce(),WL=gt(),ka=class extends HL.Collection{static get tagName(){return"tag:yaml.org,2002:seq"}constructor(e){super(Js.SEQ,e),this.items=[]}add(e){this.items.push(e)}delete(e){let t=Ys(e);return typeof t!="number"?!1:this.items.splice(t,1).length>0}get(e,t){let r=Ys(e);if(typeof r!="number")return;let s=this.items[r];return!t&&Js.isScalar(s)?s.value:s}has(e){let t=Ys(e);return typeof t=="number"&&t<this.items.length}set(e,t){let r=Ys(e);if(typeof r!="number")throw new Error(`Expected a valid index, not ${e}.`);let s=this.items[r];Js.isScalar(s)&&VL.isScalarValue(t)?s.value=t:this.items[r]=t}toJSON(e,t){let r=[];t?.onCreate&&t.onCreate(r);let s=0;for(let i of this.items)r.push(WL.toJS(i,String(s++),t));return r}toString(e,t,r){return e?UL.stringifyCollection(this,e,{blockItemPrefix:"- ",flowChars:{start:"[",end:"]"},itemIndent:(e.indent||"")+"  ",onChompKeep:r,onComment:t}):JSON.stringify(this)}static from(e,t,r){let{replacer:s}=r,i=new this(e);if(t&&Symbol.iterator in Object(t)){let o=0;for(let a of t){if(typeof s=="function"){let l=t instanceof Set?a:String(o++);a=s.call(t,l,a)}i.items.push(BL.createNode(a,void 0,r))}}return i}};function Ys(n){let e=Js.isScalar(n)?n.value:n;return e&&typeof e=="string"&&(e=Number(e)),typeof e=="number"&&Number.isInteger(e)&&e>=0?e:null}y_.YAMLSeq=ka});var rn=p(T_=>{"use strict";var GL=Y(),E_=Lt(),KL={collection:"seq",default:!0,nodeClass:E_.YAMLSeq,tag:"tag:yaml.org,2002:seq",resolve(n,e){return GL.isSeq(n)||e("Expected a sequence for this tag"),n},createNode:(n,e,t)=>E_.YAMLSeq.from(n,e,t)};T_.seq=KL});var Jn=p(S_=>{"use strict";var YL=Vn(),JL={identify:n=>typeof n=="string",default:!0,tag:"tag:yaml.org,2002:str",resolve:n=>n,stringify(n,e,t,r){return e=Object.assign({actualString:!0},e),YL.stringifyString(n,e,t,r)}};S_.string=JL});var Xs=p(L_=>{"use strict";var A_=ce(),w_={identify:n=>n==null,createNode:()=>new A_.Scalar(null),default:!0,tag:"tag:yaml.org,2002:null",test:/^(?:~|[Nn]ull|NULL)?$/,resolve:()=>new A_.Scalar(null),stringify:({source:n},e)=>typeof n=="string"&&w_.test.test(n)?n:e.options.nullStr};L_.nullTag=w_});var $a=p(b_=>{"use strict";var XL=ce(),I_={identify:n=>typeof n=="boolean",default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,resolve:n=>new XL.Scalar(n[0]==="t"||n[0]==="T"),stringify({source:n,value:e},t){if(n&&I_.test.test(n)){let r=n[0]==="t"||n[0]==="T";if(e===r)return n}return e?t.options.trueStr:t.options.falseStr}};b_.boolTag=I_});var sn=p(v_=>{"use strict";function zL({format:n,minFractionDigits:e,tag:t,value:r}){if(typeof r=="bigint")return String(r);let s=typeof r=="number"?r:Number(r);if(!isFinite(s))return isNaN(s)?".nan":s<0?"-.inf":".inf";let i=Object.is(r,-0)?"-0":JSON.stringify(r);if(!n&&e&&(!t||t==="tag:yaml.org,2002:float")&&/^\d/.test(i)){let o=i.indexOf(".");o<0&&(o=i.length,i+=".");let a=e-(i.length-o-1);for(;a-- >0;)i+="0"}return i}v_.stringifyNumber=zL});var qa=p(zs=>{"use strict";var QL=ce(),xa=sn(),ZL={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,resolve:n=>n.slice(-3).toLowerCase()==="nan"?NaN:n[0]==="-"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,stringify:xa.stringifyNumber},eI={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"EXP",test:/^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,resolve:n=>parseFloat(n),stringify(n){let e=Number(n.value);return isFinite(e)?e.toExponential():xa.stringifyNumber(n)}},tI={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,resolve(n){let e=new QL.Scalar(parseFloat(n)),t=n.indexOf(".");return t!==-1&&n[n.length-1]==="0"&&(e.minFractionDigits=n.length-t-1),e},stringify:xa.stringifyNumber};zs.float=tI;zs.floatExp=eI;zs.floatNaN=ZL});var Fa=p(Zs=>{"use strict";var N_=sn(),Qs=n=>typeof n=="bigint"||Number.isInteger(n),Ma=(n,e,t,{intAsBigInt:r})=>r?BigInt(n):parseInt(n.substring(e),t);function O_(n,e,t){let{value:r}=n;return Qs(r)&&r>=0?t+r.toString(e):N_.stringifyNumber(n)}var nI={identify:n=>Qs(n)&&n>=0,default:!0,tag:"tag:yaml.org,2002:int",format:"OCT",test:/^0o[0-7]+$/,resolve:(n,e,t)=>Ma(n,2,8,t),stringify:n=>O_(n,8,"0o")},rI={identify:Qs,default:!0,tag:"tag:yaml.org,2002:int",test:/^[-+]?[0-9]+$/,resolve:(n,e,t)=>Ma(n,0,10,t),stringify:N_.stringifyNumber},sI={identify:n=>Qs(n)&&n>=0,default:!0,tag:"tag:yaml.org,2002:int",format:"HEX",test:/^0x[0-9a-fA-F]+$/,resolve:(n,e,t)=>Ma(n,2,16,t),stringify:n=>O_(n,16,"0x")};Zs.int=rI;Zs.intHex=sI;Zs.intOct=nI});var R_=p(C_=>{"use strict";var iI=nn(),oI=Xs(),aI=rn(),lI=Jn(),cI=$a(),Da=qa(),ja=Fa(),uI=[iI.map,aI.seq,lI.string,oI.nullTag,cI.boolTag,ja.intOct,ja.int,ja.intHex,Da.floatNaN,Da.floatExp,Da.float];C_.schema=uI});var $_=p(k_=>{"use strict";var fI=ce(),hI=nn(),dI=rn();function P_(n){return typeof n=="bigint"||Number.isInteger(n)}var ei=({value:n})=>JSON.stringify(n),pI=[{identify:n=>typeof n=="string",default:!0,tag:"tag:yaml.org,2002:str",resolve:n=>n,stringify:ei},{identify:n=>n==null,createNode:()=>new fI.Scalar(null),default:!0,tag:"tag:yaml.org,2002:null",test:/^null$/,resolve:()=>null,stringify:ei},{identify:n=>typeof n=="boolean",default:!0,tag:"tag:yaml.org,2002:bool",test:/^true$|^false$/,resolve:n=>n==="true",stringify:ei},{identify:P_,default:!0,tag:"tag:yaml.org,2002:int",test:/^-?(?:0|[1-9][0-9]*)$/,resolve:(n,e,{intAsBigInt:t})=>t?BigInt(n):parseInt(n,10),stringify:({value:n})=>P_(n)?n.toString():JSON.stringify(n)},{identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,resolve:n=>parseFloat(n),stringify:ei}],_I={default:!0,tag:"",test:/^/,resolve(n,e){return e(`Unresolved plain scalar ${JSON.stringify(n)}`),n}},mI=[hI.map,dI.seq].concat(pI,_I);k_.schema=mI});var Ua=p(x_=>{"use strict";var Xn=G("buffer"),Ba=ce(),gI=Vn(),yI={identify:n=>n instanceof Uint8Array,default:!1,tag:"tag:yaml.org,2002:binary",resolve(n,e){if(typeof Xn.Buffer=="function")return Xn.Buffer.from(n,"base64");if(typeof atob=="function"){let t=atob(n.replace(/[\n\r]/g,"")),r=new Uint8Array(t.length);for(let s=0;s<t.length;++s)r[s]=t.charCodeAt(s);return r}else return e("This environment does not support reading binary tags; either Buffer or atob is required"),n},stringify({comment:n,type:e,value:t},r,s,i){if(!t)return"";let o=t,a;if(typeof Xn.Buffer=="function")a=o instanceof Xn.Buffer?o.toString("base64"):Xn.Buffer.from(o.buffer).toString("base64");else if(typeof btoa=="function"){let l="";for(let c=0;c<o.length;++c)l+=String.fromCharCode(o[c]);a=btoa(l)}else throw new Error("This environment does not support writing binary tags; either Buffer or btoa is required");if(e??(e=Ba.Scalar.BLOCK_LITERAL),e!==Ba.Scalar.QUOTE_DOUBLE){let l=Math.max(r.options.lineWidth-r.indent.length,r.options.minContentWidth),c=Math.ceil(a.length/l),u=new Array(c);for(let f=0,h=0;f<c;++f,h+=l)u[f]=a.substr(h,l);a=u.join(e===Ba.Scalar.BLOCK_LITERAL?`
`:" ")}return gI.stringifyString({comment:n,type:e,value:a},r,s,i)}};x_.binary=yI});var ri=p(ni=>{"use strict";var ti=Y(),Ha=St(),EI=ce(),TI=Lt();function q_(n,e){if(ti.isSeq(n))for(let t=0;t<n.items.length;++t){let r=n.items[t];if(!ti.isPair(r)){if(ti.isMap(r)){r.items.length>1&&e("Each pair must have its own sequence indicator");let s=r.items[0]||new Ha.Pair(new EI.Scalar(null));if(r.commentBefore&&(s.key.commentBefore=s.key.commentBefore?`${r.commentBefore}
${s.key.commentBefore}`:r.commentBefore),r.comment){let i=s.value??s.key;i.comment=i.comment?`${r.comment}
${i.comment}`:r.comment}r=s}n.items[t]=ti.isPair(r)?r:new Ha.Pair(r)}}else e("Expected a sequence for this tag");return n}function M_(n,e,t){let{replacer:r}=t,s=new TI.YAMLSeq(n);s.tag="tag:yaml.org,2002:pairs";let i=0;if(e&&Symbol.iterator in Object(e))for(let o of e){typeof r=="function"&&(o=r.call(e,String(i++),o));let a,l;if(Array.isArray(o))if(o.length===2)a=o[0],l=o[1];else throw new TypeError(`Expected [key, value] tuple: ${o}`);else if(o&&o instanceof Object){let c=Object.keys(o);if(c.length===1)a=c[0],l=o[a];else throw new TypeError(`Expected tuple with one key, not ${c.length} keys`)}else a=o;s.items.push(Ha.createPair(a,l,t))}return s}var SI={collection:"seq",default:!1,tag:"tag:yaml.org,2002:pairs",resolve:q_,createNode:M_};ni.createPairs=M_;ni.pairs=SI;ni.resolvePairs=q_});var Ga=p(Wa=>{"use strict";var F_=Y(),Va=gt(),zn=wt(),AI=Lt(),D_=ri(),xt=class n extends AI.YAMLSeq{constructor(){super(),this.add=zn.YAMLMap.prototype.add.bind(this),this.delete=zn.YAMLMap.prototype.delete.bind(this),this.get=zn.YAMLMap.prototype.get.bind(this),this.has=zn.YAMLMap.prototype.has.bind(this),this.set=zn.YAMLMap.prototype.set.bind(this),this.tag=n.tag}toJSON(e,t){if(!t)return super.toJSON(e);let r=new Map;t?.onCreate&&t.onCreate(r);for(let s of this.items){let i,o;if(F_.isPair(s)?(i=Va.toJS(s.key,"",t),o=Va.toJS(s.value,i,t)):i=Va.toJS(s,"",t),r.has(i))throw new Error("Ordered maps must not include duplicate keys");r.set(i,o)}return r}static from(e,t,r){let s=D_.createPairs(e,t,r),i=new this;return i.items=s.items,i}};xt.tag="tag:yaml.org,2002:omap";var wI={collection:"seq",identify:n=>n instanceof Map,nodeClass:xt,default:!1,tag:"tag:yaml.org,2002:omap",resolve(n,e){let t=D_.resolvePairs(n,e),r=[];for(let{key:s}of t.items)F_.isScalar(s)&&(r.includes(s.value)?e(`Ordered maps must not include duplicate keys: ${s.value}`):r.push(s.value));return Object.assign(new xt,t)},createNode:(n,e,t)=>xt.from(n,e,t)};Wa.YAMLOMap=xt;Wa.omap=wI});var V_=p(Ka=>{"use strict";var j_=ce();function B_({value:n,source:e},t){return e&&(n?U_:H_).test.test(e)?e:n?t.options.trueStr:t.options.falseStr}var U_={identify:n=>n===!0,default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,resolve:()=>new j_.Scalar(!0),stringify:B_},H_={identify:n=>n===!1,default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,resolve:()=>new j_.Scalar(!1),stringify:B_};Ka.falseTag=H_;Ka.trueTag=U_});var W_=p(si=>{"use strict";var LI=ce(),Ya=sn(),II={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,resolve:n=>n.slice(-3).toLowerCase()==="nan"?NaN:n[0]==="-"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,stringify:Ya.stringifyNumber},bI={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"EXP",test:/^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,resolve:n=>parseFloat(n.replace(/_/g,"")),stringify(n){let e=Number(n.value);return isFinite(e)?e.toExponential():Ya.stringifyNumber(n)}},vI={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,resolve(n){let e=new LI.Scalar(parseFloat(n.replace(/_/g,""))),t=n.indexOf(".");if(t!==-1){let r=n.substring(t+1).replace(/_/g,"");r[r.length-1]==="0"&&(e.minFractionDigits=r.length)}return e},stringify:Ya.stringifyNumber};si.float=vI;si.floatExp=bI;si.floatNaN=II});var K_=p(Zn=>{"use strict";var G_=sn(),Qn=n=>typeof n=="bigint"||Number.isInteger(n);function ii(n,e,t,{intAsBigInt:r}){let s=n[0];if((s==="-"||s==="+")&&(e+=1),n=n.substring(e).replace(/_/g,""),r){switch(t){case 2:n=`0b${n}`;break;case 8:n=`0o${n}`;break;case 16:n=`0x${n}`;break}let o=BigInt(n);return s==="-"?BigInt(-1)*o:o}let i=parseInt(n,t);return s==="-"?-1*i:i}function Ja(n,e,t){let{value:r}=n;if(Qn(r)){let s=r.toString(e);return r<0?"-"+t+s.substr(1):t+s}return G_.stringifyNumber(n)}var NI={identify:Qn,default:!0,tag:"tag:yaml.org,2002:int",format:"BIN",test:/^[-+]?0b[0-1_]+$/,resolve:(n,e,t)=>ii(n,2,2,t),stringify:n=>Ja(n,2,"0b")},OI={identify:Qn,default:!0,tag:"tag:yaml.org,2002:int",format:"OCT",test:/^[-+]?0[0-7_]+$/,resolve:(n,e,t)=>ii(n,1,8,t),stringify:n=>Ja(n,8,"0")},CI={identify:Qn,default:!0,tag:"tag:yaml.org,2002:int",test:/^[-+]?[0-9][0-9_]*$/,resolve:(n,e,t)=>ii(n,0,10,t),stringify:G_.stringifyNumber},RI={identify:Qn,default:!0,tag:"tag:yaml.org,2002:int",format:"HEX",test:/^[-+]?0x[0-9a-fA-F_]+$/,resolve:(n,e,t)=>ii(n,2,16,t),stringify:n=>Ja(n,16,"0x")};Zn.int=CI;Zn.intBin=NI;Zn.intHex=RI;Zn.intOct=OI});var za=p(Xa=>{"use strict";var li=Y(),oi=St(),ai=wt(),qt=class n extends ai.YAMLMap{constructor(e){super(e),this.tag=n.tag}add(e){let t;li.isPair(e)?t=e:e&&typeof e=="object"&&"key"in e&&"value"in e&&e.value===null?t=new oi.Pair(e.key,null):t=new oi.Pair(e,null),ai.findPair(this.items,t.key)||this.items.push(t)}get(e,t){let r=ai.findPair(this.items,e);return!t&&li.isPair(r)?li.isScalar(r.key)?r.key.value:r.key:r}set(e,t){if(typeof t!="boolean")throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof t}`);let r=ai.findPair(this.items,e);r&&!t?this.items.splice(this.items.indexOf(r),1):!r&&t&&this.items.push(new oi.Pair(e))}toJSON(e,t){return super.toJSON(e,t,Set)}toString(e,t,r){if(!e)return JSON.stringify(this);if(this.hasAllNullValues(!0))return super.toString(Object.assign({},e,{allNullValues:!0}),t,r);throw new Error("Set items must all have null values")}static from(e,t,r){let{replacer:s}=r,i=new this(e);if(t&&Symbol.iterator in Object(t))for(let o of t)typeof s=="function"&&(o=s.call(t,o,o)),i.items.push(oi.createPair(o,null,r));return i}};qt.tag="tag:yaml.org,2002:set";var PI={collection:"map",identify:n=>n instanceof Set,nodeClass:qt,default:!1,tag:"tag:yaml.org,2002:set",createNode:(n,e,t)=>qt.from(n,e,t),resolve(n,e){if(li.isMap(n)){if(n.hasAllNullValues(!0))return Object.assign(new qt,n);e("Set items must all have null values")}else e("Expected a mapping for this tag");return n}};Xa.YAMLSet=qt;Xa.set=PI});var Za=p(ci=>{"use strict";var kI=sn();function Qa(n,e){let t=n[0],r=t==="-"||t==="+"?n.substring(1):n,s=o=>e?BigInt(o):Number(o),i=r.replace(/_/g,"").split(":").reduce((o,a)=>o*s(60)+s(a),s(0));return t==="-"?s(-1)*i:i}function Y_(n){let{value:e}=n,t=o=>o;if(typeof e=="bigint")t=o=>BigInt(o);else if(isNaN(e)||!isFinite(e))return kI.stringifyNumber(n);let r="";e<0&&(r="-",e*=t(-1));let s=t(60),i=[e%s];return e<60?i.unshift(0):(e=(e-i[0])/s,i.unshift(e%s),e>=60&&(e=(e-i[0])/s,i.unshift(e))),r+i.map(o=>String(o).padStart(2,"0")).join(":").replace(/000000\d*$/,"")}var $I={identify:n=>typeof n=="bigint"||Number.isInteger(n),default:!0,tag:"tag:yaml.org,2002:int",format:"TIME",test:/^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,resolve:(n,e,{intAsBigInt:t})=>Qa(n,t),stringify:Y_},xI={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"TIME",test:/^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,resolve:n=>Qa(n,!1),stringify:Y_},J_={identify:n=>n instanceof Date,default:!0,tag:"tag:yaml.org,2002:timestamp",test:RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$"),resolve(n){let e=n.match(J_.test);if(!e)throw new Error("!!timestamp expects a date, starting with yyyy-mm-dd");let[,t,r,s,i,o,a]=e.map(Number),l=e[7]?Number((e[7]+"00").substr(1,3)):0,c=Date.UTC(t,r-1,s,i||0,o||0,a||0,l),u=e[8];if(u&&u!=="Z"){let f=Qa(u,!1);Math.abs(f)<30&&(f*=60),c-=6e4*f}return new Date(c)},stringify:({value:n})=>n?.toISOString().replace(/(T00:00:00)?\.000Z$/,"")??""};ci.floatTime=xI;ci.intTime=$I;ci.timestamp=J_});var Q_=p(z_=>{"use strict";var qI=nn(),MI=Xs(),FI=rn(),DI=Jn(),jI=Ua(),X_=V_(),el=W_(),ui=K_(),BI=Us(),UI=Ga(),HI=ri(),VI=za(),tl=Za(),WI=[qI.map,FI.seq,DI.string,MI.nullTag,X_.trueTag,X_.falseTag,ui.intBin,ui.intOct,ui.int,ui.intHex,el.floatNaN,el.floatExp,el.float,jI.binary,BI.merge,UI.omap,HI.pairs,VI.set,tl.intTime,tl.floatTime,tl.timestamp];z_.schema=WI});var lm=p(sl=>{"use strict";var nm=nn(),GI=Xs(),rm=rn(),KI=Jn(),YI=$a(),nl=qa(),rl=Fa(),JI=R_(),XI=$_(),sm=Ua(),er=Us(),im=Ga(),om=ri(),Z_=Q_(),am=za(),fi=Za(),em=new Map([["core",JI.schema],["failsafe",[nm.map,rm.seq,KI.string]],["json",XI.schema],["yaml11",Z_.schema],["yaml-1.1",Z_.schema]]),tm={binary:sm.binary,bool:YI.boolTag,float:nl.float,floatExp:nl.floatExp,floatNaN:nl.floatNaN,floatTime:fi.floatTime,int:rl.int,intHex:rl.intHex,intOct:rl.intOct,intTime:fi.intTime,map:nm.map,merge:er.merge,null:GI.nullTag,omap:im.omap,pairs:om.pairs,seq:rm.seq,set:am.set,timestamp:fi.timestamp},zI={"tag:yaml.org,2002:binary":sm.binary,"tag:yaml.org,2002:merge":er.merge,"tag:yaml.org,2002:omap":im.omap,"tag:yaml.org,2002:pairs":om.pairs,"tag:yaml.org,2002:set":am.set,"tag:yaml.org,2002:timestamp":fi.timestamp};function QI(n,e,t){let r=em.get(e);if(r&&!n)return t&&!r.includes(er.merge)?r.concat(er.merge):r.slice();let s=r;if(!s)if(Array.isArray(n))s=[];else{let i=Array.from(em.keys()).filter(o=>o!=="yaml11").map(o=>JSON.stringify(o)).join(", ");throw new Error(`Unknown schema "${e}"; use one of ${i} or define customTags array`)}if(Array.isArray(n))for(let i of n)s=s.concat(i);else typeof n=="function"&&(s=n(s.slice()));return t&&(s=s.concat(er.merge)),s.reduce((i,o)=>{let a=typeof o=="string"?tm[o]:o;if(!a){let l=JSON.stringify(o),c=Object.keys(tm).map(u=>JSON.stringify(u)).join(", ");throw new Error(`Unknown custom tag ${l}; use one of ${c}`)}return i.includes(a)||i.push(a),i},[])}sl.coreKnownTags=zI;sl.getTags=QI});var al=p(cm=>{"use strict";var il=Y(),ZI=nn(),eb=rn(),tb=Jn(),hi=lm(),nb=(n,e)=>n.key<e.key?-1:n.key>e.key?1:0,ol=class n{constructor({compat:e,customTags:t,merge:r,resolveKnownTags:s,schema:i,sortMapEntries:o,toStringDefaults:a}){this.compat=Array.isArray(e)?hi.getTags(e,"compat"):e?hi.getTags(null,e):null,this.name=typeof i=="string"&&i||"core",this.knownTags=s?hi.coreKnownTags:{},this.tags=hi.getTags(t,this.name,r),this.toStringOptions=a??null,Object.defineProperty(this,il.MAP,{value:ZI.map}),Object.defineProperty(this,il.SCALAR,{value:tb.string}),Object.defineProperty(this,il.SEQ,{value:eb.seq}),this.sortMapEntries=typeof o=="function"?o:o===!0?nb:null}clone(){let e=Object.create(n.prototype,Object.getOwnPropertyDescriptors(this));return e.tags=this.tags.slice(),e}};cm.Schema=ol});var fm=p(um=>{"use strict";var rb=Y(),ll=Wn(),tr=Bn();function sb(n,e){let t=[],r=e.directives===!0;if(e.directives!==!1&&n.directives){let l=n.directives.toString(n);l?(t.push(l),r=!0):n.directives.docStart&&(r=!0)}r&&t.push("---");let s=ll.createStringifyContext(n,e),{commentString:i}=s.options;if(n.commentBefore){t.length!==1&&t.unshift("");let l=i(n.commentBefore);t.unshift(tr.indentComment(l,""))}let o=!1,a=null;if(n.contents){if(rb.isNode(n.contents)){if(n.contents.spaceBefore&&r&&t.push(""),n.contents.commentBefore){let u=i(n.contents.commentBefore);t.push(tr.indentComment(u,""))}s.forceBlockIndent=!!n.comment,a=n.contents.comment}let l=a?void 0:()=>o=!0,c=ll.stringify(n.contents,s,()=>a=null,l);a&&(c+=tr.lineComment(c,"",i(a))),(c[0]==="|"||c[0]===">")&&t[t.length-1]==="---"?t[t.length-1]=`--- ${c}`:t.push(c)}else t.push(ll.stringify(n.contents,s));if(n.directives?.docEnd)if(n.comment){let l=i(n.comment);l.includes(`
`)?(t.push("..."),t.push(tr.indentComment(l,""))):t.push(`... ${l}`)}else t.push("...");else{let l=n.comment;l&&o&&(l=l.replace(/^\n+/,"")),l&&((!o||a)&&t[t.length-1]!==""&&t.push(""),t.push(tr.indentComment(i(l),"")))}return t.join(`
`)+`
`}um.stringifyDocument=sb});var nr=p(hm=>{"use strict";var ib=Dn(),on=ks(),De=Y(),ob=St(),ab=gt(),lb=al(),cb=fm(),cl=Os(),ub=da(),fb=jn(),ul=ha(),fl=class n{constructor(e,t,r){this.commentBefore=null,this.comment=null,this.errors=[],this.warnings=[],Object.defineProperty(this,De.NODE_TYPE,{value:De.DOC});let s=null;typeof t=="function"||Array.isArray(t)?s=t:r===void 0&&t&&(r=t,t=void 0);let i=Object.assign({intAsBigInt:!1,keepSourceTokens:!1,logLevel:"warn",prettyErrors:!0,strict:!0,stringKeys:!1,uniqueKeys:!0,version:"1.2"},r);this.options=i;let{version:o}=i;r?._directives?(this.directives=r._directives.atDocument(),this.directives.yaml.explicit&&(o=this.directives.yaml.version)):this.directives=new ul.Directives({version:o}),this.setSchema(o,r),this.contents=e===void 0?null:this.createNode(e,s,r)}clone(){let e=Object.create(n.prototype,{[De.NODE_TYPE]:{value:De.DOC}});return e.commentBefore=this.commentBefore,e.comment=this.comment,e.errors=this.errors.slice(),e.warnings=this.warnings.slice(),e.options=Object.assign({},this.options),this.directives&&(e.directives=this.directives.clone()),e.schema=this.schema.clone(),e.contents=De.isNode(this.contents)?this.contents.clone(e.schema):this.contents,this.range&&(e.range=this.range.slice()),e}add(e){an(this.contents)&&this.contents.add(e)}addIn(e,t){an(this.contents)&&this.contents.addIn(e,t)}createAlias(e,t){if(!e.anchor){let r=cl.anchorNames(this);e.anchor=!t||r.has(t)?cl.findNewAnchor(t||"a",r):t}return new ib.Alias(e.anchor)}createNode(e,t,r){let s;if(typeof t=="function")e=t.call({"":e},"",e),s=t;else if(Array.isArray(t)){let _=w=>typeof w=="number"||w instanceof String||w instanceof Number,S=t.filter(_).map(String);S.length>0&&(t=t.concat(S)),s=t}else r===void 0&&t&&(r=t,t=void 0);let{aliasDuplicateObjects:i,anchorPrefix:o,flow:a,keepUndefined:l,onTagObj:c,tag:u}=r??{},{onAnchor:f,setAnchors:h,sourceObjects:d}=cl.createNodeAnchors(this,o||"a"),y={aliasDuplicateObjects:i??!0,keepUndefined:l??!1,onAnchor:f,onTagObj:c,replacer:s,schema:this.schema,sourceObjects:d},m=fb.createNode(e,u,y);return a&&De.isCollection(m)&&(m.flow=!0),h(),m}createPair(e,t,r={}){let s=this.createNode(e,null,r),i=this.createNode(t,null,r);return new ob.Pair(s,i)}delete(e){return an(this.contents)?this.contents.delete(e):!1}deleteIn(e){return on.isEmptyPath(e)?this.contents==null?!1:(this.contents=null,!0):an(this.contents)?this.contents.deleteIn(e):!1}get(e,t){return De.isCollection(this.contents)?this.contents.get(e,t):void 0}getIn(e,t){return on.isEmptyPath(e)?!t&&De.isScalar(this.contents)?this.contents.value:this.contents:De.isCollection(this.contents)?this.contents.getIn(e,t):void 0}has(e){return De.isCollection(this.contents)?this.contents.has(e):!1}hasIn(e){return on.isEmptyPath(e)?this.contents!==void 0:De.isCollection(this.contents)?this.contents.hasIn(e):!1}set(e,t){this.contents==null?this.contents=on.collectionFromPath(this.schema,[e],t):an(this.contents)&&this.contents.set(e,t)}setIn(e,t){on.isEmptyPath(e)?this.contents=t:this.contents==null?this.contents=on.collectionFromPath(this.schema,Array.from(e),t):an(this.contents)&&this.contents.setIn(e,t)}setSchema(e,t={}){typeof e=="number"&&(e=String(e));let r;switch(e){case"1.1":this.directives?this.directives.yaml.version="1.1":this.directives=new ul.Directives({version:"1.1"}),r={resolveKnownTags:!1,schema:"yaml-1.1"};break;case"1.2":case"next":this.directives?this.directives.yaml.version=e:this.directives=new ul.Directives({version:e}),r={resolveKnownTags:!0,schema:"core"};break;case null:this.directives&&delete this.directives,r=null;break;default:{let s=JSON.stringify(e);throw new Error(`Expected '1.1', '1.2' or null as first argument, but found: ${s}`)}}if(t.schema instanceof Object)this.schema=t.schema;else if(r)this.schema=new lb.Schema(Object.assign(r,t));else throw new Error("With a null YAML version, the { schema: Schema } option is required")}toJS({json:e,jsonArg:t,mapAsMap:r,maxAliasCount:s,onAnchor:i,reviver:o}={}){let a={anchors:new Map,doc:this,keep:!e,mapAsMap:r===!0,mapKeyWarned:!1,maxAliasCount:typeof s=="number"?s:100},l=ab.toJS(this.contents,t??"",a);if(typeof i=="function")for(let{count:c,res:u}of a.anchors.values())i(u,c);return typeof o=="function"?ub.applyReviver(o,{"":l},"",l):l}toJSON(e,t){return this.toJS({json:!0,jsonArg:e,mapAsMap:!1,onAnchor:t})}toString(e={}){if(this.errors.length>0)throw new Error("Document with errors cannot be stringified");if("indent"in e&&(!Number.isInteger(e.indent)||Number(e.indent)<=0)){let t=JSON.stringify(e.indent);throw new Error(`"indent" option must be a positive integer, not ${t}`)}return cb.stringifyDocument(this,e)}};function an(n){if(De.isCollection(n))return!0;throw new Error("Expected a YAML collection as document contents")}hm.Document=fl});var ir=p(sr=>{"use strict";var rr=class extends Error{constructor(e,t,r,s){super(),this.name=e,this.code=r,this.message=s,this.pos=t}},hl=class extends rr{constructor(e,t,r){super("YAMLParseError",e,t,r)}},dl=class extends rr{constructor(e,t,r){super("YAMLWarning",e,t,r)}},hb=(n,e)=>t=>{if(t.pos[0]===-1)return;t.linePos=t.pos.map(a=>e.linePos(a));let{line:r,col:s}=t.linePos[0];t.message+=` at line ${r}, column ${s}`;let i=s-1,o=n.substring(e.lineStarts[r-1],e.lineStarts[r]).replace(/[\n\r]+$/,"");if(i>=60&&o.length>80){let a=Math.min(i-39,o.length-79);o="\u2026"+o.substring(a),i-=a-1}if(o.length>80&&(o=o.substring(0,79)+"\u2026"),r>1&&/^ *$/.test(o.substring(0,i))){let a=n.substring(e.lineStarts[r-2],e.lineStarts[r-1]);a.length>80&&(a=a.substring(0,79)+`\u2026
`),o=a+o}if(/[^ ]/.test(o)){let a=1,l=t.linePos[1];l?.line===r&&l.col>s&&(a=Math.max(1,Math.min(l.col-s,80-i)));let c=" ".repeat(i)+"^".repeat(a);t.message+=`:

${o}
${c}
`}};sr.YAMLError=rr;sr.YAMLParseError=hl;sr.YAMLWarning=dl;sr.prettifyError=hb});var or=p(dm=>{"use strict";function db(n,{flow:e,indicator:t,next:r,offset:s,onError:i,parentIndent:o,startOnNewline:a}){let l=!1,c=a,u=a,f="",h="",d=!1,y=!1,m=null,_=null,S=null,w=null,I=null,x=null,q=null;for(let R of n)switch(y&&(R.type!=="space"&&R.type!=="newline"&&R.type!=="comma"&&i(R.offset,"MISSING_CHAR","Tags and anchors must be separated from the next token by white space"),y=!1),m&&(c&&R.type!=="comment"&&R.type!=="newline"&&i(m,"TAB_AS_INDENT","Tabs are not allowed as indentation"),m=null),R.type){case"space":!e&&(t!=="doc-start"||r?.type!=="flow-collection")&&R.source.includes("	")&&(m=R),u=!0;break;case"comment":{u||i(R,"MISSING_CHAR","Comments must be separated from other tokens by white space characters");let C=R.source.substring(1)||" ";f?f+=h+C:f=C,h="",c=!1;break}case"newline":c?f?f+=R.source:(!x||t!=="seq-item-ind")&&(l=!0):h+=R.source,c=!0,d=!0,(_||S)&&(w=R),u=!0;break;case"anchor":_&&i(R,"MULTIPLE_ANCHORS","A node can have at most one anchor"),R.source.endsWith(":")&&i(R.offset+R.source.length-1,"BAD_ALIAS","Anchor ending in : is ambiguous",!0),_=R,q??(q=R.offset),c=!1,u=!1,y=!0;break;case"tag":{S&&i(R,"MULTIPLE_TAGS","A node can have at most one tag"),S=R,q??(q=R.offset),c=!1,u=!1,y=!0;break}case t:(_||S)&&i(R,"BAD_PROP_ORDER",`Anchors and tags must be after the ${R.source} indicator`),x&&i(R,"UNEXPECTED_TOKEN",`Unexpected ${R.source} in ${e??"collection"}`),x=R,c=t==="seq-item-ind"||t==="explicit-key-ind",u=!1;break;case"comma":if(e){I&&i(R,"UNEXPECTED_TOKEN",`Unexpected , in ${e}`),I=R,c=!1,u=!1;break}default:i(R,"UNEXPECTED_TOKEN",`Unexpected ${R.type} token`),c=!1,u=!1}let M=n[n.length-1],J=M?M.offset+M.source.length:s;return y&&r&&r.type!=="space"&&r.type!=="newline"&&r.type!=="comma"&&(r.type!=="scalar"||r.source!=="")&&i(r.offset,"MISSING_CHAR","Tags and anchors must be separated from the next token by white space"),m&&(c&&m.indent<=o||r?.type==="block-map"||r?.type==="block-seq")&&i(m,"TAB_AS_INDENT","Tabs are not allowed as indentation"),{comma:I,found:x,spaceBefore:l,comment:f,hasNewline:d,anchor:_,tag:S,newlineAfterProp:w,end:J,start:q??J}}dm.resolveProps=db});var di=p(pm=>{"use strict";function pl(n){if(!n)return null;switch(n.type){case"alias":case"scalar":case"double-quoted-scalar":case"single-quoted-scalar":if(n.source.includes(`
`))return!0;if(n.end){for(let e of n.end)if(e.type==="newline")return!0}return!1;case"flow-collection":for(let e of n.items){for(let t of e.start)if(t.type==="newline")return!0;if(e.sep){for(let t of e.sep)if(t.type==="newline")return!0}if(pl(e.key)||pl(e.value))return!0}return!1;default:return!0}}pm.containsNewline=pl});var _l=p(_m=>{"use strict";var pb=di();function _b(n,e,t){if(e?.type==="flow-collection"){let r=e.end[0];r.indent===n&&(r.source==="]"||r.source==="}")&&pb.containsNewline(e)&&t(r,"BAD_INDENT","Flow end indicator should be more indented than parent",!0)}}_m.flowIndentCheck=_b});var ml=p(gm=>{"use strict";var mm=Y();function mb(n,e,t){let{uniqueKeys:r}=n.options;if(r===!1)return!1;let s=typeof r=="function"?r:(i,o)=>i===o||mm.isScalar(i)&&mm.isScalar(o)&&i.value===o.value;return e.some(i=>s(i.key,t))}gm.mapIncludes=mb});var wm=p(Am=>{"use strict";var ym=St(),gb=wt(),Em=or(),yb=di(),Tm=_l(),Eb=ml(),Sm="All mapping items must start at the same column";function Tb({composeNode:n,composeEmptyNode:e},t,r,s,i){let o=i?.nodeClass??gb.YAMLMap,a=new o(t.schema);t.atRoot&&(t.atRoot=!1);let l=r.offset,c=null;for(let u of r.items){let{start:f,key:h,sep:d,value:y}=u,m=Em.resolveProps(f,{indicator:"explicit-key-ind",next:h??d?.[0],offset:l,onError:s,parentIndent:r.indent,startOnNewline:!0}),_=!m.found;if(_){if(h&&(h.type==="block-seq"?s(l,"BLOCK_AS_IMPLICIT_KEY","A block sequence may not be used as an implicit map key"):"indent"in h&&h.indent!==r.indent&&s(l,"BAD_INDENT",Sm)),!m.anchor&&!m.tag&&!d){c=m.end,m.comment&&(a.comment?a.comment+=`
`+m.comment:a.comment=m.comment);continue}(m.newlineAfterProp||yb.containsNewline(h))&&s(h??f[f.length-1],"MULTILINE_IMPLICIT_KEY","Implicit keys need to be on a single line")}else m.found?.indent!==r.indent&&s(l,"BAD_INDENT",Sm);t.atKey=!0;let S=m.end,w=h?n(t,h,m,s):e(t,S,f,null,m,s);t.schema.compat&&Tm.flowIndentCheck(r.indent,h,s),t.atKey=!1,Eb.mapIncludes(t,a.items,w)&&s(S,"DUPLICATE_KEY","Map keys must be unique");let I=Em.resolveProps(d??[],{indicator:"map-value-ind",next:y,offset:w.range[2],onError:s,parentIndent:r.indent,startOnNewline:!h||h.type==="block-scalar"});if(l=I.end,I.found){_&&(y?.type==="block-map"&&!I.hasNewline&&s(l,"BLOCK_AS_IMPLICIT_KEY","Nested mappings are not allowed in compact mappings"),t.options.strict&&m.start<I.found.offset-1024&&s(w.range,"KEY_OVER_1024_CHARS","The : indicator must be at most 1024 chars after the start of an implicit block mapping key"));let x=y?n(t,y,I,s):e(t,l,d,null,I,s);t.schema.compat&&Tm.flowIndentCheck(r.indent,y,s),l=x.range[2];let q=new ym.Pair(w,x);t.options.keepSourceTokens&&(q.srcToken=u),a.items.push(q)}else{_&&s(w.range,"MISSING_CHAR","Implicit map keys need to be followed by map values"),I.comment&&(w.comment?w.comment+=`
`+I.comment:w.comment=I.comment);let x=new ym.Pair(w);t.options.keepSourceTokens&&(x.srcToken=u),a.items.push(x)}}return c&&c<l&&s(c,"IMPOSSIBLE","Map comment with trailing content"),a.range=[r.offset,l,c??l],a}Am.resolveBlockMap=Tb});var Im=p(Lm=>{"use strict";var Sb=Lt(),Ab=or(),wb=_l();function Lb({composeNode:n,composeEmptyNode:e},t,r,s,i){let o=i?.nodeClass??Sb.YAMLSeq,a=new o(t.schema);t.atRoot&&(t.atRoot=!1),t.atKey&&(t.atKey=!1);let l=r.offset,c=null;for(let{start:u,value:f}of r.items){let h=Ab.resolveProps(u,{indicator:"seq-item-ind",next:f,offset:l,onError:s,parentIndent:r.indent,startOnNewline:!0});if(!h.found)if(h.anchor||h.tag||f)f?.type==="block-seq"?s(h.end,"BAD_INDENT","All sequence items must start at the same column"):s(l,"MISSING_CHAR","Sequence item without - indicator");else{c=h.end,h.comment&&(a.comment=h.comment);continue}let d=f?n(t,f,h,s):e(t,h.end,u,null,h,s);t.schema.compat&&wb.flowIndentCheck(r.indent,f,s),l=d.range[2],a.items.push(d)}return a.range=[r.offset,l,c??l],a}Lm.resolveBlockSeq=Lb});var ln=p(bm=>{"use strict";function Ib(n,e,t,r){let s="";if(n){let i=!1,o="";for(let a of n){let{source:l,type:c}=a;switch(c){case"space":i=!0;break;case"comment":{t&&!i&&r(a,"MISSING_CHAR","Comments must be separated from other tokens by white space characters");let u=l.substring(1)||" ";s?s+=o+u:s=u,o="";break}case"newline":s&&(o+=l),i=!0;break;default:r(a,"UNEXPECTED_TOKEN",`Unexpected ${c} at node end`)}e+=l.length}}return{comment:s,offset:e}}bm.resolveEnd=Ib});var Cm=p(Om=>{"use strict";var bb=Y(),vb=St(),vm=wt(),Nb=Lt(),Ob=ln(),Nm=or(),Cb=di(),Rb=ml(),gl="Block collections are not allowed within flow collections",yl=n=>n&&(n.type==="block-map"||n.type==="block-seq");function Pb({composeNode:n,composeEmptyNode:e},t,r,s,i){let o=r.start.source==="{",a=o?"flow map":"flow sequence",l=i?.nodeClass??(o?vm.YAMLMap:Nb.YAMLSeq),c=new l(t.schema);c.flow=!0;let u=t.atRoot;u&&(t.atRoot=!1),t.atKey&&(t.atKey=!1);let f=r.offset+r.start.source.length;for(let _=0;_<r.items.length;++_){let S=r.items[_],{start:w,key:I,sep:x,value:q}=S,M=Nm.resolveProps(w,{flow:a,indicator:"explicit-key-ind",next:I??x?.[0],offset:f,onError:s,parentIndent:r.indent,startOnNewline:!1});if(!M.found){if(!M.anchor&&!M.tag&&!x&&!q){_===0&&M.comma?s(M.comma,"UNEXPECTED_TOKEN",`Unexpected , in ${a}`):_<r.items.length-1&&s(M.start,"UNEXPECTED_TOKEN",`Unexpected empty item in ${a}`),M.comment&&(c.comment?c.comment+=`
`+M.comment:c.comment=M.comment),f=M.end;continue}!o&&t.options.strict&&Cb.containsNewline(I)&&s(I,"MULTILINE_IMPLICIT_KEY","Implicit keys of flow sequence pairs need to be on a single line")}if(_===0)M.comma&&s(M.comma,"UNEXPECTED_TOKEN",`Unexpected , in ${a}`);else if(M.comma||s(M.start,"MISSING_CHAR",`Missing , between ${a} items`),M.comment){let J="";e:for(let R of w)switch(R.type){case"comma":case"space":break;case"comment":J=R.source.substring(1);break e;default:break e}if(J){let R=c.items[c.items.length-1];bb.isPair(R)&&(R=R.value??R.key),R.comment?R.comment+=`
`+J:R.comment=J,M.comment=M.comment.substring(J.length+1)}}if(!o&&!x&&!M.found){let J=q?n(t,q,M,s):e(t,M.end,x,null,M,s);c.items.push(J),f=J.range[2],yl(q)&&s(J.range,"BLOCK_IN_FLOW",gl)}else{t.atKey=!0;let J=M.end,R=I?n(t,I,M,s):e(t,J,w,null,M,s);yl(I)&&s(R.range,"BLOCK_IN_FLOW",gl),t.atKey=!1;let C=Nm.resolveProps(x??[],{flow:a,indicator:"map-value-ind",next:q,offset:R.range[2],onError:s,parentIndent:r.indent,startOnNewline:!1});if(C.found){if(!o&&!M.found&&t.options.strict){if(x)for(let D of x){if(D===C.found)break;if(D.type==="newline"){s(D,"MULTILINE_IMPLICIT_KEY","Implicit keys of flow sequence pairs need to be on a single line");break}}M.start<C.found.offset-1024&&s(C.found,"KEY_OVER_1024_CHARS","The : indicator must be at most 1024 chars after the start of an implicit flow sequence key")}}else q&&("source"in q&&q.source?.[0]===":"?s(q,"MISSING_CHAR",`Missing space after : in ${a}`):s(C.start,"MISSING_CHAR",`Missing , or : between ${a} items`));let B=q?n(t,q,C,s):C.found?e(t,C.end,x,null,C,s):null;B?yl(q)&&s(B.range,"BLOCK_IN_FLOW",gl):C.comment&&(R.comment?R.comment+=`
`+C.comment:R.comment=C.comment);let j=new vb.Pair(R,B);if(t.options.keepSourceTokens&&(j.srcToken=S),o){let D=c;Rb.mapIncludes(t,D.items,R)&&s(J,"DUPLICATE_KEY","Map keys must be unique"),D.items.push(j)}else{let D=new vm.YAMLMap(t.schema);D.flow=!0,D.items.push(j);let z=(B??R).range;D.range=[R.range[0],z[1],z[2]],c.items.push(D)}f=B?B.range[2]:C.end}}let h=o?"}":"]",[d,...y]=r.end,m=f;if(d?.source===h)m=d.offset+d.source.length;else{let _=a[0].toUpperCase()+a.substring(1),S=u?`${_} must end with a ${h}`:`${_} in block collection must be sufficiently indented and end with a ${h}`;s(f,u?"MISSING_CHAR":"BAD_INDENT",S),d&&d.source.length!==1&&y.unshift(d)}if(y.length>0){let _=Ob.resolveEnd(y,m,t.options.strict,s);_.comment&&(c.comment?c.comment+=`
`+_.comment:c.comment=_.comment),c.range=[r.offset,m,_.offset]}else c.range=[r.offset,m,m];return c}Om.resolveFlowCollection=Pb});var Pm=p(Rm=>{"use strict";var kb=Y(),$b=ce(),xb=wt(),qb=Lt(),Mb=wm(),Fb=Im(),Db=Cm();function El(n,e,t,r,s,i){let o=t.type==="block-map"?Mb.resolveBlockMap(n,e,t,r,i):t.type==="block-seq"?Fb.resolveBlockSeq(n,e,t,r,i):Db.resolveFlowCollection(n,e,t,r,i),a=o.constructor;return s==="!"||s===a.tagName?(o.tag=a.tagName,o):(s&&(o.tag=s),o)}function jb(n,e,t,r,s){let i=r.tag,o=i?e.directives.tagName(i.source,h=>s(i,"TAG_RESOLVE_FAILED",h)):null;if(t.type==="block-seq"){let{anchor:h,newlineAfterProp:d}=r,y=h&&i?h.offset>i.offset?h:i:h??i;y&&(!d||d.offset<y.offset)&&s(y,"MISSING_CHAR","Missing newline after block sequence props")}let a=t.type==="block-map"?"map":t.type==="block-seq"?"seq":t.start.source==="{"?"map":"seq";if(!i||!o||o==="!"||o===xb.YAMLMap.tagName&&a==="map"||o===qb.YAMLSeq.tagName&&a==="seq")return El(n,e,t,s,o);let l=e.schema.tags.find(h=>h.tag===o&&h.collection===a);if(!l){let h=e.schema.knownTags[o];if(h?.collection===a)e.schema.tags.push(Object.assign({},h,{default:!1})),l=h;else return h?s(i,"BAD_COLLECTION_TYPE",`${h.tag} used for ${a} collection, but expects ${h.collection??"scalar"}`,!0):s(i,"TAG_RESOLVE_FAILED",`Unresolved tag: ${o}`,!0),El(n,e,t,s,o)}let c=El(n,e,t,s,o,l),u=l.resolve?.(c,h=>s(i,"TAG_RESOLVE_FAILED",h),e.options)??c,f=kb.isNode(u)?u:new $b.Scalar(u);return f.range=c.range,f.tag=o,l?.format&&(f.format=l.format),f}Rm.composeCollection=jb});var Sl=p(km=>{"use strict";var Tl=ce();function Bb(n,e,t){let r=e.offset,s=Ub(e,n.options.strict,t);if(!s)return{value:"",type:null,comment:"",range:[r,r,r]};let i=s.mode===">"?Tl.Scalar.BLOCK_FOLDED:Tl.Scalar.BLOCK_LITERAL,o=e.source?Hb(e.source):[],a=o.length;for(let m=o.length-1;m>=0;--m){let _=o[m][1];if(_===""||_==="\r")a=m;else break}if(a===0){let m=s.chomp==="+"&&o.length>0?`
`.repeat(Math.max(1,o.length-1)):"",_=r+s.length;return e.source&&(_+=e.source.length),{value:m,type:i,comment:s.comment,range:[r,_,_]}}let l=e.indent+s.indent,c=e.offset+s.length,u=0;for(let m=0;m<a;++m){let[_,S]=o[m];if(S===""||S==="\r")s.indent===0&&_.length>l&&(l=_.length);else{_.length<l&&t(c+_.length,"MISSING_CHAR","Block scalars with more-indented leading empty lines must use an explicit indentation indicator"),s.indent===0&&(l=_.length),u=m,l===0&&!n.atRoot&&t(c,"BAD_INDENT","Block scalar values in collections must be indented");break}c+=_.length+S.length+1}for(let m=o.length-1;m>=a;--m)o[m][0].length>l&&(a=m+1);let f="",h="",d=!1;for(let m=0;m<u;++m)f+=o[m][0].slice(l)+`
`;for(let m=u;m<a;++m){let[_,S]=o[m];c+=_.length+S.length+1;let w=S[S.length-1]==="\r";if(w&&(S=S.slice(0,-1)),S&&_.length<l){let x=`Block scalar lines must not be less indented than their ${s.indent?"explicit indentation indicator":"first line"}`;t(c-S.length-(w?2:1),"BAD_INDENT",x),_=""}i===Tl.Scalar.BLOCK_LITERAL?(f+=h+_.slice(l)+S,h=`
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
`}let y=r+s.length+e.source.length;return{value:f,type:i,comment:s.comment,range:[r,y,y]}}function Ub({offset:n,props:e},t,r){if(e[0].type!=="block-scalar-header")return r(e[0],"IMPOSSIBLE","Block scalar header not found"),null;let{source:s}=e[0],i=s[0],o=0,a="",l=-1;for(let h=1;h<s.length;++h){let d=s[h];if(!a&&(d==="-"||d==="+"))a=d;else{let y=Number(d);!o&&y?o=y:l===-1&&(l=n+h)}}l!==-1&&r(l,"UNEXPECTED_TOKEN",`Block scalar header includes extra characters: ${s}`);let c=!1,u="",f=s.length;for(let h=1;h<e.length;++h){let d=e[h];switch(d.type){case"space":c=!0;case"newline":f+=d.source.length;break;case"comment":t&&!c&&r(d,"MISSING_CHAR","Comments must be separated from other tokens by white space characters"),f+=d.source.length,u=d.source.substring(1);break;case"error":r(d,"UNEXPECTED_TOKEN",d.message),f+=d.source.length;break;default:{let y=`Unexpected token in block scalar header: ${d.type}`;r(d,"UNEXPECTED_TOKEN",y);let m=d.source;m&&typeof m=="string"&&(f+=m.length)}}}return{mode:i,indent:o,chomp:a,comment:u,length:f}}function Hb(n){let e=n.split(/\n( *)/),t=e[0],r=t.match(/^( *)/),i=[r?.[1]?[r[1],t.slice(r[1].length)]:["",t]];for(let o=1;o<e.length;o+=2)i.push([e[o],e[o+1]]);return i}km.resolveBlockScalar=Bb});var wl=p(xm=>{"use strict";var Al=ce(),Vb=ln();function Wb(n,e,t){let{offset:r,type:s,source:i,end:o}=n,a,l,c=(h,d,y)=>t(r+h,d,y);switch(s){case"scalar":a=Al.Scalar.PLAIN,l=Gb(i,c);break;case"single-quoted-scalar":a=Al.Scalar.QUOTE_SINGLE,l=Kb(i,c);break;case"double-quoted-scalar":a=Al.Scalar.QUOTE_DOUBLE,l=Yb(i,c);break;default:return t(n,"UNEXPECTED_TOKEN",`Expected a flow scalar value, but found: ${s}`),{value:"",type:null,comment:"",range:[r,r+i.length,r+i.length]}}let u=r+i.length,f=Vb.resolveEnd(o,u,e,t);return{value:l,type:a,comment:f.comment,range:[r,u,f.offset]}}function Gb(n,e){let t="";switch(n[0]){case"	":t="a tab character";break;case",":t="flow indicator character ,";break;case"%":t="directive indicator character %";break;case"|":case">":{t=`block scalar indicator ${n[0]}`;break}case"@":case"`":{t=`reserved character ${n[0]}`;break}}return t&&e(0,"BAD_SCALAR_START",`Plain value cannot start with ${t}`),$m(n)}function Kb(n,e){return(n[n.length-1]!=="'"||n.length===1)&&e(n.length,"MISSING_CHAR","Missing closing 'quote"),$m(n.slice(1,-1)).replace(/''/g,"'")}function $m(n){let e,t;try{e=new RegExp(`(.*?)(?<![ 	])[ 	]*\r?
`,"sy"),t=new RegExp(`[ 	]*(.*?)(?:(?<![ 	])[ 	]*)?\r?
`,"sy")}catch{e=/(.*?)[ \t]*\r?\n/sy,t=/[ \t]*(.*?)[ \t]*\r?\n/sy}let r=e.exec(n);if(!r)return n;let s=r[1],i=" ",o=e.lastIndex;for(t.lastIndex=o;r=t.exec(n);)r[1]===""?i===`
`?s+=i:i=`
`:(s+=i+r[1],i=" "),o=t.lastIndex;let a=/[ \t]*(.*)/sy;return a.lastIndex=o,r=a.exec(n),s+i+(r?.[1]??"")}function Yb(n,e){let t="";for(let r=1;r<n.length-1;++r){let s=n[r];if(!(s==="\r"&&n[r+1]===`
`))if(s===`
`){let{fold:i,offset:o}=Jb(n,r);t+=i,r=o}else if(s==="\\"){let i=n[++r],o=Xb[i];if(o)t+=o;else if(i===`
`)for(i=n[r+1];i===" "||i==="	";)i=n[++r+1];else if(i==="\r"&&n[r+1]===`
`)for(i=n[++r+1];i===" "||i==="	";)i=n[++r+1];else if(i==="x"||i==="u"||i==="U"){let a={x:2,u:4,U:8}[i];t+=zb(n,r+1,a,e),r+=a}else{let a=n.substr(r-1,2);e(r-1,"BAD_DQ_ESCAPE",`Invalid escape sequence ${a}`),t+=a}}else if(s===" "||s==="	"){let i=r,o=n[r+1];for(;o===" "||o==="	";)o=n[++r+1];o!==`
`&&!(o==="\r"&&n[r+2]===`
`)&&(t+=r>i?n.slice(i,r+1):s)}else t+=s}return(n[n.length-1]!=='"'||n.length===1)&&e(n.length,"MISSING_CHAR",'Missing closing "quote'),t}function Jb(n,e){let t="",r=n[e+1];for(;(r===" "||r==="	"||r===`
`||r==="\r")&&!(r==="\r"&&n[e+2]!==`
`);)r===`
`&&(t+=`
`),e+=1,r=n[e+1];return t||(t=" "),{fold:t,offset:e}}var Xb={0:"\0",a:"\x07",b:"\b",e:"\x1B",f:"\f",n:`
`,r:"\r",t:"	",v:"\v",N:"\x85",_:"\xA0",L:"\u2028",P:"\u2029"," ":" ",'"':'"',"/":"/","\\":"\\","	":"	"};function zb(n,e,t,r){let s=n.substr(e,t),o=s.length===t&&/^[0-9a-fA-F]+$/.test(s)?parseInt(s,16):NaN;if(isNaN(o)){let a=n.substr(e-2,t+2);return r(e-2,"BAD_DQ_ESCAPE",`Invalid escape sequence ${a}`),a}return String.fromCodePoint(o)}xm.resolveFlowScalar=Wb});var Fm=p(Mm=>{"use strict";var Mt=Y(),qm=ce(),Qb=Sl(),Zb=wl();function ev(n,e,t,r){let{value:s,type:i,comment:o,range:a}=e.type==="block-scalar"?Qb.resolveBlockScalar(n,e,r):Zb.resolveFlowScalar(e,n.options.strict,r),l=t?n.directives.tagName(t.source,f=>r(t,"TAG_RESOLVE_FAILED",f)):null,c;n.options.stringKeys&&n.atKey?c=n.schema[Mt.SCALAR]:l?c=tv(n.schema,s,l,t,r):e.type==="scalar"?c=nv(n,s,e,r):c=n.schema[Mt.SCALAR];let u;try{let f=c.resolve(s,h=>r(t??e,"TAG_RESOLVE_FAILED",h),n.options);u=Mt.isScalar(f)?f:new qm.Scalar(f)}catch(f){let h=f instanceof Error?f.message:String(f);r(t??e,"TAG_RESOLVE_FAILED",h),u=new qm.Scalar(s)}return u.range=a,u.source=s,i&&(u.type=i),l&&(u.tag=l),c.format&&(u.format=c.format),o&&(u.comment=o),u}function tv(n,e,t,r,s){if(t==="!")return n[Mt.SCALAR];let i=[];for(let a of n.tags)if(!a.collection&&a.tag===t)if(a.default&&a.test)i.push(a);else return a;for(let a of i)if(a.test?.test(e))return a;let o=n.knownTags[t];return o&&!o.collection?(n.tags.push(Object.assign({},o,{default:!1,test:void 0})),o):(s(r,"TAG_RESOLVE_FAILED",`Unresolved tag: ${t}`,t!=="tag:yaml.org,2002:str"),n[Mt.SCALAR])}function nv({atKey:n,directives:e,schema:t},r,s,i){let o=t.tags.find(a=>(a.default===!0||n&&a.default==="key")&&a.test?.test(r))||t[Mt.SCALAR];if(t.compat){let a=t.compat.find(l=>l.default&&l.test?.test(r))??t[Mt.SCALAR];if(o.tag!==a.tag){let l=e.tagString(o.tag),c=e.tagString(a.tag),u=`Value may be parsed as either ${l} or ${c}`;i(s,"TAG_RESOLVE_FAILED",u,!0)}}return o}Mm.composeScalar=ev});var jm=p(Dm=>{"use strict";function rv(n,e,t){if(e){t??(t=e.length);for(let r=t-1;r>=0;--r){let s=e[r];switch(s.type){case"space":case"comment":case"newline":n-=s.source.length;continue}for(s=e[++r];s?.type==="space";)n+=s.source.length,s=e[++r];break}}return n}Dm.emptyScalarPosition=rv});var Hm=p(Il=>{"use strict";var sv=Dn(),iv=Y(),ov=Pm(),Bm=Fm(),av=ln(),lv=jm(),cv={composeNode:Um,composeEmptyNode:Ll};function Um(n,e,t,r){let s=n.atKey,{spaceBefore:i,comment:o,anchor:a,tag:l}=t,c,u=!0;switch(e.type){case"alias":c=uv(n,e,r),(a||l)&&r(e,"ALIAS_PROPS","An alias node must not specify any properties");break;case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":case"block-scalar":c=Bm.composeScalar(n,e,l,r),a&&(c.anchor=a.source.substring(1));break;case"block-map":case"block-seq":case"flow-collection":c=ov.composeCollection(cv,n,e,t,r),a&&(c.anchor=a.source.substring(1));break;default:{let f=e.type==="error"?e.message:`Unsupported token (type: ${e.type})`;r(e,"UNEXPECTED_TOKEN",f),c=Ll(n,e.offset,void 0,null,t,r),u=!1}}return a&&c.anchor===""&&r(a,"BAD_ALIAS","Anchor cannot be an empty string"),s&&n.options.stringKeys&&(!iv.isScalar(c)||typeof c.value!="string"||c.tag&&c.tag!=="tag:yaml.org,2002:str")&&r(l??e,"NON_STRING_KEY","With stringKeys, all keys must be strings"),i&&(c.spaceBefore=!0),o&&(e.type==="scalar"&&e.source===""?c.comment=o:c.commentBefore=o),n.options.keepSourceTokens&&u&&(c.srcToken=e),c}function Ll(n,e,t,r,{spaceBefore:s,comment:i,anchor:o,tag:a,end:l},c){let u={type:"scalar",offset:lv.emptyScalarPosition(e,t,r),indent:-1,source:""},f=Bm.composeScalar(n,u,a,c);return o&&(f.anchor=o.source.substring(1),f.anchor===""&&c(o,"BAD_ALIAS","Anchor cannot be an empty string")),s&&(f.spaceBefore=!0),i&&(f.comment=i,f.range[2]=l),f}function uv({options:n},{offset:e,source:t,end:r},s){let i=new sv.Alias(t.substring(1));i.source===""&&s(e,"BAD_ALIAS","Alias cannot be an empty string"),i.source.endsWith(":")&&s(e+t.length-1,"BAD_ALIAS","Alias ending in : is ambiguous",!0);let o=e+t.length,a=av.resolveEnd(r,o,n.strict,s);return i.range=[e,o,a.offset],a.comment&&(i.comment=a.comment),i}Il.composeEmptyNode=Ll;Il.composeNode=Um});var Gm=p(Wm=>{"use strict";var fv=nr(),Vm=Hm(),hv=ln(),dv=or();function pv(n,e,{offset:t,start:r,value:s,end:i},o){let a=Object.assign({_directives:e},n),l=new fv.Document(void 0,a),c={atKey:!1,atRoot:!0,directives:l.directives,options:l.options,schema:l.schema},u=dv.resolveProps(r,{indicator:"doc-start",next:s??i?.[0],offset:t,onError:o,parentIndent:0,startOnNewline:!0});u.found&&(l.directives.docStart=!0,s&&(s.type==="block-map"||s.type==="block-seq")&&!u.hasNewline&&o(u.end,"MISSING_CHAR","Block collection cannot start on same line with directives-end marker")),l.contents=s?Vm.composeNode(c,s,u,o):Vm.composeEmptyNode(c,u.end,r,null,u,o);let f=l.contents.range[2],h=hv.resolveEnd(i,f,!1,o);return h.comment&&(l.comment=h.comment),l.range=[t,f,h.offset],l}Wm.composeDoc=pv});var vl=p(Jm=>{"use strict";var _v=G("process"),mv=ha(),gv=nr(),ar=ir(),Km=Y(),yv=Gm(),Ev=ln();function lr(n){if(typeof n=="number")return[n,n+1];if(Array.isArray(n))return n.length===2?n:[n[0],n[1]];let{offset:e,source:t}=n;return[e,e+(typeof t=="string"?t.length:1)]}function Ym(n){let e="",t=!1,r=!1;for(let s=0;s<n.length;++s){let i=n[s];switch(i[0]){case"#":e+=(e===""?"":r?`

`:`
`)+(i.substring(1)||" "),t=!0,r=!1;break;case"%":n[s+1]?.[0]!=="#"&&(s+=1),t=!1;break;default:t||(r=!0),t=!1}}return{comment:e,afterEmptyLine:r}}var bl=class{constructor(e={}){this.doc=null,this.atDirectives=!1,this.prelude=[],this.errors=[],this.warnings=[],this.onError=(t,r,s,i)=>{let o=lr(t);i?this.warnings.push(new ar.YAMLWarning(o,r,s)):this.errors.push(new ar.YAMLParseError(o,r,s))},this.directives=new mv.Directives({version:e.version||"1.2"}),this.options=e}decorate(e,t){let{comment:r,afterEmptyLine:s}=Ym(this.prelude);if(r){let i=e.contents;if(t)e.comment=e.comment?`${e.comment}
${r}`:r;else if(s||e.directives.docStart||!i)e.commentBefore=r;else if(Km.isCollection(i)&&!i.flow&&i.items.length>0){let o=i.items[0];Km.isPair(o)&&(o=o.key);let a=o.commentBefore;o.commentBefore=a?`${r}
${a}`:r}else{let o=i.commentBefore;i.commentBefore=o?`${r}
${o}`:r}}t?(Array.prototype.push.apply(e.errors,this.errors),Array.prototype.push.apply(e.warnings,this.warnings)):(e.errors=this.errors,e.warnings=this.warnings),this.prelude=[],this.errors=[],this.warnings=[]}streamInfo(){return{comment:Ym(this.prelude).comment,directives:this.directives,errors:this.errors,warnings:this.warnings}}*compose(e,t=!1,r=-1){for(let s of e)yield*this.next(s);yield*this.end(t,r)}*next(e){switch(_v.env.LOG_STREAM&&console.dir(e,{depth:null}),e.type){case"directive":this.directives.add(e.source,(t,r,s)=>{let i=lr(e);i[0]+=t,this.onError(i,"BAD_DIRECTIVE",r,s)}),this.prelude.push(e.source),this.atDirectives=!0;break;case"document":{let t=yv.composeDoc(this.options,this.directives,e,this.onError);this.atDirectives&&!t.directives.docStart&&this.onError(e,"MISSING_CHAR","Missing directives-end/doc-start indicator line"),this.decorate(t,!1),this.doc&&(yield this.doc),this.doc=t,this.atDirectives=!1;break}case"byte-order-mark":case"space":break;case"comment":case"newline":this.prelude.push(e.source);break;case"error":{let t=e.source?`${e.message}: ${JSON.stringify(e.source)}`:e.message,r=new ar.YAMLParseError(lr(e),"UNEXPECTED_TOKEN",t);this.atDirectives||!this.doc?this.errors.push(r):this.doc.errors.push(r);break}case"doc-end":{if(!this.doc){let r="Unexpected doc-end without preceding document";this.errors.push(new ar.YAMLParseError(lr(e),"UNEXPECTED_TOKEN",r));break}this.doc.directives.docEnd=!0;let t=Ev.resolveEnd(e.end,e.offset+e.source.length,this.doc.options.strict,this.onError);if(this.decorate(this.doc,!0),t.comment){let r=this.doc.comment;this.doc.comment=r?`${r}
${t.comment}`:t.comment}this.doc.range[2]=t.offset;break}default:this.errors.push(new ar.YAMLParseError(lr(e),"UNEXPECTED_TOKEN",`Unsupported token ${e.type}`))}}*end(e=!1,t=-1){if(this.doc)this.decorate(this.doc,!0),yield this.doc,this.doc=null;else if(e){let r=Object.assign({_directives:this.directives},this.options),s=new gv.Document(void 0,r);this.atDirectives&&this.onError(t,"MISSING_CHAR","Missing directives-end indicator line"),s.range=[0,t,t],this.decorate(s,!1),yield s}}};Jm.Composer=bl});var Qm=p(pi=>{"use strict";var Tv=Sl(),Sv=wl(),Av=ir(),Xm=Vn();function wv(n,e=!0,t){if(n){let r=(s,i,o)=>{let a=typeof s=="number"?s:Array.isArray(s)?s[0]:s.offset;if(t)t(a,i,o);else throw new Av.YAMLParseError([a,a+1],i,o)};switch(n.type){case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return Sv.resolveFlowScalar(n,e,r);case"block-scalar":return Tv.resolveBlockScalar({options:{strict:e}},n,r)}}return null}function Lv(n,e){let{implicitKey:t=!1,indent:r,inFlow:s=!1,offset:i=-1,type:o="PLAIN"}=e,a=Xm.stringifyString({type:o,value:n},{implicitKey:t,indent:r>0?" ".repeat(r):"",inFlow:s,options:{blockQuote:!0,lineWidth:-1}}),l=e.end??[{type:"newline",offset:-1,indent:r,source:`
`}];switch(a[0]){case"|":case">":{let c=a.indexOf(`
`),u=a.substring(0,c),f=a.substring(c+1)+`
`,h=[{type:"block-scalar-header",offset:i,indent:r,source:u}];return zm(h,l)||h.push({type:"newline",offset:-1,indent:r,source:`
`}),{type:"block-scalar",offset:i,indent:r,props:h,source:f}}case'"':return{type:"double-quoted-scalar",offset:i,indent:r,source:a,end:l};case"'":return{type:"single-quoted-scalar",offset:i,indent:r,source:a,end:l};default:return{type:"scalar",offset:i,indent:r,source:a,end:l}}}function Iv(n,e,t={}){let{afterKey:r=!1,implicitKey:s=!1,inFlow:i=!1,type:o}=t,a="indent"in n?n.indent:null;if(r&&typeof a=="number"&&(a+=2),!o)switch(n.type){case"single-quoted-scalar":o="QUOTE_SINGLE";break;case"double-quoted-scalar":o="QUOTE_DOUBLE";break;case"block-scalar":{let c=n.props[0];if(c.type!=="block-scalar-header")throw new Error("Invalid block scalar header");o=c.source[0]===">"?"BLOCK_FOLDED":"BLOCK_LITERAL";break}default:o="PLAIN"}let l=Xm.stringifyString({type:o,value:e},{implicitKey:s||a===null,indent:a!==null&&a>0?" ".repeat(a):"",inFlow:i,options:{blockQuote:!0,lineWidth:-1}});switch(l[0]){case"|":case">":bv(n,l);break;case'"':Nl(n,l,"double-quoted-scalar");break;case"'":Nl(n,l,"single-quoted-scalar");break;default:Nl(n,l,"scalar")}}function bv(n,e){let t=e.indexOf(`
`),r=e.substring(0,t),s=e.substring(t+1)+`
`;if(n.type==="block-scalar"){let i=n.props[0];if(i.type!=="block-scalar-header")throw new Error("Invalid block scalar header");i.source=r,n.source=s}else{let{offset:i}=n,o="indent"in n?n.indent:-1,a=[{type:"block-scalar-header",offset:i,indent:o,source:r}];zm(a,"end"in n?n.end:void 0)||a.push({type:"newline",offset:-1,indent:o,source:`
`});for(let l of Object.keys(n))l!=="type"&&l!=="offset"&&delete n[l];Object.assign(n,{type:"block-scalar",indent:o,props:a,source:s})}}function zm(n,e){if(e)for(let t of e)switch(t.type){case"space":case"comment":n.push(t);break;case"newline":return n.push(t),!0}return!1}function Nl(n,e,t){switch(n.type){case"scalar":case"double-quoted-scalar":case"single-quoted-scalar":n.type=t,n.source=e;break;case"block-scalar":{let r=n.props.slice(1),s=e.length;n.props[0].type==="block-scalar-header"&&(s-=n.props[0].source.length);for(let i of r)i.offset+=s;delete n.props,Object.assign(n,{type:t,source:e,end:r});break}case"block-map":case"block-seq":{let s={type:"newline",offset:n.offset+e.length,indent:n.indent,source:`
`};delete n.items,Object.assign(n,{type:t,source:e,end:[s]});break}default:{let r="indent"in n?n.indent:-1,s="end"in n&&Array.isArray(n.end)?n.end.filter(i=>i.type==="space"||i.type==="comment"||i.type==="newline"):[];for(let i of Object.keys(n))i!=="type"&&i!=="offset"&&delete n[i];Object.assign(n,{type:t,indent:r,source:e,end:s})}}}pi.createScalarToken=Lv;pi.resolveAsScalar=wv;pi.setScalarValue=Iv});var eg=p(Zm=>{"use strict";var vv=n=>"type"in n?mi(n):_i(n);function mi(n){switch(n.type){case"block-scalar":{let e="";for(let t of n.props)e+=mi(t);return e+n.source}case"block-map":case"block-seq":{let e="";for(let t of n.items)e+=_i(t);return e}case"flow-collection":{let e=n.start.source;for(let t of n.items)e+=_i(t);for(let t of n.end)e+=t.source;return e}case"document":{let e=_i(n);if(n.end)for(let t of n.end)e+=t.source;return e}default:{let e=n.source;if("end"in n&&n.end)for(let t of n.end)e+=t.source;return e}}}function _i({start:n,key:e,sep:t,value:r}){let s="";for(let i of n)s+=i.source;if(e&&(s+=mi(e)),t)for(let i of t)s+=i.source;return r&&(s+=mi(r)),s}Zm.stringify=vv});var sg=p(rg=>{"use strict";var Ol=Symbol("break visit"),Nv=Symbol("skip children"),tg=Symbol("remove item");function Ft(n,e){"type"in n&&n.type==="document"&&(n={start:n.start,value:n.value}),ng(Object.freeze([]),n,e)}Ft.BREAK=Ol;Ft.SKIP=Nv;Ft.REMOVE=tg;Ft.itemAtPath=(n,e)=>{let t=n;for(let[r,s]of e){let i=t?.[r];if(i&&"items"in i)t=i.items[s];else return}return t};Ft.parentCollection=(n,e)=>{let t=Ft.itemAtPath(n,e.slice(0,-1)),r=e[e.length-1][0],s=t?.[r];if(s&&"items"in s)return s;throw new Error("Parent collection not found")};function ng(n,e,t){let r=t(e,n);if(typeof r=="symbol")return r;for(let s of["key","value"]){let i=e[s];if(i&&"items"in i){for(let o=0;o<i.items.length;++o){let a=ng(Object.freeze(n.concat([[s,o]])),i.items[o],t);if(typeof a=="number")o=a-1;else{if(a===Ol)return Ol;a===tg&&(i.items.splice(o,1),o-=1)}}typeof r=="function"&&s==="key"&&(r=r(e,n))}}return typeof r=="function"?r(e,n):r}rg.visit=Ft});var gi=p(ke=>{"use strict";var Cl=Qm(),Ov=eg(),Cv=sg(),Rl="\uFEFF",Pl="",kl="",$l="",Rv=n=>!!n&&"items"in n,Pv=n=>!!n&&(n.type==="scalar"||n.type==="single-quoted-scalar"||n.type==="double-quoted-scalar"||n.type==="block-scalar");function kv(n){switch(n){case Rl:return"<BOM>";case Pl:return"<DOC>";case kl:return"<FLOW_END>";case $l:return"<SCALAR>";default:return JSON.stringify(n)}}function $v(n){switch(n){case Rl:return"byte-order-mark";case Pl:return"doc-mode";case kl:return"flow-error-end";case $l:return"scalar";case"---":return"doc-start";case"...":return"doc-end";case"":case`
`:case`\r
`:return"newline";case"-":return"seq-item-ind";case"?":return"explicit-key-ind";case":":return"map-value-ind";case"{":return"flow-map-start";case"}":return"flow-map-end";case"[":return"flow-seq-start";case"]":return"flow-seq-end";case",":return"comma"}switch(n[0]){case" ":case"	":return"space";case"#":return"comment";case"%":return"directive-line";case"*":return"alias";case"&":return"anchor";case"!":return"tag";case"'":return"single-quoted-scalar";case'"':return"double-quoted-scalar";case"|":case">":return"block-scalar-header"}return null}ke.createScalarToken=Cl.createScalarToken;ke.resolveAsScalar=Cl.resolveAsScalar;ke.setScalarValue=Cl.setScalarValue;ke.stringify=Ov.stringify;ke.visit=Cv.visit;ke.BOM=Rl;ke.DOCUMENT=Pl;ke.FLOW_END=kl;ke.SCALAR=$l;ke.isCollection=Rv;ke.isScalar=Pv;ke.prettyToken=kv;ke.tokenType=$v});var Ml=p(og=>{"use strict";var cr=gi();function Ge(n){switch(n){case void 0:case" ":case`
`:case"\r":case"	":return!0;default:return!1}}var ig=new Set("0123456789ABCDEFabcdef"),xv=new Set("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()"),yi=new Set(",[]{}"),qv=new Set(` ,[]{}
\r	`),xl=n=>!n||qv.has(n),ql=class{constructor(){this.atEnd=!1,this.blockScalarIndent=-1,this.blockScalarKeep=!1,this.buffer="",this.flowKey=!1,this.flowLevel=0,this.indentNext=0,this.indentValue=0,this.lineEndPos=null,this.next=null,this.pos=0}*lex(e,t=!1){if(e){if(typeof e!="string")throw TypeError("source is not a string");this.buffer=this.buffer?this.buffer+e:e,this.lineEndPos=null}this.atEnd=!t;let r=this.next??"stream";for(;r&&(t||this.hasChars(1));)r=yield*this.parseNext(r)}atLineEnd(){let e=this.pos,t=this.buffer[e];for(;t===" "||t==="	";)t=this.buffer[++e];return!t||t==="#"||t===`
`?!0:t==="\r"?this.buffer[e+1]===`
`:!1}charAt(e){return this.buffer[this.pos+e]}continueScalar(e){let t=this.buffer[e];if(this.indentNext>0){let r=0;for(;t===" ";)t=this.buffer[++r+e];if(t==="\r"){let s=this.buffer[r+e+1];if(s===`
`||!s&&!this.atEnd)return e+r+1}return t===`
`||r>=this.indentNext||!t&&!this.atEnd?e+r:-1}if(t==="-"||t==="."){let r=this.buffer.substr(e,3);if((r==="---"||r==="...")&&Ge(this.buffer[e+3]))return-1}return e}getLine(){let e=this.lineEndPos;return(typeof e!="number"||e!==-1&&e<this.pos)&&(e=this.buffer.indexOf(`
`,this.pos),this.lineEndPos=e),e===-1?this.atEnd?this.buffer.substring(this.pos):null:(this.buffer[e-1]==="\r"&&(e-=1),this.buffer.substring(this.pos,e))}hasChars(e){return this.pos+e<=this.buffer.length}setNext(e){return this.buffer=this.buffer.substring(this.pos),this.pos=0,this.lineEndPos=null,this.next=e,null}peek(e){return this.buffer.substr(this.pos,e)}*parseNext(e){switch(e){case"stream":return yield*this.parseStream();case"line-start":return yield*this.parseLineStart();case"block-start":return yield*this.parseBlockStart();case"doc":return yield*this.parseDocument();case"flow":return yield*this.parseFlowCollection();case"quoted-scalar":return yield*this.parseQuotedScalar();case"block-scalar":return yield*this.parseBlockScalar();case"plain-scalar":return yield*this.parsePlainScalar()}}*parseStream(){let e=this.getLine();if(e===null)return this.setNext("stream");if(e[0]===cr.BOM&&(yield*this.pushCount(1),e=e.substring(1)),e[0]==="%"){let t=e.length,r=e.indexOf("#");for(;r!==-1;){let i=e[r-1];if(i===" "||i==="	"){t=r-1;break}else r=e.indexOf("#",r+1)}for(;;){let i=e[t-1];if(i===" "||i==="	")t-=1;else break}let s=(yield*this.pushCount(t))+(yield*this.pushSpaces(!0));return yield*this.pushCount(e.length-s),this.pushNewline(),"stream"}if(this.atLineEnd()){let t=yield*this.pushSpaces(!0);return yield*this.pushCount(e.length-t),yield*this.pushNewline(),"stream"}return yield cr.DOCUMENT,yield*this.parseLineStart()}*parseLineStart(){let e=this.charAt(0);if(!e&&!this.atEnd)return this.setNext("line-start");if(e==="-"||e==="."){if(!this.atEnd&&!this.hasChars(4))return this.setNext("line-start");let t=this.peek(3);if((t==="---"||t==="...")&&Ge(this.charAt(3)))return yield*this.pushCount(3),this.indentValue=0,this.indentNext=0,t==="---"?"doc":"stream"}return this.indentValue=yield*this.pushSpaces(!1),this.indentNext>this.indentValue&&!Ge(this.charAt(1))&&(this.indentNext=this.indentValue),yield*this.parseBlockStart()}*parseBlockStart(){let[e,t]=this.peek(2);if(!t&&!this.atEnd)return this.setNext("block-start");if((e==="-"||e==="?"||e===":")&&Ge(t)){let r=(yield*this.pushCount(1))+(yield*this.pushSpaces(!0));return this.indentNext=this.indentValue+1,this.indentValue+=r,yield*this.parseBlockStart()}return"doc"}*parseDocument(){yield*this.pushSpaces(!0);let e=this.getLine();if(e===null)return this.setNext("doc");let t=yield*this.pushIndicators();switch(e[t]){case"#":yield*this.pushCount(e.length-t);case void 0:return yield*this.pushNewline(),yield*this.parseLineStart();case"{":case"[":return yield*this.pushCount(1),this.flowKey=!1,this.flowLevel=1,"flow";case"}":case"]":return yield*this.pushCount(1),"doc";case"*":return yield*this.pushUntil(xl),"doc";case'"':case"'":return yield*this.parseQuotedScalar();case"|":case">":return t+=yield*this.parseBlockScalarHeader(),t+=yield*this.pushSpaces(!0),yield*this.pushCount(e.length-t),yield*this.pushNewline(),yield*this.parseBlockScalar();default:return yield*this.parsePlainScalar()}}*parseFlowCollection(){let e,t,r=-1;do e=yield*this.pushNewline(),e>0?(t=yield*this.pushSpaces(!1),this.indentValue=r=t):t=0,t+=yield*this.pushSpaces(!0);while(e+t>0);let s=this.getLine();if(s===null)return this.setNext("flow");if((r!==-1&&r<this.indentNext&&s[0]!=="#"||r===0&&(s.startsWith("---")||s.startsWith("..."))&&Ge(s[3]))&&!(r===this.indentNext-1&&this.flowLevel===1&&(s[0]==="]"||s[0]==="}")))return this.flowLevel=0,yield cr.FLOW_END,yield*this.parseLineStart();let i=0;for(;s[i]===",";)i+=yield*this.pushCount(1),i+=yield*this.pushSpaces(!0),this.flowKey=!1;switch(i+=yield*this.pushIndicators(),s[i]){case void 0:return"flow";case"#":return yield*this.pushCount(s.length-i),"flow";case"{":case"[":return yield*this.pushCount(1),this.flowKey=!1,this.flowLevel+=1,"flow";case"}":case"]":return yield*this.pushCount(1),this.flowKey=!0,this.flowLevel-=1,this.flowLevel?"flow":"doc";case"*":return yield*this.pushUntil(xl),"flow";case'"':case"'":return this.flowKey=!0,yield*this.parseQuotedScalar();case":":{let o=this.charAt(1);if(this.flowKey||Ge(o)||o===",")return this.flowKey=!1,yield*this.pushCount(1),yield*this.pushSpaces(!0),"flow"}default:return this.flowKey=!1,yield*this.parsePlainScalar()}}*parseQuotedScalar(){let e=this.charAt(0),t=this.buffer.indexOf(e,this.pos+1);if(e==="'")for(;t!==-1&&this.buffer[t+1]==="'";)t=this.buffer.indexOf("'",t+2);else for(;t!==-1;){let i=0;for(;this.buffer[t-1-i]==="\\";)i+=1;if(i%2===0)break;t=this.buffer.indexOf('"',t+1)}let r=this.buffer.substring(0,t),s=r.indexOf(`
`,this.pos);if(s!==-1){for(;s!==-1;){let i=this.continueScalar(s+1);if(i===-1)break;s=r.indexOf(`
`,i)}s!==-1&&(t=s-(r[s-1]==="\r"?2:1))}if(t===-1){if(!this.atEnd)return this.setNext("quoted-scalar");t=this.buffer.length}return yield*this.pushToIndex(t+1,!1),this.flowLevel?"flow":"doc"}*parseBlockScalarHeader(){this.blockScalarIndent=-1,this.blockScalarKeep=!1;let e=this.pos;for(;;){let t=this.buffer[++e];if(t==="+")this.blockScalarKeep=!0;else if(t>"0"&&t<="9")this.blockScalarIndent=Number(t)-1;else if(t!=="-")break}return yield*this.pushUntil(t=>Ge(t)||t==="#")}*parseBlockScalar(){let e=this.pos-1,t=0,r;e:for(let i=this.pos;r=this.buffer[i];++i)switch(r){case" ":t+=1;break;case`
`:e=i,t=0;break;case"\r":{let o=this.buffer[i+1];if(!o&&!this.atEnd)return this.setNext("block-scalar");if(o===`
`)break}default:break e}if(!r&&!this.atEnd)return this.setNext("block-scalar");if(t>=this.indentNext){this.blockScalarIndent===-1?this.indentNext=t:this.indentNext=this.blockScalarIndent+(this.indentNext===0?1:this.indentNext);do{let i=this.continueScalar(e+1);if(i===-1)break;e=this.buffer.indexOf(`
`,i)}while(e!==-1);if(e===-1){if(!this.atEnd)return this.setNext("block-scalar");e=this.buffer.length}}let s=e+1;for(r=this.buffer[s];r===" ";)r=this.buffer[++s];if(r==="	"){for(;r==="	"||r===" "||r==="\r"||r===`
`;)r=this.buffer[++s];e=s-1}else if(!this.blockScalarKeep)do{let i=e-1,o=this.buffer[i];o==="\r"&&(o=this.buffer[--i]);let a=i;for(;o===" ";)o=this.buffer[--i];if(o===`
`&&i>=this.pos&&i+1+t>a)e=i;else break}while(!0);return yield cr.SCALAR,yield*this.pushToIndex(e+1,!0),yield*this.parseLineStart()}*parsePlainScalar(){let e=this.flowLevel>0,t=this.pos-1,r=this.pos-1,s;for(;s=this.buffer[++r];)if(s===":"){let i=this.buffer[r+1];if(Ge(i)||e&&yi.has(i))break;t=r}else if(Ge(s)){let i=this.buffer[r+1];if(s==="\r"&&(i===`
`?(r+=1,s=`
`,i=this.buffer[r+1]):t=r),i==="#"||e&&yi.has(i))break;if(s===`
`){let o=this.continueScalar(r+1);if(o===-1)break;r=Math.max(r,o-2)}}else{if(e&&yi.has(s))break;t=r}return!s&&!this.atEnd?this.setNext("plain-scalar"):(yield cr.SCALAR,yield*this.pushToIndex(t+1,!0),e?"flow":"doc")}*pushCount(e){return e>0?(yield this.buffer.substr(this.pos,e),this.pos+=e,e):0}*pushToIndex(e,t){let r=this.buffer.slice(this.pos,e);return r?(yield r,this.pos+=r.length,r.length):(t&&(yield""),0)}*pushIndicators(){switch(this.charAt(0)){case"!":return(yield*this.pushTag())+(yield*this.pushSpaces(!0))+(yield*this.pushIndicators());case"&":return(yield*this.pushUntil(xl))+(yield*this.pushSpaces(!0))+(yield*this.pushIndicators());case"-":case"?":case":":{let e=this.flowLevel>0,t=this.charAt(1);if(Ge(t)||e&&yi.has(t))return e?this.flowKey&&(this.flowKey=!1):this.indentNext=this.indentValue+1,(yield*this.pushCount(1))+(yield*this.pushSpaces(!0))+(yield*this.pushIndicators())}}return 0}*pushTag(){if(this.charAt(1)==="<"){let e=this.pos+2,t=this.buffer[e];for(;!Ge(t)&&t!==">";)t=this.buffer[++e];return yield*this.pushToIndex(t===">"?e+1:e,!1)}else{let e=this.pos+1,t=this.buffer[e];for(;t;)if(xv.has(t))t=this.buffer[++e];else if(t==="%"&&ig.has(this.buffer[e+1])&&ig.has(this.buffer[e+2]))t=this.buffer[e+=3];else break;return yield*this.pushToIndex(e,!1)}}*pushNewline(){let e=this.buffer[this.pos];return e===`
`?yield*this.pushCount(1):e==="\r"&&this.charAt(1)===`
`?yield*this.pushCount(2):0}*pushSpaces(e){let t=this.pos-1,r;do r=this.buffer[++t];while(r===" "||e&&r==="	");let s=t-this.pos;return s>0&&(yield this.buffer.substr(this.pos,s),this.pos=t),s}*pushUntil(e){let t=this.pos,r=this.buffer[t];for(;!e(r);)r=this.buffer[++t];return yield*this.pushToIndex(t,!1)}};og.Lexer=ql});var Dl=p(ag=>{"use strict";var Fl=class{constructor(){this.lineStarts=[],this.addNewLine=e=>this.lineStarts.push(e),this.linePos=e=>{let t=0,r=this.lineStarts.length;for(;t<r;){let i=t+r>>1;this.lineStarts[i]<e?t=i+1:r=i}if(this.lineStarts[t]===e)return{line:t+1,col:1};if(t===0)return{line:0,col:e};let s=this.lineStarts[t-1];return{line:t,col:e-s+1}}}};ag.LineCounter=Fl});var Bl=p(hg=>{"use strict";var Mv=G("process"),lg=gi(),Fv=Ml();function It(n,e){for(let t=0;t<n.length;++t)if(n[t].type===e)return!0;return!1}function cg(n){for(let e=0;e<n.length;++e)switch(n[e].type){case"space":case"comment":case"newline":break;default:return e}return-1}function fg(n){switch(n?.type){case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":case"flow-collection":return!0;default:return!1}}function Ei(n){switch(n.type){case"document":return n.start;case"block-map":{let e=n.items[n.items.length-1];return e.sep??e.start}case"block-seq":return n.items[n.items.length-1].start;default:return[]}}function cn(n){if(n.length===0)return[];let e=n.length;e:for(;--e>=0;)switch(n[e].type){case"doc-start":case"explicit-key-ind":case"map-value-ind":case"seq-item-ind":case"newline":break e}for(;n[++e]?.type==="space";);return n.splice(e,n.length)}function ug(n){if(n.start.type==="flow-seq-start")for(let e of n.items)e.sep&&!e.value&&!It(e.start,"explicit-key-ind")&&!It(e.sep,"map-value-ind")&&(e.key&&(e.value=e.key),delete e.key,fg(e.value)?e.value.end?Array.prototype.push.apply(e.value.end,e.sep):e.value.end=e.sep:Array.prototype.push.apply(e.start,e.sep),delete e.sep)}var jl=class{constructor(e){this.atNewLine=!0,this.atScalar=!1,this.indent=0,this.offset=0,this.onKeyLine=!1,this.stack=[],this.source="",this.type="",this.lexer=new Fv.Lexer,this.onNewLine=e}*parse(e,t=!1){this.onNewLine&&this.offset===0&&this.onNewLine(0);for(let r of this.lexer.lex(e,t))yield*this.next(r);t||(yield*this.end())}*next(e){if(this.source=e,Mv.env.LOG_TOKENS&&console.log("|",lg.prettyToken(e)),this.atScalar){this.atScalar=!1,yield*this.step(),this.offset+=e.length;return}let t=lg.tokenType(e);if(t)if(t==="scalar")this.atNewLine=!1,this.atScalar=!0,this.type="scalar";else{switch(this.type=t,yield*this.step(),t){case"newline":this.atNewLine=!0,this.indent=0,this.onNewLine&&this.onNewLine(this.offset+e.length);break;case"space":this.atNewLine&&e[0]===" "&&(this.indent+=e.length);break;case"explicit-key-ind":case"map-value-ind":case"seq-item-ind":this.atNewLine&&(this.indent+=e.length);break;case"doc-mode":case"flow-error-end":return;default:this.atNewLine=!1}this.offset+=e.length}else{let r=`Not a YAML token: ${e}`;yield*this.pop({type:"error",offset:this.offset,message:r,source:e}),this.offset+=e.length}}*end(){for(;this.stack.length>0;)yield*this.pop()}get sourceToken(){return{type:this.type,offset:this.offset,indent:this.indent,source:this.source}}*step(){let e=this.peek(1);if(this.type==="doc-end"&&e?.type!=="doc-end"){for(;this.stack.length>0;)yield*this.pop();this.stack.push({type:"doc-end",offset:this.offset,source:this.source});return}if(!e)return yield*this.stream();switch(e.type){case"document":return yield*this.document(e);case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return yield*this.scalar(e);case"block-scalar":return yield*this.blockScalar(e);case"block-map":return yield*this.blockMap(e);case"block-seq":return yield*this.blockSequence(e);case"flow-collection":return yield*this.flowCollection(e);case"doc-end":return yield*this.documentEnd(e)}yield*this.pop()}peek(e){return this.stack[this.stack.length-e]}*pop(e){let t=e??this.stack.pop();if(!t)yield{type:"error",offset:this.offset,source:"",message:"Tried to pop an empty stack"};else if(this.stack.length===0)yield t;else{let r=this.peek(1);switch(t.type==="block-scalar"?t.indent="indent"in r?r.indent:0:t.type==="flow-collection"&&r.type==="document"&&(t.indent=0),t.type==="flow-collection"&&ug(t),r.type){case"document":r.value=t;break;case"block-scalar":r.props.push(t);break;case"block-map":{let s=r.items[r.items.length-1];if(s.value){r.items.push({start:[],key:t,sep:[]}),this.onKeyLine=!0;return}else if(s.sep)s.value=t;else{Object.assign(s,{key:t,sep:[]}),this.onKeyLine=!s.explicitKey;return}break}case"block-seq":{let s=r.items[r.items.length-1];s.value?r.items.push({start:[],value:t}):s.value=t;break}case"flow-collection":{let s=r.items[r.items.length-1];!s||s.value?r.items.push({start:[],key:t,sep:[]}):s.sep?s.value=t:Object.assign(s,{key:t,sep:[]});return}default:yield*this.pop(),yield*this.pop(t)}if((r.type==="document"||r.type==="block-map"||r.type==="block-seq")&&(t.type==="block-map"||t.type==="block-seq")){let s=t.items[t.items.length-1];s&&!s.sep&&!s.value&&s.start.length>0&&cg(s.start)===-1&&(t.indent===0||s.start.every(i=>i.type!=="comment"||i.indent<t.indent))&&(r.type==="document"?r.end=s.start:r.items.push({start:s.start}),t.items.splice(-1,1))}}}*stream(){switch(this.type){case"directive-line":yield{type:"directive",offset:this.offset,source:this.source};return;case"byte-order-mark":case"space":case"comment":case"newline":yield this.sourceToken;return;case"doc-mode":case"doc-start":{let e={type:"document",offset:this.offset,start:[]};this.type==="doc-start"&&e.start.push(this.sourceToken),this.stack.push(e);return}}yield{type:"error",offset:this.offset,message:`Unexpected ${this.type} token in YAML stream`,source:this.source}}*document(e){if(e.value)return yield*this.lineEnd(e);switch(this.type){case"doc-start":{cg(e.start)!==-1?(yield*this.pop(),yield*this.step()):e.start.push(this.sourceToken);return}case"anchor":case"tag":case"space":case"comment":case"newline":e.start.push(this.sourceToken);return}let t=this.startBlockValue(e);t?this.stack.push(t):yield{type:"error",offset:this.offset,message:`Unexpected ${this.type} token in YAML document`,source:this.source}}*scalar(e){if(this.type==="map-value-ind"){let t=Ei(this.peek(2)),r=cn(t),s;e.end?(s=e.end,s.push(this.sourceToken),delete e.end):s=[this.sourceToken];let i={type:"block-map",offset:e.offset,indent:e.indent,items:[{start:r,key:e,sep:s}]};this.onKeyLine=!0,this.stack[this.stack.length-1]=i}else yield*this.lineEnd(e)}*blockScalar(e){switch(this.type){case"space":case"comment":case"newline":e.props.push(this.sourceToken);return;case"scalar":if(e.source=this.source,this.atNewLine=!0,this.indent=0,this.onNewLine){let t=this.source.indexOf(`
`)+1;for(;t!==0;)this.onNewLine(this.offset+t),t=this.source.indexOf(`
`,t)+1}yield*this.pop();break;default:yield*this.pop(),yield*this.step()}}*blockMap(e){let t=e.items[e.items.length-1];switch(this.type){case"newline":if(this.onKeyLine=!1,t.value){let r="end"in t.value?t.value.end:void 0;(Array.isArray(r)?r[r.length-1]:void 0)?.type==="comment"?r?.push(this.sourceToken):e.items.push({start:[this.sourceToken]})}else t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"space":case"comment":if(t.value)e.items.push({start:[this.sourceToken]});else if(t.sep)t.sep.push(this.sourceToken);else{if(this.atIndentedComment(t.start,e.indent)){let s=e.items[e.items.length-2]?.value?.end;if(Array.isArray(s)){Array.prototype.push.apply(s,t.start),s.push(this.sourceToken),e.items.pop();return}}t.start.push(this.sourceToken)}return}if(this.indent>=e.indent){let r=!this.onKeyLine&&this.indent===e.indent,s=r&&(t.sep||t.explicitKey)&&this.type!=="seq-item-ind",i=[];if(s&&t.sep&&!t.value){let o=[];for(let a=0;a<t.sep.length;++a){let l=t.sep[a];switch(l.type){case"newline":o.push(a);break;case"space":break;case"comment":l.indent>e.indent&&(o.length=0);break;default:o.length=0}}o.length>=2&&(i=t.sep.splice(o[1]))}switch(this.type){case"anchor":case"tag":s||t.value?(i.push(this.sourceToken),e.items.push({start:i}),this.onKeyLine=!0):t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"explicit-key-ind":!t.sep&&!t.explicitKey?(t.start.push(this.sourceToken),t.explicitKey=!0):s||t.value?(i.push(this.sourceToken),e.items.push({start:i,explicitKey:!0})):this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:[this.sourceToken],explicitKey:!0}]}),this.onKeyLine=!0;return;case"map-value-ind":if(t.explicitKey)if(t.sep)if(t.value)e.items.push({start:[],key:null,sep:[this.sourceToken]});else if(It(t.sep,"map-value-ind"))this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:i,key:null,sep:[this.sourceToken]}]});else if(fg(t.key)&&!It(t.sep,"newline")){let o=cn(t.start),a=t.key,l=t.sep;l.push(this.sourceToken),delete t.key,delete t.sep,this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:o,key:a,sep:l}]})}else i.length>0?t.sep=t.sep.concat(i,this.sourceToken):t.sep.push(this.sourceToken);else if(It(t.start,"newline"))Object.assign(t,{key:null,sep:[this.sourceToken]});else{let o=cn(t.start);this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:o,key:null,sep:[this.sourceToken]}]})}else t.sep?t.value||s?e.items.push({start:i,key:null,sep:[this.sourceToken]}):It(t.sep,"map-value-ind")?this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:[],key:null,sep:[this.sourceToken]}]}):t.sep.push(this.sourceToken):Object.assign(t,{key:null,sep:[this.sourceToken]});this.onKeyLine=!0;return;case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":{let o=this.flowScalar(this.type);s||t.value?(e.items.push({start:i,key:o,sep:[]}),this.onKeyLine=!0):t.sep?this.stack.push(o):(Object.assign(t,{key:o,sep:[]}),this.onKeyLine=!0);return}default:{let o=this.startBlockValue(e);if(o){if(o.type==="block-seq"){if(!t.explicitKey&&t.sep&&!It(t.sep,"newline")){yield*this.pop({type:"error",offset:this.offset,message:"Unexpected block-seq-ind on same line with key",source:this.source});return}}else r&&e.items.push({start:i});this.stack.push(o);return}}}}yield*this.pop(),yield*this.step()}*blockSequence(e){let t=e.items[e.items.length-1];switch(this.type){case"newline":if(t.value){let r="end"in t.value?t.value.end:void 0;(Array.isArray(r)?r[r.length-1]:void 0)?.type==="comment"?r?.push(this.sourceToken):e.items.push({start:[this.sourceToken]})}else t.start.push(this.sourceToken);return;case"space":case"comment":if(t.value)e.items.push({start:[this.sourceToken]});else{if(this.atIndentedComment(t.start,e.indent)){let s=e.items[e.items.length-2]?.value?.end;if(Array.isArray(s)){Array.prototype.push.apply(s,t.start),s.push(this.sourceToken),e.items.pop();return}}t.start.push(this.sourceToken)}return;case"anchor":case"tag":if(t.value||this.indent<=e.indent)break;t.start.push(this.sourceToken);return;case"seq-item-ind":if(this.indent!==e.indent)break;t.value||It(t.start,"seq-item-ind")?e.items.push({start:[this.sourceToken]}):t.start.push(this.sourceToken);return}if(this.indent>e.indent){let r=this.startBlockValue(e);if(r){this.stack.push(r);return}}yield*this.pop(),yield*this.step()}*flowCollection(e){let t=e.items[e.items.length-1];if(this.type==="flow-error-end"){let r;do yield*this.pop(),r=this.peek(1);while(r?.type==="flow-collection")}else if(e.end.length===0){switch(this.type){case"comma":case"explicit-key-ind":!t||t.sep?e.items.push({start:[this.sourceToken]}):t.start.push(this.sourceToken);return;case"map-value-ind":!t||t.value?e.items.push({start:[],key:null,sep:[this.sourceToken]}):t.sep?t.sep.push(this.sourceToken):Object.assign(t,{key:null,sep:[this.sourceToken]});return;case"space":case"comment":case"newline":case"anchor":case"tag":!t||t.value?e.items.push({start:[this.sourceToken]}):t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":{let s=this.flowScalar(this.type);!t||t.value?e.items.push({start:[],key:s,sep:[]}):t.sep?this.stack.push(s):Object.assign(t,{key:s,sep:[]});return}case"flow-map-end":case"flow-seq-end":e.end.push(this.sourceToken);return}let r=this.startBlockValue(e);r?this.stack.push(r):(yield*this.pop(),yield*this.step())}else{let r=this.peek(2);if(r.type==="block-map"&&(this.type==="map-value-ind"&&r.indent===e.indent||this.type==="newline"&&!r.items[r.items.length-1].sep))yield*this.pop(),yield*this.step();else if(this.type==="map-value-ind"&&r.type!=="flow-collection"){let s=Ei(r),i=cn(s);ug(e);let o=e.end.splice(1,e.end.length);o.push(this.sourceToken);let a={type:"block-map",offset:e.offset,indent:e.indent,items:[{start:i,key:e,sep:o}]};this.onKeyLine=!0,this.stack[this.stack.length-1]=a}else yield*this.lineEnd(e)}}flowScalar(e){if(this.onNewLine){let t=this.source.indexOf(`
`)+1;for(;t!==0;)this.onNewLine(this.offset+t),t=this.source.indexOf(`
`,t)+1}return{type:e,offset:this.offset,indent:this.indent,source:this.source}}startBlockValue(e){switch(this.type){case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return this.flowScalar(this.type);case"block-scalar-header":return{type:"block-scalar",offset:this.offset,indent:this.indent,props:[this.sourceToken],source:""};case"flow-map-start":case"flow-seq-start":return{type:"flow-collection",offset:this.offset,indent:this.indent,start:this.sourceToken,items:[],end:[]};case"seq-item-ind":return{type:"block-seq",offset:this.offset,indent:this.indent,items:[{start:[this.sourceToken]}]};case"explicit-key-ind":{this.onKeyLine=!0;let t=Ei(e),r=cn(t);return r.push(this.sourceToken),{type:"block-map",offset:this.offset,indent:this.indent,items:[{start:r,explicitKey:!0}]}}case"map-value-ind":{this.onKeyLine=!0;let t=Ei(e),r=cn(t);return{type:"block-map",offset:this.offset,indent:this.indent,items:[{start:r,key:null,sep:[this.sourceToken]}]}}}return null}atIndentedComment(e,t){return this.type!=="comment"||this.indent<=t?!1:e.every(r=>r.type==="newline"||r.type==="space")}*documentEnd(e){this.type!=="doc-mode"&&(e.end?e.end.push(this.sourceToken):e.end=[this.sourceToken],this.type==="newline"&&(yield*this.pop()))}*lineEnd(e){switch(this.type){case"comma":case"doc-start":case"doc-end":case"flow-seq-end":case"flow-map-end":case"map-value-ind":yield*this.pop(),yield*this.step();break;case"newline":this.onKeyLine=!1;case"space":case"comment":default:e.end?e.end.push(this.sourceToken):e.end=[this.sourceToken],this.type==="newline"&&(yield*this.pop())}}};hg.Parser=jl});var gg=p(fr=>{"use strict";var dg=vl(),Dv=nr(),ur=ir(),jv=Ia(),Bv=Y(),Uv=Dl(),pg=Bl();function _g(n){let e=n.prettyErrors!==!1;return{lineCounter:n.lineCounter||e&&new Uv.LineCounter||null,prettyErrors:e}}function Hv(n,e={}){let{lineCounter:t,prettyErrors:r}=_g(e),s=new pg.Parser(t?.addNewLine),i=new dg.Composer(e),o=Array.from(i.compose(s.parse(n)));if(r&&t)for(let a of o)a.errors.forEach(ur.prettifyError(n,t)),a.warnings.forEach(ur.prettifyError(n,t));return o.length>0?o:Object.assign([],{empty:!0},i.streamInfo())}function mg(n,e={}){let{lineCounter:t,prettyErrors:r}=_g(e),s=new pg.Parser(t?.addNewLine),i=new dg.Composer(e),o=null;for(let a of i.compose(s.parse(n),!0,n.length))if(!o)o=a;else if(o.options.logLevel!=="silent"){o.errors.push(new ur.YAMLParseError(a.range.slice(0,2),"MULTIPLE_DOCS","Source contains multiple documents; please use YAML.parseAllDocuments()"));break}return r&&t&&(o.errors.forEach(ur.prettifyError(n,t)),o.warnings.forEach(ur.prettifyError(n,t))),o}function Vv(n,e,t){let r;typeof e=="function"?r=e:t===void 0&&e&&typeof e=="object"&&(t=e);let s=mg(n,t);if(!s)return null;if(s.warnings.forEach(i=>jv.warn(s.options.logLevel,i)),s.errors.length>0){if(s.options.logLevel!=="silent")throw s.errors[0];s.errors=[]}return s.toJS(Object.assign({reviver:r},t))}function Wv(n,e,t){let r=null;if(typeof e=="function"||Array.isArray(e)?r=e:t===void 0&&e&&(t=e),typeof t=="string"&&(t=t.length),typeof t=="number"){let s=Math.round(t);t=s<1?void 0:s>8?{indent:8}:{indent:s}}if(n===void 0){let{keepUndefined:s}=t??e??{};if(!s)return}return Bv.isDocument(n)&&!r?n.toString(t):new Dv.Document(n,r,t).toString(t)}fr.parse=Vv;fr.parseAllDocuments=Hv;fr.parseDocument=mg;fr.stringify=Wv});var Eg=p(te=>{"use strict";var Gv=vl(),Kv=nr(),Yv=al(),Ul=ir(),Jv=Dn(),bt=Y(),Xv=St(),zv=ce(),Qv=wt(),Zv=Lt(),e2=gi(),t2=Ml(),n2=Dl(),r2=Bl(),Ti=gg(),yg=xn();te.Composer=Gv.Composer;te.Document=Kv.Document;te.Schema=Yv.Schema;te.YAMLError=Ul.YAMLError;te.YAMLParseError=Ul.YAMLParseError;te.YAMLWarning=Ul.YAMLWarning;te.Alias=Jv.Alias;te.isAlias=bt.isAlias;te.isCollection=bt.isCollection;te.isDocument=bt.isDocument;te.isMap=bt.isMap;te.isNode=bt.isNode;te.isPair=bt.isPair;te.isScalar=bt.isScalar;te.isSeq=bt.isSeq;te.Pair=Xv.Pair;te.Scalar=zv.Scalar;te.YAMLMap=Qv.YAMLMap;te.YAMLSeq=Zv.YAMLSeq;te.CST=e2;te.Lexer=t2.Lexer;te.LineCounter=n2.LineCounter;te.Parser=r2.Parser;te.parse=Ti.parse;te.parseAllDocuments=Ti.parseAllDocuments;te.parseDocument=Ti.parseDocument;te.stringify=Ti.stringify;te.visit=yg.visit;te.visitAsync=yg.visitAsync});var ac=Ae(oc(),1),{program:T2,createCommand:S2,createArgument:A2,createOption:w2,CommanderError:L2,InvalidArgumentError:I2,InvalidOptionArgumentError:b2,Command:lc,Argument:v2,Option:N2,Help:O2}=ac.default;import*as at from"fs";import*as Dt from"path";var Gg={FULL_WIDTH:0,FITTING:1,SMUSHING:2,CONTROLLED_SMUSHING:3},qi=class{constructor(){this.comment="",this.numChars=0,this.options={}}},xi=["1Row","3-D","3D Diagonal","3D-ASCII","3x5","4Max","5 Line Oblique","AMC 3 Line","AMC 3 Liv1","AMC AAA01","AMC Neko","AMC Razor","AMC Razor2","AMC Slash","AMC Slider","AMC Thin","AMC Tubes","AMC Untitled","ANSI Compact","ANSI Regular","ANSI Shadow","ASCII 12","ASCII 9","ASCII New Roman","Acrobatic","Alligator","Alligator2","Alpha","Alphabet","Arrows","Avatar","B1FF","Babyface Lame","Babyface Leet","Banner","Banner3-D","Banner3","Banner4","Barbwire","Basic","Bear","Bell","Benjamin","Big ASCII 12","Big ASCII 9","Big Chief","Big Money-ne","Big Money-nw","Big Money-se","Big Money-sw","Big Mono 12","Big Mono 9","Big","Bigfig","Binary","Block","Blocks","Bloody","BlurVision ASCII","Bolger","Braced","Bright","Broadway KB","Broadway","Bubble","Bulbhead","Caligraphy","Caligraphy2","Calvin S","Cards","Catwalk","Chiseled","Chunky","Circle","Classy","Coder Mini","Coinstak","Cola","Colossal","Computer","Contessa","Contrast","Cosmike","Cosmike2","Crawford","Crawford2","Crazy","Cricket","Cursive","Cyberlarge","Cybermedium","Cybersmall","Cygnet","DANC4","DOS Rebel","DWhistled","Dancing Font","Decimal","Def Leppard","Delta Corps Priest 1","DiamFont","Diamond","Diet Cola","Digital","Doh","Doom","Dot Matrix","Double Shorts","Double","Dr Pepper","Efti Chess","Efti Font","Efti Italic","Efti Piti","Efti Robot","Efti Wall","Efti Water","Electronic","Elite","Emboss 2","Emboss","Epic","Fender","Filter","Fire Font-k","Fire Font-s","Flipped","Flower Power","Font Font","Four Tops","Fraktur","Fun Face","Fun Faces","Future","Fuzzy","Georgi16","Georgia11","Ghost","Ghoulish","Glenyn","Goofy","Gothic","Graceful","Gradient","Graffiti","Greek","Heart Left","Heart Right","Henry 3D","Hex","Hieroglyphs","Hollywood","Horizontal Left","Horizontal Right","ICL-1900","Impossible","Invita","Isometric1","Isometric2","Isometric3","Isometric4","Italic","Ivrit","JS Block Letters","JS Bracket Letters","JS Capital Curves","JS Cursive","JS Stick Letters","Jacky","Jazmine","Jerusalem","Katakana","Kban","Keyboard","Knob","Konto Slant","Konto","LCD","Larry 3D 2","Larry 3D","Lean","Letter","Letters","Lil Devil","Line Blocks","Linux","Lockergnome","Madrid","Marquee","Maxfour","Merlin1","Merlin2","Mike","Mini","Mirror","Mnemonic","Modular","Mono 12","Mono 9","Morse","Morse2","Moscow","Mshebrew210","Muzzle","NScript","NT Greek","NV Script","Nancyj-Fancy","Nancyj-Improved","Nancyj-Underlined","Nancyj","Nipples","O8","OS2","Octal","Ogre","Old Banner","Pagga","Patorjk's Cheese","Patorjk-HeX","Pawp","Peaks Slant","Peaks","Pebbles","Pepper","Poison","Puffy","Puzzle","Pyramid","Rammstein","Rebel","Rectangles","Red Phoenix","Relief","Relief2","Reverse","Roman","Rot13","Rotated","Rounded","Rowan Cap","Rozzo","RubiFont","Runic","Runyc","S Blood","SL Script","Santa Clara","Script","Serifcap","Shaded Blocky","Shadow","Shimrod","Short","Slant Relief","Slant","Slide","Small ASCII 12","Small ASCII 9","Small Block","Small Braille","Small Caps","Small Isometric1","Small Keyboard","Small Mono 12","Small Mono 9","Small Poison","Small Script","Small Shadow","Small Slant","Small Tengwar","Small","Soft","Speed","Spliff","Stacey","Stampate","Stampatello","Standard","Star Strips","Star Wars","Stellar","Stforek","Stick Letters","Stop","Straight","Stronger Than All","Sub-Zero","Swamp Land","Swan","Sweet","THIS","Tanja","Tengwar","Term","Terrace","Test1","The Edge","Thick","Thin","Thorned","Three Point","Ticks Slant","Ticks","Tiles","Tinker-Toy","Tmplr","Tombstone","Train","Trek","Tsalagi","Tubular","Twisted","Two Point","USA Flag","Univers","Upside Down Text","Varsity","Wavescape","Wavy","Weird","Wet Letter","Whimsy","WideTerm","Wow","miniwi"],cc={"ANSI-Compact":"ANSI Compact"},ot=n=>cc[n]?cc[n]:n;function Kg(n){return/[.*+?^${}()|[\]\\]/.test(n)?"\\"+n:n}var uc=(()=>{let{FULL_WIDTH:n=0,FITTING:e,SMUSHING:t,CONTROLLED_SMUSHING:r}=Gg,s={},i={font:"Standard",fontPath:"./fonts",fetchFontIfMissing:!0};function o(T,A,g){let E=Kg(T.trim().slice(-1))||"@",L=A===g-1?new RegExp(E+E+"?\\s*$"):new RegExp(E+"\\s*$");return T.replace(L,"")}function a(T=-1,A=null){let g={},E,L=[[16384,"vLayout",t],[8192,"vLayout",e],[4096,"vRule5",!0],[2048,"vRule4",!0],[1024,"vRule3",!0],[512,"vRule2",!0],[256,"vRule1",!0],[128,"hLayout",t],[64,"hLayout",e],[32,"hRule6",!0],[16,"hRule5",!0],[8,"hRule4",!0],[4,"hRule3",!0],[2,"hRule2",!0],[1,"hRule1",!0]];E=A!==null?A:T;for(let[b,v,N]of L)E>=b?(E-=b,g[v]===void 0&&(g[v]=N)):v!=="vLayout"&&v!=="hLayout"&&(g[v]=!1);return typeof g.hLayout>"u"?T===0?g.hLayout=e:T===-1?g.hLayout=n:g.hRule1||g.hRule2||g.hRule3||g.hRule4||g.hRule5||g.hRule6?g.hLayout=r:g.hLayout=t:g.hLayout===t&&(g.hRule1||g.hRule2||g.hRule3||g.hRule4||g.hRule5||g.hRule6)&&(g.hLayout=r),typeof g.vLayout>"u"?g.vRule1||g.vRule2||g.vRule3||g.vRule4||g.vRule5?g.vLayout=r:g.vLayout=n:g.vLayout===t&&(g.vRule1||g.vRule2||g.vRule3||g.vRule4||g.vRule5)&&(g.vLayout=r),g}function l(T,A,g=""){return T===A&&T!==g?T:!1}function c(T,A){let g="|/\\[]{}()<>";if(T==="_"){if(g.indexOf(A)!==-1)return A}else if(A==="_"&&g.indexOf(T)!==-1)return T;return!1}function u(T,A){let g="| /\\ [] {} () <>",E=g.indexOf(T),L=g.indexOf(A);if(E!==-1&&L!==-1&&E!==L&&Math.abs(E-L)!==1){let b=Math.max(E,L),v=b+1;return g.substring(b,v)}return!1}function f(T,A){let g="[] {} ()",E=g.indexOf(T),L=g.indexOf(A);return E!==-1&&L!==-1&&Math.abs(E-L)<=1?"|":!1}function h(T,A){return{"/\\":"|","\\/":"Y","><":"X"}[T+A]||!1}function d(T,A,g=""){return T===g&&A===g?g:!1}function y(T,A){return T===A?T:!1}function m(T,A){return c(T,A)}function _(T,A){return u(T,A)}function S(T,A){return T==="-"&&A==="_"||T==="_"&&A==="-"?"=":!1}function w(T,A){return T==="|"&&A==="|"?"|":!1}function I(T,A,g){return A===" "||A===""||A===g&&T!==" "?T:A}function x(T,A,g){if(g.fittingRules&&g.fittingRules.vLayout===n)return"invalid";let E,L=Math.min(T.length,A.length),b,v,N=!1,O;if(L===0)return"invalid";for(E=0;E<L;E++)if(b=T.substring(E,E+1),v=A.substring(E,E+1),b!==" "&&v!==" "){if(g.fittingRules&&g.fittingRules.vLayout===e)return"invalid";if(g.fittingRules&&g.fittingRules.vLayout===t)return"end";if(w(b,v)){N=N||!1;continue}if(O=!1,O=g.fittingRules&&g.fittingRules.vRule1?y(b,v):O,O=!O&&g.fittingRules&&g.fittingRules.vRule2?m(b,v):O,O=!O&&g.fittingRules&&g.fittingRules.vRule3?_(b,v):O,O=!O&&g.fittingRules&&g.fittingRules.vRule4?S(b,v):O,N=!0,!O)return"invalid"}return N?"end":"valid"}function q(T,A,g){let E=T.length,L=T.length,b,v,N,O=1,F,V,U;for(;O<=E;){for(b=T.slice(Math.max(0,L-O),L),v=A.slice(0,Math.min(E,O)),N=v.length,U="",F=0;F<N;F++)if(V=x(b[F],v[F],g),V==="end")U=V;else if(V==="invalid"){U=V;break}else U===""&&(U="valid");if(U==="invalid"){O--;break}if(U==="end")break;U==="valid"&&O++}return Math.min(E,O)}function M(T,A,g){let E,L=Math.min(T.length,A.length),b,v,N="",O,F=g.fittingRules||{};for(E=0;E<L;E++)b=T.substring(E,E+1),v=A.substring(E,E+1),b!==" "&&v!==" "?F.vLayout===e||F.vLayout===t?N+=I(b,v):(O=!1,O=F.vRule5?w(b,v):O,O=!O&&F.vRule1?y(b,v):O,O=!O&&F.vRule2?m(b,v):O,O=!O&&F.vRule3?_(b,v):O,O=!O&&F.vRule4?S(b,v):O,N+=O):N+=I(b,v);return N}function J(T,A,g,E){let L=T.length,b=A.length,v=T.slice(0,Math.max(0,L-g)),N=T.slice(Math.max(0,L-g),L),O=A.slice(0,Math.min(g,b)),F,V,U,W=[],K;for(V=N.length,F=0;F<V;F++)F>=b?U=N[F]:U=M(N[F],O[F],E),W.push(U);return K=A.slice(Math.min(g,b),b),[...v,...W,...K]}function R(T,A){let g=" ".repeat(A);return T.map(E=>E+g)}function C(T,A,g){let E=T[0].length,L=A[0].length,b;return E>L?A=R(A,E-L):L>E&&(T=R(T,L-E)),b=q(T,A,g),J(T,A,b,g)}function B(T,A,g){let E=g.fittingRules||{};if(E.hLayout===n)return 0;let L,b=T.length,v=A.length,N=b,O=1,F=!1,V,U,W,K;if(b===0)return 0;e:for(;O<=N;){let je=b-O;for(V=T.substring(je,je+O),U=A.substring(0,Math.min(O,v)),L=0;L<Math.min(O,v);L++)if(W=V.substring(L,L+1),K=U.substring(L,L+1),W!==" "&&K!==" "){if(E.hLayout===e){O=O-1;break e}else if(E.hLayout===t){(W===g.hardBlank||K===g.hardBlank)&&(O=O-1);break e}else if(F=!0,!(E.hRule1&&l(W,K,g.hardBlank)||E.hRule2&&c(W,K)||E.hRule3&&u(W,K)||E.hRule4&&f(W,K)||E.hRule5&&h(W,K)||E.hRule6&&d(W,K,g.hardBlank))){O=O-1;break e}}if(F)break;O++}return Math.min(N,O)}function j(T,A,g,E){let L,b,v=[],N,O,F,V,U,W,K,je,Oe=E.fittingRules||{};if(typeof E.height!="number")throw new Error("height is not defined.");for(L=0;L<E.height;L++){K=T[L],je=A[L],U=K.length,W=je.length,N=U-g,O=K.slice(0,Math.max(0,N)),F="";let fn=Math.max(0,U-g),Be=K.substring(fn,fn+g),vt=je.substring(0,Math.min(g,W));for(b=0;b<g;b++){let xe=b<U?Be.substring(b,b+1):" ",Ce=b<W?vt.substring(b,b+1):" ";if(xe!==" "&&Ce!==" ")if(Oe.hLayout===e||Oe.hLayout===t)F+=I(xe,Ce,E.hardBlank);else{let Ag=Oe.hRule1&&l(xe,Ce,E.hardBlank)||Oe.hRule2&&c(xe,Ce)||Oe.hRule3&&u(xe,Ce)||Oe.hRule4&&f(xe,Ce)||Oe.hRule5&&h(xe,Ce)||Oe.hRule6&&d(xe,Ce,E.hardBlank)||I(xe,Ce,E.hardBlank);F+=Ag}else F+=I(xe,Ce,E.hardBlank)}g>=W?V="":V=je.substring(g,g+Math.max(0,W-g)),v[L]=O+F+V}return v}function D(T){return new Array(T).fill("")}let z=function(T){return Math.max(...T.map(A=>A.length))};function ne(T,A,g){return T.reduce(function(E,L){return j(E,L.fig,L.overlap||0,g)},D(A))}function Q(T,A,g){for(let E=T.length-1;E>0;E--){let L=ne(T.slice(0,E),A,g);if(z(L)<=g.width)return{outputFigText:L,chars:T.slice(E)}}return{outputFigText:D(A),chars:T}}function X(T,A,g){let E,L,b=0,v,N,O,F=g.height,V=[],U,W={chars:[],overlap:b},K=[],je,Oe,fn,Be,vt;if(typeof F!="number")throw new Error("height is not defined.");N=D(F);let xe=g.fittingRules||{};for(g.printDirection===1&&(T=T.split("").reverse().join("")),O=T.length,E=0;E<O;E++)if(je=T.substring(E,E+1),Oe=je.match(/\s/),L=A[je.charCodeAt(0)],Be=null,L){if(xe.hLayout!==n){for(b=1e4,v=0;v<F;v++)b=Math.min(b,B(N[v],L[v],g));b=b===1e4?0:b}if(g.width>0&&(g.whitespaceBreak?(fn=ne(W.chars.concat([{fig:L,overlap:b}]),F,g),Be=ne(K.concat([{fig:fn,overlap:W.overlap}]),F,g),U=z(Be)):(Be=j(N,L,b,g),U=z(Be)),U>=g.width&&E>0&&(g.whitespaceBreak?(N=ne(K.slice(0,-1),F,g),K.length>1&&(V.push(N),N=D(F)),K=[]):(V.push(N),N=D(F)))),g.width>0&&g.whitespaceBreak&&((!Oe||E===O-1)&&W.chars.push({fig:L,overlap:b}),Oe||E===O-1)){for(vt=null;Be=ne(W.chars,F,g),U=z(Be),U>=g.width;)vt=Q(W.chars,F,g),W={chars:vt.chars},V.push(vt.outputFigText);U>0&&(vt?K.push({fig:Be,overlap:1}):K.push({fig:Be,overlap:W.overlap})),Oe&&(K.push({fig:L,overlap:b}),N=D(F)),E===O-1&&(N=ne(K,F,g)),W={chars:[],overlap:b};continue}N=j(N,L,b,g)}return z(N)>0&&V.push(N),g.showHardBlanks||V.forEach(function(Ce){for(O=Ce.length,v=0;v<O;v++)Ce[v]=Ce[v].replace(new RegExp("\\"+g.hardBlank,"g")," ")}),T===""&&V.length===0&&V.push(new Array(F).fill("")),V}let Z=function(T,A){let g,E=A.fittingRules||{};if(T==="default")g={hLayout:E.hLayout,hRule1:E.hRule1,hRule2:E.hRule2,hRule3:E.hRule3,hRule4:E.hRule4,hRule5:E.hRule5,hRule6:E.hRule6};else if(T==="full")g={hLayout:n,hRule1:!1,hRule2:!1,hRule3:!1,hRule4:!1,hRule5:!1,hRule6:!1};else if(T==="fitted")g={hLayout:e,hRule1:!1,hRule2:!1,hRule3:!1,hRule4:!1,hRule5:!1,hRule6:!1};else if(T==="controlled smushing")g={hLayout:r,hRule1:!0,hRule2:!0,hRule3:!0,hRule4:!0,hRule5:!0,hRule6:!0};else if(T==="universal smushing")g={hLayout:t,hRule1:!1,hRule2:!1,hRule3:!1,hRule4:!1,hRule5:!1,hRule6:!1};else return;return g},ue=function(T,A){let g={},E=A.fittingRules||{};if(T==="default")g={vLayout:E.vLayout,vRule1:E.vRule1,vRule2:E.vRule2,vRule3:E.vRule3,vRule4:E.vRule4,vRule5:E.vRule5};else if(T==="full")g={vLayout:n,vRule1:!1,vRule2:!1,vRule3:!1,vRule4:!1,vRule5:!1};else if(T==="fitted")g={vLayout:e,vRule1:!1,vRule2:!1,vRule3:!1,vRule4:!1,vRule5:!1};else if(T==="controlled smushing")g={vLayout:r,vRule1:!0,vRule2:!0,vRule3:!0,vRule4:!0,vRule5:!0};else if(T==="universal smushing")g={vLayout:t,vRule1:!1,vRule2:!1,vRule3:!1,vRule4:!1,vRule5:!1};else return;return g},re=function(T,A,g){g=g.replace(/\r\n/g,`
`).replace(/\r/g,`
`);let E=ot(T),L=g.split(`
`),b=[],v,N,O;for(N=L.length,v=0;v<N;v++)b=b.concat(X(L[v],s[E],A));for(N=b.length,O=b[0],v=1;v<N;v++)O=C(O,b[v],A);return O?O.join(`
`):""};function Si(T,A){let g;if(typeof structuredClone<"u"?g=structuredClone(T):g=JSON.parse(JSON.stringify(T)),g.showHardBlanks=A.showHardBlanks||!1,g.width=A.width||-1,g.whitespaceBreak=A.whitespaceBreak||!1,A.horizontalLayout){let E=Z(A.horizontalLayout,T);E&&Object.assign(g.fittingRules,E)}if(A.verticalLayout){let E=ue(A.verticalLayout,T);E&&Object.assign(g.fittingRules,E)}return g.printDirection=A.printDirection!==null&&A.printDirection!==void 0?A.printDirection:T.printDirection,g}let le=async function(T,A,g){return le.text(T,A,g)};return le.text=async function(T,A,g){T=T+"";let E,L;typeof A=="function"?(L=A,E={font:i.font}):typeof A=="string"?(E={font:A},L=g):A?(E=A,L=g):(E={font:i.font},L=g);let b=E.font||i.font;try{let v=await le.loadFont(b),N=v?re(b,Si(v,E),T):"";return L&&L(null,N),N}catch(v){let N=v instanceof Error?v:new Error(String(v));if(L)return L(N),"";throw N}},le.textSync=function(T,A){T=T+"",typeof A=="string"?A={font:A}:A=A||{};let g=A.font||i.font,E=Si(le.loadFontSync(g),A);return re(g,E,T)},le.metadata=async function(T,A){T=T+"";try{let g=await le.loadFont(T);if(!g)throw new Error("Error loading font.");let E=ot(T),L=s[E]||{},b=[g,L.comment||""];return A&&A(null,g,L.comment),b}catch(g){let E=g instanceof Error?g:new Error(String(g));if(A)return A(E),null;throw E}},le.defaults=function(T){return T&&typeof T=="object"&&Object.assign(i,T),typeof structuredClone<"u"?structuredClone(i):JSON.parse(JSON.stringify(i))},le.parseFont=function(T,A,g=!0){if(s[T]&&!g)return s[T].options;A=A.replace(/\r\n/g,`
`).replace(/\r/g,`
`);let E=new qi,L=A.split(`
`),b=L.shift();if(!b)throw new Error("Invalid font file: missing header");let v=b.split(" "),N={hardBlank:v[0].substring(5,6),height:parseInt(v[1],10),baseline:parseInt(v[2],10),maxLength:parseInt(v[3],10),oldLayout:parseInt(v[4],10),numCommentLines:parseInt(v[5],10),printDirection:v[6]?parseInt(v[6],10):0,fullLayout:v[7]?parseInt(v[7],10):null,codeTagCount:v[8]?parseInt(v[8],10):null};if((N.hardBlank||"").length!==1||[N.height,N.baseline,N.maxLength,N.oldLayout,N.numCommentLines].some(V=>V==null||isNaN(V)))throw new Error("FIGlet header contains invalid values.");if(N.height==null||N.numCommentLines==null)throw new Error("FIGlet header contains invalid values.");N.fittingRules=a(N.oldLayout,N.fullLayout),E.options=N;let F=[];for(let V=32;V<=126;V++)F.push(V);if(F.push(196,214,220,228,246,252,223),L.length<N.numCommentLines+N.height*F.length)throw new Error(`FIGlet file is missing data. Line length: ${L.length}. Comment lines: ${N.numCommentLines}. Height: ${N.height}. Num chars: ${F.length}.`);for(E.comment=L.splice(0,N.numCommentLines).join(`
`),E.numChars=0;L.length>0&&E.numChars<F.length;){let V=F[E.numChars];E[V]=L.splice(0,N.height);for(let U=0;U<N.height;U++)typeof E[V][U]>"u"?E[V][U]="":E[V][U]=o(E[V][U],U,N.height);E.numChars++}for(;L.length>0;){let V=L.shift();if(!V||V.trim()==="")break;let U=V.split(" ")[0],W;if(/^-?0[xX][0-9a-fA-F]+$/.test(U))W=parseInt(U,16);else if(/^-?0[0-7]+$/.test(U))W=parseInt(U,8);else if(/^-?[0-9]+$/.test(U))W=parseInt(U,10);else throw new Error(`Error parsing data. Invalid data: ${U}`);if(W===-1||W<-2147483648||W>2147483647){let K=W===-1?"The char code -1 is not permitted.":`The char code cannot be ${W<-2147483648?"less than -2147483648":"greater than 2147483647"}.`;throw new Error(`Error parsing data. ${K}`)}E[W]=L.splice(0,N.height);for(let K=0;K<N.height;K++)typeof E[W][K]>"u"?E[W][K]="":E[W][K]=o(E[W][K],K,N.height);E.numChars++}return s[T]=E,N},le.loadedFonts=()=>Object.keys(s),le.clearLoadedFonts=()=>{Object.keys(s).forEach(T=>{delete s[T]})},le.loadFont=async function(T,A){let g=ot(T);if(s[g]){let E=s[g].options;return A&&A(null,E),Promise.resolve(E)}try{if(!i.fetchFontIfMissing)throw new Error(`Font is not loaded: ${g}`);let E=await fetch(`${i.fontPath}/${g}.flf`);if(!E.ok)throw new Error(`Network response was not ok: ${E.status}`);let L=await E.text(),b=le.parseFont(g,L);return A&&A(null,b),b}catch(E){let L=E instanceof Error?E:new Error(String(E));if(A)return A(L),null;throw L}},le.loadFontSync=function(T){let A=ot(T);if(s[A])return s[A].options;throw new Error("Synchronous font loading is not implemented for the browser, it will only work for fonts already loaded.")},le.preloadFonts=async function(T,A){try{for(let g of T){let E=ot(g),L=await fetch(`${i.fontPath}/${E}.flf`);if(!L.ok)throw new Error(`Failed to preload fonts. Error fetching font: ${E}, status code: ${L.statusText}`);let b=await L.text();le.parseFont(E,b)}A&&A()}catch(g){let E=g instanceof Error?g:new Error(String(g));if(A){A(E);return}throw g}},le.fonts=function(T){return new Promise(function(A,g){A(xi),T&&T(null,xi)})},le.fontsSync=function(){return xi},le.figFonts=s,le})();import{fileURLToPath as Yg}from"url";var Jg=Yg(import.meta.url),Xg=Dt.dirname(Jg),zg=Dt.join(Xg,"/../fonts/"),fe=uc;fe.defaults({fontPath:zg});fe.loadFont=function(n,e){let t=ot(n);return new Promise((r,s)=>{if(fe.figFonts[t]){e&&e(null,fe.figFonts[t].options),r(fe.figFonts[t].options);return}at.readFile(Dt.join(fe.defaults().fontPath,t+".flf"),{encoding:"utf-8"},(i,o)=>{if(i){e&&e(i),s(i);return}o=o+"";try{let a=fe.parseFont(t,o);e&&e(null,a),r(a)}catch(a){let l=a instanceof Error?a:new Error(String(a));e&&e(l),s(l)}})})};fe.loadFontSync=function(n){let e=ot(n);if(fe.figFonts[e])return fe.figFonts[e].options;let t=at.readFileSync(Dt.join(fe.defaults().fontPath,e+".flf"),{encoding:"utf-8"})+"";return fe.parseFont(e,t)};fe.fonts=function(n){return new Promise((e,t)=>{let r=[];at.readdir(fe.defaults().fontPath,(s,i)=>{if(s){n&&n(s),t(s);return}i.forEach(o=>{/\.flf$/.test(o)&&r.push(o.replace(/\.flf$/,""))}),n&&n(null,r),e(r)})})};fe.fontsSync=function(){let n=[];return at.readdirSync(fe.defaults().fontPath).forEach(e=>{/\.flf$/.test(e)&&n.push(e.replace(/\.flf$/,""))}),n};var fc=`flf2a$ 6 5 16 15 13 0 24463 229
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
         `;var Sr=Ae(Vc(),1),A0=Sr.default.green,w0=Sr.default.yellow,L0=Sr.default.bold.red;function Wc(n){let e=A0(`${n.passed.length} validation passed`),t=L0(`${n.failed.length} validation failed`),r=n.warning.length>0?w0(`${n.warning.length} warning(s)`):void 0;n.failed.length===0?console.log(`\u2705[${n.name}] ${e}${r?`, ${r}`:""}.`):(console.log(`\u274C[${n.name}] ${t}${r?`, ${r}`:""}, ${e}.`),console.log(n.failed.map(s=>`  \u274C ${s}`).join(`
`))),n.warning.length>0&&console.log(n.warning.map(s=>`  \u26A0\uFE0F ${s}`).join(`
`)),n.passed.length>0&&console.log(n.passed.map(s=>`  \u2705 ${s}`).join(`
`))}var zf=Ae(zc(),1),co=Ae(dt(),1);import Xf from"path";var Ct=Ae(dt(),1);import wn from"path";function Yf(n){let e=[],t=process.env.SAMPLE_VALIDATOR_CONFIG_PATH;return t&&Ct.default.existsSync(t)&&e.push(t),e.push(wn.join(n,"..",".config","samples-config-v3.json"),wn.join(n,".config","samples-config-v3.json")),e}function Jt(n){let e=process.env.SAMPLE_VALIDATOR_EXPECTED_ID;return e||wn.basename(n)}async function Jf(n){let e=Jt(n),t=Yf(n);for(let r of t)if(await Ct.default.exists(r))try{let i=(await Ct.default.readJson(r)).samples.find(o=>o.id===e);if(i)return{thumbnailPath:i.thumbnailPath,gifPath:i.gifPath}}catch{}return{}}async function BE(n){let e=Jt(n),t=Yf(n);for(let r of t)if(await Ct.default.exists(r))try{let i=(await Ct.default.readJson(r)).samples.find(o=>o.id===e);if(i&&i.tags)return i.tags.includes("C#")}catch{}return!1}async function Ye(n){let e=await BE(n),t=wn.join(n,"M365Agent"),r=wn.join(t,"m365agents.yml"),s=await Ct.default.exists(r);return e||s?{projectType:"csharp",rootDir:n,agentDir:s?t:n,displayPrefix:s?"M365Agent/":""}:{projectType:"typescript",rootDir:n,agentDir:n,displayPrefix:""}}async function uo(n){let e={name:"Env Files",passed:[],failed:[],warning:[]},t=await Ye(n),{agentDir:r,displayPrefix:s,projectType:i}=t,o=[".env.dev",".env.local"],a=!1;for(let l of o){let c=Xf.join(r,"env",l);if(!await co.default.exists(c)){if(i==="csharp")continue;e.warning.push(`${s}${Xf.join("env",l)} does not exist.`);continue}a=!0;let u=await co.default.readFile(c,"utf8"),f=zf.default.parse(u),h=Object.entries(f).map(([y,m])=>({name:y,value:m})),d=!0;for(let y of h)y.name==="TEAMSFX_ENV"||y.name==="APP_NAME_SUFFIX"||y.name==="TEAMS_APP_NAME"||y.name.startsWith("connectionsMap__0")||y.name.startsWith("agentic_")||y.value!==""&&(e.failed.push(`${s}${l}: ${y.name} should NOT have value.`),d=!1);d&&e.passed.push(`${s}${l}: All environment variables are valid.`)}return i==="csharp"&&!a&&e.passed.push("C# project does not require env files."),e}var pt=Ae(dt(),1);import $r from"path";var UE=["appPackage"],HE=["appPackage/manifest.json","appPackage/color.png","appPackage/outline.png","m365agents.yml","m365agents.local.yml"],VE=["README.md"],WE=["env/.env.dev"],GE=["env",".vscode"];async function fo(n,e){let t=$r.join(n,e);return await pt.default.exists(t)?(await pt.default.stat(t)).isDirectory():!1}async function Xt(n,e){let t=$r.join(n,e);return await pt.default.exists(t)?(await pt.default.stat(t)).isFile():!1}async function kr(n,e){return await pt.default.exists(n)?(await pt.default.readdir(n)).filter(r=>r.endsWith(e)):[]}async function ho(n){let e={name:"Folder Structure",passed:[],failed:[],warning:[]},t=await Ye(n),{agentDir:r,rootDir:s,displayPrefix:i,projectType:o}=t;for(let a of UE){let l=i+a;await fo(r,a)?e.passed.push(`Project has "${l}" folder.`):e.failed.push(`Project should have "${l}" folder.`)}for(let a of GE){let l=await fo(r,a),c=await fo(s,a);if(l||c){let u=l?i+a:a;e.passed.push(`Project has "${u}" folder.`)}else o==="typescript"&&e.failed.push(`Project should have "${a}" folder.`)}for(let a of HE){let l=i+a;await Xt(r,a)?e.passed.push(`Project has "${l}" file.`):e.failed.push(`Project should have "${l}" file.`)}for(let a of VE)await Xt(s,a)?e.passed.push(`Project has "${a}" file.`):e.failed.push(`Project should have "${a}" file.`);for(let a of WE){let l=await Xt(r,a),c=await Xt(s,a);if(l||c){let u=l?i+a:a;e.passed.push(`Project has "${u}" file.`)}else o==="typescript"&&e.failed.push(`Project should have "${a}" file.`)}if(o==="csharp"){let a=await kr(s,".sln"),l=await kr(s,".slnx");if(a.length>0||l.length>0){let m=a.length>0?a[0]:l[0];e.passed.push(`Project has solution file "${m}".`)}else e.failed.push("C# project should have a .sln or .slnx solution file.");let c=await kr(s,".csproj"),u=c.length>0,f=c.length>0?c[0]:"",h=["M365Agent","TravelAgent","AzureAgentToM365ATK"];for(let m of h){let _=$r.join(s,m);if(await pt.default.exists(_)){let S=await kr(_,".csproj");if(S.length>0){u=!0,f=`${m}/${S[0]}`;break}}}u?e.passed.push(`Project has .csproj file "${f}".`):e.failed.push("C# project should have a .csproj project file.");let d=await Xt(s,"appsettings.json"),y="appsettings.json";if(!d)for(let m of h){let _=$r.join(s,m);if(await Xt(_,"appsettings.json")){d=!0,y=`${m}/appsettings.json`;break}}d?e.passed.push(`Project has "${y}" file.`):e.failed.push("C# project should have an appsettings.json file.")}return e}var bn=Ae(dt(),1),vn=Ae(Fh(),1);import fs from"path";function kT(n){return Jt(n).endsWith("-codespaces")}async function Mo(n){let e={name:"Image Files",passed:[],failed:[],warning:[]},t=kT(n),r=await Jf(n);if(t)e.passed.push("Thumbnail validation skipped for codespaces sample (not in samples-config-v3.json).");else if(r.thumbnailPath){let s=fs.join(n,r.thumbnailPath);if(await bn.default.exists(s)){let i=(0,vn.default)(s);i.width&&i.height&&i.width/i.height===40/23?e.passed.push(`${r.thumbnailPath} has 1600*920/800*460 resolution or same ratio.`):e.failed.push(`${r.thumbnailPath} must have 1600*920/800*460 resolution or same ratio (40:23 aspect ratio). Current: ${i.width}x${i.height}.`)}else e.failed.push(`${r.thumbnailPath} is required to display in sample gallery but does not exist.`)}else{let s=["png","jpg","jpeg"],i=!1;for(let o of s){let a=fs.join(n,"assets",`thumbnail.${o}`);if(await bn.default.exists(a)){i=!0;let l=(0,vn.default)(a);l.width&&l.height&&l.width/l.height===40/23?e.passed.push(`assets/thumbnail.${o} has 1600*920/800*460 resolution or same ratio.`):e.failed.push(`assets/thumbnail.${o} must have 1600*920/800*460 resolution or same ratio (40:23 aspect ratio). Current: ${l.width}x${l.height}.`);break}}i||e.failed.push("Thumbnail image is required to display in sample gallery. Please add thumbnailPath to samples-config-v3.json or add assets/thumbnail.png.")}if(r.gifPath){let s=fs.join(n,r.gifPath);if(await bn.default.exists(s)){let i=(0,vn.default)(s);i.width&&i.height&&i.width/i.height===40/23?e.passed.push(`${r.gifPath} has 1600*920/800*460 resolution or same ratio.`):e.warning.push(`${r.gifPath} does not have 40:23 aspect ratio. Current: ${i.width}x${i.height}. (Optional)`)}else e.warning.push(`${r.gifPath} does not exist. (Optional)`)}else{let s=fs.join(n,"assets","sampleDemo.gif");if(await bn.default.exists(s)){let i=(0,vn.default)(s);i.width&&i.height&&i.width/i.height===40/23?e.passed.push("assets/sampleDemo.gif has 1600*920/800*460 resolution or same ratio."):e.warning.push(`assets/sampleDemo.gif does not have 40:23 aspect ratio. Current: ${i.width}x${i.height}. (Optional)`)}else e.warning.push("Sample demo gif does not exist. (Optional)")}return e}var Bh=Ae(jh(),1),Fo=Ae(dt(),1);import $T from"path";async function Do(n){let e={name:"package.json",passed:[],failed:[],warning:[]},t=await Ye(n),{projectType:r}=t,s=$T.join(n,"package.json");if(!await Fo.default.exists(s))return r==="csharp"?(e.passed=["C# project does not require package.json."],e):(e.failed=["package.json does not exist."],e);let i=await Fo.default.readFile(s,"utf8");try{let o=JSON.parse(i);if(!o.engines||!o.engines.node)return e.warning=["package.json does not have 'engines.node' field."],e;if(!(0,Bh.satisfies)("22.0.0",o.engines.node))return e.warning=["'engines.node' field should be compatible with 22."],e}catch{return e.failed=["package.json is not a valid JSON file."],e}return e.passed=["'engines.node' field is compatible with 22."],e}var oa=Ae(dt(),1),aa=Ae(ia(),1);import Cw from"path";var Cp="1.22.0",Rp="devPreview";async function la(n){let e={name:"App Manifest",passed:[],failed:[],warning:[]},t=await Ye(n),{agentDir:r,displayPrefix:s}=t,i=Cw.join(r,"appPackage","manifest.json");if(!await oa.default.exists(i))return e.failed=[`${s}appPackage/manifest.json does not exist.`],e;let o=await oa.default.readFile(i,"utf8"),a;try{a=JSON.parse(o)}catch{}if(!a)return e.failed.push("appPackage/manifest.json is not a valid JSON file."),e;let l=a.id;if(!l||l!=="${{TEAMS_APP_ID}}"?e.failed.push("id should be equal to '${{TEAMS_APP_ID}}'."):e.passed.push("id is referencing placeholder from env: ${{TEAMS_APP_ID}}."),a.manifestVersion===Rp)e.warning.push(`Manifest version(${Rp}) is using preview version.`);else{let c=aa.default.coerce(a.manifestVersion);c&&aa.default.eq(c,Cp)?e.passed.push("Manifest version is aligned with Microsoft 365 Agents Toolkit."):e.warning.push(`Manifest version(${a.manifestVersion}) is NOT aligned with Microsoft 365 Agents Toolkit(${Cp}).`)}return e}var un=Ae(dt(),1),Tg=Ae(Eg(),1),Vl=Ae(ia(),1);import Hl from"path";var s2={"bot-sso-docker":"sso-bot-docker","NPM-search-connector-M365":"npm-search-connector-M365","sso-enabled-tab-via-apim-proxy":"sso-tab-via-apim-proxy","hello-world-tab-docker":"hello-world-tab-with-backend","copilot-connector-app":"graph-connector-app","graph-rsc-helper":"graph-rsc-nodeJs"};function i2(n){let e=[],t=process.env.SAMPLE_VALIDATOR_CONFIG_PATH;return t&&un.default.existsSync(t)&&e.push(t),e.push(Hl.join(n,"..",".config","samples-config-v3.json"),Hl.join(n,".config","samples-config-v3.json")),e}async function o2(n){let e=Jt(n),t=i2(n);for(let r of t)if(await un.default.exists(r))try{let i=(await un.default.readJson(r)).samples.find(o=>o.id===e);if(i)return i.id}catch{}return null}var a2=[{name:"provision",actions:["teamsApp/create"],required:!0},{name:"deploy",actions:[],required:!0}],l2=[{name:"publish",actions:["teamsApp/publishAppPackage"]}],c2="1.2.0";async function Wl(n){let e={name:"teamsapp.yaml",passed:[],failed:[],warning:[]},t=await Ye(n),{agentDir:r,displayPrefix:s}=t,i=Hl.join(r,"m365agents.yml");if(!await un.default.exists(i))return e.failed=[`${s}m365agents.yml does not exist.`],e;let o=await un.default.readFile(i,"utf8"),a=Tg.default.parse(o),l=a&&a.projectId;l&&l!==""?e.failed.push("Project should NOT have projectId in m365agents.yml."):e.passed.push("Project has no projectId in m365agents.yml.");let c=a?.version;if(c){let y=c.match(/^v?(\d+)(?:\.(\d+))?/);if(y){let m=y[1],_=y[2]||"0",S=`${m}.${_}.0`,w=Vl.default.coerce(S);w&&Vl.default.gte(w,c2)?e.passed.push(`Version (${c}) supports sampleTag (>= v1.2).`):e.failed.push(`Version (${c}) must be >= v1.2 to support sampleTag.`)}else e.failed.push(`Version (${c}) is not a valid version format.`)}else e.failed.push("Project should have version field in m365agents.yml.");for(let y of a2){let m=a[y.name],_=[];if(!m){e.failed.push(`Project should have '${y.name}' stage in m365agents.yml.`);continue}for(let S of y.actions)if(m&&m.findIndex(w=>w.uses===S)<0&&_.push(`Project should have '${S}' action in ${y.name} stage.`),y.name==="provision"&&S==="teamsApp/create"){let w=m.findIndex(I=>I.uses===S);w>=0&&(m[w].writeToEnvironmentFile?.teamsAppId==="TEAMS_APP_ID"?e.passed.push("Project has 'teamsApp/create' action which has TEAMS_APP_ID env variable."):e.failed.push("Project should have 'teamsApp/create' action which has TEAMS_APP_ID env variable."))}_.length===0?e.passed.push(`Project has all mandatory actions in ${y.name} stage.`):e.failed.push(..._)}for(let y of l2){let m=a[y.name];if(!m){e.warning.push(`Project does not have '${y.name}' stage in m365agents.yml.`);continue}let _=!0;for(let S of y.actions)m.findIndex(w=>w.uses===S)<0&&(e.warning.push(`Project does not have '${S}' action in ${y.name} stage.`),_=!1);_&&e.passed.push(`Project has all actions in ${y.name} stage.`)}let u=/^([\w-]+):([\w-]+)$/g,f=a?.additionalMetadata?.sampleTag,h=await o2(n),d=!1;if(f&&f!==""){let y=u.exec(f);if(y){let m=y[1],_=y[2];if(e.passed.push("Project has sampleTag with format 'repo:name'."),d=!0,m!=="TeamsFx-Samples"&&e.warning.push("Project is an external sample."),h!==null){let S=s2[h];_===h||_===S?_===S?e.passed.push(`sampleTag name '${_}' matches allowed exception for sample id '${h}'.`):e.passed.push(`sampleTag name '${_}' matches sample id in config.`):e.failed.push(`sampleTag name '${_}' does not match sample id '${h}' in samples-config-v3.json.`)}}}return d||e.failed.push("Project should have sampleTag with format 'repo:name'."),e}var u2="1.0.0",Sg=new lc,f2=[ho,Wl,la,uo,Mo,Do];async function h2(){await Sg.version(u2).description("A tool to validate project content before onboarding to TeamsFx sample gallery.").option("-p, --path <path>","Path to the project folder to be validated.").parseAsync(process.argv);let n=Sg.opts(),e=process.cwd();n.path&&typeof n.path=="string"&&(e=n.path);for(let t of f2){let r=await t(e);Wc(r)}}fe.parseFont("Standard",fc);console.log(fe.textSync("TeamsFx Sample Validator"));h2();
