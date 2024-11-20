import { NextRequest, NextResponse } from "next/server";
import { User } from '@/models/user';
import { connectMongoDB } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export const POST = async (req: NextRequest) => {
  try {
    // 요청 본문에서 데이터 추출
    const { name, email, password } = await req.json();

    // 필수 입력값 검사
    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // MongoDB 연결
    await connectMongoDB();

    // 중복 이메일 검사
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "Email already exists" }, { status: 409 });
    }

    // 비밀번호 해싱
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 사용자 생성
    await User.create({ name, email, password: hashedPassword });

    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    console.error("Error during registration:", error); 
    return NextResponse.json({ message: "An error occurred while registering the user." }, { status: 500 });
  } 
};
