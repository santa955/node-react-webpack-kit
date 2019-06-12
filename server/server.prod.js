import express from 'express'
import path from 'path'
import fs from 'fs'
import FileStreamRotator from 'file-stream-rotator'
import morgan from 'morgan'
import app from './app'

const PORT = process.env.PORT || 3009
const logDir = path.resolve(__dirname, './log')

// 日志按时间分割流
const accessLogStream = FileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: path.join(logDir, 'access-%DATE%.log'),
  frequency: 'daily',
  verbose: false
})

// 检查是否存在logDir这个目录没有则创建
fs.existsSync(logDir) || fs.mkdirSync(logDir)
app.use(morgan('combined', { stream: accessLogStream }))
app.use(express.static(path.resolve(__dirname, './')))

app.listen(PORT, () => {
  console.log(
    `Server listening on \x1b[42m\x1b[1mhttp://localhost:${PORT}\x1b[0m in \x1b[41m${
    process.env.NODE_ENV || 'production'
    }\x1b[0m 🌎...`
  )
})