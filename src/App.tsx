import { Vue, Component } from 'vue-property-decorator';
import "ant-design-vue/dist/antd.css";

@Component
export default class App extends Vue {
  private render() {
    return (
      <div
        id="app"
        style={{ height: '100%' }}
      >
        <router-view />
      </div>
    );
  }
}
