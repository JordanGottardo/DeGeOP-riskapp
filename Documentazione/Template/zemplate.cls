\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{zemplate}[2016/12/06 custom software engineering documentation]

\LoadClass[a4paper,11pt]{article} % Define base class

% = Load packages ================================================================================

\RequirePackage{etoolbox} % convinient class definition commands
\RequirePackage{xparse} % convinient enviroment definition commands
\RequirePackage[T1]{fontenc} % codifica dei font in uscita
\RequirePackage[utf8]{inputenc} % codifica dei font in uscita
\RequirePackage[italian]{babel} % lingua del documento\texttt{}
\RequirePackage{tocloft}
\RequirePackage{fancyhdr} % to get header/footer on each page
\RequirePackage{graphicx} % to include images
\RequirePackage[margin=3cm,headheight=14pt]{geometry} % change doc margin
\RequirePackage{xr-hyper} % inter-document links
\RequirePackage[bookmarks=true,hyperfootnotes=false,hidelinks]{hyperref} % allow clickable index
\RequirePackage{longtable} % table can be broken through different pages
\RequirePackage{caption} % better captions for table and figures
\RequirePackage{tabu} % support for better columns
\RequirePackage{booktabs} % support for better borders
\RequirePackage[table]{xcolor} % support for colourable rows
\RequirePackage[default]{gillius} % set font gillius
\RequirePackage{stringstrings} % set font gillius
\RequirePackage{titlesec}
\RequirePackage{verbatim} % add pure code to document

% = Define group style ==========================================================================

	%-------------------INIZIO create subsubparagraph--------------------------------------
	\makeatletter
	\newcounter{subsubparagraph}[subparagraph]
	\def\toclevel@subsubparagraph{6}
	\renewcommand\thesubsubparagraph{%
		\thesubparagraph.\@arabic\c@subsubparagraph}
	\newcommand\subsubparagraph{%
		\@startsection{subsubparagraph}    % counter
		{6}                              % level
		{\parindent}                     % indent
		{3.25ex \@plus 1ex \@minus .2ex} % beforeskip
		{-1em}                           % afterskip
		{\normalfont\normalsize\bfseries}}
	\newcommand\l@subsubparagraph{\@dottedtocline{6}{13.5em}{5em}}
	\newcommand{\subsubparagraphmark}[1]{}
	\setcounter{tocdepth}{6}
	\setcounter{secnumdepth}{6} % aggiunge contatore ai paragrafi
	\makeatother
	%-------------------FINE create subsubparagraph--------------------------------------
	
	%-------------------INIZIO create zable--------------------------------------
	
	\NewDocumentEnvironment{zable}{m o o}
	{
		\rowcolors{2}{gray!50}{white}
		\begin{longtabu} to \textwidth {#1}
			\IfNoValueF{#2}{\rowcolor{gray!70} #2 \\ \toprule}
			\endhead
	}
	{
			\bottomrule
			\IfNoValueF{#3}{\caption{#3}}
		\end{longtabu}
		\vspace{0.3em}
	}
	%-------------------FINE create zable--------------------------------------
	
	%-------------------INIZIO coloured links--------------------------------------
	
	\newcommand{\zhref}[3][blue]{\href{#2}{\color{#1}{#3}}}
	
	%-------------------FINE coloured links--------------------------------------
	
	%-------------------INIZIO cit abbr--------------------------------------
	
	\newcommand{\cit}[1]{\textit{#1}}
	\newcommand{\abbr}[1]{\textit{#1}}
	
	%-------------------FINE cit abbr--------------------------------------
	
	
	%-------------------INIZIO glossary command--------------------------------------

	\NewDocumentCommand{\zg}{o m}{\label{zg:\IfNoValueTF{#1}{#2}{#1}}#2}
	\NewDocumentCommand{\zrg}{o m}{\hyperref[zg:\IfNoValueTF{#1}{#2}{#1}]{\textit{#2\ped{\small{G}}}}}
	
	%-------------------FINE glossary command--------------------------------------
	
	%-------------------INIZIO env appendixes--------------------------------------
	
	\newenvironment{appendices}
	{
		\appendix
		\addcontentsline{toc}{section}{Appendices}
		\section*{Appendici}
	}
	{
		
	}
	
	%-------------------FINE env appendixess--------------------------------------

% = Define abbr ==========================================================================

\newcommand{\responsabile}{\textit{Responsabile}}
\newcommand{\responsabilediprogetto}{\textit{Responsabile di progetto}}
\newcommand{\amministratore}{\textit{Amministratore}}
\newcommand{\amministratori}{\textit{Amministratori}}
\newcommand{\analista}{\textit{Analista}}
\newcommand{\analisti}{\textit{Analisti}}
\newcommand{\progettista}{\textit{Progettista}}
\newcommand{\progettisti}{\textit{Progettisti}}
\newcommand{\programmatore}{\textit{Programmatore}}
\newcommand{\programmatori}{\textit{Programmatori}}
\newcommand{\verificatore}{\textit{Verificatore}}
\newcommand{\verificatori}{\textit{Verificatori}}

\newcommand{\PdP}{\textit{Piano di progetto}}
\newcommand{\PdQ}{\textit{Piano di qualifica}}
\newcommand{\NdP}{\textit{Norme di progetto}}
\newcommand{\SdF}{\textit{Studio di fattibilità}}
\newcommand{\AdR}{\textit{Analisi dei requisiti}}
\newcommand{\ST}{\textit{Specifica tecnica}}
\newcommand{\DdP}{\textit{Definizione di prodotto}}
\newcommand{\MU}{\textit{Manuale utente}}
\newcommand{\GL}{\textit{Glossario}}

\newcommand{\PdPv}{\textit{Piano di progetto v0.0.1}}
\newcommand{\PdQv}{\textit{Piano di qualifica v0.0.1}}
\newcommand{\NdPv}{\textit{Norme di progetto v0.0.1}}
\newcommand{\SdFv}{\textit{Studio di fattibilità v0.0.1}}
\newcommand{\AdRv}{\textit{Analisi dei requisiti v0.0.1}}
\newcommand{\STv}{\textit{Specifica tecnica v0.0.1}}
\newcommand{\DdPv}{\textit{Definizione di prodotto v0.0.1}}
\newcommand{\MUv}{\textit{Manuale utente v0.0.1}}
\newcommand{\GLv}{\textit{Glossario v0.0.1}}

\newcommand{\RR}{\textbf{Revisione dei requisiti}}
\newcommand{\RA}{\textbf{Revisione di accettazione}}
\newcommand{\RP}{\textbf{Revisione di progettazione}}
\newcommand{\RQ}{\textbf{Revisione di qualifica}}
\newcommand{\revisionedeirequisiti}{\textbf{Revisione dei requisiti}}
\newcommand{\revisionediaccettazione}{\textbf{Revisione di accettazione}}
\newcommand{\revisionediprogettazione}{\textbf{Revisione di progettazione}}
\newcommand{\revisionediqualifica}{\textbf{Revisione di qualifica}}

% = Define doc variables ==========================================================================

\newrobustcmd\NewVar[1]{ % Define \NewVar to obtain document information
	\ifcsundef{#1}
	{
		\csdef{#1}##1{\csdef{@#1}{##1}}
		\csdef{get#1}{\csuse{@#1}}
	}
}

% document information variable
\NewVar{groupName}{}
\NewVar{groupMail}{}
\NewVar{companyName}{}
\NewVar{projectName}{}

\groupName{Zephyrus}
\groupMail{zephyrus.swe@gmail.com}
\companyName{RiskApp}
\projectName{DeGeOP}

\NewVar{docTitle}{}
\NewVar{docVersion}{}
\NewVar{docCreationDate}{}
\NewVar{docLastUpdateDate}{}
\NewVar{docStatus}{}
\NewVar{docEditors}{}
\NewVar{docVerificators}{}
\NewVar{docApprovers}{}
\NewVar{docUse}{}
\NewVar{docDestination}{}
\NewVar{docJournal}{}

% = Every Doc Preamble ===================================================================================

\setlength{\parindent}{0pt} % remove paragraph indentation
\pagestyle{fancy} % to let fancyhdr work
\setcounter{secnumdepth}{5} % to block out subsubparagraph from showing out with its numbering (index etc.)
\setcounter{tocdepth}{5}
\renewcommand{\footrulewidth}{0.4pt} % to create \hline at the bottom in the footer
\newcommand{\sectionbreak}{\clearpage} % clearpage for every new section

\AtBeginDocument{ % \AfterEndPreamble if begin{table} is needed
	% set header & footer for every page
	
	\lhead{\slshape\nouppercase{\rightmark}}
	\chead{}
	\rhead{\getdocTitle}
	\lfoot{\getgroupName{ - }\getprojectName}
	\cfoot{}
	\rfoot{\thepage\ di \pageref{\getdocTitle:LastPreamblePage}}
	
	\hypersetup{pageanchor=false}
	\begin{titlepage}
		\begin{center}
			\begin{large} \textbf{\getcompanyName} \end{large}
			
			\vspace{0.2em}
			\hrule
			\vspace{0.7em}
			
			\begin{large} \textbf{\getprojectName} \end{large}
			
			\vspace{14em}
			
			\includegraphics[keepaspectratio = true, width=7cm]{./logo.png}
			
			\vspace{1.5em}
			\vfill % Le informazioni del documento sono ancorate a fine pagina
			
			\begin{Huge} \getdocTitle \end{Huge}
			
			\vspace{5em}
			\textbf{Informazioni sul documento}
			\vspace{1em}
			
			\begin{large}
				\begin{tabu}{r|l}
					\textbf{Versione}	& \getdocVersion \\
					\textbf{Data di Creazione} & \getdocCreationDate \\
					\textbf{Data ultima modifica} & \getdocLastUpdateDate \\
					\textbf{Stato} & \getdocStatus \\
					\textbf{Redazione}	& \getdocEditors \\
					\textbf{Verifica}	& \getdocVerificators \\
					\textbf{Approvazione}	& \getdocApprovers \\
					\textbf{Uso} & \getdocUse \\
					\textbf{Lista di distribuzione}	& \getdocDestination \\
					\textbf{Email di riferimento} & \getgroupMail \\
				\end{tabu}
			\end{large}
			\normalsize
		\end{center}
	\end{titlepage}
	\hypersetup{pageanchor=true}

	\newpage
	
	\pagenumbering{Roman}
	
	\begin{center}
		\Large{\textbf{Registro delle modifiche}}
		\vspace{0.5em}
		\normalsize
		\renewcommand{\arraystretch}{1.5}
		\rowcolors{2}{gray!30}{white}
		\begin{longtabu} to \textwidth {llllX}
			\rowcolor{gray!70}\textbf{Versione} & \textbf{Data} & \textbf{Autore} & \textbf{Ruolo} & \textbf{Descrizione} \\
			\endhead
			\toprule
			\getdocJournal
			\bottomrule
		\end{longtabu}
	\end{center}

	\newpage
	
	\tableofcontents
	\label{\getdocTitle:LastPreamblePage}
	
	\newpage
	
	\pagenumbering{arabic}
	\rfoot{\thepage\ di \pageref{\getdocTitle:LastPage}}
	\setcounter{table}{0}
}

\AtEndDocument {
	\label{\getdocTitle:LastPage}
}

% = End of File ====================================================================================

\endinput %every class file needs this at the end