# HJ Blog API 설계서

## 1. 블로그 포스트 관련 API

### 1.1 모든 블로그 포스트 조회

```typescript
GET /api/posts

Response:
{
  posts: {
    slug: string;
    frontMatter: {
      title: string;
      date?: string;
      description?: string;
      category?: string;
      subcategory?: string;
    };
  }[];
}
```

### 1.2 특정 블로그 포스트 조회

```typescript
GET /api/posts/[slug]

Response:
{
  post: {
    slug: string;
    frontMatter: {
      title: string;
      date?: string;
      description?: string;
      category?: string;
      subcategory?: string;
    };
    mdxSource: MDXRemoteSerializeResult;
    toc: {
      id: string;
      depth: number;
      value: string;
      slug: string;
      children?: TocEntry[];
    }[];
  }
}
```

## 2. 카테고리 관련 API

### 2.1 카테고리 목록 조회

```typescript
GET /api/categories

Response:
{
  categories: {
    [category: string]: {
      [subcategory: string]: number;
    };
  }
}
```

### 2.2 특정 카테고리의 포스트 조회

```typescript
GET /api/categories/[category]

Response:
{
  category: string;
  posts: {
    slug: string;
    frontMatter: {
      title: string;
      date?: string;
      description?: string;
      category?: string;
      subcategory?: string;
    };
  }[];
}
```

### 2.3 특정 서브카테고리의 포스트 조회

```typescript
GET /api/categories/[category]/[subcategory]

Response:
{
  category: string;
  subcategory: string;
  posts: {
    slug: string;
    frontMatter: {
      title: string;
      date?: string;
      description?: string;
      category?: string;
      subcategory?: string;
    };
  }[];
}
```

## 3. 검색 관련 API

### 3.1 포스트 검색

```typescript
GET /api/search?q={query}

Response:
{
  results: {
    slug: string;
    frontMatter: {
      title: string;
      date?: string;
      description?: string;
      category?: string;
      subcategory?: string;
    };
    excerpt: string;
  }[];
}
```

## 4. 타입 정의

### 4.1 FrontMatter

```typescript
interface FrontMatter {
  title: string;
  date?: string;
  description?: string;
  category?: string;
  subcategory?: string;
}
```

### 4.2 TocEntry

```typescript
interface TocEntry {
  id: string;
  depth: number;
  value: string;
  slug: string;
  children?: TocEntry[];
}
```

### 4.3 Post

```typescript
interface Post {
  slug: string;
  frontMatter: FrontMatter;
  mdxSource: MDXRemoteSerializeResult;
  toc: TocEntry[];
}
```

## 5. 에러 처리

### 5.1 에러 응답 형식

```typescript
{
  error: {
    code: string;
    message: string;
    details?: any;
  }
}
```

### 5.2 주요 에러 코드

- `NOT_FOUND`: 리소스를 찾을 수 없음
- `INVALID_PARAMS`: 잘못된 파라미터
- `SERVER_ERROR`: 서버 내부 오류

## 6. 캐싱 전략

- 정적 페이지: ISR (Incremental Static Regeneration)
- 동적 데이터: SWR (Stale-While-Revalidate)
- 캐시 유효 기간: 1시간

## 7. 보안

- CORS 설정
- Rate Limiting
- Input Validation
- XSS 방지
