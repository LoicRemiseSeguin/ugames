import { fetchWrapper } from '@/api/api'

export async function getUser() {
    return fetchWrapper('/products');
}