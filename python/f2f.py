#coding:utf-8

print '请输入源文件'
srcFName = raw_input()
print '请输入目标文件'
distFName = raw_input()
fStr = ''

with open(srcFName, 'r') as f:
	fStr = f.readlines()

with open(distFName, 'w') as f:
	for value in fStr:
		f.write(value)
	


