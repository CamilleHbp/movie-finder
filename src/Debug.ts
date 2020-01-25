const icon = "🛑 ";

export default {
  logValue(message: string, data: any) {
    console.log(`${icon} [${message}] ${data}`);
  },
  logObject(message: string, data: Object) {
    const getCircularReplacer = () => {
      const seen = new WeakSet();
      return (key, value) => {
        if (typeof value === "object" && value !== null) {
          if (seen.has(value)) {
            return;
          }
          seen.add(value);
        }
        return value;
      };
    };

    console.log(`${icon} [${message}]`);
    console.log(JSON.stringify(data, getCircularReplacer(), 2));
  }
};
