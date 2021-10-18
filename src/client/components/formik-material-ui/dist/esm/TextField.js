import { __rest, __assign } from './_virtual/_tslib.js';
import * as React from 'react';
import MuiTextField from '@mui/material/TextField';
import { getIn } from 'formik';

function fieldToTextField(_a) {
    var disabled = _a.disabled, _b = _a.field, fieldOnBlur = _b.onBlur, field = __rest(_b, ["onBlur"]), _c = _a.form, isSubmitting = _c.isSubmitting, touched = _c.touched, errors = _c.errors, onBlur = _a.onBlur, helperText = _a.helperText, props = __rest(_a, ["disabled", "field", "form", "onBlur", "helperText"]);
    var fieldError = getIn(errors, field.name);
    var showError = getIn(touched, field.name) && !!fieldError;
    return __assign(__assign({ variant: props.variant, error: showError, helperText: showError ? fieldError : helperText, disabled: disabled !== null && disabled !== void 0 ? disabled : isSubmitting, onBlur: onBlur !== null && onBlur !== void 0 ? onBlur : function (e) {
            fieldOnBlur(e !== null && e !== void 0 ? e : field.name);
        } }, field), props);
}
function TextField(_a) {
    var children = _a.children, props = __rest(_a, ["children"]);
    return React.createElement(MuiTextField, __assign({}, fieldToTextField(props)), children);
}
TextField.displayName = 'FormikMaterialUITextField';

export { TextField, fieldToTextField };
//# sourceMappingURL=TextField.js.map
