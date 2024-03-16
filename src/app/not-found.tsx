'use client'

import {Container} from "@/app/ui/common/Container";
import {AppError} from "@/app/ui/common/AppError";
import {Button} from "@/app/ui/common/Button";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter()

  return (
    <main>
      <Container>
        <AppError>
          <div>Страница не найдена</div>
          <Button
            onClick={() => {
              router.push('/')
            }}
            align={'center'}
          >
            Перейти на главную
          </Button>
        </AppError>
      </Container>
    </main>
  );
}