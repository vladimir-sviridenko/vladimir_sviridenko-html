function Confirmable(message: string) {
  return (target: any, propertyName: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any) {
      return confirm(message) ? originalMethod.apply(this, args) : null;
    }
    return descriptor;
  }
}

export default Confirmable;