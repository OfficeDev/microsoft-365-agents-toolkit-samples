#! /usr/bin/env node
import { createRequire } from 'module'; const require = createRequire(import.meta.url);
var cT=Object.create;var zh=Object.defineProperty;var lT=Object.getOwnPropertyDescriptor;var uT=Object.getOwnPropertyNames;var fT=Object.getPrototypeOf,dT=Object.prototype.hasOwnProperty;var Q=(t=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(t,{get:(e,r)=>(typeof require<"u"?require:e)[r]}):t)(function(t){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+t+'" is not supported')});var m=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var hT=(t,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of uT(e))!dT.call(t,s)&&s!==r&&zh(t,s,{get:()=>e[s],enumerable:!(n=lT(e,s))||n.enumerable});return t};var Ce=(t,e,r)=>(r=t!=null?cT(fT(t)):{},hT(e||!t||!t.__esModule?zh(r,"default",{value:t,enumerable:!0}):r,t));var Bn=m(hc=>{var yi=class extends Error{constructor(e,r,n){super(n),Error.captureStackTrace(this,this.constructor),this.name=this.constructor.name,this.code=r,this.exitCode=e,this.nestedError=void 0}},dc=class extends yi{constructor(e){super(1,"commander.invalidArgument",e),Error.captureStackTrace(this,this.constructor),this.name=this.constructor.name}};hc.CommanderError=yi;hc.InvalidArgumentError=dc});var Ei=m(mc=>{var{InvalidArgumentError:pT}=Bn(),pc=class{constructor(e,r){switch(this.description=r||"",this.variadic=!1,this.parseArg=void 0,this.defaultValue=void 0,this.defaultValueDescription=void 0,this.argChoices=void 0,e[0]){case"<":this.required=!0,this._name=e.slice(1,-1);break;case"[":this.required=!1,this._name=e.slice(1,-1);break;default:this.required=!0,this._name=e;break}this._name.length>3&&this._name.slice(-3)==="..."&&(this.variadic=!0,this._name=this._name.slice(0,-3))}name(){return this._name}_concatValue(e,r){return r===this.defaultValue||!Array.isArray(r)?[e]:r.concat(e)}default(e,r){return this.defaultValue=e,this.defaultValueDescription=r,this}argParser(e){return this.parseArg=e,this}choices(e){return this.argChoices=e.slice(),this.parseArg=(r,n)=>{if(!this.argChoices.includes(r))throw new pT(`Allowed choices are ${this.argChoices.join(", ")}.`);return this.variadic?this._concatValue(r,n):r},this}argRequired(){return this.required=!0,this}argOptional(){return this.required=!1,this}};function mT(t){let e=t.name()+(t.variadic===!0?"...":"");return t.required?"<"+e+">":"["+e+"]"}mc.Argument=pc;mc.humanReadableArgName=mT});var gc=m(Jh=>{var{humanReadableArgName:_T}=Ei(),_c=class{constructor(){this.helpWidth=void 0,this.sortSubcommands=!1,this.sortOptions=!1,this.showGlobalOptions=!1}visibleCommands(e){let r=e.commands.filter(n=>!n._hidden);if(e._hasImplicitHelpCommand()){let[,n,s]=e._helpCommandnameAndArgs.match(/([^ ]+) *(.*)/),i=e.createCommand(n).helpOption(!1);i.description(e._helpCommandDescription),s&&i.arguments(s),r.push(i)}return this.sortSubcommands&&r.sort((n,s)=>n.name().localeCompare(s.name())),r}compareOptions(e,r){let n=s=>s.short?s.short.replace(/^-/,""):s.long.replace(/^--/,"");return n(e).localeCompare(n(r))}visibleOptions(e){let r=e.options.filter(i=>!i.hidden),n=e._hasHelpOption&&e._helpShortFlag&&!e._findOption(e._helpShortFlag),s=e._hasHelpOption&&!e._findOption(e._helpLongFlag);if(n||s){let i;n?s?i=e.createOption(e._helpFlags,e._helpDescription):i=e.createOption(e._helpShortFlag,e._helpDescription):i=e.createOption(e._helpLongFlag,e._helpDescription),r.push(i)}return this.sortOptions&&r.sort(this.compareOptions),r}visibleGlobalOptions(e){if(!this.showGlobalOptions)return[];let r=[];for(let n=e.parent;n;n=n.parent){let s=n.options.filter(i=>!i.hidden);r.push(...s)}return this.sortOptions&&r.sort(this.compareOptions),r}visibleArguments(e){return e._argsDescription&&e.registeredArguments.forEach(r=>{r.description=r.description||e._argsDescription[r.name()]||""}),e.registeredArguments.find(r=>r.description)?e.registeredArguments:[]}subcommandTerm(e){let r=e.registeredArguments.map(n=>_T(n)).join(" ");return e._name+(e._aliases[0]?"|"+e._aliases[0]:"")+(e.options.length?" [options]":"")+(r?" "+r:"")}optionTerm(e){return e.flags}argumentTerm(e){return e.name()}longestSubcommandTermLength(e,r){return r.visibleCommands(e).reduce((n,s)=>Math.max(n,r.subcommandTerm(s).length),0)}longestOptionTermLength(e,r){return r.visibleOptions(e).reduce((n,s)=>Math.max(n,r.optionTerm(s).length),0)}longestGlobalOptionTermLength(e,r){return r.visibleGlobalOptions(e).reduce((n,s)=>Math.max(n,r.optionTerm(s).length),0)}longestArgumentTermLength(e,r){return r.visibleArguments(e).reduce((n,s)=>Math.max(n,r.argumentTerm(s).length),0)}commandUsage(e){let r=e._name;e._aliases[0]&&(r=r+"|"+e._aliases[0]);let n="";for(let s=e.parent;s;s=s.parent)n=s.name()+" "+n;return n+r+" "+e.usage()}commandDescription(e){return e.description()}subcommandDescription(e){return e.summary()||e.description()}optionDescription(e){let r=[];return e.argChoices&&r.push(`choices: ${e.argChoices.map(n=>JSON.stringify(n)).join(", ")}`),e.defaultValue!==void 0&&(e.required||e.optional||e.isBoolean()&&typeof e.defaultValue=="boolean")&&r.push(`default: ${e.defaultValueDescription||JSON.stringify(e.defaultValue)}`),e.presetArg!==void 0&&e.optional&&r.push(`preset: ${JSON.stringify(e.presetArg)}`),e.envVar!==void 0&&r.push(`env: ${e.envVar}`),r.length>0?`${e.description} (${r.join(", ")})`:e.description}argumentDescription(e){let r=[];if(e.argChoices&&r.push(`choices: ${e.argChoices.map(n=>JSON.stringify(n)).join(", ")}`),e.defaultValue!==void 0&&r.push(`default: ${e.defaultValueDescription||JSON.stringify(e.defaultValue)}`),r.length>0){let n=`(${r.join(", ")})`;return e.description?`${e.description} ${n}`:n}return e.description}formatHelp(e,r){let n=r.padWidth(e,r),s=r.helpWidth||80,i=2,o=2;function a(g,p){if(p){let _=`${g.padEnd(n+o)}${p}`;return r.wrap(_,s-i,n+o)}return g}function c(g){return g.join(`
`).replace(/^/gm," ".repeat(i))}let l=[`Usage: ${r.commandUsage(e)}`,""],u=r.commandDescription(e);u.length>0&&(l=l.concat([r.wrap(u,s,0),""]));let f=r.visibleArguments(e).map(g=>a(r.argumentTerm(g),r.argumentDescription(g)));f.length>0&&(l=l.concat(["Arguments:",c(f),""]));let d=r.visibleOptions(e).map(g=>a(r.optionTerm(g),r.optionDescription(g)));if(d.length>0&&(l=l.concat(["Options:",c(d),""])),this.showGlobalOptions){let g=r.visibleGlobalOptions(e).map(p=>a(r.optionTerm(p),r.optionDescription(p)));g.length>0&&(l=l.concat(["Global Options:",c(g),""]))}let h=r.visibleCommands(e).map(g=>a(r.subcommandTerm(g),r.subcommandDescription(g)));return h.length>0&&(l=l.concat(["Commands:",c(h),""])),l.join(`
`)}padWidth(e,r){return Math.max(r.longestOptionTermLength(e,r),r.longestGlobalOptionTermLength(e,r),r.longestSubcommandTermLength(e,r),r.longestArgumentTermLength(e,r))}wrap(e,r,n,s=40){let i=" \\f\\t\\v\xA0\u1680\u2000-\u200A\u202F\u205F\u3000\uFEFF",o=new RegExp(`[\\n][${i}]+`);if(e.match(o))return e;let a=r-n;if(a<s)return e;let c=e.slice(0,n),l=e.slice(n).replace(`\r
`,`
`),u=" ".repeat(n),d="\\s\u200B",h=new RegExp(`
|.{1,${a-1}}([${d}]|$)|[^${d}]+?([${d}]|$)`,"g"),g=l.match(h)||[];return c+g.map((p,_)=>p===`
`?"":(_>0?u:"")+p.trimEnd()).join(`
`)}};Jh.Help=_c});var vc=m(vi=>{var{InvalidArgumentError:gT}=Bn(),yc=class{constructor(e,r){this.flags=e,this.description=r||"",this.required=e.includes("<"),this.optional=e.includes("["),this.variadic=/\w\.\.\.[>\]]$/.test(e),this.mandatory=!1;let n=Yh(e);this.short=n.shortFlag,this.long=n.longFlag,this.negate=!1,this.long&&(this.negate=this.long.startsWith("--no-")),this.defaultValue=void 0,this.defaultValueDescription=void 0,this.presetArg=void 0,this.envVar=void 0,this.parseArg=void 0,this.hidden=!1,this.argChoices=void 0,this.conflictsWith=[],this.implied=void 0}default(e,r){return this.defaultValue=e,this.defaultValueDescription=r,this}preset(e){return this.presetArg=e,this}conflicts(e){return this.conflictsWith=this.conflictsWith.concat(e),this}implies(e){let r=e;return typeof e=="string"&&(r={[e]:!0}),this.implied=Object.assign(this.implied||{},r),this}env(e){return this.envVar=e,this}argParser(e){return this.parseArg=e,this}makeOptionMandatory(e=!0){return this.mandatory=!!e,this}hideHelp(e=!0){return this.hidden=!!e,this}_concatValue(e,r){return r===this.defaultValue||!Array.isArray(r)?[e]:r.concat(e)}choices(e){return this.argChoices=e.slice(),this.parseArg=(r,n)=>{if(!this.argChoices.includes(r))throw new gT(`Allowed choices are ${this.argChoices.join(", ")}.`);return this.variadic?this._concatValue(r,n):r},this}name(){return this.long?this.long.replace(/^--/,""):this.short.replace(/^-/,"")}attributeName(){return yT(this.name().replace(/^no-/,""))}is(e){return this.short===e||this.long===e}isBoolean(){return!this.required&&!this.optional&&!this.negate}},Ec=class{constructor(e){this.positiveOptions=new Map,this.negativeOptions=new Map,this.dualOptions=new Set,e.forEach(r=>{r.negate?this.negativeOptions.set(r.attributeName(),r):this.positiveOptions.set(r.attributeName(),r)}),this.negativeOptions.forEach((r,n)=>{this.positiveOptions.has(n)&&this.dualOptions.add(n)})}valueFromOption(e,r){let n=r.attributeName();if(!this.dualOptions.has(n))return!0;let s=this.negativeOptions.get(n).presetArg,i=s!==void 0?s:!1;return r.negate===(i===e)}};function yT(t){return t.split("-").reduce((e,r)=>e+r[0].toUpperCase()+r.slice(1))}function Yh(t){let e,r,n=t.split(/[ |,]+/);return n.length>1&&!/^[[<]/.test(n[1])&&(e=n.shift()),r=n.shift(),!e&&/^-[^-]$/.test(r)&&(e=r,r=void 0),{shortFlag:e,longFlag:r}}vi.Option=yc;vi.splitOptionFlags=Yh;vi.DualOptions=Ec});var Qh=m(Xh=>{function ET(t,e){if(Math.abs(t.length-e.length)>3)return Math.max(t.length,e.length);let r=[];for(let n=0;n<=t.length;n++)r[n]=[n];for(let n=0;n<=e.length;n++)r[0][n]=n;for(let n=1;n<=e.length;n++)for(let s=1;s<=t.length;s++){let i=1;t[s-1]===e[n-1]?i=0:i=1,r[s][n]=Math.min(r[s-1][n]+1,r[s][n-1]+1,r[s-1][n-1]+i),s>1&&n>1&&t[s-1]===e[n-2]&&t[s-2]===e[n-1]&&(r[s][n]=Math.min(r[s][n],r[s-2][n-2]+1))}return r[t.length][e.length]}function vT(t,e){if(!e||e.length===0)return"";e=Array.from(new Set(e));let r=t.startsWith("--");r&&(t=t.slice(2),e=e.map(o=>o.slice(2)));let n=[],s=3,i=.4;return e.forEach(o=>{if(o.length<=1)return;let a=ET(t,o),c=Math.max(t.length,o.length);(c-a)/c>i&&(a<s?(s=a,n=[o]):a===s&&n.push(o))}),n.sort((o,a)=>o.localeCompare(a)),r&&(n=n.map(o=>`--${o}`)),n.length>1?`
(Did you mean one of ${n.join(", ")}?)`:n.length===1?`
(Did you mean ${n[0]}?)`:""}Xh.suggestSimilar=vT});var sp=m(np=>{var wT=Q("events").EventEmitter,wc=Q("child_process"),Ut=Q("path"),Sc=Q("fs"),Ee=Q("process"),{Argument:ST,humanReadableArgName:TT}=Ei(),{CommanderError:Tc}=Bn(),{Help:bT}=gc(),{Option:Zh,splitOptionFlags:IT,DualOptions:AT}=vc(),{suggestSimilar:ep}=Qh(),bc=class t extends wT{constructor(e){super(),this.commands=[],this.options=[],this.parent=null,this._allowUnknownOption=!1,this._allowExcessArguments=!0,this.registeredArguments=[],this._args=this.registeredArguments,this.args=[],this.rawArgs=[],this.processedArgs=[],this._scriptPath=null,this._name=e||"",this._optionValues={},this._optionValueSources={},this._storeOptionsAsProperties=!1,this._actionHandler=null,this._executableHandler=!1,this._executableFile=null,this._executableDir=null,this._defaultCommandName=null,this._exitCallback=null,this._aliases=[],this._combineFlagAndOptionalValue=!0,this._description="",this._summary="",this._argsDescription=void 0,this._enablePositionalOptions=!1,this._passThroughOptions=!1,this._lifeCycleHooks={},this._showHelpAfterError=!1,this._showSuggestionAfterError=!0,this._outputConfiguration={writeOut:r=>Ee.stdout.write(r),writeErr:r=>Ee.stderr.write(r),getOutHelpWidth:()=>Ee.stdout.isTTY?Ee.stdout.columns:void 0,getErrHelpWidth:()=>Ee.stderr.isTTY?Ee.stderr.columns:void 0,outputError:(r,n)=>n(r)},this._hidden=!1,this._hasHelpOption=!0,this._helpFlags="-h, --help",this._helpDescription="display help for command",this._helpShortFlag="-h",this._helpLongFlag="--help",this._addImplicitHelpCommand=void 0,this._helpCommandName="help",this._helpCommandnameAndArgs="help [command]",this._helpCommandDescription="display help for command",this._helpConfiguration={}}copyInheritedSettings(e){return this._outputConfiguration=e._outputConfiguration,this._hasHelpOption=e._hasHelpOption,this._helpFlags=e._helpFlags,this._helpDescription=e._helpDescription,this._helpShortFlag=e._helpShortFlag,this._helpLongFlag=e._helpLongFlag,this._helpCommandName=e._helpCommandName,this._helpCommandnameAndArgs=e._helpCommandnameAndArgs,this._helpCommandDescription=e._helpCommandDescription,this._helpConfiguration=e._helpConfiguration,this._exitCallback=e._exitCallback,this._storeOptionsAsProperties=e._storeOptionsAsProperties,this._combineFlagAndOptionalValue=e._combineFlagAndOptionalValue,this._allowExcessArguments=e._allowExcessArguments,this._enablePositionalOptions=e._enablePositionalOptions,this._showHelpAfterError=e._showHelpAfterError,this._showSuggestionAfterError=e._showSuggestionAfterError,this}_getCommandAndAncestors(){let e=[];for(let r=this;r;r=r.parent)e.push(r);return e}command(e,r,n){let s=r,i=n;typeof s=="object"&&s!==null&&(i=s,s=null),i=i||{};let[,o,a]=e.match(/([^ ]+) *(.*)/),c=this.createCommand(o);return s&&(c.description(s),c._executableHandler=!0),i.isDefault&&(this._defaultCommandName=c._name),c._hidden=!!(i.noHelp||i.hidden),c._executableFile=i.executableFile||null,a&&c.arguments(a),this.commands.push(c),c.parent=this,c.copyInheritedSettings(this),s?this:c}createCommand(e){return new t(e)}createHelp(){return Object.assign(new bT,this.configureHelp())}configureHelp(e){return e===void 0?this._helpConfiguration:(this._helpConfiguration=e,this)}configureOutput(e){return e===void 0?this._outputConfiguration:(Object.assign(this._outputConfiguration,e),this)}showHelpAfterError(e=!0){return typeof e!="string"&&(e=!!e),this._showHelpAfterError=e,this}showSuggestionAfterError(e=!0){return this._showSuggestionAfterError=!!e,this}addCommand(e,r){if(!e._name)throw new Error(`Command passed to .addCommand() must have a name
- specify the name in Command constructor or using .name()`);return r=r||{},r.isDefault&&(this._defaultCommandName=e._name),(r.noHelp||r.hidden)&&(e._hidden=!0),this.commands.push(e),e.parent=this,this}createArgument(e,r){return new ST(e,r)}argument(e,r,n,s){let i=this.createArgument(e,r);return typeof n=="function"?i.default(s).argParser(n):i.default(n),this.addArgument(i),this}arguments(e){return e.trim().split(/ +/).forEach(r=>{this.argument(r)}),this}addArgument(e){let r=this.registeredArguments.slice(-1)[0];if(r&&r.variadic)throw new Error(`only the last argument can be variadic '${r.name()}'`);if(e.required&&e.defaultValue!==void 0&&e.parseArg===void 0)throw new Error(`a default value for a required argument is never used: '${e.name()}'`);return this.registeredArguments.push(e),this}addHelpCommand(e,r){return e===!1?this._addImplicitHelpCommand=!1:(this._addImplicitHelpCommand=!0,typeof e=="string"&&(this._helpCommandName=e.split(" ")[0],this._helpCommandnameAndArgs=e),this._helpCommandDescription=r||this._helpCommandDescription),this}_hasImplicitHelpCommand(){return this._addImplicitHelpCommand===void 0?this.commands.length&&!this._actionHandler&&!this._findCommand("help"):this._addImplicitHelpCommand}hook(e,r){let n=["preSubcommand","preAction","postAction"];if(!n.includes(e))throw new Error(`Unexpected value for event passed to hook : '${e}'.
Expecting one of '${n.join("', '")}'`);return this._lifeCycleHooks[e]?this._lifeCycleHooks[e].push(r):this._lifeCycleHooks[e]=[r],this}exitOverride(e){return e?this._exitCallback=e:this._exitCallback=r=>{if(r.code!=="commander.executeSubCommandAsync")throw r},this}_exit(e,r,n){this._exitCallback&&this._exitCallback(new Tc(e,r,n)),Ee.exit(e)}action(e){let r=n=>{let s=this.registeredArguments.length,i=n.slice(0,s);return this._storeOptionsAsProperties?i[s]=this:i[s]=this.opts(),i.push(this),e.apply(this,i)};return this._actionHandler=r,this}createOption(e,r){return new Zh(e,r)}_callParseArg(e,r,n,s){try{return e.parseArg(r,n)}catch(i){if(i.code==="commander.invalidArgument"){let o=`${s} ${i.message}`;this.error(o,{exitCode:i.exitCode,code:i.code})}throw i}}addOption(e){let r=e.name(),n=e.attributeName();if(e.negate){let i=e.long.replace(/^--no-/,"--");this._findOption(i)||this.setOptionValueWithSource(n,e.defaultValue===void 0?!0:e.defaultValue,"default")}else e.defaultValue!==void 0&&this.setOptionValueWithSource(n,e.defaultValue,"default");this.options.push(e);let s=(i,o,a)=>{i==null&&e.presetArg!==void 0&&(i=e.presetArg);let c=this.getOptionValue(n);i!==null&&e.parseArg?i=this._callParseArg(e,i,c,o):i!==null&&e.variadic&&(i=e._concatValue(i,c)),i==null&&(e.negate?i=!1:e.isBoolean()||e.optional?i=!0:i=""),this.setOptionValueWithSource(n,i,a)};return this.on("option:"+r,i=>{let o=`error: option '${e.flags}' argument '${i}' is invalid.`;s(i,o,"cli")}),e.envVar&&this.on("optionEnv:"+r,i=>{let o=`error: option '${e.flags}' value '${i}' from env '${e.envVar}' is invalid.`;s(i,o,"env")}),this}_optionEx(e,r,n,s,i){if(typeof r=="object"&&r instanceof Zh)throw new Error("To add an Option object use addOption() instead of option() or requiredOption()");let o=this.createOption(r,n);if(o.makeOptionMandatory(!!e.mandatory),typeof s=="function")o.default(i).argParser(s);else if(s instanceof RegExp){let a=s;s=(c,l)=>{let u=a.exec(c);return u?u[0]:l},o.default(i).argParser(s)}else o.default(s);return this.addOption(o)}option(e,r,n,s){return this._optionEx({},e,r,n,s)}requiredOption(e,r,n,s){return this._optionEx({mandatory:!0},e,r,n,s)}combineFlagAndOptionalValue(e=!0){return this._combineFlagAndOptionalValue=!!e,this}allowUnknownOption(e=!0){return this._allowUnknownOption=!!e,this}allowExcessArguments(e=!0){return this._allowExcessArguments=!!e,this}enablePositionalOptions(e=!0){return this._enablePositionalOptions=!!e,this}passThroughOptions(e=!0){if(this._passThroughOptions=!!e,this.parent&&e&&!this.parent._enablePositionalOptions)throw new Error("passThroughOptions can not be used without turning on enablePositionalOptions for parent command(s)");return this}storeOptionsAsProperties(e=!0){if(this.options.length)throw new Error("call .storeOptionsAsProperties() before adding options");return this._storeOptionsAsProperties=!!e,this}getOptionValue(e){return this._storeOptionsAsProperties?this[e]:this._optionValues[e]}setOptionValue(e,r){return this.setOptionValueWithSource(e,r,void 0)}setOptionValueWithSource(e,r,n){return this._storeOptionsAsProperties?this[e]=r:this._optionValues[e]=r,this._optionValueSources[e]=n,this}getOptionValueSource(e){return this._optionValueSources[e]}getOptionValueSourceWithGlobals(e){let r;return this._getCommandAndAncestors().forEach(n=>{n.getOptionValueSource(e)!==void 0&&(r=n.getOptionValueSource(e))}),r}_prepareUserArgs(e,r){if(e!==void 0&&!Array.isArray(e))throw new Error("first parameter to parse must be array or undefined");r=r||{},e===void 0&&(e=Ee.argv,Ee.versions&&Ee.versions.electron&&(r.from="electron")),this.rawArgs=e.slice();let n;switch(r.from){case void 0:case"node":this._scriptPath=e[1],n=e.slice(2);break;case"electron":Ee.defaultApp?(this._scriptPath=e[1],n=e.slice(2)):n=e.slice(1);break;case"user":n=e.slice(0);break;default:throw new Error(`unexpected parse option { from: '${r.from}' }`)}return!this._name&&this._scriptPath&&this.nameFromFilename(this._scriptPath),this._name=this._name||"program",n}parse(e,r){let n=this._prepareUserArgs(e,r);return this._parseCommand([],n),this}async parseAsync(e,r){let n=this._prepareUserArgs(e,r);return await this._parseCommand([],n),this}_executeSubCommand(e,r){r=r.slice();let n=!1,s=[".js",".ts",".tsx",".mjs",".cjs"];function i(u,f){let d=Ut.resolve(u,f);if(Sc.existsSync(d))return d;if(s.includes(Ut.extname(f)))return;let h=s.find(g=>Sc.existsSync(`${d}${g}`));if(h)return`${d}${h}`}this._checkForMissingMandatoryOptions(),this._checkForConflictingOptions();let o=e._executableFile||`${this._name}-${e._name}`,a=this._executableDir||"";if(this._scriptPath){let u;try{u=Sc.realpathSync(this._scriptPath)}catch{u=this._scriptPath}a=Ut.resolve(Ut.dirname(u),a)}if(a){let u=i(a,o);if(!u&&!e._executableFile&&this._scriptPath){let f=Ut.basename(this._scriptPath,Ut.extname(this._scriptPath));f!==this._name&&(u=i(a,`${f}-${e._name}`))}o=u||o}n=s.includes(Ut.extname(o));let c;Ee.platform!=="win32"?n?(r.unshift(o),r=rp(Ee.execArgv).concat(r),c=wc.spawn(Ee.argv[0],r,{stdio:"inherit"})):c=wc.spawn(o,r,{stdio:"inherit"}):(r.unshift(o),r=rp(Ee.execArgv).concat(r),c=wc.spawn(Ee.execPath,r,{stdio:"inherit"})),c.killed||["SIGUSR1","SIGUSR2","SIGTERM","SIGINT","SIGHUP"].forEach(f=>{Ee.on(f,()=>{c.killed===!1&&c.exitCode===null&&c.kill(f)})});let l=this._exitCallback;l?c.on("close",()=>{l(new Tc(Ee.exitCode||0,"commander.executeSubCommandAsync","(close)"))}):c.on("close",Ee.exit.bind(Ee)),c.on("error",u=>{if(u.code==="ENOENT"){let f=a?`searched for local subcommand relative to directory '${a}'`:"no directory for search for local subcommand, use .executableDir() to supply a custom directory",d=`'${o}' does not exist
 - if '${e._name}' is not meant to be an executable command, remove description parameter from '.command()' and use '.description()' instead
 - if the default executable name is not suitable, use the executableFile option to supply a custom name or path
 - ${f}`;throw new Error(d)}else if(u.code==="EACCES")throw new Error(`'${o}' not executable`);if(!l)Ee.exit(1);else{let f=new Tc(1,"commander.executeSubCommandAsync","(error)");f.nestedError=u,l(f)}}),this.runningCommand=c}_dispatchSubcommand(e,r,n){let s=this._findCommand(e);s||this.help({error:!0});let i;return i=this._chainOrCallSubCommandHook(i,s,"preSubcommand"),i=this._chainOrCall(i,()=>{if(s._executableHandler)this._executeSubCommand(s,r.concat(n));else return s._parseCommand(r,n)}),i}_dispatchHelpCommand(e){e||this.help();let r=this._findCommand(e);return r&&!r._executableHandler&&r.help(),this._dispatchSubcommand(e,[],[this._helpLongFlag||this._helpShortFlag])}_checkNumberOfArguments(){this.registeredArguments.forEach((e,r)=>{e.required&&this.args[r]==null&&this.missingArgument(e.name())}),!(this.registeredArguments.length>0&&this.registeredArguments[this.registeredArguments.length-1].variadic)&&this.args.length>this.registeredArguments.length&&this._excessArguments(this.args)}_processArguments(){let e=(n,s,i)=>{let o=s;if(s!==null&&n.parseArg){let a=`error: command-argument value '${s}' is invalid for argument '${n.name()}'.`;o=this._callParseArg(n,s,i,a)}return o};this._checkNumberOfArguments();let r=[];this.registeredArguments.forEach((n,s)=>{let i=n.defaultValue;n.variadic?s<this.args.length?(i=this.args.slice(s),n.parseArg&&(i=i.reduce((o,a)=>e(n,a,o),n.defaultValue))):i===void 0&&(i=[]):s<this.args.length&&(i=this.args[s],n.parseArg&&(i=e(n,i,n.defaultValue))),r[s]=i}),this.processedArgs=r}_chainOrCall(e,r){return e&&e.then&&typeof e.then=="function"?e.then(()=>r()):r()}_chainOrCallHooks(e,r){let n=e,s=[];return this._getCommandAndAncestors().reverse().filter(i=>i._lifeCycleHooks[r]!==void 0).forEach(i=>{i._lifeCycleHooks[r].forEach(o=>{s.push({hookedCommand:i,callback:o})})}),r==="postAction"&&s.reverse(),s.forEach(i=>{n=this._chainOrCall(n,()=>i.callback(i.hookedCommand,this))}),n}_chainOrCallSubCommandHook(e,r,n){let s=e;return this._lifeCycleHooks[n]!==void 0&&this._lifeCycleHooks[n].forEach(i=>{s=this._chainOrCall(s,()=>i(this,r))}),s}_parseCommand(e,r){let n=this.parseOptions(r);if(this._parseOptionsEnv(),this._parseOptionsImplied(),e=e.concat(n.operands),r=n.unknown,this.args=e.concat(r),e&&this._findCommand(e[0]))return this._dispatchSubcommand(e[0],e.slice(1),r);if(this._hasImplicitHelpCommand()&&e[0]===this._helpCommandName)return this._dispatchHelpCommand(e[1]);if(this._defaultCommandName)return tp(this,r),this._dispatchSubcommand(this._defaultCommandName,e,r);this.commands.length&&this.args.length===0&&!this._actionHandler&&!this._defaultCommandName&&this.help({error:!0}),tp(this,n.unknown),this._checkForMissingMandatoryOptions(),this._checkForConflictingOptions();let s=()=>{n.unknown.length>0&&this.unknownOption(n.unknown[0])},i=`command:${this.name()}`;if(this._actionHandler){s(),this._processArguments();let o;return o=this._chainOrCallHooks(o,"preAction"),o=this._chainOrCall(o,()=>this._actionHandler(this.processedArgs)),this.parent&&(o=this._chainOrCall(o,()=>{this.parent.emit(i,e,r)})),o=this._chainOrCallHooks(o,"postAction"),o}if(this.parent&&this.parent.listenerCount(i))s(),this._processArguments(),this.parent.emit(i,e,r);else if(e.length){if(this._findCommand("*"))return this._dispatchSubcommand("*",e,r);this.listenerCount("command:*")?this.emit("command:*",e,r):this.commands.length?this.unknownCommand():(s(),this._processArguments())}else this.commands.length?(s(),this.help({error:!0})):(s(),this._processArguments())}_findCommand(e){if(e)return this.commands.find(r=>r._name===e||r._aliases.includes(e))}_findOption(e){return this.options.find(r=>r.is(e))}_checkForMissingMandatoryOptions(){this._getCommandAndAncestors().forEach(e=>{e.options.forEach(r=>{r.mandatory&&e.getOptionValue(r.attributeName())===void 0&&e.missingMandatoryOptionValue(r)})})}_checkForConflictingLocalOptions(){let e=this.options.filter(n=>{let s=n.attributeName();return this.getOptionValue(s)===void 0?!1:this.getOptionValueSource(s)!=="default"});e.filter(n=>n.conflictsWith.length>0).forEach(n=>{let s=e.find(i=>n.conflictsWith.includes(i.attributeName()));s&&this._conflictingOption(n,s)})}_checkForConflictingOptions(){this._getCommandAndAncestors().forEach(e=>{e._checkForConflictingLocalOptions()})}parseOptions(e){let r=[],n=[],s=r,i=e.slice();function o(c){return c.length>1&&c[0]==="-"}let a=null;for(;i.length;){let c=i.shift();if(c==="--"){s===n&&s.push(c),s.push(...i);break}if(a&&!o(c)){this.emit(`option:${a.name()}`,c);continue}if(a=null,o(c)){let l=this._findOption(c);if(l){if(l.required){let u=i.shift();u===void 0&&this.optionMissingArgument(l),this.emit(`option:${l.name()}`,u)}else if(l.optional){let u=null;i.length>0&&!o(i[0])&&(u=i.shift()),this.emit(`option:${l.name()}`,u)}else this.emit(`option:${l.name()}`);a=l.variadic?l:null;continue}}if(c.length>2&&c[0]==="-"&&c[1]!=="-"){let l=this._findOption(`-${c[1]}`);if(l){l.required||l.optional&&this._combineFlagAndOptionalValue?this.emit(`option:${l.name()}`,c.slice(2)):(this.emit(`option:${l.name()}`),i.unshift(`-${c.slice(2)}`));continue}}if(/^--[^=]+=/.test(c)){let l=c.indexOf("="),u=this._findOption(c.slice(0,l));if(u&&(u.required||u.optional)){this.emit(`option:${u.name()}`,c.slice(l+1));continue}}if(o(c)&&(s=n),(this._enablePositionalOptions||this._passThroughOptions)&&r.length===0&&n.length===0){if(this._findCommand(c)){r.push(c),i.length>0&&n.push(...i);break}else if(c===this._helpCommandName&&this._hasImplicitHelpCommand()){r.push(c),i.length>0&&r.push(...i);break}else if(this._defaultCommandName){n.push(c),i.length>0&&n.push(...i);break}}if(this._passThroughOptions){s.push(c),i.length>0&&s.push(...i);break}s.push(c)}return{operands:r,unknown:n}}opts(){if(this._storeOptionsAsProperties){let e={},r=this.options.length;for(let n=0;n<r;n++){let s=this.options[n].attributeName();e[s]=s===this._versionOptionName?this._version:this[s]}return e}return this._optionValues}optsWithGlobals(){return this._getCommandAndAncestors().reduce((e,r)=>Object.assign(e,r.opts()),{})}error(e,r){this._outputConfiguration.outputError(`${e}
`,this._outputConfiguration.writeErr),typeof this._showHelpAfterError=="string"?this._outputConfiguration.writeErr(`${this._showHelpAfterError}
`):this._showHelpAfterError&&(this._outputConfiguration.writeErr(`
`),this.outputHelp({error:!0}));let n=r||{},s=n.exitCode||1,i=n.code||"commander.error";this._exit(s,i,e)}_parseOptionsEnv(){this.options.forEach(e=>{if(e.envVar&&e.envVar in Ee.env){let r=e.attributeName();(this.getOptionValue(r)===void 0||["default","config","env"].includes(this.getOptionValueSource(r)))&&(e.required||e.optional?this.emit(`optionEnv:${e.name()}`,Ee.env[e.envVar]):this.emit(`optionEnv:${e.name()}`))}})}_parseOptionsImplied(){let e=new AT(this.options),r=n=>this.getOptionValue(n)!==void 0&&!["default","implied"].includes(this.getOptionValueSource(n));this.options.filter(n=>n.implied!==void 0&&r(n.attributeName())&&e.valueFromOption(this.getOptionValue(n.attributeName()),n)).forEach(n=>{Object.keys(n.implied).filter(s=>!r(s)).forEach(s=>{this.setOptionValueWithSource(s,n.implied[s],"implied")})})}missingArgument(e){let r=`error: missing required argument '${e}'`;this.error(r,{code:"commander.missingArgument"})}optionMissingArgument(e){let r=`error: option '${e.flags}' argument missing`;this.error(r,{code:"commander.optionMissingArgument"})}missingMandatoryOptionValue(e){let r=`error: required option '${e.flags}' not specified`;this.error(r,{code:"commander.missingMandatoryOptionValue"})}_conflictingOption(e,r){let n=o=>{let a=o.attributeName(),c=this.getOptionValue(a),l=this.options.find(f=>f.negate&&a===f.attributeName()),u=this.options.find(f=>!f.negate&&a===f.attributeName());return l&&(l.presetArg===void 0&&c===!1||l.presetArg!==void 0&&c===l.presetArg)?l:u||o},s=o=>{let a=n(o),c=a.attributeName();return this.getOptionValueSource(c)==="env"?`environment variable '${a.envVar}'`:`option '${a.flags}'`},i=`error: ${s(e)} cannot be used with ${s(r)}`;this.error(i,{code:"commander.conflictingOption"})}unknownOption(e){if(this._allowUnknownOption)return;let r="";if(e.startsWith("--")&&this._showSuggestionAfterError){let s=[],i=this;do{let o=i.createHelp().visibleOptions(i).filter(a=>a.long).map(a=>a.long);s=s.concat(o),i=i.parent}while(i&&!i._enablePositionalOptions);r=ep(e,s)}let n=`error: unknown option '${e}'${r}`;this.error(n,{code:"commander.unknownOption"})}_excessArguments(e){if(this._allowExcessArguments)return;let r=this.registeredArguments.length,n=r===1?"":"s",i=`error: too many arguments${this.parent?` for '${this.name()}'`:""}. Expected ${r} argument${n} but got ${e.length}.`;this.error(i,{code:"commander.excessArguments"})}unknownCommand(){let e=this.args[0],r="";if(this._showSuggestionAfterError){let s=[];this.createHelp().visibleCommands(this).forEach(i=>{s.push(i.name()),i.alias()&&s.push(i.alias())}),r=ep(e,s)}let n=`error: unknown command '${e}'${r}`;this.error(n,{code:"commander.unknownCommand"})}version(e,r,n){if(e===void 0)return this._version;this._version=e,r=r||"-V, --version",n=n||"output the version number";let s=this.createOption(r,n);return this._versionOptionName=s.attributeName(),this.options.push(s),this.on("option:"+s.name(),()=>{this._outputConfiguration.writeOut(`${e}
`),this._exit(0,"commander.version",e)}),this}description(e,r){return e===void 0&&r===void 0?this._description:(this._description=e,r&&(this._argsDescription=r),this)}summary(e){return e===void 0?this._summary:(this._summary=e,this)}alias(e){if(e===void 0)return this._aliases[0];let r=this;if(this.commands.length!==0&&this.commands[this.commands.length-1]._executableHandler&&(r=this.commands[this.commands.length-1]),e===r._name)throw new Error("Command alias can't be the same as its name");return r._aliases.push(e),this}aliases(e){return e===void 0?this._aliases:(e.forEach(r=>this.alias(r)),this)}usage(e){if(e===void 0){if(this._usage)return this._usage;let r=this.registeredArguments.map(n=>TT(n));return[].concat(this.options.length||this._hasHelpOption?"[options]":[],this.commands.length?"[command]":[],this.registeredArguments.length?r:[]).join(" ")}return this._usage=e,this}name(e){return e===void 0?this._name:(this._name=e,this)}nameFromFilename(e){return this._name=Ut.basename(e,Ut.extname(e)),this}executableDir(e){return e===void 0?this._executableDir:(this._executableDir=e,this)}helpInformation(e){let r=this.createHelp();return r.helpWidth===void 0&&(r.helpWidth=e&&e.error?this._outputConfiguration.getErrHelpWidth():this._outputConfiguration.getOutHelpWidth()),r.formatHelp(this,r)}_getHelpContext(e){e=e||{};let r={error:!!e.error},n;return r.error?n=s=>this._outputConfiguration.writeErr(s):n=s=>this._outputConfiguration.writeOut(s),r.write=e.write||n,r.command=this,r}outputHelp(e){let r;typeof e=="function"&&(r=e,e=void 0);let n=this._getHelpContext(e);this._getCommandAndAncestors().reverse().forEach(i=>i.emit("beforeAllHelp",n)),this.emit("beforeHelp",n);let s=this.helpInformation(n);if(r&&(s=r(s),typeof s!="string"&&!Buffer.isBuffer(s)))throw new Error("outputHelp callback must return a string or a Buffer");n.write(s),this._helpLongFlag&&this.emit(this._helpLongFlag),this.emit("afterHelp",n),this._getCommandAndAncestors().forEach(i=>i.emit("afterAllHelp",n))}helpOption(e,r){if(typeof e=="boolean")return this._hasHelpOption=e,this;this._helpFlags=e||this._helpFlags,this._helpDescription=r||this._helpDescription;let n=IT(this._helpFlags);return this._helpShortFlag=n.shortFlag,this._helpLongFlag=n.longFlag,this}help(e){this.outputHelp(e);let r=Ee.exitCode||0;r===0&&e&&typeof e!="function"&&e.error&&(r=1),this._exit(r,"commander.help","(outputHelp)")}addHelpText(e,r){let n=["beforeAll","before","after","afterAll"];if(!n.includes(e))throw new Error(`Unexpected value for position to addHelpText.
Expecting one of '${n.join("', '")}'`);let s=`${e}Help`;return this.on(s,i=>{let o;typeof r=="function"?o=r({error:i.error,command:i.command}):o=r,o&&i.write(`${o}
`)}),this}};function tp(t,e){t._hasHelpOption&&e.find(n=>n===t._helpLongFlag||n===t._helpShortFlag)&&(t.outputHelp(),t._exit(0,"commander.helpDisplayed","(outputHelp)"))}function rp(t){return t.map(e=>{if(!e.startsWith("--inspect"))return e;let r,n="127.0.0.1",s="9229",i;return(i=e.match(/^(--inspect(-brk)?)$/))!==null?r=i[1]:(i=e.match(/^(--inspect(-brk|-port)?)=([^:]+)$/))!==null?(r=i[1],/^\d+$/.test(i[3])?s=i[3]:n=i[3]):(i=e.match(/^(--inspect(-brk|-port)?)=([^:]+):(\d+)$/))!==null&&(r=i[1],n=i[3],s=i[4]),r&&s!=="0"?`${r}=${n}:${parseInt(s)+1}`:e})}np.Command=bc});var cp=m((Et,ap)=>{var{Argument:$T}=Ei(),{Command:ip}=sp(),{CommanderError:LT,InvalidArgumentError:op}=Bn(),{Help:NT}=gc(),{Option:OT}=vc();Et=ap.exports=new ip;Et.program=Et;Et.Command=ip;Et.Option=OT;Et.Argument=$T;Et.Help=NT;Et.CommanderError=LT;Et.InvalidArgumentError=op;Et.InvalidOptionArgumentError=op});var mp=m((V5,pp)=>{"use strict";pp.exports={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]}});var $c=m((B5,gp)=>{var Hn=mp(),_p={};for(let t of Object.keys(Hn))_p[Hn[t]]=t;var x={rgb:{channels:3,labels:"rgb"},hsl:{channels:3,labels:"hsl"},hsv:{channels:3,labels:"hsv"},hwb:{channels:3,labels:"hwb"},cmyk:{channels:4,labels:"cmyk"},xyz:{channels:3,labels:"xyz"},lab:{channels:3,labels:"lab"},lch:{channels:3,labels:"lch"},hex:{channels:1,labels:["hex"]},keyword:{channels:1,labels:["keyword"]},ansi16:{channels:1,labels:["ansi16"]},ansi256:{channels:1,labels:["ansi256"]},hcg:{channels:3,labels:["h","c","g"]},apple:{channels:3,labels:["r16","g16","b16"]},gray:{channels:1,labels:["gray"]}};gp.exports=x;for(let t of Object.keys(x)){if(!("channels"in x[t]))throw new Error("missing channels property: "+t);if(!("labels"in x[t]))throw new Error("missing channel labels property: "+t);if(x[t].labels.length!==x[t].channels)throw new Error("channel and label counts mismatch: "+t);let{channels:e,labels:r}=x[t];delete x[t].channels,delete x[t].labels,Object.defineProperty(x[t],"channels",{value:e}),Object.defineProperty(x[t],"labels",{value:r})}x.rgb.hsl=function(t){let e=t[0]/255,r=t[1]/255,n=t[2]/255,s=Math.min(e,r,n),i=Math.max(e,r,n),o=i-s,a,c;i===s?a=0:e===i?a=(r-n)/o:r===i?a=2+(n-e)/o:n===i&&(a=4+(e-r)/o),a=Math.min(a*60,360),a<0&&(a+=360);let l=(s+i)/2;return i===s?c=0:l<=.5?c=o/(i+s):c=o/(2-i-s),[a,c*100,l*100]};x.rgb.hsv=function(t){let e,r,n,s,i,o=t[0]/255,a=t[1]/255,c=t[2]/255,l=Math.max(o,a,c),u=l-Math.min(o,a,c),f=function(d){return(l-d)/6/u+1/2};return u===0?(s=0,i=0):(i=u/l,e=f(o),r=f(a),n=f(c),o===l?s=n-r:a===l?s=1/3+e-n:c===l&&(s=2/3+r-e),s<0?s+=1:s>1&&(s-=1)),[s*360,i*100,l*100]};x.rgb.hwb=function(t){let e=t[0],r=t[1],n=t[2],s=x.rgb.hsl(t)[0],i=1/255*Math.min(e,Math.min(r,n));return n=1-1/255*Math.max(e,Math.max(r,n)),[s,i*100,n*100]};x.rgb.cmyk=function(t){let e=t[0]/255,r=t[1]/255,n=t[2]/255,s=Math.min(1-e,1-r,1-n),i=(1-e-s)/(1-s)||0,o=(1-r-s)/(1-s)||0,a=(1-n-s)/(1-s)||0;return[i*100,o*100,a*100,s*100]};function xT(t,e){return(t[0]-e[0])**2+(t[1]-e[1])**2+(t[2]-e[2])**2}x.rgb.keyword=function(t){let e=_p[t];if(e)return e;let r=1/0,n;for(let s of Object.keys(Hn)){let i=Hn[s],o=xT(t,i);o<r&&(r=o,n=s)}return n};x.keyword.rgb=function(t){return Hn[t]};x.rgb.xyz=function(t){let e=t[0]/255,r=t[1]/255,n=t[2]/255;e=e>.04045?((e+.055)/1.055)**2.4:e/12.92,r=r>.04045?((r+.055)/1.055)**2.4:r/12.92,n=n>.04045?((n+.055)/1.055)**2.4:n/12.92;let s=e*.4124+r*.3576+n*.1805,i=e*.2126+r*.7152+n*.0722,o=e*.0193+r*.1192+n*.9505;return[s*100,i*100,o*100]};x.rgb.lab=function(t){let e=x.rgb.xyz(t),r=e[0],n=e[1],s=e[2];r/=95.047,n/=100,s/=108.883,r=r>.008856?r**(1/3):7.787*r+16/116,n=n>.008856?n**(1/3):7.787*n+16/116,s=s>.008856?s**(1/3):7.787*s+16/116;let i=116*n-16,o=500*(r-n),a=200*(n-s);return[i,o,a]};x.hsl.rgb=function(t){let e=t[0]/360,r=t[1]/100,n=t[2]/100,s,i,o;if(r===0)return o=n*255,[o,o,o];n<.5?s=n*(1+r):s=n+r-n*r;let a=2*n-s,c=[0,0,0];for(let l=0;l<3;l++)i=e+1/3*-(l-1),i<0&&i++,i>1&&i--,6*i<1?o=a+(s-a)*6*i:2*i<1?o=s:3*i<2?o=a+(s-a)*(2/3-i)*6:o=a,c[l]=o*255;return c};x.hsl.hsv=function(t){let e=t[0],r=t[1]/100,n=t[2]/100,s=r,i=Math.max(n,.01);n*=2,r*=n<=1?n:2-n,s*=i<=1?i:2-i;let o=(n+r)/2,a=n===0?2*s/(i+s):2*r/(n+r);return[e,a*100,o*100]};x.hsv.rgb=function(t){let e=t[0]/60,r=t[1]/100,n=t[2]/100,s=Math.floor(e)%6,i=e-Math.floor(e),o=255*n*(1-r),a=255*n*(1-r*i),c=255*n*(1-r*(1-i));switch(n*=255,s){case 0:return[n,c,o];case 1:return[a,n,o];case 2:return[o,n,c];case 3:return[o,a,n];case 4:return[c,o,n];case 5:return[n,o,a]}};x.hsv.hsl=function(t){let e=t[0],r=t[1]/100,n=t[2]/100,s=Math.max(n,.01),i,o;o=(2-r)*n;let a=(2-r)*s;return i=r*s,i/=a<=1?a:2-a,i=i||0,o/=2,[e,i*100,o*100]};x.hwb.rgb=function(t){let e=t[0]/360,r=t[1]/100,n=t[2]/100,s=r+n,i;s>1&&(r/=s,n/=s);let o=Math.floor(6*e),a=1-n;i=6*e-o,(o&1)!==0&&(i=1-i);let c=r+i*(a-r),l,u,f;switch(o){default:case 6:case 0:l=a,u=c,f=r;break;case 1:l=c,u=a,f=r;break;case 2:l=r,u=a,f=c;break;case 3:l=r,u=c,f=a;break;case 4:l=c,u=r,f=a;break;case 5:l=a,u=r,f=c;break}return[l*255,u*255,f*255]};x.cmyk.rgb=function(t){let e=t[0]/100,r=t[1]/100,n=t[2]/100,s=t[3]/100,i=1-Math.min(1,e*(1-s)+s),o=1-Math.min(1,r*(1-s)+s),a=1-Math.min(1,n*(1-s)+s);return[i*255,o*255,a*255]};x.xyz.rgb=function(t){let e=t[0]/100,r=t[1]/100,n=t[2]/100,s,i,o;return s=e*3.2406+r*-1.5372+n*-.4986,i=e*-.9689+r*1.8758+n*.0415,o=e*.0557+r*-.204+n*1.057,s=s>.0031308?1.055*s**(1/2.4)-.055:s*12.92,i=i>.0031308?1.055*i**(1/2.4)-.055:i*12.92,o=o>.0031308?1.055*o**(1/2.4)-.055:o*12.92,s=Math.min(Math.max(0,s),1),i=Math.min(Math.max(0,i),1),o=Math.min(Math.max(0,o),1),[s*255,i*255,o*255]};x.xyz.lab=function(t){let e=t[0],r=t[1],n=t[2];e/=95.047,r/=100,n/=108.883,e=e>.008856?e**(1/3):7.787*e+16/116,r=r>.008856?r**(1/3):7.787*r+16/116,n=n>.008856?n**(1/3):7.787*n+16/116;let s=116*r-16,i=500*(e-r),o=200*(r-n);return[s,i,o]};x.lab.xyz=function(t){let e=t[0],r=t[1],n=t[2],s,i,o;i=(e+16)/116,s=r/500+i,o=i-n/200;let a=i**3,c=s**3,l=o**3;return i=a>.008856?a:(i-16/116)/7.787,s=c>.008856?c:(s-16/116)/7.787,o=l>.008856?l:(o-16/116)/7.787,s*=95.047,i*=100,o*=108.883,[s,i,o]};x.lab.lch=function(t){let e=t[0],r=t[1],n=t[2],s;s=Math.atan2(n,r)*360/2/Math.PI,s<0&&(s+=360);let o=Math.sqrt(r*r+n*n);return[e,o,s]};x.lch.lab=function(t){let e=t[0],r=t[1],s=t[2]/360*2*Math.PI,i=r*Math.cos(s),o=r*Math.sin(s);return[e,i,o]};x.rgb.ansi16=function(t,e=null){let[r,n,s]=t,i=e===null?x.rgb.hsv(t)[2]:e;if(i=Math.round(i/50),i===0)return 30;let o=30+(Math.round(s/255)<<2|Math.round(n/255)<<1|Math.round(r/255));return i===2&&(o+=60),o};x.hsv.ansi16=function(t){return x.rgb.ansi16(x.hsv.rgb(t),t[2])};x.rgb.ansi256=function(t){let e=t[0],r=t[1],n=t[2];return e===r&&r===n?e<8?16:e>248?231:Math.round((e-8)/247*24)+232:16+36*Math.round(e/255*5)+6*Math.round(r/255*5)+Math.round(n/255*5)};x.ansi16.rgb=function(t){let e=t%10;if(e===0||e===7)return t>50&&(e+=3.5),e=e/10.5*255,[e,e,e];let r=(~~(t>50)+1)*.5,n=(e&1)*r*255,s=(e>>1&1)*r*255,i=(e>>2&1)*r*255;return[n,s,i]};x.ansi256.rgb=function(t){if(t>=232){let i=(t-232)*10+8;return[i,i,i]}t-=16;let e,r=Math.floor(t/36)/5*255,n=Math.floor((e=t%36)/6)/5*255,s=e%6/5*255;return[r,n,s]};x.rgb.hex=function(t){let r=(((Math.round(t[0])&255)<<16)+((Math.round(t[1])&255)<<8)+(Math.round(t[2])&255)).toString(16).toUpperCase();return"000000".substring(r.length)+r};x.hex.rgb=function(t){let e=t.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);if(!e)return[0,0,0];let r=e[0];e[0].length===3&&(r=r.split("").map(a=>a+a).join(""));let n=parseInt(r,16),s=n>>16&255,i=n>>8&255,o=n&255;return[s,i,o]};x.rgb.hcg=function(t){let e=t[0]/255,r=t[1]/255,n=t[2]/255,s=Math.max(Math.max(e,r),n),i=Math.min(Math.min(e,r),n),o=s-i,a,c;return o<1?a=i/(1-o):a=0,o<=0?c=0:s===e?c=(r-n)/o%6:s===r?c=2+(n-e)/o:c=4+(e-r)/o,c/=6,c%=1,[c*360,o*100,a*100]};x.hsl.hcg=function(t){let e=t[1]/100,r=t[2]/100,n=r<.5?2*e*r:2*e*(1-r),s=0;return n<1&&(s=(r-.5*n)/(1-n)),[t[0],n*100,s*100]};x.hsv.hcg=function(t){let e=t[1]/100,r=t[2]/100,n=e*r,s=0;return n<1&&(s=(r-n)/(1-n)),[t[0],n*100,s*100]};x.hcg.rgb=function(t){let e=t[0]/360,r=t[1]/100,n=t[2]/100;if(r===0)return[n*255,n*255,n*255];let s=[0,0,0],i=e%1*6,o=i%1,a=1-o,c=0;switch(Math.floor(i)){case 0:s[0]=1,s[1]=o,s[2]=0;break;case 1:s[0]=a,s[1]=1,s[2]=0;break;case 2:s[0]=0,s[1]=1,s[2]=o;break;case 3:s[0]=0,s[1]=a,s[2]=1;break;case 4:s[0]=o,s[1]=0,s[2]=1;break;default:s[0]=1,s[1]=0,s[2]=a}return c=(1-r)*n,[(r*s[0]+c)*255,(r*s[1]+c)*255,(r*s[2]+c)*255]};x.hcg.hsv=function(t){let e=t[1]/100,r=t[2]/100,n=e+r*(1-e),s=0;return n>0&&(s=e/n),[t[0],s*100,n*100]};x.hcg.hsl=function(t){let e=t[1]/100,n=t[2]/100*(1-e)+.5*e,s=0;return n>0&&n<.5?s=e/(2*n):n>=.5&&n<1&&(s=e/(2*(1-n))),[t[0],s*100,n*100]};x.hcg.hwb=function(t){let e=t[1]/100,r=t[2]/100,n=e+r*(1-e);return[t[0],(n-e)*100,(1-n)*100]};x.hwb.hcg=function(t){let e=t[1]/100,n=1-t[2]/100,s=n-e,i=0;return s<1&&(i=(n-s)/(1-s)),[t[0],s*100,i*100]};x.apple.rgb=function(t){return[t[0]/65535*255,t[1]/65535*255,t[2]/65535*255]};x.rgb.apple=function(t){return[t[0]/255*65535,t[1]/255*65535,t[2]/255*65535]};x.gray.rgb=function(t){return[t[0]/100*255,t[0]/100*255,t[0]/100*255]};x.gray.hsl=function(t){return[0,0,t[0]]};x.gray.hsv=x.gray.hsl;x.gray.hwb=function(t){return[0,100,t[0]]};x.gray.cmyk=function(t){return[0,0,0,t[0]]};x.gray.lab=function(t){return[t[0],0,0]};x.gray.hex=function(t){let e=Math.round(t[0]/100*255)&255,n=((e<<16)+(e<<8)+e).toString(16).toUpperCase();return"000000".substring(n.length)+n};x.rgb.gray=function(t){return[(t[0]+t[1]+t[2])/3/255*100]}});var Ep=m((H5,yp)=>{var wi=$c();function jT(){let t={},e=Object.keys(wi);for(let r=e.length,n=0;n<r;n++)t[e[n]]={distance:-1,parent:null};return t}function DT(t){let e=jT(),r=[t];for(e[t].distance=0;r.length;){let n=r.pop(),s=Object.keys(wi[n]);for(let i=s.length,o=0;o<i;o++){let a=s[o],c=e[a];c.distance===-1&&(c.distance=e[n].distance+1,c.parent=n,r.unshift(a))}}return e}function FT(t,e){return function(r){return e(t(r))}}function UT(t,e){let r=[e[t].parent,t],n=wi[e[t].parent][t],s=e[t].parent;for(;e[s].parent;)r.unshift(e[s].parent),n=FT(wi[e[s].parent][s],n),s=e[s].parent;return n.conversion=r,n}yp.exports=function(t){let e=DT(t),r={},n=Object.keys(e);for(let s=n.length,i=0;i<s;i++){let o=n[i];e[o].parent!==null&&(r[o]=UT(o,e))}return r}});var wp=m((W5,vp)=>{var Lc=$c(),VT=Ep(),Qr={},BT=Object.keys(Lc);function HT(t){let e=function(...r){let n=r[0];return n==null?n:(n.length>1&&(r=n),t(r))};return"conversion"in t&&(e.conversion=t.conversion),e}function WT(t){let e=function(...r){let n=r[0];if(n==null)return n;n.length>1&&(r=n);let s=t(r);if(typeof s=="object")for(let i=s.length,o=0;o<i;o++)s[o]=Math.round(s[o]);return s};return"conversion"in t&&(e.conversion=t.conversion),e}BT.forEach(t=>{Qr[t]={},Object.defineProperty(Qr[t],"channels",{value:Lc[t].channels}),Object.defineProperty(Qr[t],"labels",{value:Lc[t].labels});let e=VT(t);Object.keys(e).forEach(n=>{let s=e[n];Qr[t][n]=WT(s),Qr[t][n].raw=HT(s)})});vp.exports=Qr});var $p=m((K5,Ap)=>{"use strict";var Sp=(t,e)=>(...r)=>`\x1B[${t(...r)+e}m`,Tp=(t,e)=>(...r)=>{let n=t(...r);return`\x1B[${38+e};5;${n}m`},bp=(t,e)=>(...r)=>{let n=t(...r);return`\x1B[${38+e};2;${n[0]};${n[1]};${n[2]}m`},Si=t=>t,Ip=(t,e,r)=>[t,e,r],Zr=(t,e,r)=>{Object.defineProperty(t,e,{get:()=>{let n=r();return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0}),n},enumerable:!0,configurable:!0})},Nc,en=(t,e,r,n)=>{Nc===void 0&&(Nc=wp());let s=n?10:0,i={};for(let[o,a]of Object.entries(Nc)){let c=o==="ansi16"?"ansi":o;o===e?i[c]=t(r,s):typeof a=="object"&&(i[c]=t(a[e],s))}return i};function KT(){let t=new Map,e={modifier:{reset:[0,0],bold:[1,22],dim:[2,22],italic:[3,23],underline:[4,24],inverse:[7,27],hidden:[8,28],strikethrough:[9,29]},color:{black:[30,39],red:[31,39],green:[32,39],yellow:[33,39],blue:[34,39],magenta:[35,39],cyan:[36,39],white:[37,39],blackBright:[90,39],redBright:[91,39],greenBright:[92,39],yellowBright:[93,39],blueBright:[94,39],magentaBright:[95,39],cyanBright:[96,39],whiteBright:[97,39]},bgColor:{bgBlack:[40,49],bgRed:[41,49],bgGreen:[42,49],bgYellow:[43,49],bgBlue:[44,49],bgMagenta:[45,49],bgCyan:[46,49],bgWhite:[47,49],bgBlackBright:[100,49],bgRedBright:[101,49],bgGreenBright:[102,49],bgYellowBright:[103,49],bgBlueBright:[104,49],bgMagentaBright:[105,49],bgCyanBright:[106,49],bgWhiteBright:[107,49]}};e.color.gray=e.color.blackBright,e.bgColor.bgGray=e.bgColor.bgBlackBright,e.color.grey=e.color.blackBright,e.bgColor.bgGrey=e.bgColor.bgBlackBright;for(let[r,n]of Object.entries(e)){for(let[s,i]of Object.entries(n))e[s]={open:`\x1B[${i[0]}m`,close:`\x1B[${i[1]}m`},n[s]=e[s],t.set(i[0],i[1]);Object.defineProperty(e,r,{value:n,enumerable:!1})}return Object.defineProperty(e,"codes",{value:t,enumerable:!1}),e.color.close="\x1B[39m",e.bgColor.close="\x1B[49m",Zr(e.color,"ansi",()=>en(Sp,"ansi16",Si,!1)),Zr(e.color,"ansi256",()=>en(Tp,"ansi256",Si,!1)),Zr(e.color,"ansi16m",()=>en(bp,"rgb",Ip,!1)),Zr(e.bgColor,"ansi",()=>en(Sp,"ansi16",Si,!0)),Zr(e.bgColor,"ansi256",()=>en(Tp,"ansi256",Si,!0)),Zr(e.bgColor,"ansi16m",()=>en(bp,"rgb",Ip,!0)),e}Object.defineProperty(Ap,"exports",{enumerable:!0,get:KT})});var Np=m((G5,Lp)=>{"use strict";Lp.exports=(t,e=process.argv)=>{let r=t.startsWith("-")?"":t.length===1?"-":"--",n=e.indexOf(r+t),s=e.indexOf("--");return n!==-1&&(s===-1||n<s)}});var Rp=m((z5,Pp)=>{"use strict";var GT=Q("os"),Op=Q("tty"),lt=Np(),{env:Oe}=process,tr;lt("no-color")||lt("no-colors")||lt("color=false")||lt("color=never")?tr=0:(lt("color")||lt("colors")||lt("color=true")||lt("color=always"))&&(tr=1);"FORCE_COLOR"in Oe&&(Oe.FORCE_COLOR==="true"?tr=1:Oe.FORCE_COLOR==="false"?tr=0:tr=Oe.FORCE_COLOR.length===0?1:Math.min(parseInt(Oe.FORCE_COLOR,10),3));function Oc(t){return t===0?!1:{level:t,hasBasic:!0,has256:t>=2,has16m:t>=3}}function Pc(t,e){if(tr===0)return 0;if(lt("color=16m")||lt("color=full")||lt("color=truecolor"))return 3;if(lt("color=256"))return 2;if(t&&!e&&tr===void 0)return 0;let r=tr||0;if(Oe.TERM==="dumb")return r;if(process.platform==="win32"){let n=GT.release().split(".");return Number(n[0])>=10&&Number(n[2])>=10586?Number(n[2])>=14931?3:2:1}if("CI"in Oe)return["TRAVIS","CIRCLECI","APPVEYOR","GITLAB_CI","GITHUB_ACTIONS","BUILDKITE"].some(n=>n in Oe)||Oe.CI_NAME==="codeship"?1:r;if("TEAMCITY_VERSION"in Oe)return/^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(Oe.TEAMCITY_VERSION)?1:0;if(Oe.COLORTERM==="truecolor")return 3;if("TERM_PROGRAM"in Oe){let n=parseInt((Oe.TERM_PROGRAM_VERSION||"").split(".")[0],10);switch(Oe.TERM_PROGRAM){case"iTerm.app":return n>=3?3:2;case"Apple_Terminal":return 2}}return/-256(color)?$/i.test(Oe.TERM)?2:/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(Oe.TERM)||"COLORTERM"in Oe?1:r}function zT(t){let e=Pc(t,t&&t.isTTY);return Oc(e)}Pp.exports={supportsColor:zT,stdout:Oc(Pc(!0,Op.isatty(1))),stderr:Oc(Pc(!0,Op.isatty(2)))}});var kp=m((J5,Cp)=>{"use strict";var JT=(t,e,r)=>{let n=t.indexOf(e);if(n===-1)return t;let s=e.length,i=0,o="";do o+=t.substr(i,n-i)+e+r,i=n+s,n=t.indexOf(e,i);while(n!==-1);return o+=t.substr(i),o},YT=(t,e,r,n)=>{let s=0,i="";do{let o=t[n-1]==="\r";i+=t.substr(s,(o?n-1:n)-s)+e+(o?`\r
`:`
`)+r,s=n+1,n=t.indexOf(`
`,s)}while(n!==-1);return i+=t.substr(s),i};Cp.exports={stringReplaceAll:JT,stringEncaseCRLFWithFirstIndex:YT}});var Dp=m((Y5,jp)=>{"use strict";var XT=/(?:\\(u(?:[a-f\d]{4}|\{[a-f\d]{1,6}\})|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi,qp=/(?:^|\.)(\w+)(?:\(([^)]*)\))?/g,QT=/^(['"])((?:\\.|(?!\1)[^\\])*)\1$/,ZT=/\\(u(?:[a-f\d]{4}|{[a-f\d]{1,6}})|x[a-f\d]{2}|.)|([^\\])/gi,eb=new Map([["n",`
`],["r","\r"],["t","	"],["b","\b"],["f","\f"],["v","\v"],["0","\0"],["\\","\\"],["e","\x1B"],["a","\x07"]]);function xp(t){let e=t[0]==="u",r=t[1]==="{";return e&&!r&&t.length===5||t[0]==="x"&&t.length===3?String.fromCharCode(parseInt(t.slice(1),16)):e&&r?String.fromCodePoint(parseInt(t.slice(2,-1),16)):eb.get(t)||t}function tb(t,e){let r=[],n=e.trim().split(/\s*,\s*/g),s;for(let i of n){let o=Number(i);if(!Number.isNaN(o))r.push(o);else if(s=i.match(QT))r.push(s[2].replace(ZT,(a,c,l)=>c?xp(c):l));else throw new Error(`Invalid Chalk template style argument: ${i} (in style '${t}')`)}return r}function rb(t){qp.lastIndex=0;let e=[],r;for(;(r=qp.exec(t))!==null;){let n=r[1];if(r[2]){let s=tb(n,r[2]);e.push([n].concat(s))}else e.push([n])}return e}function Mp(t,e){let r={};for(let s of e)for(let i of s.styles)r[i[0]]=s.inverse?null:i.slice(1);let n=t;for(let[s,i]of Object.entries(r))if(Array.isArray(i)){if(!(s in n))throw new Error(`Unknown Chalk style: ${s}`);n=i.length>0?n[s](...i):n[s]}return n}jp.exports=(t,e)=>{let r=[],n=[],s=[];if(e.replace(XT,(i,o,a,c,l,u)=>{if(o)s.push(xp(o));else if(c){let f=s.join("");s=[],n.push(r.length===0?f:Mp(t,r)(f)),r.push({inverse:a,styles:rb(c)})}else if(l){if(r.length===0)throw new Error("Found extraneous } in Chalk template literal");n.push(Mp(t,r)(s.join(""))),s=[],r.pop()}else s.push(u)}),n.push(s.join("")),r.length>0){let i=`Chalk template literal is missing ${r.length} closing bracket${r.length===1?"":"s"} (\`}\`)`;throw new Error(i)}return n.join("")}});var Kp=m((X5,Wp)=>{"use strict";var Wn=$p(),{stdout:Cc,stderr:kc}=Rp(),{stringReplaceAll:nb,stringEncaseCRLFWithFirstIndex:sb}=kp(),{isArray:Ti}=Array,Up=["ansi","ansi","ansi256","ansi16m"],tn=Object.create(null),ib=(t,e={})=>{if(e.level&&!(Number.isInteger(e.level)&&e.level>=0&&e.level<=3))throw new Error("The `level` option should be an integer from 0 to 3");let r=Cc?Cc.level:0;t.level=e.level===void 0?r:e.level},qc=class{constructor(e){return Vp(e)}},Vp=t=>{let e={};return ib(e,t),e.template=(...r)=>Hp(e.template,...r),Object.setPrototypeOf(e,bi.prototype),Object.setPrototypeOf(e.template,e),e.template.constructor=()=>{throw new Error("`chalk.constructor()` is deprecated. Use `new chalk.Instance()` instead.")},e.template.Instance=qc,e.template};function bi(t){return Vp(t)}for(let[t,e]of Object.entries(Wn))tn[t]={get(){let r=Ii(this,Mc(e.open,e.close,this._styler),this._isEmpty);return Object.defineProperty(this,t,{value:r}),r}};tn.visible={get(){let t=Ii(this,this._styler,!0);return Object.defineProperty(this,"visible",{value:t}),t}};var Bp=["rgb","hex","keyword","hsl","hsv","hwb","ansi","ansi256"];for(let t of Bp)tn[t]={get(){let{level:e}=this;return function(...r){let n=Mc(Wn.color[Up[e]][t](...r),Wn.color.close,this._styler);return Ii(this,n,this._isEmpty)}}};for(let t of Bp){let e="bg"+t[0].toUpperCase()+t.slice(1);tn[e]={get(){let{level:r}=this;return function(...n){let s=Mc(Wn.bgColor[Up[r]][t](...n),Wn.bgColor.close,this._styler);return Ii(this,s,this._isEmpty)}}}}var ob=Object.defineProperties(()=>{},{...tn,level:{enumerable:!0,get(){return this._generator.level},set(t){this._generator.level=t}}}),Mc=(t,e,r)=>{let n,s;return r===void 0?(n=t,s=e):(n=r.openAll+t,s=e+r.closeAll),{open:t,close:e,openAll:n,closeAll:s,parent:r}},Ii=(t,e,r)=>{let n=(...s)=>Ti(s[0])&&Ti(s[0].raw)?Fp(n,Hp(n,...s)):Fp(n,s.length===1?""+s[0]:s.join(" "));return Object.setPrototypeOf(n,ob),n._generator=t,n._styler=e,n._isEmpty=r,n},Fp=(t,e)=>{if(t.level<=0||!e)return t._isEmpty?"":e;let r=t._styler;if(r===void 0)return e;let{openAll:n,closeAll:s}=r;if(e.indexOf("\x1B")!==-1)for(;r!==void 0;)e=nb(e,r.close,r.open),r=r.parent;let i=e.indexOf(`
`);return i!==-1&&(e=sb(e,s,n,i)),n+e+s},Rc,Hp=(t,...e)=>{let[r]=e;if(!Ti(r)||!Ti(r.raw))return e.join(" ");let n=e.slice(1),s=[r.raw[0]];for(let i=1;i<r.length;i++)s.push(String(n[i-1]).replace(/[{}\\]/g,"\\$&"),String(r.raw[i]));return Rc===void 0&&(Rc=Dp()),Rc(t,s.join(""))};Object.defineProperties(bi.prototype,tn);var Ai=bi();Ai.supportsColor=Cc;Ai.stderr=bi({level:kc?kc.level:0});Ai.stderr.supportsColor=kc;Wp.exports=Ai});var zp=m((Z5,ub)=>{ub.exports={name:"dotenv",version:"16.6.1",description:"Loads environment variables from .env file",main:"lib/main.js",types:"lib/main.d.ts",exports:{".":{types:"./lib/main.d.ts",require:"./lib/main.js",default:"./lib/main.js"},"./config":"./config.js","./config.js":"./config.js","./lib/env-options":"./lib/env-options.js","./lib/env-options.js":"./lib/env-options.js","./lib/cli-options":"./lib/cli-options.js","./lib/cli-options.js":"./lib/cli-options.js","./package.json":"./package.json"},scripts:{"dts-check":"tsc --project tests/types/tsconfig.json",lint:"standard",pretest:"npm run lint && npm run dts-check",test:"tap run --allow-empty-coverage --disable-coverage --timeout=60000","test:coverage":"tap run --show-full-coverage --timeout=60000 --coverage-report=text --coverage-report=lcov",prerelease:"npm test",release:"standard-version"},repository:{type:"git",url:"git://github.com/motdotla/dotenv.git"},homepage:"https://github.com/motdotla/dotenv#readme",funding:"https://dotenvx.com",keywords:["dotenv","env",".env","environment","variables","config","settings"],readmeFilename:"README.md",license:"BSD-2-Clause",devDependencies:{"@types/node":"^18.11.3",decache:"^4.6.2",sinon:"^14.0.1",standard:"^17.0.0","standard-version":"^9.5.0",tap:"^19.2.0",typescript:"^4.8.4"},engines:{node:">=12"},browser:{fs:!1}}});var Zp=m((e3,Vt)=>{var xc=Q("fs"),Li=Q("path"),fb=Q("os"),db=Q("crypto"),hb=zp(),jc=hb.version,pb=/(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;function mb(t){let e={},r=t.toString();r=r.replace(/\r\n?/mg,`
`);let n;for(;(n=pb.exec(r))!=null;){let s=n[1],i=n[2]||"";i=i.trim();let o=i[0];i=i.replace(/^(['"`])([\s\S]*)\1$/mg,"$2"),o==='"'&&(i=i.replace(/\\n/g,`
`),i=i.replace(/\\r/g,"\r")),e[s]=i}return e}function _b(t){t=t||{};let e=Qp(t);t.path=e;let r=$e.configDotenv(t);if(!r.parsed){let o=new Error(`MISSING_DATA: Cannot parse ${e} for an unknown reason`);throw o.code="MISSING_DATA",o}let n=Xp(t).split(","),s=n.length,i;for(let o=0;o<s;o++)try{let a=n[o].trim(),c=yb(r,a);i=$e.decrypt(c.ciphertext,c.key);break}catch(a){if(o+1>=s)throw a}return $e.parse(i)}function gb(t){console.log(`[dotenv@${jc}][WARN] ${t}`)}function Kn(t){console.log(`[dotenv@${jc}][DEBUG] ${t}`)}function Yp(t){console.log(`[dotenv@${jc}] ${t}`)}function Xp(t){return t&&t.DOTENV_KEY&&t.DOTENV_KEY.length>0?t.DOTENV_KEY:process.env.DOTENV_KEY&&process.env.DOTENV_KEY.length>0?process.env.DOTENV_KEY:""}function yb(t,e){let r;try{r=new URL(e)}catch(a){if(a.code==="ERR_INVALID_URL"){let c=new Error("INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenvx.com/vault/.env.vault?environment=development");throw c.code="INVALID_DOTENV_KEY",c}throw a}let n=r.password;if(!n){let a=new Error("INVALID_DOTENV_KEY: Missing key part");throw a.code="INVALID_DOTENV_KEY",a}let s=r.searchParams.get("environment");if(!s){let a=new Error("INVALID_DOTENV_KEY: Missing environment part");throw a.code="INVALID_DOTENV_KEY",a}let i=`DOTENV_VAULT_${s.toUpperCase()}`,o=t.parsed[i];if(!o){let a=new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${i} in your .env.vault file.`);throw a.code="NOT_FOUND_DOTENV_ENVIRONMENT",a}return{ciphertext:o,key:n}}function Qp(t){let e=null;if(t&&t.path&&t.path.length>0)if(Array.isArray(t.path))for(let r of t.path)xc.existsSync(r)&&(e=r.endsWith(".vault")?r:`${r}.vault`);else e=t.path.endsWith(".vault")?t.path:`${t.path}.vault`;else e=Li.resolve(process.cwd(),".env.vault");return xc.existsSync(e)?e:null}function Jp(t){return t[0]==="~"?Li.join(fb.homedir(),t.slice(1)):t}function Eb(t){let e=!!(t&&t.debug),r=t&&"quiet"in t?t.quiet:!0;(e||!r)&&Yp("Loading env from encrypted .env.vault");let n=$e._parseVault(t),s=process.env;return t&&t.processEnv!=null&&(s=t.processEnv),$e.populate(s,n,t),{parsed:n}}function vb(t){let e=Li.resolve(process.cwd(),".env"),r="utf8",n=!!(t&&t.debug),s=t&&"quiet"in t?t.quiet:!0;t&&t.encoding?r=t.encoding:n&&Kn("No encoding is specified. UTF-8 is used by default");let i=[e];if(t&&t.path)if(!Array.isArray(t.path))i=[Jp(t.path)];else{i=[];for(let l of t.path)i.push(Jp(l))}let o,a={};for(let l of i)try{let u=$e.parse(xc.readFileSync(l,{encoding:r}));$e.populate(a,u,t)}catch(u){n&&Kn(`Failed to load ${l} ${u.message}`),o=u}let c=process.env;if(t&&t.processEnv!=null&&(c=t.processEnv),$e.populate(c,a,t),n||!s){let l=Object.keys(a).length,u=[];for(let f of i)try{let d=Li.relative(process.cwd(),f);u.push(d)}catch(d){n&&Kn(`Failed to load ${f} ${d.message}`),o=d}Yp(`injecting env (${l}) from ${u.join(",")}`)}return o?{parsed:a,error:o}:{parsed:a}}function wb(t){if(Xp(t).length===0)return $e.configDotenv(t);let e=Qp(t);return e?$e._configVault(t):(gb(`You set DOTENV_KEY but you are missing a .env.vault file at ${e}. Did you forget to build it?`),$e.configDotenv(t))}function Sb(t,e){let r=Buffer.from(e.slice(-64),"hex"),n=Buffer.from(t,"base64"),s=n.subarray(0,12),i=n.subarray(-16);n=n.subarray(12,-16);try{let o=db.createDecipheriv("aes-256-gcm",r,s);return o.setAuthTag(i),`${o.update(n)}${o.final()}`}catch(o){let a=o instanceof RangeError,c=o.message==="Invalid key length",l=o.message==="Unsupported state or unable to authenticate data";if(a||c){let u=new Error("INVALID_DOTENV_KEY: It must be 64 characters long (or more)");throw u.code="INVALID_DOTENV_KEY",u}else if(l){let u=new Error("DECRYPTION_FAILED: Please check your DOTENV_KEY");throw u.code="DECRYPTION_FAILED",u}else throw o}}function Tb(t,e,r={}){let n=!!(r&&r.debug),s=!!(r&&r.override);if(typeof e!="object"){let i=new Error("OBJECT_REQUIRED: Please check the processEnv argument being passed to populate");throw i.code="OBJECT_REQUIRED",i}for(let i of Object.keys(e))Object.prototype.hasOwnProperty.call(t,i)?(s===!0&&(t[i]=e[i]),n&&Kn(s===!0?`"${i}" is already defined and WAS overwritten`:`"${i}" is already defined and was NOT overwritten`)):t[i]=e[i]}var $e={configDotenv:vb,_configVault:Eb,_parseVault:_b,config:wb,decrypt:Sb,parse:mb,populate:Tb};Vt.exports.configDotenv=$e.configDotenv;Vt.exports._configVault=$e._configVault;Vt.exports._parseVault=$e._parseVault;Vt.exports.config=$e.config;Vt.exports.decrypt=$e.decrypt;Vt.exports.parse=$e.parse;Vt.exports.populate=$e.populate;Vt.exports=$e});var Pe=m(Dc=>{"use strict";Dc.fromCallback=function(t){return Object.defineProperty(function(...e){if(typeof e[e.length-1]=="function")t.apply(this,e);else return new Promise((r,n)=>{e.push((s,i)=>s!=null?n(s):r(i)),t.apply(this,e)})},"name",{value:t.name})};Dc.fromPromise=function(t){return Object.defineProperty(function(...e){let r=e[e.length-1];if(typeof r!="function")return t.apply(this,e);e.pop(),t.apply(this,e).then(n=>r(null,n),r)},"name",{value:t.name})}});var tm=m((r3,em)=>{var rr=Q("constants"),bb=process.cwd,Ni=null,Ib=process.env.GRACEFUL_FS_PLATFORM||process.platform;process.cwd=function(){return Ni||(Ni=bb.call(process)),Ni};try{process.cwd()}catch{}typeof process.chdir=="function"&&(Fc=process.chdir,process.chdir=function(t){Ni=null,Fc.call(process,t)},Object.setPrototypeOf&&Object.setPrototypeOf(process.chdir,Fc));var Fc;em.exports=Ab;function Ab(t){rr.hasOwnProperty("O_SYMLINK")&&process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)&&e(t),t.lutimes||r(t),t.chown=i(t.chown),t.fchown=i(t.fchown),t.lchown=i(t.lchown),t.chmod=n(t.chmod),t.fchmod=n(t.fchmod),t.lchmod=n(t.lchmod),t.chownSync=o(t.chownSync),t.fchownSync=o(t.fchownSync),t.lchownSync=o(t.lchownSync),t.chmodSync=s(t.chmodSync),t.fchmodSync=s(t.fchmodSync),t.lchmodSync=s(t.lchmodSync),t.stat=a(t.stat),t.fstat=a(t.fstat),t.lstat=a(t.lstat),t.statSync=c(t.statSync),t.fstatSync=c(t.fstatSync),t.lstatSync=c(t.lstatSync),t.chmod&&!t.lchmod&&(t.lchmod=function(u,f,d){d&&process.nextTick(d)},t.lchmodSync=function(){}),t.chown&&!t.lchown&&(t.lchown=function(u,f,d,h){h&&process.nextTick(h)},t.lchownSync=function(){}),Ib==="win32"&&(t.rename=typeof t.rename!="function"?t.rename:(function(u){function f(d,h,g){var p=Date.now(),_=0;u(d,h,function y(w){if(w&&(w.code==="EACCES"||w.code==="EPERM"||w.code==="EBUSY")&&Date.now()-p<6e4){setTimeout(function(){t.stat(h,function(b,I){b&&b.code==="ENOENT"?u(d,h,y):g(w)})},_),_<100&&(_+=10);return}g&&g(w)})}return Object.setPrototypeOf&&Object.setPrototypeOf(f,u),f})(t.rename)),t.read=typeof t.read!="function"?t.read:(function(u){function f(d,h,g,p,_,y){var w;if(y&&typeof y=="function"){var b=0;w=function(I,A,C){if(I&&I.code==="EAGAIN"&&b<10)return b++,u.call(t,d,h,g,p,_,w);y.apply(this,arguments)}}return u.call(t,d,h,g,p,_,w)}return Object.setPrototypeOf&&Object.setPrototypeOf(f,u),f})(t.read),t.readSync=typeof t.readSync!="function"?t.readSync:(function(u){return function(f,d,h,g,p){for(var _=0;;)try{return u.call(t,f,d,h,g,p)}catch(y){if(y.code==="EAGAIN"&&_<10){_++;continue}throw y}}})(t.readSync);function e(u){u.lchmod=function(f,d,h){u.open(f,rr.O_WRONLY|rr.O_SYMLINK,d,function(g,p){if(g){h&&h(g);return}u.fchmod(p,d,function(_){u.close(p,function(y){h&&h(_||y)})})})},u.lchmodSync=function(f,d){var h=u.openSync(f,rr.O_WRONLY|rr.O_SYMLINK,d),g=!0,p;try{p=u.fchmodSync(h,d),g=!1}finally{if(g)try{u.closeSync(h)}catch{}else u.closeSync(h)}return p}}function r(u){rr.hasOwnProperty("O_SYMLINK")&&u.futimes?(u.lutimes=function(f,d,h,g){u.open(f,rr.O_SYMLINK,function(p,_){if(p){g&&g(p);return}u.futimes(_,d,h,function(y){u.close(_,function(w){g&&g(y||w)})})})},u.lutimesSync=function(f,d,h){var g=u.openSync(f,rr.O_SYMLINK),p,_=!0;try{p=u.futimesSync(g,d,h),_=!1}finally{if(_)try{u.closeSync(g)}catch{}else u.closeSync(g)}return p}):u.futimes&&(u.lutimes=function(f,d,h,g){g&&process.nextTick(g)},u.lutimesSync=function(){})}function n(u){return u&&function(f,d,h){return u.call(t,f,d,function(g){l(g)&&(g=null),h&&h.apply(this,arguments)})}}function s(u){return u&&function(f,d){try{return u.call(t,f,d)}catch(h){if(!l(h))throw h}}}function i(u){return u&&function(f,d,h,g){return u.call(t,f,d,h,function(p){l(p)&&(p=null),g&&g.apply(this,arguments)})}}function o(u){return u&&function(f,d,h){try{return u.call(t,f,d,h)}catch(g){if(!l(g))throw g}}}function a(u){return u&&function(f,d,h){typeof d=="function"&&(h=d,d=null);function g(p,_){_&&(_.uid<0&&(_.uid+=4294967296),_.gid<0&&(_.gid+=4294967296)),h&&h.apply(this,arguments)}return d?u.call(t,f,d,g):u.call(t,f,g)}}function c(u){return u&&function(f,d){var h=d?u.call(t,f,d):u.call(t,f);return h&&(h.uid<0&&(h.uid+=4294967296),h.gid<0&&(h.gid+=4294967296)),h}}function l(u){if(!u||u.code==="ENOSYS")return!0;var f=!process.getuid||process.getuid()!==0;return!!(f&&(u.code==="EINVAL"||u.code==="EPERM"))}}});var sm=m((n3,nm)=>{var rm=Q("stream").Stream;nm.exports=$b;function $b(t){return{ReadStream:e,WriteStream:r};function e(n,s){if(!(this instanceof e))return new e(n,s);rm.call(this);var i=this;this.path=n,this.fd=null,this.readable=!0,this.paused=!1,this.flags="r",this.mode=438,this.bufferSize=64*1024,s=s||{};for(var o=Object.keys(s),a=0,c=o.length;a<c;a++){var l=o[a];this[l]=s[l]}if(this.encoding&&this.setEncoding(this.encoding),this.start!==void 0){if(typeof this.start!="number")throw TypeError("start must be a Number");if(this.end===void 0)this.end=1/0;else if(typeof this.end!="number")throw TypeError("end must be a Number");if(this.start>this.end)throw new Error("start must be <= end");this.pos=this.start}if(this.fd!==null){process.nextTick(function(){i._read()});return}t.open(this.path,this.flags,this.mode,function(u,f){if(u){i.emit("error",u),i.readable=!1;return}i.fd=f,i.emit("open",f),i._read()})}function r(n,s){if(!(this instanceof r))return new r(n,s);rm.call(this),this.path=n,this.fd=null,this.writable=!0,this.flags="w",this.encoding="binary",this.mode=438,this.bytesWritten=0,s=s||{};for(var i=Object.keys(s),o=0,a=i.length;o<a;o++){var c=i[o];this[c]=s[c]}if(this.start!==void 0){if(typeof this.start!="number")throw TypeError("start must be a Number");if(this.start<0)throw new Error("start must be >= zero");this.pos=this.start}this.busy=!1,this._queue=[],this.fd===null&&(this._open=t.open,this._queue.push([this._open,this.path,this.flags,this.mode,void 0]),this.flush())}}});var om=m((s3,im)=>{"use strict";im.exports=Nb;var Lb=Object.getPrototypeOf||function(t){return t.__proto__};function Nb(t){if(t===null||typeof t!="object")return t;if(t instanceof Object)var e={__proto__:Lb(t)};else var e=Object.create(null);return Object.getOwnPropertyNames(t).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}),e}});var nn=m((i3,Bc)=>{var ve=Q("fs"),Ob=tm(),Pb=sm(),Rb=om(),Oi=Q("util"),ke,Ri;typeof Symbol=="function"&&typeof Symbol.for=="function"?(ke=Symbol.for("graceful-fs.queue"),Ri=Symbol.for("graceful-fs.previous")):(ke="___graceful-fs.queue",Ri="___graceful-fs.previous");function Cb(){}function lm(t,e){Object.defineProperty(t,ke,{get:function(){return e}})}var Or=Cb;Oi.debuglog?Or=Oi.debuglog("gfs4"):/\bgfs4\b/i.test(process.env.NODE_DEBUG||"")&&(Or=function(){var t=Oi.format.apply(Oi,arguments);t="GFS4: "+t.split(/\n/).join(`
GFS4: `),console.error(t)});ve[ke]||(am=global[ke]||[],lm(ve,am),ve.close=(function(t){function e(r,n){return t.call(ve,r,function(s){s||cm(),typeof n=="function"&&n.apply(this,arguments)})}return Object.defineProperty(e,Ri,{value:t}),e})(ve.close),ve.closeSync=(function(t){function e(r){t.apply(ve,arguments),cm()}return Object.defineProperty(e,Ri,{value:t}),e})(ve.closeSync),/\bgfs4\b/i.test(process.env.NODE_DEBUG||"")&&process.on("exit",function(){Or(ve[ke]),Q("assert").equal(ve[ke].length,0)}));var am;global[ke]||lm(global,ve[ke]);Bc.exports=Uc(Rb(ve));process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH&&!ve.__patched&&(Bc.exports=Uc(ve),ve.__patched=!0);function Uc(t){Ob(t),t.gracefulify=Uc,t.createReadStream=A,t.createWriteStream=C;var e=t.readFile;t.readFile=r;function r(N,D,V){return typeof D=="function"&&(V=D,D=null),F(N,D,V);function F(re,ce,le,ae){return e(re,ce,function(ue){ue&&(ue.code==="EMFILE"||ue.code==="ENFILE")?rn([F,[re,ce,le],ue,ae||Date.now(),Date.now()]):typeof le=="function"&&le.apply(this,arguments)})}}var n=t.writeFile;t.writeFile=s;function s(N,D,V,F){return typeof V=="function"&&(F=V,V=null),re(N,D,V,F);function re(ce,le,ae,ue,Ie){return n(ce,le,ae,function(pe){pe&&(pe.code==="EMFILE"||pe.code==="ENFILE")?rn([re,[ce,le,ae,ue],pe,Ie||Date.now(),Date.now()]):typeof ue=="function"&&ue.apply(this,arguments)})}}var i=t.appendFile;i&&(t.appendFile=o);function o(N,D,V,F){return typeof V=="function"&&(F=V,V=null),re(N,D,V,F);function re(ce,le,ae,ue,Ie){return i(ce,le,ae,function(pe){pe&&(pe.code==="EMFILE"||pe.code==="ENFILE")?rn([re,[ce,le,ae,ue],pe,Ie||Date.now(),Date.now()]):typeof ue=="function"&&ue.apply(this,arguments)})}}var a=t.copyFile;a&&(t.copyFile=c);function c(N,D,V,F){return typeof V=="function"&&(F=V,V=0),re(N,D,V,F);function re(ce,le,ae,ue,Ie){return a(ce,le,ae,function(pe){pe&&(pe.code==="EMFILE"||pe.code==="ENFILE")?rn([re,[ce,le,ae,ue],pe,Ie||Date.now(),Date.now()]):typeof ue=="function"&&ue.apply(this,arguments)})}}var l=t.readdir;t.readdir=f;var u=/^v[0-5]\./;function f(N,D,V){typeof D=="function"&&(V=D,D=null);var F=u.test(process.version)?function(le,ae,ue,Ie){return l(le,re(le,ae,ue,Ie))}:function(le,ae,ue,Ie){return l(le,ae,re(le,ae,ue,Ie))};return F(N,D,V);function re(ce,le,ae,ue){return function(Ie,pe){Ie&&(Ie.code==="EMFILE"||Ie.code==="ENFILE")?rn([F,[ce,le,ae],Ie,ue||Date.now(),Date.now()]):(pe&&pe.sort&&pe.sort(),typeof ae=="function"&&ae.call(this,Ie,pe))}}}if(process.version.substr(0,4)==="v0.8"){var d=Pb(t);y=d.ReadStream,b=d.WriteStream}var h=t.ReadStream;h&&(y.prototype=Object.create(h.prototype),y.prototype.open=w);var g=t.WriteStream;g&&(b.prototype=Object.create(g.prototype),b.prototype.open=I),Object.defineProperty(t,"ReadStream",{get:function(){return y},set:function(N){y=N},enumerable:!0,configurable:!0}),Object.defineProperty(t,"WriteStream",{get:function(){return b},set:function(N){b=N},enumerable:!0,configurable:!0});var p=y;Object.defineProperty(t,"FileReadStream",{get:function(){return p},set:function(N){p=N},enumerable:!0,configurable:!0});var _=b;Object.defineProperty(t,"FileWriteStream",{get:function(){return _},set:function(N){_=N},enumerable:!0,configurable:!0});function y(N,D){return this instanceof y?(h.apply(this,arguments),this):y.apply(Object.create(y.prototype),arguments)}function w(){var N=this;P(N.path,N.flags,N.mode,function(D,V){D?(N.autoClose&&N.destroy(),N.emit("error",D)):(N.fd=V,N.emit("open",V),N.read())})}function b(N,D){return this instanceof b?(g.apply(this,arguments),this):b.apply(Object.create(b.prototype),arguments)}function I(){var N=this;P(N.path,N.flags,N.mode,function(D,V){D?(N.destroy(),N.emit("error",D)):(N.fd=V,N.emit("open",V))})}function A(N,D){return new t.ReadStream(N,D)}function C(N,D){return new t.WriteStream(N,D)}var B=t.open;t.open=P;function P(N,D,V,F){return typeof V=="function"&&(F=V,V=null),re(N,D,V,F);function re(ce,le,ae,ue,Ie){return B(ce,le,ae,function(pe,fc){pe&&(pe.code==="EMFILE"||pe.code==="ENFILE")?rn([re,[ce,le,ae,ue],pe,Ie||Date.now(),Date.now()]):typeof ue=="function"&&ue.apply(this,arguments)})}}return t}function rn(t){Or("ENQUEUE",t[0].name,t[1]),ve[ke].push(t),Vc()}var Pi;function cm(){for(var t=Date.now(),e=0;e<ve[ke].length;++e)ve[ke][e].length>2&&(ve[ke][e][3]=t,ve[ke][e][4]=t);Vc()}function Vc(){if(clearTimeout(Pi),Pi=void 0,ve[ke].length!==0){var t=ve[ke].shift(),e=t[0],r=t[1],n=t[2],s=t[3],i=t[4];if(s===void 0)Or("RETRY",e.name,r),e.apply(null,r);else if(Date.now()-s>=6e4){Or("TIMEOUT",e.name,r);var o=r.pop();typeof o=="function"&&o.call(null,n)}else{var a=Date.now()-i,c=Math.max(i-s,1),l=Math.min(c*1.2,100);a>=l?(Or("RETRY",e.name,r),e.apply(null,r.concat([s]))):ve[ke].push(t)}Pi===void 0&&(Pi=setTimeout(Vc,0))}}});var We=m(Bt=>{"use strict";var um=Pe().fromCallback,He=nn(),kb=["access","appendFile","chmod","chown","close","copyFile","cp","fchmod","fchown","fdatasync","fstat","fsync","ftruncate","futimes","glob","lchmod","lchown","lutimes","link","lstat","mkdir","mkdtemp","open","opendir","readdir","readFile","readlink","realpath","rename","rm","rmdir","stat","statfs","symlink","truncate","unlink","utimes","writeFile"].filter(t=>typeof He[t]=="function");Object.assign(Bt,He);kb.forEach(t=>{Bt[t]=um(He[t])});Bt.exists=function(t,e){return typeof e=="function"?He.exists(t,e):new Promise(r=>He.exists(t,r))};Bt.read=function(t,e,r,n,s,i){return typeof i=="function"?He.read(t,e,r,n,s,i):new Promise((o,a)=>{He.read(t,e,r,n,s,(c,l,u)=>{if(c)return a(c);o({bytesRead:l,buffer:u})})})};Bt.write=function(t,e,...r){return typeof r[r.length-1]=="function"?He.write(t,e,...r):new Promise((n,s)=>{He.write(t,e,...r,(i,o,a)=>{if(i)return s(i);n({bytesWritten:o,buffer:a})})})};Bt.readv=function(t,e,...r){return typeof r[r.length-1]=="function"?He.readv(t,e,...r):new Promise((n,s)=>{He.readv(t,e,...r,(i,o,a)=>{if(i)return s(i);n({bytesRead:o,buffers:a})})})};Bt.writev=function(t,e,...r){return typeof r[r.length-1]=="function"?He.writev(t,e,...r):new Promise((n,s)=>{He.writev(t,e,...r,(i,o,a)=>{if(i)return s(i);n({bytesWritten:o,buffers:a})})})};typeof He.realpath.native=="function"?Bt.realpath.native=um(He.realpath.native):process.emitWarning("fs.realpath.native is not a function. Is fs being monkey-patched?","Warning","fs-extra-WARN0003")});var dm=m((a3,fm)=>{"use strict";var qb=Q("path");fm.exports.checkPath=function(e){if(process.platform==="win32"&&/[<>:"|?*]/.test(e.replace(qb.parse(e).root,""))){let n=new Error(`Path contains invalid characters: ${e}`);throw n.code="EINVAL",n}}});var _m=m((c3,Hc)=>{"use strict";var hm=We(),{checkPath:pm}=dm(),mm=t=>{let e={mode:511};return typeof t=="number"?t:{...e,...t}.mode};Hc.exports.makeDir=async(t,e)=>(pm(t),hm.mkdir(t,{mode:mm(e),recursive:!0}));Hc.exports.makeDirSync=(t,e)=>(pm(t),hm.mkdirSync(t,{mode:mm(e),recursive:!0}))});var vt=m((l3,gm)=>{"use strict";var Mb=Pe().fromPromise,{makeDir:xb,makeDirSync:Wc}=_m(),Kc=Mb(xb);gm.exports={mkdirs:Kc,mkdirsSync:Wc,mkdirp:Kc,mkdirpSync:Wc,ensureDir:Kc,ensureDirSync:Wc}});var nr=m((u3,Em)=>{"use strict";var jb=Pe().fromPromise,ym=We();function Db(t){return ym.access(t).then(()=>!0).catch(()=>!1)}Em.exports={pathExists:jb(Db),pathExistsSync:ym.existsSync}});var Gc=m((f3,vm)=>{"use strict";var sn=We(),Fb=Pe().fromPromise;async function Ub(t,e,r){let n=await sn.open(t,"r+"),s=null;try{await sn.futimes(n,e,r)}finally{try{await sn.close(n)}catch(i){s=i}}if(s)throw s}function Vb(t,e,r){let n=sn.openSync(t,"r+");return sn.futimesSync(n,e,r),sn.closeSync(n)}vm.exports={utimesMillis:Fb(Ub),utimesMillisSync:Vb}});var Pr=m((d3,bm)=>{"use strict";var on=We(),Re=Q("path"),wm=Pe().fromPromise;function Bb(t,e,r){let n=r.dereference?s=>on.stat(s,{bigint:!0}):s=>on.lstat(s,{bigint:!0});return Promise.all([n(t),n(e).catch(s=>{if(s.code==="ENOENT")return null;throw s})]).then(([s,i])=>({srcStat:s,destStat:i}))}function Hb(t,e,r){let n,s=r.dereference?o=>on.statSync(o,{bigint:!0}):o=>on.lstatSync(o,{bigint:!0}),i=s(t);try{n=s(e)}catch(o){if(o.code==="ENOENT")return{srcStat:i,destStat:null};throw o}return{srcStat:i,destStat:n}}async function Wb(t,e,r,n){let{srcStat:s,destStat:i}=await Bb(t,e,n);if(i){if(Gn(s,i)){let o=Re.basename(t),a=Re.basename(e);if(r==="move"&&o!==a&&o.toLowerCase()===a.toLowerCase())return{srcStat:s,destStat:i,isChangingCase:!0};throw new Error("Source and destination must not be the same.")}if(s.isDirectory()&&!i.isDirectory())throw new Error(`Cannot overwrite non-directory '${e}' with directory '${t}'.`);if(!s.isDirectory()&&i.isDirectory())throw new Error(`Cannot overwrite directory '${e}' with non-directory '${t}'.`)}if(s.isDirectory()&&zc(t,e))throw new Error(Ci(t,e,r));return{srcStat:s,destStat:i}}function Kb(t,e,r,n){let{srcStat:s,destStat:i}=Hb(t,e,n);if(i){if(Gn(s,i)){let o=Re.basename(t),a=Re.basename(e);if(r==="move"&&o!==a&&o.toLowerCase()===a.toLowerCase())return{srcStat:s,destStat:i,isChangingCase:!0};throw new Error("Source and destination must not be the same.")}if(s.isDirectory()&&!i.isDirectory())throw new Error(`Cannot overwrite non-directory '${e}' with directory '${t}'.`);if(!s.isDirectory()&&i.isDirectory())throw new Error(`Cannot overwrite directory '${e}' with non-directory '${t}'.`)}if(s.isDirectory()&&zc(t,e))throw new Error(Ci(t,e,r));return{srcStat:s,destStat:i}}async function Sm(t,e,r,n){let s=Re.resolve(Re.dirname(t)),i=Re.resolve(Re.dirname(r));if(i===s||i===Re.parse(i).root)return;let o;try{o=await on.stat(i,{bigint:!0})}catch(a){if(a.code==="ENOENT")return;throw a}if(Gn(e,o))throw new Error(Ci(t,r,n));return Sm(t,e,i,n)}function Tm(t,e,r,n){let s=Re.resolve(Re.dirname(t)),i=Re.resolve(Re.dirname(r));if(i===s||i===Re.parse(i).root)return;let o;try{o=on.statSync(i,{bigint:!0})}catch(a){if(a.code==="ENOENT")return;throw a}if(Gn(e,o))throw new Error(Ci(t,r,n));return Tm(t,e,i,n)}function Gn(t,e){return e.ino!==void 0&&e.dev!==void 0&&e.ino===t.ino&&e.dev===t.dev}function zc(t,e){let r=Re.resolve(t).split(Re.sep).filter(s=>s),n=Re.resolve(e).split(Re.sep).filter(s=>s);return r.every((s,i)=>n[i]===s)}function Ci(t,e,r){return`Cannot ${r} '${t}' to a subdirectory of itself, '${e}'.`}bm.exports={checkPaths:wm(Wb),checkPathsSync:Kb,checkParentPaths:wm(Sm),checkParentPathsSync:Tm,isSrcSubdir:zc,areIdentical:Gn}});var Am=m((h3,Im)=>{"use strict";async function Gb(t,e){let r=[];for await(let n of t)r.push(e(n).then(()=>null,s=>s??new Error("unknown error")));await Promise.all(r.map(n=>n.then(s=>{if(s!==null)throw s})))}Im.exports={asyncIteratorConcurrentProcess:Gb}});var Pm=m((p3,Om)=>{"use strict";var je=We(),zn=Q("path"),{mkdirs:zb}=vt(),{pathExists:Jb}=nr(),{utimesMillis:Yb}=Gc(),Jn=Pr(),{asyncIteratorConcurrentProcess:Xb}=Am();async function Qb(t,e,r={}){typeof r=="function"&&(r={filter:r}),r.clobber="clobber"in r?!!r.clobber:!0,r.overwrite="overwrite"in r?!!r.overwrite:r.clobber,r.preserveTimestamps&&process.arch==="ia32"&&process.emitWarning(`Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,"Warning","fs-extra-WARN0001");let{srcStat:n,destStat:s}=await Jn.checkPaths(t,e,"copy",r);if(await Jn.checkParentPaths(t,n,e,"copy"),!await Lm(t,e,r))return;let o=zn.dirname(e);await Jb(o)||await zb(o),await Nm(s,t,e,r)}async function Lm(t,e,r){return r.filter?r.filter(t,e):!0}async function Nm(t,e,r,n){let i=await(n.dereference?je.stat:je.lstat)(e);if(i.isDirectory())return rI(i,t,e,r,n);if(i.isFile()||i.isCharacterDevice()||i.isBlockDevice())return Zb(i,t,e,r,n);if(i.isSymbolicLink())return nI(t,e,r,n);throw i.isSocket()?new Error(`Cannot copy a socket file: ${e}`):i.isFIFO()?new Error(`Cannot copy a FIFO pipe: ${e}`):new Error(`Unknown file: ${e}`)}async function Zb(t,e,r,n,s){if(!e)return $m(t,r,n,s);if(s.overwrite)return await je.unlink(n),$m(t,r,n,s);if(s.errorOnExist)throw new Error(`'${n}' already exists`)}async function $m(t,e,r,n){if(await je.copyFile(e,r),n.preserveTimestamps){eI(t.mode)&&await tI(r,t.mode);let s=await je.stat(e);await Yb(r,s.atime,s.mtime)}return je.chmod(r,t.mode)}function eI(t){return(t&128)===0}function tI(t,e){return je.chmod(t,e|128)}async function rI(t,e,r,n,s){e||await je.mkdir(n),await Xb(await je.opendir(r),async i=>{let o=zn.join(r,i.name),a=zn.join(n,i.name);if(await Lm(o,a,s)){let{destStat:l}=await Jn.checkPaths(o,a,"copy",s);await Nm(l,o,a,s)}}),e||await je.chmod(n,t.mode)}async function nI(t,e,r,n){let s=await je.readlink(e);if(n.dereference&&(s=zn.resolve(process.cwd(),s)),!t)return je.symlink(s,r);let i=null;try{i=await je.readlink(r)}catch(o){if(o.code==="EINVAL"||o.code==="UNKNOWN")return je.symlink(s,r);throw o}if(n.dereference&&(i=zn.resolve(process.cwd(),i)),s!==i){if(Jn.isSrcSubdir(s,i))throw new Error(`Cannot copy '${s}' to a subdirectory of itself, '${i}'.`);if(Jn.isSrcSubdir(i,s))throw new Error(`Cannot overwrite '${i}' with '${s}'.`)}return await je.unlink(r),je.symlink(s,r)}Om.exports=Qb});var Mm=m((m3,qm)=>{"use strict";var Ke=nn(),Yn=Q("path"),sI=vt().mkdirsSync,iI=Gc().utimesMillisSync,Xn=Pr();function oI(t,e,r){typeof r=="function"&&(r={filter:r}),r=r||{},r.clobber="clobber"in r?!!r.clobber:!0,r.overwrite="overwrite"in r?!!r.overwrite:r.clobber,r.preserveTimestamps&&process.arch==="ia32"&&process.emitWarning(`Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,"Warning","fs-extra-WARN0002");let{srcStat:n,destStat:s}=Xn.checkPathsSync(t,e,"copy",r);if(Xn.checkParentPathsSync(t,n,e,"copy"),r.filter&&!r.filter(t,e))return;let i=Yn.dirname(e);return Ke.existsSync(i)||sI(i),Rm(s,t,e,r)}function Rm(t,e,r,n){let i=(n.dereference?Ke.statSync:Ke.lstatSync)(e);if(i.isDirectory())return hI(i,t,e,r,n);if(i.isFile()||i.isCharacterDevice()||i.isBlockDevice())return aI(i,t,e,r,n);if(i.isSymbolicLink())return _I(t,e,r,n);throw i.isSocket()?new Error(`Cannot copy a socket file: ${e}`):i.isFIFO()?new Error(`Cannot copy a FIFO pipe: ${e}`):new Error(`Unknown file: ${e}`)}function aI(t,e,r,n,s){return e?cI(t,r,n,s):Cm(t,r,n,s)}function cI(t,e,r,n){if(n.overwrite)return Ke.unlinkSync(r),Cm(t,e,r,n);if(n.errorOnExist)throw new Error(`'${r}' already exists`)}function Cm(t,e,r,n){return Ke.copyFileSync(e,r),n.preserveTimestamps&&lI(t.mode,e,r),Jc(r,t.mode)}function lI(t,e,r){return uI(t)&&fI(r,t),dI(e,r)}function uI(t){return(t&128)===0}function fI(t,e){return Jc(t,e|128)}function Jc(t,e){return Ke.chmodSync(t,e)}function dI(t,e){let r=Ke.statSync(t);return iI(e,r.atime,r.mtime)}function hI(t,e,r,n,s){return e?km(r,n,s):pI(t.mode,r,n,s)}function pI(t,e,r,n){return Ke.mkdirSync(r),km(e,r,n),Jc(r,t)}function km(t,e,r){let n=Ke.opendirSync(t);try{let s;for(;(s=n.readSync())!==null;)mI(s.name,t,e,r)}finally{n.closeSync()}}function mI(t,e,r,n){let s=Yn.join(e,t),i=Yn.join(r,t);if(n.filter&&!n.filter(s,i))return;let{destStat:o}=Xn.checkPathsSync(s,i,"copy",n);return Rm(o,s,i,n)}function _I(t,e,r,n){let s=Ke.readlinkSync(e);if(n.dereference&&(s=Yn.resolve(process.cwd(),s)),t){let i;try{i=Ke.readlinkSync(r)}catch(o){if(o.code==="EINVAL"||o.code==="UNKNOWN")return Ke.symlinkSync(s,r);throw o}if(n.dereference&&(i=Yn.resolve(process.cwd(),i)),s!==i){if(Xn.isSrcSubdir(s,i))throw new Error(`Cannot copy '${s}' to a subdirectory of itself, '${i}'.`);if(Xn.isSrcSubdir(i,s))throw new Error(`Cannot overwrite '${i}' with '${s}'.`)}return gI(s,r)}else return Ke.symlinkSync(s,r)}function gI(t,e){return Ke.unlinkSync(e),Ke.symlinkSync(t,e)}qm.exports=oI});var ki=m((_3,xm)=>{"use strict";var yI=Pe().fromPromise;xm.exports={copy:yI(Pm()),copySync:Mm()}});var Qn=m((g3,Dm)=>{"use strict";var jm=nn(),EI=Pe().fromCallback;function vI(t,e){jm.rm(t,{recursive:!0,force:!0},e)}function wI(t){jm.rmSync(t,{recursive:!0,force:!0})}Dm.exports={remove:EI(vI),removeSync:wI}});var Gm=m((y3,Km)=>{"use strict";var SI=Pe().fromPromise,Vm=We(),Bm=Q("path"),Hm=vt(),Wm=Qn(),Fm=SI(async function(e){let r;try{r=await Vm.readdir(e)}catch{return Hm.mkdirs(e)}return Promise.all(r.map(n=>Wm.remove(Bm.join(e,n))))});function Um(t){let e;try{e=Vm.readdirSync(t)}catch{return Hm.mkdirsSync(t)}e.forEach(r=>{r=Bm.join(t,r),Wm.removeSync(r)})}Km.exports={emptyDirSync:Um,emptydirSync:Um,emptyDir:Fm,emptydir:Fm}});var Xm=m((E3,Ym)=>{"use strict";var TI=Pe().fromPromise,zm=Q("path"),Ht=We(),Jm=vt();async function bI(t){let e;try{e=await Ht.stat(t)}catch{}if(e&&e.isFile())return;let r=zm.dirname(t),n=null;try{n=await Ht.stat(r)}catch(s){if(s.code==="ENOENT"){await Jm.mkdirs(r),await Ht.writeFile(t,"");return}else throw s}n.isDirectory()?await Ht.writeFile(t,""):await Ht.readdir(r)}function II(t){let e;try{e=Ht.statSync(t)}catch{}if(e&&e.isFile())return;let r=zm.dirname(t);try{Ht.statSync(r).isDirectory()||Ht.readdirSync(r)}catch(n){if(n&&n.code==="ENOENT")Jm.mkdirsSync(r);else throw n}Ht.writeFileSync(t,"")}Ym.exports={createFile:TI(bI),createFileSync:II}});var r_=m((v3,t_)=>{"use strict";var AI=Pe().fromPromise,Qm=Q("path"),sr=We(),Zm=vt(),{pathExists:$I}=nr(),{areIdentical:e_}=Pr();async function LI(t,e){let r;try{r=await sr.lstat(e)}catch{}let n;try{n=await sr.lstat(t)}catch(o){throw o.message=o.message.replace("lstat","ensureLink"),o}if(r&&e_(n,r))return;let s=Qm.dirname(e);await $I(s)||await Zm.mkdirs(s),await sr.link(t,e)}function NI(t,e){let r;try{r=sr.lstatSync(e)}catch{}try{let i=sr.lstatSync(t);if(r&&e_(i,r))return}catch(i){throw i.message=i.message.replace("lstat","ensureLink"),i}let n=Qm.dirname(e);return sr.existsSync(n)||Zm.mkdirsSync(n),sr.linkSync(t,e)}t_.exports={createLink:AI(LI),createLinkSync:NI}});var s_=m((w3,n_)=>{"use strict";var ir=Q("path"),Zn=We(),{pathExists:OI}=nr(),PI=Pe().fromPromise;async function RI(t,e){if(ir.isAbsolute(t)){try{await Zn.lstat(t)}catch(i){throw i.message=i.message.replace("lstat","ensureSymlink"),i}return{toCwd:t,toDst:t}}let r=ir.dirname(e),n=ir.join(r,t);if(await OI(n))return{toCwd:n,toDst:t};try{await Zn.lstat(t)}catch(i){throw i.message=i.message.replace("lstat","ensureSymlink"),i}return{toCwd:t,toDst:ir.relative(r,t)}}function CI(t,e){if(ir.isAbsolute(t)){if(!Zn.existsSync(t))throw new Error("absolute srcpath does not exist");return{toCwd:t,toDst:t}}let r=ir.dirname(e),n=ir.join(r,t);if(Zn.existsSync(n))return{toCwd:n,toDst:t};if(!Zn.existsSync(t))throw new Error("relative srcpath does not exist");return{toCwd:t,toDst:ir.relative(r,t)}}n_.exports={symlinkPaths:PI(RI),symlinkPathsSync:CI}});var a_=m((S3,o_)=>{"use strict";var i_=We(),kI=Pe().fromPromise;async function qI(t,e){if(e)return e;let r;try{r=await i_.lstat(t)}catch{return"file"}return r&&r.isDirectory()?"dir":"file"}function MI(t,e){if(e)return e;let r;try{r=i_.lstatSync(t)}catch{return"file"}return r&&r.isDirectory()?"dir":"file"}o_.exports={symlinkType:kI(qI),symlinkTypeSync:MI}});var f_=m((T3,u_)=>{"use strict";var xI=Pe().fromPromise,c_=Q("path"),Nt=We(),{mkdirs:jI,mkdirsSync:DI}=vt(),{symlinkPaths:FI,symlinkPathsSync:UI}=s_(),{symlinkType:VI,symlinkTypeSync:BI}=a_(),{pathExists:HI}=nr(),{areIdentical:l_}=Pr();async function WI(t,e,r){let n;try{n=await Nt.lstat(e)}catch{}if(n&&n.isSymbolicLink()){let[a,c]=await Promise.all([Nt.stat(t),Nt.stat(e)]);if(l_(a,c))return}let s=await FI(t,e);t=s.toDst;let i=await VI(s.toCwd,r),o=c_.dirname(e);return await HI(o)||await jI(o),Nt.symlink(t,e,i)}function KI(t,e,r){let n;try{n=Nt.lstatSync(e)}catch{}if(n&&n.isSymbolicLink()){let a=Nt.statSync(t),c=Nt.statSync(e);if(l_(a,c))return}let s=UI(t,e);t=s.toDst,r=BI(s.toCwd,r);let i=c_.dirname(e);return Nt.existsSync(i)||DI(i),Nt.symlinkSync(t,e,r)}u_.exports={createSymlink:xI(WI),createSymlinkSync:KI}});var E_=m((b3,y_)=>{"use strict";var{createFile:d_,createFileSync:h_}=Xm(),{createLink:p_,createLinkSync:m_}=r_(),{createSymlink:__,createSymlinkSync:g_}=f_();y_.exports={createFile:d_,createFileSync:h_,ensureFile:d_,ensureFileSync:h_,createLink:p_,createLinkSync:m_,ensureLink:p_,ensureLinkSync:m_,createSymlink:__,createSymlinkSync:g_,ensureSymlink:__,ensureSymlinkSync:g_}});var qi=m((I3,v_)=>{function GI(t,{EOL:e=`
`,finalEOL:r=!0,replacer:n=null,spaces:s}={}){let i=r?e:"";return JSON.stringify(t,n,s).replace(/\n/g,e)+i}function zI(t){return Buffer.isBuffer(t)&&(t=t.toString("utf8")),t.replace(/^\uFEFF/,"")}v_.exports={stringify:GI,stripBom:zI}});var b_=m((A3,T_)=>{var an;try{an=nn()}catch{an=Q("fs")}var Mi=Pe(),{stringify:w_,stripBom:S_}=qi();async function JI(t,e={}){typeof e=="string"&&(e={encoding:e});let r=e.fs||an,n="throws"in e?e.throws:!0,s=await Mi.fromCallback(r.readFile)(t,e);s=S_(s);let i;try{i=JSON.parse(s,e?e.reviver:null)}catch(o){if(n)throw o.message=`${t}: ${o.message}`,o;return null}return i}var YI=Mi.fromPromise(JI);function XI(t,e={}){typeof e=="string"&&(e={encoding:e});let r=e.fs||an,n="throws"in e?e.throws:!0;try{let s=r.readFileSync(t,e);return s=S_(s),JSON.parse(s,e.reviver)}catch(s){if(n)throw s.message=`${t}: ${s.message}`,s;return null}}async function QI(t,e,r={}){let n=r.fs||an,s=w_(e,r);await Mi.fromCallback(n.writeFile)(t,s,r)}var ZI=Mi.fromPromise(QI);function eA(t,e,r={}){let n=r.fs||an,s=w_(e,r);return n.writeFileSync(t,s,r)}T_.exports={readFile:YI,readFileSync:XI,writeFile:ZI,writeFileSync:eA}});var A_=m(($3,I_)=>{"use strict";var xi=b_();I_.exports={readJson:xi.readFile,readJsonSync:xi.readFileSync,writeJson:xi.writeFile,writeJsonSync:xi.writeFileSync}});var ji=m((L3,N_)=>{"use strict";var tA=Pe().fromPromise,Yc=We(),$_=Q("path"),L_=vt(),rA=nr().pathExists;async function nA(t,e,r="utf-8"){let n=$_.dirname(t);return await rA(n)||await L_.mkdirs(n),Yc.writeFile(t,e,r)}function sA(t,...e){let r=$_.dirname(t);Yc.existsSync(r)||L_.mkdirsSync(r),Yc.writeFileSync(t,...e)}N_.exports={outputFile:tA(nA),outputFileSync:sA}});var P_=m((N3,O_)=>{"use strict";var{stringify:iA}=qi(),{outputFile:oA}=ji();async function aA(t,e,r={}){let n=iA(e,r);await oA(t,n,r)}O_.exports=aA});var C_=m((O3,R_)=>{"use strict";var{stringify:cA}=qi(),{outputFileSync:lA}=ji();function uA(t,e,r){let n=cA(e,r);lA(t,n,r)}R_.exports=uA});var q_=m((P3,k_)=>{"use strict";var fA=Pe().fromPromise,Ge=A_();Ge.outputJson=fA(P_());Ge.outputJsonSync=C_();Ge.outputJSON=Ge.outputJson;Ge.outputJSONSync=Ge.outputJsonSync;Ge.writeJSON=Ge.writeJson;Ge.writeJSONSync=Ge.writeJsonSync;Ge.readJSON=Ge.readJson;Ge.readJSONSync=Ge.readJsonSync;k_.exports=Ge});var F_=m((R3,D_)=>{"use strict";var dA=We(),M_=Q("path"),{copy:hA}=ki(),{remove:j_}=Qn(),{mkdirp:pA}=vt(),{pathExists:mA}=nr(),x_=Pr();async function _A(t,e,r={}){let n=r.overwrite||r.clobber||!1,{srcStat:s,isChangingCase:i=!1}=await x_.checkPaths(t,e,"move",r);await x_.checkParentPaths(t,s,e,"move");let o=M_.dirname(e);return M_.parse(o).root!==o&&await pA(o),gA(t,e,n,i)}async function gA(t,e,r,n){if(!n){if(r)await j_(e);else if(await mA(e))throw new Error("dest already exists.")}try{await dA.rename(t,e)}catch(s){if(s.code!=="EXDEV")throw s;await yA(t,e,r)}}async function yA(t,e,r){return await hA(t,e,{overwrite:r,errorOnExist:!0,preserveTimestamps:!0}),j_(t)}D_.exports=_A});var W_=m((C3,H_)=>{"use strict";var V_=nn(),Qc=Q("path"),EA=ki().copySync,B_=Qn().removeSync,vA=vt().mkdirpSync,U_=Pr();function wA(t,e,r){r=r||{};let n=r.overwrite||r.clobber||!1,{srcStat:s,isChangingCase:i=!1}=U_.checkPathsSync(t,e,"move",r);return U_.checkParentPathsSync(t,s,e,"move"),SA(e)||vA(Qc.dirname(e)),TA(t,e,n,i)}function SA(t){let e=Qc.dirname(t);return Qc.parse(e).root===e}function TA(t,e,r,n){if(n)return Xc(t,e,r);if(r)return B_(e),Xc(t,e,r);if(V_.existsSync(e))throw new Error("dest already exists.");return Xc(t,e,r)}function Xc(t,e,r){try{V_.renameSync(t,e)}catch(n){if(n.code!=="EXDEV")throw n;return bA(t,e,r)}}function bA(t,e,r){return EA(t,e,{overwrite:r,errorOnExist:!0,preserveTimestamps:!0}),B_(t)}H_.exports=wA});var G_=m((k3,K_)=>{"use strict";var IA=Pe().fromPromise;K_.exports={move:IA(F_()),moveSync:W_()}});var or=m((q3,z_)=>{"use strict";z_.exports={...We(),...ki(),...Gm(),...E_(),...q_(),...vt(),...G_(),...ji(),...nr(),...Qn()}});var Z_=m((W3,nl)=>{typeof Object.create=="function"?nl.exports=function(e,r){r&&(e.super_=r,e.prototype=Object.create(r.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}))}:nl.exports=function(e,r){if(r){e.super_=r;var n=function(){};n.prototype=r.prototype,e.prototype=new n,e.prototype.constructor=e}}});var eg=m((K3,il)=>{try{if(sl=Q("util"),typeof sl.inherits!="function")throw"";il.exports=sl.inherits}catch{il.exports=Z_()}var sl});var rg=m((G3,al)=>{var RA=eg(),tg=Q("events").EventEmitter;al.exports=at;al.exports.default=at;function at(t){if(!(this instanceof at))return new at(t);tg.call(this),t=t||{},this.concurrency=t.concurrency||1/0,this.timeout=t.timeout||0,this.autostart=t.autostart||!1,this.results=t.results||null,this.pending=0,this.session=0,this.running=!1,this.jobs=[],this.timers={}}RA(at,tg);var CA=["pop","shift","indexOf","lastIndexOf"];CA.forEach(function(t){at.prototype[t]=function(){return Array.prototype[t].apply(this.jobs,arguments)}});at.prototype.slice=function(t,e){return this.jobs=this.jobs.slice(t,e),this};at.prototype.reverse=function(){return this.jobs.reverse(),this};var kA=["push","unshift","splice"];kA.forEach(function(t){at.prototype[t]=function(){var e=Array.prototype[t].apply(this.jobs,arguments);return this.autostart&&this.start(),e}});Object.defineProperty(at.prototype,"length",{get:function(){return this.pending+this.jobs.length}});at.prototype.start=function(t){if(t&&MA.call(this,t),this.running=!0,this.pending>=this.concurrency)return;if(this.jobs.length===0){this.pending===0&&ol.call(this);return}var e=this,r=this.jobs.shift(),n=!0,s=this.session,i=null,o=!1,a=null,c=r.hasOwnProperty("timeout")?r.timeout:this.timeout;function l(f,d){n&&e.session===s&&(n=!1,e.pending--,i!==null&&(delete e.timers[i],clearTimeout(i)),f?e.emit("error",f,r):o===!1&&(a!==null&&(e.results[a]=Array.prototype.slice.call(arguments,1)),e.emit("success",d,r)),e.session===s&&(e.pending===0&&e.jobs.length===0?ol.call(e):e.running&&e.start()))}c&&(i=setTimeout(function(){o=!0,e.listeners("timeout").length>0?e.emit("timeout",l,r):l()},c),this.timers[i]=i),this.results&&(a=this.results.length,this.results[a]=null),this.pending++,e.emit("start",r);var u=r(l);u&&u.then&&typeof u.then=="function"&&u.then(function(f){return l(null,f)}).catch(function(f){return l(f||!0)}),this.running&&this.jobs.length>0&&this.start()};at.prototype.stop=function(){this.running=!1};at.prototype.end=function(t){qA.call(this),this.jobs.length=0,this.pending=0,ol.call(this,t)};function qA(){for(var t in this.timers){var e=this.timers[t];delete this.timers[t],clearTimeout(e)}}function MA(t){var e=this;this.on("error",r),this.on("end",n);function r(s){e.end(s)}function n(s){e.removeListener("error",r),e.removeListener("end",n),t(s,this.results)}}function ol(t){this.session++,this.running=!1,this.emit("end",t)}});var we=m(fe=>{"use strict";Object.defineProperty(fe,"__esModule",{value:!0});fe.findBox=fe.readUInt=fe.readUInt32LE=fe.readUInt32BE=fe.readInt32LE=fe.readUInt24LE=fe.readUInt16LE=fe.readUInt16BE=fe.readInt16LE=fe.toHexString=fe.toUTF8String=void 0;var xA=new TextDecoder,jA=(t,e=0,r=t.length)=>xA.decode(t.slice(e,r));fe.toUTF8String=jA;var DA=(t,e=0,r=t.length)=>t.slice(e,r).reduce((n,s)=>n+("0"+s.toString(16)).slice(-2),"");fe.toHexString=DA;var FA=(t,e=0)=>{let r=t[e]+t[e+1]*256;return r|(r&2**15)*131070};fe.readInt16LE=FA;var UA=(t,e=0)=>t[e]*2**8+t[e+1];fe.readUInt16BE=UA;var VA=(t,e=0)=>t[e]+t[e+1]*2**8;fe.readUInt16LE=VA;var BA=(t,e=0)=>t[e]+t[e+1]*2**8+t[e+2]*2**16;fe.readUInt24LE=BA;var HA=(t,e=0)=>t[e]+t[e+1]*2**8+t[e+2]*2**16+(t[e+3]<<24);fe.readInt32LE=HA;var WA=(t,e=0)=>t[e]*2**24+t[e+1]*2**16+t[e+2]*2**8+t[e+3];fe.readUInt32BE=WA;var KA=(t,e=0)=>t[e]+t[e+1]*2**8+t[e+2]*2**16+t[e+3]*2**24;fe.readUInt32LE=KA;var GA={readUInt16BE:fe.readUInt16BE,readUInt16LE:fe.readUInt16LE,readUInt32BE:fe.readUInt32BE,readUInt32LE:fe.readUInt32LE};function zA(t,e,r,n){r=r||0;let s=n?"BE":"LE",i="readUInt"+e+s;return GA[i](t,r)}fe.readUInt=zA;function JA(t,e){if(t.length-e<4)return;let r=(0,fe.readUInt32BE)(t,e);if(!(t.length-e<r))return{name:(0,fe.toUTF8String)(t,4+e,8+e),offset:e,size:r}}function YA(t,e,r){for(;r<t.length;){let n=JA(t,r);if(!n)break;if(n.name===e)return n;r+=n.size>0?n.size:8}}fe.findBox=YA});var ng=m(Ui=>{"use strict";Object.defineProperty(Ui,"__esModule",{value:!0});Ui.BMP=void 0;var cl=we();Ui.BMP={validate:t=>(0,cl.toUTF8String)(t,0,2)==="BM",calculate:t=>({height:Math.abs((0,cl.readInt32LE)(t,22)),width:(0,cl.readUInt32LE)(t,18)})}});var ll=m(Bi=>{"use strict";Object.defineProperty(Bi,"__esModule",{value:!0});Bi.ICO=void 0;var Vi=we(),XA=1,QA=6,ZA=16;function sg(t,e){let r=t[e];return r===0?256:r}function ig(t,e){let r=QA+e*ZA;return{height:sg(t,r+1),width:sg(t,r)}}Bi.ICO={validate(t){let e=(0,Vi.readUInt16LE)(t,0),r=(0,Vi.readUInt16LE)(t,4);return e!==0||r===0?!1:(0,Vi.readUInt16LE)(t,2)===XA},calculate(t){let e=(0,Vi.readUInt16LE)(t,4),r=ig(t,0);if(e===1)return r;let n=[r];for(let s=1;s<e;s+=1)n.push(ig(t,s));return{height:r.height,images:n,width:r.width}}}});var og=m(Hi=>{"use strict";Object.defineProperty(Hi,"__esModule",{value:!0});Hi.CUR=void 0;var e$=ll(),ul=we(),t$=2;Hi.CUR={validate(t){let e=(0,ul.readUInt16LE)(t,0),r=(0,ul.readUInt16LE)(t,4);return e!==0||r===0?!1:(0,ul.readUInt16LE)(t,2)===t$},calculate:t=>e$.ICO.calculate(t)}});var ag=m(Wi=>{"use strict";Object.defineProperty(Wi,"__esModule",{value:!0});Wi.DDS=void 0;var fl=we();Wi.DDS={validate:t=>(0,fl.readUInt32LE)(t,0)===542327876,calculate:t=>({height:(0,fl.readUInt32LE)(t,12),width:(0,fl.readUInt32LE)(t,16)})}});var cg=m(Ki=>{"use strict";Object.defineProperty(Ki,"__esModule",{value:!0});Ki.GIF=void 0;var dl=we(),r$=/^GIF8[79]a/;Ki.GIF={validate:t=>r$.test((0,dl.toUTF8String)(t,0,6)),calculate:t=>({height:(0,dl.readUInt16LE)(t,8),width:(0,dl.readUInt16LE)(t,6)})}});var lg=m(Gi=>{"use strict";Object.defineProperty(Gi,"__esModule",{value:!0});Gi.HEIF=void 0;var Pt=we(),n$={avif:"avif",mif1:"heif",msf1:"heif",heic:"heic",heix:"heic",hevc:"heic",hevx:"heic"};Gi.HEIF={validate(t){if((0,Pt.toUTF8String)(t,4,8)!=="ftyp")return!1;let r=(0,Pt.findBox)(t,"ftyp",0);return r?(0,Pt.toUTF8String)(t,r.offset+8,r.offset+12)in n$:!1},calculate(t){let e=(0,Pt.findBox)(t,"meta",0),r=e&&(0,Pt.findBox)(t,"iprp",e.offset+12),n=r&&(0,Pt.findBox)(t,"ipco",r.offset+8),s=n&&(0,Pt.findBox)(t,"ispe",n.offset+8);if(s)return{height:(0,Pt.readUInt32BE)(t,s.offset+16),width:(0,Pt.readUInt32BE)(t,s.offset+12),type:(0,Pt.toUTF8String)(t,8,12)};throw new TypeError("Invalid HEIF, no size found")}}});var dg=m(Ji=>{"use strict";Object.defineProperty(Ji,"__esModule",{value:!0});Ji.ICNS=void 0;var zi=we(),s$=8,i$=4,o$=4,a$={ICON:32,"ICN#":32,"icm#":16,icm4:16,icm8:16,"ics#":16,ics4:16,ics8:16,is32:16,s8mk:16,icp4:16,icl4:32,icl8:32,il32:32,l8mk:32,icp5:32,ic11:32,ich4:48,ich8:48,ih32:48,h8mk:48,icp6:64,ic12:32,it32:128,t8mk:128,ic07:128,ic08:256,ic13:256,ic09:512,ic14:512,ic10:1024};function ug(t,e){let r=e+o$;return[(0,zi.toUTF8String)(t,e,r),(0,zi.readUInt32BE)(t,r)]}function fg(t){let e=a$[t];return{width:e,height:e,type:t}}Ji.ICNS={validate:t=>(0,zi.toUTF8String)(t,0,4)==="icns",calculate(t){let e=t.length,r=(0,zi.readUInt32BE)(t,i$),n=s$,s=ug(t,n),i=fg(s[0]);if(n+=s[1],n===r)return i;let o={height:i.height,images:[i],width:i.width};for(;n<r&&n<e;)s=ug(t,n),i=fg(s[0]),n+=s[1],o.images.push(i);return o}}});var hg=m(Yi=>{"use strict";Object.defineProperty(Yi,"__esModule",{value:!0});Yi.J2C=void 0;var hl=we();Yi.J2C={validate:t=>(0,hl.readUInt32BE)(t,0)===4283432785,calculate:t=>({height:(0,hl.readUInt32BE)(t,12),width:(0,hl.readUInt32BE)(t,8)})}});var pg=m(Xi=>{"use strict";Object.defineProperty(Xi,"__esModule",{value:!0});Xi.JP2=void 0;var Cr=we();Xi.JP2={validate(t){if((0,Cr.toUTF8String)(t,4,8)!=="jP  ")return!1;let r=(0,Cr.findBox)(t,"ftyp",0);return r?(0,Cr.toUTF8String)(t,r.offset+8,r.offset+12)==="jp2 ":!1},calculate(t){let e=(0,Cr.findBox)(t,"jp2h",0),r=e&&(0,Cr.findBox)(t,"ihdr",e.offset+8);if(r)return{height:(0,Cr.readUInt32BE)(t,r.offset+8),width:(0,Cr.readUInt32BE)(t,r.offset+12)};throw new TypeError("Unsupported JPEG 2000 format")}}});var _g=m(Qi=>{"use strict";Object.defineProperty(Qi,"__esModule",{value:!0});Qi.JPG=void 0;var wt=we(),c$="45786966",l$=2,pl=6,u$=2,f$="4d4d",d$="4949",mg=12,h$=2;function p$(t){return(0,wt.toHexString)(t,2,6)===c$}function m$(t,e){return{height:(0,wt.readUInt16BE)(t,e),width:(0,wt.readUInt16BE)(t,e+2)}}function _$(t,e){let n=pl+8,s=(0,wt.readUInt)(t,16,n,e);for(let i=0;i<s;i++){let o=n+h$+i*mg,a=o+mg;if(o>t.length)return;let c=t.slice(o,a);if((0,wt.readUInt)(c,16,0,e)===274)return(0,wt.readUInt)(c,16,2,e)!==3||(0,wt.readUInt)(c,32,4,e)!==1?void 0:(0,wt.readUInt)(c,16,8,e)}}function g$(t,e){let r=t.slice(l$,e),n=(0,wt.toHexString)(r,pl,pl+u$),s=n===f$;if(s||n===d$)return _$(r,s)}function y$(t,e){if(e>t.length)throw new TypeError("Corrupt JPG, exceeded buffer limits")}Qi.JPG={validate:t=>(0,wt.toHexString)(t,0,2)==="ffd8",calculate(t){t=t.slice(4);let e,r;for(;t.length;){let n=(0,wt.readUInt16BE)(t,0);if(t[n]!==255){t=t.slice(1);continue}if(p$(t)&&(e=g$(t,n)),y$(t,n),r=t[n+1],r===192||r===193||r===194){let s=m$(t,n+5);return e?{height:s.height,orientation:e,width:s.width}:s}t=t.slice(n+2)}throw new TypeError("Invalid JPG, no size found")}}});var gg=m(Zi=>{"use strict";Object.defineProperty(Zi,"__esModule",{value:!0});Zi.BitReader=void 0;var ml=class{constructor(e,r){this.input=e,this.endianness=r,this.byteOffset=2,this.bitOffset=0}getBits(e=1){let r=0,n=0;for(;n<e;){if(this.byteOffset>=this.input.length)throw new Error("Reached end of input");let s=this.input[this.byteOffset],i=8-this.bitOffset,o=Math.min(e-n,i);if(this.endianness==="little-endian"){let a=(1<<o)-1,c=s>>this.bitOffset&a;r|=c<<n}else{let a=(1<<o)-1<<8-this.bitOffset-o,c=(s&a)>>8-this.bitOffset-o;r=r<<o|c}n+=o,this.bitOffset+=o,this.bitOffset===8&&(this.byteOffset++,this.bitOffset=0)}return r}};Zi.BitReader=ml});var _l=m(eo=>{"use strict";Object.defineProperty(eo,"__esModule",{value:!0});eo.JXLStream=void 0;var E$=we(),v$=gg();function yg(t,e){if(e)return 8*(1+t.getBits(5));{let r=t.getBits(2),n=[9,13,18,30][r];return 1+t.getBits(n)}}function w$(t,e,r,n){return e&&r===0?8*(1+t.getBits(5)):r===0?yg(t,!1):Math.floor(n*[1,1.2,1.3333333333333333,1.5,1.7777777777777777,1.25,2][r-1])}eo.JXLStream={validate:t=>(0,E$.toHexString)(t,0,2)==="ff0a",calculate(t){let e=new v$.BitReader(t,"little-endian"),r=e.getBits(1)===1,n=yg(e,r),s=e.getBits(3);return{width:w$(e,r,s,n),height:n}}}});var Eg=m(to=>{"use strict";Object.defineProperty(to,"__esModule",{value:!0});to.JXL=void 0;var ts=we(),S$=_l();function T$(t){let e=(0,ts.findBox)(t,"jxlc",0);if(e)return t.slice(e.offset+8,e.offset+e.size);let r=b$(t);if(r.length>0)return I$(r)}function b$(t){let e=[],r=0;for(;r<t.length;){let n=(0,ts.findBox)(t,"jxlp",r);if(!n)break;e.push(t.slice(n.offset+12,n.offset+n.size)),r=n.offset+n.size}return e}function I$(t){let e=t.reduce((s,i)=>s+i.length,0),r=new Uint8Array(e),n=0;for(let s of t)r.set(s,n),n+=s.length;return r}to.JXL={validate:t=>{if((0,ts.toUTF8String)(t,4,8)!=="JXL ")return!1;let r=(0,ts.findBox)(t,"ftyp",0);return r?(0,ts.toUTF8String)(t,r.offset+8,r.offset+12)==="jxl ":!1},calculate(t){let e=T$(t);if(e)return S$.JXLStream.calculate(e);throw new Error("No codestream found in JXL container")}}});var vg=m(ro=>{"use strict";Object.defineProperty(ro,"__esModule",{value:!0});ro.KTX=void 0;var gl=we();ro.KTX={validate:t=>{let e=(0,gl.toUTF8String)(t,1,7);return["KTX 11","KTX 20"].includes(e)},calculate:t=>{let e=t[5]===49?"ktx":"ktx2",r=e==="ktx"?36:20;return{height:(0,gl.readUInt32LE)(t,r+4),width:(0,gl.readUInt32LE)(t,r),type:e}}}});var Sg=m(no=>{"use strict";Object.defineProperty(no,"__esModule",{value:!0});no.PNG=void 0;var cr=we(),A$=`PNG\r

`,$$="IHDR",wg="CgBI";no.PNG={validate(t){if(A$===(0,cr.toUTF8String)(t,1,8)){let e=(0,cr.toUTF8String)(t,12,16);if(e===wg&&(e=(0,cr.toUTF8String)(t,28,32)),e!==$$)throw new TypeError("Invalid PNG");return!0}return!1},calculate(t){return(0,cr.toUTF8String)(t,12,16)===wg?{height:(0,cr.readUInt32BE)(t,36),width:(0,cr.readUInt32BE)(t,32)}:{height:(0,cr.readUInt32BE)(t,20),width:(0,cr.readUInt32BE)(t,16)}}}});var Ig=m(so=>{"use strict";Object.defineProperty(so,"__esModule",{value:!0});so.PNM=void 0;var yl=we(),Tg={P1:"pbm/ascii",P2:"pgm/ascii",P3:"ppm/ascii",P4:"pbm",P5:"pgm",P6:"ppm",P7:"pam",PF:"pfm"},bg={default:t=>{let e=[];for(;t.length>0;){let r=t.shift();if(r[0]!=="#"){e=r.split(" ");break}}if(e.length===2)return{height:parseInt(e[1],10),width:parseInt(e[0],10)};throw new TypeError("Invalid PNM")},pam:t=>{let e={};for(;t.length>0;){let r=t.shift();if(r.length>16||r.charCodeAt(0)>128)continue;let[n,s]=r.split(" ");if(n&&s&&(e[n.toLowerCase()]=parseInt(s,10)),e.height&&e.width)break}if(e.height&&e.width)return{height:e.height,width:e.width};throw new TypeError("Invalid PAM")}};so.PNM={validate:t=>(0,yl.toUTF8String)(t,0,2)in Tg,calculate(t){let e=(0,yl.toUTF8String)(t,0,2),r=Tg[e],n=(0,yl.toUTF8String)(t,3).split(/[\r\n]+/);return(bg[r]||bg.default)(n)}}});var Ag=m(io=>{"use strict";Object.defineProperty(io,"__esModule",{value:!0});io.PSD=void 0;var El=we();io.PSD={validate:t=>(0,El.toUTF8String)(t,0,4)==="8BPS",calculate:t=>({height:(0,El.readUInt32BE)(t,14),width:(0,El.readUInt32BE)(t,18)})}});var Og=m(co=>{"use strict";Object.defineProperty(co,"__esModule",{value:!0});co.SVG=void 0;var $g=we(),Lg=/<svg\s([^>"']|"[^"]*"|'[^']*')*>/,oo={height:/\sheight=(['"])([^%]+?)\1/,root:Lg,viewbox:/\sviewBox=(['"])(.+?)\1/i,width:/\swidth=(['"])([^%]+?)\1/},vl=2.54,Ng={in:96,cm:96/vl,em:16,ex:8,m:96/vl*100,mm:96/vl/10,pc:96/72/12,pt:96/72,px:1},L$=new RegExp(`^([0-9.]+(?:e\\d+)?)(${Object.keys(Ng).join("|")})?$`);function ao(t){let e=L$.exec(t);if(e)return Math.round(Number(e[1])*(Ng[e[2]]||1))}function N$(t){let e=t.split(" ");return{height:ao(e[3]),width:ao(e[2])}}function O$(t){let e=t.match(oo.width),r=t.match(oo.height),n=t.match(oo.viewbox);return{height:r&&ao(r[2]),viewbox:n&&N$(n[2]),width:e&&ao(e[2])}}function P$(t){return{height:t.height,width:t.width}}function R$(t,e){let r=e.width/e.height;return t.width?{height:Math.floor(t.width/r),width:t.width}:t.height?{height:t.height,width:Math.floor(t.height*r)}:{height:e.height,width:e.width}}co.SVG={validate:t=>Lg.test((0,$g.toUTF8String)(t,0,1e3)),calculate(t){let e=(0,$g.toUTF8String)(t).match(oo.root);if(e){let r=O$(e[0]);if(r.width&&r.height)return P$(r);if(r.viewbox)return R$(r,r.viewbox)}throw new TypeError("Invalid SVG")}}});var Pg=m(uo=>{"use strict";Object.defineProperty(uo,"__esModule",{value:!0});uo.TGA=void 0;var lo=we();uo.TGA={validate(t){return(0,lo.readUInt16LE)(t,0)===0&&(0,lo.readUInt16LE)(t,4)===0},calculate(t){return{height:(0,lo.readUInt16LE)(t,14),width:(0,lo.readUInt16LE)(t,12)}}}});var Rg=m(ho=>{"use strict";Object.defineProperty(ho,"__esModule",{value:!0});ho.TIFF=void 0;var fo=Q("fs"),lr=we();function C$(t,e,r){let n=(0,lr.readUInt)(t,32,4,r),s=1024,i=fo.statSync(e).size;n+s>i&&(s=i-n-10);let o=new Uint8Array(s),a=fo.openSync(e,"r");return fo.readSync(a,o,0,s,n),fo.closeSync(a),o.slice(2)}function k$(t,e){let r=(0,lr.readUInt)(t,16,8,e);return((0,lr.readUInt)(t,16,10,e)<<16)+r}function q$(t){if(t.length>24)return t.slice(12)}function M$(t,e){let r={},n=t;for(;n&&n.length;){let s=(0,lr.readUInt)(n,16,0,e),i=(0,lr.readUInt)(n,16,2,e),o=(0,lr.readUInt)(n,32,4,e);if(s===0)break;o===1&&(i===3||i===4)&&(r[s]=k$(n,e)),n=q$(n)}return r}function x$(t){let e=(0,lr.toUTF8String)(t,0,2);if(e==="II")return"LE";if(e==="MM")return"BE"}var j$=["49492a00","4d4d002a"];ho.TIFF={validate:t=>j$.includes((0,lr.toHexString)(t,0,4)),calculate(t,e){if(!e)throw new TypeError("Tiff doesn't support buffer");let r=x$(t)==="BE",n=C$(t,e,r),s=M$(n,r),i=s[256],o=s[257];if(!i||!o)throw new TypeError("Invalid Tiff. Missing tags");return{height:o,width:i}}}});var Cg=m(po=>{"use strict";Object.defineProperty(po,"__esModule",{value:!0});po.WEBP=void 0;var Wt=we();function D$(t){return{height:1+(0,Wt.readUInt24LE)(t,7),width:1+(0,Wt.readUInt24LE)(t,4)}}function F$(t){return{height:1+((t[4]&15)<<10|t[3]<<2|(t[2]&192)>>6),width:1+((t[2]&63)<<8|t[1])}}function U$(t){return{height:(0,Wt.readInt16LE)(t,8)&16383,width:(0,Wt.readInt16LE)(t,6)&16383}}po.WEBP={validate(t){let e=(0,Wt.toUTF8String)(t,0,4)==="RIFF",r=(0,Wt.toUTF8String)(t,8,12)==="WEBP",n=(0,Wt.toUTF8String)(t,12,15)==="VP8";return e&&r&&n},calculate(t){let e=(0,Wt.toUTF8String)(t,12,16);if(t=t.slice(20,30),e==="VP8X"){let n=t[0],s=(n&192)===0,i=(n&1)===0;if(s&&i)return D$(t);throw new TypeError("Invalid WebP")}if(e==="VP8 "&&t[0]!==47)return U$(t);let r=(0,Wt.toHexString)(t,3,6);if(e==="VP8L"&&r!=="9d012a")return F$(t);throw new TypeError("Invalid WebP")}}});var wl=m(mo=>{"use strict";Object.defineProperty(mo,"__esModule",{value:!0});mo.typeHandlers=void 0;var V$=ng(),B$=og(),H$=ag(),W$=cg(),K$=lg(),G$=dg(),z$=ll(),J$=hg(),Y$=pg(),X$=_g(),Q$=Eg(),Z$=_l(),eL=vg(),tL=Sg(),rL=Ig(),nL=Ag(),sL=Og(),iL=Pg(),oL=Rg(),aL=Cg();mo.typeHandlers={bmp:V$.BMP,cur:B$.CUR,dds:H$.DDS,gif:W$.GIF,heif:K$.HEIF,icns:G$.ICNS,ico:z$.ICO,j2c:J$.J2C,jp2:Y$.JP2,jpg:X$.JPG,jxl:Q$.JXL,"jxl-stream":Z$.JXLStream,ktx:eL.KTX,png:tL.PNG,pnm:rL.PNM,psd:nL.PSD,svg:sL.SVG,tga:iL.TGA,tiff:oL.TIFF,webp:aL.WEBP}});var qg=m(_o=>{"use strict";Object.defineProperty(_o,"__esModule",{value:!0});_o.detector=void 0;var Sl=wl(),cL=Object.keys(Sl.typeHandlers),kg={56:"psd",66:"bmp",68:"dds",71:"gif",73:"tiff",77:"tiff",82:"webp",105:"icns",137:"png",255:"jpg"};function lL(t){let e=t[0];if(e in kg){let n=kg[e];if(n&&Sl.typeHandlers[n].validate(t))return n}let r=n=>Sl.typeHandlers[n].validate(t);return cL.find(r)}_o.detector=lL});var Dg=m((et,jg)=>{"use strict";Object.defineProperty(et,"__esModule",{value:!0});et.types=et.setConcurrency=et.disableTypes=et.disableFS=et.imageSize=void 0;var rs=Q("fs"),uL=Q("path"),fL=rg(),bl=wl(),dL=qg(),Mg=512*1024,xg=new fL.default({concurrency:100,autostart:!0}),go={disabledFS:!1,disabledTypes:[]};function Tl(t,e){let r=(0,dL.detector)(t);if(typeof r<"u"){if(go.disabledTypes.indexOf(r)>-1)throw new TypeError("disabled file type: "+r);if(r in bl.typeHandlers){let n=bl.typeHandlers[r].calculate(t,e);if(n!==void 0)return n.type=n.type??r,n}}throw new TypeError("unsupported file type: "+r+" (file: "+e+")")}async function hL(t){let e=await rs.promises.open(t,"r");try{let{size:r}=await e.stat();if(r<=0)throw new Error("Empty file");let n=Math.min(r,Mg),s=new Uint8Array(n);return await e.read(s,0,n,0),s}finally{await e.close()}}function pL(t){let e=rs.openSync(t,"r");try{let{size:r}=rs.fstatSync(e);if(r<=0)throw new Error("Empty file");let n=Math.min(r,Mg),s=new Uint8Array(n);return rs.readSync(e,s,0,n,0),s}finally{rs.closeSync(e)}}jg.exports=et=Il;et.default=Il;function Il(t,e){if(t instanceof Uint8Array)return Tl(t);if(typeof t!="string"||go.disabledFS)throw new TypeError("invalid invocation. input should be a Uint8Array");let r=uL.resolve(t);if(typeof e=="function")xg.push(()=>hL(r).then(n=>process.nextTick(e,null,Tl(n,r))).catch(e));else{let n=pL(r);return Tl(n,r)}}et.imageSize=Il;var mL=t=>{go.disabledFS=t};et.disableFS=mL;var _L=t=>{go.disabledTypes=t};et.disableTypes=_L;var gL=t=>{xg.concurrency=t};et.setConcurrency=gL;et.types=Object.keys(bl.typeHandlers)});var Ug=m((Eo,Fg)=>{(function(t,e){typeof Eo=="object"&&typeof Fg<"u"?e(Eo):typeof define=="function"&&define.amd?define(["exports"],e):(t=typeof globalThis<"u"?globalThis:t||self,e(t.compareVersions={}))})(Eo,(function(t){"use strict";let e=/^[v^~<>=]*?(\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+))?(?:-([\da-z\-]+(?:\.[\da-z\-]+)*))?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?)?)?$/i,r=_=>{if(typeof _!="string")throw new TypeError("Invalid argument expected string");let y=_.match(e);if(!y)throw new Error(`Invalid argument not valid semver ('${_}' received)`);return y.shift(),y},n=_=>_==="*"||_==="x"||_==="X",s=_=>{let y=parseInt(_,10);return isNaN(y)?_:y},i=(_,y)=>typeof _!=typeof y?[String(_),String(y)]:[_,y],o=(_,y)=>{if(n(_)||n(y))return 0;let[w,b]=i(s(_),s(y));return w>b?1:w<b?-1:0},a=(_,y)=>{for(let w=0;w<Math.max(_.length,y.length);w++){let b=o(_[w]||"0",y[w]||"0");if(b!==0)return b}return 0},c=(_,y)=>{let w=r(_),b=r(y),I=w.pop(),A=b.pop(),C=a(w,b);return C!==0?C:I&&A?a(I.split("."),A.split(".")):I||A?I?-1:1:0},l=(_,y,w)=>{d(w);let b=c(_,y);return u[w].includes(b)},u={">":[1],">=":[0,1],"=":[0],"<=":[-1,0],"<":[-1],"!=":[-1,1]},f=Object.keys(u),d=_=>{if(typeof _!="string")throw new TypeError(`Invalid operator type, expected string but got ${typeof _}`);if(f.indexOf(_)===-1)throw new Error(`Invalid operator, expected one of ${f.join("|")}`)},h=(_,y)=>{if(y=y.replace(/([><=]+)\s+/g,"$1"),y.includes("||"))return y.split("||").some(ae=>h(_,ae));if(y.includes(" - ")){let[ae,ue]=y.split(" - ",2);return h(_,`>=${ae} <=${ue}`)}else if(y.includes(" "))return y.trim().replace(/\s{2,}/g," ").split(" ").every(ae=>h(_,ae));let w=y.match(/^([<>=~^]+)/),b=w?w[1]:"=";if(b!=="^"&&b!=="~")return l(_,y,b);let[I,A,C,,B]=r(_),[P,N,D,,V]=r(y),F=[I,A,C],re=[P,N??"x",D??"x"];if(V&&(!B||a(F,re)!==0||a(B.split("."),V.split("."))===-1))return!1;let ce=re.findIndex(ae=>ae!=="0")+1,le=b==="~"?2:ce>1?ce:1;return!(a(F.slice(0,le),re.slice(0,le))!==0||a(F.slice(le),re.slice(le))===-1)},g=_=>typeof _=="string"&&/^[v\d]/.test(_)&&e.test(_),p=_=>typeof _=="string"&&/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/.test(_);t.compare=l,t.compareVersions=c,t.satisfies=h,t.validate=g,t.validateStrict=p}))});var is=m((bU,Bg)=>{"use strict";var vL="2.0.0",wL=Number.MAX_SAFE_INTEGER||9007199254740991,SL=16,TL=250,bL=["major","premajor","minor","preminor","patch","prepatch","prerelease"];Bg.exports={MAX_LENGTH:256,MAX_SAFE_COMPONENT_LENGTH:SL,MAX_SAFE_BUILD_LENGTH:TL,MAX_SAFE_INTEGER:wL,RELEASE_TYPES:bL,SEMVER_SPEC_VERSION:vL,FLAG_INCLUDE_PRERELEASE:1,FLAG_LOOSE:2}});var os=m((IU,Hg)=>{"use strict";var IL=typeof process=="object"&&process.env&&process.env.NODE_DEBUG&&/\bsemver\b/i.test(process.env.NODE_DEBUG)?(...t)=>console.error("SEMVER",...t):()=>{};Hg.exports=IL});var un=m((Rt,Wg)=>{"use strict";var{MAX_SAFE_COMPONENT_LENGTH:Nl,MAX_SAFE_BUILD_LENGTH:AL,MAX_LENGTH:$L}=is(),LL=os();Rt=Wg.exports={};var NL=Rt.re=[],OL=Rt.safeRe=[],q=Rt.src=[],PL=Rt.safeSrc=[],M=Rt.t={},RL=0,Ol="[a-zA-Z0-9-]",CL=[["\\s",1],["\\d",$L],[Ol,AL]],kL=t=>{for(let[e,r]of CL)t=t.split(`${e}*`).join(`${e}{0,${r}}`).split(`${e}+`).join(`${e}{1,${r}}`);return t},K=(t,e,r)=>{let n=kL(e),s=RL++;LL(t,s,e),M[t]=s,q[s]=e,PL[s]=n,NL[s]=new RegExp(e,r?"g":void 0),OL[s]=new RegExp(n,r?"g":void 0)};K("NUMERICIDENTIFIER","0|[1-9]\\d*");K("NUMERICIDENTIFIERLOOSE","\\d+");K("NONNUMERICIDENTIFIER",`\\d*[a-zA-Z-]${Ol}*`);K("MAINVERSION",`(${q[M.NUMERICIDENTIFIER]})\\.(${q[M.NUMERICIDENTIFIER]})\\.(${q[M.NUMERICIDENTIFIER]})`);K("MAINVERSIONLOOSE",`(${q[M.NUMERICIDENTIFIERLOOSE]})\\.(${q[M.NUMERICIDENTIFIERLOOSE]})\\.(${q[M.NUMERICIDENTIFIERLOOSE]})`);K("PRERELEASEIDENTIFIER",`(?:${q[M.NONNUMERICIDENTIFIER]}|${q[M.NUMERICIDENTIFIER]})`);K("PRERELEASEIDENTIFIERLOOSE",`(?:${q[M.NONNUMERICIDENTIFIER]}|${q[M.NUMERICIDENTIFIERLOOSE]})`);K("PRERELEASE",`(?:-(${q[M.PRERELEASEIDENTIFIER]}(?:\\.${q[M.PRERELEASEIDENTIFIER]})*))`);K("PRERELEASELOOSE",`(?:-?(${q[M.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${q[M.PRERELEASEIDENTIFIERLOOSE]})*))`);K("BUILDIDENTIFIER",`${Ol}+`);K("BUILD",`(?:\\+(${q[M.BUILDIDENTIFIER]}(?:\\.${q[M.BUILDIDENTIFIER]})*))`);K("FULLPLAIN",`v?${q[M.MAINVERSION]}${q[M.PRERELEASE]}?${q[M.BUILD]}?`);K("FULL",`^${q[M.FULLPLAIN]}$`);K("LOOSEPLAIN",`[v=\\s]*${q[M.MAINVERSIONLOOSE]}${q[M.PRERELEASELOOSE]}?${q[M.BUILD]}?`);K("LOOSE",`^${q[M.LOOSEPLAIN]}$`);K("GTLT","((?:<|>)?=?)");K("XRANGEIDENTIFIERLOOSE",`${q[M.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);K("XRANGEIDENTIFIER",`${q[M.NUMERICIDENTIFIER]}|x|X|\\*`);K("XRANGEPLAIN",`[v=\\s]*(${q[M.XRANGEIDENTIFIER]})(?:\\.(${q[M.XRANGEIDENTIFIER]})(?:\\.(${q[M.XRANGEIDENTIFIER]})(?:${q[M.PRERELEASE]})?${q[M.BUILD]}?)?)?`);K("XRANGEPLAINLOOSE",`[v=\\s]*(${q[M.XRANGEIDENTIFIERLOOSE]})(?:\\.(${q[M.XRANGEIDENTIFIERLOOSE]})(?:\\.(${q[M.XRANGEIDENTIFIERLOOSE]})(?:${q[M.PRERELEASELOOSE]})?${q[M.BUILD]}?)?)?`);K("XRANGE",`^${q[M.GTLT]}\\s*${q[M.XRANGEPLAIN]}$`);K("XRANGELOOSE",`^${q[M.GTLT]}\\s*${q[M.XRANGEPLAINLOOSE]}$`);K("COERCEPLAIN",`(^|[^\\d])(\\d{1,${Nl}})(?:\\.(\\d{1,${Nl}}))?(?:\\.(\\d{1,${Nl}}))?`);K("COERCE",`${q[M.COERCEPLAIN]}(?:$|[^\\d])`);K("COERCEFULL",q[M.COERCEPLAIN]+`(?:${q[M.PRERELEASE]})?(?:${q[M.BUILD]})?(?:$|[^\\d])`);K("COERCERTL",q[M.COERCE],!0);K("COERCERTLFULL",q[M.COERCEFULL],!0);K("LONETILDE","(?:~>?)");K("TILDETRIM",`(\\s*)${q[M.LONETILDE]}\\s+`,!0);Rt.tildeTrimReplace="$1~";K("TILDE",`^${q[M.LONETILDE]}${q[M.XRANGEPLAIN]}$`);K("TILDELOOSE",`^${q[M.LONETILDE]}${q[M.XRANGEPLAINLOOSE]}$`);K("LONECARET","(?:\\^)");K("CARETTRIM",`(\\s*)${q[M.LONECARET]}\\s+`,!0);Rt.caretTrimReplace="$1^";K("CARET",`^${q[M.LONECARET]}${q[M.XRANGEPLAIN]}$`);K("CARETLOOSE",`^${q[M.LONECARET]}${q[M.XRANGEPLAINLOOSE]}$`);K("COMPARATORLOOSE",`^${q[M.GTLT]}\\s*(${q[M.LOOSEPLAIN]})$|^$`);K("COMPARATOR",`^${q[M.GTLT]}\\s*(${q[M.FULLPLAIN]})$|^$`);K("COMPARATORTRIM",`(\\s*)${q[M.GTLT]}\\s*(${q[M.LOOSEPLAIN]}|${q[M.XRANGEPLAIN]})`,!0);Rt.comparatorTrimReplace="$1$2$3";K("HYPHENRANGE",`^\\s*(${q[M.XRANGEPLAIN]})\\s+-\\s+(${q[M.XRANGEPLAIN]})\\s*$`);K("HYPHENRANGELOOSE",`^\\s*(${q[M.XRANGEPLAINLOOSE]})\\s+-\\s+(${q[M.XRANGEPLAINLOOSE]})\\s*$`);K("STAR","(<|>)?=?\\s*\\*");K("GTE0","^\\s*>=\\s*0\\.0\\.0\\s*$");K("GTE0PRE","^\\s*>=\\s*0\\.0\\.0-0\\s*$")});var vo=m((AU,Kg)=>{"use strict";var qL=Object.freeze({loose:!0}),ML=Object.freeze({}),xL=t=>t?typeof t!="object"?qL:t:ML;Kg.exports=xL});var Pl=m(($U,Jg)=>{"use strict";var Gg=/^[0-9]+$/,zg=(t,e)=>{if(typeof t=="number"&&typeof e=="number")return t===e?0:t<e?-1:1;let r=Gg.test(t),n=Gg.test(e);return r&&n&&(t=+t,e=+e),t===e?0:r&&!n?-1:n&&!r?1:t<e?-1:1},jL=(t,e)=>zg(e,t);Jg.exports={compareIdentifiers:zg,rcompareIdentifiers:jL}});var De=m((LU,Xg)=>{"use strict";var wo=os(),{MAX_LENGTH:Yg,MAX_SAFE_INTEGER:So}=is(),{safeRe:To,t:bo}=un(),DL=vo(),{compareIdentifiers:Rl}=Pl(),Cl=class t{constructor(e,r){if(r=DL(r),e instanceof t){if(e.loose===!!r.loose&&e.includePrerelease===!!r.includePrerelease)return e;e=e.version}else if(typeof e!="string")throw new TypeError(`Invalid version. Must be a string. Got type "${typeof e}".`);if(e.length>Yg)throw new TypeError(`version is longer than ${Yg} characters`);wo("SemVer",e,r),this.options=r,this.loose=!!r.loose,this.includePrerelease=!!r.includePrerelease;let n=e.trim().match(r.loose?To[bo.LOOSE]:To[bo.FULL]);if(!n)throw new TypeError(`Invalid Version: ${e}`);if(this.raw=e,this.major=+n[1],this.minor=+n[2],this.patch=+n[3],this.major>So||this.major<0)throw new TypeError("Invalid major version");if(this.minor>So||this.minor<0)throw new TypeError("Invalid minor version");if(this.patch>So||this.patch<0)throw new TypeError("Invalid patch version");n[4]?this.prerelease=n[4].split(".").map(s=>{if(/^[0-9]+$/.test(s)){let i=+s;if(i>=0&&i<So)return i}return s}):this.prerelease=[],this.build=n[5]?n[5].split("."):[],this.format()}format(){return this.version=`${this.major}.${this.minor}.${this.patch}`,this.prerelease.length&&(this.version+=`-${this.prerelease.join(".")}`),this.version}toString(){return this.version}compare(e){if(wo("SemVer.compare",this.version,this.options,e),!(e instanceof t)){if(typeof e=="string"&&e===this.version)return 0;e=new t(e,this.options)}return e.version===this.version?0:this.compareMain(e)||this.comparePre(e)}compareMain(e){return e instanceof t||(e=new t(e,this.options)),this.major<e.major?-1:this.major>e.major?1:this.minor<e.minor?-1:this.minor>e.minor?1:this.patch<e.patch?-1:this.patch>e.patch?1:0}comparePre(e){if(e instanceof t||(e=new t(e,this.options)),this.prerelease.length&&!e.prerelease.length)return-1;if(!this.prerelease.length&&e.prerelease.length)return 1;if(!this.prerelease.length&&!e.prerelease.length)return 0;let r=0;do{let n=this.prerelease[r],s=e.prerelease[r];if(wo("prerelease compare",r,n,s),n===void 0&&s===void 0)return 0;if(s===void 0)return 1;if(n===void 0)return-1;if(n===s)continue;return Rl(n,s)}while(++r)}compareBuild(e){e instanceof t||(e=new t(e,this.options));let r=0;do{let n=this.build[r],s=e.build[r];if(wo("build compare",r,n,s),n===void 0&&s===void 0)return 0;if(s===void 0)return 1;if(n===void 0)return-1;if(n===s)continue;return Rl(n,s)}while(++r)}inc(e,r,n){if(e.startsWith("pre")){if(!r&&n===!1)throw new Error("invalid increment argument: identifier is empty");if(r){let s=`-${r}`.match(this.options.loose?To[bo.PRERELEASELOOSE]:To[bo.PRERELEASE]);if(!s||s[1]!==r)throw new Error(`invalid identifier: ${r}`)}}switch(e){case"premajor":this.prerelease.length=0,this.patch=0,this.minor=0,this.major++,this.inc("pre",r,n);break;case"preminor":this.prerelease.length=0,this.patch=0,this.minor++,this.inc("pre",r,n);break;case"prepatch":this.prerelease.length=0,this.inc("patch",r,n),this.inc("pre",r,n);break;case"prerelease":this.prerelease.length===0&&this.inc("patch",r,n),this.inc("pre",r,n);break;case"release":if(this.prerelease.length===0)throw new Error(`version ${this.raw} is not a prerelease`);this.prerelease.length=0;break;case"major":(this.minor!==0||this.patch!==0||this.prerelease.length===0)&&this.major++,this.minor=0,this.patch=0,this.prerelease=[];break;case"minor":(this.patch!==0||this.prerelease.length===0)&&this.minor++,this.patch=0,this.prerelease=[];break;case"patch":this.prerelease.length===0&&this.patch++,this.prerelease=[];break;case"pre":{let s=Number(n)?1:0;if(this.prerelease.length===0)this.prerelease=[s];else{let i=this.prerelease.length;for(;--i>=0;)typeof this.prerelease[i]=="number"&&(this.prerelease[i]++,i=-2);if(i===-1){if(r===this.prerelease.join(".")&&n===!1)throw new Error("invalid increment argument: identifier already exists");this.prerelease.push(s)}}if(r){let i=[r,s];n===!1&&(i=[r]),Rl(this.prerelease[0],r)===0?isNaN(this.prerelease[1])&&(this.prerelease=i):this.prerelease=i}break}default:throw new Error(`invalid increment argument: ${e}`)}return this.raw=this.format(),this.build.length&&(this.raw+=`+${this.build.join(".")}`),this}};Xg.exports=Cl});var kr=m((NU,Zg)=>{"use strict";var Qg=De(),FL=(t,e,r=!1)=>{if(t instanceof Qg)return t;try{return new Qg(t,e)}catch(n){if(!r)return null;throw n}};Zg.exports=FL});var t0=m((OU,e0)=>{"use strict";var UL=kr(),VL=(t,e)=>{let r=UL(t,e);return r?r.version:null};e0.exports=VL});var n0=m((PU,r0)=>{"use strict";var BL=kr(),HL=(t,e)=>{let r=BL(t.trim().replace(/^[=v]+/,""),e);return r?r.version:null};r0.exports=HL});var o0=m((RU,i0)=>{"use strict";var s0=De(),WL=(t,e,r,n,s)=>{typeof r=="string"&&(s=n,n=r,r=void 0);try{return new s0(t instanceof s0?t.version:t,r).inc(e,n,s).version}catch{return null}};i0.exports=WL});var l0=m((CU,c0)=>{"use strict";var a0=kr(),KL=(t,e)=>{let r=a0(t,null,!0),n=a0(e,null,!0),s=r.compare(n);if(s===0)return null;let i=s>0,o=i?r:n,a=i?n:r,c=!!o.prerelease.length;if(!!a.prerelease.length&&!c){if(!a.patch&&!a.minor)return"major";if(a.compareMain(o)===0)return a.minor&&!a.patch?"minor":"patch"}let u=c?"pre":"";return r.major!==n.major?u+"major":r.minor!==n.minor?u+"minor":r.patch!==n.patch?u+"patch":"prerelease"};c0.exports=KL});var f0=m((kU,u0)=>{"use strict";var GL=De(),zL=(t,e)=>new GL(t,e).major;u0.exports=zL});var h0=m((qU,d0)=>{"use strict";var JL=De(),YL=(t,e)=>new JL(t,e).minor;d0.exports=YL});var m0=m((MU,p0)=>{"use strict";var XL=De(),QL=(t,e)=>new XL(t,e).patch;p0.exports=QL});var g0=m((xU,_0)=>{"use strict";var ZL=kr(),eN=(t,e)=>{let r=ZL(t,e);return r&&r.prerelease.length?r.prerelease:null};_0.exports=eN});var ut=m((jU,E0)=>{"use strict";var y0=De(),tN=(t,e,r)=>new y0(t,r).compare(new y0(e,r));E0.exports=tN});var w0=m((DU,v0)=>{"use strict";var rN=ut(),nN=(t,e,r)=>rN(e,t,r);v0.exports=nN});var T0=m((FU,S0)=>{"use strict";var sN=ut(),iN=(t,e)=>sN(t,e,!0);S0.exports=iN});var Io=m((UU,I0)=>{"use strict";var b0=De(),oN=(t,e,r)=>{let n=new b0(t,r),s=new b0(e,r);return n.compare(s)||n.compareBuild(s)};I0.exports=oN});var $0=m((VU,A0)=>{"use strict";var aN=Io(),cN=(t,e)=>t.sort((r,n)=>aN(r,n,e));A0.exports=cN});var N0=m((BU,L0)=>{"use strict";var lN=Io(),uN=(t,e)=>t.sort((r,n)=>lN(n,r,e));L0.exports=uN});var as=m((HU,O0)=>{"use strict";var fN=ut(),dN=(t,e,r)=>fN(t,e,r)>0;O0.exports=dN});var Ao=m((WU,P0)=>{"use strict";var hN=ut(),pN=(t,e,r)=>hN(t,e,r)<0;P0.exports=pN});var kl=m((KU,R0)=>{"use strict";var mN=ut(),_N=(t,e,r)=>mN(t,e,r)===0;R0.exports=_N});var ql=m((GU,C0)=>{"use strict";var gN=ut(),yN=(t,e,r)=>gN(t,e,r)!==0;C0.exports=yN});var $o=m((zU,k0)=>{"use strict";var EN=ut(),vN=(t,e,r)=>EN(t,e,r)>=0;k0.exports=vN});var Lo=m((JU,q0)=>{"use strict";var wN=ut(),SN=(t,e,r)=>wN(t,e,r)<=0;q0.exports=SN});var Ml=m((YU,M0)=>{"use strict";var TN=kl(),bN=ql(),IN=as(),AN=$o(),$N=Ao(),LN=Lo(),NN=(t,e,r,n)=>{switch(e){case"===":return typeof t=="object"&&(t=t.version),typeof r=="object"&&(r=r.version),t===r;case"!==":return typeof t=="object"&&(t=t.version),typeof r=="object"&&(r=r.version),t!==r;case"":case"=":case"==":return TN(t,r,n);case"!=":return bN(t,r,n);case">":return IN(t,r,n);case">=":return AN(t,r,n);case"<":return $N(t,r,n);case"<=":return LN(t,r,n);default:throw new TypeError(`Invalid operator: ${e}`)}};M0.exports=NN});var j0=m((XU,x0)=>{"use strict";var ON=De(),PN=kr(),{safeRe:No,t:Oo}=un(),RN=(t,e)=>{if(t instanceof ON)return t;if(typeof t=="number"&&(t=String(t)),typeof t!="string")return null;e=e||{};let r=null;if(!e.rtl)r=t.match(e.includePrerelease?No[Oo.COERCEFULL]:No[Oo.COERCE]);else{let c=e.includePrerelease?No[Oo.COERCERTLFULL]:No[Oo.COERCERTL],l;for(;(l=c.exec(t))&&(!r||r.index+r[0].length!==t.length);)(!r||l.index+l[0].length!==r.index+r[0].length)&&(r=l),c.lastIndex=l.index+l[1].length+l[2].length;c.lastIndex=-1}if(r===null)return null;let n=r[2],s=r[3]||"0",i=r[4]||"0",o=e.includePrerelease&&r[5]?`-${r[5]}`:"",a=e.includePrerelease&&r[6]?`+${r[6]}`:"";return PN(`${n}.${s}.${i}${o}${a}`,e)};x0.exports=RN});var F0=m((QU,D0)=>{"use strict";var xl=class{constructor(){this.max=1e3,this.map=new Map}get(e){let r=this.map.get(e);if(r!==void 0)return this.map.delete(e),this.map.set(e,r),r}delete(e){return this.map.delete(e)}set(e,r){if(!this.delete(e)&&r!==void 0){if(this.map.size>=this.max){let s=this.map.keys().next().value;this.delete(s)}this.map.set(e,r)}return this}};D0.exports=xl});var ft=m((ZU,H0)=>{"use strict";var CN=/\s+/g,jl=class t{constructor(e,r){if(r=qN(r),e instanceof t)return e.loose===!!r.loose&&e.includePrerelease===!!r.includePrerelease?e:new t(e.raw,r);if(e instanceof Dl)return this.raw=e.value,this.set=[[e]],this.formatted=void 0,this;if(this.options=r,this.loose=!!r.loose,this.includePrerelease=!!r.includePrerelease,this.raw=e.trim().replace(CN," "),this.set=this.raw.split("||").map(n=>this.parseRange(n.trim())).filter(n=>n.length),!this.set.length)throw new TypeError(`Invalid SemVer Range: ${this.raw}`);if(this.set.length>1){let n=this.set[0];if(this.set=this.set.filter(s=>!V0(s[0])),this.set.length===0)this.set=[n];else if(this.set.length>1){for(let s of this.set)if(s.length===1&&VN(s[0])){this.set=[s];break}}}this.formatted=void 0}get range(){if(this.formatted===void 0){this.formatted="";for(let e=0;e<this.set.length;e++){e>0&&(this.formatted+="||");let r=this.set[e];for(let n=0;n<r.length;n++)n>0&&(this.formatted+=" "),this.formatted+=r[n].toString().trim()}}return this.formatted}format(){return this.range}toString(){return this.range}parseRange(e){let n=((this.options.includePrerelease&&FN)|(this.options.loose&&UN))+":"+e,s=U0.get(n);if(s)return s;let i=this.options.loose,o=i?ze[Fe.HYPHENRANGELOOSE]:ze[Fe.HYPHENRANGE];e=e.replace(o,QN(this.options.includePrerelease)),_e("hyphen replace",e),e=e.replace(ze[Fe.COMPARATORTRIM],xN),_e("comparator trim",e),e=e.replace(ze[Fe.TILDETRIM],jN),_e("tilde trim",e),e=e.replace(ze[Fe.CARETTRIM],DN),_e("caret trim",e);let a=e.split(" ").map(f=>BN(f,this.options)).join(" ").split(/\s+/).map(f=>XN(f,this.options));i&&(a=a.filter(f=>(_e("loose invalid filter",f,this.options),!!f.match(ze[Fe.COMPARATORLOOSE])))),_e("range list",a);let c=new Map,l=a.map(f=>new Dl(f,this.options));for(let f of l){if(V0(f))return[f];c.set(f.value,f)}c.size>1&&c.has("")&&c.delete("");let u=[...c.values()];return U0.set(n,u),u}intersects(e,r){if(!(e instanceof t))throw new TypeError("a Range is required");return this.set.some(n=>B0(n,r)&&e.set.some(s=>B0(s,r)&&n.every(i=>s.every(o=>i.intersects(o,r)))))}test(e){if(!e)return!1;if(typeof e=="string")try{e=new MN(e,this.options)}catch{return!1}for(let r=0;r<this.set.length;r++)if(ZN(this.set[r],e,this.options))return!0;return!1}};H0.exports=jl;var kN=F0(),U0=new kN,qN=vo(),Dl=cs(),_e=os(),MN=De(),{safeRe:ze,t:Fe,comparatorTrimReplace:xN,tildeTrimReplace:jN,caretTrimReplace:DN}=un(),{FLAG_INCLUDE_PRERELEASE:FN,FLAG_LOOSE:UN}=is(),V0=t=>t.value==="<0.0.0-0",VN=t=>t.value==="",B0=(t,e)=>{let r=!0,n=t.slice(),s=n.pop();for(;r&&n.length;)r=n.every(i=>s.intersects(i,e)),s=n.pop();return r},BN=(t,e)=>(t=t.replace(ze[Fe.BUILD],""),_e("comp",t,e),t=KN(t,e),_e("caret",t),t=HN(t,e),_e("tildes",t),t=zN(t,e),_e("xrange",t),t=YN(t,e),_e("stars",t),t),Je=t=>!t||t.toLowerCase()==="x"||t==="*",HN=(t,e)=>t.trim().split(/\s+/).map(r=>WN(r,e)).join(" "),WN=(t,e)=>{let r=e.loose?ze[Fe.TILDELOOSE]:ze[Fe.TILDE];return t.replace(r,(n,s,i,o,a)=>{_e("tilde",t,n,s,i,o,a);let c;return Je(s)?c="":Je(i)?c=`>=${s}.0.0 <${+s+1}.0.0-0`:Je(o)?c=`>=${s}.${i}.0 <${s}.${+i+1}.0-0`:a?(_e("replaceTilde pr",a),c=`>=${s}.${i}.${o}-${a} <${s}.${+i+1}.0-0`):c=`>=${s}.${i}.${o} <${s}.${+i+1}.0-0`,_e("tilde return",c),c})},KN=(t,e)=>t.trim().split(/\s+/).map(r=>GN(r,e)).join(" "),GN=(t,e)=>{_e("caret",t,e);let r=e.loose?ze[Fe.CARETLOOSE]:ze[Fe.CARET],n=e.includePrerelease?"-0":"";return t.replace(r,(s,i,o,a,c)=>{_e("caret",t,s,i,o,a,c);let l;return Je(i)?l="":Je(o)?l=`>=${i}.0.0${n} <${+i+1}.0.0-0`:Je(a)?i==="0"?l=`>=${i}.${o}.0${n} <${i}.${+o+1}.0-0`:l=`>=${i}.${o}.0${n} <${+i+1}.0.0-0`:c?(_e("replaceCaret pr",c),i==="0"?o==="0"?l=`>=${i}.${o}.${a}-${c} <${i}.${o}.${+a+1}-0`:l=`>=${i}.${o}.${a}-${c} <${i}.${+o+1}.0-0`:l=`>=${i}.${o}.${a}-${c} <${+i+1}.0.0-0`):(_e("no pr"),i==="0"?o==="0"?l=`>=${i}.${o}.${a}${n} <${i}.${o}.${+a+1}-0`:l=`>=${i}.${o}.${a}${n} <${i}.${+o+1}.0-0`:l=`>=${i}.${o}.${a} <${+i+1}.0.0-0`),_e("caret return",l),l})},zN=(t,e)=>(_e("replaceXRanges",t,e),t.split(/\s+/).map(r=>JN(r,e)).join(" ")),JN=(t,e)=>{t=t.trim();let r=e.loose?ze[Fe.XRANGELOOSE]:ze[Fe.XRANGE];return t.replace(r,(n,s,i,o,a,c)=>{_e("xRange",t,n,s,i,o,a,c);let l=Je(i),u=l||Je(o),f=u||Je(a),d=f;return s==="="&&d&&(s=""),c=e.includePrerelease?"-0":"",l?s===">"||s==="<"?n="<0.0.0-0":n="*":s&&d?(u&&(o=0),a=0,s===">"?(s=">=",u?(i=+i+1,o=0,a=0):(o=+o+1,a=0)):s==="<="&&(s="<",u?i=+i+1:o=+o+1),s==="<"&&(c="-0"),n=`${s+i}.${o}.${a}${c}`):u?n=`>=${i}.0.0${c} <${+i+1}.0.0-0`:f&&(n=`>=${i}.${o}.0${c} <${i}.${+o+1}.0-0`),_e("xRange return",n),n})},YN=(t,e)=>(_e("replaceStars",t,e),t.trim().replace(ze[Fe.STAR],"")),XN=(t,e)=>(_e("replaceGTE0",t,e),t.trim().replace(ze[e.includePrerelease?Fe.GTE0PRE:Fe.GTE0],"")),QN=t=>(e,r,n,s,i,o,a,c,l,u,f,d)=>(Je(n)?r="":Je(s)?r=`>=${n}.0.0${t?"-0":""}`:Je(i)?r=`>=${n}.${s}.0${t?"-0":""}`:o?r=`>=${r}`:r=`>=${r}${t?"-0":""}`,Je(l)?c="":Je(u)?c=`<${+l+1}.0.0-0`:Je(f)?c=`<${l}.${+u+1}.0-0`:d?c=`<=${l}.${u}.${f}-${d}`:t?c=`<${l}.${u}.${+f+1}-0`:c=`<=${c}`,`${r} ${c}`.trim()),ZN=(t,e,r)=>{for(let n=0;n<t.length;n++)if(!t[n].test(e))return!1;if(e.prerelease.length&&!r.includePrerelease){for(let n=0;n<t.length;n++)if(_e(t[n].semver),t[n].semver!==Dl.ANY&&t[n].semver.prerelease.length>0){let s=t[n].semver;if(s.major===e.major&&s.minor===e.minor&&s.patch===e.patch)return!0}return!1}return!0}});var cs=m((e4,Y0)=>{"use strict";var ls=Symbol("SemVer ANY"),Vl=class t{static get ANY(){return ls}constructor(e,r){if(r=W0(r),e instanceof t){if(e.loose===!!r.loose)return e;e=e.value}e=e.trim().split(/\s+/).join(" "),Ul("comparator",e,r),this.options=r,this.loose=!!r.loose,this.parse(e),this.semver===ls?this.value="":this.value=this.operator+this.semver.version,Ul("comp",this)}parse(e){let r=this.options.loose?K0[G0.COMPARATORLOOSE]:K0[G0.COMPARATOR],n=e.match(r);if(!n)throw new TypeError(`Invalid comparator: ${e}`);this.operator=n[1]!==void 0?n[1]:"",this.operator==="="&&(this.operator=""),n[2]?this.semver=new z0(n[2],this.options.loose):this.semver=ls}toString(){return this.value}test(e){if(Ul("Comparator.test",e,this.options.loose),this.semver===ls||e===ls)return!0;if(typeof e=="string")try{e=new z0(e,this.options)}catch{return!1}return Fl(e,this.operator,this.semver,this.options)}intersects(e,r){if(!(e instanceof t))throw new TypeError("a Comparator is required");return this.operator===""?this.value===""?!0:new J0(e.value,r).test(this.value):e.operator===""?e.value===""?!0:new J0(this.value,r).test(e.semver):(r=W0(r),r.includePrerelease&&(this.value==="<0.0.0-0"||e.value==="<0.0.0-0")||!r.includePrerelease&&(this.value.startsWith("<0.0.0")||e.value.startsWith("<0.0.0"))?!1:!!(this.operator.startsWith(">")&&e.operator.startsWith(">")||this.operator.startsWith("<")&&e.operator.startsWith("<")||this.semver.version===e.semver.version&&this.operator.includes("=")&&e.operator.includes("=")||Fl(this.semver,"<",e.semver,r)&&this.operator.startsWith(">")&&e.operator.startsWith("<")||Fl(this.semver,">",e.semver,r)&&this.operator.startsWith("<")&&e.operator.startsWith(">")))}};Y0.exports=Vl;var W0=vo(),{safeRe:K0,t:G0}=un(),Fl=Ml(),Ul=os(),z0=De(),J0=ft()});var us=m((t4,X0)=>{"use strict";var eO=ft(),tO=(t,e,r)=>{try{e=new eO(e,r)}catch{return!1}return e.test(t)};X0.exports=tO});var Z0=m((r4,Q0)=>{"use strict";var rO=ft(),nO=(t,e)=>new rO(t,e).set.map(r=>r.map(n=>n.value).join(" ").trim().split(" "));Q0.exports=nO});var ty=m((n4,ey)=>{"use strict";var sO=De(),iO=ft(),oO=(t,e,r)=>{let n=null,s=null,i=null;try{i=new iO(e,r)}catch{return null}return t.forEach(o=>{i.test(o)&&(!n||s.compare(o)===-1)&&(n=o,s=new sO(n,r))}),n};ey.exports=oO});var ny=m((s4,ry)=>{"use strict";var aO=De(),cO=ft(),lO=(t,e,r)=>{let n=null,s=null,i=null;try{i=new cO(e,r)}catch{return null}return t.forEach(o=>{i.test(o)&&(!n||s.compare(o)===1)&&(n=o,s=new aO(n,r))}),n};ry.exports=lO});var oy=m((i4,iy)=>{"use strict";var Bl=De(),uO=ft(),sy=as(),fO=(t,e)=>{t=new uO(t,e);let r=new Bl("0.0.0");if(t.test(r)||(r=new Bl("0.0.0-0"),t.test(r)))return r;r=null;for(let n=0;n<t.set.length;++n){let s=t.set[n],i=null;s.forEach(o=>{let a=new Bl(o.semver.version);switch(o.operator){case">":a.prerelease.length===0?a.patch++:a.prerelease.push(0),a.raw=a.format();case"":case">=":(!i||sy(a,i))&&(i=a);break;case"<":case"<=":break;default:throw new Error(`Unexpected operation: ${o.operator}`)}}),i&&(!r||sy(r,i))&&(r=i)}return r&&t.test(r)?r:null};iy.exports=fO});var cy=m((o4,ay)=>{"use strict";var dO=ft(),hO=(t,e)=>{try{return new dO(t,e).range||"*"}catch{return null}};ay.exports=hO});var Po=m((a4,dy)=>{"use strict";var pO=De(),fy=cs(),{ANY:mO}=fy,_O=ft(),gO=us(),ly=as(),uy=Ao(),yO=Lo(),EO=$o(),vO=(t,e,r,n)=>{t=new pO(t,n),e=new _O(e,n);let s,i,o,a,c;switch(r){case">":s=ly,i=yO,o=uy,a=">",c=">=";break;case"<":s=uy,i=EO,o=ly,a="<",c="<=";break;default:throw new TypeError('Must provide a hilo val of "<" or ">"')}if(gO(t,e,n))return!1;for(let l=0;l<e.set.length;++l){let u=e.set[l],f=null,d=null;if(u.forEach(h=>{h.semver===mO&&(h=new fy(">=0.0.0")),f=f||h,d=d||h,s(h.semver,f.semver,n)?f=h:o(h.semver,d.semver,n)&&(d=h)}),f.operator===a||f.operator===c||(!d.operator||d.operator===a)&&i(t,d.semver))return!1;if(d.operator===c&&o(t,d.semver))return!1}return!0};dy.exports=vO});var py=m((c4,hy)=>{"use strict";var wO=Po(),SO=(t,e,r)=>wO(t,e,">",r);hy.exports=SO});var _y=m((l4,my)=>{"use strict";var TO=Po(),bO=(t,e,r)=>TO(t,e,"<",r);my.exports=bO});var Ey=m((u4,yy)=>{"use strict";var gy=ft(),IO=(t,e,r)=>(t=new gy(t,r),e=new gy(e,r),t.intersects(e,r));yy.exports=IO});var wy=m((f4,vy)=>{"use strict";var AO=us(),$O=ut();vy.exports=(t,e,r)=>{let n=[],s=null,i=null,o=t.sort((u,f)=>$O(u,f,r));for(let u of o)AO(u,e,r)?(i=u,s||(s=u)):(i&&n.push([s,i]),i=null,s=null);s&&n.push([s,null]);let a=[];for(let[u,f]of n)u===f?a.push(u):!f&&u===o[0]?a.push("*"):f?u===o[0]?a.push(`<=${f}`):a.push(`${u} - ${f}`):a.push(`>=${u}`);let c=a.join(" || "),l=typeof e.raw=="string"?e.raw:String(e);return c.length<l.length?c:e}});var $y=m((d4,Ay)=>{"use strict";var Sy=ft(),Wl=cs(),{ANY:Hl}=Wl,fs=us(),Kl=ut(),LO=(t,e,r={})=>{if(t===e)return!0;t=new Sy(t,r),e=new Sy(e,r);let n=!1;e:for(let s of t.set){for(let i of e.set){let o=OO(s,i,r);if(n=n||o!==null,o)continue e}if(n)return!1}return!0},NO=[new Wl(">=0.0.0-0")],Ty=[new Wl(">=0.0.0")],OO=(t,e,r)=>{if(t===e)return!0;if(t.length===1&&t[0].semver===Hl){if(e.length===1&&e[0].semver===Hl)return!0;r.includePrerelease?t=NO:t=Ty}if(e.length===1&&e[0].semver===Hl){if(r.includePrerelease)return!0;e=Ty}let n=new Set,s,i;for(let h of t)h.operator===">"||h.operator===">="?s=by(s,h,r):h.operator==="<"||h.operator==="<="?i=Iy(i,h,r):n.add(h.semver);if(n.size>1)return null;let o;if(s&&i){if(o=Kl(s.semver,i.semver,r),o>0)return null;if(o===0&&(s.operator!==">="||i.operator!=="<="))return null}for(let h of n){if(s&&!fs(h,String(s),r)||i&&!fs(h,String(i),r))return null;for(let g of e)if(!fs(h,String(g),r))return!1;return!0}let a,c,l,u,f=i&&!r.includePrerelease&&i.semver.prerelease.length?i.semver:!1,d=s&&!r.includePrerelease&&s.semver.prerelease.length?s.semver:!1;f&&f.prerelease.length===1&&i.operator==="<"&&f.prerelease[0]===0&&(f=!1);for(let h of e){if(u=u||h.operator===">"||h.operator===">=",l=l||h.operator==="<"||h.operator==="<=",s){if(d&&h.semver.prerelease&&h.semver.prerelease.length&&h.semver.major===d.major&&h.semver.minor===d.minor&&h.semver.patch===d.patch&&(d=!1),h.operator===">"||h.operator===">="){if(a=by(s,h,r),a===h&&a!==s)return!1}else if(s.operator===">="&&!fs(s.semver,String(h),r))return!1}if(i){if(f&&h.semver.prerelease&&h.semver.prerelease.length&&h.semver.major===f.major&&h.semver.minor===f.minor&&h.semver.patch===f.patch&&(f=!1),h.operator==="<"||h.operator==="<="){if(c=Iy(i,h,r),c===h&&c!==i)return!1}else if(i.operator==="<="&&!fs(i.semver,String(h),r))return!1}if(!h.operator&&(i||s)&&o!==0)return!1}return!(s&&l&&!i&&o!==0||i&&u&&!s&&o!==0||d||f)},by=(t,e,r)=>{if(!t)return e;let n=Kl(t.semver,e.semver,r);return n>0?t:n<0||e.operator===">"&&t.operator===">="?e:t},Iy=(t,e,r)=>{if(!t)return e;let n=Kl(t.semver,e.semver,r);return n<0?t:n>0||e.operator==="<"&&t.operator==="<="?e:t};Ay.exports=LO});var zl=m((h4,Oy)=>{"use strict";var Gl=un(),Ly=is(),PO=De(),Ny=Pl(),RO=kr(),CO=t0(),kO=n0(),qO=o0(),MO=l0(),xO=f0(),jO=h0(),DO=m0(),FO=g0(),UO=ut(),VO=w0(),BO=T0(),HO=Io(),WO=$0(),KO=N0(),GO=as(),zO=Ao(),JO=kl(),YO=ql(),XO=$o(),QO=Lo(),ZO=Ml(),e2=j0(),t2=cs(),r2=ft(),n2=us(),s2=Z0(),i2=ty(),o2=ny(),a2=oy(),c2=cy(),l2=Po(),u2=py(),f2=_y(),d2=Ey(),h2=wy(),p2=$y();Oy.exports={parse:RO,valid:CO,clean:kO,inc:qO,diff:MO,major:xO,minor:jO,patch:DO,prerelease:FO,compare:UO,rcompare:VO,compareLoose:BO,compareBuild:HO,sort:WO,rsort:KO,gt:GO,lt:zO,eq:JO,neq:YO,gte:XO,lte:QO,cmp:ZO,coerce:e2,Comparator:t2,Range:r2,satisfies:n2,toComparators:s2,maxSatisfying:i2,minSatisfying:o2,minVersion:a2,validRange:c2,outside:l2,gtr:u2,ltr:f2,intersects:d2,simplifyRange:h2,subset:p2,SemVer:PO,re:Gl.re,src:Gl.src,tokens:Gl.t,SEMVER_SPEC_VERSION:Ly.SEMVER_SPEC_VERSION,RELEASE_TYPES:Ly.RELEASE_TYPES,compareIdentifiers:Ny.compareIdentifiers,rcompareIdentifiers:Ny.rcompareIdentifiers}});var ps=m(oe=>{"use strict";Object.defineProperty(oe,"__esModule",{value:!0});oe.regexpCode=oe.getEsmExportName=oe.getProperty=oe.safeStringify=oe.stringify=oe.strConcat=oe.addCodeArg=oe.str=oe._=oe.nil=oe._Code=oe.Name=oe.IDENTIFIER=oe._CodeOrName=void 0;var ds=class{};oe._CodeOrName=ds;oe.IDENTIFIER=/^[a-z$_][a-z$_0-9]*$/i;var qr=class extends ds{constructor(e){if(super(),!oe.IDENTIFIER.test(e))throw new Error("CodeGen: name must be a valid identifier");this.str=e}toString(){return this.str}emptyStr(){return!1}get names(){return{[this.str]:1}}};oe.Name=qr;var dt=class extends ds{constructor(e){super(),this._items=typeof e=="string"?[e]:e}toString(){return this.str}emptyStr(){if(this._items.length>1)return!1;let e=this._items[0];return e===""||e==='""'}get str(){var e;return(e=this._str)!==null&&e!==void 0?e:this._str=this._items.reduce((r,n)=>`${r}${n}`,"")}get names(){var e;return(e=this._names)!==null&&e!==void 0?e:this._names=this._items.reduce((r,n)=>(n instanceof qr&&(r[n.str]=(r[n.str]||0)+1),r),{})}};oe._Code=dt;oe.nil=new dt("");function Py(t,...e){let r=[t[0]],n=0;for(;n<e.length;)Yl(r,e[n]),r.push(t[++n]);return new dt(r)}oe._=Py;var Jl=new dt("+");function Ry(t,...e){let r=[hs(t[0])],n=0;for(;n<e.length;)r.push(Jl),Yl(r,e[n]),r.push(Jl,hs(t[++n]));return m2(r),new dt(r)}oe.str=Ry;function Yl(t,e){e instanceof dt?t.push(...e._items):e instanceof qr?t.push(e):t.push(y2(e))}oe.addCodeArg=Yl;function m2(t){let e=1;for(;e<t.length-1;){if(t[e]===Jl){let r=_2(t[e-1],t[e+1]);if(r!==void 0){t.splice(e-1,3,r);continue}t[e++]="+"}e++}}function _2(t,e){if(e==='""')return t;if(t==='""')return e;if(typeof t=="string")return e instanceof qr||t[t.length-1]!=='"'?void 0:typeof e!="string"?`${t.slice(0,-1)}${e}"`:e[0]==='"'?t.slice(0,-1)+e.slice(1):void 0;if(typeof e=="string"&&e[0]==='"'&&!(t instanceof qr))return`"${t}${e.slice(1)}`}function g2(t,e){return e.emptyStr()?t:t.emptyStr()?e:Ry`${t}${e}`}oe.strConcat=g2;function y2(t){return typeof t=="number"||typeof t=="boolean"||t===null?t:hs(Array.isArray(t)?t.join(","):t)}function E2(t){return new dt(hs(t))}oe.stringify=E2;function hs(t){return JSON.stringify(t).replace(/\u2028/g,"\\u2028").replace(/\u2029/g,"\\u2029")}oe.safeStringify=hs;function v2(t){return typeof t=="string"&&oe.IDENTIFIER.test(t)?new dt(`.${t}`):Py`[${t}]`}oe.getProperty=v2;function w2(t){if(typeof t=="string"&&oe.IDENTIFIER.test(t))return new dt(`${t}`);throw new Error(`CodeGen: invalid export name: ${t}, use explicit $id name mapping`)}oe.getEsmExportName=w2;function S2(t){return new dt(t.toString())}oe.regexpCode=S2});var Zl=m(rt=>{"use strict";Object.defineProperty(rt,"__esModule",{value:!0});rt.ValueScope=rt.ValueScopeName=rt.Scope=rt.varKinds=rt.UsedValueState=void 0;var tt=ps(),Xl=class extends Error{constructor(e){super(`CodeGen: "code" for ${e} not defined`),this.value=e.value}},Ro;(function(t){t[t.Started=0]="Started",t[t.Completed=1]="Completed"})(Ro||(rt.UsedValueState=Ro={}));rt.varKinds={const:new tt.Name("const"),let:new tt.Name("let"),var:new tt.Name("var")};var Co=class{constructor({prefixes:e,parent:r}={}){this._names={},this._prefixes=e,this._parent=r}toName(e){return e instanceof tt.Name?e:this.name(e)}name(e){return new tt.Name(this._newName(e))}_newName(e){let r=this._names[e]||this._nameGroup(e);return`${e}${r.index++}`}_nameGroup(e){var r,n;if(!((n=(r=this._parent)===null||r===void 0?void 0:r._prefixes)===null||n===void 0)&&n.has(e)||this._prefixes&&!this._prefixes.has(e))throw new Error(`CodeGen: prefix "${e}" is not allowed in this scope`);return this._names[e]={prefix:e,index:0}}};rt.Scope=Co;var ko=class extends tt.Name{constructor(e,r){super(r),this.prefix=e}setValue(e,{property:r,itemIndex:n}){this.value=e,this.scopePath=(0,tt._)`.${new tt.Name(r)}[${n}]`}};rt.ValueScopeName=ko;var T2=(0,tt._)`\n`,Ql=class extends Co{constructor(e){super(e),this._values={},this._scope=e.scope,this.opts={...e,_n:e.lines?T2:tt.nil}}get(){return this._scope}name(e){return new ko(e,this._newName(e))}value(e,r){var n;if(r.ref===void 0)throw new Error("CodeGen: ref must be passed in value");let s=this.toName(e),{prefix:i}=s,o=(n=r.key)!==null&&n!==void 0?n:r.ref,a=this._values[i];if(a){let u=a.get(o);if(u)return u}else a=this._values[i]=new Map;a.set(o,s);let c=this._scope[i]||(this._scope[i]=[]),l=c.length;return c[l]=r.ref,s.setValue(r,{property:i,itemIndex:l}),s}getValue(e,r){let n=this._values[e];if(n)return n.get(r)}scopeRefs(e,r=this._values){return this._reduceValues(r,n=>{if(n.scopePath===void 0)throw new Error(`CodeGen: name "${n}" has no value`);return(0,tt._)`${e}${n.scopePath}`})}scopeCode(e=this._values,r,n){return this._reduceValues(e,s=>{if(s.value===void 0)throw new Error(`CodeGen: name "${s}" has no value`);return s.value.code},r,n)}_reduceValues(e,r,n={},s){let i=tt.nil;for(let o in e){let a=e[o];if(!a)continue;let c=n[o]=n[o]||new Map;a.forEach(l=>{if(c.has(l))return;c.set(l,Ro.Started);let u=r(l);if(u){let f=this.opts.es5?rt.varKinds.var:rt.varKinds.const;i=(0,tt._)`${i}${f} ${l} = ${u};${this.opts._n}`}else if(u=s?.(l))i=(0,tt._)`${i}${u}${this.opts._n}`;else throw new Xl(l);c.set(l,Ro.Completed)})}return i}};rt.ValueScope=Ql});var J=m(X=>{"use strict";Object.defineProperty(X,"__esModule",{value:!0});X.or=X.and=X.not=X.CodeGen=X.operators=X.varKinds=X.ValueScopeName=X.ValueScope=X.Scope=X.Name=X.regexpCode=X.stringify=X.getProperty=X.nil=X.strConcat=X.str=X._=void 0;var te=ps(),St=Zl(),ur=ps();Object.defineProperty(X,"_",{enumerable:!0,get:function(){return ur._}});Object.defineProperty(X,"str",{enumerable:!0,get:function(){return ur.str}});Object.defineProperty(X,"strConcat",{enumerable:!0,get:function(){return ur.strConcat}});Object.defineProperty(X,"nil",{enumerable:!0,get:function(){return ur.nil}});Object.defineProperty(X,"getProperty",{enumerable:!0,get:function(){return ur.getProperty}});Object.defineProperty(X,"stringify",{enumerable:!0,get:function(){return ur.stringify}});Object.defineProperty(X,"regexpCode",{enumerable:!0,get:function(){return ur.regexpCode}});Object.defineProperty(X,"Name",{enumerable:!0,get:function(){return ur.Name}});var jo=Zl();Object.defineProperty(X,"Scope",{enumerable:!0,get:function(){return jo.Scope}});Object.defineProperty(X,"ValueScope",{enumerable:!0,get:function(){return jo.ValueScope}});Object.defineProperty(X,"ValueScopeName",{enumerable:!0,get:function(){return jo.ValueScopeName}});Object.defineProperty(X,"varKinds",{enumerable:!0,get:function(){return jo.varKinds}});X.operators={GT:new te._Code(">"),GTE:new te._Code(">="),LT:new te._Code("<"),LTE:new te._Code("<="),EQ:new te._Code("==="),NEQ:new te._Code("!=="),NOT:new te._Code("!"),OR:new te._Code("||"),AND:new te._Code("&&"),ADD:new te._Code("+")};var Kt=class{optimizeNodes(){return this}optimizeNames(e,r){return this}},eu=class extends Kt{constructor(e,r,n){super(),this.varKind=e,this.name=r,this.rhs=n}render({es5:e,_n:r}){let n=e?St.varKinds.var:this.varKind,s=this.rhs===void 0?"":` = ${this.rhs}`;return`${n} ${this.name}${s};`+r}optimizeNames(e,r){if(e[this.name.str])return this.rhs&&(this.rhs=dn(this.rhs,e,r)),this}get names(){return this.rhs instanceof te._CodeOrName?this.rhs.names:{}}},qo=class extends Kt{constructor(e,r,n){super(),this.lhs=e,this.rhs=r,this.sideEffects=n}render({_n:e}){return`${this.lhs} = ${this.rhs};`+e}optimizeNames(e,r){if(!(this.lhs instanceof te.Name&&!e[this.lhs.str]&&!this.sideEffects))return this.rhs=dn(this.rhs,e,r),this}get names(){let e=this.lhs instanceof te.Name?{}:{...this.lhs.names};return xo(e,this.rhs)}},tu=class extends qo{constructor(e,r,n,s){super(e,n,s),this.op=r}render({_n:e}){return`${this.lhs} ${this.op}= ${this.rhs};`+e}},ru=class extends Kt{constructor(e){super(),this.label=e,this.names={}}render({_n:e}){return`${this.label}:`+e}},nu=class extends Kt{constructor(e){super(),this.label=e,this.names={}}render({_n:e}){return`break${this.label?` ${this.label}`:""};`+e}},su=class extends Kt{constructor(e){super(),this.error=e}render({_n:e}){return`throw ${this.error};`+e}get names(){return this.error.names}},iu=class extends Kt{constructor(e){super(),this.code=e}render({_n:e}){return`${this.code};`+e}optimizeNodes(){return`${this.code}`?this:void 0}optimizeNames(e,r){return this.code=dn(this.code,e,r),this}get names(){return this.code instanceof te._CodeOrName?this.code.names:{}}},ms=class extends Kt{constructor(e=[]){super(),this.nodes=e}render(e){return this.nodes.reduce((r,n)=>r+n.render(e),"")}optimizeNodes(){let{nodes:e}=this,r=e.length;for(;r--;){let n=e[r].optimizeNodes();Array.isArray(n)?e.splice(r,1,...n):n?e[r]=n:e.splice(r,1)}return e.length>0?this:void 0}optimizeNames(e,r){let{nodes:n}=this,s=n.length;for(;s--;){let i=n[s];i.optimizeNames(e,r)||(b2(e,i.names),n.splice(s,1))}return n.length>0?this:void 0}get names(){return this.nodes.reduce((e,r)=>jr(e,r.names),{})}},Gt=class extends ms{render(e){return"{"+e._n+super.render(e)+"}"+e._n}},ou=class extends ms{},fn=class extends Gt{};fn.kind="else";var Mr=class t extends Gt{constructor(e,r){super(r),this.condition=e}render(e){let r=`if(${this.condition})`+super.render(e);return this.else&&(r+="else "+this.else.render(e)),r}optimizeNodes(){super.optimizeNodes();let e=this.condition;if(e===!0)return this.nodes;let r=this.else;if(r){let n=r.optimizeNodes();r=this.else=Array.isArray(n)?new fn(n):n}if(r)return e===!1?r instanceof t?r:r.nodes:this.nodes.length?this:new t(Cy(e),r instanceof t?[r]:r.nodes);if(!(e===!1||!this.nodes.length))return this}optimizeNames(e,r){var n;if(this.else=(n=this.else)===null||n===void 0?void 0:n.optimizeNames(e,r),!!(super.optimizeNames(e,r)||this.else))return this.condition=dn(this.condition,e,r),this}get names(){let e=super.names;return xo(e,this.condition),this.else&&jr(e,this.else.names),e}};Mr.kind="if";var xr=class extends Gt{};xr.kind="for";var au=class extends xr{constructor(e){super(),this.iteration=e}render(e){return`for(${this.iteration})`+super.render(e)}optimizeNames(e,r){if(super.optimizeNames(e,r))return this.iteration=dn(this.iteration,e,r),this}get names(){return jr(super.names,this.iteration.names)}},cu=class extends xr{constructor(e,r,n,s){super(),this.varKind=e,this.name=r,this.from=n,this.to=s}render(e){let r=e.es5?St.varKinds.var:this.varKind,{name:n,from:s,to:i}=this;return`for(${r} ${n}=${s}; ${n}<${i}; ${n}++)`+super.render(e)}get names(){let e=xo(super.names,this.from);return xo(e,this.to)}},Mo=class extends xr{constructor(e,r,n,s){super(),this.loop=e,this.varKind=r,this.name=n,this.iterable=s}render(e){return`for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})`+super.render(e)}optimizeNames(e,r){if(super.optimizeNames(e,r))return this.iterable=dn(this.iterable,e,r),this}get names(){return jr(super.names,this.iterable.names)}},_s=class extends Gt{constructor(e,r,n){super(),this.name=e,this.args=r,this.async=n}render(e){return`${this.async?"async ":""}function ${this.name}(${this.args})`+super.render(e)}};_s.kind="func";var gs=class extends ms{render(e){return"return "+super.render(e)}};gs.kind="return";var lu=class extends Gt{render(e){let r="try"+super.render(e);return this.catch&&(r+=this.catch.render(e)),this.finally&&(r+=this.finally.render(e)),r}optimizeNodes(){var e,r;return super.optimizeNodes(),(e=this.catch)===null||e===void 0||e.optimizeNodes(),(r=this.finally)===null||r===void 0||r.optimizeNodes(),this}optimizeNames(e,r){var n,s;return super.optimizeNames(e,r),(n=this.catch)===null||n===void 0||n.optimizeNames(e,r),(s=this.finally)===null||s===void 0||s.optimizeNames(e,r),this}get names(){let e=super.names;return this.catch&&jr(e,this.catch.names),this.finally&&jr(e,this.finally.names),e}},ys=class extends Gt{constructor(e){super(),this.error=e}render(e){return`catch(${this.error})`+super.render(e)}};ys.kind="catch";var Es=class extends Gt{render(e){return"finally"+super.render(e)}};Es.kind="finally";var uu=class{constructor(e,r={}){this._values={},this._blockStarts=[],this._constants={},this.opts={...r,_n:r.lines?`
`:""},this._extScope=e,this._scope=new St.Scope({parent:e}),this._nodes=[new ou]}toString(){return this._root.render(this.opts)}name(e){return this._scope.name(e)}scopeName(e){return this._extScope.name(e)}scopeValue(e,r){let n=this._extScope.value(e,r);return(this._values[n.prefix]||(this._values[n.prefix]=new Set)).add(n),n}getScopeValue(e,r){return this._extScope.getValue(e,r)}scopeRefs(e){return this._extScope.scopeRefs(e,this._values)}scopeCode(){return this._extScope.scopeCode(this._values)}_def(e,r,n,s){let i=this._scope.toName(r);return n!==void 0&&s&&(this._constants[i.str]=n),this._leafNode(new eu(e,i,n)),i}const(e,r,n){return this._def(St.varKinds.const,e,r,n)}let(e,r,n){return this._def(St.varKinds.let,e,r,n)}var(e,r,n){return this._def(St.varKinds.var,e,r,n)}assign(e,r,n){return this._leafNode(new qo(e,r,n))}add(e,r){return this._leafNode(new tu(e,X.operators.ADD,r))}code(e){return typeof e=="function"?e():e!==te.nil&&this._leafNode(new iu(e)),this}object(...e){let r=["{"];for(let[n,s]of e)r.length>1&&r.push(","),r.push(n),(n!==s||this.opts.es5)&&(r.push(":"),(0,te.addCodeArg)(r,s));return r.push("}"),new te._Code(r)}if(e,r,n){if(this._blockNode(new Mr(e)),r&&n)this.code(r).else().code(n).endIf();else if(r)this.code(r).endIf();else if(n)throw new Error('CodeGen: "else" body without "then" body');return this}elseIf(e){return this._elseNode(new Mr(e))}else(){return this._elseNode(new fn)}endIf(){return this._endBlockNode(Mr,fn)}_for(e,r){return this._blockNode(e),r&&this.code(r).endFor(),this}for(e,r){return this._for(new au(e),r)}forRange(e,r,n,s,i=this.opts.es5?St.varKinds.var:St.varKinds.let){let o=this._scope.toName(e);return this._for(new cu(i,o,r,n),()=>s(o))}forOf(e,r,n,s=St.varKinds.const){let i=this._scope.toName(e);if(this.opts.es5){let o=r instanceof te.Name?r:this.var("_arr",r);return this.forRange("_i",0,(0,te._)`${o}.length`,a=>{this.var(i,(0,te._)`${o}[${a}]`),n(i)})}return this._for(new Mo("of",s,i,r),()=>n(i))}forIn(e,r,n,s=this.opts.es5?St.varKinds.var:St.varKinds.const){if(this.opts.ownProperties)return this.forOf(e,(0,te._)`Object.keys(${r})`,n);let i=this._scope.toName(e);return this._for(new Mo("in",s,i,r),()=>n(i))}endFor(){return this._endBlockNode(xr)}label(e){return this._leafNode(new ru(e))}break(e){return this._leafNode(new nu(e))}return(e){let r=new gs;if(this._blockNode(r),this.code(e),r.nodes.length!==1)throw new Error('CodeGen: "return" should have one node');return this._endBlockNode(gs)}try(e,r,n){if(!r&&!n)throw new Error('CodeGen: "try" without "catch" and "finally"');let s=new lu;if(this._blockNode(s),this.code(e),r){let i=this.name("e");this._currNode=s.catch=new ys(i),r(i)}return n&&(this._currNode=s.finally=new Es,this.code(n)),this._endBlockNode(ys,Es)}throw(e){return this._leafNode(new su(e))}block(e,r){return this._blockStarts.push(this._nodes.length),e&&this.code(e).endBlock(r),this}endBlock(e){let r=this._blockStarts.pop();if(r===void 0)throw new Error("CodeGen: not in self-balancing block");let n=this._nodes.length-r;if(n<0||e!==void 0&&n!==e)throw new Error(`CodeGen: wrong number of nodes: ${n} vs ${e} expected`);return this._nodes.length=r,this}func(e,r=te.nil,n,s){return this._blockNode(new _s(e,r,n)),s&&this.code(s).endFunc(),this}endFunc(){return this._endBlockNode(_s)}optimize(e=1){for(;e-- >0;)this._root.optimizeNodes(),this._root.optimizeNames(this._root.names,this._constants)}_leafNode(e){return this._currNode.nodes.push(e),this}_blockNode(e){this._currNode.nodes.push(e),this._nodes.push(e)}_endBlockNode(e,r){let n=this._currNode;if(n instanceof e||r&&n instanceof r)return this._nodes.pop(),this;throw new Error(`CodeGen: not in block "${r?`${e.kind}/${r.kind}`:e.kind}"`)}_elseNode(e){let r=this._currNode;if(!(r instanceof Mr))throw new Error('CodeGen: "else" without "if"');return this._currNode=r.else=e,this}get _root(){return this._nodes[0]}get _currNode(){let e=this._nodes;return e[e.length-1]}set _currNode(e){let r=this._nodes;r[r.length-1]=e}};X.CodeGen=uu;function jr(t,e){for(let r in e)t[r]=(t[r]||0)+(e[r]||0);return t}function xo(t,e){return e instanceof te._CodeOrName?jr(t,e.names):t}function dn(t,e,r){if(t instanceof te.Name)return n(t);if(!s(t))return t;return new te._Code(t._items.reduce((i,o)=>(o instanceof te.Name&&(o=n(o)),o instanceof te._Code?i.push(...o._items):i.push(o),i),[]));function n(i){let o=r[i.str];return o===void 0||e[i.str]!==1?i:(delete e[i.str],o)}function s(i){return i instanceof te._Code&&i._items.some(o=>o instanceof te.Name&&e[o.str]===1&&r[o.str]!==void 0)}}function b2(t,e){for(let r in e)t[r]=(t[r]||0)-(e[r]||0)}function Cy(t){return typeof t=="boolean"||typeof t=="number"||t===null?!t:(0,te._)`!${fu(t)}`}X.not=Cy;var I2=ky(X.operators.AND);function A2(...t){return t.reduce(I2)}X.and=A2;var $2=ky(X.operators.OR);function L2(...t){return t.reduce($2)}X.or=L2;function ky(t){return(e,r)=>e===te.nil?r:r===te.nil?e:(0,te._)`${fu(e)} ${t} ${fu(r)}`}function fu(t){return t instanceof te.Name?t:(0,te._)`(${t})`}});var ne=m(Z=>{"use strict";Object.defineProperty(Z,"__esModule",{value:!0});Z.checkStrictMode=Z.getErrorPath=Z.Type=Z.useFunc=Z.setEvaluated=Z.evaluatedPropsToName=Z.mergeEvaluated=Z.eachItem=Z.unescapeJsonPointer=Z.escapeJsonPointer=Z.escapeFragment=Z.unescapeFragment=Z.schemaRefOrVal=Z.schemaHasRulesButRef=Z.schemaHasRules=Z.checkUnknownRules=Z.alwaysValidSchema=Z.toHash=void 0;var me=J(),N2=ps();function O2(t){let e={};for(let r of t)e[r]=!0;return e}Z.toHash=O2;function P2(t,e){return typeof e=="boolean"?e:Object.keys(e).length===0?!0:(xy(t,e),!jy(e,t.self.RULES.all))}Z.alwaysValidSchema=P2;function xy(t,e=t.schema){let{opts:r,self:n}=t;if(!r.strictSchema||typeof e=="boolean")return;let s=n.RULES.keywords;for(let i in e)s[i]||Uy(t,`unknown keyword: "${i}"`)}Z.checkUnknownRules=xy;function jy(t,e){if(typeof t=="boolean")return!t;for(let r in t)if(e[r])return!0;return!1}Z.schemaHasRules=jy;function R2(t,e){if(typeof t=="boolean")return!t;for(let r in t)if(r!=="$ref"&&e.all[r])return!0;return!1}Z.schemaHasRulesButRef=R2;function C2({topSchemaRef:t,schemaPath:e},r,n,s){if(!s){if(typeof r=="number"||typeof r=="boolean")return r;if(typeof r=="string")return(0,me._)`${r}`}return(0,me._)`${t}${e}${(0,me.getProperty)(n)}`}Z.schemaRefOrVal=C2;function k2(t){return Dy(decodeURIComponent(t))}Z.unescapeFragment=k2;function q2(t){return encodeURIComponent(hu(t))}Z.escapeFragment=q2;function hu(t){return typeof t=="number"?`${t}`:t.replace(/~/g,"~0").replace(/\//g,"~1")}Z.escapeJsonPointer=hu;function Dy(t){return t.replace(/~1/g,"/").replace(/~0/g,"~")}Z.unescapeJsonPointer=Dy;function M2(t,e){if(Array.isArray(t))for(let r of t)e(r);else e(t)}Z.eachItem=M2;function qy({mergeNames:t,mergeToName:e,mergeValues:r,resultToName:n}){return(s,i,o,a)=>{let c=o===void 0?i:o instanceof me.Name?(i instanceof me.Name?t(s,i,o):e(s,i,o),o):i instanceof me.Name?(e(s,o,i),i):r(i,o);return a===me.Name&&!(c instanceof me.Name)?n(s,c):c}}Z.mergeEvaluated={props:qy({mergeNames:(t,e,r)=>t.if((0,me._)`${r} !== true && ${e} !== undefined`,()=>{t.if((0,me._)`${e} === true`,()=>t.assign(r,!0),()=>t.assign(r,(0,me._)`${r} || {}`).code((0,me._)`Object.assign(${r}, ${e})`))}),mergeToName:(t,e,r)=>t.if((0,me._)`${r} !== true`,()=>{e===!0?t.assign(r,!0):(t.assign(r,(0,me._)`${r} || {}`),pu(t,r,e))}),mergeValues:(t,e)=>t===!0?!0:{...t,...e},resultToName:Fy}),items:qy({mergeNames:(t,e,r)=>t.if((0,me._)`${r} !== true && ${e} !== undefined`,()=>t.assign(r,(0,me._)`${e} === true ? true : ${r} > ${e} ? ${r} : ${e}`)),mergeToName:(t,e,r)=>t.if((0,me._)`${r} !== true`,()=>t.assign(r,e===!0?!0:(0,me._)`${r} > ${e} ? ${r} : ${e}`)),mergeValues:(t,e)=>t===!0?!0:Math.max(t,e),resultToName:(t,e)=>t.var("items",e)})};function Fy(t,e){if(e===!0)return t.var("props",!0);let r=t.var("props",(0,me._)`{}`);return e!==void 0&&pu(t,r,e),r}Z.evaluatedPropsToName=Fy;function pu(t,e,r){Object.keys(r).forEach(n=>t.assign((0,me._)`${e}${(0,me.getProperty)(n)}`,!0))}Z.setEvaluated=pu;var My={};function x2(t,e){return t.scopeValue("func",{ref:e,code:My[e.code]||(My[e.code]=new N2._Code(e.code))})}Z.useFunc=x2;var du;(function(t){t[t.Num=0]="Num",t[t.Str=1]="Str"})(du||(Z.Type=du={}));function j2(t,e,r){if(t instanceof me.Name){let n=e===du.Num;return r?n?(0,me._)`"[" + ${t} + "]"`:(0,me._)`"['" + ${t} + "']"`:n?(0,me._)`"/" + ${t}`:(0,me._)`"/" + ${t}.replace(/~/g, "~0").replace(/\\//g, "~1")`}return r?(0,me.getProperty)(t).toString():"/"+hu(t)}Z.getErrorPath=j2;function Uy(t,e,r=t.opts.strictSchema){if(r){if(e=`strict mode: ${e}`,r===!0)throw new Error(e);t.self.logger.warn(e)}}Z.checkStrictMode=Uy});var zt=m(mu=>{"use strict";Object.defineProperty(mu,"__esModule",{value:!0});var Ue=J(),D2={data:new Ue.Name("data"),valCxt:new Ue.Name("valCxt"),instancePath:new Ue.Name("instancePath"),parentData:new Ue.Name("parentData"),parentDataProperty:new Ue.Name("parentDataProperty"),rootData:new Ue.Name("rootData"),dynamicAnchors:new Ue.Name("dynamicAnchors"),vErrors:new Ue.Name("vErrors"),errors:new Ue.Name("errors"),this:new Ue.Name("this"),self:new Ue.Name("self"),scope:new Ue.Name("scope"),json:new Ue.Name("json"),jsonPos:new Ue.Name("jsonPos"),jsonLen:new Ue.Name("jsonLen"),jsonPart:new Ue.Name("jsonPart")};mu.default=D2});var vs=m(Ve=>{"use strict";Object.defineProperty(Ve,"__esModule",{value:!0});Ve.extendErrors=Ve.resetErrorsCount=Ve.reportExtraError=Ve.reportError=Ve.keyword$DataError=Ve.keywordError=void 0;var se=J(),Do=ne(),Ye=zt();Ve.keywordError={message:({keyword:t})=>(0,se.str)`must pass "${t}" keyword validation`};Ve.keyword$DataError={message:({keyword:t,schemaType:e})=>e?(0,se.str)`"${t}" keyword must be ${e} ($data)`:(0,se.str)`"${t}" keyword is invalid ($data)`};function F2(t,e=Ve.keywordError,r,n){let{it:s}=t,{gen:i,compositeRule:o,allErrors:a}=s,c=Hy(t,e,r);n??(o||a)?Vy(i,c):By(s,(0,se._)`[${c}]`)}Ve.reportError=F2;function U2(t,e=Ve.keywordError,r){let{it:n}=t,{gen:s,compositeRule:i,allErrors:o}=n,a=Hy(t,e,r);Vy(s,a),i||o||By(n,Ye.default.vErrors)}Ve.reportExtraError=U2;function V2(t,e){t.assign(Ye.default.errors,e),t.if((0,se._)`${Ye.default.vErrors} !== null`,()=>t.if(e,()=>t.assign((0,se._)`${Ye.default.vErrors}.length`,e),()=>t.assign(Ye.default.vErrors,null)))}Ve.resetErrorsCount=V2;function B2({gen:t,keyword:e,schemaValue:r,data:n,errsCount:s,it:i}){if(s===void 0)throw new Error("ajv implementation error");let o=t.name("err");t.forRange("i",s,Ye.default.errors,a=>{t.const(o,(0,se._)`${Ye.default.vErrors}[${a}]`),t.if((0,se._)`${o}.instancePath === undefined`,()=>t.assign((0,se._)`${o}.instancePath`,(0,se.strConcat)(Ye.default.instancePath,i.errorPath))),t.assign((0,se._)`${o}.schemaPath`,(0,se.str)`${i.errSchemaPath}/${e}`),i.opts.verbose&&(t.assign((0,se._)`${o}.schema`,r),t.assign((0,se._)`${o}.data`,n))})}Ve.extendErrors=B2;function Vy(t,e){let r=t.const("err",e);t.if((0,se._)`${Ye.default.vErrors} === null`,()=>t.assign(Ye.default.vErrors,(0,se._)`[${r}]`),(0,se._)`${Ye.default.vErrors}.push(${r})`),t.code((0,se._)`${Ye.default.errors}++`)}function By(t,e){let{gen:r,validateName:n,schemaEnv:s}=t;s.$async?r.throw((0,se._)`new ${t.ValidationError}(${e})`):(r.assign((0,se._)`${n}.errors`,e),r.return(!1))}var Dr={keyword:new se.Name("keyword"),schemaPath:new se.Name("schemaPath"),params:new se.Name("params"),propertyName:new se.Name("propertyName"),message:new se.Name("message"),schema:new se.Name("schema"),parentSchema:new se.Name("parentSchema")};function Hy(t,e,r){let{createErrors:n}=t.it;return n===!1?(0,se._)`{}`:H2(t,e,r)}function H2(t,e,r={}){let{gen:n,it:s}=t,i=[W2(s,r),K2(t,r)];return G2(t,e,i),n.object(...i)}function W2({errorPath:t},{instancePath:e}){let r=e?(0,se.str)`${t}${(0,Do.getErrorPath)(e,Do.Type.Str)}`:t;return[Ye.default.instancePath,(0,se.strConcat)(Ye.default.instancePath,r)]}function K2({keyword:t,it:{errSchemaPath:e}},{schemaPath:r,parentSchema:n}){let s=n?e:(0,se.str)`${e}/${t}`;return r&&(s=(0,se.str)`${s}${(0,Do.getErrorPath)(r,Do.Type.Str)}`),[Dr.schemaPath,s]}function G2(t,{params:e,message:r},n){let{keyword:s,data:i,schemaValue:o,it:a}=t,{opts:c,propertyName:l,topSchemaRef:u,schemaPath:f}=a;n.push([Dr.keyword,s],[Dr.params,typeof e=="function"?e(t):e||(0,se._)`{}`]),c.messages&&n.push([Dr.message,typeof r=="function"?r(t):r]),c.verbose&&n.push([Dr.schema,o],[Dr.parentSchema,(0,se._)`${u}${f}`],[Ye.default.data,i]),l&&n.push([Dr.propertyName,l])}});var Ky=m(hn=>{"use strict";Object.defineProperty(hn,"__esModule",{value:!0});hn.boolOrEmptySchema=hn.topBoolOrEmptySchema=void 0;var z2=vs(),J2=J(),Y2=zt(),X2={message:"boolean schema is false"};function Q2(t){let{gen:e,schema:r,validateName:n}=t;r===!1?Wy(t,!1):typeof r=="object"&&r.$async===!0?e.return(Y2.default.data):(e.assign((0,J2._)`${n}.errors`,null),e.return(!0))}hn.topBoolOrEmptySchema=Q2;function Z2(t,e){let{gen:r,schema:n}=t;n===!1?(r.var(e,!1),Wy(t)):r.var(e,!0)}hn.boolOrEmptySchema=Z2;function Wy(t,e){let{gen:r,data:n}=t,s={gen:r,keyword:"false schema",data:n,schema:!1,schemaCode:!1,schemaValue:!1,params:{},it:t};(0,z2.reportError)(s,X2,void 0,e)}});var _u=m(pn=>{"use strict";Object.defineProperty(pn,"__esModule",{value:!0});pn.getRules=pn.isJSONType=void 0;var eP=["string","number","integer","boolean","null","object","array"],tP=new Set(eP);function rP(t){return typeof t=="string"&&tP.has(t)}pn.isJSONType=rP;function nP(){let t={number:{type:"number",rules:[]},string:{type:"string",rules:[]},array:{type:"array",rules:[]},object:{type:"object",rules:[]}};return{types:{...t,integer:!0,boolean:!0,null:!0},rules:[{rules:[]},t.number,t.string,t.array,t.object],post:{rules:[]},all:{},keywords:{}}}pn.getRules=nP});var gu=m(fr=>{"use strict";Object.defineProperty(fr,"__esModule",{value:!0});fr.shouldUseRule=fr.shouldUseGroup=fr.schemaHasRulesForType=void 0;function sP({schema:t,self:e},r){let n=e.RULES.types[r];return n&&n!==!0&&Gy(t,n)}fr.schemaHasRulesForType=sP;function Gy(t,e){return e.rules.some(r=>zy(t,r))}fr.shouldUseGroup=Gy;function zy(t,e){var r;return t[e.keyword]!==void 0||((r=e.definition.implements)===null||r===void 0?void 0:r.some(n=>t[n]!==void 0))}fr.shouldUseRule=zy});var ws=m(Be=>{"use strict";Object.defineProperty(Be,"__esModule",{value:!0});Be.reportTypeError=Be.checkDataTypes=Be.checkDataType=Be.coerceAndCheckDataType=Be.getJSONTypes=Be.getSchemaTypes=Be.DataType=void 0;var iP=_u(),oP=gu(),aP=vs(),Y=J(),Jy=ne(),mn;(function(t){t[t.Correct=0]="Correct",t[t.Wrong=1]="Wrong"})(mn||(Be.DataType=mn={}));function cP(t){let e=Yy(t.type);if(e.includes("null")){if(t.nullable===!1)throw new Error("type: null contradicts nullable: false")}else{if(!e.length&&t.nullable!==void 0)throw new Error('"nullable" cannot be used without "type"');t.nullable===!0&&e.push("null")}return e}Be.getSchemaTypes=cP;function Yy(t){let e=Array.isArray(t)?t:t?[t]:[];if(e.every(iP.isJSONType))return e;throw new Error("type must be JSONType or JSONType[]: "+e.join(","))}Be.getJSONTypes=Yy;function lP(t,e){let{gen:r,data:n,opts:s}=t,i=uP(e,s.coerceTypes),o=e.length>0&&!(i.length===0&&e.length===1&&(0,oP.schemaHasRulesForType)(t,e[0]));if(o){let a=Eu(e,n,s.strictNumbers,mn.Wrong);r.if(a,()=>{i.length?fP(t,e,i):vu(t)})}return o}Be.coerceAndCheckDataType=lP;var Xy=new Set(["string","number","integer","boolean","null"]);function uP(t,e){return e?t.filter(r=>Xy.has(r)||e==="array"&&r==="array"):[]}function fP(t,e,r){let{gen:n,data:s,opts:i}=t,o=n.let("dataType",(0,Y._)`typeof ${s}`),a=n.let("coerced",(0,Y._)`undefined`);i.coerceTypes==="array"&&n.if((0,Y._)`${o} == 'object' && Array.isArray(${s}) && ${s}.length == 1`,()=>n.assign(s,(0,Y._)`${s}[0]`).assign(o,(0,Y._)`typeof ${s}`).if(Eu(e,s,i.strictNumbers),()=>n.assign(a,s))),n.if((0,Y._)`${a} !== undefined`);for(let l of r)(Xy.has(l)||l==="array"&&i.coerceTypes==="array")&&c(l);n.else(),vu(t),n.endIf(),n.if((0,Y._)`${a} !== undefined`,()=>{n.assign(s,a),dP(t,a)});function c(l){switch(l){case"string":n.elseIf((0,Y._)`${o} == "number" || ${o} == "boolean"`).assign(a,(0,Y._)`"" + ${s}`).elseIf((0,Y._)`${s} === null`).assign(a,(0,Y._)`""`);return;case"number":n.elseIf((0,Y._)`${o} == "boolean" || ${s} === null
              || (${o} == "string" && ${s} && ${s} == +${s})`).assign(a,(0,Y._)`+${s}`);return;case"integer":n.elseIf((0,Y._)`${o} === "boolean" || ${s} === null
              || (${o} === "string" && ${s} && ${s} == +${s} && !(${s} % 1))`).assign(a,(0,Y._)`+${s}`);return;case"boolean":n.elseIf((0,Y._)`${s} === "false" || ${s} === 0 || ${s} === null`).assign(a,!1).elseIf((0,Y._)`${s} === "true" || ${s} === 1`).assign(a,!0);return;case"null":n.elseIf((0,Y._)`${s} === "" || ${s} === 0 || ${s} === false`),n.assign(a,null);return;case"array":n.elseIf((0,Y._)`${o} === "string" || ${o} === "number"
              || ${o} === "boolean" || ${s} === null`).assign(a,(0,Y._)`[${s}]`)}}}function dP({gen:t,parentData:e,parentDataProperty:r},n){t.if((0,Y._)`${e} !== undefined`,()=>t.assign((0,Y._)`${e}[${r}]`,n))}function yu(t,e,r,n=mn.Correct){let s=n===mn.Correct?Y.operators.EQ:Y.operators.NEQ,i;switch(t){case"null":return(0,Y._)`${e} ${s} null`;case"array":i=(0,Y._)`Array.isArray(${e})`;break;case"object":i=(0,Y._)`${e} && typeof ${e} == "object" && !Array.isArray(${e})`;break;case"integer":i=o((0,Y._)`!(${e} % 1) && !isNaN(${e})`);break;case"number":i=o();break;default:return(0,Y._)`typeof ${e} ${s} ${t}`}return n===mn.Correct?i:(0,Y.not)(i);function o(a=Y.nil){return(0,Y.and)((0,Y._)`typeof ${e} == "number"`,a,r?(0,Y._)`isFinite(${e})`:Y.nil)}}Be.checkDataType=yu;function Eu(t,e,r,n){if(t.length===1)return yu(t[0],e,r,n);let s,i=(0,Jy.toHash)(t);if(i.array&&i.object){let o=(0,Y._)`typeof ${e} != "object"`;s=i.null?o:(0,Y._)`!${e} || ${o}`,delete i.null,delete i.array,delete i.object}else s=Y.nil;i.number&&delete i.integer;for(let o in i)s=(0,Y.and)(s,yu(o,e,r,n));return s}Be.checkDataTypes=Eu;var hP={message:({schema:t})=>`must be ${t}`,params:({schema:t,schemaValue:e})=>typeof t=="string"?(0,Y._)`{type: ${t}}`:(0,Y._)`{type: ${e}}`};function vu(t){let e=pP(t);(0,aP.reportError)(e,hP)}Be.reportTypeError=vu;function pP(t){let{gen:e,data:r,schema:n}=t,s=(0,Jy.schemaRefOrVal)(t,n,"type");return{gen:e,keyword:"type",data:r,schema:n.type,schemaCode:s,schemaValue:s,parentSchema:n,params:{},it:t}}});var Zy=m(Fo=>{"use strict";Object.defineProperty(Fo,"__esModule",{value:!0});Fo.assignDefaults=void 0;var _n=J(),mP=ne();function _P(t,e){let{properties:r,items:n}=t.schema;if(e==="object"&&r)for(let s in r)Qy(t,s,r[s].default);else e==="array"&&Array.isArray(n)&&n.forEach((s,i)=>Qy(t,i,s.default))}Fo.assignDefaults=_P;function Qy(t,e,r){let{gen:n,compositeRule:s,data:i,opts:o}=t;if(r===void 0)return;let a=(0,_n._)`${i}${(0,_n.getProperty)(e)}`;if(s){(0,mP.checkStrictMode)(t,`default is ignored for: ${a}`);return}let c=(0,_n._)`${a} === undefined`;o.useDefaults==="empty"&&(c=(0,_n._)`${c} || ${a} === null || ${a} === ""`),n.if(c,(0,_n._)`${a} = ${(0,_n.stringify)(r)}`)}});var ht=m(he=>{"use strict";Object.defineProperty(he,"__esModule",{value:!0});he.validateUnion=he.validateArray=he.usePattern=he.callValidateCode=he.schemaProperties=he.allSchemaProperties=he.noPropertyInData=he.propertyInData=he.isOwnProperty=he.hasPropFunc=he.reportMissingProp=he.checkMissingProp=he.checkReportMissingProp=void 0;var ge=J(),wu=ne(),dr=zt(),gP=ne();function yP(t,e){let{gen:r,data:n,it:s}=t;r.if(Tu(r,n,e,s.opts.ownProperties),()=>{t.setParams({missingProperty:(0,ge._)`${e}`},!0),t.error()})}he.checkReportMissingProp=yP;function EP({gen:t,data:e,it:{opts:r}},n,s){return(0,ge.or)(...n.map(i=>(0,ge.and)(Tu(t,e,i,r.ownProperties),(0,ge._)`${s} = ${i}`)))}he.checkMissingProp=EP;function vP(t,e){t.setParams({missingProperty:e},!0),t.error()}he.reportMissingProp=vP;function eE(t){return t.scopeValue("func",{ref:Object.prototype.hasOwnProperty,code:(0,ge._)`Object.prototype.hasOwnProperty`})}he.hasPropFunc=eE;function Su(t,e,r){return(0,ge._)`${eE(t)}.call(${e}, ${r})`}he.isOwnProperty=Su;function wP(t,e,r,n){let s=(0,ge._)`${e}${(0,ge.getProperty)(r)} !== undefined`;return n?(0,ge._)`${s} && ${Su(t,e,r)}`:s}he.propertyInData=wP;function Tu(t,e,r,n){let s=(0,ge._)`${e}${(0,ge.getProperty)(r)} === undefined`;return n?(0,ge.or)(s,(0,ge.not)(Su(t,e,r))):s}he.noPropertyInData=Tu;function tE(t){return t?Object.keys(t).filter(e=>e!=="__proto__"):[]}he.allSchemaProperties=tE;function SP(t,e){return tE(e).filter(r=>!(0,wu.alwaysValidSchema)(t,e[r]))}he.schemaProperties=SP;function TP({schemaCode:t,data:e,it:{gen:r,topSchemaRef:n,schemaPath:s,errorPath:i},it:o},a,c,l){let u=l?(0,ge._)`${t}, ${e}, ${n}${s}`:e,f=[[dr.default.instancePath,(0,ge.strConcat)(dr.default.instancePath,i)],[dr.default.parentData,o.parentData],[dr.default.parentDataProperty,o.parentDataProperty],[dr.default.rootData,dr.default.rootData]];o.opts.dynamicRef&&f.push([dr.default.dynamicAnchors,dr.default.dynamicAnchors]);let d=(0,ge._)`${u}, ${r.object(...f)}`;return c!==ge.nil?(0,ge._)`${a}.call(${c}, ${d})`:(0,ge._)`${a}(${d})`}he.callValidateCode=TP;var bP=(0,ge._)`new RegExp`;function IP({gen:t,it:{opts:e}},r){let n=e.unicodeRegExp?"u":"",{regExp:s}=e.code,i=s(r,n);return t.scopeValue("pattern",{key:i.toString(),ref:i,code:(0,ge._)`${s.code==="new RegExp"?bP:(0,gP.useFunc)(t,s)}(${r}, ${n})`})}he.usePattern=IP;function AP(t){let{gen:e,data:r,keyword:n,it:s}=t,i=e.name("valid");if(s.allErrors){let a=e.let("valid",!0);return o(()=>e.assign(a,!1)),a}return e.var(i,!0),o(()=>e.break()),i;function o(a){let c=e.const("len",(0,ge._)`${r}.length`);e.forRange("i",0,c,l=>{t.subschema({keyword:n,dataProp:l,dataPropType:wu.Type.Num},i),e.if((0,ge.not)(i),a)})}}he.validateArray=AP;function $P(t){let{gen:e,schema:r,keyword:n,it:s}=t;if(!Array.isArray(r))throw new Error("ajv implementation error");if(r.some(c=>(0,wu.alwaysValidSchema)(s,c))&&!s.opts.unevaluated)return;let o=e.let("valid",!1),a=e.name("_valid");e.block(()=>r.forEach((c,l)=>{let u=t.subschema({keyword:n,schemaProp:l,compositeRule:!0},a);e.assign(o,(0,ge._)`${o} || ${a}`),t.mergeValidEvaluated(u,a)||e.if((0,ge.not)(o))})),t.result(o,()=>t.reset(),()=>t.error(!0))}he.validateUnion=$P});var sE=m(Ct=>{"use strict";Object.defineProperty(Ct,"__esModule",{value:!0});Ct.validateKeywordUsage=Ct.validSchemaType=Ct.funcKeywordCode=Ct.macroKeywordCode=void 0;var Xe=J(),Fr=zt(),LP=ht(),NP=vs();function OP(t,e){let{gen:r,keyword:n,schema:s,parentSchema:i,it:o}=t,a=e.macro.call(o.self,s,i,o),c=nE(r,n,a);o.opts.validateSchema!==!1&&o.self.validateSchema(a,!0);let l=r.name("valid");t.subschema({schema:a,schemaPath:Xe.nil,errSchemaPath:`${o.errSchemaPath}/${n}`,topSchemaRef:c,compositeRule:!0},l),t.pass(l,()=>t.error(!0))}Ct.macroKeywordCode=OP;function PP(t,e){var r;let{gen:n,keyword:s,schema:i,parentSchema:o,$data:a,it:c}=t;CP(c,e);let l=!a&&e.compile?e.compile.call(c.self,i,o,c):e.validate,u=nE(n,s,l),f=n.let("valid");t.block$data(f,d),t.ok((r=e.valid)!==null&&r!==void 0?r:f);function d(){if(e.errors===!1)p(),e.modifying&&rE(t),_(()=>t.error());else{let y=e.async?h():g();e.modifying&&rE(t),_(()=>RP(t,y))}}function h(){let y=n.let("ruleErrs",null);return n.try(()=>p((0,Xe._)`await `),w=>n.assign(f,!1).if((0,Xe._)`${w} instanceof ${c.ValidationError}`,()=>n.assign(y,(0,Xe._)`${w}.errors`),()=>n.throw(w))),y}function g(){let y=(0,Xe._)`${u}.errors`;return n.assign(y,null),p(Xe.nil),y}function p(y=e.async?(0,Xe._)`await `:Xe.nil){let w=c.opts.passContext?Fr.default.this:Fr.default.self,b=!("compile"in e&&!a||e.schema===!1);n.assign(f,(0,Xe._)`${y}${(0,LP.callValidateCode)(t,u,w,b)}`,e.modifying)}function _(y){var w;n.if((0,Xe.not)((w=e.valid)!==null&&w!==void 0?w:f),y)}}Ct.funcKeywordCode=PP;function rE(t){let{gen:e,data:r,it:n}=t;e.if(n.parentData,()=>e.assign(r,(0,Xe._)`${n.parentData}[${n.parentDataProperty}]`))}function RP(t,e){let{gen:r}=t;r.if((0,Xe._)`Array.isArray(${e})`,()=>{r.assign(Fr.default.vErrors,(0,Xe._)`${Fr.default.vErrors} === null ? ${e} : ${Fr.default.vErrors}.concat(${e})`).assign(Fr.default.errors,(0,Xe._)`${Fr.default.vErrors}.length`),(0,NP.extendErrors)(t)},()=>t.error())}function CP({schemaEnv:t},e){if(e.async&&!t.$async)throw new Error("async keyword in sync schema")}function nE(t,e,r){if(r===void 0)throw new Error(`keyword "${e}" failed to compile`);return t.scopeValue("keyword",typeof r=="function"?{ref:r}:{ref:r,code:(0,Xe.stringify)(r)})}function kP(t,e,r=!1){return!e.length||e.some(n=>n==="array"?Array.isArray(t):n==="object"?t&&typeof t=="object"&&!Array.isArray(t):typeof t==n||r&&typeof t>"u")}Ct.validSchemaType=kP;function qP({schema:t,opts:e,self:r,errSchemaPath:n},s,i){if(Array.isArray(s.keyword)?!s.keyword.includes(i):s.keyword!==i)throw new Error("ajv implementation error");let o=s.dependencies;if(o?.some(a=>!Object.prototype.hasOwnProperty.call(t,a)))throw new Error(`parent schema must have dependencies of ${i}: ${o.join(",")}`);if(s.validateSchema&&!s.validateSchema(t[i])){let c=`keyword "${i}" value is invalid at path "${n}": `+r.errorsText(s.validateSchema.errors);if(e.validateSchema==="log")r.logger.error(c);else throw new Error(c)}}Ct.validateKeywordUsage=qP});var oE=m(hr=>{"use strict";Object.defineProperty(hr,"__esModule",{value:!0});hr.extendSubschemaMode=hr.extendSubschemaData=hr.getSubschema=void 0;var kt=J(),iE=ne();function MP(t,{keyword:e,schemaProp:r,schema:n,schemaPath:s,errSchemaPath:i,topSchemaRef:o}){if(e!==void 0&&n!==void 0)throw new Error('both "keyword" and "schema" passed, only one allowed');if(e!==void 0){let a=t.schema[e];return r===void 0?{schema:a,schemaPath:(0,kt._)`${t.schemaPath}${(0,kt.getProperty)(e)}`,errSchemaPath:`${t.errSchemaPath}/${e}`}:{schema:a[r],schemaPath:(0,kt._)`${t.schemaPath}${(0,kt.getProperty)(e)}${(0,kt.getProperty)(r)}`,errSchemaPath:`${t.errSchemaPath}/${e}/${(0,iE.escapeFragment)(r)}`}}if(n!==void 0){if(s===void 0||i===void 0||o===void 0)throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');return{schema:n,schemaPath:s,topSchemaRef:o,errSchemaPath:i}}throw new Error('either "keyword" or "schema" must be passed')}hr.getSubschema=MP;function xP(t,e,{dataProp:r,dataPropType:n,data:s,dataTypes:i,propertyName:o}){if(s!==void 0&&r!==void 0)throw new Error('both "data" and "dataProp" passed, only one allowed');let{gen:a}=e;if(r!==void 0){let{errorPath:l,dataPathArr:u,opts:f}=e,d=a.let("data",(0,kt._)`${e.data}${(0,kt.getProperty)(r)}`,!0);c(d),t.errorPath=(0,kt.str)`${l}${(0,iE.getErrorPath)(r,n,f.jsPropertySyntax)}`,t.parentDataProperty=(0,kt._)`${r}`,t.dataPathArr=[...u,t.parentDataProperty]}if(s!==void 0){let l=s instanceof kt.Name?s:a.let("data",s,!0);c(l),o!==void 0&&(t.propertyName=o)}i&&(t.dataTypes=i);function c(l){t.data=l,t.dataLevel=e.dataLevel+1,t.dataTypes=[],e.definedProperties=new Set,t.parentData=e.data,t.dataNames=[...e.dataNames,l]}}hr.extendSubschemaData=xP;function jP(t,{jtdDiscriminator:e,jtdMetadata:r,compositeRule:n,createErrors:s,allErrors:i}){n!==void 0&&(t.compositeRule=n),s!==void 0&&(t.createErrors=s),i!==void 0&&(t.allErrors=i),t.jtdDiscriminator=e,t.jtdMetadata=r}hr.extendSubschemaMode=jP});var bu=m((L4,aE)=>{"use strict";aE.exports=function t(e,r){if(e===r)return!0;if(e&&r&&typeof e=="object"&&typeof r=="object"){if(e.constructor!==r.constructor)return!1;var n,s,i;if(Array.isArray(e)){if(n=e.length,n!=r.length)return!1;for(s=n;s--!==0;)if(!t(e[s],r[s]))return!1;return!0}if(e.constructor===RegExp)return e.source===r.source&&e.flags===r.flags;if(e.valueOf!==Object.prototype.valueOf)return e.valueOf()===r.valueOf();if(e.toString!==Object.prototype.toString)return e.toString()===r.toString();if(i=Object.keys(e),n=i.length,n!==Object.keys(r).length)return!1;for(s=n;s--!==0;)if(!Object.prototype.hasOwnProperty.call(r,i[s]))return!1;for(s=n;s--!==0;){var o=i[s];if(!t(e[o],r[o]))return!1}return!0}return e!==e&&r!==r}});var lE=m((N4,cE)=>{"use strict";var pr=cE.exports=function(t,e,r){typeof e=="function"&&(r=e,e={}),r=e.cb||r;var n=typeof r=="function"?r:r.pre||function(){},s=r.post||function(){};Uo(e,n,s,t,"",t)};pr.keywords={additionalItems:!0,items:!0,contains:!0,additionalProperties:!0,propertyNames:!0,not:!0,if:!0,then:!0,else:!0};pr.arrayKeywords={items:!0,allOf:!0,anyOf:!0,oneOf:!0};pr.propsKeywords={$defs:!0,definitions:!0,properties:!0,patternProperties:!0,dependencies:!0};pr.skipKeywords={default:!0,enum:!0,const:!0,required:!0,maximum:!0,minimum:!0,exclusiveMaximum:!0,exclusiveMinimum:!0,multipleOf:!0,maxLength:!0,minLength:!0,pattern:!0,format:!0,maxItems:!0,minItems:!0,uniqueItems:!0,maxProperties:!0,minProperties:!0};function Uo(t,e,r,n,s,i,o,a,c,l){if(n&&typeof n=="object"&&!Array.isArray(n)){e(n,s,i,o,a,c,l);for(var u in n){var f=n[u];if(Array.isArray(f)){if(u in pr.arrayKeywords)for(var d=0;d<f.length;d++)Uo(t,e,r,f[d],s+"/"+u+"/"+d,i,s,u,n,d)}else if(u in pr.propsKeywords){if(f&&typeof f=="object")for(var h in f)Uo(t,e,r,f[h],s+"/"+u+"/"+DP(h),i,s,u,n,h)}else(u in pr.keywords||t.allKeys&&!(u in pr.skipKeywords))&&Uo(t,e,r,f,s+"/"+u,i,s,u,n)}r(n,s,i,o,a,c,l)}}function DP(t){return t.replace(/~/g,"~0").replace(/\//g,"~1")}});var Ss=m(nt=>{"use strict";Object.defineProperty(nt,"__esModule",{value:!0});nt.getSchemaRefs=nt.resolveUrl=nt.normalizeId=nt._getFullPath=nt.getFullPath=nt.inlineRef=void 0;var FP=ne(),UP=bu(),VP=lE(),BP=new Set(["type","format","pattern","maxLength","minLength","maxProperties","minProperties","maxItems","minItems","maximum","minimum","uniqueItems","multipleOf","required","enum","const"]);function HP(t,e=!0){return typeof t=="boolean"?!0:e===!0?!Iu(t):e?uE(t)<=e:!1}nt.inlineRef=HP;var WP=new Set(["$ref","$recursiveRef","$recursiveAnchor","$dynamicRef","$dynamicAnchor"]);function Iu(t){for(let e in t){if(WP.has(e))return!0;let r=t[e];if(Array.isArray(r)&&r.some(Iu)||typeof r=="object"&&Iu(r))return!0}return!1}function uE(t){let e=0;for(let r in t){if(r==="$ref")return 1/0;if(e++,!BP.has(r)&&(typeof t[r]=="object"&&(0,FP.eachItem)(t[r],n=>e+=uE(n)),e===1/0))return 1/0}return e}function fE(t,e="",r){r!==!1&&(e=gn(e));let n=t.parse(e);return dE(t,n)}nt.getFullPath=fE;function dE(t,e){return t.serialize(e).split("#")[0]+"#"}nt._getFullPath=dE;var KP=/#\/?$/;function gn(t){return t?t.replace(KP,""):""}nt.normalizeId=gn;function GP(t,e,r){return r=gn(r),t.resolve(e,r)}nt.resolveUrl=GP;var zP=/^[a-z_][-a-z0-9._]*$/i;function JP(t,e){if(typeof t=="boolean")return{};let{schemaId:r,uriResolver:n}=this.opts,s=gn(t[r]||e),i={"":s},o=fE(n,s,!1),a={},c=new Set;return VP(t,{allKeys:!0},(f,d,h,g)=>{if(g===void 0)return;let p=o+d,_=i[g];typeof f[r]=="string"&&(_=y.call(this,f[r])),w.call(this,f.$anchor),w.call(this,f.$dynamicAnchor),i[d]=_;function y(b){let I=this.opts.uriResolver.resolve;if(b=gn(_?I(_,b):b),c.has(b))throw u(b);c.add(b);let A=this.refs[b];return typeof A=="string"&&(A=this.refs[A]),typeof A=="object"?l(f,A.schema,b):b!==gn(p)&&(b[0]==="#"?(l(f,a[b],b),a[b]=f):this.refs[b]=p),b}function w(b){if(typeof b=="string"){if(!zP.test(b))throw new Error(`invalid anchor "${b}"`);y.call(this,`#${b}`)}}}),a;function l(f,d,h){if(d!==void 0&&!UP(f,d))throw u(h)}function u(f){return new Error(`reference "${f}" resolves to more than one schema`)}}nt.getSchemaRefs=JP});var Is=m(mr=>{"use strict";Object.defineProperty(mr,"__esModule",{value:!0});mr.getData=mr.KeywordCxt=mr.validateFunctionCode=void 0;var gE=Ky(),hE=ws(),$u=gu(),Vo=ws(),YP=Zy(),bs=sE(),Au=oE(),j=J(),H=zt(),XP=Ss(),Jt=ne(),Ts=vs();function QP(t){if(vE(t)&&(wE(t),EE(t))){tR(t);return}yE(t,()=>(0,gE.topBoolOrEmptySchema)(t))}mr.validateFunctionCode=QP;function yE({gen:t,validateName:e,schema:r,schemaEnv:n,opts:s},i){s.code.es5?t.func(e,(0,j._)`${H.default.data}, ${H.default.valCxt}`,n.$async,()=>{t.code((0,j._)`"use strict"; ${pE(r,s)}`),eR(t,s),t.code(i)}):t.func(e,(0,j._)`${H.default.data}, ${ZP(s)}`,n.$async,()=>t.code(pE(r,s)).code(i))}function ZP(t){return(0,j._)`{${H.default.instancePath}="", ${H.default.parentData}, ${H.default.parentDataProperty}, ${H.default.rootData}=${H.default.data}${t.dynamicRef?(0,j._)`, ${H.default.dynamicAnchors}={}`:j.nil}}={}`}function eR(t,e){t.if(H.default.valCxt,()=>{t.var(H.default.instancePath,(0,j._)`${H.default.valCxt}.${H.default.instancePath}`),t.var(H.default.parentData,(0,j._)`${H.default.valCxt}.${H.default.parentData}`),t.var(H.default.parentDataProperty,(0,j._)`${H.default.valCxt}.${H.default.parentDataProperty}`),t.var(H.default.rootData,(0,j._)`${H.default.valCxt}.${H.default.rootData}`),e.dynamicRef&&t.var(H.default.dynamicAnchors,(0,j._)`${H.default.valCxt}.${H.default.dynamicAnchors}`)},()=>{t.var(H.default.instancePath,(0,j._)`""`),t.var(H.default.parentData,(0,j._)`undefined`),t.var(H.default.parentDataProperty,(0,j._)`undefined`),t.var(H.default.rootData,H.default.data),e.dynamicRef&&t.var(H.default.dynamicAnchors,(0,j._)`{}`)})}function tR(t){let{schema:e,opts:r,gen:n}=t;yE(t,()=>{r.$comment&&e.$comment&&TE(t),oR(t),n.let(H.default.vErrors,null),n.let(H.default.errors,0),r.unevaluated&&rR(t),SE(t),lR(t)})}function rR(t){let{gen:e,validateName:r}=t;t.evaluated=e.const("evaluated",(0,j._)`${r}.evaluated`),e.if((0,j._)`${t.evaluated}.dynamicProps`,()=>e.assign((0,j._)`${t.evaluated}.props`,(0,j._)`undefined`)),e.if((0,j._)`${t.evaluated}.dynamicItems`,()=>e.assign((0,j._)`${t.evaluated}.items`,(0,j._)`undefined`))}function pE(t,e){let r=typeof t=="object"&&t[e.schemaId];return r&&(e.code.source||e.code.process)?(0,j._)`/*# sourceURL=${r} */`:j.nil}function nR(t,e){if(vE(t)&&(wE(t),EE(t))){sR(t,e);return}(0,gE.boolOrEmptySchema)(t,e)}function EE({schema:t,self:e}){if(typeof t=="boolean")return!t;for(let r in t)if(e.RULES.all[r])return!0;return!1}function vE(t){return typeof t.schema!="boolean"}function sR(t,e){let{schema:r,gen:n,opts:s}=t;s.$comment&&r.$comment&&TE(t),aR(t),cR(t);let i=n.const("_errs",H.default.errors);SE(t,i),n.var(e,(0,j._)`${i} === ${H.default.errors}`)}function wE(t){(0,Jt.checkUnknownRules)(t),iR(t)}function SE(t,e){if(t.opts.jtd)return mE(t,[],!1,e);let r=(0,hE.getSchemaTypes)(t.schema),n=(0,hE.coerceAndCheckDataType)(t,r);mE(t,r,!n,e)}function iR(t){let{schema:e,errSchemaPath:r,opts:n,self:s}=t;e.$ref&&n.ignoreKeywordsWithRef&&(0,Jt.schemaHasRulesButRef)(e,s.RULES)&&s.logger.warn(`$ref: keywords ignored in schema at path "${r}"`)}function oR(t){let{schema:e,opts:r}=t;e.default!==void 0&&r.useDefaults&&r.strictSchema&&(0,Jt.checkStrictMode)(t,"default is ignored in the schema root")}function aR(t){let e=t.schema[t.opts.schemaId];e&&(t.baseId=(0,XP.resolveUrl)(t.opts.uriResolver,t.baseId,e))}function cR(t){if(t.schema.$async&&!t.schemaEnv.$async)throw new Error("async schema in sync schema")}function TE({gen:t,schemaEnv:e,schema:r,errSchemaPath:n,opts:s}){let i=r.$comment;if(s.$comment===!0)t.code((0,j._)`${H.default.self}.logger.log(${i})`);else if(typeof s.$comment=="function"){let o=(0,j.str)`${n}/$comment`,a=t.scopeValue("root",{ref:e.root});t.code((0,j._)`${H.default.self}.opts.$comment(${i}, ${o}, ${a}.schema)`)}}function lR(t){let{gen:e,schemaEnv:r,validateName:n,ValidationError:s,opts:i}=t;r.$async?e.if((0,j._)`${H.default.errors} === 0`,()=>e.return(H.default.data),()=>e.throw((0,j._)`new ${s}(${H.default.vErrors})`)):(e.assign((0,j._)`${n}.errors`,H.default.vErrors),i.unevaluated&&uR(t),e.return((0,j._)`${H.default.errors} === 0`))}function uR({gen:t,evaluated:e,props:r,items:n}){r instanceof j.Name&&t.assign((0,j._)`${e}.props`,r),n instanceof j.Name&&t.assign((0,j._)`${e}.items`,n)}function mE(t,e,r,n){let{gen:s,schema:i,data:o,allErrors:a,opts:c,self:l}=t,{RULES:u}=l;if(i.$ref&&(c.ignoreKeywordsWithRef||!(0,Jt.schemaHasRulesButRef)(i,u))){s.block(()=>IE(t,"$ref",u.all.$ref.definition));return}c.jtd||fR(t,e),s.block(()=>{for(let d of u.rules)f(d);f(u.post)});function f(d){(0,$u.shouldUseGroup)(i,d)&&(d.type?(s.if((0,Vo.checkDataType)(d.type,o,c.strictNumbers)),_E(t,d),e.length===1&&e[0]===d.type&&r&&(s.else(),(0,Vo.reportTypeError)(t)),s.endIf()):_E(t,d),a||s.if((0,j._)`${H.default.errors} === ${n||0}`))}}function _E(t,e){let{gen:r,schema:n,opts:{useDefaults:s}}=t;s&&(0,YP.assignDefaults)(t,e.type),r.block(()=>{for(let i of e.rules)(0,$u.shouldUseRule)(n,i)&&IE(t,i.keyword,i.definition,e.type)})}function fR(t,e){t.schemaEnv.meta||!t.opts.strictTypes||(dR(t,e),t.opts.allowUnionTypes||hR(t,e),pR(t,t.dataTypes))}function dR(t,e){if(e.length){if(!t.dataTypes.length){t.dataTypes=e;return}e.forEach(r=>{bE(t.dataTypes,r)||Lu(t,`type "${r}" not allowed by context "${t.dataTypes.join(",")}"`)}),_R(t,e)}}function hR(t,e){e.length>1&&!(e.length===2&&e.includes("null"))&&Lu(t,"use allowUnionTypes to allow union type keyword")}function pR(t,e){let r=t.self.RULES.all;for(let n in r){let s=r[n];if(typeof s=="object"&&(0,$u.shouldUseRule)(t.schema,s)){let{type:i}=s.definition;i.length&&!i.some(o=>mR(e,o))&&Lu(t,`missing type "${i.join(",")}" for keyword "${n}"`)}}}function mR(t,e){return t.includes(e)||e==="number"&&t.includes("integer")}function bE(t,e){return t.includes(e)||e==="integer"&&t.includes("number")}function _R(t,e){let r=[];for(let n of t.dataTypes)bE(e,n)?r.push(n):e.includes("integer")&&n==="number"&&r.push("integer");t.dataTypes=r}function Lu(t,e){let r=t.schemaEnv.baseId+t.errSchemaPath;e+=` at "${r}" (strictTypes)`,(0,Jt.checkStrictMode)(t,e,t.opts.strictTypes)}var Bo=class{constructor(e,r,n){if((0,bs.validateKeywordUsage)(e,r,n),this.gen=e.gen,this.allErrors=e.allErrors,this.keyword=n,this.data=e.data,this.schema=e.schema[n],this.$data=r.$data&&e.opts.$data&&this.schema&&this.schema.$data,this.schemaValue=(0,Jt.schemaRefOrVal)(e,this.schema,n,this.$data),this.schemaType=r.schemaType,this.parentSchema=e.schema,this.params={},this.it=e,this.def=r,this.$data)this.schemaCode=e.gen.const("vSchema",AE(this.$data,e));else if(this.schemaCode=this.schemaValue,!(0,bs.validSchemaType)(this.schema,r.schemaType,r.allowUndefined))throw new Error(`${n} value must be ${JSON.stringify(r.schemaType)}`);("code"in r?r.trackErrors:r.errors!==!1)&&(this.errsCount=e.gen.const("_errs",H.default.errors))}result(e,r,n){this.failResult((0,j.not)(e),r,n)}failResult(e,r,n){this.gen.if(e),n?n():this.error(),r?(this.gen.else(),r(),this.allErrors&&this.gen.endIf()):this.allErrors?this.gen.endIf():this.gen.else()}pass(e,r){this.failResult((0,j.not)(e),void 0,r)}fail(e){if(e===void 0){this.error(),this.allErrors||this.gen.if(!1);return}this.gen.if(e),this.error(),this.allErrors?this.gen.endIf():this.gen.else()}fail$data(e){if(!this.$data)return this.fail(e);let{schemaCode:r}=this;this.fail((0,j._)`${r} !== undefined && (${(0,j.or)(this.invalid$data(),e)})`)}error(e,r,n){if(r){this.setParams(r),this._error(e,n),this.setParams({});return}this._error(e,n)}_error(e,r){(e?Ts.reportExtraError:Ts.reportError)(this,this.def.error,r)}$dataError(){(0,Ts.reportError)(this,this.def.$dataError||Ts.keyword$DataError)}reset(){if(this.errsCount===void 0)throw new Error('add "trackErrors" to keyword definition');(0,Ts.resetErrorsCount)(this.gen,this.errsCount)}ok(e){this.allErrors||this.gen.if(e)}setParams(e,r){r?Object.assign(this.params,e):this.params=e}block$data(e,r,n=j.nil){this.gen.block(()=>{this.check$data(e,n),r()})}check$data(e=j.nil,r=j.nil){if(!this.$data)return;let{gen:n,schemaCode:s,schemaType:i,def:o}=this;n.if((0,j.or)((0,j._)`${s} === undefined`,r)),e!==j.nil&&n.assign(e,!0),(i.length||o.validateSchema)&&(n.elseIf(this.invalid$data()),this.$dataError(),e!==j.nil&&n.assign(e,!1)),n.else()}invalid$data(){let{gen:e,schemaCode:r,schemaType:n,def:s,it:i}=this;return(0,j.or)(o(),a());function o(){if(n.length){if(!(r instanceof j.Name))throw new Error("ajv implementation error");let c=Array.isArray(n)?n:[n];return(0,j._)`${(0,Vo.checkDataTypes)(c,r,i.opts.strictNumbers,Vo.DataType.Wrong)}`}return j.nil}function a(){if(s.validateSchema){let c=e.scopeValue("validate$data",{ref:s.validateSchema});return(0,j._)`!${c}(${r})`}return j.nil}}subschema(e,r){let n=(0,Au.getSubschema)(this.it,e);(0,Au.extendSubschemaData)(n,this.it,e),(0,Au.extendSubschemaMode)(n,e);let s={...this.it,...n,items:void 0,props:void 0};return nR(s,r),s}mergeEvaluated(e,r){let{it:n,gen:s}=this;n.opts.unevaluated&&(n.props!==!0&&e.props!==void 0&&(n.props=Jt.mergeEvaluated.props(s,e.props,n.props,r)),n.items!==!0&&e.items!==void 0&&(n.items=Jt.mergeEvaluated.items(s,e.items,n.items,r)))}mergeValidEvaluated(e,r){let{it:n,gen:s}=this;if(n.opts.unevaluated&&(n.props!==!0||n.items!==!0))return s.if(r,()=>this.mergeEvaluated(e,j.Name)),!0}};mr.KeywordCxt=Bo;function IE(t,e,r,n){let s=new Bo(t,r,e);"code"in r?r.code(s,n):s.$data&&r.validate?(0,bs.funcKeywordCode)(s,r):"macro"in r?(0,bs.macroKeywordCode)(s,r):(r.compile||r.validate)&&(0,bs.funcKeywordCode)(s,r)}var gR=/^\/(?:[^~]|~0|~1)*$/,yR=/^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;function AE(t,{dataLevel:e,dataNames:r,dataPathArr:n}){let s,i;if(t==="")return H.default.rootData;if(t[0]==="/"){if(!gR.test(t))throw new Error(`Invalid JSON-pointer: ${t}`);s=t,i=H.default.rootData}else{let l=yR.exec(t);if(!l)throw new Error(`Invalid JSON-pointer: ${t}`);let u=+l[1];if(s=l[2],s==="#"){if(u>=e)throw new Error(c("property/index",u));return n[e-u]}if(u>e)throw new Error(c("data",u));if(i=r[e-u],!s)return i}let o=i,a=s.split("/");for(let l of a)l&&(i=(0,j._)`${i}${(0,j.getProperty)((0,Jt.unescapeJsonPointer)(l))}`,o=(0,j._)`${o} && ${i}`);return o;function c(l,u){return`Cannot access ${l} ${u} levels up, current level is ${e}`}}mr.getData=AE});var Ho=m(Ou=>{"use strict";Object.defineProperty(Ou,"__esModule",{value:!0});var Nu=class extends Error{constructor(e){super("validation failed"),this.errors=e,this.ajv=this.validation=!0}};Ou.default=Nu});var As=m(Cu=>{"use strict";Object.defineProperty(Cu,"__esModule",{value:!0});var Pu=Ss(),Ru=class extends Error{constructor(e,r,n,s){super(s||`can't resolve reference ${n} from id ${r}`),this.missingRef=(0,Pu.resolveUrl)(e,r,n),this.missingSchema=(0,Pu.normalizeId)((0,Pu.getFullPath)(e,this.missingRef))}};Cu.default=Ru});var Ko=m(pt=>{"use strict";Object.defineProperty(pt,"__esModule",{value:!0});pt.resolveSchema=pt.getCompilingSchema=pt.resolveRef=pt.compileSchema=pt.SchemaEnv=void 0;var Tt=J(),ER=Ho(),Ur=zt(),bt=Ss(),$E=ne(),vR=Is(),yn=class{constructor(e){var r;this.refs={},this.dynamicAnchors={};let n;typeof e.schema=="object"&&(n=e.schema),this.schema=e.schema,this.schemaId=e.schemaId,this.root=e.root||this,this.baseId=(r=e.baseId)!==null&&r!==void 0?r:(0,bt.normalizeId)(n?.[e.schemaId||"$id"]),this.schemaPath=e.schemaPath,this.localRefs=e.localRefs,this.meta=e.meta,this.$async=n?.$async,this.refs={}}};pt.SchemaEnv=yn;function qu(t){let e=LE.call(this,t);if(e)return e;let r=(0,bt.getFullPath)(this.opts.uriResolver,t.root.baseId),{es5:n,lines:s}=this.opts.code,{ownProperties:i}=this.opts,o=new Tt.CodeGen(this.scope,{es5:n,lines:s,ownProperties:i}),a;t.$async&&(a=o.scopeValue("Error",{ref:ER.default,code:(0,Tt._)`require("ajv/dist/runtime/validation_error").default`}));let c=o.scopeName("validate");t.validateName=c;let l={gen:o,allErrors:this.opts.allErrors,data:Ur.default.data,parentData:Ur.default.parentData,parentDataProperty:Ur.default.parentDataProperty,dataNames:[Ur.default.data],dataPathArr:[Tt.nil],dataLevel:0,dataTypes:[],definedProperties:new Set,topSchemaRef:o.scopeValue("schema",this.opts.code.source===!0?{ref:t.schema,code:(0,Tt.stringify)(t.schema)}:{ref:t.schema}),validateName:c,ValidationError:a,schema:t.schema,schemaEnv:t,rootId:r,baseId:t.baseId||r,schemaPath:Tt.nil,errSchemaPath:t.schemaPath||(this.opts.jtd?"":"#"),errorPath:(0,Tt._)`""`,opts:this.opts,self:this},u;try{this._compilations.add(t),(0,vR.validateFunctionCode)(l),o.optimize(this.opts.code.optimize);let f=o.toString();u=`${o.scopeRefs(Ur.default.scope)}return ${f}`,this.opts.code.process&&(u=this.opts.code.process(u,t));let h=new Function(`${Ur.default.self}`,`${Ur.default.scope}`,u)(this,this.scope.get());if(this.scope.value(c,{ref:h}),h.errors=null,h.schema=t.schema,h.schemaEnv=t,t.$async&&(h.$async=!0),this.opts.code.source===!0&&(h.source={validateName:c,validateCode:f,scopeValues:o._values}),this.opts.unevaluated){let{props:g,items:p}=l;h.evaluated={props:g instanceof Tt.Name?void 0:g,items:p instanceof Tt.Name?void 0:p,dynamicProps:g instanceof Tt.Name,dynamicItems:p instanceof Tt.Name},h.source&&(h.source.evaluated=(0,Tt.stringify)(h.evaluated))}return t.validate=h,t}catch(f){throw delete t.validate,delete t.validateName,u&&this.logger.error("Error compiling schema, function code:",u),f}finally{this._compilations.delete(t)}}pt.compileSchema=qu;function wR(t,e,r){var n;r=(0,bt.resolveUrl)(this.opts.uriResolver,e,r);let s=t.refs[r];if(s)return s;let i=bR.call(this,t,r);if(i===void 0){let o=(n=t.localRefs)===null||n===void 0?void 0:n[r],{schemaId:a}=this.opts;o&&(i=new yn({schema:o,schemaId:a,root:t,baseId:e}))}if(i!==void 0)return t.refs[r]=SR.call(this,i)}pt.resolveRef=wR;function SR(t){return(0,bt.inlineRef)(t.schema,this.opts.inlineRefs)?t.schema:t.validate?t:qu.call(this,t)}function LE(t){for(let e of this._compilations)if(TR(e,t))return e}pt.getCompilingSchema=LE;function TR(t,e){return t.schema===e.schema&&t.root===e.root&&t.baseId===e.baseId}function bR(t,e){let r;for(;typeof(r=this.refs[e])=="string";)e=r;return r||this.schemas[e]||Wo.call(this,t,e)}function Wo(t,e){let r=this.opts.uriResolver.parse(e),n=(0,bt._getFullPath)(this.opts.uriResolver,r),s=(0,bt.getFullPath)(this.opts.uriResolver,t.baseId,void 0);if(Object.keys(t.schema).length>0&&n===s)return ku.call(this,r,t);let i=(0,bt.normalizeId)(n),o=this.refs[i]||this.schemas[i];if(typeof o=="string"){let a=Wo.call(this,t,o);return typeof a?.schema!="object"?void 0:ku.call(this,r,a)}if(typeof o?.schema=="object"){if(o.validate||qu.call(this,o),i===(0,bt.normalizeId)(e)){let{schema:a}=o,{schemaId:c}=this.opts,l=a[c];return l&&(s=(0,bt.resolveUrl)(this.opts.uriResolver,s,l)),new yn({schema:a,schemaId:c,root:t,baseId:s})}return ku.call(this,r,o)}}pt.resolveSchema=Wo;var IR=new Set(["properties","patternProperties","enum","dependencies","definitions"]);function ku(t,{baseId:e,schema:r,root:n}){var s;if(((s=t.fragment)===null||s===void 0?void 0:s[0])!=="/")return;for(let a of t.fragment.slice(1).split("/")){if(typeof r=="boolean")return;let c=r[(0,$E.unescapeFragment)(a)];if(c===void 0)return;r=c;let l=typeof r=="object"&&r[this.opts.schemaId];!IR.has(a)&&l&&(e=(0,bt.resolveUrl)(this.opts.uriResolver,e,l))}let i;if(typeof r!="boolean"&&r.$ref&&!(0,$E.schemaHasRulesButRef)(r,this.RULES)){let a=(0,bt.resolveUrl)(this.opts.uriResolver,e,r.$ref);i=Wo.call(this,n,a)}let{schemaId:o}=this.opts;if(i=i||new yn({schema:r,schemaId:o,root:n,baseId:e}),i.schema!==i.root.schema)return i}});var NE=m((q4,AR)=>{AR.exports={$id:"https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#",description:"Meta-schema for $data reference (JSON AnySchema extension proposal)",type:"object",required:["$data"],properties:{$data:{type:"string",anyOf:[{format:"relative-json-pointer"},{format:"json-pointer"}]}},additionalProperties:!1}});var xu=m((M4,CE)=>{"use strict";var $R=RegExp.prototype.test.bind(/^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/iu),PE=RegExp.prototype.test.bind(/^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/u);function Mu(t){let e="",r=0,n=0;for(n=0;n<t.length;n++)if(r=t[n].charCodeAt(0),r!==48){if(!(r>=48&&r<=57||r>=65&&r<=70||r>=97&&r<=102))return"";e+=t[n];break}for(n+=1;n<t.length;n++){if(r=t[n].charCodeAt(0),!(r>=48&&r<=57||r>=65&&r<=70||r>=97&&r<=102))return"";e+=t[n]}return e}var LR=RegExp.prototype.test.bind(/[^!"$&'()*+,\-.;=_`a-z{}~]/u);function OE(t){return t.length=0,!0}function NR(t,e,r){if(t.length){let n=Mu(t);if(n!=="")e.push(n);else return r.error=!0,!1;t.length=0}return!0}function OR(t){let e=0,r={error:!1,address:"",zone:""},n=[],s=[],i=!1,o=!1,a=NR;for(let c=0;c<t.length;c++){let l=t[c];if(!(l==="["||l==="]"))if(l===":"){if(i===!0&&(o=!0),!a(s,n,r))break;if(++e>7){r.error=!0;break}c>0&&t[c-1]===":"&&(i=!0),n.push(":");continue}else if(l==="%"){if(!a(s,n,r))break;a=OE}else{s.push(l);continue}}return s.length&&(a===OE?r.zone=s.join(""):o?n.push(s.join("")):n.push(Mu(s))),r.address=n.join(""),r}function RE(t){if(PR(t,":")<2)return{host:t,isIPV6:!1};let e=OR(t);if(e.error)return{host:t,isIPV6:!1};{let r=e.address,n=e.address;return e.zone&&(r+="%"+e.zone,n+="%25"+e.zone),{host:r,isIPV6:!0,escapedHost:n}}}function PR(t,e){let r=0;for(let n=0;n<t.length;n++)t[n]===e&&r++;return r}function RR(t){let e=t,r=[],n=-1,s=0;for(;s=e.length;){if(s===1){if(e===".")break;if(e==="/"){r.push("/");break}else{r.push(e);break}}else if(s===2){if(e[0]==="."){if(e[1]===".")break;if(e[1]==="/"){e=e.slice(2);continue}}else if(e[0]==="/"&&(e[1]==="."||e[1]==="/")){r.push("/");break}}else if(s===3&&e==="/.."){r.length!==0&&r.pop(),r.push("/");break}if(e[0]==="."){if(e[1]==="."){if(e[2]==="/"){e=e.slice(3);continue}}else if(e[1]==="/"){e=e.slice(2);continue}}else if(e[0]==="/"&&e[1]==="."){if(e[2]==="/"){e=e.slice(2);continue}else if(e[2]==="."&&e[3]==="/"){e=e.slice(3),r.length!==0&&r.pop();continue}}if((n=e.indexOf("/",1))===-1){r.push(e);break}else r.push(e.slice(0,n)),e=e.slice(n)}return r.join("")}function CR(t,e){let r=e!==!0?escape:unescape;return t.scheme!==void 0&&(t.scheme=r(t.scheme)),t.userinfo!==void 0&&(t.userinfo=r(t.userinfo)),t.host!==void 0&&(t.host=r(t.host)),t.path!==void 0&&(t.path=r(t.path)),t.query!==void 0&&(t.query=r(t.query)),t.fragment!==void 0&&(t.fragment=r(t.fragment)),t}function kR(t){let e=[];if(t.userinfo!==void 0&&(e.push(t.userinfo),e.push("@")),t.host!==void 0){let r=unescape(t.host);if(!PE(r)){let n=RE(r);n.isIPV6===!0?r=`[${n.escapedHost}]`:r=t.host}e.push(r)}return(typeof t.port=="number"||typeof t.port=="string")&&(e.push(":"),e.push(String(t.port))),e.length?e.join(""):void 0}CE.exports={nonSimpleDomain:LR,recomposeAuthority:kR,normalizeComponentEncoding:CR,removeDotSegments:RR,isIPv4:PE,isUUID:$R,normalizeIPv6:RE,stringArrayToHexStripped:Mu}});var jE=m((x4,xE)=>{"use strict";var{isUUID:qR}=xu(),MR=/([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-.:;=@]|%[\da-f]{2})+)/iu,xR=["http","https","ws","wss","urn","urn:uuid"];function jR(t){return xR.indexOf(t)!==-1}function ju(t){return t.secure===!0?!0:t.secure===!1?!1:t.scheme?t.scheme.length===3&&(t.scheme[0]==="w"||t.scheme[0]==="W")&&(t.scheme[1]==="s"||t.scheme[1]==="S")&&(t.scheme[2]==="s"||t.scheme[2]==="S"):!1}function kE(t){return t.host||(t.error=t.error||"HTTP URIs must have a host."),t}function qE(t){let e=String(t.scheme).toLowerCase()==="https";return(t.port===(e?443:80)||t.port==="")&&(t.port=void 0),t.path||(t.path="/"),t}function DR(t){return t.secure=ju(t),t.resourceName=(t.path||"/")+(t.query?"?"+t.query:""),t.path=void 0,t.query=void 0,t}function FR(t){if((t.port===(ju(t)?443:80)||t.port==="")&&(t.port=void 0),typeof t.secure=="boolean"&&(t.scheme=t.secure?"wss":"ws",t.secure=void 0),t.resourceName){let[e,r]=t.resourceName.split("?");t.path=e&&e!=="/"?e:void 0,t.query=r,t.resourceName=void 0}return t.fragment=void 0,t}function UR(t,e){if(!t.path)return t.error="URN can not be parsed",t;let r=t.path.match(MR);if(r){let n=e.scheme||t.scheme||"urn";t.nid=r[1].toLowerCase(),t.nss=r[2];let s=`${n}:${e.nid||t.nid}`,i=Du(s);t.path=void 0,i&&(t=i.parse(t,e))}else t.error=t.error||"URN can not be parsed.";return t}function VR(t,e){if(t.nid===void 0)throw new Error("URN without nid cannot be serialized");let r=e.scheme||t.scheme||"urn",n=t.nid.toLowerCase(),s=`${r}:${e.nid||n}`,i=Du(s);i&&(t=i.serialize(t,e));let o=t,a=t.nss;return o.path=`${n||e.nid}:${a}`,e.skipEscape=!0,o}function BR(t,e){let r=t;return r.uuid=r.nss,r.nss=void 0,!e.tolerant&&(!r.uuid||!qR(r.uuid))&&(r.error=r.error||"UUID is not valid."),r}function HR(t){let e=t;return e.nss=(t.uuid||"").toLowerCase(),e}var ME={scheme:"http",domainHost:!0,parse:kE,serialize:qE},WR={scheme:"https",domainHost:ME.domainHost,parse:kE,serialize:qE},Go={scheme:"ws",domainHost:!0,parse:DR,serialize:FR},KR={scheme:"wss",domainHost:Go.domainHost,parse:Go.parse,serialize:Go.serialize},GR={scheme:"urn",parse:UR,serialize:VR,skipNormalize:!0},zR={scheme:"urn:uuid",parse:BR,serialize:HR,skipNormalize:!0},zo={http:ME,https:WR,ws:Go,wss:KR,urn:GR,"urn:uuid":zR};Object.setPrototypeOf(zo,null);function Du(t){return t&&(zo[t]||zo[t.toLowerCase()])||void 0}xE.exports={wsIsSecure:ju,SCHEMES:zo,isValidSchemeName:jR,getSchemeHandler:Du}});var UE=m((j4,Yo)=>{"use strict";var{normalizeIPv6:JR,removeDotSegments:$s,recomposeAuthority:YR,normalizeComponentEncoding:Jo,isIPv4:XR,nonSimpleDomain:QR}=xu(),{SCHEMES:ZR,getSchemeHandler:DE}=jE();function eC(t,e){return typeof t=="string"?t=qt(Yt(t,e),e):typeof t=="object"&&(t=Yt(qt(t,e),e)),t}function tC(t,e,r){let n=r?Object.assign({scheme:"null"},r):{scheme:"null"},s=FE(Yt(t,n),Yt(e,n),n,!0);return n.skipEscape=!0,qt(s,n)}function FE(t,e,r,n){let s={};return n||(t=Yt(qt(t,r),r),e=Yt(qt(e,r),r)),r=r||{},!r.tolerant&&e.scheme?(s.scheme=e.scheme,s.userinfo=e.userinfo,s.host=e.host,s.port=e.port,s.path=$s(e.path||""),s.query=e.query):(e.userinfo!==void 0||e.host!==void 0||e.port!==void 0?(s.userinfo=e.userinfo,s.host=e.host,s.port=e.port,s.path=$s(e.path||""),s.query=e.query):(e.path?(e.path[0]==="/"?s.path=$s(e.path):((t.userinfo!==void 0||t.host!==void 0||t.port!==void 0)&&!t.path?s.path="/"+e.path:t.path?s.path=t.path.slice(0,t.path.lastIndexOf("/")+1)+e.path:s.path=e.path,s.path=$s(s.path)),s.query=e.query):(s.path=t.path,e.query!==void 0?s.query=e.query:s.query=t.query),s.userinfo=t.userinfo,s.host=t.host,s.port=t.port),s.scheme=t.scheme),s.fragment=e.fragment,s}function rC(t,e,r){return typeof t=="string"?(t=unescape(t),t=qt(Jo(Yt(t,r),!0),{...r,skipEscape:!0})):typeof t=="object"&&(t=qt(Jo(t,!0),{...r,skipEscape:!0})),typeof e=="string"?(e=unescape(e),e=qt(Jo(Yt(e,r),!0),{...r,skipEscape:!0})):typeof e=="object"&&(e=qt(Jo(e,!0),{...r,skipEscape:!0})),t.toLowerCase()===e.toLowerCase()}function qt(t,e){let r={host:t.host,scheme:t.scheme,userinfo:t.userinfo,port:t.port,path:t.path,query:t.query,nid:t.nid,nss:t.nss,uuid:t.uuid,fragment:t.fragment,reference:t.reference,resourceName:t.resourceName,secure:t.secure,error:""},n=Object.assign({},e),s=[],i=DE(n.scheme||r.scheme);i&&i.serialize&&i.serialize(r,n),r.path!==void 0&&(n.skipEscape?r.path=unescape(r.path):(r.path=escape(r.path),r.scheme!==void 0&&(r.path=r.path.split("%3A").join(":")))),n.reference!=="suffix"&&r.scheme&&s.push(r.scheme,":");let o=YR(r);if(o!==void 0&&(n.reference!=="suffix"&&s.push("//"),s.push(o),r.path&&r.path[0]!=="/"&&s.push("/")),r.path!==void 0){let a=r.path;!n.absolutePath&&(!i||!i.absolutePath)&&(a=$s(a)),o===void 0&&a[0]==="/"&&a[1]==="/"&&(a="/%2F"+a.slice(2)),s.push(a)}return r.query!==void 0&&s.push("?",r.query),r.fragment!==void 0&&s.push("#",r.fragment),s.join("")}var nC=/^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u;function Yt(t,e){let r=Object.assign({},e),n={scheme:void 0,userinfo:void 0,host:"",port:void 0,path:"",query:void 0,fragment:void 0},s=!1;r.reference==="suffix"&&(r.scheme?t=r.scheme+":"+t:t="//"+t);let i=t.match(nC);if(i){if(n.scheme=i[1],n.userinfo=i[3],n.host=i[4],n.port=parseInt(i[5],10),n.path=i[6]||"",n.query=i[7],n.fragment=i[8],isNaN(n.port)&&(n.port=i[5]),n.host)if(XR(n.host)===!1){let c=JR(n.host);n.host=c.host.toLowerCase(),s=c.isIPV6}else s=!0;n.scheme===void 0&&n.userinfo===void 0&&n.host===void 0&&n.port===void 0&&n.query===void 0&&!n.path?n.reference="same-document":n.scheme===void 0?n.reference="relative":n.fragment===void 0?n.reference="absolute":n.reference="uri",r.reference&&r.reference!=="suffix"&&r.reference!==n.reference&&(n.error=n.error||"URI is not a "+r.reference+" reference.");let o=DE(r.scheme||n.scheme);if(!r.unicodeSupport&&(!o||!o.unicodeSupport)&&n.host&&(r.domainHost||o&&o.domainHost)&&s===!1&&QR(n.host))try{n.host=URL.domainToASCII(n.host.toLowerCase())}catch(a){n.error=n.error||"Host's domain name can not be converted to ASCII: "+a}(!o||o&&!o.skipNormalize)&&(t.indexOf("%")!==-1&&(n.scheme!==void 0&&(n.scheme=unescape(n.scheme)),n.host!==void 0&&(n.host=unescape(n.host))),n.path&&(n.path=escape(unescape(n.path))),n.fragment&&(n.fragment=encodeURI(decodeURIComponent(n.fragment)))),o&&o.parse&&o.parse(n,r)}else n.error=n.error||"URI can not be parsed.";return n}var Fu={SCHEMES:ZR,normalize:eC,resolve:tC,resolveComponent:FE,equal:rC,serialize:qt,parse:Yt};Yo.exports=Fu;Yo.exports.default=Fu;Yo.exports.fastUri=Fu});var BE=m(Uu=>{"use strict";Object.defineProperty(Uu,"__esModule",{value:!0});var VE=UE();VE.code='require("ajv/dist/runtime/uri").default';Uu.default=VE});var vn=m(qe=>{"use strict";Object.defineProperty(qe,"__esModule",{value:!0});qe.CodeGen=qe.Name=qe.nil=qe.stringify=qe.str=qe._=qe.KeywordCxt=void 0;var sC=Is();Object.defineProperty(qe,"KeywordCxt",{enumerable:!0,get:function(){return sC.KeywordCxt}});var En=J();Object.defineProperty(qe,"_",{enumerable:!0,get:function(){return En._}});Object.defineProperty(qe,"str",{enumerable:!0,get:function(){return En.str}});Object.defineProperty(qe,"stringify",{enumerable:!0,get:function(){return En.stringify}});Object.defineProperty(qe,"nil",{enumerable:!0,get:function(){return En.nil}});Object.defineProperty(qe,"Name",{enumerable:!0,get:function(){return En.Name}});Object.defineProperty(qe,"CodeGen",{enumerable:!0,get:function(){return En.CodeGen}});var iC=Ho(),zE=As(),oC=_u(),Ls=Ko(),aC=J(),Ns=Ss(),Xo=ws(),Bu=ne(),HE=NE(),cC=BE(),JE=(t,e)=>new RegExp(t,e);JE.code="new RegExp";var lC=["removeAdditional","useDefaults","coerceTypes"],uC=new Set(["validate","serialize","parse","wrapper","root","schema","keyword","pattern","formats","validate$data","func","obj","Error"]),fC={errorDataPath:"",format:"`validateFormats: false` can be used instead.",nullable:'"nullable" keyword is supported by default.',jsonPointers:"Deprecated jsPropertySyntax can be used instead.",extendRefs:"Deprecated ignoreKeywordsWithRef can be used instead.",missingRefs:"Pass empty schema with $id that should be ignored to ajv.addSchema.",processCode:"Use option `code: {process: (code, schemaEnv: object) => string}`",sourceCode:"Use option `code: {source: true}`",strictDefaults:"It is default now, see option `strict`.",strictKeywords:"It is default now, see option `strict`.",uniqueItems:'"uniqueItems" keyword is always validated.',unknownFormats:"Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",cache:"Map is used as cache, schema object as key.",serialize:"Map is used as cache, schema object as key.",ajvErrors:"It is default now."},dC={ignoreKeywordsWithRef:"",jsPropertySyntax:"",unicode:'"minLength"/"maxLength" account for unicode characters by default.'},WE=200;function hC(t){var e,r,n,s,i,o,a,c,l,u,f,d,h,g,p,_,y,w,b,I,A,C,B,P,N;let D=t.strict,V=(e=t.code)===null||e===void 0?void 0:e.optimize,F=V===!0||V===void 0?1:V||0,re=(n=(r=t.code)===null||r===void 0?void 0:r.regExp)!==null&&n!==void 0?n:JE,ce=(s=t.uriResolver)!==null&&s!==void 0?s:cC.default;return{strictSchema:(o=(i=t.strictSchema)!==null&&i!==void 0?i:D)!==null&&o!==void 0?o:!0,strictNumbers:(c=(a=t.strictNumbers)!==null&&a!==void 0?a:D)!==null&&c!==void 0?c:!0,strictTypes:(u=(l=t.strictTypes)!==null&&l!==void 0?l:D)!==null&&u!==void 0?u:"log",strictTuples:(d=(f=t.strictTuples)!==null&&f!==void 0?f:D)!==null&&d!==void 0?d:"log",strictRequired:(g=(h=t.strictRequired)!==null&&h!==void 0?h:D)!==null&&g!==void 0?g:!1,code:t.code?{...t.code,optimize:F,regExp:re}:{optimize:F,regExp:re},loopRequired:(p=t.loopRequired)!==null&&p!==void 0?p:WE,loopEnum:(_=t.loopEnum)!==null&&_!==void 0?_:WE,meta:(y=t.meta)!==null&&y!==void 0?y:!0,messages:(w=t.messages)!==null&&w!==void 0?w:!0,inlineRefs:(b=t.inlineRefs)!==null&&b!==void 0?b:!0,schemaId:(I=t.schemaId)!==null&&I!==void 0?I:"$id",addUsedSchema:(A=t.addUsedSchema)!==null&&A!==void 0?A:!0,validateSchema:(C=t.validateSchema)!==null&&C!==void 0?C:!0,validateFormats:(B=t.validateFormats)!==null&&B!==void 0?B:!0,unicodeRegExp:(P=t.unicodeRegExp)!==null&&P!==void 0?P:!0,int32range:(N=t.int32range)!==null&&N!==void 0?N:!0,uriResolver:ce}}var Os=class{constructor(e={}){this.schemas={},this.refs={},this.formats={},this._compilations=new Set,this._loading={},this._cache=new Map,e=this.opts={...e,...hC(e)};let{es5:r,lines:n}=this.opts.code;this.scope=new aC.ValueScope({scope:{},prefixes:uC,es5:r,lines:n}),this.logger=EC(e.logger);let s=e.validateFormats;e.validateFormats=!1,this.RULES=(0,oC.getRules)(),KE.call(this,fC,e,"NOT SUPPORTED"),KE.call(this,dC,e,"DEPRECATED","warn"),this._metaOpts=gC.call(this),e.formats&&mC.call(this),this._addVocabularies(),this._addDefaultMetaSchema(),e.keywords&&_C.call(this,e.keywords),typeof e.meta=="object"&&this.addMetaSchema(e.meta),pC.call(this),e.validateFormats=s}_addVocabularies(){this.addKeyword("$async")}_addDefaultMetaSchema(){let{$data:e,meta:r,schemaId:n}=this.opts,s=HE;n==="id"&&(s={...HE},s.id=s.$id,delete s.$id),r&&e&&this.addMetaSchema(s,s[n],!1)}defaultMeta(){let{meta:e,schemaId:r}=this.opts;return this.opts.defaultMeta=typeof e=="object"?e[r]||e:void 0}validate(e,r){let n;if(typeof e=="string"){if(n=this.getSchema(e),!n)throw new Error(`no schema with key or ref "${e}"`)}else n=this.compile(e);let s=n(r);return"$async"in n||(this.errors=n.errors),s}compile(e,r){let n=this._addSchema(e,r);return n.validate||this._compileSchemaEnv(n)}compileAsync(e,r){if(typeof this.opts.loadSchema!="function")throw new Error("options.loadSchema should be a function");let{loadSchema:n}=this.opts;return s.call(this,e,r);async function s(u,f){await i.call(this,u.$schema);let d=this._addSchema(u,f);return d.validate||o.call(this,d)}async function i(u){u&&!this.getSchema(u)&&await s.call(this,{$ref:u},!0)}async function o(u){try{return this._compileSchemaEnv(u)}catch(f){if(!(f instanceof zE.default))throw f;return a.call(this,f),await c.call(this,f.missingSchema),o.call(this,u)}}function a({missingSchema:u,missingRef:f}){if(this.refs[u])throw new Error(`AnySchema ${u} is loaded but ${f} cannot be resolved`)}async function c(u){let f=await l.call(this,u);this.refs[u]||await i.call(this,f.$schema),this.refs[u]||this.addSchema(f,u,r)}async function l(u){let f=this._loading[u];if(f)return f;try{return await(this._loading[u]=n(u))}finally{delete this._loading[u]}}}addSchema(e,r,n,s=this.opts.validateSchema){if(Array.isArray(e)){for(let o of e)this.addSchema(o,void 0,n,s);return this}let i;if(typeof e=="object"){let{schemaId:o}=this.opts;if(i=e[o],i!==void 0&&typeof i!="string")throw new Error(`schema ${o} must be string`)}return r=(0,Ns.normalizeId)(r||i),this._checkUnique(r),this.schemas[r]=this._addSchema(e,n,r,s,!0),this}addMetaSchema(e,r,n=this.opts.validateSchema){return this.addSchema(e,r,!0,n),this}validateSchema(e,r){if(typeof e=="boolean")return!0;let n;if(n=e.$schema,n!==void 0&&typeof n!="string")throw new Error("$schema must be a string");if(n=n||this.opts.defaultMeta||this.defaultMeta(),!n)return this.logger.warn("meta-schema not available"),this.errors=null,!0;let s=this.validate(n,e);if(!s&&r){let i="schema is invalid: "+this.errorsText();if(this.opts.validateSchema==="log")this.logger.error(i);else throw new Error(i)}return s}getSchema(e){let r;for(;typeof(r=GE.call(this,e))=="string";)e=r;if(r===void 0){let{schemaId:n}=this.opts,s=new Ls.SchemaEnv({schema:{},schemaId:n});if(r=Ls.resolveSchema.call(this,s,e),!r)return;this.refs[e]=r}return r.validate||this._compileSchemaEnv(r)}removeSchema(e){if(e instanceof RegExp)return this._removeAllSchemas(this.schemas,e),this._removeAllSchemas(this.refs,e),this;switch(typeof e){case"undefined":return this._removeAllSchemas(this.schemas),this._removeAllSchemas(this.refs),this._cache.clear(),this;case"string":{let r=GE.call(this,e);return typeof r=="object"&&this._cache.delete(r.schema),delete this.schemas[e],delete this.refs[e],this}case"object":{let r=e;this._cache.delete(r);let n=e[this.opts.schemaId];return n&&(n=(0,Ns.normalizeId)(n),delete this.schemas[n],delete this.refs[n]),this}default:throw new Error("ajv.removeSchema: invalid parameter")}}addVocabulary(e){for(let r of e)this.addKeyword(r);return this}addKeyword(e,r){let n;if(typeof e=="string")n=e,typeof r=="object"&&(this.logger.warn("these parameters are deprecated, see docs for addKeyword"),r.keyword=n);else if(typeof e=="object"&&r===void 0){if(r=e,n=r.keyword,Array.isArray(n)&&!n.length)throw new Error("addKeywords: keyword must be string or non-empty array")}else throw new Error("invalid addKeywords parameters");if(wC.call(this,n,r),!r)return(0,Bu.eachItem)(n,i=>Vu.call(this,i)),this;TC.call(this,r);let s={...r,type:(0,Xo.getJSONTypes)(r.type),schemaType:(0,Xo.getJSONTypes)(r.schemaType)};return(0,Bu.eachItem)(n,s.type.length===0?i=>Vu.call(this,i,s):i=>s.type.forEach(o=>Vu.call(this,i,s,o))),this}getKeyword(e){let r=this.RULES.all[e];return typeof r=="object"?r.definition:!!r}removeKeyword(e){let{RULES:r}=this;delete r.keywords[e],delete r.all[e];for(let n of r.rules){let s=n.rules.findIndex(i=>i.keyword===e);s>=0&&n.rules.splice(s,1)}return this}addFormat(e,r){return typeof r=="string"&&(r=new RegExp(r)),this.formats[e]=r,this}errorsText(e=this.errors,{separator:r=", ",dataVar:n="data"}={}){return!e||e.length===0?"No errors":e.map(s=>`${n}${s.instancePath} ${s.message}`).reduce((s,i)=>s+r+i)}$dataMetaSchema(e,r){let n=this.RULES.all;e=JSON.parse(JSON.stringify(e));for(let s of r){let i=s.split("/").slice(1),o=e;for(let a of i)o=o[a];for(let a in n){let c=n[a];if(typeof c!="object")continue;let{$data:l}=c.definition,u=o[a];l&&u&&(o[a]=YE(u))}}return e}_removeAllSchemas(e,r){for(let n in e){let s=e[n];(!r||r.test(n))&&(typeof s=="string"?delete e[n]:s&&!s.meta&&(this._cache.delete(s.schema),delete e[n]))}}_addSchema(e,r,n,s=this.opts.validateSchema,i=this.opts.addUsedSchema){let o,{schemaId:a}=this.opts;if(typeof e=="object")o=e[a];else{if(this.opts.jtd)throw new Error("schema must be object");if(typeof e!="boolean")throw new Error("schema must be object or boolean")}let c=this._cache.get(e);if(c!==void 0)return c;n=(0,Ns.normalizeId)(o||n);let l=Ns.getSchemaRefs.call(this,e,n);return c=new Ls.SchemaEnv({schema:e,schemaId:a,meta:r,baseId:n,localRefs:l}),this._cache.set(c.schema,c),i&&!n.startsWith("#")&&(n&&this._checkUnique(n),this.refs[n]=c),s&&this.validateSchema(e,!0),c}_checkUnique(e){if(this.schemas[e]||this.refs[e])throw new Error(`schema with key or id "${e}" already exists`)}_compileSchemaEnv(e){if(e.meta?this._compileMetaSchema(e):Ls.compileSchema.call(this,e),!e.validate)throw new Error("ajv implementation error");return e.validate}_compileMetaSchema(e){let r=this.opts;this.opts=this._metaOpts;try{Ls.compileSchema.call(this,e)}finally{this.opts=r}}};Os.ValidationError=iC.default;Os.MissingRefError=zE.default;qe.default=Os;function KE(t,e,r,n="error"){for(let s in t){let i=s;i in e&&this.logger[n](`${r}: option ${s}. ${t[i]}`)}}function GE(t){return t=(0,Ns.normalizeId)(t),this.schemas[t]||this.refs[t]}function pC(){let t=this.opts.schemas;if(t)if(Array.isArray(t))this.addSchema(t);else for(let e in t)this.addSchema(t[e],e)}function mC(){for(let t in this.opts.formats){let e=this.opts.formats[t];e&&this.addFormat(t,e)}}function _C(t){if(Array.isArray(t)){this.addVocabulary(t);return}this.logger.warn("keywords option as map is deprecated, pass array");for(let e in t){let r=t[e];r.keyword||(r.keyword=e),this.addKeyword(r)}}function gC(){let t={...this.opts};for(let e of lC)delete t[e];return t}var yC={log(){},warn(){},error(){}};function EC(t){if(t===!1)return yC;if(t===void 0)return console;if(t.log&&t.warn&&t.error)return t;throw new Error("logger must implement log, warn and error methods")}var vC=/^[a-z_$][a-z0-9_$:-]*$/i;function wC(t,e){let{RULES:r}=this;if((0,Bu.eachItem)(t,n=>{if(r.keywords[n])throw new Error(`Keyword ${n} is already defined`);if(!vC.test(n))throw new Error(`Keyword ${n} has invalid name`)}),!!e&&e.$data&&!("code"in e||"validate"in e))throw new Error('$data keyword must have "code" or "validate" function')}function Vu(t,e,r){var n;let s=e?.post;if(r&&s)throw new Error('keyword with "post" flag cannot have "type"');let{RULES:i}=this,o=s?i.post:i.rules.find(({type:c})=>c===r);if(o||(o={type:r,rules:[]},i.rules.push(o)),i.keywords[t]=!0,!e)return;let a={keyword:t,definition:{...e,type:(0,Xo.getJSONTypes)(e.type),schemaType:(0,Xo.getJSONTypes)(e.schemaType)}};e.before?SC.call(this,o,a,e.before):o.rules.push(a),i.all[t]=a,(n=e.implements)===null||n===void 0||n.forEach(c=>this.addKeyword(c))}function SC(t,e,r){let n=t.rules.findIndex(s=>s.keyword===r);n>=0?t.rules.splice(n,0,e):(t.rules.push(e),this.logger.warn(`rule ${r} is not defined`))}function TC(t){let{metaSchema:e}=t;e!==void 0&&(t.$data&&this.opts.$data&&(e=YE(e)),t.validateSchema=this.compile(e,!0))}var bC={$ref:"https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"};function YE(t){return{anyOf:[t,bC]}}});var Hu=m(Vr=>{"use strict";Object.defineProperty(Vr,"__esModule",{value:!0});Vr.callRef=Vr.getValidate=void 0;var IC=As(),XE=ht(),st=J(),wn=zt(),QE=Ko(),Qo=ne(),AC={keyword:"$ref",schemaType:"string",code(t){let{gen:e,schema:r,it:n}=t,{baseId:s,schemaEnv:i,validateName:o,opts:a,self:c}=n,{root:l}=i;if((r==="#"||r==="#/")&&s===l.baseId)return f();let u=QE.resolveRef.call(c,l,s,r);if(u===void 0)throw new IC.default(n.opts.uriResolver,s,r);if(u instanceof QE.SchemaEnv)return d(u);return h(u);function f(){if(i===l)return Zo(t,o,i,i.$async);let g=e.scopeValue("root",{ref:l});return Zo(t,(0,st._)`${g}.validate`,l,l.$async)}function d(g){let p=ZE(t,g);Zo(t,p,g,g.$async)}function h(g){let p=e.scopeValue("schema",a.code.source===!0?{ref:g,code:(0,st.stringify)(g)}:{ref:g}),_=e.name("valid"),y=t.subschema({schema:g,dataTypes:[],schemaPath:st.nil,topSchemaRef:p,errSchemaPath:r},_);t.mergeEvaluated(y),t.ok(_)}}};function ZE(t,e){let{gen:r}=t;return e.validate?r.scopeValue("validate",{ref:e.validate}):(0,st._)`${r.scopeValue("wrapper",{ref:e})}.validate`}Vr.getValidate=ZE;function Zo(t,e,r,n){let{gen:s,it:i}=t,{allErrors:o,schemaEnv:a,opts:c}=i,l=c.passContext?wn.default.this:st.nil;n?u():f();function u(){if(!a.$async)throw new Error("async schema referenced by sync schema");let g=s.let("valid");s.try(()=>{s.code((0,st._)`await ${(0,XE.callValidateCode)(t,e,l)}`),h(e),o||s.assign(g,!0)},p=>{s.if((0,st._)`!(${p} instanceof ${i.ValidationError})`,()=>s.throw(p)),d(p),o||s.assign(g,!1)}),t.ok(g)}function f(){t.result((0,XE.callValidateCode)(t,e,l),()=>h(e),()=>d(e))}function d(g){let p=(0,st._)`${g}.errors`;s.assign(wn.default.vErrors,(0,st._)`${wn.default.vErrors} === null ? ${p} : ${wn.default.vErrors}.concat(${p})`),s.assign(wn.default.errors,(0,st._)`${wn.default.vErrors}.length`)}function h(g){var p;if(!i.opts.unevaluated)return;let _=(p=r?.validate)===null||p===void 0?void 0:p.evaluated;if(i.props!==!0)if(_&&!_.dynamicProps)_.props!==void 0&&(i.props=Qo.mergeEvaluated.props(s,_.props,i.props));else{let y=s.var("props",(0,st._)`${g}.evaluated.props`);i.props=Qo.mergeEvaluated.props(s,y,i.props,st.Name)}if(i.items!==!0)if(_&&!_.dynamicItems)_.items!==void 0&&(i.items=Qo.mergeEvaluated.items(s,_.items,i.items));else{let y=s.var("items",(0,st._)`${g}.evaluated.items`);i.items=Qo.mergeEvaluated.items(s,y,i.items,st.Name)}}}Vr.callRef=Zo;Vr.default=AC});var ev=m(Wu=>{"use strict";Object.defineProperty(Wu,"__esModule",{value:!0});var $C=Hu(),LC=["$schema","id","$defs",{keyword:"$comment"},"definitions",$C.default];Wu.default=LC});var tv=m(Ju=>{"use strict";Object.defineProperty(Ju,"__esModule",{value:!0});var Ku=vn(),NC=J(),_r=NC.operators,Gu={maximum:{exclusive:"exclusiveMaximum",ops:[{okStr:"<=",ok:_r.LTE,fail:_r.GT},{okStr:"<",ok:_r.LT,fail:_r.GTE}]},minimum:{exclusive:"exclusiveMinimum",ops:[{okStr:">=",ok:_r.GTE,fail:_r.LT},{okStr:">",ok:_r.GT,fail:_r.LTE}]}},OC={message:t=>Ku.str`must be ${zu(t).okStr} ${t.schemaCode}`,params:t=>Ku._`{comparison: ${zu(t).okStr}, limit: ${t.schemaCode}}`},PC={keyword:Object.keys(Gu),type:"number",schemaType:"number",$data:!0,error:OC,code(t){let{data:e,schemaCode:r}=t;t.fail$data(Ku._`${e} ${zu(t).fail} ${r} || isNaN(${e})`)}};function zu(t){var e;let r=t.keyword,n=!((e=t.parentSchema)===null||e===void 0)&&e[Gu[r].exclusive]?1:0;return Gu[r].ops[n]}Ju.default=PC});var nv=m(Yu=>{"use strict";Object.defineProperty(Yu,"__esModule",{value:!0});var rv={exclusiveMaximum:"maximum",exclusiveMinimum:"minimum"},RC={keyword:Object.keys(rv),type:"number",schemaType:"boolean",code({keyword:t,parentSchema:e}){let r=rv[t];if(e[r]===void 0)throw new Error(`${t} can only be used with ${r}`)}};Yu.default=RC});var Qu=m(Xu=>{"use strict";Object.defineProperty(Xu,"__esModule",{value:!0});var Ps=J(),CC={message:({schemaCode:t})=>(0,Ps.str)`must be multiple of ${t}`,params:({schemaCode:t})=>(0,Ps._)`{multipleOf: ${t}}`},kC={keyword:"multipleOf",type:"number",schemaType:"number",$data:!0,error:CC,code(t){let{gen:e,data:r,schemaCode:n,it:s}=t,i=s.opts.multipleOfPrecision,o=e.let("res"),a=i?(0,Ps._)`Math.abs(Math.round(${o}) - ${o}) > 1e-${i}`:(0,Ps._)`${o} !== parseInt(${o})`;t.fail$data((0,Ps._)`(${n} === 0 || (${o} = ${r}/${n}, ${a}))`)}};Xu.default=kC});var iv=m(Zu=>{"use strict";Object.defineProperty(Zu,"__esModule",{value:!0});function sv(t){let e=t.length,r=0,n=0,s;for(;n<e;)r++,s=t.charCodeAt(n++),s>=55296&&s<=56319&&n<e&&(s=t.charCodeAt(n),(s&64512)===56320&&n++);return r}Zu.default=sv;sv.code='require("ajv/dist/runtime/ucs2length").default'});var tf=m(ef=>{"use strict";Object.defineProperty(ef,"__esModule",{value:!0});var Br=J(),qC=ne(),MC=iv(),xC={message({keyword:t,schemaCode:e}){let r=t==="maxLength"?"more":"fewer";return(0,Br.str)`must NOT have ${r} than ${e} characters`},params:({schemaCode:t})=>(0,Br._)`{limit: ${t}}`},jC={keyword:["maxLength","minLength"],type:"string",schemaType:"number",$data:!0,error:xC,code(t){let{keyword:e,data:r,schemaCode:n,it:s}=t,i=e==="maxLength"?Br.operators.GT:Br.operators.LT,o=s.opts.unicode===!1?(0,Br._)`${r}.length`:(0,Br._)`${(0,qC.useFunc)(t.gen,MC.default)}(${r})`;t.fail$data((0,Br._)`${o} ${i} ${n}`)}};ef.default=jC});var nf=m(rf=>{"use strict";Object.defineProperty(rf,"__esModule",{value:!0});var DC=ht(),FC=ne(),Sn=J(),UC={message:({schemaCode:t})=>(0,Sn.str)`must match pattern "${t}"`,params:({schemaCode:t})=>(0,Sn._)`{pattern: ${t}}`},VC={keyword:"pattern",type:"string",schemaType:"string",$data:!0,error:UC,code(t){let{gen:e,data:r,$data:n,schema:s,schemaCode:i,it:o}=t,a=o.opts.unicodeRegExp?"u":"";if(n){let{regExp:c}=o.opts.code,l=c.code==="new RegExp"?(0,Sn._)`new RegExp`:(0,FC.useFunc)(e,c),u=e.let("valid");e.try(()=>e.assign(u,(0,Sn._)`${l}(${i}, ${a}).test(${r})`),()=>e.assign(u,!1)),t.fail$data((0,Sn._)`!${u}`)}else{let c=(0,DC.usePattern)(t,s);t.fail$data((0,Sn._)`!${c}.test(${r})`)}}};rf.default=VC});var of=m(sf=>{"use strict";Object.defineProperty(sf,"__esModule",{value:!0});var Rs=J(),BC={message({keyword:t,schemaCode:e}){let r=t==="maxProperties"?"more":"fewer";return(0,Rs.str)`must NOT have ${r} than ${e} properties`},params:({schemaCode:t})=>(0,Rs._)`{limit: ${t}}`},HC={keyword:["maxProperties","minProperties"],type:"object",schemaType:"number",$data:!0,error:BC,code(t){let{keyword:e,data:r,schemaCode:n}=t,s=e==="maxProperties"?Rs.operators.GT:Rs.operators.LT;t.fail$data((0,Rs._)`Object.keys(${r}).length ${s} ${n}`)}};sf.default=HC});var cf=m(af=>{"use strict";Object.defineProperty(af,"__esModule",{value:!0});var Cs=ht(),ks=J(),WC=ne(),KC={message:({params:{missingProperty:t}})=>(0,ks.str)`must have required property '${t}'`,params:({params:{missingProperty:t}})=>(0,ks._)`{missingProperty: ${t}}`},GC={keyword:"required",type:"object",schemaType:"array",$data:!0,error:KC,code(t){let{gen:e,schema:r,schemaCode:n,data:s,$data:i,it:o}=t,{opts:a}=o;if(!i&&r.length===0)return;let c=r.length>=a.loopRequired;if(o.allErrors?l():u(),a.strictRequired){let h=t.parentSchema.properties,{definedProperties:g}=t.it;for(let p of r)if(h?.[p]===void 0&&!g.has(p)){let _=o.schemaEnv.baseId+o.errSchemaPath,y=`required property "${p}" is not defined at "${_}" (strictRequired)`;(0,WC.checkStrictMode)(o,y,o.opts.strictRequired)}}function l(){if(c||i)t.block$data(ks.nil,f);else for(let h of r)(0,Cs.checkReportMissingProp)(t,h)}function u(){let h=e.let("missing");if(c||i){let g=e.let("valid",!0);t.block$data(g,()=>d(h,g)),t.ok(g)}else e.if((0,Cs.checkMissingProp)(t,r,h)),(0,Cs.reportMissingProp)(t,h),e.else()}function f(){e.forOf("prop",n,h=>{t.setParams({missingProperty:h}),e.if((0,Cs.noPropertyInData)(e,s,h,a.ownProperties),()=>t.error())})}function d(h,g){t.setParams({missingProperty:h}),e.forOf(h,n,()=>{e.assign(g,(0,Cs.propertyInData)(e,s,h,a.ownProperties)),e.if((0,ks.not)(g),()=>{t.error(),e.break()})},ks.nil)}}};af.default=GC});var uf=m(lf=>{"use strict";Object.defineProperty(lf,"__esModule",{value:!0});var qs=J(),zC={message({keyword:t,schemaCode:e}){let r=t==="maxItems"?"more":"fewer";return(0,qs.str)`must NOT have ${r} than ${e} items`},params:({schemaCode:t})=>(0,qs._)`{limit: ${t}}`},JC={keyword:["maxItems","minItems"],type:"array",schemaType:"number",$data:!0,error:zC,code(t){let{keyword:e,data:r,schemaCode:n}=t,s=e==="maxItems"?qs.operators.GT:qs.operators.LT;t.fail$data((0,qs._)`${r}.length ${s} ${n}`)}};lf.default=JC});var ea=m(ff=>{"use strict";Object.defineProperty(ff,"__esModule",{value:!0});var ov=bu();ov.code='require("ajv/dist/runtime/equal").default';ff.default=ov});var pf=m(hf=>{"use strict";Object.defineProperty(hf,"__esModule",{value:!0});var df=ws(),Me=J(),YC=ne(),XC=ea(),QC={message:({params:{i:t,j:e}})=>(0,Me.str)`must NOT have duplicate items (items ## ${e} and ${t} are identical)`,params:({params:{i:t,j:e}})=>(0,Me._)`{i: ${t}, j: ${e}}`},ZC={keyword:"uniqueItems",type:"array",schemaType:"boolean",$data:!0,error:QC,code(t){let{gen:e,data:r,$data:n,schema:s,parentSchema:i,schemaCode:o,it:a}=t;if(!n&&!s)return;let c=e.let("valid"),l=i.items?(0,df.getSchemaTypes)(i.items):[];t.block$data(c,u,(0,Me._)`${o} === false`),t.ok(c);function u(){let g=e.let("i",(0,Me._)`${r}.length`),p=e.let("j");t.setParams({i:g,j:p}),e.assign(c,!0),e.if((0,Me._)`${g} > 1`,()=>(f()?d:h)(g,p))}function f(){return l.length>0&&!l.some(g=>g==="object"||g==="array")}function d(g,p){let _=e.name("item"),y=(0,df.checkDataTypes)(l,_,a.opts.strictNumbers,df.DataType.Wrong),w=e.const("indices",(0,Me._)`{}`);e.for((0,Me._)`;${g}--;`,()=>{e.let(_,(0,Me._)`${r}[${g}]`),e.if(y,(0,Me._)`continue`),l.length>1&&e.if((0,Me._)`typeof ${_} == "string"`,(0,Me._)`${_} += "_"`),e.if((0,Me._)`typeof ${w}[${_}] == "number"`,()=>{e.assign(p,(0,Me._)`${w}[${_}]`),t.error(),e.assign(c,!1).break()}).code((0,Me._)`${w}[${_}] = ${g}`)})}function h(g,p){let _=(0,YC.useFunc)(e,XC.default),y=e.name("outer");e.label(y).for((0,Me._)`;${g}--;`,()=>e.for((0,Me._)`${p} = ${g}; ${p}--;`,()=>e.if((0,Me._)`${_}(${r}[${g}], ${r}[${p}])`,()=>{t.error(),e.assign(c,!1).break(y)})))}}};hf.default=ZC});var gf=m(_f=>{"use strict";Object.defineProperty(_f,"__esModule",{value:!0});var mf=J(),ek=ne(),tk=ea(),rk={message:"must be equal to constant",params:({schemaCode:t})=>(0,mf._)`{allowedValue: ${t}}`},nk={keyword:"const",$data:!0,error:rk,code(t){let{gen:e,data:r,$data:n,schemaCode:s,schema:i}=t;n||i&&typeof i=="object"?t.fail$data((0,mf._)`!${(0,ek.useFunc)(e,tk.default)}(${r}, ${s})`):t.fail((0,mf._)`${i} !== ${r}`)}};_f.default=nk});var Ef=m(yf=>{"use strict";Object.defineProperty(yf,"__esModule",{value:!0});var Ms=J(),sk=ne(),ik=ea(),ok={message:"must be equal to one of the allowed values",params:({schemaCode:t})=>(0,Ms._)`{allowedValues: ${t}}`},ak={keyword:"enum",schemaType:"array",$data:!0,error:ok,code(t){let{gen:e,data:r,$data:n,schema:s,schemaCode:i,it:o}=t;if(!n&&s.length===0)throw new Error("enum must have non-empty array");let a=s.length>=o.opts.loopEnum,c,l=()=>c??(c=(0,sk.useFunc)(e,ik.default)),u;if(a||n)u=e.let("valid"),t.block$data(u,f);else{if(!Array.isArray(s))throw new Error("ajv implementation error");let h=e.const("vSchema",i);u=(0,Ms.or)(...s.map((g,p)=>d(h,p)))}t.pass(u);function f(){e.assign(u,!1),e.forOf("v",i,h=>e.if((0,Ms._)`${l()}(${r}, ${h})`,()=>e.assign(u,!0).break()))}function d(h,g){let p=s[g];return typeof p=="object"&&p!==null?(0,Ms._)`${l()}(${r}, ${h}[${g}])`:(0,Ms._)`${r} === ${p}`}}};yf.default=ak});var av=m(vf=>{"use strict";Object.defineProperty(vf,"__esModule",{value:!0});var ck=tv(),lk=nv(),uk=Qu(),fk=tf(),dk=nf(),hk=of(),pk=cf(),mk=uf(),_k=pf(),gk=gf(),yk=Ef(),Ek=[ck.default,lk.default,uk.default,fk.default,dk.default,hk.default,pk.default,mk.default,_k.default,{keyword:"type",schemaType:["string","array"]},{keyword:"nullable",schemaType:"boolean"},gk.default,yk.default];vf.default=Ek});var Sf=m(xs=>{"use strict";Object.defineProperty(xs,"__esModule",{value:!0});xs.validateAdditionalItems=void 0;var Hr=J(),wf=ne(),vk={message:({params:{len:t}})=>(0,Hr.str)`must NOT have more than ${t} items`,params:({params:{len:t}})=>(0,Hr._)`{limit: ${t}}`},wk={keyword:"additionalItems",type:"array",schemaType:["boolean","object"],before:"uniqueItems",error:vk,code(t){let{parentSchema:e,it:r}=t,{items:n}=e;if(!Array.isArray(n)){(0,wf.checkStrictMode)(r,'"additionalItems" is ignored when "items" is not an array of schemas');return}cv(t,n)}};function cv(t,e){let{gen:r,schema:n,data:s,keyword:i,it:o}=t;o.items=!0;let a=r.const("len",(0,Hr._)`${s}.length`);if(n===!1)t.setParams({len:e.length}),t.pass((0,Hr._)`${a} <= ${e.length}`);else if(typeof n=="object"&&!(0,wf.alwaysValidSchema)(o,n)){let l=r.var("valid",(0,Hr._)`${a} <= ${e.length}`);r.if((0,Hr.not)(l),()=>c(l)),t.ok(l)}function c(l){r.forRange("i",e.length,a,u=>{t.subschema({keyword:i,dataProp:u,dataPropType:wf.Type.Num},l),o.allErrors||r.if((0,Hr.not)(l),()=>r.break())})}}xs.validateAdditionalItems=cv;xs.default=wk});var Tf=m(js=>{"use strict";Object.defineProperty(js,"__esModule",{value:!0});js.validateTuple=void 0;var lv=J(),ta=ne(),Sk=ht(),Tk={keyword:"items",type:"array",schemaType:["object","array","boolean"],before:"uniqueItems",code(t){let{schema:e,it:r}=t;if(Array.isArray(e))return uv(t,"additionalItems",e);r.items=!0,!(0,ta.alwaysValidSchema)(r,e)&&t.ok((0,Sk.validateArray)(t))}};function uv(t,e,r=t.schema){let{gen:n,parentSchema:s,data:i,keyword:o,it:a}=t;u(s),a.opts.unevaluated&&r.length&&a.items!==!0&&(a.items=ta.mergeEvaluated.items(n,r.length,a.items));let c=n.name("valid"),l=n.const("len",(0,lv._)`${i}.length`);r.forEach((f,d)=>{(0,ta.alwaysValidSchema)(a,f)||(n.if((0,lv._)`${l} > ${d}`,()=>t.subschema({keyword:o,schemaProp:d,dataProp:d},c)),t.ok(c))});function u(f){let{opts:d,errSchemaPath:h}=a,g=r.length,p=g===f.minItems&&(g===f.maxItems||f[e]===!1);if(d.strictTuples&&!p){let _=`"${o}" is ${g}-tuple, but minItems or maxItems/${e} are not specified or different at path "${h}"`;(0,ta.checkStrictMode)(a,_,d.strictTuples)}}}js.validateTuple=uv;js.default=Tk});var fv=m(bf=>{"use strict";Object.defineProperty(bf,"__esModule",{value:!0});var bk=Tf(),Ik={keyword:"prefixItems",type:"array",schemaType:["array"],before:"uniqueItems",code:t=>(0,bk.validateTuple)(t,"items")};bf.default=Ik});var hv=m(If=>{"use strict";Object.defineProperty(If,"__esModule",{value:!0});var dv=J(),Ak=ne(),$k=ht(),Lk=Sf(),Nk={message:({params:{len:t}})=>(0,dv.str)`must NOT have more than ${t} items`,params:({params:{len:t}})=>(0,dv._)`{limit: ${t}}`},Ok={keyword:"items",type:"array",schemaType:["object","boolean"],before:"uniqueItems",error:Nk,code(t){let{schema:e,parentSchema:r,it:n}=t,{prefixItems:s}=r;n.items=!0,!(0,Ak.alwaysValidSchema)(n,e)&&(s?(0,Lk.validateAdditionalItems)(t,s):t.ok((0,$k.validateArray)(t)))}};If.default=Ok});var pv=m(Af=>{"use strict";Object.defineProperty(Af,"__esModule",{value:!0});var mt=J(),ra=ne(),Pk={message:({params:{min:t,max:e}})=>e===void 0?(0,mt.str)`must contain at least ${t} valid item(s)`:(0,mt.str)`must contain at least ${t} and no more than ${e} valid item(s)`,params:({params:{min:t,max:e}})=>e===void 0?(0,mt._)`{minContains: ${t}}`:(0,mt._)`{minContains: ${t}, maxContains: ${e}}`},Rk={keyword:"contains",type:"array",schemaType:["object","boolean"],before:"uniqueItems",trackErrors:!0,error:Pk,code(t){let{gen:e,schema:r,parentSchema:n,data:s,it:i}=t,o,a,{minContains:c,maxContains:l}=n;i.opts.next?(o=c===void 0?1:c,a=l):o=1;let u=e.const("len",(0,mt._)`${s}.length`);if(t.setParams({min:o,max:a}),a===void 0&&o===0){(0,ra.checkStrictMode)(i,'"minContains" == 0 without "maxContains": "contains" keyword ignored');return}if(a!==void 0&&o>a){(0,ra.checkStrictMode)(i,'"minContains" > "maxContains" is always invalid'),t.fail();return}if((0,ra.alwaysValidSchema)(i,r)){let p=(0,mt._)`${u} >= ${o}`;a!==void 0&&(p=(0,mt._)`${p} && ${u} <= ${a}`),t.pass(p);return}i.items=!0;let f=e.name("valid");a===void 0&&o===1?h(f,()=>e.if(f,()=>e.break())):o===0?(e.let(f,!0),a!==void 0&&e.if((0,mt._)`${s}.length > 0`,d)):(e.let(f,!1),d()),t.result(f,()=>t.reset());function d(){let p=e.name("_valid"),_=e.let("count",0);h(p,()=>e.if(p,()=>g(_)))}function h(p,_){e.forRange("i",0,u,y=>{t.subschema({keyword:"contains",dataProp:y,dataPropType:ra.Type.Num,compositeRule:!0},p),_()})}function g(p){e.code((0,mt._)`${p}++`),a===void 0?e.if((0,mt._)`${p} >= ${o}`,()=>e.assign(f,!0).break()):(e.if((0,mt._)`${p} > ${a}`,()=>e.assign(f,!1).break()),o===1?e.assign(f,!0):e.if((0,mt._)`${p} >= ${o}`,()=>e.assign(f,!0)))}}};Af.default=Rk});var gv=m(Mt=>{"use strict";Object.defineProperty(Mt,"__esModule",{value:!0});Mt.validateSchemaDeps=Mt.validatePropertyDeps=Mt.error=void 0;var $f=J(),Ck=ne(),Ds=ht();Mt.error={message:({params:{property:t,depsCount:e,deps:r}})=>{let n=e===1?"property":"properties";return(0,$f.str)`must have ${n} ${r} when property ${t} is present`},params:({params:{property:t,depsCount:e,deps:r,missingProperty:n}})=>(0,$f._)`{property: ${t},
    missingProperty: ${n},
    depsCount: ${e},
    deps: ${r}}`};var kk={keyword:"dependencies",type:"object",schemaType:"object",error:Mt.error,code(t){let[e,r]=qk(t);mv(t,e),_v(t,r)}};function qk({schema:t}){let e={},r={};for(let n in t){if(n==="__proto__")continue;let s=Array.isArray(t[n])?e:r;s[n]=t[n]}return[e,r]}function mv(t,e=t.schema){let{gen:r,data:n,it:s}=t;if(Object.keys(e).length===0)return;let i=r.let("missing");for(let o in e){let a=e[o];if(a.length===0)continue;let c=(0,Ds.propertyInData)(r,n,o,s.opts.ownProperties);t.setParams({property:o,depsCount:a.length,deps:a.join(", ")}),s.allErrors?r.if(c,()=>{for(let l of a)(0,Ds.checkReportMissingProp)(t,l)}):(r.if((0,$f._)`${c} && (${(0,Ds.checkMissingProp)(t,a,i)})`),(0,Ds.reportMissingProp)(t,i),r.else())}}Mt.validatePropertyDeps=mv;function _v(t,e=t.schema){let{gen:r,data:n,keyword:s,it:i}=t,o=r.name("valid");for(let a in e)(0,Ck.alwaysValidSchema)(i,e[a])||(r.if((0,Ds.propertyInData)(r,n,a,i.opts.ownProperties),()=>{let c=t.subschema({keyword:s,schemaProp:a},o);t.mergeValidEvaluated(c,o)},()=>r.var(o,!0)),t.ok(o))}Mt.validateSchemaDeps=_v;Mt.default=kk});var Ev=m(Lf=>{"use strict";Object.defineProperty(Lf,"__esModule",{value:!0});var yv=J(),Mk=ne(),xk={message:"property name must be valid",params:({params:t})=>(0,yv._)`{propertyName: ${t.propertyName}}`},jk={keyword:"propertyNames",type:"object",schemaType:["object","boolean"],error:xk,code(t){let{gen:e,schema:r,data:n,it:s}=t;if((0,Mk.alwaysValidSchema)(s,r))return;let i=e.name("valid");e.forIn("key",n,o=>{t.setParams({propertyName:o}),t.subschema({keyword:"propertyNames",data:o,dataTypes:["string"],propertyName:o,compositeRule:!0},i),e.if((0,yv.not)(i),()=>{t.error(!0),s.allErrors||e.break()})}),t.ok(i)}};Lf.default=jk});var Of=m(Nf=>{"use strict";Object.defineProperty(Nf,"__esModule",{value:!0});var na=ht(),It=J(),Dk=zt(),sa=ne(),Fk={message:"must NOT have additional properties",params:({params:t})=>(0,It._)`{additionalProperty: ${t.additionalProperty}}`},Uk={keyword:"additionalProperties",type:["object"],schemaType:["boolean","object"],allowUndefined:!0,trackErrors:!0,error:Fk,code(t){let{gen:e,schema:r,parentSchema:n,data:s,errsCount:i,it:o}=t;if(!i)throw new Error("ajv implementation error");let{allErrors:a,opts:c}=o;if(o.props=!0,c.removeAdditional!=="all"&&(0,sa.alwaysValidSchema)(o,r))return;let l=(0,na.allSchemaProperties)(n.properties),u=(0,na.allSchemaProperties)(n.patternProperties);f(),t.ok((0,It._)`${i} === ${Dk.default.errors}`);function f(){e.forIn("key",s,_=>{!l.length&&!u.length?g(_):e.if(d(_),()=>g(_))})}function d(_){let y;if(l.length>8){let w=(0,sa.schemaRefOrVal)(o,n.properties,"properties");y=(0,na.isOwnProperty)(e,w,_)}else l.length?y=(0,It.or)(...l.map(w=>(0,It._)`${_} === ${w}`)):y=It.nil;return u.length&&(y=(0,It.or)(y,...u.map(w=>(0,It._)`${(0,na.usePattern)(t,w)}.test(${_})`))),(0,It.not)(y)}function h(_){e.code((0,It._)`delete ${s}[${_}]`)}function g(_){if(c.removeAdditional==="all"||c.removeAdditional&&r===!1){h(_);return}if(r===!1){t.setParams({additionalProperty:_}),t.error(),a||e.break();return}if(typeof r=="object"&&!(0,sa.alwaysValidSchema)(o,r)){let y=e.name("valid");c.removeAdditional==="failing"?(p(_,y,!1),e.if((0,It.not)(y),()=>{t.reset(),h(_)})):(p(_,y),a||e.if((0,It.not)(y),()=>e.break()))}}function p(_,y,w){let b={keyword:"additionalProperties",dataProp:_,dataPropType:sa.Type.Str};w===!1&&Object.assign(b,{compositeRule:!0,createErrors:!1,allErrors:!1}),t.subschema(b,y)}}};Nf.default=Uk});var Sv=m(Rf=>{"use strict";Object.defineProperty(Rf,"__esModule",{value:!0});var Vk=Is(),vv=ht(),Pf=ne(),wv=Of(),Bk={keyword:"properties",type:"object",schemaType:"object",code(t){let{gen:e,schema:r,parentSchema:n,data:s,it:i}=t;i.opts.removeAdditional==="all"&&n.additionalProperties===void 0&&wv.default.code(new Vk.KeywordCxt(i,wv.default,"additionalProperties"));let o=(0,vv.allSchemaProperties)(r);for(let f of o)i.definedProperties.add(f);i.opts.unevaluated&&o.length&&i.props!==!0&&(i.props=Pf.mergeEvaluated.props(e,(0,Pf.toHash)(o),i.props));let a=o.filter(f=>!(0,Pf.alwaysValidSchema)(i,r[f]));if(a.length===0)return;let c=e.name("valid");for(let f of a)l(f)?u(f):(e.if((0,vv.propertyInData)(e,s,f,i.opts.ownProperties)),u(f),i.allErrors||e.else().var(c,!0),e.endIf()),t.it.definedProperties.add(f),t.ok(c);function l(f){return i.opts.useDefaults&&!i.compositeRule&&r[f].default!==void 0}function u(f){t.subschema({keyword:"properties",schemaProp:f,dataProp:f},c)}}};Rf.default=Bk});var Av=m(Cf=>{"use strict";Object.defineProperty(Cf,"__esModule",{value:!0});var Tv=ht(),ia=J(),bv=ne(),Iv=ne(),Hk={keyword:"patternProperties",type:"object",schemaType:"object",code(t){let{gen:e,schema:r,data:n,parentSchema:s,it:i}=t,{opts:o}=i,a=(0,Tv.allSchemaProperties)(r),c=a.filter(p=>(0,bv.alwaysValidSchema)(i,r[p]));if(a.length===0||c.length===a.length&&(!i.opts.unevaluated||i.props===!0))return;let l=o.strictSchema&&!o.allowMatchingProperties&&s.properties,u=e.name("valid");i.props!==!0&&!(i.props instanceof ia.Name)&&(i.props=(0,Iv.evaluatedPropsToName)(e,i.props));let{props:f}=i;d();function d(){for(let p of a)l&&h(p),i.allErrors?g(p):(e.var(u,!0),g(p),e.if(u))}function h(p){for(let _ in l)new RegExp(p).test(_)&&(0,bv.checkStrictMode)(i,`property ${_} matches pattern ${p} (use allowMatchingProperties)`)}function g(p){e.forIn("key",n,_=>{e.if((0,ia._)`${(0,Tv.usePattern)(t,p)}.test(${_})`,()=>{let y=c.includes(p);y||t.subschema({keyword:"patternProperties",schemaProp:p,dataProp:_,dataPropType:Iv.Type.Str},u),i.opts.unevaluated&&f!==!0?e.assign((0,ia._)`${f}[${_}]`,!0):!y&&!i.allErrors&&e.if((0,ia.not)(u),()=>e.break())})})}}};Cf.default=Hk});var $v=m(kf=>{"use strict";Object.defineProperty(kf,"__esModule",{value:!0});var Wk=ne(),Kk={keyword:"not",schemaType:["object","boolean"],trackErrors:!0,code(t){let{gen:e,schema:r,it:n}=t;if((0,Wk.alwaysValidSchema)(n,r)){t.fail();return}let s=e.name("valid");t.subschema({keyword:"not",compositeRule:!0,createErrors:!1,allErrors:!1},s),t.failResult(s,()=>t.reset(),()=>t.error())},error:{message:"must NOT be valid"}};kf.default=Kk});var Lv=m(qf=>{"use strict";Object.defineProperty(qf,"__esModule",{value:!0});var Gk=ht(),zk={keyword:"anyOf",schemaType:"array",trackErrors:!0,code:Gk.validateUnion,error:{message:"must match a schema in anyOf"}};qf.default=zk});var Nv=m(Mf=>{"use strict";Object.defineProperty(Mf,"__esModule",{value:!0});var oa=J(),Jk=ne(),Yk={message:"must match exactly one schema in oneOf",params:({params:t})=>(0,oa._)`{passingSchemas: ${t.passing}}`},Xk={keyword:"oneOf",schemaType:"array",trackErrors:!0,error:Yk,code(t){let{gen:e,schema:r,parentSchema:n,it:s}=t;if(!Array.isArray(r))throw new Error("ajv implementation error");if(s.opts.discriminator&&n.discriminator)return;let i=r,o=e.let("valid",!1),a=e.let("passing",null),c=e.name("_valid");t.setParams({passing:a}),e.block(l),t.result(o,()=>t.reset(),()=>t.error(!0));function l(){i.forEach((u,f)=>{let d;(0,Jk.alwaysValidSchema)(s,u)?e.var(c,!0):d=t.subschema({keyword:"oneOf",schemaProp:f,compositeRule:!0},c),f>0&&e.if((0,oa._)`${c} && ${o}`).assign(o,!1).assign(a,(0,oa._)`[${a}, ${f}]`).else(),e.if(c,()=>{e.assign(o,!0),e.assign(a,f),d&&t.mergeEvaluated(d,oa.Name)})})}}};Mf.default=Xk});var Ov=m(xf=>{"use strict";Object.defineProperty(xf,"__esModule",{value:!0});var Qk=ne(),Zk={keyword:"allOf",schemaType:"array",code(t){let{gen:e,schema:r,it:n}=t;if(!Array.isArray(r))throw new Error("ajv implementation error");let s=e.name("valid");r.forEach((i,o)=>{if((0,Qk.alwaysValidSchema)(n,i))return;let a=t.subschema({keyword:"allOf",schemaProp:o},s);t.ok(s),t.mergeEvaluated(a)})}};xf.default=Zk});var Cv=m(jf=>{"use strict";Object.defineProperty(jf,"__esModule",{value:!0});var aa=J(),Rv=ne(),eq={message:({params:t})=>(0,aa.str)`must match "${t.ifClause}" schema`,params:({params:t})=>(0,aa._)`{failingKeyword: ${t.ifClause}}`},tq={keyword:"if",schemaType:["object","boolean"],trackErrors:!0,error:eq,code(t){let{gen:e,parentSchema:r,it:n}=t;r.then===void 0&&r.else===void 0&&(0,Rv.checkStrictMode)(n,'"if" without "then" and "else" is ignored');let s=Pv(n,"then"),i=Pv(n,"else");if(!s&&!i)return;let o=e.let("valid",!0),a=e.name("_valid");if(c(),t.reset(),s&&i){let u=e.let("ifClause");t.setParams({ifClause:u}),e.if(a,l("then",u),l("else",u))}else s?e.if(a,l("then")):e.if((0,aa.not)(a),l("else"));t.pass(o,()=>t.error(!0));function c(){let u=t.subschema({keyword:"if",compositeRule:!0,createErrors:!1,allErrors:!1},a);t.mergeEvaluated(u)}function l(u,f){return()=>{let d=t.subschema({keyword:u},a);e.assign(o,a),t.mergeValidEvaluated(d,o),f?e.assign(f,(0,aa._)`${u}`):t.setParams({ifClause:u})}}}};function Pv(t,e){let r=t.schema[e];return r!==void 0&&!(0,Rv.alwaysValidSchema)(t,r)}jf.default=tq});var kv=m(Df=>{"use strict";Object.defineProperty(Df,"__esModule",{value:!0});var rq=ne(),nq={keyword:["then","else"],schemaType:["object","boolean"],code({keyword:t,parentSchema:e,it:r}){e.if===void 0&&(0,rq.checkStrictMode)(r,`"${t}" without "if" is ignored`)}};Df.default=nq});var Uf=m(Ff=>{"use strict";Object.defineProperty(Ff,"__esModule",{value:!0});var sq=Sf(),iq=fv(),oq=Tf(),aq=hv(),cq=pv(),lq=gv(),uq=Ev(),fq=Of(),dq=Sv(),hq=Av(),pq=$v(),mq=Lv(),_q=Nv(),gq=Ov(),yq=Cv(),Eq=kv();function vq(t=!1){let e=[pq.default,mq.default,_q.default,gq.default,yq.default,Eq.default,uq.default,fq.default,lq.default,dq.default,hq.default];return t?e.push(iq.default,aq.default):e.push(sq.default,oq.default),e.push(cq.default),e}Ff.default=vq});var qv=m(Vf=>{"use strict";Object.defineProperty(Vf,"__esModule",{value:!0});var Se=J(),wq={message:({schemaCode:t})=>(0,Se.str)`must match format "${t}"`,params:({schemaCode:t})=>(0,Se._)`{format: ${t}}`},Sq={keyword:"format",type:["number","string"],schemaType:"string",$data:!0,error:wq,code(t,e){let{gen:r,data:n,$data:s,schema:i,schemaCode:o,it:a}=t,{opts:c,errSchemaPath:l,schemaEnv:u,self:f}=a;if(!c.validateFormats)return;s?d():h();function d(){let g=r.scopeValue("formats",{ref:f.formats,code:c.code.formats}),p=r.const("fDef",(0,Se._)`${g}[${o}]`),_=r.let("fType"),y=r.let("format");r.if((0,Se._)`typeof ${p} == "object" && !(${p} instanceof RegExp)`,()=>r.assign(_,(0,Se._)`${p}.type || "string"`).assign(y,(0,Se._)`${p}.validate`),()=>r.assign(_,(0,Se._)`"string"`).assign(y,p)),t.fail$data((0,Se.or)(w(),b()));function w(){return c.strictSchema===!1?Se.nil:(0,Se._)`${o} && !${y}`}function b(){let I=u.$async?(0,Se._)`(${p}.async ? await ${y}(${n}) : ${y}(${n}))`:(0,Se._)`${y}(${n})`,A=(0,Se._)`(typeof ${y} == "function" ? ${I} : ${y}.test(${n}))`;return(0,Se._)`${y} && ${y} !== true && ${_} === ${e} && !${A}`}}function h(){let g=f.formats[i];if(!g){w();return}if(g===!0)return;let[p,_,y]=b(g);p===e&&t.pass(I());function w(){if(c.strictSchema===!1){f.logger.warn(A());return}throw new Error(A());function A(){return`unknown format "${i}" ignored in schema at path "${l}"`}}function b(A){let C=A instanceof RegExp?(0,Se.regexpCode)(A):c.code.formats?(0,Se._)`${c.code.formats}${(0,Se.getProperty)(i)}`:void 0,B=r.scopeValue("formats",{key:i,ref:A,code:C});return typeof A=="object"&&!(A instanceof RegExp)?[A.type||"string",A.validate,(0,Se._)`${B}.validate`]:["string",A,B]}function I(){if(typeof g=="object"&&!(g instanceof RegExp)&&g.async){if(!u.$async)throw new Error("async format in sync schema");return(0,Se._)`await ${y}(${n})`}return typeof _=="function"?(0,Se._)`${y}(${n})`:(0,Se._)`${y}.test(${n})`}}}};Vf.default=Sq});var Hf=m(Bf=>{"use strict";Object.defineProperty(Bf,"__esModule",{value:!0});var Tq=qv(),bq=[Tq.default];Bf.default=bq});var Mv=m(Wf=>{"use strict";Object.defineProperty(Wf,"__esModule",{value:!0});var Iq=ev(),Aq=av(),$q=Uf(),Lq=Hf(),Nq=["title","description","default"],Oq=[Iq.default,Aq.default,$q.default(),Lq.default,Nq];Wf.default=Oq});var jv=m(ca=>{"use strict";Object.defineProperty(ca,"__esModule",{value:!0});ca.DiscrError=void 0;var xv;(function(t){t.Tag="tag",t.Mapping="mapping"})(xv||(ca.DiscrError=xv={}))});var zf=m(Gf=>{"use strict";Object.defineProperty(Gf,"__esModule",{value:!0});var Tn=J(),Kf=jv(),Dv=Ko(),Pq=As(),Rq=ne(),Cq={message:({params:{discrError:t,tagName:e}})=>t===Kf.DiscrError.Tag?`tag "${e}" must be string`:`value of tag "${e}" must be in oneOf`,params:({params:{discrError:t,tag:e,tagName:r}})=>(0,Tn._)`{error: ${t}, tag: ${r}, tagValue: ${e}}`},kq={keyword:"discriminator",type:"object",schemaType:"object",error:Cq,code(t){let{gen:e,data:r,schema:n,parentSchema:s,it:i}=t,{oneOf:o}=s;if(!i.opts.discriminator)throw new Error("discriminator: requires discriminator option");let a=n.propertyName;if(typeof a!="string")throw new Error("discriminator: requires propertyName");if(n.mapping)throw new Error("discriminator: mapping is not supported");if(!o)throw new Error("discriminator: requires oneOf keyword");let c=e.let("valid",!1),l=e.const("tag",(0,Tn._)`${r}${(0,Tn.getProperty)(a)}`);e.if((0,Tn._)`typeof ${l} == "string"`,()=>u(),()=>t.error(!1,{discrError:Kf.DiscrError.Tag,tag:l,tagName:a})),t.ok(c);function u(){let h=d();e.if(!1);for(let g in h)e.elseIf((0,Tn._)`${l} === ${g}`),e.assign(c,f(h[g]));e.else(),t.error(!1,{discrError:Kf.DiscrError.Mapping,tag:l,tagName:a}),e.endIf()}function f(h){let g=e.name("valid"),p=t.subschema({keyword:"oneOf",schemaProp:h},g);return t.mergeEvaluated(p,Tn.Name),g}function d(){var h;let g={},p=y(s),_=!0;for(let I=0;I<o.length;I++){let A=o[I];if(A?.$ref&&!(0,Rq.schemaHasRulesButRef)(A,i.self.RULES)){let B=A.$ref;if(A=Dv.resolveRef.call(i.self,i.schemaEnv.root,i.baseId,B),A instanceof Dv.SchemaEnv&&(A=A.schema),A===void 0)throw new Pq.default(i.opts.uriResolver,i.baseId,B)}let C=(h=A?.properties)===null||h===void 0?void 0:h[a];if(typeof C!="object")throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${a}"`);_=_&&(p||y(A)),w(C,I)}if(!_)throw new Error(`discriminator: "${a}" must be required`);return g;function y({required:I}){return Array.isArray(I)&&I.includes(a)}function w(I,A){if(I.const)b(I.const,A);else if(I.enum)for(let C of I.enum)b(C,A);else throw new Error(`discriminator: "properties/${a}" must have "const" or "enum"`)}function b(I,A){if(typeof I!="string"||I in g)throw new Error(`discriminator: "${a}" values must be unique strings`);g[I]=A}}}};Gf.default=kq});var Fv=m((IV,qq)=>{qq.exports={id:"http://json-schema.org/draft-04/schema#",$schema:"http://json-schema.org/draft-04/schema#",description:"Core schema meta-schema",definitions:{schemaArray:{type:"array",minItems:1,items:{$ref:"#"}},positiveInteger:{type:"integer",minimum:0},positiveIntegerDefault0:{allOf:[{$ref:"#/definitions/positiveInteger"},{default:0}]},simpleTypes:{enum:["array","boolean","integer","null","number","object","string"]},stringArray:{type:"array",items:{type:"string"},minItems:1,uniqueItems:!0}},type:"object",properties:{id:{type:"string",format:"uri"},$schema:{type:"string",format:"uri"},title:{type:"string"},description:{type:"string"},default:{},multipleOf:{type:"number",minimum:0,exclusiveMinimum:!0},maximum:{type:"number"},exclusiveMaximum:{type:"boolean",default:!1},minimum:{type:"number"},exclusiveMinimum:{type:"boolean",default:!1},maxLength:{$ref:"#/definitions/positiveInteger"},minLength:{$ref:"#/definitions/positiveIntegerDefault0"},pattern:{type:"string",format:"regex"},additionalItems:{anyOf:[{type:"boolean"},{$ref:"#"}],default:{}},items:{anyOf:[{$ref:"#"},{$ref:"#/definitions/schemaArray"}],default:{}},maxItems:{$ref:"#/definitions/positiveInteger"},minItems:{$ref:"#/definitions/positiveIntegerDefault0"},uniqueItems:{type:"boolean",default:!1},maxProperties:{$ref:"#/definitions/positiveInteger"},minProperties:{$ref:"#/definitions/positiveIntegerDefault0"},required:{$ref:"#/definitions/stringArray"},additionalProperties:{anyOf:[{type:"boolean"},{$ref:"#"}],default:{}},definitions:{type:"object",additionalProperties:{$ref:"#"},default:{}},properties:{type:"object",additionalProperties:{$ref:"#"},default:{}},patternProperties:{type:"object",additionalProperties:{$ref:"#"},default:{}},dependencies:{type:"object",additionalProperties:{anyOf:[{$ref:"#"},{$ref:"#/definitions/stringArray"}]}},enum:{type:"array",minItems:1,uniqueItems:!0},type:{anyOf:[{$ref:"#/definitions/simpleTypes"},{type:"array",items:{$ref:"#/definitions/simpleTypes"},minItems:1,uniqueItems:!0}]},allOf:{$ref:"#/definitions/schemaArray"},anyOf:{$ref:"#/definitions/schemaArray"},oneOf:{$ref:"#/definitions/schemaArray"},not:{$ref:"#"}},dependencies:{exclusiveMaximum:["maximum"],exclusiveMinimum:["minimum"]},default:{}}});var Bv=m((Le,Vv)=>{"use strict";Object.defineProperty(Le,"__esModule",{value:!0});Le.CodeGen=Le.Name=Le.nil=Le.stringify=Le.str=Le._=Le.KeywordCxt=void 0;var Mq=vn(),xq=Mv(),jq=zf(),Uv=Fv(),Dq=["/properties"],la="http://json-schema.org/draft-04/schema",ua=class extends Mq.default{constructor(e={}){super({...e,schemaId:"id"})}_addVocabularies(){super._addVocabularies(),xq.default.forEach(e=>this.addVocabulary(e)),this.opts.discriminator&&this.addKeyword(jq.default)}_addDefaultMetaSchema(){if(super._addDefaultMetaSchema(),!this.opts.meta)return;let e=this.opts.$data?this.$dataMetaSchema(Uv,Dq):Uv;this.addMetaSchema(e,la,!1),this.refs["http://json-schema.org/schema"]=la}defaultMeta(){return this.opts.defaultMeta=super.defaultMeta()||(this.getSchema(la)?la:void 0)}};Vv.exports=Le=ua;Object.defineProperty(Le,"__esModule",{value:!0});Le.default=ua;var Fq=vn();Object.defineProperty(Le,"KeywordCxt",{enumerable:!0,get:function(){return Fq.KeywordCxt}});var bn=vn();Object.defineProperty(Le,"_",{enumerable:!0,get:function(){return bn._}});Object.defineProperty(Le,"str",{enumerable:!0,get:function(){return bn.str}});Object.defineProperty(Le,"stringify",{enumerable:!0,get:function(){return bn.stringify}});Object.defineProperty(Le,"nil",{enumerable:!0,get:function(){return bn.nil}});Object.defineProperty(Le,"Name",{enumerable:!0,get:function(){return bn.Name}});Object.defineProperty(Le,"CodeGen",{enumerable:!0,get:function(){return bn.CodeGen}})});var Xv=m(jt=>{"use strict";Object.defineProperty(jt,"__esModule",{value:!0});jt.formatNames=jt.fastFormats=jt.fullFormats=void 0;function xt(t,e){return{validate:t,compare:e}}jt.fullFormats={date:xt(Gv,Qf),time:xt(Yf(!0),Zf),"date-time":xt(Hv(!0),Jv),"iso-time":xt(Yf(),zv),"iso-date-time":xt(Hv(),Yv),duration:/^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/,uri:Kq,"uri-reference":/^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i,"uri-template":/^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i,url:/^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu,email:/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,hostname:/^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i,ipv4:/^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/,ipv6:/^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i,regex:Zq,uuid:/^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i,"json-pointer":/^(?:\/(?:[^~/]|~0|~1)*)*$/,"json-pointer-uri-fragment":/^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i,"relative-json-pointer":/^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/,byte:Gq,int32:{type:"number",validate:Yq},int64:{type:"number",validate:Xq},float:{type:"number",validate:Kv},double:{type:"number",validate:Kv},password:!0,binary:!0};jt.fastFormats={...jt.fullFormats,date:xt(/^\d\d\d\d-[0-1]\d-[0-3]\d$/,Qf),time:xt(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i,Zf),"date-time":xt(/^\d\d\d\d-[0-1]\d-[0-3]\dt(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i,Jv),"iso-time":xt(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i,zv),"iso-date-time":xt(/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i,Yv),uri:/^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i,"uri-reference":/^(?:(?:[a-z][a-z0-9+\-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,email:/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i};jt.formatNames=Object.keys(jt.fullFormats);function Uq(t){return t%4===0&&(t%100!==0||t%400===0)}var Vq=/^(\d\d\d\d)-(\d\d)-(\d\d)$/,Bq=[0,31,28,31,30,31,30,31,31,30,31,30,31];function Gv(t){let e=Vq.exec(t);if(!e)return!1;let r=+e[1],n=+e[2],s=+e[3];return n>=1&&n<=12&&s>=1&&s<=(n===2&&Uq(r)?29:Bq[n])}function Qf(t,e){if(t&&e)return t>e?1:t<e?-1:0}var Jf=/^(\d\d):(\d\d):(\d\d(?:\.\d+)?)(z|([+-])(\d\d)(?::?(\d\d))?)?$/i;function Yf(t){return function(r){let n=Jf.exec(r);if(!n)return!1;let s=+n[1],i=+n[2],o=+n[3],a=n[4],c=n[5]==="-"?-1:1,l=+(n[6]||0),u=+(n[7]||0);if(l>23||u>59||t&&!a)return!1;if(s<=23&&i<=59&&o<60)return!0;let f=i-u*c,d=s-l*c-(f<0?1:0);return(d===23||d===-1)&&(f===59||f===-1)&&o<61}}function Zf(t,e){if(!(t&&e))return;let r=new Date("2020-01-01T"+t).valueOf(),n=new Date("2020-01-01T"+e).valueOf();if(r&&n)return r-n}function zv(t,e){if(!(t&&e))return;let r=Jf.exec(t),n=Jf.exec(e);if(r&&n)return t=r[1]+r[2]+r[3],e=n[1]+n[2]+n[3],t>e?1:t<e?-1:0}var Xf=/t|\s/i;function Hv(t){let e=Yf(t);return function(n){let s=n.split(Xf);return s.length===2&&Gv(s[0])&&e(s[1])}}function Jv(t,e){if(!(t&&e))return;let r=new Date(t).valueOf(),n=new Date(e).valueOf();if(r&&n)return r-n}function Yv(t,e){if(!(t&&e))return;let[r,n]=t.split(Xf),[s,i]=e.split(Xf),o=Qf(r,s);if(o!==void 0)return o||Zf(n,i)}var Hq=/\/|:/,Wq=/^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;function Kq(t){return Hq.test(t)&&Wq.test(t)}var Wv=/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;function Gq(t){return Wv.lastIndex=0,Wv.test(t)}var zq=-(2**31),Jq=2**31-1;function Yq(t){return Number.isInteger(t)&&t<=Jq&&t>=zq}function Xq(t){return Number.isInteger(t)}function Kv(){return!0}var Qq=/[^\\]\\Z/;function Zq(t){if(Qq.test(t))return!1;try{return new RegExp(t),!0}catch{return!1}}});var Qv=m(ed=>{"use strict";Object.defineProperty(ed,"__esModule",{value:!0});var eM={keyword:"id",code(){throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID')}};ed.default=eM});var Zv=m(td=>{"use strict";Object.defineProperty(td,"__esModule",{value:!0});var tM=Qv(),rM=Hu(),nM=["$schema","$id","$defs","$vocabulary",{keyword:"$comment"},"definitions",tM.default,rM.default];td.default=nM});var e1=m(rd=>{"use strict";Object.defineProperty(rd,"__esModule",{value:!0});var fa=J(),gr=fa.operators,da={maximum:{okStr:"<=",ok:gr.LTE,fail:gr.GT},minimum:{okStr:">=",ok:gr.GTE,fail:gr.LT},exclusiveMaximum:{okStr:"<",ok:gr.LT,fail:gr.GTE},exclusiveMinimum:{okStr:">",ok:gr.GT,fail:gr.LTE}},sM={message:({keyword:t,schemaCode:e})=>(0,fa.str)`must be ${da[t].okStr} ${e}`,params:({keyword:t,schemaCode:e})=>(0,fa._)`{comparison: ${da[t].okStr}, limit: ${e}}`},iM={keyword:Object.keys(da),type:"number",schemaType:"number",$data:!0,error:sM,code(t){let{keyword:e,data:r,schemaCode:n}=t;t.fail$data((0,fa._)`${r} ${da[e].fail} ${n} || isNaN(${r})`)}};rd.default=iM});var t1=m(nd=>{"use strict";Object.defineProperty(nd,"__esModule",{value:!0});var oM=e1(),aM=Qu(),cM=tf(),lM=nf(),uM=of(),fM=cf(),dM=uf(),hM=pf(),pM=gf(),mM=Ef(),_M=[oM.default,aM.default,cM.default,lM.default,uM.default,fM.default,dM.default,hM.default,{keyword:"type",schemaType:["string","array"]},{keyword:"nullable",schemaType:"boolean"},pM.default,mM.default];nd.default=_M});var r1=m(In=>{"use strict";Object.defineProperty(In,"__esModule",{value:!0});In.contentVocabulary=In.metadataVocabulary=void 0;In.metadataVocabulary=["title","description","default","deprecated","readOnly","writeOnly","examples"];In.contentVocabulary=["contentMediaType","contentEncoding","contentSchema"]});var s1=m(sd=>{"use strict";Object.defineProperty(sd,"__esModule",{value:!0});var gM=Zv(),yM=t1(),EM=Uf(),vM=Hf(),n1=r1(),wM=[gM.default,yM.default,(0,EM.default)(),vM.default,n1.metadataVocabulary,n1.contentVocabulary];sd.default=wM});var i1=m((CV,SM)=>{SM.exports={$schema:"http://json-schema.org/draft-07/schema#",$id:"http://json-schema.org/draft-07/schema#",title:"Core schema meta-schema",definitions:{schemaArray:{type:"array",minItems:1,items:{$ref:"#"}},nonNegativeInteger:{type:"integer",minimum:0},nonNegativeIntegerDefault0:{allOf:[{$ref:"#/definitions/nonNegativeInteger"},{default:0}]},simpleTypes:{enum:["array","boolean","integer","null","number","object","string"]},stringArray:{type:"array",items:{type:"string"},uniqueItems:!0,default:[]}},type:["object","boolean"],properties:{$id:{type:"string",format:"uri-reference"},$schema:{type:"string",format:"uri"},$ref:{type:"string",format:"uri-reference"},$comment:{type:"string"},title:{type:"string"},description:{type:"string"},default:!0,readOnly:{type:"boolean",default:!1},examples:{type:"array",items:!0},multipleOf:{type:"number",exclusiveMinimum:0},maximum:{type:"number"},exclusiveMaximum:{type:"number"},minimum:{type:"number"},exclusiveMinimum:{type:"number"},maxLength:{$ref:"#/definitions/nonNegativeInteger"},minLength:{$ref:"#/definitions/nonNegativeIntegerDefault0"},pattern:{type:"string",format:"regex"},additionalItems:{$ref:"#"},items:{anyOf:[{$ref:"#"},{$ref:"#/definitions/schemaArray"}],default:!0},maxItems:{$ref:"#/definitions/nonNegativeInteger"},minItems:{$ref:"#/definitions/nonNegativeIntegerDefault0"},uniqueItems:{type:"boolean",default:!1},contains:{$ref:"#"},maxProperties:{$ref:"#/definitions/nonNegativeInteger"},minProperties:{$ref:"#/definitions/nonNegativeIntegerDefault0"},required:{$ref:"#/definitions/stringArray"},additionalProperties:{$ref:"#"},definitions:{type:"object",additionalProperties:{$ref:"#"},default:{}},properties:{type:"object",additionalProperties:{$ref:"#"},default:{}},patternProperties:{type:"object",additionalProperties:{$ref:"#"},propertyNames:{format:"regex"},default:{}},dependencies:{type:"object",additionalProperties:{anyOf:[{$ref:"#"},{$ref:"#/definitions/stringArray"}]}},propertyNames:{$ref:"#"},const:!0,enum:{type:"array",items:!0,minItems:1,uniqueItems:!0},type:{anyOf:[{$ref:"#/definitions/simpleTypes"},{type:"array",items:{$ref:"#/definitions/simpleTypes"},minItems:1,uniqueItems:!0}]},format:{type:"string"},contentMediaType:{type:"string"},contentEncoding:{type:"string"},if:{$ref:"#"},then:{$ref:"#"},else:{$ref:"#"},allOf:{$ref:"#/definitions/schemaArray"},anyOf:{$ref:"#/definitions/schemaArray"},oneOf:{$ref:"#/definitions/schemaArray"},not:{$ref:"#"}},default:!0}});var a1=m((ye,id)=>{"use strict";Object.defineProperty(ye,"__esModule",{value:!0});ye.MissingRefError=ye.ValidationError=ye.CodeGen=ye.Name=ye.nil=ye.stringify=ye.str=ye._=ye.KeywordCxt=ye.Ajv=void 0;var TM=vn(),bM=s1(),IM=zf(),o1=i1(),AM=["/properties"],ha="http://json-schema.org/draft-07/schema",An=class extends TM.default{_addVocabularies(){super._addVocabularies(),bM.default.forEach(e=>this.addVocabulary(e)),this.opts.discriminator&&this.addKeyword(IM.default)}_addDefaultMetaSchema(){if(super._addDefaultMetaSchema(),!this.opts.meta)return;let e=this.opts.$data?this.$dataMetaSchema(o1,AM):o1;this.addMetaSchema(e,ha,!1),this.refs["http://json-schema.org/schema"]=ha}defaultMeta(){return this.opts.defaultMeta=super.defaultMeta()||(this.getSchema(ha)?ha:void 0)}};ye.Ajv=An;id.exports=ye=An;id.exports.Ajv=An;Object.defineProperty(ye,"__esModule",{value:!0});ye.default=An;var $M=Is();Object.defineProperty(ye,"KeywordCxt",{enumerable:!0,get:function(){return $M.KeywordCxt}});var $n=J();Object.defineProperty(ye,"_",{enumerable:!0,get:function(){return $n._}});Object.defineProperty(ye,"str",{enumerable:!0,get:function(){return $n.str}});Object.defineProperty(ye,"stringify",{enumerable:!0,get:function(){return $n.stringify}});Object.defineProperty(ye,"nil",{enumerable:!0,get:function(){return $n.nil}});Object.defineProperty(ye,"Name",{enumerable:!0,get:function(){return $n.Name}});Object.defineProperty(ye,"CodeGen",{enumerable:!0,get:function(){return $n.CodeGen}});var LM=Ho();Object.defineProperty(ye,"ValidationError",{enumerable:!0,get:function(){return LM.default}});var NM=As();Object.defineProperty(ye,"MissingRefError",{enumerable:!0,get:function(){return NM.default}})});var c1=m(Ln=>{"use strict";Object.defineProperty(Ln,"__esModule",{value:!0});Ln.formatLimitDefinition=void 0;var OM=a1(),At=J(),yr=At.operators,pa={formatMaximum:{okStr:"<=",ok:yr.LTE,fail:yr.GT},formatMinimum:{okStr:">=",ok:yr.GTE,fail:yr.LT},formatExclusiveMaximum:{okStr:"<",ok:yr.LT,fail:yr.GTE},formatExclusiveMinimum:{okStr:">",ok:yr.GT,fail:yr.LTE}},PM={message:({keyword:t,schemaCode:e})=>(0,At.str)`should be ${pa[t].okStr} ${e}`,params:({keyword:t,schemaCode:e})=>(0,At._)`{comparison: ${pa[t].okStr}, limit: ${e}}`};Ln.formatLimitDefinition={keyword:Object.keys(pa),type:"string",schemaType:"string",$data:!0,error:PM,code(t){let{gen:e,data:r,schemaCode:n,keyword:s,it:i}=t,{opts:o,self:a}=i;if(!o.validateFormats)return;let c=new OM.KeywordCxt(i,a.RULES.all.format.definition,"format");c.$data?l():u();function l(){let d=e.scopeValue("formats",{ref:a.formats,code:o.code.formats}),h=e.const("fmt",(0,At._)`${d}[${c.schemaCode}]`);t.fail$data((0,At.or)((0,At._)`typeof ${h} != "object"`,(0,At._)`${h} instanceof RegExp`,(0,At._)`typeof ${h}.compare != "function"`,f(h)))}function u(){let d=c.schema,h=a.formats[d];if(!h||h===!0)return;if(typeof h!="object"||h instanceof RegExp||typeof h.compare!="function")throw new Error(`"${s}": format "${d}" does not define "compare" function`);let g=e.scopeValue("formats",{key:d,ref:h,code:o.code.formats?(0,At._)`${o.code.formats}${(0,At.getProperty)(d)}`:void 0});t.fail$data(f(g))}function f(d){return(0,At._)`${d}.compare(${r}, ${n}) ${pa[s].fail} 0`}},dependencies:["format"]};var RM=t=>(t.addKeyword(Ln.formatLimitDefinition),t);Ln.default=RM});var d1=m((Fs,f1)=>{"use strict";Object.defineProperty(Fs,"__esModule",{value:!0});var Nn=Xv(),CM=c1(),od=J(),l1=new od.Name("fullFormats"),kM=new od.Name("fastFormats"),ad=(t,e={keywords:!0})=>{if(Array.isArray(e))return u1(t,e,Nn.fullFormats,l1),t;let[r,n]=e.mode==="fast"?[Nn.fastFormats,kM]:[Nn.fullFormats,l1],s=e.formats||Nn.formatNames;return u1(t,s,r,n),e.keywords&&(0,CM.default)(t),t};ad.get=(t,e="full")=>{let n=(e==="fast"?Nn.fastFormats:Nn.fullFormats)[t];if(!n)throw new Error(`Unknown format "${t}"`);return n};function u1(t,e,r,n){var s,i;(s=(i=t.opts.code).formats)!==null&&s!==void 0||(i.formats=(0,od._)`require("ajv-formats/dist/formats").${n}`);for(let o of e)t.addFormat(o,r[o])}f1.exports=Fs=ad;Object.defineProperty(Fs,"__esModule",{value:!0});Fs.default=ad});var ie=m(xe=>{"use strict";var fd=Symbol.for("yaml.alias"),g1=Symbol.for("yaml.document"),ma=Symbol.for("yaml.map"),y1=Symbol.for("yaml.pair"),dd=Symbol.for("yaml.scalar"),_a=Symbol.for("yaml.seq"),Xt=Symbol.for("yaml.node.type"),xM=t=>!!t&&typeof t=="object"&&t[Xt]===fd,jM=t=>!!t&&typeof t=="object"&&t[Xt]===g1,DM=t=>!!t&&typeof t=="object"&&t[Xt]===ma,FM=t=>!!t&&typeof t=="object"&&t[Xt]===y1,E1=t=>!!t&&typeof t=="object"&&t[Xt]===dd,UM=t=>!!t&&typeof t=="object"&&t[Xt]===_a;function v1(t){if(t&&typeof t=="object")switch(t[Xt]){case ma:case _a:return!0}return!1}function VM(t){if(t&&typeof t=="object")switch(t[Xt]){case fd:case ma:case dd:case _a:return!0}return!1}var BM=t=>(E1(t)||v1(t))&&!!t.anchor;xe.ALIAS=fd;xe.DOC=g1;xe.MAP=ma;xe.NODE_TYPE=Xt;xe.PAIR=y1;xe.SCALAR=dd;xe.SEQ=_a;xe.hasAnchor=BM;xe.isAlias=xM;xe.isCollection=v1;xe.isDocument=jM;xe.isMap=DM;xe.isNode=VM;xe.isPair=FM;xe.isScalar=E1;xe.isSeq=UM});var Us=m(hd=>{"use strict";var Ne=ie(),it=Symbol("break visit"),w1=Symbol("skip children"),Dt=Symbol("remove node");function ga(t,e){let r=S1(e);Ne.isDocument(t)?On(null,t.contents,r,Object.freeze([t]))===Dt&&(t.contents=null):On(null,t,r,Object.freeze([]))}ga.BREAK=it;ga.SKIP=w1;ga.REMOVE=Dt;function On(t,e,r,n){let s=T1(t,e,r,n);if(Ne.isNode(s)||Ne.isPair(s))return b1(t,n,s),On(t,s,r,n);if(typeof s!="symbol"){if(Ne.isCollection(e)){n=Object.freeze(n.concat(e));for(let i=0;i<e.items.length;++i){let o=On(i,e.items[i],r,n);if(typeof o=="number")i=o-1;else{if(o===it)return it;o===Dt&&(e.items.splice(i,1),i-=1)}}}else if(Ne.isPair(e)){n=Object.freeze(n.concat(e));let i=On("key",e.key,r,n);if(i===it)return it;i===Dt&&(e.key=null);let o=On("value",e.value,r,n);if(o===it)return it;o===Dt&&(e.value=null)}}return s}async function ya(t,e){let r=S1(e);Ne.isDocument(t)?await Pn(null,t.contents,r,Object.freeze([t]))===Dt&&(t.contents=null):await Pn(null,t,r,Object.freeze([]))}ya.BREAK=it;ya.SKIP=w1;ya.REMOVE=Dt;async function Pn(t,e,r,n){let s=await T1(t,e,r,n);if(Ne.isNode(s)||Ne.isPair(s))return b1(t,n,s),Pn(t,s,r,n);if(typeof s!="symbol"){if(Ne.isCollection(e)){n=Object.freeze(n.concat(e));for(let i=0;i<e.items.length;++i){let o=await Pn(i,e.items[i],r,n);if(typeof o=="number")i=o-1;else{if(o===it)return it;o===Dt&&(e.items.splice(i,1),i-=1)}}}else if(Ne.isPair(e)){n=Object.freeze(n.concat(e));let i=await Pn("key",e.key,r,n);if(i===it)return it;i===Dt&&(e.key=null);let o=await Pn("value",e.value,r,n);if(o===it)return it;o===Dt&&(e.value=null)}}return s}function S1(t){return typeof t=="object"&&(t.Collection||t.Node||t.Value)?Object.assign({Alias:t.Node,Map:t.Node,Scalar:t.Node,Seq:t.Node},t.Value&&{Map:t.Value,Scalar:t.Value,Seq:t.Value},t.Collection&&{Map:t.Collection,Seq:t.Collection},t):t}function T1(t,e,r,n){if(typeof r=="function")return r(t,e,n);if(Ne.isMap(e))return r.Map?.(t,e,n);if(Ne.isSeq(e))return r.Seq?.(t,e,n);if(Ne.isPair(e))return r.Pair?.(t,e,n);if(Ne.isScalar(e))return r.Scalar?.(t,e,n);if(Ne.isAlias(e))return r.Alias?.(t,e,n)}function b1(t,e,r){let n=e[e.length-1];if(Ne.isCollection(n))n.items[t]=r;else if(Ne.isPair(n))t==="key"?n.key=r:n.value=r;else if(Ne.isDocument(n))n.contents=r;else{let s=Ne.isAlias(n)?"alias":"scalar";throw new Error(`Cannot replace node with ${s} parent`)}}hd.visit=ga;hd.visitAsync=ya});var pd=m(A1=>{"use strict";var I1=ie(),HM=Us(),WM={"!":"%21",",":"%2C","[":"%5B","]":"%5D","{":"%7B","}":"%7D"},KM=t=>t.replace(/[!,[\]{}]/g,e=>WM[e]),Vs=class t{constructor(e,r){this.docStart=null,this.docEnd=!1,this.yaml=Object.assign({},t.defaultYaml,e),this.tags=Object.assign({},t.defaultTags,r)}clone(){let e=new t(this.yaml,this.tags);return e.docStart=this.docStart,e}atDocument(){let e=new t(this.yaml,this.tags);switch(this.yaml.version){case"1.1":this.atNextDocument=!0;break;case"1.2":this.atNextDocument=!1,this.yaml={explicit:t.defaultYaml.explicit,version:"1.2"},this.tags=Object.assign({},t.defaultTags);break}return e}add(e,r){this.atNextDocument&&(this.yaml={explicit:t.defaultYaml.explicit,version:"1.1"},this.tags=Object.assign({},t.defaultTags),this.atNextDocument=!1);let n=e.trim().split(/[ \t]+/),s=n.shift();switch(s){case"%TAG":{if(n.length!==2&&(r(0,"%TAG directive should contain exactly two parts"),n.length<2))return!1;let[i,o]=n;return this.tags[i]=o,!0}case"%YAML":{if(this.yaml.explicit=!0,n.length!==1)return r(0,"%YAML directive should contain exactly one part"),!1;let[i]=n;if(i==="1.1"||i==="1.2")return this.yaml.version=i,!0;{let o=/^\d+\.\d+$/.test(i);return r(6,`Unsupported YAML version ${i}`,o),!1}}default:return r(0,`Unknown directive ${s}`,!0),!1}}tagName(e,r){if(e==="!")return"!";if(e[0]!=="!")return r(`Not a valid tag: ${e}`),null;if(e[1]==="<"){let o=e.slice(2,-1);return o==="!"||o==="!!"?(r(`Verbatim tags aren't resolved, so ${e} is invalid.`),null):(e[e.length-1]!==">"&&r("Verbatim tags must end with a >"),o)}let[,n,s]=e.match(/^(.*!)([^!]*)$/s);s||r(`The ${e} tag has no suffix`);let i=this.tags[n];if(i)try{return i+decodeURIComponent(s)}catch(o){return r(String(o)),null}return n==="!"?e:(r(`Could not resolve tag: ${e}`),null)}tagString(e){for(let[r,n]of Object.entries(this.tags))if(e.startsWith(n))return r+KM(e.substring(n.length));return e[0]==="!"?e:`!<${e}>`}toString(e){let r=this.yaml.explicit?[`%YAML ${this.yaml.version||"1.2"}`]:[],n=Object.entries(this.tags),s;if(e&&n.length>0&&I1.isNode(e.contents)){let i={};HM.visit(e.contents,(o,a)=>{I1.isNode(a)&&a.tag&&(i[a.tag]=!0)}),s=Object.keys(i)}else s=[];for(let[i,o]of n)i==="!!"&&o==="tag:yaml.org,2002:"||(!e||s.some(a=>a.startsWith(o)))&&r.push(`%TAG ${i} ${o}`);return r.join(`
`)}};Vs.defaultYaml={explicit:!1,version:"1.2"};Vs.defaultTags={"!!":"tag:yaml.org,2002:"};A1.Directives=Vs});var Ea=m(Bs=>{"use strict";var $1=ie(),GM=Us();function zM(t){if(/[\x00-\x19\s,[\]{}]/.test(t)){let r=`Anchor must not contain whitespace or control characters: ${JSON.stringify(t)}`;throw new Error(r)}return!0}function L1(t){let e=new Set;return GM.visit(t,{Value(r,n){n.anchor&&e.add(n.anchor)}}),e}function N1(t,e){for(let r=1;;++r){let n=`${t}${r}`;if(!e.has(n))return n}}function JM(t,e){let r=[],n=new Map,s=null;return{onAnchor:i=>{r.push(i),s??(s=L1(t));let o=N1(e,s);return s.add(o),o},setAnchors:()=>{for(let i of r){let o=n.get(i);if(typeof o=="object"&&o.anchor&&($1.isScalar(o.node)||$1.isCollection(o.node)))o.node.anchor=o.anchor;else{let a=new Error("Failed to resolve repeated object (this should not happen)");throw a.source=i,a}}},sourceObjects:n}}Bs.anchorIsValid=zM;Bs.anchorNames=L1;Bs.createNodeAnchors=JM;Bs.findNewAnchor=N1});var md=m(O1=>{"use strict";function Hs(t,e,r,n){if(n&&typeof n=="object")if(Array.isArray(n))for(let s=0,i=n.length;s<i;++s){let o=n[s],a=Hs(t,n,String(s),o);a===void 0?delete n[s]:a!==o&&(n[s]=a)}else if(n instanceof Map)for(let s of Array.from(n.keys())){let i=n.get(s),o=Hs(t,n,s,i);o===void 0?n.delete(s):o!==i&&n.set(s,o)}else if(n instanceof Set)for(let s of Array.from(n)){let i=Hs(t,n,s,s);i===void 0?n.delete(s):i!==s&&(n.delete(s),n.add(i))}else for(let[s,i]of Object.entries(n)){let o=Hs(t,n,s,i);o===void 0?delete n[s]:o!==i&&(n[s]=o)}return t.call(e,r,n)}O1.applyReviver=Hs});var Er=m(R1=>{"use strict";var YM=ie();function P1(t,e,r){if(Array.isArray(t))return t.map((n,s)=>P1(n,String(s),r));if(t&&typeof t.toJSON=="function"){if(!r||!YM.hasAnchor(t))return t.toJSON(e,r);let n={aliasCount:0,count:1,res:void 0};r.anchors.set(t,n),r.onCreate=i=>{n.res=i,delete r.onCreate};let s=t.toJSON(e,r);return r.onCreate&&r.onCreate(s),s}return typeof t=="bigint"&&!r?.keep?Number(t):t}R1.toJS=P1});var va=m(k1=>{"use strict";var XM=md(),C1=ie(),QM=Er(),_d=class{constructor(e){Object.defineProperty(this,C1.NODE_TYPE,{value:e})}clone(){let e=Object.create(Object.getPrototypeOf(this),Object.getOwnPropertyDescriptors(this));return this.range&&(e.range=this.range.slice()),e}toJS(e,{mapAsMap:r,maxAliasCount:n,onAnchor:s,reviver:i}={}){if(!C1.isDocument(e))throw new TypeError("A document argument is required");let o={anchors:new Map,doc:e,keep:!0,mapAsMap:r===!0,mapKeyWarned:!1,maxAliasCount:typeof n=="number"?n:100},a=QM.toJS(this,"",o);if(typeof s=="function")for(let{count:c,res:l}of o.anchors.values())s(l,c);return typeof i=="function"?XM.applyReviver(i,{"":a},"",a):a}};k1.NodeBase=_d});var Ws=m(q1=>{"use strict";var ZM=Ea(),ex=Us(),Rn=ie(),tx=va(),rx=Er(),gd=class extends tx.NodeBase{constructor(e){super(Rn.ALIAS),this.source=e,Object.defineProperty(this,"tag",{set(){throw new Error("Alias nodes cannot have tags")}})}resolve(e,r){let n;r?.aliasResolveCache?n=r.aliasResolveCache:(n=[],ex.visit(e,{Node:(i,o)=>{(Rn.isAlias(o)||Rn.hasAnchor(o))&&n.push(o)}}),r&&(r.aliasResolveCache=n));let s;for(let i of n){if(i===this)break;i.anchor===this.source&&(s=i)}return s}toJSON(e,r){if(!r)return{source:this.source};let{anchors:n,doc:s,maxAliasCount:i}=r,o=this.resolve(s,r);if(!o){let c=`Unresolved alias (the anchor must be set before the alias): ${this.source}`;throw new ReferenceError(c)}let a=n.get(o);if(a||(rx.toJS(o,null,r),a=n.get(o)),a?.res===void 0){let c="This should not happen: Alias anchor was not resolved?";throw new ReferenceError(c)}if(i>=0&&(a.count+=1,a.aliasCount===0&&(a.aliasCount=wa(s,o,n)),a.count*a.aliasCount>i)){let c="Excessive alias count indicates a resource exhaustion attack";throw new ReferenceError(c)}return a.res}toString(e,r,n){let s=`*${this.source}`;if(e){if(ZM.anchorIsValid(this.source),e.options.verifyAliasOrder&&!e.anchors.has(this.source)){let i=`Unresolved alias (the anchor must be set before the alias): ${this.source}`;throw new Error(i)}if(e.implicitKey)return`${s} `}return s}};function wa(t,e,r){if(Rn.isAlias(e)){let n=e.resolve(t),s=r&&n&&r.get(n);return s?s.count*s.aliasCount:0}else if(Rn.isCollection(e)){let n=0;for(let s of e.items){let i=wa(t,s,r);i>n&&(n=i)}return n}else if(Rn.isPair(e)){let n=wa(t,e.key,r),s=wa(t,e.value,r);return Math.max(n,s)}return 1}q1.Alias=gd});var be=m(yd=>{"use strict";var nx=ie(),sx=va(),ix=Er(),ox=t=>!t||typeof t!="function"&&typeof t!="object",vr=class extends sx.NodeBase{constructor(e){super(nx.SCALAR),this.value=e}toJSON(e,r){return r?.keep?this.value:ix.toJS(this.value,e,r)}toString(){return String(this.value)}};vr.BLOCK_FOLDED="BLOCK_FOLDED";vr.BLOCK_LITERAL="BLOCK_LITERAL";vr.PLAIN="PLAIN";vr.QUOTE_DOUBLE="QUOTE_DOUBLE";vr.QUOTE_SINGLE="QUOTE_SINGLE";yd.Scalar=vr;yd.isScalarValue=ox});var Ks=m(x1=>{"use strict";var ax=Ws(),Wr=ie(),M1=be(),cx="tag:yaml.org,2002:";function lx(t,e,r){if(e){let n=r.filter(i=>i.tag===e),s=n.find(i=>!i.format)??n[0];if(!s)throw new Error(`Tag ${e} not found`);return s}return r.find(n=>n.identify?.(t)&&!n.format)}function ux(t,e,r){if(Wr.isDocument(t)&&(t=t.contents),Wr.isNode(t))return t;if(Wr.isPair(t)){let f=r.schema[Wr.MAP].createNode?.(r.schema,null,r);return f.items.push(t),f}(t instanceof String||t instanceof Number||t instanceof Boolean||typeof BigInt<"u"&&t instanceof BigInt)&&(t=t.valueOf());let{aliasDuplicateObjects:n,onAnchor:s,onTagObj:i,schema:o,sourceObjects:a}=r,c;if(n&&t&&typeof t=="object"){if(c=a.get(t),c)return c.anchor??(c.anchor=s(t)),new ax.Alias(c.anchor);c={anchor:null,node:null},a.set(t,c)}e?.startsWith("!!")&&(e=cx+e.slice(2));let l=lx(t,e,o.tags);if(!l){if(t&&typeof t.toJSON=="function"&&(t=t.toJSON()),!t||typeof t!="object"){let f=new M1.Scalar(t);return c&&(c.node=f),f}l=t instanceof Map?o[Wr.MAP]:Symbol.iterator in Object(t)?o[Wr.SEQ]:o[Wr.MAP]}i&&(i(l),delete r.onTagObj);let u=l?.createNode?l.createNode(r.schema,t,r):typeof l?.nodeClass?.from=="function"?l.nodeClass.from(r.schema,t,r):new M1.Scalar(t);return e?u.tag=e:l.default||(u.tag=l.tag),c&&(c.node=u),u}x1.createNode=ux});var Ta=m(Sa=>{"use strict";var fx=Ks(),Ft=ie(),dx=va();function Ed(t,e,r){let n=r;for(let s=e.length-1;s>=0;--s){let i=e[s];if(typeof i=="number"&&Number.isInteger(i)&&i>=0){let o=[];o[i]=n,n=o}else n=new Map([[i,n]])}return fx.createNode(n,void 0,{aliasDuplicateObjects:!1,keepUndefined:!1,onAnchor:()=>{throw new Error("This should not happen, please report a bug.")},schema:t,sourceObjects:new Map})}var j1=t=>t==null||typeof t=="object"&&!!t[Symbol.iterator]().next().done,vd=class extends dx.NodeBase{constructor(e,r){super(e),Object.defineProperty(this,"schema",{value:r,configurable:!0,enumerable:!1,writable:!0})}clone(e){let r=Object.create(Object.getPrototypeOf(this),Object.getOwnPropertyDescriptors(this));return e&&(r.schema=e),r.items=r.items.map(n=>Ft.isNode(n)||Ft.isPair(n)?n.clone(e):n),this.range&&(r.range=this.range.slice()),r}addIn(e,r){if(j1(e))this.add(r);else{let[n,...s]=e,i=this.get(n,!0);if(Ft.isCollection(i))i.addIn(s,r);else if(i===void 0&&this.schema)this.set(n,Ed(this.schema,s,r));else throw new Error(`Expected YAML collection at ${n}. Remaining path: ${s}`)}}deleteIn(e){let[r,...n]=e;if(n.length===0)return this.delete(r);let s=this.get(r,!0);if(Ft.isCollection(s))return s.deleteIn(n);throw new Error(`Expected YAML collection at ${r}. Remaining path: ${n}`)}getIn(e,r){let[n,...s]=e,i=this.get(n,!0);return s.length===0?!r&&Ft.isScalar(i)?i.value:i:Ft.isCollection(i)?i.getIn(s,r):void 0}hasAllNullValues(e){return this.items.every(r=>{if(!Ft.isPair(r))return!1;let n=r.value;return n==null||e&&Ft.isScalar(n)&&n.value==null&&!n.commentBefore&&!n.comment&&!n.tag})}hasIn(e){let[r,...n]=e;if(n.length===0)return this.has(r);let s=this.get(r,!0);return Ft.isCollection(s)?s.hasIn(n):!1}setIn(e,r){let[n,...s]=e;if(s.length===0)this.set(n,r);else{let i=this.get(n,!0);if(Ft.isCollection(i))i.setIn(s,r);else if(i===void 0&&this.schema)this.set(n,Ed(this.schema,s,r));else throw new Error(`Expected YAML collection at ${n}. Remaining path: ${s}`)}}};Sa.Collection=vd;Sa.collectionFromPath=Ed;Sa.isEmptyPath=j1});var Gs=m(ba=>{"use strict";var hx=t=>t.replace(/^(?!$)(?: $)?/gm,"#");function wd(t,e){return/^\n+$/.test(t)?t.substring(1):e?t.replace(/^(?! *$)/gm,e):t}var px=(t,e,r)=>t.endsWith(`
`)?wd(r,e):r.includes(`
`)?`
`+wd(r,e):(t.endsWith(" ")?"":" ")+r;ba.indentComment=wd;ba.lineComment=px;ba.stringifyComment=hx});var F1=m(zs=>{"use strict";var mx="flow",Sd="block",Ia="quoted";function _x(t,e,r="flow",{indentAtStart:n,lineWidth:s=80,minContentWidth:i=20,onFold:o,onOverflow:a}={}){if(!s||s<0)return t;s<i&&(i=0);let c=Math.max(1+i,1+s-e.length);if(t.length<=c)return t;let l=[],u={},f=s-e.length;typeof n=="number"&&(n>s-Math.max(2,i)?l.push(0):f=s-n);let d,h,g=!1,p=-1,_=-1,y=-1;r===Sd&&(p=D1(t,p,e.length),p!==-1&&(f=p+c));for(let b;b=t[p+=1];){if(r===Ia&&b==="\\"){switch(_=p,t[p+1]){case"x":p+=3;break;case"u":p+=5;break;case"U":p+=9;break;default:p+=1}y=p}if(b===`
`)r===Sd&&(p=D1(t,p,e.length)),f=p+e.length+c,d=void 0;else{if(b===" "&&h&&h!==" "&&h!==`
`&&h!=="	"){let I=t[p+1];I&&I!==" "&&I!==`
`&&I!=="	"&&(d=p)}if(p>=f)if(d)l.push(d),f=d+c,d=void 0;else if(r===Ia){for(;h===" "||h==="	";)h=b,b=t[p+=1],g=!0;let I=p>y+1?p-2:_-1;if(u[I])return t;l.push(I),u[I]=!0,f=I+c,d=void 0}else g=!0}h=b}if(g&&a&&a(),l.length===0)return t;o&&o();let w=t.slice(0,l[0]);for(let b=0;b<l.length;++b){let I=l[b],A=l[b+1]||t.length;I===0?w=`
${e}${t.slice(0,A)}`:(r===Ia&&u[I]&&(w+=`${t[I]}\\`),w+=`
${e}${t.slice(I+1,A)}`)}return w}function D1(t,e,r){let n=e,s=e+1,i=t[s];for(;i===" "||i==="	";)if(e<s+r)i=t[++e];else{do i=t[++e];while(i&&i!==`
`);n=e,s=e+1,i=t[s]}return n}zs.FOLD_BLOCK=Sd;zs.FOLD_FLOW=mx;zs.FOLD_QUOTED=Ia;zs.foldFlowLines=_x});var Ys=m(U1=>{"use strict";var $t=be(),wr=F1(),$a=(t,e)=>({indentAtStart:e?t.indent.length:t.indentAtStart,lineWidth:t.options.lineWidth,minContentWidth:t.options.minContentWidth}),La=t=>/^(%|---|\.\.\.)/m.test(t);function gx(t,e,r){if(!e||e<0)return!1;let n=e-r,s=t.length;if(s<=n)return!1;for(let i=0,o=0;i<s;++i)if(t[i]===`
`){if(i-o>n)return!0;if(o=i+1,s-o<=n)return!1}return!0}function Js(t,e){let r=JSON.stringify(t);if(e.options.doubleQuotedAsJSON)return r;let{implicitKey:n}=e,s=e.options.doubleQuotedMinMultiLineLength,i=e.indent||(La(t)?"  ":""),o="",a=0;for(let c=0,l=r[c];l;l=r[++c])if(l===" "&&r[c+1]==="\\"&&r[c+2]==="n"&&(o+=r.slice(a,c)+"\\ ",c+=1,a=c,l="\\"),l==="\\")switch(r[c+1]){case"u":{o+=r.slice(a,c);let u=r.substr(c+2,4);switch(u){case"0000":o+="\\0";break;case"0007":o+="\\a";break;case"000b":o+="\\v";break;case"001b":o+="\\e";break;case"0085":o+="\\N";break;case"00a0":o+="\\_";break;case"2028":o+="\\L";break;case"2029":o+="\\P";break;default:u.substr(0,2)==="00"?o+="\\x"+u.substr(2):o+=r.substr(c,6)}c+=5,a=c+1}break;case"n":if(n||r[c+2]==='"'||r.length<s)c+=1;else{for(o+=r.slice(a,c)+`

`;r[c+2]==="\\"&&r[c+3]==="n"&&r[c+4]!=='"';)o+=`
`,c+=2;o+=i,r[c+2]===" "&&(o+="\\"),c+=1,a=c+1}break;default:c+=1}return o=a?o+r.slice(a):r,n?o:wr.foldFlowLines(o,i,wr.FOLD_QUOTED,$a(e,!1))}function Td(t,e){if(e.options.singleQuote===!1||e.implicitKey&&t.includes(`
`)||/[ \t]\n|\n[ \t]/.test(t))return Js(t,e);let r=e.indent||(La(t)?"  ":""),n="'"+t.replace(/'/g,"''").replace(/\n+/g,`$&
${r}`)+"'";return e.implicitKey?n:wr.foldFlowLines(n,r,wr.FOLD_FLOW,$a(e,!1))}function Cn(t,e){let{singleQuote:r}=e.options,n;if(r===!1)n=Js;else{let s=t.includes('"'),i=t.includes("'");s&&!i?n=Td:i&&!s?n=Js:n=r?Td:Js}return n(t,e)}var bd;try{bd=new RegExp(`(^|(?<!
))
+(?!
|$)`,"g")}catch{bd=/\n+(?!\n|$)/g}function Aa({comment:t,type:e,value:r},n,s,i){let{blockQuote:o,commentString:a,lineWidth:c}=n.options;if(!o||/\n[\t ]+$/.test(r))return Cn(r,n);let l=n.indent||(n.forceBlockIndent||La(r)?"  ":""),u=o==="literal"?!0:o==="folded"||e===$t.Scalar.BLOCK_FOLDED?!1:e===$t.Scalar.BLOCK_LITERAL?!0:!gx(r,c,l.length);if(!r)return u?`|
`:`>
`;let f,d;for(d=r.length;d>0;--d){let A=r[d-1];if(A!==`
`&&A!=="	"&&A!==" ")break}let h=r.substring(d),g=h.indexOf(`
`);g===-1?f="-":r===h||g!==h.length-1?(f="+",i&&i()):f="",h&&(r=r.slice(0,-h.length),h[h.length-1]===`
`&&(h=h.slice(0,-1)),h=h.replace(bd,`$&${l}`));let p=!1,_,y=-1;for(_=0;_<r.length;++_){let A=r[_];if(A===" ")p=!0;else if(A===`
`)y=_;else break}let w=r.substring(0,y<_?y+1:_);w&&(r=r.substring(w.length),w=w.replace(/\n+/g,`$&${l}`));let I=(p?l?"2":"1":"")+f;if(t&&(I+=" "+a(t.replace(/ ?[\r\n]+/g," ")),s&&s()),!u){let A=r.replace(/\n+/g,`
$&`).replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g,"$1$2").replace(/\n+/g,`$&${l}`),C=!1,B=$a(n,!0);o!=="folded"&&e!==$t.Scalar.BLOCK_FOLDED&&(B.onOverflow=()=>{C=!0});let P=wr.foldFlowLines(`${w}${A}${h}`,l,wr.FOLD_BLOCK,B);if(!C)return`>${I}
${l}${P}`}return r=r.replace(/\n+/g,`$&${l}`),`|${I}
${l}${w}${r}${h}`}function yx(t,e,r,n){let{type:s,value:i}=t,{actualString:o,implicitKey:a,indent:c,indentStep:l,inFlow:u}=e;if(a&&i.includes(`
`)||u&&/[[\]{},]/.test(i))return Cn(i,e);if(/^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(i))return a||u||!i.includes(`
`)?Cn(i,e):Aa(t,e,r,n);if(!a&&!u&&s!==$t.Scalar.PLAIN&&i.includes(`
`))return Aa(t,e,r,n);if(La(i)){if(c==="")return e.forceBlockIndent=!0,Aa(t,e,r,n);if(a&&c===l)return Cn(i,e)}let f=i.replace(/\n+/g,`$&
${c}`);if(o){let d=p=>p.default&&p.tag!=="tag:yaml.org,2002:str"&&p.test?.test(f),{compat:h,tags:g}=e.doc.schema;if(g.some(d)||h?.some(d))return Cn(i,e)}return a?f:wr.foldFlowLines(f,c,wr.FOLD_FLOW,$a(e,!1))}function Ex(t,e,r,n){let{implicitKey:s,inFlow:i}=e,o=typeof t.value=="string"?t:Object.assign({},t,{value:String(t.value)}),{type:a}=t;a!==$t.Scalar.QUOTE_DOUBLE&&/[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(o.value)&&(a=$t.Scalar.QUOTE_DOUBLE);let c=u=>{switch(u){case $t.Scalar.BLOCK_FOLDED:case $t.Scalar.BLOCK_LITERAL:return s||i?Cn(o.value,e):Aa(o,e,r,n);case $t.Scalar.QUOTE_DOUBLE:return Js(o.value,e);case $t.Scalar.QUOTE_SINGLE:return Td(o.value,e);case $t.Scalar.PLAIN:return yx(o,e,r,n);default:return null}},l=c(a);if(l===null){let{defaultKeyType:u,defaultStringType:f}=e.options,d=s&&u||f;if(l=c(d),l===null)throw new Error(`Unsupported default string type ${d}`)}return l}U1.stringifyString=Ex});var Xs=m(Id=>{"use strict";var vx=Ea(),Sr=ie(),wx=Gs(),Sx=Ys();function Tx(t,e){let r=Object.assign({blockQuote:!0,commentString:wx.stringifyComment,defaultKeyType:null,defaultStringType:"PLAIN",directives:null,doubleQuotedAsJSON:!1,doubleQuotedMinMultiLineLength:40,falseStr:"false",flowCollectionPadding:!0,indentSeq:!0,lineWidth:80,minContentWidth:20,nullStr:"null",simpleKeys:!1,singleQuote:null,trueStr:"true",verifyAliasOrder:!0},t.schema.toStringOptions,e),n;switch(r.collectionStyle){case"block":n=!1;break;case"flow":n=!0;break;default:n=null}return{anchors:new Set,doc:t,flowCollectionPadding:r.flowCollectionPadding?" ":"",indent:"",indentStep:typeof r.indent=="number"?" ".repeat(r.indent):"  ",inFlow:n,options:r}}function bx(t,e){if(e.tag){let s=t.filter(i=>i.tag===e.tag);if(s.length>0)return s.find(i=>i.format===e.format)??s[0]}let r,n;if(Sr.isScalar(e)){n=e.value;let s=t.filter(i=>i.identify?.(n));if(s.length>1){let i=s.filter(o=>o.test);i.length>0&&(s=i)}r=s.find(i=>i.format===e.format)??s.find(i=>!i.format)}else n=e,r=t.find(s=>s.nodeClass&&n instanceof s.nodeClass);if(!r){let s=n?.constructor?.name??(n===null?"null":typeof n);throw new Error(`Tag not resolved for ${s} value`)}return r}function Ix(t,e,{anchors:r,doc:n}){if(!n.directives)return"";let s=[],i=(Sr.isScalar(t)||Sr.isCollection(t))&&t.anchor;i&&vx.anchorIsValid(i)&&(r.add(i),s.push(`&${i}`));let o=t.tag??(e.default?null:e.tag);return o&&s.push(n.directives.tagString(o)),s.join(" ")}function Ax(t,e,r,n){if(Sr.isPair(t))return t.toString(e,r,n);if(Sr.isAlias(t)){if(e.doc.directives)return t.toString(e);if(e.resolvedAliases?.has(t))throw new TypeError("Cannot stringify circular structure without alias nodes");e.resolvedAliases?e.resolvedAliases.add(t):e.resolvedAliases=new Set([t]),t=t.resolve(e.doc)}let s,i=Sr.isNode(t)?t:e.doc.createNode(t,{onTagObj:c=>s=c});s??(s=bx(e.doc.schema.tags,i));let o=Ix(i,s,e);o.length>0&&(e.indentAtStart=(e.indentAtStart??0)+o.length+1);let a=typeof s.stringify=="function"?s.stringify(i,e,r,n):Sr.isScalar(i)?Sx.stringifyString(i,e,r,n):i.toString(e,r,n);return o?Sr.isScalar(i)||a[0]==="{"||a[0]==="["?`${o} ${a}`:`${o}
${e.indent}${a}`:a}Id.createStringifyContext=Tx;Id.stringify=Ax});var W1=m(H1=>{"use strict";var Qt=ie(),V1=be(),B1=Xs(),Qs=Gs();function $x({key:t,value:e},r,n,s){let{allNullValues:i,doc:o,indent:a,indentStep:c,options:{commentString:l,indentSeq:u,simpleKeys:f}}=r,d=Qt.isNode(t)&&t.comment||null;if(f){if(d)throw new Error("With simple keys, key nodes cannot have comments");if(Qt.isCollection(t)||!Qt.isNode(t)&&typeof t=="object"){let B="With simple keys, collection cannot be used as a key value";throw new Error(B)}}let h=!f&&(!t||d&&e==null&&!r.inFlow||Qt.isCollection(t)||(Qt.isScalar(t)?t.type===V1.Scalar.BLOCK_FOLDED||t.type===V1.Scalar.BLOCK_LITERAL:typeof t=="object"));r=Object.assign({},r,{allNullValues:!1,implicitKey:!h&&(f||!i),indent:a+c});let g=!1,p=!1,_=B1.stringify(t,r,()=>g=!0,()=>p=!0);if(!h&&!r.inFlow&&_.length>1024){if(f)throw new Error("With simple keys, single line scalar must not span more than 1024 characters");h=!0}if(r.inFlow){if(i||e==null)return g&&n&&n(),_===""?"?":h?`? ${_}`:_}else if(i&&!f||e==null&&h)return _=`? ${_}`,d&&!g?_+=Qs.lineComment(_,r.indent,l(d)):p&&s&&s(),_;g&&(d=null),h?(d&&(_+=Qs.lineComment(_,r.indent,l(d))),_=`? ${_}
${a}:`):(_=`${_}:`,d&&(_+=Qs.lineComment(_,r.indent,l(d))));let y,w,b;Qt.isNode(e)?(y=!!e.spaceBefore,w=e.commentBefore,b=e.comment):(y=!1,w=null,b=null,e&&typeof e=="object"&&(e=o.createNode(e))),r.implicitKey=!1,!h&&!d&&Qt.isScalar(e)&&(r.indentAtStart=_.length+1),p=!1,!u&&c.length>=2&&!r.inFlow&&!h&&Qt.isSeq(e)&&!e.flow&&!e.tag&&!e.anchor&&(r.indent=r.indent.substring(2));let I=!1,A=B1.stringify(e,r,()=>I=!0,()=>p=!0),C=" ";if(d||y||w){if(C=y?`
`:"",w){let B=l(w);C+=`
${Qs.indentComment(B,r.indent)}`}A===""&&!r.inFlow?C===`
`&&b&&(C=`

`):C+=`
${r.indent}`}else if(!h&&Qt.isCollection(e)){let B=A[0],P=A.indexOf(`
`),N=P!==-1,D=r.inFlow??e.flow??e.items.length===0;if(N||!D){let V=!1;if(N&&(B==="&"||B==="!")){let F=A.indexOf(" ");B==="&"&&F!==-1&&F<P&&A[F+1]==="!"&&(F=A.indexOf(" ",F+1)),(F===-1||P<F)&&(V=!0)}V||(C=`
${r.indent}`)}}else(A===""||A[0]===`
`)&&(C="");return _+=C+A,r.inFlow?I&&n&&n():b&&!I?_+=Qs.lineComment(_,r.indent,l(b)):p&&s&&s(),_}H1.stringifyPair=$x});var $d=m(Ad=>{"use strict";var K1=Q("process");function Lx(t,...e){t==="debug"&&console.log(...e)}function Nx(t,e){(t==="debug"||t==="warn")&&(typeof K1.emitWarning=="function"?K1.emitWarning(e):console.warn(e))}Ad.debug=Lx;Ad.warn=Nx});var Ra=m(Pa=>{"use strict";var Zs=ie(),G1=be(),Na="<<",Oa={identify:t=>t===Na||typeof t=="symbol"&&t.description===Na,default:"key",tag:"tag:yaml.org,2002:merge",test:/^<<$/,resolve:()=>Object.assign(new G1.Scalar(Symbol(Na)),{addToJSMap:z1}),stringify:()=>Na},Ox=(t,e)=>(Oa.identify(e)||Zs.isScalar(e)&&(!e.type||e.type===G1.Scalar.PLAIN)&&Oa.identify(e.value))&&t?.doc.schema.tags.some(r=>r.tag===Oa.tag&&r.default);function z1(t,e,r){if(r=t&&Zs.isAlias(r)?r.resolve(t.doc):r,Zs.isSeq(r))for(let n of r.items)Ld(t,e,n);else if(Array.isArray(r))for(let n of r)Ld(t,e,n);else Ld(t,e,r)}function Ld(t,e,r){let n=t&&Zs.isAlias(r)?r.resolve(t.doc):r;if(!Zs.isMap(n))throw new Error("Merge sources must be maps or map aliases");let s=n.toJSON(null,t,Map);for(let[i,o]of s)e instanceof Map?e.has(i)||e.set(i,o):e instanceof Set?e.add(i):Object.prototype.hasOwnProperty.call(e,i)||Object.defineProperty(e,i,{value:o,writable:!0,enumerable:!0,configurable:!0});return e}Pa.addMergeToJSMap=z1;Pa.isMergeKey=Ox;Pa.merge=Oa});var Od=m(X1=>{"use strict";var Px=$d(),J1=Ra(),Rx=Xs(),Y1=ie(),Nd=Er();function Cx(t,e,{key:r,value:n}){if(Y1.isNode(r)&&r.addToJSMap)r.addToJSMap(t,e,n);else if(J1.isMergeKey(t,r))J1.addMergeToJSMap(t,e,n);else{let s=Nd.toJS(r,"",t);if(e instanceof Map)e.set(s,Nd.toJS(n,s,t));else if(e instanceof Set)e.add(s);else{let i=kx(r,s,t),o=Nd.toJS(n,i,t);i in e?Object.defineProperty(e,i,{value:o,writable:!0,enumerable:!0,configurable:!0}):e[i]=o}}return e}function kx(t,e,r){if(e===null)return"";if(typeof e!="object")return String(e);if(Y1.isNode(t)&&r?.doc){let n=Rx.createStringifyContext(r.doc,{});n.anchors=new Set;for(let i of r.anchors.keys())n.anchors.add(i.anchor);n.inFlow=!0,n.inStringifyKey=!0;let s=t.toString(n);if(!r.mapKeyWarned){let i=JSON.stringify(s);i.length>40&&(i=i.substring(0,36)+'..."'),Px.warn(r.doc.options.logLevel,`Keys with collection values will be stringified due to JS Object restrictions: ${i}. Set mapAsMap: true to use object keys.`),r.mapKeyWarned=!0}return s}return JSON.stringify(e)}X1.addPairToJSMap=Cx});var Tr=m(Pd=>{"use strict";var Q1=Ks(),qx=W1(),Mx=Od(),Ca=ie();function xx(t,e,r){let n=Q1.createNode(t,void 0,r),s=Q1.createNode(e,void 0,r);return new ka(n,s)}var ka=class t{constructor(e,r=null){Object.defineProperty(this,Ca.NODE_TYPE,{value:Ca.PAIR}),this.key=e,this.value=r}clone(e){let{key:r,value:n}=this;return Ca.isNode(r)&&(r=r.clone(e)),Ca.isNode(n)&&(n=n.clone(e)),new t(r,n)}toJSON(e,r){let n=r?.mapAsMap?new Map:{};return Mx.addPairToJSMap(r,n,this)}toString(e,r,n){return e?.doc?qx.stringifyPair(this,e,r,n):JSON.stringify(this)}};Pd.Pair=ka;Pd.createPair=xx});var Rd=m(ew=>{"use strict";var Kr=ie(),Z1=Xs(),qa=Gs();function jx(t,e,r){return(e.inFlow??t.flow?Fx:Dx)(t,e,r)}function Dx({comment:t,items:e},r,{blockItemPrefix:n,flowChars:s,itemIndent:i,onChompKeep:o,onComment:a}){let{indent:c,options:{commentString:l}}=r,u=Object.assign({},r,{indent:i,type:null}),f=!1,d=[];for(let g=0;g<e.length;++g){let p=e[g],_=null;if(Kr.isNode(p))!f&&p.spaceBefore&&d.push(""),Ma(r,d,p.commentBefore,f),p.comment&&(_=p.comment);else if(Kr.isPair(p)){let w=Kr.isNode(p.key)?p.key:null;w&&(!f&&w.spaceBefore&&d.push(""),Ma(r,d,w.commentBefore,f))}f=!1;let y=Z1.stringify(p,u,()=>_=null,()=>f=!0);_&&(y+=qa.lineComment(y,i,l(_))),f&&_&&(f=!1),d.push(n+y)}let h;if(d.length===0)h=s.start+s.end;else{h=d[0];for(let g=1;g<d.length;++g){let p=d[g];h+=p?`
${c}${p}`:`
`}}return t?(h+=`
`+qa.indentComment(l(t),c),a&&a()):f&&o&&o(),h}function Fx({items:t},e,{flowChars:r,itemIndent:n}){let{indent:s,indentStep:i,flowCollectionPadding:o,options:{commentString:a}}=e;n+=i;let c=Object.assign({},e,{indent:n,inFlow:!0,type:null}),l=!1,u=0,f=[];for(let g=0;g<t.length;++g){let p=t[g],_=null;if(Kr.isNode(p))p.spaceBefore&&f.push(""),Ma(e,f,p.commentBefore,!1),p.comment&&(_=p.comment);else if(Kr.isPair(p)){let w=Kr.isNode(p.key)?p.key:null;w&&(w.spaceBefore&&f.push(""),Ma(e,f,w.commentBefore,!1),w.comment&&(l=!0));let b=Kr.isNode(p.value)?p.value:null;b?(b.comment&&(_=b.comment),b.commentBefore&&(l=!0)):p.value==null&&w?.comment&&(_=w.comment)}_&&(l=!0);let y=Z1.stringify(p,c,()=>_=null);g<t.length-1&&(y+=","),_&&(y+=qa.lineComment(y,n,a(_))),!l&&(f.length>u||y.includes(`
`))&&(l=!0),f.push(y),u=f.length}let{start:d,end:h}=r;if(f.length===0)return d+h;if(!l){let g=f.reduce((p,_)=>p+_.length+2,2);l=e.options.lineWidth>0&&g>e.options.lineWidth}if(l){let g=d;for(let p of f)g+=p?`
${i}${s}${p}`:`
`;return`${g}
${s}${h}`}else return`${d}${o}${f.join(" ")}${o}${h}`}function Ma({indent:t,options:{commentString:e}},r,n,s){if(n&&s&&(n=n.replace(/^\n+/,"")),n){let i=qa.indentComment(e(n),t);r.push(i.trimStart())}}ew.stringifyCollection=jx});var Ir=m(kd=>{"use strict";var Ux=Rd(),Vx=Od(),Bx=Ta(),br=ie(),xa=Tr(),Hx=be();function ei(t,e){let r=br.isScalar(e)?e.value:e;for(let n of t)if(br.isPair(n)&&(n.key===e||n.key===r||br.isScalar(n.key)&&n.key.value===r))return n}var Cd=class extends Bx.Collection{static get tagName(){return"tag:yaml.org,2002:map"}constructor(e){super(br.MAP,e),this.items=[]}static from(e,r,n){let{keepUndefined:s,replacer:i}=n,o=new this(e),a=(c,l)=>{if(typeof i=="function")l=i.call(r,c,l);else if(Array.isArray(i)&&!i.includes(c))return;(l!==void 0||s)&&o.items.push(xa.createPair(c,l,n))};if(r instanceof Map)for(let[c,l]of r)a(c,l);else if(r&&typeof r=="object")for(let c of Object.keys(r))a(c,r[c]);return typeof e.sortMapEntries=="function"&&o.items.sort(e.sortMapEntries),o}add(e,r){let n;br.isPair(e)?n=e:!e||typeof e!="object"||!("key"in e)?n=new xa.Pair(e,e?.value):n=new xa.Pair(e.key,e.value);let s=ei(this.items,n.key),i=this.schema?.sortMapEntries;if(s){if(!r)throw new Error(`Key ${n.key} already set`);br.isScalar(s.value)&&Hx.isScalarValue(n.value)?s.value.value=n.value:s.value=n.value}else if(i){let o=this.items.findIndex(a=>i(n,a)<0);o===-1?this.items.push(n):this.items.splice(o,0,n)}else this.items.push(n)}delete(e){let r=ei(this.items,e);return r?this.items.splice(this.items.indexOf(r),1).length>0:!1}get(e,r){let s=ei(this.items,e)?.value;return(!r&&br.isScalar(s)?s.value:s)??void 0}has(e){return!!ei(this.items,e)}set(e,r){this.add(new xa.Pair(e,r),!0)}toJSON(e,r,n){let s=n?new n:r?.mapAsMap?new Map:{};r?.onCreate&&r.onCreate(s);for(let i of this.items)Vx.addPairToJSMap(r,s,i);return s}toString(e,r,n){if(!e)return JSON.stringify(this);for(let s of this.items)if(!br.isPair(s))throw new Error(`Map items must all be pairs; found ${JSON.stringify(s)} instead`);return!e.allNullValues&&this.hasAllNullValues(!1)&&(e=Object.assign({},e,{allNullValues:!0})),Ux.stringifyCollection(this,e,{blockItemPrefix:"",flowChars:{start:"{",end:"}"},itemIndent:e.indent||"",onChompKeep:n,onComment:r})}};kd.YAMLMap=Cd;kd.findPair=ei});var kn=m(rw=>{"use strict";var Wx=ie(),tw=Ir(),Kx={collection:"map",default:!0,nodeClass:tw.YAMLMap,tag:"tag:yaml.org,2002:map",resolve(t,e){return Wx.isMap(t)||e("Expected a mapping for this tag"),t},createNode:(t,e,r)=>tw.YAMLMap.from(t,e,r)};rw.map=Kx});var Ar=m(nw=>{"use strict";var Gx=Ks(),zx=Rd(),Jx=Ta(),Da=ie(),Yx=be(),Xx=Er(),qd=class extends Jx.Collection{static get tagName(){return"tag:yaml.org,2002:seq"}constructor(e){super(Da.SEQ,e),this.items=[]}add(e){this.items.push(e)}delete(e){let r=ja(e);return typeof r!="number"?!1:this.items.splice(r,1).length>0}get(e,r){let n=ja(e);if(typeof n!="number")return;let s=this.items[n];return!r&&Da.isScalar(s)?s.value:s}has(e){let r=ja(e);return typeof r=="number"&&r<this.items.length}set(e,r){let n=ja(e);if(typeof n!="number")throw new Error(`Expected a valid index, not ${e}.`);let s=this.items[n];Da.isScalar(s)&&Yx.isScalarValue(r)?s.value=r:this.items[n]=r}toJSON(e,r){let n=[];r?.onCreate&&r.onCreate(n);let s=0;for(let i of this.items)n.push(Xx.toJS(i,String(s++),r));return n}toString(e,r,n){return e?zx.stringifyCollection(this,e,{blockItemPrefix:"- ",flowChars:{start:"[",end:"]"},itemIndent:(e.indent||"")+"  ",onChompKeep:n,onComment:r}):JSON.stringify(this)}static from(e,r,n){let{replacer:s}=n,i=new this(e);if(r&&Symbol.iterator in Object(r)){let o=0;for(let a of r){if(typeof s=="function"){let c=r instanceof Set?a:String(o++);a=s.call(r,c,a)}i.items.push(Gx.createNode(a,void 0,n))}}return i}};function ja(t){let e=Da.isScalar(t)?t.value:t;return e&&typeof e=="string"&&(e=Number(e)),typeof e=="number"&&Number.isInteger(e)&&e>=0?e:null}nw.YAMLSeq=qd});var qn=m(iw=>{"use strict";var Qx=ie(),sw=Ar(),Zx={collection:"seq",default:!0,nodeClass:sw.YAMLSeq,tag:"tag:yaml.org,2002:seq",resolve(t,e){return Qx.isSeq(t)||e("Expected a sequence for this tag"),t},createNode:(t,e,r)=>sw.YAMLSeq.from(t,e,r)};iw.seq=Zx});var ti=m(ow=>{"use strict";var ej=Ys(),tj={identify:t=>typeof t=="string",default:!0,tag:"tag:yaml.org,2002:str",resolve:t=>t,stringify(t,e,r,n){return e=Object.assign({actualString:!0},e),ej.stringifyString(t,e,r,n)}};ow.string=tj});var Fa=m(lw=>{"use strict";var aw=be(),cw={identify:t=>t==null,createNode:()=>new aw.Scalar(null),default:!0,tag:"tag:yaml.org,2002:null",test:/^(?:~|[Nn]ull|NULL)?$/,resolve:()=>new aw.Scalar(null),stringify:({source:t},e)=>typeof t=="string"&&cw.test.test(t)?t:e.options.nullStr};lw.nullTag=cw});var Md=m(fw=>{"use strict";var rj=be(),uw={identify:t=>typeof t=="boolean",default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,resolve:t=>new rj.Scalar(t[0]==="t"||t[0]==="T"),stringify({source:t,value:e},r){if(t&&uw.test.test(t)){let n=t[0]==="t"||t[0]==="T";if(e===n)return t}return e?r.options.trueStr:r.options.falseStr}};fw.boolTag=uw});var Mn=m(dw=>{"use strict";function nj({format:t,minFractionDigits:e,tag:r,value:n}){if(typeof n=="bigint")return String(n);let s=typeof n=="number"?n:Number(n);if(!isFinite(s))return isNaN(s)?".nan":s<0?"-.inf":".inf";let i=Object.is(n,-0)?"-0":JSON.stringify(n);if(!t&&e&&(!r||r==="tag:yaml.org,2002:float")&&/^\d/.test(i)){let o=i.indexOf(".");o<0&&(o=i.length,i+=".");let a=e-(i.length-o-1);for(;a-- >0;)i+="0"}return i}dw.stringifyNumber=nj});var jd=m(Ua=>{"use strict";var sj=be(),xd=Mn(),ij={identify:t=>typeof t=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,resolve:t=>t.slice(-3).toLowerCase()==="nan"?NaN:t[0]==="-"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,stringify:xd.stringifyNumber},oj={identify:t=>typeof t=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"EXP",test:/^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,resolve:t=>parseFloat(t),stringify(t){let e=Number(t.value);return isFinite(e)?e.toExponential():xd.stringifyNumber(t)}},aj={identify:t=>typeof t=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,resolve(t){let e=new sj.Scalar(parseFloat(t)),r=t.indexOf(".");return r!==-1&&t[t.length-1]==="0"&&(e.minFractionDigits=t.length-r-1),e},stringify:xd.stringifyNumber};Ua.float=aj;Ua.floatExp=oj;Ua.floatNaN=ij});var Fd=m(Ba=>{"use strict";var hw=Mn(),Va=t=>typeof t=="bigint"||Number.isInteger(t),Dd=(t,e,r,{intAsBigInt:n})=>n?BigInt(t):parseInt(t.substring(e),r);function pw(t,e,r){let{value:n}=t;return Va(n)&&n>=0?r+n.toString(e):hw.stringifyNumber(t)}var cj={identify:t=>Va(t)&&t>=0,default:!0,tag:"tag:yaml.org,2002:int",format:"OCT",test:/^0o[0-7]+$/,resolve:(t,e,r)=>Dd(t,2,8,r),stringify:t=>pw(t,8,"0o")},lj={identify:Va,default:!0,tag:"tag:yaml.org,2002:int",test:/^[-+]?[0-9]+$/,resolve:(t,e,r)=>Dd(t,0,10,r),stringify:hw.stringifyNumber},uj={identify:t=>Va(t)&&t>=0,default:!0,tag:"tag:yaml.org,2002:int",format:"HEX",test:/^0x[0-9a-fA-F]+$/,resolve:(t,e,r)=>Dd(t,2,16,r),stringify:t=>pw(t,16,"0x")};Ba.int=lj;Ba.intHex=uj;Ba.intOct=cj});var _w=m(mw=>{"use strict";var fj=kn(),dj=Fa(),hj=qn(),pj=ti(),mj=Md(),Ud=jd(),Vd=Fd(),_j=[fj.map,hj.seq,pj.string,dj.nullTag,mj.boolTag,Vd.intOct,Vd.int,Vd.intHex,Ud.floatNaN,Ud.floatExp,Ud.float];mw.schema=_j});var Ew=m(yw=>{"use strict";var gj=be(),yj=kn(),Ej=qn();function gw(t){return typeof t=="bigint"||Number.isInteger(t)}var Ha=({value:t})=>JSON.stringify(t),vj=[{identify:t=>typeof t=="string",default:!0,tag:"tag:yaml.org,2002:str",resolve:t=>t,stringify:Ha},{identify:t=>t==null,createNode:()=>new gj.Scalar(null),default:!0,tag:"tag:yaml.org,2002:null",test:/^null$/,resolve:()=>null,stringify:Ha},{identify:t=>typeof t=="boolean",default:!0,tag:"tag:yaml.org,2002:bool",test:/^true$|^false$/,resolve:t=>t==="true",stringify:Ha},{identify:gw,default:!0,tag:"tag:yaml.org,2002:int",test:/^-?(?:0|[1-9][0-9]*)$/,resolve:(t,e,{intAsBigInt:r})=>r?BigInt(t):parseInt(t,10),stringify:({value:t})=>gw(t)?t.toString():JSON.stringify(t)},{identify:t=>typeof t=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,resolve:t=>parseFloat(t),stringify:Ha}],wj={default:!0,tag:"",test:/^/,resolve(t,e){return e(`Unresolved plain scalar ${JSON.stringify(t)}`),t}},Sj=[yj.map,Ej.seq].concat(vj,wj);yw.schema=Sj});var Hd=m(vw=>{"use strict";var ri=Q("buffer"),Bd=be(),Tj=Ys(),bj={identify:t=>t instanceof Uint8Array,default:!1,tag:"tag:yaml.org,2002:binary",resolve(t,e){if(typeof ri.Buffer=="function")return ri.Buffer.from(t,"base64");if(typeof atob=="function"){let r=atob(t.replace(/[\n\r]/g,"")),n=new Uint8Array(r.length);for(let s=0;s<r.length;++s)n[s]=r.charCodeAt(s);return n}else return e("This environment does not support reading binary tags; either Buffer or atob is required"),t},stringify({comment:t,type:e,value:r},n,s,i){if(!r)return"";let o=r,a;if(typeof ri.Buffer=="function")a=o instanceof ri.Buffer?o.toString("base64"):ri.Buffer.from(o.buffer).toString("base64");else if(typeof btoa=="function"){let c="";for(let l=0;l<o.length;++l)c+=String.fromCharCode(o[l]);a=btoa(c)}else throw new Error("This environment does not support writing binary tags; either Buffer or btoa is required");if(e??(e=Bd.Scalar.BLOCK_LITERAL),e!==Bd.Scalar.QUOTE_DOUBLE){let c=Math.max(n.options.lineWidth-n.indent.length,n.options.minContentWidth),l=Math.ceil(a.length/c),u=new Array(l);for(let f=0,d=0;f<l;++f,d+=c)u[f]=a.substr(d,c);a=u.join(e===Bd.Scalar.BLOCK_LITERAL?`
`:" ")}return Tj.stringifyString({comment:t,type:e,value:a},n,s,i)}};vw.binary=bj});var Ga=m(Ka=>{"use strict";var Wa=ie(),Wd=Tr(),Ij=be(),Aj=Ar();function ww(t,e){if(Wa.isSeq(t))for(let r=0;r<t.items.length;++r){let n=t.items[r];if(!Wa.isPair(n)){if(Wa.isMap(n)){n.items.length>1&&e("Each pair must have its own sequence indicator");let s=n.items[0]||new Wd.Pair(new Ij.Scalar(null));if(n.commentBefore&&(s.key.commentBefore=s.key.commentBefore?`${n.commentBefore}
${s.key.commentBefore}`:n.commentBefore),n.comment){let i=s.value??s.key;i.comment=i.comment?`${n.comment}
${i.comment}`:n.comment}n=s}t.items[r]=Wa.isPair(n)?n:new Wd.Pair(n)}}else e("Expected a sequence for this tag");return t}function Sw(t,e,r){let{replacer:n}=r,s=new Aj.YAMLSeq(t);s.tag="tag:yaml.org,2002:pairs";let i=0;if(e&&Symbol.iterator in Object(e))for(let o of e){typeof n=="function"&&(o=n.call(e,String(i++),o));let a,c;if(Array.isArray(o))if(o.length===2)a=o[0],c=o[1];else throw new TypeError(`Expected [key, value] tuple: ${o}`);else if(o&&o instanceof Object){let l=Object.keys(o);if(l.length===1)a=l[0],c=o[a];else throw new TypeError(`Expected tuple with one key, not ${l.length} keys`)}else a=o;s.items.push(Wd.createPair(a,c,r))}return s}var $j={collection:"seq",default:!1,tag:"tag:yaml.org,2002:pairs",resolve:ww,createNode:Sw};Ka.createPairs=Sw;Ka.pairs=$j;Ka.resolvePairs=ww});var zd=m(Gd=>{"use strict";var Tw=ie(),Kd=Er(),ni=Ir(),Lj=Ar(),bw=Ga(),Gr=class t extends Lj.YAMLSeq{constructor(){super(),this.add=ni.YAMLMap.prototype.add.bind(this),this.delete=ni.YAMLMap.prototype.delete.bind(this),this.get=ni.YAMLMap.prototype.get.bind(this),this.has=ni.YAMLMap.prototype.has.bind(this),this.set=ni.YAMLMap.prototype.set.bind(this),this.tag=t.tag}toJSON(e,r){if(!r)return super.toJSON(e);let n=new Map;r?.onCreate&&r.onCreate(n);for(let s of this.items){let i,o;if(Tw.isPair(s)?(i=Kd.toJS(s.key,"",r),o=Kd.toJS(s.value,i,r)):i=Kd.toJS(s,"",r),n.has(i))throw new Error("Ordered maps must not include duplicate keys");n.set(i,o)}return n}static from(e,r,n){let s=bw.createPairs(e,r,n),i=new this;return i.items=s.items,i}};Gr.tag="tag:yaml.org,2002:omap";var Nj={collection:"seq",identify:t=>t instanceof Map,nodeClass:Gr,default:!1,tag:"tag:yaml.org,2002:omap",resolve(t,e){let r=bw.resolvePairs(t,e),n=[];for(let{key:s}of r.items)Tw.isScalar(s)&&(n.includes(s.value)?e(`Ordered maps must not include duplicate keys: ${s.value}`):n.push(s.value));return Object.assign(new Gr,r)},createNode:(t,e,r)=>Gr.from(t,e,r)};Gd.YAMLOMap=Gr;Gd.omap=Nj});var Nw=m(Jd=>{"use strict";var Iw=be();function Aw({value:t,source:e},r){return e&&(t?$w:Lw).test.test(e)?e:t?r.options.trueStr:r.options.falseStr}var $w={identify:t=>t===!0,default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,resolve:()=>new Iw.Scalar(!0),stringify:Aw},Lw={identify:t=>t===!1,default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,resolve:()=>new Iw.Scalar(!1),stringify:Aw};Jd.falseTag=Lw;Jd.trueTag=$w});var Ow=m(za=>{"use strict";var Oj=be(),Yd=Mn(),Pj={identify:t=>typeof t=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,resolve:t=>t.slice(-3).toLowerCase()==="nan"?NaN:t[0]==="-"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,stringify:Yd.stringifyNumber},Rj={identify:t=>typeof t=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"EXP",test:/^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,resolve:t=>parseFloat(t.replace(/_/g,"")),stringify(t){let e=Number(t.value);return isFinite(e)?e.toExponential():Yd.stringifyNumber(t)}},Cj={identify:t=>typeof t=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,resolve(t){let e=new Oj.Scalar(parseFloat(t.replace(/_/g,""))),r=t.indexOf(".");if(r!==-1){let n=t.substring(r+1).replace(/_/g,"");n[n.length-1]==="0"&&(e.minFractionDigits=n.length)}return e},stringify:Yd.stringifyNumber};za.float=Cj;za.floatExp=Rj;za.floatNaN=Pj});var Rw=m(ii=>{"use strict";var Pw=Mn(),si=t=>typeof t=="bigint"||Number.isInteger(t);function Ja(t,e,r,{intAsBigInt:n}){let s=t[0];if((s==="-"||s==="+")&&(e+=1),t=t.substring(e).replace(/_/g,""),n){switch(r){case 2:t=`0b${t}`;break;case 8:t=`0o${t}`;break;case 16:t=`0x${t}`;break}let o=BigInt(t);return s==="-"?BigInt(-1)*o:o}let i=parseInt(t,r);return s==="-"?-1*i:i}function Xd(t,e,r){let{value:n}=t;if(si(n)){let s=n.toString(e);return n<0?"-"+r+s.substr(1):r+s}return Pw.stringifyNumber(t)}var kj={identify:si,default:!0,tag:"tag:yaml.org,2002:int",format:"BIN",test:/^[-+]?0b[0-1_]+$/,resolve:(t,e,r)=>Ja(t,2,2,r),stringify:t=>Xd(t,2,"0b")},qj={identify:si,default:!0,tag:"tag:yaml.org,2002:int",format:"OCT",test:/^[-+]?0[0-7_]+$/,resolve:(t,e,r)=>Ja(t,1,8,r),stringify:t=>Xd(t,8,"0")},Mj={identify:si,default:!0,tag:"tag:yaml.org,2002:int",test:/^[-+]?[0-9][0-9_]*$/,resolve:(t,e,r)=>Ja(t,0,10,r),stringify:Pw.stringifyNumber},xj={identify:si,default:!0,tag:"tag:yaml.org,2002:int",format:"HEX",test:/^[-+]?0x[0-9a-fA-F_]+$/,resolve:(t,e,r)=>Ja(t,2,16,r),stringify:t=>Xd(t,16,"0x")};ii.int=Mj;ii.intBin=kj;ii.intHex=xj;ii.intOct=qj});var Zd=m(Qd=>{"use strict";var Qa=ie(),Ya=Tr(),Xa=Ir(),zr=class t extends Xa.YAMLMap{constructor(e){super(e),this.tag=t.tag}add(e){let r;Qa.isPair(e)?r=e:e&&typeof e=="object"&&"key"in e&&"value"in e&&e.value===null?r=new Ya.Pair(e.key,null):r=new Ya.Pair(e,null),Xa.findPair(this.items,r.key)||this.items.push(r)}get(e,r){let n=Xa.findPair(this.items,e);return!r&&Qa.isPair(n)?Qa.isScalar(n.key)?n.key.value:n.key:n}set(e,r){if(typeof r!="boolean")throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof r}`);let n=Xa.findPair(this.items,e);n&&!r?this.items.splice(this.items.indexOf(n),1):!n&&r&&this.items.push(new Ya.Pair(e))}toJSON(e,r){return super.toJSON(e,r,Set)}toString(e,r,n){if(!e)return JSON.stringify(this);if(this.hasAllNullValues(!0))return super.toString(Object.assign({},e,{allNullValues:!0}),r,n);throw new Error("Set items must all have null values")}static from(e,r,n){let{replacer:s}=n,i=new this(e);if(r&&Symbol.iterator in Object(r))for(let o of r)typeof s=="function"&&(o=s.call(r,o,o)),i.items.push(Ya.createPair(o,null,n));return i}};zr.tag="tag:yaml.org,2002:set";var jj={collection:"map",identify:t=>t instanceof Set,nodeClass:zr,default:!1,tag:"tag:yaml.org,2002:set",createNode:(t,e,r)=>zr.from(t,e,r),resolve(t,e){if(Qa.isMap(t)){if(t.hasAllNullValues(!0))return Object.assign(new zr,t);e("Set items must all have null values")}else e("Expected a mapping for this tag");return t}};Qd.YAMLSet=zr;Qd.set=jj});var th=m(Za=>{"use strict";var Dj=Mn();function eh(t,e){let r=t[0],n=r==="-"||r==="+"?t.substring(1):t,s=o=>e?BigInt(o):Number(o),i=n.replace(/_/g,"").split(":").reduce((o,a)=>o*s(60)+s(a),s(0));return r==="-"?s(-1)*i:i}function Cw(t){let{value:e}=t,r=o=>o;if(typeof e=="bigint")r=o=>BigInt(o);else if(isNaN(e)||!isFinite(e))return Dj.stringifyNumber(t);let n="";e<0&&(n="-",e*=r(-1));let s=r(60),i=[e%s];return e<60?i.unshift(0):(e=(e-i[0])/s,i.unshift(e%s),e>=60&&(e=(e-i[0])/s,i.unshift(e))),n+i.map(o=>String(o).padStart(2,"0")).join(":").replace(/000000\d*$/,"")}var Fj={identify:t=>typeof t=="bigint"||Number.isInteger(t),default:!0,tag:"tag:yaml.org,2002:int",format:"TIME",test:/^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,resolve:(t,e,{intAsBigInt:r})=>eh(t,r),stringify:Cw},Uj={identify:t=>typeof t=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"TIME",test:/^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,resolve:t=>eh(t,!1),stringify:Cw},kw={identify:t=>t instanceof Date,default:!0,tag:"tag:yaml.org,2002:timestamp",test:RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$"),resolve(t){let e=t.match(kw.test);if(!e)throw new Error("!!timestamp expects a date, starting with yyyy-mm-dd");let[,r,n,s,i,o,a]=e.map(Number),c=e[7]?Number((e[7]+"00").substr(1,3)):0,l=Date.UTC(r,n-1,s,i||0,o||0,a||0,c),u=e[8];if(u&&u!=="Z"){let f=eh(u,!1);Math.abs(f)<30&&(f*=60),l-=6e4*f}return new Date(l)},stringify:({value:t})=>t?.toISOString().replace(/(T00:00:00)?\.000Z$/,"")??""};Za.floatTime=Uj;Za.intTime=Fj;Za.timestamp=kw});var xw=m(Mw=>{"use strict";var Vj=kn(),Bj=Fa(),Hj=qn(),Wj=ti(),Kj=Hd(),qw=Nw(),rh=Ow(),ec=Rw(),Gj=Ra(),zj=zd(),Jj=Ga(),Yj=Zd(),nh=th(),Xj=[Vj.map,Hj.seq,Wj.string,Bj.nullTag,qw.trueTag,qw.falseTag,ec.intBin,ec.intOct,ec.int,ec.intHex,rh.floatNaN,rh.floatExp,rh.float,Kj.binary,Gj.merge,zj.omap,Jj.pairs,Yj.set,nh.intTime,nh.floatTime,nh.timestamp];Mw.schema=Xj});var Gw=m(oh=>{"use strict";var Uw=kn(),Qj=Fa(),Vw=qn(),Zj=ti(),eD=Md(),sh=jd(),ih=Fd(),tD=_w(),rD=Ew(),Bw=Hd(),oi=Ra(),Hw=zd(),Ww=Ga(),jw=xw(),Kw=Zd(),tc=th(),Dw=new Map([["core",tD.schema],["failsafe",[Uw.map,Vw.seq,Zj.string]],["json",rD.schema],["yaml11",jw.schema],["yaml-1.1",jw.schema]]),Fw={binary:Bw.binary,bool:eD.boolTag,float:sh.float,floatExp:sh.floatExp,floatNaN:sh.floatNaN,floatTime:tc.floatTime,int:ih.int,intHex:ih.intHex,intOct:ih.intOct,intTime:tc.intTime,map:Uw.map,merge:oi.merge,null:Qj.nullTag,omap:Hw.omap,pairs:Ww.pairs,seq:Vw.seq,set:Kw.set,timestamp:tc.timestamp},nD={"tag:yaml.org,2002:binary":Bw.binary,"tag:yaml.org,2002:merge":oi.merge,"tag:yaml.org,2002:omap":Hw.omap,"tag:yaml.org,2002:pairs":Ww.pairs,"tag:yaml.org,2002:set":Kw.set,"tag:yaml.org,2002:timestamp":tc.timestamp};function sD(t,e,r){let n=Dw.get(e);if(n&&!t)return r&&!n.includes(oi.merge)?n.concat(oi.merge):n.slice();let s=n;if(!s)if(Array.isArray(t))s=[];else{let i=Array.from(Dw.keys()).filter(o=>o!=="yaml11").map(o=>JSON.stringify(o)).join(", ");throw new Error(`Unknown schema "${e}"; use one of ${i} or define customTags array`)}if(Array.isArray(t))for(let i of t)s=s.concat(i);else typeof t=="function"&&(s=t(s.slice()));return r&&(s=s.concat(oi.merge)),s.reduce((i,o)=>{let a=typeof o=="string"?Fw[o]:o;if(!a){let c=JSON.stringify(o),l=Object.keys(Fw).map(u=>JSON.stringify(u)).join(", ");throw new Error(`Unknown custom tag ${c}; use one of ${l}`)}return i.includes(a)||i.push(a),i},[])}oh.coreKnownTags=nD;oh.getTags=sD});var lh=m(zw=>{"use strict";var ah=ie(),iD=kn(),oD=qn(),aD=ti(),rc=Gw(),cD=(t,e)=>t.key<e.key?-1:t.key>e.key?1:0,ch=class t{constructor({compat:e,customTags:r,merge:n,resolveKnownTags:s,schema:i,sortMapEntries:o,toStringDefaults:a}){this.compat=Array.isArray(e)?rc.getTags(e,"compat"):e?rc.getTags(null,e):null,this.name=typeof i=="string"&&i||"core",this.knownTags=s?rc.coreKnownTags:{},this.tags=rc.getTags(r,this.name,n),this.toStringOptions=a??null,Object.defineProperty(this,ah.MAP,{value:iD.map}),Object.defineProperty(this,ah.SCALAR,{value:aD.string}),Object.defineProperty(this,ah.SEQ,{value:oD.seq}),this.sortMapEntries=typeof o=="function"?o:o===!0?cD:null}clone(){let e=Object.create(t.prototype,Object.getOwnPropertyDescriptors(this));return e.tags=this.tags.slice(),e}};zw.Schema=ch});var Yw=m(Jw=>{"use strict";var lD=ie(),uh=Xs(),ai=Gs();function uD(t,e){let r=[],n=e.directives===!0;if(e.directives!==!1&&t.directives){let c=t.directives.toString(t);c?(r.push(c),n=!0):t.directives.docStart&&(n=!0)}n&&r.push("---");let s=uh.createStringifyContext(t,e),{commentString:i}=s.options;if(t.commentBefore){r.length!==1&&r.unshift("");let c=i(t.commentBefore);r.unshift(ai.indentComment(c,""))}let o=!1,a=null;if(t.contents){if(lD.isNode(t.contents)){if(t.contents.spaceBefore&&n&&r.push(""),t.contents.commentBefore){let u=i(t.contents.commentBefore);r.push(ai.indentComment(u,""))}s.forceBlockIndent=!!t.comment,a=t.contents.comment}let c=a?void 0:()=>o=!0,l=uh.stringify(t.contents,s,()=>a=null,c);a&&(l+=ai.lineComment(l,"",i(a))),(l[0]==="|"||l[0]===">")&&r[r.length-1]==="---"?r[r.length-1]=`--- ${l}`:r.push(l)}else r.push(uh.stringify(t.contents,s));if(t.directives?.docEnd)if(t.comment){let c=i(t.comment);c.includes(`
`)?(r.push("..."),r.push(ai.indentComment(c,""))):r.push(`... ${c}`)}else r.push("...");else{let c=t.comment;c&&o&&(c=c.replace(/^\n+/,"")),c&&((!o||a)&&r[r.length-1]!==""&&r.push(""),r.push(ai.indentComment(i(c),"")))}return r.join(`
`)+`
`}Jw.stringifyDocument=uD});var ci=m(Xw=>{"use strict";var fD=Ws(),xn=Ta(),_t=ie(),dD=Tr(),hD=Er(),pD=lh(),mD=Yw(),fh=Ea(),_D=md(),gD=Ks(),dh=pd(),hh=class t{constructor(e,r,n){this.commentBefore=null,this.comment=null,this.errors=[],this.warnings=[],Object.defineProperty(this,_t.NODE_TYPE,{value:_t.DOC});let s=null;typeof r=="function"||Array.isArray(r)?s=r:n===void 0&&r&&(n=r,r=void 0);let i=Object.assign({intAsBigInt:!1,keepSourceTokens:!1,logLevel:"warn",prettyErrors:!0,strict:!0,stringKeys:!1,uniqueKeys:!0,version:"1.2"},n);this.options=i;let{version:o}=i;n?._directives?(this.directives=n._directives.atDocument(),this.directives.yaml.explicit&&(o=this.directives.yaml.version)):this.directives=new dh.Directives({version:o}),this.setSchema(o,n),this.contents=e===void 0?null:this.createNode(e,s,n)}clone(){let e=Object.create(t.prototype,{[_t.NODE_TYPE]:{value:_t.DOC}});return e.commentBefore=this.commentBefore,e.comment=this.comment,e.errors=this.errors.slice(),e.warnings=this.warnings.slice(),e.options=Object.assign({},this.options),this.directives&&(e.directives=this.directives.clone()),e.schema=this.schema.clone(),e.contents=_t.isNode(this.contents)?this.contents.clone(e.schema):this.contents,this.range&&(e.range=this.range.slice()),e}add(e){jn(this.contents)&&this.contents.add(e)}addIn(e,r){jn(this.contents)&&this.contents.addIn(e,r)}createAlias(e,r){if(!e.anchor){let n=fh.anchorNames(this);e.anchor=!r||n.has(r)?fh.findNewAnchor(r||"a",n):r}return new fD.Alias(e.anchor)}createNode(e,r,n){let s;if(typeof r=="function")e=r.call({"":e},"",e),s=r;else if(Array.isArray(r)){let _=w=>typeof w=="number"||w instanceof String||w instanceof Number,y=r.filter(_).map(String);y.length>0&&(r=r.concat(y)),s=r}else n===void 0&&r&&(n=r,r=void 0);let{aliasDuplicateObjects:i,anchorPrefix:o,flow:a,keepUndefined:c,onTagObj:l,tag:u}=n??{},{onAnchor:f,setAnchors:d,sourceObjects:h}=fh.createNodeAnchors(this,o||"a"),g={aliasDuplicateObjects:i??!0,keepUndefined:c??!1,onAnchor:f,onTagObj:l,replacer:s,schema:this.schema,sourceObjects:h},p=gD.createNode(e,u,g);return a&&_t.isCollection(p)&&(p.flow=!0),d(),p}createPair(e,r,n={}){let s=this.createNode(e,null,n),i=this.createNode(r,null,n);return new dD.Pair(s,i)}delete(e){return jn(this.contents)?this.contents.delete(e):!1}deleteIn(e){return xn.isEmptyPath(e)?this.contents==null?!1:(this.contents=null,!0):jn(this.contents)?this.contents.deleteIn(e):!1}get(e,r){return _t.isCollection(this.contents)?this.contents.get(e,r):void 0}getIn(e,r){return xn.isEmptyPath(e)?!r&&_t.isScalar(this.contents)?this.contents.value:this.contents:_t.isCollection(this.contents)?this.contents.getIn(e,r):void 0}has(e){return _t.isCollection(this.contents)?this.contents.has(e):!1}hasIn(e){return xn.isEmptyPath(e)?this.contents!==void 0:_t.isCollection(this.contents)?this.contents.hasIn(e):!1}set(e,r){this.contents==null?this.contents=xn.collectionFromPath(this.schema,[e],r):jn(this.contents)&&this.contents.set(e,r)}setIn(e,r){xn.isEmptyPath(e)?this.contents=r:this.contents==null?this.contents=xn.collectionFromPath(this.schema,Array.from(e),r):jn(this.contents)&&this.contents.setIn(e,r)}setSchema(e,r={}){typeof e=="number"&&(e=String(e));let n;switch(e){case"1.1":this.directives?this.directives.yaml.version="1.1":this.directives=new dh.Directives({version:"1.1"}),n={resolveKnownTags:!1,schema:"yaml-1.1"};break;case"1.2":case"next":this.directives?this.directives.yaml.version=e:this.directives=new dh.Directives({version:e}),n={resolveKnownTags:!0,schema:"core"};break;case null:this.directives&&delete this.directives,n=null;break;default:{let s=JSON.stringify(e);throw new Error(`Expected '1.1', '1.2' or null as first argument, but found: ${s}`)}}if(r.schema instanceof Object)this.schema=r.schema;else if(n)this.schema=new pD.Schema(Object.assign(n,r));else throw new Error("With a null YAML version, the { schema: Schema } option is required")}toJS({json:e,jsonArg:r,mapAsMap:n,maxAliasCount:s,onAnchor:i,reviver:o}={}){let a={anchors:new Map,doc:this,keep:!e,mapAsMap:n===!0,mapKeyWarned:!1,maxAliasCount:typeof s=="number"?s:100},c=hD.toJS(this.contents,r??"",a);if(typeof i=="function")for(let{count:l,res:u}of a.anchors.values())i(u,l);return typeof o=="function"?_D.applyReviver(o,{"":c},"",c):c}toJSON(e,r){return this.toJS({json:!0,jsonArg:e,mapAsMap:!1,onAnchor:r})}toString(e={}){if(this.errors.length>0)throw new Error("Document with errors cannot be stringified");if("indent"in e&&(!Number.isInteger(e.indent)||Number(e.indent)<=0)){let r=JSON.stringify(e.indent);throw new Error(`"indent" option must be a positive integer, not ${r}`)}return mD.stringifyDocument(this,e)}};function jn(t){if(_t.isCollection(t))return!0;throw new Error("Expected a YAML collection as document contents")}Xw.Document=hh});var fi=m(ui=>{"use strict";var li=class extends Error{constructor(e,r,n,s){super(),this.name=e,this.code=n,this.message=s,this.pos=r}},ph=class extends li{constructor(e,r,n){super("YAMLParseError",e,r,n)}},mh=class extends li{constructor(e,r,n){super("YAMLWarning",e,r,n)}},yD=(t,e)=>r=>{if(r.pos[0]===-1)return;r.linePos=r.pos.map(a=>e.linePos(a));let{line:n,col:s}=r.linePos[0];r.message+=` at line ${n}, column ${s}`;let i=s-1,o=t.substring(e.lineStarts[n-1],e.lineStarts[n]).replace(/[\n\r]+$/,"");if(i>=60&&o.length>80){let a=Math.min(i-39,o.length-79);o="\u2026"+o.substring(a),i-=a-1}if(o.length>80&&(o=o.substring(0,79)+"\u2026"),n>1&&/^ *$/.test(o.substring(0,i))){let a=t.substring(e.lineStarts[n-2],e.lineStarts[n-1]);a.length>80&&(a=a.substring(0,79)+`\u2026
`),o=a+o}if(/[^ ]/.test(o)){let a=1,c=r.linePos[1];c?.line===n&&c.col>s&&(a=Math.max(1,Math.min(c.col-s,80-i)));let l=" ".repeat(i)+"^".repeat(a);r.message+=`:

${o}
${l}
`}};ui.YAMLError=li;ui.YAMLParseError=ph;ui.YAMLWarning=mh;ui.prettifyError=yD});var di=m(Qw=>{"use strict";function ED(t,{flow:e,indicator:r,next:n,offset:s,onError:i,parentIndent:o,startOnNewline:a}){let c=!1,l=a,u=a,f="",d="",h=!1,g=!1,p=null,_=null,y=null,w=null,b=null,I=null,A=null;for(let P of t)switch(g&&(P.type!=="space"&&P.type!=="newline"&&P.type!=="comma"&&i(P.offset,"MISSING_CHAR","Tags and anchors must be separated from the next token by white space"),g=!1),p&&(l&&P.type!=="comment"&&P.type!=="newline"&&i(p,"TAB_AS_INDENT","Tabs are not allowed as indentation"),p=null),P.type){case"space":!e&&(r!=="doc-start"||n?.type!=="flow-collection")&&P.source.includes("	")&&(p=P),u=!0;break;case"comment":{u||i(P,"MISSING_CHAR","Comments must be separated from other tokens by white space characters");let N=P.source.substring(1)||" ";f?f+=d+N:f=N,d="",l=!1;break}case"newline":l?f?f+=P.source:(!I||r!=="seq-item-ind")&&(c=!0):d+=P.source,l=!0,h=!0,(_||y)&&(w=P),u=!0;break;case"anchor":_&&i(P,"MULTIPLE_ANCHORS","A node can have at most one anchor"),P.source.endsWith(":")&&i(P.offset+P.source.length-1,"BAD_ALIAS","Anchor ending in : is ambiguous",!0),_=P,A??(A=P.offset),l=!1,u=!1,g=!0;break;case"tag":{y&&i(P,"MULTIPLE_TAGS","A node can have at most one tag"),y=P,A??(A=P.offset),l=!1,u=!1,g=!0;break}case r:(_||y)&&i(P,"BAD_PROP_ORDER",`Anchors and tags must be after the ${P.source} indicator`),I&&i(P,"UNEXPECTED_TOKEN",`Unexpected ${P.source} in ${e??"collection"}`),I=P,l=r==="seq-item-ind"||r==="explicit-key-ind",u=!1;break;case"comma":if(e){b&&i(P,"UNEXPECTED_TOKEN",`Unexpected , in ${e}`),b=P,l=!1,u=!1;break}default:i(P,"UNEXPECTED_TOKEN",`Unexpected ${P.type} token`),l=!1,u=!1}let C=t[t.length-1],B=C?C.offset+C.source.length:s;return g&&n&&n.type!=="space"&&n.type!=="newline"&&n.type!=="comma"&&(n.type!=="scalar"||n.source!=="")&&i(n.offset,"MISSING_CHAR","Tags and anchors must be separated from the next token by white space"),p&&(l&&p.indent<=o||n?.type==="block-map"||n?.type==="block-seq")&&i(p,"TAB_AS_INDENT","Tabs are not allowed as indentation"),{comma:b,found:I,spaceBefore:c,comment:f,hasNewline:h,anchor:_,tag:y,newlineAfterProp:w,end:B,start:A??B}}Qw.resolveProps=ED});var nc=m(Zw=>{"use strict";function _h(t){if(!t)return null;switch(t.type){case"alias":case"scalar":case"double-quoted-scalar":case"single-quoted-scalar":if(t.source.includes(`
`))return!0;if(t.end){for(let e of t.end)if(e.type==="newline")return!0}return!1;case"flow-collection":for(let e of t.items){for(let r of e.start)if(r.type==="newline")return!0;if(e.sep){for(let r of e.sep)if(r.type==="newline")return!0}if(_h(e.key)||_h(e.value))return!0}return!1;default:return!0}}Zw.containsNewline=_h});var gh=m(eS=>{"use strict";var vD=nc();function wD(t,e,r){if(e?.type==="flow-collection"){let n=e.end[0];n.indent===t&&(n.source==="]"||n.source==="}")&&vD.containsNewline(e)&&r(n,"BAD_INDENT","Flow end indicator should be more indented than parent",!0)}}eS.flowIndentCheck=wD});var yh=m(rS=>{"use strict";var tS=ie();function SD(t,e,r){let{uniqueKeys:n}=t.options;if(n===!1)return!1;let s=typeof n=="function"?n:(i,o)=>i===o||tS.isScalar(i)&&tS.isScalar(o)&&i.value===o.value;return e.some(i=>s(i.key,r))}rS.mapIncludes=SD});var cS=m(aS=>{"use strict";var nS=Tr(),TD=Ir(),sS=di(),bD=nc(),iS=gh(),ID=yh(),oS="All mapping items must start at the same column";function AD({composeNode:t,composeEmptyNode:e},r,n,s,i){let o=i?.nodeClass??TD.YAMLMap,a=new o(r.schema);r.atRoot&&(r.atRoot=!1);let c=n.offset,l=null;for(let u of n.items){let{start:f,key:d,sep:h,value:g}=u,p=sS.resolveProps(f,{indicator:"explicit-key-ind",next:d??h?.[0],offset:c,onError:s,parentIndent:n.indent,startOnNewline:!0}),_=!p.found;if(_){if(d&&(d.type==="block-seq"?s(c,"BLOCK_AS_IMPLICIT_KEY","A block sequence may not be used as an implicit map key"):"indent"in d&&d.indent!==n.indent&&s(c,"BAD_INDENT",oS)),!p.anchor&&!p.tag&&!h){l=p.end,p.comment&&(a.comment?a.comment+=`
`+p.comment:a.comment=p.comment);continue}(p.newlineAfterProp||bD.containsNewline(d))&&s(d??f[f.length-1],"MULTILINE_IMPLICIT_KEY","Implicit keys need to be on a single line")}else p.found?.indent!==n.indent&&s(c,"BAD_INDENT",oS);r.atKey=!0;let y=p.end,w=d?t(r,d,p,s):e(r,y,f,null,p,s);r.schema.compat&&iS.flowIndentCheck(n.indent,d,s),r.atKey=!1,ID.mapIncludes(r,a.items,w)&&s(y,"DUPLICATE_KEY","Map keys must be unique");let b=sS.resolveProps(h??[],{indicator:"map-value-ind",next:g,offset:w.range[2],onError:s,parentIndent:n.indent,startOnNewline:!d||d.type==="block-scalar"});if(c=b.end,b.found){_&&(g?.type==="block-map"&&!b.hasNewline&&s(c,"BLOCK_AS_IMPLICIT_KEY","Nested mappings are not allowed in compact mappings"),r.options.strict&&p.start<b.found.offset-1024&&s(w.range,"KEY_OVER_1024_CHARS","The : indicator must be at most 1024 chars after the start of an implicit block mapping key"));let I=g?t(r,g,b,s):e(r,c,h,null,b,s);r.schema.compat&&iS.flowIndentCheck(n.indent,g,s),c=I.range[2];let A=new nS.Pair(w,I);r.options.keepSourceTokens&&(A.srcToken=u),a.items.push(A)}else{_&&s(w.range,"MISSING_CHAR","Implicit map keys need to be followed by map values"),b.comment&&(w.comment?w.comment+=`
`+b.comment:w.comment=b.comment);let I=new nS.Pair(w);r.options.keepSourceTokens&&(I.srcToken=u),a.items.push(I)}}return l&&l<c&&s(l,"IMPOSSIBLE","Map comment with trailing content"),a.range=[n.offset,c,l??c],a}aS.resolveBlockMap=AD});var uS=m(lS=>{"use strict";var $D=Ar(),LD=di(),ND=gh();function OD({composeNode:t,composeEmptyNode:e},r,n,s,i){let o=i?.nodeClass??$D.YAMLSeq,a=new o(r.schema);r.atRoot&&(r.atRoot=!1),r.atKey&&(r.atKey=!1);let c=n.offset,l=null;for(let{start:u,value:f}of n.items){let d=LD.resolveProps(u,{indicator:"seq-item-ind",next:f,offset:c,onError:s,parentIndent:n.indent,startOnNewline:!0});if(!d.found)if(d.anchor||d.tag||f)f?.type==="block-seq"?s(d.end,"BAD_INDENT","All sequence items must start at the same column"):s(c,"MISSING_CHAR","Sequence item without - indicator");else{l=d.end,d.comment&&(a.comment=d.comment);continue}let h=f?t(r,f,d,s):e(r,d.end,u,null,d,s);r.schema.compat&&ND.flowIndentCheck(n.indent,f,s),c=h.range[2],a.items.push(h)}return a.range=[n.offset,c,l??c],a}lS.resolveBlockSeq=OD});var Dn=m(fS=>{"use strict";function PD(t,e,r,n){let s="";if(t){let i=!1,o="";for(let a of t){let{source:c,type:l}=a;switch(l){case"space":i=!0;break;case"comment":{r&&!i&&n(a,"MISSING_CHAR","Comments must be separated from other tokens by white space characters");let u=c.substring(1)||" ";s?s+=o+u:s=u,o="";break}case"newline":s&&(o+=c),i=!0;break;default:n(a,"UNEXPECTED_TOKEN",`Unexpected ${l} at node end`)}e+=c.length}}return{comment:s,offset:e}}fS.resolveEnd=PD});var mS=m(pS=>{"use strict";var RD=ie(),CD=Tr(),dS=Ir(),kD=Ar(),qD=Dn(),hS=di(),MD=nc(),xD=yh(),Eh="Block collections are not allowed within flow collections",vh=t=>t&&(t.type==="block-map"||t.type==="block-seq");function jD({composeNode:t,composeEmptyNode:e},r,n,s,i){let o=n.start.source==="{",a=o?"flow map":"flow sequence",c=i?.nodeClass??(o?dS.YAMLMap:kD.YAMLSeq),l=new c(r.schema);l.flow=!0;let u=r.atRoot;u&&(r.atRoot=!1),r.atKey&&(r.atKey=!1);let f=n.offset+n.start.source.length;for(let _=0;_<n.items.length;++_){let y=n.items[_],{start:w,key:b,sep:I,value:A}=y,C=hS.resolveProps(w,{flow:a,indicator:"explicit-key-ind",next:b??I?.[0],offset:f,onError:s,parentIndent:n.indent,startOnNewline:!1});if(!C.found){if(!C.anchor&&!C.tag&&!I&&!A){_===0&&C.comma?s(C.comma,"UNEXPECTED_TOKEN",`Unexpected , in ${a}`):_<n.items.length-1&&s(C.start,"UNEXPECTED_TOKEN",`Unexpected empty item in ${a}`),C.comment&&(l.comment?l.comment+=`
`+C.comment:l.comment=C.comment),f=C.end;continue}!o&&r.options.strict&&MD.containsNewline(b)&&s(b,"MULTILINE_IMPLICIT_KEY","Implicit keys of flow sequence pairs need to be on a single line")}if(_===0)C.comma&&s(C.comma,"UNEXPECTED_TOKEN",`Unexpected , in ${a}`);else if(C.comma||s(C.start,"MISSING_CHAR",`Missing , between ${a} items`),C.comment){let B="";e:for(let P of w)switch(P.type){case"comma":case"space":break;case"comment":B=P.source.substring(1);break e;default:break e}if(B){let P=l.items[l.items.length-1];RD.isPair(P)&&(P=P.value??P.key),P.comment?P.comment+=`
`+B:P.comment=B,C.comment=C.comment.substring(B.length+1)}}if(!o&&!I&&!C.found){let B=A?t(r,A,C,s):e(r,C.end,I,null,C,s);l.items.push(B),f=B.range[2],vh(A)&&s(B.range,"BLOCK_IN_FLOW",Eh)}else{r.atKey=!0;let B=C.end,P=b?t(r,b,C,s):e(r,B,w,null,C,s);vh(b)&&s(P.range,"BLOCK_IN_FLOW",Eh),r.atKey=!1;let N=hS.resolveProps(I??[],{flow:a,indicator:"map-value-ind",next:A,offset:P.range[2],onError:s,parentIndent:n.indent,startOnNewline:!1});if(N.found){if(!o&&!C.found&&r.options.strict){if(I)for(let F of I){if(F===N.found)break;if(F.type==="newline"){s(F,"MULTILINE_IMPLICIT_KEY","Implicit keys of flow sequence pairs need to be on a single line");break}}C.start<N.found.offset-1024&&s(N.found,"KEY_OVER_1024_CHARS","The : indicator must be at most 1024 chars after the start of an implicit flow sequence key")}}else A&&("source"in A&&A.source?.[0]===":"?s(A,"MISSING_CHAR",`Missing space after : in ${a}`):s(N.start,"MISSING_CHAR",`Missing , or : between ${a} items`));let D=A?t(r,A,N,s):N.found?e(r,N.end,I,null,N,s):null;D?vh(A)&&s(D.range,"BLOCK_IN_FLOW",Eh):N.comment&&(P.comment?P.comment+=`
`+N.comment:P.comment=N.comment);let V=new CD.Pair(P,D);if(r.options.keepSourceTokens&&(V.srcToken=y),o){let F=l;xD.mapIncludes(r,F.items,P)&&s(B,"DUPLICATE_KEY","Map keys must be unique"),F.items.push(V)}else{let F=new dS.YAMLMap(r.schema);F.flow=!0,F.items.push(V);let re=(D??P).range;F.range=[P.range[0],re[1],re[2]],l.items.push(F)}f=D?D.range[2]:N.end}}let d=o?"}":"]",[h,...g]=n.end,p=f;if(h?.source===d)p=h.offset+h.source.length;else{let _=a[0].toUpperCase()+a.substring(1),y=u?`${_} must end with a ${d}`:`${_} in block collection must be sufficiently indented and end with a ${d}`;s(f,u?"MISSING_CHAR":"BAD_INDENT",y),h&&h.source.length!==1&&g.unshift(h)}if(g.length>0){let _=qD.resolveEnd(g,p,r.options.strict,s);_.comment&&(l.comment?l.comment+=`
`+_.comment:l.comment=_.comment),l.range=[n.offset,p,_.offset]}else l.range=[n.offset,p,p];return l}pS.resolveFlowCollection=jD});var gS=m(_S=>{"use strict";var DD=ie(),FD=be(),UD=Ir(),VD=Ar(),BD=cS(),HD=uS(),WD=mS();function wh(t,e,r,n,s,i){let o=r.type==="block-map"?BD.resolveBlockMap(t,e,r,n,i):r.type==="block-seq"?HD.resolveBlockSeq(t,e,r,n,i):WD.resolveFlowCollection(t,e,r,n,i),a=o.constructor;return s==="!"||s===a.tagName?(o.tag=a.tagName,o):(s&&(o.tag=s),o)}function KD(t,e,r,n,s){let i=n.tag,o=i?e.directives.tagName(i.source,d=>s(i,"TAG_RESOLVE_FAILED",d)):null;if(r.type==="block-seq"){let{anchor:d,newlineAfterProp:h}=n,g=d&&i?d.offset>i.offset?d:i:d??i;g&&(!h||h.offset<g.offset)&&s(g,"MISSING_CHAR","Missing newline after block sequence props")}let a=r.type==="block-map"?"map":r.type==="block-seq"?"seq":r.start.source==="{"?"map":"seq";if(!i||!o||o==="!"||o===UD.YAMLMap.tagName&&a==="map"||o===VD.YAMLSeq.tagName&&a==="seq")return wh(t,e,r,s,o);let c=e.schema.tags.find(d=>d.tag===o&&d.collection===a);if(!c){let d=e.schema.knownTags[o];if(d?.collection===a)e.schema.tags.push(Object.assign({},d,{default:!1})),c=d;else return d?s(i,"BAD_COLLECTION_TYPE",`${d.tag} used for ${a} collection, but expects ${d.collection??"scalar"}`,!0):s(i,"TAG_RESOLVE_FAILED",`Unresolved tag: ${o}`,!0),wh(t,e,r,s,o)}let l=wh(t,e,r,s,o,c),u=c.resolve?.(l,d=>s(i,"TAG_RESOLVE_FAILED",d),e.options)??l,f=DD.isNode(u)?u:new FD.Scalar(u);return f.range=l.range,f.tag=o,c?.format&&(f.format=c.format),f}_S.composeCollection=KD});var Th=m(yS=>{"use strict";var Sh=be();function GD(t,e,r){let n=e.offset,s=zD(e,t.options.strict,r);if(!s)return{value:"",type:null,comment:"",range:[n,n,n]};let i=s.mode===">"?Sh.Scalar.BLOCK_FOLDED:Sh.Scalar.BLOCK_LITERAL,o=e.source?JD(e.source):[],a=o.length;for(let p=o.length-1;p>=0;--p){let _=o[p][1];if(_===""||_==="\r")a=p;else break}if(a===0){let p=s.chomp==="+"&&o.length>0?`
`.repeat(Math.max(1,o.length-1)):"",_=n+s.length;return e.source&&(_+=e.source.length),{value:p,type:i,comment:s.comment,range:[n,_,_]}}let c=e.indent+s.indent,l=e.offset+s.length,u=0;for(let p=0;p<a;++p){let[_,y]=o[p];if(y===""||y==="\r")s.indent===0&&_.length>c&&(c=_.length);else{_.length<c&&r(l+_.length,"MISSING_CHAR","Block scalars with more-indented leading empty lines must use an explicit indentation indicator"),s.indent===0&&(c=_.length),u=p,c===0&&!t.atRoot&&r(l,"BAD_INDENT","Block scalar values in collections must be indented");break}l+=_.length+y.length+1}for(let p=o.length-1;p>=a;--p)o[p][0].length>c&&(a=p+1);let f="",d="",h=!1;for(let p=0;p<u;++p)f+=o[p][0].slice(c)+`
`;for(let p=u;p<a;++p){let[_,y]=o[p];l+=_.length+y.length+1;let w=y[y.length-1]==="\r";if(w&&(y=y.slice(0,-1)),y&&_.length<c){let I=`Block scalar lines must not be less indented than their ${s.indent?"explicit indentation indicator":"first line"}`;r(l-y.length-(w?2:1),"BAD_INDENT",I),_=""}i===Sh.Scalar.BLOCK_LITERAL?(f+=d+_.slice(c)+y,d=`
`):_.length>c||y[0]==="	"?(d===" "?d=`
`:!h&&d===`
`&&(d=`

`),f+=d+_.slice(c)+y,d=`
`,h=!0):y===""?d===`
`?f+=`
`:d=`
`:(f+=d+y,d=" ",h=!1)}switch(s.chomp){case"-":break;case"+":for(let p=a;p<o.length;++p)f+=`
`+o[p][0].slice(c);f[f.length-1]!==`
`&&(f+=`
`);break;default:f+=`
`}let g=n+s.length+e.source.length;return{value:f,type:i,comment:s.comment,range:[n,g,g]}}function zD({offset:t,props:e},r,n){if(e[0].type!=="block-scalar-header")return n(e[0],"IMPOSSIBLE","Block scalar header not found"),null;let{source:s}=e[0],i=s[0],o=0,a="",c=-1;for(let d=1;d<s.length;++d){let h=s[d];if(!a&&(h==="-"||h==="+"))a=h;else{let g=Number(h);!o&&g?o=g:c===-1&&(c=t+d)}}c!==-1&&n(c,"UNEXPECTED_TOKEN",`Block scalar header includes extra characters: ${s}`);let l=!1,u="",f=s.length;for(let d=1;d<e.length;++d){let h=e[d];switch(h.type){case"space":l=!0;case"newline":f+=h.source.length;break;case"comment":r&&!l&&n(h,"MISSING_CHAR","Comments must be separated from other tokens by white space characters"),f+=h.source.length,u=h.source.substring(1);break;case"error":n(h,"UNEXPECTED_TOKEN",h.message),f+=h.source.length;break;default:{let g=`Unexpected token in block scalar header: ${h.type}`;n(h,"UNEXPECTED_TOKEN",g);let p=h.source;p&&typeof p=="string"&&(f+=p.length)}}}return{mode:i,indent:o,chomp:a,comment:u,length:f}}function JD(t){let e=t.split(/\n( *)/),r=e[0],n=r.match(/^( *)/),i=[n?.[1]?[n[1],r.slice(n[1].length)]:["",r]];for(let o=1;o<e.length;o+=2)i.push([e[o],e[o+1]]);return i}yS.resolveBlockScalar=GD});var Ih=m(vS=>{"use strict";var bh=be(),YD=Dn();function XD(t,e,r){let{offset:n,type:s,source:i,end:o}=t,a,c,l=(d,h,g)=>r(n+d,h,g);switch(s){case"scalar":a=bh.Scalar.PLAIN,c=QD(i,l);break;case"single-quoted-scalar":a=bh.Scalar.QUOTE_SINGLE,c=ZD(i,l);break;case"double-quoted-scalar":a=bh.Scalar.QUOTE_DOUBLE,c=eF(i,l);break;default:return r(t,"UNEXPECTED_TOKEN",`Expected a flow scalar value, but found: ${s}`),{value:"",type:null,comment:"",range:[n,n+i.length,n+i.length]}}let u=n+i.length,f=YD.resolveEnd(o,u,e,r);return{value:c,type:a,comment:f.comment,range:[n,u,f.offset]}}function QD(t,e){let r="";switch(t[0]){case"	":r="a tab character";break;case",":r="flow indicator character ,";break;case"%":r="directive indicator character %";break;case"|":case">":{r=`block scalar indicator ${t[0]}`;break}case"@":case"`":{r=`reserved character ${t[0]}`;break}}return r&&e(0,"BAD_SCALAR_START",`Plain value cannot start with ${r}`),ES(t)}function ZD(t,e){return(t[t.length-1]!=="'"||t.length===1)&&e(t.length,"MISSING_CHAR","Missing closing 'quote"),ES(t.slice(1,-1)).replace(/''/g,"'")}function ES(t){let e,r;try{e=new RegExp(`(.*?)(?<![ 	])[ 	]*\r?
`,"sy"),r=new RegExp(`[ 	]*(.*?)(?:(?<![ 	])[ 	]*)?\r?
`,"sy")}catch{e=/(.*?)[ \t]*\r?\n/sy,r=/[ \t]*(.*?)[ \t]*\r?\n/sy}let n=e.exec(t);if(!n)return t;let s=n[1],i=" ",o=e.lastIndex;for(r.lastIndex=o;n=r.exec(t);)n[1]===""?i===`
`?s+=i:i=`
`:(s+=i+n[1],i=" "),o=r.lastIndex;let a=/[ \t]*(.*)/sy;return a.lastIndex=o,n=a.exec(t),s+i+(n?.[1]??"")}function eF(t,e){let r="";for(let n=1;n<t.length-1;++n){let s=t[n];if(!(s==="\r"&&t[n+1]===`
`))if(s===`
`){let{fold:i,offset:o}=tF(t,n);r+=i,n=o}else if(s==="\\"){let i=t[++n],o=rF[i];if(o)r+=o;else if(i===`
`)for(i=t[n+1];i===" "||i==="	";)i=t[++n+1];else if(i==="\r"&&t[n+1]===`
`)for(i=t[++n+1];i===" "||i==="	";)i=t[++n+1];else if(i==="x"||i==="u"||i==="U"){let a={x:2,u:4,U:8}[i];r+=nF(t,n+1,a,e),n+=a}else{let a=t.substr(n-1,2);e(n-1,"BAD_DQ_ESCAPE",`Invalid escape sequence ${a}`),r+=a}}else if(s===" "||s==="	"){let i=n,o=t[n+1];for(;o===" "||o==="	";)o=t[++n+1];o!==`
`&&!(o==="\r"&&t[n+2]===`
`)&&(r+=n>i?t.slice(i,n+1):s)}else r+=s}return(t[t.length-1]!=='"'||t.length===1)&&e(t.length,"MISSING_CHAR",'Missing closing "quote'),r}function tF(t,e){let r="",n=t[e+1];for(;(n===" "||n==="	"||n===`
`||n==="\r")&&!(n==="\r"&&t[e+2]!==`
`);)n===`
`&&(r+=`
`),e+=1,n=t[e+1];return r||(r=" "),{fold:r,offset:e}}var rF={0:"\0",a:"\x07",b:"\b",e:"\x1B",f:"\f",n:`
`,r:"\r",t:"	",v:"\v",N:"\x85",_:"\xA0",L:"\u2028",P:"\u2029"," ":" ",'"':'"',"/":"/","\\":"\\","	":"	"};function nF(t,e,r,n){let s=t.substr(e,r),o=s.length===r&&/^[0-9a-fA-F]+$/.test(s)?parseInt(s,16):NaN;if(isNaN(o)){let a=t.substr(e-2,r+2);return n(e-2,"BAD_DQ_ESCAPE",`Invalid escape sequence ${a}`),a}return String.fromCodePoint(o)}vS.resolveFlowScalar=XD});var TS=m(SS=>{"use strict";var Jr=ie(),wS=be(),sF=Th(),iF=Ih();function oF(t,e,r,n){let{value:s,type:i,comment:o,range:a}=e.type==="block-scalar"?sF.resolveBlockScalar(t,e,n):iF.resolveFlowScalar(e,t.options.strict,n),c=r?t.directives.tagName(r.source,f=>n(r,"TAG_RESOLVE_FAILED",f)):null,l;t.options.stringKeys&&t.atKey?l=t.schema[Jr.SCALAR]:c?l=aF(t.schema,s,c,r,n):e.type==="scalar"?l=cF(t,s,e,n):l=t.schema[Jr.SCALAR];let u;try{let f=l.resolve(s,d=>n(r??e,"TAG_RESOLVE_FAILED",d),t.options);u=Jr.isScalar(f)?f:new wS.Scalar(f)}catch(f){let d=f instanceof Error?f.message:String(f);n(r??e,"TAG_RESOLVE_FAILED",d),u=new wS.Scalar(s)}return u.range=a,u.source=s,i&&(u.type=i),c&&(u.tag=c),l.format&&(u.format=l.format),o&&(u.comment=o),u}function aF(t,e,r,n,s){if(r==="!")return t[Jr.SCALAR];let i=[];for(let a of t.tags)if(!a.collection&&a.tag===r)if(a.default&&a.test)i.push(a);else return a;for(let a of i)if(a.test?.test(e))return a;let o=t.knownTags[r];return o&&!o.collection?(t.tags.push(Object.assign({},o,{default:!1,test:void 0})),o):(s(n,"TAG_RESOLVE_FAILED",`Unresolved tag: ${r}`,r!=="tag:yaml.org,2002:str"),t[Jr.SCALAR])}function cF({atKey:t,directives:e,schema:r},n,s,i){let o=r.tags.find(a=>(a.default===!0||t&&a.default==="key")&&a.test?.test(n))||r[Jr.SCALAR];if(r.compat){let a=r.compat.find(c=>c.default&&c.test?.test(n))??r[Jr.SCALAR];if(o.tag!==a.tag){let c=e.tagString(o.tag),l=e.tagString(a.tag),u=`Value may be parsed as either ${c} or ${l}`;i(s,"TAG_RESOLVE_FAILED",u,!0)}}return o}SS.composeScalar=oF});var IS=m(bS=>{"use strict";function lF(t,e,r){if(e){r??(r=e.length);for(let n=r-1;n>=0;--n){let s=e[n];switch(s.type){case"space":case"comment":case"newline":t-=s.source.length;continue}for(s=e[++n];s?.type==="space";)t+=s.source.length,s=e[++n];break}}return t}bS.emptyScalarPosition=lF});var LS=m($h=>{"use strict";var uF=Ws(),fF=ie(),dF=gS(),AS=TS(),hF=Dn(),pF=IS(),mF={composeNode:$S,composeEmptyNode:Ah};function $S(t,e,r,n){let s=t.atKey,{spaceBefore:i,comment:o,anchor:a,tag:c}=r,l,u=!0;switch(e.type){case"alias":l=_F(t,e,n),(a||c)&&n(e,"ALIAS_PROPS","An alias node must not specify any properties");break;case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":case"block-scalar":l=AS.composeScalar(t,e,c,n),a&&(l.anchor=a.source.substring(1));break;case"block-map":case"block-seq":case"flow-collection":l=dF.composeCollection(mF,t,e,r,n),a&&(l.anchor=a.source.substring(1));break;default:{let f=e.type==="error"?e.message:`Unsupported token (type: ${e.type})`;n(e,"UNEXPECTED_TOKEN",f),l=Ah(t,e.offset,void 0,null,r,n),u=!1}}return a&&l.anchor===""&&n(a,"BAD_ALIAS","Anchor cannot be an empty string"),s&&t.options.stringKeys&&(!fF.isScalar(l)||typeof l.value!="string"||l.tag&&l.tag!=="tag:yaml.org,2002:str")&&n(c??e,"NON_STRING_KEY","With stringKeys, all keys must be strings"),i&&(l.spaceBefore=!0),o&&(e.type==="scalar"&&e.source===""?l.comment=o:l.commentBefore=o),t.options.keepSourceTokens&&u&&(l.srcToken=e),l}function Ah(t,e,r,n,{spaceBefore:s,comment:i,anchor:o,tag:a,end:c},l){let u={type:"scalar",offset:pF.emptyScalarPosition(e,r,n),indent:-1,source:""},f=AS.composeScalar(t,u,a,l);return o&&(f.anchor=o.source.substring(1),f.anchor===""&&l(o,"BAD_ALIAS","Anchor cannot be an empty string")),s&&(f.spaceBefore=!0),i&&(f.comment=i,f.range[2]=c),f}function _F({options:t},{offset:e,source:r,end:n},s){let i=new uF.Alias(r.substring(1));i.source===""&&s(e,"BAD_ALIAS","Alias cannot be an empty string"),i.source.endsWith(":")&&s(e+r.length-1,"BAD_ALIAS","Alias ending in : is ambiguous",!0);let o=e+r.length,a=hF.resolveEnd(n,o,t.strict,s);return i.range=[e,o,a.offset],a.comment&&(i.comment=a.comment),i}$h.composeEmptyNode=Ah;$h.composeNode=$S});var PS=m(OS=>{"use strict";var gF=ci(),NS=LS(),yF=Dn(),EF=di();function vF(t,e,{offset:r,start:n,value:s,end:i},o){let a=Object.assign({_directives:e},t),c=new gF.Document(void 0,a),l={atKey:!1,atRoot:!0,directives:c.directives,options:c.options,schema:c.schema},u=EF.resolveProps(n,{indicator:"doc-start",next:s??i?.[0],offset:r,onError:o,parentIndent:0,startOnNewline:!0});u.found&&(c.directives.docStart=!0,s&&(s.type==="block-map"||s.type==="block-seq")&&!u.hasNewline&&o(u.end,"MISSING_CHAR","Block collection cannot start on same line with directives-end marker")),c.contents=s?NS.composeNode(l,s,u,o):NS.composeEmptyNode(l,u.end,n,null,u,o);let f=c.contents.range[2],d=yF.resolveEnd(i,f,!1,o);return d.comment&&(c.comment=d.comment),c.range=[r,f,d.offset],c}OS.composeDoc=vF});var Nh=m(kS=>{"use strict";var wF=Q("process"),SF=pd(),TF=ci(),hi=fi(),RS=ie(),bF=PS(),IF=Dn();function pi(t){if(typeof t=="number")return[t,t+1];if(Array.isArray(t))return t.length===2?t:[t[0],t[1]];let{offset:e,source:r}=t;return[e,e+(typeof r=="string"?r.length:1)]}function CS(t){let e="",r=!1,n=!1;for(let s=0;s<t.length;++s){let i=t[s];switch(i[0]){case"#":e+=(e===""?"":n?`

`:`
`)+(i.substring(1)||" "),r=!0,n=!1;break;case"%":t[s+1]?.[0]!=="#"&&(s+=1),r=!1;break;default:r||(n=!0),r=!1}}return{comment:e,afterEmptyLine:n}}var Lh=class{constructor(e={}){this.doc=null,this.atDirectives=!1,this.prelude=[],this.errors=[],this.warnings=[],this.onError=(r,n,s,i)=>{let o=pi(r);i?this.warnings.push(new hi.YAMLWarning(o,n,s)):this.errors.push(new hi.YAMLParseError(o,n,s))},this.directives=new SF.Directives({version:e.version||"1.2"}),this.options=e}decorate(e,r){let{comment:n,afterEmptyLine:s}=CS(this.prelude);if(n){let i=e.contents;if(r)e.comment=e.comment?`${e.comment}
${n}`:n;else if(s||e.directives.docStart||!i)e.commentBefore=n;else if(RS.isCollection(i)&&!i.flow&&i.items.length>0){let o=i.items[0];RS.isPair(o)&&(o=o.key);let a=o.commentBefore;o.commentBefore=a?`${n}
${a}`:n}else{let o=i.commentBefore;i.commentBefore=o?`${n}
${o}`:n}}r?(Array.prototype.push.apply(e.errors,this.errors),Array.prototype.push.apply(e.warnings,this.warnings)):(e.errors=this.errors,e.warnings=this.warnings),this.prelude=[],this.errors=[],this.warnings=[]}streamInfo(){return{comment:CS(this.prelude).comment,directives:this.directives,errors:this.errors,warnings:this.warnings}}*compose(e,r=!1,n=-1){for(let s of e)yield*this.next(s);yield*this.end(r,n)}*next(e){switch(wF.env.LOG_STREAM&&console.dir(e,{depth:null}),e.type){case"directive":this.directives.add(e.source,(r,n,s)=>{let i=pi(e);i[0]+=r,this.onError(i,"BAD_DIRECTIVE",n,s)}),this.prelude.push(e.source),this.atDirectives=!0;break;case"document":{let r=bF.composeDoc(this.options,this.directives,e,this.onError);this.atDirectives&&!r.directives.docStart&&this.onError(e,"MISSING_CHAR","Missing directives-end/doc-start indicator line"),this.decorate(r,!1),this.doc&&(yield this.doc),this.doc=r,this.atDirectives=!1;break}case"byte-order-mark":case"space":break;case"comment":case"newline":this.prelude.push(e.source);break;case"error":{let r=e.source?`${e.message}: ${JSON.stringify(e.source)}`:e.message,n=new hi.YAMLParseError(pi(e),"UNEXPECTED_TOKEN",r);this.atDirectives||!this.doc?this.errors.push(n):this.doc.errors.push(n);break}case"doc-end":{if(!this.doc){let n="Unexpected doc-end without preceding document";this.errors.push(new hi.YAMLParseError(pi(e),"UNEXPECTED_TOKEN",n));break}this.doc.directives.docEnd=!0;let r=IF.resolveEnd(e.end,e.offset+e.source.length,this.doc.options.strict,this.onError);if(this.decorate(this.doc,!0),r.comment){let n=this.doc.comment;this.doc.comment=n?`${n}
${r.comment}`:r.comment}this.doc.range[2]=r.offset;break}default:this.errors.push(new hi.YAMLParseError(pi(e),"UNEXPECTED_TOKEN",`Unsupported token ${e.type}`))}}*end(e=!1,r=-1){if(this.doc)this.decorate(this.doc,!0),yield this.doc,this.doc=null;else if(e){let n=Object.assign({_directives:this.directives},this.options),s=new TF.Document(void 0,n);this.atDirectives&&this.onError(r,"MISSING_CHAR","Missing directives-end indicator line"),s.range=[0,r,r],this.decorate(s,!1),yield s}}};kS.Composer=Lh});var xS=m(sc=>{"use strict";var AF=Th(),$F=Ih(),LF=fi(),qS=Ys();function NF(t,e=!0,r){if(t){let n=(s,i,o)=>{let a=typeof s=="number"?s:Array.isArray(s)?s[0]:s.offset;if(r)r(a,i,o);else throw new LF.YAMLParseError([a,a+1],i,o)};switch(t.type){case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return $F.resolveFlowScalar(t,e,n);case"block-scalar":return AF.resolveBlockScalar({options:{strict:e}},t,n)}}return null}function OF(t,e){let{implicitKey:r=!1,indent:n,inFlow:s=!1,offset:i=-1,type:o="PLAIN"}=e,a=qS.stringifyString({type:o,value:t},{implicitKey:r,indent:n>0?" ".repeat(n):"",inFlow:s,options:{blockQuote:!0,lineWidth:-1}}),c=e.end??[{type:"newline",offset:-1,indent:n,source:`
`}];switch(a[0]){case"|":case">":{let l=a.indexOf(`
`),u=a.substring(0,l),f=a.substring(l+1)+`
`,d=[{type:"block-scalar-header",offset:i,indent:n,source:u}];return MS(d,c)||d.push({type:"newline",offset:-1,indent:n,source:`
`}),{type:"block-scalar",offset:i,indent:n,props:d,source:f}}case'"':return{type:"double-quoted-scalar",offset:i,indent:n,source:a,end:c};case"'":return{type:"single-quoted-scalar",offset:i,indent:n,source:a,end:c};default:return{type:"scalar",offset:i,indent:n,source:a,end:c}}}function PF(t,e,r={}){let{afterKey:n=!1,implicitKey:s=!1,inFlow:i=!1,type:o}=r,a="indent"in t?t.indent:null;if(n&&typeof a=="number"&&(a+=2),!o)switch(t.type){case"single-quoted-scalar":o="QUOTE_SINGLE";break;case"double-quoted-scalar":o="QUOTE_DOUBLE";break;case"block-scalar":{let l=t.props[0];if(l.type!=="block-scalar-header")throw new Error("Invalid block scalar header");o=l.source[0]===">"?"BLOCK_FOLDED":"BLOCK_LITERAL";break}default:o="PLAIN"}let c=qS.stringifyString({type:o,value:e},{implicitKey:s||a===null,indent:a!==null&&a>0?" ".repeat(a):"",inFlow:i,options:{blockQuote:!0,lineWidth:-1}});switch(c[0]){case"|":case">":RF(t,c);break;case'"':Oh(t,c,"double-quoted-scalar");break;case"'":Oh(t,c,"single-quoted-scalar");break;default:Oh(t,c,"scalar")}}function RF(t,e){let r=e.indexOf(`
`),n=e.substring(0,r),s=e.substring(r+1)+`
`;if(t.type==="block-scalar"){let i=t.props[0];if(i.type!=="block-scalar-header")throw new Error("Invalid block scalar header");i.source=n,t.source=s}else{let{offset:i}=t,o="indent"in t?t.indent:-1,a=[{type:"block-scalar-header",offset:i,indent:o,source:n}];MS(a,"end"in t?t.end:void 0)||a.push({type:"newline",offset:-1,indent:o,source:`
`});for(let c of Object.keys(t))c!=="type"&&c!=="offset"&&delete t[c];Object.assign(t,{type:"block-scalar",indent:o,props:a,source:s})}}function MS(t,e){if(e)for(let r of e)switch(r.type){case"space":case"comment":t.push(r);break;case"newline":return t.push(r),!0}return!1}function Oh(t,e,r){switch(t.type){case"scalar":case"double-quoted-scalar":case"single-quoted-scalar":t.type=r,t.source=e;break;case"block-scalar":{let n=t.props.slice(1),s=e.length;t.props[0].type==="block-scalar-header"&&(s-=t.props[0].source.length);for(let i of n)i.offset+=s;delete t.props,Object.assign(t,{type:r,source:e,end:n});break}case"block-map":case"block-seq":{let s={type:"newline",offset:t.offset+e.length,indent:t.indent,source:`
`};delete t.items,Object.assign(t,{type:r,source:e,end:[s]});break}default:{let n="indent"in t?t.indent:-1,s="end"in t&&Array.isArray(t.end)?t.end.filter(i=>i.type==="space"||i.type==="comment"||i.type==="newline"):[];for(let i of Object.keys(t))i!=="type"&&i!=="offset"&&delete t[i];Object.assign(t,{type:r,indent:n,source:e,end:s})}}}sc.createScalarToken=OF;sc.resolveAsScalar=NF;sc.setScalarValue=PF});var DS=m(jS=>{"use strict";var CF=t=>"type"in t?oc(t):ic(t);function oc(t){switch(t.type){case"block-scalar":{let e="";for(let r of t.props)e+=oc(r);return e+t.source}case"block-map":case"block-seq":{let e="";for(let r of t.items)e+=ic(r);return e}case"flow-collection":{let e=t.start.source;for(let r of t.items)e+=ic(r);for(let r of t.end)e+=r.source;return e}case"document":{let e=ic(t);if(t.end)for(let r of t.end)e+=r.source;return e}default:{let e=t.source;if("end"in t&&t.end)for(let r of t.end)e+=r.source;return e}}}function ic({start:t,key:e,sep:r,value:n}){let s="";for(let i of t)s+=i.source;if(e&&(s+=oc(e)),r)for(let i of r)s+=i.source;return n&&(s+=oc(n)),s}jS.stringify=CF});var BS=m(VS=>{"use strict";var Ph=Symbol("break visit"),kF=Symbol("skip children"),FS=Symbol("remove item");function Yr(t,e){"type"in t&&t.type==="document"&&(t={start:t.start,value:t.value}),US(Object.freeze([]),t,e)}Yr.BREAK=Ph;Yr.SKIP=kF;Yr.REMOVE=FS;Yr.itemAtPath=(t,e)=>{let r=t;for(let[n,s]of e){let i=r?.[n];if(i&&"items"in i)r=i.items[s];else return}return r};Yr.parentCollection=(t,e)=>{let r=Yr.itemAtPath(t,e.slice(0,-1)),n=e[e.length-1][0],s=r?.[n];if(s&&"items"in s)return s;throw new Error("Parent collection not found")};function US(t,e,r){let n=r(e,t);if(typeof n=="symbol")return n;for(let s of["key","value"]){let i=e[s];if(i&&"items"in i){for(let o=0;o<i.items.length;++o){let a=US(Object.freeze(t.concat([[s,o]])),i.items[o],r);if(typeof a=="number")o=a-1;else{if(a===Ph)return Ph;a===FS&&(i.items.splice(o,1),o-=1)}}typeof n=="function"&&s==="key"&&(n=n(e,t))}}return typeof n=="function"?n(e,t):n}VS.visit=Yr});var ac=m(ot=>{"use strict";var Rh=xS(),qF=DS(),MF=BS(),Ch="\uFEFF",kh="",qh="",Mh="",xF=t=>!!t&&"items"in t,jF=t=>!!t&&(t.type==="scalar"||t.type==="single-quoted-scalar"||t.type==="double-quoted-scalar"||t.type==="block-scalar");function DF(t){switch(t){case Ch:return"<BOM>";case kh:return"<DOC>";case qh:return"<FLOW_END>";case Mh:return"<SCALAR>";default:return JSON.stringify(t)}}function FF(t){switch(t){case Ch:return"byte-order-mark";case kh:return"doc-mode";case qh:return"flow-error-end";case Mh:return"scalar";case"---":return"doc-start";case"...":return"doc-end";case"":case`
`:case`\r
`:return"newline";case"-":return"seq-item-ind";case"?":return"explicit-key-ind";case":":return"map-value-ind";case"{":return"flow-map-start";case"}":return"flow-map-end";case"[":return"flow-seq-start";case"]":return"flow-seq-end";case",":return"comma"}switch(t[0]){case" ":case"	":return"space";case"#":return"comment";case"%":return"directive-line";case"*":return"alias";case"&":return"anchor";case"!":return"tag";case"'":return"single-quoted-scalar";case'"':return"double-quoted-scalar";case"|":case">":return"block-scalar-header"}return null}ot.createScalarToken=Rh.createScalarToken;ot.resolveAsScalar=Rh.resolveAsScalar;ot.setScalarValue=Rh.setScalarValue;ot.stringify=qF.stringify;ot.visit=MF.visit;ot.BOM=Ch;ot.DOCUMENT=kh;ot.FLOW_END=qh;ot.SCALAR=Mh;ot.isCollection=xF;ot.isScalar=jF;ot.prettyToken=DF;ot.tokenType=FF});var Dh=m(WS=>{"use strict";var mi=ac();function Lt(t){switch(t){case void 0:case" ":case`
`:case"\r":case"	":return!0;default:return!1}}var HS=new Set("0123456789ABCDEFabcdef"),UF=new Set("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()"),cc=new Set(",[]{}"),VF=new Set(` ,[]{}
\r	`),xh=t=>!t||VF.has(t),jh=class{constructor(){this.atEnd=!1,this.blockScalarIndent=-1,this.blockScalarKeep=!1,this.buffer="",this.flowKey=!1,this.flowLevel=0,this.indentNext=0,this.indentValue=0,this.lineEndPos=null,this.next=null,this.pos=0}*lex(e,r=!1){if(e){if(typeof e!="string")throw TypeError("source is not a string");this.buffer=this.buffer?this.buffer+e:e,this.lineEndPos=null}this.atEnd=!r;let n=this.next??"stream";for(;n&&(r||this.hasChars(1));)n=yield*this.parseNext(n)}atLineEnd(){let e=this.pos,r=this.buffer[e];for(;r===" "||r==="	";)r=this.buffer[++e];return!r||r==="#"||r===`
`?!0:r==="\r"?this.buffer[e+1]===`
`:!1}charAt(e){return this.buffer[this.pos+e]}continueScalar(e){let r=this.buffer[e];if(this.indentNext>0){let n=0;for(;r===" ";)r=this.buffer[++n+e];if(r==="\r"){let s=this.buffer[n+e+1];if(s===`
`||!s&&!this.atEnd)return e+n+1}return r===`
`||n>=this.indentNext||!r&&!this.atEnd?e+n:-1}if(r==="-"||r==="."){let n=this.buffer.substr(e,3);if((n==="---"||n==="...")&&Lt(this.buffer[e+3]))return-1}return e}getLine(){let e=this.lineEndPos;return(typeof e!="number"||e!==-1&&e<this.pos)&&(e=this.buffer.indexOf(`
`,this.pos),this.lineEndPos=e),e===-1?this.atEnd?this.buffer.substring(this.pos):null:(this.buffer[e-1]==="\r"&&(e-=1),this.buffer.substring(this.pos,e))}hasChars(e){return this.pos+e<=this.buffer.length}setNext(e){return this.buffer=this.buffer.substring(this.pos),this.pos=0,this.lineEndPos=null,this.next=e,null}peek(e){return this.buffer.substr(this.pos,e)}*parseNext(e){switch(e){case"stream":return yield*this.parseStream();case"line-start":return yield*this.parseLineStart();case"block-start":return yield*this.parseBlockStart();case"doc":return yield*this.parseDocument();case"flow":return yield*this.parseFlowCollection();case"quoted-scalar":return yield*this.parseQuotedScalar();case"block-scalar":return yield*this.parseBlockScalar();case"plain-scalar":return yield*this.parsePlainScalar()}}*parseStream(){let e=this.getLine();if(e===null)return this.setNext("stream");if(e[0]===mi.BOM&&(yield*this.pushCount(1),e=e.substring(1)),e[0]==="%"){let r=e.length,n=e.indexOf("#");for(;n!==-1;){let i=e[n-1];if(i===" "||i==="	"){r=n-1;break}else n=e.indexOf("#",n+1)}for(;;){let i=e[r-1];if(i===" "||i==="	")r-=1;else break}let s=(yield*this.pushCount(r))+(yield*this.pushSpaces(!0));return yield*this.pushCount(e.length-s),this.pushNewline(),"stream"}if(this.atLineEnd()){let r=yield*this.pushSpaces(!0);return yield*this.pushCount(e.length-r),yield*this.pushNewline(),"stream"}return yield mi.DOCUMENT,yield*this.parseLineStart()}*parseLineStart(){let e=this.charAt(0);if(!e&&!this.atEnd)return this.setNext("line-start");if(e==="-"||e==="."){if(!this.atEnd&&!this.hasChars(4))return this.setNext("line-start");let r=this.peek(3);if((r==="---"||r==="...")&&Lt(this.charAt(3)))return yield*this.pushCount(3),this.indentValue=0,this.indentNext=0,r==="---"?"doc":"stream"}return this.indentValue=yield*this.pushSpaces(!1),this.indentNext>this.indentValue&&!Lt(this.charAt(1))&&(this.indentNext=this.indentValue),yield*this.parseBlockStart()}*parseBlockStart(){let[e,r]=this.peek(2);if(!r&&!this.atEnd)return this.setNext("block-start");if((e==="-"||e==="?"||e===":")&&Lt(r)){let n=(yield*this.pushCount(1))+(yield*this.pushSpaces(!0));return this.indentNext=this.indentValue+1,this.indentValue+=n,yield*this.parseBlockStart()}return"doc"}*parseDocument(){yield*this.pushSpaces(!0);let e=this.getLine();if(e===null)return this.setNext("doc");let r=yield*this.pushIndicators();switch(e[r]){case"#":yield*this.pushCount(e.length-r);case void 0:return yield*this.pushNewline(),yield*this.parseLineStart();case"{":case"[":return yield*this.pushCount(1),this.flowKey=!1,this.flowLevel=1,"flow";case"}":case"]":return yield*this.pushCount(1),"doc";case"*":return yield*this.pushUntil(xh),"doc";case'"':case"'":return yield*this.parseQuotedScalar();case"|":case">":return r+=yield*this.parseBlockScalarHeader(),r+=yield*this.pushSpaces(!0),yield*this.pushCount(e.length-r),yield*this.pushNewline(),yield*this.parseBlockScalar();default:return yield*this.parsePlainScalar()}}*parseFlowCollection(){let e,r,n=-1;do e=yield*this.pushNewline(),e>0?(r=yield*this.pushSpaces(!1),this.indentValue=n=r):r=0,r+=yield*this.pushSpaces(!0);while(e+r>0);let s=this.getLine();if(s===null)return this.setNext("flow");if((n!==-1&&n<this.indentNext&&s[0]!=="#"||n===0&&(s.startsWith("---")||s.startsWith("..."))&&Lt(s[3]))&&!(n===this.indentNext-1&&this.flowLevel===1&&(s[0]==="]"||s[0]==="}")))return this.flowLevel=0,yield mi.FLOW_END,yield*this.parseLineStart();let i=0;for(;s[i]===",";)i+=yield*this.pushCount(1),i+=yield*this.pushSpaces(!0),this.flowKey=!1;switch(i+=yield*this.pushIndicators(),s[i]){case void 0:return"flow";case"#":return yield*this.pushCount(s.length-i),"flow";case"{":case"[":return yield*this.pushCount(1),this.flowKey=!1,this.flowLevel+=1,"flow";case"}":case"]":return yield*this.pushCount(1),this.flowKey=!0,this.flowLevel-=1,this.flowLevel?"flow":"doc";case"*":return yield*this.pushUntil(xh),"flow";case'"':case"'":return this.flowKey=!0,yield*this.parseQuotedScalar();case":":{let o=this.charAt(1);if(this.flowKey||Lt(o)||o===",")return this.flowKey=!1,yield*this.pushCount(1),yield*this.pushSpaces(!0),"flow"}default:return this.flowKey=!1,yield*this.parsePlainScalar()}}*parseQuotedScalar(){let e=this.charAt(0),r=this.buffer.indexOf(e,this.pos+1);if(e==="'")for(;r!==-1&&this.buffer[r+1]==="'";)r=this.buffer.indexOf("'",r+2);else for(;r!==-1;){let i=0;for(;this.buffer[r-1-i]==="\\";)i+=1;if(i%2===0)break;r=this.buffer.indexOf('"',r+1)}let n=this.buffer.substring(0,r),s=n.indexOf(`
`,this.pos);if(s!==-1){for(;s!==-1;){let i=this.continueScalar(s+1);if(i===-1)break;s=n.indexOf(`
`,i)}s!==-1&&(r=s-(n[s-1]==="\r"?2:1))}if(r===-1){if(!this.atEnd)return this.setNext("quoted-scalar");r=this.buffer.length}return yield*this.pushToIndex(r+1,!1),this.flowLevel?"flow":"doc"}*parseBlockScalarHeader(){this.blockScalarIndent=-1,this.blockScalarKeep=!1;let e=this.pos;for(;;){let r=this.buffer[++e];if(r==="+")this.blockScalarKeep=!0;else if(r>"0"&&r<="9")this.blockScalarIndent=Number(r)-1;else if(r!=="-")break}return yield*this.pushUntil(r=>Lt(r)||r==="#")}*parseBlockScalar(){let e=this.pos-1,r=0,n;e:for(let i=this.pos;n=this.buffer[i];++i)switch(n){case" ":r+=1;break;case`
`:e=i,r=0;break;case"\r":{let o=this.buffer[i+1];if(!o&&!this.atEnd)return this.setNext("block-scalar");if(o===`
`)break}default:break e}if(!n&&!this.atEnd)return this.setNext("block-scalar");if(r>=this.indentNext){this.blockScalarIndent===-1?this.indentNext=r:this.indentNext=this.blockScalarIndent+(this.indentNext===0?1:this.indentNext);do{let i=this.continueScalar(e+1);if(i===-1)break;e=this.buffer.indexOf(`
`,i)}while(e!==-1);if(e===-1){if(!this.atEnd)return this.setNext("block-scalar");e=this.buffer.length}}let s=e+1;for(n=this.buffer[s];n===" ";)n=this.buffer[++s];if(n==="	"){for(;n==="	"||n===" "||n==="\r"||n===`
`;)n=this.buffer[++s];e=s-1}else if(!this.blockScalarKeep)do{let i=e-1,o=this.buffer[i];o==="\r"&&(o=this.buffer[--i]);let a=i;for(;o===" ";)o=this.buffer[--i];if(o===`
`&&i>=this.pos&&i+1+r>a)e=i;else break}while(!0);return yield mi.SCALAR,yield*this.pushToIndex(e+1,!0),yield*this.parseLineStart()}*parsePlainScalar(){let e=this.flowLevel>0,r=this.pos-1,n=this.pos-1,s;for(;s=this.buffer[++n];)if(s===":"){let i=this.buffer[n+1];if(Lt(i)||e&&cc.has(i))break;r=n}else if(Lt(s)){let i=this.buffer[n+1];if(s==="\r"&&(i===`
`?(n+=1,s=`
`,i=this.buffer[n+1]):r=n),i==="#"||e&&cc.has(i))break;if(s===`
`){let o=this.continueScalar(n+1);if(o===-1)break;n=Math.max(n,o-2)}}else{if(e&&cc.has(s))break;r=n}return!s&&!this.atEnd?this.setNext("plain-scalar"):(yield mi.SCALAR,yield*this.pushToIndex(r+1,!0),e?"flow":"doc")}*pushCount(e){return e>0?(yield this.buffer.substr(this.pos,e),this.pos+=e,e):0}*pushToIndex(e,r){let n=this.buffer.slice(this.pos,e);return n?(yield n,this.pos+=n.length,n.length):(r&&(yield""),0)}*pushIndicators(){switch(this.charAt(0)){case"!":return(yield*this.pushTag())+(yield*this.pushSpaces(!0))+(yield*this.pushIndicators());case"&":return(yield*this.pushUntil(xh))+(yield*this.pushSpaces(!0))+(yield*this.pushIndicators());case"-":case"?":case":":{let e=this.flowLevel>0,r=this.charAt(1);if(Lt(r)||e&&cc.has(r))return e?this.flowKey&&(this.flowKey=!1):this.indentNext=this.indentValue+1,(yield*this.pushCount(1))+(yield*this.pushSpaces(!0))+(yield*this.pushIndicators())}}return 0}*pushTag(){if(this.charAt(1)==="<"){let e=this.pos+2,r=this.buffer[e];for(;!Lt(r)&&r!==">";)r=this.buffer[++e];return yield*this.pushToIndex(r===">"?e+1:e,!1)}else{let e=this.pos+1,r=this.buffer[e];for(;r;)if(UF.has(r))r=this.buffer[++e];else if(r==="%"&&HS.has(this.buffer[e+1])&&HS.has(this.buffer[e+2]))r=this.buffer[e+=3];else break;return yield*this.pushToIndex(e,!1)}}*pushNewline(){let e=this.buffer[this.pos];return e===`
`?yield*this.pushCount(1):e==="\r"&&this.charAt(1)===`
`?yield*this.pushCount(2):0}*pushSpaces(e){let r=this.pos-1,n;do n=this.buffer[++r];while(n===" "||e&&n==="	");let s=r-this.pos;return s>0&&(yield this.buffer.substr(this.pos,s),this.pos=r),s}*pushUntil(e){let r=this.pos,n=this.buffer[r];for(;!e(n);)n=this.buffer[++r];return yield*this.pushToIndex(r,!1)}};WS.Lexer=jh});var Uh=m(KS=>{"use strict";var Fh=class{constructor(){this.lineStarts=[],this.addNewLine=e=>this.lineStarts.push(e),this.linePos=e=>{let r=0,n=this.lineStarts.length;for(;r<n;){let i=r+n>>1;this.lineStarts[i]<e?r=i+1:n=i}if(this.lineStarts[r]===e)return{line:r+1,col:1};if(r===0)return{line:0,col:e};let s=this.lineStarts[r-1];return{line:r,col:e-s+1}}}};KS.LineCounter=Fh});var Bh=m(XS=>{"use strict";var BF=Q("process"),GS=ac(),HF=Dh();function $r(t,e){for(let r=0;r<t.length;++r)if(t[r].type===e)return!0;return!1}function zS(t){for(let e=0;e<t.length;++e)switch(t[e].type){case"space":case"comment":case"newline":break;default:return e}return-1}function YS(t){switch(t?.type){case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":case"flow-collection":return!0;default:return!1}}function lc(t){switch(t.type){case"document":return t.start;case"block-map":{let e=t.items[t.items.length-1];return e.sep??e.start}case"block-seq":return t.items[t.items.length-1].start;default:return[]}}function Fn(t){if(t.length===0)return[];let e=t.length;e:for(;--e>=0;)switch(t[e].type){case"doc-start":case"explicit-key-ind":case"map-value-ind":case"seq-item-ind":case"newline":break e}for(;t[++e]?.type==="space";);return t.splice(e,t.length)}function JS(t){if(t.start.type==="flow-seq-start")for(let e of t.items)e.sep&&!e.value&&!$r(e.start,"explicit-key-ind")&&!$r(e.sep,"map-value-ind")&&(e.key&&(e.value=e.key),delete e.key,YS(e.value)?e.value.end?Array.prototype.push.apply(e.value.end,e.sep):e.value.end=e.sep:Array.prototype.push.apply(e.start,e.sep),delete e.sep)}var Vh=class{constructor(e){this.atNewLine=!0,this.atScalar=!1,this.indent=0,this.offset=0,this.onKeyLine=!1,this.stack=[],this.source="",this.type="",this.lexer=new HF.Lexer,this.onNewLine=e}*parse(e,r=!1){this.onNewLine&&this.offset===0&&this.onNewLine(0);for(let n of this.lexer.lex(e,r))yield*this.next(n);r||(yield*this.end())}*next(e){if(this.source=e,BF.env.LOG_TOKENS&&console.log("|",GS.prettyToken(e)),this.atScalar){this.atScalar=!1,yield*this.step(),this.offset+=e.length;return}let r=GS.tokenType(e);if(r)if(r==="scalar")this.atNewLine=!1,this.atScalar=!0,this.type="scalar";else{switch(this.type=r,yield*this.step(),r){case"newline":this.atNewLine=!0,this.indent=0,this.onNewLine&&this.onNewLine(this.offset+e.length);break;case"space":this.atNewLine&&e[0]===" "&&(this.indent+=e.length);break;case"explicit-key-ind":case"map-value-ind":case"seq-item-ind":this.atNewLine&&(this.indent+=e.length);break;case"doc-mode":case"flow-error-end":return;default:this.atNewLine=!1}this.offset+=e.length}else{let n=`Not a YAML token: ${e}`;yield*this.pop({type:"error",offset:this.offset,message:n,source:e}),this.offset+=e.length}}*end(){for(;this.stack.length>0;)yield*this.pop()}get sourceToken(){return{type:this.type,offset:this.offset,indent:this.indent,source:this.source}}*step(){let e=this.peek(1);if(this.type==="doc-end"&&e?.type!=="doc-end"){for(;this.stack.length>0;)yield*this.pop();this.stack.push({type:"doc-end",offset:this.offset,source:this.source});return}if(!e)return yield*this.stream();switch(e.type){case"document":return yield*this.document(e);case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return yield*this.scalar(e);case"block-scalar":return yield*this.blockScalar(e);case"block-map":return yield*this.blockMap(e);case"block-seq":return yield*this.blockSequence(e);case"flow-collection":return yield*this.flowCollection(e);case"doc-end":return yield*this.documentEnd(e)}yield*this.pop()}peek(e){return this.stack[this.stack.length-e]}*pop(e){let r=e??this.stack.pop();if(!r)yield{type:"error",offset:this.offset,source:"",message:"Tried to pop an empty stack"};else if(this.stack.length===0)yield r;else{let n=this.peek(1);switch(r.type==="block-scalar"?r.indent="indent"in n?n.indent:0:r.type==="flow-collection"&&n.type==="document"&&(r.indent=0),r.type==="flow-collection"&&JS(r),n.type){case"document":n.value=r;break;case"block-scalar":n.props.push(r);break;case"block-map":{let s=n.items[n.items.length-1];if(s.value){n.items.push({start:[],key:r,sep:[]}),this.onKeyLine=!0;return}else if(s.sep)s.value=r;else{Object.assign(s,{key:r,sep:[]}),this.onKeyLine=!s.explicitKey;return}break}case"block-seq":{let s=n.items[n.items.length-1];s.value?n.items.push({start:[],value:r}):s.value=r;break}case"flow-collection":{let s=n.items[n.items.length-1];!s||s.value?n.items.push({start:[],key:r,sep:[]}):s.sep?s.value=r:Object.assign(s,{key:r,sep:[]});return}default:yield*this.pop(),yield*this.pop(r)}if((n.type==="document"||n.type==="block-map"||n.type==="block-seq")&&(r.type==="block-map"||r.type==="block-seq")){let s=r.items[r.items.length-1];s&&!s.sep&&!s.value&&s.start.length>0&&zS(s.start)===-1&&(r.indent===0||s.start.every(i=>i.type!=="comment"||i.indent<r.indent))&&(n.type==="document"?n.end=s.start:n.items.push({start:s.start}),r.items.splice(-1,1))}}}*stream(){switch(this.type){case"directive-line":yield{type:"directive",offset:this.offset,source:this.source};return;case"byte-order-mark":case"space":case"comment":case"newline":yield this.sourceToken;return;case"doc-mode":case"doc-start":{let e={type:"document",offset:this.offset,start:[]};this.type==="doc-start"&&e.start.push(this.sourceToken),this.stack.push(e);return}}yield{type:"error",offset:this.offset,message:`Unexpected ${this.type} token in YAML stream`,source:this.source}}*document(e){if(e.value)return yield*this.lineEnd(e);switch(this.type){case"doc-start":{zS(e.start)!==-1?(yield*this.pop(),yield*this.step()):e.start.push(this.sourceToken);return}case"anchor":case"tag":case"space":case"comment":case"newline":e.start.push(this.sourceToken);return}let r=this.startBlockValue(e);r?this.stack.push(r):yield{type:"error",offset:this.offset,message:`Unexpected ${this.type} token in YAML document`,source:this.source}}*scalar(e){if(this.type==="map-value-ind"){let r=lc(this.peek(2)),n=Fn(r),s;e.end?(s=e.end,s.push(this.sourceToken),delete e.end):s=[this.sourceToken];let i={type:"block-map",offset:e.offset,indent:e.indent,items:[{start:n,key:e,sep:s}]};this.onKeyLine=!0,this.stack[this.stack.length-1]=i}else yield*this.lineEnd(e)}*blockScalar(e){switch(this.type){case"space":case"comment":case"newline":e.props.push(this.sourceToken);return;case"scalar":if(e.source=this.source,this.atNewLine=!0,this.indent=0,this.onNewLine){let r=this.source.indexOf(`
`)+1;for(;r!==0;)this.onNewLine(this.offset+r),r=this.source.indexOf(`
`,r)+1}yield*this.pop();break;default:yield*this.pop(),yield*this.step()}}*blockMap(e){let r=e.items[e.items.length-1];switch(this.type){case"newline":if(this.onKeyLine=!1,r.value){let n="end"in r.value?r.value.end:void 0;(Array.isArray(n)?n[n.length-1]:void 0)?.type==="comment"?n?.push(this.sourceToken):e.items.push({start:[this.sourceToken]})}else r.sep?r.sep.push(this.sourceToken):r.start.push(this.sourceToken);return;case"space":case"comment":if(r.value)e.items.push({start:[this.sourceToken]});else if(r.sep)r.sep.push(this.sourceToken);else{if(this.atIndentedComment(r.start,e.indent)){let s=e.items[e.items.length-2]?.value?.end;if(Array.isArray(s)){Array.prototype.push.apply(s,r.start),s.push(this.sourceToken),e.items.pop();return}}r.start.push(this.sourceToken)}return}if(this.indent>=e.indent){let n=!this.onKeyLine&&this.indent===e.indent,s=n&&(r.sep||r.explicitKey)&&this.type!=="seq-item-ind",i=[];if(s&&r.sep&&!r.value){let o=[];for(let a=0;a<r.sep.length;++a){let c=r.sep[a];switch(c.type){case"newline":o.push(a);break;case"space":break;case"comment":c.indent>e.indent&&(o.length=0);break;default:o.length=0}}o.length>=2&&(i=r.sep.splice(o[1]))}switch(this.type){case"anchor":case"tag":s||r.value?(i.push(this.sourceToken),e.items.push({start:i}),this.onKeyLine=!0):r.sep?r.sep.push(this.sourceToken):r.start.push(this.sourceToken);return;case"explicit-key-ind":!r.sep&&!r.explicitKey?(r.start.push(this.sourceToken),r.explicitKey=!0):s||r.value?(i.push(this.sourceToken),e.items.push({start:i,explicitKey:!0})):this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:[this.sourceToken],explicitKey:!0}]}),this.onKeyLine=!0;return;case"map-value-ind":if(r.explicitKey)if(r.sep)if(r.value)e.items.push({start:[],key:null,sep:[this.sourceToken]});else if($r(r.sep,"map-value-ind"))this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:i,key:null,sep:[this.sourceToken]}]});else if(YS(r.key)&&!$r(r.sep,"newline")){let o=Fn(r.start),a=r.key,c=r.sep;c.push(this.sourceToken),delete r.key,delete r.sep,this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:o,key:a,sep:c}]})}else i.length>0?r.sep=r.sep.concat(i,this.sourceToken):r.sep.push(this.sourceToken);else if($r(r.start,"newline"))Object.assign(r,{key:null,sep:[this.sourceToken]});else{let o=Fn(r.start);this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:o,key:null,sep:[this.sourceToken]}]})}else r.sep?r.value||s?e.items.push({start:i,key:null,sep:[this.sourceToken]}):$r(r.sep,"map-value-ind")?this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:[],key:null,sep:[this.sourceToken]}]}):r.sep.push(this.sourceToken):Object.assign(r,{key:null,sep:[this.sourceToken]});this.onKeyLine=!0;return;case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":{let o=this.flowScalar(this.type);s||r.value?(e.items.push({start:i,key:o,sep:[]}),this.onKeyLine=!0):r.sep?this.stack.push(o):(Object.assign(r,{key:o,sep:[]}),this.onKeyLine=!0);return}default:{let o=this.startBlockValue(e);if(o){if(o.type==="block-seq"){if(!r.explicitKey&&r.sep&&!$r(r.sep,"newline")){yield*this.pop({type:"error",offset:this.offset,message:"Unexpected block-seq-ind on same line with key",source:this.source});return}}else n&&e.items.push({start:i});this.stack.push(o);return}}}}yield*this.pop(),yield*this.step()}*blockSequence(e){let r=e.items[e.items.length-1];switch(this.type){case"newline":if(r.value){let n="end"in r.value?r.value.end:void 0;(Array.isArray(n)?n[n.length-1]:void 0)?.type==="comment"?n?.push(this.sourceToken):e.items.push({start:[this.sourceToken]})}else r.start.push(this.sourceToken);return;case"space":case"comment":if(r.value)e.items.push({start:[this.sourceToken]});else{if(this.atIndentedComment(r.start,e.indent)){let s=e.items[e.items.length-2]?.value?.end;if(Array.isArray(s)){Array.prototype.push.apply(s,r.start),s.push(this.sourceToken),e.items.pop();return}}r.start.push(this.sourceToken)}return;case"anchor":case"tag":if(r.value||this.indent<=e.indent)break;r.start.push(this.sourceToken);return;case"seq-item-ind":if(this.indent!==e.indent)break;r.value||$r(r.start,"seq-item-ind")?e.items.push({start:[this.sourceToken]}):r.start.push(this.sourceToken);return}if(this.indent>e.indent){let n=this.startBlockValue(e);if(n){this.stack.push(n);return}}yield*this.pop(),yield*this.step()}*flowCollection(e){let r=e.items[e.items.length-1];if(this.type==="flow-error-end"){let n;do yield*this.pop(),n=this.peek(1);while(n?.type==="flow-collection")}else if(e.end.length===0){switch(this.type){case"comma":case"explicit-key-ind":!r||r.sep?e.items.push({start:[this.sourceToken]}):r.start.push(this.sourceToken);return;case"map-value-ind":!r||r.value?e.items.push({start:[],key:null,sep:[this.sourceToken]}):r.sep?r.sep.push(this.sourceToken):Object.assign(r,{key:null,sep:[this.sourceToken]});return;case"space":case"comment":case"newline":case"anchor":case"tag":!r||r.value?e.items.push({start:[this.sourceToken]}):r.sep?r.sep.push(this.sourceToken):r.start.push(this.sourceToken);return;case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":{let s=this.flowScalar(this.type);!r||r.value?e.items.push({start:[],key:s,sep:[]}):r.sep?this.stack.push(s):Object.assign(r,{key:s,sep:[]});return}case"flow-map-end":case"flow-seq-end":e.end.push(this.sourceToken);return}let n=this.startBlockValue(e);n?this.stack.push(n):(yield*this.pop(),yield*this.step())}else{let n=this.peek(2);if(n.type==="block-map"&&(this.type==="map-value-ind"&&n.indent===e.indent||this.type==="newline"&&!n.items[n.items.length-1].sep))yield*this.pop(),yield*this.step();else if(this.type==="map-value-ind"&&n.type!=="flow-collection"){let s=lc(n),i=Fn(s);JS(e);let o=e.end.splice(1,e.end.length);o.push(this.sourceToken);let a={type:"block-map",offset:e.offset,indent:e.indent,items:[{start:i,key:e,sep:o}]};this.onKeyLine=!0,this.stack[this.stack.length-1]=a}else yield*this.lineEnd(e)}}flowScalar(e){if(this.onNewLine){let r=this.source.indexOf(`
`)+1;for(;r!==0;)this.onNewLine(this.offset+r),r=this.source.indexOf(`
`,r)+1}return{type:e,offset:this.offset,indent:this.indent,source:this.source}}startBlockValue(e){switch(this.type){case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return this.flowScalar(this.type);case"block-scalar-header":return{type:"block-scalar",offset:this.offset,indent:this.indent,props:[this.sourceToken],source:""};case"flow-map-start":case"flow-seq-start":return{type:"flow-collection",offset:this.offset,indent:this.indent,start:this.sourceToken,items:[],end:[]};case"seq-item-ind":return{type:"block-seq",offset:this.offset,indent:this.indent,items:[{start:[this.sourceToken]}]};case"explicit-key-ind":{this.onKeyLine=!0;let r=lc(e),n=Fn(r);return n.push(this.sourceToken),{type:"block-map",offset:this.offset,indent:this.indent,items:[{start:n,explicitKey:!0}]}}case"map-value-ind":{this.onKeyLine=!0;let r=lc(e),n=Fn(r);return{type:"block-map",offset:this.offset,indent:this.indent,items:[{start:n,key:null,sep:[this.sourceToken]}]}}}return null}atIndentedComment(e,r){return this.type!=="comment"||this.indent<=r?!1:e.every(n=>n.type==="newline"||n.type==="space")}*documentEnd(e){this.type!=="doc-mode"&&(e.end?e.end.push(this.sourceToken):e.end=[this.sourceToken],this.type==="newline"&&(yield*this.pop()))}*lineEnd(e){switch(this.type){case"comma":case"doc-start":case"doc-end":case"flow-seq-end":case"flow-map-end":case"map-value-ind":yield*this.pop(),yield*this.step();break;case"newline":this.onKeyLine=!1;case"space":case"comment":default:e.end?e.end.push(this.sourceToken):e.end=[this.sourceToken],this.type==="newline"&&(yield*this.pop())}}};XS.Parser=Vh});var rT=m(gi=>{"use strict";var QS=Nh(),WF=ci(),_i=fi(),KF=$d(),GF=ie(),zF=Uh(),ZS=Bh();function eT(t){let e=t.prettyErrors!==!1;return{lineCounter:t.lineCounter||e&&new zF.LineCounter||null,prettyErrors:e}}function JF(t,e={}){let{lineCounter:r,prettyErrors:n}=eT(e),s=new ZS.Parser(r?.addNewLine),i=new QS.Composer(e),o=Array.from(i.compose(s.parse(t)));if(n&&r)for(let a of o)a.errors.forEach(_i.prettifyError(t,r)),a.warnings.forEach(_i.prettifyError(t,r));return o.length>0?o:Object.assign([],{empty:!0},i.streamInfo())}function tT(t,e={}){let{lineCounter:r,prettyErrors:n}=eT(e),s=new ZS.Parser(r?.addNewLine),i=new QS.Composer(e),o=null;for(let a of i.compose(s.parse(t),!0,t.length))if(!o)o=a;else if(o.options.logLevel!=="silent"){o.errors.push(new _i.YAMLParseError(a.range.slice(0,2),"MULTIPLE_DOCS","Source contains multiple documents; please use YAML.parseAllDocuments()"));break}return n&&r&&(o.errors.forEach(_i.prettifyError(t,r)),o.warnings.forEach(_i.prettifyError(t,r))),o}function YF(t,e,r){let n;typeof e=="function"?n=e:r===void 0&&e&&typeof e=="object"&&(r=e);let s=tT(t,r);if(!s)return null;if(s.warnings.forEach(i=>KF.warn(s.options.logLevel,i)),s.errors.length>0){if(s.options.logLevel!=="silent")throw s.errors[0];s.errors=[]}return s.toJS(Object.assign({reviver:n},r))}function XF(t,e,r){let n=null;if(typeof e=="function"||Array.isArray(e)?n=e:r===void 0&&e&&(r=e),typeof r=="string"&&(r=r.length),typeof r=="number"){let s=Math.round(r);r=s<1?void 0:s>8?{indent:8}:{indent:s}}if(t===void 0){let{keepUndefined:s}=r??e??{};if(!s)return}return GF.isDocument(t)&&!n?t.toString(r):new WF.Document(t,n,r).toString(r)}gi.parse=YF;gi.parseAllDocuments=JF;gi.parseDocument=tT;gi.stringify=XF});var sT=m(de=>{"use strict";var QF=Nh(),ZF=ci(),e5=lh(),Hh=fi(),t5=Ws(),Lr=ie(),r5=Tr(),n5=be(),s5=Ir(),i5=Ar(),o5=ac(),a5=Dh(),c5=Uh(),l5=Bh(),uc=rT(),nT=Us();de.Composer=QF.Composer;de.Document=ZF.Document;de.Schema=e5.Schema;de.YAMLError=Hh.YAMLError;de.YAMLParseError=Hh.YAMLParseError;de.YAMLWarning=Hh.YAMLWarning;de.Alias=t5.Alias;de.isAlias=Lr.isAlias;de.isCollection=Lr.isCollection;de.isDocument=Lr.isDocument;de.isMap=Lr.isMap;de.isNode=Lr.isNode;de.isPair=Lr.isPair;de.isScalar=Lr.isScalar;de.isSeq=Lr.isSeq;de.Pair=r5.Pair;de.Scalar=n5.Scalar;de.YAMLMap=s5.YAMLMap;de.YAMLSeq=i5.YAMLSeq;de.CST=o5;de.Lexer=a5.Lexer;de.LineCounter=c5.LineCounter;de.Parser=l5.Parser;de.parse=uc.parse;de.parseAllDocuments=uc.parseAllDocuments;de.parseDocument=uc.parseDocument;de.stringify=uc.stringify;de.visit=nT.visit;de.visitAsync=nT.visitAsync});var lp=Ce(cp(),1),{program:A5,createCommand:$5,createArgument:L5,createOption:N5,CommanderError:O5,InvalidArgumentError:P5,InvalidOptionArgumentError:R5,Command:up,Argument:C5,Option:k5,Help:q5}=lp.default;import*as er from"fs";import*as Xr from"path";var PT={FULL_WIDTH:0,FITTING:1,SMUSHING:2,CONTROLLED_SMUSHING:3},Ac=class{constructor(){this.comment="",this.numChars=0,this.options={}}},Ic=["1Row","3-D","3D Diagonal","3D-ASCII","3x5","4Max","5 Line Oblique","AMC 3 Line","AMC 3 Liv1","AMC AAA01","AMC Neko","AMC Razor","AMC Razor2","AMC Slash","AMC Slider","AMC Thin","AMC Tubes","AMC Untitled","ANSI Compact","ANSI Regular","ANSI Shadow","ASCII 12","ASCII 9","ASCII New Roman","Acrobatic","Alligator","Alligator2","Alpha","Alphabet","Arrows","Avatar","B1FF","Babyface Lame","Babyface Leet","Banner","Banner3-D","Banner3","Banner4","Barbwire","Basic","Bear","Bell","Benjamin","Big ASCII 12","Big ASCII 9","Big Chief","Big Money-ne","Big Money-nw","Big Money-se","Big Money-sw","Big Mono 12","Big Mono 9","Big","Bigfig","Binary","Block","Blocks","Bloody","BlurVision ASCII","Bolger","Braced","Bright","Broadway KB","Broadway","Bubble","Bulbhead","Caligraphy","Caligraphy2","Calvin S","Cards","Catwalk","Chiseled","Chunky","Circle","Classy","Coder Mini","Coinstak","Cola","Colossal","Computer","Contessa","Contrast","Cosmike","Cosmike2","Crawford","Crawford2","Crazy","Cricket","Cursive","Cyberlarge","Cybermedium","Cybersmall","Cygnet","DANC4","DOS Rebel","DWhistled","Dancing Font","Decimal","Def Leppard","Delta Corps Priest 1","DiamFont","Diamond","Diet Cola","Digital","Doh","Doom","Dot Matrix","Double Shorts","Double","Dr Pepper","Efti Chess","Efti Font","Efti Italic","Efti Piti","Efti Robot","Efti Wall","Efti Water","Electronic","Elite","Emboss 2","Emboss","Epic","Fender","Filter","Fire Font-k","Fire Font-s","Flipped","Flower Power","Font Font","Four Tops","Fraktur","Fun Face","Fun Faces","Future","Fuzzy","Georgi16","Georgia11","Ghost","Ghoulish","Glenyn","Goofy","Gothic","Graceful","Gradient","Graffiti","Greek","Heart Left","Heart Right","Henry 3D","Hex","Hieroglyphs","Hollywood","Horizontal Left","Horizontal Right","ICL-1900","Impossible","Invita","Isometric1","Isometric2","Isometric3","Isometric4","Italic","Ivrit","JS Block Letters","JS Bracket Letters","JS Capital Curves","JS Cursive","JS Stick Letters","Jacky","Jazmine","Jerusalem","Katakana","Kban","Keyboard","Knob","Konto Slant","Konto","LCD","Larry 3D 2","Larry 3D","Lean","Letter","Letters","Lil Devil","Line Blocks","Linux","Lockergnome","Madrid","Marquee","Maxfour","Merlin1","Merlin2","Mike","Mini","Mirror","Mnemonic","Modular","Mono 12","Mono 9","Morse","Morse2","Moscow","Mshebrew210","Muzzle","NScript","NT Greek","NV Script","Nancyj-Fancy","Nancyj-Improved","Nancyj-Underlined","Nancyj","Nipples","O8","OS2","Octal","Ogre","Old Banner","Pagga","Patorjk's Cheese","Patorjk-HeX","Pawp","Peaks Slant","Peaks","Pebbles","Pepper","Poison","Puffy","Puzzle","Pyramid","Rammstein","Rebel","Rectangles","Red Phoenix","Relief","Relief2","Reverse","Roman","Rot13","Rotated","Rounded","Rowan Cap","Rozzo","RubiFont","Runic","Runyc","S Blood","SL Script","Santa Clara","Script","Serifcap","Shaded Blocky","Shadow","Shimrod","Short","Slant Relief","Slant","Slide","Small ASCII 12","Small ASCII 9","Small Block","Small Braille","Small Caps","Small Isometric1","Small Keyboard","Small Mono 12","Small Mono 9","Small Poison","Small Script","Small Shadow","Small Slant","Small Tengwar","Small","Soft","Speed","Spliff","Stacey","Stampate","Stampatello","Standard","Star Strips","Star Wars","Stellar","Stforek","Stick Letters","Stop","Straight","Stronger Than All","Sub-Zero","Swamp Land","Swan","Sweet","THIS","Tanja","Tengwar","Term","Terrace","Test1","The Edge","Thick","Thin","Thorned","Three Point","Ticks Slant","Ticks","Tiles","Tinker-Toy","Tmplr","Tombstone","Train","Trek","Tsalagi","Tubular","Twisted","Two Point","USA Flag","Univers","Upside Down Text","Varsity","Wavescape","Wavy","Weird","Wet Letter","Whimsy","WideTerm","Wow","miniwi"],fp={"ANSI-Compact":"ANSI Compact"},Zt=t=>fp[t]?fp[t]:t;function RT(t){return/[.*+?^${}()|[\]\\]/.test(t)?"\\"+t:t}var dp=(()=>{let{FULL_WIDTH:t=0,FITTING:e,SMUSHING:r,CONTROLLED_SMUSHING:n}=PT,s={},i={font:"Standard",fontPath:"./fonts",fetchFontIfMissing:!0};function o(S,T,E){let v=RT(S.trim().slice(-1))||"@",$=T===E-1?new RegExp(v+v+"?\\s*$"):new RegExp(v+"\\s*$");return S.replace($,"")}function a(S=-1,T=null){let E={},v,$=[[16384,"vLayout",r],[8192,"vLayout",e],[4096,"vRule5",!0],[2048,"vRule4",!0],[1024,"vRule3",!0],[512,"vRule2",!0],[256,"vRule1",!0],[128,"hLayout",r],[64,"hLayout",e],[32,"hRule6",!0],[16,"hRule5",!0],[8,"hRule4",!0],[4,"hRule3",!0],[2,"hRule2",!0],[1,"hRule1",!0]];v=T!==null?T:S;for(let[L,O,R]of $)v>=L?(v-=L,E[O]===void 0&&(E[O]=R)):O!=="vLayout"&&O!=="hLayout"&&(E[O]=!1);return typeof E.hLayout>"u"?S===0?E.hLayout=e:S===-1?E.hLayout=t:E.hRule1||E.hRule2||E.hRule3||E.hRule4||E.hRule5||E.hRule6?E.hLayout=n:E.hLayout=r:E.hLayout===r&&(E.hRule1||E.hRule2||E.hRule3||E.hRule4||E.hRule5||E.hRule6)&&(E.hLayout=n),typeof E.vLayout>"u"?E.vRule1||E.vRule2||E.vRule3||E.vRule4||E.vRule5?E.vLayout=n:E.vLayout=t:E.vLayout===r&&(E.vRule1||E.vRule2||E.vRule3||E.vRule4||E.vRule5)&&(E.vLayout=n),E}function c(S,T,E=""){return S===T&&S!==E?S:!1}function l(S,T){let E="|/\\[]{}()<>";if(S==="_"){if(E.indexOf(T)!==-1)return T}else if(T==="_"&&E.indexOf(S)!==-1)return S;return!1}function u(S,T){let E="| /\\ [] {} () <>",v=E.indexOf(S),$=E.indexOf(T);if(v!==-1&&$!==-1&&v!==$&&Math.abs(v-$)!==1){let L=Math.max(v,$),O=L+1;return E.substring(L,O)}return!1}function f(S,T){let E="[] {} ()",v=E.indexOf(S),$=E.indexOf(T);return v!==-1&&$!==-1&&Math.abs(v-$)<=1?"|":!1}function d(S,T){return{"/\\":"|","\\/":"Y","><":"X"}[S+T]||!1}function h(S,T,E=""){return S===E&&T===E?E:!1}function g(S,T){return S===T?S:!1}function p(S,T){return l(S,T)}function _(S,T){return u(S,T)}function y(S,T){return S==="-"&&T==="_"||S==="_"&&T==="-"?"=":!1}function w(S,T){return S==="|"&&T==="|"?"|":!1}function b(S,T,E){return T===" "||T===""||T===E&&S!==" "?S:T}function I(S,T,E){if(E.fittingRules&&E.fittingRules.vLayout===t)return"invalid";let v,$=Math.min(S.length,T.length),L,O,R=!1,k;if($===0)return"invalid";for(v=0;v<$;v++)if(L=S.substring(v,v+1),O=T.substring(v,v+1),L!==" "&&O!==" "){if(E.fittingRules&&E.fittingRules.vLayout===e)return"invalid";if(E.fittingRules&&E.fittingRules.vLayout===r)return"end";if(w(L,O)){R=R||!1;continue}if(k=!1,k=E.fittingRules&&E.fittingRules.vRule1?g(L,O):k,k=!k&&E.fittingRules&&E.fittingRules.vRule2?p(L,O):k,k=!k&&E.fittingRules&&E.fittingRules.vRule3?_(L,O):k,k=!k&&E.fittingRules&&E.fittingRules.vRule4?y(L,O):k,R=!0,!k)return"invalid"}return R?"end":"valid"}function A(S,T,E){let v=S.length,$=S.length,L,O,R,k=1,U,G,W;for(;k<=v;){for(L=S.slice(Math.max(0,$-k),$),O=T.slice(0,Math.min(v,k)),R=O.length,W="",U=0;U<R;U++)if(G=I(L[U],O[U],E),G==="end")W=G;else if(G==="invalid"){W=G;break}else W===""&&(W="valid");if(W==="invalid"){k--;break}if(W==="end")break;W==="valid"&&k++}return Math.min(v,k)}function C(S,T,E){let v,$=Math.min(S.length,T.length),L,O,R="",k,U=E.fittingRules||{};for(v=0;v<$;v++)L=S.substring(v,v+1),O=T.substring(v,v+1),L!==" "&&O!==" "?U.vLayout===e||U.vLayout===r?R+=b(L,O):(k=!1,k=U.vRule5?w(L,O):k,k=!k&&U.vRule1?g(L,O):k,k=!k&&U.vRule2?p(L,O):k,k=!k&&U.vRule3?_(L,O):k,k=!k&&U.vRule4?y(L,O):k,R+=k):R+=b(L,O);return R}function B(S,T,E,v){let $=S.length,L=T.length,O=S.slice(0,Math.max(0,$-E)),R=S.slice(Math.max(0,$-E),$),k=T.slice(0,Math.min(E,L)),U,G,W,z=[],ee;for(G=R.length,U=0;U<G;U++)U>=L?W=R[U]:W=C(R[U],k[U],v),z.push(W);return ee=T.slice(Math.min(E,L),L),[...O,...z,...ee]}function P(S,T){let E=" ".repeat(T);return S.map(v=>v+E)}function N(S,T,E){let v=S[0].length,$=T[0].length,L;return v>$?T=P(T,v-$):$>v&&(S=P(S,$-v)),L=A(S,T,E),B(S,T,L,E)}function D(S,T,E){let v=E.fittingRules||{};if(v.hLayout===t)return 0;let $,L=S.length,O=T.length,R=L,k=1,U=!1,G,W,z,ee;if(L===0)return 0;e:for(;k<=R;){let gt=L-k;for(G=S.substring(gt,gt+k),W=T.substring(0,Math.min(k,O)),$=0;$<Math.min(k,O);$++)if(z=G.substring($,$+1),ee=W.substring($,$+1),z!==" "&&ee!==" "){if(v.hLayout===e){k=k-1;break e}else if(v.hLayout===r){(z===E.hardBlank||ee===E.hardBlank)&&(k=k-1);break e}else if(U=!0,!(v.hRule1&&c(z,ee,E.hardBlank)||v.hRule2&&l(z,ee)||v.hRule3&&u(z,ee)||v.hRule4&&f(z,ee)||v.hRule5&&d(z,ee)||v.hRule6&&h(z,ee,E.hardBlank))){k=k-1;break e}}if(U)break;k++}return Math.min(R,k)}function V(S,T,E,v){let $,L,O=[],R,k,U,G,W,z,ee,gt,Qe=v.fittingRules||{};if(typeof v.height!="number")throw new Error("height is not defined.");for($=0;$<v.height;$++){ee=S[$],gt=T[$],W=ee.length,z=gt.length,R=W-E,k=ee.slice(0,Math.max(0,R)),U="";let Vn=Math.max(0,W-E),yt=ee.substring(Vn,Vn+E),Nr=gt.substring(0,Math.min(E,z));for(L=0;L<E;L++){let ct=L<W?yt.substring(L,L+1):" ",Ze=L<z?Nr.substring(L,L+1):" ";if(ct!==" "&&Ze!==" ")if(Qe.hLayout===e||Qe.hLayout===r)U+=b(ct,Ze,v.hardBlank);else{let aT=Qe.hRule1&&c(ct,Ze,v.hardBlank)||Qe.hRule2&&l(ct,Ze)||Qe.hRule3&&u(ct,Ze)||Qe.hRule4&&f(ct,Ze)||Qe.hRule5&&d(ct,Ze)||Qe.hRule6&&h(ct,Ze,v.hardBlank)||b(ct,Ze,v.hardBlank);U+=aT}else U+=b(ct,Ze,v.hardBlank)}E>=z?G="":G=gt.substring(E,E+Math.max(0,z-E)),O[$]=k+U+G}return O}function F(S){return new Array(S).fill("")}let re=function(S){return Math.max(...S.map(T=>T.length))};function ce(S,T,E){return S.reduce(function(v,$){return V(v,$.fig,$.overlap||0,E)},F(T))}function le(S,T,E){for(let v=S.length-1;v>0;v--){let $=ce(S.slice(0,v),T,E);if(re($)<=E.width)return{outputFigText:$,chars:S.slice(v)}}return{outputFigText:F(T),chars:S}}function ae(S,T,E){let v,$,L=0,O,R,k,U=E.height,G=[],W,z={chars:[],overlap:L},ee=[],gt,Qe,Vn,yt,Nr;if(typeof U!="number")throw new Error("height is not defined.");R=F(U);let ct=E.fittingRules||{};for(E.printDirection===1&&(S=S.split("").reverse().join("")),k=S.length,v=0;v<k;v++)if(gt=S.substring(v,v+1),Qe=gt.match(/\s/),$=T[gt.charCodeAt(0)],yt=null,$){if(ct.hLayout!==t){for(L=1e4,O=0;O<U;O++)L=Math.min(L,D(R[O],$[O],E));L=L===1e4?0:L}if(E.width>0&&(E.whitespaceBreak?(Vn=ce(z.chars.concat([{fig:$,overlap:L}]),U,E),yt=ce(ee.concat([{fig:Vn,overlap:z.overlap}]),U,E),W=re(yt)):(yt=V(R,$,L,E),W=re(yt)),W>=E.width&&v>0&&(E.whitespaceBreak?(R=ce(ee.slice(0,-1),U,E),ee.length>1&&(G.push(R),R=F(U)),ee=[]):(G.push(R),R=F(U)))),E.width>0&&E.whitespaceBreak&&((!Qe||v===k-1)&&z.chars.push({fig:$,overlap:L}),Qe||v===k-1)){for(Nr=null;yt=ce(z.chars,U,E),W=re(yt),W>=E.width;)Nr=le(z.chars,U,E),z={chars:Nr.chars},G.push(Nr.outputFigText);W>0&&(Nr?ee.push({fig:yt,overlap:1}):ee.push({fig:yt,overlap:z.overlap})),Qe&&(ee.push({fig:$,overlap:L}),R=F(U)),v===k-1&&(R=ce(ee,U,E)),z={chars:[],overlap:L};continue}R=V(R,$,L,E)}return re(R)>0&&G.push(R),E.showHardBlanks||G.forEach(function(Ze){for(k=Ze.length,O=0;O<k;O++)Ze[O]=Ze[O].replace(new RegExp("\\"+E.hardBlank,"g")," ")}),S===""&&G.length===0&&G.push(new Array(U).fill("")),G}let ue=function(S,T){let E,v=T.fittingRules||{};if(S==="default")E={hLayout:v.hLayout,hRule1:v.hRule1,hRule2:v.hRule2,hRule3:v.hRule3,hRule4:v.hRule4,hRule5:v.hRule5,hRule6:v.hRule6};else if(S==="full")E={hLayout:t,hRule1:!1,hRule2:!1,hRule3:!1,hRule4:!1,hRule5:!1,hRule6:!1};else if(S==="fitted")E={hLayout:e,hRule1:!1,hRule2:!1,hRule3:!1,hRule4:!1,hRule5:!1,hRule6:!1};else if(S==="controlled smushing")E={hLayout:n,hRule1:!0,hRule2:!0,hRule3:!0,hRule4:!0,hRule5:!0,hRule6:!0};else if(S==="universal smushing")E={hLayout:r,hRule1:!1,hRule2:!1,hRule3:!1,hRule4:!1,hRule5:!1,hRule6:!1};else return;return E},Ie=function(S,T){let E={},v=T.fittingRules||{};if(S==="default")E={vLayout:v.vLayout,vRule1:v.vRule1,vRule2:v.vRule2,vRule3:v.vRule3,vRule4:v.vRule4,vRule5:v.vRule5};else if(S==="full")E={vLayout:t,vRule1:!1,vRule2:!1,vRule3:!1,vRule4:!1,vRule5:!1};else if(S==="fitted")E={vLayout:e,vRule1:!1,vRule2:!1,vRule3:!1,vRule4:!1,vRule5:!1};else if(S==="controlled smushing")E={vLayout:n,vRule1:!0,vRule2:!0,vRule3:!0,vRule4:!0,vRule5:!0};else if(S==="universal smushing")E={vLayout:r,vRule1:!1,vRule2:!1,vRule3:!1,vRule4:!1,vRule5:!1};else return;return E},pe=function(S,T,E){E=E.replace(/\r\n/g,`
`).replace(/\r/g,`
`);let v=Zt(S),$=E.split(`
`),L=[],O,R,k;for(R=$.length,O=0;O<R;O++)L=L.concat(ae($[O],s[v],T));for(R=L.length,k=L[0],O=1;O<R;O++)k=N(k,L[O],T);return k?k.join(`
`):""};function fc(S,T){let E;if(typeof structuredClone<"u"?E=structuredClone(S):E=JSON.parse(JSON.stringify(S)),E.showHardBlanks=T.showHardBlanks||!1,E.width=T.width||-1,E.whitespaceBreak=T.whitespaceBreak||!1,T.horizontalLayout){let v=ue(T.horizontalLayout,S);v&&Object.assign(E.fittingRules,v)}if(T.verticalLayout){let v=Ie(T.verticalLayout,S);v&&Object.assign(E.fittingRules,v)}return E.printDirection=T.printDirection!==null&&T.printDirection!==void 0?T.printDirection:S.printDirection,E}let Te=async function(S,T,E){return Te.text(S,T,E)};return Te.text=async function(S,T,E){S=S+"";let v,$;typeof T=="function"?($=T,v={font:i.font}):typeof T=="string"?(v={font:T},$=E):T?(v=T,$=E):(v={font:i.font},$=E);let L=v.font||i.font;try{let O=await Te.loadFont(L),R=O?pe(L,fc(O,v),S):"";return $&&$(null,R),R}catch(O){let R=O instanceof Error?O:new Error(String(O));if($)return $(R),"";throw R}},Te.textSync=function(S,T){S=S+"",typeof T=="string"?T={font:T}:T=T||{};let E=T.font||i.font,v=fc(Te.loadFontSync(E),T);return pe(E,v,S)},Te.metadata=async function(S,T){S=S+"";try{let E=await Te.loadFont(S);if(!E)throw new Error("Error loading font.");let v=Zt(S),$=s[v]||{},L=[E,$.comment||""];return T&&T(null,E,$.comment),L}catch(E){let v=E instanceof Error?E:new Error(String(E));if(T)return T(v),null;throw v}},Te.defaults=function(S){return S&&typeof S=="object"&&Object.assign(i,S),typeof structuredClone<"u"?structuredClone(i):JSON.parse(JSON.stringify(i))},Te.parseFont=function(S,T,E=!0){if(s[S]&&!E)return s[S].options;T=T.replace(/\r\n/g,`
`).replace(/\r/g,`
`);let v=new Ac,$=T.split(`
`),L=$.shift();if(!L)throw new Error("Invalid font file: missing header");let O=L.split(" "),R={hardBlank:O[0].substring(5,6),height:parseInt(O[1],10),baseline:parseInt(O[2],10),maxLength:parseInt(O[3],10),oldLayout:parseInt(O[4],10),numCommentLines:parseInt(O[5],10),printDirection:O[6]?parseInt(O[6],10):0,fullLayout:O[7]?parseInt(O[7],10):null,codeTagCount:O[8]?parseInt(O[8],10):null};if((R.hardBlank||"").length!==1||[R.height,R.baseline,R.maxLength,R.oldLayout,R.numCommentLines].some(G=>G==null||isNaN(G)))throw new Error("FIGlet header contains invalid values.");if(R.height==null||R.numCommentLines==null)throw new Error("FIGlet header contains invalid values.");R.fittingRules=a(R.oldLayout,R.fullLayout),v.options=R;let U=[];for(let G=32;G<=126;G++)U.push(G);if(U.push(196,214,220,228,246,252,223),$.length<R.numCommentLines+R.height*U.length)throw new Error(`FIGlet file is missing data. Line length: ${$.length}. Comment lines: ${R.numCommentLines}. Height: ${R.height}. Num chars: ${U.length}.`);for(v.comment=$.splice(0,R.numCommentLines).join(`
`),v.numChars=0;$.length>0&&v.numChars<U.length;){let G=U[v.numChars];v[G]=$.splice(0,R.height);for(let W=0;W<R.height;W++)typeof v[G][W]>"u"?v[G][W]="":v[G][W]=o(v[G][W],W,R.height);v.numChars++}for(;$.length>0;){let G=$.shift();if(!G||G.trim()==="")break;let W=G.split(" ")[0],z;if(/^-?0[xX][0-9a-fA-F]+$/.test(W))z=parseInt(W,16);else if(/^-?0[0-7]+$/.test(W))z=parseInt(W,8);else if(/^-?[0-9]+$/.test(W))z=parseInt(W,10);else throw new Error(`Error parsing data. Invalid data: ${W}`);if(z===-1||z<-2147483648||z>2147483647){let ee=z===-1?"The char code -1 is not permitted.":`The char code cannot be ${z<-2147483648?"less than -2147483648":"greater than 2147483647"}.`;throw new Error(`Error parsing data. ${ee}`)}v[z]=$.splice(0,R.height);for(let ee=0;ee<R.height;ee++)typeof v[z][ee]>"u"?v[z][ee]="":v[z][ee]=o(v[z][ee],ee,R.height);v.numChars++}return s[S]=v,R},Te.loadedFonts=()=>Object.keys(s),Te.clearLoadedFonts=()=>{Object.keys(s).forEach(S=>{delete s[S]})},Te.loadFont=async function(S,T){let E=Zt(S);if(s[E]){let v=s[E].options;return T&&T(null,v),Promise.resolve(v)}try{if(!i.fetchFontIfMissing)throw new Error(`Font is not loaded: ${E}`);let v=await fetch(`${i.fontPath}/${E}.flf`);if(!v.ok)throw new Error(`Network response was not ok: ${v.status}`);let $=await v.text(),L=Te.parseFont(E,$);return T&&T(null,L),L}catch(v){let $=v instanceof Error?v:new Error(String(v));if(T)return T($),null;throw $}},Te.loadFontSync=function(S){let T=Zt(S);if(s[T])return s[T].options;throw new Error("Synchronous font loading is not implemented for the browser, it will only work for fonts already loaded.")},Te.preloadFonts=async function(S,T){try{for(let E of S){let v=Zt(E),$=await fetch(`${i.fontPath}/${v}.flf`);if(!$.ok)throw new Error(`Failed to preload fonts. Error fetching font: ${v}, status code: ${$.statusText}`);let L=await $.text();Te.parseFont(v,L)}T&&T()}catch(E){let v=E instanceof Error?E:new Error(String(E));if(T){T(v);return}throw E}},Te.fonts=function(S){return new Promise(function(T,E){T(Ic),S&&S(null,Ic)})},Te.fontsSync=function(){return Ic},Te.figFonts=s,Te})();import{fileURLToPath as CT}from"url";var kT=CT(import.meta.url),qT=Xr.dirname(kT),MT=Xr.join(qT,"/../fonts/"),Ae=dp;Ae.defaults({fontPath:MT});Ae.loadFont=function(t,e){let r=Zt(t);return new Promise((n,s)=>{if(Ae.figFonts[r]){e&&e(null,Ae.figFonts[r].options),n(Ae.figFonts[r].options);return}er.readFile(Xr.join(Ae.defaults().fontPath,r+".flf"),{encoding:"utf-8"},(i,o)=>{if(i){e&&e(i),s(i);return}o=o+"";try{let a=Ae.parseFont(r,o);e&&e(null,a),n(a)}catch(a){let c=a instanceof Error?a:new Error(String(a));e&&e(c),s(c)}})})};Ae.loadFontSync=function(t){let e=Zt(t);if(Ae.figFonts[e])return Ae.figFonts[e].options;let r=er.readFileSync(Xr.join(Ae.defaults().fontPath,e+".flf"),{encoding:"utf-8"})+"";return Ae.parseFont(e,r)};Ae.fonts=function(t){return new Promise((e,r)=>{let n=[];er.readdir(Ae.defaults().fontPath,(s,i)=>{if(s){t&&t(s),r(s);return}i.forEach(o=>{/\.flf$/.test(o)&&n.push(o.replace(/\.flf$/,""))}),t&&t(null,n),e(n)})})};Ae.fontsSync=function(){let t=[];return er.readdirSync(Ae.defaults().fontPath).forEach(e=>{/\.flf$/.test(e)&&t.push(e.replace(/\.flf$/,""))}),t};var hp=`flf2a$ 6 5 16 15 13 0 24463 229
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
         `;var $i=Ce(Kp(),1),ab=$i.default.green,cb=$i.default.yellow,lb=$i.default.bold.red;function Gp(t){let e=ab(`${t.passed.length} validation passed`),r=lb(`${t.failed.length} validation failed`),n=t.warning.length>0?cb(`${t.warning.length} warning(s)`):void 0;t.failed.length===0?console.log(`\u2705[${t.name}] ${e}${n?`, ${n}`:""}.`):(console.log(`\u274C[${t.name}] ${r}${n?`, ${n}`:""}, ${e}.`),console.log(t.failed.map(s=>`  \u274C ${s}`).join(`
`))),t.warning.length>0&&console.log(t.warning.map(s=>`  \u26A0\uFE0F ${s}`).join(`
`)),t.passed.length>0&&console.log(t.passed.map(s=>`  \u2705 ${s}`).join(`
`))}var Q_=Ce(Zp(),1),Zc=Ce(or(),1);import X_ from"path";var Rr=Ce(or(),1);import es from"path";function J_(t){let e=[],r=process.env.SAMPLE_VALIDATOR_CONFIG_PATH;return r&&Rr.default.existsSync(r)&&e.push(r),e.push(es.join(t,"..",".config","samples-config-v3.json"),es.join(t,".config","samples-config-v3.json")),e}function cn(t){let e=process.env.SAMPLE_VALIDATOR_EXPECTED_ID;return e||es.basename(t)}async function Y_(t){let e=cn(t),r=J_(t);for(let n of r)if(await Rr.default.exists(n))try{let i=(await Rr.default.readJson(n)).samples.find(o=>o.id===e);if(i)return{thumbnailPath:i.thumbnailPath,gifPath:i.gifPath}}catch{}return{}}async function AA(t){let e=cn(t),r=J_(t);for(let n of r)if(await Rr.default.exists(n))try{let i=(await Rr.default.readJson(n)).samples.find(o=>o.id===e);if(i&&i.tags)return i.tags.includes("C#")}catch{}return!1}async function Ot(t){let e=await AA(t),r=es.join(t,"M365Agent"),n=es.join(r,"m365agents.yml"),s=await Rr.default.exists(n);return e||s?{projectType:"csharp",rootDir:t,agentDir:s?r:t,displayPrefix:s?"M365Agent/":""}:{projectType:"typescript",rootDir:t,agentDir:t,displayPrefix:""}}async function el(t){let e={name:"Env Files",passed:[],failed:[],warning:[]},r=await Ot(t),{agentDir:n,displayPrefix:s,projectType:i}=r,o=[".env.dev",".env.local"],a=!1;for(let c of o){let l=X_.join(n,"env",c);if(!await Zc.default.exists(l)){if(i==="csharp")continue;e.warning.push(`${s}${X_.join("env",c)} does not exist.`);continue}a=!0;let u=await Zc.default.readFile(l,"utf8"),f=Q_.default.parse(u),d=Object.entries(f).map(([g,p])=>({name:g,value:p})),h=!0;for(let g of d)g.name==="TEAMSFX_ENV"||g.name==="APP_NAME_SUFFIX"||g.name==="TEAMS_APP_NAME"||g.name.startsWith("connectionsMap__0")||g.name.startsWith("agentic_")||g.value!==""&&(e.failed.push(`${s}${c}: ${g.name} should NOT have value.`),h=!1);h&&e.passed.push(`${s}${c}: All environment variables are valid.`)}return i==="csharp"&&!a&&e.passed.push("C# project does not require env files."),e}var ar=Ce(or(),1);import Fi from"path";var $A=["appPackage"],LA=["appPackage/manifest.json","appPackage/color.png","appPackage/outline.png","m365agents.yml","m365agents.local.yml"],NA=["README.md"],OA=["env/.env.dev"],PA=["env",".vscode"];async function tl(t,e){let r=Fi.join(t,e);return await ar.default.exists(r)?(await ar.default.stat(r)).isDirectory():!1}async function ln(t,e){let r=Fi.join(t,e);return await ar.default.exists(r)?(await ar.default.stat(r)).isFile():!1}async function Di(t,e){return await ar.default.exists(t)?(await ar.default.readdir(t)).filter(n=>n.endsWith(e)):[]}async function rl(t){let e={name:"Folder Structure",passed:[],failed:[],warning:[]},r=await Ot(t),{agentDir:n,rootDir:s,displayPrefix:i,projectType:o}=r;for(let a of $A){let c=i+a;await tl(n,a)?e.passed.push(`Project has "${c}" folder.`):e.failed.push(`Project should have "${c}" folder.`)}for(let a of PA){let c=await tl(n,a),l=await tl(s,a);if(c||l){let u=c?i+a:a;e.passed.push(`Project has "${u}" folder.`)}else o==="typescript"&&e.failed.push(`Project should have "${a}" folder.`)}for(let a of LA){let c=i+a;await ln(n,a)?e.passed.push(`Project has "${c}" file.`):e.failed.push(`Project should have "${c}" file.`)}for(let a of NA)await ln(s,a)?e.passed.push(`Project has "${a}" file.`):e.failed.push(`Project should have "${a}" file.`);for(let a of OA){let c=await ln(n,a),l=await ln(s,a);if(c||l){let u=c?i+a:a;e.passed.push(`Project has "${u}" file.`)}else o==="typescript"&&e.failed.push(`Project should have "${a}" file.`)}if(o==="csharp"){let a=await Di(s,".sln"),c=await Di(s,".slnx");if(a.length>0||c.length>0){let p=a.length>0?a[0]:c[0];e.passed.push(`Project has solution file "${p}".`)}else e.failed.push("C# project should have a .sln or .slnx solution file.");let l=await Di(s,".csproj"),u=l.length>0,f=l.length>0?l[0]:"",d=["M365Agent","TravelAgent","AzureAgentToM365ATK"];for(let p of d){let _=Fi.join(s,p);if(await ar.default.exists(_)){let y=await Di(_,".csproj");if(y.length>0){u=!0,f=`${p}/${y[0]}`;break}}}u?e.passed.push(`Project has .csproj file "${f}".`):e.failed.push("C# project should have a .csproj project file.");let h=await ln(s,"appsettings.json"),g="appsettings.json";if(!h)for(let p of d){let _=Fi.join(s,p);if(await ln(_,"appsettings.json")){h=!0,g=`${p}/appsettings.json`;break}}h?e.passed.push(`Project has "${g}" file.`):e.failed.push("C# project should have an appsettings.json file.")}return e}var ns=Ce(or(),1),ss=Ce(Dg(),1);import yo from"path";function yL(t){return cn(t).endsWith("-codespaces")}async function Al(t){let e={name:"Image Files",passed:[],failed:[],warning:[]},r=yL(t),n=await Y_(t);if(r)e.passed.push("Thumbnail validation skipped for codespaces sample (not in samples-config-v3.json).");else if(n.thumbnailPath){let s=yo.join(t,n.thumbnailPath);if(await ns.default.exists(s)){let i=(0,ss.default)(s);i.width&&i.height&&i.width/i.height===40/23?e.passed.push(`${n.thumbnailPath} has 1600*920/800*460 resolution or same ratio.`):e.failed.push(`${n.thumbnailPath} must have 1600*920/800*460 resolution or same ratio (40:23 aspect ratio). Current: ${i.width}x${i.height}.`)}else e.failed.push(`${n.thumbnailPath} is required to display in sample gallery but does not exist.`)}else{let s=["png","jpg","jpeg"],i=!1;for(let o of s){let a=yo.join(t,"assets",`thumbnail.${o}`);if(await ns.default.exists(a)){i=!0;let c=(0,ss.default)(a);c.width&&c.height&&c.width/c.height===40/23?e.passed.push(`assets/thumbnail.${o} has 1600*920/800*460 resolution or same ratio.`):e.failed.push(`assets/thumbnail.${o} must have 1600*920/800*460 resolution or same ratio (40:23 aspect ratio). Current: ${c.width}x${c.height}.`);break}}i||e.failed.push("Thumbnail image is required to display in sample gallery. Please add thumbnailPath to samples-config-v3.json or add assets/thumbnail.png.")}if(n.gifPath){let s=yo.join(t,n.gifPath);if(await ns.default.exists(s)){let i=(0,ss.default)(s);i.width&&i.height&&i.width/i.height===40/23?e.passed.push(`${n.gifPath} has 1600*920/800*460 resolution or same ratio.`):e.warning.push(`${n.gifPath} does not have 40:23 aspect ratio. Current: ${i.width}x${i.height}. (Optional)`)}else e.warning.push(`${n.gifPath} does not exist. (Optional)`)}else{let s=yo.join(t,"assets","sampleDemo.gif");if(await ns.default.exists(s)){let i=(0,ss.default)(s);i.width&&i.height&&i.width/i.height===40/23?e.passed.push("assets/sampleDemo.gif has 1600*920/800*460 resolution or same ratio."):e.warning.push(`assets/sampleDemo.gif does not have 40:23 aspect ratio. Current: ${i.width}x${i.height}. (Optional)`)}else e.warning.push("Sample demo gif does not exist. (Optional)")}return e}var Vg=Ce(Ug(),1),$l=Ce(or(),1);import EL from"path";async function Ll(t){let e={name:"package.json",passed:[],failed:[],warning:[]},r=await Ot(t),{projectType:n}=r,s=EL.join(t,"package.json");if(!await $l.default.exists(s))return n==="csharp"?(e.passed=["C# project does not require package.json."],e):(e.failed=["package.json does not exist."],e);let i=await $l.default.readFile(s,"utf8");try{let o=JSON.parse(i);if(!o.engines||!o.engines.node)return e.warning=["package.json does not have 'engines.node' field."],e;if(!(0,Vg.satisfies)("22.0.0",o.engines.node))return e.warning=["'engines.node' field should be compatible with 22."],e}catch{return e.failed=["package.json is not a valid JSON file."],e}return e.passed=["'engines.node' field is compatible with 22."],e}var cd=Ce(or(),1),ld=Ce(zl(),1),m1=Ce(Bv(),1),_1=Ce(d1(),1);import qM from"path";var h1="1.25.0",p1="devPreview";async function MM(t){try{let e=await fetch(t);if(!e.ok)return null;let r=(await e.text()).replace(/\\a/g,"\\x07");return JSON.parse(r)}catch{return null}}async function ud(t){let e={name:"App Manifest",passed:[],failed:[],warning:[]},r=await Ot(t),{agentDir:n,displayPrefix:s}=r,i=qM.join(n,"appPackage","manifest.json");if(!await cd.default.exists(i))return e.failed=[`${s}appPackage/manifest.json does not exist.`],e;let o=await cd.default.readFile(i,"utf8"),a;try{a=JSON.parse(o)}catch{}if(!a)return e.failed.push("appPackage/manifest.json is not a valid JSON file."),e;let c=a.id;if(!c||c!=="${{TEAMS_APP_ID}}"?e.failed.push("id should be equal to '${{TEAMS_APP_ID}}'."):e.passed.push("id is referencing placeholder from env: ${{TEAMS_APP_ID}}."),a.manifestVersion===p1)e.warning.push(`Manifest version(${p1}) is using preview version.`);else{let f=ld.default.coerce(a.manifestVersion);f&&ld.default.eq(f,h1)?e.passed.push("Manifest version is aligned with Microsoft 365 Agents Toolkit."):e.warning.push(`Manifest version(${a.manifestVersion}) is NOT aligned with Microsoft 365 Agents Toolkit(${h1}).`)}let l=a.$schema;if(!l)e.warning.push("appPackage/manifest.json is missing a $schema property.");else{let f=await MM(l);if(!f)e.warning.push(`Could not fetch schema from: ${l}`);else{let p=function(I,A){if(typeof I=="string"){let C=A!==void 0&&/url$/i.test(A),B=C?h:d;if(/^\$\{\{[^}]+\}\}$/.test(I)){let N=I.slice(3,-2).trim();return g[N]!==void 0?g[N]:B}let P=I;for(let[N,D]of Object.entries(g))P=P.replace(new RegExp(`\\$\\{\\{\\s*${N}\\s*\\}\\}`,"g"),D);return C?P.replace(/^\$\{\{[^}]+\}\}/,h).replace(/\$\{\{[^}]+\}\}/g,""):P.replace(/\$\{\{[^}]+\}\}/g,"")}return Array.isArray(I)?I.map(C=>p(C,A)):I!==null&&typeof I=="object"?Object.fromEntries(Object.entries(I).map(([C,B])=>[C,p(B,C)])):I};var u=p;let d="00000000-0000-0000-0000-000000000000",h="https://placeholder.example.com",g={APP_NAME_SUFFIX:"local",TEAMSFX_ENV:"local"},_=p(a),y=new m1.default({allErrors:!0,strictTypes:!1});(0,_1.default)(y,["uri","email","regex"]);let w=y.compile(f);if(!w(_)&&w.errors&&w.errors.length>0)for(let I of w.errors)e.failed.push(`Schema validation error: ${I.instancePath||"(root)"} ${I.message}. ${I.params?JSON.stringify(I.params):""}`);else e.passed.push(`Manifest passes $schema validation (${l}).`)}}return e}var Un=Ce(or(),1),iT=Ce(sT(),1),Kh=Ce(zl(),1);import Wh from"path";var u5={"bot-sso-docker":"sso-bot-docker","NPM-search-connector-M365":"npm-search-connector-M365","sso-enabled-tab-via-apim-proxy":"sso-tab-via-apim-proxy","hello-world-tab-docker":"hello-world-tab-with-backend","copilot-connector-app":"graph-connector-app","graph-rsc-helper":"graph-rsc-nodeJs"};function f5(t){let e=[],r=process.env.SAMPLE_VALIDATOR_CONFIG_PATH;return r&&Un.default.existsSync(r)&&e.push(r),e.push(Wh.join(t,"..",".config","samples-config-v3.json"),Wh.join(t,".config","samples-config-v3.json")),e}async function d5(t){let e=cn(t),r=f5(t);for(let n of r)if(await Un.default.exists(n))try{let i=(await Un.default.readJson(n)).samples.find(o=>o.id===e);if(i)return i.id}catch{}return null}var h5=[{name:"provision",actions:["teamsApp/create"],required:!0},{name:"deploy",actions:[],required:!0}],p5=[{name:"publish",actions:["teamsApp/publishAppPackage"]}],m5="1.2.0";async function Gh(t){let e={name:"teamsapp.yaml",passed:[],failed:[],warning:[]},r=await Ot(t),{agentDir:n,displayPrefix:s}=r,i=Wh.join(n,"m365agents.yml");if(!await Un.default.exists(i))return e.failed=[`${s}m365agents.yml does not exist.`],e;let o=await Un.default.readFile(i,"utf8"),a=iT.default.parse(o),c=a&&a.projectId;c&&c!==""?e.failed.push("Project should NOT have projectId in m365agents.yml."):e.passed.push("Project has no projectId in m365agents.yml.");let l=a?.version;if(l){let g=l.match(/^v?(\d+)(?:\.(\d+))?/);if(g){let p=g[1],_=g[2]||"0",y=`${p}.${_}.0`,w=Kh.default.coerce(y);w&&Kh.default.gte(w,m5)?e.passed.push(`Version (${l}) supports sampleTag (>= v1.2).`):e.failed.push(`Version (${l}) must be >= v1.2 to support sampleTag.`)}else e.failed.push(`Version (${l}) is not a valid version format.`)}else e.failed.push("Project should have version field in m365agents.yml.");for(let g of h5){let p=a[g.name],_=[];if(!p){e.failed.push(`Project should have '${g.name}' stage in m365agents.yml.`);continue}for(let y of g.actions)if(p&&p.findIndex(w=>w.uses===y)<0&&_.push(`Project should have '${y}' action in ${g.name} stage.`),g.name==="provision"&&y==="teamsApp/create"){let w=p.findIndex(b=>b.uses===y);w>=0&&(p[w].writeToEnvironmentFile?.teamsAppId==="TEAMS_APP_ID"?e.passed.push("Project has 'teamsApp/create' action which has TEAMS_APP_ID env variable."):e.failed.push("Project should have 'teamsApp/create' action which has TEAMS_APP_ID env variable."))}_.length===0?e.passed.push(`Project has all mandatory actions in ${g.name} stage.`):e.failed.push(..._)}for(let g of p5){let p=a[g.name];if(!p){e.warning.push(`Project does not have '${g.name}' stage in m365agents.yml.`);continue}let _=!0;for(let y of g.actions)p.findIndex(w=>w.uses===y)<0&&(e.warning.push(`Project does not have '${y}' action in ${g.name} stage.`),_=!1);_&&e.passed.push(`Project has all actions in ${g.name} stage.`)}let u=/^([\w-]+):([\w-]+)$/g,f=a?.additionalMetadata?.sampleTag,d=await d5(t),h=!1;if(f&&f!==""){let g=u.exec(f);if(g){let p=g[1],_=g[2];if(e.passed.push("Project has sampleTag with format 'repo:name'."),h=!0,p!=="TeamsFx-Samples"&&e.warning.push("Project is an external sample."),d!==null){let y=u5[d];_===d||_===y?_===y?e.passed.push(`sampleTag name '${_}' matches allowed exception for sample id '${d}'.`):e.passed.push(`sampleTag name '${_}' matches sample id in config.`):e.failed.push(`sampleTag name '${_}' does not match sample id '${d}' in samples-config-v3.json.`)}}}return h||e.failed.push("Project should have sampleTag with format 'repo:name'."),e}var _5="1.0.0",oT=new up,g5=[rl,Gh,ud,el,Al,Ll];async function y5(){await oT.version(_5).description("A tool to validate project content before onboarding to TeamsFx sample gallery.").option("-p, --path <path>","Path to the project folder to be validated.").parseAsync(process.argv);let t=oT.opts(),e=process.cwd();t.path&&typeof t.path=="string"&&(e=t.path);for(let r of g5){let n=await r(e);Gp(n)}}Ae.parseFont("Standard",hp);console.log(Ae.textSync("TeamsFx Sample Validator"));y5();
