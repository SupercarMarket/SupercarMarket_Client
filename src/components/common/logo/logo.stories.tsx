import Logo from './logo';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Logo',
  component: Logo,
} as ComponentMeta<typeof Logo>;

const Template: ComponentStory<typeof Logo> = (args) => <Logo {...args} />;

export const Default = Template.bind({});

Default.argTypes = {
  variant: {
    name: 'Variant',
    description: '로고 스타일을 설정을 위한 프롭스',
    options: ['horizontal', 'flat'],
    control: {
      type: 'select',
    },
  },
};

Default.args = {
  variant: 'horizontal',
};
