"use server";

import { redirect } from "next/navigation";
import { createServerSupabaseClient, isSupabaseConfigured } from "@/lib/supabase/server";

export async function signIn(formData: FormData) {
  if (!isSupabaseConfigured()) {
    redirect("/dashboard");
  }

  const supabase = await createServerSupabaseClient();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    redirect("/sign-in?error=" + encodeURIComponent("이메일과 비밀번호를 모두 입력해 주세요."));
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(`/sign-in?error=${encodeURIComponent("로그인에 실패했습니다. 이메일, 비밀번호 또는 이메일 인증 상태를 확인해 주세요.")}`);
  }

  redirect("/dashboard");
}

export async function signUp(formData: FormData) {
  if (!isSupabaseConfigured()) {
    redirect("/dashboard");
  }

  const supabase = await createServerSupabaseClient();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const fullName = String(formData.get("fullName") ?? "").trim();

  if (!fullName || !email || !password) {
    redirect("/sign-in?error=" + encodeURIComponent("이름, 이메일, 비밀번호를 모두 입력해 주세요."));
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName
      }
    }
  });

  if (error) {
    redirect(`/sign-in?error=${encodeURIComponent(error.message)}`);
  }

  if (data.user) {
    await supabase.from("profiles").upsert({
      id: data.user.id,
      full_name: fullName,
      role: "student"
    });
  }

  if (!data.session) {
    redirect(
      "/sign-in?success=" +
        encodeURIComponent("회원가입이 완료되었습니다. 이메일 인증을 마친 뒤 로그인해 주세요.")
    );
  }

  redirect("/dashboard");
}
