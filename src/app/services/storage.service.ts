import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
    public addToStorage(key: string, value: string): void {
        localStorage.setItem(key, value);
    }

    public getFromStorage(key: string): string | null {
        return localStorage.getItem(key);
    }

    public removeFromStorage(key: string): void {
        localStorage.removeItem(key);
    }
}
