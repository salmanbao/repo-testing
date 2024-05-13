"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPlan = exports.Network = exports.RequestStatus = exports.BridgeType = exports.ProcessStatus = void 0;
var ProcessStatus;
(function (ProcessStatus) {
    ProcessStatus["Pending"] = "Pending";
    ProcessStatus["Successed"] = "Successed";
    ProcessStatus["Failed"] = "Failed";
})(ProcessStatus = exports.ProcessStatus || (exports.ProcessStatus = {}));
var BridgeType;
(function (BridgeType) {
    BridgeType["Other"] = "Other";
    BridgeType["Transfer"] = "Transfer";
    BridgeType["CompleteTransfer"] = "CompleteTransfer";
})(BridgeType = exports.BridgeType || (exports.BridgeType = {}));
var RequestStatus;
(function (RequestStatus) {
    RequestStatus["Requested"] = "Requested";
    RequestStatus["Approved"] = "Approved";
    RequestStatus["Completed"] = "Completed";
    RequestStatus["Refused"] = "Refused";
})(RequestStatus = exports.RequestStatus || (exports.RequestStatus = {}));
var Network;
(function (Network) {
    Network["Solana"] = "Solana";
    Network["Scrt"] = "Scrt";
    Network["Bsc"] = "Bsc";
    Network["Ethereum"] = "Ethereum";
    Network["Polygon"] = "Polygon";
})(Network = exports.Network || (exports.Network = {}));
var UserPlan;
(function (UserPlan) {
    UserPlan["Free"] = "Free";
    UserPlan["Basic"] = "Basic";
    UserPlan["Pro"] = "Pro";
})(UserPlan = exports.UserPlan || (exports.UserPlan = {}));
//# sourceMappingURL=types.js.map