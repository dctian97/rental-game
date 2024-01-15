var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};

// src/index.ts
import { fileURLToPath } from "url";

// src/api.ts
import { pipeline as pipelineCb, Readable } from "stream";
import { promisify } from "util";

// src/account.ts
var getAccountObject = (idHeader) => ({
  id: idHeader ?? ""
});

// src/deploy.ts
var getDeploybject = (idHeader) => ({
  id: idHeader ?? ""
});

// src/request.ts
import { Buffer as Buffer2 } from "buffer";
var requestFlags = Symbol("Request flags");
var requestRoute = Symbol("Request route");
var BaseRequest = typeof Request === "undefined" ? class {
} : Request;
var NetlifyRequest = class extends BaseRequest {
};
requestFlags, requestRoute;
var buildRequestBody = (body, isBase64Encoded) => {
  if (body === null || body === void 0 || body === "") {
    return;
  }
  if (isBase64Encoded) {
    return Buffer2.from(body, "base64");
  }
  return body;
};

// src/flags.ts
var _evaluatedFlags, _values;
var Flags = class {
  constructor(values) {
    __privateAdd(this, _evaluatedFlags, void 0);
    __privateAdd(this, _values, void 0);
    __privateSet(this, _evaluatedFlags, /* @__PURE__ */ new Set());
    __privateSet(this, _values, values);
  }
  get(key) {
    const value = __privateGet(this, _values)[key];
    if (value !== void 0) {
      __privateGet(this, _evaluatedFlags).add(key);
    }
    return value;
  }
  getEvaluatedFlags() {
    return __privateGet(this, _evaluatedFlags);
  }
};
_evaluatedFlags = new WeakMap();
_values = new WeakMap();
var getRequestFlags = (req) => req[requestFlags] ?? new Flags({});
var setRequestFlags = (event, req) => {
  const { flags: flagValues = {} } = event;
  req[requestFlags] = new Flags(flagValues);
};

// src/geo.ts
import { Buffer as Buffer3 } from "buffer";
var parseGeoHeader = (geoHeader) => {
  if (geoHeader === null) {
    return {};
  }
  try {
    const geoData = JSON.parse(Buffer3.from(geoHeader, "base64").toString("utf-8"));
    return geoData;
  } catch {
    return {};
  }
};

// src/headers.ts
var NFClientConnectionIP = "x-nf-client-connection-ip";
var NFGeo = "x-nf-geo";
var NFAccountID = "x-nf-account-id";
var NFDeployID = "x-nf-deploy-id";
var NFSiteID = "x-nf-site-id";
var NFRequestFlags = "x-nf-request-flags";
var NFRequestID = "x-nf-request-id";
var fromEventHeaders = (eventHeaders) => {
  const headers = new Headers();
  Object.entries(eventHeaders).forEach(([name, value]) => {
    if (value !== void 0) {
      headers.set(name.toLowerCase(), value);
    }
  });
  return headers;
};
var toMultiValueHeaders = (headers) => {
  const headersObj = {};
  for (const [name, value] of headers.entries()) {
    if (name in headersObj) {
      headersObj[name].push(value);
    } else {
      headersObj[name] = [value];
    }
  }
  return headersObj;
};

// src/ip.ts
var getIP = (ipHeader) => ipHeader ?? "";

// node_modules/urlpattern-polyfill/dist/urlpattern.js
var Part = class {
  constructor(type, name, prefix, value, suffix, modifier) {
    this.type = 3;
    this.name = "";
    this.prefix = "";
    this.value = "";
    this.suffix = "";
    this.modifier = 3;
    this.type = type;
    this.name = name;
    this.prefix = prefix;
    this.value = value;
    this.suffix = suffix;
    this.modifier = modifier;
  }
  hasCustomName() {
    return this.name !== "" && typeof this.name !== "number";
  }
};
var regexIdentifierStart = /[$_\p{ID_Start}]/u;
var regexIdentifierPart = /[$_\u200C\u200D\p{ID_Continue}]/u;
var kFullWildcardRegex = ".*";
function isASCII(str, extended) {
  return (extended ? /^[\x00-\xFF]*$/ : /^[\x00-\x7F]*$/).test(str);
}
function lexer(str, lenient = false) {
  const tokens = [];
  let i = 0;
  while (i < str.length) {
    const char = str[i];
    const ErrorOrInvalid = function(msg) {
      if (!lenient)
        throw new TypeError(msg);
      tokens.push({ type: "INVALID_CHAR", index: i, value: str[i++] });
    };
    if (char === "*") {
      tokens.push({ type: "ASTERISK", index: i, value: str[i++] });
      continue;
    }
    if (char === "+" || char === "?") {
      tokens.push({ type: "OTHER_MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      let name = "";
      let j = i + 1;
      while (j < str.length) {
        const code = str.substr(j, 1);
        if (j === i + 1 && regexIdentifierStart.test(code) || j !== i + 1 && regexIdentifierPart.test(code)) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name) {
        ErrorOrInvalid(`Missing parameter name at ${i}`);
        continue;
      }
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      let count = 1;
      let pattern = "";
      let j = i + 1;
      let error = false;
      if (str[j] === "?") {
        ErrorOrInvalid(`Pattern cannot start with "?" at ${j}`);
        continue;
      }
      while (j < str.length) {
        if (!isASCII(str[j], false)) {
          ErrorOrInvalid(`Invalid character '${str[j]}' at ${j}.`);
          error = true;
          break;
        }
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            ErrorOrInvalid(`Capturing groups are not allowed at ${j}`);
            error = true;
            break;
          }
        }
        pattern += str[j++];
      }
      if (error) {
        continue;
      }
      if (count) {
        ErrorOrInvalid(`Unbalanced pattern at ${i}`);
        continue;
      }
      if (!pattern) {
        ErrorOrInvalid(`Missing pattern at ${i}`);
        continue;
      }
      tokens.push({ type: "REGEX", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
function parse(str, options = {}) {
  const tokens = lexer(str);
  options.delimiter ?? (options.delimiter = "/#?");
  options.prefixes ?? (options.prefixes = "./");
  const segmentWildcardRegex = `[^${escapeString(options.delimiter)}]+?`;
  const result = [];
  let key = 0;
  let i = 0;
  let path = "";
  let nameSet = /* @__PURE__ */ new Set();
  const tryConsume = (type) => {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  };
  const tryConsumeModifier = () => {
    return tryConsume("OTHER_MODIFIER") ?? tryConsume("ASTERISK");
  };
  const mustConsume = (type) => {
    const value = tryConsume(type);
    if (value !== void 0)
      return value;
    const { type: nextType, index } = tokens[i];
    throw new TypeError(`Unexpected ${nextType} at ${index}, expected ${type}`);
  };
  const consumeText = () => {
    let result2 = "";
    let value;
    while (value = tryConsume("CHAR") ?? tryConsume("ESCAPED_CHAR")) {
      result2 += value;
    }
    return result2;
  };
  const DefaultEncodePart = (value) => {
    return value;
  };
  const encodePart = options.encodePart || DefaultEncodePart;
  let pendingFixedValue = "";
  const appendToPendingFixedValue = (value) => {
    pendingFixedValue += value;
  };
  const maybeAddPartFromPendingFixedValue = () => {
    if (!pendingFixedValue.length) {
      return;
    }
    result.push(new Part(
      3,
      "",
      "",
      encodePart(pendingFixedValue),
      "",
      3
      /* kNone */
    ));
    pendingFixedValue = "";
  };
  const addPart = (prefix, nameToken, regexOrWildcardToken, suffix, modifierToken) => {
    let modifier = 3;
    switch (modifierToken) {
      case "?":
        modifier = 1;
        break;
      case "*":
        modifier = 0;
        break;
      case "+":
        modifier = 2;
        break;
    }
    if (!nameToken && !regexOrWildcardToken && modifier === 3) {
      appendToPendingFixedValue(prefix);
      return;
    }
    maybeAddPartFromPendingFixedValue();
    if (!nameToken && !regexOrWildcardToken) {
      if (!prefix) {
        return;
      }
      result.push(new Part(3, "", "", encodePart(prefix), "", modifier));
      return;
    }
    let regexValue;
    if (!regexOrWildcardToken) {
      regexValue = segmentWildcardRegex;
    } else if (regexOrWildcardToken === "*") {
      regexValue = kFullWildcardRegex;
    } else {
      regexValue = regexOrWildcardToken;
    }
    let type = 2;
    if (regexValue === segmentWildcardRegex) {
      type = 1;
      regexValue = "";
    } else if (regexValue === kFullWildcardRegex) {
      type = 0;
      regexValue = "";
    }
    let name;
    if (nameToken) {
      name = nameToken;
    } else if (regexOrWildcardToken) {
      name = key++;
    }
    if (nameSet.has(name)) {
      throw new TypeError(`Duplicate name '${name}'.`);
    }
    nameSet.add(name);
    result.push(new Part(type, name, encodePart(prefix), regexValue, encodePart(suffix), modifier));
  };
  while (i < tokens.length) {
    const charToken = tryConsume("CHAR");
    const nameToken = tryConsume("NAME");
    let regexOrWildcardToken = tryConsume("REGEX");
    if (!nameToken && !regexOrWildcardToken) {
      regexOrWildcardToken = tryConsume("ASTERISK");
    }
    if (nameToken || regexOrWildcardToken) {
      let prefix = charToken ?? "";
      if (options.prefixes.indexOf(prefix) === -1) {
        appendToPendingFixedValue(prefix);
        prefix = "";
      }
      maybeAddPartFromPendingFixedValue();
      let modifierToken = tryConsumeModifier();
      addPart(prefix, nameToken, regexOrWildcardToken, "", modifierToken);
      continue;
    }
    const value = charToken ?? tryConsume("ESCAPED_CHAR");
    if (value) {
      appendToPendingFixedValue(value);
      continue;
    }
    const openToken = tryConsume("OPEN");
    if (openToken) {
      const prefix = consumeText();
      const nameToken2 = tryConsume("NAME");
      let regexOrWildcardToken2 = tryConsume("REGEX");
      if (!nameToken2 && !regexOrWildcardToken2) {
        regexOrWildcardToken2 = tryConsume("ASTERISK");
      }
      const suffix = consumeText();
      mustConsume("CLOSE");
      const modifierToken = tryConsumeModifier();
      addPart(prefix, nameToken2, regexOrWildcardToken2, suffix, modifierToken);
      continue;
    }
    maybeAddPartFromPendingFixedValue();
    mustConsume("END");
  }
  return result;
}
function escapeString(str) {
  return str.replace(/([.+*?^${}()[\]|/\\])/g, "\\$1");
}
function flags(options) {
  return options && options.ignoreCase ? "ui" : "u";
}
function stringToRegexp(path, names, options) {
  return partsToRegexp(parse(path, options), names, options);
}
function modifierToString(modifier) {
  switch (modifier) {
    case 0:
      return "*";
    case 1:
      return "?";
    case 2:
      return "+";
    case 3:
      return "";
  }
}
function partsToRegexp(parts, names, options = {}) {
  options.delimiter ?? (options.delimiter = "/#?");
  options.prefixes ?? (options.prefixes = "./");
  options.sensitive ?? (options.sensitive = false);
  options.strict ?? (options.strict = false);
  options.end ?? (options.end = true);
  options.start ?? (options.start = true);
  options.endsWith = "";
  let result = options.start ? "^" : "";
  for (const part of parts) {
    if (part.type === 3) {
      if (part.modifier === 3) {
        result += escapeString(part.value);
      } else {
        result += `(?:${escapeString(part.value)})${modifierToString(part.modifier)}`;
      }
      continue;
    }
    if (names)
      names.push(part.name);
    const segmentWildcardRegex = `[^${escapeString(options.delimiter)}]+?`;
    let regexValue = part.value;
    if (part.type === 1)
      regexValue = segmentWildcardRegex;
    else if (part.type === 0)
      regexValue = kFullWildcardRegex;
    if (!part.prefix.length && !part.suffix.length) {
      if (part.modifier === 3 || part.modifier === 1) {
        result += `(${regexValue})${modifierToString(part.modifier)}`;
      } else {
        result += `((?:${regexValue})${modifierToString(part.modifier)})`;
      }
      continue;
    }
    if (part.modifier === 3 || part.modifier === 1) {
      result += `(?:${escapeString(part.prefix)}(${regexValue})${escapeString(part.suffix)})`;
      result += modifierToString(part.modifier);
      continue;
    }
    result += `(?:${escapeString(part.prefix)}`;
    result += `((?:${regexValue})(?:`;
    result += escapeString(part.suffix);
    result += escapeString(part.prefix);
    result += `(?:${regexValue}))*)${escapeString(part.suffix)})`;
    if (part.modifier === 0) {
      result += "?";
    }
  }
  const endsWith = `[${escapeString(options.endsWith)}]|$`;
  const delimiter = `[${escapeString(options.delimiter)}]`;
  if (options.end) {
    if (!options.strict) {
      result += `${delimiter}?`;
    }
    if (!options.endsWith.length) {
      result += "$";
    } else {
      result += `(?=${endsWith})`;
    }
    return new RegExp(result, flags(options));
  }
  if (!options.strict) {
    result += `(?:${delimiter}(?=${endsWith}))?`;
  }
  let isEndDelimited = false;
  if (parts.length) {
    const lastPart = parts[parts.length - 1];
    if (lastPart.type === 3 && lastPart.modifier === 3) {
      isEndDelimited = options.delimiter.indexOf(lastPart) > -1;
    }
  }
  if (!isEndDelimited) {
    result += `(?=${delimiter}|${endsWith})`;
  }
  return new RegExp(result, flags(options));
}
var DEFAULT_OPTIONS = {
  delimiter: "",
  prefixes: "",
  sensitive: true,
  strict: true
};
var HOSTNAME_OPTIONS = {
  delimiter: ".",
  prefixes: "",
  sensitive: true,
  strict: true
};
var PATHNAME_OPTIONS = {
  delimiter: "/",
  prefixes: "/",
  sensitive: true,
  strict: true
};
function isAbsolutePathname(pathname, isPattern) {
  if (!pathname.length) {
    return false;
  }
  if (pathname[0] === "/") {
    return true;
  }
  if (!isPattern) {
    return false;
  }
  if (pathname.length < 2) {
    return false;
  }
  if ((pathname[0] == "\\" || pathname[0] == "{") && pathname[1] == "/") {
    return true;
  }
  return false;
}
function maybeStripPrefix(value, prefix) {
  if (value.startsWith(prefix)) {
    return value.substring(prefix.length, value.length);
  }
  return value;
}
function maybeStripSuffix(value, suffix) {
  if (value.endsWith(suffix)) {
    return value.substr(0, value.length - suffix.length);
  }
  return value;
}
function treatAsIPv6Hostname(value) {
  if (!value || value.length < 2) {
    return false;
  }
  if (value[0] === "[") {
    return true;
  }
  if ((value[0] === "\\" || value[0] === "{") && value[1] === "[") {
    return true;
  }
  return false;
}
var SPECIAL_SCHEMES = [
  "ftp",
  "file",
  "http",
  "https",
  "ws",
  "wss"
];
function isSpecialScheme(protocol_regexp) {
  if (!protocol_regexp) {
    return true;
  }
  for (const scheme of SPECIAL_SCHEMES) {
    if (protocol_regexp.test(scheme)) {
      return true;
    }
  }
  return false;
}
function canonicalizeHash(hash, isPattern) {
  hash = maybeStripPrefix(hash, "#");
  if (isPattern || hash === "") {
    return hash;
  }
  const url = new URL("https://example.com");
  url.hash = hash;
  return url.hash ? url.hash.substring(1, url.hash.length) : "";
}
function canonicalizeSearch(search, isPattern) {
  search = maybeStripPrefix(search, "?");
  if (isPattern || search === "") {
    return search;
  }
  const url = new URL("https://example.com");
  url.search = search;
  return url.search ? url.search.substring(1, url.search.length) : "";
}
function canonicalizeHostname(hostname, isPattern) {
  if (isPattern || hostname === "") {
    return hostname;
  }
  if (treatAsIPv6Hostname(hostname)) {
    return ipv6HostnameEncodeCallback(hostname);
  } else {
    return hostnameEncodeCallback(hostname);
  }
}
function canonicalizePassword(password, isPattern) {
  if (isPattern || password === "") {
    return password;
  }
  const url = new URL("https://example.com");
  url.password = password;
  return url.password;
}
function canonicalizeUsername(username, isPattern) {
  if (isPattern || username === "") {
    return username;
  }
  const url = new URL("https://example.com");
  url.username = username;
  return url.username;
}
function canonicalizePathname(pathname, protocol, isPattern) {
  if (isPattern || pathname === "") {
    return pathname;
  }
  if (protocol && !SPECIAL_SCHEMES.includes(protocol)) {
    const url = new URL(`${protocol}:${pathname}`);
    return url.pathname;
  }
  const leadingSlash = pathname[0] == "/";
  pathname = new URL(
    !leadingSlash ? "/-" + pathname : pathname,
    "https://example.com"
  ).pathname;
  if (!leadingSlash) {
    pathname = pathname.substring(2, pathname.length);
  }
  return pathname;
}
function canonicalizePort(port, protocol, isPattern) {
  if (defaultPortForProtocol(protocol) === port) {
    port = "";
  }
  if (isPattern || port === "") {
    return port;
  }
  return portEncodeCallback(port);
}
function canonicalizeProtocol(protocol, isPattern) {
  protocol = maybeStripSuffix(protocol, ":");
  if (isPattern || protocol === "") {
    return protocol;
  }
  return protocolEncodeCallback(protocol);
}
function defaultPortForProtocol(protocol) {
  switch (protocol) {
    case "ws":
    case "http":
      return "80";
    case "wws":
    case "https":
      return "443";
    case "ftp":
      return "21";
    default:
      return "";
  }
}
function protocolEncodeCallback(input) {
  if (input === "") {
    return input;
  }
  if (/^[-+.A-Za-z0-9]*$/.test(input))
    return input.toLowerCase();
  throw new TypeError(`Invalid protocol '${input}'.`);
}
function usernameEncodeCallback(input) {
  if (input === "") {
    return input;
  }
  const url = new URL("https://example.com");
  url.username = input;
  return url.username;
}
function passwordEncodeCallback(input) {
  if (input === "") {
    return input;
  }
  const url = new URL("https://example.com");
  url.password = input;
  return url.password;
}
function hostnameEncodeCallback(input) {
  if (input === "") {
    return input;
  }
  if (/[\t\n\r #%/:<>?@[\]^\\|]/g.test(input)) {
    throw new TypeError(`Invalid hostname '${input}'`);
  }
  const url = new URL("https://example.com");
  url.hostname = input;
  return url.hostname;
}
function ipv6HostnameEncodeCallback(input) {
  if (input === "") {
    return input;
  }
  if (/[^0-9a-fA-F[\]:]/g.test(input)) {
    throw new TypeError(`Invalid IPv6 hostname '${input}'`);
  }
  return input.toLowerCase();
}
function portEncodeCallback(input) {
  if (input === "") {
    return input;
  }
  if (/^[0-9]*$/.test(input) && parseInt(input) <= 65535) {
    return input;
  }
  throw new TypeError(`Invalid port '${input}'.`);
}
function standardURLPathnameEncodeCallback(input) {
  if (input === "") {
    return input;
  }
  const url = new URL("https://example.com");
  url.pathname = input[0] !== "/" ? "/-" + input : input;
  if (input[0] !== "/") {
    return url.pathname.substring(2, url.pathname.length);
  }
  return url.pathname;
}
function pathURLPathnameEncodeCallback(input) {
  if (input === "") {
    return input;
  }
  const url = new URL(`data:${input}`);
  return url.pathname;
}
function searchEncodeCallback(input) {
  if (input === "") {
    return input;
  }
  const url = new URL("https://example.com");
  url.search = input;
  return url.search.substring(1, url.search.length);
}
function hashEncodeCallback(input) {
  if (input === "") {
    return input;
  }
  const url = new URL("https://example.com");
  url.hash = input;
  return url.hash.substring(1, url.hash.length);
}
var Parser = class {
  constructor(input) {
    this.tokenList = [];
    this.internalResult = {};
    this.tokenIndex = 0;
    this.tokenIncrement = 1;
    this.componentStart = 0;
    this.state = 0;
    this.groupDepth = 0;
    this.hostnameIPv6BracketDepth = 0;
    this.shouldTreatAsStandardURL = false;
    this.input = input;
  }
  // Return the parse result.  The result is only available after the
  // `parse()` method completes.
  get result() {
    return this.internalResult;
  }
  // Attempt to parse the input string used to construct the Parser object.
  // This method may only be called once.  Any errors will be thrown as an
  // exception.  Retrieve the parse result by accessing the `Parser.result`
  // property getter.
  parse() {
    this.tokenList = lexer(
      this.input,
      /*lenient=*/
      true
    );
    for (; this.tokenIndex < this.tokenList.length; this.tokenIndex += this.tokenIncrement) {
      this.tokenIncrement = 1;
      if (this.tokenList[this.tokenIndex].type === "END") {
        if (this.state === 0) {
          this.rewind();
          if (this.isHashPrefix()) {
            this.changeState(
              9,
              /*skip=*/
              1
            );
          } else if (this.isSearchPrefix()) {
            this.changeState(
              8,
              /*skip=*/
              1
            );
            this.internalResult.hash = "";
          } else {
            this.changeState(
              7,
              /*skip=*/
              0
            );
            this.internalResult.search = "";
            this.internalResult.hash = "";
          }
          continue;
        } else if (this.state === 2) {
          this.rewindAndSetState(
            5
            /* HOSTNAME */
          );
          continue;
        }
        this.changeState(
          10,
          /*skip=*/
          0
        );
        break;
      }
      if (this.groupDepth > 0) {
        if (this.isGroupClose()) {
          this.groupDepth -= 1;
        } else {
          continue;
        }
      }
      if (this.isGroupOpen()) {
        this.groupDepth += 1;
        continue;
      }
      switch (this.state) {
        case 0:
          if (this.isProtocolSuffix()) {
            this.internalResult.username = "";
            this.internalResult.password = "";
            this.internalResult.hostname = "";
            this.internalResult.port = "";
            this.internalResult.pathname = "";
            this.internalResult.search = "";
            this.internalResult.hash = "";
            this.rewindAndSetState(
              1
              /* PROTOCOL */
            );
          }
          break;
        case 1:
          if (this.isProtocolSuffix()) {
            this.computeShouldTreatAsStandardURL();
            let nextState = 7;
            let skip = 1;
            if (this.shouldTreatAsStandardURL) {
              this.internalResult.pathname = "/";
            }
            if (this.nextIsAuthoritySlashes()) {
              nextState = 2;
              skip = 3;
            } else if (this.shouldTreatAsStandardURL) {
              nextState = 2;
            }
            this.changeState(nextState, skip);
          }
          break;
        case 2:
          if (this.isIdentityTerminator()) {
            this.rewindAndSetState(
              3
              /* USERNAME */
            );
          } else if (this.isPathnameStart() || this.isSearchPrefix() || this.isHashPrefix()) {
            this.rewindAndSetState(
              5
              /* HOSTNAME */
            );
          }
          break;
        case 3:
          if (this.isPasswordPrefix()) {
            this.changeState(
              4,
              /*skip=*/
              1
            );
          } else if (this.isIdentityTerminator()) {
            this.changeState(
              5,
              /*skip=*/
              1
            );
          }
          break;
        case 4:
          if (this.isIdentityTerminator()) {
            this.changeState(
              5,
              /*skip=*/
              1
            );
          }
          break;
        case 5:
          if (this.isIPv6Open()) {
            this.hostnameIPv6BracketDepth += 1;
          } else if (this.isIPv6Close()) {
            this.hostnameIPv6BracketDepth -= 1;
          }
          if (this.isPortPrefix() && !this.hostnameIPv6BracketDepth) {
            this.changeState(
              6,
              /*skip=*/
              1
            );
          } else if (this.isPathnameStart()) {
            this.changeState(
              7,
              /*skip=*/
              0
            );
          } else if (this.isSearchPrefix()) {
            this.changeState(
              8,
              /*skip=*/
              1
            );
          } else if (this.isHashPrefix()) {
            this.changeState(
              9,
              /*skip=*/
              1
            );
          }
          break;
        case 6:
          if (this.isPathnameStart()) {
            this.changeState(
              7,
              /*skip=*/
              0
            );
          } else if (this.isSearchPrefix()) {
            this.changeState(
              8,
              /*skip=*/
              1
            );
          } else if (this.isHashPrefix()) {
            this.changeState(
              9,
              /*skip=*/
              1
            );
          }
          break;
        case 7:
          if (this.isSearchPrefix()) {
            this.changeState(
              8,
              /*skip=*/
              1
            );
          } else if (this.isHashPrefix()) {
            this.changeState(
              9,
              /*skip=*/
              1
            );
          }
          break;
        case 8:
          if (this.isHashPrefix()) {
            this.changeState(
              9,
              /*skip=*/
              1
            );
          }
          break;
        case 9:
          break;
        case 10:
          break;
      }
    }
  }
  changeState(newState, skip) {
    switch (this.state) {
      case 0:
        break;
      case 1:
        this.internalResult.protocol = this.makeComponentString();
        break;
      case 2:
        break;
      case 3:
        this.internalResult.username = this.makeComponentString();
        break;
      case 4:
        this.internalResult.password = this.makeComponentString();
        break;
      case 5:
        this.internalResult.hostname = this.makeComponentString();
        break;
      case 6:
        this.internalResult.port = this.makeComponentString();
        break;
      case 7:
        this.internalResult.pathname = this.makeComponentString();
        break;
      case 8:
        this.internalResult.search = this.makeComponentString();
        break;
      case 9:
        this.internalResult.hash = this.makeComponentString();
        break;
      case 10:
        break;
    }
    this.changeStateWithoutSettingComponent(newState, skip);
  }
  changeStateWithoutSettingComponent(newState, skip) {
    this.state = newState;
    this.componentStart = this.tokenIndex + skip;
    this.tokenIndex += skip;
    this.tokenIncrement = 0;
  }
  rewind() {
    this.tokenIndex = this.componentStart;
    this.tokenIncrement = 0;
  }
  rewindAndSetState(newState) {
    this.rewind();
    this.state = newState;
  }
  safeToken(index) {
    if (index < 0) {
      index = this.tokenList.length - index;
    }
    if (index < this.tokenList.length) {
      return this.tokenList[index];
    }
    return this.tokenList[this.tokenList.length - 1];
  }
  isNonSpecialPatternChar(index, value) {
    const token = this.safeToken(index);
    return token.value === value && (token.type === "CHAR" || token.type === "ESCAPED_CHAR" || token.type === "INVALID_CHAR");
  }
  isProtocolSuffix() {
    return this.isNonSpecialPatternChar(this.tokenIndex, ":");
  }
  nextIsAuthoritySlashes() {
    return this.isNonSpecialPatternChar(this.tokenIndex + 1, "/") && this.isNonSpecialPatternChar(this.tokenIndex + 2, "/");
  }
  isIdentityTerminator() {
    return this.isNonSpecialPatternChar(this.tokenIndex, "@");
  }
  isPasswordPrefix() {
    return this.isNonSpecialPatternChar(this.tokenIndex, ":");
  }
  isPortPrefix() {
    return this.isNonSpecialPatternChar(this.tokenIndex, ":");
  }
  isPathnameStart() {
    return this.isNonSpecialPatternChar(this.tokenIndex, "/");
  }
  isSearchPrefix() {
    if (this.isNonSpecialPatternChar(this.tokenIndex, "?")) {
      return true;
    }
    if (this.tokenList[this.tokenIndex].value !== "?") {
      return false;
    }
    const previousToken = this.safeToken(this.tokenIndex - 1);
    return previousToken.type !== "NAME" && previousToken.type !== "REGEX" && previousToken.type !== "CLOSE" && previousToken.type !== "ASTERISK";
  }
  isHashPrefix() {
    return this.isNonSpecialPatternChar(this.tokenIndex, "#");
  }
  isGroupOpen() {
    return this.tokenList[this.tokenIndex].type == "OPEN";
  }
  isGroupClose() {
    return this.tokenList[this.tokenIndex].type == "CLOSE";
  }
  isIPv6Open() {
    return this.isNonSpecialPatternChar(this.tokenIndex, "[");
  }
  isIPv6Close() {
    return this.isNonSpecialPatternChar(this.tokenIndex, "]");
  }
  makeComponentString() {
    const token = this.tokenList[this.tokenIndex];
    const componentCharStart = this.safeToken(this.componentStart).index;
    return this.input.substring(componentCharStart, token.index);
  }
  computeShouldTreatAsStandardURL() {
    const options = {};
    Object.assign(options, DEFAULT_OPTIONS);
    options.encodePart = protocolEncodeCallback;
    const regexp = stringToRegexp(
      this.makeComponentString(),
      /*keys=*/
      void 0,
      options
    );
    this.shouldTreatAsStandardURL = isSpecialScheme(regexp);
  }
};
var COMPONENTS = [
  "protocol",
  "username",
  "password",
  "hostname",
  "port",
  "pathname",
  "search",
  "hash"
];
var DEFAULT_PATTERN = "*";
function extractValues(url, baseURL) {
  if (typeof url !== "string") {
    throw new TypeError(`parameter 1 is not of type 'string'.`);
  }
  const o = new URL(url, baseURL);
  return {
    protocol: o.protocol.substring(0, o.protocol.length - 1),
    username: o.username,
    password: o.password,
    hostname: o.hostname,
    port: o.port,
    pathname: o.pathname,
    search: o.search !== "" ? o.search.substring(1, o.search.length) : void 0,
    hash: o.hash !== "" ? o.hash.substring(1, o.hash.length) : void 0
  };
}
function processBaseURLString(input, isPattern) {
  if (!isPattern) {
    return input;
  }
  return escapePatternString(input);
}
function applyInit(o, init, isPattern) {
  let baseURL;
  if (typeof init.baseURL === "string") {
    try {
      baseURL = new URL(init.baseURL);
      o.protocol = processBaseURLString(baseURL.protocol.substring(0, baseURL.protocol.length - 1), isPattern);
      o.username = processBaseURLString(baseURL.username, isPattern);
      o.password = processBaseURLString(baseURL.password, isPattern);
      o.hostname = processBaseURLString(baseURL.hostname, isPattern);
      o.port = processBaseURLString(baseURL.port, isPattern);
      o.pathname = processBaseURLString(baseURL.pathname, isPattern);
      o.search = processBaseURLString(baseURL.search.substring(1, baseURL.search.length), isPattern);
      o.hash = processBaseURLString(baseURL.hash.substring(1, baseURL.hash.length), isPattern);
    } catch {
      throw new TypeError(`invalid baseURL '${init.baseURL}'.`);
    }
  }
  if (typeof init.protocol === "string") {
    o.protocol = canonicalizeProtocol(init.protocol, isPattern);
  }
  if (typeof init.username === "string") {
    o.username = canonicalizeUsername(init.username, isPattern);
  }
  if (typeof init.password === "string") {
    o.password = canonicalizePassword(init.password, isPattern);
  }
  if (typeof init.hostname === "string") {
    o.hostname = canonicalizeHostname(init.hostname, isPattern);
  }
  if (typeof init.port === "string") {
    o.port = canonicalizePort(init.port, o.protocol, isPattern);
  }
  if (typeof init.pathname === "string") {
    o.pathname = init.pathname;
    if (baseURL && !isAbsolutePathname(o.pathname, isPattern)) {
      const slashIndex = baseURL.pathname.lastIndexOf("/");
      if (slashIndex >= 0) {
        o.pathname = processBaseURLString(baseURL.pathname.substring(0, slashIndex + 1), isPattern) + o.pathname;
      }
    }
    o.pathname = canonicalizePathname(o.pathname, o.protocol, isPattern);
  }
  if (typeof init.search === "string") {
    o.search = canonicalizeSearch(init.search, isPattern);
  }
  if (typeof init.hash === "string") {
    o.hash = canonicalizeHash(init.hash, isPattern);
  }
  return o;
}
function escapePatternString(value) {
  return value.replace(/([+*?:{}()\\])/g, "\\$1");
}
function escapeRegexpString(value) {
  return value.replace(/([.+*?^${}()[\]|/\\])/g, "\\$1");
}
function partsToPattern(parts, options) {
  options.delimiter ?? (options.delimiter = "/#?");
  options.prefixes ?? (options.prefixes = "./");
  options.sensitive ?? (options.sensitive = false);
  options.strict ?? (options.strict = false);
  options.end ?? (options.end = true);
  options.start ?? (options.start = true);
  options.endsWith = "";
  const kFullWildcardRegex2 = ".*";
  const segmentWildcardRegex = `[^${escapeRegexpString(options.delimiter)}]+?`;
  const regexIdentifierPart2 = /[$_\u200C\u200D\p{ID_Continue}]/u;
  let result = "";
  for (let i = 0; i < parts.length; ++i) {
    const part = parts[i];
    if (part.type === 3) {
      if (part.modifier === 3) {
        result += escapePatternString(part.value);
        continue;
      }
      result += `{${escapePatternString(part.value)}}${modifierToString(part.modifier)}`;
      continue;
    }
    const customName = part.hasCustomName();
    let needsGrouping = !!part.suffix.length || !!part.prefix.length && (part.prefix.length !== 1 || !options.prefixes.includes(part.prefix));
    const lastPart = i > 0 ? parts[i - 1] : null;
    const nextPart = i < parts.length - 1 ? parts[i + 1] : null;
    if (!needsGrouping && customName && part.type === 1 && part.modifier === 3 && nextPart && !nextPart.prefix.length && !nextPart.suffix.length) {
      if (nextPart.type === 3) {
        const code = nextPart.value.length > 0 ? nextPart.value[0] : "";
        needsGrouping = regexIdentifierPart2.test(code);
      } else {
        needsGrouping = !nextPart.hasCustomName();
      }
    }
    if (!needsGrouping && !part.prefix.length && lastPart && lastPart.type === 3) {
      const code = lastPart.value[lastPart.value.length - 1];
      needsGrouping = options.prefixes.includes(code);
    }
    if (needsGrouping) {
      result += "{";
    }
    result += escapePatternString(part.prefix);
    if (customName) {
      result += `:${part.name}`;
    }
    if (part.type === 2) {
      result += `(${part.value})`;
    } else if (part.type === 1) {
      if (!customName) {
        result += `(${segmentWildcardRegex})`;
      }
    } else if (part.type === 0) {
      if (!customName && (!lastPart || lastPart.type === 3 || lastPart.modifier !== 3 || needsGrouping || part.prefix !== "")) {
        result += "*";
      } else {
        result += `(${kFullWildcardRegex2})`;
      }
    }
    if (part.type === 1 && customName && !!part.suffix.length) {
      if (regexIdentifierPart2.test(part.suffix[0])) {
        result += "\\";
      }
    }
    result += escapePatternString(part.suffix);
    if (needsGrouping) {
      result += "}";
    }
    if (part.modifier !== 3) {
      result += modifierToString(part.modifier);
    }
  }
  return result;
}
var URLPattern = class {
  constructor(init = {}, baseURLOrOptions, options) {
    this.regexp = {};
    this.names = {};
    this.component_pattern = {};
    this.parts = {};
    try {
      let baseURL = void 0;
      if (typeof baseURLOrOptions === "string") {
        baseURL = baseURLOrOptions;
      } else {
        options = baseURLOrOptions;
      }
      if (typeof init === "string") {
        const parser = new Parser(init);
        parser.parse();
        init = parser.result;
        if (baseURL === void 0 && typeof init.protocol !== "string") {
          throw new TypeError(`A base URL must be provided for a relative constructor string.`);
        }
        init.baseURL = baseURL;
      } else {
        if (!init || typeof init !== "object") {
          throw new TypeError(`parameter 1 is not of type 'string' and cannot convert to dictionary.`);
        }
        if (baseURL) {
          throw new TypeError(`parameter 1 is not of type 'string'.`);
        }
      }
      if (typeof options === "undefined") {
        options = { ignoreCase: false };
      }
      const ignoreCaseOptions = { ignoreCase: options.ignoreCase === true };
      const defaults = {
        pathname: DEFAULT_PATTERN,
        protocol: DEFAULT_PATTERN,
        username: DEFAULT_PATTERN,
        password: DEFAULT_PATTERN,
        hostname: DEFAULT_PATTERN,
        port: DEFAULT_PATTERN,
        search: DEFAULT_PATTERN,
        hash: DEFAULT_PATTERN
      };
      this.pattern = applyInit(defaults, init, true);
      if (defaultPortForProtocol(this.pattern.protocol) === this.pattern.port) {
        this.pattern.port = "";
      }
      let component;
      for (component of COMPONENTS) {
        if (!(component in this.pattern))
          continue;
        const options2 = {};
        const pattern = this.pattern[component];
        this.names[component] = [];
        switch (component) {
          case "protocol":
            Object.assign(options2, DEFAULT_OPTIONS);
            options2.encodePart = protocolEncodeCallback;
            break;
          case "username":
            Object.assign(options2, DEFAULT_OPTIONS);
            options2.encodePart = usernameEncodeCallback;
            break;
          case "password":
            Object.assign(options2, DEFAULT_OPTIONS);
            options2.encodePart = passwordEncodeCallback;
            break;
          case "hostname":
            Object.assign(options2, HOSTNAME_OPTIONS);
            if (treatAsIPv6Hostname(pattern)) {
              options2.encodePart = ipv6HostnameEncodeCallback;
            } else {
              options2.encodePart = hostnameEncodeCallback;
            }
            break;
          case "port":
            Object.assign(options2, DEFAULT_OPTIONS);
            options2.encodePart = portEncodeCallback;
            break;
          case "pathname":
            if (isSpecialScheme(this.regexp.protocol)) {
              Object.assign(options2, PATHNAME_OPTIONS, ignoreCaseOptions);
              options2.encodePart = standardURLPathnameEncodeCallback;
            } else {
              Object.assign(options2, DEFAULT_OPTIONS, ignoreCaseOptions);
              options2.encodePart = pathURLPathnameEncodeCallback;
            }
            break;
          case "search":
            Object.assign(options2, DEFAULT_OPTIONS, ignoreCaseOptions);
            options2.encodePart = searchEncodeCallback;
            break;
          case "hash":
            Object.assign(options2, DEFAULT_OPTIONS, ignoreCaseOptions);
            options2.encodePart = hashEncodeCallback;
            break;
        }
        try {
          this.parts[component] = parse(pattern, options2);
          this.regexp[component] = partsToRegexp(
            this.parts[component],
            /* out */
            this.names[component],
            options2
          );
          this.component_pattern[component] = partsToPattern(this.parts[component], options2);
        } catch (err) {
          throw new TypeError(`invalid ${component} pattern '${this.pattern[component]}'.`);
        }
      }
    } catch (err) {
      throw new TypeError(`Failed to construct 'URLPattern': ${err.message}`);
    }
  }
  test(input = {}, baseURL) {
    let values = {
      pathname: "",
      protocol: "",
      username: "",
      password: "",
      hostname: "",
      port: "",
      search: "",
      hash: ""
    };
    if (typeof input !== "string" && baseURL) {
      throw new TypeError(`parameter 1 is not of type 'string'.`);
    }
    if (typeof input === "undefined") {
      return false;
    }
    try {
      if (typeof input === "object") {
        values = applyInit(values, input, false);
      } else {
        values = applyInit(values, extractValues(input, baseURL), false);
      }
    } catch (err) {
      return false;
    }
    let component;
    for (component of COMPONENTS) {
      if (!this.regexp[component].exec(values[component])) {
        return false;
      }
    }
    return true;
  }
  exec(input = {}, baseURL) {
    let values = {
      pathname: "",
      protocol: "",
      username: "",
      password: "",
      hostname: "",
      port: "",
      search: "",
      hash: ""
    };
    if (typeof input !== "string" && baseURL) {
      throw new TypeError(`parameter 1 is not of type 'string'.`);
    }
    if (typeof input === "undefined") {
      return;
    }
    try {
      if (typeof input === "object") {
        values = applyInit(values, input, false);
      } else {
        values = applyInit(values, extractValues(input, baseURL), false);
      }
    } catch (err) {
      return null;
    }
    let result = {};
    if (baseURL) {
      result.inputs = [input, baseURL];
    } else {
      result.inputs = [input];
    }
    let component;
    for (component of COMPONENTS) {
      let match = this.regexp[component].exec(values[component]);
      if (!match) {
        return null;
      }
      let groups = {};
      for (let [i, name] of this.names[component].entries()) {
        if (typeof name === "string" || typeof name === "number") {
          let value = match[i + 1];
          groups[name] = value;
        }
      }
      result[component] = {
        input: values[component] ?? "",
        groups
      };
    }
    return result;
  }
  static compareComponent(component, left, right) {
    const comparePart = (left2, right2) => {
      for (let attr of ["type", "modifier", "prefix", "value", "suffix"]) {
        if (left2[attr] < right2[attr])
          return -1;
        else if (left2[attr] === right2[attr])
          continue;
        else
          return 1;
      }
      return 0;
    };
    const emptyFixedPart = new Part(
      3,
      "",
      "",
      "",
      "",
      3
      /* kNone */
    );
    const wildcardOnlyPart = new Part(
      0,
      "",
      "",
      "",
      "",
      3
      /* kNone */
    );
    const comparePartList = (left2, right2) => {
      let i = 0;
      for (; i < Math.min(left2.length, right2.length); ++i) {
        let result = comparePart(left2[i], right2[i]);
        if (result)
          return result;
      }
      if (left2.length === right2.length) {
        return 0;
      }
      return comparePart(left2[i] ?? emptyFixedPart, right2[i] ?? emptyFixedPart);
    };
    if (!left.component_pattern[component] && !right.component_pattern[component]) {
      return 0;
    }
    if (left.component_pattern[component] && !right.component_pattern[component]) {
      return comparePartList(left.parts[component], [wildcardOnlyPart]);
    }
    if (!left.component_pattern[component] && right.component_pattern[component]) {
      return comparePartList([wildcardOnlyPart], right.parts[component]);
    }
    return comparePartList(left.parts[component], right.parts[component]);
  }
  get protocol() {
    return this.component_pattern.protocol;
  }
  get username() {
    return this.component_pattern.username;
  }
  get password() {
    return this.component_pattern.password;
  }
  get hostname() {
    return this.component_pattern.hostname;
  }
  get port() {
    return this.component_pattern.port;
  }
  get pathname() {
    return this.component_pattern.pathname;
  }
  get search() {
    return this.component_pattern.search;
  }
  get hash() {
    return this.component_pattern.hash;
  }
};

// node_modules/urlpattern-polyfill/index.js
if (!globalThis.URLPattern) {
  globalThis.URLPattern = URLPattern;
}

// src/path_parameters.ts
var getPathParameters = (path, url) => {
  var _a;
  if (path === void 0) {
    return {};
  }
  const trimmedURL = url.endsWith("/") ? url.slice(0, -1) : url;
  const matcher = new URLPattern({ pathname: path, baseURL: trimmedURL });
  const match = (_a = matcher.exec(trimmedURL)) == null ? void 0 : _a.pathname.groups;
  if (!match) {
    return {};
  }
  const parameters = Object.entries(match).reduce((acc, [key, value]) => {
    if (value === void 0) {
      return acc;
    }
    return {
      ...acc,
      [key]: value
    };
  }, {});
  return parameters;
};

// src/request_id.ts
var getRequestId = (requestIdHeader) => requestIdHeader ?? "";

// src/server.ts
import { env } from "process";
var getServerObject = () => ({
  region: env.AWS_REGION
});

// src/site.ts
import { env as env2 } from "process";
var getSiteObject = () => ({
  id: env2.SITE_ID,
  name: env2.SITE_NAME,
  url: env2.URL
});

// src/context.ts
var json = (input) => {
  const data = JSON.stringify(input);
  return new Response(data, {
    headers: {
      "content-type": "application/json"
    }
  });
};
var getContext = (req, cookies) => {
  let params = {};
  try {
    params = getPathParameters(req[requestRoute], req.url);
  } catch {
    console.log(`Could not parse function route ${req[requestRoute]}.`);
  }
  const context = {
    account: getAccountObject(req.headers.get(NFAccountID)),
    cookies: cookies.getPublicInterface(),
    deploy: getDeploybject(req.headers.get(NFDeployID)),
    flags: getRequestFlags(req),
    geo: parseGeoHeader(req.headers.get(NFGeo)),
    ip: getIP(req.headers.get(NFClientConnectionIP)),
    json,
    log: console.log,
    next: () => {
      throw new Error("`context.next` is not implemented for serverless functions");
    },
    params,
    requestId: getRequestId(req.headers.get(NFRequestID)),
    rewrite: (input) => {
      const url = makeURL(input, req.url);
      return rewrite(url);
    },
    server: getServerObject(),
    site: getSiteObject()
  };
  return context;
};
var makeURL = (input, baseURL) => {
  if (input instanceof URL) {
    return input;
  }
  if (input.startsWith("/")) {
    const url = new URL(baseURL);
    url.pathname = input;
    return url;
  }
  return new URL(input);
};
var rewrite = async (url) => {
  const res = await fetch(url);
  return res;
};

// node_modules/@netlify/node-cookies/dist/http/cookies.js
import assert from "assert";

// node_modules/@netlify/node-cookies/dist/datetime/to_imf.js
function toIMF(date) {
  function dtPad(v, lPad = 2) {
    return v.padStart(lPad, "0");
  }
  const d = dtPad(date.getUTCDate().toString());
  const h = dtPad(date.getUTCHours().toString());
  const min = dtPad(date.getUTCMinutes().toString());
  const s = dtPad(date.getUTCSeconds().toString());
  const y = date.getUTCFullYear();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${days[date.getUTCDay()]}, ${d} ${months[date.getUTCMonth()]} ${y} ${h}:${min}:${s} GMT`;
}

// node_modules/@netlify/node-cookies/dist/http/cookies.js
var FIELD_CONTENT_REGEXP = /^(?=[\u0020-\u007E]*$)[^()@<>,;:\\"[\]?={}\s]+$/;
function toString(cookie) {
  if (!cookie.name) {
    return "";
  }
  const out = [];
  validateName(cookie.name);
  validateValue(cookie.name, cookie.value);
  out.push(`${cookie.name}=${cookie.value}`);
  if (cookie.name.startsWith("__Secure")) {
    cookie.secure = true;
  }
  if (cookie.name.startsWith("__Host")) {
    cookie.path = "/";
    cookie.secure = true;
    delete cookie.domain;
  }
  if (cookie.secure) {
    out.push("Secure");
  }
  if (cookie.httpOnly) {
    out.push("HttpOnly");
  }
  if (typeof cookie.maxAge === "number" && Number.isInteger(cookie.maxAge)) {
    assert(cookie.maxAge >= 0, "Max-Age must be an integer superior or equal to 0");
    out.push(`Max-Age=${cookie.maxAge}`);
  }
  if (cookie.domain) {
    validateDomain(cookie.domain);
    out.push(`Domain=${cookie.domain}`);
  }
  if (cookie.sameSite) {
    out.push(`SameSite=${cookie.sameSite}`);
  }
  if (cookie.path) {
    validatePath(cookie.path);
    out.push(`Path=${cookie.path}`);
  }
  if (cookie.expires) {
    const { expires } = cookie;
    const dateString = toIMF(typeof expires === "number" ? new Date(expires) : expires);
    out.push(`Expires=${dateString}`);
  }
  if (cookie.unparsed) {
    out.push(cookie.unparsed.join("; "));
  }
  return out.join("; ");
}
function validateName(name) {
  if (name && !FIELD_CONTENT_REGEXP.test(name)) {
    throw new TypeError(`Invalid cookie name: "${name}".`);
  }
}
function validatePath(path) {
  if (path == null) {
    return;
  }
  for (let i = 0; i < path.length; i++) {
    const c = path.charAt(i);
    if (c < String.fromCharCode(32) || c > String.fromCharCode(126) || c == ";") {
      throw new Error(`${path}: Invalid cookie path char '${c}'`);
    }
  }
}
function validateValue(name, value) {
  if (value == null || name == null)
    return;
  for (let i = 0; i < value.length; i++) {
    const c = value.charAt(i);
    if (c < String.fromCharCode(33) || c == String.fromCharCode(34) || c == String.fromCharCode(44) || c == String.fromCharCode(59) || c == String.fromCharCode(92) || c == String.fromCharCode(127)) {
      throw new Error(`RFC2616 cookie '${name}' cannot contain character '${c}'`);
    }
    if (c > String.fromCharCode(128)) {
      throw new Error(`RFC2616 cookie '${name}' can only have US-ASCII chars as value${c.charCodeAt(0).toString(16)}`);
    }
  }
}
function validateDomain(domain) {
  if (domain == null) {
    return;
  }
  const char1 = domain.charAt(0);
  const charN = domain.charAt(domain.length - 1);
  if (char1 == "-" || charN == "." || charN == "-") {
    throw new Error(`Invalid first/last char in cookie domain: ${domain}`);
  }
}
function getCookies(headers) {
  const cookie = headers.get("Cookie");
  if (cookie != null) {
    const out = {};
    const c = cookie.split(";");
    for (const kv of c) {
      const [cookieKey, ...cookieVal] = kv.split("=");
      assert(cookieKey != null);
      const key = cookieKey.trim();
      out[key] = cookieVal.join("=");
    }
    return out;
  }
  return {};
}
function setCookie(headers, cookie) {
  const v = toString(cookie);
  if (v) {
    headers.append("Set-Cookie", v);
  }
}
function deleteCookie(headers, name, attributes) {
  setCookie(headers, Object.assign({ name, value: "", expires: /* @__PURE__ */ new Date(0) }, attributes));
}

// src/cookie_store.ts
var CookieStore = class {
  constructor(request) {
    this.ops = [];
    this.request = request;
  }
  apply(response) {
    this.ops.forEach((op) => {
      switch (op.type) {
        case "delete":
          deleteCookie(response.headers, op.options.name, {
            domain: op.options.domain,
            path: op.options.path
          });
          break;
        case "set":
          setCookie(response.headers, op.cookie);
          break;
        default:
      }
    });
  }
  delete(input) {
    const defaultOptions = {
      path: "/"
    };
    const options = typeof input === "string" ? { name: input } : input;
    this.ops.push({
      options: { ...defaultOptions, ...options },
      type: "delete"
    });
  }
  get(name) {
    return getCookies(this.request.headers)[name];
  }
  getPublicInterface() {
    return {
      delete: this.delete.bind(this),
      get: this.get.bind(this),
      set: this.set.bind(this)
    };
  }
  set(key, value) {
    let cookie;
    if (typeof key === "string") {
      if (typeof value !== "string") {
        throw new TypeError(`You must provide the cookie value as a string to 'cookies.set'`);
      }
      cookie = { name: key, value };
    } else {
      cookie = key;
    }
    this.ops.push({ cookie, type: "set" });
  }
};

// src/environment.ts
import { Buffer as Buffer4 } from "buffer";
import process from "process";
var PURGE_API_TOKEN_VARIABLE = "NETLIFY_PURGE_API_TOKEN";
var NETLIFY_BLOBS_CONTEXT_VARIABLE = "NETLIFY_BLOBS_CONTEXT";
var setEnvironmentContext = (headers, event, lambdaContext) => {
  var _a, _b;
  const { blobs } = event;
  const purgeAPIToken = (_b = (_a = lambdaContext == null ? void 0 : lambdaContext.clientContext) == null ? void 0 : _a.custom) == null ? void 0 : _b.purge_api_token;
  if (typeof blobs === "string" && blobs !== "") {
    try {
      const rawData = Buffer4.from(blobs, "base64").toString("utf8");
      const data = JSON.parse(rawData);
      const siteID = headers.get(NFSiteID);
      const deployID = headers.get(NFDeployID);
      process.env[NETLIFY_BLOBS_CONTEXT_VARIABLE] = Buffer4.from(
        JSON.stringify({
          edgeURL: data.url,
          token: data.token,
          siteID,
          deployID
        })
      ).toString("base64");
    } catch (error) {
      console.error("An internal error occurred while setting up Netlify Blobs:", error);
    }
  }
  if (typeof purgeAPIToken === "string" && purgeAPIToken !== "") {
    process.env[PURGE_API_TOKEN_VARIABLE] = purgeAPIToken;
  }
};

// src/errors.ts
var NetlifyUserError = class _NetlifyUserError extends Error {
  constructor(message) {
    super(message);
    this.name = "NetlifyUserError";
    Object.setPrototypeOf(this, _NetlifyUserError.prototype);
  }
};

// src/api.ts
var pipeline = promisify(pipelineCb);
var getLambdaHandler = (func) => awslambda.streamifyResponse(async (event, responseStream, lambdaContext) => {
  const { body: rawBody, httpMethod: method, isBase64Encoded, headers: headersObject, rawUrl, route } = event;
  const headers = fromEventHeaders(headersObject);
  const body = buildRequestBody(rawBody, isBase64Encoded);
  const req = new NetlifyRequest(rawUrl, {
    body,
    headers,
    method
  });
  setEnvironmentContext(headers, event, lambdaContext);
  setRequestFlags(event, req);
  if (route) {
    req[requestRoute] = route;
  }
  const cookies = new CookieStore(req);
  const context = getContext(req, cookies);
  const res = await func.default(req, context);
  if (res instanceof Response) {
    cookies.apply(res);
    const { body: body2, headers: headers2, status } = res;
    const requestFlags2 = getRequestFlags(req).getEvaluatedFlags();
    if (requestFlags2.size !== 0) {
      headers2.set(NFRequestFlags, [...requestFlags2].join(","));
    }
    const responseMetadata = {
      multiValueHeaders: toMultiValueHeaders(headers2),
      statusCode: status
    };
    const responseBody = awslambda.HttpResponseStream.from(responseStream, responseMetadata);
    if (body2 === null) {
      responseBody.write("");
      responseBody.end();
      return;
    }
    const stream = Readable.fromWeb(body2);
    await pipeline(stream, responseBody);
    return;
  }
  if (res === void 0) {
    const responseBody = awslambda.HttpResponseStream.from(responseStream, { statusCode: 204 });
    responseBody.end();
    return;
  }
  throw new NetlifyUserError(`Function returned an unsupported value. Accepted types are 'Response' or 'undefined'`);
});

// src/globals.ts
import process2 from "process";
var env3 = {
  delete: (key) => {
    delete process2.env[key];
  },
  get: (key) => process2.env[key],
  has: (key) => Boolean(process2.env[key]),
  set: (key, value) => {
    process2.env[key] = value;
  },
  toObject: () => Object.entries(process2.env).reduce((acc, [key, value]) => {
    if (value === void 0) {
      return acc;
    }
    return {
      ...acc,
      [key]: value
    };
  }, {})
};
var Netlify = { env: env3 };
globalThis.Netlify = Netlify;
var getNetlifyGlobal = () => Netlify;

// src/index.ts
var getPath = () => fileURLToPath(import.meta.url);
export {
  getLambdaHandler,
  getNetlifyGlobal,
  getPath
};