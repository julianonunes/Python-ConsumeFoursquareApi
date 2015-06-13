# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('map', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='venue',
            name='distance',
        ),
        migrations.AddField(
            model_name='venue',
            name='lat',
            field=models.DecimalField(default=0, max_digits=10, decimal_places=8),
        ),
        migrations.AddField(
            model_name='venue',
            name='lng',
            field=models.DecimalField(default=0, max_digits=10, decimal_places=8),
        ),
    ]
