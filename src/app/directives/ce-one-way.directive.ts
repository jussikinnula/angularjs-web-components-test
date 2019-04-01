import { Directive, OnDestroy } from 'angular-ts-decorators';
import { IScope, IAugmentedJQuery, IAttributes, isString } from 'angular';
import { Observable } from 'rxjs/Observable';

const cache = {};

// parse an expression and returns its metadata
function parse(expression) {
  if (cache[expression]) {
    return cache[expression];
  }

  const matchedPattern = expression.match(/((.*)\.)?(\w*)\((.*)\)/);

  // matchedPattern[0] = expression
  // matchedPattern[1] = controller alias (with dot) i.e. "$ctrl." or "undefined" for non-aliased controllers
  // matchedPattern[2] = controller alias (without dot) i.e. "$ctrl" or "undefined" for non-aliased controllers
  // matchedPattern[3] = event handler
  // matchedPattern[4] = event handler params (i.e. "$event, a, b, c")

  if (!matchedPattern) {
    return null;
  }

  return cache[expression] = {
    handler: matchedPattern[3],
    controllerAlias: matchedPattern[2]
  };
}

// Find the controller alias associated with the $scope
function getCtrlAlias(expression) {
  const parsedExpression = parse(expression);
  if (parsedExpression) {
    return parsedExpression.controllerAlias;
  }
}

// Find the event handler associated with the $ctrl
function getHandler(expression) {
  const parsedExpression = parse(expression);
  if (parsedExpression) {
    return parsedExpression.handler;
  }
}

// Remove Angular's camelCasing of event names and
// strip on- prefix
function getEvent(expression) {
  const event = denormalize(expression);
  return event.replace('on-', '');
}

// Convert Angular camelCase property to dash-case
function denormalize(str) {
  return str.replace(/[A-Z]/g, c => `-${c.toLowerCase()}`);
}

// Setup event handler and return a deregister function
// to be used during $destroy
type RemoveFunction = () => void;
function createHandler($scope, element, event, handler, ctrlScope): RemoveFunction {
  const listener = e => $scope.$evalAsync(handler.bind(ctrlScope, e));
  element.addEventListener(event, listener);
  return () => element.removeEventListener(event, listener);
}

@Directive({
  selector: 'ce-one-way',
  restrict: 'A',
  scope: false
})
export class CeOneWayDirective implements OnDestroy {
  removeFns: RemoveFunction[] = [];
  observableKeys: string[] = [];

  constructor(private $scope: IScope, private $element: IAugmentedJQuery, private $attrs: IAttributes) {
    // Iterate over element attributes and look for one way
    // inputs or outputs
    for (const prop in $attrs) {
      if (isString($attrs[prop]) && $attrs[prop] !== '') {
        // Look for an Output like
        // ==> on-foo="doBar()"
        // ==> on-foo="$ctrl.doBar()"
        // Note that angular's $attr object will camelCase things beginning
        // with "on-". So on-foo becomes onFoo
        if (prop.substr(0, 2) === 'on' && $attrs[prop].indexOf('(') !== -1) {
          this.makeOutput($attrs[prop], prop);
        } else {
          this.makeInput($attrs[prop], prop);
        }
      }
    }
  }

  ngOnDestroy() {
    this.removeFns.forEach(removeFn => removeFn());
  }

  // Setup an event handler to act as an output
  // Since elements communicate to the outside world
  // using events, we'll simulate angular's '&'
  // output callbacks using regular event handlers
  makeOutput(handlerName, eventName) {
    const handler = getHandler(handlerName);
    const ctrlAlias = getCtrlAlias(handlerName);
    const ctrlScope = (this.$scope[ctrlAlias] || this.$scope);
    const event = getEvent(eventName);

    const removeHandler = createHandler(
      this.$scope,
      this.$element[0],
      event,
      ctrlScope[handler],
      ctrlScope
    );
    this.removeFns.push(removeHandler);
  }

  // Setup a watcher on the controller property
  // and create a copy when setting data on the
  // element so it can't mutate the parent's data
  // TODO: Don't do a deep watch. Differentiate
  // based on object type and use watchCollection
  makeInput(ctrlProp, elProp) {
    this.$scope.$watch(ctrlProp, value => {
      const isObservable = value instanceof Observable;
      const isInitialized = this.observableKeys.includes(ctrlProp);

      if ((isObservable && !isInitialized)) {
        this.$element[0][elProp] = value;
        this.observableKeys.push(ctrlProp);
      } else if (!isObservable) {
        this.$element[0][elProp] = value;
      }
    }, false);
  }
}
