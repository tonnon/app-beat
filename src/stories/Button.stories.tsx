import type { Meta, StoryObj } from '@storybook/react';
import Button, { type ButtonProps } from '../components/button/Button';
import { ArrowRightIcon } from '../components/icons/Icons';

const meta: Meta<ButtonProps> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A flexible button component built on top of Radix UI with multiple variants and states.

## Features
- **Accessibility**: Full keyboard navigation and ARIA support via Radix UI
- **Variants**: Multiple size variants (compact, default, expanded)
- **Icons**: Support for right-side icons
- **Responsive**: Adapts to different screen sizes
- **Customizable**: Extensible through className prop

## Usage
\`\`\`tsx
import Button from './components/button/Button';

<Button text="Click me" onClick={handleClick} />
<Button text="Download" iconRight={<DownloadIcon />} />
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'The text content of the button',
      table: {
        type: { summary: 'string' },
      },
    },
    buttonSize: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Size variant of the button following 8px incremental scale',
      table: {
        type: { summary: 'xs | sm | md | lg' },
        defaultValue: { summary: 'md' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onClick: {
      description: 'Callback fired when button is clicked',
      table: {
        type: { summary: '(event: MouseEvent) => void' },
      },
    },
    iconRight: {
      control: false,
      description: 'Icon component to display on the right side',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<ButtonProps>;

export const SizeVariants: Story = {
  name: 'Size Variants',
  parameters: {
    docs: {
      description: {
        story: 'Button comes in four size variants following 8px incremental scale. Notice the different padding, font-size, and overall button dimensions.',
      },
    },
  },
  render: () => (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '2rem', 
      padding: '2rem'
    }}>

      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1.5rem', 
        alignItems: 'flex-start'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>
            XS - 24px height (12px font, 4px 12px padding)
          </label>
          <Button text="XS Button" buttonSize="xs" />
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>
            SM - 32px height (14px font, 8px 16px padding)
          </label>
          <Button text="Small Button" buttonSize="sm" />
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>
            MD - 40px height (16px font, 12px 20px padding)
          </label>
          <Button text="Medium Button" buttonSize="md" />
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>
            LG - 48px height (18px font, 16px 24px padding)
          </label>
          <Button text="Large Button" buttonSize="lg" />
        </div>
      </div>

      <div style={{ 
        borderTop: '1px solid #e5e7eb',
        paddingTop: '2rem'
      }}>
        <h3 style={{ 
          fontSize: '1rem', 
          fontWeight: '600', 
          color: '#111827',
          marginBottom: '1.5rem'
        }}>
          Size Comparison Grid
        </h3>
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '2rem',
          alignItems: 'start'
        }}>
          <div style={{ textAlign: 'center' }}>
            <h4 style={{ marginBottom: '1rem', fontSize: '0.875rem', fontWeight: '600' }}>
              XS (24px)
            </h4>
            <Button text="Button" buttonSize="xs" />
            <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#6b7280' }}>
              12px font<br/>4px 12px padding
            </div>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <h4 style={{ marginBottom: '1rem', fontSize: '0.875rem', fontWeight: '600' }}>
              SM (32px)
            </h4>
            <Button text="Button" buttonSize="sm" />
            <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#6b7280' }}>
              14px font<br/>8px 16px padding
            </div>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <h4 style={{ marginBottom: '1rem', fontSize: '0.875rem', fontWeight: '600' }}>
              MD (40px)
            </h4>
            <Button text="Button" buttonSize="md" />
            <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#6b7280' }}>
              16px font<br/>12px 20px padding
            </div>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <h4 style={{ marginBottom: '1rem', fontSize: '0.875rem', fontWeight: '600' }}>
              LG (48px)
            </h4>
            <Button text="Button" buttonSize="lg" />
            <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#6b7280' }}>
              18px font<br/>16px 24px padding
            </div>
          </div>
        </div>
      </div>

    </div>
  ),
};

export const WithIcons: Story = {
  name: 'With Icons',
  parameters: {
    docs: {
      description: {
        story: 'Buttons with icons showing how icon sizes adapt to button sizes. Notice how both text and icon scale proportionally.',
      },
    },
  },
  render: () => (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '2rem', 
      alignItems: 'flex-start',
      padding: '2rem'
    }}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <Button 
          text="XS" 
          buttonSize="xs"
          iconRight={<ArrowRightIcon size={12} />}
        />
        <Button 
          text="SM" 
          buttonSize="sm"
          iconRight={<ArrowRightIcon size={16} />}
        />
        <Button 
          text="MD" 
          buttonSize="md"
          iconRight={<ArrowRightIcon size={20} />}
        />
        <Button 
          text="LG" 
          buttonSize="lg"
          iconRight={<ArrowRightIcon size={24} />}
        />
      </div>
      
      <div style={{ 
        borderTop: '1px solid #e5e7eb', 
        paddingTop: '2rem', 
        width: '100%' 
      }}>
        <h4 style={{ marginBottom: '1rem', fontSize: '0.875rem', fontWeight: '600' }}>
          Individual Examples:
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>XS - 12px icon</span>
            <Button text="Continue" buttonSize="xs" iconRight={<ArrowRightIcon size={12} />} />
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>SM - 16px icon</span>
            <Button text="Continue" buttonSize="sm" iconRight={<ArrowRightIcon size={16} />} />
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>MD - 20px icon</span>
            <Button text="Continue" buttonSize="md" iconRight={<ArrowRightIcon size={20} />} />
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>LG - 24px icon</span>
            <Button text="Continue" buttonSize="lg" iconRight={<ArrowRightIcon size={24} />} />
          </div>
        </div>
      </div>
    </div>
  ),
};


