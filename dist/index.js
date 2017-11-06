'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _commander2.default.version('0.1.0').arguments('<firstConfig> <secondConfig>').description('Compares two configuration files and shows a difference.').option('-f, --format [type]', 'Output format').parse(process.argv);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJ2ZXJzaW9uIiwiYXJndW1lbnRzIiwiZGVzY3JpcHRpb24iLCJvcHRpb24iLCJwYXJzZSIsInByb2Nlc3MiLCJhcmd2Il0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7Ozs7O2tCQUVlLG9CQUNaQSxPQURZLENBQ0osT0FESSxFQUVaQyxTQUZZLENBRUYsOEJBRkUsRUFHWkMsV0FIWSxDQUdBLDBEQUhBLEVBSVpDLE1BSlksQ0FJTCxxQkFKSyxFQUlrQixlQUpsQixFQUtaQyxLQUxZLENBS05DLFFBQVFDLElBTEYsQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwcm9ncmFtIGZyb20gJ2NvbW1hbmRlcic7XG5cbmV4cG9ydCBkZWZhdWx0IHByb2dyYW1cbiAgLnZlcnNpb24oJzAuMS4wJylcbiAgLmFyZ3VtZW50cygnPGZpcnN0Q29uZmlnPiA8c2Vjb25kQ29uZmlnPicpXG4gIC5kZXNjcmlwdGlvbignQ29tcGFyZXMgdHdvIGNvbmZpZ3VyYXRpb24gZmlsZXMgYW5kIHNob3dzIGEgZGlmZmVyZW5jZS4nKVxuICAub3B0aW9uKCctZiwgLS1mb3JtYXQgW3R5cGVdJywgJ091dHB1dCBmb3JtYXQnKVxuICAucGFyc2UocHJvY2Vzcy5hcmd2KTtcbiJdfQ==