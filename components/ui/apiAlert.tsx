import React from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Copy, Server } from 'lucide-react';
import { Badge, BadgeProps } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast';

interface ApiAlertProps {
  title: string;
  description: string;
  variant: 'public' | 'admin';
}

const textMap: Record<ApiAlertProps['variant'], string> = {
  public: 'Public',
  admin: 'Admin',
}

const varinatMap: Record<ApiAlertProps['variant'], BadgeProps['variant']> = {
  public: 'secondary',
  admin: 'destructive',
}

const ApiAlert: React.FC<ApiAlertProps> = ({ title, description, variant}) => {
  const onCopy = () => {
    navigator.clipboard.writeText(description);
    toast.success('Copied!');
  };
  return (
    <Alert>
      <Server className='h-4 w-4' />
      <AlertTitle className='flex items-center gap-x-3'>
        { title }
        <Badge variant={varinatMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle> 
      <AlertDescription className='mt-4 flex items-center justify-between'>

        <code className='relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold'>
          {description}
        </code>
        <Button variant='outline' size='icon' onClick={onCopy}>
          <Copy className='h-4 w-4'/>
        </Button>
      </AlertDescription>
    </Alert>
  )
}

export default ApiAlert