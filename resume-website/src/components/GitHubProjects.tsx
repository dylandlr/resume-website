"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Star,
  GitFork,
  Book,
  AlertCircle,
  Loader2,
  Eye,
  Github,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface GitHubRepo {
  owner: {
    login: string;
  };
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  language: string | null;
  fork: boolean;
  pushed_at: string;
  updated_at: string;
  size: number;
  default_branch: string;
  open_issues_count: number;
  watchers_count: number;
  created_at: string;
  license: {
    name: string;
  };
  visibility: string;
  clone_url: string;
  commits_url: string;
  contributors_url: string;
  pull_requests_url: string;
  releases_url: string;
  demo_video?: {
    type: "youtube";
    url: string;
  };
}

interface CommitInfo {
  total: number;
  recentCommits: Array<{
    sha: string;
    commit: {
      message: string;
      author: {
        date: string;
      };
    };
  }>;
}

interface RepoStats {
  contributors: number;
  pullRequests: {
    open: number;
    closed: number;
  };
  latestRelease?: {
    name: string;
    published_at: string;
  };
}

const GITHUB_HEADERS = {
  Accept: "application/vnd.github.v3+json",
  "User-Agent": "Portfolio-Website",
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
};

export function GitHubProjects() {
  const [projects, setProjects] = useState<GitHubRepo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [repoStats, setRepoStats] = useState<Record<number, RepoStats>>({});
  const [, setShouldLoadIframe] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [commitInfo, setCommitInfo] = useState<Record<number, CommitInfo>>({});
  const [showVideo, setShowVideo] = useState<number | null>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  // Fetch commit info when expandedId changes
  useEffect(() => {
    if (expandedId) {
      const fetchCommitInfo = async () => {
        const project = projects.find((p) => p.id === expandedId);
        if (!project) return;

        try {
          const response = await fetch(
            project.commits_url.replace("{/sha}", "")
          );
          if (!response.ok) return;
          const commits = await response.json();

          setCommitInfo((prev) => ({
            ...prev,
            [expandedId]: {
              total: commits.length,
              recentCommits: commits.slice(0, 5),
            },
          }));
        } catch (err) {
          console.error("Error fetching commit info:", err);
        }
      };
      fetchCommitInfo();
    }
  }, [expandedId, projects]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch both your repos and repos you contribute to
        const [ownedRepos, contributedRepos] = await Promise.all([
          fetch(
            "https://api.github.com/users/dylandlr/repos?sort=updated&per_page=100",
            {
              headers: GITHUB_HEADERS,
              cache: "no-store",
            }
          ),
          // This endpoint gets repos you can contribute to
          fetch(
            "https://api.github.com/user/repos?affiliation=collaborator&per_page=100",
            {
              headers: GITHUB_HEADERS,
              cache: "no-store",
            }
          ),
        ]);

        if (!ownedRepos.ok || !contributedRepos.ok) {
          throw new Error("Failed to fetch projects");
        }

        const ownedData = await ownedRepos.json();
        const contributedData = await contributedRepos.json();

        // Combine and sort all repos
        const allProjects = [...ownedData, ...contributedData].sort(
          (a: GitHubRepo, b: GitHubRepo) =>
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );

        // Remove duplicates based on repo id
        const uniqueProjects = Array.from(
          new Map(
            allProjects.map((item) => [
              item.id,
              {
                ...item,
                demo_video:
                  item.name.toLowerCase() === "lootgen"
                    ? {
                        type: "youtube" as const,
                        url: "wxfkPxpgObo", // Your YouTube video ID
                      }
                    : undefined,
              },
            ])
          ).values()
        );

        setProjects(uniqueProjects);
        console.log(
          "Projects with videos:",
          uniqueProjects.map((p) => ({
            name: p.name,
            video: p.demo_video,
          }))
        );
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch projects"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [retryCount]);

  useEffect(() => {
    if (expandedId) {
      const project = projects.find((p) => p.id === expandedId);
      if (!project) return;

      const fetchRepoStats = async () => {
        try {
          const [contributors, pulls, releases] = await Promise.all([
            fetch(project.contributors_url, { headers: GITHUB_HEADERS }),
            fetch(
              `https://api.github.com/repos/dylandlr/${project.name}/pulls?state=all`,
              { headers: GITHUB_HEADERS }
            ),
            fetch(project.releases_url.replace("{/id}", "/latest"), {
              headers: GITHUB_HEADERS,
            }),
          ]);

          const contributorsData = contributors.ok
            ? await contributors.json()
            : [];
          const pullsData = pulls.ok ? await pulls.json() : [];
          const releaseData = releases.ok ? await releases.json() : null;

          setRepoStats((prev) => ({
            ...prev,
            [expandedId]: {
              contributors: Array.isArray(contributorsData)
                ? contributorsData.length
                : 0,
              pullRequests: {
                open: pullsData.filter(
                  (pr: { state: string }) => pr.state === "open"
                ).length,
                closed: pullsData.filter(
                  (pr: { state: string }) => pr.state === "closed"
                ).length,
              },
              latestRelease: releaseData
                ? {
                    name: releaseData.name || releaseData.tag_name,
                    published_at: releaseData.published_at,
                  }
                : undefined,
            },
          }));
        } catch (error) {
          console.error("Error fetching repo stats:", error);
          setRepoStats((prev) => ({
            ...prev,
            [expandedId]: {
              contributors: 0,
              pullRequests: { open: 0, closed: 0 },
              latestRelease: undefined,
            },
          }));
        }
      };

      fetchRepoStats();
    }
  }, [expandedId, projects]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadIframe(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center text-white gap-2">
        <Loader2 className="w-6 h-6 animate-spin" />
        <span>Loading projects...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-white">
        <AlertCircle className="h-10 w-10 mx-auto mb-4" />
        <p className="mb-4">{error}</p>
        <Button
          onClick={() => setRetryCount((count) => count + 1)}
          variant="outline"
          className="bg-slate-800 hover:bg-slate-700">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 relative px-4 sm:px-6">
      {projects.map((project, index) => (
        <React.Fragment key={project.id}>
          <Card
            onClick={() =>
              setExpandedId(expandedId === project.id ? null : project.id)
            }
            className={cn(
              "bg-slate-900 text-white border-slate-800 hover:bg-slate-800/95 transition-all duration-300 cursor-pointer relative overflow-hidden",
              "max-w-full",
              expandedId === project.id &&
                "ring-2 ring-blue-500 shadow-lg shadow-blue-500/20 scale-[1.02] z-20"
            )}>
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-2 leading-relaxed">
                <Book className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <a
                  href={project.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors truncate">
                  {project.name}
                </a>
              </CardTitle>
              <div className="text-sm text-slate-500 mt-1 flex items-center gap-1">
                <Github className="w-4 h-4" />
                {project.owner.login}/{project.name}
              </div>
              {project.description && (
                <CardDescription className="text-slate-400 mt-2">
                  {project.description}
                </CardDescription>
              )}
            </CardHeader>
            <CardContent className="pb-4">
              <div className="flex flex-col gap-4">
                {/* Stats Row */}
                <div className="flex items-center gap-4 text-sm text-slate-400">
                  {project.language && (
                    <span className="flex items-center gap-1">
                      <span className="w-3 h-3 rounded-full bg-blue-400"></span>
                      {project.language}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    {project.stargazers_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="w-4 h-4" />
                    {project.forks_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {project.watchers_count}
                  </span>
                </div>

                {/* Additional Info */}
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-400">
                  <div>
                    <span className="font-semibold">Last Push:</span>{" "}
                    {new Date(project.pushed_at).toLocaleDateString()}
                  </div>
                  <div>
                    <span className="font-semibold">Updated:</span>{" "}
                    {new Date(project.updated_at).toLocaleDateString()}
                  </div>
                  <div>
                    <span className="font-semibold">Size:</span>{" "}
                    {(project.size / 1024).toFixed(2)} MB
                  </div>
                  <div>
                    <span className="font-semibold">Issues:</span>{" "}
                    {project.open_issues_count}
                  </div>
                </div>

                {/* Topics */}
                {project.topics.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.topics.map((topic) => (
                      <span
                        key={topic}
                        className="px-2 py-1 bg-blue-500/10 rounded-full text-sm text-blue-300">
                        {topic}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {expandedId === project.id && (
            <div
              className="col-span-1 md:col-span-2 lg:col-span-3 bg-slate-950/95 backdrop-blur-sm border border-slate-700 rounded-lg p-4 sm:p-8 animate-slideDown shadow-xl relative mx-4 sm:mx-0"
              style={{
                gridRow: `${Math.floor(index / 3) + 2}`,
                gridColumn: "1 / -1",
                marginTop: "1.5rem",
                backgroundColor: "#111827",
              }}>
              <div className="relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold mb-4 text-white">
                      Repository Details
                    </h3>
                    <ul className="space-y-4 text-slate-200">
                      <li>
                        <span className="font-semibold text-blue-300">
                          Created:
                        </span>{" "}
                        {new Date(project.created_at).toLocaleDateString(
                          undefined,
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </li>
                      <li>
                        <span className="font-semibold text-blue-300">
                          License:
                        </span>{" "}
                        {project.license?.name || "Not specified"}
                      </li>
                      <li>
                        <span className="font-semibold text-blue-300">
                          Visibility:
                        </span>{" "}
                        <span className="capitalize">{project.visibility}</span>
                      </li>
                      <li className="break-all">
                        <span className="font-semibold text-blue-300">
                          Clone URL:
                        </span>{" "}
                        <code className="bg-slate-800 px-3 py-1 rounded text-sm mt-1 block">
                          {project.clone_url}
                        </code>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold mb-4 text-white">
                      Repository Activity
                    </h3>
                    <ul className="space-y-4 text-slate-200">
                      <li>
                        <span className="font-semibold text-blue-300">
                          Contributors:
                        </span>{" "}
                        {repoStats[project.id]?.contributors || "Loading..."}
                      </li>
                      <li>
                        <span className="font-semibold text-blue-300">
                          Pull Requests:
                        </span>{" "}
                        {repoStats[project.id]?.pullRequests ? (
                          <>
                            {repoStats[project.id].pullRequests.open} open,{" "}
                            {repoStats[project.id].pullRequests.closed} closed
                          </>
                        ) : (
                          "Loading..."
                        )}
                      </li>
                      <li>
                        <span className="font-semibold text-blue-300">
                          Latest Release:
                        </span>{" "}
                        {repoStats[project.id]?.latestRelease ? (
                          <>
                            {repoStats[project.id]?.latestRelease?.name} ({" "}
                            {repoStats[project.id]?.latestRelease?.published_at
                              ? new Date(
                                  repoStats[project.id]?.latestRelease
                                    ?.published_at || ""
                                ).toLocaleDateString()
                              : "No date"}
                            )
                          </>
                        ) : (
                          "No releases"
                        )}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex justify-center">
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (project.demo_video) {
                      setShowVideo(
                        showVideo === project.id ? null : project.id
                      );
                    }
                  }}
                  disabled={!project.demo_video}
                  className={cn(
                    "text-white transition-colors",
                    project.demo_video
                      ? "bg-blue-500 hover:bg-blue-600"
                      : "bg-slate-700 cursor-not-allowed"
                  )}>
                  {project.demo_video
                    ? showVideo === project.id
                      ? "Hide Demo"
                      : "Watch Demo"
                    : "Demo Coming Soon"}
                </Button>
              </div>
            </div>
          )}
          {showVideo === project.id && project.demo_video && (
            <div
              className="col-span-1 md:col-span-2 lg:col-span-3 bg-slate-950/95 backdrop-blur-sm border border-slate-700 rounded-lg p-4 sm:p-8 animate-slideDown shadow-xl relative mx-4 sm:mx-0"
              style={{
                gridRow: `${Math.floor(index / 3) + 3}`,
                gridColumn: "1 / -1",
                marginTop: "1.5rem",
                backgroundColor: "#111827",
              }}>
              <div ref={videoRef} className="relative z-10 aspect-video">
                {project.demo_video.type === "youtube" && (
                  <>
                    <Image
                      src={`https://i.ytimg.com/vi/${project.demo_video.url}/mqdefault.jpg`}
                      alt="Video preview"
                      className="absolute inset-0 rounded-lg object-cover"
                      fill
                      priority={false}
                    />
                    <iframe
                      loading="lazy"
                      src={`https://www.youtube.com/embed/${project.demo_video.url}?autoplay=0&rel=0&modestbranding=1`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full rounded-lg"
                    />
                  </>
                )}
              </div>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
