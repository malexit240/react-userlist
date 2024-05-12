String.prototype.attachClass = function (className) {
  return ' ' + className;
}

String.prototype.attachClasses = function (...props) {
  return props.join(' ');
}
