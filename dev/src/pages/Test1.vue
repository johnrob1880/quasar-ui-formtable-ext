<template>
  <q-page padding>
    <QFormtable
      @complete="validate"
      @addRow="addRow"
      title="Friends"
      key="firstname"
      :loading="loading"
      :columns="columns"
      :data="data"
    >
      <template v-slot:bottomRow v-if="message">
        <div class="q-pa-md text-center">{{message}}</div>
      </template>
    </QFormtable>
    <pre class="bg-grey-3 q-py-md">
    {{ JSON.stringify(data)}}
    </pre>
  </q-page>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      message: "",
      columns: [
        {
          name: "title",
          label: "Title",
          align: "left",
          options: ["Mr", "Mrs", "Miss"]
        },
        { name: "lastname", label: "Lastname", align: "left" },
        {
          name: "age",
          label: "Age",
          align: "left",
          options: [20, 40, 50, 60, 70]
        },
        {
          name: "bff",
          label: "BFF",
          align: "right",
          type: Boolean,
          props: {
            "auto-width": true
          }
        },
        {
          name: "score",
          label: "Score",
          align: "right",
          props: {
            type: "number"
          }
        }
      ],
      data: [
        { title: "Mr", lastname: "Robinson", age: 20, bff: false, score: 0 }
      ]
    };
  },
  methods: {
    addRow() {
      this.data.push({ title: "", lastname: "", age: 0, bff: true, score: 0 });
    },
    validate(data) {
      if (data[0]["lastname"] === "Fife") {
        data[0]["_errors"] = { lastname: "Oh, not a Fife!" };
        this.data = [...data];
        return;
      } else {
        delete data[0]["_errors"];
        this.data = [...data];
      }

      this.message = `Inserting ${data.length} friend${
        data.length === 1 ? "" : "s"
      }`;
      this.loading = true;
    }
  }
};
</script>

<style lang="sass" scoped>
.directive-target
  width: 50px
  height: 50px
</style>
