'use client';

import styles from '@/css/userform.module.css';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import React from 'react';
import { useDispatch } from 'react-redux';
import {
  useLoginMutation,
  useRegisterMutation,
} from '@/redux/slices/usersApiSlice';
import { setCredentials } from '@/redux/slices/authSlice';
// when testing change this to: next/router
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { setCookie } from 'cookies-next';

// this doesnt seem optimal, fix this

type ButtonTextType = 'Login' | 'Register';

const formSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email.',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
});

// props doesnt seem optimal, fix this

function UserForm({ buttonText }: { buttonText: ButtonTextType }) {
  const { push, refresh } = useRouter();
  const dispatch = useDispatch();
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [register, { isLoading: isRegisterLoading }] = useRegisterMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    if (buttonText === 'Register') {
      try {
        const res = await register({
          email: values.email,
          password: values.password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        setCookie('userId', res._id, {
          maxAge: 30 * 24 * 60 * 60,
        });
        toast.success('Register successful');
        // The delay is for middleware to get the cookie
        setTimeout(() => {
          refresh();
          push('/dashboard');
        }, 500);
      } catch (err: unknown) {
        toast.error('User already exists');
      }
    } else if (buttonText === 'Login') {
      try {
        const res = await login({
          email: values.email,
          password: values.password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        setCookie('userId', res._id, {
          maxAge: 30 * 24 * 60 * 60,
        });
        toast.success('Logged in successfully');
        // The delay is for middleware to get the cookie
        setTimeout(() => {
          refresh();
          push('/dashboard');
        }, 500);
      } catch (err: unknown) {
        toast.error('Invalid credentials');
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mt-8">
              <FormLabel className={styles['form-title']}>E-mail</FormLabel>
              <FormControl>
                <Input {...field} placeholder="johndoe@google.com" />
              </FormControl>
              <FormMessage className={styles['form-message']} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={styles['form-title']}>Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="Your Password..."
                />
              </FormControl>
              <FormMessage className={styles['form-message']} />
            </FormItem>
          )}
        />
        <div className=" mx-auto w-20">
          <Button
            disabled={isLoginLoading || isRegisterLoading}
            className="dark:hover:bg-black dark:bg-white dark:text-black dark:hover:text-white hover:bg-black hover:text-white "
            type="submit"
          >
            {buttonText}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default UserForm;
