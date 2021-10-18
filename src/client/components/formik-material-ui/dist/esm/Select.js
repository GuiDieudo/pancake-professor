import { __rest, __assign } from './_virtual/_tslib.js';
import * as React from 'react';
import MuiSelect from '@mui/material/Select';

function fieldToSelect(_a) {
    var disabled = _a.disabled, _b = _a.field, fieldOnBlur = _b.onBlur, field = __rest(_b, ["onBlur"]), isSubmitting = _a.form.isSubmitting, onBlur = _a.onBlur, props = __rest(_a, ["disabled", "field", "form", "onBlur"]);
    return __assign(__assign({ disabled: disabled !== null && disabled !== void 0 ? disabled : isSubmitting, onBlur: onBlur !== null && onBlur !== void 0 ? onBlur : function (e) {
            fieldOnBlur(e !== null && e !== void 0 ? e : field.name);
        } }, field), props);
}
function Select(props) {
    return React.createElement(MuiSelect, __assign({}, fieldToSelect(props)));
}
Select.displayName = 'FormikMaterialUISelect';

export { Select, fieldToSelect };
//# sourceMappingURL=Select.js.map
