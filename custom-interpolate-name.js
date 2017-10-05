const Path = require('path');

function findResource(module) {
    for (const reason of module.reasons) {
        const resource = findResource(reason.module);
        if (resource) {
            return resource;
        }
    }
    return module.resource;
}

function firstRelative(entry) {
    if ((typeof entry) === 'string') {
        return entry;
    }
    return entry.find(e => e.match(/^\./));
}

function isChild(entry, consider) {
    const baseDir = Path.resolve(Path.dirname(firstRelative(entry)));
    const relativePath = Path.relative(baseDir, consider);
    return !relativePath.match(/^\.\.\//);
}

function findEntry(module, entry) {
    const resource = findResource(module);
    for (let entryName of Object.keys(entry)) {
        if (isChild(entry[entryName], resource)) {
            return entryName;
        }
    }
    throw new Error(`entry of ${resource} not found.`);
}

function customInterpolateName(url, name, options) {
    const entryName = findEntry(this._module, this._compilation.options.entry);
    return url.replace(/\[entryName]/ig, entryName);
}

module.exports = customInterpolateName;