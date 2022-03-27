import { Vue, Component, Prop } from 'vue-property-decorator';
import { Button, Divider, Form, Icon, Input } from 'ant-design-vue';
import { LoginApi } from '@/apis';
import { WrappedFormUtils } from 'ant-design-vue/types/form/form';


@Component({
  name: 'Login',
  props: { Form },
  components: { Button, Divider, Form, Icon, Input }
})
class Login extends Vue {
  @Prop() private form!: WrappedFormUtils;
  private loading = false; // 表单的提交状态
  private disabled = false; // 登陆按钮的禁用状态
  private handleSubmit(e: Event) {
    e.preventDefault();
    this.form.validateFields((err, value) => {
      if (!err) {
        console.log(value);
        LoginApi.ApiLogin(value.username, value.password).then(res => {
          console.log(res, 'res');
          this.$router.replace({ name: 'UserInfo' })
        })
      }
    });
  }

  private created() {
    this.$nextTick(() => {
      this.form.setFieldsValue({
        username: 'yzy',
        password: '123'
      })
    })
  }

  private render() {
    const { getFieldDecorator } = this.form;
    return (
      <div style={{
        paddingTop: '10%',
        background: `url(${require(`@/assets/bj.jpeg`)}) center center / cover no-repeat`,
        height: '100%'
      }}>
        <Form
          onSubmit={this.handleSubmit}
          style={{
            margin: 'auto',
            padding: '20px',
            border: '1px solid #ccc',
            width: '400px',
            backgroundColor: 'rgba(255,255,255,0.8)',
            boxShadow: '5px 5px 5px #777'
          }}
        >
          <Form.Item>
            {
              getFieldDecorator('username', {
                rules: [
                  { required: true, message: '用户名是必填的' }
                ]
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="请输入用户名" maxLength={11}
                >
                </Input>
              )
            }
          </Form.Item>
          <Form.Item>
            {
              getFieldDecorator('password', {
                rules: [
                  { required: true, message: '密码是必填的' }
                ]
              })(
                <Input type="password"
                  prefix={<Icon type="code" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="请输入密码" maxLength={18}
                  autocomplete="off"
                >
                </Input>
              )
            }
          </Form.Item>
          <Form.Item>
            <Button block type="primary" htmlType="submit"
              loading={this.loading} disabled={this.disabled}
            >登录</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create({})(Login);
