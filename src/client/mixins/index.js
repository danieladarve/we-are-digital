const mixin = {
  methods: {
    toCamelCase(inputArray) {
      var regex = /[A-Z\xC0-\xD6\xD8-\xDE]?[a-z\xDF-\xF6\xF8-\xFF]+|[A-Z\xC0-\xD6\xD8-\xDE]+(?![a-z\xDF-\xF6\xF8-\xFF])|\d+/g;
      const word = inputArray.match(regex);
      let result = "";
      for (let i = 0, len = word.length; i < len; i++) {
        let currentStr = word[i];
        let tempStr = currentStr.toLowerCase();

        if (i != 0) {
          tempStr = tempStr.substr(0, 1).toUpperCase() + tempStr.substr(1);
        }

        result += tempStr;
      }
      return result;
    },
  },
};

export default mixin;
