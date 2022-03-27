import Vue, { VNode } from 'vue'
import { AxiosInstance } from 'axios';
import { Message } from 'ant-design-vue/types/message';

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode { }
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue { }
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}

declare module 'Vue/types/vue' {
  interface Vue {
    $axios: AxiosInstance;
    $message: Message;
    $rootUrl: string;
  }
  interface VueConstructor {
    $options: {
      filters: {
        normalDateTime: (value: string, linkChar?: string) => string;
      }
    }
  }
}
