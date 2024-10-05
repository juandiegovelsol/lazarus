import threading
import time
from concurrent.futures import ThreadPoolExecutor

class ThreaderOne:
    def __init__(self):
        self.lock=threading.Lock()

    def acquirelock(self,name):
        print(f'Locking request by {name}')
        self.lock.acquire()
        print(f'Lock is acquired for {name}')

    def releaselock(self,name):
        self.lock.release()
        print(f'Lock is released for {name}')

class ThreaderTwo:
    def __init__(self):
        self.lock=threading.Lock()

    def acquirelock(self,name):
        print(f'Locking request by {name}')
        self.lock.acquire()
        print(f'Lock is acquired for {name}')

    def releaselock(self,name):
        self.lock.release()
        print(f'Lock is released for {name}')

def display(name, thread1, thread2):
    # Always acquire the locks in the same order
    first_lock, second_lock = sorted([thread1, thread2], key=lambda x: id(x))
    
    first_lock.acquirelock(name)
    time.sleep(1)
    second_lock.acquirelock(name)
    time.sleep(2)
    print('Thread are completed')
    second_lock.releaselock(name)
    first_lock.releaselock(name)

if __name__=='__main__':
    print('Starting...')
    threader1 = ThreaderOne()
    threader2=ThreaderTwo()
    threads_running=[["T1","T2"],[threader1,threader2],[threader2,threader1]]
    with ThreadPoolExecutor(max_workers=2) as executor:
        executor.map(display,*threads_running)