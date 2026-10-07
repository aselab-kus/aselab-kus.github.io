# 이전 내용과 검토 사항

## 디자인 및 데이터 기준

메인: 이 대화에서 승인한 ASELab homepage v12.
멤버 상세: 이 대화에서 승인한 ASELab members v2.
기타 기존 데이터: 2026-10-07에 공개된 기존 홈페이지와 저장소의 HTML/JavaScript를 읽어 옮김.

승인한 메인 배경 hero-detail.webp는 파일 내용 그대로 복사했습니다. scan 글자와 어셈블리의 그림을 추가 수정하지 않았습니다. 메인 글꼴과 카드·뉴스·Members·모집 문구도 유지했습니다.

Publications/Research/Seminar/Contact/News는 기존 자료를 새 공통 헤더·푸터와 타이포그래피에 맞춰 정리했습니다. 학생의 신규 연구 관심, 새로운 수상/논문/과제 또는 임의의 세미나 일정은 추가하지 않았습니다.

## 외부 사이트 의존성

이전 홈페이지 도메인이나 이전 GitHub 주소는 배포용 HTML·CSS·JS·데이터에서 사용하지 않습니다. 사진도 외부 hotlink 대신 로컬 경로입니다. 메뉴와 상세 링크는 상대경로이므로 새 GitHub 계정/Organization/프로젝트 경로에서도 연결됩니다.

학교 홈페이지, Google Scholar, 논문의 저널/DOI 링크, Google Maps는 의도된 외부 링크로 유지했습니다. Seminar의 Google Sheets CSV는 기존 일정 관리 방식이므로 유지했습니다. 공식 학교 로고는 별도로 연결할 수 있습니다.

도움말/사진 가져오기 도구에는 출처와 1회 이전 작업을 위해 예전 저장소 주소가 남아 있습니다. 웹페이지가 실행할 때 이 도구나 출처 주소를 호출하지는 않습니다.

## 멤버 사진

원본 사진 7개가 제공된 소스 ZIP에는 포함되지 않았고, 이번 실행 환경에서는 외부 binary 다운로드를 수행할 수 없어 패키지에 넣지 못했습니다. 기존 저장소의 사진을 직접 복사하거나 tools/import-photos.py로 가져오세요. 사진이 없으면 이니셜/Photo unavailable 안내가 표시됩니다. AI로 인물 사진이나 학교 로고를 새로 만들지 않았습니다.

## 데이터 검토

- News 13개: 기존 항목과 날짜/순서를 유지했습니다. 예전의 “joined USELab”은 브랜드 표시를 위해 “joined ASELab”으로 바꿨습니다. 과거 당시 이름을 엄밀하게 유지하고 싶다면 해당 항목은 “joined the lab” 등으로 바꾸세요.
- Publications 31개: International/ Domestic 구분과 원문의 정보 유지. 숫자는 **선택된 구분의 연도 안에서** 역순으로 표시합니다. 논문의 제목, 저자, 게재처, 권호/페이지, 날짜 및 원문 링크를 옮겼으며 각 논문의 서지사항이나 학술지 등급을 독립적으로 검증한 것은 아닙니다.
- **기존 Domestic의 2024 영역에 있는 ‘생성형 AI 기반 난독화…’ 논문은 표시 날짜가 January 2025로 되어 있었습니다.** 임의로 연도를 바꾸지 않고 기존 그룹을 유지했습니다. 해당 항목의 year/date를 확인하세요.
- Research 과제 10개: 원문 진행/종료 그룹을 유지합니다. 오늘 날짜만 보고 자동 종료시키지 않습니다. 현재 진행 상태와 기간은 주기적으로 직접 갱신하세요.
- 멤버 정보: 이전에 확인한 HTML의 이름, 이메일, 연구 관심, 사진 파일명을 유지했습니다. 새 학적/명단 갱신 여부는 사용자가 확인해야 합니다.
- Contact: 기존 메일/전화/주소/연구실 정보를 유지했습니다. 메인의 Contact us는 연락처 페이지로 이동하고 연락처 페이지의 이메일 버튼은 메일 앱을 엽니다.
- Seminar: 실제 시트 내용은 이번 실행 환경에서 읽어 검증하지 못했습니다. 임의의 일정으로 대체하지 않았으며, 공개 CSV가 실패하면 오류 메시지를 표시합니다. 로컬 보존본 data/seminars.js는 비어 있습니다.

## 출처

https://github.com/uselab-kus/uselab-kus.github.io
https://uselab.korea.ac.kr/publications.html
https://raw.githubusercontent.com/uselab-kus/uselab-kus.github.io/main/news-data.js
https://raw.githubusercontent.com/uselab-kus/uselab-kus.github.io/main/research.html
https://raw.githubusercontent.com/uselab-kus/uselab-kus.github.io/main/seminars.html
https://raw.githubusercontent.com/uselab-kus/uselab-kus.github.io/main/contact.html

GitHub 저장소와 도메인을 새로 만들거나 기존 사이트를 수정하는 원격 작업은 수행하지 않았습니다.
