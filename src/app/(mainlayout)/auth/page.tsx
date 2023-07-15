'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserForm from '@/components/UserForm';
import styles from '@/css/auth.module.css';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

export default function Auth() {
  return (
    <Tabs defaultValue="login" className={styles['tabs-container']}>
      <TabsList className={styles['tabs-list']}>
        <TabsTrigger className={styles['tabs-title']} value="login">
          Login
        </TabsTrigger>
        <TabsTrigger className={styles['tabs-title']} value="register">
          Register
        </TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <UserForm buttonText="Login" />
      </TabsContent>
      <TabsContent value="register">
        <UserForm buttonText="Register" />
      </TabsContent>
    </Tabs>
  );
}
