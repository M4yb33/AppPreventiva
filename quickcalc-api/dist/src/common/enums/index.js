"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertLogAction = exports.OperatorRole = exports.TriggerType = exports.AlertStatus = void 0;
var AlertStatus;
(function (AlertStatus) {
    AlertStatus["NEW"] = "NEW";
    AlertStatus["IN_REVIEW"] = "IN_REVIEW";
    AlertStatus["IN_PROGRESS"] = "IN_PROGRESS";
    AlertStatus["ESCALATED"] = "ESCALATED";
    AlertStatus["CLOSED"] = "CLOSED";
    AlertStatus["TEST"] = "TEST";
})(AlertStatus || (exports.AlertStatus = AlertStatus = {}));
var TriggerType;
(function (TriggerType) {
    TriggerType["PANIC_CODE"] = "PANIC_CODE";
    TriggerType["TEST_MODE"] = "TEST_MODE";
})(TriggerType || (exports.TriggerType = TriggerType = {}));
var OperatorRole;
(function (OperatorRole) {
    OperatorRole["ADMIN"] = "ADMIN";
    OperatorRole["OPERATOR"] = "OPERATOR";
    OperatorRole["VIEWER"] = "VIEWER";
})(OperatorRole || (exports.OperatorRole = OperatorRole = {}));
var AlertLogAction;
(function (AlertLogAction) {
    AlertLogAction["ALERT_CREATED"] = "ALERT_CREATED";
    AlertLogAction["STATUS_CHANGED"] = "STATUS_CHANGED";
    AlertLogAction["LOCATION_UPDATED"] = "LOCATION_UPDATED";
    AlertLogAction["ASSIGNED"] = "ASSIGNED";
    AlertLogAction["NOTE_ADDED"] = "NOTE_ADDED";
    AlertLogAction["INTERNET_DELIVERY_ATTEMPTED"] = "INTERNET_DELIVERY_ATTEMPTED";
    AlertLogAction["INTERNET_DELIVERY_CONFIRMED"] = "INTERNET_DELIVERY_CONFIRMED";
    AlertLogAction["SMS_DELIVERY_ATTEMPTED"] = "SMS_DELIVERY_ATTEMPTED";
    AlertLogAction["SMS_DELIVERY_CONFIRMED"] = "SMS_DELIVERY_CONFIRMED";
})(AlertLogAction || (exports.AlertLogAction = AlertLogAction = {}));
//# sourceMappingURL=index.js.map