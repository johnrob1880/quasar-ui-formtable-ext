/*!
 * quasar-ui-formtable-ext v0.0.1
 * (c) 2020 John Robinson <johnrob1880@gmail.com>
 * Released under the MIT License.
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue'), require('quasar')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vue', 'quasar'], factory) :
  (global = global || self, factory(global.qFormtable = {}, global.Vue, global.Quasar));
}(this, (function (exports, Vue, quasar) { 'use strict';

  if (Vue === void 0) {
    console.error('[ Quasar ] Vue is required to run. Please add a script tag for it before loading Quasar.')
    return
  }
  Vue = Vue && Vue.hasOwnProperty('default') ? Vue['default'] : Vue;

  var version = "0.0.1";

  var Component = {
    name: "QFormtable",

    props: {
      columns: Array,
      title: String,
      buttonText: {
        type: String,
        default: "Finish"
      },
      loading: Boolean,
      data: {
        type: Array,
        default: function default$1() {
          return [];
        }
      }
    },
    render: function render(h) {
      var obj;

      var self = this;

      return h(quasar.QTable, {
        staticClass: "QFormtable",
        props: Object.assign({}, self.$props),
        scopedSlots: ( obj = {}, obj["top-row"] = function () { return [
            (self.$scopedSlots.topRow && self.$scopedSlots.topRow()) || h("div")
          ]; }, obj["bottom-row"] = function () { return [
            (self.$scopedSlots.bottomRow && self.$scopedSlots.bottomRow()) ||
              h("div")
          ]; }, obj["bottom"] = function () { return [
            h(
              quasar.QBtn,
              {
                on: { click: function () { return self.$emit("addRow"); } },
                props: {
                  disable: self.loading,
                  icon: "add",
                  color: "grey-7",
                  dense: true,
                  size: "sm"
                }
              },
              ["New Row"]
            ),
            h(quasar.QSpace),
            h(
              quasar.QBtn,
              {
                props: {
                  disable: self.loading,
                  color: "primary",
                  dense: true,
                  size: "sm"
                },
                on: {
                  click: function () {
                    self.$emit("complete", self.data);
                  }
                }
              },
              self.buttonText
            )
          ]; }, obj["top-right"] = function (props) { return h(quasar.QBtn, {
              on: { click: props.toggleFullscreen },
              props: {
                disabled: self.loading,
                class: "q-ml-md",
                flat: true,
                round: true,
                dense: true,
                icon: props.inFullScreen ? "fullscreen_exit" : "fullscreen"
              }
            }); }, obj.body = function (bodyProps) { return h(
              quasar.QTr,
              {},
              self.columns.reduce(function (curr, next) {
                var obj;

                if (next.options) {
                  curr.push(
                    h(
                      quasar.QTd,
                      {
                        class: "q-pt-md"
                      },
                      [
                        h(quasar.QSelect, {
                          props: {
                            disable: self.loading,
                            hideBottomSpace: !!!bodyProps.row["_errors"],
                            error: !!(
                              bodyProps.row["_errors"] &&
                              bodyProps.row["_errors"][next["name"]]
                            ),
                            errorMessage:
                              bodyProps.row["_errors"] &&
                              bodyProps.row["_errors"][next["name"]],
                            name: next["name"],
                            value: bodyProps.row[next["name"]],
                            model: bodyProps.row[next["name"]],
                            filled: true,
                            dense: true,
                            square: true,
                            options: next.options
                          },
                          on: {
                            input: function (val) { return (bodyProps.row[next["name"]] = val); }
                          }
                        })
                      ]
                    )
                  );
                } else if (next.type === Boolean) {
                  curr.push(
                    h(quasar.QTd, {}, [
                      h(quasar.QCheckbox, {
                        props: Object.assign({}, {disable: self.loading,
                          name: next["name"],
                          dense: true},
                          (bodyProps.row["props"] || {}),
                          {value: !!bodyProps.row[next["name"]],
                          model: bodyProps.row[next["name"]]}),
                        on: {
                          input: function (val) { return (bodyProps.row[next["name"]] = val); }
                        }
                      })
                    ])
                  );
                } else {
                  curr.push(
                    h(
                      quasar.QTd,
                      {
                        class: "q-pt-md"
                      },
                      [
                        h(quasar.QInput, {
                          props: Object.assign({}, (bodyProps.row["props"] || {}),
                            {disable: self.loading,
                            hideBottomSpace: !!!bodyProps.row["_errors"],
                            error: !!(
                              bodyProps.row["_errors"] &&
                              bodyProps.row["_errors"][next["name"]]
                            ),
                            errorMessage:
                              bodyProps.row["_errors"] &&
                              bodyProps.row["_errors"][next["name"]],
                            square: true,
                            filled: true,
                            dense: true,
                            name: next["name"],
                            value: bodyProps.row[next["name"]],
                            type:
                              (next["props"] && next["props"]["type"]) || "text",
                            model:
                              next["props"] && next["props"]["type"] === "number"
                                ? ( obj = {}, obj[next["props"]["type"]] = bodyProps.row[next["name"]], obj )
                                : bodyProps.row[next["name"]]}),
                          on: {
                            input: function (val) {
                              if (
                                next["props"] &&
                                next["props"]["type"] === "number"
                              ) {
                                bodyProps.row[next["name"]] = parseFloat(val);
                              } else {
                                bodyProps.row[next["name"]] = val;
                              }
                            }
                          }
                        })
                      ]
                    )
                  );
                }
                return curr;
              }, [])
            ); }, obj )
      });
    }
  };

  var Plugin = {
    version: version,

    Component: Component,
    

    install: function install (Vue) {
      Vue.component(Component.name, Component);
      
    }
  };

  Vue.use(Plugin);

  exports.Component = Component;
  exports.version = version;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
