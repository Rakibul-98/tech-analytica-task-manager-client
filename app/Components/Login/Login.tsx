"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLoginMutation } from '../../../redux/features/auth/authApi';
import { toast } from 'sonner';
import { useAppDispatch } from '../../../redux/hooks';
import { setCredentials } from '../../../redux/features/auth/authSlice';
import { useRouter } from 'next/navigation';
import { ArrowRight, AtSign, CheckSquare, Loader2, Lock } from 'lucide-react';

const loginSchema = z.object({
  email: z.string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required'),
  password: z.string()
    .min(6, 'Password must be at least 6 characters')
    .max(50, 'Password is too long'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'admin@taskapp.com',
      password: 'admin123',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await login(data).unwrap();

      if (response.success) {
        dispatch(
          setCredentials({
            user: response.data.user,
            token: response.data.accessToken,
          })
        );
        toast.success("Log in successful.")
        reset()
        router.push("/dashboard");
      } else {
        toast.error(response.message || "Login failed");
      }
    } catch (err: any) {
      toast.error(err.data?.message || "An error occurred during login");
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-950">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 bg-linear-to-br from-indigo-600 via-indigo-700 to-violet-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-violet-300 rounded-full blur-3xl" />
        </div>
        <div className="relative flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <CheckSquare size={18} className="text-white" />
          </div>
          <span className="text-white font-semibold text-lg">TaskFlow</span>
        </div>
        <div className="relative">
          <h1 className="text-4xl font-bold text-white leading-tight mb-4">
            Manage tasks.<br />Stay in control.
          </h1>
          <p className="text-indigo-200 text-lg leading-relaxed">
            A clean, role-based task management system built for teams that value clarity and accountability.
          </p>
          <div className="mt-10 flex flex-col gap-3">
            {["Role-based access control", "Full audit trail", "Real-time task updates"].map(f => (
              <div key={f} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>
                <span className="text-indigo-100 text-sm">{f}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="relative text-indigo-300 text-sm">© 2026 TaskFlow</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8 bg-linear-to-br from-blue-50 to-indigo-100">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <CheckSquare size={16} className="text-white" />
            </div>
            <span className="font-semibold text-slate-800">TaskFlow</span>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mb-1">Welcome back</h2>
          <p className="text-slate-500 text-sm mb-8">Sign in to your account to continue</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email address</label>
              <div className="relative">
                <AtSign size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  {...register('email')}
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all"
                />
              </div>
              {errors.email && touchedFields.email && (
                <p className="mt-1.5 text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm font-medium text-slate-700">Password</label>
                <a href="#" className="text-xs text-indigo-600 hover:text-indigo-700 font-medium">Forgot password?</a>
              </div>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  {...register('password')}
                  type="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all"
                />
              </div>
              {errors.password && touchedFields.password && (
                <p className="mt-1.5 text-xs text-red-500">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white text-sm font-semibold rounded-xl transition-all duration-150 shadow-sm shadow-indigo-200 cursor-pointer mt-2"
            >
              {isLoading ? (
                <><Loader2 size={15} className="animate-spin" /> Signing in...</>
              ) : (
                <>Sign in <ArrowRight size={15} /></>
              )}
            </button>
          </form>

          {/* Demo hint */}
          <div className="mt-6 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <p className="text-xs font-medium text-slate-600 mb-1.5">Demo credentials</p>
            <div className="flex gap-4 text-xs text-slate-500">
              <span><span className="font-medium text-slate-700">Admin:</span> admin@taskapp.com / admin123</span>
            </div>
            <div className="flex gap-4 text-xs text-slate-500 mt-1">
              <span><span className="font-medium text-slate-700">User:</span> user@taskapp.com / user123</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}