# GitHub Pages 새 사이트 설정

공식 문서 확인 기준: 2026-10-07. 아래 `aselab-kus`는 설명용 예시이며 이름의 사용 가능 여부는 확인하지 않았습니다.

## 1. 새 주소를 어떻게 구성할까요?

연구실 이름을 바꿔도 기존 도메인과 저장소를 반드시 바꿔야 하는 것은 아닙니다. 다만 이번 새 사이트는 기존 주소와 독립적으로 만들었습니다.

추천 구성은 교수님의 기존 개인 계정으로 관리하는 **연구실 Organization + 공개 홈페이지 저장소**입니다. 별도의 공용 개인 계정을 만들거나 로그인 비밀번호를 학생에게 공유할 필요가 없습니다. 기존 개인 사용자명을 바꿀 필요도 없습니다.

예를 들어 실제 사용 가능한 Organization 이름을 `aselab-kus`로 정했다면:

```text
Organization 이름     aselab-kus
홈페이지 저장소 이름   aselab-kus.github.io
기본 홈페이지 주소     https://aselab-kus.github.io/
```

Organization 홈페이지는 저장소 이름을 `<organization>.github.io`로 맞춥니다. 이것이 일반 프로젝트 저장소 `website`를 만들었을 때의 `/website/` 경로와 다른 점입니다. 새 소스는 두 방식 모두에 맞도록 상대경로로 구성했지만, 연구실 대표 홈페이지에는 첫 구성을 권합니다. [1]

## 2. Organization 만들기

개인 계정으로 GitHub에 로그인하고:

```text
프로필 사진 → Settings → Organizations → New organization
```

원하는 이름과 연락처를 입력합니다. 공개 홈페이지 저장소는 GitHub Free for organizations에서도 Pages를 사용할 수 있습니다. 가입 중 플랜 선택이 나온다면 공개 홈페이지 용도로는 Free에서 시작할 수 있습니다. [1][2]

홈페이지 관리 권한은 교수님 중심으로 두고, 학생의 연구 코드 저장소 권한은 따로 부여하는 운영을 권합니다. 공개 홈페이지 저장소는 누구나 읽을 수 있으므로, 여기서 제한할 것은 **쓰기/관리 권한**입니다. 학생을 Organization에 초대할 때 전체 저장소 쓰기 권한이 자동으로 부여되도록 설정하지 않았는지 확인하세요.

## 3. 새 저장소 만들기

```text
New repository
Owner: 새 Organization
Repository name: 새-조직명.github.io
Visibility: Public
Add README: On
Create repository
```

예시라면 `aselab-kus.github.io`입니다. 실제 조직명이 달라지면 저장소명도 그 이름에 맞춥니다. GitHub Free의 Pages는 공개 저장소를 사용합니다. [1]

연구실 연락처나 소속을 제외한 비공개 정보, 비밀번호, 미발표 원고, 접근 토큰은 올리지 마세요. 사이트는 공개됩니다. [1]

## 4. 파일 업로드

새 사이트 ZIP을 압축 해제한 후, 멤버 사진을 안내된 위치에 복사하세요.

새 저장소의 `Code → Add file → Upload files`에서 **폴더 안의 내용물**을 업로드하고 커밋합니다. 새 브랜치로 제안한 경우 main으로 병합한 뒤 Pages를 켜세요. [5] 파일명은 그대로 유지하세요. 이미 README가 있으면 새 패키지 README로 교체해도 됩니다.

다음처럼 보여야 합니다.

```text
저장소 최상위
├── index.html
├── members.html
├── publications.html
├── …
├── assets/
├── data/
├── members/
├── site-config.js
└── .nojekyll
```

`ASELab_new_site_v1/index.html`처럼 외부 포장 폴더를 추가하지 않습니다. ZIP 자체도 업로드하지 않습니다. GitHub Pages는 지정된 게시 폴더 최상위의 index 파일을 사용합니다. [1]

`.nojekyll`은 빈 파일입니다. 업로드 화면에서 숨김 파일이 빠졌다면 `Add file → Create new file`로 `.nojekyll`을 만들어 커밋하세요. 이 파일이 있으면 이 사이트에 불필요한 Jekyll 처리를 사용하지 않습니다. [1]

## 5. Pages 켜기

**Organization 전체 Settings가 아니라 방금 만든 저장소의 Settings**로 들어갑니다.

```text
Settings
  → Pages
    → Build and deployment
      Source: Deploy from a branch
      Branch: main
      Folder: / (root)
      Save
```

이 소스에는 별도 빌드가 필요하지 않으므로 직접 Actions workflow를 작성하는 방법보다 위 branch 배포가 간단합니다. Pages 내부 배포는 Actions 작업으로 실행됩니다. [3]

배포 상태는 저장소의 Actions와 Settings → Pages에서 확인할 수 있습니다. 완료되면 `Visit site`로 접속하세요. GitHub는 변경 사항의 반영에 최대 약 10분이 걸릴 수 있다고 안내합니다. [1]

## 6. 먼저 기본 주소로 확인

도메인 설정 전에 `https://실제-조직명.github.io/`에서 아래 흐름을 확인하세요.

```text
메인 → Members → 교수 소개 → Back to Members → Graduate students
메인 → Publications → International / Domestic
메인 → Research
메인 → News
메인 → Contact us → contact.html
모바일 → 메뉴 열기/닫기
```

사진 7개 표시, 한글 글꼴, 뉴스 목록, 논문 개수도 확인하세요. 세미나는 기존 Google Sheets 공개 CSV 연결이므로 별도로 데이터 접근 권한을 확인하세요.

이번 소스는 이미 운영용입니다. `mode: "site"`로 바꾸거나 `noindex`를 지우는 추가 작업은 없습니다.

## 7. 나중에 학교 도메인 연결

예를 들어 `aselab.korea.ac.kr`을 쓰려면 학교 측에 해당 서브도메인의 사용 및 DNS 설정 가능 여부를 먼저 확인해야 합니다. 여기서 이 주소의 배정을 확인하거나 신청한 것은 아닙니다. GitHub 저장소 이름을 바꾼다고 학교 도메인이 자동 생성되지 않습니다.

도메인 사용이 승인되면 GitHub의 도메인 검증 절차와 Custom domain을 설정한 뒤 DNS를 연결하세요. GitHub는 DNS를 먼저 연결하는 것보다 GitHub 쪽 Custom domain 등록을 먼저 완료하도록 안내합니다. [4]

예시 DNS 구성:

```text
학교에서 승인한 이름: aselab.korea.ac.kr
종류: CNAME
대상: 실제-조직명.github.io
```

대상에 `https://`, `/`, 저장소 경로를 넣지 않습니다. GitHub 저장소 → Settings → Pages → Custom domain에는 승인된 전체 도메인을 입력합니다. branch 배포에서는 CNAME 파일이 생성될 수 있습니다. DNS 전파와 인증서 준비가 끝나면 Enforce HTTPS도 활성화합니다. [4]

**이번 패키지에는 기존 USELab 도메인의 CNAME이 없습니다. 기존 CNAME을 새 저장소로 복사하지 마세요.**

## 8. 기존 사이트는 이전 확인 후 정리

새 사이트의 자료와 링크가 정상인지 확인하기 전에는 기존 사이트를 삭제하지 않는 편을 권합니다. 이후 기존 메인에 새 주소 안내를 두거나 이전 처리를 선택할 수 있습니다. 기존 학교 도메인의 DNS가 옛 GitHub에 연결된 채로 저장소만 삭제되는 상태는 피하고, 학교 DNS 담당자와 함께 정리하세요. 사용하지 않는 도메인 연결은 takeover 위험을 줄이기 위해 제거·관리해야 합니다. [4]

## 공식 자료

[1] GitHub Docs — Creating a GitHub Pages site
https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site

[2] GitHub Docs — Creating a new organization from scratch
https://docs.github.com/en/organizations/collaborating-with-groups-in-organizations/creating-a-new-organization-from-scratch

[3] GitHub Docs — Configuring a publishing source for your GitHub Pages site
https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

[4] GitHub Docs — Managing a custom domain for your GitHub Pages site
https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

[5] GitHub Docs — Adding a file to a repository
https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository
