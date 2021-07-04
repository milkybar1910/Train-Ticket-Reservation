(function () {
  var template = Handlebars.template,
    templates = (Handlebars.templates = Handlebars.templates || {});
  templates["example"] = template({
    compiler: [8, ">= 4.3.0"],
    main: function (container, depth0, helpers, partials, data) {
      var helper,
        alias1 = depth0 != null ? depth0 : container.nullContext || {},
        alias2 = container.hooks.helperMissing,
        alias3 = "function",
        alias4 = container.escapeExpression,
        lookupProperty =
          container.lookupProperty ||
          function (parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
              return parent[propertyName];
            }
            return undefined;
          };

      return (
        "\r\n    <tr>\r\n        <td>" +
        alias4(
          ((helper =
            (helper =
              lookupProperty(helpers, "Seat No") ||
              (depth0 != null ? lookupProperty(depth0, "Seat No") : depth0)) !=
            null
              ? helper
              : alias2),
          typeof helper === alias3
            ? helper.call(alias1, {
                name: "Seat No",
                hash: {},
                data: data,
                loc: {
                  start: { line: 3, column: 12 },
                  end: { line: 3, column: 25 },
                },
              })
            : helper)
        ) +
        " </td>\r\n        <td>" +
        alias4(
          ((helper =
            (helper =
              lookupProperty(helpers, "Type") ||
              (depth0 != null ? lookupProperty(depth0, "Type") : depth0)) !=
            null
              ? helper
              : alias2),
          typeof helper === alias3
            ? helper.call(alias1, {
                name: "Type",
                hash: {},
                data: data,
                loc: {
                  start: { line: 4, column: 12 },
                  end: { line: 4, column: 20 },
                },
              })
            : helper)
        ) +
        "</td>\r\n        <td>" +
        alias4(
          ((helper =
            (helper =
              lookupProperty(helpers, "Passenger Name") ||
              (depth0 != null
                ? lookupProperty(depth0, "Passenger Name")
                : depth0)) != null
              ? helper
              : alias2),
          typeof helper === alias3
            ? helper.call(alias1, {
                name: "Passenger Name",
                hash: {},
                data: data,
                loc: {
                  start: { line: 5, column: 12 },
                  end: { line: 5, column: 32 },
                },
              })
            : helper)
        ) +
        "</td>\r\n        <td>" +
        alias4(
          ((helper =
            (helper =
              lookupProperty(helpers, "Gender") ||
              (depth0 != null ? lookupProperty(depth0, "Gender") : depth0)) !=
            null
              ? helper
              : alias2),
          typeof helper === alias3
            ? helper.call(alias1, {
                name: "Gender",
                hash: {},
                data: data,
                loc: {
                  start: { line: 6, column: 12 },
                  end: { line: 6, column: 22 },
                },
              })
            : helper)
        ) +
        "</td>\r\n        <td>" +
        alias4(
          ((helper =
            (helper =
              lookupProperty(helpers, "Address") ||
              (depth0 != null ? lookupProperty(depth0, "Address") : depth0)) !=
            null
              ? helper
              : alias2),
          typeof helper === alias3
            ? helper.call(alias1, {
                name: "Address",
                hash: {},
                data: data,
                loc: {
                  start: { line: 7, column: 12 },
                  end: { line: 7, column: 24 },
                },
              })
            : helper)
        ) +
        "</td>\r\n    </tr>\r\n\r\n                  "
      );
    },
    useData: true,
  });
})();
