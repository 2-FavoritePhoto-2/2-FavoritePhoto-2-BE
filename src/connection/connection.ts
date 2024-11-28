import { PrismaClient } from '@prisma/client';

// 로깅 이벤트를 캡쳐하여 동작이나 상태 변화 기록
export const prismaClient = new PrismaClient({
	log: [
		{ level: 'info', emit: 'event' },
		{ level: 'warn', emit: 'event' },
		{ level: 'error', emit: 'event' },
	],
});

// 정보 로깅: 시스템 정상일 때 + DB 작업 상태 추적 목적
prismaClient.$on('info', (e: any) => {
	console.log('INFO:', e.message);
});

// 경고 로깅: 시스템 상태나 설정에서 이상 징후가 있을 때
prismaClient.$on('warn', (e: any) => {
	console.log('INFO:', e.message);
});

// 오류 로깅: 실제 오류가 발생했을 때
prismaClient.$on('error', (e: any) => {
	console.log('INFO:', e.message);
});
