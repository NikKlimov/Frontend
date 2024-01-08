import os
import threading
def filechanger(names, direl):
    if '.' in direl:
        try:
            a=open(direl,'r')
            file = list(a)
            a.close()
            a=open(direl,'w')
            for i1 in names:
                inp = names.get(i1)
                for i in range(len(file)):
                    file[i] = file[i].replace(i1, inp)
            for i in range(len(file)):
                a.write(file[i])
            a.close()  
        except Exception as e:
            #print(direl, e)
            pass

def namechanger(names,direl):
    d=[]
    tread=[]
    for i2 in names:
        files=os.listdir(direl)
        for i1 in files:
            if i1 !='CHANGER.py':
                if list(i1.split('.'))[0] in names and i1 not in d:
                    try:
                        os.rename(direl+"\\"+i1,direl+"\\"+str(names[list(i1.split('.'))[0]]+'.'+list(i1.split('.'))[1]))
                        d.append(str(names[list(i1.split('.'))[0]]+'.'+list(i1.split('.'))[1]))
                        if list(i1.split('.'))[1] not in ["jpg","png","pdf","pct"]:
                            tread.append(threading.Thread(target=filechanger, args=(names,str(direl+"\\"+names[list(i1.split('.'))[0]]+'.'+list(i1.split('.'))[1]))))
                            tread[-1].start()
                    except:
                        os.rename(direl+"\\"+i1,direl+"\\"+names[list(i1.split('.'))[0]])
                        d.append(names[list(i1.split('.'))[0]])
                        tread.append(threading.Thread(target=namechanger, args=(names,direl+"\\"+names[list(i1.split('.'))[0]])))
                        tread[-1].start()
                elif i2 in i1:
                    for tr in tread:
                        tr.join()
                    tread=[]
                    try:
                        os.rename(direl+"\\"+i1,direl+"\\"+str(i1.split('.')[0].replace(i2,names[i2])+'.'+list(i1.split('.'))[1]))
                        d.append(str(i1.split('.')[0].replace(i2,names[i2])+'.'+list(i1.split('.'))[1]))
                        if list(i1.split('.'))[1] not in ["jpg","png","pdf","pct"]:
                            tread.append(threading.Thread(target=filechanger, args=(names,str(direl+"\\"+i1.split('.')[0].replace(i2,names[i2])+'.'+list(i1.split('.'))[1]))))
                            tread[-1].start()
                    except:
                        os.rename(direl+"\\"+i1,direl+"\\"+i1.split('.')[0].replace(i2,names[i2]))
                        d.append(i1.split('.')[0].replace(i2,names[i2]))
                        tread.append(threading.Thread(target=namechanger,args=(names,direl+"\\"+i1.split('.')[0].replace(i2,names[i2]))))
                        tread[-1].start()
                elif i1 not in d:
                    if "." in i1:
                        if list(i1.split('.'))[1] not in ["jpg","png","pdf","pct"]:
                            tread.append(threading.Thread(target=filechanger, args=(names,direl+"\\"+i1)))
                            tread[-1].start()
                    else:
                        tread.append(threading.Thread(target=namechanger, args=(names,direl+"\\"+i1)))
                        tread[-1].start()
        for tr in tread:
            tr.join()
            tread=[]  

names={
'Substance':'Product',
'substance':'product'
}
direl=os.path.dirname(os.path.abspath(__file__))
namechanger(names,direl)
print("OK")
