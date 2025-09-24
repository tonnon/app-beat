import type { Meta, StoryObj } from '@storybook/react';
import { 
  ArrowRightIcon, 
  IconSizes,
  getIconSize,
  type IconSize
} from '../components/icons/Icons';

const IconDisplay = ({ 
  IconComponent, 
  size = 'md',
  name 
}: { 
  IconComponent: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
  size?: IconSize;
  name: string;
}) => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '1rem',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    minWidth: '120px'
  }}>
    <IconComponent size={getIconSize(size)} />
    <span style={{ fontSize: '0.75rem', fontWeight: '500' }}>{name}</span>
    <span style={{ fontSize: '0.625rem', color: '#6b7280' }}>
      {typeof size === 'number' ? `${size}px` : `${size} (${getIconSize(size)}px)`}
    </span>
  </div>
);

const meta: Meta = {
  title: 'Design System/Icons',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Icon System

A centralized icon system built on top of React Icons with consistent sizing and naming conventions.

## Features
- **Consistent Naming**: All icons follow a clear naming pattern
- **Size Variants**: Predefined sizes from xs (12px) to 2xl (48px)
- **Tree Shaking**: Only imports icons that are actually used
- **Type Safety**: Full TypeScript support with proper types
- **Accessibility**: Icons include proper ARIA attributes

## Available Icons
Currently includes essential UI icons for actions and navigation.

## Usage
\`\`\`tsx
import { ArrowRightIcon, CheckIcon } from '../components/icons';

// Default size (20px)
<ArrowRightIcon />

// Custom size
<ArrowRightIcon size={24} />

// Predefined size
<ArrowRightIcon size="lg" />
\`\`\`

## Size System
The icon system provides consistent sizing options:
- **xs**: 12px - For small UI elements
- **sm**: 16px - For compact interfaces  
- **md**: 20px - Default size
- **lg**: 24px - For headers and emphasis
- **xl**: 32px - For large features
- **2xl**: 48px - For heroes and logos
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const AllIcons: Story = {
  name: 'All Available Icons',
  parameters: {
    docs: {
      description: {
        story: 'Complete gallery of all available icons in the system with their names.',
      },
    },
  },
  render: () => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
      gap: '1rem',
      padding: '1rem'
    }}>
      <IconDisplay IconComponent={ArrowRightIcon} name="ArrowRightIcon" />
    </div>
  ),
};

export const SizeVariants: Story = {
  name: 'Size Variants',
  parameters: {
    docs: {
      description: {
        story: 'All available size variants from xs (12px) to 2xl (48px). Icons scale proportionally while maintaining visual consistency.',
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

      <div>
        <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: '600' }}>
          ArrowRightIcon - All Sizes
        </h3>
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          alignItems: 'end',
          flexWrap: 'wrap'
        }}>
          <IconDisplay IconComponent={ArrowRightIcon} size="xs" name="XS" />
          <IconDisplay IconComponent={ArrowRightIcon} size="sm" name="SM" />
          <IconDisplay IconComponent={ArrowRightIcon} size="md" name="MD" />
          <IconDisplay IconComponent={ArrowRightIcon} size="lg" name="LG" />
          <IconDisplay IconComponent={ArrowRightIcon} size="xl" name="XL" />
          <IconDisplay IconComponent={ArrowRightIcon} size="2xl" name="2XL" />
        </div>
      </div>

      <div style={{
        borderTop: '1px solid #e5e7eb',
        paddingTop: '2rem'
      }}>
        <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: '600' }}>
          Size Specifications
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: '1rem',
          textAlign: 'center'
        }}>
          {(Object.entries(IconSizes) as Array<[string, number]>).map(([key, value]) => (
            <div key={key} style={{
              padding: '1rem',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              backgroundColor: '#f9fafb'
            }}>
              <div style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                {key.toUpperCase()}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                {value}px
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

export const UsageExamples: Story = {
  name: 'Usage Examples',
  parameters: {
    docs: {
      description: {
        story: 'Practical examples showing how icons are used in different UI contexts with appropriate sizes.',
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
      <div>
        <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: '600' }}>
          In Button Components
        </h3>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            padding: '0.25rem 0.75rem',
            backgroundColor: '#6D7AF9',
            color: 'white',
            borderRadius: '4px',
            fontSize: '0.75rem'
          }}>
            Next <ArrowRightIcon size={12} />
          </div>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#6D7AF9',
            color: 'white',
            borderRadius: '4px',
            fontSize: '0.875rem'
          }}>
            Continue <ArrowRightIcon size={16} />
          </div>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            padding: '0.75rem 1.25rem',
            backgroundColor: '#6D7AF9',
            color: 'white',
            borderRadius: '4px',
            fontSize: '1rem'
          }}>
            Proceed <ArrowRightIcon size={20} />
          </div>
        </div>
      </div>

      <div style={{
        borderTop: '1px solid #e5e7eb',
        paddingTop: '2rem'
      }}>
        <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: '600' }}>
          In List Items
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ArrowRightIcon size={16} style={{ color: '#6b7280' }} />
            <span style={{ fontSize: '0.875rem' }}>View details</span>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const CodeExamples: Story = {
  name: 'Code Examples',
  parameters: {
    docs: {
      description: {
        story: 'Copy-paste ready code examples for common icon usage patterns.',
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
      <div>
        <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: '600' }}>
          Import Statement
        </h3>
        <pre style={{
          backgroundColor: '#f3f4f6',
          padding: '1rem',
          borderRadius: '6px',
          fontSize: '0.875rem',
          overflow: 'auto'
        }}>
{`import { 
  ArrowRightIcon, 
  CheckIcon, 
  DownloadIcon 
} from '../components/icons';`}
        </pre>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: '600' }}>
          Basic Usage
        </h3>
        <pre style={{
          backgroundColor: '#f3f4f6',
          padding: '1rem',
          borderRadius: '6px',
          fontSize: '0.875rem',
          overflow: 'auto'
        }}>
{`// Default size (20px)
<ArrowRightIcon />

// Custom size
<ArrowRightIcon size={24} />

// Predefined size
<ArrowRightIcon size="lg" />

// With custom styling
<CheckIcon size={16} style={{ color: '#10b981' }} />`}
        </pre>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: '600' }}>
          In Button Components
        </h3>
        <pre style={{
          backgroundColor: '#f3f4f6',
          padding: '1rem',
          borderRadius: '6px',
          fontSize: '0.875rem',
          overflow: 'auto'
        }}>
{`<Button 
  text="Continue" 
  buttonSize="md"
  iconRight={<ArrowRightIcon size={20} />}
/>

<Button 
  text="Download" 
  buttonSize="lg"
  iconRight={<DownloadIcon size={24} />}
/>`}
        </pre>
      </div>
    </div>
  ),
};