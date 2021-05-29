import themes from './themes';
export default (style) => {
    var _a, _b, _c, _d, _e;
    const { textColor, keywordColor } = style.custom || {};
    const theme = themes({ textColor, keywordColor })[style.theme];
    const custom = style.custom;
    return {
        terminaly: Object.assign(Object.assign({}, theme.terminaly), custom === null || custom === void 0 ? void 0 : custom.terminaly),
        input: {
            container: Object.assign(Object.assign({}, theme.input.container), (_a = custom === null || custom === void 0 ? void 0 : custom.input) === null || _a === void 0 ? void 0 : _a.container),
            name: Object.assign(Object.assign({}, theme.input.name), (_b = custom === null || custom === void 0 ? void 0 : custom.input) === null || _b === void 0 ? void 0 : _b.name),
            field: Object.assign(Object.assign({}, theme.input.field), (_c = custom === null || custom === void 0 ? void 0 : custom.input) === null || _c === void 0 ? void 0 : _c.field)
        },
        bar: Object.assign(Object.assign({}, theme.bar), custom === null || custom === void 0 ? void 0 : custom.bar),
        outputs: {
            container: Object.assign(Object.assign({}, theme.outputs.container), (_d = custom === null || custom === void 0 ? void 0 : custom.outputs) === null || _d === void 0 ? void 0 : _d.container),
            item: Object.assign(Object.assign({}, theme.outputs.item), (_e = custom === null || custom === void 0 ? void 0 : custom.outputs) === null || _e === void 0 ? void 0 : _e.item)
        },
        variables: Object.assign(Object.assign({}, theme.variables), custom === null || custom === void 0 ? void 0 : custom.variables)
    };
};
//# sourceMappingURL=index.js.map