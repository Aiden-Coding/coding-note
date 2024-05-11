import{_ as e,o as t,c as n,e as a}from"./app-BihAYnmf.js";const o={},c=a(`<p>了解Java8 的朋友可能都知道，Java8提供了一套新的时间处理API，这套API比以前的时间处理API要友好的多。</p><p>Java8 中加入了对时区的支持，带时区的时间为分别为：<code>ZonedDate</code>、<code>ZonedTime</code>、<code>ZonedDateTime</code>。</p><p>其中每个时区都对应着 ID，地区ID都为 “{区域}/{城市}”的格式，如<code>Asia/Shanghai</code>、<code>America/Los_Angeles</code>等。</p><p>在Java8中，直接使用以下代码即可输出美国洛杉矶的时间：</p><pre><code>LocalDateTime now = LocalDateTime.now(ZoneId.of(&quot;America/Los_Angeles&quot;));
System.out.println(now);
</code></pre><p>为什么以下代码无法获得美国时间呢？</p><pre><code>System.out.println(Calendar.getInstance(TimeZone.getTimeZone(&quot;America/Los_Angeles&quot;)).getTime());
</code></pre><p>当我们使用System.out.println来输出一个时间的时候，他会调用Date类的toString方法，而该方法会读取操作系统的默认时区来进行时间的转换。</p><pre><code>public String toString() {
    // &quot;EEE MMM dd HH:mm:ss zzz yyyy&quot;;
    BaseCalendar.Date date = normalize();
    ...
}

private final BaseCalendar.Date normalize() {
    ...
    TimeZone tz = TimeZone.getDefaultRef();
    if (tz != cdate.getZone()) {
        cdate.setZone(tz);
        CalendarSystem cal = getCalendarSystem(cdate);
        cal.getCalendarDate(fastTime, cdate);
    }
    return cdate;
}

static TimeZone getDefaultRef() {
    TimeZone defaultZone = defaultTimeZone;
    if (defaultZone == null) {
        // Need to initialize the default time zone.
        defaultZone = setDefaultZone();
        assert defaultZone != null;
    }
    // Don&#39;t clone here.
    return defaultZone;
}
</code></pre><p>主要代码如上。也就是说如果我们想要通过<code>System.out.println</code>输出一个Date类的时候，输出美国洛杉矶时间的话，就需要想办法把<code>defaultTimeZone</code>改为<code>America/Los_Angeles</code></p><p>但是，通过阅读Calendar的源码，我们可以发现，getInstance方法虽然有一个参数可以传入时区，但是并没有将默认时区设置成传入的时区。</p><p>而在Calendar.getInstance.getTime后得到的时间只是一个时间戳，其中未保留任何和时区有关的信息，所以，在输出时，还是显示的是当前系统默认时区的时间。</p>`,12),d=[c];function i(l,s){return t(),n("div",null,d)}const m=e(o,[["render",i],["__file","get-los_angeles-time.html.vue"]]),p=JSON.parse('{"path":"/docs/java/java-basic/get-los_angeles-time.html","title":"","lang":"en-US","frontmatter":{},"headers":[],"git":{"createdTime":1715384499000,"updatedTime":1715384499000,"contributors":[{"name":"dong","email":"dwx_job@163.com","commits":1}]},"filePathRelative":"docs/java/java-basic/get-los_angeles-time.md"}');export{m as comp,p as data};
