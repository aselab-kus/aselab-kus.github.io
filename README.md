# ASELab — 새 저장소용 홈페이지

AI and Security Engineering Lab · 지능형 보안공학 연구실

승인한 메인(v12)과 Members 상세(v2)의 디자인을 유지하면서, 새 GitHub Pages 저장소에 독립적으로 배치하도록 정리한 정적 사이트입니다. 기존 파일 위에 일부만 덮어쓰는 패치가 아닙니다.

## 먼저 확인할 것

- `index.html`이 이미 메인입니다. 이름을 바꾸거나 preview/site 모드를 전환할 필요가 없습니다.
- HTML·CSS·JavaScript·메인 배경·탭 아이콘·뉴스·논문·과제 데이터가 들어 있습니다.
- **멤버 사진 원본 7개는 제공된 소스 ZIP에 없어서 포함하지 못했습니다.** 기존 저장소 `members/images/`의 사진을 새 `assets/images/members/`로 복사하세요. 파일명은 그 폴더의 README에 정리했습니다. 사진이 없으면 이니셜과 안내가 표시됩니다. 기존 홈페이지의 사진을 매번 원격으로 불러오지는 않습니다.
- 학교 로고 원본은 포함하지 않았습니다. 공식 파일을 확보한 다음 `site-config.js`에 연결하세요. 그전에는 학교명이 텍스트로 표시됩니다.
- 세미나는 기존에 공개한 Google Sheets CSV 주소를 유지했습니다. 여기서 실제 공개 시트의 접속·내용은 검증하지 못했습니다. 연결 실패 시 오류 안내가 나오며, 빈 일정으로 오인하게 만들지 않습니다.
- 새 Organization 이름과 도메인은 아직 확정하지 않았습니다. 예시 이름을 실제 주소로 간주하지 마세요.
- 기존 저장소의 `CNAME`을 가져오지 않았습니다. 새 도메인 연결 전에는 이 상태로 배포하세요.

## 로컬 검토

압축을 풀고 `index.html`을 브라우저로 여세요. 다른 HTML 페이지로 연결됩니다. 뉴스·논문·과제는 로컬 JS 파일을 읽으므로 별도 서버나 빌드가 필요하지 않습니다. 세미나 온라인 데이터는 브라우저 및 네트워크 정책에 따라 연결이 제한될 수 있습니다.

Python 3이 이미 있다면 다음으로 로컬 HTTP 환경을 확인할 수도 있습니다.

```bash
cd /path/to/ASELab_new_site_v1
python3 tools/preview.py
```

기본 주소는 `http://127.0.0.1:8000/`이고 종료는 Ctrl+C입니다. Python이 없는 경우 설치하지 않아도 로컬 HTML 검토와 GitHub 배포는 가능합니다. Python 도구는 선택 사항이며 홈페이지 런타임 의존성이 아닙니다.

별도로 제공된 `ASELab_new_site_preview.html`은 전체 10개 페이지를 한 파일에 넣은 **검토 전용 파일**입니다. 새 저장소의 `index.html` 대신 업로드하지 마세요.

## 파일 구조

```text
index.html
members.html
members/
  cho.html
  grad.html
  undergrad.html
publications.html
research.html
seminars.html
contact.html
news.html
site-config.js
assets/
  css/
    base.css       # 기존 공통 폰트·기본 스타일
    home.css       # 승인한 메인 디자인
    members.css    # 승인한 멤버 상세 디자인
    pages.css      # 나머지 서브페이지
  js/
    site.js        # 공통 브랜드·메뉴·로고·사진 처리
    pages.js       # 뉴스·논문·과제 표시
    seminars.js    # 공개 시트/로컬 세미나 데이터
  images/
    hero-detail.webp
    members/       # 사진 7개를 이곳으로 복사
  favicon.svg
data/
  news.js
  publications.js
  projects.js
  seminars.js
tools/
  preview.py
  import-photos.py
  member-photos.json
docs/
  GITHUB-PAGES-ko.md
  MIGRATION-NOTES-ko.md
  QA-ko.md
.nojekyll
.gitignore
```

새 저장소 최상위에 `index.html`이 직접 보여야 합니다. ZIP 파일 자체를 올리거나, 저장소 안에 `ASELab_new_site_v1` 폴더를 한 단계 더 만들지 마세요.

## 무엇을 어디서 수정하나요?

| 수정 대상 | 파일 |
|---|---|
| 연구실명·소속·대표 이메일·GitHub 링크·학교 로고 | `site-config.js` |
| 첫 화면 소개와 연구분야 문구 | `index.html` |
| Research 페이지의 분야 설명 | `research.html` (현재 메인과 같은 문구) |
| 구성원 정보·사진 파일명 | `members/*.html` |
| 최신 소식 | `data/news.js` (최신 항목을 맨 위에 추가) |
| 논문 목록 | `data/publications.js` |
| 연구과제 목록 | `data/projects.js` |
| 세미나 공개 CSV 주소 | `site-config.js`의 `seminarCsvUrl` |
| 세미나 로컬 일정/보존본 | `data/seminars.js` |
| 연락처·지원 안내 | `contact.html` |
| 서브페이지 공통 메뉴·푸터 | 각 HTML의 `<header>`/`<footer>` |

공통 헤더·푸터는 같은 구조를 각 HTML에 미리 넣었습니다. JavaScript가 꺼져도 메뉴가 사라지지 않도록 하기 위한 구성입니다. 메뉴 항목 자체를 변경할 때는 HTML 전체에 동일하게 반영하세요. 연구실 이름·이메일·학교 로고는 설정 파일을 공유합니다.

## 새 GitHub 주소 설정

Organization이 정해진 다음 `site-config.js`의 다음 값만 바꾸면 하단 GitHub 링크가 나타납니다.

```javascript
githubUrl: "https://github.com/실제-조직명/",
```

현재 빈 값이므로 예전 GitHub로 보내지 않고 링크를 숨깁니다. 홈페이지 자신의 주소를 일일이 입력할 필요는 없습니다. 페이지 간 링크와 사진·CSS·JS는 상대경로입니다.

## 사진 가져오기 (선택 도구)

직접 복사하는 것이 가장 간단합니다. 기존 프로젝트에서 `members/images/`의 해당 사진을 새 `assets/images/members/`에 넣으세요.

기존 프로젝트 폴더 또는 GitHub에서 받은 ZIP이 있으면 아래 도구로 필요한 7개만 복사할 수 있습니다.

```bash
python3 tools/import-photos.py --source "/path/to/old-repository"
# 또는
python3 tools/import-photos.py --source "/path/to/old-repository.zip"
```

인터넷이 연결된 개인 컴퓨터에서 기존 공개 저장소의 원본을 한 번 내려받는 방법도 있습니다.

```bash
python3 tools/import-photos.py --download
```

이 명령은 웹사이트를 수정하거나 외부로 사진을 업로드하지 않습니다. 파일을 새 로컬 사진 폴더에 저장합니다. 기존 파일은 기본적으로 덮어쓰지 않습니다. 결과에 MISSING이 있으면 해당 파일의 원본 존재 여부를 확인하세요. 도구에 있는 이전 GitHub URL은 **1회 이전 작업용**이며 배포한 사이트가 호출하는 주소가 아닙니다.

## 배포

`docs/GITHUB-PAGES-ko.md`를 따르세요. 핵심 설정은 **main / (root) / Deploy from a branch**입니다. npm 설치, 별도 빌드, 직접 작성한 Actions YAML은 필요하지 않습니다. GitHub 내부의 Pages 배포 작업은 정상적으로 실행됩니다.

배포 전에 `docs/MIGRATION-NOTES-ko.md`의 원본 확인 사항도 확인하세요.
