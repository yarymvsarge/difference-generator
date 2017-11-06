'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _fs = require('fs');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var State = {
  MODIFIED: 'modified',
  DELETED: '-',
  INSERTED: '+',
  NOT_CHANGED: ' '
};

var getJSONFromFile = function getJSONFromFile(filename) {
  return JSON.parse((0, _fs.readFileSync)(filename));
};

var compare = function compare(firstConfig, secondConfig) {
  var mergedConfig = _extends({}, firstConfig, secondConfig);
  var mergedConfigWithStates = Object.keys(mergedConfig).reduce(function (result, key) {
    if (_lodash2.default.has(firstConfig, key) && _lodash2.default.has(secondConfig, key)) {
      if (firstConfig[key] === secondConfig[key]) {
        return _extends({}, result, _defineProperty({}, key, { state: State.NOT_CHANGED, value: mergedConfig[key] }));
      }
      return _extends({}, result, _defineProperty({}, key, { state: State.MODIFIED, value: mergedConfig[key] }));
    } else if (_lodash2.default.has(firstConfig, key) && !_lodash2.default.has(secondConfig, key)) {
      return _extends({}, result, _defineProperty({}, key, { state: State.DELETED, value: firstConfig[key] }));
    }
    return _extends({}, result, _defineProperty({}, key, { state: State.INSERTED, value: secondConfig[key] }));
  }, {});
  var string = Object.keys(mergedConfigWithStates).reduce(function (str, key) {
    switch (mergedConfigWithStates[key].state) {
      case State.MODIFIED:
        return str + ' + ' + key + ': ' + secondConfig[key] + '\n - ' + key + ': ' + firstConfig[key] + '\n';
      default:
        return str + ' ' + mergedConfigWithStates[key].state + ' ' + key + ': ' + mergedConfigWithStates[key].value + '\n';
    }
  }, '');
  return '{\n' + string + '}';
};

exports.default = _commander2.default.version('0.1.0').arguments('<firstConfig> <secondConfig>').action(function (firstConfig, secondConfig) {
  return console.log(compare(getJSONFromFile(firstConfig), getJSONFromFile(secondConfig)));
}).description('Compares two configuration files and shows a difference.').option('-f, --format [type]', 'Output format').parse(process.argv);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJTdGF0ZSIsIk1PRElGSUVEIiwiREVMRVRFRCIsIklOU0VSVEVEIiwiTk9UX0NIQU5HRUQiLCJnZXRKU09ORnJvbUZpbGUiLCJKU09OIiwicGFyc2UiLCJmaWxlbmFtZSIsImNvbXBhcmUiLCJmaXJzdENvbmZpZyIsInNlY29uZENvbmZpZyIsIm1lcmdlZENvbmZpZyIsIm1lcmdlZENvbmZpZ1dpdGhTdGF0ZXMiLCJPYmplY3QiLCJrZXlzIiwicmVkdWNlIiwicmVzdWx0Iiwia2V5IiwiaGFzIiwic3RhdGUiLCJ2YWx1ZSIsInN0cmluZyIsInN0ciIsInZlcnNpb24iLCJhcmd1bWVudHMiLCJhY3Rpb24iLCJjb25zb2xlIiwibG9nIiwiZGVzY3JpcHRpb24iLCJvcHRpb24iLCJwcm9jZXNzIiwiYXJndiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7Ozs7OztBQUVBLElBQU1BLFFBQVE7QUFDWkMsWUFBVSxVQURFO0FBRVpDLFdBQVMsR0FGRztBQUdaQyxZQUFVLEdBSEU7QUFJWkMsZUFBYTtBQUpELENBQWQ7O0FBT0EsSUFBTUMsa0JBQWtCLFNBQWxCQSxlQUFrQjtBQUFBLFNBQVlDLEtBQUtDLEtBQUwsQ0FBVyxzQkFBYUMsUUFBYixDQUFYLENBQVo7QUFBQSxDQUF4Qjs7QUFFQSxJQUFNQyxVQUFVLFNBQVZBLE9BQVUsQ0FBQ0MsV0FBRCxFQUFjQyxZQUFkLEVBQStCO0FBQzdDLE1BQU1DLDRCQUFvQkYsV0FBcEIsRUFBb0NDLFlBQXBDLENBQU47QUFDQSxNQUFNRSx5QkFBeUJDLE9BQU9DLElBQVAsQ0FBWUgsWUFBWixFQUEwQkksTUFBMUIsQ0FBaUMsVUFBQ0MsTUFBRCxFQUFTQyxHQUFULEVBQWlCO0FBQy9FLFFBQUksaUJBQUVDLEdBQUYsQ0FBTVQsV0FBTixFQUFtQlEsR0FBbkIsS0FBMkIsaUJBQUVDLEdBQUYsQ0FBTVIsWUFBTixFQUFvQk8sR0FBcEIsQ0FBL0IsRUFBeUQ7QUFDdkQsVUFBSVIsWUFBWVEsR0FBWixNQUFxQlAsYUFBYU8sR0FBYixDQUF6QixFQUE0QztBQUMxQyw0QkFBWUQsTUFBWixzQkFBMEJDLEdBQTFCLEVBQWdDLEVBQUVFLE9BQU9wQixNQUFNSSxXQUFmLEVBQTRCaUIsT0FBT1QsYUFBYU0sR0FBYixDQUFuQyxFQUFoQztBQUNEO0FBQ0QsMEJBQVlELE1BQVosc0JBQTBCQyxHQUExQixFQUFnQyxFQUFFRSxPQUFPcEIsTUFBTUMsUUFBZixFQUF5Qm9CLE9BQU9ULGFBQWFNLEdBQWIsQ0FBaEMsRUFBaEM7QUFDRCxLQUxELE1BS08sSUFBSSxpQkFBRUMsR0FBRixDQUFNVCxXQUFOLEVBQW1CUSxHQUFuQixLQUEyQixDQUFDLGlCQUFFQyxHQUFGLENBQU1SLFlBQU4sRUFBb0JPLEdBQXBCLENBQWhDLEVBQTBEO0FBQy9ELDBCQUFZRCxNQUFaLHNCQUEwQkMsR0FBMUIsRUFBZ0MsRUFBRUUsT0FBT3BCLE1BQU1FLE9BQWYsRUFBd0JtQixPQUFPWCxZQUFZUSxHQUFaLENBQS9CLEVBQWhDO0FBQ0Q7QUFDRCx3QkFBWUQsTUFBWixzQkFBMEJDLEdBQTFCLEVBQWdDLEVBQUVFLE9BQU9wQixNQUFNRyxRQUFmLEVBQXlCa0IsT0FBT1YsYUFBYU8sR0FBYixDQUFoQyxFQUFoQztBQUNELEdBVjhCLEVBVTVCLEVBVjRCLENBQS9CO0FBV0EsTUFBTUksU0FBU1IsT0FBT0MsSUFBUCxDQUFZRixzQkFBWixFQUFvQ0csTUFBcEMsQ0FBMkMsVUFBQ08sR0FBRCxFQUFNTCxHQUFOLEVBQWM7QUFDdEUsWUFBUUwsdUJBQXVCSyxHQUF2QixFQUE0QkUsS0FBcEM7QUFDRSxXQUFLcEIsTUFBTUMsUUFBWDtBQUNFLGVBQVVzQixHQUFWLFdBQW1CTCxHQUFuQixVQUEyQlAsYUFBYU8sR0FBYixDQUEzQixhQUFvREEsR0FBcEQsVUFBNERSLFlBQVlRLEdBQVosQ0FBNUQ7QUFDRjtBQUNFLGVBQVVLLEdBQVYsU0FBaUJWLHVCQUF1QkssR0FBdkIsRUFBNEJFLEtBQTdDLFNBQXNERixHQUF0RCxVQUE4REwsdUJBQXVCSyxHQUF2QixFQUE0QkcsS0FBMUY7QUFKSjtBQU1ELEdBUGMsRUFPWixFQVBZLENBQWY7QUFRQSxpQkFBYUMsTUFBYjtBQUNELENBdEJEOztrQkF3QmUsb0JBQ1pFLE9BRFksQ0FDSixPQURJLEVBRVpDLFNBRlksQ0FFRiw4QkFGRSxFQUdaQyxNQUhZLENBR0wsVUFBQ2hCLFdBQUQsRUFBY0MsWUFBZDtBQUFBLFNBQ05nQixRQUFRQyxHQUFSLENBQVluQixRQUFRSixnQkFBZ0JLLFdBQWhCLENBQVIsRUFBc0NMLGdCQUFnQk0sWUFBaEIsQ0FBdEMsQ0FBWixDQURNO0FBQUEsQ0FISyxFQUtaa0IsV0FMWSxDQUtBLDBEQUxBLEVBTVpDLE1BTlksQ0FNTCxxQkFOSyxFQU1rQixlQU5sQixFQU9adkIsS0FQWSxDQU9Od0IsUUFBUUMsSUFQRixDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHByb2dyYW0gZnJvbSAnY29tbWFuZGVyJztcbmltcG9ydCB7IHJlYWRGaWxlU3luYyB9IGZyb20gJ2ZzJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5cbmNvbnN0IFN0YXRlID0ge1xuICBNT0RJRklFRDogJ21vZGlmaWVkJyxcbiAgREVMRVRFRDogJy0nLFxuICBJTlNFUlRFRDogJysnLFxuICBOT1RfQ0hBTkdFRDogJyAnLFxufTtcblxuY29uc3QgZ2V0SlNPTkZyb21GaWxlID0gZmlsZW5hbWUgPT4gSlNPTi5wYXJzZShyZWFkRmlsZVN5bmMoZmlsZW5hbWUpKTtcblxuY29uc3QgY29tcGFyZSA9IChmaXJzdENvbmZpZywgc2Vjb25kQ29uZmlnKSA9PiB7XG4gIGNvbnN0IG1lcmdlZENvbmZpZyA9IHsgLi4uZmlyc3RDb25maWcsIC4uLnNlY29uZENvbmZpZyB9O1xuICBjb25zdCBtZXJnZWRDb25maWdXaXRoU3RhdGVzID0gT2JqZWN0LmtleXMobWVyZ2VkQ29uZmlnKS5yZWR1Y2UoKHJlc3VsdCwga2V5KSA9PiB7XG4gICAgaWYgKF8uaGFzKGZpcnN0Q29uZmlnLCBrZXkpICYmIF8uaGFzKHNlY29uZENvbmZpZywga2V5KSkge1xuICAgICAgaWYgKGZpcnN0Q29uZmlnW2tleV0gPT09IHNlY29uZENvbmZpZ1trZXldKSB7XG4gICAgICAgIHJldHVybiB7IC4uLnJlc3VsdCwgLi4ueyBba2V5XTogeyBzdGF0ZTogU3RhdGUuTk9UX0NIQU5HRUQsIHZhbHVlOiBtZXJnZWRDb25maWdba2V5XSB9IH0gfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7IC4uLnJlc3VsdCwgLi4ueyBba2V5XTogeyBzdGF0ZTogU3RhdGUuTU9ESUZJRUQsIHZhbHVlOiBtZXJnZWRDb25maWdba2V5XSB9IH0gfTtcbiAgICB9IGVsc2UgaWYgKF8uaGFzKGZpcnN0Q29uZmlnLCBrZXkpICYmICFfLmhhcyhzZWNvbmRDb25maWcsIGtleSkpIHtcbiAgICAgIHJldHVybiB7IC4uLnJlc3VsdCwgLi4ueyBba2V5XTogeyBzdGF0ZTogU3RhdGUuREVMRVRFRCwgdmFsdWU6IGZpcnN0Q29uZmlnW2tleV0gfSB9IH07XG4gICAgfVxuICAgIHJldHVybiB7IC4uLnJlc3VsdCwgLi4ueyBba2V5XTogeyBzdGF0ZTogU3RhdGUuSU5TRVJURUQsIHZhbHVlOiBzZWNvbmRDb25maWdba2V5XSB9IH0gfTtcbiAgfSwge30pO1xuICBjb25zdCBzdHJpbmcgPSBPYmplY3Qua2V5cyhtZXJnZWRDb25maWdXaXRoU3RhdGVzKS5yZWR1Y2UoKHN0ciwga2V5KSA9PiB7XG4gICAgc3dpdGNoIChtZXJnZWRDb25maWdXaXRoU3RhdGVzW2tleV0uc3RhdGUpIHtcbiAgICAgIGNhc2UgU3RhdGUuTU9ESUZJRUQ6XG4gICAgICAgIHJldHVybiBgJHtzdHJ9ICsgJHtrZXl9OiAke3NlY29uZENvbmZpZ1trZXldfVxcbiAtICR7a2V5fTogJHtmaXJzdENvbmZpZ1trZXldfVxcbmA7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gYCR7c3RyfSAke21lcmdlZENvbmZpZ1dpdGhTdGF0ZXNba2V5XS5zdGF0ZX0gJHtrZXl9OiAke21lcmdlZENvbmZpZ1dpdGhTdGF0ZXNba2V5XS52YWx1ZX1cXG5gO1xuICAgIH1cbiAgfSwgJycpO1xuICByZXR1cm4gYHtcXG4ke3N0cmluZ319YDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHByb2dyYW1cbiAgLnZlcnNpb24oJzAuMS4wJylcbiAgLmFyZ3VtZW50cygnPGZpcnN0Q29uZmlnPiA8c2Vjb25kQ29uZmlnPicpXG4gIC5hY3Rpb24oKGZpcnN0Q29uZmlnLCBzZWNvbmRDb25maWcpID0+XG4gICAgY29uc29sZS5sb2coY29tcGFyZShnZXRKU09ORnJvbUZpbGUoZmlyc3RDb25maWcpLCBnZXRKU09ORnJvbUZpbGUoc2Vjb25kQ29uZmlnKSkpKVxuICAuZGVzY3JpcHRpb24oJ0NvbXBhcmVzIHR3byBjb25maWd1cmF0aW9uIGZpbGVzIGFuZCBzaG93cyBhIGRpZmZlcmVuY2UuJylcbiAgLm9wdGlvbignLWYsIC0tZm9ybWF0IFt0eXBlXScsICdPdXRwdXQgZm9ybWF0JylcbiAgLnBhcnNlKHByb2Nlc3MuYXJndik7XG4iXX0=