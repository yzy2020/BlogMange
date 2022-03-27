import { Vue, Component } from 'vue-property-decorator';
import { Layout, Menu } from 'ant-design-vue';
import style from './HeaderComponent.scss'

@Component({
  name: 'HeaderComponent'
})
export default class HeaderComponent extends Vue {

  private render() {
    return (
      <Layout.Header style={{
        position: 'relative',
        color: '#fff',
        background: '#fff',
      }}>
        <div style={{ display: 'inline-block', marginLeft: '160px' }}>
          <Menu theme="light" style="border: 1px solid #000" mode="horizontal" defaultSelectedKeys={[1]}>
            <Menu.Item key='1'>我的博客</Menu.Item>
          </Menu>
        </div>
      </Layout.Header>
    )
  }
}