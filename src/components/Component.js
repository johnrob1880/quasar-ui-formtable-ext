import {
  QTable,
  QBtn,
  QTr,
  QTd,
  QSpace,
  QSelect,
  QInput,
  QCheckbox
} from "quasar";

export default {
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
      default() {
        return [];
      }
    }
  },
  render(h) {
    var self = this;
    var rows = 0;

    return h(QTable, {
      staticClass: "QFormtable",
      props: {
        ...self.$props
      },
      scopedSlots: {
        ["top-row"]: () => [
          (self.$scopedSlots.topRow && self.$scopedSlots.topRow()) || h("div")
        ],
        ["bottom-row"]: () => [
          (self.$scopedSlots.bottomRow && self.$scopedSlots.bottomRow()) ||
            h("div")
        ],
        ["bottom"]: () => [
          h(
            QBtn,
            {
              on: { click: () => self.$emit("addRow") },
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
          h(QSpace),
          h(
            QBtn,
            {
              props: {
                disable: self.loading,
                color: "primary",
                dense: true,
                size: "sm"
              },
              on: {
                click: () => {
                  self.$emit("complete", self.data);
                }
              }
            },
            self.buttonText
          )
        ],
        ["top-right"]: props =>
          h(QBtn, {
            on: { click: props.toggleFullscreen },
            props: {
              disabled: self.loading,
              class: "q-ml-md",
              flat: true,
              round: true,
              dense: true,
              icon: props.inFullScreen ? "fullscreen_exit" : "fullscreen"
            }
          }),
        body: bodyProps =>
          h(
            QTr,
            {},
            self.columns.reduce((curr, next) => {
              if (next.options) {
                curr.push(
                  h(
                    QTd,
                    {
                      class: "q-pt-md"
                    },
                    [
                      h(QSelect, {
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
                          input: val => (bodyProps.row[next["name"]] = val)
                        }
                      })
                    ]
                  )
                );
              } else if (next.type === Boolean) {
                curr.push(
                  h(QTd, {}, [
                    h(QCheckbox, {
                      props: {
                        disable: self.loading,
                        name: next["name"],
                        dense: true,
                        ...(bodyProps.row["props"] || {}),
                        value: !!bodyProps.row[next["name"]],
                        model: bodyProps.row[next["name"]]
                      },
                      on: {
                        input: val => (bodyProps.row[next["name"]] = val)
                      }
                    })
                  ])
                );
              } else {
                curr.push(
                  h(
                    QTd,
                    {
                      class: "q-pt-md"
                    },
                    [
                      h(QInput, {
                        props: {
                          ...(bodyProps.row["props"] || {}),
                          disable: self.loading,
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
                              ? {
                                  [next["props"]["type"]]:
                                    bodyProps.row[next["name"]]
                                }
                              : bodyProps.row[next["name"]]
                        },
                        on: {
                          input: val => {
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
          )
      }
    });
  }
};
