import { Component, Vue } from "vue-property-decorator";
import { MyStore } from "@/store/store/store";
import { useStore } from "vuex-simple";
@Component
class ProjectMixin extends Vue {
  public store: MyStore = useStore(this.$store);
  private declarated!: boolean;

  public get readClasses(): boolean {
    if (
      (this.declarated === undefined && this.store.persons.firstName === "") ||
      this.store.persons.lastName === ""
    ) {
      this.declarated = true;
      return false;
    } else
      (this.declarated === true && this.store.persons.firstName === "") ||
        this.store.persons.lastName === "";
    return true;
  }
}
export default ProjectMixin;
