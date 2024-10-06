#!/bin/bash

# 연결된 기기 목록 확인
devices=$(adb devices | awk 'NR>1 {print $1}')

# 기기가 존재하는지 확인
if [ -z "$devices" ]; then
    echo "연결된 기기가 없습니다."
    exit 1
fi

# 첫 번째 기기 선택
device=$(echo "$devices" | head -n 1)

# adb shell에서 ls 명령어 실행하고 결과를 파일로 저장
adb -s "$device" shell ls > "${device}_ls_output.txt"

# 결과 확인
if [ $? -eq 0 ]; then
    echo "ls 명령어 결과가 ${device}_ls_output.txt 파일에 저장되었습니다."
else
    echo "ls 명령어 실행 중 오류가 발생했습니다."
fi
